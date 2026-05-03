import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Page metadata configuration
const PAGE_METADATA = {
  '/': {
    title: 'LyricDisplay - Professional Lyric Display Software for Live Production | Free & Open Source',
    description: 'Free professional lyric display software for church worship, live streaming, and concerts. Works with OBS, vMix, Wirecast. Multi-display output, real-time sync, mobile control.',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/integration-guide': {
    title: 'Integration Guide - Connect LyricDisplay with OBS, vMix & More',
    description: 'Step-by-step instructions to integrate LyricDisplay with OBS Studio, vMix, Wirecast, Streamlabs, and other production software.',
    keywords: 'LyricDisplay integration, OBS lyrics, vMix lyrics, browser source, production software setup',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/download': {
    title: 'Download LyricDisplay - Free Lyric Display Software',
    description: 'Download LyricDisplay for Windows, macOS, and Linux. Free, open-source professional lyric display software for live production and worship.',
    keywords: 'LyricDisplay download, free lyric software, OBS lyrics display, church projection software',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/donate': {
    title: 'Donate - Support LyricDisplay Development',
    description: 'Support LyricDisplay with one-time donations or recurring subscription plans',
    keywords: 'LyricDisplay donate, support LyricDisplay, Paystack donation, open source worship software',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/documentation': {
    title: 'Documentation - Complete Guide to LyricDisplay Features',
    description: 'Comprehensive documentation covering installation, setup, quick start, file formats, browser sources, network configuration, and troubleshooting guide.',
    keywords: 'LyricDisplay documentation, setup guide, installation, configuration, troubleshooting',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/feedback': {
    title: 'Feedback - Share Your Experience with LyricDisplay',
    description: 'Leave a review or report an issue with LyricDisplay. We\'d love to hear your feedback to improve our free lyric display software.',
    keywords: 'feedback, reviews, bug reports, support, contact',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/easyworship-import': {
    title: 'EasyWorship Import Guide - Import Songs to LyricDisplay',
    description: 'Step-by-step guide to import your song library from EasyWorship into LyricDisplay. Compatible with EasyWorship 2009 and later versions.',
    keywords: 'EasyWorship import, song import, LyricDisplay import, worship software migration',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  },
  '/blog': {
    title: 'Blog - Expert Guides & Tips for Lyric Display',
    description: 'Expert insights, tips, and guides for mastering lyric presentation in live productions.',
    keywords: 'lyric display blog, worship presentation tips, OBS lyrics guide, church tech blog',
    image: 'https://lyricdisplay.app/social-preview.png',
    type: 'website'
  }
};

/**
 * Generates HTML files for all pages with proper meta tags
 * This is run as a post-build step to pre-render routes
 */
export async function prerenderPages() {
  const distDir = path.join(__dirname, 'dist');

  // Read the base index.html
  const indexPath = path.join(distDir, 'index.html');
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Pre-render static pages
  for (const [route, metadata] of Object.entries(PAGE_METADATA)) {
    const outputPath = path.join(distDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    const outputDir = path.dirname(outputPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const updatedHtml = injectMetaTags(baseHtml, { ...metadata, url: `https://lyricdisplay.app${route}` });
    fs.writeFileSync(outputPath, updatedHtml, 'utf-8');
    console.log(`✓ Pre-rendered: ${route}`);
  }

  // Pre-render blog posts
  await prerenderBlogPosts();
}

/**
 * Generates HTML files for blog posts with proper meta tags
 * This is run as a post-build step to pre-render blog routes
 */
export async function prerenderBlogPosts() {
  const blogDir = path.join(__dirname, 'src/content/blog');
  const distDir = path.join(__dirname, 'dist');
  const blogDistDir = path.join(distDir, 'blog');

  // Create blog directory if it doesn't exist
  if (!fs.existsSync(blogDistDir)) {
    fs.mkdirSync(blogDistDir, { recursive: true });
  }

  // Read the base index.html
  const indexPath = path.join(distDir, 'index.html');
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Read all markdown files
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    // Skip unpublished posts
    if (!data.published) continue;

    const slug = file.replace('.md', '');
    const title = data.title || 'Blog Post';
    const description = data.excerpt || 'Read this article on LyricDisplay';
    const image = data.image || 'https://lyricdisplay.app/social-preview.png';
    const author = data.author || 'LyricDisplay Team';
    const publishedDate = data.date;
    const category = data.category || 'Blog';

    const blogUrl = `https://lyricdisplay.app/blog/${slug}`;

    const metadata = {
      title: `${title} | LyricDisplay`,
      description,
      image,
      url: blogUrl,
      type: 'article',
      author,
      publishedTime: publishedDate,
      category,
    };

    // Inject meta tags into the HTML
    const updatedHtml = injectMetaTags(baseHtml, metadata);

    // Write the pre-rendered file
    const outputPath = path.join(blogDistDir, `${slug}.html`);
    fs.writeFileSync(outputPath, updatedHtml, 'utf-8');
    console.log(`✓ Pre-rendered: /blog/${slug}`);
  }
}

/**
 * Injects meta tags into HTML
 */
function injectMetaTags(html, metadata) {
  const { title, description, image, url, type, author, publishedTime, category } = metadata;

  let updated = html;

  // Update title
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Update meta description
  updated = updated.replace(
    /<meta name="description" content=".*?"/,
    `<meta name="description" content="${escapeHtml(description)}"`
  );

  // Update canonical URL
  updated = updated.replace(
    /<link rel="canonical" href=".*?"/g,
    `<link rel="canonical" href="${url}"`
  );

  // Update Open Graph tags
  updated = updated.replace(
    /<meta property="og:type" content=".*?"/,
    `<meta property="og:type" content="${type}"`
  );
  updated = updated.replace(
    /<meta property="og:url" content=".*?"/,
    `<meta property="og:url" content="${url}"`
  );
  updated = updated.replace(
    /<meta property="og:title" content=".*?"/,
    `<meta property="og:title" content="${escapeHtml(title)}"`
  );
  updated = updated.replace(
    /<meta property="og:description" content=".*?"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`
  );
  updated = updated.replace(
    /<meta property="og:image" content=".*?"/,
    `<meta property="og:image" content="${image}"`
  );

  // Update Twitter tags
  updated = updated.replace(
    /<meta name="twitter:url" content=".*?"/,
    `<meta name="twitter:url" content="${url}"`
  );
  updated = updated.replace(
    /<meta name="twitter:title" content=".*?"/,
    `<meta name="twitter:title" content="${escapeHtml(title)}"`
  );
  updated = updated.replace(
    /<meta name="twitter:description" content=".*?"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );
  updated = updated.replace(
    /<meta name="twitter:image" content=".*?"/,
    `<meta name="twitter:image" content="${image}"`
  );

  // Add article-specific tags for blog posts
  if (type === 'article') {
    const articleTags = `${publishedTime ? `\n  <meta property="article:published_time" content="${publishedTime}" />` : ''}${author ? `\n  <meta property="article:author" content="${author}" />` : ''}${category ? `\n  <meta property="article:section" content="${category}" />` : ''}`;
    updated = updated.replace(
      /<meta property="og:site_name" content="LyricDisplay" \/>/,
      `<meta property="og:site_name" content="LyricDisplay" />${articleTags}`
    );
  }

  return updated;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await prerenderPages();
}
