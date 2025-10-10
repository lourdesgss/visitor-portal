import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // import the new component

export interface VisitorRequest {
    id?: string; // optional, backend generates
    status: string;
    operationType: string;
    company: string;
    licensePlate: string;
    language?: string;
}

function EntryForm() {
    const [operationType, setOperation] = useState("");
    const [company, setCompany] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const navigate = useNavigate();

    const submitRequest = async () => {
        const language = sessionStorage.getItem("language") || "en";

        const payload: VisitorRequest = {
            status: "PENDING",
            operationType,
            company,
            licensePlate,
            language,
        };

        try {
            const res = await fetch("http://localhost:8080/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const newRequest = await res.json();
                // navigate to waiting page with request info
                navigate("/waiting", { state: { request: newRequest } });
            } else {
                alert("Failed to submit form");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting form");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
            <Header title="" onGoBack={() => navigate(-1)} />

            {/* Header */}
            <h1 className="text-2xl font-semibold mb-6">Visitor Portal</h1>

            {/* Progress Indicator */}
            <div className="w-full max-w-xs mb-6 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xs flex flex-col gap-4">
                <label className="flex flex-col">
                    Operation:
                    <select
                        value={operationType}
                        onChange={(e) => setOperation(e.target.value)}
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- select operation --</option>
                        <option value="LOAD">Laden</option>
                        <option value="UNLOAD">Lossen</option>
                    </select>
                </label>

                <label className="flex flex-col">
                    Company:
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="flex flex-col">
                    License Plate:
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <button
                    onClick={submitRequest}
                    disabled={!operationType || !company || !licensePlate}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                    Submit Request
                </button>
            </div>
        </div>
    );
}

export default EntryForm;
