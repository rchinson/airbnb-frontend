// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { IoHomeSharp } from "react-icons/io5";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/spots/new')
  }

  return (

    <div className='nav-container'>

      <div>
        <li>
        <NavLink className='logo' to="/">
        <IoHomeSharp size='1cm' />
        Rent A Spot
        </NavLink>
        </li>
      </div>
      <div className='right-buttons-div'>
      <div className='create-spot-btn'>
        {sessionUser ? (
            <li
                onClick={handleClick}
            >
                Create a New Spot
            </li>
        ) : (
            ''
        )}
      </div>
      {isLoaded && (

        <div>
          <ProfileButton user={sessionUser} />
        </div>

      )}

    </div>
    </div>
  );
}

export default Navigation;