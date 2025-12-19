#!/usr/bin/env python3
"""
Icon Generator for AI Daily Dashboard Chrome Extension

Generates simple PNG icons for the Chrome extension.
Requires: pip install pillow
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow not installed. Installing...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pillow'])
    from PIL import Image, ImageDraw, ImageFont


def create_icon(size: int, output_path: str):
    """Create a simple icon with a gradient background and 'AI' text"""

    # Create image with RGBA mode
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw rounded rectangle background
    # Teal gradient-like color: #14b8a6
    bg_color = (20, 184, 166, 255)
    padding = size // 8

    # Draw ellipse for rounded effect
    draw.ellipse(
        [padding, padding, size - padding, size - padding],
        fill=bg_color
    )

    # Draw "AI" text in center
    text = "AI"
    text_color = (255, 255, 255, 255)

    # Try to use a nice font, fall back to default
    font_size = size // 3
    try:
        # Try system fonts
        font_names = ['Arial Bold', 'Helvetica Bold', 'Arial', 'Helvetica', 'DejaVuSans-Bold']
        font = None
        for name in font_names:
            try:
                font = ImageFont.truetype(name, font_size)
                break
            except:
                continue

        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]

    draw.text((x, y), text, fill=text_color, font=font)

    # Save
    img.save(output_path, 'PNG')
    print(f"Created: {output_path}")


def main():
    """Generate all required icon sizes"""
    script_dir = Path(__file__).parent
    icons_dir = script_dir / "icons"
    icons_dir.mkdir(exist_ok=True)

    sizes = [16, 48, 128]

    for size in sizes:
        output_path = icons_dir / f"icon{size}.png"
        create_icon(size, str(output_path))

    print("\nIcons generated successfully!")
    print("You can now load the extension in Chrome:")
    print("1. Open chrome://extensions/")
    print("2. Enable 'Developer mode'")
    print("3. Click 'Load unpacked'")
    print(f"4. Select: {script_dir}")


if __name__ == "__main__":
    main()
