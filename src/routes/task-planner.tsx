import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/task-planner")({
  head: () => ({ meta: [{ title: "AI Task Planner — Sage" }] }),
  component: TaskPlannerPage,
});

function TaskPlannerPage() {
  const [mode, setMode] = useState<"daily" | "weekly">("daily");

  return (
    <AiToolShell
      toolId="planner"
      title="AI Task Planner"
      description="List your tasks and get a prioritized plan with a suggested schedule."
      inputLabel="Your tasks"
      inputPlaceholder="One task per line. Include context, deadlines, or estimated effort if you have them."
      buildInput={(input) =>
        `Planning mode: ${mode === "daily" ? "Daily schedule" : "Weekly schedule"}\n\nTasks:\n${input}`
      }
      extras={
        <div className="space-y-2">
          <Label className="text-sm">Schedule type</Label>
          <RadioGroup
            value={mode}
            onValueChange={(v) => setMode(v as "daily" | "weekly")}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="cursor-pointer text-sm font-normal">Daily</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="cursor-pointer text-sm font-normal">Weekly</Label>
            </div>
          </RadioGroup>
        </div>
      }
    />
  );
}
