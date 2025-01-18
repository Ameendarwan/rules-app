import { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const refresh = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div role="alert" className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <section className="text-center">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Oops...</h1>
          <h4 className="mb-4 text-2xl">An unexpected error occurred.</h4>
          <p className="mb-7 text-lg">
            We’re sorry for any inconvenience caused. If you keep experiencing this issue, please let us know.
          </p>
          <button
            onClick={refresh}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none">
            Return to the homepage
          </button>
        </div>
      </section>
      <footer className="mt-8 text-center">
        <h5 className="mb-4 text-xl font-semibold uppercase tracking-wide">Error message</h5>
        <pre className="rounded-md bg-gray-200 p-4">
          <code>
            {error.name}: {error.message}
          </code>
        </pre>
        {error.stack && (
          <>
            <h5 className="mb-4 mt-6 text-xl font-semibold uppercase tracking-wide">Stack trace</h5>
            <pre className="whitespace-normal rounded-md bg-gray-200 p-4">
              <code>{JSON.stringify(error.stack)}</code>
            </pre>
          </>
        )}
      </footer>
    </div>
  );
};

export default ErrorFallback;
