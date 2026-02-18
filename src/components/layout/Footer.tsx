import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="금은동"
                width={120}
                height={37}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              충북대학교 금융권 취업 동아리
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-medium uppercase tracking-wider text-gold mb-3">
              Contact
            </h4>
            <a
              href="mailto:cbnu.gold@gmail.com"
              className="text-sm text-gray-500 hover:text-gold transition-colors"
            >
              cbnu.gold@gmail.com
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/cbnu_gold/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://cafe.naver.com/cufaclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors text-sm font-bold"
              aria-label="Naver Cafe"
            >
              N
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-gold mt-8 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} 금은동. All rights reserved.</p>
          <p>Designed &amp; Built by 이찬희</p>
        </div>
      </div>
    </footer>
  );
}
