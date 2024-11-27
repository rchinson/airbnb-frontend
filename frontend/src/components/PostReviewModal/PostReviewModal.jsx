import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewThunk } from '../../store/reviews';

import StarRating from '../StarRating/StarRating';
import { useModal } from '../../context/Modal';
import './PostReviewModal.css'


const PostReviewModal = ({ spotId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [ review, setReview ] = useState('');
    const [ stars, setStars ] = useState(0);
    const [ errors, setErrors] = useState(0);



    const handleSubmit = async (e) => {

        e.preventDefault();

        const reviewErrors = {};

        if (review.length < 10) {
            reviewErrors.review = 'Review must be at least 10 characters';
        }

        if (stars < 1 || stars > 5) {
            reviewErrors.stars = 'Stars must be between 1 and 5';
        }

        if (Object.keys(reviewErrors).length > 0) {
            setErrors(reviewErrors);
            return;
        }

        // console.log("TYPEOF=====",typeof parseInt(spotId) );

        dispatch(addReviewThunk({ review, stars }, parseInt(spotId)));

        closeModal();

    }
 

    return(
        <div className='review-form-container'>
            <h3>How was your stay?</h3>
            <form onSubmit={handleSubmit}>

                <textarea className='review-text'
                placeholder='Leave your review here...'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                />

                {errors.review && <p className='review-error'>{errors.review}</p>}
                <div className='starRating-container'>
                    <StarRating rating={stars} setRating={setStars}/> <span>Stars</span>
                </div>


                <button type='submit' className='submit-button'>
                    Submit Your Review
                </button>


            </form>

        </div>
    )



}

export default PostReviewModal