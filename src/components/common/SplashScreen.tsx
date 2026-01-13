'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePartySettings } from '@/contexts/PartySettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen() {
    const { settings } = usePartySettings();
    const [show, setShow] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            setShow(false);
        }, 1200); // 1.2 segundos de splash screen

        return () => clearTimeout(timer);
    }, []);

    // Evitar renderizado en el servidor para prevenir errores de hidratación
    // causados por extensiones (bis_skin_checked) o estados de animación.
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
                    suppressHydrationWarning
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 p-4 bg-white rounded-full shadow-xl border-4 border-primary/10">
                            <Image
                                src={settings.partyLogo}
                                alt={settings.partyName}
                                fill
                                className="object-contain p-2"
                                priority
                            />
                        </div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl md:text-5xl font-black text-primary tracking-tighter text-center"
                        >
                            {settings.partyName}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mt-4 text-lg md:text-xl text-muted-foreground font-medium uppercase tracking-[0.3em] text-center px-4"
                        >
                            {settings.partySlogan}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="absolute bottom-12 flex flex-col items-center"
                    >
                        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
