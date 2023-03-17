import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Open from "./pages/Open"
import Track from "./pages/Track"
import TrackTx from './pages/TrackTx'
import Approve from "./pages/Approve"
import NotFound from "./pages/404"

function App() {
    return (
        <div className="App font-montserrat">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/open" element={<Open/>}/>
                <Route path="/track" element={<Track/>}/>
                <Route path="/track/:transactionID" element={<TrackTx/>}/>
                <Route path="/approve/:transactionID" element={<Approve/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
