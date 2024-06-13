import React from 'react'
import "./donation.scss"
import {Link} from "react-router-dom"

const Donation = () => {
  return (
    <div className='donation'>
        <div className="wrapper">
          <div className="donate">
             <h1>Support our NGO</h1>
             <p>Every donation brings us closer to rescuing more dogs in need. Your contribution helps provide shelter, food, and medical care for abandoned and stray dogs, giving them a chance at a better life filled with love and care.</p>
             <Link target='_blank' to="https://www.paypal.com/donate/?hosted_button_id=74Z45Z5PADK9L&fbclid=PAAab9bPrfcq4XKkly-NeeHpNvMb3RGP5IZAYMweTqyfmVyK2KDLTThgDUOvY">
                <button>
                  Donate Now
                </button> 
             </Link>
          </div>
          <div className="donate">
            <h1>New Shelter Construction</h1>
            <p>Your support will help us build a new shelter, providing a safe haven for rescued dogs. Together, we can create a nurturing environment where every dog receives love, care, and a chance for a brighter future.</p>
            <Link target='_blank' to="https://donorbox.org/shelterconstruction">
                <button>
                  New Shelter Contruction
                </button> 
            </Link>  
          </div>
        </div>
    </div>
  )
}

export default Donation