
# Deployment Guide

## GitHub Pages (Recommended)

GitHub Pages deployment is automatically configured via GitHub Actions.

### Setup
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (created automatically)

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS records:
   ```
   CNAME www.yourdomain.com yourusername.github.io
   ```

## Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/framework-fusion-engine)

### Manual Setup
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/framework-fusion-engine)

### Manual Setup
1. Import your GitHub repository
2. Framework preset: Vite
3. No additional configuration needed

## Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Configuration

### Production Environment Variables
- No environment variables required for core functionality
- Optional: Analytics tracking IDs
- Optional: Error reporting services

### Security Headers
Recommended security headers for production:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Performance Optimization

- Gzip compression enabled by default
- Asset optimization via Vite
- Tree-shaking for minimal bundle size
- Lazy loading for route components

## Monitoring

Consider adding:
- Error tracking (Sentry, Rollbar)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Web Vitals)
- Uptime monitoring (UptimeRobot, Pingdom)
