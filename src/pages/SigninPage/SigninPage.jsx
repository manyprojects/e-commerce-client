import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.scss'

const SignupPage = ({ setIsSignedIn, setUser, upDateCart }) => {

    const navigate = useNavigate();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const [ formData, setFormData ] = useState({
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

        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        try {
            const { data } = await axios.post(`${SERVER_URL}/signin`, user);
            sessionStorage.setItem( 'token', data.token );
            setIsSignedIn( true );
            setUser( user );
            setTimeout (() => {
                navigate("/");
            }, 1000);
          } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='signin'>
            <div className='signin__div'>
                <h1 className='signin__title'>Sign In</h1>
                <form onSubmit={handleSubmit}>

                    <div className='signin__email'>
                        <label className='signin__label-e' htmlFor='email'>Email</label>
                        <input className='signin__input-e' type='text' name='email' id='email' value={formData.email} onChange={handleChange} />
                    </div>

                    <div className='signin__password'>
                        <label className='signin__label-p' htmlFor='password'>Password</label>
                        <input className='signin__input-p' type='text' name='password' id='password' value={formData.password} onChange={handleChange} />
                    </div>

                    <button className='signin__btn' type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;