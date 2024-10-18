import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { getUserSpotsThunk } from '../../store/spots';


const ManageSpots = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const sessionUser = useSelector( (state) => state.session.user);
    const userSpots = useSelector( (state) => state.spot.userSpots);

    useEffect( () => {
        if (sessionUser) {
            dispatch(getUserSpotsThunk(sessionUser.id));
        }
    }, [dispatch, sessionUser]);


    return(
        <>
            <div className='manage-spots-container'>

                <div className='manage-spots-list'>
                    {userSpots.map( (spot) => (
                        <div key={spot.id}
                             className='manage-single-spot'
                        >



                        </div>
                    ))}
    
                </div>
            </div>
        </>
    )
}

export default ManageSpots;