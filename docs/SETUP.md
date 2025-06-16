
# Development Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/framework-fusion-engine.git
   cd framework-fusion-engine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm test` - Run test suite

## Project Structure

```
src/
├── components/       # React components
├── data/            # Static data and controls
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Route components
├── services/        # Business logic
└── types/           # TypeScript definitions
```

## Contributing Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Environment Variables

No environment variables are required for local development.

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
- Run `npm run type-check` to see detailed errors
- Ensure all imports have proper type definitions

**Development server won't start:**
- Check if port 8080 is available
- Clear npm cache: `npm cache clean --force`

**Dependencies won't install:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

Need help? Check our [troubleshooting guide](./TROUBLESHOOTING.md) or ask in [Discussions](https://github.com/yourusername/framework-fusion-engine/discussions).
