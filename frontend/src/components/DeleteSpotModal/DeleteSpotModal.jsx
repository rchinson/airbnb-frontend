
import './DeleteSpotModal.css';

function DeleteSpotModal({ confirmCancel, confirmDelete }) {


    return (
    <>
        <div className='delete-spot-modal'>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this spot from the listings?</p>
            
            <div className='delete-spot-buttons'>
                
                <button className='delete-yes' onClick={confirmDelete}  >Yes (Delete Spot)</button>

                <button className='delete-no' onClick={confirmCancel} >No (Keep Spot)</button>

            </div>

        </div>
    </>
    );
}

export default DeleteSpotModal;