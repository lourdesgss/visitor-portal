import React, { useState } from "react";

interface LanguageSelectionProps {
    onLanguageSelect?: (lang: string) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
    const [language, setLanguage] = useState(() => sessionStorage.getItem("language") || "en");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setLanguage(selected);
        sessionStorage.setItem("language", selected);
        if (onLanguageSelect) onLanguageSelect(selected);
    };

    return (
        <div className="flex flex-col items-center flex-grow justify-center p-4 bg-gray-50">
            <div className="w-full max-w-xs flex flex-col gap-4 overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-4">Step 1 of 2: Select Language</h1>

                <select
                    value={language}
                    onChange={handleChange}
                    className="mb-4 w-full max-w-xs p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="en">English</option>
                    <option value="nl">Nederlands</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        </div>
    );
};

export default LanguageSelection;
