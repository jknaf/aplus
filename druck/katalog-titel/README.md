# Katalog-Titelblatt: Skatepark 21 (Auftrag vom 12.11.2026)

Der Inhaber will auf dem Titelblatt der gedruckten Kataloge Skatepark 21 statt des alten Titelparks sehen.
Die Kataloge liegen im privaten R2-Bucket (`R2_KATALOG`, `R2_KATALOG_EN`, `R2_KATALOG_FR`). Auf dem Mac des
Inhabers gibt es keinen Zugriff auf Cloudflare und keine Vorlage der PDFs, darum wird das auf dem Entwicklungsrechner erledigt.

Auf der Website (nur Staging, Zweig `dev`) ist das schon erledigt: `public/images/branding/katalog-cover.jpg` und
`public/images/menue/katalog-cover.webp`.

## Was zu tun ist

1. In allen drei Katalogen (DE, EN, FR) auf Seite 1 das Parkbild durch Skatepark 21 ersetzen. Logo, „Ausgabe 2026“
   und die Schrift unten bleiben, wie sie sind.
2. Die drei PDFs unter ihrem bisherigen Dateinamen wieder nach R2 hochladen. Dann zeigen die Links der Website sofort die neue Fassung.

## Dateien hier

- `skatepark-21_titel_transparent.png`: Skatepark 21 freigestellt, 2262 × 1330 px. Gerechnet aus den
  Website-Modellen (`public/katalog/parks.json`, three.js, eingebackenes Licht).
- `titelblatt-vorschau-de.jpg`: So soll Seite 1 aussehen (deutsche Fassung, 904 × 1280).
- `render.html`: das Rendering selbst. Kamera: `?nr=21&az=-38&el=26&d=34&rand=0.06&cy=0.55&w=2480&h=2186`.
  Für die Ausführung braucht es einen Webserver, der unter `/katalog` den Ordner `public/katalog` und unter `/three` den Ordner `node_modules/three` ausliefert.

Ist die Vorlage des Hefts mit Blender da (`heft_szenen.py`), dann ist ein Blender-Rendering von Park 21 aus derselben
Richtung schöner als das PNG: großer Block mit Geländer vorne rechts, Funbox in der Mitte, Quarter mit Geländer hinten links.
