import { useEffect, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";



const Reviews = () => {

    const { spotId } = useParams();
    const dispatch = useDispatch();

    console.log("SPOTid=====",spotId)

    const reviews = useSelector( (state) => state.reviews.reviews)


    console.log("REVIEWS------>", reviews)

    reviews.forEach( (element) => {

        if (element.spotId === spotId) {
            console.log('YES')
        }

    })


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