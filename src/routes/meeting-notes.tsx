import { createFileRoute } from "@tanstack/react-router";
import { AiToolShell } from "@/components/ai-tool-shell";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Sage" }] }),
  component: () => (
    <AiToolShell
      toolId="meeting"
      title="Meeting Notes Summarizer"
      description="Paste raw meeting notes and get a clean summary, decisions, and action items."
      inputLabel="Meeting notes"
      inputPlaceholder="Paste your meeting notes here..."
    />
  ),
});
