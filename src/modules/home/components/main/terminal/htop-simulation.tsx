"use client";

import { useEffect, useState } from "react";

interface Process {
  pid: number;
  user: string;
  priority: number;
  nice: number;
  virt: string;
  res: string;
  shr: string;
  state: string;
  cpu: number;
  mem: number;
  time: string;
  command: string;
}

export default function HtopSimulation() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [cpuUsage, setCpuUsage] = useState<number[]>([]);
  const [memoryUsage, setMemoryUsage] = useState({
    total: 16384, // 16GB in MB
    used: 0,
    free: 0,
    buffers: 0,
    cache: 0,
  });
  const [uptime, setUptime] = useState("");
  const [tasks, setTasks] = useState({
    total: 0,
    running: 0,
    sleeping: 0,
    stopped: 0,
    zombie: 0,
  });
  const [loadAverage, setLoadAverage] = useState([0, 0, 0]);

  // Generate random data for simulation
  useEffect(() => {
    // Generate CPU cores (4-8 cores)
    const coreCount = Math.floor(Math.random() * 5) + 4;

    const generateData = () => {
      // Generate CPU usage for each core
      const newCpuUsage = Array(coreCount)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
      setCpuUsage(newCpuUsage);

      // Generate memory usage
      const usedMem = Math.floor(Math.random() * 8000) + 4000;
      const buffers = Math.floor(Math.random() * 1000) + 500;
      const cache = Math.floor(Math.random() * 2000) + 1000;
      setMemoryUsage({
        total: 16384,
        used: usedMem,
        free: 16384 - usedMem,
        buffers,
        cache,
      });

      // Generate processes (15-25 processes)
      const processCount = Math.floor(Math.random() * 11) + 15;
      const newProcesses: Process[] = [];

      const users = ["root", "www-data", "nobody", "user", "systemd+"];
      const states = ["S", "R", "Z", "D", "T"];
      const commands = [
        "systemd",
        "nginx",
        "node",
        "python",
        "bash",
        "sshd",
        "cron",
        "docker",
        "mongod",
        "redis-server",
        "postgres",
        "apache2",
        "mysql",
        "firefox",
        "chrome",
      ];

      for (let i = 0; i < processCount; i++) {
        newProcesses.push({
          pid: Math.floor(Math.random() * 10000) + 1,
          user: users[Math.floor(Math.random() * users.length)],
          priority: Math.floor(Math.random() * 40) - 20,
          nice: Math.floor(Math.random() * 20) - 10,
          virt: `${Math.floor(Math.random() * 1000) + 10}m`,
          res: `${Math.floor(Math.random() * 500) + 5}m`,
          shr: `${Math.floor(Math.random() * 100) + 1}m`,
          state: states[Math.floor(Math.random() * states.length)],
          cpu: Number.parseFloat((Math.random() * 10).toFixed(1)),
          mem: Number.parseFloat((Math.random() * 5).toFixed(1)),
          time: `${Math.floor(Math.random() * 10)}:${Math.floor(
            Math.random() * 60
          )
            .toString()
            .padStart(2, "0")}`,
          command: commands[Math.floor(Math.random() * commands.length)],
        });
      }

      // Sort by CPU usage (descending)
      newProcesses.sort((a, b) => b.cpu - a.cpu);
      setProcesses(newProcesses);

      // Update tasks count
      const running = newProcesses.filter((p) => p.state === "R").length;
      const sleeping = newProcesses.filter((p) => p.state === "S").length;
      const stopped = newProcesses.filter((p) => p.state === "T").length;
      const zombie = newProcesses.filter((p) => p.state === "Z").length;

      setTasks({
        total: newProcesses.length,
        running,
        sleeping,
        stopped,
        zombie,
      });

      // Update load average
      setLoadAverage([
        Number.parseFloat((Math.random() * 2).toFixed(2)),
        Number.parseFloat((Math.random() * 1.5).toFixed(2)),
        Number.parseFloat((Math.random() * 1).toFixed(2)),
      ]);

      // Update uptime
      const hours = Math.floor(Math.random() * 100) + 24;
      const minutes = Math.floor(Math.random() * 60);
      setUptime(`${hours}:${minutes.toString().padStart(2, "0")}`);
    };

    generateData();
    const interval = setInterval(generateData, 2000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to generate CPU usage bars
  const getCpuBar = (percentage: number) => {
    const segments = 10;
    const filledSegments = Math.floor((percentage / 100) * segments);

    return (
      <div className="flex items-center">
        <div className="w-[100px] h-[18px] bg-black flex">
          {Array(segments)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-full w-[10px] ${
                  i < filledSegments
                    ? percentage > 70
                      ? "bg-red-500"
                      : percentage > 30
                        ? "bg-green-500"
                        : "bg-blue-500"
                    : "bg-black"
                }`}
              />
            ))}
        </div>
        <span className="ml-1 text-white">{percentage.toFixed(1)}%</span>
      </div>
    );
  };

  // Format memory size
  const formatMemory = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)}G`;
    }
    return `${mb}M`;
  };

  return (
    <div className="font-mono text-sm bg-black text-white p-1 w-full h-full overflow-auto">
      {/* Header */}
      <div className="flex justify-between mb-1">
        <div className="text-cyan-300">
          htop - {new Date().toLocaleTimeString()}
        </div>
        <div className="text-cyan-300">Uptime: {uptime}</div>
      </div>

      {/* CPU Usage */}
      <div className="mb-2">
        {cpuUsage.map((usage, index) => (
          <div key={index} className="flex">
            <div className="w-[60px] text-cyan-300">CPU{index}:</div>
            {getCpuBar(usage)}
          </div>
        ))}
      </div>

      {/* Memory and Swap */}
      <div className="mb-2">
        <div className="flex">
          <div className="w-[60px] text-green-300">Mem:</div>
          <div className="flex items-center">
            <div className="w-[100px] h-[18px] bg-black flex">
              {Array(10)
                .fill(0)
                .map((_, i) => {
                  const memPercentage =
                    (memoryUsage.used / memoryUsage.total) * 100;
                  const filledSegments = Math.floor((memPercentage / 100) * 10);
                  return (
                    <div
                      key={i}
                      className={`h-full w-[10px] ${
                        i < filledSegments
                          ? memPercentage > 70
                            ? "bg-red-500"
                            : "bg-green-500"
                          : "bg-black"
                      }`}
                    />
                  );
                })}
            </div>
            <span className="ml-1 text-white">
              {formatMemory(memoryUsage.used)}/{formatMemory(memoryUsage.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Tasks and Load Average */}
      <div className="flex mb-2">
        <div className="mr-4">
          <span className="text-cyan-300">Tasks: </span>
          <span className="text-white">{tasks.total}, </span>
          <span className="text-green-300">{tasks.running} running, </span>
          <span className="text-blue-300">{tasks.sleeping} sleeping, </span>
          <span className="text-yellow-300">{tasks.stopped} stopped, </span>
          <span className="text-red-300">{tasks.zombie} zombie</span>
        </div>
        <div>
          <span className="text-cyan-300">Load average: </span>
          <span className="text-white">
            {loadAverage[0]} {loadAverage[1]} {loadAverage[2]}
          </span>
        </div>
      </div>

      {/* Process List Header */}
      <div className="flex bg-blue-900 text-white font-bold">
        <div className="w-[70px] px-1">PID</div>
        <div className="w-[80px] px-1">USER</div>
        <div className="w-[40px] px-1">PRI</div>
        <div className="w-[40px] px-1">NI</div>
        <div className="w-[70px] px-1">VIRT</div>
        <div className="w-[70px] px-1">RES</div>
        <div className="w-[70px] px-1">SHR</div>
        <div className="w-[40px] px-1">S</div>
        <div className="w-[60px] px-1">CPU%</div>
        <div className="w-[60px] px-1">MEM%</div>
        <div className="w-[70px] px-1">TIME+</div>
        <div className="flex-1 px-1">COMMAND</div>
      </div>

      {/* Process List */}
      <div className="overflow-y-auto">
        {processes.map((process, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? "bg-gray-900" : "bg-black"} hover:bg-blue-800`}
          >
            <div className="w-[70px] px-1 text-green-300">{process.pid}</div>
            <div className="w-[80px] px-1 text-green-300">{process.user}</div>
            <div className="w-[40px] px-1 text-white">{process.priority}</div>
            <div className="w-[40px] px-1 text-white">{process.nice}</div>
            <div className="w-[70px] px-1 text-white">{process.virt}</div>
            <div className="w-[70px] px-1 text-white">{process.res}</div>
            <div className="w-[70px] px-1 text-white">{process.shr}</div>
            <div
              className={`w-[40px] px-1 ${
                process.state === "R"
                  ? "text-green-300"
                  : process.state === "Z"
                    ? "text-red-300"
                    : process.state === "T"
                      ? "text-yellow-300"
                      : "text-blue-300"
              }`}
            >
              {process.state}
            </div>
            <div className="w-[60px] px-1 text-white">
              {process.cpu.toFixed(1)}
            </div>
            <div className="w-[60px] px-1 text-white">
              {process.mem.toFixed(1)}
            </div>
            <div className="w-[70px] px-1 text-white">{process.time}</div>
            <div className="flex-1 px-1 text-green-300">{process.command}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-2 flex justify-between text-white">
        <div>
          F1Help F2Setup F3Search F4Filter F5Tree F6SortBy F7Nice F8Nice+ F9Kill
          F10Quit
        </div>
      </div>
    </div>
  );
}
