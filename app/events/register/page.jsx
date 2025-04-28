import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function EventDetailPage({ event }) {
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      
      <SignedIn>
        {/* Display RSVP form or button here */}
        <button>RSVP</button>
      </SignedIn>
      
      <SignedOut>
        <p>You need to sign in to RSVP for this event.</p>
      </SignedOut>
    </div>
  );
}
