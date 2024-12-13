'use client';
import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import EventModal from '@/components/EventModal';

export default function Home() {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Load events from localStorage when the app initializes
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (newEvent) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
  };

  const handleEditEvent = (eventId, updatedEvent) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      ),
    }));
  };

  const handleDeleteEvent = (eventId) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
    }));
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
    style={{
      background: "linear-gradient(to bottom right, #bfbfbf 60%, #30325e 50%)",
    }}>
      <h1 className="text-2xl font-bold mb-6 text-black">Event Calendar</h1>
      <Calendar onDayClick={handleDayClick} events={events} />
      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          events={events[selectedDate.toISOString().split('T')[0]] || []}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
