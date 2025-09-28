export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you're looking for doesn't exist.</p>
      <a 
        href="/" 
        className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Go Home
      </a>
    </div>
  )
}