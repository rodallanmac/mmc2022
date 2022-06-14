import React from "react"
import logo from "../content/assets/logo-white.svg"



const Footer = () => {


return (
<footer className="w-full bg-purple-900" >


<div className="max-w-6xl mx-auto p-8">



    <div>
      <div className="mr-2 mb-2">
        <img src={logo} className="w-64"  alt="logo" />
      </div>
      <div className="flex flex-col text-white text-xs">
        <div className="text-065 tracking-xwide uppercase mb-1">Founded in 1877 • Durban • South Africa</div> 
      </div>
    </div>

          
    

    <section className="tracking-widest text-xs text-gray-300 mt-8">

      <span className="block">237 Musgrave Road</span>
      <span className="block">Musgrave</span>
      <span className="block">Durban </span>
      <span className="block">KwaZulu-Natal </span>
      <span className="block mb-4">South Africa </span>
      <a className="block" title="Call MMC" href="tel:+27312012005">
        +27 0 31 201 2005
      </a>
      <a className="block"  href="http://www.musgravemethodist.co.za">
        www.musgravemethodist.co.za
      </a>
    </section>


    <div className="text-gray-400 pt-16">
      <div className="text-xs tracking-widest">
        Copyright © <a href="http://www.lightship.co.za">Eidos Studios – {new Date().getFullYear()}</a>, Built with React.js & Gatsby.js 
      </div>
     </div>


  </div>

</footer>

)

}

export default Footer