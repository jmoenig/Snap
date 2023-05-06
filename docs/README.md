# Snap<em>!</em> Development Documentation
> last updated May 6, 2023.

This guide is intended for _developers_ who want to ingrate Snap! into existing projects. Each of these guides is a breif introduction to maintaining an extension. The goal is to _minimize_ the amount of customizations you need to make to the Snap! source code, located in `src/`.

**Before contributing source code modifications, please review [the contributations guide](./CONTRIBUTING.md) and get in touch!

_Note:_ This document applies only to the Snap! IDE. The Snap!Cloud backend lives at [@snap-cloud/snapCloud](https://github.com/snap-cloud/snapCloud) on GitHub.

## Guides

There are many ways to build your own customized Snap! environments. Start in this order, with the least customizations.

### Microworlds

Microworlds are restricted Snap! environments, which hide blocks, and may change some settings that are saved with the project.

Things you can save with the project:

* Hiding Blocks
* Single Palette Settings
* Disable Click-to-Run
* Disable Dragging Data

_More coming soon!_

### [Extensions.md](./Extensions.md)

You can write JavaScript files which provide additional blocks, add interface elements, etc. These extensions are often packaged as a Snap! library.

### [API.md](./API.md)

The Snap! API can be used to embed or customize Snap! to be used in unique environments. You can check out the (work in progress) [Pyret example](../pyret/inline.html).

### [Offline.md](./Offline.md)

This describes how you can distribute Snap! to work offline.

---

### [Migrating.md](./Migrating.md)

This describes the internal changes to the Morphic library. It is probably not useful unless you have made a fork of Snap!.
