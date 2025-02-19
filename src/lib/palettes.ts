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
      '#000000', '#404040', '#808080', '#FFFFFF',
      // Blues (more saturated)
      '#0000FF', '#0040FF', '#0080FF', '#00A0FF', '#40C0FF', '#80C0FF',
      // Purples (more vivid)
      '#4000FF', '#8000FF', '#A040FF', '#C080FF',
      // Magentas/Pinks (brighter)
      '#FF00A0', '#FF00FF', '#FF80FF', '#FFC0FF',
      // Reds (more intense)
      '#FF0000', '#FF2000', '#FF4000', '#FF6000', '#FF8080',
      // Oranges/Browns (more saturated)
      '#C04000', '#804000', '#FF8000', '#FFA000', '#FFB060', '#FFC080', '#FFD0A0', '#FFE0C0',
      // Greens (more vibrant)
      '#00FF00', '#00C000', '#008000', '#40FF00', '#60FF40', '#80FF80', '#C0FF40', '#80FF40',
      '#40FFA0', '#C0FFC0', '#C0FFE0',
      // Cyans (brighter)
      '#00C0FF', '#00FFFF', '#80FFFF', '#C0FFFF',
      // Remaining unique colors (more saturated)
      '#606060', '#FFE040', '#E0FF40', '#FFC0FF'
    ],
    description: 'Enhanced NES color palette with more vibrant and high-contrast colors'
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
