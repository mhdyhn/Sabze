import { cn } from "@/lib/utils";

export type ProcessVariant = "harvest" | "wash" | "dry" | "pack";

/**
 * Custom line-art illustrations for the production process.
 * Deliberately abstract & geometric to match the Quiet Luxury art direction.
 */
export function ProcessArt({
  variant,
  className,
  title,
}: {
  variant: ProcessVariant;
  className?: string;
  title: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label={title}
      className={cn("h-auto w-full", className)}
    >
      {/* backdrop */}
      <rect x="8" y="8" width="224" height="224" rx="112" fill="#F1EBDD" />
      <rect x="8" y="8" width="224" height="224" rx="112" fill="none" stroke="#1F3D2B" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="5 7" />
      <circle cx="120" cy="120" r="86" fill="#FAF7F0" stroke="#1F3D2B" strokeOpacity="0.18" strokeWidth="1.5" />
      {/* corner sprigs */}
      <g stroke="#B98A2F" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M52 66c-6-8-14-12-24-13 1.5 10 7 17 16 20" fill="none" />
        <path d="M188 174c6 8 14 12 24 13-1.5-10-7-17-16-20" fill="none" />
      </g>
      <circle cx="52" cy="182" r="3" fill="#B98A2F" opacity="0.7" />
      <circle cx="188" cy="58" r="3" fill="#B98A2F" opacity="0.7" />

      <g
        stroke="#1F3D2B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {variant === "harvest" && (
          <g>
            <circle cx="120" cy="82" r="9" fill="#1F3D2B" stroke="none" opacity="0.9" />
            <circle cx="103" cy="96" r="9" fill="#1F3D2B" stroke="none" opacity="0.75" />
            <circle cx="137" cy="96" r="9" fill="#1F3D2B" stroke="none" opacity="0.75" />
            <circle cx="112" cy="112" r="9" fill="#1F3D2B" stroke="none" opacity="0.6" />
            <circle cx="128" cy="112" r="9" fill="#1F3D2B" stroke="none" opacity="0.6" />
            <path d="M120 73c-1-8-6-13-14-15" stroke="#B98A2F" />
            <path d="M86 132h68l-8 34a8 8 0 0 1-8 6H102a8 8 0 0 1-8-6l-8-34Z" />
            <path d="M92 146h56" strokeOpacity="0.4" />
            <path d="M78 132h84" />
          </g>
        )}

        {variant === "wash" && (
          <g>
            <path d="M120 66c7 10 12 16 12 23a12 12 0 0 1-24 0c0-7 5-13 12-23Z" />
            <path d="M94 84c5 7 8.5 11.5 8.5 16a8.5 8.5 0 0 1-17 0c0-4.5 3.5-9 8.5-16Z" strokeOpacity="0.55" />
            <path d="M146 84c5 7 8.5 11.5 8.5 16a8.5 8.5 0 0 1-17 0c0-4.5 3.5-9 8.5-16Z" strokeOpacity="0.55" />
            <path d="M76 128h88c0 26-20 44-44 44s-44-18-44-44Z" />
            <path d="M88 142c8-5 16-5 24 0s16 5 24 0 14-4 16-2" stroke="#B98A2F" />
            <path d="M104 172h32" />
          </g>
        )}

        {variant === "dry" && (
          <g>
            <circle cx="162" cy="74" r="10" stroke="#B98A2F" />
            <g stroke="#B98A2F" strokeWidth="3">
              <path d="M162 56v-6M162 98v-6M144 74h-6M186 74h-6M149 61l-4-4M179 91l-4-4M175 61l4-4M145 91l4-4" />
            </g>
            <path d="M70 112h100M70 136h100M70 160h100" />
            <path d="M78 112v48M162 112v48" strokeOpacity="0.45" />
            <circle cx="95" cy="124" r="5" fill="#1F3D2B" stroke="none" opacity="0.7" />
            <circle cx="120" cy="124" r="5" fill="#1F3D2B" stroke="none" opacity="0.7" />
            <circle cx="145" cy="124" r="5" fill="#1F3D2B" stroke="none" opacity="0.7" />
            <circle cx="107" cy="148" r="5" fill="#1F3D2B" stroke="none" opacity="0.55" />
            <circle cx="132" cy="148" r="5" fill="#1F3D2B" stroke="none" opacity="0.55" />
          </g>
        )}

        {variant === "pack" && (
          <g>
            <path d="M84 104h52v56H84z" />
            <path d="M84 104l12-14h52l-12 14" />
            <path d="M136 104v56" strokeOpacity="0.4" />
            <path d="M104 118v28M116 118v28" strokeOpacity="0.4" />
            <circle cx="158" cy="150" r="20" fill="#FAF7F0" />
            <path d="M149 150l6.5 6.5L168 144" stroke="#B98A2F" />
            <path d="M84 84h24" stroke="#B98A2F" />
            <circle cx="158" cy="104" r="3" fill="#B98A2F" stroke="none" />
          </g>
        )}
      </g>
    </svg>
  );
}
