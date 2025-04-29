// app/api/events/route.js

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";



export async function POST(req) {
  await dbConnect();

  const { name, description, date, location } = await req.json();

  try {
    const newEvent = new Event({
      name,
      description,
      date: new Date(date),
      location,
    });

    const savedEvent = await newEvent.save();

    return new Response(JSON.stringify(savedEvent), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
 // Your Event model

// GET request to fetch all events
export async function GET() {
  try {
    await dbConnect();  // Ensure DB is connected
    const events = await Event.find({});  // Fetch all events
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch events" }),
      { status: 500 }
    );
  }
}
