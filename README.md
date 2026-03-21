# Relentiv.com

This repository contains the production frontend for the Relentiv marketing site, built with React, TypeScript, and Vite.

## Local development

Prerequisites: Node.js 18+

1. Install dependencies:
   `npm install`
2. Update environment values in `.env`
3. Run the app:
   `npm run dev`

## Production tasks

1. Set `VITE_GA4_ID` before enabling analytics in production
2. Set `VITE_GOOGLE_SITE_VERIFICATION` for Search Console ownership verification
3. Replace the Formspree placeholder with the live contact endpoint
4. After deployment, submit `https://relentiv.com/sitemap.xml` to Google Search Console
