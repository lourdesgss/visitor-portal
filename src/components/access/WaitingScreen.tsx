import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

interface WaitingScreenProps {
    translations: {
        submitted: string;
        processing: string;
    };
}

export default function WaitingScreen({ translations }: WaitingScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] p-8"
        >
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-6"
            >
                <div className="relative">
                    <CheckCircle2 className="w-24 h-24 text-green-500" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Clock className="w-24 h-24 text-blue-500 opacity-30" />
                    </motion.div>
                </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {translations.submitted}
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
                {translations.processing}
            </p>

            <motion.div
                className="flex gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                        animate={{
                            y: [0, -10, 0],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}