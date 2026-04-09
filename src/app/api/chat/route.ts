import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are UrduNazm AI — a knowledgeable and poetic assistant specializing in Urdu poetry and literature.

You help users:
- Understand and analyze Urdu poems, ghazals, nazms, rubais, and other poetic forms
- Learn about legendary Urdu poets: Mirza Ghalib, Allama Iqbal, Faiz Ahmed Faiz, Mir Taqi Mir, Ahmed Faraz, Parveen Shakir, and more
- Translate and explain Urdu verses in English
- Discover poems by mood, theme, or emotion
- Understand literary devices like radif, qafiya, maqta, matla, and beher
- Explore the historical and cultural context of Urdu literature

Guidelines:
- Be warm, knowledgeable, and poetic in your responses
- When quoting Urdu poetry, include both the original Urdu script and an English translation
- Keep responses focused on Urdu poetry and literature
- If asked something unrelated, gently redirect to poetry topics
- Use the poet's full name on first mention, then their common name
- For complex poetic analysis, break it down clearly for all levels of readers`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    });

    // Stream the response as Server-Sent Events
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch {
          controller.error("Stream error");
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
