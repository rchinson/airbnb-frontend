import './SpotList.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spots';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SpotList() {
    const spots = useSelector((state) => state.spot.allSpots)
    const spotsArr = Object.values(spots)
    const [ toolTip, setToolTip] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    const handleClick = (spotId) => {
        navigate(`/spots/${spotId}`)
    }



    return(
        <>

            <div className='spots-container'>

                {spotsArr && spotsArr.map((spot) => (
                    <div key={spot.id} 
                         className='single-spot'
                         onMouseOver={() => setToolTip(spot.id)}
                         onMouseOut={() => setToolTip(null)}
                         onClick={() => handleClick(spot.id)}
                    >
                       {toolTip === spot.id && <div>{spot.name}</div>}

                    <img className='spot-image' src={spot.previewImage} alt={spot.name} />
                    
                    <div className='single-spot-location-rating'>
                        <p>
                            {spot.city}, {spot.state}
                        </p>
                        <p>
                            {spot.avgRating ? spot.avgRating : "new"}
                        </p>
                    </div>
                        <p>{`$${spot.price}night`}</p>
                    </div>
                ))}
            </div>

        </>
    );
}

export default SpotList;