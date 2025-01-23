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
          Criada por{" "}
          <strong>
            <a href={author.site}>{author.name}</a>
          </strong>
          , carioca, apaixonado por tecnologia e educação. Engenheiro de
          Software com mais de 6 anos de experiência no setor, Ailton acumulou
          vivências enriquecedoras, consolidando sua expertise e impulsionando
          soluções inovadoras no campo da tecnologia. Ao longo da trajetória,
          contribuiu (e ainda contribui!) tanto para projetos do mercado quanto
          para iniciativas no mundo acadêmico e de código aberto.
          <br />
          <br />
          - Beleza, mas... o que é a Academia Ninja?
          <br />
          <br />O objetivo da Academia Ninja sempre foi apoiar e instruir
          calouros da faculdade e iniciantes na área de Tecnologia da
          Informação, para todos poderem trocar ideias, contribuir em soluções e
          em novos projetos. Conheça mais da nossa história em:{" "}
          <Link to="/academia-ninja/" itemProp="url">
            <strong>
              <span itemProp="headline">O que é a Academia Ninja?</span>
            </strong>
          </Link>
        </p>
      )}
    </div>
  )
}

export default Bio
