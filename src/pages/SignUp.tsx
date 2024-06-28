import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { userSignUp } from '../utils/queryHelper';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data } = useQuery({
    queryKey: ['login'],
    queryFn: async () => userSignUp(email, password),
    enabled: !!submitted,
  });
  const handleSignUp = (e: FormEvent) => {
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
    if (data && authCtx.dispatchUser && data.statusCode === 200) {
      authCtx.dispatchUser(data.csrf);
      navigate('/login');
    }
    setSubmitted(false);
  }, [authCtx, data, navigate]);

  useEffect(() => {
    if (authCtx.user) {
      navigate('/kanban');
    }
  }, [authCtx, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSignUp}
        className="w-96 flex flex-col gap-5 items-center"
      >
        {data && data?.statusCode === 210 ? (
          <div className="w-full bg-red-500 h-20 text-xl font-bold">
            {data.statusMessage}
          </div>
        ) : null}
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
            required
            id="password"
            onChange={(e) => handleChange(e, 'password')}
            className="border border-gray-400 flex-grow"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
