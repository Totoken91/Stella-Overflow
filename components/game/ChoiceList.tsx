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
    <div className="absolute bottom-36 left-0 right-0 z-40 flex justify-center">
      <div className="flex max-w-2xl flex-col gap-3 px-4">
        {choices.map((choice) => (
          <button
            key={choice.index}
            onClick={() => onChoice(choice.index)}
            className="rounded border border-[var(--pink-accent)] border-opacity-50
                       bg-[var(--pink-dark)] bg-opacity-80 px-6 py-3
                       font-mono text-sm text-[var(--cream)]
                       transition-all hover:border-opacity-100
                       hover:bg-opacity-100 hover:shadow-lg hover:shadow-[var(--pink-accent)]/20"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
