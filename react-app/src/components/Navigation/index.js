import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Footer from '../Footer';

import ProfileButton from './ProfileButton';
import UserControls from "../UserControls";

// import * as sessionActions from '../../store/session';
// import * as projectActions from "../../store/project";
// import * as taskActions from "../../store/task"

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user ? state.session.user : null);

	return (
		<>
			<nav className='whole-ass-nav-bar'>
				<span className='nav-bar-top-span'>
					<div className='user-controls-div'>
					{isLoaded && (<UserControls user={sessionUser} />)}
					</div>
					<NavLink exact to={ sessionUser ? "/projects" : "/"}>
						<span>
							<span className='DueTo-words-actual'><i class="fa-solid fa-house"></i></span>
						</span>
					</NavLink>
					<div className='profile-buttons-div'>
					{isLoaded && (<ProfileButton user={sessionUser} />)}
					</div>
				</span>
			</nav>

			<div className='whole-ass-footer'>
				<Footer />
			</div>
		</>
	);
}

export default Navigation;
