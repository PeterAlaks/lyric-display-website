import matter from 'gray-matter';

const blogFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Load all blog posts with their metadata
 * @returns {Array} Array of blog post objects with metadata and content
 */
export function getAllPosts() {
  const posts = Object.entries(blogFiles).map(([filepath, content]) => {
    const { data, content: markdownContent } = matter(content);

    const slug = filepath
      .split('/')
      .pop()
      .replace('.md', '');

    return {
      slug,
      content: markdownContent,
      ...data,
    };
  });

  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Object|null} Blog post object or null if not found
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get posts by category
 * @param {string} category - The category name
 * @returns {Array} Array of blog posts in that category
 */
export function getPostsByCategory(category) {
  const posts = getAllPosts();
  if (category === 'All') return posts;
  return posts.filter(post => post.category === category);
}

/**
 * Get all unique categories from posts
 * @returns {Array} Array of category names
 */
export function getAllCategories() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  return ['All', ...categories.sort()];
}

/**
 * Search posts by title or excerpt
 * @param {string} query - Search query
 * @returns {Array} Array of matching blog posts
 */
export function searchPosts(query) {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery)
  );
}