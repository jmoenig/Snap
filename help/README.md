# Translating Help Screens

See [CONTRIBUTING.md](../CONTRIBUTING.md) for a general guide on translating Snap!.

## 1. Setup

If you haven't already downloaded a copy of the Snap! source, go to
[GitHub](https://github.com/jmoenig/Snap) and click "Clone or download".

For the Help translator library to work, you'll need to put Snap! on a local HTTP
server. See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
for an example of how to do this.

Create a copy of the `en` directory in the `help` directory, naming it the
the same as code for the corresponding translation file in the `locale/` directory.
(e.g. `help/ja_HIRA/` for the Japanese Hirogama translation.)
<http://en.wikipedia.org/wiki/ISO_639-1>).

## 2. Translation

Replace the English text in the XML files with the translated text.

The translated versions of block spec will be used automatically. For example,
`<block s="show"/>` should be left as-is.

Block inputs are not automatically translated unless enclosed in `<option>` tags.
For example:
```
<block s="bubble">
    <l>Hello world!</l>
</block>
```
will not be automatically translated and should be manually changed to
```
<block s="bubble">
    <l>¡Hola!</l>
</block>
```
while
```
<block s="getEffect">
    <l><option>ghost</option></l>
</block>
```
will be automatically translated and should be left as-is.

You may have to adjust the widths of columns, which are specified as a ratio using
the `rel-width` attribute. For example, you may want these columns' widths to be
1:1 in English:
```
<row>
    <column rel-width="1">
        <script>
        ...
        </script>
    </column>
    <column rel-width="1">
        <script>
        ...
        </script>
    </column>
</row>
```
but 2:1 in another language:
```
<row>
    <column rel-width="2">
        <script>
        ...WIDER SCRIPT...
        </script>
    </column>
    <column rel-width="1">
        <script>
        ...NARROWER SCRIPT...
        </script>
    </column>
</row>
```

Replace images where applicable.

## 3. Rendering

Open your local copy of Snap!, and switch it to your language.

Import the `Help translator` library (at the bottom of the Libraries menu).

Note: `ENABLE HELP TRANSLATOR` is run automatically when you render a help screen,
so doing this manually is not necessary.

To render a single block, run `download help screen for spec [spec]` or
`download help screen for [lambda]`. For example: `download help screen for spec [forward]`
or `download help screen for [move (10) steps]`. This will download the help screen
for this block as a PNG file.

To download all help screens, run `download all help screens`. This will render
every help screen and download them as a ZIP file.

Place the rendered PNG files in your language's help folder.

# Adding new help screens:

After adding a new XML file to a language's folder, add the block's selector to the
`HELP` file so that `download all help screens` can find it.
