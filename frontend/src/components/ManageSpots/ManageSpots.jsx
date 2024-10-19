import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { getUserSpotsThunk } from '../../store/spots';
import './ManageSpots.css'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector( (state) => state.session.user);
    const userSpots = useSelector( (state) => state.spot.userSpots);

    // console.log("SESSION USER ==",sessionUser)

    console.log("USER SPOTS ====" , userSpots)

    useEffect( () => {
        if (sessionUser) {
            dispatch(getUserSpotsThunk(sessionUser.id));
        }
    }, [dispatch, sessionUser]);


    return(
        <>
        
            <div className='manage-spots-container'>

                <div className='manage-spots-header'>
                    <h1>Manage Spots</h1>
                    <button className='create-spot-button' onClick={() => navigate('/spots/new')}>
                        Create a New Spot

                    </button>


                </div>
                
                <div className='manage-single-spot-container'>
                    {userSpots.map( (spot) => (
                        <div key={spot.id}
                             className='manage-single-spot'
                             
                        >
                            <div>{spot.name}</div>

                            <img src={spot.previewImage}
                                 alt={spot.name}
                                 className='manage-spot-image' />

                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ManageSpots;