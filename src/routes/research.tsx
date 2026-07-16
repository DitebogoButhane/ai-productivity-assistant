import { createFileRoute } from "@tanstack/react-router";
import { AiToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Sage" }] }),
  component: () => (
    <AiToolShell
      toolId="research"
      title="AI Research Assistant"
      description="Paste an article or research and get a briefing with key insights and next steps."
      inputLabel="Source material"
      inputPlaceholder="Paste the article or research content here..."
    />
  ),
});
