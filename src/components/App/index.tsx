// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Styled-components imports
import { ThemeProvider } from 'styled-components';

// Styles imports
import { Container, Header } from './styles';

// Assets imports
import logo from '../../assets/images/logo.png';
import GlobalStyles from '../../assets/styles/global';
import DefaultTheme from '../../assets/styles/theme/default';

// Components imports
import ToastContainer from '../Toast/ToastContainer';

// Pages imports
import Home from '../../pages/Home';
import CreateTask from '../../pages/CreateTask';
import UpdateTask from '../../pages/UpdateTask';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/create-task',
    element: <CreateTask />
  },
  {
    path: '/update-task/:id',
    element: <UpdateTask />
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyles />
      <ToastContainer />
      <Container>
        <Header>
          <img src={logo} alt="Logo" />
          <h1>- DEVNATTO -</h1>
        </Header>
        <RouterProvider router={routes} />
      </Container>
    </ThemeProvider>
  );
}
