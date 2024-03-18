"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import FilterCategory from "./FilterCategory";
import c from "config";
import { useRef, useState } from "react";

type categoryMap = {
  [key: string]: string[];
};

export default function Filters() {

  const categoriesMap: categoryMap = c.categories;
  const [A_Z, setA_Z] = useState("A-Z");
  const AOrZ = useRef(true);
  // Needs to handle functionality
  const handleClick = ()=>{
    AOrZ.current = !AOrZ.current;
    setA_Z(AOrZ.current ? "A-Z" : "Z-A");
  }


  return (
    <Card className="md:w-40 xl:w-80 right-2 text-sm">
      <CardHeader className="">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          className="hover:text-gray-500 transition-all duration-200  "
          onClick={handleClick}>
          <h2 className=" text-base">From: {A_Z}</h2>
        </button>
        <div className="border border-b-[0.5px] w-full"></div>
        <Accordion type="single" collapsible className="max-w-full">
          {Object.keys(c.categories).map((name, index) => (
            <FilterCategory
              name={name}
              items={categoriesMap[name]}
              key={name}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
