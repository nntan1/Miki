import { Link } from "react-router-dom"

export default function Page404() {
  return (
    <div className="text-4xl leading-relaxed text-center my-80">
      <h1>Ooops...</h1>
      <h2>That page cannot be found 😵</h2>
      <p>
        Go back to the{' '}
        <Link to="/">
          <span className="font-bold text-green-600">Homepage</span>
        </Link>
      </p>
    </div>
  );
}
