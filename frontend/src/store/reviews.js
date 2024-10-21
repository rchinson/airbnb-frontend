import { csrfFetch } from './csrf';
import { getSpotDetailsThunk } from './spots';


const ALL_REVIEWS = 'reviews/ALL_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


const getAllReviews = reviews => ({
    type: ALL_REVIEWS,
    payload: reviews
});

const addReview = (review) => {
    console.log("ENTERING ADD REVIEW ACTION")
    return {
        type: ADD_REVIEW,
        payload: review,
    }
}

const deleteReview = (reviewId) => {
    return{
        type: DELETE_REVIEW,
        payload: reviewId
    }
}


export const getAllReviewsThunk = (spotId) => async (dispatch) => {

    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(getAllReviews(payload.Reviews))
        return payload
    }

};

export const addReviewThunk = (review, spotId) => async (dispatch) => {
    // console.log('ENTERING THUNK')

    const properlyFormatReview = {...review, spotId: parseInt(spotId) }

    // console.log("PROPERTLY FORMATEED", {properlyFormatReview})

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",

        body: JSON.stringify(properlyFormatReview)
    })

    // console.log('RES======',res)

    if (res.ok) {
        const reviewRes = await res.json();

        const formattedReviewRes = { ...reviewRes, spotId: parseInt(spotId)}

        // console.log("REVIEW AFTER RES OK",{formattedReviewRes})
        dispatch(addReview(formattedReviewRes));
        dispatch(getSpotDetailsThunk(spotId));
        dispatch(getAllReviewsThunk(spotId))
        return formattedReviewRes
    }

};




export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
    console.log("ENTERING DELETE THUNK")

    console.log("REVIEWID______",reviewId)

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })


    
    if (res.ok) {
        dispatch(deleteReview(reviewId))
        dispatch(getAllReviewsThunk(spotId))
    }
};



const initialState = { reviews: []};

const ReviewsReducer = (state = initialState, action) => {
    switch(action.type) {

        case ALL_REVIEWS: {
            return { ...state, reviews: action.payload}
        }

        case ADD_REVIEW: {
            return { ...state, reviews: [...state.reviews, action.payload] };
        }

        case DELETE_REVIEW: {
            return {
                ...state,
                reviews: state.reviews.filter( (review) => {
                    return review.id !== action.reviewId
                })
            }
        }

        default:
            return state;

    }
}

export default ReviewsReducer;