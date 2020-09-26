import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<div className="nav">
			<ul>
				<li>
					<NavLink to="/home">Home</NavLink>
				</li>
				<li>
					<NavLink to="/dashboard">Dashboard</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
