import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNearEarthObjects } from "../services/neoservices";
import Status from "./Status";
import { NEOTableRender } from "./NEOTableRender";
import NEOVelocityChart from "./NEOVelocityChart";

const NEOTable = () => {
  const [startDate, setStartDate] = useState("2024-05-04");
  const [endDate, setEndDate] = useState("2024-05-06");

  const { data, isLoading, error } = useQuery({
    queryKey: ["neos", startDate, endDate],
    queryFn: () => fetchNearEarthObjects(startDate, endDate),
    staleTime: 1 * 60 * 1000,
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log("Near earth objects:");
  //     console.log(data.near_earth_objects);

  //     console.log(transformData(data.near_earth_objects));
  //   }
  // }, [data]);

  //handle today
  const handleTodayClick = () => {
    const today = new Date().toISOString().split("T")[0];

    // Set state
    setStartDate(today);
    setEndDate(today);
  };

  if (isLoading) return <Status statusText="Loading" />;
  else if (error) return <Status statusText={`Error: ${error.message}`} />;
  else
    return (
      <div className="flex flex-col items-center mt-4 text-sm ">
        <div className="flex flex-col gap-y-4 items-center">
          {/* Date Picker */}
          <p>Today is: {new Date().toLocaleDateString()} </p>
          <div className="flex md:space-x-4 flex-col gap-y-2 md:flex-row">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-md"
              max={new Date().toISOString().split("T")[0]}
            />
            <button
              onClick={handleTodayClick}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-sm"
            >
              Today
            </button>
          </div>
        </div>

        {/* the table */}
        {data && data.near_earth_objects && (
          <div className="mt-6">
            <NEOTableRender data={data.near_earth_objects} />
          </div>
        )}

        {/* the chart */}
        {data && data.near_earth_objects && (
          <div className="pt-5 mt-10 border-t-2 ">
            <NEOVelocityChart data={data.near_earth_objects} />
          </div>
        )}
      </div>
    );
};

export default NEOTable;
