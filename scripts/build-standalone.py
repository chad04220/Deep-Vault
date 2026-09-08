"""Build the offline edition using only the Python standard library."""
import argparse
from pathlib import Path
import re

parser = argparse.ArgumentParser()
parser.add_argument('output', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1] / 'dist'
html = (root / 'index.html').read_text()

def script(match):
    name = match.group(1)
    source = (root / name).read_text()
    source = re.sub(r'</script', lambda m: r'<\/script', source, flags=re.I)
    return '<script>\n' + source + '\n</script>'

def style(match):
    return '<style>\n' + (root / match.group(1)).read_text() + '\n</style>'

html = re.sub(r'<script src="([^"]+)"></script>', script, html)
html = re.sub(r'<link rel="stylesheet" href="([^"]+)"\s*/?>', style, html)
license_text = (root / 'vendor/LICENSE-BabylonJS.md').read_text().replace('--', '—')
html = html.replace('<html', '<!-- Babylon.js: Apache 2.0 license\n' + license_text + '\n-->\n<html', 1)
assert not re.search(r'<script[^>]+src=|<link[^>]+stylesheet', html)
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(html)
print(f'Offline edition: {args.output.stat().st_size:,} bytes')
