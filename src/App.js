import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Open from "./pages/Open"
import Track from "./pages/Track"

function App() {
    return (
        <div className="App font-montserrat">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/open" element={<Open/>}/>
                <Route path="/track" element={<Track/>}/>
            </Routes>
        </div>
    );
}

export default App;
