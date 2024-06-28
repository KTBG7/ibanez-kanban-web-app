import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { userLogin } from '../utils/queryHelper';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data, error } = useQuery({
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
    if (data && data.statusCode !== 200) {
      setSubmitted(false);
    }
    if (
      data &&
      data.statusCode === 200 &&
      authCtx.dispatchUser &&
      !error &&
      email
    ) {
      authCtx.dispatchUser({ token: data.csrf, email: email });
      navigate('/kanban');
      setSubmitted(false);
    }
  }, [authCtx, data, error, submitted, navigate, email]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-96 flex flex-col gap-5 items-center"
      >
        <div className="flex flex-col w-full">
          <label>Email:</label>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e, 'password')}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to={'/signup'}>Sign Up</Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
