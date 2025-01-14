import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            site
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      {author?.name && (
        <p>
          Criada por <strong><a href={author.site}>{author.name}</a></strong> {author?.summary || null}
        </p>
      )}
    </div>
  )
}

export default Bio
