import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_rtx = """  const rtxData = [
    { id: 'potato', name: 'Potato Pack', fps: 275 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 121 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 53 }
  ];"""

new_integrated = """  const integratedData = [
    { id: 'potato', name: 'Potato Pack', fps: 150 },
    { id: 'lowAesthetic', name: 'Low Aesthetic', fps: 52 },
    { id: 'highAesthetic', name: 'High Aesthetic', fps: 18 }
  ];"""

# Find and replace rtxData
for i, line in enumerate(lines):
    if 'const rtxData = [' in line:
        lines[i:i+5] = [new_rtx + '\\n']
        break

# Find and replace integratedData (it's after rtxData)
for i, line in enumerate(lines):
    if 'const integratedData = [' in line:
        lines[i:i+5] = [new_integrated + '\\n']
        break

with open(file_path, 'w') as f:
    f.writelines(lines)

print("Successfully updated FPS to max values.")
