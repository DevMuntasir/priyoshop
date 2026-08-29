import clsx from "clsx";

interface ParagraphProps {
  text: string;
  className?: string;
  lineHeight?: "tight" | "normal" | "relaxed" | "loose";
  paragraphGap?: "sm" | "md" | "lg" | "xl";
}

const lineHeightMap = {
  tight: "leading-6",
  normal: "leading-7",
  relaxed: "leading-8",
  loose: "leading-9",
};

const paragraphGapMap = {
  sm: "mb-4",
  md: "mb-6",
  lg: "mb-8",
  xl: "mb-10",
};

export default function Paragraph({
  text,
  className = "",
  lineHeight = "relaxed",
  paragraphGap = "lg",
}: ParagraphProps) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((item) => item.trim());

  return (
    <div className={clsx("text-ps-black-400 text-ps-body", className)}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(
            lineHeightMap[lineHeight],
            index !== paragraphs.length - 1 &&
            paragraphGapMap[paragraphGap]
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}