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
  },
  {
    id: 'mattel',
    name: 'Mattel Aquarius',
    colors: [
      '#000000', '#C4001B', '#07BF00', '#C9B908',
      '#0000C4', '#C400C4', '#00BFC4', '#C4C4C4',
      '#606060', '#FF0024', '#00FF00', '#FFFF00',
      '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF'
    ],
    description: 'Released in 1983, the Mattel Aquarius was Mattel\'s venture into home computing. Though short-lived (only 4 months on the market), it featured a vibrant 16-color palette powered by the TMS9929A video chip. The computer\'s unique "chiclet" keyboard and built-in BASIC made it memorable, even if Mattel\'s CEO called it "a dump" of a computer.'
  },
  {
    id: 'win95',
    name: 'Windows 95',
    colors: [
      // System colors (first 16)
      '#000000', '#800000', '#008000', '#808000',
      '#000080', '#800080', '#008080', '#C0C0C0',
      '#808080', '#FF0000', '#00FF00', '#FFFF00',
      '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF',
      // Grayscale ramp (28 colors)
      '#080808', '#101010', '#181818', '#202020',
      '#282828', '#303030', '#383838', '#404040',
      '#484848', '#505050', '#585858', '#606060',
      '#686868', '#707070', '#787878', '#808080',
      '#888888', '#909090', '#989898', '#A0A0A0',
      '#A8A8A8', '#B0B0B0', '#B8B8B8', '#C0C0C0',
      '#C8C8C8', '#D0D0D0', '#D8D8D8', '#E0E0E0',
      // Color cube (216 colors - 6 levels each of R, G, and B)
      '#000000', '#000033', '#000066', '#000099', '#0000CC', '#0000FF',
      '#003300', '#003333', '#003366', '#003399', '#0033CC', '#0033FF',
      '#006600', '#006633', '#006666', '#006699', '#0066CC', '#0066FF',
      '#009900', '#009933', '#009966', '#009999', '#0099CC', '#0099FF',
      '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
      '#00FF00', '#00FF33', '#00FF66', '#00FF99', '#00FFCC', '#00FFFF',
      '#330000', '#330033', '#330066', '#330099', '#3300CC', '#3300FF',
      '#333300', '#333333', '#333366', '#333399', '#3333CC', '#3333FF',
      '#336600', '#336633', '#336666', '#336699', '#3366CC', '#3366FF',
      '#339900', '#339933', '#339966', '#339999', '#3399CC', '#3399FF',
      '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
      '#33FF00', '#33FF33', '#33FF66', '#33FF99', '#33FFCC', '#33FFFF',
      '#660000', '#660033', '#660066', '#660099', '#6600CC', '#6600FF',
      '#663300', '#663333', '#663366', '#663399', '#6633CC', '#6633FF',
      '#666600', '#666633', '#666666', '#666699', '#6666CC', '#6666FF',
      '#669900', '#669933', '#669966', '#669999', '#6699CC', '#6699FF',
      '#66CC00', '#66CC33', '#66CC66', '#66CC99', '#66CCCC', '#66CCFF',
      '#66FF00', '#66FF33', '#66FF66', '#66FF99', '#66FFCC', '#66FFFF',
      '#990000', '#990033', '#990066', '#990099', '#9900CC', '#9900FF',
      '#993300', '#993333', '#993366', '#993399', '#9933CC', '#9933FF',
      '#996600', '#996633', '#996666', '#996699', '#9966CC', '#9966FF',
      '#999900', '#999933', '#999966', '#999999', '#9999CC', '#9999FF',
      '#99CC00', '#99CC33', '#99CC66', '#99CC99', '#99CCCC', '#99CCFF',
      '#99FF00', '#99FF33', '#99FF66', '#99FF99', '#99FFCC', '#99FFFF',
      '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF',
      '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF',
      '#CC6600', '#CC6633', '#CC6666', '#CC6699', '#CC66CC', '#CC66FF',
      '#CC9900', '#CC9933', '#CC9966', '#CC9999', '#CC99CC', '#CC99FF',
      '#CCCC00', '#CCCC33', '#CCCC66', '#CCCC99', '#CCCCCC', '#CCCCFF',
      '#CCFF00', '#CCFF33', '#CCFF66', '#CCFF99', '#CCFFCC', '#CCFFFF',
      '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF',
      '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
      '#FF6600', '#FF6633', '#FF6666', '#FF6699', '#FF66CC', '#FF66FF',
      '#FF9900', '#FF9933', '#FF9966', '#FF9999', '#FF99CC', '#FF99FF',
      '#FFCC00', '#FFCC33', '#FFCC66', '#FFCC99', '#FFCCCC', '#FFCCFF',
      '#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC', '#FFFFFF'
    ],
    description: 'Windows 95 introduced the iconic 256-color palette that defined the look of early PC gaming and multimedia. The palette consisted of 16 system colors, 28 grayscale values, and a 216-color "web-safe" cube with 6 levels each of red, green, and blue. This color space became the standard for early web design and was optimized for the 256-color VGA displays common in the 1990s.'
  }
];
