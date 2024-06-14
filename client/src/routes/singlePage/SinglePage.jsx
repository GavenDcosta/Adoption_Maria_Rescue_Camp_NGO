import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";
import Donation from "../../components/donation/Donation";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.name}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/vaccination.png" alt="" />
              <div className="featureText">
                <span>Vaccination Status</span>
                {post.postDetail.vaccinationStatus === "vaccianted" ? (
                  <p>Vaccination is done</p>
                ) : (
                  <p>Not Vaccianted Yet</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/species.jpg" alt="" />
              <div className="featureText">
                <span>Species</span>
                {post.postDetail.species? (
                  <p>{post.postDetail.species}</p>
                ) : (
                  <p>NA</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">About</p>
          <div className="sizes">
            <div className="size">
              <img src="/breed.png" alt="" />
              {post.postDetail.breed? (
                <p>Breed: {post.postDetail.breed}</p>
              ) : (
                <p>Breed: NA</p>
              )}
            </div>
            <div className="size">
              <img src="/age.png" alt="" />
              {
                post.age? (<span>{post.age}</span>): (<span>NA</span>)
              }
            </div>
            <div className="size">
              <img src="/gender.png" alt="" />
              <span>{post.gender}</span>
            </div>
          </div>

          
          <p className="title">Additional Details</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Temperament</span>
                <p>
                  {post.postDetail.temperament}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/status.jpg" alt="" />
              <div className="featureText">
                <span>Status</span>
                <p>{post.status}</p>
              </div>
            </div>
            {/* <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurent}m away</p>
              </div>
            </div> */}
          </div>
          
          <div className="buttons">
            <Link target='_blank' to="https://www.instagram.com/direct/t/17845898502157209/">
                <button>
                  <img src="/chat.png" alt="" />
                  Send a Message
                </button> 
            </Link>

            <button
              onClick={handleSave} 
              style={{
                backgroundColor: saved ? "lime" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Post Saved" : "Save the Post"}
            </button>
          </div>

          <p className="title">Support our NGO</p>

          <div className="buttons">
            <Link target='_blank' to="https://www.paypal.com/donate/?hosted_button_id=74Z45Z5PADK9L&fbclid=PAAab9bPrfcq4XKkly-NeeHpNvMb3RGP5IZAYMweTqyfmVyK2KDLTThgDUOvY">
                <button>
                 Make a Donation
                </button> 
            </Link>

            <Link target='_blank' to="https://donorbox.org/shelterconstruction">
                <button>
                  New Shelter Contruction
                </button> 
            </Link>          
          </div>

        </div>
      </div>
    </div>
  );
}

export default SinglePage;