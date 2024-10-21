import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal.jsx";
import SignupFormModal from "../SignupFormModal/index";
import './ProfileButton.css';
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";



function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const closeMenu = () => setShowMenu(false);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
return (
    <div className="profile-container">

      <button className='profile-button' onClick={toggleMenu}>
        <IoMenu size='18' />
        <FaUserCircle size='18' />
      </button>
      <ul className={ulClassName} ref={ulRef}>

        {user ? (
          <div className="logged-in-profile">
            <li className="username">Hello, {user.username}</li>
            <li className="user-email">{user.email}</li>

            <li className="manage-spots" onClick={() => navigate(`/spots/current`)}>Manage Spots</li>

            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (

          <div className="logged-out-profile">
            <OpenModalMenuItem
              className='login-button'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalMenuItem
              className='signup-button'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />



          </div>
        )}

      </ul>
    </div>
  );
}

export default ProfileButton;