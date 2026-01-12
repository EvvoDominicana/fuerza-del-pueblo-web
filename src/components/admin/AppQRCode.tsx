'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Props {
    url: string;
    appName: string;
}

export default function AppQRCode({ url, appName }: Props) {
    const [copied, setCopied] = useState(false);
    const qrRef = useRef<SVGSVGElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast({ title: "Link copiado", description: "Ya puedes pegarlo en WhatsApp." });
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadQR = () => {
        const svg = qrRef.current;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width + 40;
            canvas.height = img.height + 40;
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 20, 20);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `QR_${appName}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <Card className="max-w-md mx-auto overflow-hidden border-2 border-primary/20">
            <CardHeader className="bg-primary text-primary-foreground text-center pb-8">
                <CardTitle className="text-2xl font-black">Acceso Oficial FP</CardTitle>
                <CardDescription className="text-primary-foreground/80">Escanea para instalar la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center -mt-6">
                <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-white mb-6">
                    <QRCodeSVG
                        ref={qrRef}
                        value={url}
                        size={200}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                            src: "/logo.png", // Asumiendo que existe
                            x: undefined,
                            y: undefined,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                    />
                </div>

                <div className="w-full space-y-3">
                    <Button className="w-full gap-2 font-bold" onClick={downloadQR}>
                        <Download className="h-4 w-4" /> Descargar para Imprimir
                    </Button>

                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 gap-2 border-primary text-primary" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? 'Copiado' : 'Copiar Link'}
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2" onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: appName, url });
                            }
                        }}>
                            <Share2 className="h-4 w-4" /> Compartir
                        </Button>
                    </div>
                </div>

                <p className="mt-6 text-[10px] text-muted-foreground uppercase font-black tracking-widest bg-muted px-3 py-1 rounded-full">
                    Garantía de Seguridad Electoral FP
                </p>
            </CardContent>
        </Card>
    );
}
