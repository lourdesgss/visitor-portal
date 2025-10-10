
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelection from "./pages/LanguageSelection";
import EntryForm from "./pages/EntryForm";
import WaitingPage from "./pages/WaitingPage";
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LanguageSelection />} />
                <Route path="/form" element={<EntryForm />} />
                <Route path="/waiting" element={<WaitingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
