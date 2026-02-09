import React from "react";
import Navbar from '../components/Navbar';
import {Outlet} from 'react-router-dom';
import "../index.css";

function Root ()
{
	return (
		<div>
		<Navbar/>
		<Outlet/>
		</div>
	);
}
export default Root;