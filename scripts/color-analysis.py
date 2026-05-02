from PIL import Image
import numpy as np
import colorsys
from sklearn.cluster import KMeans
import json

# Load poster
img = Image.open(r'public/poster-bg.webp')
img = img.convert('RGB')
img = img.resize((400, 533))
pixels = np.array(img, dtype=np.float32).reshape(-1, 3)

# K-means clustering
kmeans = KMeans(n_clusters=12, random_state=42, n_init=10)
kmeans.fit(pixels)
centroids = kmeans.cluster_centers_.astype(int)
labels = kmeans.labels_

# Calculate proportions
unique, counts = np.unique(labels, return_counts=True)
total = len(labels)

results = []
for i, centroid in enumerate(centroids):
    r, g, b = centroid
    count = counts[i] if i in unique else 0
    pct = count / total * 100
    h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
    
    if v < 0.15:
        category = 'background'
    elif v < 0.35 and s > 0.3:
        category = 'surface'
    elif s > 0.4 and v > 0.35:
        category = 'accent'
    else:
        category = 'highlight'
    
    results.append({
        'r': int(r), 'g': int(g), 'b': int(b),
        'hex': f'#{r:02x}{g:02x}{b:02x}',
        'pct': round(pct, 1),
        'h': round(h * 360, 1),
        's': round(s * 100, 1),
        'v': round(v * 100, 1),
        'category': category
    })

results.sort(key=lambda x: x['pct'], reverse=True)

print('=== DETAILED COLOR ANALYSIS ===')
print()

categories = {
    'background': 'BACKGROUND (dark tones)',
    'surface': 'SURFACES (mid tones)',
    'accent': 'ACCENTS (bright tones)',
    'highlight': 'HIGHLIGHTS (light tones)'
}

for cat_key, cat_name in categories.items():
    cat_colors = [c for c in results if c['category'] == cat_key]
    if cat_colors:
        print(f'\n{cat_name}')
        print('-' * 70)
        total_pct = sum(c['pct'] for c in cat_colors)
        print(f'Total share: {total_pct:.1f}%')
        for c in cat_colors:
            print(f"  {c['hex']}  RGB({c['r']:3d},{c['g']:3d},{c['b']:3d})  {c['pct']:5.1f}%  HSV({c['h']:5.1f}, {c['s']:4.1f}%, {c['v']:4.1f}%)")

bg_colors = [c for c in results if c['category'] == 'background']
surface_colors = [c for c in results if c['category'] == 'surface']
accent_colors = [c for c in results if c['category'] == 'accent']
highlight_colors = [c for c in results if c['category'] == 'highlight']
muted_candidates = [c for c in results if 0.3 < c['v'] < 0.7 and c['s'] < 0.5]

print()
print('=== RECOMMENDED DESIGN TOKENS ===')
print()

if bg_colors:
    primary_bg = bg_colors[0]
    print(f"bg-primary:      {primary_bg['hex']}  // Main background ({primary_bg['pct']}%)")
    if len(bg_colors) > 1:
        secondary_bg = bg_colors[1]
        print(f"bg-secondary:    {secondary_bg['hex']}  // Secondary bg, cards")

if surface_colors:
    primary_surface = surface_colors[0]
    print(f"surface:         {primary_surface['hex']}  // Surfaces, panels")

if accent_colors:
    primary_accent = max(accent_colors, key=lambda x: x['s'] * x['v'])
    print(f"accent-primary:  {primary_accent['hex']}  // Primary accent, buttons")
    if len(accent_colors) > 1:
        secondary_accent = sorted(accent_colors, key=lambda x: x['s'] * x['v'], reverse=True)[1]
        print(f"accent-secondary: {secondary_accent['hex']}  // Secondary accent")

if highlight_colors:
    primary_highlight = max(highlight_colors, key=lambda x: x['v'])
    print(f"text-primary:    {primary_highlight['hex']}  // Main text")

if muted_candidates:
    muted = muted_candidates[0]
    print(f"text-muted:      {muted['hex']}  // Secondary text")

tokens = {
    'background': {'primary': bg_colors[0]['hex'] if bg_colors else '#0d0d12',
                   'secondary': bg_colors[1]['hex'] if len(bg_colors) > 1 else '#161623'},
    'surface': {'primary': surface_colors[0]['hex'] if surface_colors else '#1a1a2e'},
    'accent': {'primary': max(accent_colors, key=lambda x: x['s'] * x['v'])['hex'] if accent_colors else '#7b5177',
               'secondary': sorted(accent_colors, key=lambda x: x['s'] * x['v'], reverse=True)[1]['hex'] if len(accent_colors) > 1 else '#b07687'},
    'text': {'primary': max(highlight_colors, key=lambda x: x['v'])['hex'] if highlight_colors else '#dbb8a9',
             'muted': muted_candidates[0]['hex'] if muted_candidates else '#64748b'},
    'glow': {'primary': max(accent_colors, key=lambda x: x['s'] * x['v'])['hex'] if accent_colors else '#7b5177'}
}

print()
print('Done. Review the printed tokens and update tailwind.config.js / index.css manually.')
