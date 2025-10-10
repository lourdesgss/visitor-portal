import React from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelection from "../components/LanguageSelection";

const LanguagePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <LanguageSelection />
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => navigate("/form")}
                    className="w-full max-w-xs p-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LanguagePage;
