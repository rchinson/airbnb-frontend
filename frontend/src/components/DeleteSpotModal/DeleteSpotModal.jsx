// import { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       });
//   };

//   const handleSubmitDemo = (e) => {
//     e.preventDefault();

//     return dispatch(
//       sessionActions.login({ credential: 'Demo-lition', password: 'password'})
//     ).then(closeModal)
//   }


    // const handleYes = (e) => {
    //     e.preventDefault();
    // }

    // const handleNo = (e) => {
    //     e.preventDefault();
    // }


    const handleSubmitDemo = (e) => {
      e.preventDefault();

      return dispatch(deleteSpotThunk()).then(closeModal);
    };


    return (
    <>
        <div className='delete-spot-modal'>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this spot from the listings?</p>
            
            <div className='delete-spot-buttons'>
                
                <button className='delete-yes'>Yes (Delete Spot)</button>

                <button className='delete-no'>No (Keep Spot)</button>

            </div>

        </div>
    </>
    );
}

export default DeleteSpotModal;