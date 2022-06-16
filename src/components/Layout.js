import React from "react"
import Nav from "./nav"
import Footer from "./Footer"
import { MDXProvider } from "@mdx-js/react"
import { getImage, GatsbyImage, StaticImage } from 'gatsby-plugin-image'


const Layout = ({ children }) => {
  const shortcodes = { getImage, GatsbyImage, StaticImage }
  return (
    <MDXProvider components={shortcodes}>
      <div className="w-100 app-wrapper">
        <Nav/>
        <div className="body w-full">
          {children}
        </div>
        <Footer/>
      </div> 
    </MDXProvider> 
  )
}

export default Layout
