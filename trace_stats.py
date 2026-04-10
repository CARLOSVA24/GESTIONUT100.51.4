with open(r'c:\Users\hp\OneDrive\Escritorio\CARLOS VALLEJO\CREACION DE PAGINAS WEB\registro de delitos\index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'personnelStatsView' in line:
            print(f"Line {i+1}: {line.strip()}")
