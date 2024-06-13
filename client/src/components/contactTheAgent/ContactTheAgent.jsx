import React from 'react'
import "./contactTheAgent.scss"
import { Link } from "react-router-dom"

const ContactTheAgent = () => {
  return (
    <div className="contactTheAgent">
      <div className="wrapper">

        <h1>Connect with us 🐶</h1>
        <h3>( Maira Resccue Camp )</h3>

        <div className="items">
          <Link to="https://www.instagram.com/maria_mission_paws_rescue/" target='_blank'>
              <div className="item">
                <img src="/instagram.png" alt="" />
                <p>Instagram</p>
              </div>
          </Link>
          {/* <Link to="https://www.facebook.com/gaven.dcosta/" target='_blank'>
              <div className="item">
                <img src="/facebook.png" alt="" />
                <p>Facebook</p>
              </div>
          </Link>
          <Link to="mailto:gavendcosta@gmail.com" target='_blank'>
              <div className="item">
                <img src="/email.png" alt="" />
                <p>Email</p>
              </div>    
          </Link>
          <Link to="https://wa.me/919768333418" target='_blank'>
              <div className="item">
                <img src="/whatsapp.png" alt="" />
                <p>WhatsApp</p>
              </div>
          </Link> */}
        </div>

        <Link target='_blank' to="https://www.google.co.in/maps/search/Street:++26+Woolnough+Road+City:++Hawthorndene+State%2Fprovince%2Farea:+++South+Australia+Zip+code:++5051+Country:++Australia/@-35.0024746,138.0675943,10z?entry=ttu">
          <div className="address">
            Street:  26 Woolnough Road  <br />  
            City:  Hawthorndene <br />
            State/province/area: South Australia <br />
            Zip code:  5051 <br />
            Country:  Australia <br />
          </div>
        </Link>


        <h3>© {new Date().getFullYear()} Copyright: M&G WebWorks</h3>
      </div>
    </div>
  )
}

export default ContactTheAgent