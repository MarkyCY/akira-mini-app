interface IconProps {
    className?: string;
  }
  
  export default function ShareIcon({ className }: IconProps) {
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
        <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" />
      </svg>
    );
  }
  