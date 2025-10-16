import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, Phone } from 'lucide-react';

type RejectedScreenProps = {
  translations: {
    accessDenied: string;
    accessDeniedMessage: string;
    contactSecurity: string;
    referenceNumber: string;
  };
};

export default function RejectedScreen({ translations }: RejectedScreenProps) {
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
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-20 h-20 text-red-600" />
                </div>
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-orange-600 rounded-full p-2"
                >
                    <AlertTriangle className="w-6 h-6 text-white" />
                </motion.div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-red-700 mb-2 text-center"
            >
                {translations.accessDenied}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center max-w-sm mb-6"
            >
                {translations.accessDeniedMessage}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 w-full max-w-sm"
            >
                <div className="flex items-center gap-3 justify-center">
                    <Phone className="w-5 h-5 text-orange-700" />
                    <p className="text-center text-orange-800 font-medium">
                        {translations.contactSecurity}
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-sm text-gray-500 text-center"
            >
                {translations.referenceNumber}
            </motion.div>
        </motion.div>
    );
}