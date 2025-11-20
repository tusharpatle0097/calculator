export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! Page not found.</p>

      <a
        href="/"
        className="mt-6 px-3 py-3 text-sm bg-white text-black rounded-xl border border-black hover:bg-gray-100 transition"
      >
        Go Home
      </a>
    </div>
  );
}
