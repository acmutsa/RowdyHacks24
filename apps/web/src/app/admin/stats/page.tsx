import StatsPieChart from "./StatsPieChart";
import Loading from "./loading";
import { Suspense } from "react";
export default async function Page(){
    return (
      <div className="mx-auto px-5 pt-44 overflow-x-visible">
        <div className="flex w-full h-full items-center justify-start">
          <h1 className="text-4xl">Stats For Nerds</h1>
        </div>
        <StatsPieChart /> 
      </div>
    );
} 