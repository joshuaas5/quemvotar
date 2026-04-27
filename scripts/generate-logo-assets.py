from PIL import Image, ImageDraw
import os

SRC = r'C:\Users\Editora Vélos\Downloads\logo.png'
OUT_DIR = r'C:\Users\Editora Vélos\Documents\Open1\quemvotar\public'

RESAMPLE = Image.Resampling.LANCZOS

img = Image.open(SRC).convert('RGBA')

# Garante fundo transparente
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# 1. Favicon ICO (16, 32, 48)
sizes_ico = [16, 32, 48]
frames = [img.resize((s, s), RESAMPLE) for s in sizes_ico]
frames[0].save(
    os.path.join(OUT_DIR, 'favicon.ico'),
    format='ICO',
    sizes=[(s, s) for s in sizes_ico],
    append_images=frames[1:],
)
print('[OK] favicon.ico (16, 32, 48)')

# 2. Apple Touch Icon (180x180)
img.resize((180, 180), RESAMPLE).save(
    os.path.join(OUT_DIR, 'apple-touch-icon.png'),
    'PNG'
)
print('[OK] apple-touch-icon.png (180x180)')

# 3. PWA Icons
img.resize((192, 192), RESAMPLE).save(
    os.path.join(OUT_DIR, 'icon-192.png'), 'PNG'
)
print('[OK] icon-192.png')

img.resize((512, 512), RESAMPLE).save(
    os.path.join(OUT_DIR, 'icon-512.png'), 'PNG'
)
print('[OK] icon-512.png')

# 4. Logo para header (altura 48px, mantendo proporção)
w, h = img.size
ratio = 48 / h
new_w = int(w * ratio)
logo_header = img.resize((new_w, 48), RESAMPLE)
logo_header.save(os.path.join(OUT_DIR, 'logo-header.png'), 'PNG')
print(f'[OK] logo-header.png ({new_w}x48)')

# 5. OG Image (1200x630) — fundo brutalista com logo centralizado
og = Image.new('RGB', (1200, 630), (245, 246, 247))  # #f5f6f7

# Adiciona blocos de cor brutalistas nos cantos
block_size = 80
colors = [(255, 224, 102), (155, 246, 255), (255, 198, 255), (255, 214, 165)]  # amarelo, ciano, rosa, laranja
positions = [(0, 0), (1200 - block_size, 0), (0, 630 - block_size), (1200 - block_size, 630 - block_size)]
for color, pos in zip(colors, positions):
    og.paste(color, (pos[0], pos[1], pos[0] + block_size, pos[1] + block_size))

# Adiciona borda grossa preta
draw = ImageDraw.Draw(og)
draw.rectangle([0, 0, 1199, 629], outline=(0, 0, 0), width=12)

# Redimensiona logo para caber no OG
logo_og = img.resize((400, 400), RESAMPLE)
x = (1200 - 400) // 2
y = (630 - 400) // 2 - 30
og.paste(logo_og, (x, y), logo_og)

og.save(os.path.join(OUT_DIR, 'og-image.png'), 'PNG')
print('[OK] og-image.png (1200x630)')

# 6. Logo principal (cópia do original no public)
img.save(os.path.join(OUT_DIR, 'logo.png'), 'PNG')
print('[OK] logo.png (original)')

print('\n[DONE] Todas as imagens geradas com sucesso!')
