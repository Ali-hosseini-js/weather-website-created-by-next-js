import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { Fragment } from "react";
import Image from "next/image";
import ConvertKelvinToCelsius from "@/components/convertKelvinToCelsius";
import WeeklyForcast from "@/components/weeklyForcast";

import droplet from "../assets/droplet.png";
import wind from "../assets/wind.png";

const weatherDetails = () => {
  const city = localStorage.getItem("searchItem");

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(`/api/search?city=${city}`).then((res) => res.json()),
  });

  const firstData = data?.list[0];

  //date
  const isoDateString = firstData?.dt_txt.replace(" ", "T") + "Z";
  const dayOfWeek = new Date(isoDateString).toLocaleDateString("en-US", {
    weekday: "short",
  });
  const monthName = new Date(isoDateString).toLocaleDateString("en-US", {
    month: "long",
  });
  const dayOfMonth = new Date(isoDateString).toLocaleDateString("en-US", {
    day: "numeric",
  });

  //weather detail
  const weatherIcon = firstData?.weather[0].icon;
  const weatherDescription = firstData?.weather[0].description;
  const windSpeed = firstData?.wind.speed;
  const humidity = firstData?.main.humidity;

  // 5 days forcast
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  console.log(uniqueDates);
  console.log(firstDataForEachDate);

  return (
    <Fragment>
      <div className="w-[1000px] mt-56 flex  shadow-xl">
        {/*left section*/}
        <div className="w-2/3 h-[600px] bg-gray-100 grid grid-cols-1 p-20 rounded-l-xl">
          <div className="text-3xl text-gray-500">
            <div className="flex gap-5 ">
              <div className="uppercase">{dayOfWeek}</div>
              <div>{dayOfMonth}</div>
            </div>
            <div className="uppercase">{monthName}</div>
          </div>
          <div className="flex gap-5 justify-start text-gray-500">
            <div className="text-6xl">
              <ConvertKelvinToCelsius temp={firstData?.main.temp} />°
            </div>
            <div className="block gap-4">
              <div className="text-md flex gap-5">
                {weatherDescription}
                <div className="relative h-7 w-7">
                  <Image
                    width={100}
                    height={100}
                    alt="weather-icon"
                    className="absolute h-full w-full"
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                  />
                </div>
              </div>
              <div className="text-md flex gap-3">
                <div className="flex my-auto h-4 w-4">
                  <Image
                    width={100}
                    height={100}
                    alt="wind speed"
                    className="h-full w-full"
                    src={wind}
                  />
                </div>
                {windSpeed} m/s
              </div>
              <div className="text-md flex gap-3">
                <div className="flex my-auto h-4 w-4">
                  <Image
                    width={100}
                    height={100}
                    alt="humidity"
                    className="h-full w-full"
                    src={droplet}
                  />
                </div>
                {humidity} %
              </div>
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center">
              <p className="text-xl text-black font-bold">IsLoading...</p>
            </div>
          )}

          <div className="flex w-full flex-col gap-4">
            <p className=" text-2xl">Daily Forcast</p>
            <div className="w-full grid grid-cols-6 grid-rows-1 gap-4">
              {firstDataForEachDate.map((d, i) => (
                <WeeklyForcast
                  key={i}
                  main={d?.weather[0].main ?? ""}
                  day={d ? format(parseISO(d.dt_txt), "EE") : ""}
                  temp={d?.main.temp ?? 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/*right section*/}
        <div className="w-1/3 h-[600px] bg-gray-200 flex flex-col justify-center items-center p-5 rounded-r-xl">
          <div className="justify-center items-center">today time</div>
          <div>today weather</div>
          <p>Hourly Forcast</p>
          <div>
            {/*<div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </p>

                        {/* <WeatherIcon iconName={d.weather[0].icon} /> 
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default weatherDetails;
