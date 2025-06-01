// app/api/request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getDb } from '@/lib/db';
import { classifyRequest } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { description } = await req.json();
  const { heading, category } = await classifyRequest(description);

  const db = await getDb();
  const ticket = {
    userId,
    description,
    heading,
    category,
    createdAt: new Date(),
  };

  await db.collection('requests').insertOne(ticket);
  return NextResponse.json(ticket, { status: 201 });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  const tickets = await db
    .collection('requests')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(tickets);
}
