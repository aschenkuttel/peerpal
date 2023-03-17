import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Open from "./pages/Open"
import Track from "./pages/Track"
import TrackTx from './pages/TrackTx'
import Approve from "./pages/Approve"

function App() {
    return (
        <div className="App font-montserrat">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/open" element={<Open/>}/>
                <Route path="/track" element={<Track/>}/>
                <Route path="/track/:transactionID" element={<TrackTx/>}/>
                <Route path="/approve" element={<Approve/>}/>
            </Routes>
        </div>
    );
}

export default App;
