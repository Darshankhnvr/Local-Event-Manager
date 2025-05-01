"use client"
import EventForm from "@/app/components/EventForm";
import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { isSignedIn, redirectToSignIn } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn();
    }
  }, [isSignedIn, redirectToSignIn]);

  if (!isSignedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="text-blue-500 hover:text-blue-600 mr-4"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <EventForm />
          </div>
        </div>
      </div>
    </div>
  );
}
