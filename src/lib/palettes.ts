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
      // Grays
      '#7C7C7C', '#BCBCBC', '#F8F8F8',
      // Blues
      '#0000FC', '#0078F8', '#3CBCFC',
      // Purples and Magentas
      '#4428BC', '#940084', '#D800CC', '#F878F8',
      // Reds
      '#A81000', '#E40058', '#F83800',
      // Oranges and Browns
      '#E45C10', '#AC7C00', '#F87858', '#FCA044',
      // Yellows
      '#F8B800', '#F8D878',
      // Greens
      '#007800', '#00A800', '#58D854', '#B8F818',
      // Cyans
      '#00E8D8', '#00FCFC'
    ],
    description: 'Nintendo Entertainment System\'s color palette (optimized for modern displays)'
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
  }
];
