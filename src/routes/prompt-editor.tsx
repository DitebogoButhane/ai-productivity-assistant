import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { usePrompts } from "@/hooks/use-prompts";
import { TOOL_META, type ToolId } from "@/lib/prompts";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/prompt-editor")({
  head: () => ({ meta: [{ title: "Prompt Editor — Sage" }] }),
  component: PromptEditorPage,
});

function PromptEditorPage() {
  const { prompts, setPrompt, resetPrompt } = usePrompts();
  const [drafts, setDrafts] = useState(prompts);

  useEffect(() => setDrafts(prompts), [prompts]);

  const save = (tool: ToolId) => {
    setPrompt(tool, drafts[tool]);
    toast.success(`${TOOL_META[tool].title} prompt saved`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Prompt Editor</h1>
        <p className="text-muted-foreground">
          Customize the prompt each AI tool uses. Changes apply for this browser session only.
        </p>
      </div>

      <div className="space-y-4">
        {(Object.keys(TOOL_META) as ToolId[]).map((tool) => (
          <Card key={tool} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{TOOL_META[tool].title}</CardTitle>
              <CardDescription>{TOOL_META[tool].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={drafts[tool]}
                onChange={(e) => setDrafts((d) => ({ ...d, [tool]: e.target.value }))}
                className="min-h-[220px] rounded-xl font-mono text-xs"
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => save(tool)} className="rounded-xl">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetPrompt(tool);
                    toast.success("Reset to default");
                  }}
                  className="rounded-xl"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to default
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
