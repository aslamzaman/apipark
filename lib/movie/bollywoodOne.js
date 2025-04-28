import axios from "axios";
import * as cheerio from 'cheerio';
import { delay } from "../utils";

export const getOneMovie = async (url) => {
    try {
        // const url = `https://en.wikipedia.org/wiki/Stree_2`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("table").each((index, element) => {
            $(element).addClass(`myTable${index + 1}`);
        });
        $("table.myTable1 tr").each((index, element) => {
            $(element).addClass(`myRow${index + 1}`);
        });


        const objArray = [];
        const len = $("table.myTable1 tr").length;

        for (let i = 0; i < len + 1; i++) {
            const elm = `tr.myRow${i + 3}`;
            $(elm).each((j, row) => {

                let title = "";
                let detail = "";

                $(row).find('th').each((k, cell) => {
                    if (k === 0) {
                        title = $(cell).text().trim();
                    }
                })

                $(row).find('td').each((l, cell) => {
                    const fnd = $(cell).find('li');
                    if (fnd.length) {
                        const x = [];
                        $(cell).find('li').each((a, b) => {
                            x.push($(b).text().trim());
                        })
                        detail = x.join(", ");
                    } else {
                        const y = $(cell).text().trim();
                        detail = y;
                    }
                })

                objArray.push({ title, detail });
            })
        }

        let picUrl = "";
        $('tr.myRow2').find('img').each((k, cell) => {
            if (k === 0) {
                picUrl = "https:" + $(cell).attr("src");
            }
        })
        const joinPic = { data: objArray, pic: picUrl };
        return joinPic;
    } catch (error) {
        console.error(error);
        return {};
    }
}



const topPage = async (yr) => {
    try {
        // https://en.wikipedia.org/wiki/List_of_Hindi_films_of_2025
        const url = `https://en.wikipedia.org/wiki/List_of_Hindi_films_of_${yr}`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("table").each((index, element) => {
            $(element).addClass(`myTable${index + 1}`);
        });

        $("table.myTable2 tr").each((index, element) => {
            $(element).addClass(`myRow${index + 1}`);
        });

        const objArray = [];
        const trLen = $("table.myTable2 tr").length;

        for (let i = 0; i < trLen; i++) {
            const elm = `tr.myRow${i + 2}`;
            $(elm).each((j, row) => {

                $(row).find('td').each((k, cell) => {
                    if (k === 0) {
                        const lnk = $(cell).find('a').attr('href');
                        objArray.push({
                            title: `Box office collection ${yr}`,
                            name: $(cell).text().trim(),
                            url: `https://en.wikipedia.org${lnk}`
                        });
                    }
                })

            })
        }
        const res = objArray.map(async (item) => {
            const url = item.url;
            const moveDetail = await getOneMovie(url);
            return {
                ...item,
                picUrl: moveDetail.pic
            }
        })
        const result = Promise.all(res);
        return result;
    } catch (error) {
        console.error(error);
        return {};
    }
}


export const bollywood = async (lastYear) => {

    const loopYear = parseInt(lastYear);

    const data = [];
    for (let i = 2013; i < loopYear + 1; i++) {
        const res = await topPage(i);

        data.push(res);
    }
    return data;

}


export const compile = async (yr) => {

    const data = await bollywood(yr);
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const subArr = [];
        const oneMovie = data[i];
        for (let j = 0; j < oneMovie.length; j++) {
            const url = oneMovie[j].url;
            const detail = await getOneMovie(url);
            const newObject = { ...oneMovie[j], data: detail.data };
            if (detail.data.length > 0) {
                subArr.push(newObject);
            }
            await delay(50);
        }
        result.push(subArr);
    }

    return result;

}


