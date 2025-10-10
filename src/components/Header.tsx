import React from "react";

interface HeaderProps {
    title: string;
    onGoBack?: () => void; // optional goBack handler
}

const Header: React.FC<HeaderProps> = ({ title, onGoBack }) => {
    return (
        <div className="w-full flex items-center p-4 bg-white shadow-md">
            {onGoBack && (
                <button
                    onClick={onGoBack}
                    className="mr-4 text-blue-500 font-semibold hover:underline"
                >
                    &larr; Back
                </button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
        </div>
    );
};

export default Header;
