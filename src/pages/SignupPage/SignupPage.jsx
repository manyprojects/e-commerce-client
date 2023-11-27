import { useState } from 'react'; 
import axios from 'axios';
import './SignupPage.scss';

const SignupPage = () => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ isSignup, setSignUp ] = useState( false );
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }
        console.log(newUser);
        try {
            await axios.post(`${SERVER_URL}/signup`, newUser);
            setSignUp(true);
          } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='signup'>
            <h1 className='signup__title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <div className='signup__name'>
                    <label className='signup__label-n' htmlFor='userName'>User Name</label>
                    <input className='signup__input-n' type='text' name='userName' id ='userName' value={formData.userName} onChange={handleChange} />
                </div>

                <div className='signup__email'>
                    <label className='signup__label-e' htmlFor='email'>Email</label>
                    <input className='signup__input-e' type='text' name='email' id='email' value={formData.email} onChange={handleChange} />
                </div>

                <div className='signup__password'>
                    <label className='signin__label-p' htmlFor='password'>Password</label>
                    <input className='signup__input-p' type='text' name='password' id='password' value={formData.password} onChange={handleChange} />
                </div>
                
                <button className='signup__btn' type='submit'>Sign Up</button>
                {isSignup ? <p>Thank you for signing up!</p> : <></>}
            </form>
        </div>
    );
};

export default SignupPage;