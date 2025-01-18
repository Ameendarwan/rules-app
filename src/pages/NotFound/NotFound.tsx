import { Button } from '@app/components/Button/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex size-full max-w-[50rem] flex-col">
      <header className="z-50 mb-auto flex w-full justify-center py-4">
        <nav className="px-4 sm:px-6 lg:px-8">
          <a className="flex-none text-xl font-semibold dark:text-white sm:text-3xl" href="#" aria-label="Brand">
            Rules
          </a>
        </nav>
      </header>

      <main id="content">
        <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">404</h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">Oops, something went wrong.</p>
          <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn't find your page.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
