import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowUsers from './components/ShowUsers';
import ShowProducts from './components/ShowProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowUsers></ShowUsers>}>
        </Route>
      </Routes>

      <Routes>
        <Route path='/api/products' element={<ShowProducts></ShowProducts>}>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
