// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (

    <div className='nav-container'>

      <div>
        <NavLink className='logo' to="/">LOGO</NavLink>
      </div>



      {isLoaded && (

        <div>
          <ProfileButton user={sessionUser} />
        </div>

      )}
    
    </div>
  );
}

export default Navigation;