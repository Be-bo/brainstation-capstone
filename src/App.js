import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from './components/Account/Account';
import Playground from './components/Playground/Playground';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Playground />}></Route>
          <Route path='/playground' element={<Playground />}></Route>
          <Route path='/account' element={<Account />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
