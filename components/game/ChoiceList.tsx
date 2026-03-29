"use client";

interface Choice {
  text: string;
  index: number;
}

interface ChoiceListProps {
  choices: Choice[];
  onChoice: (index: number) => void;
}

export default function ChoiceList({ choices, onChoice }: ChoiceListProps) {
  if (choices.length === 0) return null;

  return (
    <div className="absolute bottom-56 left-0 right-0 z-40 flex justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-2 px-4">
        {choices.map((choice) => (
          <button
            key={choice.index}
            onClick={() => onChoice(choice.index)}
            className="w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all hover:shadow-md"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 143, 171, 0.2)",
              borderLeft: "4px solid",
              borderImage:
                "linear-gradient(to bottom, var(--pink-deep), var(--teal)) 1",
              padding: "0.9rem 1.5rem",
              fontFamily: "var(--font-playfair)",
              fontSize: "0.95rem",
              color: "var(--foreground)",
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
