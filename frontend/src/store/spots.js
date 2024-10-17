
const ALL_SPOTS = 'spots/ALL_SPOTS';
const CLEAR_SPOTS = 'spots/CLEAR_SPOTS';
const SPOT_DETAILS = 'spots/SPOT_DETAILS';
const CREATE_SPOT = 'spots/CREATE_SPOT';


const spotDetails = payload => ({
    type: SPOT_DETAILS,
    payload
})

const allSpots = payload => ({
    type: ALL_SPOTS,
    payload
});


export const clearSpots = () => {
    return {
        type: CLEAR_SPOTS
    }
}

export const getSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const payload = await res.json();
        dispatch(spotDetails(payload))
        return payload
    }
}

export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const payload = await res.json();
        dispatch(allSpots(payload));
    }
}



export const createSpot = (payload) => {
    return{
        type: CREATE_SPOT,
        payload
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


        case CREATE_SPOT: 
            return { ...state, newSpot: [action.payload]}



        case CLEAR_SPOTS:
            return {...initialState};
        default:
            return state;
    }

}