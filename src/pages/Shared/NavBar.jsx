import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../../assets/Logo.png';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const NavBar = () => {
    const { user, logOutUser, setUser } = React.useContext(AuthContext);

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
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/bookShelf"
                className={({ isActive }) =>
                    isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                }
            >
                Bookshelf
            </NavLink>
        </li>

        {
            user && <>

                <li>
                    <NavLink
                        to="/addBook"
                        className={({ isActive }) =>
                            isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                        }
                    >
                        Add Book
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/myBook"
                        className={({ isActive }) =>
                            isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                        }
                    >
                        My Book
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/myProfile"
                        className={({ isActive }) =>
                            isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                        }
                    >
                        My Profile
                    </NavLink>
                </li>


            </>
        }

        <li>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                }
            >
                About
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? 'text-purple-600 font-semibold underline' : 'hover:text-purple-500'
                }
            >
                Contact
            </NavLink>
        </li>

    </>;

    return (
        <div className="sticky top-0 z-50 bg-base-100 bg-opacity-90 backdrop-blur shadow-sm">
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <img className="w-8 lg:w-16 md:w-10" src={Logo} alt="BookNest Logo" />
                    <a className="lg:text-xl mx-3 font-semibold">BookNest</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {user ? (
                        <button
                            onClick={handleLogOut}
                            className="btn btn-sm text-blue-600 border border-blue-600 hover:bg-blue-100 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <NavLink
                                className="btn btn-sm text-blue-600 border border-blue-600 hover:bg-blue-100 transition"
                                to="/register"
                            >
                                Register
                            </NavLink>
                            <NavLink
                                className="btn btn-sm text-blue-600 border border-blue-600 hover:bg-blue-100 transition"
                                to="/logIn"
                            >
                                LogIn
                            </NavLink>
                        </>
                    )}
                </div>


            </div>
        </div>
    );
};

export default NavBar;
