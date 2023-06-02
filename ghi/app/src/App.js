import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';
import ShoesPage from './ShoesPage';
import NewShoeForm from './NewShoeForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='hats'>
            <Route index element={<HatList />}></Route>
            <Route path="new" element={<HatForm />}></Route>
          </Route>
          <Route path="/shoes">
            <Route path="" element={<ShoesPage />}></Route>
            <Route path="new" element={<NewShoeForm />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
