import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_component = """const PerformanceChart = ({ selectedPackId }) => {
  const rtxData = [
    { id: 'potato', name: 'Potato Pack', fps: 230 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 116 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 52 }
  ];

  const integratedData = [
    { id: 'potato', name: 'Potato Pack', fps: 130 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 45 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 15 }
  ];

  // Global max to normalize bars between both charts
  const globalMaxFps = Math.max(
    ...rtxData.map(d => d.fps),
    ...integratedData.map(d => d.fps)
  );

  const ChartBlock = ({ title, icon, data, titleColor }) => {
    return (
      <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-xl">
        <h4 className={`text-[11px] mb-6 ${titleColor} font-black uppercase tracking-[0.25em] flex items-center gap-2`}>
          {icon}
          {title}
        </h4>
        <div className="space-y-6">
          {data.map((item, index) => {
            const isSelected = item.id === selectedPackId;
            const width = `${(item.fps / globalMaxFps) * 100}%`;
            
            return (
              <div key={index} className="group">
                <div className="flex justify-between text-[11px] mb-2 px-1">
                  <span className={`${isSelected ? 'text-green-400 font-black' : 'text-blue-300/60 font-bold'} group-hover:text-white transition-colors uppercase tracking-wider`}>
                    {item.name} {isSelected && '— ACTUAL'}
                  </span>
                  <span className={`font-black ${isSelected ? 'text-green-400' : 'text-blue-200'}`}>{item.fps} FPS</span>
                </div>
                <div className="w-full bg-slate-800/40 rounded-full border border-white/5 overflow-hidden" style={{ height: '8px' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: width,
                      backgroundColor: isSelected ? '#22c55e' : '#3b82f6',
                      opacity: isSelected ? 1 : 0.4,
                      boxShadow: isSelected ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6">
      <ChartBlock 
        title="NVIDIA RTX 3050 (1440p)" 
        icon={<Zap size={14} />} 
        data={rtxData}
        titleColor="text-blue-400"
      />
      <ChartBlock 
        title="Gráficos Integrados (1440p)" 
        icon={<Monitor size={14} />} 
        data={integratedData}
        titleColor="text-slate-400"
      />
    </div>
  );
};"""

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'const PerformanceChart = ({ selectedPackId }) =>' in line:
        start_idx = i
    if start_idx != -1 and line.startswith('};') and i > start_idx:
        # Check if it's the end of PerformanceChart
        # The next line should be const ModpacksTab
        if i + 1 < len(lines) and 'const ModpacksTab' in lines[i+2]: # i+2 because of potential empty lines
             end_idx = i + 1
             break
        # Fallback: if we find the end of a block followed by ModpacksTab
        if i + 2 < len(lines) and 'const ModpacksTab' in lines[i+2]:
             end_idx = i + 1
             break

if start_idx != -1:
    # Find the closing brace precisely
    depth = 0
    for j in range(start_idx, len(lines)):
        depth += lines[j].count('{')
        depth -= lines[j].count('}')
        if depth == 0:
            end_idx = j + 1
            break

if start_idx != -1 and end_idx != -1:
    lines[start_idx:end_idx] = [new_component + '\\n']
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print(f"Successfully updated PerformanceChart from line {start_idx+1} to {end_idx}")
else:
    print(f"Could not find component. start_idx={start_idx}, end_idx={end_idx}")
