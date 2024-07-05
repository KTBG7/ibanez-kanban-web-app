import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { userLogin } from '../utils/queryHelper';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { getUserCookie } from '../utils/userUtils';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const userCookie = getUserCookie();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data, error, isFetching } = useQuery({
    queryKey: ['login'],
    queryFn: async () => userLogin(email, password),
    enabled: !!submitted,
  });
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === 'email') {
      setEmail(e.target.value);
    }
    if (field === 'password') {
      setPassword(e.target.value);
    }
  };
  useEffect(() => {
    setSubmitted(false);
  }, []);

  useEffect(() => {
    if (userCookie) {
      navigate('/kanban');
    }
  }, [navigate, userCookie]);

  useEffect(() => {
    if (data && data.statusCode !== 200) {
      setSubmitted(false);
      navigate('/kanban');
    }
    if (error && data?.statusCode !== 200) {
      alert('There has been an issue logging in, please try again.');
      setSubmitted(false);
    }
  }, [authCtx, data, error, submitted]);
  useEffect(() => {
    if (authCtx.user && data && data.statusCode === 200) {
      navigate('/kanban');
    }
  }, [authCtx, data, navigate, isFetching, error]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        id="loginForm"
        onSubmit={(e) => handleLogin(e)}
        className="w-96 flex flex-col gap-5 items-center"
      >
        <div className="flex flex-col w-full">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => {
              handleChange(e, 'email');
            }}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => handleChange(e, 'password')}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to={'/signup'}>Sign Up</Link>
          <button type="submit" form="loginForm">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
