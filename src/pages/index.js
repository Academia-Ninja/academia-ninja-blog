import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Post from "../components/post"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <h1 className="title-heading">Blog</h1>
      {posts.length === 0 ? (
        <p>Não foram encontradas postagens no blog.</p>
      ) : (
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => (
            <Post post={post} key={post.fields.slug} />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
