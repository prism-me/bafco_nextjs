import React from "react";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://www.bafco.com/";

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      // our URL's will go here
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
