import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetailsThunk } from '../../store/spots';


export const UpdateSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();

    const spot = useSelector( (state) => state.spot.spotDetails[spotId])

    useEffect( () => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])


    const [ formData, setFormData ] = useState({
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: ''
    })

    useEffect( () => {
        if (spot) {
            setFormData({
                country: spot.country || '',
                address: spot.address || '',
                city: spot.city || '',
                state: spot.state || '',
                description: spot.description || '',
                name: spot.name || '',
                price: spot.price || ''
            });
        }
    }, [spot])


    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.id]: e.target.value })
    // }

    const handleSubmit = async (e) => { 
        e.preventDefault();
    }


    return(
        <>
            <div>
                <form className='update-spot-container' onSubmit={handleSubmit}>
                    <h2>Update a Spot</h2>
                    

                </form>
            </div>
        </>
    )
}


export default UpdateSpot;