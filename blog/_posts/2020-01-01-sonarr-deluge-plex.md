---
layout: post
title: Sonarr 🡒 Deluge 🡒 Plex
description: | 
  Using Snaps to automate my cord-cutting.
tags: Snaps
---

**Notes:**

1. Downloading TV shows **IS** illegal where you live
2. I have a [Plex Pass](https://www.plex.tv/plex-pass/)
3. [I snapped the Deluge snap](https://github.com/Lukewh/deluge-snap)

# Installing Snaps

```sh
snap install sonarr deluge-lukewh plexmediaserver
```

**Optional**

```sh
snap install --edge caddy
```

# Set up
## Shared mounts

Snaps are confined, as such they can't talk to each other easily. Fortunately there's an interface available for all 3 snaps called `removable-media`. I can use this interface to create a shared mount that all 3 snaps can access.

Create the following folders as your user: `Downloading`, `Downloaded`, and `Media`.

Create the following folders: `/mnt/Downloading`, `/mnt/Downloaded`, and `/mnt/Media`.

I created a file called `mountall`. I run it whenever I restart my server: `./mountall`*. Run it now.

```sh
#!/bin/bash

mount --bind /home/username/Downloading/ /mnt/Downloading
mount --bind /home/username/Downloaded/ /mnt/Downloaded
mount --bind /home/username/Media /mnt/Media
chown -R root:username /mnt/*
```

Make the file executable `chmod +x mountall`.

<small>*When the server has restarted the snap daemons won't have access to the mounts (they've not been created), so it's important to restart all 3 with `snap restart :snapName` after running `./mountall`.</small>

# **Optional** Caddy

Define your config in `Caddyfile`.

```
deluge.domain.com {
  reverse_proxy localhost:8112
  log log/access.deluge.log
}

sonarr.domain.com {
  reverse_proxy localhost:8989
  log log/access.sonarr.log
}

plex.domain.com {
  reverse_proxy localhost:32400
  log log/access.plex.log
}
```

Upload it to Caddy

```
curl localhost:2019/load \
-X POST \
-H "Content-Type: text/caddyfile" \
--data-binary @Caddyfile
```

Restart Caddy daemon `snap restart caddy`.