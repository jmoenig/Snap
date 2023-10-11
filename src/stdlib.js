/*

    stdlib.js

    preloaded palette block definitions for Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2023 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs store.js, blocks.js, gui.js and byob.js

*/

/*global modules, IDE_Morph, console*/

/*jshint esversion: 6*/

// Global stuff ////////////////////////////////////////////////////////

modules.stdlib = '2023-October-11';

function formatLib(lib, width = 80, indent = 4) {
    // helper routine for maintaining this source file
    var len = lib.length,
        lines = [],
        ind = ' '.repeat(indent),
        w = width - indent - 4,
        i = 0;
    while (i < len) {
        lines.push(lib.substring(i, i += w));
    }
    console.log(ind + '`' + lines.join('` +\n' +  ind + '`') + '`');
}

IDE_Morph.prototype.bootstrapCustomizedPrimitives = function () {
    this.serializer.loadBlocks(
        `<blocks app="Snap! 10-dev, https://snap.berkeley.edu" version="2"><p` +
        `rimitives><block-definition s="zip %&apos;fun&apos; inputs: %&apos;a` +
        `&apos; %&apos;a-rank&apos; leaf-rank %&apos;b&apos; %&apos;b-rank&ap` +
        `os; leaf-rank" type="reporter" category="control" selector="reportHy` +
        `perZip"><header></header><code></code><translations></translations><` +
        `inputs><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%s"></input><input type="%n"></input><input type` +
        `="%s"></input><input type="%n"></input></inputs><script><block s="do` +
        `IfElse"><block s="reportVariadicGreaterThan"><list><block s="reportL` +
        `istAttribute"><l><option>rank</option></l><block var="a"/></block><b` +
        `lock var="a-rank"/></list></block><script><block s="doIfElse"><block` +
        ` s="reportVariadicGreaterThan"><list><block s="reportListAttribute">` +
        `<l><option>rank</option></l><block var="b"/></block><block var="b-ra` +
        `nk"/></list></block><script><block s="doReport"><block s="reportMap"` +
        `><block s="reifyReporter"><autolambda><block s="reportHyperZip"><blo` +
        `ck var="fun"/><block s="reportListItem"><l></l><block var="a"/></blo` +
        `ck><block var="a-rank"/><block s="reportListItem"><l></l><block var=` +
        `"b"/></block><block var="b-rank"/></block></autolambda><list></list>` +
        `</block><block s="reportNumbers"><l>1</l><block s="reportVariadicMin` +
        `"><list><block s="reportListAttribute"><l><option>length</option></l` +
        `><block var="a"/></block><block s="reportListAttribute"><l><option>l` +
        `ength</option></l><block var="b"/></block></list></block></block></b` +
        `lock></block></script><script><block s="doReport"><block s="reportMa` +
        `p"><block s="reifyReporter"><autolambda><block s="reportHyperZip"><b` +
        `lock var="fun"/><l></l><block var="a-rank"/><block var="b"/><block v` +
        `ar="b-rank"/></block></autolambda><list></list></block><block var="a` +
        `"/></block></block></script></block></script><script><block s="doIfE` +
        `lse"><block s="reportVariadicGreaterThan"><list><block s="reportList` +
        `Attribute"><l><option>rank</option></l><block var="b"/></block><bloc` +
        `k var="b-rank"/></list></block><script><block s="doReport"><block s=` +
        `"reportMap"><block s="reifyReporter"><autolambda><block s="reportHyp` +
        `erZip"><block var="fun"/><block var="a"/><block var="a-rank"/><l></l` +
        `><block var="b-rank"/></block></autolambda><list></list></block><blo` +
        `ck var="b"/></block></block></script><script><block s="doReport"><bl` +
        `ock s="evaluate"><block var="fun"/><list><block var="a"/><block var=` +
        `"b"/></list></block></block></script></block></script></block></scri` +
        `pt></block-definition><block-definition s="move %&apos;steps&apos; s` +
        `teps" type="command" category="motion" selector="forward"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%n">10</input></inputs><script><block s="doGotoObject"><block s="r` +
        `eportVariadicSum"><list><block s="getPosition"></block><block s="rep` +
        `ortVariadicProduct"><list><block s="reportNewList"><list><block s="r` +
        `eportMonadic"><l><option>sin</option></l><block s="direction"></bloc` +
        `k></block><block s="reportMonadic"><l><option>cos</option></l><block` +
        ` s="direction"></block></block></list></block><block var="steps"/></` +
        `list></block></list></block></block></script></block-definition><blo` +
        `ck-definition s="turn $clockwise %&apos;angle&apos; degrees" type="c` +
        `ommand" category="motion" selector="turn"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">15</input>` +
        `</inputs><script><block s="setHeading"><block s="reportVariadicSum">` +
        `<list><block s="direction"></block><block var="angle"/></list></bloc` +
        `k></block></script></block-definition><block-definition s="turn $cou` +
        `nterclockwise %&apos;angle&apos; degrees" type="command" category="m` +
        `otion" selector="turnLeft"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n">15</input></inputs><scrip` +
        `t><block s="setHeading"><block s="reportDifference"><block s="direct` +
        `ion"></block><block var="angle"/></block></block></script></block-de` +
        `finition><block-definition s="point in direction %&apos;angle&apos;"` +
        ` type="command" category="motion" selector="setHeading"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n">90<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) u` +
        `p=0&#xD;(180) down=180&#xD;random</options></input></inputs><script>` +
        `<block s="doFaceTowards"><block s="reportVariadicSum"><list><block s` +
        `="getPosition"></block><block s="reportNewList"><list><block s="repo` +
        `rtMonadic"><l><option>sin</option></l><block var="angle"/></block><b` +
        `lock s="reportMonadic"><l><option>cos</option></l><block var="angle"` +
        `/></block></list></block></list></block></block></script></block-def` +
        `inition><block-definition s="point towards %#1" type="command" categ` +
        `ory="motion" selector="doFaceTowards" primitive="doFaceTowards"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true">mouse-pointer<options>§_destinationsMenu` +
        `</options></input></inputs></block-definition><block-definition s="g` +
        `o to x: %&apos;x&apos; y: %&apos;y&apos;" type="command" category="m` +
        `otion" selector="gotoXY"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n">0</input><input type="%n">0` +
        `</input></inputs><script><block s="doGotoObject"><block s="reportNew` +
        `List"><list><block var="x"/><block var="y"/></list></block></block><` +
        `/script></block-definition><block-definition s="go to %#1" type="com` +
        `mand" category="motion" selector="doGotoObject" primitive="doGotoObj` +
        `ect"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true">random position<options>§_desti` +
        `nationsMenu</options></input></inputs></block-definition><block-defi` +
        `nition s="glide %&apos;span&apos; secs to x: %&apos;x&apos; y: %&apo` +
        `s;y&apos;" type="command" category="motion" selector="doGlide"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">1</input><input type="%n">0</input><input type="%n">0</in` +
        `put></inputs><script><block s="doDeclareVariables"><list><l>pos</l><` +
        `l>start</l><l>fract</l></list></block><block s="doSetVar"><l>pos</l>` +
        `<block s="getPosition"></block></block><block s="doSetVar"><l>start<` +
        `/l><block s="reportDate"><l><option>time in milliseconds</option></l` +
        `></block></block><block s="doUntil"><block s="reportVariadicGreaterT` +
        `hanOrEquals"><list><block var="fract"/><l>1</l></list></block><scrip` +
        `t><block s="doSetVar"><l>fract</l><block s="reportQuotient"><block s` +
        `="reportDifference"><block s="reportDate"><l><option>time in millise` +
        `conds</option></l></block><block var="start"/></block><block s="repo` +
        `rtVariadicProduct"><list><block var="span"/><l>1000</l></list></bloc` +
        `k></block></block><block s="doGotoObject"><block s="reportVariadicSu` +
        `m"><list><block var="pos"/><block s="reportVariadicProduct"><list><b` +
        `lock s="reportDifference"><block s="reportNewList"><list><block var=` +
        `"x"/><block var="y"/></list></block><block var="pos"/></block><block` +
        ` var="fract"/></list></block></list></block></block></script></block` +
        `><block s="gotoXY"><block var="x"/><block var="y"/></block></script>` +
        `</block-definition><block-definition s="change x by %&apos;delta&apo` +
        `s;" type="command" category="motion" selector="changeXPosition"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">10</input></inputs><script><block s="setXPosition"><bloc` +
        `k s="reportVariadicSum"><list><block s="xPosition"></block><block va` +
        `r="delta"/></list></block></block></script></block-definition><block` +
        `-definition s="set x to %&apos;x&apos;" type="command" category="mot` +
        `ion" selector="setXPosition"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">0</input></inputs><scri` +
        `pt><block s="doGotoObject"><block s="reportNewList"><list><block var` +
        `="x"/><block s="yPosition"></block></list></block></block></script><` +
        `/block-definition><block-definition s="change y by %&apos;delta&apos` +
        `;" type="command" category="motion" selector="changeYPosition"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">10</input></inputs><script><block s="setYPosition"><block` +
        ` s="reportVariadicSum"><list><block s="yPosition"></block><block var` +
        `="delta"/></list></block></block></script></block-definition><block-` +
        `definition s="set y to %&apos;y&apos;" type="command" category="moti` +
        `on" selector="setYPosition"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">0</input></inputs><scrip` +
        `t><block s="doGotoObject"><block s="reportNewList"><list><block s="x` +
        `Position"></block><block var="y"/></list></block></block></script></` +
        `block-definition><block-definition s="if on edge, bounce" type="comm` +
        `and" category="motion" selector="bounceOffEdge"><header></header><co` +
        `de></code><translations></translations><inputs></inputs><script><blo` +
        `ck s="doIf"><block s="reportTouchingObject"><l><option>edge</option>` +
        `</l></block><script><block s="doDeclareVariables"><list><l>get bound` +
        `s</l><l>bounds</l><l>center</l><l>stage bounds</l><l>dir x</l><l>dir` +
        ` y</l><l>delta x</l><l>delta y</l></list></block><block s="doSetVar"` +
        `><l>get bounds</l><block s="reifyReporter"><autolambda><block s="rep` +
        `ortNewList"><list><block s="reportVariadicMin"><block s="reportCONS"` +
        `><block s="reportNewList"><list><block s="reportGet"><l><option>left` +
        `</option></l></block><block s="reportGet"><l><option>bottom</option>` +
        `</l></block></list></block><block s="reportMap"><block s="reifyRepor` +
        `ter"><autolambda><block s="reportNewList"><list><block s="reportAttr` +
        `ibuteOf"><l><option>left</option></l><l></l></block><block s="report` +
        `AttributeOf"><l><option>bottom</option></l><l></l></block></list></b` +
        `lock></autolambda><list></list></block><block s="reportGet"><l><opti` +
        `on>parts</option></l></block></block></block></block><block s="repor` +
        `tVariadicMax"><block s="reportCONS"><block s="reportNewList"><list><` +
        `block s="reportGet"><l><option>right</option></l></block><block s="r` +
        `eportGet"><l><option>top</option></l></block></list></block><block s` +
        `="reportMap"><block s="reifyReporter"><autolambda><block s="reportNe` +
        `wList"><list><block s="reportAttributeOf"><l><option>right</option><` +
        `/l><l></l></block><block s="reportAttributeOf"><l><option>top</optio` +
        `n></l><l></l></block></list></block></autolambda><list></list></bloc` +
        `k><block s="reportGet"><l><option>parts</option></l></block></block>` +
        `</block></block></list></block></autolambda><list></list></block></b` +
        `lock><block s="doSetVar"><l>bounds</l><block s="evaluate"><block var` +
        `="get bounds"/><list></list></block></block><block s="doSetVar"><l>c` +
        `enter</l><block s="reportQuotient"><block s="reportVariadicSum"><blo` +
        `ck var="bounds"/></block><l>2</l></block></block><block s="doSetVar"` +
        `><l>stage bounds</l><block s="reportAskFor"><block s="reportGet"><l>` +
        `<option>stage</option></l></block><block s="reifyReporter"><autolamb` +
        `da><block s="reportNewList"><list><block s="reportNewList"><list><bl` +
        `ock s="reportGet"><l><option>left</option></l></block><block s="repo` +
        `rtGet"><l><option>bottom</option></l></block></list></block><block s` +
        `="reportNewList"><list><block s="reportGet"><l><option>right</option` +
        `></l></block><block s="reportGet"><l><option>top</option></l></block` +
        `></list></block></list></block></autolambda><list></list></block><li` +
        `st></list></block></block><block s="doSetVar"><l>dir x</l><block s="` +
        `reportMonadic"><l><option>sin</option></l><block s="direction"></blo` +
        `ck></block></block><block s="doSetVar"><l>dir y</l><block s="reportM` +
        `onadic"><l><option>cos</option></l><block s="direction"></block></bl` +
        `ock></block><block s="doIf"><block s="reportVariadicLessThan"><list>` +
        `<block s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l>` +
        `<block var="bounds"/></block></block><block s="reportListItem"><l>1<` +
        `/l><block s="reportListItem"><l>1</l><block var="stage bounds"/></bl` +
        `ock></block></list></block><script><block s="doSetVar"><l>dir x</l><` +
        `block s="reportMonadic"><l><option>abs</option></l><block var="dir x` +
        `"/></block></block></script><list></list></block><block s="doIf"><bl` +
        `ock s="reportVariadicGreaterThan"><list><block s="reportListItem"><l` +
        `>1</l><block s="reportListItem"><l>2</l><block var="bounds"/></block` +
        `></block><block s="reportListItem"><l>1</l><block s="reportListItem"` +
        `><l>2</l><block var="stage bounds"/></block></block></list></block><` +
        `script><block s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><` +
        `option>neg</option></l><block s="reportMonadic"><l><option>abs</opti` +
        `on></l><block var="dir x"/></block></block></block></script><list></` +
        `list></block><block s="doIf"><block s="reportVariadicGreaterThan"><l` +
        `ist><block s="reportListItem"><l>2</l><block s="reportListItem"><l>2` +
        `</l><block var="bounds"/></block></block><block s="reportListItem"><` +
        `l>2</l><block s="reportListItem"><l>2</l><block var="stage bounds"/>` +
        `</block></block></list></block><script><block s="doSetVar"><l>dir y<` +
        `/l><block s="reportMonadic"><l><option>neg</option></l><block s="rep` +
        `ortMonadic"><l><option>abs</option></l><block var="dir y"/></block><` +
        `/block></block></script><list></list></block><block s="doIf"><block ` +
        `s="reportVariadicLessThan"><list><block s="reportListItem"><l>2</l><` +
        `block s="reportListItem"><l>1</l><block var="bounds"/></block></bloc` +
        `k><block s="reportListItem"><l>2</l><block s="reportListItem"><l>1</` +
        `l><block var="stage bounds"/></block></block></list></block><script>` +
        `<block s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>` +
        `abs</option></l><block var="dir y"/></block></block></script><list><` +
        `/list></block><block s="setHeading"><block s="reportAtan2"><block va` +
        `r="dir x"/><block var="dir y"/></block></block><block s="doSetVar"><` +
        `l>bounds</l><block s="evaluate"><block var="get bounds"/><list></lis` +
        `t></block></block><block s="doGotoObject"><block s="reportVariadicSu` +
        `m"><list><block s="getPosition"></block><block s="reportDifference">` +
        `<block var="center"/><block s="reportQuotient"><block s="reportVaria` +
        `dicSum"><block var="bounds"/></block><l>2</l></block></block></list>` +
        `</block></block><block s="doSetVar"><l>bounds</l><block s="evaluate"` +
        `><block var="get bounds"/><list></list></block></block><block s="doI` +
        `f"><block s="reportVariadicGreaterThan"><list><block s="reportListIt` +
        `em"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/><` +
        `/block></block><block s="reportListItem"><l>1</l><block s="reportLis` +
        `tItem"><l>2</l><block var="stage bounds"/></block></block></list></b` +
        `lock><script><block s="doSetVar"><l>delta x</l><block s="reportDiffe` +
        `rence"><block s="reportListItem"><l>1</l><block s="reportListItem"><` +
        `l>2</l><block var="stage bounds"/></block></block><block s="reportLi` +
        `stItem"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds` +
        `"/></block></block></block></block></script><list></list></block><bl` +
        `ock s="doIf"><block s="reportVariadicLessThan"><list><block s="repor` +
        `tListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="bou` +
        `nds"/></block></block><block s="reportListItem"><l>2</l><block s="re` +
        `portListItem"><l>1</l><block var="stage bounds"/></block></block></l` +
        `ist></block><script><block s="doSetVar"><l>delta y</l><block s="repo` +
        `rtDifference"><block s="reportListItem"><l>2</l><block s="reportList` +
        `Item"><l>1</l><block var="stage bounds"/></block></block><block s="r` +
        `eportListItem"><l>2</l><block s="reportListItem"><l>1</l><block var=` +
        `"bounds"/></block></block></block></block></script><list></list></bl` +
        `ock><block s="doIf"><block s="reportVariadicLessThan"><list><block s` +
        `="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><block v` +
        `ar="bounds"/></block></block><block s="reportListItem"><l>1</l><bloc` +
        `k s="reportListItem"><l>1</l><block var="stage bounds"/></block></bl` +
        `ock></list></block><script><block s="doSetVar"><l>delta x</l><block ` +
        `s="reportDifference"><block s="reportListItem"><l>1</l><block s="rep` +
        `ortListItem"><l>1</l><block var="stage bounds"/></block></block><blo` +
        `ck s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><blo` +
        `ck var="bounds"/></block></block></block></block></script><list></li` +
        `st></block><block s="doIf"><block s="reportVariadicGreaterThan"><lis` +
        `t><block s="reportListItem"><l>2</l><block s="reportListItem"><l>2</` +
        `l><block var="bounds"/></block></block><block s="reportListItem"><l>` +
        `2</l><block s="reportListItem"><l>2</l><block var="stage bounds"/></` +
        `block></block></list></block><script><block s="doSetVar"><l>delta y<` +
        `/l><block s="reportDifference"><block s="reportListItem"><l>2</l><bl` +
        `ock s="reportListItem"><l>2</l><block var="stage bounds"/></block></` +
        `block><block s="reportListItem"><l>2</l><block s="reportListItem"><l` +
        `>2</l><block var="bounds"/></block></block></block></block></script>` +
        `<list></list></block><block s="doGotoObject"><block s="reportVariadi` +
        `cSum"><list><block s="getPosition"></block><block s="reportNewList">` +
        `<list><block var="delta x"/><block var="delta y"/></list></block></l` +
        `ist></block></block></script><list></list></block></script></block-d` +
        `efinition><block-definition s="position" type="reporter" category="m` +
        `otion" selector="getPosition"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs><script><block s="doReport"><b` +
        `lock s="reportNewList"><list><block s="xPosition"></block><block s="` +
        `yPosition"></block></list></block></block></script></block-definitio` +
        `n><block-definition s="x position" type="reporter" category="motion"` +
        ` selector="xPosition" primitive="xPosition"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="y position" type="reporter" category="motion` +
        `" selector="yPosition" primitive="yPosition"><header></header><code>` +
        `</code><translations></translations><inputs></inputs></block-definit` +
        `ion><block-definition s="direction" type="reporter" category="motion` +
        `" selector="direction" primitive="direction"><header></header><code>` +
        `</code><translations></translations><inputs></inputs></block-definit` +
        `ion><block-definition s="switch to costume %#1" type="command" categ` +
        `ory="looks" selector="doSwitchToCostume" primitive="doSwitchToCostum` +
        `e"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true"><options>§_costumesMenu</options>` +
        `</input></inputs></block-definition><block-definition s="next costum` +
        `e" type="command" category="looks" selector="doWearNextCostume"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts><script><block s="doIf"><block s="reportVariadicGreaterThan"><li` +
        `st><block s="getCostumeIdx"></block><l>0</l></list></block><script><` +
        `block s="doSwitchToCostume"><block s="reportVariadicSum"><list><bloc` +
        `k s="reportModulus"><block s="getCostumeIdx"></block><block s="repor` +
        `tListAttribute"><l><option>length</option></l><block s="reportGet"><` +
        `l><option>costumes</option></l></block></block></block><l>1</l></lis` +
        `t></block></block></script><list></list></block></script></block-def` +
        `inition><block-definition s="costume #" type="reporter" category="lo` +
        `oks" selector="getCostumeIdx"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs><script><block s="doReport"><b` +
        `lock s="reportListIndex"><block s="reportGet"><l><option>costume</op` +
        `tion></l></block><block s="reportGet"><l><option>costumes</option></` +
        `l></block></block></block></script></block-definition><block-definit` +
        `ion s="%#1 of costume %#2" type="reporter" category="looks" selector` +
        `="reportGetImageAttribute" primitive="reportGetImageAttribute"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">width<options>name&#` +
        `xD;width&#xD;height&#xD;pixels</options></input><input type="%s" rea` +
        `donly="true">current<options>§_costumesMenu</options></input></input` +
        `s></block-definition><block-definition s="new costume %#1 width %#2 ` +
        `height %#3" type="reporter" category="looks" selector="reportNewCost` +
        `ume" primitive="reportNewCostume"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%l" readonly="true"></` +
        `input><input type="%n"><options>current</options></input><input type` +
        `="%n"><options>current</options></input></inputs></block-definition>` +
        `<block-definition s="stretch %#1 x: %#2 y: %#3 %" type="reporter" ca` +
        `tegory="looks" selector="reportNewCostumeStretched" primitive="repor` +
        `tNewCostumeStretched"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true">current<option` +
        `s>§_costumesMenu</options></input><input type="%n">100</input><input` +
        ` type="%n">50</input></inputs></block-definition><block-definition s` +
        `="skew %#1 to %#2 degrees %#3 %" type="reporter" category="looks" se` +
        `lector="reportNewCostumeSkewed" primitive="reportNewCostumeSkewed"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true">current<options>§_costumesMenu</optio` +
        `ns></input><input type="%n">0<options>§_dir=&#xD;(90) right=90&#xD;(` +
        `-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</options></` +
        `input><input type="%n">50</input></inputs></block-definition><block-` +
        `definition s="say %&apos;msg&apos; for %&apos;time&apos; secs" type=` +
        `"command" category="looks" selector="doSayFor"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s">Hello` +
        `!</input><input type="%n">2</input></inputs><script><block s="bubble` +
        `"><block var="msg"/></block><block s="doWait"><block var="time"/></b` +
        `lock><block s="bubble"><l></l></block></script></block-definition><b` +
        `lock-definition s="say %#1" type="command" category="looks" selector` +
        `="bubble" primitive="bubble"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s">Hello!</input></inputs>` +
        `</block-definition><block-definition s="think %&apos;msg&apos; for %` +
        `&apos;time&apos; secs" type="command" category="looks" selector="doT` +
        `hinkFor"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s">Hmm...</input><input type="%n">2</input></i` +
        `nputs><script><block s="doThink"><block var="msg"/></block><block s=` +
        `"doWait"><block var="time"/></block><block s="doThink"><l></l></bloc` +
        `k></script></block-definition><block-definition s="think %#1" type="` +
        `command" category="looks" selector="doThink" primitive="doThink"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s">Hmm...</input></inputs></block-definition><block-defini` +
        `tion s="change %&apos;effect name&apos; effect by %&apos;delta&apos;` +
        `" type="command" category="looks" selector="changeEffect"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true">ghost<options>color&#xD;s` +
        `aturation&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelat` +
        `e&#xD;mosaic&#xD;negative</options></input><input type="%n">25</inpu` +
        `t></inputs><script><block s="doRun"><block s="reifyScript"><script><` +
        `block s="setEffect"><l></l><block s="reportVariadicSum"><list><block` +
        ` s="getEffect"><l></l></block><block var="delta"/></list></block></b` +
        `lock></script><list></list></block><list><block var="effect name"/><` +
        `/list></block></script></block-definition><block-definition s="set %` +
        `#1 effect to %#2" type="command" category="looks" selector="setEffec` +
        `t" primitive="setEffect"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true">ghost<options>color&#xD;saturation&#xD;brightness&#xD;ghos` +
        `t&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</option` +
        `s></input><input type="%n">0</input></inputs></block-definition><blo` +
        `ck-definition s="%#1 effect" type="reporter" category="looks" select` +
        `or="getEffect" primitive="getEffect"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">ghost<options>color&#xD;saturation&#xD;brightn` +
        `ess&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;nega` +
        `tive</options></input></inputs></block-definition><block-definition ` +
        `s="clear graphic effects" type="command" category="looks" selector="` +
        `clearEffects" primitive="clearEffects"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="change size by %&apos;delta&apos;" type="command"` +
        ` category="looks" selector="changeScale"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n">10</input><` +
        `/inputs><script><block s="setScale"><block s="reportVariadicSum"><li` +
        `st><block s="getScale"></block><block var="delta"/></list></block></` +
        `block></script></block-definition><block-definition s="set size to %` +
        `#1 %" type="command" category="looks" selector="setScale" primitive=` +
        `"setScale"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">100</input></inputs></block-definition><b` +
        `lock-definition s="size" type="reporter" category="looks" selector="` +
        `getScale" primitive="getScale"><header></header><code></code><transl` +
        `ations></translations><inputs></inputs></block-definition><block-def` +
        `inition s="show" type="command" category="looks" selector="show" pri` +
        `mitive="show"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs></block-definition><block-definition s="hide" ` +
        `type="command" category="looks" selector="hide" primitive="hide"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="shown?" type="predicate` +
        `" category="looks" selector="reportShown" primitive="reportShown"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="go to %#1 layer" type=` +
        `"command" category="looks" selector="goToLayer" primitive="goToLayer` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true" irreplaceable="true">front<options` +
        `>front&#xD;back</options></input></inputs></block-definition><block-` +
        `definition s="go back %#1 layers" type="command" category="looks" se` +
        `lector="goBack" primitive="goBack"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">1</input></inputs` +
        `></block-definition><block-definition s="save %#1 as costume named %` +
        `#2" type="command" category="looks" selector="doScreenshot" primitiv` +
        `e="doScreenshot"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true">pen trails<options>` +
        `pen trails&#xD;stage image</options></input><input type="%s">screens` +
        `hot</input></inputs></block-definition><block-definition s="wardrobe` +
        `" type="reporter" category="looks" selector="reportCostumes" primiti` +
        `ve="reportCostumes"><header></header><code></code><translations></tr` +
        `anslations><inputs></inputs></block-definition><block-definition s="` +
        `alert %#1" type="command" category="looks" selector="alert" primitiv` +
        `e="alert"><header></header><code></code><translations></translations` +
        `><inputs><input type="%mult%s" readonly="true"></input></inputs></bl` +
        `ock-definition><block-definition s="console log %#1" type="command" ` +
        `category="looks" selector="log" primitive="log"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%mult%s"` +
        ` readonly="true"></input></inputs></block-definition><block-definiti` +
        `on s="play sound %#1" type="command" category="sound" selector="play` +
        `Sound" primitive="playSound"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true"><option` +
        `s>§_soundsMenu</options></input></inputs></block-definition><block-d` +
        `efinition s="play sound %&apos;target&apos; until done" type="comman` +
        `d" category="sound" selector="doPlaySoundUntilDone"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true"><options>§_soundsMenu</options></input></inputs><scr` +
        `ipt><block s="doDeclareVariables"><list><l>sound</l></list></block><` +
        `block s="doSetVar"><l>sound</l><block s="reportIfElse"><block s="rep` +
        `ortIsA"><block var="target"/><l><option>sound</option></l></block><b` +
        `lock var="target"/><block s="reportIfElse"><block s="reportIsA"><blo` +
        `ck var="target"/><l><option>list</option></l></block><block s="repor` +
        `tNewSoundFromSamples"><block var="target"/><l>44100</l></block><bloc` +
        `k s="reportFindFirst"><block s="reifyPredicate"><autolambda><block s` +
        `="reportVariadicEquals"><list><block s="reportGetSoundAttribute"><l>` +
        `<option>name</option></l><l></l></block><block var="target"/></list>` +
        `</block></autolambda><list></list></block><block s="reportGet"><l><o` +
        `ption>sounds</option></l></block></block></block></block></block><bl` +
        `ock s="doIf"><block s="reportIsA"><block var="sound"/><l><option>sou` +
        `nd</option></l></block><script><block s="playSound"><block var="soun` +
        `d"/></block><block s="doWait"><block s="reportGetSoundAttribute"><l>` +
        `<option>duration</option></l><block var="sound"/></block></block></s` +
        `cript><list></list></block></script></block-definition><block-defini` +
        `tion s="play sound %&apos;target&apos; at %&apos;rate&apos; Hz" type` +
        `="command" category="sound" selector="doPlaySoundAtRate"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true"><options>§_soundsMenu</options></input><input t` +
        `ype="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz` +
        `=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input></inputs` +
        `><script><block s="playSound"><block s="reportNewSoundFromSamples"><` +
        `block s="reportGetSoundAttribute"><l><option>samples</option></l><bl` +
        `ock var="target"/></block><block var="rate"/></block></block></scrip` +
        `t></block-definition><block-definition s="stop all sounds" type="com` +
        `mand" category="sound" selector="doStopAllSounds" primitive="doStopA` +
        `llSounds"><header></header><code></code><translations></translations` +
        `><inputs></inputs></block-definition><block-definition s="%#1 of sou` +
        `nd %#2" type="reporter" category="sound" selector="reportGetSoundAtt` +
        `ribute" primitive="reportGetSoundAttribute"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">duration<options>name&#xD;duration&#xD;` +
        `length&#xD;number of channels&#xD;sample rate&#xD;samples</options><` +
        `/input><input type="%s" readonly="true"><options>§_soundsMenu</optio` +
        `ns></input></inputs></block-definition><block-definition s="new soun` +
        `d %#1 rate %#2 Hz" type="reporter" category="sound" selector="report` +
        `NewSoundFromSamples" primitive="reportNewSoundFromSamples"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%l" readonly="true"></input><input type="%n">44100<options>22.05 ` +
        `kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD` +
        `;96 kHz=96000</options></input></inputs></block-definition><block-de` +
        `finition s="rest for %&apos;beats&apos; beats" type="command" catego` +
        `ry="sound" selector="doRest"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">0.2</input></inputs><sc` +
        `ript><block s="doWait"><block s="reportQuotient"><l>60</l><block s="` +
        `reportVariadicProduct"><list><block var="beats"/><block s="getTempo"` +
        `></block></list></block></block></block></script></block-definition>` +
        `<block-definition s="play note %#1 for %#2 beats" type="command" cat` +
        `egory="sound" selector="doPlayNote" primitive="doPlayNote"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n">60<options>§_pianoKeyboardMenu</options></input><input type="` +
        `%n">0.5</input></inputs></block-definition><block-definition s="play` +
        ` %#1 Hz for %#2 secs" type="command" category="sound" selector="doPl` +
        `ayFrequency" primitive="doPlayFrequency"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n">440</input>` +
        `<input type="%n">2</input></inputs></block-definition><block-definit` +
        `ion s="set instrument to %#1" type="command" category="sound" select` +
        `or="doSetInstrument" primitive="doSetInstrument"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n">1<o` +
        `ptions>(1) sine=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) triang` +
        `le=4</options></input></inputs></block-definition><block-definition ` +
        `s="change tempo by %&apos;delta&apos;" type="command" category="soun` +
        `d" selector="doChangeTempo"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">20</input></inputs><scri` +
        `pt><block s="doSetTempo"><block s="reportVariadicSum"><list><block s` +
        `="getTempo"></block><block var="delta"/></list></block></block></scr` +
        `ipt></block-definition><block-definition s="set tempo to %#1 bpm" ty` +
        `pe="command" category="sound" selector="doSetTempo" primitive="doSet` +
        `Tempo"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%n">60</input></inputs></block-definition><block-` +
        `definition s="tempo" type="reporter" category="sound" selector="getT` +
        `empo" primitive="getTempo"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="change volume by %&apos;delta&apos;" type="command" category=` +
        `"sound" selector="changeVolume"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%n">10</input></inputs><` +
        `script><block s="setVolume"><block s="reportVariadicSum"><list><bloc` +
        `k s="getVolume"></block><block var="delta"/></list></block></block><` +
        `/script></block-definition><block-definition s="set volume to %#1 %"` +
        ` type="command" category="sound" selector="setVolume" primitive="set` +
        `Volume"><header></header><code></code><translations></translations><` +
        `inputs><input type="%n">100</input></inputs></block-definition><bloc` +
        `k-definition s="volume" type="reporter" category="sound" selector="g` +
        `etVolume" primitive="getVolume"><header></header><code></code><trans` +
        `lations></translations><inputs></inputs></block-definition><block-de` +
        `finition s="change balance by %&apos;delta&apos;" type="command" cat` +
        `egory="sound" selector="changePan"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">10</input></input` +
        `s><script><block s="setPan"><block s="reportVariadicSum"><list><bloc` +
        `k s="getPan"></block><block var="delta"/></list></block></block></sc` +
        `ript></block-definition><block-definition s="set balance to %#1" typ` +
        `e="command" category="sound" selector="setPan" primitive="setPan"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">0</input></inputs></block-definition><block-definition` +
        ` s="balance" type="reporter" category="sound" selector="getPan" prim` +
        `itive="getPan"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="play ` +
        `frequency %#1 Hz" type="command" category="sound" selector="playFreq` +
        `" primitive="playFreq"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">440</input></inputs></block-d` +
        `efinition><block-definition s="stop frequency" type="command" catego` +
        `ry="sound" selector="stopFreq" primitive="stopFreq"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="jukebox" type="reporter" category="s` +
        `ound" selector="reportSounds" primitive="reportSounds"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs></blo` +
        `ck-definition><block-definition s="clear" type="command" category="p` +
        `en" selector="clear" primitive="clear"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="pen down" type="command" category="pen" selector=` +
        `"down" primitive="down"><header></header><code></code><translations>` +
        `</translations><inputs></inputs></block-definition><block-definition` +
        ` s="pen up" type="command" category="pen" selector="up" primitive="u` +
        `p"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="pen down?" type="` +
        `predicate" category="pen" selector="getPenDown" primitive="getPenDow` +
        `n"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="set pen color to ` +
        `%&apos;color&apos;" type="command" category="pen" selector="setColor` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%clr" readonly="true" irreplaceable="true"></input></i` +
        `nputs><script><block s="doApplyExtension"><l>clr_setpen(clr)</l><lis` +
        `t><block var="color"/></list></block></script></block-definition><bl` +
        `ock-definition s="set pen %#1 to %#2" type="command" category="pen" ` +
        `selector="setPenColorDimension" primitive="setPenColorDimension"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true" irreplaceable="true">hue<options>hue&#x` +
        `D;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a` +
        `)</options></input><input type="%n">50</input></inputs></block-defin` +
        `ition><block-definition s="change pen %&apos;aspect&apos; by %&apos;` +
        `delta&apos;" type="command" category="pen" selector="changePenColorD` +
        `imension"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">hue<o` +
        `ptions>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;` +
        `&#xD;r-g-b(-a)</options></input><input type="%n">10</input></inputs>` +
        `<script><block s="doRun"><block s="reifyScript"><script><block s="se` +
        `tPenColorDimension"><l></l><block var="delta"/></block></script><lis` +
        `t></list></block><list><block var="aspect"/></list></block></script>` +
        `</block-definition><block-definition s="pen %#1" type="reporter" cat` +
        `egory="pen" selector="getPenAttribute" primitive="getPenAttribute"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">hue<options>size` +
        `&#xD;hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#` +
        `xD;r-g-b-a</options></input></inputs></block-definition><block-defin` +
        `ition s="set background color to %#1" type="command" category="pen" ` +
        `selector="setBackgroundColor" primitive="setBackgroundColor"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%clr" readonly="true" irreplaceable="true"></input></inputs></b` +
        `lock-definition><block-definition s="set background %#1 to %#2" type` +
        `="command" category="pen" selector="setBackgroundColorDimension" pri` +
        `mitive="setBackgroundColorDimension"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">hue<options>hue&#xD;saturation&#xD;brightness&` +
        `#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input><input ty` +
        `pe="%n">50</input></inputs></block-definition><block-definition s="c` +
        `hange background %#1 by %#2" type="command" category="pen" selector=` +
        `"changeBackgroundColorDimension" primitive="changeBackgroundColorDim` +
        `ension"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true">hue<opt` +
        `ions>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#` +
        `xD;r-g-b(-a)</options></input><input type="%n">10</input></inputs></` +
        `block-definition><block-definition s="change pen size by %&apos;delt` +
        `a&apos;" type="command" category="pen" selector="changeSize"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">1</input></inputs><script><block s="setSize"><block s="repo` +
        `rtVariadicSum"><list><block s="getPenAttribute"><l><option>size</opt` +
        `ion></l></block><block var="delta"/></list></block></block></script>` +
        `</block-definition><block-definition s="set pen size to %#1" type="c` +
        `ommand" category="pen" selector="setSize" primitive="setSize"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%n">1</input></inputs></block-definition><block-definition s="` +
        `stamp" type="command" category="pen" selector="doStamp" primitive="d` +
        `oStamp"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="fill" type="` +
        `command" category="pen" selector="floodFill" primitive="floodFill"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="write %#1 size %#2" t` +
        `ype="command" category="pen" selector="write" primitive="write"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s">Hello!</input><input type="%n">12</input></inputs></bloc` +
        `k-definition><block-definition s="pen trails" type="reporter" catego` +
        `ry="pen" selector="reportPenTrailsAsCostume" primitive="reportPenTra` +
        `ilsAsCostume"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs></block-definition><block-definition s="pen ve` +
        `ctors" type="reporter" category="pen" selector="reportPentrailsAsSVG` +
        `" primitive="reportPentrailsAsSVG"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="paste on %#1" type="command" category="pen" selector=` +
        `"doPasteOn" primitive="doPasteOn"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true"><o` +
        `ptions>§_objectsMenu</options></input></inputs></block-definition><b` +
        `lock-definition s="cut from %#1" type="command" category="pen" selec` +
        `tor="doCutFrom" primitive="doCutFrom"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `"><options>§_objectsMenu</options></input></inputs></block-definitio` +
        `n><block-definition s="message" type="reporter" category="control" s` +
        `elector="getLastMessage" primitive="getLastMessage"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="broadcast %#1 %#2" type="command" ca` +
        `tegory="control" selector="doBroadcast" primitive="doBroadcast"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true"><options>§_messagesMenu</options></input` +
        `><input type="%receive" readonly="true" irreplaceable="true" expand=` +
        `"to&#xD;with data" max="2"></input></inputs></block-definition><bloc` +
        `k-definition s="broadcast %#1 %#2 and wait" type="command" category=` +
        `"control" selector="doBroadcastAndWait" primitive="doBroadcastAndWai` +
        `t"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true"><options>§_messagesMenu</options>` +
        `</input><input type="%receive" readonly="true" irreplaceable="true" ` +
        `expand="to&#xD;with data" max="2"></input></inputs></block-definitio` +
        `n><block-definition s="wait %&apos;duration&apos; secs" type="comman` +
        `d" category="control" selector="doWait"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1</input></i` +
        `nputs><script><block s="doDeclareVariables"><list><l>start time</l><` +
        `/list></block><block s="doSetVar"><l>start time</l><block s="reportD` +
        `ate"><l><option>time in milliseconds</option></l></block></block><bl` +
        `ock s="doWaitUntil"><block s="reportVariadicGreaterThanOrEquals"><li` +
        `st><block s="reportDate"><l><option>time in milliseconds</option></l` +
        `></block><block s="reportVariadicSum"><list><block var="start time"/` +
        `><block s="reportVariadicProduct"><list><block var="duration"/><l>10` +
        `00</l></list></block></list></block></list></block></block></script>` +
        `</block-definition><block-definition s="wait until %&apos;condition&` +
        `apos;" type="command" category="control" selector="doWaitUntil"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%boolUE" readonly="true"></input></inputs><script><block s="` +
        `doIf"><block s="reportNot"><block s="evaluate"><block var="condition` +
        `"/><list></list></block></block><script><block s="doWaitUntil"><bloc` +
        `k s="evaluate"><block var="condition"/><list></list></block></block>` +
        `</script><list></list></block></script></block-definition><block-def` +
        `inition s="forever %&apos;action&apos;" type="command" category="con` +
        `trol" selector="doForever"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%loop" readonly="true" irrepl` +
        `aceable="true"></input></inputs><script><block s="doRun"><block var=` +
        `"action"/><list></list></block><block s="doRun"><block s="reportEnvi` +
        `ronment"><l><option>script</option></l></block><list><block var="act` +
        `ion"/></list></block></script></block-definition><block-definition s` +
        `="repeat %&apos;count&apos; %&apos;action&apos;" type="command" cate` +
        `gory="control" selector="doRepeat"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">10</input><input ` +
        `type="%loop" readonly="true" irreplaceable="true"></input></inputs><` +
        `script><block s="doDeclareVariables"><list><l>self</l></list></block` +
        `><block s="doSetVar"><l>self</l><block s="reportEnvironment"><l><opt` +
        `ion>script</option></l></block></block><block s="doIf"><block s="rep` +
        `ortVariadicGreaterThan"><list><block var="count"/><l>0</l></list></b` +
        `lock><script><block s="doRun"><block var="action"/><list></list></bl` +
        `ock><block s="doApplyExtension"><l>snap_yield</l><list></list></bloc` +
        `k><block s="doRun"><block var="self"/><list><block s="reportDifferen` +
        `ce"><block var="count"/><l>1</l></block><block var="action"/></list>` +
        `</block></script><list></list></block></script></block-definition><b` +
        `lock-definition s="repeat until %&apos;condition&apos; %&apos;action` +
        `&apos;" type="command" category="control" selector="doUntil"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%boolUE" readonly="true"></input><input type="%loop" readonly="` +
        `true" irreplaceable="true"></input></inputs><script><block s="doDecl` +
        `areVariables"><list><l>self</l></list></block><block s="doSetVar"><l` +
        `>self</l><block s="reportEnvironment"><l><option>script</option></l>` +
        `</block></block><block s="doIf"><block s="reportNot"><block s="evalu` +
        `ate"><block var="condition"/><list></list></block></block><script><b` +
        `lock s="doRun"><block var="action"/><list></list></block><block s="d` +
        `oApplyExtension"><l>snap_yield</l><list></list></block><block s="doR` +
        `un"><block var="self"/><list><block var="condition"/><block var="act` +
        `ion"/></list></block></script><list></list></block></script></block-` +
        `definition><block-definition s="for %&apos;count&apos; = %&apos;star` +
        `t&apos; to %&apos;end&apos; %&apos;action&apos;" type="command" cate` +
        `gory="control" selector="doFor"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%upvar" readonly="true" ` +
        `irreplaceable="true">i</input><input type="%n">1</input><input type=` +
        `"%n">10</input><input type="%loop" readonly="true" irreplaceable="tr` +
        `ue"></input></inputs><script><block s="doDeclareVariables"><list><l>` +
        `test</l><l>increment</l></list></block><block s="doSetVar"><l>count<` +
        `/l><block var="start"/></block><block s="doIfElse"><block s="reportV` +
        `ariadicLessThan"><list><block var="start"/><block var="end"/></list>` +
        `</block><script><block s="doSetVar"><l>test</l><block s="reifyPredic` +
        `ate"><autolambda><block s="reportVariadicGreaterThan"><list><block v` +
        `ar="count"/><block var="end"/></list></block></autolambda><list></li` +
        `st></block></block><block s="doSetVar"><l>increment</l><l>1</l></blo` +
        `ck></script><script><block s="doSetVar"><l>test</l><block s="reifyPr` +
        `edicate"><autolambda><block s="reportVariadicLessThan"><list><block ` +
        `var="count"/><block var="end"/></list></block></autolambda><list></l` +
        `ist></block></block><block s="doSetVar"><l>increment</l><l>-1</l></b` +
        `lock></script></block><block s="doUntil"><block s="evaluate"><block ` +
        `var="test"/><list></list></block><script><block s="doRun"><block var` +
        `="action"/><list></list></block><block s="doChangeVar"><l>count</l><` +
        `block var="increment"/></block></script></block></script></block-def` +
        `inition><block-definition s="if %&apos;condition&apos; %&apos;true c` +
        `ase&apos; %&apos;else pairs&apos;" type="command" category="control"` +
        ` selector="doIf"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%b" readonly="true"></input><input type` +
        `="%cs" readonly="true" irreplaceable="true"></input><input type="%el` +
        `seif" readonly="true" irreplaceable="true" expand="else if&#xD;"></i` +
        `nput></inputs><script><block s="doDeclareVariables"><list><l>self</l` +
        `></list></block><block s="doSetVar"><l>self</l><block s="reportEnvir` +
        `onment"><l><option>script</option></l></block></block><block s="doIf` +
        `Else"><block var="condition"/><script><block s="doRun"><block var="t` +
        `rue case"/><list></list></block></script><script><block s="doIfElse"` +
        `><block s="reportListIsEmpty"><block var="else pairs"/></block><scri` +
        `pt></script><script><block s="doIfElse"><block s="reportListItem"><l` +
        `>1</l><block var="else pairs"/></block><script><block s="doRun"><blo` +
        `ck s="reportListItem"><l>2</l><block var="else pairs"/></block><list` +
        `></list></block></script><script><block s="doRun"><block var="self"/` +
        `><list><block s="reportBoolean"><l><bool>false</bool></l></block><l>` +
        `</l><block s="reportCDR"><block s="reportCDR"><block var="else pairs` +
        `"/></block></block></list></block></script></block></script></block>` +
        `</script></block></script></block-definition><block-definition s="if` +
        ` %&apos;condition&apos; %&apos;true case&apos; else %&apos;false cas` +
        `e&apos;" type="command" category="control" selector="doIfElse"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%b" readonly="true"></input><input type="%cs" readonly="true"` +
        ` irreplaceable="true"></input><input type="%cs" readonly="true" irre` +
        `placeable="true"></input></inputs><script><block s="doRun"><block s=` +
        `"reportListItem"><block s="reportVariadicSum"><list><block var="cond` +
        `ition"/><l>1</l></list></block><block s="reportNewList"><list><block` +
        ` var="false case"/><block var="true case"/></list></block></block><l` +
        `ist></list></block></script></block-definition><block-definition s="` +
        `if %&apos;condition&apos; then %&apos;true case&apos; else %&apos;fa` +
        `lse case&apos;" type="reporter" category="control" selector="reportI` +
        `fElse"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%b" readonly="true"></input><input type="%anyUE">` +
        `</input><input type="%anyUE"></input></inputs><script><block s="doRe` +
        `port"><block s="reportHyperZip"><block s="reifyReporter"><autolambda` +
        `><block s="evaluate"><block s="reportListItem"><l></l><l/></block><l` +
        `ist></list></block></autolambda><list></list></block><block s="repor` +
        `tVariadicSum"><list><block var="condition"/><l>1</l></list></block><` +
        `l>0</l><block s="reportNewList"><list><block var="false case"/><bloc` +
        `k var="true case"/></list></block><l>1</l></block></block></script><` +
        `/block-definition><block-definition s="stop %#1" type="command" cate` +
        `gory="control" selector="doStopThis" primitive="doStopThis"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true" irreplaceable="true">all<options>all&#xD;all` +
        ` scenes&#xD;this script&#xD;this block&#xD;all but this script&#xD;o` +
        `ther scripts in sprite</options></input></inputs></block-definition>` +
        `<block-definition s="run %#1 %#2" type="command" category="control" ` +
        `selector="doRun" primitive="doRun"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%cmdRing" readonly="t` +
        `rue"></input><input type="%mult%s" readonly="true" expand="with inpu` +
        `ts"></input></inputs></block-definition><block-definition s="launch ` +
        `%#1 %#2" type="command" category="control" selector="fork" primitive` +
        `="fork"><header></header><code></code><translations></translations><` +
        `inputs><input type="%cmdRing" readonly="true"></input><input type="%` +
        `mult%s" readonly="true" expand="with inputs"></input></inputs></bloc` +
        `k-definition><block-definition s="call %#1 %#2" type="reporter" cate` +
        `gory="control" selector="evaluate" primitive="evaluate"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%repRing" readonly="true" irreplaceable="true"></input><input type="` +
        `%mult%s" readonly="true" expand="with inputs"></input></inputs></blo` +
        `ck-definition><block-definition s="report %#1" type="command" catego` +
        `ry="control" selector="doReport" primitive="doReport"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `"></input></inputs></block-definition><block-definition s="run %#1 w` +
        `/continuation" type="command" category="control" selector="doCallCC"` +
        ` primitive="doCallCC"><header></header><code></code><translations></` +
        `translations><inputs><input type="%cmdRing" readonly="true"></input>` +
        `</inputs></block-definition><block-definition s="call %#1 w/continua` +
        `tion" type="reporter" category="control" selector="reportCallCC" pri` +
        `mitive="reportCallCC"><header></header><code></code><translations></` +
        `translations><inputs><input type="%cmdRing" readonly="true"></input>` +
        `</inputs></block-definition><block-definition s="warp %#1" type="com` +
        `mand" category="other" selector="doWarp" primitive="doWarp"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%cs" readonly="true" irreplaceable="true"></input></inputs></blo` +
        `ck-definition><block-definition s="tell %&apos;target&apos; to %&apo` +
        `s;action&apos; %&apos;parameters&apos;" type="command" category="con` +
        `trol" selector="doTellTo"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true"><options>§` +
        `_objectsMenu</options></input><input type="%cmdRing" readonly="true"` +
        `></input><input type="%mult%s" readonly="true" expand="with inputs">` +
        `</input></inputs><script><block s="doRun"><block s="reportAttributeO` +
        `f"><block var="action"/><block var="target"/></block><block var="par` +
        `ameters"/></block></script></block-definition><block-definition s="a` +
        `sk %&apos;target&apos; for %&apos;action&apos; %&apos;parameters&apo` +
        `s;" type="reporter" category="control" selector="reportAskFor"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true"><options>§_objectsMenu</options></input><` +
        `input type="%repRing" readonly="true" irreplaceable="true"></input><` +
        `input type="%mult%s" readonly="true" expand="with inputs"></input></` +
        `inputs><script><block s="doReport"><block s="evaluate"><block s="rep` +
        `ortAttributeOf"><block var="action"/><block var="target"/></block><b` +
        `lock var="parameters"/></block></block></script></block-definition><` +
        `block-definition s="create a clone of %&apos;target&apos;" type="com` +
        `mand" category="control" selector="createClone"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true">myself<options>§_clonablesMenu</options></input></inputs` +
        `><script><block s="doReport"><block s="newClone"><block var="target"` +
        `/></block></block></script></block-definition><block-definition s="a` +
        ` new clone of %#1" type="reporter" category="control" selector="newC` +
        `lone" primitive="newClone"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true">myself<op` +
        `tions>§_clonablesMenu</options></input></inputs></block-definition><` +
        `block-definition s="delete this clone" type="command" category="cont` +
        `rol" selector="removeClone" primitive="removeClone"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="define %#1 %#2 %#3" type="command" c` +
        `ategory="control" selector="doDefineBlock" primitive="doDefineBlock"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%upvar" readonly="true" irreplaceable="true">block</inp` +
        `ut><input type="%s"></input><input type="%repRing" readonly="true" i` +
        `rreplaceable="true"></input></inputs></block-definition><block-defin` +
        `ition s="set %#1 of block %#2 to %#3" type="command" category="contr` +
        `ol" selector="doSetBlockAttribute" primitive="doSetBlockAttribute"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">label<options>la` +
        `bel&#xD;definition&#xD;comment&#xD;category&#xD;type&#xD;scope&#xD;s` +
        `elector&#xD;slots&#xD;&#126;&#xD;defaults&#xD;menus&#xD;editables&#x` +
        `D;replaceables&#xD;&#126;&#xD;separators&#xD;collapses&#xD;expands&#` +
        `xD;initial slots&#xD;min slots&#xD;max slots&#xD;translations</optio` +
        `ns></input><input type="%repRing" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%s"></input></inputs></block-definition><blo` +
        `ck-definition s="delete block %#1" type="command" category="control"` +
        ` selector="doDeleteBlock" primitive="doDeleteBlock"><header></header` +
        `><code></code><translations></translations><inputs><input type="%rep` +
        `Ring" readonly="true" irreplaceable="true"></input></inputs></block-` +
        `definition><block-definition s="%#1 of block %#2" type="reporter" ca` +
        `tegory="control" selector="reportBlockAttribute" primitive="reportBl` +
        `ockAttribute"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true" irreplaceable="true">d` +
        `efinition<options>label&#xD;definition&#xD;comment&#xD;category&#xD;` +
        `custom?&#xD;global?&#xD;type&#xD;scope&#xD;selector&#xD;slots&#xD;&#` +
        `126;&#xD;defaults&#xD;menus&#xD;editables&#xD;replaceables&#xD;&#126` +
        `;&#xD;separators&#xD;collapses&#xD;expands&#xD;initial slots&#xD;min` +
        ` slots&#xD;max slots&#xD;translations</options></input><input type="` +
        `%repRing" readonly="true" irreplaceable="true"></input></inputs></bl` +
        `ock-definition><block-definition s="this %#1" type="reporter" catego` +
        `ry="control" selector="reportEnvironment" primitive="reportEnvironme` +
        `nt"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">script<opti` +
        `ons>script&#xD;caller&#xD;continuation&#xD;&#126;&#xD;inputs</option` +
        `s></input></inputs></block-definition><block-definition s="pause all` +
        ` $pause" type="command" category="control" selector="doPauseAll" pri` +
        `mitive="doPauseAll"><header></header><code></code><translations></tr` +
        `anslations><inputs></inputs></block-definition><block-definition s="` +
        `switch to scene %#1 %#2" type="command" category="control" selector=` +
        `"doSwitchToScene" primitive="doSwitchToScene"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true">next<options>§_scenesMenu</options></input><input type="%s` +
        `end" readonly="true" irreplaceable="true" expand="and send&#xD;with ` +
        `data" max="2"></input></inputs></block-definition><block-definition ` +
        `s="pipe %&apos;value&apos; $arrowRight %&apos;functions&apos;" type=` +
        `"reporter" category="control" selector="reportPipe"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s">` +
        `</input><input type="%mult%repRing" readonly="true"></input></inputs` +
        `><script><block s="doReport"><block s="reportIfElse"><block s="repor` +
        `tListIsEmpty"><block var="functions"/></block><block var="value"/><b` +
        `lock s="reportPipe"><block s="evaluate"><block s="reportListItem"><l` +
        `>1</l><block var="functions"/></block><list><block var="value"/></li` +
        `st></block><block s="reportCDR"><block var="functions"/></block></bl` +
        `ock></block></block></script></block-definition><block-definition s=` +
        `"touching %#1 ?" type="predicate" category="sensing" selector="repor` +
        `tTouchingObject" primitive="reportTouchingObject"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true">mouse-pointer<options>§_collidablesMenu</options></inp` +
        `ut></inputs></block-definition><block-definition s="touching %#1 ?" ` +
        `type="predicate" category="sensing" selector="reportTouchingColor" p` +
        `rimitive="reportTouchingColor"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%clr" readonly="true" irr` +
        `eplaceable="true"></input></inputs></block-definition><block-definit` +
        `ion s="color %#1 is touching %#2 ?" type="predicate" category="sensi` +
        `ng" selector="reportColorIsTouchingColor" primitive="reportColorIsTo` +
        `uchingColor"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%clr" readonly="true" irreplaceable="true">` +
        `</input><input type="%clr" readonly="true" irreplaceable="true"></in` +
        `put></inputs></block-definition><block-definition s="%#1 at %#2" typ` +
        `e="reporter" category="sensing" selector="reportAspect" primitive="r` +
        `eportAspect"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true">hu` +
        `e<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;r-g` +
        `-b-a&#xD;&#126;&#xD;sprites</options></input><input type="%s" readon` +
        `ly="true">mouse-pointer<options>§_locationMenu</options></input></in` +
        `puts></block-definition><block-definition s="stack size" type="repor` +
        `ter" category="sensing" selector="reportStackSize" primitive="report` +
        `StackSize"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="frames" t` +
        `ype="reporter" category="sensing" selector="reportFrameCount" primit` +
        `ive="reportFrameCount"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="yields" type="reporter" category="sensing" selector="reportYieldC` +
        `ount" primitive="reportYieldCount"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="processes" type="reporter" category="sensing" selecto` +
        `r="reportThreadCount" primitive="reportThreadCount"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="ask %#1 and wait" type="command" cat` +
        `egory="sensing" selector="doAsk" primitive="doAsk"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s">w` +
        `hat&apos;s your name?</input></inputs></block-definition><block-defi` +
        `nition s="answer" type="reporter" category="sensing" selector="repor` +
        `tLastAnswer" primitive="reportLastAnswer"><header></header><code></c` +
        `ode><translations></translations><inputs></inputs></block-definition` +
        `><block-definition s="answer" type="reporter" category="sensing" sel` +
        `ector="getLastAnswer" primitive="getLastAnswer"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="mouse position" type="reporter" category` +
        `="sensing" selector="reportMousePosition"><header></header><code></c` +
        `ode><translations></translations><inputs></inputs><script><block s="` +
        `doReport"><block s="reportNewList"><list><block s="reportMouseX"></b` +
        `lock><block s="reportMouseY"></block></list></block></block></script` +
        `></block-definition><block-definition s="mouse x" type="reporter" ca` +
        `tegory="sensing" selector="reportMouseX" primitive="reportMouseX"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="mouse y" type="reporte` +
        `r" category="sensing" selector="reportMouseY" primitive="reportMouse` +
        `Y"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="mouse down?" type` +
        `="predicate" category="sensing" selector="reportMouseDown" primitive` +
        `="reportMouseDown"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs></block-definition><block-definition s="k` +
        `ey %#1 pressed?" type="predicate" category="sensing" selector="repor` +
        `tKeyPressed" primitive="reportKeyPressed"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true">space<options>§_keysMenu</options></input></inputs></block-def` +
        `inition><block-definition s="%#1 to %#2" type="reporter" category="s` +
        `ensing" selector="reportRelationTo" primitive="reportRelationTo"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true">distance<options>distance&#xD;direction` +
        `&#xD;ray length</options></input><input type="%s" readonly="true">mo` +
        `use-pointer<options>§_destinationsMenu</options></input></inputs></b` +
        `lock-definition><block-definition s="reset timer" type="command" cat` +
        `egory="sensing" selector="doResetTimer" primitive="doResetTimer"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="timer" type="reporter" ` +
        `category="sensing" selector="reportTimer" primitive="reportTimer"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="timer" type="reporter"` +
        ` category="sensing" selector="getTimer" primitive="getTimer"><header` +
        `></header><code></code><translations></translations><inputs></inputs` +
        `></block-definition><block-definition s="%#1 of %#2" type="reporter"` +
        ` category="sensing" selector="reportAttributeOf" primitive="reportAt` +
        `tributeOf"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true">costume #<options>§_attri` +
        `butesMenu</options></input><input type="%s" readonly="true"><options` +
        `>§_objectsMenu</options></input></inputs></block-definition><block-d` +
        `efinition s="object %&apos;name&apos;" type="reporter" category="sen` +
        `sing" selector="reportObject"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true">myself` +
        `<options>§_objectsMenuWithSelf</options></input></inputs><script><bl` +
        `ock s="doReport"><block s="reportHyperZip"><block s="reifyReporter">` +
        `<autolambda><block s="reportFindFirst"><block s="reifyPredicate"><au` +
        `tolambda><block s="reportVariadicEquals"><list><block var="id"/><blo` +
        `ck s="reportAskFor"><l></l><block s="reifyReporter"><autolambda><blo` +
        `ck s="reportGet"><l><option>name</option></l></block></autolambda><l` +
        `ist></list></block><list></list></block></list></block></autolambda>` +
        `<list></list></block><block s="reportConcatenatedLists"><list><block` +
        ` s="reportAskFor"><block s="reportGet"><l><option>stage</option></l>` +
        `</block><block s="reifyReporter"><autolambda><block s="reportGet"><l` +
        `><option>other sprites</option></l></block></autolambda><list></list` +
        `></block><list></list></block><block s="reportNewList"><list><block ` +
        `s="reportGet"><l><option>stage</option></l></block></list></block></` +
        `list></block></block></autolambda><list><l>id</l></list></block><blo` +
        `ck var="name"/><l>0</l><l></l><l>0</l></block></block></script></blo` +
        `ck-definition><block-definition s="url %#1" type="reporter" category` +
        `="sensing" selector="reportURL" primitive="reportURL"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `">snap.berkeley.edu</input></inputs></block-definition><block-defini` +
        `tion s="set %#1 to %#2" type="command" category="sensing" selector="` +
        `doSetGlobalFlag" primitive="doSetGlobalFlag"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">video capture<options>turbo mode&#xD;c` +
        `ase sensitivity&#xD;flat line ends&#xD;log pen vectors&#xD;video cap` +
        `ture&#xD;mirror video</options></input><input type="%b" readonly="tr` +
        `ue"></input></inputs></block-definition><block-definition s="is %#1 ` +
        `on?" type="predicate" category="sensing" selector="reportGlobalFlag"` +
        ` primitive="reportGlobalFlag"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">turbo mode<options>turbo mode&#xD;case sensitivity&#x` +
        `D;flat line ends&#xD;log pen vectors&#xD;video capture&#xD;mirror vi` +
        `deo</options></input></inputs></block-definition><block-definition s` +
        `="current %#1" type="reporter" category="sensing" selector="reportDa` +
        `te" primitive="reportDate"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">date<options>year&#xD;month&#xD;date&#xD;day of week&#xD` +
        `;hour&#xD;minute&#xD;second&#xD;time in milliseconds</options></inpu` +
        `t></inputs></block-definition><block-definition s="my %#1" type="rep` +
        `orter" category="sensing" selector="reportGet" primitive="reportGet"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true" irreplaceable="true">neighbors<opti` +
        `ons>§_gettablesMenu</options></input></inputs></block-definition><bl` +
        `ock-definition s="microphone %#1" type="reporter" category="sensing"` +
        ` selector="reportAudio" primitive="reportAudio"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true" irreplaceable="true">volume<options>§_audioMenu</options` +
        `></input></inputs></block-definition><block-definition s="%#1" type=` +
        `"reporter" category="operators" selector="reportVariadicSum" primiti` +
        `ve="reportVariadicSum"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%mult%n" readonly="true" separato` +
        `r="+" collapse="sum" initial="2"></input></inputs></block-definition` +
        `><block-definition s="%#1 − %#2" type="reporter" category="operators` +
        `" selector="reportDifference" primitive="reportDifference"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n"></input><input type="%n"></input></inputs></block-definition>` +
        `<block-definition s="%#1" type="reporter" category="operators" selec` +
        `tor="reportVariadicProduct" primitive="reportVariadicProduct"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%mult%n" readonly="true" separator="×" collapse="product" init` +
        `ial="2"></input></inputs></block-definition><block-definition s="%#1` +
        ` / %#2" type="reporter" category="operators" selector="reportQuotien` +
        `t" primitive="reportQuotient"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n"></input><input type="%` +
        `n"></input></inputs></block-definition><block-definition s="round %#` +
        `1" type="reporter" category="operators" selector="reportRound" primi` +
        `tive="reportRound"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%n"></input></inputs></block-definiti` +
        `on><block-definition s="%#1 of %#2" type="reporter" category="operat` +
        `ors" selector="reportMonadic" primitive="reportMonadic"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true" irreplaceable="true">sqrt<options>abs&#xD;neg&#x` +
        `D;sign&#xD;ceiling&#xD;floor&#xD;sqrt&#xD;sin&#xD;cos&#xD;tan&#xD;as` +
        `in&#xD;acos&#xD;atan&#xD;ln&#xD;log&#xD;lg&#xD;e^&#xD;10^&#xD;2^&#xD` +
        `;id</options></input><input type="%n">10</input></inputs></block-def` +
        `inition><block-definition s="%#1 ^ %#2" type="reporter" category="op` +
        `erators" selector="reportPower" primitive="reportPower"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n"></input><input type="%n"></input></inputs></block-definition><bl` +
        `ock-definition s="%#1 mod %#2" type="reporter" category="operators" ` +
        `selector="reportModulus" primitive="reportModulus"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%n"><` +
        `/input><input type="%n"></input></inputs></block-definition><block-d` +
        `efinition s="atan2 %#1 ÷ %#2" type="reporter" category="operators" s` +
        `elector="reportAtan2" primitive="reportAtan2"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n"></inpu` +
        `t><input type="%n"></input></inputs></block-definition><block-defini` +
        `tion s="%#1" type="reporter" category="operators" selector="reportVa` +
        `riadicMin" primitive="reportVariadicMin"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%mult%n" readon` +
        `ly="true" separator="min" collapse="minimum" initial="2"></input></i` +
        `nputs></block-definition><block-definition s="%#1" type="reporter" c` +
        `ategory="operators" selector="reportVariadicMax" primitive="reportVa` +
        `riadicMax"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%mult%n" readonly="true" separator="max" coll` +
        `apse="maximum" initial="2"></input></inputs></block-definition><bloc` +
        `k-definition s="pick random %#1 to %#2" type="reporter" category="op` +
        `erators" selector="reportRandom" primitive="reportRandom"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%n">1</input><input type="%n">10</input></inputs></block-definitio` +
        `n><block-definition s="%#1" type="predicate" category="operators" se` +
        `lector="reportVariadicEquals" primitive="reportVariadicEquals"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%mult%s" readonly="true" separator="=" collapse="all =" initi` +
        `al="2"></input></inputs></block-definition><block-definition s="%#1"` +
        ` type="predicate" category="operators" selector="reportVariadicNotEq` +
        `uals" primitive="reportVariadicNotEquals"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%mult%s" reado` +
        `nly="true" separator="≠" collapse="neighbors ≠" initial="2"></input>` +
        `</inputs></block-definition><block-definition s="%#1" type="predicat` +
        `e" category="operators" selector="reportVariadicLessThan" primitive=` +
        `"reportVariadicLessThan"><header></header><code></code><translations` +
        `></translations><inputs><input type="%mult%s" readonly="true" separa` +
        `tor="&lt;" collapse="all &lt;" initial="2"></input></inputs></block-` +
        `definition><block-definition s="%#1" type="predicate" category="oper` +
        `ators" selector="reportVariadicLessThanOrEquals" primitive="reportVa` +
        `riadicLessThanOrEquals"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%mult%s" readonly="true" separat` +
        `or="≤" collapse="all ≤" initial="2"></input></inputs></block-definit` +
        `ion><block-definition s="%#1" type="predicate" category="operators" ` +
        `selector="reportVariadicGreaterThan" primitive="reportVariadicGreate` +
        `rThan"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true" separator="&gt;" collaps` +
        `e="all &gt;" initial="2"></input></inputs></block-definition><block-` +
        `definition s="%#1" type="predicate" category="operators" selector="r` +
        `eportVariadicGreaterThanOrEquals" primitive="reportVariadicGreaterTh` +
        `anOrEquals"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%s" readonly="true" separator="≥" colla` +
        `pse="all ≥" initial="2"></input></inputs></block-definition><block-d` +
        `efinition s="%#1" type="predicate" category="operators" selector="re` +
        `portVariadicAnd" primitive="reportVariadicAnd"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%b" ` +
        `readonly="true" separator="and" collapse="all" initial="2"></input><` +
        `/inputs></block-definition><block-definition s="%#1" type="predicate` +
        `" category="operators" selector="reportVariadicOr" primitive="report` +
        `VariadicOr"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%b" readonly="true" separator="or" coll` +
        `apse="any" initial="2"></input></inputs></block-definition><block-de` +
        `finition s="not %&apos;bool&apos;" type="predicate" category="operat` +
        `ors" selector="reportNot"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%b" readonly="true"></input></` +
        `inputs><script><block s="doReport"><block s="reportIfElse"><block va` +
        `r="bool"/><block s="reportBoolean"><l><bool>false</bool></l></block>` +
        `<block s="reportBoolean"><l><bool>true</bool></l></block></block></b` +
        `lock></script></block-definition><block-definition s="%#1" type="pre` +
        `dicate" category="operators" selector="reportBoolean" primitive="rep` +
        `ortBoolean"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%b" readonly="true" irreplaceable="true">tru` +
        `e</input></inputs></block-definition><block-definition s="%#1" type=` +
        `"predicate" category="operators" selector="reportFalse" primitive="r` +
        `eportFalse"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%b" readonly="true" irreplaceable="true">fal` +
        `se</input></inputs></block-definition><block-definition s="join %#1"` +
        ` type="reporter" category="operators" selector="reportJoinWords" pri` +
        `mitive="reportJoinWords"><header></header><code></code><translations` +
        `></translations><inputs><input type="%mult%s" readonly="true" initia` +
        `l="2">hello </input></inputs></block-definition><block-definition s=` +
        `"letter %&apos;idx&apos; of %&apos;text&apos;" type="reporter" categ` +
        `ory="operators" selector="reportLetter"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1<options>1=` +
        `1&#xD;last&#xD;random</options></input><input type="%s">world</input` +
        `></inputs><script><block s="doReport"><block s="reportHyperZip"><blo` +
        `ck s="reifyReporter"><autolambda><block s="reportListItem"><l></l><b` +
        `lock s="reportTextSplit"><l></l><l><option>letter</option></l></bloc` +
        `k></block></autolambda><list></list></block><block var="idx"/><l>0</` +
        `l><block var="text"/><l>0</l></block></block></script></block-defini` +
        `tion><block-definition s="length of %#1" type="reporter" category="o` +
        `perators" selector="reportStringSize" primitive="reportStringSize"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s">world</input></inputs></block-definition><block-defin` +
        `ition s="%#1 of text %#2" type="reporter" category="operators" selec` +
        `tor="reportTextAttribute" primitive="reportTextAttribute"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true">length<options>length&#xD` +
        `;lower case&#xD;upper case</options></input><input type="%s">world</` +
        `input></inputs></block-definition><block-definition s="unicode of %#` +
        `1" type="reporter" category="operators" selector="reportUnicode" pri` +
        `mitive="reportUnicode"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s">a</input></inputs></block-def` +
        `inition><block-definition s="unicode %#1 as letter" type="reporter" ` +
        `category="operators" selector="reportUnicodeAsLetter" primitive="rep` +
        `ortUnicodeAsLetter"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">65</input></inputs></block-defin` +
        `ition><block-definition s="is %#1 a %#2 ?" type="predicate" category` +
        `="operators" selector="reportIsA" primitive="reportIsA"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s">5</input><input type="%s" readonly="true" irreplaceable="true">n` +
        `umber<options>§_typesMenu</options></input></inputs></block-definiti` +
        `on><block-definition s="is %#1 ?" type="predicate" category="operato` +
        `rs" selector="reportVariadicIsIdentical" primitive="reportVariadicIs` +
        `Identical"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%mult%s" readonly="true" separator="identical` +
        ` to" collapse="all identical" initial="2"></input></inputs></block-d` +
        `efinition><block-definition s="split %#1 by %#2" type="reporter" cat` +
        `egory="operators" selector="reportTextSplit" primitive="reportTextSp` +
        `lit"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s">hello world</input><input type="%s"> <options>l` +
        `etter&#xD;word&#xD;line&#xD;tab&#xD;cr&#xD;csv&#xD;json&#xD;&#126;&#` +
        `xD;blocks</options></input></inputs></block-definition><block-defini` +
        `tion s="JavaScript function ( %#1 ) { %#2 }" type="reporter" categor` +
        `y="operators" selector="reportJSFunction" primitive="reportJSFunctio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s><input type="%mult%s" readonly="true"></input><input type="%mlt"><` +
        `/input></inputs></block-definition><block-definition s="type of %#1"` +
        ` type="reporter" category="operators" selector="reportTypeOf" primit` +
        `ive="reportTypeOf"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s">5</input></inputs></block-definit` +
        `ion><block-definition s="%#1 of %#2" type="reporter" category="opera` +
        `tors" selector="reportTextFunction" primitive="reportTextFunction"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">encode URI<optio` +
        `ns>encode URI&#xD;decode URI&#xD;encode URI component&#xD;decode URI` +
        ` component&#xD;XML escape&#xD;XML unescape&#xD;JS escape&#xD;hex sha` +
        `512 hash</options></input><input type="%s">Abelson &amp; Sussman</in` +
        `put></inputs></block-definition><block-definition s="compile %#1 for` +
        ` %#2 args" type="reporter" category="operators" selector="reportComp` +
        `iled" primitive="reportCompiled"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%repRing" readonly="tru` +
        `e" irreplaceable="true"></input><input type="%n">0</input></inputs><` +
        `/block-definition><block-definition s="set %#1 to %#2" type="command` +
        `" category="variables" selector="doSetVar" primitive="doSetVar"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true" irreplaceable="true"><options>§_getVarNa` +
        `mesDict</options></input><input type="%s">0</input></inputs></block-` +
        `definition><block-definition s="change %#1 by %#2" type="command" ca` +
        `tegory="variables" selector="doChangeVar" primitive="doChangeVar"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true"><options>§_getVar` +
        `NamesDict</options></input><input type="%n">1</input></inputs></bloc` +
        `k-definition><block-definition s="show variable %#1" type="command" ` +
        `category="variables" selector="doShowVar" primitive="doShowVar"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true" irreplaceable="true"><options>§_getVarNa` +
        `mesDict</options></input></inputs></block-definition><block-definiti` +
        `on s="hide variable %#1" type="command" category="variables" selecto` +
        `r="doHideVar" primitive="doHideVar"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true" ` +
        `irreplaceable="true"><options>§_getVarNamesDict</options></input></i` +
        `nputs></block-definition><block-definition s="script variables %#1" ` +
        `type="command" category="other" selector="doDeclareVariables" primit` +
        `ive="doDeclareVariables"><header></header><code></code><translations` +
        `></translations><inputs><input type="%scriptVars" readonly="true" ir` +
        `replaceable="true" initial="1" min="1"></input></inputs></block-defi` +
        `nition><block-definition s="inherit %#1" type="command" category="va` +
        `riables" selector="doDeleteAttr" primitive="doDeleteAttr"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true"><options>§_shadowedVariablesMenu</options></in` +
        `put></inputs></block-definition><block-definition s="list %&apos;inp` +
        `uts&apos;" type="reporter" category="lists" selector="reportNewList"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%s" readonly="true" irreplaceable="true" initial="` +
        `1"></input></inputs><script><block s="doReport"><block var="inputs"/` +
        `></block></script></block-definition><block-definition s="%#1 in fro` +
        `nt of %#2" type="reporter" category="lists" selector="reportCONS" pr` +
        `imitive="reportCONS"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s"></input><input type="%l" readon` +
        `ly="true"></input></inputs></block-definition><block-definition s="i` +
        `tem %#1 of %#2" type="reporter" category="lists" selector="reportLis` +
        `tItem" primitive="reportListItem"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">1<options>1=1&#xD;` +
        `last&#xD;random</options></input><input type="%l" readonly="true"></` +
        `input></inputs></block-definition><block-definition s="all but first` +
        ` of %#1" type="reporter" category="lists" selector="reportCDR" primi` +
        `tive="reportCDR"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%l" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="length of %#1" type="reporter"` +
        ` category="lists" selector="reportListLength" primitive="reportListL` +
        `ength"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%l" readonly="true"></input></inputs></block-defi` +
        `nition><block-definition s="%#1 of %#2" type="reporter" category="li` +
        `sts" selector="reportListAttribute" primitive="reportListAttribute">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true" irreplaceable="true">length<options>` +
        `length&#xD;rank&#xD;dimensions&#xD;flatten&#xD;columns&#xD;uniques&#` +
        `xD;distribution&#xD;sorted&#xD;shuffled&#xD;reverse&#xD;&#126;&#xD;l` +
        `ines&#xD;csv&#xD;json</options></input><input type="%l" readonly="tr` +
        `ue"></input></inputs></block-definition><block-definition s="%&apos;` +
        `data&apos; contains %&apos;value&apos;" type="predicate" category="l` +
        `ists" selector="reportListContainsItem"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%l" readonly="tr` +
        `ue"></input><input type="%s">thing</input></inputs><script><block s=` +
        `"doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="reportLi` +
        `stAttribute"><l><option>length</option></l><block var="data"/></bloc` +
        `k><script><block s="doIf"><block s="reportVariadicEquals"><list><blo` +
        `ck s="reportListItem"><block var="i"/><block var="data"/></block><bl` +
        `ock var="value"/></list></block><script><block s="doReport"><block s` +
        `="reportBoolean"><l><bool>true</bool></l></block></block></script><l` +
        `ist></list></block></script></block></script></block><block s="doRep` +
        `ort"><block s="reportBoolean"><l><bool>false</bool></l></block></blo` +
        `ck></script></block-definition><block-definition s="is %&apos;data&a` +
        `pos; empty?" type="predicate" category="lists" selector="reportListI` +
        `sEmpty"><header></header><code></code><translations></translations><` +
        `inputs><input type="%l" readonly="true"></input></inputs><script><bl` +
        `ock s="doReport"><block s="reportVariadicEquals"><list><block var="d` +
        `ata"/><block s="reportNewList"><list></list></block></list></block><` +
        `/block></script></block-definition><block-definition s="index of %&a` +
        `pos;value&apos; in %&apos;data&apos;" type="reporter" category="list` +
        `s" selector="reportListIndex"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s">thing</input><input ty` +
        `pe="%l" readonly="true"></input></inputs><script><block s="doWarp"><` +
        `script><block s="doFor"><l>i</l><l>1</l><block s="reportListAttribut` +
        `e"><l><option>length</option></l><block var="data"/></block><script>` +
        `<block s="doIf"><block s="reportVariadicEquals"><list><block s="repo` +
        `rtListItem"><block var="i"/><block var="data"/></block><block var="v` +
        `alue"/></list></block><script><block s="doReport"><block var="i"/></` +
        `block></script><list></list></block></script></block></script></bloc` +
        `k><block s="doReport"><l>0</l></block></script></block-definition><b` +
        `lock-definition s="add %#1 to %#2" type="command" category="lists" s` +
        `elector="doAddToList" primitive="doAddToList"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s">thing<` +
        `/input><input type="%l" readonly="true"></input></inputs></block-def` +
        `inition><block-definition s="delete %#1 of %#2" type="command" categ` +
        `ory="lists" selector="doDeleteFromList" primitive="doDeleteFromList"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%n">1<options>1=1&#xD;last&#xD;&#126;&#xD;all</options>` +
        `</input><input type="%l" readonly="true"></input></inputs></block-de` +
        `finition><block-definition s="insert %#1 at %#2 of %#3" type="comman` +
        `d" category="lists" selector="doInsertInList" primitive="doInsertInL` +
        `ist"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s">thing</input><input type="%n">1<options>1=1&#xD` +
        `;last&#xD;random</options></input><input type="%l" readonly="true"><` +
        `/input></inputs></block-definition><block-definition s="replace item` +
        ` %#1 of %#2 with %#3" type="command" category="lists" selector="doRe` +
        `placeInList" primitive="doReplaceInList"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n">1<options>1` +
        `=1&#xD;last&#xD;random</options></input><input type="%l" readonly="t` +
        `rue"></input><input type="%s">thing</input></inputs></block-definiti` +
        `on><block-definition s="numbers from %&apos;start&apos; to %&apos;en` +
        `d&apos;" type="reporter" category="lists" selector="reportNumbers"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">1</input><input type="%n">10</input></inputs><script>` +
        `<block s="doReport"><block s="reportHyperZip"><block s="reifyReporte` +
        `r"><script><block s="doDeclareVariables"><list><l>result</l></list><` +
        `/block><block s="doSetVar"><l>result</l><block s="reportNewList"><li` +
        `st></list></block></block><block s="doWarp"><script><block s="doFor"` +
        `><l>i</l><l></l><l></l><script><block s="doAddToList"><block var="i"` +
        `/><block var="result"/></block></script></block></script></block><bl` +
        `ock s="doReport"><block var="result"/></block></script><list></list>` +
        `</block><block var="start"/><l>0</l><block var="end"/><l>0</l></bloc` +
        `k></block></script></block-definition><block-definition s="append %&` +
        `apos;lists&apos;" type="reporter" category="lists" selector="reportC` +
        `oncatenatedLists"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%mult%l" readonly="true" initial="2"><` +
        `/input></inputs><script><block s="doDeclareVariables"><list><l>resul` +
        `t</l></list></block><block s="doSetVar"><l>result</l><block s="repor` +
        `tNewList"><list></list></block></block><block s="doWarp"><script><bl` +
        `ock s="doForEach"><l>list</l><block var="lists"/><script><block s="d` +
        `oForEach"><l>item</l><block var="list"/><script><block s="doAddToLis` +
        `t"><block var="item"/><block var="result"/></block></script></block>` +
        `</script></block></script></block><block s="doReport"><block var="re` +
        `sult"/></block></script></block-definition><block-definition s="comb` +
        `inations %&apos;lists&apos;" type="reporter" category="lists" select` +
        `or="reportCrossproduct"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%mult%l" readonly="true" initial` +
        `="2"></input></inputs><script><block s="doReport"><block s="reportIf` +
        `Else"><block s="reportListIsEmpty"><block var="lists"/></block><bloc` +
        `k s="reportNewList"><list><block s="reportNewList"><list></list></bl` +
        `ock></list></block><block s="reportConcatenatedLists"><block s="repo` +
        `rtMap"><block s="reifyReporter"><autolambda><block s="reportMap"><bl` +
        `ock s="reifyReporter"><autolambda><block s="reportCONS"><block var="` +
        `first"/><l/></block></autolambda><list></list></block><block s="repo` +
        `rtCrossproduct"><block s="reportCDR"><block var="lists"/></block></b` +
        `lock></block></autolambda><list><l>first</l></list></block><block s=` +
        `"reportListItem"><l>1</l><block var="lists"/></block></block></block` +
        `></block></block></script></block-definition><block-definition s="tr` +
        `anspose %#1" type="reporter" category="lists" selector="reportTransp` +
        `ose" primitive="reportTranspose"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%l" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="reshape %#1 to` +
        ` %#2" type="reporter" category="lists" selector="reportReshape" prim` +
        `itive="reportReshape"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s"></input><input type="%mult%n" ` +
        `readonly="true" initial="2">4,3</input></inputs></block-definition><` +
        `block-definition s="map %&apos;ring&apos; over %&apos;data&apos;" ty` +
        `pe="reporter" category="lists" selector="reportMap"><header></header` +
        `><code></code><translations></translations><inputs><input type="%rep` +
        `Ring" readonly="true" irreplaceable="true"></input><input type="%l" ` +
        `readonly="true"></input></inputs><script><block s="doDeclareVariable` +
        `s"><list><l>result</l><l>implicit?</l></list></block><block s="doSet` +
        `Var"><l>result</l><block s="reportNewList"><list></list></block></bl` +
        `ock><block s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"` +
        `><block s="reportAttributeOf"><l><option>input names</option></l><bl` +
        `ock var="ring"/></block></block></block><block s="doWarp"><script><b` +
        `lock s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><op` +
        `tion>length</option></l><block var="data"/></block><script><block s=` +
        `"doAddToList"><block s="evaluate"><block var="ring"/><block s="repor` +
        `tIfElse"><block var="implicit?"/><block s="reportNewList"><list><blo` +
        `ck s="reportListItem"><block var="i"/><block var="data"/></block></l` +
        `ist></block><block s="reportNewList"><list><block s="reportListItem"` +
        `><block var="i"/><block var="data"/></block><block var="i"/><block v` +
        `ar="data"/></list></block></block></block><block var="result"/></blo` +
        `ck></script></block></script></block><block s="doReport"><block var=` +
        `"result"/></block></script></block-definition><block-definition s="$` +
        `blitz map %#1 over %#2" type="reporter" category="lists" selector="r` +
        `eportAtomicMap" primitive="reportAtomicMap"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%repRing" re` +
        `adonly="true" irreplaceable="true"></input><input type="%l" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="kee` +
        `p items %&apos;ring&apos; from %&apos;data&apos;" type="reporter" ca` +
        `tegory="lists" selector="reportKeep"><header></header><code></code><` +
        `translations></translations><inputs><input type="%predRing" readonly` +
        `="true" irreplaceable="true"></input><input type="%l" readonly="true` +
        `"></input></inputs><script><block s="doDeclareVariables"><list><l>re` +
        `sult</l><l>implicit?</l></list></block><block s="doSetVar"><l>result` +
        `</l><block s="reportNewList"><list></list></block></block><block s="` +
        `doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><block s="rep` +
        `ortAttributeOf"><l><option>input names</option></l><block var="ring"` +
        `/></block></block></block><block s="doWarp"><script><block s="doFor"` +
        `><l>i</l><l>1</l><block s="reportListAttribute"><l><option>length</o` +
        `ption></l><block var="data"/></block><script><block s="doIf"><block ` +
        `s="evaluate"><block var="ring"/><block s="reportIfElse"><block var="` +
        `implicit?"/><block s="reportNewList"><list><block s="reportListItem"` +
        `><block var="i"/><block var="data"/></block></list></block><block s=` +
        `"reportNewList"><list><block s="reportListItem"><block var="i"/><blo` +
        `ck var="data"/></block><block var="i"/><block var="data"/></list></b` +
        `lock></block></block><script><block s="doAddToList"><block s="report` +
        `ListItem"><block var="i"/><block var="data"/></block><block var="res` +
        `ult"/></block></script><list></list></block></script></block></scrip` +
        `t></block><block s="doReport"><block var="result"/></block></script>` +
        `</block-definition><block-definition s="$blitz keep items %#1 from %` +
        `#2" type="reporter" category="lists" selector="reportAtomicKeep" pri` +
        `mitive="reportAtomicKeep"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%predRing" readonly="true" irr` +
        `eplaceable="true"></input><input type="%l" readonly="true"></input><` +
        `/inputs></block-definition><block-definition s="find first item %&ap` +
        `os;ring&apos; in %&apos;data&apos;" type="reporter" category="lists"` +
        ` selector="reportFindFirst"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%predRing" readonly="true" i` +
        `rreplaceable="true"></input><input type="%l" readonly="true"></input` +
        `></inputs><script><block s="doDeclareVariables"><list><l>implicit?</` +
        `l></list></block><block s="doSetVar"><l>implicit?</l><block s="repor` +
        `tListIsEmpty"><block s="reportAttributeOf"><l><option>input names</o` +
        `ption></l><block var="ring"/></block></block></block><block s="doWar` +
        `p"><script><block s="doFor"><l>i</l><l>1</l><block s="reportListAttr` +
        `ibute"><l><option>length</option></l><block var="data"/></block><scr` +
        `ipt><block s="doIf"><block s="evaluate"><block var="ring"/><block s=` +
        `"reportIfElse"><block var="implicit?"/><block s="reportNewList"><lis` +
        `t><block s="reportListItem"><block var="i"/><block var="data"/></blo` +
        `ck></list></block><block s="reportNewList"><list><block s="reportLis` +
        `tItem"><block var="i"/><block var="data"/></block><block var="i"/><b` +
        `lock var="data"/></list></block></block></block><script><block s="do` +
        `Report"><block s="reportListItem"><block var="i"/><block var="data"/` +
        `></block></block></script><list></list></block></script></block></sc` +
        `ript></block><block s="doReport"><l></l></block></script></block-def` +
        `inition><block-definition s="$blitz find first item %#1 in %#2" type` +
        `="reporter" category="lists" selector="reportAtomicFindFirst" primit` +
        `ive="reportAtomicFindFirst"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%predRing" readonly="true" i` +
        `rreplaceable="true"></input><input type="%l" readonly="true"></input` +
        `></inputs></block-definition><block-definition s="combine %&apos;dat` +
        `a&apos; using %&apos;ring&apos;" type="reporter" category="lists" se` +
        `lector="reportCombine"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%l" readonly="true"></input><inpu` +
        `t type="%repRing" readonly="true" irreplaceable="true"></input></inp` +
        `uts><script><block s="doIf"><block s="reportListIsEmpty"><block var=` +
        `"data"/></block><script><block s="doReport"><l>0</l></block></script` +
        `><list><block s="reportVariadicEquals"><list><block s="reportListAtt` +
        `ribute"><l><option>length</option></l><block var="data"/></block><l>` +
        `1</l></list></block><script><block s="doReport"><block s="reportList` +
        `Item"><l>1</l><block var="data"/></block></block></script></list></b` +
        `lock><block s="doReport"><block s="evaluate"><block var="ring"/><lis` +
        `t><block s="reportListItem"><l>1</l><block var="data"/></block><bloc` +
        `k s="evaluate"><block s="reportEnvironment"><l><option>script</optio` +
        `n></l></block><list><block s="reportCDR"><block var="data"/></block>` +
        `<block var="ring"/></list></block></list></block></block></script></` +
        `block-definition><block-definition s="$blitz combine %#1 using %#2" ` +
        `type="reporter" category="lists" selector="reportAtomicCombine" prim` +
        `itive="reportAtomicCombine"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%l" readonly="true"></input>` +
        `<input type="%repRing" readonly="true" irreplaceable="true"></input>` +
        `</inputs></block-definition><block-definition s="for each %&apos;ite` +
        `m&apos; in %&apos;data&apos; %&apos;action&apos;" type="command" cat` +
        `egory="lists" selector="doForEach"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%upvar" readonly="tru` +
        `e" irreplaceable="true">item</input><input type="%l" readonly="true"` +
        `></input><input type="%loop" readonly="true" irreplaceable="true"></` +
        `input></inputs><script><block s="doReport"><block s="reportMap"><blo` +
        `ck s="reifyReporter"><script><block s="doSetVar"><l>item</l><l></l><` +
        `/block><block s="doRun"><block var="action"/><list></list></block><b` +
        `lock s="doReport"><l>0</l></block></script><list></list></block><blo` +
        `ck var="data"/></block></block></script></block-definition><block-de` +
        `finition s="show table %#1" type="command" category="lists" selector` +
        `="doShowTable" primitive="doShowTable"><header></header><code></code` +
        `><translations></translations><inputs><input type="%l" readonly="tru` +
        `e"></input></inputs></block-definition><block-definition s="map %#1 ` +
        `to %#2 %#3" type="command" category="other" selector="doMapCodeOrHea` +
        `der" primitive="doMapCodeOrHeader"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%cmdRing" readonly="t` +
        `rue"></input><input type="%s" readonly="true">code<options>code&#xD;` +
        `header</options></input><input type="%mlt"></input></inputs></block-` +
        `definition><block-definition s="map %#1 to code %#2" type="command" ` +
        `category="other" selector="doMapValueCode" primitive="doMapValueCode` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true" irreplaceable="true">String<option` +
        `s>String&#xD;Number&#xD;true&#xD;false</options></input><input type=` +
        `"%mlt">&lt;#1&gt;</input></inputs></block-definition><block-definiti` +
        `on s="map %#1 of %#2 to code %#3" type="command" category="other" se` +
        `lector="doMapListCode" primitive="doMapListCode"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true"><options>list&#xD;item&#xD;delimiter</options></input><` +
        `input type="%s" readonly="true"><options>collection&#xD;variables&#x` +
        `D;parameters</options></input><input type="%mlt"></input></inputs></` +
        `block-definition><block-definition s="code of %#1" type="reporter" c` +
        `ategory="other" selector="reportMappedCode" primitive="reportMappedC` +
        `ode"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%cmdRing" readonly="true"></input></inputs></block-` +
        `definition><block-definition s="primitive %#1" type="command" catego` +
        `ry="other" selector="doPrimitive" primitive="doPrimitive"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true"><options>§_primitivesMenu` +
        `</options></input></inputs></block-definition><block-definition s="e` +
        `xtension %#1 %#2" type="command" category="other" selector="doApplyE` +
        `xtension" primitive="doApplyExtension"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e" irreplaceable="true"><options>§_extensionsMenu</options></input><` +
        `input type="%mult%s" readonly="true"></input></inputs></block-defini` +
        `tion><block-definition s="extension %#1 %#2" type="reporter" categor` +
        `y="other" selector="reportApplyExtension" primitive="reportApplyExte` +
        `nsion"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true" irreplaceable="true"><options` +
        `>§_extensionsMenu</options></input><input type="%mult%s" readonly="t` +
        `rue"></input></inputs></block-definition><block-definition s="set vi` +
        `deo transparency to %#1" type="command" category="sensing" selector=` +
        `"doSetVideoTransparency" primitive="doSetVideoTransparency"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">50</input></inputs></block-definition><block-definition s="v` +
        `ideo %#1 on %#2" type="reporter" category="sensing" selector="report` +
        `Video" primitive="reportVideo"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">motion<options>snap&#xD;motion&#xD;direction</option` +
        `s></input><input type="%s" readonly="true">myself<options>§_objectsM` +
        `enuWithSelf</options></input></inputs></block-definition></primitive` +
        `s></blocks>`,
        this.stage
    );
};
