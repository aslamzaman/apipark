import axios from "axios";
import * as cheerio from 'cheerio';

const getOneYear = async (yr) => {
    try {
        const url = `https://en.wikipedia.org/wiki/List_of_Hindi_films_of_${yr}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("table").each((index, element) => {
            $(element).addClass(`myTable${index + 1}`);
        });

        $("table.myTable2 tr").each((index, element) => {
            $(element).addClass(`myRow${index + 1}`);
        });

        const obj = [];
        for (let i = 2; i < 12; i++) {
            const elm = `tr.myRow${i}`;
            $(elm).each((j, row) => {

                $(row).find('td').each((k, cell) => {
                    if (k === 0) {
                        const lnk = $(cell).find('a').attr('href');
                        obj.push({
                            title: `Box office collection ${yr}`,
                            name: $(cell).text().trim(),
                            url: `https://en.wikipedia.org${lnk}`
                        });
                    }
                })

            })
        }
        return obj;
    } catch (error) {
        console.error(error);
        return {};
    }
}


export const bollywood = async()=>{

    const data = [];


    for(let i = 2013; i < 2025; i++){
      
        const res = await getOneYear(i);
        data.push(res);
    }
    return data;

}


