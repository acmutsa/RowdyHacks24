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

type categoryMap = {
  [key: string]: string[];
};


const categoriesMap:categoryMap = c.categories;

export default function Filters() {
  return (
    <Card className="h-full max-w-5xl">
      <CardHeader className="">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="">
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
