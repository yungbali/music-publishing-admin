import React from "react";

type BounceCardProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const BounceCard: React.FC<BounceCardProps> = ({ className = "", style = {}, children }) => {
  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        animation: "bounceIn 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        ...style
      }}
      tabIndex={0}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.animation = "bounceIn 0.7s cubic-bezier(.68,-0.55,.27,1.55)";
      }}
      onAnimationEnd={e => {
        (e.currentTarget as HTMLElement).style.animation = "";
      }}
    >
      {children}
      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.95);
          }
          60% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BounceCard; 