import React, { useState, useRef  } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import logo from "../content/assets/logo.svg"
import {gsap} from 'gsap'

import { styled, keyframes } from '@stitches/react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { gray, indigo, purple, blackA } from '@radix-ui/colors';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});


const itemStyles = {
  padding: '8px 12px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: gray.gray12,
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${gray.gray7}` },
  '&:hover': { backgroundColor: gray.gray3 },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: 'unset',
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
});

const StyledCaret = styled(CaretDownIcon, {
  position: 'relative',
  color: gray.gray10,
  top: 1,
  '[data-state=open] &': { transform: 'rotate(-180deg)' },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'transform 250ms ease',
  },
});

const StyledTriggerWithCaret = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledTrigger {...props} ref={forwardedRef}>
    {children}
    <StyledCaret aria-hidden />
  </StyledTrigger>
));

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
});

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,

  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const StyledArrow = styled('div', {
  position: 'relative',
  top: '70%',
  backgroundColor: 'white',
  width: 10,
  height: 10,
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2,
});

const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
));

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  marginTop: 10,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  height: 'var(--radix-navigation-menu-viewport-height)',

  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)',
  },
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

// NAV Exports

const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = StyledLink;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;
const NavigationMenuIndicator = StyledIndicatorWithArrow;

const ContentList = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: 'none',

  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 500,
          gridTemplateColumns: '.75fr 1fr',
        },
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(3, 1fr)',
        },
      },
    },
  },
});

const ListItem = styled('li', {});

const LinkTitle = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: gray.gray12,
});

const LinkText = styled('p', {
  all: 'unset',
  color: gray.gray11,
  lineHeight: 1.4,
  fontWeight: 'initial',
});

const ContentListItem = React.forwardRef(({ children, title, ...props }, forwardedRef) => (
  <ListItem>
    <NavigationMenuLink
      {...props}
      ref={forwardedRef}
      css={{
        padding: 12,
        borderRadius: 6,
        '&:hover': { backgroundColor: gray.gray3 },
      }}
    >
      <LinkTitle>{title}</LinkTitle>
      <LinkText>{children}</LinkText>
    </NavigationMenuLink>
  </ListItem>
));

const ContentListItemCallout = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <ListItem css={{ gridRow: 'span 3' }}>
    <NavigationMenuLink
      {...props}
      href="/"
      ref={forwardedRef}
      css={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${purple.purple9} 0%, ${indigo.indigo9} 100%);`,
        borderRadius: 6,
        padding: 25,
      }}
    >
        <svg className="text-white" width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>      
        <LinkTitle
        css={{
          fontSize: 18,
          color: 'white',
          marginTop: 16,
          marginBottom: 7,
        }}
      >
        Musgrave Methodist
      </LinkTitle>
      <LinkText
        css={{
          fontSize: 14,
          color: gray.gray4,
          lineHeight: 1.3,
        }}
      >
        Two Sunday worship services each with their own destinctive emphasises.
      </LinkText>
    </NavigationMenuLink>
  </ListItem>
));

const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  top: '100%',
  left: 0,
  perspective: '2000px',
});


// ACCORDIAN
const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 0,
  backgroundColor: gray.gray6,
  boxShadow: `0 1px 10px ${blackA.blackA4}`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  '&:last-child': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px ${gray.gray12}`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
});

const AccordStyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: gray.gray11,
  boxShadow: `0 1px 0 ${gray.gray6}`,
  '&[data-state="closed"]': { backgroundColor: 'white' },
  '&[data-state="open"]': { backgroundColor: 'white' },
  '&:hover': { backgroundColor: gray.gray2 },
});

const StyledContentAccord = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: gray.gray11,
  backgroundColor: gray.gray2,

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },
});

const StyledContentText = styled('div', {
  padding: '15px 20px',
});

const StyledChevron = styled(CaretDownIcon, {
  color: gray.gray10,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});

// Exports
export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <AccordStyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledChevron aria-hidden />
    </AccordStyledTrigger>
  </StyledHeader>
));
export const AccordionContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledContentAccord {...props} ref={forwardedRef}>
    <StyledContentText>{children}</StyledContentText>
  </StyledContentAccord>
));




// DATA
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
<div className="bg-white py-4 md:py-8 ">

<div className="flex-wrap content-center hidden sm:flex-nowrap sm:block sm:visible">
<NavigationMenu className="flex justify-center w-screen z-10 relative">
    <div className="mx-3 md:mx-8">
    <Link to="/" >
        <img className="h-12 md:h-12 lg:h-14 " src={logo} alt='musgrave methodist church'/>
    </Link>
    </div>

     <NavigationMenuList classNmae="flex justify-center p-1 rounded-lg list-none">

      <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
      </NavigationMenuItem>
      
      { uniqCategories.map(
                           (cat,i) =>  
                              <>
                              <NavigationMenuItem key={'1.'+ i}>
                                <NavigationMenuTrigger className="capitalize">{cat}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  <ContentList layout="one">
                                    <ContentListItemCallout />
                                    {listTitles ? listTitles.filter( x => x.frontmatter.category === cat ).map( (x) =>  <Link key={x.slug} className="text-sm py-1 px-2 font-normal mr3 tracking-wide-xs block" to={`/${x.slug}`} ><ContentListItem title={x.frontmatter.title} > {x.frontmatter.description} </ContentListItem></Link> ) : 'hello'}
                                  </ContentList>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                                </>
                                )
      }

      <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
</NavigationMenu>
</div>


<div className="flex flex-wrap content-center justify-center visible sm:hidden">

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
        <Accordion key={'2.'+ i} type="single" defaultValue="item-1" collapsible className="container">
        <AccordionItem value="item-1">
        <AccordionTrigger className="font-semibold text-md  capitalize text-black">{cat}</AccordionTrigger>
        {listTitles ? listTitles.filter( x => x.frontmatter.category === cat ).map( (x) =>  <Link className="divide-y divide-blue-200" key={x.id} to={`/${x.slug}`} onMouseUp={menuFunction}>
          <AccordionContent title={x.frontmatter.title} > 
          <div className="font-semibold">{x.frontmatter.title}</div><p>{x.frontmatter.description}</p> 
          </AccordionContent></Link> ) : 'hello'}
        </AccordionItem>
        </Accordion>
        </>
        )
  }
  </div>

</div>



</div>
</div>
</>
)
}

export default Nav