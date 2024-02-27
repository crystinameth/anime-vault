"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

//pages need to update , else with each scroll it'll continue displaying the same content, i.e. page 2 in this case
let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();        //hooks can only be used on client side
  const [data, setData] = useState<AnimeProp[]>([]);

  useEffect(() => {
    if(inView) {
      fetchAnime(page).then((res) => {
        setData([...data,...res])           //...data cuz we wish to retain the previous data as well
        page++;         //increment the page with each data loading
      });
    }
  }, [inView, data]);                   //div ref={ref} , when ref is reached this will execute
  
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>         
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
