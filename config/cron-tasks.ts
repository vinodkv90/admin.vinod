export default {
    sitemapGenerate: {
    task: async ({ strapi }) => {
        try {
            console.log("Site get live");
            const url = `https://mindful-wealth-26c18ca11f.strapiapp.com/api/home`;
            await fetch(url);
            console.log("Site get live called");
        } catch (error) {
          strapi.log.error("Site get live error:", error);
        }
    },
    options: {
      rule: "0 * * * * *", // Every hour
    },
  }
};