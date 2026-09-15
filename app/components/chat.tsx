"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, MessageCircle, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
const starters = [
  "What projects has he built?",
  "What are his core skills?",
  "Tell me about his experience",
  "How can I contact him?",
];

export default function Chat() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const request = useRef<AbortController | null>(null);
  const pending = useRef(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"resume" | "ai">("resume");

  function open() {
    previousFocus.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    input.current?.focus();
  }
  function close() {
    dialog.current?.close();
  }
  useEffect(() => {
    const listener = () => open();
    window.addEventListener("open-portfolio-chat", listener);
    void fetch("/api/chat")
      .then((response) => response.json())
      .then((result) => {
        const status = result as { mode?: string };
        if (status.mode === "ai") setMode("ai");
      })
      .catch(() => {});
    return () => {
      window.removeEventListener("open-portfolio-chat", listener);
      request.current?.abort();
    };
  }, []);
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy]);

  async function send(question: string) {
    const content = question.trim();
    if (!content || pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    setDraft("");
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
        signal: controller.signal,
      });
      const result = (await response.json()) as {
        answer: string;
        mode: "resume" | "ai";
        error?: string;
      };
      if (!response.ok)
        throw new Error(
          result.error || "The assistant couldn’t respond. Please try again.",
        );
      setMessages([...next, { role: "assistant", content: result.answer }]);
      setMode(result.mode);
    } catch (failure) {
      setError(
        failure instanceof Error && failure.name !== "AbortError"
          ? failure.message
          : "The request timed out. Please try again.",
      );
      setDraft(content);
      setMessages(messages);
    } finally {
      clearTimeout(timeout);
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={open}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-[#3345ca]"
        aria-label="Ask about Piyush"
      >
        <MessageCircle size={22} />
      </button>
      <dialog
        ref={dialog}
        onClose={() => previousFocus.current?.focus()}
        aria-labelledby="chat-title"
        className="fixed inset-auto bottom-4 right-4 m-0 w-[min(410px,calc(100vw-32px))] max-w-none rounded-2xl border border-black/10 bg-background p-0 text-foreground backdrop:bg-black/20"
      >
        <div className="flex h-[min(620px,85dvh)] flex-col">
          <header className="flex items-center justify-between border-b border-black/10 p-5">
            <div>
              <h2 id="chat-title" className="text-lg tracking-tight">
                Ask about Piyush
              </h2>
              <p className="mt-1 text-xs text-black/60">
                Answers based on Piyush’s résumé
              </p>
            </div>
            <button
              onClick={close}
              aria-label="Close assistant"
              className="rounded-full p-2 hover:bg-black/5"
            >
              <X size={20} />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-5">
            <p className="mb-5 max-w-[290px] text-base leading-relaxed">
              Hi. Explore Piyush’s work, skills and background. What would you
              like to know?
            </p>
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                {starters.map((question) => (
                  <button
                    key={question}
                    onClick={() => void send(question)}
                    disabled={busy}
                    className="flex items-center justify-between gap-3 rounded-lg border border-black/15 px-3 py-3 text-left text-sm hover:border-accent hover:text-accent disabled:opacity-50"
                  >
                    {question}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
            <div
              role="log"
              aria-label="Conversation"
              aria-live="polite"
              className="space-y-4"
            >
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={
                    message.role === "user"
                      ? "ml-8 rounded-xl bg-[#e9ebf7] p-3 text-sm leading-relaxed"
                      : "mr-3 whitespace-pre-wrap break-words text-sm leading-relaxed"
                  }
                >
                  <span className="sr-only">
                    {message.role === "user" ? "You: " : "Assistant: "}
                  </span>
                  {message.content}
                </div>
              ))}
              {busy && (
                <p role="status" className="text-sm text-black/55">
                  Checking the résumé…
                </p>
              )}
            </div>
            <div ref={bottom} />
          </div>
          {error && (
            <p role="alert" className="px-5 pb-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
            className="border-t border-black/10 p-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-black/15 py-2 pl-4 pr-2">
              <label htmlFor="chat-question" className="sr-only">
                Your question about Piyush
              </label>
              <input
                ref={input}
                id="chat-question"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={800}
                disabled={busy}
                placeholder="Ask a question…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send question"
                className="rounded-full bg-foreground p-2 text-white disabled:opacity-30"
              >
                <ArrowUp size={18} />
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-black/60">
              {mode === "ai"
                ? "AI assistant · Verified résumé answers"
                : "Résumé mode · Answers to common questions"}
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}

export function AskButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-portfolio-chat"))}
      className="inline-flex items-center gap-3 border-b border-current pb-2 text-sm transition-opacity hover:opacity-70"
    >
      Ask my AI assistant <ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
}
