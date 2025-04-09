const Terminal = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden md:row-span-2 h-full w-full">
      <div className="bg-[#232323] p-2 flex items-center">
        <div className="flex gap-2 mr-auto">
          <div className="w-3 h-3 bg-[#d83b3b] rounded-full"></div>
          <div className="w-3 h-3 bg-[#e2c423] rounded-full"></div>
          <div className="w-3 h-3 bg-[#03ca0b] rounded-full"></div>
        </div>
        <span className="text-xs text-[#b3b3b3]">@elfrontend - 80 × 24</span>
      </div>
      <div className="p-4 font-mono text-sm h-full">
        <p>
          <span className="text-[#9e77ed]">elfrontend</span> $ /help
        </p>
      </div>
    </div>
  );
};

export default Terminal;
