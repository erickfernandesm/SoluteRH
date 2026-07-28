#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Solute RH - pipeline de preparacao de assets para a web.

Le tudo de  /assets  (originais, nunca modificados)
e escreve versoes otimizadas em  /media  (usadas pelo site).

Uso:  python _tools/build-assets.py
Requer: Python 3 + Pillow + ffmpeg no PATH + Google Chrome (para rasterizar SVG).
"""

import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets")
OUT = os.path.join(ROOT, "media")

BRAND_ORANGE = "#F38C23"

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]


def log(msg):
    print("  " + msg)


def find_chrome():
    for c in CHROME_CANDIDATES:
        if os.path.exists(c):
            return c
    return None


def run(args):
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")


# --------------------------------------------------------------------------
# 1. LOGO PRINCIPAL  (SVG UTF-16 -> UTF-8, + variantes de cor)
# --------------------------------------------------------------------------

def build_logo_svgs():
    print("\n[1] Logo principal (SVG)")
    raw = open(os.path.join(SRC, "logocoloridasvg.svg"), "rb").read()
    txt = raw.decode("utf-16").replace("\r\n", "\n").replace("\r", "\n")
    txt = txt.replace('encoding="UTF-16"', 'encoding="UTF-8"')

    variants = {
        "logo-solute.svg": None,                 # original: preto + laranja
        "logo-solute-branca.svg": "#FFFFFF",     # texto branco + laranja
        "logo-solute-laranja.svg": BRAND_ORANGE, # tudo laranja
        "logo-solute-preta.svg": "#000000",
    }
    for name, black_to in variants.items():
        out = txt
        if black_to:
            out = re.sub(r"\.fil0\s*\{fill:black\}", ".fil0 {fill:%s}" % black_to, out)
        if name == "logo-solute-laranja.svg":
            out = re.sub(r"\.fil1\s*\{fill:#F38C23\}", ".fil1 {fill:%s}" % BRAND_ORANGE, out)
        if name == "logo-solute-preta.svg":
            out = re.sub(r"\.fil1\s*\{fill:#F38C23\}", ".fil1 {fill:#000000}", out)
        open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n").write(out)
        log(name)
    return txt


# --------------------------------------------------------------------------
# 2. SIMBOLO ISOLADO (sem texto) -> usado em favicon, loader, watermark
# --------------------------------------------------------------------------

def _subpaths(d):
    return [p for p in re.split(r"(?=[Mm][-\d])", d) if p.strip()]


def _to_abs(subs):
    out, cx, cy = [], 0.0, 0.0
    for s in subs:
        m = re.match(r"([Mm])(-?[\d.]+)\s+(-?[\d.]+)(.*)", s, re.S)
        cmd, x, y, body = m.group(1), float(m.group(2)), float(m.group(3)), m.group(4)
        cx, cy = (x, y) if cmd == "M" else (cx + x, cy + y)
        out.append((cx, cy, body))
    return out


def build_symbol(logo_txt):
    """Extrai apenas o simbolo (2 figuras + swoosh), descartando o lettering."""
    print("\n[2] Simbolo isolado")
    paths = re.findall(r'<path class="(fil\d)" d="([^"]+)"', logo_txt)
    fil0 = _to_abs(_subpaths(paths[0][1]))   # ambos os subpaths sao do simbolo
    fil1 = _to_abs(_subpaths(paths[1][1]))
    dark = [fil0[0], fil0[1]]
    # fil1: [0] swoosh, [5] cabeca laranja, [6] corpo laranja.
    # [4] e a ponta do swoosh que passa POR TRAS do lettering -> fica solta sem o texto.
    accent = [fil1[0], fil1[5], fil1[6]]

    def dstr(items):
        return " ".join("M%s %s%s" % (x, y, b) for x, y, b in items)

    def svg(view_box, dark_fill, accent_fill):
        return (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" '
            'fill-rule="evenodd" clip-rule="evenodd">\n'
            '  <path fill="%s" d="%s"/>\n'
            '  <path fill="%s" d="%s"/>\n</svg>\n'
            % (view_box, dark_fill, dstr(dark), accent_fill, dstr(accent))
        )

    full_vb = "0 0 5145.82 2367.68"
    probe = os.path.join(OUT, "_probe.svg")
    open(probe, "w", encoding="utf-8").write(svg(full_vb, "#000000", BRAND_ORANGE))

    # Descobre a bbox real rasterizando e medindo o alpha.
    vb = _measure_bbox(probe, full_vb)
    os.remove(probe)

    for name, dk, ac in [
        ("simbolo-solute.svg", "#111111", BRAND_ORANGE),
        ("simbolo-solute-branco.svg", "#FFFFFF", "#FFFFFF"),
        ("simbolo-solute-laranja.svg", BRAND_ORANGE, BRAND_ORANGE),
        ("simbolo-solute-claro.svg", "#FFFFFF", BRAND_ORANGE),
    ]:
        open(os.path.join(OUT, name), "w", encoding="utf-8").write(svg(vb, dk, ac))
        log(name)
    return vb


def _measure_bbox(svg_path, full_vb, pad_ratio=0.0):
    """Rasteriza o SVG e devolve um viewBox justo ao conteudo."""
    from PIL import Image
    chrome = find_chrome()
    x0, y0, w0, h0 = [float(v) for v in full_vb.split()]
    if not chrome:
        log("Chrome nao encontrado - usando viewBox estimado")
        return "0 0 2450 2367.68"

    px = 1200
    tmp_html = os.path.join(OUT, "_probe.html")
    tmp_png = os.path.join(OUT, "_probe.png")
    open(tmp_html, "w", encoding="utf-8").write(
        "<style>html,body{margin:0;background:#fff}img{width:%dpx;display:block}</style>"
        '<img src="%s">' % (px, "file:///" + svg_path.replace("\\", "/"))
    )
    height = int(px * h0 / w0) + 4
    run([chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
         "--screenshot=" + tmp_png, "--window-size=%d,%d" % (px, height),
         "file:///" + tmp_html.replace("\\", "/")])

    im = Image.open(tmp_png).convert("RGB")
    # conteudo = tudo que nao for branco puro
    from PIL import ImageChops
    bg = Image.new("RGB", im.size, (255, 255, 255))
    box = ImageChops.difference(im, bg).convert("L").point(lambda v: 255 if v > 8 else 0).getbbox()
    for f in (tmp_html, tmp_png):
        if os.path.exists(f):
            os.remove(f)
    if not box:
        return full_vb
    scale = w0 / px
    bx, by, bx2, by2 = [v * scale for v in box]
    pad = (bx2 - bx) * pad_ratio
    vb = "%.2f %.2f %.2f %.2f" % (bx - pad, by - pad, (bx2 - bx) + pad * 2, (by2 - by) + pad * 2)
    log("bbox do simbolo -> viewBox=\"%s\"" % vb)
    return vb


# --------------------------------------------------------------------------
# 3. FAVICONS
# --------------------------------------------------------------------------

def build_favicons(symbol_vb):
    print("\n[3] Favicons")
    from PIL import Image
    chrome = find_chrome()
    src_svg = os.path.join(OUT, "simbolo-solute-laranja.svg")

    if not chrome:
        log("Chrome ausente - copiando favicon original de baixa resolucao")
        shutil.copy(os.path.join(SRC, "faviconlaranja.png"), os.path.join(OUT, "favicon.png"))
        return

    # favicon.svg: simbolo laranja com respiro, quadrado
    x, y, w, h = [float(v) for v in symbol_vb.split()]
    side = max(w, h) * 1.24
    ox, oy = x - (side - w) / 2, y - (side - h) / 2
    sq_vb = "%.2f %.2f %.2f %.2f" % (ox, oy, side, side)
    body = open(src_svg, encoding="utf-8").read()
    body = re.sub(r'viewBox="[^"]+"', 'viewBox="%s"' % sq_vb, body)
    open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8").write(body)
    log("favicon.svg")

    # PNGs rasterizados
    tmp_html = os.path.join(OUT, "_fav.html")
    for size in (512, 192, 180, 32, 16):
        open(tmp_html, "w", encoding="utf-8").write(
            "<style>html,body{margin:0;background:transparent}"
            "img{width:%dpx;height:%dpx;display:block}</style>"
            '<img src="favicon.svg">' % (size, size)
        )
        out_png = os.path.join(OUT, "favicon-%d.png" % size)
        run([chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
             "--default-background-color=00000000", "--screenshot=" + out_png,
             "--window-size=%d,%d" % (size, size),
             "file:///" + tmp_html.replace("\\", "/")])
        if os.path.exists(out_png):
            log("favicon-%d.png" % size)

    # apple-touch-icon precisa de fundo solido
    if os.path.exists(os.path.join(OUT, "favicon-180.png")):
        im = Image.open(os.path.join(OUT, "favicon-180.png")).convert("RGBA")
        bg = Image.new("RGBA", im.size, (10, 10, 11, 255))
        bg.alpha_composite(im)
        bg.convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"), quality=95)
        log("apple-touch-icon.png")

    # favicon.ico multi-resolucao
    icos = []
    for s in (16, 32, 48):
        p = os.path.join(OUT, "favicon-%d.png" % s)
        if os.path.exists(p):
            icos.append(Image.open(p).convert("RGBA"))
    if icos:
        icos[0].save(os.path.join(ROOT, "favicon.ico"),
                     sizes=[(16, 16), (32, 32), (48, 48)])
        log("favicon.ico (raiz)")
    if os.path.exists(tmp_html):
        os.remove(tmp_html)


# --------------------------------------------------------------------------
# 4. LOGOS DAS SUBMARCAS (Solute Cast / Solute Consultoria) - trim do alpha
# --------------------------------------------------------------------------

SUBBRAND_MAP = {
    # origem                              ->  destino
    "logosolutecastbranca.png":           "logo-cast-branca.png",
    "logosolutecastcolorida.png":         "logo-cast-colorida.png",
    "logosolutecastlaranja.png":          "logo-cast-laranja.png",
    "logosolutecastpreta.png":            "logo-cast-preta.png",
    "iconesolutecastbranco.png":          "icone-cast-branco.png",
    "iconesolutecastcinza.png":           "icone-cast-cinza.png",
    "iconesolutecastlaranja.png":         "icone-cast-laranja.png",
    "iconesolutecastpreto.png":           "icone-cast-preto.png",
    "logosoluteconsultoriabranca.png":    "logo-consultoria-branca.png",
    "logosoluteconsultoriacolorida.png":  "logo-consultoria-colorida.png",
    "logosoluteconsultorialaranja.png":   "logo-consultoria-laranja.png",
    "logosoluteconsultoriapreta.png":     "logo-consultoria-preta.png",
    "iconesoluteconsultoriabranca.png":   "icone-consultoria-branco.png",
    "iconesoluteconsultoriapreta.png":    "icone-consultoria-preto.png",
    # obs: no original veio grafado "iscone..." (typo do arquivo de origem)
    "isconesoluteconsultorialaranja.png": "icone-consultoria-laranja.png",
    "iconesoluteconsultorialaranja.png":  "icone-consultoria-laranja.png",
    "logosolutecursosbranca.png":         "logo-cursos-branca.png",
    "logosolutecursoscolorida.png":       "logo-cursos-colorida.png",
    "logosolutecursoslaranja.png":        "logo-cursos-laranja.png",
    "logosolutecursospreta.png":          "logo-cursos-preta.png",
    "iconesolutecursosbranca.png":        "icone-cursos-branco.png",
    "iconesolutecursoslaranja.png":       "icone-cursos-laranja.png",
    "iconesolutecursospreta.png":         "icone-cursos-preto.png",
    # icones de marcas de terceiros
    "google_iconecolorido.png":           "google-colorido.png",
    "whatsapp_colorido.png":              "whatsapp-colorido.png",
    "whatsapp_preto.png":                 "whatsapp-preto.png",
    "radioalofm.png":                     "radio-alo-fm.png",
}


def build_subbrands():
    print("\n[4] Logos das submarcas (trim do espaco vazio)")
    from PIL import Image
    n = 0
    for src_name, out_name in SUBBRAND_MAP.items():
        p = os.path.join(SRC, src_name)
        if not os.path.exists(p):
            continue
        im = Image.open(p).convert("RGBA")
        box = im.split()[-1].getbbox()          # bbox do canal alpha
        if box:
            im = im.crop(box)
        # limita a 900px de largura, preservando nitidez
        if im.width > 900:
            im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
        im.save(os.path.join(OUT, out_name), optimize=True)
        n += 1
    log("%d arquivos gerados" % n)


# --------------------------------------------------------------------------
# 5. FOTOS  (copia + versoes responsivas em WebP)
# --------------------------------------------------------------------------

PHOTOS = [
    "rose_principal.webp", "foto_time.webp", "conduzido_rose.webp",
    "rhestrategico.webp", "planodecargos_e_salarios.webp", "nr01.webp",
    "desenvolvimento_de_lideranca.webp", "avaliacao_de_desempenho.webp",
    "pesquisa_organizacional.webp", "fit_cultural.webp", "recrutamento_selecao.webp",
]
CLIENTS = [
    "trade", "tim", "sindicomercio", "pramar", "pralis", "paraibuna_embalagens",
    "oficina_grafica", "newmed", "gazzoni", "fisk", "fisiodonto", "libano",
    "equipar", "datafor", "constance", "match_digital", "corinto", "mundial_aluminio",
]
PEOPLE = ["riane", "marcia"]

# fotos redondas do time (quem-somos)
TEAM = [
    "fotoredonda_rose", "fotoredonda_marcos", "fotoredonda_emillia",
    "fotoredonda_pamela", "fotoredonda_vanessa", "fotoredonda_raniel",
    "fotoredonda_livia", "fotoredonda_vagas",
]


def build_team():
    """Recorta as fotos do time em quadrado (o circulo e feito no CSS)."""
    print("\n[5b] Fotos do time")
    from PIL import Image
    n = 0
    for name in TEAM:
        p = os.path.join(SRC, name + ".webp")
        if not os.path.exists(p):
            log("FALTANDO: " + name)
            continue
        im = Image.open(p).convert("RGB")
        w, h = im.size
        side = min(w, h)
        # recorte quadrado alinhado ao topo: enquadra o rosto, nao o meio do corpo
        top = 0 if h > w else (h - side) // 2
        left = (w - side) // 2
        im = im.crop((left, top, left + side, top + side))
        im = im.resize((440, 440), Image.LANCZOS)
        out = name.replace("fotoredonda_", "time-") + ".webp"
        im.save(os.path.join(OUT, out), "WEBP", quality=86, method=6)
        n += 1
    log("%d fotos do time processadas" % n)


def build_photos():
    print("\n[5] Fotos")
    from PIL import Image
    count = 0
    for name in PHOTOS + [c + ".webp" for c in CLIENTS] + [p + ".webp" for p in PEOPLE]:
        p = os.path.join(SRC, name)
        if not os.path.exists(p):
            log("FALTANDO: " + name)
            continue
        im = Image.open(p).convert("RGB")
        base = name.replace(".webp", "").replace("_", "-")
        # imagem grande: max 1400px no maior lado
        big = im
        if max(im.size) > 1400:
            r = 1400 / max(im.size)
            big = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
        big.save(os.path.join(OUT, base + ".webp"), "WEBP", quality=82, method=6)
        # versao pequena para telas menores (so para as fotos grandes)
        if max(im.size) > 900:
            r = 800 / max(im.size)
            im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS).save(
                os.path.join(OUT, base + "-sm.webp"), "WEBP", quality=80, method=6)
        count += 1
    log("%d fotos processadas" % count)


# --------------------------------------------------------------------------
# 6. VIDEOS  (versao web leve, sem audio, + posters)
# --------------------------------------------------------------------------

def build_videos():
    print("\n[6] Videos")
    if not shutil.which("ffmpeg"):
        log("ffmpeg ausente - pulando")
        return

    h_src = os.path.join(SRC, "videohorizontal.mp4")
    v_src = os.path.join(SRC, "videovertical.mp4")

    # --- horizontal: 1280x720, sem audio, otimizado para streaming ---
    if os.path.exists(h_src):
        out = os.path.join(OUT, "tour-escritorio.mp4")
        run(["ffmpeg", "-y", "-v", "error", "-i", h_src,
             "-an", "-vf", "scale=1280:720:flags=lanczos",
             "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
             "-crf", "29", "-pix_fmt", "yuv420p", "-r", "30",
             "-movflags", "+faststart", out])
        log("tour-escritorio.mp4  (%.1f MB)" % (os.path.getsize(out) / 1e6))

        # poster
        run(["ffmpeg", "-y", "-v", "error", "-ss", "9.5", "-i", h_src,
             "-frames:v", "1", "-vf", "scale=1280:-1",
             "-q:v", "80", os.path.join(OUT, "tour-escritorio-poster.webp")])
        log("tour-escritorio-poster.webp")

    # --- vertical: remove o pillarbox (9:16 real) para o hero mobile ---
    if os.path.exists(v_src):
        out = os.path.join(OUT, "tour-escritorio-vertical.mp4")
        run(["ffmpeg", "-y", "-v", "error", "-i", v_src,
             "-an", "-vf", "crop=608:1080:656:0,scale=540:960:flags=lanczos",
             "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
             "-crf", "30", "-pix_fmt", "yuv420p", "-r", "30",
             "-movflags", "+faststart", out])
        log("tour-escritorio-vertical.mp4  (%.1f MB)" % (os.path.getsize(out) / 1e6))

        run(["ffmpeg", "-y", "-v", "error", "-ss", "9", "-i", v_src,
             "-frames:v", "1", "-vf", "crop=608:1080:656:0,scale=540:-1",
             "-q:v", "80", os.path.join(OUT, "tour-escritorio-vertical-poster.webp")])
        log("tour-escritorio-vertical-poster.webp")


# --------------------------------------------------------------------------

def main():
    os.makedirs(OUT, exist_ok=True)
    print("Solute RH - build de assets")
    print("origem : " + SRC)
    print("destino: " + OUT)
    logo_txt = build_logo_svgs()
    vb = build_symbol(logo_txt)
    build_favicons(vb)
    build_subbrands()
    build_photos()
    build_team()
    build_videos()
    print("\nConcluido.")


if __name__ == "__main__":
    main()
