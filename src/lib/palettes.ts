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
    description: 'Original image colors'
  },
  {
    id: 'gameboy',
    name: 'Game Boy',
    colors: [
      '#0f380f', '#306230', '#8bac0f', '#9bbc0f'
    ],
    description: 'The iconic 4-color palette of the original Game Boy'
  },
  {
    id: 'nes',
    name: 'NES',
    colors: [
      // Grayscale row
      '#7C7C7C', '#BCBCBC', '#F8F8F8', '#FCFCFC',
      // Blues
      '#0000FC', '#0000BC', '#0078F8', '#0058F8', '#3CBCFC', '#6888FC',
      // Purples
      '#4428BC', '#6844FC', '#9878F8', '#D8B8F8',
      // Magentas/Pinks
      '#940084', '#D800CC', '#F878F8', '#F8B8F8',
      // Reds
      '#A80020', '#A81000', '#E40058', '#F83800', '#F85898',
      // Oranges/Browns
      '#881400', '#503000', '#E45C10', '#AC7C00', '#F87858', '#FCA044', '#F0D0B0', '#FCE0A8',
      // Greens
      '#007800', '#006800', '#005800', '#00B800', '#00A800', '#00A844', '#B8F818', '#58D854',
      '#58F898', '#B8F8B8', '#B8F8D8',
      // Cyans
      '#004058', '#008888', '#00E8D8', '#00FCFC',
      // Remaining unique colors
      '#787878', '#F8D878', '#D8F878', '#F8D8F8'
    ],
    description: 'Nintendo Entertainment System\'s optimized color palette (duplicates removed, organized by color groups)'
  },
  {
    id: 'cga',
    name: 'CGA Mode 4',
    colors: [
      '#000000', '#55FFFF', '#FF55FF', '#FFFFFF'
    ],
    description: 'IBM\'s CGA Mode 4 High-Intensity Palette'
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
    description: 'The Commodore 64\'s distinctive 16-color palette'
  },
  {
    id: 'zxspectrum',
    name: 'ZX Spectrum',
    colors: [
      '#000000', '#0000CD', '#CD0000', '#CD00CD',
      '#00CD00', '#00CDCD', '#CDCD00', '#CDCDCD'
    ],
    description: 'ZX Spectrum\'s 8-color palette'
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
    description: 'Classic MS-DOS 16-shade grayscale palette'
  }
];
