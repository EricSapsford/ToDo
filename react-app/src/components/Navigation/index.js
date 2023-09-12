import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import UserControls from "../UserControls";

// import * as sessionActions from '../../store/session';
// import * as projectActions from "../../store/project";
// import * as taskActions from "../../store/task"

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

	return (
	<nav>
		<span>
			{isLoaded && (<UserControls user={sessionUser} />)}
			<NavLink exact to="/">
				<span>
					<span>DueTo-</span>
				</span>
			</NavLink>
			{isLoaded && (<ProfileButton user={sessionUser} />)}
		</span>
	</nav>
	);
}

export default Navigation;
