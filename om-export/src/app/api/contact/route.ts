import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, source, product, country, quantity } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase not configured. Message received but not stored:', { name, email, subject });
      return NextResponse.json(
        { success: true, warning: 'Message received but database is not configured yet.' },
        { status: 200 }
      );
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email: email || null,
        subject: subject || null,
        message,
        source: source || 'contact_page',
        product: product || null,
        country: country || null,
        quantity: quantity || null,
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
