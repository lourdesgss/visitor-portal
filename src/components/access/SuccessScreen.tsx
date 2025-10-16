import { motion } from 'framer-motion';
import { CheckCircle2, Shield } from 'lucide-react';

type SuccessScreenProps = {
  translations: {
    accessGranted: string;
    accessGrantedMessage: string;
    proceedToGate: string;
  };
};

export default function SuccessScreen({ translations }: SuccessScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] p-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                }}
                className="mb-6 relative"
            >
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-20 h-20 text-green-600" />
                </div>
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2"
                >
                    <Shield className="w-6 h-6 text-white" />
                </motion.div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-green-700 mb-2 text-center"
            >
                {translations.accessGranted}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center max-w-sm mb-6"
            >
                {translations.accessGrantedMessage}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-green-50 border-2 border-green-200 rounded-lg p-4 w-full max-w-sm"
            >
                <p className="text-center text-green-800 font-medium">
                    {translations.proceedToGate}
                </p>
            </motion.div>

            <motion.div
                className="flex gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}