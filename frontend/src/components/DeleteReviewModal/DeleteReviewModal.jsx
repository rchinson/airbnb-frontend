import './DeleteReviewModal.css';

const DeleteReviewModal = ({ confirmDelete, cancelDelete }) => {
    return(
        <div className='delete-modal-container'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>

            <div className='confirm-buttons'>
                <button className='confirm-button' onClick={confirmDelete}>Yes (Delete Review)</button>
                <button className='cancel-button' onClick={cancelDelete}>No (Keep Review)</button>
            </div>

        </div>
    )
}

export default DeleteReviewModal;