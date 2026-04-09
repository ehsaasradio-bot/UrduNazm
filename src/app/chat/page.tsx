import type { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "AI Chat — UrduNazm",
  description:
    "Chat with UrduNazm AI about Urdu poetry. Ask about verses, poets, translations, literary forms, and more.",
  openGraph: {
    title: "AI Chat — UrduNazm",
    description:
      "Chat with UrduNazm AI about Urdu poetry. Ask about verses, poets, translations, literary forms, and more.",
  },
};

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col pt-16">
      <ChatInterface />
    </div>
  );
}
