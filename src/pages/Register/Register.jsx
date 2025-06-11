import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-2xl mt-10 my-10">
            <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
            <form className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    // value={user?.name}
                    className="input input-bordered w-full"
                    readOnly

                    required />

                <input
                    name="email"
                    type="email"
                    // value={user?.email}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    readOnly
                    required />

                <input
                    name="photoURL"
                    type="text"
                    placeholder="Photo URL"
                    className="input input-bordered w-full"
                    required />

                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    className="input input-bordered w-full"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    required />



                <button type="submit" className="btn btn-primary w-full">Register</button>
            </form>

            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/logIn" className="text-blue-600 underline">LogIn</Link>
            </p>

            <div className="divider">OR</div>
            <button  className="btn btn-outline btn-success w-full">
                Continue with Google
            </button>
        </div >
    );
};

export default Register;