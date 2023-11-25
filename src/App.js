import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from './components/Account/Account';
import Playground from './components/Playground/Playground';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path='/playground' element={<Playground />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
