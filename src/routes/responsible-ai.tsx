import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({ meta: [{ title: "Responsible AI — Sage" }] }),
  component: ResponsibleAiPage,
});

function ResponsibleAiPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 md:p-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Responsible AI</h1>
      </div>

      <p className="text-lg text-muted-foreground">
        Sage helps you move faster, but AI outputs are assistive — not authoritative. Please review
        any generated content before using it for professional or business decisions.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            title: "Review before sharing",
            body: "Always read AI-generated summaries, plans, or recommendations before forwarding them to colleagues or clients.",
          },
          {
            title: "Verify facts and figures",
            body: "AI can hallucinate. Cross-check names, numbers, dates, and citations against source material.",
          },
          {
            title: "Keep humans in the loop",
            body: "Use AI as a first draft, not a final decision-maker — especially for anything involving people, money, or risk.",
          },
          {
            title: "Nothing is stored",
            body: "This app does not save your inputs, prompts, or outputs. Everything lives only in your current browser session.",
          },
        ].map((item) => (
          <Card key={item.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
