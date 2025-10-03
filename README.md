# PriceScraperFrontend

A Next.js frontend application for searching and comparing product prices. This application allows users to search for specific products (like wash basins and radiators) by specifying dimensions and displays the results with average pricing information.

## Features

- Product search by type, width, and depth
- Real-time price comparison
- Average price calculation
- German interface
- Responsive design
- Integration with backend API

## Supported Products

- Waschbecken (Wash Basins)
- Heizkörper (Radiators)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm, yarn, pnpm, or bun
- Backend API running on `http://localhost:5000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PriceScraperFrontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select a product type (Waschbecken or Heizkörper)
2. Choose the desired width (50cm or 100cm)
3. Select the depth (30cm or 60cm)
4. Click "Suchen" (Search) to find products
5. View the results with individual prices and average price

## API Integration

The application communicates with a backend API at `http://localhost:5000/submit` that expects:
- **Method**: POST
- **Content-Type**: application/json
- **Body**: 
  ```json
  {
    "productType": "string",
    "productWidth": "string", 
    "productDepth": "string"
  }
  ```

## Project Structure

```
PriceScraperFrontend/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Main page component
│   └── styles.css       # Component-specific styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
└── tsconfig.json        # TypeScript configuration
```

## Technologies Used

- **Next.js 14.0.4** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS** - Styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The main application logic is in `app/page.tsx`. The component includes:
- Form handling for product search
- API communication with the backend
- Product list rendering
- Average price calculation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and not licensed for public use.
