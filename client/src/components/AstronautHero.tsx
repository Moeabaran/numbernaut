/**
 * AstronautHero — decorative SVG illustration
 * A friendly flat-style "numbernaut" floating among numerals and stars.
 * Pure vector, no external assets, matches the Northern Expedition palette
 * (forest green, amber, parchment).
 */
export default function AstronautHero({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration d'un astronaute entoure de chiffres flottants"
    >
      <circle cx="240" cy="240" r="190" stroke="#F4EDE1" strokeOpacity="0.15" strokeWidth="1.5" />
      <circle cx="240" cy="240" r="150" stroke="#F4EDE1" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="4 8" />

      <circle cx="70" cy="90" r="3" fill="#F4EDE1" fillOpacity="0.6" />
      <circle cx="410" cy="120" r="2.5" fill="#F4EDE1" fillOpacity="0.5" />
      <circle cx="90" cy="380" r="2.5" fill="#F4EDE1" fillOpacity="0.5" />
      <circle cx="420" cy="360" r="3.5" fill="#F4EDE1" fillOpacity="0.6" />
      <circle cx="240" cy="40" r="2" fill="#F4EDE1" fillOpacity="0.45" />
      <circle cx="60" cy="240" r="2" fill="#F4EDE1" fillOpacity="0.45" />

      <g fontFamily="Georgia, serif" fontWeight="700" fill="#E8A33D" opacity="0.9">
        <text x="55" y="150" fontSize="26">7</text>
        <text x="395" y="200" fontSize="30">3</text>
        <text x="120" y="420" fontSize="24">9</text>
        <text x="360" y="410" fontSize="22">5</text>
        <text x="230" y="70" fontSize="20">2</text>
      </g>

      <circle cx="370" cy="330" r="26" fill="#E8A33D" fillOpacity="0.18" />
      <circle cx="370" cy="330" r="26" stroke="#E8A33D" strokeOpacity="0.5" strokeWidth="1.5" />
      <ellipse cx="370" cy="330" rx="38" ry="8" stroke="#E8A33D" strokeOpacity="0.4" strokeWidth="1.5" />

      <rect x="196" y="188" width="88" height="110" rx="18" fill="#0B3D2E" />

      <path d="M240 300 C 210 330, 190 360, 175 385" stroke="#E8A33D" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="3 6" fill="none" />

      <path
        d="M175 250c0-46 29-84 65-84s65 38 65 84v70c0 30-24 55-65 55s-65-25-65-55v-70z"
        fill="#F4EDE1"
      />
      <path
        d="M175 250c0-46 29-84 65-84v209c-41 0-65-25-65-55v-70z"
        fill="#F4EDE1"
        opacity="0.6"
      />

      <rect x="216" y="240" width="48" height="34" rx="6" fill="#0B3D2E" opacity="0.85" />
      <circle cx="228" cy="257" r="4" fill="#E8A33D" />
      <circle cx="242" cy="257" r="4" fill="#F4EDE1" />
      <circle cx="256" cy="257" r="4" fill="#E8A33D" />

      <path d="M178 230c-22 8-38 28-40 54" stroke="#F4EDE1" strokeWidth="26" strokeLinecap="round" />
      <path d="M302 230c22 12 34 34 32 60" stroke="#F4EDE1" strokeWidth="26" strokeLinecap="round" />
      <circle cx="136" cy="288" r="15" fill="#E8A33D" />
      <circle cx="336" cy="294" r="15" fill="#E8A33D" />

      <path d="M208 320c-4 26-8 48-4 66" stroke="#F4EDE1" strokeWidth="24" strokeLinecap="round" />
      <path d="M272 320c4 26 8 48 4 66" stroke="#F4EDE1" strokeWidth="24" strokeLinecap="round" />
      <rect x="188" y="382" width="34" height="20" rx="8" fill="#0B3D2E" />
      <rect x="258" y="382" width="34" height="20" rx="8" fill="#0B3D2E" />

      <circle cx="240" cy="188" r="62" fill="#F4EDE1" />
      <circle cx="240" cy="188" r="62" stroke="#0B3D2E" strokeOpacity="0.08" strokeWidth="2" />
      <ellipse cx="248" cy="188" rx="42" ry="38" fill="#0B3D2E" />
      <path d="M218 168c8-14 24-22 40-22" stroke="#E8A33D" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <text x="228" y="200" fontFamily="Georgia, serif" fontWeight="700" fontSize="28" fill="#F4EDE1" opacity="0.85">
        N
      </text>

      <path d="M240 126c0-10 4-18 10-22" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" />
      <circle cx="252" cy="100" r="5" fill="#E8A33D" />
    </svg>
  );
}
