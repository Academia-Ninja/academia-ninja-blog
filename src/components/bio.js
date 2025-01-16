import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
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
          Criada e liderada por{" "}
          <strong>
            <a href={author.site}>{author.name}</a>
          </strong>
          , carioca, apaixonado por tecnologia e educação. Com mais de 6 anos de
          experiência no setor, Ailton acumulou vivências enriquecedoras,
          contribuindo tanto para projetos do mercado quanto para iniciativas no
          mundo acadêmico e open source. Atualmente, atua como Engenheiro de
          Software na TIVIT, consolidando sua expertise e impulsionando soluções
          inovadoras no campo da tecnologia. <br />
          <br />
          Mas...{" "}
          <Link to="/academia-ninja/" itemProp="url">
            <strong>
              <span itemProp="headline">o que é a Academia Ninja?</span>
            </strong>
          </Link>
        </p>
      )}
    </div>
  )
}

export default Bio
