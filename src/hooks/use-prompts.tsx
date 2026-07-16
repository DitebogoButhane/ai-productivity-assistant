import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { DEFAULT_PROMPTS, type ToolId } from "@/lib/prompts";

type PromptsContextValue = {
  prompts: Record<ToolId, string>;
  setPrompt: (tool: ToolId, value: string) => void;
  resetPrompt: (tool: ToolId) => void;
};

const PromptsContext = createContext<PromptsContextValue | null>(null);

export function PromptsProvider({ children }: { children: ReactNode }) {
  const [prompts, setPrompts] = useState<Record<ToolId, string>>({ ...DEFAULT_PROMPTS });

  const setPrompt = useCallback((tool: ToolId, value: string) => {
    setPrompts((p) => ({ ...p, [tool]: value }));
  }, []);
  const resetPrompt = useCallback((tool: ToolId) => {
    setPrompts((p) => ({ ...p, [tool]: DEFAULT_PROMPTS[tool] }));
  }, []);

  return (
    <PromptsContext.Provider value={{ prompts, setPrompt, resetPrompt }}>
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const ctx = useContext(PromptsContext);
  if (!ctx) throw new Error("usePrompts must be used inside PromptsProvider");
  return ctx;
}
