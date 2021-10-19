import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function UserReviews({ id, author, authorImage, movieTitle, movieImage, content, onUpdateReview, onDeleteReview, personalRating}) {
    const [canEditReview, setCanEditReview] = useState(false)
    const [canDeleteReview, setCanDeleteReview] = useState(false)
    const [updatedContent, setUpdatedContent] = useState('')
    const [updatedRating, setUpdatedRating] = useState(null)




    function toggleEditReview() {
        setCanEditReview(!canEditReview)
    }

    function toggleDeleteReview() {
        setCanDeleteReview(!canDeleteReview)
    }

    function handleContentChange(event) {
        setUpdatedContent(event.target.value);
      
    }

    function handleUpdateRating(event) {
        setUpdatedRating(event.target.value)
    }

    function handleUpdateReview(e) {
        e.preventDefault()
    //   resetCurrentUser(null)
    //   history.push("/login");
        const formData = {
            content: updatedContent,
            personal_rating: updatedRating
        }
        fetch(`http://localhost:3001/reviews/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"content": formData.content, personal_rating: parseInt(formData.personal_rating)}),
      })
        .then((response) => response.json())
        .then((data) => {
            onUpdateReview(data, formData)
        })
        setUpdatedContent("")
        setCanEditReview()
    }

    function handleDeleteReview() {
        fetch(`http://localhost:3001/reviews/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
    })
    onDeleteReview(id)
    }

    return (
            <div style={{border: "1px solid black"}} className="user-reviews">
            <h2>{movieTitle}</h2>
            <img style={{height: "50px"}} src={movieImage} alt={movieTitle}></img>
            <h4>{content}</h4>
            <h4>Your rating: {personalRating}</h4>
            <button onClick={toggleEditReview}>{canEditReview ? "Nevermind" : "Edit Review"}</button>
            {canEditReview ?
            <div>
            <form onSubmit={handleUpdateReview}>
                <label>
                Edit Your Review
                    <input type="text" name="content" value={updatedContent} onChange={handleContentChange} />
                </label>

                <select onChange={handleUpdateRating}>
                    <option value=''>Update Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type="submit" value="Submit" />
            </form>
            </div>
            :
            null
            }
            <button onClick={toggleDeleteReview}>{canDeleteReview ? "I would Never!" : "Delete Review"}</button>
            {canDeleteReview ?
            <div>
                <h2>This Will Delete Your Account Are You Sure?</h2>
                <button onClick={handleDeleteReview}>Yes, Delete</button>
            </div>
            :
            null
            }
        </div>
    )
}



export default UserReviews;