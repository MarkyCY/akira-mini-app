interface ArrowIconProps {
    className?: string;
  }
  
  export default function CheckIcon({ className }: ArrowIconProps) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-up ${className || ""}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l5 5l10 -10" />
      </svg>
    );
  }
  