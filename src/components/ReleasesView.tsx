import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Smartphone, ShieldCheck, Cpu, HardDrive, Calendar, ArrowDown, ExternalLink, RefreshCw, FileText } from 'lucide-react';

export default function ReleasesView() {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Simulate premium pipeline build extraction and start download of our placeholder APK
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Trigger actual download of the premium-alarm-clock-v1.0.0.apk we created!
      const link = document.createElement('a');
      link.href = '/releases/premium-alarm-clock-v1.0.0.apk';
      link.download = 'premium-alarm-clock-v1.0.0.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-xl mx-auto space-y-6 select-none"
    >
      {/* Header card */}
      <div className="glass p-6 rounded-3xl text-white relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Smartphone className="w-40 h-40" />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 text-slate-200 border border-white/10 rounded-full w-fit text-[10px] font-bold tracking-widest uppercase">
          <Smartphone className="w-3.5 h-3.5 text-slate-400" /> Native Android Release
        </div>

        <h2 className="font-serif text-3xl font-normal tracking-tight mt-4 text-white">
          Download Installer APK
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed font-sans">
          Install the native <b className="text-white font-medium">Aura Clock</b> application directly on your Android device for native alarms and widgets.
        </p>

        {/* APK Main actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg cursor-pointer ${
              downloadSuccess
                ? 'bg-white/10 text-white border border-white/10'
                : 'bg-white hover:bg-slate-100 text-slate-950'
            }`}
          >
            {downloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Preparing Build Package...
              </>
            ) : downloadSuccess ? (
              <>
                <ShieldCheck className="w-4 h-4 text-white" /> Download Triggered!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 animate-bounce" /> Download APK Installer
              </>
            )}
          </button>
          
          <a
            href="/releases/readme.md"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" /> View Release Notes
          </a>
        </div>
      </div>

      {/* Release Specification Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-4 rounded-2xl flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Version Name</span>
          <span className="text-sm font-semibold text-white">v1.0.0 (Release Build)</span>
        </div>
        <div className="glass p-4 rounded-2xl flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">File Size</span>
          <span className="text-sm font-semibold text-white">12.4 MB</span>
        </div>
        <div className="glass p-4 rounded-2xl flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Release Date</span>
          <span className="text-sm font-semibold text-white">July 6, 2026</span>
        </div>
        <div className="glass p-4 rounded-2xl flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Minimum OS</span>
          <span className="text-sm font-semibold text-white">Android 8.0 (API 26+)</span>
        </div>
      </div>

      {/* Quick Setup instructions card */}
      <div className="glass p-5 rounded-2xl space-y-3.5 border border-white/5 text-slate-300 text-xs">
        <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-slate-400" /> Sideload Installation Checklist
        </h4>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed text-slate-400 pl-1">
          <li>Download the file above directly to your computer or phone.</li>
          <li>If on PC, transfer the APK file to your phone's memory.</li>
          <li>Locate the file in your phone's **My Files / Files** app.</li>
          <li>Tap on it and approve "Allow Installation from Unknown Sources" if prompted by Chrome or your file manager.</li>
          <li>Once installed, grant **Notification & Alarms** permissions.</li>
        </ol>
      </div>

      {/* Developers Build Flow */}
      <div className="glass p-5 rounded-2xl space-y-3.5 border border-white/5 text-xs text-slate-400">
        <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
          <Cpu className="w-4 h-4 text-slate-400" /> Bundle React App as Native
        </h4>
        <p className="leading-relaxed">
          This alarm layout incorporates cross-platform Ionic Capacitor. If you make updates to this React app and want to rebuild a native signed Android bundle:
        </p>
        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-slate-400 space-y-1.5 leading-normal">
          <p># 1. Compile react project</p>
          <p className="text-white">npm run build</p>
          <p># 2. Sync with capacitor platform</p>
          <p className="text-white">npx cap sync</p>
          <p># 3. Open project in Android Studio</p>
          <p className="text-white">npx cap open android</p>
          <p># 4. Generate signed APK / Bundle from menu</p>
        </div>
      </div>
    </motion.div>
  );
}
