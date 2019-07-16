# Help Screen XML

## Structure

```
<help-screen version="1">
    <blocks>
        <!-- Optional -->
        <!--
            Put custom block definitions here so the blocks can be used in
            the help screen. These can be copied and pasted from
            projects or libraries.
        -->
    </blocks>
    <thumbnail>
        <!--
            Usually a script that will be displayed in the top-left of the
            help screen
        -->
    </thumbnail>
    <box color="gray">
        <!-- Main content box -->
    </box>
    <box color="blue">
        <!-- Additional boxes can be added below... -->
    </box>
</help-screen>
```

## Layout Elements

### `<box>`

A box that contains the helps screen's content. Usually it should contain an
alignment element (`<row>` or `<column>`) to specify how content should be
arranged:
```
<box color="gray">
    <column>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </column>
</box>
```

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| color | "gray", "black", "blue" | "gray" | The background color. |

### `<row>`

Aligns its contents in a row.

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| padding | number | 15 | How far apart the content elements are. | 

Some elements, like `<script>`, have a fixed width, while others, like `<p>`,
have a variable width. By default, variable-width elements are their parent's
width:
```
<column>
    <p>I am my parent's width.</p>
    <p>I am also my parent's width.
</column>
<row>
    <p>I am my parent's width.</p>
    <p>I am also my parent's width. That doesn't work well in this context.</p>
</row>
```

The `rel-width` (relative width) attribute can be used to change this, by
specifying elements' widths as a ratio. For example, the widths of these
elements are 2:1:
```
<row>
    <p rel-width="1">I am one-third my parent's width.</p>
    <p rel-width="2">I am two-thirds my parent's width.</p>
</row>
```

If fixed and variable-width elements are mixed, the fixed-width elements take
up whatever space they need, and the remaining space is divided among the
variable-width elements:
```
<row>
    <img src="image.png" width="100" height="100"/>
    <img src="image.png" width="100" height="100"/>
    <p rel-width="1">My width is 1/4 * (parent's width - 100 - 100)</p>
    <p rel-width="3"> My width is 3/4 * (parent's width - 100 - 100)</p>
</row>
```

### `<column>`

Aligns its contents in a column.

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| padding | number | 10 | How far apart the content elements are. | 

## Content Elements

### `<p>`, `<small-p>`, `<i>`, `<small-i>`

Paragraph elements. `<p>` is normal text, while `<i>` is italic. The default
font size is 18px, while the small variants are 14px.

These elements can be used in two ways. One:
```
<p>This paragraph contains just text.</p>
```

Two:
```
<p>
    <text>This paragraph contains text and other elements</text>
    <script>
        <block s="forward">
            <l/>
        </block>
    </script>
    <text>which are inlined.</text>
</p>
```
| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| rel-width | number | none | See `<row>`. | 

### `<img>`

An image.

| Attribute | Value | Default |
| --- | --- | --- |
| src | a file path, relative to the language's help directory | none |
| width | number | none |
| width | number | none |

### `<script>`

A script. This can just be copied and pasted from a project.

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| scale | number | 1 | Changes the size of the script. Only works when in a diagram. |

### `<block-definition>`

Displays a custom block definition, taken from the `<blocks>` element.

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| s | the custom block's spec | none | This is the same block spec used in `<custom-block>` elements in a `<script>`. |
| scale | number | 1 | Changes the size of the script. Only works when in a diagram. |

### `<menu>`

Can be used to replicate an input or context menu:
```
<menu>
    <item>One</item>
    <item>Two</item>
    <line/>
    <item>Three</item>
</menu>
```

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| no-empty-option | true or false | false | By default the menu has an empty option at the top. |

### `<item>`

A menu item.

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| color | a CSS color | none | Changes the item's background color. |

### `<diagram>`

A diagram of a script:
```
<diagram>
    <script>
        <block s="xPosition" annotation="1" bubble="1"/>
    </script>
    <annotations>
        <small-p>Annotation</small-p>
    </annotations>
    <bubbles>
        <text>0</text>
    </bubbles>
</diagram>
```
or a menu:
```
<diagram>
    <menu>
        <item>menu item</item>
    </menu>
    <annotations>
        <small-p>Annotation</small-p>
    </annotations>
</diagram>
```

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| rel-width | number | none | See `<row>`. | 

Attributes for script/menu components:

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| annotation | number | none | The component will be annotated with the nth element in the annotations list (1-indexed). |
| bubble | number | none | Blocks only. The block will have a bubble containig the nth element in the bubbles list (1-indexed). |
| highlight | true or false | false | Blocks and inputs only. If true, the component will have a green highlight. |
| ghost | true or false | false | Blocks only. If true, the block will be ghosted. |
| arrow-start | number | none | An arrow will be drawn to the component with the corresponding arrow-end ID. These IDs should start at 1 and are separate from the annotation IDs. |
| arrow-end | number | none | |

Attributes for annotations and `arrow-start` components:

| Attribute | Value | Default | Comment |
| --- | --- | --- | --- |
| arrow-reverse | true or false | false | Reverses the arrow. |
| arrow-detour | number | 0 | The arrow will bend by this many pixels. This attribute can be used to prevent the arrow from overlapping important parts of a script. |
| arrow-color | CSS color | black/white | Default depends on the color of the box the diagram is contained in. |

Valid bubble contents:
- `<text>Text</text>`
- `<bool>true</bool>`
- `<bool>false</bool>`
- `<img .../>`
