import Footer from './components/footer/footer';
import Navbar from './components/header/navbar'
import Body from './components/main/body';
import Login from './components/header/login';
import Signup from './components/header/signup';
import {Route, Routes} from 'react-router-dom'; 
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import  Profile  from './components/main/Profile';

function App() {

  const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql' });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token')

    return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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
