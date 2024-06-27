import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">Ibanez Kanban</h1>
        <h3 className="text-2xl">by Kevin Ibanez</h3>
        <p className="md:text-2xl px-3">
          Choose <b>Demo</b> for a Kanban experience with pre-defined data or
          <b className="text-typography-purple"> Login</b> to the personalized
          experience!
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/demo"
            className="flex items-center justify-center w-28 md:w-40 text-3xl md:text-4xl bg-black text-white rounded-2xl h-16"
          >
            Demo
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center w-28 md:w-40 text-3xl md:text-4xl bg-typography-purple text-white rounded-2xl h-16"
          >
            Kanban
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
