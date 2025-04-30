"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { SignedIn } from "@clerk/nextjs";

export default function EventRegisterPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading event...</p>;
  if (error) return <p className="text-red-500 text-center text-xl">{error}</p>;
  if (!event) return <p className="text-gray-600 text-center text-xl">No event found</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="space-y-2 text-sm">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>

      <SignedIn>
        <div className="mt-6">
          <p className="text-green-600">📝 Registration form coming soon!</p>
        </div>
      </SignedIn>
    </div>
  );
}
