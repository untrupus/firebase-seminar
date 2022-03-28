import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {auth, login, provider} from "../../firebase";
import {signInWithPopup, sendPasswordResetEmail} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email !== '' && password !== '') {
        await login(email, password);
        setPassword('');
        setEmail('');
        navigate('products');
      }
    } catch (e) {
      console.log('Error:', e);
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

  const reset = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    setResetEmail('');
  }
  return (
    <div className='container'>
      <form className="loginForm" onSubmit={formSubmit}>
        <h2>Sign In</h2>
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
        <button type='submit'>sign in</button>
        <div style={{display: 'flex'}}>
          <span>New user? &nbsp;</span>
          <Link to='/signUp'>Register now!</Link>
        </div>
        {
          showForm ? <div style={{display: 'flex', justifyContent: 'space-between', width: '80%'}}>
              <input
                type="email"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail} />
              <button onClick={() => reset()}>reset</button>
              <button onClick={() => setShowForm(false)}>cancel</button>
            </div> :
            <span className='forgot' onClick={() => setShowForm(true)}>Forgot password?</span>
        }
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

export default SignIn;
