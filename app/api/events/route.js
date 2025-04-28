import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, description, date, location } = await req.json();

  try {
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
      },
    });

    return new Response(JSON.stringify(newEvent), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
