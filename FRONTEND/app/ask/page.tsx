"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const bookThemes: Record<string, {
  name: string;
  emoji: string;
  color: string;
  colorSoft: string;
  colorGlow: string;
  bg: string;
  tradition: string;
  placeholder: string;
}> = {
  gita: {
    name: "Bhagavad Gita",
    emoji: "🕉️",
    color: "#ff6b35",
    colorSoft: "rgba(255,107,53,0.15)",
    colorGlow: "rgba(255,107,53,0.3)",
    bg: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=1920&q=80",
    tradition: "Hinduism",
    placeholder: "Ask Krishna... What should I do when I feel lost?",
  },
  quran: {
    name: "The Quran",
    emoji: "☪️",
    color: "#2ecc71",
    colorSoft: "rgba(46,204,113,0.15)",
    colorGlow: "rgba(46,204,113,0.3)",
    bg: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80",
    tradition: "Islam",
    placeholder: "Seek guidance from Allah... How do I find patience in hardship?",
  },
  bible: {
    name: "The Bible",
    emoji: "✝️",
    color: "#3498db",
    colorSoft: "rgba(52,152,219,0.15)",
    colorGlow: "rgba(52,152,219,0.3)",
    bg: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80",
    tradition: "Christianity",
    placeholder: "Ask God... How do I overcome fear and find strength?",
  },
  torah: {
    name: "The Torah",
    emoji: "✡️",
    color: "#f39c12",
    colorSoft: "rgba(243,156,18,0.15)",
    colorGlow: "rgba(243,156,18,0.3)",
    bg: "https://images.unsplash.com/photo-1548519801-fa717c65f636?w=1920&q=80",
    tradition: "Judaism",
    placeholder: "Seek divine law... How should I treat others with justice?",
  },
  dhammapada: {
    name: "Dhammapada",
    emoji: "☸️",
    color: "#e91e8c",
    colorSoft: "rgba(233,30,140,0.15)",
    colorGlow: "rgba(233,30,140,0.3)",
    bg: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1920&q=80",
    tradition: "Buddhism",
    placeholder: "Ask the Buddha... How do I free myself from suffering?",
  },
  granth: {
    name: "Guru Granth Sahib",
    emoji: "🪯",
    color: "#f5c518",
    colorSoft: "rgba(245,197,24,0.15)",
    colorGlow: "rgba(245,197,24,0.3)",
    bg: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80",
    tradition: "Sikhism",
    placeholder: "Seek the Guru... How do I live with purpose and seva?",
  },
};

function AskContent() {
  const params = useSearchParams();
  const router = useRouter();
  const bookId = params.get("book") || "gita";
  const theme = bookThemes[bookId] || bookThemes.gita;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Array<{reference: string; text: string; score: number}>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setSources([]);
    
    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selected_book: bookId,
          user_question: question,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get guidance");
      }

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setAnswer("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: `url(${theme.bg}) center/cover no-repeat`,
        filter: "blur(10px) brightness(0.2)",
        transform: "scale(1.05)",
      }} />

      {/* Color tint overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: `radial-gradient(ellipse at 50% 0%, ${theme.colorGlow} 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          style={{
            position: "fixed", top: "24px", left: "24px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${theme.color}44`,
            borderRadius: "50px",
            color: theme.color,
            padding: "8px 20px",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          ← BACK
        </button>

        {/* Book Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{theme.emoji}</div>

          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            letterSpacing: "5px",
            color: theme.color,
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            {theme.tradition}
          </p>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#f0e6d3",
            marginBottom: "12px",
          }}>
            {theme.name}
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: "rgba(240,230,211,0.6)",
            fontStyle: "italic",
          }}>
            Ask your question and receive ancient wisdom
          </p>
        </div>

        {/* Question Input */}
        <div style={{ width: "100%", marginBottom: "24px" }}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={theme.placeholder}
            rows={4}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${theme.color}66`,
              borderRadius: "16px",
              padding: "20px 24px",
              color: "#f0e6d3",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              resize: "none",
              outline: "none",
              backdropFilter: "blur(10px)",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = theme.color}
            onBlur={(e) => e.target.style.borderColor = `${theme.color}66`}
          />
        </div>

        {/* Ask Button */}
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          style={{
            background: loading
              ? "rgba(255,255,255,0.1)"
              : `linear-gradient(135deg, ${theme.color}, ${theme.color}99)`,
            border: "none",
            borderRadius: "50px",
            color: loading ? "rgba(240,230,211,0.5)" : "#0a0a0f",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "3px",
            padding: "16px 48px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            marginBottom: "40px",
          }}
        >
          {loading ? "✨ SEEKING WISDOM..." : "✦ SEEK GUIDANCE ✦"}
        </button>

        {/* Answer Box */}
        {error && (
          <div style={{
            width: "100%",
            background: "rgba(255,107,53,0.15)",
            border: "1px solid rgba(255,107,53,0.4)",
            borderLeft: "4px solid #ff6b35",
            borderRadius: "16px",
            padding: "28px 32px",
            backdropFilter: "blur(10px)",
            animation: "fadeIn 0.6s ease",
            marginBottom: "40px",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              color: "#ff6b35",
              lineHeight: 1.9,
            }}>
              ⚠️ {error}
            </p>
          </div>
        )}

        {answer && (
          <div style={{
            width: "100%",
            background: theme.colorSoft,
            border: `1px solid ${theme.color}44`,
            borderLeft: `4px solid ${theme.color}`,
            borderRadius: "16px",
            padding: "28px 32px",
            backdropFilter: "blur(10px)",
            animation: "fadeIn 0.6s ease",
            marginBottom: "40px",
          }}>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              letterSpacing: "4px",
              color: theme.color,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}>
              ✦ Guidance from {theme.name}
            </p>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              color: "#f0e6d3",
              lineHeight: 1.9,
              fontStyle: "italic",
            }}>
              {answer}
            </p>
          </div>
        )}

        {/* Sources Box */}
        {sources.length > 0 && (
          <div style={{
            width: "100%",
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${theme.color}22`,
            borderRadius: "16px",
            padding: "24px 28px",
            backdropFilter: "blur(10px)",
            animation: "fadeIn 0.6s ease",
          }}>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.65rem",
              letterSpacing: "3px",
              color: theme.color,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}>
              📖 Scripture References
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sources.map((source, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${theme.color}11`,
                    borderRadius: "8px",
                    borderLeft: `3px solid ${theme.color}`,
                  }}
                >
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    color: theme.color,
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}>
                    {source.reference}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    color: "rgba(240,230,211,0.7)",
                    lineHeight: 1.6,
                  }}>
                    "{source.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fade in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense>
      <AskContent />
    </Suspense>
  );
}
