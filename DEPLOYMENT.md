# Deployment Instructions for Render.com

## Option 1: Static Site (Simple)
1. Connect your GitHub repo to Render.com
2. Choose "Static Site"
3. Set Build Command: `npm ci && npm run build`
4. Set Publish Directory: `build`
5. The `_redirects` file will handle routing

## Option 2: Web Service (Recommended for SPA routing issues)
1. Connect your GitHub repo to Render.com
2. Choose "Web Service" 
3. Set Build Command: `npm ci && npm run build`
4. Set Start Command: `npm run serve`
5. This uses Express.js to properly handle client-side routing

## Files Added for Deployment:
- `_redirects` - For static site hosting (Netlify/Render)
- `server.js` - Express server for web service option
- `render.yaml` - Render.com configuration
- `netlify.toml` - Alternative Netlify config
- `vercel.json` - Alternative Vercel config

## Troubleshooting 404 on Refresh:
If you get 404 errors when refreshing pages, use Option 2 (Web Service) as it properly handles React Router client-side routing.
