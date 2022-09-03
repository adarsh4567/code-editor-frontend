
import './App.css';
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    {/* Toast Settings */}
    <div>
      <Toaster  position = 'top-center'
        toastOptions = {{               
          success:{
            theme:{
              primary:'#4aed88',
            },
          }
        }}/>
    </div>
    {/* Routes */}
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
