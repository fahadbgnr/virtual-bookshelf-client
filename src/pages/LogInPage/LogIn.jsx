import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import logInLottie from '../../assets/lotties/LogIn.json';
import Lottie from 'lottie-react';
import SocialLogIn from '../Shared/SocialLogIn';

const LogIn = () => {
    const { logInUser } = use(AuthContext);


    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());
        console.log(email, password, restFormData)

        // Login User
        logInUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })


    }
    return (
        <div className='my-10'>
            <div className="max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-2xl mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <Lottie animationData={logInLottie} loop={true}></Lottie>
                <form onSubmit={handleLogIn} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        required />

                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
                <p className="mt-4 text-center">
                    Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
                </p>
                <button className=" w-full">
                    <SocialLogIn></SocialLogIn>
                </button>
            </div>
        </div>
    );
};

export default LogIn;