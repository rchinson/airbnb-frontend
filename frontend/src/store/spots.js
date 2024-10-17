import { csrfFetch } from "./csrf";

const ALL_SPOTS = 'spots/ALL_SPOTS';
const CLEAR_SPOTS = 'spots/CLEAR_SPOTS';
const SPOT_DETAILS = 'spots/SPOT_DETAILS';
const CREATE_SPOT = 'spots/CREATE_SPOT';

const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE'


const spotDetails = payload => ({
    type: SPOT_DETAILS,
    payload
})

const allSpots = payload => ({
    type: ALL_SPOTS,
    payload
});

const addImage = image => ({
    type: ADD_SPOT_IMAGE,
    image
})


export const clearSpots = () => {
    return {
        type: CLEAR_SPOTS
    }
}

export const createSpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}



export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const payload = await res.json();
        dispatch(spotDetails(payload))
        return payload
    }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const payload = await res.json();
        dispatch(allSpots(payload));
    }
}

export const CreateSpotThunk = (spotData, navigate) => async () => {
    const res = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(spotData)
    })
    
    if (res.ok) {
        // console.log(spotData)
        const newSpot = await res.json();

        navigate(`/spots/${newSpot.id}`)
        return newSpot;
    }

}

export const addImageThunk = (spotId, image) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    })

    if (res.ok) {
        const newImage = await res.json();
        dispatch(addImage(newImage));
        return newImage;
    }
}



const initialState = {
    allSpots: [],
    userSpots: [],
    spotDetails: {},
}


export default function SpotsReducer( state = initialState, action) {
    switch (action.type) {
        
        case ALL_SPOTS: {
            const newState = { ...state, allSpots: {} }
            const spotsArr = action.payload.Spots;
            spotsArr.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }

        case SPOT_DETAILS: {
            return {
                ...state,
                spotDetails: {
                    ...state.spotDetails,
                    [action.payload.id]: action.payload
                }
            }
        }

        case ADD_SPOT_IMAGE: {
            const newState = { ...state };
            const spot = newState.spotDetails[action.image.spotId];
            
            if (spot) {
                spot.images = spot.images || [];
                spot.images.push(action.image);
            }

            return newState
        }

        case CREATE_SPOT: 
            return { ...state, newSpot: [action.payload]}

        case CLEAR_SPOTS:
            return {...initialState};

        default:
            return state;
    }

}