import Head from 'next/head'
import Image from 'next/image'

function Home() {
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
      </div>
      <div className="mb-3">
        <label  className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="button" className="btn btn-primary">Primary</button>
    </div>
  )
}

export default Home


