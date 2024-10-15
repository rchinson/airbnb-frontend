
const ALL_SPOTS = 'spots/ALL_SPOTS';

const CLEAR_SPOTS = 'spots/CLEAR_SPOTS';


const allSpots = payload => ({
    type: ALL_SPOTS,
    payload,
});

export const clearSpots = () => {
    return {
        type: CLEAR_SPOTS
    }
}


export const getAllSpots = () => async (dispatch) => {

    const res = await fetch('api/spots');

    if (res.ok) {
        const payload = await res.json();
        dispatch(allSpots(payload));
    }

}


const initialState = {
    allSpots: [],
    singleSpot: {},
    userSpots: []
}


export default function SpotsReducer( state = initialState, action) {
    switch (action.type) {
        case ALL_SPOTS: {
            const newState = {...state, allSpots: {}}
            const spotsArr = action.payload.Spots;
            spotsArr.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case CLEAR_SPOTS:
            return {...initialState};
        default:
            return state;
    }

}