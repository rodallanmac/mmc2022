import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import arrowRightWhite from '../content/assets/arrow-right-white.svg'



export default function Index() {



  const data = useStaticQuery(graphql`
    query ImgQuery {
      allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
           name 
           childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
          }
        }
      }
    }
  `)

  const img = data.allFile.edges



  
    return (
      <Layout>
        
        <Seo
          title="Musgrave Methodist Church"
          keywords={[`musgrave methodist church`, `durban`, `church`, 'methodist', 'worship', 'prayer', 'godly play', 'fun', 'joy' ]}
        />

            <div className="w-full">
            <div className="mx-auto">

          
             
                 <Link to='/category/#'>
              
                   
                      {img.filter(x => x.node.name === "mmc-durban-bay").map(({ node }) => {
                      return ( 
                          <GatsbyImage image={getImage(node.childImageSharp.gatsbyImageData)} alt="..." className="mb3" style={{gridArea: "1/1", maxHeight: 500}} aspectRatio={3/1}/>
                      )
                      })}


                        <div className="w-full flex items-center justify-center bg-zinc-500">
                            <div className="px-8 py-6 text-white text-center rounded-lg">
                                <div className="text-2xl block tracking-wide leading-none mb-4">In my Father's house are many rooms</div>
                                <div className="text-sm tracking-wider text-gray-300 italic">Jesus comforts his disciples – John 14:2</div>
                           </div>
                        </div>
                   
                  
          
                </Link>


                <div className="w-full mx-auto max-w-5xl p-8 sm:p-20 text-center">
                  <div className="text-xl md:text-3xl font-semi-bold sm:font-light mb-4 leading-tight">Greetings to you from Musgrave Methodist Church, Durban, KwaZulu-Natal, South Africa</div>
                  <div className="text-normal font-normal text-gray-700">We welcome you to join us on our journey as we grow in the Grace of Jesus Christ, share his Love and make Him known. Browse through our site – it tells the story about our church, its people and their activities.</div>
                </div>    


                <div className="w-full">
                    <Link className="flex flex-wrap" to='/00-service-early-morning-service'>
      
                       {img.filter(x => x.node.name === "mmc-garden-church-cross").map(({ node }) => {
                      return ( 
                              <div className="h-max-600 w-full md:w-1/2 object-fill object-center overflow-hidden">
                                <GatsbyImage image={getImage(node.childImageSharp.gatsbyImageData)} alt="..." style={{gridArea: "1/1", maxHeight: 600}} aspectRatio={3/1}/>
                              </div>
                             )
                        })}
                        
                        <div className="w-full md:w-1/2 bg-purple-900 text-white ">
                          <div className="flex h-full items-center justify-center">
                          <div className="p-8 md:p-15 max-w-2xl  ">
                              <div className="text-xs tracking-xwide uppercase font-thin mb-4">CHURCH WORSHIP SERVICES</div>
                              <div className="text-2xl leading-tight mb-4">One family ... many expressions of God's Grace</div>
                              <div className="text-normal">Every Sunday there are two worship services – each with its own destinctive emphasis. One of which you are bound to find relevant and meaningful to you ...</div>
                              <img className="w-4 h-4 mt-8" src={arrowRightWhite} alt="arrow-right-white"/>
                          </div>
                          </div>
                        </div>
                    </Link>
                 
                </div>


                <div className="w-full mx-auto max-w-5xl p-8 sm:p-20 text-center">
                <div className="text-xs tracking-xwide uppercase font-thin mb-4">Children's Church</div>
                  <div className="text-xl md:text-3xl font-semi-bold sm:font-light mb-4 leading-tight">Have you heard?<br/> Godly play is now at Musgrave</div>
                  <div className="text-normal font-normal text-gray-700">Godly Play is a Christian teaching method centred on childhood spirituality. It provides mentorship to transform thinking and practice for the whole of life.</div>
                </div>


 

                  <div className="w-full">
                    <Link className="flex flex-wrap" to='/growth-00-godly-play'>
                      
                        <div className="flex w-full md:w-1/2 bg-yellow-600 text-white ">
                          <div className="flex items-center justify-center h-500">
                          
                          <div className="p-8 md:p-20 max-w-2xl">
                              <div className="text-xs tracking-xwide uppercase font-thin mb-4">CHILDRENS CHURCH</div>
                              <div className="text-2xl leading-tight mb-4">Godly Play – A safe place for personal spiritual growth within a supportive community of friends</div>
                              <div className="text-normal">At Musgrave we love <b>Godly Play</b> – a Christian teaching method centred on childhood spirituality to transform thinking and practice for the whole of life.</div>
                              <img className="w-4 h-4 mt-8" src={arrowRightWhite} alt="arrow-right-white"/>
                          </div>
                         
                          </div>
                        </div>


                        {img.filter(x => x.node.name === "gp-foe-family").map(({ node }) => {
                      return ( 
                              <div className="h-max-600 w-full md:w-1/2 object-fill object-center overflow-hidden">
                                <GatsbyImage image={getImage(node.childImageSharp.gatsbyImageData)} alt="..." style={{gridArea: "1/1", maxHeight: 600}} aspectRatio={3/1}/>
                              </div>
                             )
                        })}

                        <div className="h-max-600 w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url(https://s3.amazonaws.com/mmc-images/have-you-heard.jpg)" }} ></div>

                    </Link>
                 
                </div>  


        </div>
        </div>
    

      </Layout>
    )
  }




