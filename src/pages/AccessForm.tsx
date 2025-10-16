import { useState } from 'react';
import { translations } from '@/utils/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Warehouse, Building2, FlaskConical, Truck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import LanguageSelector from '@/components/access/LanguageSelector';
import CompanySearch from '@/components/access/CompanySearch';
import WaitingScreen from '@/components/access/WaitingScreen';
import SuccessScreen from '@/components/access/SuccessScreen';
import RejectionScreen from '@/components/access/RejectionScreen';
import {type VisitorForm, isValidVisitorForm, type FormState} from '@/entities/VisitorForm';
import logo from '@/assets/logo.png';

const visitTypeIcons = {
    warehouse: Warehouse,
    office: Building2,
    rnd: FlaskConical
};

export default function AccessForm() {
    const [language, setLanguage] = useState<keyof typeof translations>('en');
    const [formData, setFormData] = useState<FormState>({
        visitType: undefined,
        opType: undefined,
        company: '',
        licensePlate: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'waiting' | 'success' | 'rejected' | 'error' >('idle');

    const t = translations[language as keyof typeof translations];

    const handleSubmit = async () => {
        if (!formData.visitType || !formData.company || !formData.licensePlate) {
            alert(t.fillAllFields);
            return;
        }
        if (formData.visitType === 'warehouse' && !formData.opType) {
            alert(t.fillAllFields);
            return;
        }
        if (formData.visitType !== 'warehouse' && formData.opType) {
            alert(t.invalidOperation);
            return;
        }

        const payload: VisitorForm = {
            ...formData,
            language
        };

        if (!isValidVisitorForm(payload)) {
            alert(t.invalidOperation);
            return;
        }

        try {
            setSubmitting(true);
            setStatus('waiting');

            const response = await fetch('http://localhost:8080/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                setStatus('rejected');
                alert(t.submitError);
                return;
            }

            // Get request ID from backend to track review status
            const { requestId } = await response.json();

            // Polling function to check review status
            const checkStatus = async () => {
                try {
                    const statusResponse = await fetch(`http://localhost:8080/api/requests/${requestId}/status`);
                    if (!statusResponse.ok) {
                        setStatus('rejected');
                        return;
                    }

                    const { reviewStatus } = await statusResponse.json(); // 'pending', 'approved', 'rejected'

                    if (reviewStatus === 'pending') {
                        setTimeout(checkStatus, 2000); // keep polling every 2 seconds
                    } else if (reviewStatus === 'approved') {
                        setStatus('success');
                    } else if (reviewStatus === 'rejected') {
                        setStatus('rejected');
                    }
                } catch (err) {
                    console.error('Error checking status', err);
                    setStatus('rejected');
                }
            };

            checkStatus(); // start polling

        } catch (err) {
            console.error('Failed to submit', err);
            alert(t.submitError);
            setStatus('rejected');
        } finally {
            setSubmitting(false);
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 p-4 flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                    </div>
                    <div className="w-45 h-45 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <img src={logo} alt="Logo" className="w-33 h-33 object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
                    <p className="text-blue-200">{t.subtitle}</p>
                </motion.div>

                {/* Form Card */}
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0">
                                <CardContent className="p-6 space-y-5">
                                    {/* Visit Type */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 font-medium">{t.visitType}</Label>
                                        <Select
                                            value={formData.visitType}
                                            onValueChange={(value: string) => setFormData({ ...formData, visitType: value as FormState['visitType'], opType: undefined })}
                                        >
                                            <SelectTrigger className="h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                                                <SelectValue placeholder={t.selectVisitType} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(['warehouse', 'office', 'rnd'] as Array<keyof typeof visitTypeIcons>).map((type) => {
                                                    const Icon = visitTypeIcons[type];
                                                    return (
                                                        <SelectItem key={type} value={type}>
                                                            <div className="flex items-center gap-2">
                                                                <Icon className="w-4 h-4 text-blue-600" />
                                                                <span>{t[type as keyof typeof t]}</span>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Operation (conditional) */}
                                    <AnimatePresence>
                                        {formData.visitType === 'warehouse' && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                                                <Label className="text-gray-700 font-medium">{t.operation}</Label>
                                                <Select
                                                    value={formData.opType}
                                                    onValueChange={(value: string) => setFormData({ ...formData, opType: value as FormState['opType'] })}
                                                >
                                                    <SelectTrigger className="h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                                                        <SelectValue placeholder={t.selectOperation} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="load">
                                                            <div className="flex items-center gap-2">
                                                                <Truck className="w-4 h-4 text-green-600" />
                                                                <span>{t.load}</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="unload">
                                                            <div className="flex items-center gap-2">
                                                                <Truck className="w-4 h-4 text-orange-600 rotate-180" />
                                                                <span>{t.unload}</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Company */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 font-medium">{t.company}</Label>
                                        <CompanySearch
                                            value={formData.company}
                                            onChange={(value: string) => setFormData({ ...formData, company: value })}
                                            placeholder={t.searchCompany}
                                            createLabel={t.createCompany}
                                            translations={t}
                                        />
                                    </div>

                                    {/* License Plate */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 font-medium">{t.licensePlate}</Label>
                                        <Input
                                            value={formData.licensePlate}
                                            onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                                            placeholder={t.enterLicensePlate}
                                            className="h-12 text-base border-blue-200 focus:border-blue-400 focus:ring-blue-400 font-mono tracking-wider"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {submitting ? (
                                            <div className="flex items-center gap-2">
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                                <span>{t.submit}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span>{t.submit}</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    {status === 'waiting' && (
                        <motion.div key="waiting" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0">
                                <CardContent className="p-6">
                                    <WaitingScreen translations={t} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    {status === 'success' && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0">
                                <CardContent className="p-6">
                                    <SuccessScreen translations={t} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    {status === 'rejected' && (
                        <motion.div key="rejected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0">
                                <CardContent className="p-6">
                                    <RejectionScreen translations={t} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
