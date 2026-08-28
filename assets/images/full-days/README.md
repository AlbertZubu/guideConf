# Full Day reference images

One image per In Your City format, used by both the homepage tiles
(index.html) and the format cards (catalogue/services-full-days.html).
Filenames are referenced directly in the markup — keep them as listed.

| File                    | Format         |
|-------------------------|----------------|
| `taste-and-learn.jpg`   | Taste & Learn  |
| `trek.jpg`              | Trek           |
| `lab.jpg`               | Lab            |
| `out-of-town.jpg`       | Out of Town    |

Out of Town appears only on the Full Days page — the homepage card lists
destination names as chips instead of showing an image.

Both usages crop with `object-fit: cover` and centre the image: the
homepage renders a 58 px square tile, the format card a 4:3 panel. Keep
the subject roughly centred so neither crop cuts it.
