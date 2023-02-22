import { Link } from 'react-router-dom'
import "./App.css";

function App() {
  return (
    <ul>
      <li>
        <Link to="/signature">signature</Link>
      </li>
      <li>
        <Link to="/expired">expired</Link>
      </li>
      <li>
        <Link to="/dataFormat">dataFormat</Link>
      </li>
    </ul>
  );
}

export default App;
