import { useState } from 'react';
import "./login.css";
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { register } = useAuth();
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigateTo = useNavigate();

  const onButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return false;
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return false;
    }

    if (password.length <= 8) {
      setPasswordError('The password must be 8 characters or longer')
      return false;
    }
    return true;

  }

  return (

    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type={'password'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} disabled={buttonClicked} type="button" onClick={async (event) => {
          const result = onButtonClick(event);
          setButtonClicked(true);
          if (result) {
            const res = toast.promise(
              register(email, password),
              {
                pending: 'Creating New Account',
              }
            );
            if (await res) navigateTo('/login');
          }
          setButtonClicked(false);

        }} value={'Register'} />
      </div>
    </div>

  )

}

export default Register