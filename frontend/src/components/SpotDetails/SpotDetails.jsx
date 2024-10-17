import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotDetails } from '../../store/spots'


function SpotDetails() {
    const { spotId } = useParams();

    const dispatch = useDispatch();

    console.log("SPOT ID ___ ",spotId)

    const spot = useSelector( (state) => state.spots?.spotDetails)

    console.log("SPOT SELECTOR ___ ",spot)




    useEffect( () => {
        dispatch(getSpotDetails(spotId))

    }, [dispatch, spotId])

    
    if (!spot) {
        return <p>Loading</p>
    }

    return (
        <div>
            <div>
                <h1>{spot?.name}</h1>
                <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            </div>
        
        </div>
    )

}

export default SpotDetails;