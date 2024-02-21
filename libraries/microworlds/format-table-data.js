SnapExtensions.primitives.set(
    'ftd_' + 'format(widths)',
    function(widthList, proc) {
      var sprite = this;
      var bubble = sprite.talkBubble();
      if(bubble instanceof SpriteBubbleMorph && bubble.contentsMorph instanceof TableFrameMorph){

        var tableMorph = bubble.contentsMorph.children[0];


        var cols = tableMorph.columns.length;
        var widths = [];
        var widthPadding = 10;
        var heightPadding = 50;

        var requestedTotalWidth = 0;
        var autoWidthColumns = 0;

        var ide = sprite.parentThatIsA(IDE_Morph);
        var stageWidth = ide.stage.width();
        var stageHeight = ide.stage.height();

        tableMorph.setWidth(stageWidth - widthPadding)

        var originalUsableTableWidth = tableMorph.width() - tableMorph.rowLabelWidth;

        for(var i=0; i<cols; i++){
          var width = parseInt(widthList.contents[i]) || "auto";

          if (width !== "auto") {
            requestedTotalWidth += width;
          } else {
            autoWidthColumns++
          }

          widths.push(width);
        }

        var autoWidth = originalUsableTableWidth / cols;

        if(requestedTotalWidth < originalUsableTableWidth){

          autoWidth = (originalUsableTableWidth - requestedTotalWidth) / autoWidthColumns;

        }

        tableMorph.colWidths = widths.map( width => width !== "auto" ? width : autoWidth );
        tableMorph.rowHeight = 30;
        tableMorph.fixLayout();

        var tableHeight = (tableMorph.rowHeight * tableMorph.table.rows() + 30)

        tableMorph.parent.setWidth(stageWidth - widthPadding);
        if (tableHeight < (stageHeight - heightPadding)) {
          tableMorph.parent.setHeight(tableHeight)
        } else {
          tableMorph.parent.setHeight(stageHeight - heightPadding)
        }
        tableMorph.parent.fixLayout();
        tableMorph.parent.handle.fixLayout();

      }
    }
)