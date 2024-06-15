import React from 'react'
import { Link } from 'react-router-dom'
import "./card.scss"
import { useLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'

const Card = ({item, isProfile}) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    const areYouSure = confirm("Are you sure you want to delete?");

    if (areYouSure) {
        try {
            const response = await apiRequest.delete(`/posts/delete/${item.id}`);
            if (response.status === 200) {
                alert("Post deleted successfully!");
                navigate("/");
            } else {
                alert("Failed to delete the post!");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while trying to delete the post.");
        }
    }
}

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className="imageContainer">
          <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className='title'>
          <Link  to={`/${item.id}`} >{item.name}</Link>
        </h2>
        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className='price'>$ {item.price}</p>
        <div className="bottom">
          <div className="features">
             <div className="feature">
               <img src="/clock.png" alt="" />
               <span>Age: {item.age}</span>
             </div>
             <div className="feature">
               <img src="/gender.png" alt="" />
               <span>Gender: {item.gender}</span>
             </div>
          </div>
          <div className="icons">
              {
                currentUser && !isProfile && (
                  <div className="icon" 
                   onClick={handleSave}
                   style={{
                     backgroundColor: saved ? "lime" : "white",
                   }}>
                       <img src="/save.png" alt="" />
                  </div>
                )
              }

              {currentUser && currentUser.username === "gaven" && currentUser.email === "gavendcosta@gmail.com" && (
                      <>
                         <div className="icon" onClick={handleDelete}>
                           <img src="/delete.png" alt="" />
                         </div>
                      </>
               )}

              <Link target='_blank' to="mailto:rescuestreets123@gmail.com">
                  <div className="icon">
                      <img src="/chat.png" alt="" />
                  </div>
              </Link>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card