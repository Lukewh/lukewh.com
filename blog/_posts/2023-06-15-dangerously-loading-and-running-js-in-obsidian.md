---
layout: post
title: Dangerously loading and running JS in Obsidian
description: |
  Living life on the edge - executing JS from the web in Obsidian.
tags: Obsidian
---

Using the dataviewjs plugin, it’s possible to load and execute JavaScript from a known source with a single hoop to jump through: CORS.

```javascript
const getScript = async () => {
    const script = await fetch("https://lukewh.com/obsidian/cepheus-map-exporter.js");
    const data = await script.text();
    const _result = Function("", `"use strict";${data}`)();
};

getScript();
```

The script in the example above is the cepheus-map-exporter script I wrote.