import React, { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, BookOpen, Moon } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function BlogPage() {
  const [match, params] = useRoute<{ id: string }>("/blog/:id");
  const [, setLocation] = useLocation();
  const [readingMode, setReadingMode] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!match || !params?.id) return null;

  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Post not found</h1>
          <button
            onClick={() => setLocation("/")}
            className="text-gray-400 hover:text-white flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Determine colors based on themeColor
  const getGradient = () => {
    switch (post.themeColor) {
      case "orange":
        return "from-orange-900/40 via-[#050505] to-[#050505]";
      case "emerald":
        return "from-emerald-900/40 via-[#050505] to-[#050505]";
      case "indigo":
        return "from-indigo-900/40 via-[#050505] to-[#050505]";
      case "rose":
        return "from-rose-900/40 via-[#050505] to-[#050505]";
      default:
        return "from-zinc-900/40 via-[#050505] to-[#050505]";
    }
  };

  const getGlow = () => {
    switch (post.themeColor) {
      case "orange":
        return "bg-orange-500/20";
      case "emerald":
        return "bg-emerald-500/20";
      case "indigo":
        return "bg-indigo-500/20";
      case "rose":
        return "bg-rose-500/20";
      default:
        return "bg-zinc-500/20";
    }
  };

  const getAccentText = () => {
    switch (post.themeColor) {
      case "orange":
        return "text-orange-400";
      case "emerald":
        return "text-emerald-400";
      case "indigo":
        return "text-indigo-400";
      case "rose":
        return "text-rose-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${readingMode ? "bg-[#fdf6e3] text-[#433f38]" : "bg-[#050505] text-gray-300"}`}
    >
      {/* Header Section with Rough Gradient */}
      <header className="relative w-full pt-32 pb-20 overflow-hidden border-b border-white/5">
        {!readingMode && (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-b ${getGradient()} opacity-80`}
            ></div>
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ${getGlow()} rounded-full blur-[120px] pointer-events-none`}
            ></div>
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
            className={`mb-12 flex items-center gap-2 text-sm font-medium transition-colors ${readingMode ? "text-[#837a6b] hover:text-[#433f38]" : "text-gray-400 hover:text-white"}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-sm font-semibold uppercase tracking-wider ${readingMode ? "text-[#b58900]" : getAccentText()}`}
            >
              {post.type}
            </span>
            {post.tag && (
              <>
                <span
                  className={`w-1 h-1 rounded-full ${readingMode ? "bg-[#b58900]" : "bg-white/20"}`}
                ></span>
                <span
                  className={`text-sm ${readingMode ? "text-[#837a6b]" : "text-gray-400"}`}
                >
                  {post.tag}
                </span>
              </>
            )}
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6 ${readingMode ? "text-[#073642]" : "text-white"}`}
          >
            {post.title}
          </h1>

          {post.stat && (
            <div className="mb-6">
              <span
                className={`text-6xl font-light tracking-tighter ${readingMode ? "text-[#cb4b16]" : "text-white"}`}
              >
                {post.stat}
              </span>
            </div>
          )}

          <p
            className={`text-xl leading-relaxed ${readingMode ? "text-[#586e75]" : "text-gray-400"}`}
          >
            {post.description}
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${readingMode ? "bg-[#fdf6e3]/90 border-[#eee8d5]" : "bg-[#050505]/80 border-white/5"}`}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-end">
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${readingMode ? "bg-[#eee8d5] text-[#586e75] hover:bg-[#e4dfcb]" : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"}`}
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
        {post.videoUrl && (
          <div className="mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
            <video
              src={post.videoUrl}
              controls
              className="w-full aspect-video object-cover bg-black"
              poster={`https://picsum.photos/seed/${post.id}/1280/720`}
            />
          </div>
        )}

        <article
          className={`prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed
            ${
              readingMode
                ? "prose-headings:text-[#073642] prose-p:text-[#433f38] prose-strong:text-[#073642] prose-li:text-[#433f38]"
                : "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300"
            }
          `}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
