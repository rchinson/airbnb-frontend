import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpotDetailsThunk, updateSpotThunk } from '../../store/spots';
import './UpdateSpot.css'


export const UpdateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spot.spotDetails[spotId]);

    const [formData, setFormData] = useState({
        country: '',
        address: '',
        city: '', 
        state: '', 
        description: '',
        name: '',
        price: '', 
    });

    const [errors, setErrors] = useState({});
    
    const [hasSubmitted, setHasSubmitted] = useState(false);



    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
    }, [dispatch, spotId]);


    useEffect(() => {

        if (spot) {
            setFormData({
                country: spot.country || '',
                address: spot.address || '',
                city: spot.city || '',
                state: spot.state || '',
                description: spot.description || '',
                name: spot.name || '',
                price: spot.price || '',
            });
        }
    }, [spot]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    useEffect(() => {

        const Errors = {};

        if (!formData.country) Errors.country = 'Country is required';
        if (!formData.address) Errors.address = 'Address is required';
        if (!formData.city) Errors.city = "City is required";
        if (!formData.state) Errors.state = 'State is required';
        if (formData.description < 30) Errors.description = 'Description needs 30 or more characters'; 
        if (!formData.name) Errors.name = 'Name is required';
        if (!formData.price) Errors.price = 'Price is required';
        if (!formData.image1) Errors.image1 = 'Preview Image URL is required';

        setErrors(Errors);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const updatedSpot = {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
            };

            const response = await dispatch(updateSpotThunk(spotId, updatedSpot));

            if (response) {
                navigate(`/spots/${spotId}`);
            }

        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };

    return (
        <div className="update-spot-container">
            <h2>Update your Spot</h2>
            <h3>Where&apos;s your place located?</h3>
            <p>Guests will only get your address once they&apos;ve booked a reservation</p>



            <form className="update-spot-form" onSubmit={handleSubmit}>
               
               <hr></hr>
                
                    <div>Country</div>
                    <input 
                        id="country"
                        placeholder="Country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.country && (
                        <p className="error">{errors.country}</p>
                    )}

                    <div>Street Address</div>
                    <input 
                        id="address"
                        placeholder="Street Address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.address && (
                        <p className="error">{errors.address}</p>
                    )}

                    <div className="city-state-div">
                        
                        <div className="city-div">
                            <div>City</div>
                            <input 
                                id="city"
                                placeholder="City"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {hasSubmitted && errors.city && (
                                <p className="error">{errors.city}</p>
                            )}
                        </div>

                        <div className="state-div">
                            <div>State</div>
                            <input 
                                id="state"
                                placeholder="State"
                                type="text"
                                value={formData.state}
                                onChange={handleChange}
                            />
                            {hasSubmitted && errors.state && (
                                <p className="error">{errors.state}</p>
                            )}
                        </div>
                    </div>
               
                    <hr></hr>

                    <div className="update-describe-container">
                        <h3>Describe your place to guests</h3>
                        <p>
                            Mention the best features of your space, any special amenities
							like fast wifi or parking, and what you love about the
							neighborhood.
                        </p>
                    

                    <textarea 
                        className="form-textarea"
                        placeholder="Please write at least 30 characters"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                    </div>


                <hr></hr>

                <div className="update-title-container">
                    
                        <h3>Create a title for your spot</h3>
                        <p>
                            Catch guests&apos; attention with a spot title that highlights
                            what makes your place special.
                        </p>

                    <input 
                        
                        placeholder="Name of your spot"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>

                <hr></hr>


                <div className="update-price-container">
                    
                        <h3>Set a base price for your spot</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results
                        </p>
                    

                  
                        <span>$<input 
                            className="input-price"
                            placeholder="Price per night (USD)"
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        </span>
                    {hasSubmitted && errors.price && (
                        <p className="error">{errors.price}</p>
                    )}
                    
                </div>

                <hr></hr>

                <button 
                    className="submit-button"
                    type="submit"
                >
                    Update your Spot
                </button>
            </form>

        </div>
    )
}


export default UpdateSpot;