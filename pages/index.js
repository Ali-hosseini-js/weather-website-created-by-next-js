import React, { Fragment } from "react";
import SearchBox from "../components/searchBox";


const index = () => {


  return (
    <Fragment>
      <div className="flex flex-col  items-center w-[1000px] h-[500px] mt-56 bg-gray-100 rounded-xl shadow-xl">
        <h1 className="text-6xl text-gray-500 py-10 top-10">How’s the weather?</h1>
        <p className="text-3xl text-gray-500 ">choose your city to find out.</p>
        <SearchBox />
      </div>
    </Fragment>
  );
};

export default index;
