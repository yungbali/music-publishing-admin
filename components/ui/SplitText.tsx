import React from "react";
import type { CSSProperties } from "react";

type SplitTextProps = {
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  children: string;
  style?: React.CSSProperties;
};

const SplitText: React.FC<SplitTextProps> = ({ as = "span", className = "", children, style }) => {
  const Tag = as as any;
  return (
    <Tag className={className} aria-label={children} style={{ display: "inline-block", overflow: "hidden", ...style }}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(20px)",
            animation: `splitTextFadeIn 0.5s forwards`,
            animationDelay: `${i * 0.04}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <style jsx>{`
        @keyframes splitTextFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Tag>
  );
};

export default SplitText; 