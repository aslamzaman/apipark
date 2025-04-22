"use client"
import { inwordEnglishUs } from "@/lib/utils";
import axios from "axios";
import * as cheerio from 'cheerio';


const dd = async () => {
  /*
    const { data } = await axios.get("https://www.worldometers.info/world-population/lebanon-population/");
    const $ = cheerio.load(data);
  
    const tableRows = [];
  
    $('table.datatable tr').each((i, row) => {
      const rowData = [];
      $(row).find('td').each((j, cell) => {
        rowData.push($(cell).text().trim());
      });
      if (rowData.length) {
        tableRows.push(rowData);
      }
    });
  
  console.log(tableRows)
  */

  const { data } = await axios.get("https://www.worldometers.info/population/");
  const $ = cheerio.load(data);



  const listSet = [];

  $('ul li a').each((i, row) => {
    const title = $(row).text().trim();
    const url = $(row).attr('href');
    const data = $(row).attr('data-country');
    listSet.push({title, url,data})
  })

console.log(listSet)


}



export default function Home() {
  return (
    <>
      <button onClick={dd}>Click</button>
    </>
  );
}
