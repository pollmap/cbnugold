"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gold/15">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-gray-800 font-medium pr-4 group-hover:text-gold transition-colors">
          {question}
        </span>
        <span className="text-gold shrink-0 transition-transform duration-300">
          {isOpen ? <X size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
}
