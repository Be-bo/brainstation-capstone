import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playground from './components/Playground/Playground';
import Gallery from "./components/Gallery/Gallery";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Playground />}></Route>
          <Route path='/playground' element={<Playground />}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
