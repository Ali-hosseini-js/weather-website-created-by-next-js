import React from "react";
import  ConvertKelvinToCelsius  from "@/components/convertKelvinToCelsius";


export default function WeeklyForcast({day, temp, main}) {
  return (
    <div className="w-full bg-white border rounded-xl block justify-center items-center py-4 shadow-sm mx-auto">
      <div className="flex justify-center items-center">{day}</div>
      <div className="flex justify-center items-center py-3 text-2xl"><ConvertKelvinToCelsius temp={temp}/>°</div>
      <div className="flex justify-center items-center">{main}</div>
    </div>
  );
}