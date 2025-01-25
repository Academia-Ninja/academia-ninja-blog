import React, { useState } from "react"
import { Link } from "gatsby"

const Navbar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {title}
        </Link>
        <button
          className="navbar-hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={`line ${isOpen ? "open" : ""}`}></span>
          <span className={`line ${isOpen ? "open" : ""}`}></span>
          <span className={`line ${isOpen ? "open" : ""}`}></span>
        </button>
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" activeClassName="active">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about" activeClassName="active">
              Sobre nós
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
