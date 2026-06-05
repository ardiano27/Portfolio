from pathlib import Path

from PIL import Image, ImageOps


ASSETS_DIR = Path(__file__).resolve().parents[1] / "assets"
SOURCE_EXTENSIONS = {".png", ".jpg", ".jpeg"}


def webp_quality_for(path: Path) -> int:
    parts = {part.lower() for part in path.parts}
    if "logo" in parts or "tools" in parts:
        return 86
    if "sertificates" in parts:
        return 80
    return 78


def convert_image(path: Path) -> tuple[int, int]:
    output = path.with_suffix(".webp")
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image)
        has_alpha = image.mode in {"RGBA", "LA"} or "transparency" in image.info
        if has_alpha:
            image = image.convert("RGBA")
        else:
            image = image.convert("RGB")
        image.save(
            output,
            "WEBP",
            quality=webp_quality_for(path),
            method=6,
            exact=has_alpha,
        )
    return path.stat().st_size, output.stat().st_size


def main() -> None:
    total_before = 0
    total_after = 0
    converted = 0

    for path in sorted(ASSETS_DIR.rglob("*")):
        if path.suffix.lower() not in SOURCE_EXTENSIONS:
            continue

        before, after = convert_image(path)
        total_before += before
        total_after += after
        converted += 1
        ratio = after / before if before else 0
        print(f"{path.relative_to(ASSETS_DIR.parent)} -> {path.with_suffix('.webp').relative_to(ASSETS_DIR.parent)} ({ratio:.1%})")

    saved = total_before - total_after
    print(f"\nConverted: {converted} files")
    print(f"Before: {total_before / 1024 / 1024:.2f} MB")
    print(f"After: {total_after / 1024 / 1024:.2f} MB")
    print(f"Saved: {saved / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
