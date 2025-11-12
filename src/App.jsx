import { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import './App.css'
import { FaArrowRight } from "react-icons/fa6";
import dayjs from "dayjs";




function App() {
const events = [
  {
    date: "2025-11-12",
    startTime: "8:00",
    endTime: "9:30",
    color: "#f6be23",
    title: "Dinner at 10:00Pm",
  },
    {
    date: "2025-11-12",
    startTime: "10:00",
    endTime: "11:30",
    color: "#f6be23",
    title: "leg day ",
  },
  {
    date: "2025-11-14",
    startTime: "04:30",
    endTime: "07:30",
    color: "#f6501e",
    title: "Weekly Catchup",
  },
];


  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const today = dayjs(); // current day
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");


  const days = [];
  let day = startDate;
  while (day.isBefore(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));

    //return all events here 
  const getEventsForDate = (date) => {
    return events.filter((e) => dayjs(e.date).isSame(date, "day"));

  };



  return (
    <div className=" max-w-[1080px]  min-h-screen  lg:w-[800px] lg:h-[850px]  mx-auto p-6  bg-slate-900 text-white rounded-2xl  ">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="bg-slate-700 px-3 py-1 rounded flex flex-row items-center gap-2   transition-all duration-300  hover:-translate-y-1    ">
          <FaArrowLeftLong />
          <p>Prev</p>
     </button>

       
        <h1 className="text-xl font-bold">
          {currentMonth.format("MMMM YYYY")}
        </h1>
        <button  onClick={handleNext} className="bg-slate-700 px-3 py-1 rounded flex flex-row items-center gap-2 transition-all duration-300 border hover:-translate-y-1    ">
          <p>Next</p>
          <FaArrowRight />
        </button>
</div>



     

      <div className="grid grid-cols-7 gap-2 text-center text-white font-semibold mb-2 w-full ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((week) => (
          <div key={week}>{week}</div>
        ))}

      </div>

      <div className="grid grid-cols-7 gap-2  w-full">
        {days.map((dayItem) => {
          const isToday = dayItem.isSame(today, "day");
          const isCurrentMonth = dayItem.isSame(currentMonth, "month");
          const eventsForDay = getEventsForDate(dayItem);
          return (
            <div
              key={dayItem.format("YYYY-MM-DD")}
              className={`p-2 h-28 border rounded relative hover: cursor:pointer ${
                isCurrentMonth
                  ? "border-gray-600"
                  : "border-gray-800 text-gray-500"
              } ${isToday ? "bg-blue-900/30 border-blue-400" :
                ""}`
              }
            >

       

              <div className="text-sm" >{dayItem.date()}

              </div>
              <div className="mt-1 flex flex-col text-xs  gap-2 ">
                {eventsForDay.map((event, index) => (
                  <div
                    key={index}
                    className="text-xs p-1 rounded-md text-black cursor-pointer transition-transform duration-200 hover:opacity-80 hover:-translate-y-[1px] hover:shadow-md "
                    style={{ backgroundColor: event.color }}
                    title={`${event.startTime} - ${event.endTime}`
                            }
                  >
                    {event.title}
                  </div>
                ))}
              </div>
                 </div>
          );
        })}
  </div>
</div>
  );
}

export default App

