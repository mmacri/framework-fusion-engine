# Deployment Guide

## Lovable Published Page
The app is configured to work automatically on Lovable's published page with no additional setup required.

## GitHub Pages Deployment
To deploy to GitHub Pages:

1. Connect your Lovable project to GitHub using the GitHub button
2. In your GitHub repository, go to Settings > Pages
3. Set source to "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. The app will be deployed to: `https://yourusername.github.io/framework-fusion-engine/`

## Key Features Available:
- ✅ Master Framework Dashboard with filtering and CRUD operations
- ✅ Assessments (Compliance Q&A and Auditor Assessment) with project tracking
- ✅ Reports with assessment result integration
- ✅ Full navigation with dropdown menus
- ✅ Export functionality for reports and assessments
- ✅ Responsive design for all screen sizes

## Troubleshooting:
If the page doesn't load:
1. Check browser console for errors (F12 > Console)
2. Ensure all dependencies are installed
3. Verify the correct base URL configuration
4. Check that the 404.html file is present for GitHub Pages SPA routing

## For Developers:
- Lovable development: Uses vite.config.ts (base: '/')
- GitHub Pages: Uses vite.config.github.ts (base: '/framework-fusion-engine/')
- Error handling and debugging logs are included in all components