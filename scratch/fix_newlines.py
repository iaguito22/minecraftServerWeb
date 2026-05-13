import os

file_path = '/home/iago/PROYECTOS/selector de mods 1.21.1 create/web/src/App.jsx'

with open(file_path, 'r') as f:
    content = f.read()

# Replace the literal \n with a real newline
new_content = content.replace('\\n              </div>', '\n              </div>')

with open(file_path, 'w') as f:
    f.write(new_content)

print("Successfully fixed newlines.")
