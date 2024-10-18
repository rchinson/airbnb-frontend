import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotDetailsThunk } from '../../store/spots'
import SpotImages from '../SpotImages/SpotImages';
import Reviews from '../Reviews/Reviews';



function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();


    const spot = useSelector( (state) => state.spot?.spotDetails[spotId])

    // console.log("SPOT SELECTOR ___ ",spot)




    useEffect( () => {
        dispatch(getSpotDetailsThunk(spotId))

    }, [dispatch, spotId])

    
    // if (!spot) {
    //     return <p>Loading</p>
    // }

    return (
        <div>
            <div className='spot-details-container'>
                <h1>{spot?.name}</h1>
                <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            </div>
            <SpotImages spotId={spotId} />

            <div></div>

            <Reviews />

        </div>
    )

}

export default SpotDetails;