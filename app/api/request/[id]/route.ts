// app/api/request/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Get ID from URL path

  if (!id) {
    return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  await db.collection('requests').deleteOne({
    _id: new ObjectId(id),
    userId,
  });

  return NextResponse.json({ success: true });
}
