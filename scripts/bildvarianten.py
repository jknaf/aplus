"""Kleinere Varianten der großen Fotos in public/images erzeugen.

Für jedes JPG über 290 KB entstehen:
  name-1280.jpg, name-1920.jpg  (schmaler, für srcSet)
  name-hoch.jpg                 (Hochformat-Zuschnitt aus der Mitte, für Handy-Header)
und die Datei bildvarianten.ts mit den srcSet-Angaben.

Aufruf (nach neuen oder geänderten Fotos): python3 scripts/bildvarianten.py
Braucht Pillow (pip install pillow).
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BREITEN = (1280, 1920)
MIN_BYTES = 290_000
# Seitenverhältnis des Zuschnitts: Handy-Header ist ca. 0,5 breit wie hoch, etwas Rand dazu
HOCH_VERHAELTNIS = 0.6
ENDUNGEN = tuple(f"-{w}.jpg" for w in BREITEN) + ("-hoch.jpg",)


def speichern(bild, pfad):
    bild.save(pfad, quality=82, optimize=True, progressive=True)


srcset, hoch = {}, {}
for pfad in sorted(PUBLIC.glob("images/**/*.jpg")):
    if pfad.name.endswith(ENDUNGEN) or pfad.stat().st_size < MIN_BYTES:
        continue
    url = "/" + pfad.relative_to(PUBLIC).as_posix()
    bild = Image.open(pfad).convert("RGB")
    eintraege = []
    for w in BREITEN:
        if w >= bild.width:
            continue
        ziel = pfad.with_name(f"{pfad.stem}-{w}.jpg")
        speichern(bild.resize((w, round(bild.height * w / bild.width)), Image.LANCZOS), ziel)
        eintraege.append(f"{url[:-4]}-{w}.jpg {w}w")
    eintraege.append(f"{url} {bild.width}w")
    srcset[url] = ", ".join(eintraege)

    cw = round(bild.height * HOCH_VERHAELTNIS)
    if cw < bild.width:
        x = (bild.width - cw) // 2
        speichern(bild.crop((x, 0, x + cw, bild.height)), pfad.with_name(f"{pfad.stem}-hoch.jpg"))
        hoch[url] = f"{url[:-4]}-hoch.jpg"
    print(url)

(ROOT / "bildvarianten.ts").write_text(
    "// Erzeugt von scripts/bildvarianten.py, nicht von Hand ändern.\n"
    f"export const SRCSET: Record<string, string> = {json.dumps(srcset, indent=2)};\n\n"
    f"export const HOCH: Record<string, string> = {json.dumps(hoch, indent=2)};\n",
    encoding="utf-8",
)
