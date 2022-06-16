import React, { useState, useRef, useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import logo from "../content/assets/logo.svg"
import {gsap} from 'gsap'
import { useLocation } from "@reach/router"


// Unique function
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const Nav = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

let menuReveal = useRef(null);

const menuFunction = (e) => {
  e.preventDefault() // Operate the drop down
  !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)
  gsap.from(menuReveal, { xPercent: 100, opacity: 0, ease: 'Power3.easeOut', duration: .6 });
  gsap.to(menuReveal, { xPercent: 0, opacity: 1, ease: 'Power3.easeOut', duration: .6});
}


const location = useLocation();
const menuColor = location.pathname !== '/'  ? 'black' : 'gray-50'
const menuBgColor = location.pathname !== '/'  ? 'bg-white' : 'bg-transparent'

const [scrollthisman, setScrollthisman] = useState(false);

useLayoutEffect(() => {
  var lastScrollTop = window.pageYOffset;
  const handleScroll = () => {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      // SCROLL MENU
      if (y > lastScrollTop && y > 300 ) { setScrollthisman('slideOutUp')}
      else {setScrollthisman('slideInDown') }
      lastScrollTop = y <= 0 ? 0 : y;
  }
    window.addEventListener("scroll", handleScroll);   
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


const data = useStaticQuery(graphql`
query ContentQuery {
site {
  siteMetadata {
    title
  }
}
allMdx(sort: { fields: [frontmatter___order], order: ASC }) {
  edges {
    node {
      id
      excerpt
      slug
      frontmatter {
        title
        order
        description
        category
        embeddedImagesLocal {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
        }
        embeddedImagesRemote {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
        }
      }
      timeToRead
    }
  }
}

}
`)

const content = data.allMdx.edges
let listCategory = content.map( ({ node }) =>  { return node.frontmatter.category }  )
const uniqCategories = listCategory.filter(onlyUnique).sort();
const listTitles = content.map( ({ node }) =>  { return node }  ).sort((a, b) => (a.frontmatter.order > b.frontmatter.order) ? 1 : -1)


return (
<>


<div className="sticky top-0 z-50 bg-white ">

<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
<div className="container flex flex-wrap justify-center items-center mx-auto">

<div className="flex items-center md:order-2">

<div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">

<Link to="/" className="flex items-center pr-12">
<img className="h-12 md:h-12 lg:h-14 " src={logo} alt='musgrave methodist church'/>
</Link>

  <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium relative">
      <li className="capitalize p-3">
       <Link to="/">Home</Link>  
      </li>


      { uniqCategories.map(
         (cat,i) =>  
            <>
              <li key={'1.'+ i} id={'1.'+ i} className="capitalize dropdown p-3">{cat}
              <div className="dropdown-content" >
                <div className="flex justify-center p-8 bg-white mt-8">
                <div className=" grid grid-cols-3 gap-4 place-content-center max-w-lg">
                  {listTitles ? listTitles.filter( x => x.frontmatter.category === cat ).map( (x) =>  
                  <div><Link key={x.slug} className="text-sm py-1 px-2 font-normal mr3 tracking-wide-xs block" to={`/${x.slug}`} >
                  <div className="block font-semibold">{x.frontmatter.title}</div>
                  <div className="">{x.frontmatter.description} </div>
                  </Link> </div>) : 'hello'}
                </div>
              </div>
              </div>
              </li>
              </>
          )
      }
    </ul>
</div>



<div className="flex flex-wrap content-center justify-center visible md:hidden">

  <div className="grid grid-cols-8 gap-4 content-center h-12">
      <div className="visible col-span-1 "></div>
      <Link to="/" className="col-span-5">
          <img className="h-12" src={logo} alt='musgrave methodist church'/>
      </Link>
      <div className="flex justify-end col-span-2 pr-2" onClick={menuFunction} >
        <div className="self-center">
          <svg className="w-6 h-6" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </div>
      </div>
  </div>

  <div ref={el => {menuReveal = el}} className={ isMenuOpen ? "fixed  top-20 left-0 right-0 bg-red-100" : "hidden" }>
  { uniqCategories.map(
      (cat,i) =>  
        <>
        <div  key={'2.'+ i} type="single" defaultValue="item-1" collapsible className="container">
        <div value="item-1">
        <div className="font-semibold text-md  capitalize text-black">{cat}</div>
        {listTitles ? listTitles.filter( x => x.frontmatter.category === cat ).map( (x) =>  <Link className="divide-y divide-blue-200" key={x.id} to={`/${x.slug}`} onMouseUp={menuFunction}>
          <div Content title={x.frontmatter.title} > 
          <div className="font-semibold">{x.frontmatter.title}</div><p>{x.frontmatter.description}</p> 
          </div></Link> ) : 'hello'}
        </div>
        </div>
        </>
        )
  }
  </div>

</div>
</div>
</div>
</nav>
</div>
</>
)
}

export default Nav