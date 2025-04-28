import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import EventForm from "../../components/EventForm";

export default function CreateEventPage() {
  const { isSignedIn, redirectToSignIn } = useClerk();

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn();  // Redirects the user to the SignIn page if they are not logged in.
    }
  }, [isSignedIn]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignedIn>
        <EventForm /> {/* Event creation form for signed-in users */}
      </SignedIn>
      <SignedOut>
        <p>You need to be signed in to create an event!</p>
      </SignedOut>
    </div>
  );
}
