export interface Palette {
  id: string;
  name: string;
  colors: string[];
  description: string;
}

export const CLASSIC_PALETTES: Palette[] = [
  {
    id: 'original',
    name: 'Original',
    colors: [],
    description: 'Original image colors without any palette restrictions'
  },
  {
    id: 'gameboy',
    name: 'Game Boy',
    colors: [
      '#0f380f', '#306230', '#8bac0f', '#9bbc0f'
    ],
    description: 'Released in 1989, the Nintendo Game Boy\'s iconic green-tinted LCD screen could display 4 shades. This limitation, combined with the "dot matrix with stereo sound" display, created a unique aesthetic that defined portable gaming. The olive-green tones were chosen for optimal visibility and battery life, leading to the success of games like Tetris and Pokémon.'
  },
  {
    id: 'nes',
    name: 'NES',
    colors: [
      '#7C7C7C', '#0000FC', '#0000BC', '#4428BC',
      '#940084', '#A80020', '#A81000', '#881400',
      '#503000', '#007800', '#006800', '#005800',
      '#004058', '#000000', '#BCBCBC', '#0078F8',
      '#0058F8', '#6844FC', '#D800CC', '#E40058',
      '#F83800', '#E45C10', '#AC7C00', '#00B800',
      '#00A800', '#00A844', '#008888', '#000000',
      '#F8F8F8', '#3CBCFC', '#6888FC', '#9878F8',
      '#F878F8', '#F85898', '#F87858', '#FCA044',
      '#F8B800', '#B8F818', '#58D854', '#58F898',
      '#00E8D8', '#787878', '#FCFCFC', '#A4E4FC',
      '#B8B8F8', '#D8B8F8', '#F8B8F8', '#F8A4C0',
      '#F0D0B0', '#FCE0A8', '#F8D878', '#D8F878',
      '#B8F8B8', '#B8F8D8', '#00FCFC', '#F8D8F8'
    ],
    description: 'Released in 1983, the Nintendo Entertainment System (NES) featured a custom Picture Processing Unit (PPU) capable of displaying 54 colors. Each sprite could only use 3 colors plus transparency, leading to the iconic look of games like Super Mario Bros. and The Legend of Zelda. The palette was specifically designed to look good on CRT televisions of the era.'
  },
  {
    id: 'intellivision',
    name: 'Intellivision',
    colors: [
      '#000000', '#002DFF', '#FF3E00', '#FF1F6F',
      '#00FF00', '#FFE700', '#0026FF', '#B200FF',
      '#FF8B00', '#00FFA4', '#FFFA00', '#00FF8A',
      '#FF0000', '#00FFFF', '#808080', '#FFFFFF'
    ],
    description: 'The Mattel Intellivision, launched in 1979, was the first 16-bit gaming console. Its Standard Television Interface Chip (STIC) could display 16 vibrant colors, which was groundbreaking for its time. The console\'s advanced color capabilities helped create memorable games like Astrosmash and Advanced Dungeons & Dragons, setting new standards for home gaming graphics.'
  },
  {
    id: 'cga',
    name: 'CGA',
    colors: [
      '#000000', '#55FFFF', '#FF55FF', '#FFFFFF'
    ],
    description: 'IBM\'s Color Graphics Adapter (CGA), introduced in 1981, was the first color graphics card for IBM PCs. Mode 4, shown here, became iconic for its high-intensity cyan/magenta palette. Despite being limited to just 4 colors, creative developers made striking games like King\'s Quest and Commander Keen. The unusual color choices were influenced by the need to be visible on both RGB monitors and NTSC televisions.'
  },
  {
    id: 'commodore64',
    name: 'Commodore 64',
    colors: [
      '#000000', '#FFFFFF', '#880000', '#AAFFEE',
      '#CC44CC', '#00CC55', '#0000AA', '#EEEE77',
      '#DD8855', '#664400', '#FF7777', '#333333',
      '#777777', '#AAFF66', '#0088FF', '#BBBBBB'
    ],
    description: 'The Commodore 64, released in 1982, featured the VIC-II graphics chip with 16 colors. Each 8x8 pixel character could only use one foreground and one background color, but clever programmers used techniques like dithering to create the illusion of more colors. The C64 became the best-selling computer model of all time, with hits like Impossible Mission showcasing its capabilities.'
  },
  {
    id: 'zxspectrum',
    name: 'ZX Spectrum',
    colors: [
      '#000000', '#0000CD', '#CD0000', '#CD00CD',
      '#00CD00', '#00CDCD', '#CDCD00', '#CDCDCD'
    ],
    description: 'Sir Clive Sinclair\'s ZX Spectrum (1982) brought color computing to British homes with its distinctive 8-color palette. Each 8x8 pixel block could only have one foreground and background color, leading to the famous "color clash" effect. Despite this limitation, the machine spawned thousands of creative games and birthed the UK\'s gaming industry.'
  },
  {
    id: 'msdos',
    name: 'MS-DOS',
    colors: [
      '#000000', '#111111', '#222222', '#333333',
      '#444444', '#555555', '#666666', '#777777',
      '#888888', '#999999', '#AAAAAA', '#BBBBBB',
      '#CCCCCC', '#DDDDDD', '#EEEEEE', '#FFFFFF'
    ],
    description: 'The 16-shade grayscale palette was a staple of early MS-DOS text mode displays in the 1980s. Before color monitors became widespread, this palette allowed for subtle shading and pseudo-graphics in applications like WordPerfect and early PC games. The human eye can distinguish these 16 distinct levels of gray, making it perfect for ASCII art and text-based interfaces.'
  }
];
