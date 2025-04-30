// app/api/events/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function GET(req, { params }) {
  const { id } = params;  // Extract the event ID from the URL

  try {
    await dbConnect();  // Ensure DB is connected

    // Fetch event by ID from the database
    const event = await Event.findById(id);

    if (!event) {
      return new Response(
        JSON.stringify({ error: "Event not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event" }),
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();  // Ensure DB is connected

    const event = await Event.findById(id);
    if (!event) {
      return new Response(
        JSON.stringify({ error: "Event not found" }),
        { status: 404 }
      );
    }

    // You can add your user registration logic here, 
    // assuming `userId` is passed in the request body.
    const { userId } = await req.json(); // Get the userId from the request body
    if (event.registeredUsers.includes(userId)) {
      return new Response(
        JSON.stringify({ error: "User already registered" }),
        { status: 400 }
      );
    }

    // Register the user by adding their ID to the registeredUsers array
    event.registeredUsers.push(userId);
    await event.save();

    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.log("Error during registration:", error);
    return new Response(
      JSON.stringify({ error: "Failed to register user" }),
      { status: 500 }
    );
  }
}