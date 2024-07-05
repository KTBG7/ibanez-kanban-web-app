import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { userSignUp } from '../utils/queryHelper';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { getUserCookie } from '../utils/userUtils';
import Button from '../components/atoms/Button';

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const userCookie = getUserCookie();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data } = useQuery({
    queryKey: ['signup'],
    queryFn: async () => userSignUp(email, password),
    enabled: !!submitted,
  });
  const handleSignUp = () => {
    if (password === confirmPassword) {
      setSubmitted(true);
    } else {
      alert('Passwords must be matching!');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    switch (field) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirm-password':
        setConfirmPassword(e.target.value);
        break;
    }
  };

  useEffect(() => {
    if (userCookie) {
      navigate('/kanban');
    }
  }, [navigate, userCookie]);

  useEffect(() => {
    if (data && authCtx.dispatchUser && data.statusCode === 200) {
      authCtx.dispatchUser(data.csrf);
      navigate('/kanban');
    }
    setSubmitted(false);
  }, [authCtx, data, navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light gap-10">
      <h1 className="text-7xl font-bold">Create an Account</h1>
      <form className="w-96 flex flex-col gap-5 items-center">
        {data && data?.statusCode === 210 ? (
          <div className="w-full flex items-center justify-center text-center bg-yellow-500 h-20 text-xl font-bold text-typography-white">
            <span>
              {data.statusMessage} Or{' '}
              <a
                onClick={() => navigate('/login')}
                className="text-typography-purple hover:cursor-pointer"
              >
                Login
              </a>
            </span>
          </div>
        ) : null}
        <div className="flex flex-col w-full">
          <label className="text-2xl">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e, 'email');
            }}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-2xl">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e, 'password')}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-2xl">Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confim-password"
            onChange={(e) => handleChange(e, 'confirm-password')}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <Button
          buttonType="primary"
          className="bg-button-primary text-typography-white w-full h-10 rounded-xl"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
