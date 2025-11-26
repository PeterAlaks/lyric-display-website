import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  category
}) {
  const location = useLocation();
  const baseUrl = 'https://lyricdisplay.app';
  const fullUrl = `${baseUrl}${location.pathname}`;

  const defaultTitle = 'LyricDisplay - Professional Lyric Display Software for Live Production | Free & Open Source';
  const defaultDescription = 'Free professional lyric display software for church worship, live streaming, and concerts. Works with OBS, vMix, Wirecast. Multi-display output, real-time sync, mobile control.';
  const defaultImage = `${baseUrl}/social-preview.png`;

  const finalTitle = title ? `${title} | LyricDisplay` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  useEffect(() => {
    document.title = finalTitle;

    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    updateMetaTag('description', finalDescription);
    if (keywords) updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');

    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:site_name', 'LyricDisplay', true);

    if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
    if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, true);
    if (author) updateMetaTag('article:author', author, true);
    if (category) updateMetaTag('article:section', category, true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    if (type === 'article' && title) {
      let scriptTag = document.querySelector('script[type="application/ld+json"][data-blog-post]');

      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('data-blog-post', 'true');
        document.head.appendChild(scriptTag);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": finalDescription,
        "image": finalImage,
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "author": {
          "@type": author === "LyricDisplay Team" ? "Organization" : "Person",
          "name": author || "LyricDisplay Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "LyricDisplay",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/LyricDisplay-icon.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl
        }
      };

      if (category) {
        structuredData.articleSection = category;
      }

      scriptTag.textContent = JSON.stringify(structuredData);
    }

  }, [finalTitle, finalDescription, finalImage, fullUrl, type, keywords, author, publishedTime, modifiedTime, category]);

  return null;
}