import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-bold text-slate-50">
              CBNU GOLD
            </Link>
            <p className="text-sm text-slate-400 mt-1">
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
              className="text-sm text-slate-400 hover:text-gold transition-colors"
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
              className="text-slate-400 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://cafe.naver.com/cbnugold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-gold transition-colors text-sm font-medium"
              aria-label="Naver Cafe"
            >
              N
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-gold mt-8 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} 금은동. All rights reserved.</p>
          <p>Designed &amp; Built by 이찬희</p>
        </div>
      </div>
    </footer>
  );
}
