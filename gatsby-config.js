/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Academia Ninja Blog`,
    author: {
      name: `Ailton Loures`,
      summary: `que vive no Rio de Janeiro e é apaixonado por tecnologia e educação, está na área há mais de 6 anos e já trabalhou em diversos projetos de mercado e acadêmico, hoje atua como Engenheiro de Software na TIVIT.`,
      site: `https://www.linkedin.com/in/ailton-loures`
    },
    description: `Blog de conteúdos sobre tecnologia e desenvolvimento pessoal`,
    siteUrl: `https://blog.academia-ninja.com/`,
    social: {
      Github: `https://github.com/Academia-Ninja`,
      Linkedin: `https://www.linkedin.com/in/ailton-loures`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        publicPath: `admin`,
        htmlTitle: `Admin | Academia Ninja Blog`,
        htmlFavicon: `src/images/academia-ninja-icon.jpg`,
        includeRobots: false,
        enableIdentityWidget: true,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Academia Ninja Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Academia Ninja Blog`,
        short_name: `Academia Ninja`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/academia-ninja-icon.jpg`, // This path is relative to the root of the site.
      },
    },
  ],
}
