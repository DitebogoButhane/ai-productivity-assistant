import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { systemPrompt?: string; input?: string };
        const systemPrompt = (body.systemPrompt ?? "").trim();
        const input = (body.input ?? "").trim();

        if (!systemPrompt || !input) {
          return new Response("systemPrompt and input are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: systemPrompt,
          prompt: input,
        });

        return result.toTextStreamResponse();
      },
    },
  },
});
