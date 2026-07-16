import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ListTodo, BookOpen, PencilRuler, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    to: "/meeting-notes",
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into summaries, decisions, and action items.",
    icon: FileText,
  },
  {
    to: "/task-planner",
    title: "AI Task Planner",
    description: "Prioritize tasks and build a daily or weekly schedule.",
    icon: ListTodo,
  },
  {
    to: "/research",
    title: "AI Research Assistant",
    description: "Summarize articles and extract insights in seconds.",
    icon: BookOpen,
  },
  {
    to: "/prompt-editor",
    title: "Prompt Editor",
    description: "Customize the prompts each AI tool uses.",
    icon: PencilRuler,
  },
  {
    to: "/responsible-ai",
    title: "Responsible AI",
    description: "How to use AI outputs thoughtfully at work.",
    icon: ShieldCheck,
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6 md:p-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Your AI workspace
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Welcome back.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A calm, focused place to summarize meetings, plan your week, and think through research —
          powered by AI.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full rounded-2xl border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{t.title}</CardTitle>
                <CardDescription className="text-sm">{t.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-70 transition-opacity group-hover:opacity-100">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
