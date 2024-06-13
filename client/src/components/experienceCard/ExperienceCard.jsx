import React from 'react'
import "./experienceCard.scss"

const ExperienceCard = ({ image, number, title }) => {
  return (
    <div className='experienceCard'>
      <div className="wrapper">
        <div dangerouslySetInnerHTML={{ __html: image }} />
        <h1>{number}</h1>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default ExperienceCard
