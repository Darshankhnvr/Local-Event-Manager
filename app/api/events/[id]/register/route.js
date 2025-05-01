import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function POST(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Find the event
    const event = await Event.findById(id);
    if (!event) {
      return new Response(
        JSON.stringify({ error: "Event not found" }),
        { status: 404 }
      );
    }

    // Check if user is already registered
    const isAlreadyRegistered = event.registrations?.some(
      reg => reg.email === email
    );

    if (isAlreadyRegistered) {
      return new Response(
        JSON.stringify({ error: "You are already registered for this event" }),
        { status: 400 }
      );
    }

    // Add registration
    if (!event.registrations) {
      event.registrations = [];
    }
    
    event.registrations.push({
      name,
      email,
      phone,
      registeredAt: new Date()
    });

    await event.save();

    return new Response(
      JSON.stringify({ message: "Registration successful", event }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to register for event" }),
      { status: 500 }
    );
  }
} 