import './App.css'
import {Routes, Route} from "react-router-dom"
import Landing from './pages/Landing'
import Open from "./pages/Open"

function App() {
    return (
        <div className="App font-montserrat">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/open" element={<Open/>}/>
            </Routes>
        </div>
    );
}

export default App;
