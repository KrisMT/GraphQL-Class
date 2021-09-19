import Link from 'next/link'

const Header = () => {
  return (
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
          <a>No pages Goto 404</a>
        </Link>
      </li>
      <li>
        <Link href="/post/basic">
          <a>Basic Dynamic Routes: goto pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href={{pathname: '/post/param', query: { foo: 'bar' }}}>
          <a>Dynamic Routes with param: goto pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        <Link href="/alluser">
          <a>Test GraphQL With Query allUser</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Test GraphQL With mutation allUser</a>
        </Link>
      </li>  
    </ul>
  )
}


export default Header


