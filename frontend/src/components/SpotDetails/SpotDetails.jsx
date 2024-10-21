import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotDetailsThunk } from '../../store/spots'
import SpotImages from '../SpotImages/SpotImages';
import Reviews from '../Reviews/Reviews';
import './SpotDetails.css';
import { FaStar } from 'react-icons/fa';



function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector( (state) => state.spot?.spotDetails[spotId])

    // console.log("SPOT =====",spot)

    // console.log("SPOT SELECTOR ___ ",spot)


    useEffect( () => {
        dispatch(getSpotDetailsThunk(spotId))

    }, [dispatch, spotId])

    const handleClick = () => {
        alert('Feature coming soon')
    }

    
    if (!spot) {
        return <p>Loading</p>
    }

    return (
        <div className='spot-details-wrapper'>

            <div className='spot-details-container'>
                
                <div className='spot-details-header'>
                    <h1>{spot?.name}</h1>
                    <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
                </div>

                <SpotImages spotId={spotId} />

                <div className='spot-info-reserve-container'>

                    <div className='spot-owner-description'>
                        <h3 className='spot-owner'>
                            {`Hosted by ${spot.Owner?.firstName} ${spot.Owner?.lastName}`}
                        </h3>
                        <p className='spot-description'>
                            {spot.description}
                        </p>
                    </div>


                    <div className='spot-reserve-container'>
                        <div className='spot-price-reviews'>

                            <p className='spot-price'>{`$${spot.price} night`}</p>
                            
                            <div className='spot-reserve-reviews'>
                                <FaStar /> {spot.numReviews ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} reviews` : 'new'}                         
                            </div>

                        </div>

                        <div className='reserve-button-container'>
                        <button className='reserve-button' onClick={handleClick}>
                            Reserve
                        </button>
                        </div>



                    </div>

                </div>

                <hr></hr>

                <div className='spot-details-reviews'>
                    <p className='spot-reserve-reviews'>
                    <FaStar /> {spot.numReviews ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} reviews` : 'new'}
                    </p>

                    <Reviews />

                </div>

            </div>
            
        </div>
    )

}

export default SpotDetails;