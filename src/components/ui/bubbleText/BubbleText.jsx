import React, { useEffect } from "react";

const BubbleText = ({ children }) => {
  useEffect(() => {
    const spans = document.querySelectorAll(".hover-text span");

    spans.forEach((span) => {
      span.addEventListener("mouseenter", function () {
        this.style.fontWeight = "400";
        this.style.color = "rgb(117,117,117)";

        const leftNeighbor = this.previousElementSibling;
        const rightNeighbor = this.nextElementSibling;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "500";
          leftNeighbor.style.color = "rgb(117,117,117)";
        }
        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "500";
          rightNeighbor.style.color = "rgb(117,117,117)";
        }
      });

      span.addEventListener("mouseleave", function () {
        this.style.fontWeight = "700";
        this.style.color = "rgb(0,0,0)";

        const leftNeighbor = this.previousElementSibling;
        const rightNeighbor = this.nextElementSibling;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "700";
          leftNeighbor.style.color = "rgb(0,0,0)";
        }

        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "700";
          rightNeighbor.style.color = "rgb(0,0,0)";
        }
      });
    });
  }, []);

  return (
    <h2 className="hover-text text-center text-5xl font-bold text-[rgb(0,0,0)] mb-4">
      <Text>{children}</Text>
    </h2>
  );
};

const Text = ({ children }) => {
  return (
    <>
      {children.split("").map((child, idx) => (
        <span
          key={idx}
          style={{ transition: "0.35s font-weight, 0.35s color" }}
        >
          {child}
        </span>
      ))}
    </>
  );
};

export default BubbleText;
