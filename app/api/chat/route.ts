// app/api/chat/route.ts
// This file lives on the SERVER — your API key never reaches the browser.

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 1. Read the conversation history sent from the chatbot component
  const body = await req.json();

  // 2. Basic validation — reject empty or malformed requests
  if (!body?.messages || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // 3. Optional: rate-limit by IP to protect against abuse
  // (uncomment if you add an upstash/redis package later)
  // const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: `You are a helpful assistant for Plastifusion Plastics, a professional injection moulding manufacturer based in Coimbatore, Tamil Nadu, India.

Company facts:
- Specialises in precision injection moulding
- Machines: 120T to 160T capacity
- Materials: ABS, PP, Nylon, Engineering Plastics, custom materials
- Services: prototyping, mass production, custom moulding
- Offers factory video tours on request
- Quote requests handled via the Get Quote form on the website
- Contact: Based in Coimbatore, Tamil Nadu, India

Guidelines:
- Be concise, professional, and helpful
- If asked something outside your knowledge, invite them to use the Get Quote form or request a callback
- Never make up specs or capabilities — stick to the facts above or say you'll connect them with the team
- Keep replies short (2-4 sentences max) unless a detailed answer is clearly needed
- Use plain English, no markdown formatting in replies`,
        // Only pass messages from the client — not the system prompt
        messages: body.messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "AI service error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "Sorry, no response received.";

    // 4. Return only the reply text — don't forward raw Anthropic response
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Proxy route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}