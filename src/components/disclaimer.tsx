import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-accent/40 p-4 text-sm text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>
        AI-generated content can be incomplete or inaccurate. Always review outputs before using
        them for professional or business decisions.
      </p>
    </div>
  );
}
