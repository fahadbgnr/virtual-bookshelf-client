import React, { use } from 'react';
import { NavLink } from 'react-router';
import Logo from '../../assets/Logo.png';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const NavBar = () => {
    const { user, logOutUser, setUser } = use(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out"
        }).then((result) => {
            if (result.isConfirmed) {
                import('firebase/auth').then(({ getAuth, signOut }) => {
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        setUser(null);
                        Swal.fire("Logged Out!", "", "success");
                    }).catch((error) => {
                        console.error("Logout error:", error);
                         logOutUser();
                    });
                });
            }
        
        });
    };
    const links = <>
        <li><NavLink to="/" >Home</NavLink></li>
        <li><NavLink to="/bookShelf" >Bookshelf </NavLink></li>
        <li><NavLink to="/addBook" >Add Book </NavLink></li>
        <li><NavLink to="/myBook" >My Book </NavLink></li>
        <li><NavLink to="/myProfile" >My Profile </NavLink></li>
        {/* for applicant links. check roles as well */}
        {/* {
            user && <>

                <li><NavLink to="/myApplications" >My Applications</NavLink></li>
            </>
        } */}

        {/* for recruiter. check roles as well */}
        {/* {
            user && <>

                <li><NavLink to="/addJob" >Add Job</NavLink></li>
                <li><NavLink to="/myPostedJobs" >My Posted Jobs</NavLink></li>

            </>
        } */}


    </>
    return (
        <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className='w-8 lg:w-16 md:w-10 ' src={Logo} alt="" />
                <a className=" lg:text-xl mx-3">BookNest</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleLogOut} className='btn'>Logout</button> :
                        <>
                            <NavLink className="btn" to="/register" >Register</NavLink>
                            <NavLink className="btn" to="/logIn" >LogIn</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default NavBar;