import './SpotList.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { useEffect } from 'react';



function SpotList() {

    const spots = useSelector((state) => state.spot.allSpots)
    console.log(spots)
    const spotsArr = Object.values(spots)
    // console.log(spotsArr)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);



    return(
        <>
          <h2>ALL SPOTS</h2>  
            <div>
                {spotsArr && spotsArr.map((spot) => (
                    <div key={spot.id} >
                       
                    <div>{spot.name}</div>
                    <img src={spot.previewImage} alt={spot.name} />
                    
                    <div>
                        <p>
                            {spot.city}, {spot.state}
                        </p>
                        <p>
                            {spot.avgRating ? spot.avgRating : "new"}
                        </p>
                    </div>
                        <p>${spot.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SpotList;