"""Generate square PNG favicons (stdlib only). Run from repo: python frontend/scripts/gen_favicon_png.py"""
from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT48 = ROOT / "src" / "assets" / "favicon-48.png"
OUT192 = ROOT / "src" / "assets" / "favicon-192.png"
OUTICO = ROOT / "src" / "favicon.ico"

# Brand-ish dark background + light foreground (readable in Google SERP on light UI)
BG = (15, 27, 51)  # #0f1b33
FG = (253, 253, 253)


def write_png(path: Path, width: int, height: int, pixel_rgb) -> None:
    """pixel_rgb: list of (r,g,b) length width*height, row-major."""
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = bytearray()
    for y in range(height):
        raw.append(0)  # filter None
        row_start = y * width
        for x in range(width):
            r, g, b = pixel_rgb[row_start + x]
            raw.extend((r, g, b))

    compressed = zlib.compress(bytes(raw), 9)
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    data = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", compressed)
        + chunk(b"IEND", b"")
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def encode_png(width: int, height: int, pixel_rgb) -> bytes:
    """Return PNG file bytes (RGB 8-bit)."""
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = bytearray()
    for y in range(height):
        raw.append(0)
        row_start = y * width
        for x in range(width):
            r, g, b = pixel_rgb[row_start + x]
            raw.extend((r, g, b))
    compressed = zlib.compress(bytes(raw), 9)
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", compressed)
        + chunk(b"IEND", b"")
    )


def write_ico(path: Path, png_48: bytes) -> None:
    """Single 48x48 PNG image inside a .ico (Vista+ PNG-in-ICO)."""
    # ICONDIR + ICONDIRENTRY + PNG
    offset = 6 + 16
    entry = struct.pack(
        "<BBBBHHII",
        48,
        48,
        0,
        0,
        1,
        0,
        len(png_48),
        offset,
    )
    icondir = struct.pack("<HHH", 0, 1, 1)
    data = icondir + entry + png_48
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def disk(cx: float, cy: float, r: float, px: float, py: float) -> bool:
    return (px - cx) ** 2 + (py - cy) ** 2 <= r * r


def rounded_rect_contains(
    px: float, py: float, x: float, y: float, w: float, h: float, rad: float
) -> bool:
    if px < x or py < y or px >= x + w or py >= y + h:
        return False
    # Shrink corners
    inner_l, inner_r = x + rad, x + w - rad
    inner_t, inner_b = y + rad, y + h - rad
    if inner_l <= px < inner_r and inner_t <= py < inner_b:
        return True
    # Four corner disks
    corners = (
        (inner_l, inner_t, rad),
        (inner_r, inner_t, rad),
        (inner_l, inner_b, rad),
        (inner_r, inner_b, rad),
    )
    for cx, cy, cr in corners:
        if disk(cx, cy, cr, px, py):
            return True
    # Edge slabs
    if px < inner_l and inner_t <= py < inner_b and px >= x:
        return True
    if px >= inner_r and inner_t <= py < inner_b and px < x + w:
        return True
    if py < inner_t and inner_l <= px < inner_r and py >= y:
        return True
    if py >= inner_b and inner_l <= px < inner_r and py < y + h:
        return True
    return False


def gh_mark_pixel(px: float, py: float, scale: float) -> bool:
    """Simplified 'GH' monogram in a rounded square (normalized 0..1 in square)."""
    # Centered unit square -> scale to image
    u = px / scale
    v = py / scale
    if not (0 <= u <= 1 and 0 <= v <= 1):
        return False
    pad = 0.12
    if not rounded_rect_contains(u, v, pad, pad, 1 - 2 * pad, 1 - 2 * pad, 0.14):
        return False
    # Letter shapes as thick strokes (very approximate)
    # G: arc + bar
    cx, cy, R = 0.42, 0.5, 0.22
    in_ring = abs(((u - cx) ** 2 + (v - cy) ** 2) ** 0.5 - R) < 0.065 and v < cy + 0.08
    g_bar = 0.52 <= u <= 0.72 and 0.44 <= v <= 0.52
    g_open = u > 0.58 and 0.35 < v < 0.62
    g_shape = (in_ring or g_bar) and not (g_open and v < 0.48)
    # H: two posts + crossbar
    h_left = 0.68 <= u <= 0.76 and 0.32 <= v <= 0.68
    h_right = 0.84 <= u <= 0.92 and 0.32 <= v <= 0.68
    h_mid = 0.76 <= u <= 0.84 and 0.46 <= v <= 0.54
    h_shape = h_left or h_right or h_mid
    return g_shape or h_shape


def build_pixels(size: int):
    pixels = []
    for y in range(size):
        for x in range(size):
            if gh_mark_pixel(x + 0.5, y + 0.5, float(size)):
                pixels.append(FG)
            else:
                pixels.append(BG)
    return pixels


def main() -> None:
    px48 = build_pixels(48)
    px192 = build_pixels(192)
    write_png(OUT48, 48, 48, px48)
    write_png(OUT192, 192, 192, px192)
    write_ico(OUTICO, encode_png(48, 48, px48))
    print("Wrote favicon PNGs and", OUTICO.name)


if __name__ == "__main__":
    main()
