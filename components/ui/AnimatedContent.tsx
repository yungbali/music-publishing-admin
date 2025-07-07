import React from "react";

type AnimatedContentProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const AnimatedContent: React.FC<AnimatedContentProps> = ({ className = "", style = {}, children }) => {
  return (
    <div
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        animation: "fadeSlideIn 0.7s forwards",
        ...style
      }}
    >
      {children}
      <style jsx>{`
        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedContent; 