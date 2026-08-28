# Workshop reference images

One image per workshop, used by both the homepage thumbnails (index.html)
and the workshop cards (catalogue/services-workshops.html). Filenames are
referenced directly in the markup — keep them exactly as listed.

| File                   | Workshop      |
|------------------------|---------------|
| `frenchness-101.jpg`   | Frenchness 101 |
| `all.jpg`              | A.L.L. — Autonomous Language Learning |
| `table-talk-games.jpg` | Table Talk Games |

Both usages crop with `object-fit: cover` and centre the image: the
homepage renders a 62 px square thumbnail, the workshop card a 4:3 panel.
Keep the subject roughly centred so neither crop cuts it. Any of jpg is
assumed by the markup — if you save a different extension, update the
`src` in both files.
