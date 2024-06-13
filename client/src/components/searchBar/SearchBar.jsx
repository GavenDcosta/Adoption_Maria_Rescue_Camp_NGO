import React from 'react'
import "./searchBar.scss"
import { useState } from 'react'
import { Link } from 'react-router-dom'

const types = ["Adopt"]

const SearchBar = () => {

  // const [query, setQuery] = useState({
  //   type:"buy",
  //   location:"",
  //   minPrice:0,
  //   maxPrice:0,
  // })

  // const switchType = (type) => {
  //     setQuery((prevQuery) => ({...prevQuery, type:type}))
  // }

  // const handleChange = (e) => {
  //   setQuery((prevQuery) => ({...prevQuery, [e.target.name]: [e.target.value]}))
  // }

  return (
    <div className="searchBar">
        <div className="type">
            {/* {types.map((type) => (
                <button key={type} onClick={() => switchType(type)} className={query.type === type ? "active" : ""}>
                    {type}
                </button>
            ))} */}
            <Link to="/list">
               <button style={{
                border: "1px solid black"
               }}>
                 View All Pets
               </button>
            </Link>
        </div>

        {/* <form action="">

            <input 
             type="text" 
             name="city" 
             placeholder='City'
             onChange={handleChange}
            />

            <input 
              type="number" 
              name="minPrice" 
              min={0} 
              max={1000000} 
              placeholder='Min Price'
              onChange={handleChange}
            />

            <input 
              type="number" 
              name="maxPrice" 
              min={0} 
              max={1000000} 
              placeholder='Max Price'
              onChange={handleChange}
            />

            <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
               <button>
                   <img src="/search.png" alt="search" />
               </button>
            </Link>

        </form> */}
    </div>
  )
}

export default SearchBar