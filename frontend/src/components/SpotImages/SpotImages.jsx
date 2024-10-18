import { useSelector } from 'react-redux';
import './SpotImages.css';

const SpotImages = ({ spotId }) => {
    const spot = useSelector( (state) => state.spot.spotDetails[spotId]);

    return(
        <div className='spot-images-container'>

            {spot?.SpotImages.map( (image) => (

                <div key={image.id} className='spot-image'>

                    <img src={image.url} className='single-image-container' alt={`Image for Spot Number:${image.id}`} />

                </div>


            ))}

        </div>
    )

}

export default SpotImages;