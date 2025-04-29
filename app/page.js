// app/page.jsx
"use client";

import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
