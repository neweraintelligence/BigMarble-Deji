# Render Deployment Guide

## Big Marble Farms AI Training Portal

This guide will help you deploy the simplified AI training portal to Render.

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub (already done ✅)
2. **Render Account**: Sign up at [render.com](https://render.com) if you haven't already

## Deployment Steps

### 1. Connect GitHub to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `BigMarblePortalSimplified`

### 2. Configure Web Service

**Basic Settings:**
- **Name**: `bigmarble-ai-training-portal`
- **Region**: Oregon (recommended)
- **Branch**: `main`
- **Root Directory**: `Clients + Projects/Big Marble Farms/Workshop/Workshop Portal`
- **Runtime**: Node
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`

**Advanced Settings:**
- **Auto-Deploy**: Yes (recommended)
- **Health Check Path**: `/` (default)

### 3. Environment Variables

Add these environment variables in the Render dashboard:

**Required:**
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**Optional (if using features):**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies (`npm ci`)
   - Build the application (`npm run build`)
   - Start the server (`npm start`)

### 5. Access Your Deployed App

Once deployment completes (usually 2-5 minutes), your app will be available at:
`https://bigmarble-ai-training-portal.onrender.com`

## Configuration Files

### render.yaml
The `render.yaml` file is configured for automatic deployment with optimal settings for a Next.js app.

### .env.example
Contains all environment variables you might need. Copy relevant ones to your Render environment variables.

## Troubleshooting

### Build Failures
- Check the build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node version compatibility (using Node 18+ recommended)

### Runtime Errors
- Check the service logs in Render dashboard
- Verify environment variables are set correctly
- Ensure database connections (if any) are configured

### Performance
- The app is configured for production optimizations
- Static assets are automatically optimized by Next.js
- Consider upgrading to a paid plan for better performance

## Features Working Out of the Box

✅ **Static Content**: All pages render correctly  
✅ **Navigation**: Full sidebar and page navigation  
✅ **Responsive Design**: Works on mobile and desktop  
✅ **AI Tools Explorer**: Browse tools without authentication  
✅ **Course Materials**: View training session content  

## Features Requiring Configuration

🔧 **Authentication**: Requires Supabase or Auth0 setup  
🔧 **AI Chat**: Requires OpenAI API key  
🔧 **Database**: Requires Supabase configuration  

## Custom Domain (Optional)

To use a custom domain:
1. Go to your service in Render dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS

## Cost Estimate

- **Free Tier**: Available but with limitations (sleeps after 15 minutes of inactivity)
- **Starter Plan**: $7/month (recommended for training sessions)
- **Standard Plan**: $25/month (for production use)

## Support

If you encounter issues:
1. Check Render's [documentation](https://render.com/docs)
2. Review build/runtime logs in the dashboard
3. Ensure your GitHub repository is up to date

---

**Repository**: https://github.com/Siloewen/BigMarblePortalSimplified  
**Deployment Date**: Created for September 2025 AI Training Session