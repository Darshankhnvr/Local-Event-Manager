// components/EventCard.jsx

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <a href={`/events/${event._id}`}>View</a>
    </div>
  );
}
