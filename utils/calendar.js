// utils/calendar.js
export function getCalendarDays(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
  
    const prevMonthDays = firstDayOfMonth; // Days from the previous month
    const nextMonthDays = 6 - lastDayOfMonth; // Days from the next month
  
    // Generate the days for the current month
    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(year, month, i + 1),
      currentMonth: true,
    }));
  
    // Add days from the previous month
    for (let i = 0; i < prevMonthDays; i++) {
      days.unshift({
        date: new Date(year, month, -(prevMonthDays - i - 1)),
        currentMonth: false,
      });
    }
  
    // Add days from the next month
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        currentMonth: false,
      });
    }
  
    return days;
  }
  