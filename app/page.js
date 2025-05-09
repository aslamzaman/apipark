"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);



  useEffect(() => {
    const load = async () => {
      try {
       //   const res = await fetch("https://apipark.netlify.app/api/movie/upcoming/us");
        const res = await fetch("http://localhost:3000/api/movie/popular");
        const json = await res.json();
        console.log(json)
        setData(json);
      } catch (err) {
        console.error(err);
      };
    }

    load();
  }, []);



  const myFunction = () => {
  }


  return (
    <div className="p-4">
      <button
        onClick={myFunction}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Click Me
      </button>
      <div className="w-full grid grid-cols-3 lg:grid-cols-5 gap-4">
        {
          data.map((d, i) => {
            return (
              <div className="w-[200px] flex flex-col space-4" key={i}>
                <Image src={d.poster} width={400} height={600} alt={d.poster} priority className="w-full h-auto" />
                <p className="w-[200px] text-xs text-center">{d.title}</p>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  );
}
