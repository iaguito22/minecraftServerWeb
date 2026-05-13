import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_content = """                <div className="w-full bg-slate-800/40 rounded-full border border-white/5 overflow-hidden" style={{ height: '8px' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: width,
                      backgroundColor: isSelected ? '#22c55e' : '#3b82f6',
                      opacity: isSelected ? 1 : 0.4,
                      boxShadow: isSelected ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                    }}
                  ></div>
                </div>"""

# Targeted lines are 445 to 450 (1-indexed, so index 444 to 450)
# But let's find them precisely by searching for the bg-slate-950/50 string
found = False
for i, line in enumerate(lines):
    if 'bg-slate-950/50 rounded-full h-3' in line:
        # Check if next lines match the expected block
        if 'className={`${isSelected ? \'bg-green-500' in lines[i+2]:
            lines[i:i+6] = [new_content + '\\n']
            found = True
            break

if found:
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print("Successfully replaced content.")
else:
    print("Could not find the target content.")
