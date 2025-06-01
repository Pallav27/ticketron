import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  await db.collection('requests').deleteOne({ _id: new ObjectId(params.id), userId });

  return NextResponse.json({ success: true });
}

// ---------------------- lib/utils.ts ----------------------
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
