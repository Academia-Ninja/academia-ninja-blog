import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Post from "@components/post"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <h1 className="title-heading">Blog</h1>
      <h6>Últimas postagens</h6>
      <hr />
      {posts.length === 0 ? (
        <p>Em breve novos conteúdos por aqui...</p>
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

export default IndexPage

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
          date
          title
          description
          tags
        }
      }
    }
  }
`
