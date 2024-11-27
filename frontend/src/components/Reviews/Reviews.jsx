import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import PostReviewModal from "../PostReviewModal/PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

const Reviews = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const reviews = useSelector((state) => state.reviews.reviews);

  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spot.spotDetails[spotId]);

  console.log("IN REVIEWS -- SPOT", spot);

  console.log("IN REVIEWS -- REVIEWS ==", reviews);



  const spotReviews = [];

  reviews.forEach((element) => {
    if (parseInt(element.spotId) === parseInt(spotId)) {
      spotReviews.push(element);
    }
  });

  console.log('IN REVIEWS -- SPOTREVIEWS OBJ ===',spotReviews)

  const userReviewBoolean = spotReviews.some(
    (review) => sessionUser && sessionUser.id === review.userId
  );

  const dateForm = (date) => {
    if (date) {
      const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const splitDate = date.split("-");
      const monthIndex = parseInt(splitDate[1], 10) - 1;
      return `${monthArr[monthIndex]}-${splitDate[0]}`;
    }
  };

  const handleDelete = (reviewId) => {
    setModalContent(
      <DeleteReviewModal
        confirmDelete={() => {
          dispatch(deleteReviewThunk(reviewId, spotId)).then(() => {
            closeModal();
          });
        }}
        cancelDelete={() => {
          closeModal();
        }}
      />
    );
  };

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  return (


    <div className="reviews-container">
      {sessionUser &&
        spot &&
        sessionUser.id !== spot.ownerId &&
        !userReviewBoolean && (
          <button
            onClick={() => setModalContent(<PostReviewModal spotId={spotId} />)}
          >
            Post Your Review
          </button>
        )}


      {spotReviews
      .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((review) => (
        <div key={review.id} className="single-review-container">
          <h3 className="review-name">{review.User?.firstName}</h3>
          <p className="review-date">{dateForm(review.createdAt)}</p>
          <p className="review-text">{review.review}</p>

          {sessionUser && sessionUser.id === review.userId && (
            <button
              className="delete-review-button"
              onClick={() => handleDelete(review.id)}
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
    </div>

  );
};

export default Reviews;
