"use client"
import { inwordEnglishUs } from "@/lib/utils";



const dd = () => {
  const x = inwordEnglishUs('120406089', 'title');
  console.log(x);
}



export default function Home() {
  return (
    <>
      <button onClick={dd}>Click</button>
    </>
  );
}
