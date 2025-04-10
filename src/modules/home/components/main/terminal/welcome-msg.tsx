const WelcomeMessage = () => {
  return (
    <div className="my-2">
      <div>
        <pre className="font-mono text-xs sm:text-sm text-purple-600">
          {`
  ______ _ ______               _                 _ 
 ${"|"}  ____${"|"} ${"|"}  ____${"|"}             ${"|"} ${"|"}               ${"|"} ${"|"}
 ${"|"} ${"|"}__  ${"|"} ${"|"} ${"|"}__ _ __ ___  _ __ ${"|"} ${"|"}_ ___ _ __   __${"|"} ${"|"}
 ${"|"}  __${"|"} ${"|"} ${"|"}  __${"|"} '__/ _ \\${"|"} '_ \\${"|"} __/ _ \\ '_ \\ / _\` ${"|"}
 ${"|"} ${"|"}____${"|"} ${"|"} ${"|"}  ${"|"} ${"|"} ${"|"} (_) ${"|"} ${"|"} ${"|"} ${"|"} ${"|"}${"|"}  __/ ${"|"} ${"|"} ${"|"} (_${"|"} ${"|"}
 ${"|"}______|_${"|"}_{${"|"}  ${"|"}_{${"|"}  \\___/${"|"}_{${"|"} ${"|"}_\\__\\___|_${"|"} ${"|"}_{\\__,_${"|"}
          `}
        </pre>
      </div>
      <div className="mb-1">
        <span className="text-primary font-bold">Welcome to </span>
        <span className="text-purple-600 font-bold">ElFrontend</span>
        <span className="text-primary font-bold"> Terminal</span>
        <span className="text-yellow-400 animate-pulse"> v1.0</span>
      </div>
      <div className="text-gray-400 text-sm italic">
        <span>Type </span>
        <span className="text-green-500 font-mono">help</span>
        <span> to see available commands</span>
      </div>
      <br />
    </div>
  );
};

export default WelcomeMessage;
