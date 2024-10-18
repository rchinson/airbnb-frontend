// import { csrfFetch } from './csrf';

const ALL_REVIEWS = 'reviews/ALL_REVIEWS';


const getAllReviews = reviews => ({
    type: ALL_REVIEWS,
    payload: reviews
})


export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    console.log("RES======",res)

    if (res.ok) {
        const payload = await res.json();
        dispatch(getAllReviews(payload.Reviews))
        return payload
    }

}

const initialState = { reviews: []};

const ReviewsReducer = (state = initialState, action) => {
    switch(action.type) {

        case ALL_REVIEWS: {
            return { ...state, reviews: action.payload}
        }


        default:
            return state;

    }
}

export default ReviewsReducer;