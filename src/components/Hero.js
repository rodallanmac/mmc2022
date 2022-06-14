import React from 'react'

class Hero extends React.Component {

   

  render() {

    const { title, titleSub, image, category, herostylebg, } = this.props


    return (

        <div id="hero" className={`flex flex-col w-full mb4 relative `}>

                <div className={`w-full h-hero-fluid bg-cover bg-center ${herostylebg}` } style={{ backgroundImage: `url(${image})` }}>
                </div>

                <div className="w-full bg-white py-6 ">

                   <div className="-mt-20 bg-white  p-4 pt-8 mx-auto max-w-3xl" >
                      <div className="px-4 flex items-center mb-6">
                        <div className="h-2 w-16 bg-black mr-3"></div>
                        <div className="text-xs uppercase tracking-xwide font-bold">{category}</div>
                      </div>
                      <div className="px-4 text-3xl md:text-4xl font-bold lg:font-bold uppercase leading-none tracking-widest mb-4">{title}</div>

                    </div>
                    
                </div>
               

        </div>

    )
  }
}

export default Hero

