import Image from 'next/image'
import bell from '../public/bell.jpg'

function About() {
  console.log(process.env.DB_HOST)
  return (
    <div>
      <h1>About page!!</h1>
      <Image 
      src={bell}
      width={540}
      height={960}
      alt="Responsive image" />
  </div>
  )
}

export default About


