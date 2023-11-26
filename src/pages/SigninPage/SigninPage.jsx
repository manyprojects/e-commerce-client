import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' id='email' value={formData.email} onChange={handleChange} /> <br />
                <label htmlFor='password'>Password</label>
                <input type='text' name='password' id='password' value={formData.password} onChange={handleChange} /> <br />
                <button type='submit'>Sign In</button>
            </form>

        </div>
    );
};

export default SignupPage;