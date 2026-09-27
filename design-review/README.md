# JNIT premium redesign — 26 September 2026

## Delivery

The complete redesign is local. Nothing has been uploaded to Xneelo.

- Upload archive: `../jnit-premium-redesign-2026-09-26.zip`
- Exact upload list: `UPLOAD-FILES.txt`
- Archive file count, size and SHA-256: `upload-manifest.json`
- Original website backup: `before-redesign-2026-09-26.zip`

Extract the archive on your computer, then upload its contents to the existing website root. Replace matching files and preserve folder names exactly, including `01-Logos`, `images` and `vendor`. Upload all the packaged files together so pages, styles and scripts stay in sync. The ZIP is not intended to be displayed as a website or uploaded without extraction. Do not delete unrelated hosting files.

## Scope

All 24 active HTML pages share the redesigned presentation. The tools directory contains all 43 existing tools, with search, category filters and a clearer interface. Individual calculators and utilities have redesigned inputs, results and explanations. Existing engines are preserved.

The four demo sites show distinct visual directions: IRON/WOOD construction, still. wellness, TERRA NOIR dining and AURA lighting. AURA includes a real interactive 3D lamp with rotation, finishes and lighting controls. Demo enquiries are sample interactions only.

LifeWallet, PawWatch, CloudOps and existing commercial content remain represented. JNIT's cloud scope remains tied to products it develops or deploys for clients. CloudOps is described as captured demonstration evidence, and PawWatch remains a personal project with illustrative AI scenes.

## Validation

- Local references and duplicate IDs checked across every active page: no issues.
- Exact case-sensitive dependency paths and ZIP CRC/SHA-256 checked during packaging.
- Desktop visual review across the main site and all demos; mobile checks at 390px and representative tablet checks at 768px found no horizontal overflow.
- All 34 quick-tool routes exercised with default inputs, alongside calculator outputs, validation, search/filter controls, mobile navigation and readiness assessment.
- Quote preselection and copy flow checked; no email was sent.
- All three sample demo forms and restaurant menu switching checked.
- 3D finish, brightness, evening lighting, rotation and reset checked.
- Changed JavaScript syntax and Git whitespace checks passed.

This is a local presentation and functional review, not an independent audit of every tool formula or every external browser/device. File-upload transformations were not re-tested. The 3D experience requires WebGL and includes a static fallback. Google Fonts and the existing DNS lookup service require internet access.

## Assets and implementation

The original logo and approved PawWatch scenes are retained. Generated bitmap assets use the built-in image generation tool:

- `images/brand/connected-form.webp`: silver and cobalt connected ribbon sculpture on a navy studio background.
- `images/demos/construction.webp`: warm stone and glass courtyard house in the Cape Winelands.
- `images/demos/wellness.webp`: limewash and travertine wellness room with soft daylight.
- `images/demos/restaurant.webp`: walnut, olive and brass restaurant interior at dusk.

Demo preview images are actual browser captures of the new demos. Existing service images were converted to WebP without changing their content. Generated visuals are illustrative, not evidence of commissioned client projects.

Three.js 0.186.0 is bundled locally under `vendor/three`, including its MIT license. Rendering is paused when hidden and respects reduced-motion preferences. Supporting design research used the official Work & Co, Linear and Thoughtworks websites, and official Three.js documentation; no layouts or assets were copied.

The implementation scripts live in `scripts/` and are excluded from the upload archive. If regenerating, run build-redesign.py, build-demos.py, build-tools.py, build-projects.py, finalize-redesign.py and package-redesign.py in that order.
