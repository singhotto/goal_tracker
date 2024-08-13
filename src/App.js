import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { Header } from './components';
import { Dashboard, DailyGoals, MainGoals, Routines } from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Header />
          <Routes>
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/dashboard" element={(<Dashboard />)} />
                
                <Route path="/dailyGoals" element={(<DailyGoals />)} />
                <Route path="/mainGoals" element={(<MainGoals />)} />
                <Route path="/routines" element={(<Routines />)} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
