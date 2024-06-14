import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import apiRequest from "../../lib/apiRequest";
import UploadWidget from '../../components/uploadWidget/UploadWidget'
import { useNavigate } from "react-router-dom"

function NewPostPage() {

  const [value, setValue] = useState("")
  const [images, setImages] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const inputs = Object.fromEntries(formData)

    try{
        const res = await apiRequest.post("/posts", {
          postData: {
            name: inputs.name,
            gender: inputs.gender,
            price: parseInt(inputs.price),
            address: inputs.address,
            city: inputs.city,
            age: parseInt(inputs.age),
            status: inputs.status,
            images: images,
          },
          postDetail: {
            description: value,
            species: inputs.species,
            breed: inputs.breed,
            temperament: inputs.temperament,
            vaccinationStatus: inputs.vaccination,
            income: inputs.income,
          },
        })

        navigate("/"+res.data.id)

    }catch(error){
      console.log(error)
      setError(error.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="item">
              <label htmlFor="gender">Gender</label>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="price">Price in Dollars</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="age">Age(optional)</label>
              <input min={0} id="age" name="age" type="number" />
            </div>
            <div className="item">
              <label htmlFor="species">Species(dog,cat,etc)</label>
              <input id="species" name="species" type="text" />
            </div>
            <div className="item">
              <label htmlFor="breed">Breed(optional)</label>
              <input id="breed" name="breed" type="text" />
            </div>

            <div className="item">
              <label htmlFor="temperament">Temperament</label>
              <select name="temperament">
                <option value="friendly" defaultChecked>
                  Friendly
                </option>
                <option value="shy">
                  Shy
                </option>
                <option value="energetic">
                  Energetic
                </option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="vaccination">Vaccination Status</label>
              <select name="vaccination">
                <option value="vaccianted">Vaccinated</option>
                <option value="not_vaccianted">Not Vaccinated</option>
              </select>
            </div>


            <div className="item">
              <label htmlFor="status">Adoption Status</label>
              <select name="status">
                <option value="not_adopted">Not Adopted</option>
                <option value="adopted">Adopted</option>
                <option value="booking">booking</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>

            <button disabled={isLoading} className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {
          images.map((image, index) => (
            <img src={image} alt="" key={index} />
          ))
        }
        <UploadWidget uwConfig={{
             cloudName: "dmhr3fumd",
             uploadPreset: "mgrealestate",
             multiple: true,
             folder: "posts"
         }} 
         setState={setImages}
        />
        <p style={{color:"red", fontWeight:800}}>Note : Max 4 images</p>
      </div>
    </div>
  );
}

export default NewPostPage;