import React from 'react';

interface BurgerArtProps {
  type?:
    | 'stacked-bacon'
    | 'blt'
    | 'cheeseburger'
    | 'royale-with-cheese'
    | 'crispy-chicken'
    | 'doble-brasa'
    | 'brasa-clasica'
    | 'bacon-bbq'
    | 'spicy-burger'
    | 'brasa-1999'
    | 'hero'
    | 'burger3-macro';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const BurgerArt: React.FC<BurgerArtProps> = ({
  type = 'stacked-bacon',
  className = '',
  size = 'md',
}) => {
  const isTriple = type === 'doble-brasa' || type === 'brasa-1999';
  const isChicken = type === 'crispy-chicken';
  const isBlt = type === 'blt';
  const hasBacon = type === 'stacked-bacon' || type === 'bacon-bbq' || type === 'blt' || type === 'brasa-1999';
  const isSpicy = type === 'spicy-burger';
  const isRoyale = type === 'royale-with-cheese';
  const isMacro = type === 'burger3-macro' || type === 'hero';

  const viewBox = "0 0 500 450";

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: isSpicy 
            ? 'radial-gradient(circle, rgba(197,48,27,0.35) 0%, rgba(229,149,43,0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(229,149,43,0.3) 0%, rgba(197,48,27,0.15) 50%, transparent 70%)'
        }}
      />

      <svg
        viewBox={viewBox}
        className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter transition-transform duration-500 group-hover:scale-[1.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brioche Bun Top Gradient */}
          <radialGradient id={`bunTop-${type}`} cx="45%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#DF9341" />
            <stop offset="45%" stopColor="#BD681E" />
            <stop offset="85%" stopColor="#7E370B" />
            <stop offset="100%" stopColor="#4A1F05" />
          </radialGradient>

          {/* Brioche Bun Bottom Gradient */}
          <linearGradient id={`bunBottom-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D58632" />
            <stop offset="35%" stopColor="#B35E18" />
            <stop offset="85%" stopColor="#75330A" />
            <stop offset="100%" stopColor="#451C05" />
          </linearGradient>

          {/* Bun Highlight Sheen */}
          <linearGradient id="bunGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#E5A65E" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#B35E18" stopOpacity="0" />
          </linearGradient>

          {/* Cheddar Cheese Gradient */}
          <linearGradient id="cheddarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="40%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#E66A00" />
          </linearGradient>

          {/* Smash Patty Crust Gradient */}
          <linearGradient id="smashPattyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4E2313" />
            <stop offset="25%" stopColor="#2D1308" />
            <stop offset="70%" stopColor="#1B0A03" />
            <stop offset="100%" stopColor="#120601" />
          </linearGradient>

          {/* Crispy Chicken Patty Gradient */}
          <linearGradient id="chickenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8A348" />
            <stop offset="40%" stopColor="#BF731F" />
            <stop offset="100%" stopColor="#7D400A" />
          </linearGradient>

          {/* Bacon Gradient */}
          <linearGradient id="baconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A1D16" />
            <stop offset="35%" stopColor="#D85E52" />
            <stop offset="65%" stopColor="#7A1D16" />
            <stop offset="100%" stopColor="#4A100B" />
          </linearGradient>

          {/* Brasa Red Sauce */}
          <linearGradient id="brasaSauceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E63920" />
            <stop offset="70%" stopColor="#A81B09" />
            <stop offset="100%" stopColor="#630D03" />
          </linearGradient>

          {/* Crispy Onion Golden */}
          <linearGradient id="crispyOnionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5C065" />
            <stop offset="100%" stopColor="#A66718" />
          </linearGradient>

          {/* Filter for cast shadow */}
          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Base Table Shadow */}
        <ellipse cx="250" cy="415" rx="190" ry="24" fill="#000000" opacity="0.75" />
        <ellipse cx="250" cy="410" rx="140" ry="15" fill="#000000" opacity="0.9" />

        {/* BOTTOM BUN (Heel) */}
        <g id="bottom-bun">
          {/* Bun underside shadow */}
          <ellipse cx="250" cy="385" rx="170" ry="32" fill="#381503" />
          {/* Bun body */}
          <path
            d="M 80,360 C 80,395 140,410 250,410 C 360,410 420,395 420,360 C 420,345 370,335 250,335 C 130,335 80,345 80,360 Z"
            fill={`url(#bunBottom-${type})`}
            filter="url(#shadowFilter)"
          />
          {/* Toasted crumb rim highlight */}
          <ellipse cx="250" cy="342" rx="160" ry="14" fill="#F0B56A" opacity="0.35" />
        </g>

        {/* BOTTOM SAUCE SPREAD */}
        <path
          d="M 120,344 Q 180,350 250,343 Q 320,352 380,345 Q 330,340 250,338 Q 170,340 120,344 Z"
          fill="url(#brasaSauceGrad)"
          opacity="0.85"
        />

        {/* BOTTOM SMASH PATTY (Patty 1) */}
        <g id="patty-1">
          {isChicken ? (
            /* Crispy Fried Chicken Cutlet */
            <path
              d="M 65,315 C 60,335 90,350 140,352 C 200,355 240,350 290,354 C 350,352 410,345 435,325 C 445,310 410,295 350,295 C 270,292 200,294 130,298 C 80,302 68,305 65,315 Z"
              fill="url(#chickenGrad)"
              filter="url(#shadowFilter)"
            />
          ) : (
            /* Smash Beef Patty with lacy crisp jagged edges */
            <path
              d="M 50,320 C 45,328 65,338 90,336 C 115,334 130,344 165,342 C 200,340 230,348 265,345 C 310,342 340,350 380,342 C 415,335 455,330 450,318 C 445,306 410,300 370,298 C 300,295 210,296 140,300 C 85,304 55,310 50,320 Z"
              fill="url(#smashPattyGrad)"
              filter="url(#shadowFilter)"
            />
          )}
          {/* Caramelized crisp crust specks on patty */}
          <ellipse cx="110" cy="326" rx="14" ry="4" fill="#0A0402" />
          <ellipse cx="230" cy="332" rx="20" ry="5" fill="#0A0402" />
          <ellipse cx="370" cy="328" rx="18" ry="4" fill="#0A0402" />
          <ellipse cx="170" cy="322" rx="12" ry="3" fill="#693019" />
          <ellipse cx="310" cy="324" rx="15" ry="3" fill="#693019" />
        </g>

        {/* CHEDDAR CHEESE 1 (Melted over Patty 1) */}
        <g id="cheddar-1">
          <path
            d="M 95,305 
               C 110,305 130,338 145,345 
               C 155,349 165,325 185,322 
               C 210,318 230,345 250,350 
               C 270,355 285,322 310,322 
               C 335,322 350,346 365,346 
               C 380,346 395,312 405,310 
               C 420,305 380,290 250,290 
               C 120,290 85,305 95,305 Z"
            fill="url(#cheddarGrad)"
            filter="url(#shadowFilter)"
          />
          {/* Melted Cheese drip */}
          <path d="M 142,342 Q 146,362 148,368 Q 152,364 153,346 Z" fill="#FFA500" />
          <path d="M 248,348 Q 251,372 254,378 Q 257,370 258,350 Z" fill="#FFA500" />
          <path d="M 362,344 Q 366,365 368,370 Q 371,364 372,345 Z" fill="#FF9900" />
          {/* Cheese Gloss highlight */}
          <path
            d="M 170,312 Q 250,304 330,312"
            stroke="#FFE680"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* MIDDLE SMASH PATTY (For double/triple burgers) */}
        {!isChicken && (
          <g id="patty-2">
            <path
              d="M 55,275 C 50,285 70,295 105,292 C 140,290 170,299 210,296 C 255,293 295,301 340,296 C 385,290 445,285 445,272 C 445,260 405,255 350,252 C 280,250 190,250 130,254 C 80,258 58,265 55,275 Z"
              fill="url(#smashPattyGrad)"
              filter="url(#shadowFilter)"
            />
            {/* Caramelized crisp bits */}
            <ellipse cx="140" cy="282" rx="16" ry="4" fill="#0A0402" />
            <ellipse cx="280" cy="286" rx="22" ry="5" fill="#0A0402" />
            <ellipse cx="385" cy="280" rx="15" ry="4" fill="#0A0402" />
          </g>
        )}

        {/* SECOND CHEDDAR SLICE (For double / triple burgers) */}
        {!isChicken && (
          <g id="cheddar-2">
            <path
              d="M 100,260 
                 C 115,260 135,288 150,294 
                 C 165,298 180,272 205,270 
                 C 230,268 250,295 270,298 
                 C 290,300 310,272 335,272 
                 C 360,272 375,292 390,292 
                 C 405,292 415,265 410,260 
                 C 400,248 350,245 250,245 
                 C 150,245 105,248 100,260 Z"
              fill="url(#cheddarGrad)"
              filter="url(#shadowFilter)"
            />
            {/* Cheese drips */}
            <path d="M 268,296 Q 272,320 274,328 Q 278,322 280,297 Z" fill="#FFA500" />
            <path d="M 148,292 Q 151,312 153,318 Q 156,312 158,294 Z" fill="#FFA500" />
            {/* Cheese sheen line */}
            <path
              d="M 180,262 Q 250,256 320,262"
              stroke="#FFE680"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        )}

        {/* TRIPLE PATTY (For Doble Brasa & Brasa 1999) */}
        {isTriple && (
          <g id="patty-3">
            <path
              d="M 60,230 C 55,240 75,250 115,247 C 155,245 190,254 235,251 C 280,248 320,256 365,251 C 405,246 440,240 440,228 C 440,216 400,212 345,210 C 275,208 190,208 135,212 C 85,216 63,222 60,230 Z"
              fill="url(#smashPattyGrad)"
              filter="url(#shadowFilter)"
            />
            {/* Triple cheddar */}
            <path
              d="M 110,220 C 130,220 150,244 170,248 C 190,252 210,228 240,228 C 270,228 290,250 315,252 C 340,254 365,225 390,224 C 380,212 330,210 250,210 C 160,210 115,212 110,220 Z"
              fill="url(#cheddarGrad)"
            />
          </g>
        )}

        {/* BACON STRIPS (If bacon-bbq or brasa-1999) */}
        {hasBacon && (
          <g id="bacon-layer">
            <path
              d="M 80,220 Q 130,205 180,228 Q 230,250 290,225 Q 350,200 420,220 Q 380,210 290,215 Q 180,200 80,220 Z"
              fill="url(#baconGrad)"
              filter="url(#shadowFilter)"
            />
            <path
              d="M 100,215 Q 160,238 220,210 Q 280,185 350,215 Q 410,235 430,215 Q 360,195 280,198 Q 180,190 100,215 Z"
              fill="url(#baconGrad)"
              opacity="0.95"
            />
            {/* Bacon crispy fat stripes */}
            <path d="M 110,218 Q 160,210 200,224" stroke="#F5B2AB" strokeWidth="3" opacity="0.8" />
            <path d="M 280,218 Q 340,205 400,216" stroke="#F5B2AB" strokeWidth="3" opacity="0.8" />
          </g>
        )}

        {/* SPICY JALAPEÑOS (If spicy burger) */}
        {isSpicy && (
          <g id="jalapenos">
            <ellipse cx="140" cy="215" rx="18" ry="10" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
            <circle cx="140" cy="215" r="4" fill="#A5D6A7" />
            <ellipse cx="230" cy="208" rx="20" ry="11" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
            <circle cx="230" cy="208" r="4" fill="#A5D6A7" />
            <ellipse cx="320" cy="212" rx="19" ry="10" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
            <circle cx="320" cy="212" r="4" fill="#A5D6A7" />
            <ellipse cx="370" cy="225" rx="17" ry="9" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
          </g>
        )}

        {/* CRISPY ONIONS / CARAMELIZED ONIONS */}
        <g id="onions-layer">
          <path
            d="M 120,205 Q 160,195 210,205 Q 260,215 310,200 Q 360,190 390,205"
            stroke="url(#crispyOnionGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 140,212 Q 185,225 240,210 Q 295,198 350,212"
            stroke="url(#crispyOnionGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 190,198 Q 230,188 275,198"
            stroke="#F5C065"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* SIGNATURE BRASA SAUCE SPREAD / DRIP (Under top bun) */}
        <g id="top-sauce">
          <path
            d="M 110,195 
               Q 140,215 160,218 
               Q 190,195 230,210 
               Q 270,225 310,205 
               Q 350,220 380,200 
               Q 300,185 250,185 
               Q 180,185 110,195 Z"
            fill="url(#brasaSauceGrad)"
            filter="url(#shadowFilter)"
          />
          {/* Seductive sauce drop */}
          <path d="M 158,216 Q 161,236 163,244 Q 166,238 167,218 Z" fill="#C5301B" />
          <path d="M 308,204 Q 311,228 313,234 Q 315,226 317,206 Z" fill="#C5301B" />
        </g>

        {/* TOP BUN (Brioche Crown) */}
        <g id="top-bun">
          {/* Bun underside shadow */}
          <ellipse cx="250" cy="190" rx="175" ry="25" fill="#4A1F05" opacity="0.9" />

          {/* Brioche Dome */}
          <path
            d="M 75,185 
               C 70,85 130,40 250,40 
               C 370,40 430,85 425,185 
               C 425,202 360,212 250,212 
               C 140,212 75,202 75,185 Z"
            fill={`url(#bunTop-${type})`}
            filter="url(#shadowFilter)"
          />

          {/* High-Gloss Brioche Sheen Highlight */}
          <path
            d="M 120,135 
               C 135,75 180,55 250,55 
               C 320,55 365,75 380,135 
               C 330,105 270,95 250,95 
               C 230,95 170,105 120,135 Z"
            fill="url(#bunGloss)"
          />

          {/* Secondary bright specular glint */}
          <ellipse
            cx="220"
            cy="70"
            rx="45"
            ry="12"
            transform="rotate(-10 220 70)"
            fill="#FFF5E0"
            opacity="0.45"
          />

          {/* SESAME SEEDS (Toasted golden white seeds sprinkled on crown) */}
          <g id="sesame-seeds" fill="#FFF2DC" stroke="#BF8A52" strokeWidth="0.75" opacity="0.95">
            {/* Top row */}
            <ellipse cx="195" cy="72" rx="4.5" ry="2.2" transform="rotate(-15 195 72)" />
            <ellipse cx="235" cy="65" rx="5" ry="2.3" transform="rotate(10 235 65)" />
            <ellipse cx="270" cy="70" rx="4.8" ry="2.2" transform="rotate(-25 270 70)" />
            <ellipse cx="305" cy="80" rx="4.5" ry="2.1" transform="rotate(20 305 80)" />

            {/* Middle tier */}
            <ellipse cx="155" cy="100" rx="5.2" ry="2.4" transform="rotate(-35 155 100)" />
            <ellipse cx="185" cy="98" rx="4.6" ry="2.2" transform="rotate(15 185 98)" />
            <ellipse cx="220" cy="92" rx="5" ry="2.3" transform="rotate(-5 220 92)" />
            <ellipse cx="255" cy="95" rx="4.8" ry="2.2" transform="rotate(30 255 95)" />
            <ellipse cx="290" cy="102" rx="5" ry="2.3" transform="rotate(-15 290 102)" />
            <ellipse cx="335" cy="105" rx="4.7" ry="2.1" transform="rotate(40 335 105)" />

            {/* Lower tier */}
            <ellipse cx="130" cy="135" rx="4.8" ry="2.2" transform="rotate(-40 130 135)" />
            <ellipse cx="165" cy="130" rx="5.1" ry="2.3" transform="rotate(25 165 130)" />
            <ellipse cx="205" cy="125" rx="4.7" ry="2.1" transform="rotate(-10 205 125)" />
            <ellipse cx="245" cy="122" rx="5" ry="2.3" transform="rotate(15 245 122)" />
            <ellipse cx="280" cy="126" rx="4.6" ry="2.2" transform="rotate(-30 280 126)" />
            <ellipse cx="315" cy="132" rx="4.9" ry="2.3" transform="rotate(20 315 132)" />
            <ellipse cx="360" cy="140" rx="4.5" ry="2" transform="rotate(35 360 140)" />

            {/* Bottom tier seeds */}
            <ellipse cx="145" cy="165" rx="4.5" ry="2" transform="rotate(-25 145 165)" />
            <ellipse cx="190" cy="158" rx="4.8" ry="2.2" transform="rotate(10 190 158)" />
            <ellipse cx="230" cy="155" rx="5" ry="2.3" transform="rotate(-15 230 155)" />
            <ellipse cx="270" cy="156" rx="4.7" ry="2.1" transform="rotate(25 270 156)" />
            <ellipse cx="310" cy="160" rx="4.9" ry="2.2" transform="rotate(-5 310 160)" />
            <ellipse cx="350" cy="166" rx="4.6" ry="2.1" transform="rotate(30 350 166)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
