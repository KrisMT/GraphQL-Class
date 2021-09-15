import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import client from '../app-graphql'

import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
    </ApolloProvider>
  )
}

export default MyApp

