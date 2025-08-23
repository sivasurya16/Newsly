import { useEffect, useState } from 'react';
import "./login.css";
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { logIn, isAuthenticated } = useAuth();
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

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (

    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
          required={true}
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
          required={true}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" disabled={buttonClicked} onClick={async (event) => {
          const result = onButtonClick(event);
          setButtonClicked(true);
          if (result) {
            await toast.promise(
              logIn(email, password),
              {
                pending: 'Logging In',
              }
            );
          }
          setButtonClicked(false);
        }} value={'Log in'} />
        {/* {isAuthenticated && navigateTo("/")} */}
      </div>
    </div>

  )
}

export default Login