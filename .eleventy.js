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
  

  // Sponsor filtering filters
  eleventyConfig.addFilter("selectattr", function(array, attr, value) {
    return array.filter(item => {
      if (value === "equalto") {
        return item[attr] === arguments[3];
      }
      return item[attr] === value;
    });
  });

  eleventyConfig.addFilter("rejectattr", function(array, attr, operator, value) {
    return array.filter(item => {
      if (operator === "in") {
        return !value.includes(item[attr]);
      }
      if (operator === "search") {
        return !item[attr].toLowerCase().includes(value.toLowerCase());
      }
      return item[attr] !== value;
    });
  });

  // Custom filter for sponsor type searching
  eleventyConfig.addFilter("search", function() {
    // This is handled in the template logic
    return true;
  });

  // Add global data for sponsors with proper ordering
  eleventyConfig.addGlobalData("sponsorTypes", {
    "Platinum": { order: 1, color: "gray", icon: "star" },
    "Diamond": { order: 2, color: "blue", icon: "heart" },
    "Gold": { order: 3, color: "yellow", icon: "star" },
    "Silver": { order: 4, color: "gray", icon: "thumbs-up" },
    "General": { order: 5, color: "primary", icon: "heart" },
    "Community": { order: 6, color: "primary", icon: "heart" },
    "Boundary Sign": { order: 7, color: "primary", icon: "heart" }
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
  
  // Configuration for Azure Static Web Apps
  // Azure serves from root, so no path prefix needed
  let pathPrefix = "/";
  
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