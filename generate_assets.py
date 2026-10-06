import subprocess

# 1. BURGER 3 MACRO (Hero image matching user's photo burger3.jpg)
burger3_svg = '''<svg viewBox="0 0 1600 1060" width="1600" height="1060" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="b3Top" cx="72%" cy="22%" r="75%">
      <stop offset="0%" stop-color="#F7C06D" />
      <stop offset="35%" stop-color="#DE8528" />
      <stop offset="70%" stop-color="#96440C" />
      <stop offset="95%" stop-color="#4A1D04" />
      <stop offset="100%" stop-color="#1B0701" />
    </radialGradient>
    <linearGradient id="b3Btm" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8A854" />
      <stop offset="35%" stop-color="#CB761E" />
      <stop offset="85%" stop-color="#823909" />
      <stop offset="100%" stop-color="#381403" />
    </linearGradient>
    <linearGradient id="b3Beef" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#240B04" />
      <stop offset="25%" stop-color="#3D180B" />
      <stop offset="55%" stop-color="#582615" />
      <stop offset="85%" stop-color="#2C1107" />
      <stop offset="100%" stop-color="#110401" />
    </linearGradient>
    <linearGradient id="b3Sauce" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF652B" />
      <stop offset="50%" stop-color="#D8491D" />
      <stop offset="100%" stop-color="#821C0A" />
    </linearGradient>
    <linearGradient id="b3Bacon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60170E" />
      <stop offset="40%" stop-color="#AB3A26" />
      <stop offset="70%" stop-color="#DB6F59" />
      <stop offset="100%" stop-color="#441009" />
    </linearGradient>
    <linearGradient id="b3Lettuce" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7EDA34" />
      <stop offset="50%" stop-color="#50A01D" />
      <stop offset="100%" stop-color="#1B4409" />
    </linearGradient>
  </defs>

  <!-- Deep Black Studio Background -->
  <rect width="1600" height="1060" fill="#000000" />
  
  <!-- Slate Counter Shadow -->
  <ellipse cx="900" cy="970" rx="650" ry="75" fill="#050505" opacity="0.95" />

  <!-- Bottom Bun Heel -->
  <path d="M 380,820 C 420,770 750,755 1280,780 C 1520,795 1580,840 1560,920 C 1540,970 1250,990 880,990 C 550,990 340,940 380,820 Z" fill="url(#b3Btm)" />
  <ellipse cx="960" cy="785" rx="520" ry="18" fill="#6E2D07" opacity="0.8" />

  <!-- Crisp Curly Green Lettuce -->
  <path d="M 280,760 C 450,680 850,690 1380,710 C 1520,720 1590,760 1550,810 C 1350,830 650,820 280,760 Z" fill="#1B3D0A" />
  <circle cx="340" cy="745" r="75" fill="url(#b3Lettuce)" />
  <circle cx="440" cy="735" r="95" fill="url(#b3Lettuce)" />
  <circle cx="580" cy="745" r="110" fill="url(#b3Lettuce)" />
  <circle cx="720" cy="730" r="100" fill="url(#b3Lettuce)" />
  <circle cx="860" cy="740" r="115" fill="url(#b3Lettuce)" />
  <circle cx="1020" cy="735" r="105" fill="url(#b3Lettuce)" />
  <circle cx="1180" cy="745" r="95" fill="url(#b3Lettuce)" />
  <circle cx="1320" cy="740" r="85" fill="url(#b3Lettuce)" />
  <path d="M 290,770 Q 380,720 480,760 Q 580,710 680,750 Q 780,710 880,750 Q 980,710 1080,750 Q 1180,710 1280,750 Q 1380,720 1460,740" stroke="#99EB47" stroke-width="5" fill="none" stroke-linecap="round" />

  <!-- Thick Juicy Smash Beef Patty -->
  <path d="M 330,470 C 420,390 780,380 1260,400 C 1510,415 1590,470 1570,580 C 1550,660 1320,680 880,675 C 520,670 300,630 330,470 Z" fill="url(#b3Beef)" />
  <ellipse cx="500" cy="480" rx="40" ry="16" fill="#120502" />
  <ellipse cx="750" cy="490" rx="65" ry="22" fill="#120502" />
  <ellipse cx="1050" cy="485" rx="75" ry="24" fill="#120502" />
  <ellipse cx="1300" cy="495" rx="60" ry="20" fill="#120502" />
  <circle cx="680" cy="460" r="3.5" fill="#FFF2DC" opacity="0.7" />
  <circle cx="980" cy="455" r="4" fill="#FFF2DC" opacity="0.8" />
  <circle cx="1150" cy="470" r="3.5" fill="#FFF2DC" opacity="0.7" />

  <!-- Thick Wavy Bacon Slices -->
  <path d="M 760,360 C 860,260 1020,240 1140,310 C 1240,370 1260,420 1180,450 C 1060,420 940,350 760,360 Z" fill="url(#b3Bacon)" />
  <path d="M 540,340 C 680,250 840,280 920,350 C 900,410 780,390 680,410 C 580,420 520,380 540,340 Z" fill="url(#b3Bacon)" />
  <path d="M 790,350 Q 890,270 1020,260 Q 1090,300 1120,320" stroke="#F2B3A7" stroke-width="5" fill="none" opacity="0.85" />

  <!-- Creamy Orange-Red Sauce Drips -->
  <path d="M 420,290 C 550,240 950,230 1380,250 C 1450,280 1380,350 1240,340 C 1080,320 920,360 780,340 C 620,370 460,350 420,290 Z" fill="url(#b3Sauce)" />
  <!-- Drip 1 -->
  <path d="M 480,310 C 460,380 460,440 490,470 C 520,500 545,470 530,420 C 520,380 535,330 480,310 Z" fill="url(#b3Sauce)" />
  <ellipse cx="490" cy="430" rx="12" ry="35" fill="#FFE0B2" opacity="0.7" />
  <!-- Drip 2 -->
  <path d="M 720,330 C 700,370 710,410 730,430 C 755,445 770,415 760,370 C 755,340 745,320 720,330 Z" fill="url(#b3Sauce)" />
  <ellipse cx="735" cy="395" rx="8" ry="22" fill="#FFE0B2" opacity="0.7" />

  <!-- Top Brioche Bun Crown -->
  <path d="M 340,260 C 330,60 680,0 1060,0 C 1440,0 1600,70 1600,220 C 1600,280 1280,285 960,280 C 620,275 360,280 340,260 Z" fill="url(#b3Top)" />
  <ellipse cx="980" cy="255" rx="620" ry="24" fill="#260B02" opacity="0.9" />
  <ellipse cx="1020" cy="95" rx="380" ry="65" fill="#FFF5E0" opacity="0.3" />
</svg>'''

with open('public/images/burger3.svg', 'w') as f:
    f.write(burger3_svg)

subprocess.run(['convert', '-density', '150', 'public/images/burger3.svg', 'public/images/burger3.jpg'], check=True)
print("burger3.jpg created successfully!")
