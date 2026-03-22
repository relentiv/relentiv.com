import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Moon } from "lucide-react";
import PageSeo from "../components/PageSeo";

export default function PrivacyPolicyPage() {
  const [, setLocation] = useLocation();
  const [readingMode, setReadingMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        readingMode ? "bg-[#fdf6e3] text-[#433f38]" : "bg-[#050505] text-gray-300"
      }`}
    >
      <PageSeo
        title="Privacy Policy"
        description="Read Relentiv’s privacy policy and learn how information is handled across our website and services."
        path="/privacy-policy"
      />
      {/* Header Section with Rough Gradient */}
      <header className="relative w-full pt-32 pb-20 overflow-hidden border-b border-white/5">
        {!readingMode && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-[#050505] to-[#050505] opacity-80"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            {/* Noise */}
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </>
        )}

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <button
            onClick={() => setLocation("/")}
            className={`mb-12 flex items-center gap-2 text-sm font-medium transition-colors ${
              readingMode
                ? "text-[#837a6b] hover:text-[#433f38]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-sm font-semibold uppercase tracking-wider ${
                readingMode ? "text-[#b58900]" : "text-zinc-400"
              }`}
            >
              Legal
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6 ${
              readingMode ? "text-[#073642]" : "text-white"
            }`}
          >
            Privacy Policy
          </h1>

          <p
            className={`text-xl leading-relaxed ${
              readingMode ? "text-[#586e75]" : "text-gray-400"
            }`}
          >
            Last updated: March 19, 2026. Please read this privacy policy carefully before using our services.
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          readingMode
            ? "bg-[#fdf6e3]/90 border-[#eee8d5]"
            : "bg-[#050505]/80 border-white/5"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-end">
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              readingMode
                ? "bg-[#eee8d5] text-[#586e75] hover:bg-[#e4dfcb]"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
            title="Toggle Reading Mode"
          >
            {readingMode ? (
              <>
                <Moon className="w-4 h-4" /> Dark Mode
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" /> Reading Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <article
          className={`prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed
            ${
              readingMode
                ? "prose-headings:text-[#073642] prose-p:text-[#433f38] prose-strong:text-[#073642] prose-li:text-[#433f38]"
                : "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300"
            }
          `}
        >
          <h2>1. Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>2. Data Collection</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <ul>
            <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</li>
            <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</li>
            <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</li>
          </ul>

          <h2>3. How We Use Information</h2>
          <p>We use collected information to respond to inquiries, evaluate project fit, improve website performance, and support ongoing client communication. We do not sell personal data.</p>

          <h2>4. Data Retention</h2>
          <p>We retain inquiry and project information for as long as needed to manage business operations, satisfy contractual obligations, and meet legal or compliance requirements.</p>

          <h2>5. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal information by contacting us. Where applicable, you may also object to processing or request data portability.</p>

          <h2>6. Contact</h2>
          <p>For privacy-related questions or requests, contact Relentiv at contact@relentiv.com.</p>
        </article>
      </main>
    </div>
  );
}
