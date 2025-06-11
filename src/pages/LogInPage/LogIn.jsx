import React from 'react';
import { Link } from 'react-router';

const LogIn = () => {
    return (
        <div className='my-10'>
            <div className="max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-2xl mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">LogIn</h2>
                <form  className="space-y-4">
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
                <div className="divider">OR</div>
                <button className="btn btn-outline btn-success w-full">
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LogIn;