import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
