import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { deleteSpotThunk, getUserSpotsThunk } from '../../store/spots';
import './ManageSpots.css'
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal'
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
// import { useNavigate } from 'react-router-dom';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector( (state) => state.session.user);
    const userSpots = useSelector( (state) => state.spot.userSpots);

    const { setModalContent, closeModal } = useModal()

    // console.log("SESSION USER ==",sessionUser)

    // console.log("USER SPOTS ====" , userSpots)

    useEffect( () => {
        if (sessionUser) {
            dispatch(getUserSpotsThunk(sessionUser.id));
        }
    }, [dispatch, sessionUser]);



    const handleDelete = (spotId) => {
        setModalContent(
            <DeleteSpotModal 
                
                confirmDelete = {() => {
                    dispatch(deleteSpotThunk(spotId)).then( ()=>{closeModal()} )

                }}
                confirmCancel = { ()=>{closeModal()} }
            />
        )
    }


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

                    {userSpots.map((spot) => (
                        <div key={spot.id} className='manage-single-spot'>

                            <div>{spot.name}</div>

                            <img src={spot.previewImage}
                                 alt={spot.name}
                                 className='manage-spot-image' />

                            <div className='manage-spots-location-starRating'>

                                <div className='manage-spots-location'>
                                    {spot.city}, {spot.state}
                                </div>

                                <div className='manage-spots-starRating'>
                                    <FaStar /> 
                                    {spot.avgRating ? spot.avgRating : "new"}
                                </div>


                            </div>

                            

                                <div className='buttons-container'>
                                    <button className='update-spot'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/spots/${spot.id}/edit`)
                                            }}>
                                        Update
                                    </button>

                                    <button className='delete-spot'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(spot.id);
                                            }}>
                                        Delete
                                    </button>
                                </div>

                            




                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ManageSpots;