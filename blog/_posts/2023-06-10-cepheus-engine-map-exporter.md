---
layout: post
title: Cepheus Engine Map Exporter for Obsidian
description: |
  Subsector image generation from Obsidian dataviewjs.
tags: Obsidian TTRPG
---

While creating a universe for my Traveller/Cepheus Engine campaigns I wanted a way to easily create a map. There are wonderful tools such as [Cepheus Journal’s Subsector Editor and Mapper](https://cepheusjournal.com/generators/subsector-editor-and-mapper/), for generating images of your subsector, but they rely on you having some correctly formatted plain text.

Personally, I organise my subsector in Obsidian notes in the following format:

```
Sectors/
  01/
    Subsectors/
      01/
        0101 - Name.md
```

Each hex file contains at least the following frontmatter:

```
---
uwp: 0101 0101 E622611-7 Na Po Ni 611 Na
---
```

I also include a file `9999 Exporter.md` that contains the following [dataview](https://blacksmithgu.github.io/obsidian-dataview/) snippet (`dataviewjs`):

```javascript
let str = ``;

const currentFile = dv.current().file;

const result = await dv.query(
  `LIST FROM "${currentFile.folder}" WHERE startswith(file.name, "0")`
);

let routes = [];

if (result.successful) {
  for (const _page of result.value.values) {
    const page = dv.page(_page);
    const uwp = page.uwp
      .split(" ")
      .filter((s) => s)
      .map((s) => s.trim());
    let _routes;
    if (page.routes) {
      _routes = page.routes
        .split(",")
        .filter((r) => r)
        .map((r) => [uwp[1], r.trim()].sort());
      routes = routes.concat(_routes);
    }
    const notes = uwp.slice(3);
    const tradeCodesEndIndex = notes.findIndex(
      (n) => n.length === 1 || n.length === 3
    );
    const tradeCodes = notes.splice(0, tradeCodesEndIndex);
    const travelCode = notes[0].length === 1 ? notes.shift() : " ";
    str = `${str}
${uwp[0].padEnd(14, " ")}${uwp[1].padEnd(5, " ")}${uwp[2]
      .substr(0, 9)
      .padEnd(11, " ")}${uwp[2].substr(9).padEnd(2, " ")}${tradeCodes
      .join(" ")
      .padEnd(16, " ")}${travelCode.padEnd(3, " ")}${notes.join(" ")}`;
  }
  routes = routes
    .sort((a, b) => `${a[0]}${a[1]}` - `${b[0]}${b[1]}`)
    .reduce((acc, r) => {
      const exists = acc.find((a) => a[0] === r[0] && a[1] === r[1]);
      if (!exists) {
        acc.push(r);
      }
      return acc;
    }, []);
  str = `${routes.map((r) => `route ${r[0]} ${r[1]}`).join(`\n`)}${str}`;
  str = `#--------1---------2---------3---------4---------5-------
#PlanetName   Loc. UPP Code   B   Notes         Z  PBG Al
#----------   ---- ---------  - --------------- -  --- --\n${str}`;
  const ta = dv.el("div", "", {
    attr: {
      style: "white-space: pre-wrap; width: 100%; font-family: monospace;",
    },
  });
  ta.innerText = str;
} else {
  dv.el("div", "Failed to parse");
}
```

Then I can copy and paste the resulting string into [Cepheus Journal’s Subsector Editor and Mapper](https://cepheusjournal.com/generators/subsector-editor-and-mapper/). Copy and paste the image and use it however you want!