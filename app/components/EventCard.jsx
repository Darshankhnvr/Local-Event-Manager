// components/EventCard.jsx

import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <div className="space-y-2 text-gray-600">
        <p className="flex items-center">
          <span className="font-semibold mr-2">📅 Date:</span>
          {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p className="flex items-center">
          <span className="font-semibold mr-2">📍 Location:</span>
          {event.location}
        </p>
        <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
      </div>
      <div className="mt-4">
        <Link 
          href={`/events/${event._id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
