import './App.css';
import './components/SearchBar.css';
import db from './firebase.js';
import { getAccountData } from './firebase.js';
function App() {
  getAccountData();
  return (
    <div className="container">
      <div className="menu">Menu</div>
      <div className="header">
        <div id="cover">
          <form method="get" action="">
            <div className="tb">
              <div className="td"><input type="text" placeholder="Search" required/></div>
              <div className="td" id="s-cover">
                <button type="submit">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="main">Main Content</div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
