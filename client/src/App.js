import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetsDetailPage from "./views/PetsDetailPage/PetsDetailPage";
import PetsListPage from "./views/PetsListPage/PetsListPage";
import PetsCreatePage from "./views/PetsCreatePage/PetsCreatePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' index element={<PetsListPage/>}/>
            <Route path='/details/:id' index element={<PetsDetailPage/>}/>
            <Route path='/create/:id?' index element={<PetsCreatePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
