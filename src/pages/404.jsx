import Link from 'next/link';

export default function Page404() {
  return (
    <div className="my-80 text-center text-4xl leading-relaxed">
      <h1>Ooops...</h1>
      <h2>That page cannot be found 😵</h2>
      <p>
        Go back to the{' '}
        <Link href="/">
          <a className="font-bold text-green-600">Homepage</a>
        </Link>
      </p>
    </div>
  );
}
