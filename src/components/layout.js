import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              Linkedin
              Github
            }
          }
        }
      }
    `
  )

  const social = site.siteMetadata?.social

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Academia Ninja
        {Object.entries(social).map(([key, value]) => {          
          return (
            <React.Fragment key={key}>
              <span> | </span>
              <a href={value}>{key}</a>
            </React.Fragment>
          )
        })}
      </footer>
    </div>
  )
}

export default Layout
