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
      '#7C7C7C', '#0000FC', '#0000BC', '#4428BC',
      '#940084', '#A80020', '#A81000', '#881400',
      '#503000', '#007800', '#006800', '#005800',
      '#004058', '#000000', '#000000', '#000000',
      '#BCBCBC', '#0078F8', '#0058F8', '#6844FC',
      '#D800CC', '#E40058', '#F83800', '#E45C10',
      '#AC7C00', '#00B800', '#00A800', '#00A844',
      '#008888', '#000000', '#000000', '#000000',
      '#F8F8F8', '#3CBCFC', '#6888FC', '#9878F8',
      '#F878F8', '#F85898', '#F87858', '#FCA044',
      '#F8B800', '#B8F818', '#58D854', '#58F898',
      '#00E8D8', '#787878', '#000000', '#000000',
      '#FCFCFC', '#A4E4FC', '#B8B8F8', '#D8B8F8',
      '#F8B8F8', '#F8A4C0', '#F0D0B0', '#FCE0A8',
      '#F8D878', '#D8F878', '#B8F8B8', '#B8F8D8',
      '#00FCFC', '#F8D8F8', '#000000', '#000000'
    ],
    description: 'Official Nintendo Entertainment System color palette'
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
