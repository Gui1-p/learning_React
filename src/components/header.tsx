export function Header() {
    return (
        <header className="bg-white">
            <div className="p-2">
                <LogoVision />
            </div>

            
        </header>
    )
};



export const LogoVision = () => {
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="flex items-center font-bold tracking-widest text-zinc-900 text-3xl">
        VISION
      </div>
      
      <div className="w-full h-[1px] bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#32FF7E] to-transparent w-1/2 animate-shimmer"></div>
      </div>
    </div>
  );  
};