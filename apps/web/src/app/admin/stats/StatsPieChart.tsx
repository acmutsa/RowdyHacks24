"use client"

import { useState,Suspense } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { ColorRing } from "react-loader-spinner";
import Loading from "./loading";
import StatsChart from "./Pie";
// Will take in whatever data needs to be rendered
export default function StatsPieChart(){
       const data = [
         { name: "Group A", value: 400 },
         { name: "Group B", value: 300 },
         { name: "Group C", value: 300 },
         { name: "Group D", value: 200 },
       ];

       const [loading,setLoading] = useState(false)
    //    Note: Code taken from docs therefore we gonna ignore for now
        // @ts-ignore
       const renderActiveShape = (props) => {
        setLoading(true);
         const RADIAN = Math.PI / 180;
         const {
           cx,
           cy,
           midAngle,
           innerRadius,
           outerRadius,
           startAngle,
           endAngle,
           fill,
           payload,
           percent,
           value,
         } = props;
         const sin = Math.sin(-RADIAN * midAngle);
         const cos = Math.cos(-RADIAN * midAngle);
         const sx = cx + (outerRadius + 10) * cos;
         const sy = cy + (outerRadius + 10) * sin;
         const mx = cx + (outerRadius + 30) * cos;
         const my = cy + (outerRadius + 30) * sin;
         const ex = mx + (cos >= 0 ? 1 : -1) * 22;
         const ey = my;
         const textAnchor = cos >= 0 ? "start" : "end";
         console.log("renderActiveShape");
          setLoading(false);
         return (
           <g>
             <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
               {payload.name}
             </text>
             <Sector
               cx={cx}
               cy={cy}
               innerRadius={innerRadius}
               outerRadius={outerRadius}
               startAngle={startAngle}
               endAngle={endAngle}
               fill={fill}
             />
             <Sector
               cx={cx}
               cy={cy}
               startAngle={startAngle}
               endAngle={endAngle}
               innerRadius={outerRadius + 6}
               outerRadius={outerRadius + 10}
               fill={fill}
             />
             <path
               d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
               stroke={fill}
               fill="none"
             />
             <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
             <text
               x={ex + (cos >= 0 ? 1 : -1) * 12}
               y={ey}
               textAnchor={textAnchor}
               fill="#333">{`PV ${value}`}</text>
             <text
               x={ex + (cos >= 0 ? 1 : -1) * 12}
               y={ey}
               dy={18}
               textAnchor={textAnchor}
               fill="#999">
               {`(Rate ${(percent * 100).toFixed(2)}%)`}
             </text>
           </g>
         );
       };

      
       const [activeIndex, setActiveIndex] = useState(0);
        // Note: The orignial code had a _ before the index as the throw away varibale. We can ignore Typescript's warning for 
       const onPieEnter = (_,index: number) => {
         setActiveIndex(index);
       };

       console.log("StatsPieChart");
       return (
             <ResponsiveContainer width="100%" height={450}>
               <PieChart width={600} height={600}>
                 <Suspense fallback={<Loading />}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                  </Suspense>
               </PieChart>
             </ResponsiveContainer>
       );
}