# Ohiosfav.com

Welcome to Ohio's Favorite Gal - a Node.js application.

## Overview

This is a web application built with Node.js and deployed on Railway with a custom domain at [Ohiosfavgal.com](https://Ohiosfavgal.com).

## Features

- Built with Node.js
- Deployed on Railway
- Custom domain integration
- Automatic deployments from GitHub

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://www.perplexity.ai/computer/a/b458d350-2a97-47c1-8129-5ad939c84973
cd Ohiosfav.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the application:
```bash
npm start
```

The app will be available at `http://localhost:3000` (or your configured port).

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `NODE_ENV` - Environment (development, production)
- `PORT` - Server port (default: 3000)

## Deployment

This project is automatically deployed to Railway when you push to the `main` branch.

### Custom Domain

The application is accessible at `https://Ohiosfavgal.com`

### Manual Deployment

To manually trigger a deployment on Railway:
1. Push changes to the `main` branch
2. Railway will automatically detect and deploy the changes

## Development

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Project Structure

```
Ohiosfavgal.com/
├── src/              # Source code
├── public/           # Static files
├── package.json      # Dependencies and scripts
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open a GitHub issue in this repository.

---

Built with ❤️ by ohiosfavoritebartender-ctrl