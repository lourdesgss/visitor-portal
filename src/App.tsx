
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import AccessForm from "@/pages/AccessForm.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AccessForm />} />
            </Routes>
        </Router>
    );
}

export default App;
