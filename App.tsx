
import React, { useState, useCallback, useMemo } from 'react';
import { ScriptType } from './types';
import { generateOutput, generateAutoTogel, generateSyairByShio, getCurrentYearShio } from './services/generators';
import MetaballsBackground from './components/MetaballsBackground';

const PASARAN_LIST = [
  'BANGKOK', 'BRUNEI', 'BULLSEYE', 'CALIFORNIA', 'CAMBODIA', 'CAROLINA',
  'CHELSEA', 'FLORIDA', 'HOKIDRAW', 'HONGKONG', 'HUAHIN', 'KENTUCKY',
  'KING KONG4D', 'MAGNUM4D', 'NEVADA', 'NEW YORK', 'OREGON', 'PCSO',
  'POIPET', 'SINGAPORE', 'SYDNEY', 'TOTOMACAU', 'TOTOMALI'
];

const SHIO_ICONS = [
  { name: "Tikus", icon: "🐀" },
  { name: "Kerbau", icon: "🐂" },
  { name: "Macan", icon: "🐅" },
  { name: "Kelinci", icon: "🐇" },
  { name: "Naga", icon: "🐉" },
  { name: "Ular", icon: "🐍" },
  { name: "Kuda", icon: "🐎" },
  { name: "Kambing", icon: "🐐" },
  { name: "Monyet", icon: "🐒" },
  { name: "Ayam", icon: "🐓" },
  { name: "Anjing", icon: "🐕" },
  { name: "Babi", icon: "🐖" }
];

const App: React.FC = () => {
  const [scriptType, setScriptType] = useState<ScriptType>(ScriptType.BOLA);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPasaran, setSelectedPasaran] = useState<string>('HONGKONG');

  const currentYearShio = useMemo(() => getCurrentYearShio(), []);

  const handleGenerate = useCallback(() => {
    const result = generateOutput(scriptType, input);
    setOutput(result);
  }, [scriptType, input]);

  const handleAutoPasaran = (pasaran: string) => {
    setSelectedPasaran(pasaran);
    const textResult = generateAutoTogel(pasaran);
    setOutput(textResult);
    setInput(textResult);
  };

  const handleShioClick = (shioName: string) => {
    const htmlResult = generateSyairByShio(shioName, selectedPasaran);
    setOutput(htmlResult);
    setInput(`[ SYAIR SHIO ${shioName.toUpperCase()} ]\nPasaran: ${selectedPasaran}`);
  };

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  return (
    <div className="min-h-screen relative flex flex-col text-white font-mono uppercase text-[10px] tracking-[0.05em] overflow-hidden">
      <MetaballsBackground />

      <header className="fixed top-8 left-0 w-full px-8 flex justify-center z-50 pointer-events-none">
        <div className="absolute left-8 flex items-center h-8 pointer-events-auto cursor-pointer group">
          <div className="relative w-6 h-6 mr-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full transition-all duration-500 group-hover:-translate-x-1 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full transition-all duration-500 group-hover:translate-x-1 mix-blend-exclusion"></div>
          </div>
        </div>
        <div className="pointer-events-auto">
          <h1 className="font-[PP Neue Montreal] text-[1.5rem] tracking-tight lowercase text-white/90">Nexus.</h1>
        </div>
      </header>

      <main className="relative z-20 flex-1 flex items-center justify-center p-6 h-screen w-full">
        <div className="w-full max-w-6xl bg-black/10 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row transition-all hover:border-white/10 group">
          
          <div className="w-full md:w-[45%] p-8 border-b md:border-b-0 md:border-r border-white/5 space-y-6 flex flex-col overflow-y-auto max-h-[90vh]">
            <div className="space-y-4">
              <label className="text-white/30 tracking-[0.2em] font-mono flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
                  System Protocol
                </span>
                <span className="text-[8px] text-yellow-500/50">Year of the {currentYearShio.name} {currentYearShio.emoji}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(ScriptType).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setScriptType(type);
                      setInput('');
                      setOutput('');
                    }}
                    className={`px-3 py-3 border text-[9px] rounded-lg transition-all duration-500 ${
                      scriptType === type 
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/80'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {scriptType === ScriptType.TOGEL && (
              <div className="space-y-4 animate-fade-in">
                <label className="text-white/30 tracking-[0.2em] font-mono flex items-center">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                  Select Pasaran (Auto-Gen)
                </label>
                <div className="grid grid-cols-3 gap-1.5 h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {PASARAN_LIST.map((pasaran) => (
                    <button
                      key={pasaran}
                      onClick={() => handleAutoPasaran(pasaran)}
                      className="px-2 py-2 bg-white/5 border border-white/5 rounded-md text-[7.5px] text-white/40 hover:bg-white/10 hover:text-white/90 transition-all text-center"
                    >
                      {pasaran}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {scriptType === ScriptType.SYAIR && (
              <div className="space-y-4 animate-fade-in">
                <label className="text-white/30 tracking-[0.2em] font-mono flex items-center">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2 animate-pulse"></span>
                  Select Shio (Auto-Syair)
                </label>
                <div className="grid grid-cols-4 gap-2 h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {SHIO_ICONS.map((shio) => (
                    <button
                      key={shio.name}
                      onClick={() => handleShioClick(shio.name)}
                      className="flex flex-col items-center justify-center p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group/shio"
                    >
                      <span className="text-xl group-hover/shio:scale-125 transition-transform duration-300">{shio.icon}</span>
                      <span className="text-[7px] mt-1 text-white/30 group-hover/shio:text-white/80">{shio.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 flex-1 flex flex-col">
              <label className="text-white/30 tracking-[0.2em] font-mono">Input Stream</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste raw data for transmutation..."
                className="w-full flex-1 min-h-[120px] bg-white/[0.03] border border-white/5 rounded-xl p-4 font-mono text-xs text-white/80 focus:outline-none focus:border-white/20 transition-all placeholder:opacity-10 resize-none custom-scrollbar"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-white/90 text-black font-bold py-5 rounded-xl hover:bg-white transition-all text-[11px] tracking-[0.5em] active:scale-[0.98] shadow-lg"
            >
              Execute Protocol
            </button>
          </div>

          <div className="w-full md:w-[55%] p-8 flex flex-col space-y-6 bg-white/[0.01]">
            <div className="flex justify-between items-center">
              <label className="text-white/30 tracking-[0.2em] font-mono">Transmuted Output</label>
              {copied && <span className="text-emerald-400 font-mono animate-fade-in tracking-[0.2em] text-[8px]">SYNCED TO SYSTEM</span>}
            </div>

            <div className="flex-1 relative">
              <textarea
                value={output}
                readOnly
                placeholder="Awaiting data synchronization..."
                className="w-full h-full min-h-[400px] bg-black/20 border border-white/5 rounded-2xl p-6 font-mono text-[11px] text-white/90 focus:outline-none resize-none placeholder:opacity-5 custom-scrollbar leading-relaxed"
              />
            </div>

            <button
              onClick={handleCopy}
              disabled={!output}
              className={`w-full py-5 rounded-xl transition-all text-[11px] tracking-[0.5em] flex items-center justify-center space-x-3 border ${
                output 
                  ? 'border-white/20 text-white hover:bg-white hover:text-black hover:shadow-2xl active:scale-[0.98]' 
                  : 'border-white/5 text-white/10 cursor-not-allowed'
              }`}
            >
              <span>{copied ? 'SYNCHRONIZED' : 'COPY OUTPUT'}</span>
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
