import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'

import { createApolloClient } from "../lib/apolloClient";
import {ApolloProvider} from "@apollo/client"

const apolloClient = createApolloClient();

function MyApp({ Component, pageProps }) {
 
  return (
    <ApolloProvider client={apolloClient}>
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
    </ApolloProvider>
  )
}

export default MyApp
