import { useEffect, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";



const Reviews = () => {

    const { spotId } = useParams();
    const dispatch = useDispatch();


    const reviews = useSelector( (state) => state.reviews.reviews)

    // console.log("REVIEWS", reviews)
    // const spot = useSelector( (state) => state.spot.spotDetails[spotId]);

    reviews.forEach( (element) => {
        console.log('SPOT ID ===========',spotId)

        console.log('element',element)
        console.log("ELEMENT SPOT ID ==",element.spotId)

        if (element.spotId === spotId) {
            console.log('YES')
        }

    })

    // console.log("ALLREVIEWS=====",reviewArr)
    
    // console.log("SPOT_REVIEW_ID",reviews.spotId)


    useEffect( () => {
        dispatch(getAllReviewsThunk(spotId))
    },[dispatch,spotId]);

    return(
        <div className="reviews-container">

            {reviews.map( (review) => (
                <div key={review.id} className="single-review-container">
                    
                    <h3>{review.User?.firstName}</h3>
                    <p>{review.review}</p>
                </div>        
            ))}

        </div>
    )
}

export default Reviews;