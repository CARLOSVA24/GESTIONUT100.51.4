import re

with open(r'c:\Users\hp\OneDrive\Escritorio\CARLOS VALLEJO\CREACION DE PAGINAS WEB\registro de delitos\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

targets = ['personnelView', 'watchDivisionView', 'personnelStatsView', 'distributionView']

for v in targets:
    print(f"Occurrences of {v}:")
    for i, line in enumerate(lines):
        if v in line:
            print(f"  Line {i+1}: {line.strip()}")
