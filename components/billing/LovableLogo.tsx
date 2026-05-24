export function LovableLogo({ className = "shrink-0 size-11 p-1" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Lovable"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask id="lv-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="24" style={{ maskType: "alpha" }}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.89785 0C10.7074 0 13.7957 3.17898 13.7957 7.10046V9.79908H16.0913C19.9009 9.79908 22.9892 12.9781 22.9892 16.8995C22.9892 20.821 19.9009 24 16.0913 24H0V7.10046C0 3.17898 3.08827 0 6.89785 0Z"
          fill="url(#lv-gradient)"
        />
      </mask>
      <g mask="url(#lv-mask)">
        <g filter="url(#lv-f0)">
          <ellipse cx="10.0844" cy="12.8114" rx="15.5619" ry="15.9769" fill="#4B73FF" />
        </g>
        <g filter="url(#lv-f1)">
          <ellipse cx="11.7941" cy="4.04332" rx="19.9306" ry="15.9769" fill="#FF66F4" />
        </g>
        <g filter="url(#lv-f2)">
          <ellipse cx="15.0451" cy="1.037" rx="15.5619" ry="14.0311" fill="#FF0105" />
        </g>
        <g filter="url(#lv-f3)">
          <ellipse cx="12.071" cy="4.03913" rx="9.35889" ry="9.60846" fill="#FE7B02" />
        </g>
      </g>
      <defs>
        <filter id="lv-f0" x="-12.6378" y="-10.3257" width="45.4442" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.58011" result="effect1_foregroundBlur" />
        </filter>
        <filter id="lv-f1" x="-15.2967" y="-19.0938" width="54.1815" height="46.2743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.58011" result="effect1_foregroundBlur" />
        </filter>
        <filter id="lv-f2" x="-7.67707" y="-20.1544" width="45.4442" height="42.3827" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.58011" result="effect1_foregroundBlur" />
        </filter>
        <filter id="lv-f3" x="-4.44806" y="-12.7296" width="33.0382" height="33.5375" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="3.58011" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id="lv-gradient" x1="7.73627" y1="4.21757" x2="15.0724" y2="23.8669" gradientUnits="userSpaceOnUse">
          <stop offset="0.025" stopColor="#FF8E63" />
          <stop offset="0.56" stopColor="#FF7EB0" />
          <stop offset="0.95" stopColor="#4B73FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
