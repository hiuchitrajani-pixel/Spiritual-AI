"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const books = [
  {
    id: "gita",
    name: "Bhagavad Gita",
    tradition: "Hinduism",
    emoji: "🕉️",
    description: "Divine dialogue of Krishna & Arjuna",
    bg: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=1920&q=80",
    color: "#ff6b35",
  },
  {
    id: "quran",
    name: "The Quran",
    tradition: "Islam",
    emoji: "☪️",
    description: "The eternal word of Allah",
    bg: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80",
    color: "#2ecc71",
  },
  {
    id: "bible",
    name: "The Bible",
    tradition: "Christianity",
    emoji: "✝️",
    description: "The living word of God",
    bg: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80",
    color: "#3498db",
  },
  {
    id: "torah",
    name: "The Torah",
    tradition: "Judaism",
    emoji: "✡️",
    description: "The covenant of divine law",
    bg: "https://images.unsplash.com/photo-1548519801-fa717c65f636?w=1920&q=80",
    color: "#f39c12",
  },
  {
    id: "dhammapada",
    name: "Dhammapada",
    tradition: "Buddhism",
    emoji: "☸️",
    description: "The path of the Buddha's truth",
    bg: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1920&q=80",
    color: "#e91e8c",
  },
  {
    id: "granth",
    name: "Guru Granth Sahib",
    tradition: "Sikhism",
    emoji: "🪯",
    description: "The eternal living Guru",
    bg: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80",
    color: "#f5c518",
  },
];

export default function BookSelector() {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const router = useRouter();

  const activeBg = books.find(b => b.id === (hoveredBook || selectedBook))?.bg;

  const handleSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setTimeout(() => router.push(`/ask?book=${bookId}`), 600);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

      {/* Dynamic Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: activeBg
          ? `url(${activeBg}) center/cover no-repeat`
          : "radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0f 70%)",
        transition: "all 0.8s ease",
        filter: "blur(8px) brightness(0.25)",
        transform: "scale(1.05)",
      }} />

      {/* Gold particle overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.85rem",
            letterSpacing: "6px",
            color: "#c9a84c",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}>
            ✦ Sacred Scriptures AI ✦
          </p>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #f5d07a 0%, #c9a84c 40%, #f5d07a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}>
            Where Ancient Wisdom<br />Meets Modern Seeking
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            color: "rgba(240,230,211,0.7)",
            fontStyle: "italic",
            maxWidth: "500px",
            margin: "0 auto",
          }}>
            Choose your sacred scripture and let timeless guidance illuminate your path
          </p>
        </div>

        {/* Book Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          width: "100%",
        }}>
          {books.map((book) => (
            <div
              key={book.id}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              onClick={() => handleSelect(book.id)}
              style={{
                background: hoveredBook === book.id
                  ? `linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))`
                  : "rgba(255,255,255,0.03)",
                border: hoveredBook === book.id
                  ? `1px solid ${book.color}`
                  : "1px solid rgba(201,168,76,0.2)",
                borderRadius: "20px",
                padding: "32px 24px",
                cursor: "pointer",
                transition: "all 0.4s ease",
                transform: hoveredBook === book.id ? "translateY(-8px) scale(1.02)" : "translateY(0)",
                boxShadow: hoveredBook === book.id
                  ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${book.color}33`
                  : "0 4px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{book.emoji}</div>

              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "4px",
                color: book.color,
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                {book.tradition}
              </p>

              <h3 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "#f0e6d3",
                marginBottom: "10px",
              }}>
                {book.name}
              </h3>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "rgba(240,230,211,0.6)",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}>
                {book.description}
              </p>

              <div style={{
                marginTop: "20px",
                padding: "8px 20px",
                border: `1px solid ${book.color}66`,
                borderRadius: "50px",
                display: "inline-block",
                fontSize: "0.8rem",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "2px",
                color: book.color,
                opacity: hoveredBook === book.id ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}>
                SEEK WISDOM →
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p style={{
          marginTop: "60px",
          fontSize: "0.8rem",
          color: "rgba(201,168,76,0.4)",
          fontFamily: "'Cinzel', serif",
          letterSpacing: "3px",
        }}>
          ✦ ALL FAITHS WELCOME ✦ ALL QUESTIONS HONORED ✦
        </p>
      </div>
    </div>
  );
}
