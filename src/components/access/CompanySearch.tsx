import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Building2, Plus, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { type Company as CompanyType } from '@/entities/Company';

interface CompanySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    createLabel: string;
    translations: { noResults: string };
}

export default function CompanySearch({ value, onChange, placeholder, createLabel, translations }: CompanySearchProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await fetch("http://localhost:8080/api/companies");
                const list: CompanyType[] = await res.json();
                setCompanies(list);
            } catch (err) {
                console.error('Failed to fetch companies', err);
            }
        }
        fetchCompanies();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setShowCreateButton(Boolean(searchTerm) && filteredCompanies.length === 0);
    }, [searchTerm, filteredCompanies.length]);

    const handleSelect = (companyName: string) => {
        onChange(companyName);
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleCreate = async () => {
        if (searchTerm.trim()) {
            try {
                const res = await fetch("http://localhost:8080/api/companies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: searchTerm.trim() }),
                });
                if (!res.ok) throw new Error("Failed to create company");
                const newCompany: CompanyType = await res.json();
                setCompanies(prev => [...prev, newCompany]);
                onChange(newCompany.name);
                setSearchTerm('');
                setShowDropdown(false);
            } catch (err) {
                console.error(err);

            }
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <Input
                    value={value || searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(e.target.value);
                        if (value) onChange('');
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={placeholder}
                    className="pl-10 h-12 text-base border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
                {value && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>

            {showDropdown && (searchTerm || !value) && (
                <Card className="absolute z-50 w-full mt-2 max-h-60 overflow-auto shadow-lg border-blue-100">
                    {filteredCompanies.map((company) => (
                        <button
                            key={company.id}
                            onClick={() => handleSelect(company.name)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 border-b border-blue-50 last:border-0"
                        >
                            <Building2 className="w-4 h-4 text-blue-500" />
                            <span>{company.name}</span>
                        </button>
                    ))}

                    {showCreateButton && (
                        <button
                            onClick={handleCreate}
                            className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-2 text-green-700 font-medium border-t-2 border-green-100"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{createLabel} "{searchTerm}"</span>
                        </button>
                    )}

                    {!showCreateButton && filteredCompanies.length === 0 && (
                        <div className="px-4 py-3 text-gray-500 text-center text-sm">
                            {translations.noResults}
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
