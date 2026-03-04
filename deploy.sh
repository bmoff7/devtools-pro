#!/bin/bash
set -e

echo ""
echo "============================================"
echo "  DevTools Pro - Setup & Deploy"
echo "============================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Install it from https://nodejs.org (LTS version recommended)"
    exit 1
fi

echo "Node.js $(node --version) detected"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install --silent

# Build the project
echo ""
echo "Building the project..."
npm run build

echo ""
echo "============================================"
echo "  Build successful!"
echo "============================================"
echo ""
echo "NEXT STEPS - Choose a deployment option:"
echo ""
echo "OPTION 1: Deploy to Vercel (Recommended - Free)"
echo "  1. Install Vercel CLI:  npm i -g vercel"
echo "  2. Deploy:              vercel --prod"
echo "  3. Follow the prompts (defaults are fine)"
echo ""
echo "OPTION 2: Deploy to Netlify (Free)"
echo "  1. Install Netlify CLI: npm i -g netlify-cli"
echo "  2. Deploy:              netlify deploy --prod"
echo ""
echo "OPTION 3: Run locally"
echo "  npm start"
echo "  Then open http://localhost:3000"
echo ""
echo "============================================"
echo "  HOW TO MAKE MONEY"
echo "============================================"
echo ""
echo "MONETIZATION OPTION 1: Google AdSense (Easiest)"
echo "  1. Sign up at https://www.google.com/adsense"
echo "  2. Get your publisher ID (ca-pub-XXXXXXXXX)"
echo "  3. Add it as NEXT_PUBLIC_ADSENSE_ID env variable"
echo "  4. Add ad units to your pages"
echo "  5. Revenue: ~\$2-5 per 1,000 pageviews"
echo ""
echo "MONETIZATION OPTION 2: Stripe Pro Tier (\$9.99 one-time)"
echo "  1. Create a Stripe account at https://stripe.com"
echo "  2. Get your API keys from the dashboard"
echo "  3. Set STRIPE_SECRET_KEY env variable"
echo "  4. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable"
echo ""
echo "MONETIZATION OPTION 3: Affiliate/Sponsor Links"
echo "  Add links to developer tools/services you recommend"
echo ""
echo "SEO TIPS (to grow traffic to \$100+/month):"
echo "  - Submit your sitemap to Google Search Console"
echo "  - Share on Reddit (r/webdev, r/programming)"
echo "  - Post on Hacker News, Product Hunt, dev.to"
echo "  - Each tool page is already SEO-optimized"
echo ""
