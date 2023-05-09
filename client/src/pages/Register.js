import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from '../components';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {/* Name Input */}

        {!values.isMember && (
          <FormRow
            type={'text'}
            name={'name'}
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}

        {/* Email Input */}
        <FormRow
          type={'text'}
          name={'email'}
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        {/* Password Input */}
        <FormRow
          type={'password'}
          name={'password'}
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
        >
          Submit
        </button>

        <p>
          {values.isMember
            ? 'Not a member yet?'
            : 'Already a member?'}
          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
