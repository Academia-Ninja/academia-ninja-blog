/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Academia Ninja`,
    author: {
      name: `Ailton Loures`,
      site: `https://www.linkedin.com/in/ailton-loures`,
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
        modulePath: `${__dirname}/plugins/decap-cms/index.js`,
        publicPath: `admin`,
        htmlTitle: `Admin | Academia Ninja`,
        htmlFavicon: `static/img/logo.jpg`,
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
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
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
            title: "Academia Ninja RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Academia Ninja`,
        short_name: `Academia Ninja`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `static/img/logo.jpg`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-GXYZTT4JZP", "GT-MK4T5ZTG"],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": `${__dirname}/src/components`,
          "@helpers": `${__dirname}/src/helpers`,
          "@pages": `${__dirname}/src/pages`,
          "@templates": `${__dirname}/src/templates`,
          "@shared": `${__dirname}/src/shared`,
          "@posts": `${__dirname}/content/posts`,
        },
        extensions: [
          "js",
        ],
      }
    }
  ],
}
