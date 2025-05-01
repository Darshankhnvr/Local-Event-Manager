"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isSignedIn, redirectToSignIn } = useClerk();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [registering, setRegistering] = useState(false);

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

  const handleRegisterClick = () => {
    if (!isSignedIn) {
      redirectToSignIn();
      return;
    }
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    try {
      await axios.post(`/api/events/${id}/register`, registrationData);
      alert("Registration successful!");
      setShowRegistrationForm(false);
      // Refresh event data to update registration count
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to register. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-red-600">{error}</p></div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Event not found.</p></div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => router.back()} className="text-blue-500 mb-4 hover:text-blue-600">← Back</button>
      
      <div className="bg-black rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
        <p className="text-gray-600 mb-6">{event.description}</p>

        <div className="space-y-3 text-gray-700 mb-6">
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
          <p className="flex items-center">
            <span className="font-semibold mr-2">👥 Registered:</span>
            {event.registrations?.length || 0} participants
          </p>
        </div>

        {!showRegistrationForm ? (
          <button
            onClick={handleRegisterClick}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Register Now
          </button>
        ) : (
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={registrationData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={registrationData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={registering}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
              >
                {registering ? "Registering..." : "Submit Registration"}
              </button>
              <button
                type="button"
                onClick={() => setShowRegistrationForm(false)}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
