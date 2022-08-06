import Footer from './components/footer/footer';
import Navbar from './components/header/navbar'
import Body from './components/main/body';
import Login from './components/header/login';
import Signup from './components/header/signup';
import {Route, Routes} from 'react-router-dom'; 
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import  Profile  from './components/main/Profile';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

function App() {

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });



const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const link = ApolloLink.from([errorLink, httpLink]);



  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    link
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar>
          </Navbar>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Body />}/>
              <Route path="/" element={<Body />}/>
            </Routes>
          <Footer>
        </Footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
