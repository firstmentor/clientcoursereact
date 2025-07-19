import React from 'react'
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  return (
   <> 
    <div className="container py-5">
      <h2>Course Details - #{id}</h2>
      <p>This is a detailed description of course ID {id}.</p>
      <button className="btn btn-primary">Book Now</button>
    </div>
   
   </>
  )
}

export default CourseDetails