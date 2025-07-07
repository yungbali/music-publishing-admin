import React from "react";

type AnimatedListProps<T> = {
  items: T[];
  children: (item: T, i: number) => React.ReactNode;
};

function AnimatedList<T>({ items, children }: AnimatedListProps<T>) {
  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            animation: `fadeListIn 0.6s forwards`,
            animationDelay: `${i * 0.08}s`,
          }}
        >
          {children(item, i)}
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeListIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedList; 