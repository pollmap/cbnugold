"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
  pathname: string;
}

export function MobileNav({ isOpen, onClose, items, pathname }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/98 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-500 hover:text-gold transition-colors"
          aria-label="메뉴 닫기"
        >
          <X size={28} />
        </button>

        {/* Nav items */}
        <nav className="flex flex-col items-center gap-6">
          {items.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`text-2xl font-semibold transition-colors ${
                  isActive ? "text-gold" : "text-gray-700 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/cbnu_gold/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
          <a
            href="https://cafe.naver.com/cufaclub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-colors text-base font-bold"
            aria-label="Naver Cafe"
          >
            N
          </a>
        </div>

        {/* CTA */}
        <Link href="/join" onClick={onClose} className="mt-4">
          <Button size="lg" className="w-64">
            지원하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
