# Visit reference images

One image per visit category, used by both the homepage thumbnails
(index.html) and the visit cards (catalogue/services-visits.html).
Filenames are referenced directly in the markup — keep them as listed.

| File                       | Visit category   |
|----------------------------|------------------|
| `winter-ready.jpg`         | Winter Ready     |
| `events.jpg`               | Events           |
| `craft-and-masters.webp`   | Craft and Masters |

Both usages crop with `object-fit: cover` and centre the image: the
homepage renders a 62 px square thumbnail, the visit card a 4:3 panel.
Keep the subject roughly centred so neither crop cuts it. If you swap a
file for one with a different extension, update the `src` in both files.
