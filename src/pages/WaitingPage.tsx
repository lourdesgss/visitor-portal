import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {VisitorRequest} from "./EntryForm";

function WaitingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const request: VisitorRequest | undefined = location.state?.request;

    useEffect(() => {
        if (!request) {
            // if user navigated here directly, go back to form
            navigate("/form");
        }

        // Placeholder for polling or backend check
        const timer = setTimeout(() => {
            alert("This is a placeholder waiting screen. Replace with actual backend response flow.");
            navigate("/"); // later: navigate to confirmation page instead
        }, 2000);

        return () => clearTimeout(timer);
    }, [request, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <h1 className="text-2xl font-semibold mb-4">Please wait...</h1>
            <p className="text-gray-600 mb-6">Your request is being processed.</p>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

export default WaitingPage;
