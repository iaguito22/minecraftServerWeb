import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

target = '              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-10 border-t border-white/5">'
replacement = '              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-20 border-t border-white/5">'

found = False
for i, line in enumerate(lines):
    if target in line:
        lines[i] = replacement + '\n'
        found = True
        break

if found:
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print("Successfully added space above RAM.")
else:
    print("Could not find the target line.")
