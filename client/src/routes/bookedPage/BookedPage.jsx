import React, { Suspense } from 'react';
import "./bookedPage.scss";
import { useLoaderData } from 'react-router-dom';
import { Await } from 'react-router-dom';
import BookedCard from '../../components/bookedCard/BookedCard'; 
import { AuthContext } from "../../context/AuthContext.jsx"
import { useContext } from 'react';


const BookedPage = () => {
  const data = useLoaderData();
  console.log(data)
  
  return (
    <div className='bookedPage'>
      <div className="wrapper">
        <div className="cards">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading Posts!</p>}
            >
              {(postResponse) => {
                // Extract the post and user objects
                const bookedPosts = postResponse.data;
                return bookedPosts.map((bookedPost, index) => (
                  <BookedCard 
                    key={index} 
                    post={bookedPost.post} 
                    user={bookedPost.user} 
                    createdAt={bookedPost.createdAt}
                  />
                ));
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default BookedPage;