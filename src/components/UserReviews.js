import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function UserReviews({ id, author, authorImage, movieTitle, movieImage, content, onUpdateReview, onDeleteReview, personalRating}) {
    const [canEditReview, setCanEditReview] = useState(false)
    const [canDeleteReview, setCanDeleteReview] = useState(false)
    const [updatedContent, setUpdatedContent] = useState('')




    function toggleEditReview() {
        setCanEditReview(!canEditReview)
    }

    function toggleDeleteReview() {
        setCanDeleteReview(!canDeleteReview)
    }

    function handleContentChange(event) {
        setUpdatedContent(event.target.value);
      
    }


    function handleUpdateReview(e) {
        e.preventDefault()
    //   resetCurrentUser(null)
    //   history.push("/login");
        const formData = {

            content: updatedContent
        }
        console.log(id)
        fetch(`http://localhost:3001/reviews/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"content": formData.content}),
      })
        .then((response) => response.json())
        .then((data) => {
            onUpdateReview(data, formData)
        })
        setUpdatedContent("")
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