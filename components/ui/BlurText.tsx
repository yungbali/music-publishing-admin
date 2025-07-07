import React from "react";

type BlurTextProps = {
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const BlurText: React.FC<BlurTextProps> = ({ as = "span", className = "", children, style }) => {
  const Tag = as as any;
  return (
    <Tag
      className={className}
      style={{
        display: "inline-block",
        opacity: 0,
        filter: "blur(8px)",
        animation: "blurTextIn 0.8s forwards",
        ...style
      }}
    >
      {children}
      <style jsx>{`
        @keyframes blurTextIn {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </Tag>
  );
};

export default BlurText; 