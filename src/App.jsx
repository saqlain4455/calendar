import { useState } from "react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import dayjs from "dayjs";
import "./App.css";

function App() {
  const events = [
    { date: "2025-11-12", startTime: "8:00", endTime: "9:30", color: "#f6be23", title: "Dinner at 10:00 PM" },
    { date: "2025-11-12", startTime: "10:00", endTime: "11:30", color: "#9ACD32", title: "Leg Day" },
    { date: "2025-11-14", startTime: "04:30", endTime: "07:30", color: "#f6501e", title: "Weekly Catchup" },
  ];

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const today = dayjs();
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
  const getEventsForDate = (date) => events.filter((e) => dayjs(e.date).isSame(date, "day"));

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center px-2 sm:px-4 py-6 lg:w-[800px] sm:w-[500px]">
      <div className="w-full lg:max-w-[900px] rounded-2xl bg-[#0f172a] p-4 sm:p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrev}
            className="bg-slate-700 px-3 py-1 rounded flex items-center gap-2 text-sm sm:text-base transition-all duration-300 hover:-translate-y-1"
          >
            <FaArrowLeftLong />
            <p>Prev</p>
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-center">
            {currentMonth.format("MMMM YYYY")}
          </h1>

          <button
            onClick={handleNext}
            className="bg-slate-700 px-3 py-1 rounded flex items-center gap-2 text-sm sm:text-base transition-all duration-300 hover:-translate-y-1"
          >
            <p>Next</p>
            <FaArrowRight />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-[2px] sm:gap-2 text-center text-white font-semibold mb-2 text-[11px] sm:text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((week) => (
            <div key={week}>{week}</div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-[2px] sm:gap-2">
          {days.map((dayItem) => {
            const isToday = dayItem.isSame(today, "day");
            const isCurrentMonth = dayItem.isSame(currentMonth, "month");
            const eventsForDay = getEventsForDate(dayItem);

            return (
              <div
                key={dayItem.format("YYYY-MM-DD")}
                className={`p-[3px] sm:p-2 h-[70px] sm:h-[110px] border rounded relative overflow-hidden hover:cursor-pointer transition-all duration-200 
                  ${isCurrentMonth ? "border-gray-600" : "border-gray-800 text-gray-500"}
                  ${isToday ? "bg-blue-900/40 border-blue-400" : ""}`}
              >
                <div className="text-[10px] sm:text-sm font-semibold">{dayItem.date()}</div>

                <div className="mt-[2px] sm:mt-1 flex flex-col text-[9px] sm:text-xs gap-[2px] overflow-y-auto max-h-[45px] sm:max-h-[80px] break-words">
                  {eventsForDay.map((event, index) => (
                    <div
                      key={index}
                      className="p-[2px] sm:p-1 rounded-md text-black cursor-pointer hover:opacity-80 hover:-translate-y-[1px]"
                      style={{ backgroundColor: event.color }}
                      title={`${event.startTime} - ${event.endTime}`}
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
    </div>
  );
}

export default App;



