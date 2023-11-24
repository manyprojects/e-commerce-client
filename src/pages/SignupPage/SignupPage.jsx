import { useState } from 'react'; 
import axios from 'axios';

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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userName'>User Name</label>
                <input type='text' name='userName' value={formData.userName} onChange={handleChange} /> <br />
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' value={formData.email} onChange={handleChange} /> <br />
                <label htmlFor='password'>Password</label>
                <input type='text' name='password' value={formData.password} onChange={handleChange} /> <br />
                <button type='submit'>Sign Up</button>
                {isSignup ? <p>Thank you for signing up!</p> : <></>}
            </form>

        </div>
    );
};

export default SignupPage;