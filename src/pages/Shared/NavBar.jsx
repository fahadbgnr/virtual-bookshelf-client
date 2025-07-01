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

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-purple-600 font-semibold underline dark:text-white'
      : 'hover:text-purple-600 dark:text-gray-200';

  const links = <>
    <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
    <li><NavLink to="/bookShelf" className={linkClass}>Bookshelf</NavLink></li>

    {user && <>
      <li><NavLink to="/addBook" className={linkClass}>Add Book</NavLink></li>
      <li><NavLink to="/myBook" className={linkClass}>My Book</NavLink></li>
      <li><NavLink to="/myProfile" className={linkClass}>My Profile</NavLink></li>
    </>}

    <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
    <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
  </>;

  return (
    <div className="sticky top-0 z-50 bg-purple-100 bg-opacity-90 dark:bg-gray-900 dark:text-gray-200 backdrop-blur shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52">
              {links}
            </ul>
          </div>
          <img className="w-8 lg:w-16 md:w-10" src={Logo} alt="BookNest Logo" />
          <span className="lg:text-xl mx-3 font-semibold text-purple-800 dark:text-white">BookNest</span>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-purple-800 dark:text-gray-200 font-medium">
            {links}
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end gap-2">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm text-purple-700 border border-purple-700 hover:bg-purple-100 dark:text-white dark:border-white dark:hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                className="btn btn-sm text-purple-700 border border-purple-700 hover:bg-purple-100 dark:text-white dark:border-white dark:hover:bg-gray-800"
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className="btn btn-sm text-purple-700 border border-purple-700 hover:bg-purple-100 dark:text-white dark:border-white dark:hover:bg-gray-800"
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
