"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Explain Ghalib's most famous verse",
  "What is the difference between a ghazal and a nazm?",
  "Translate a verse by Faiz Ahmed Faiz",
  "Who was Allama Iqbal and what made his poetry unique?",
  "Recommend a poem about love in Urdu",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to get response.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream.");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;

          try {
            const { text } = JSON.parse(data);
            if (text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + text } : m
                )
              );
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      // Remove the empty assistant message on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [messages, streaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setStreaming(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          /* Welcome state */
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-16">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center mb-5 opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">UrduNazm AI</h2>
            <p className="text-[14px] text-muted max-w-sm mb-8 leading-relaxed">
              Ask me anything about Urdu poetry — verses, poets, translations, or literary concepts.
            </p>
            {/* Suggested prompts */}
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[12px] px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-accent/30 hover:text-accent transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[720px] mx-auto px-4 py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Assistant avatar */}
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center flex-shrink-0 mt-1 opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] text-white rounded-tr-sm"
                      : "bg-card border border-border text-foreground/90 rounded-tl-sm"
                  }`}
                >
                  {message.content || (
                    /* Typing indicator */
                    <span className="flex items-center gap-1 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-[720px] w-full px-4 mb-2">
          <p className="text-[13px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        </div>
      )}

      {/* Input bar */}
      <div className="border-t border-border bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="max-w-[720px] mx-auto px-4 py-4">
          <div className="flex items-end gap-3 bg-surface border border-border rounded-2xl px-4 py-3 focus-within:border-accent/40 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a poem, poet, or verse..."
              aria-label="Chat message"
              rows={1}
              disabled={streaming}
              className="flex-1 text-[14px] bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed min-h-[24px] max-h-[160px] disabled:opacity-60"
            />

            {streaming ? (
              <button
                type="button"
                onClick={handleStop}
                aria-label="Stop generating"
                className="w-8 h-8 rounded-full bg-surface-hover border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-30 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            )}
          </div>
          <p className="text-[11px] text-dimmed text-center mt-2">
            Press Enter to send · Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}
