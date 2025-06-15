
# Contributing to Framework Fusion Engine

Thank you for your interest in contributing to the Framework Fusion Engine! This project aims to create a comprehensive, community-driven compliance management platform with Wikipedia-style collaboration.

## 🚀 Quick Start for Contributors

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup
```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd framework-fusion-engine

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 How to Contribute

### 1. Types of Contributions We Welcome
- **Security Controls**: Add new controls, improve existing descriptions
- **Framework Mappings**: Create relationships between different compliance frameworks
- **Features**: UI improvements, new functionality, performance optimizations
- **Documentation**: User guides, API docs, code comments
- **Bug Fixes**: Fix issues, improve error handling
- **Testing**: Add tests, improve test coverage

### 2. Contribution Workflow
1. **Fork** the repository
2. **Create a branch** from `main`: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit** with descriptive messages
6. **Push** to your fork
7. **Create a Pull Request** with detailed description

### 3. Pull Request Guidelines
- Use clear, descriptive titles
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Keep changes focused and atomic
- Follow the existing code style

## 📋 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── Community/       # Community features
│   └── ControlLibrary/  # Control management
├── data/                # Mock data and control definitions
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route components
├── services/            # API and business logic
└── types/               # TypeScript type definitions
```

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Prefer composition over inheritance
- Keep components small and focused (< 50 lines when possible)

### Commit Messages
Follow conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code restructuring
- `test:` adding tests
- `chore:` maintenance tasks

### Adding New Security Controls
1. Add control data to appropriate file in `src/data/controls/`
2. Update mock data in `src/data/reportMockData.ts`
3. Test in the Control Library interface
4. Document any new control families or categories

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📖 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [PCI DSS Requirements](https://www.pcisecuritystandards.org/)

## 🎖️ Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Community dashboard (when implemented)

## 📞 Getting Help

- Create an issue for bugs or feature requests
- Join discussions in existing issues
- Review the project documentation
- Check existing code for patterns and examples

## 📜 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication
- Report any inappropriate behavior

Thank you for helping make compliance management more accessible and collaborative! 🎉
