import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export interface VisitorRequest {
    id?: string;
    status?: string;
    visitType: string;
    operationType: string;
    company: string;
    licensePlate: string;
    language?: string;
}

type Company = { id: number; name: string };

function EntryForm() {
    const [visitType, setVisitType] = useState("");
    const [operationType, setOperation] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | number>("");
    const [newCompanyName, setNewCompanyName] = useState("");
    const [companies, setCompanies] = useState<Company[]>([]);
    const [licensePlate, setLicensePlate] = useState("");
    const [loadingCompanies, setLoadingCompanies] = useState(true);

    const navigate = useNavigate();

    // Fetch companies
    useEffect(() => {
        fetch("http://localhost:8080/api/companies")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);
                setLoadingCompanies(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingCompanies(false);
            });
    }, []);

    // Enforce operationType rules when visitType changes
    useEffect(() => {
        if (visitType !== "WAREHOUSE") {
            setOperation(""); // must be null if not warehouse
        }
    }, [visitType]);

    const submitRequest = async () => {
        const language = sessionStorage.getItem("language") || "en";

        const payload: VisitorRequest = {
            visitType,
            operationType,
            company:
                selectedCompany === "add-new" ? newCompanyName : String(selectedCompany),
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
                navigate("/waiting", { state: { request: newRequest } });
            } else {
                alert("Failed to submit form");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting form");
        }
    };

    const isSubmitDisabled =
        !visitType ||
        (visitType === "WAREHOUSE" && !operationType) ||
        !licensePlate ||
        (!selectedCompany && selectedCompany !== "add-new") ||
        (selectedCompany === "add-new" && !newCompanyName);

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
            <Header title="" onGoBack={() => navigate(-1)} />

            <h1 className="text-2xl font-semibold mb-6">Visitor Portal</h1>

            <div className="w-full max-w-xs mb-6 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-4">
                {/* Visit Type */}
                <label className="flex flex-col">
                    Visit Type:
                    <select
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- select visit type --</option>
                        <option value="WAREHOUSE">Warehouse</option>
                        <option value="OFFICE">Office</option>
                        <option value="R&D">R&D</option>
                    </select>
                </label>

                {/* Operation (only editable if warehouse) */}
                <label className="flex flex-col">
                    Operation:
                    <select
                        value={operationType}
                        onChange={(e) => setOperation(e.target.value)}
                        disabled={visitType !== "WAREHOUSE"}
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                    >
                        <option value="">-- select operation --</option>
                        <option value="LOAD">Laden</option>
                        <option value="UNLOAD">Lossen</option>
                    </select>
                </label>

                {/* Company */}
                <label className="flex flex-col">
                    Company:
                    {loadingCompanies ? (
                        <select disabled className="mt-1 p-3 border rounded-lg bg-gray-100">
                            <option>Loading companies...</option>
                        </select>
                    ) : (
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- select company --</option>
                            {companies.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                            <option value="add-new">Add a new company</option>
                        </select>
                    )}
                </label>

                {selectedCompany === "add-new" && (
                    <input
                        type="text"
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        placeholder="Enter company name"
                        className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                )}

                {/* License Plate */}
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
                    disabled={isSubmitDisabled}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                    Submit Request
                </button>
            </div>
        </div>
    );
}

export default EntryForm;
