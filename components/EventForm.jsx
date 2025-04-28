import { useState } from "react";

export default function EventForm() {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send event data to API or database here
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const data = await response.json();
      console.log("Event created successfully:", data);
      // Reset the form or redirect after success
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Event Description
        </label>
        <textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium">
          Event Date
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          Event Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </div>
    </form>
  );
}
