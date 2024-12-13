'use client';
import { useState } from 'react';

export default function EventModal({
  selectedDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onClose,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const resetForm = () => {
    setName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setEditingEventId(null);
    setIsEditing(false);
    setError('');
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (!name || !startTime || !endTime) {
      setError('Please fill out all required fields.');
      return;
    }

    if (startTime >= endTime) {
      setError('Start time must be before end time.');
      return;
    }

    const hasOverlap = events.some((event) => {
      if (isEditing && event.id === editingEventId) return false;

      const existingStart = event.startTime;
      const existingEnd = event.endTime;

      return (
        (startTime >= existingStart && startTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (startTime <= existingStart && endTime >= existingEnd)
      );
    });

    if (hasOverlap) {
      setError('This event overlaps with an existing event.');
      return;
    }

    if (isEditing) {
      onEditEvent(editingEventId, { name, startTime, endTime, description });
    } else {
      onAddEvent({
        id: Date.now().toString(),
        name,
        startTime,
        endTime,
        description,
      });
    }
    resetForm();
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setEditingEventId(event.id);
    setName(event.name);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
  };

  const handleDelete = (id) => {
    onDeleteEvent(id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-black">
          Events for {selectedDate.toDateString()}
        </h2>

        {/* Search Bar */}
        <input
          className="w-full p-2 border rounded mb-4 text-gray-600"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Existing Events */}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="border-b pb-2 mb-2 flex justify-between items-start">
              <div className="w-3/4">
                <h3 className="font-semibold text-gray-700">{event.name}</h3>
                <p className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-xs text-gray-500 break-words overflow-hidden">{event.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No events found.</p>
        )}

        {/* Add/Edit Event Form */}
        <div className="mt-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            className="w-full p-2 border rounded mb-2 text-gray-600"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2 text-gray-600"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2 text-gray-600"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded text-gray-600"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save Changes' : 'Add Event'}
          </button>
        </div>

        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
