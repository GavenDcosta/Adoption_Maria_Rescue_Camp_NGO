import React, { useContext } from 'react'
import "./homePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'

const HomePage = () => {

  const {currentUser} = useContext(AuthContext) 

  console.log(currentUser)

  return (
    <div className='homePage'>
        <div className="textContainer">
          <div className="wrapper">
                <h1 className='title'>
                    Find Your Perfect Companion with Expert Care
                </h1>
                <p className="description">
                    Welcome to our pet adoption platform! As a dedicated and passionate team, we are here to help you find your perfect furry friend. Whether you're looking to adopt a dog, cat, or any other animal, we provide personalized guidance to ensure a seamless adoption process. Let's work together to give these animals the loving homes they deserve.
                </p>
            <SearchBar />
            <div className="boxes">
                {/* <div className="box">
                    <h1>16+</h1>
                    <h2>Years of Expirence</h2>
                </div>

                <div className="box">
                    <h1>200+</h1>
                    <h2>Awards gained</h2>
                </div>
 
                <div className="box">
                    <h1>1200+</h1>
                    <h2>Property Ready</h2>
                </div> */}

                <h3>© {new Date().getFullYear()} Copyright: M&G WebWorks</h3>
            </div>

            
           
            
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div> 
    </div>
  )
}
 
export default HomePage
