import React from 'react';

// Simple SEO Meta Tags component for managing page metadata
// This component updates the document head with SEO-friendly meta tags
const useSeoMetaTags = (config) => {
  const {
    title = 'DP Studio - Professional Photography',
    description = 'Professional photography services for weddings, events, and special moments',
    image = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&fit=crop',
    url = 'https://dp-studio.onrender.com',
    type = 'website'
  } = config || {};

  React.useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(name.includes(':') ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Cleanup function
    return () => {
      document.title = 'DP Studio - Professional Photography Portfolio & Services';
    };
  }, [title, description, image, url, type]);
};

export default useSeoMetaTags;
