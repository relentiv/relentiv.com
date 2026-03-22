import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Router} from 'wouter';
import App from '../src/App.tsx';
import {HelmetProvider} from '../src/lib/helmet';
import {prerenderRoutes, specialPrerenderRoutes} from '../src/sitemap-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');
const APP_ROOT_MARKER = '<div class="antialiased font-sans">';

function collectHelmetMarkup(
  helmet: Partial<Record<'title' | 'priority' | 'meta' | 'link' | 'script', {toString: () => string}>>,
) {
  return [
    helmet.title?.toString() ?? '',
    helmet.priority?.toString() ?? '',
    helmet.meta?.toString() ?? '',
    helmet.link?.toString() ?? '',
    helmet.script?.toString() ?? '',
  ].join('');
}

function renderRoute(route: string) {
  const helmetContext: {
    helmet?: Partial<Record<'title' | 'priority' | 'meta' | 'link' | 'script', {toString: () => string}>>;
  } = {};

  const renderedHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <Router ssrPath={route}>
        <App />
      </Router>
    </HelmetProvider>,
  );

  const appRootIndex = renderedHtml.indexOf(APP_ROOT_MARKER);
  const extractedHelmetMarkup = appRootIndex >= 0 ? renderedHtml.slice(0, appRootIndex) : '';
  const appHtml = appRootIndex >= 0 ? renderedHtml.slice(appRootIndex) : renderedHtml;
  const helmetMarkup = `${collectHelmetMarkup(helmetContext.helmet ?? {})}${extractedHelmetMarkup}`;
  return {appHtml, helmetMarkup};
}

function injectHtml(template: string, appHtml: string, helmetMarkup: string) {
  return template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</head>', `${helmetMarkup}</head>`);
}

function defaultOutputPath(route: string) {
  if (route === '/') {
    return path.join(BUILD_DIR, 'index.html');
  }

  return path.join(BUILD_DIR, route.replace(/^\//, ''), 'index.html');
}

async function writeRoute(template: string, route: string, outputPath?: string) {
  const {appHtml, helmetMarkup} = renderRoute(route);
  const html = injectHtml(template, appHtml, helmetMarkup);
  const targetPath = outputPath ?? defaultOutputPath(route);

  await fs.mkdir(path.dirname(targetPath), {recursive: true});
  await fs.writeFile(targetPath, html, 'utf8');
}

async function main() {
  const template = await fs.readFile(TEMPLATE_PATH, 'utf8');

  for (const route of prerenderRoutes) {
    await writeRoute(template, route);
  }

  for (const route of specialPrerenderRoutes) {
    await writeRoute(template, route.route, path.join(BUILD_DIR, route.output));
  }

  console.log(`Prerendered ${prerenderRoutes.length + specialPrerenderRoutes.length} routes`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
