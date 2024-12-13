'use client'
import { useState } from 'react';
import { getCalendarDays } from '@/utils/calendar';
import clsx from 'clsx';

export default function Calendar({ onDayClick, events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = getCalendarDays(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={handlePrevMonth}
        >
          Previous
        </button>
        <h2 className="text-lg font-bold text-gray-600">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-600">
            {day}
          </div>
        ))}

        {days.map(({ date, currentMonth }) => {
          const dayEvents = events[date.toISOString().split('T')[0]] || [];
          const isToday =
            date.toDateString() === new Date().toDateString() && currentMonth;

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDayClick(date)}
              className={clsx(
                'p-2 rounded-lg text-center',
                currentMonth ? 'text-black' : 'text-gray-400',
                isToday && 'bg-blue-100 border border-blue-500',
                'hover:bg-gray-200'
              )}
            >
              {date.getDate()}
              {dayEvents.length > 0 && (
                <span className="block mt-1 text-xs text-blue-500">
                  {dayEvents.length} event(s)
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
