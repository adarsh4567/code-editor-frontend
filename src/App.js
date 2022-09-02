
import './App.css';
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/editor/:roomId" element={<EditorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
