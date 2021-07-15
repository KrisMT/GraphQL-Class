import Image from 'next/image'
import bell from '../public/bell.jpg'

export const getStaticProps = async () => {
  console.log(process.env.DB_HOST)
  return {
    props : {
      data: process.env.DB_HOST,
    }
  }
}

function About({ data }) {
  return (
    <div>
      <h1>About page!!</h1>
      <p>Env: {data}</p>
      <Image 
      src={bell}
      width={540}
      height={960}
      alt="Responsive image" />
      
  </div>
  )
}

export default About

