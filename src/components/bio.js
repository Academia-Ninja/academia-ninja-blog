import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
  const careerLength = (new Date().getFullYear() - 2018)

  return (
    <div className="bio">
      {author?.name && (
        <p>
          A Academia Ninja foi criada em 2021 por{" "}
          <strong>
            <a href={author.site} target="blank">
              {author.name}
            </a>
          </strong>
          , carioca, apaixonado por tecnologia e educação. Engenheiro de
          Software com {careerLength} anos de experiência no setor, Ailton acumulou
          vivências enriquecedoras, consolidando sua expertise e impulsionando
          soluções inovadoras no campo da tecnologia. Ao longo da trajetória,
          contribuiu (e ainda contribui!) tanto para projetos do mercado quanto
          para iniciativas no mundo acadêmico e de código aberto.
          <br />
          <br />
          Somos uma comunidade de tecnologia que conta com um espaço
          colaborativo dedicado ao ensino e aprendizado de linguagens de
          programação aplicado em projetos reais. O nosso objetivo é apoiar e
          instruir calouros da faculdade e iniciantes na área de Tecnologia da
          Informação e também desenvolver um ambiente onde todos possam
          compartilhar ideias, contribuir em soluções e desenvolver novos
          projetos.
          <br />
          <br />
          Este blog se tornou parte do projeto e é mantido pelos membros da
          comunidade, aqui compartilharemos conteúdos diversos sobre Tecnologia
          e Carreira em Tecnologia da Informação.
        </p>
      )}
    </div>
  )
}

export default Bio
