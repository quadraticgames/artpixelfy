# ArtPixelfy

ArtPixelfy is a web application that allows users to upload images and convert them into pixel art. It features an intuitive drag-and-drop interface, adjustable pixel size, and the ability to download the pixelated image.

## Features

- Upload images via drag-and-drop or file browser
- Convert images to pixel art with adjustable pixel size
- Control output resolution with option to maintain original image resolution
- Historic color palette selection from classic gaming systems and computers
- Download pixelated images
- Responsive design for various screen sizes

## Color Palettes

ArtPixelfy includes a curated selection of historic color palettes from iconic gaming systems and computers. Each palette offers a unique glimpse into the evolution of computer graphics:

### Game Boy (1989)
The Nintendo Game Boy's iconic 4-shade green-tinted LCD screen defined portable gaming. Its olive-green tones were carefully chosen for optimal visibility and battery life, leading to the success of classics like Tetris and Pokémon.

### NES (1983)
The Nintendo Entertainment System's 54-color palette, managed by its Picture Processing Unit (PPU), shaped the look of classic games. Each sprite could only use 3 colors plus transparency, leading to the iconic visual style of games like Super Mario Bros.

### Commodore 64 (1982)
The VIC-II graphics chip offered 16 colors, with clever programming techniques like dithering used to create the illusion of more colors. The C64 became the best-selling computer model of all time.

### ZX Spectrum (1982)
Sir Clive Sinclair's 8-color palette brought color computing to British homes. The famous "color clash" effect, due to each 8x8 pixel block being limited to one foreground and background color, became a distinctive part of its visual style.

### CGA (1981)
IBM's Color Graphics Adapter introduced color to IBM PCs. Its Mode 4 became iconic for its high-intensity cyan/magenta palette, despite being limited to just 4 colors.

### MS-DOS (1980s)
The 16-shade grayscale palette was a staple of early text-mode displays, enabling subtle shading in applications before color monitors became widespread.

### Intellivision (1979)
The first 16-bit gaming console featured 16 vibrant colors through its Standard Television Interface Chip (STIC), setting new standards for home gaming graphics.

## Tech Stack

- React with TypeScript
- Vite for development and build
- Radix UI components
- HTML-to-image conversion
- Optimized palette color matching with caching

## Live Demo

Check out the live demo at [ArtPixelfy on Netlify](https://artpixelfy.netlify.app).

## Performance Notes

The application uses advanced color processing techniques including:
- Color mapping cache to avoid recalculating matches
- Chunked processing to prevent UI blocking
- Optimized color distance calculations
- Memory-efficient caching strategies
