import React, { useContext, useEffect, Suspense } from 'react'
import "./aboutPage.scss"
import List from "../../components/list/List"
import apiRequest from '../../lib/apiRequest'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext.jsx"
import { Await } from 'react-router-dom'
import ContactTheAgent from '../../components/contactTheAgent/ContactTheAgent.jsx'
import ExperienceCard from '../../components/experienceCard/ExperienceCard.jsx'
import { cardsData } from '../../lib/cardsData.jsx'

const ProfilePage = () => {


  return (
        <div className='profilePage'>
        <div className="details">
            <div className="wrapper">
                <div className="section1">
                  <img src="/maria_about.png" alt="" />
                  <div className="info">
                    <h3>Maria: Dedicated to saving furry lives, one paw at a time. 🐾 Passionate about animal rescue and advocacy. Join me in spreading love and compassion🐾</h3>
                    <p>Maria, dedicated to saving furry lives one paw at a time, embarked on her journey despite warnings. Her passion for animal rescue and advocacy fueled her determination. She encountered challenges, yet remained steadfast, driven by her mission to bring love and compassion to every dog in need.
                      Along the way, Maria met skeptics who doubted her cause. They urged her to turn back, claiming her efforts would be futile. But Maria refused to waver. Despite facing obstacles, she pressed on, guided by her unwavering commitment to the well-being of every dog she encountered.</p>
                  </div>
                </div>
                <div className="section2">
                    {cardsData.map((card) => (
                       <ExperienceCard key={card.id} image={card.icon} number={card.num} title={card.text} />
                    ))}
                </div>
            </div>
        </div>
        <div className="chatContainer">
            <div className="wrapper">
              <ContactTheAgent />
            </div>
        </div>
    </div>
    )
}

export default ProfilePage