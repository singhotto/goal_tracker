import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { Sidebar } from './components';

function App() {
  let activeMenu = true;
  return (
    <div>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          {activeMenu ? (<Sidebar />) : "false"}
          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
