import React, {useContext} from 'react'
import "./bookedCard.scss"
import { AuthContext } from '../../context/AuthContext';
import {format} from "timeago.js"
import { Link } from 'react-router-dom'


const BookedCard = ({post, user, createdAt}) => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='bookedCards'>
        <div className="wrapper">
            <img src={post.images[0]} alt="" />

            <div className="content">

                <div className="about">
                    <h3>Name: {post.name}</h3>
                    <div className="size">
                      <img src="/gender.png" alt="" />
                      <p>{post.gender}</p>
                    </div>
                </div>

                <div className="about">
                    <h3 className='price'>Price: {post.price}$</h3>
                    <div className="size">
                      <img src="/status.jpg" alt="" />
                      <p>{post.status}</p>        
                    </div>
                </div>

                <div className="user">
                    <div className="head">
                       <h4>Booked By</h4>
                    </div>
                    <div className="userinfo">
                       <img src={user.avatar} alt="" />
                       <div className="userdetails">
                         <p>username: {" "} {user.username}</p>

                         {(currentUser.username === "gaven" && currentUser.email === "gavendcosta@gmail.com") || 
                          (currentUser.username === "Maria_mission_paws_rescue" && currentUser.email === "rescuestreets123@gmail.com") && (
                           <Link
                             style={{
                               textDecoration: "underline",
                               color: "blue",
                               transition: "color 0.3s ease", // Smooth transition for color change
                             }}
                             target="_blank"
                             to={`mailto:${user.email}`}
                             onMouseEnter={(e) => { e.target.style.color = "dodgerblue"; }} // Change color on hover
                             onMouseLeave={(e) => { e.target.style.color = "blue"; }} // Restore color when not hovering
                           >
                             <p>{user.email}</p>
                           </Link>
                         )}
                       </div>
                    </div>
                </div>

                <div className="foot">
                    <p>Booked {format(createdAt)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookedCard