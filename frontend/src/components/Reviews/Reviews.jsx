import { useEffect, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import PostReviewModal from "../PostReviewModal/PostReviewModal";



const Reviews = () => {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();

    const reviews = useSelector( (state) => state.reviews.reviews);
    // const sessionUser = useSelector( (state) => state.session.user);
    // const spot = useSelector( (state) => state.spot.spotDetails[spotId]);


    const userReviews = [];

    reviews.forEach( (element) => {

        if (element.spotId === parseInt(spotId)) {
            userReviews.push(element)
        }
    })


    // const userReviewBoolean = reviews.some( (review) => sessionUser && sessionUser.id === review.userId);

    // console.log("===AFTER FOREACH REVIEWS",userReviews)

    useEffect( () => {
        dispatch(getAllReviewsThunk(spotId))
    },[dispatch,spotId]);

    return(

        <div className="reviews-container">


            <button onClick={() => setModalContent(<PostReviewModal spotId={spotId} />)}>
            Post Your Review    
            </button> 



            {userReviews.map( (review) => (
                <div key={review.id} className="single-review-container">
                    
                    <h3>{review.User?.firstName}</h3>
                    <p>{review.review}</p>
                </div>        
            ))}


        </div>
    )
}

export default Reviews;