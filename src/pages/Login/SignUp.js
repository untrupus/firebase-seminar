import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {signUp, auth, provider} from "../../firebase";
import {signInWithPopup} from "firebase/auth";
import './style.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email !== '' && password !== '') {
        await signUp(email, password);
        setPassword('');
        setEmail('');
        navigate('products');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  const googleSignUp = () => {
    // вход со всплывающим окном(можно сделать через редирект)
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response)
        navigate('products');
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className='container'>
      <form className="loginForm" onSubmit={formSubmit}>
        <h2>Sign Up</h2>
        <input
          placeholder='Email'
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="loginInput"/>
        <input
          placeholder='Password'
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="loginInput"/>
        <button type='submit'>sign up</button>
        <div style={{display: 'flex'}}>
          <span>Already have an account? &nbsp;</span>
          <Link to='/'>Click here</Link>
        </div>
        <div className="googleContainer">
          <p>Or sign up with</p>
          <img
            src={require('../../assets/google_logo.png')}
            alt="google"
            onClick={googleSignUp}
            className='googleLogo'/>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
