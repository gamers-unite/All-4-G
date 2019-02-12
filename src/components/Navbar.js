import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/user/userReducer.js'; 

const Navbar = () => {

  useEffect( getUser(), [])

  return (
    <div>
      <div>
        <img src='Logo?' alt='Logo'/>
        <img src={props.user.avatar} alt='profile'/>
        <h2>{props.user.display_name}</h2>
        {
          // Hanburger for logout and edit user function?
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect( mapStateToProps, { getUser } )(Navbar);