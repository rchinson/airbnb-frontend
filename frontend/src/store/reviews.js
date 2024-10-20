import { csrfFetch } from './csrf';

const ALL_REVIEWS = 'reviews/ALL_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const getAllReviews = reviews => ({
    type: ALL_REVIEWS,
    payload: reviews
});

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    }
}

const deleteReview = (reviewId) => {
    return{
        type: DELETE_REVIEW,
        reviewId
    }
}


export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    // console.log("RES======",res)

    if (res.ok) {
        const payload = await res.json();
        dispatch(getAllReviews(payload.Reviews))
        return payload
    }

};

export const addReviewThunk = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(addReview(review));
        return review
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews?${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteReview(reviewId))
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