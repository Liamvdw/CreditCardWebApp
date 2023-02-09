import AddCard from '../src/components/AddCard.js';
import DisplayCards from '../src/components/DisplayCards.js';
import Navbar from '../src/components/NavBar.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<AddCard />} />
                        <Route path="/display-cards" element={<DisplayCards />} />
                    </Routes>
                </div>                
            </div>
        </Router>
    )
}
export default App;