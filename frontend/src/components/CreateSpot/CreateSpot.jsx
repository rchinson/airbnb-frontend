import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { CreateSpotThunk } from '../../store/spots';
import { useNavigate } from 'react-router-dom';



const CreateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpot = {
            name: title,
            country,
            address,
            city,
            state,
            description,
            price,
        };

        // console.log("createspotJSX-----", newSpot)
        dispatch(CreateSpotThunk(newSpot, navigate));

 
        reset();
    };






    const reset = () => {
        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setDescription('');
        setTitle('');
        setPrice('');
        setImageUrl('');
    }


    return(
        <div className='spot-input'>
            <h1>Create a New Spot</h1>
            <form onSubmit={handleSubmit}>

                <input 
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder='Country'
                    name='country' 
                />

                <input 
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='Street Address'
                    name='streetAddress' 
                />

                <input 
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='City'
                    name='city' 
                />

                <input 
                    type='text'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder='State'
                    name='state' 
                />

                <textarea
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Description'
                    name='description'
                    rows='8'
                ></textarea>

                <input 
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Title'
                    name='title' 
                />

                <input 
                    type='text'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder= 'Price'
                    name='price' 
                />

                <input 
                    type='text'
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder='imageUrl'
                    name='imageUrl' 
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}

export default CreateSpot;