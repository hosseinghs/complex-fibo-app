import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
        <Link to="/">Home</Link>
        <Link to="/other-page">Other Page</Link>
        <Routes>
          <Route exact path='/' element={<Fib />} />
          <Route exact path='/other-page' element={<OtherPage />} />
        </Routes>
    </Router>
  );
}

export default App;