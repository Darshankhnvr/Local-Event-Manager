import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export async function GET(req) {
  try {
    await dbConnect();

    // Get current date
    const currentDate = new Date();

    // Find all upcoming events (date >= current date)
    const events = await Event.find({
      date: { $gte: currentDate }
    }).sort({ date: 1 }); // Sort by date ascending

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch events" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const event = await Event.create(body);
    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create event" }),
      { status: 500 }
    );
  }
} 