import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="lg:text-7xl font-bold">
          Ibanez Kanban Web App by <span>Kevin Ibanez</span>
        </h1>
        <p className="lg:text-3xl w-3/4 pb-5">
          Choose <b>Demo</b> for a Kanban experience with pre-defined data or
          <b className="text-typography-purple"> Login</b> to the personalized
          experience!
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/demo"
            className="flex items-center justify-center w-40 text-4xl bg-black text-white rounded-2xl h-16"
          >
            Demo
          </Link>
          <Link
            to="/login"
            className="w-40 flex items-center justify-center text-4xl bg-typography-purple text-white rounded-2xl h-16"
          >
            Kanban
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
