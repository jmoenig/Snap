/*
    personal-libraries.js

    A userscript made by @tethrarxitet
    Improved by @d016
*/

"use strict";

// Global stuff ////////////////////////////////////////////////////////

try {
  modules["personal-libraries"] = "2025-October-05";
} catch (e) {
  console.error(e);
}

var plmod = function () {
  let combineObjects = (object, newKeys) => {
      for (let key in newKeys) object[key] = newKeys[key];
      return object;
    },
    doInOrder = (object, actions) => {
      for (let key in actions) {
        object[key].call(object, actions[key]);
      }
    },
    bodyText = (contents) =>
      new DialogBoxMorph().inform(0, contents || "make text").body.copy();

  let texture = new Image(),
    IDE = world.childThatIsA(IDE_Morph),
    init = () => {
      let lib = localStorage.getItem("--teth-plib--");
      if (lib) return JSON.parse(lib);
      localStorage.setItem("--teth-plib--", "[]");
      return [];
    },
    snapMenu = IDE_Morph.prototype.snapMenu,
    projectMenu = IDE_Morph.prototype.projectMenu,
    plver = "1.1_b";

  IDE_Morph.prototype.snapMenu = function () {
    snapMenu.call(this);

    let menuItemText = () => {
      let aligner = new AlignmentMorph("row"),
        textTemp = new StringMorph(
          null,
          MenuItemMorph.prototype.fontSize,
          MenuItemMorph.prototype.fontStyle,
          true
        ),
        texts = [];
      for (let i = 0; i < 3; i++) {
        texts[i] = textTemp.copy();
        texts[i].text = i == 0 ? "About " : i == 1 ? "Personal " : "Library";
        if (!i) texts[i].isBold = false;
        texts[i].fixLayout();
        aligner.add(texts[i]);
        texts[i].color = [
          "#000",
          new Color(192, 0, 192),
          new Color(0, 192, 192),
        ][i];
      }

      texts[1].color = new Color(192, 0, 192);
      texts[2].color = new Color(0, 192, 192);

      aligner.fixLayout();

      return aligner;
    };
    let menu = world.activeMenu;
    /*menu.addLine();
      menu.addItem(
        menuItemText(),
        () => {
          a = new DialogBoxMorph().inform(
            "PL Mod | About",
            `PL mod v${plver}

Copyleft 2024 Tethrarxitet
tethrarxitet@gmail.com

Mod idea by @qw23.
${
  "Thanks to all who supported:\n@mobility212 for the first words of positivity,\n@blockpointstudios for the separator and sorting idea,\n" +
      "many other beautiful members of the Snap! forum...\nand YOU for using this mod and supporting\nmy projects. :)\n"
    
}
For more mods by Tethrarxitet, check out
https://tethrxt.neocities.org/snap/mods`,
            world,
            texture
          );
        },
        null,
        new Color(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        ),
        true
      );*/

    menu.popup(world, this.logo.bottomLeft());
  };

  IDE_Morph.prototype.projectMenu = function () {
    projectMenu.call(this);
    let menu = world.activeMenu;

    let pl = new MenuMorph(this);

    pl.addItem(
      "Personal libraries...",
      () => {
        try {
          let a = init();
          if (JSON.stringify(a) == "[]") {
            new DialogBoxMorph().inform(
              "Library is empty",
              "Your personal library is empty!\n" +
                "Create and save some custom blocks to\n" +
                "open it.",
              world
            );
            return;
          }

          let b = new LibraryImportDialogMorph(IDE, a);
          b.labelString = "Import personal library";
          b.createLabel();
          b.fixLayout();

          b.listField.action = ({ name, xml, description }) => {
            if (isNil(name) || isNil(xml)) {
              return;
            }
            b.notesText.text = localize(description) || "";
            b.notesText.rerender();
            b.notesField.contents.adjustBounds();
            if (b.hasCached(xml)) {
              b.displayBlocks(xml);
            } else {
              b.showMessage(`${localize("Loading")}\n${localize(name)}`);
              let serializer = b.ide.serializer,
                palette = serializer.parse(xml).childNamed("palette");
              b.cacheLibrary(
                xml,
                serializer.loadBlocks(xml, null, true),
                palette ? serializer.loadPalette(palette) : {}
              );
              b.displayBlocks(xml);
            }
          };

          b.importLibrary = function () {
            if (!this.listField.selected) {
              return;
            }
            let xml = this.listField.selected.xml,
              libraryName = this.listField.selected.name;

            SpriteMorph.prototype.customCategories = this.originalCategories;

            IDE.showMessage(`${localize("Loading")} ${libraryName}`);
            IDE.droppedText(xml, libraryName);
          };
          b.popUp();
        } catch (e) {
          let errorDialog = new DialogBoxMorph().inform(
              "Error while opening library",
              e.message +
                `\nTry reporting this error to Tethrarxitet.\n\nTo make it easier to fix, 
                  try copying your personal\nlibrary data with the button above.`,
              world
            ),
            copyLibrary = new PushButtonMorph(
              errorDialog,
              () => {
                navigator.clipboard.writeText(
                  "Library contents: '" +
                    localStorage.getItem("--teth-plib--") +
                    "'"
                );
                IDE.showMessage("copied to clipboard", 2);
              },
              "Copy data",
              null
            );

          let barcolor = DialogBoxMorph.prototype.titleBarColor;
          combineObjects(copyLibrary, {
            fontSize: 6,
            padding: 1,
            color: barcolor.darker(25),
            labelShadowColor: barcolor.darker(10),
          });
          doInOrder(copyLibrary, {
            createLabel: [],
            fixLayout: [],
          });
          errorDialog.add(copyLibrary);
          doInOrder(copyLibrary, {
            setLeft: [
              errorDialog.right() -
                copyLibrary.width() -
                errorDialog.padding / 2,
            ],
            setTop: [
              errorDialog.top() +
                errorDialog.titleFontSize -
                errorDialog.padding / 2,
            ],
          });
        }
      },
      "select a library from your personal\n" + "libraries"
    );
    pl.addItem(
      "Edit libraries...",
      () => {
        //**
        /*new DialogBoxMorph().inform(
            "Soon\u2122",
            "Reordering/deleting is not yet ready.",
            world
          );*/
        var libs = init(),
          swapInList = (arr, init, target) => {
            [arr[init], arr[target]] = [arr[target], arr[init]];
            return arr;
          }; //https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        if (JSON.stringify(libs) == "[]") {
          new DialogBoxMorph().inform(
            "Library is empty",
            "Your personal library is empty!\n" +
              "Create and save some custom blocks to\n" +
              "open it.",
            world
          );
          return;
        }
        var b = new LibraryImportDialogMorph(IDE, libs);

        b.addButton(() => {
          var libs = b.librariesData,
            idx = libs.indexOf(b.listField.selected);
          if (idx == -1 || idx == libs.length - 1) {
            return;
          }
          libs = swapInList(libs, idx, idx + 1);
          b.installLibrariesList();
          b.fixLayout();
          localStorage.setItem("--teth-plib--", JSON.stringify(libs));
        }, "↓");
        b.addButton(() => {
          var libs = b.librariesData,
            idx = libs.indexOf(b.listField.selected);
          if (idx == 0 || idx == -1) {
            return;
          }
          libs = swapInList(libs, idx - 1, idx);
          b.installLibrariesList();
          b.fixLayout();
          localStorage.setItem("--teth-plib--", JSON.stringify(libs));
        }, "↑");
        b.addButton(() => {
          var libs = b.librariesData,
            idx = libs.indexOf(b.listField.selected);
          if (idx == 0 || idx == -1) {
            return;
          }
          b.librariesData = libs.filter((i) => i !== libs[idx]);
          b.initializeLibraryDescription();
          b.installLibrariesList();
          b.fixLayout;
          localStorage.setItem(
            "--teth-plib--",
            JSON.stringify(b.librariesData)
          );
        }, "🗑");
        b.buttons.children.shift();
        b.buttons.children[0].labelString = "OK";
        b.buttons.children[0].label.text = "OK";
        b.buttons.children[0].fixLayout();
        b.labelString = "Edit personal libraries";
        var resetListField = function () {
          b.listField.action = ({ name, xml, description }) => {
            if (isNil(name) || isNil(xml)) {
              return;
            }
            b.notesText.text = localize(description) || "";
            b.notesText.rerender();
            b.notesField.contents.adjustBounds();
            if (b.hasCached(xml)) {
              b.displayBlocks(xml);
            } else {
              b.showMessage(`${localize("Loading")}\n${localize(name)}`);
              let serializer = b.ide.serializer,
                palette = serializer.parse(xml).childNamed("palette");
              b.cacheLibrary(
                xml,
                serializer.loadBlocks(xml, null, true),
                palette ? serializer.loadPalette(palette) : {}
              );
              b.displayBlocks(xml);
            }
          };

          b.importLibrary = function () {
            if (!this.listField.selected) {
              return;
            }
            let xml = this.listField.selected.xml,
              libraryName = this.listField.selected.name;

            SpriteMorph.prototype.customCategories = this.originalCategories;

            IDE.showMessage(`${localize("Loading")} ${libraryName}`);
            IDE.droppedText(xml, libraryName);
          };
        };
        b.createLabel();
        b.fixLayout();
        resetListField();
        b.popUp();
        swapInList(libs, 0, 1);
      },
      "change the order of how every\n" + "library appears in the list"
    );
    pl.addLine();
    pl.addItem(
      "Import library...",
      () => {
        //  new DialogBoxMorph().inform("Soon\u2122", "SPL file import support is not\n" +
        //      "yet ready, but soon enough it will be!", world);
        function parse(target) {
          function splitOnce(s, on) {
            var [first, ...rest] = s.split(on);
            return [first, rest.length > 0 ? rest.join(on) : null];
          }

          return Object.fromEntries(
            target.split("\n").map((a) => splitOnce(a, "="))
          );
        }

        let fileImport = document.createElement("input");
        fileImport.type = "file";
        fileImport.accept = ".text, .txt, .spl, .xml";
        fileImport.click();
        fileImport.onchange = (ev) => {
          let fileReader = new FileReader();

          fileReader.readAsText(fileImport.files[0]);
          fileReader.onload = function (ev2) {
            try {
              let libs = init(),
                parsed = parse(ev2.target.result),
                parsedTrim = Object.fromEntries(
                  Object.entries(parsed).map((a) => [a[0], a[1].trim()])
                ), // an absolute monstrosity
                anyCopy = libs.find((a) => a.name == parsedTrim.name),
                ogPt = copy(parsedTrim),
                copyInfo = anyCopy
                  ? '\n\nA library with the same name has been found, so\na "- Copy" will be added.'
                  : "";

              while (anyCopy) {
                parsedTrim.name += " - Copy"; // to prevent duplicate names
                anyCopy = libs.find((a) => a.name == parsedTrim.name);
              }
              if (true) {
                libs.push(parsedTrim);
                localStorage.setItem("--teth-plib--", JSON.stringify(libs));
                IDE.showMessage("imported successfully!", 2);

                //confirm.destroy();
              } else {
                let confirm = new DialogBoxMorph().inform(
                  "Import blocks",
                  'Are you sure you want to import\n"' +
                    ogPt.name +
                    '"?\n\nLibrary description:\n' +
                    ogPt.description +
                    copyInfo,
                  world
                );
                confirm.createButtons();
                confirm.addButton("ok", "Yes");
                confirm.addButton("cancel", "No");
                confirm.fixLayout();

                confirm.ok = () => {
                  libs.push(parsedTrim);
                  localStorage.setItem("--teth-plib--", JSON.stringify(libs));
                  IDE.showMessage("imported successfully!", 2);

                  confirm.destroy();
                };
              }
            } catch (e) {
              IDE.showMessage(
                "an error has occurred while importing:\n" +
                  e +
                  "\n\nthe library was not added to your list.",
                5
              );
            }
          };
        };
        fileImport.remove();
      },
      "EXPERIMENTAL! import a personal\n" + "library made by another person"
    );
    pl.addItem(
      "Export library...",
      () => {
        var exportDialog = new DialogBoxMorph();

        exportDialog.listField = new ListMorph(init().map((obj) => obj.name));
        let listField = exportDialog.listField;

        combineObjects(listField, {
          edge: InputFieldMorph.prototype.edge,
          fontSize: InputFieldMorph.prototype.fontSize,
          typeInPadding: InputFieldMorph.prototype.typeInPadding,
          contrast: InputFieldMorph.prototype.contrast,
          render: InputFieldMorph.prototype.render,
          drawRectBorder: InputFieldMorph.prototype.drawRectBorder,
        });

        listField.setWidth(200);
        listField.setHeight(250);

        ProjectDialogMorph.prototype.fixListFieldItemColors.call(exportDialog);

        exportDialog.labelString = "Export blocks";
        exportDialog.createLabel();
        exportDialog.addBody(listField);
        exportDialog.addButton(() => {
          exportDialog.ok();

          let targetLib = init().find((a) => a.name == listField.selected);
          let fileContents = `name=${targetLib.name}
description=${targetLib.description}
xml=${targetLib.xml}`;
          let blob = new Blob([fileContents], { type: "text/plain" });
          saveAs(blob, `${targetLib.name}.xml`);
        }, "Export");
        exportDialog.addButton("cancel", "Cancel");
        exportDialog.fixLayout();
        exportDialog.popUp(world);
      },
      "EXPERIMENTAL! export a personal\n" + "library to share online"
    );
    pl.addLine();
    pl.addItem(
      "Save custom blocks...",
      () => {
        var blocks = SpriteMorph.prototype
          .bootstrappedBlocks()
          .concat(this.stage.globalBlocks);
        var bex = new BlockExportDialogMorph(IDE.serializer, blocks, IDE);
        bex.labelString = "Save custom blocks";
        bex.createLabel();
        bex.fixLayout();
        var pal = bex.childThatIsA(ScrollFrameMorph);
        bex.exportBlocks = function () {
          if (this.blocks.length) {
            let xml = IDE.blocksLibraryXML(
                this.blocks,
                null,
                false,
                this.globalData.fork(this.globalVarNames),
                this.localData.fork(this.localVarNames)
              ),
              creator = new DialogBoxMorph(),
              c = bodyText(0), // name unimportant, this won't be used anywhere else :3
              textLine = (contents) =>
                new StringMorph(
                  contents,
                  c.fontSize,
                  c.fontStyle,
                  1,
                  0,
                  0,
                  c.shadowOffset,
                  WHITE
                ),
              editorSide = new AlignmentMorph("column", 4),
              allContents = new AlignmentMorph("row", 4),
              libTitle = textLine("Library title:"),
              libDesc = textLine("Library description (multiline):"),
              libTitleInput = new InputFieldMorph("Unnamed library"),
              libDescInput = new ScrollFrameMorph(),
              inputText = new TextMorph("", 12),
              palette = new ScrollFrameMorph(
                null,
                null,
                SpriteMorph.prototype.sliderColor
              );

            // CREATOR
            creator.labelString = "Create Library";
            creator.createLabel();
            creator.key = "createLibrary";
            creator.addButton(() => {
              var libraryData = init();

              //console.log(libTitleInput.contents().text.text);
              if (
                libraryData.find(
                  (a) => a.name == libTitleInput.contents().text.text
                )
              ) {
                IDE.showMessage("a library with that name already exists!");
              } else {
                creator.ok();
                libraryData.push({
                  xml: xml,
                  name: libTitleInput.contents().text.text || "Unnamed Library",
                  description: inputText.text || "(no description provided)",
                });
                localStorage.setItem(
                  "--teth-plib--",
                  JSON.stringify(libraryData)
                );
                IDE.showMessage("blocks saved.", 2);
              }
            }, "Save");
            creator.addButton("cancel", "Cancel");
            creator.addBody(allContents);

            // LIBTITLEINPUT
            libTitleInput.setWidth(250);

            // INPUTTEXT
            inputText.setWidth(250 - 4);
            inputText.setPosition(libDescInput.topLeft().add(4));
            inputText.acceptsDrops = false;
            inputText.enableSelecting();
            inputText.isEditable = true;
            inputText.fixLayout();

            // LIBDESCINPUT
            libDescInput.setWidth(250);
            libDescInput.setHeight(125);
            combineObjects(libDescInput, {
              acceptsDrops: false,
              edge: InputFieldMorph.prototype.edge,
              fontSize: InputFieldMorph.prototype.fontSize,
              typeInPadding: InputFieldMorph.prototype.typeInPadding,
              contrast: InputFieldMorph.prototype.contrast,
              drawRectBorder: InputFieldMorph.prototype.drawRectBorder,
              render: InputFieldMorph.prototype.render,
              fixLayout: nop,
            });
            libDescInput.addContents(inputText);

            // EDITORSIDE
            editorSide.alignment = "left";
            editorSide.color = creator.color;
            editorSide.add(libTitle);
            editorSide.add(libTitleInput);
            editorSide.add(libDesc);
            editorSide.add(libDescInput);
            editorSide.fixLayout();

            // ALLCONTENTS
            allContents = new AlignmentMorph("row", 4);
            allContents.add(editorSide);
            allContents.add(palette);

            // PALETTE
            combineObjects(palette, {
              color: SpriteMorph.prototype.paletteColor,
              padding: 4,
              isDraggable: false,
              acceptsDrops: false,
            });

            palette.contents.acceptsDrops = false;
            palette.setWidth(editorSide.height());
            palette.setHeight(palette.width());

            var blockList = pal.children[0].children
              .filter((a) => a.state)
              .map((a) => a.element);
            var paletteAlignment = new AlignmentMorph("column", 4);
            paletteAlignment.alignment = "left";
            paletteAlignment.add(
              new StringMorph("Blocks to save:", 11, 0, 1, 0, 0, 0, 0, "#ddd")
            );
            blockList.forEach((block) => {
              let inst = block.definition.blockInstance();
              inst.isDraggable = false;
              paletteAlignment.add(inst);
            });
            paletteAlignment.setPosition(paletteAlignment.position().add(4));
            palette.setContents(paletteAlignment);

            // let's fix layouts :)

            paletteAlignment.fixLayout();
            palette.fixLayout();
            allContents.fixLayout();

            creator.addBody(allContents);
            creator.fixLayout();

            creator.popUp(world);
          } else {
          }
        };
        bex.popUp(this.world());
      },
      "save some custom blocks in this\n" + "project to your personal libraries"
    );
    if (this.world().currentKey === 16) {
      pl.addLine();
      pl.addItem(
        "Delete all libraries",
        () => {
          var conf = new DialogBoxMorph();
          var txt = bodyText(
            "Are you sure you want to delete all of your\npersonal library? " +
              "This >>CANNOT<< be undone.\nOnly REALLY do this if your personal " +
              "library is\nbroken or you've had issues with saving."
          );
          conf.addBody(txt);
          conf.addButton(() => {
            conf.ok();
            localStorage.setItem("--teth-plib--", "[]");
            IDE.showMessage("All Blocks Cleared.", 2);
          }, "Delete");
          conf.addButton("cancel", "Cancel");
          conf.labelString = "Delete all libraries";
          conf.createLabel();
          conf.fixLayout();
          conf.popUp(world);
        },
        null,
        new Color(100, 0, 0)
      );
    }

    let array = menu.items;
    let idx = array.findIndex((item) =>
      contains(["Add Scenes..."], item[0])
    ) ;
    if (idx == -1) console.warn("Library option couldn't be found");

    array.push([
      "Personal libraries...",
      pl,
      0,
      0,
      0,
      0,
      0,
      "\u25ba",
    ]);

    menu.popup(world, this.controlBar.projectButton.bottomLeft());
  };
};
