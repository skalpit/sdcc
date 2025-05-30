module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
