import Lottie from 'lottie-react';
import React, { use } from 'react';
import { Link } from 'react-router';
import registerLottie from '../../assets/lotties/Register.json';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import SocialLogIn from '../Shared/SocialLogIn';

const Register = () => {

    const { createUser } = use(AuthContext);


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());
        console.log(email, password, restFormData)

        // create User
        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })


    }
    return (
        <div className=" max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-2xl mt-10 my-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <div className='my-2'>
                <Lottie animationData={registerLottie} loop={true}></Lottie>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    // value={user?.name}
                    className="input input-bordered w-full"
                    // readOnly

                    required />

                <input
                    name="email"
                    type="email"
                    // value={user?.email}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    // readOnly
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


            <button className=" w-full">
                <SocialLogIn></SocialLogIn>
            </button>
        </div >
    );
};

export default Register;