import React from "react"
import { Link, graphql} from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Seo from "./seo"
import Layout from './Layout' 
import { getImage, GatsbyImage} from 'gatsby-plugin-image'

const MdxPage = ({data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
<Layout location={location} title={siteTitle}>
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />

    
   <div id="editor" className="outline-none bg-white mx-auto min-h-screen "  >

        <GatsbyImage image={getImage(post.frontmatter.embeddedImagesLocal[0])}  className="" alt="..." style={{gridArea: "1/1", maxHeight: 500}} />

        <div id="hero" className="flex flex-col w-full mb4 relative">
                <div className="w-full bg-white py-6 ">
                    <div className="-mt-20 bg-white  p-4 pt-8 mx-auto max-w-2xl" >
                        <div className="px-4 flex items-center mb-6">
                        <div className="h-2 w-16 bg-black mr-3"></div>
                        <div className="text-xs uppercase tracking-xwide font-bold">{post.frontmatter.category}</div>
                        </div>
                        <div className="px-4 text-3xl md:text-4xl font-bold lg:font-bold uppercase leading-none tracking-widest mb-4">{post.frontmatter.title}</div>
                        <div className="px-4 italic tracking-widest mb-4">{post.frontmatter.description}</div>
                    </div>          
                </div>
        </div>

        <MDXRenderer
          remoteImages={post.frontmatter.embeddedImagesRemote}
          localImages={post.frontmatter.embeddedImagesLocal}
          title={post.frontmatter.title}
          category={post.frontmatter.category}
          description={post.frontmatter.description}
        >
          {post.body}
        </MDXRenderer>

        <div class="mb-10"></div>


       
  </div>

  <div className="h-24 grid grid-cols-2 gap-4 mx-auto content-center bg-gray-800" >
          <div className="">
            {next && (
              <Link className="flex justify-center content-center" to={`/${next.slug}`} rel="next">
                <div className="text-gray-300">←  {next.frontmatter.title}</div>
              </Link>
            )}
          </div>
          <div className="">
            {previous && (
              <Link className="flex justify-center" to={`/${previous.slug}`} rel="prev">
                <div className="text-gray-300">{previous.frontmatter.title} →</div>
              </Link>
            )}
          </div>
      </div>



</Layout>
  );
};

export const query = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        category
        description
        order
        embeddedImagesRemote {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      excerpt(pruneLength: 160)
      body
    }
  }
`;

export default MdxPage;
