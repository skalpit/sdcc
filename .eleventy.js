const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets/css/output.css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  
  // Watch for changes in CSS
  eleventyConfig.addWatchTarget("src/assets/css/");
  
  // Date filter for displaying dates nicely
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Short date filter
  eleventyConfig.addFilter("shortDate", function(date) {
    return new Date(date).toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric'
    });
  });
  
  // Limit filter for arrays
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Filter to URL-encode SVG for inline CSS background-image
    eleventyConfig.addFilter("urlEncodeSvg", function(svgString) {
        // Encode most common characters that cause issues in data URIs
        // This regex specifically targets characters that need encoding for URL contexts
        const encoded = encodeURIComponent(svgString)
            .replace(/'/g, '%27')  // Single quotes
            .replace(/"/g, '%22'); // Double quotes

        // Optional: further optimize for CSS data URI by replacing characters
        // that are safe unencoded in URLs but not necessarily in HTML attributes.
        // For SVGs in background-image, some characters like #, <, > are essential to encode.
        // However, encodeURIComponent already handles most of these.
        // We ensure a few CSS-specific ones are also covered.
        const finalEncoded = encoded
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29');

        return finalEncoded;
    });
  
  // Image optimization shortcode (updated for Eleventy 3.x)
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    if(alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }
    
    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/images/optimized/",
      urlPath: "/assets/images/optimized/"
    });
    
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  // Configuration for GitHub Pages
  let pathPrefix = "/";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`;
  }
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: pathPrefix
  };
};