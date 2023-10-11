---
layout: post
title: Fantasy name generator API
description: |
  A Fantasy name generator API I created for use in an Obsidian plugin.
tags: Obsidian TTRPG
---

When TTRPGing sometimes you need to generate the name for a PC or NPC, so I created [Fantasy name generator](https://obsidian.md/plugins?search=fantasy%20name).

I decided that instead of including a name list in the plugin itself, I would create a simple API that the plugin would call. This would allow me to update names without needing to update the plugin, plus I, and others, could reuse the API in any way we'd like.

The API is available at [http://fantasyname.lukewh.com](http://fantasyname.lukewh.com/help).

# Deno Deploy

I opted to try out [Deno Deploy](https://deno.com/deploy) as I've been looking for a reason to use Deno in a project, and the Deploy offering has a generous free-tier with some basic analytics.

![Deno Deploy Analytics for fantasyname.lukewh.com](/assets/fantasyname/deno-stats.png)

# Axiom

The nice thing about having an API is that I could gather interesting statistics in an external service. I decided to try out [Axiom](https://axiom.co), again it has a generous free-tier.
After getting the stats into Axiom I created a simple dashboard to track a few things.

![Axiom Analytics for fantasyname.lukewh.com](/assets/fantasyname/axiom-stats.png)

The most popular names of the last 30 days:

| Name | Count |
|---|---|
| Loria	| 3 |
| Rollin | 3 |
| Theo | 2 |
| Farley | 2 |
| Nev | 2 |

