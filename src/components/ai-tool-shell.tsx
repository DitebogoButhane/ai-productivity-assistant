import { useState } from "react";
import { Copy, Loader2, RotateCcw, Sparkles, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Disclaimer } from "@/components/disclaimer";
import { usePrompts } from "@/hooks/use-prompts";
import type { ToolId } from "@/lib/prompts";

type Props = {
  toolId: ToolId;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  extras?: React.ReactNode;
  buildInput?: (userInput: string) => string;
};

export function AiToolShell({
  toolId,
  title,
  description,
  inputLabel,
  inputPlaceholder,
  extras,
  buildInput,
}: Props) {
  const { prompts, setPrompt, resetPrompt } = usePrompts();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: prompts[toolId],
          input: buildInput ? buildInput(input) : input,
        }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        if (res.status === 429) toast.error("Rate limit reached. Please wait a moment.");
        else if (res.status === 402) toast.error("AI credits exhausted. Please add credits.");
        else toast.error(msg || "Something went wrong");
        setLoading(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Disclaimer />

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{inputLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {extras}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="min-h-[180px] rounded-xl"
          />

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
                Edit AI prompt
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-3">
              <Textarea
                value={prompts[toolId]}
                onChange={(e) => setPrompt(toolId, e.target.value)}
                className="min-h-[160px] rounded-xl font-mono text-xs"
              />
              <Button variant="outline" size="sm" onClick={() => resetPrompt(toolId)}>
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                Reset prompt
              </Button>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex flex-wrap gap-2">
            <Button onClick={generate} disabled={loading || !input.trim()} className="rounded-xl">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {loading ? "Generating…" : "Generate"}
            </Button>
            <Button variant="outline" onClick={clear} disabled={loading} className="rounded-xl">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {(output || loading) && (
        <Card className="rounded-2xl border-primary/20 bg-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Result</CardTitle>
              <CardDescription>AI-generated response</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={copy} disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </CardHeader>
          <CardContent>
            {output ? (
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {output}
              </pre>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking…
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
