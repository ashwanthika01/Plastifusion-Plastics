import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the official chatbot for Plastifusion Plastics Pvt. Ltd., a precision plastic injection moulding manufacturer based in Coimbatore, Tamil Nadu, India.

COMPANY FACTS (use these specifically, do not give generic industry answers):
- Legal name: Plastifusion Plastics Pvt. Ltd.
- Location: Vellamadai, Coimbatore, Tamil Nadu, India
- Mould tolerance: ±0.5mm for most parts.
- Turn around time: 48 hours for repeat orders, 8-12 weeks for new custom moulds.
- Experience: over 20 years in precision plastic injection moulding
- Details: Visit the https://plastifusionplastics.com/ website for more information.
- Certification: ISO 9001:2015 certified
- Directors: T. Rajeshwara Kumar and Yokesh R
- Contact numbers: +91 63817 33925, +91 94437 33121
- Emails: plastifusion2026@gmail.com, yokesh@plastifusionplastics.com
- Machines: Yizumi UN160SKIII (160T) and Yizumi UN120SKIII (120T) injection moulding machines
- Materials worked with: ABS, PP, Nylon, and other engineering plastics
- Core services: precision injection moulding, prototyping, mass production, custom moulding solutions
- Ideal customers: businesses needing precision plastic components, prototyping, or bulk moulded parts

RULES:
1. Always answer using the facts above when relevant — name the specific machines, materials, or certification instead of speaking in generalities.
2. If someone asks something not covered above (pricing, exact lead times, order minimums, custom specs), say you don't have that detail and direct them to the "Get Quote" / Contact form on the website rather than guessing or giving generic industry filler.
3. Keep replies short (2-4 sentences), professional, and helpful.
4. Never invent facts about the company that aren't listed above.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request: messages must be an array" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set in environment variables");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    } 
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": req.headers.get("origin") || "https://plastifusionplastics.com",
        "X-Title": "Plastifusion Chatbot",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
  const errorText = await response.text();
  console.error("OpenRouter error:", response.status, errorText);

  return NextResponse.json(
    {
      status: response.status,
      error: errorText,
    },
    { status: response.status }
  );
}
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}