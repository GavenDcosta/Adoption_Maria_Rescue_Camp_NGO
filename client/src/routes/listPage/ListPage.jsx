import React, { Suspense } from 'react'
import "./listPage.scss"
import Filter from '../../components/filter/Filter'
import Card from '../../components/card/Card'
import { useLoaderData } from 'react-router-dom'
import { Await } from 'react-router-dom'
import Donation from '../../components/donation/Donation'


const ListPage = () => { 

const data = useLoaderData()

  return (
    <div className='listPage'>
         <div className="listContainer">
              <div className="wrapper">
                 <Filter />
                 <Suspense fallback={<p>Loading...</p>}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={
                        <p>Error loading Posts!</p>
                      }
                    >
                      {(postResponse) => postResponse.data.map((post) => (
                         <Card key={post.id} item={post}/>
                      ))}
                    </Await>
                
                 </Suspense>
              </div>
         </div>
         <div className="mapContainer">
                 <Donation />
         </div>

         
    </div>
  )
}

export default ListPage
