import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

target = '        <div className="flex flex-col md:flex-row gap-6 mb-10 items-stretch">'
replacement = '        <div className="flex flex-col md:flex-row gap-8 mb-12 items-stretch max-w-4xl mx-auto w-full px-4">'

found = False
for i, line in enumerate(lines):
    if target in line:
        lines[i] = replacement + '\n'
        found = True
        break

if found:
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print("Successfully adjusted card margins.")
else:
    print("Could not find the target line.")
