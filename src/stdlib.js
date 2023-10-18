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

modules.stdlib = '2023-October-18';

function formatLib(lib, width = 80, indent = 8) {
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
        `rimitives><block-definition s="zip %&apos;fun&apos; inputs: $nl %&ap` +
        `os;a&apos; leaf-rank %&apos;a-rank&apos; $nl %&apos;b&apos; leaf-ran` +
        `k %&apos;b-rank&apos;" type="reporter" category="control" selector="` +
        `reportHyperZip"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%repRing" readonly="true" irreplaceable=` +
        `"true"></input><input type="%s"></input><input type="%n"></input><in` +
        `put type="%s"></input><input type="%n"></input><input type="%repRing` +
        `" readonly="true" irreplaceable="true"></input><input type="%s"></in` +
        `put><input type="%n"></input><input type="%s"></input><input type="%` +
        `n"></input><input type="%n"></input></inputs><script><block s="doIfE` +
        `lse"><block s="reportVariadicGreaterThan"><list><block s="reportList` +
        `Attribute"><l><option>rank</option></l><block var="a"/></block><bloc` +
        `k var="a-rank"/></list></block><script><block s="doIfElse"><block s=` +
        `"reportVariadicGreaterThan"><list><block s="reportListAttribute"><l>` +
        `<option>rank</option></l><block var="b"/></block><block var="b-rank"` +
        `/></list></block><script><block s="doReport"><block s="reportMap"><b` +
        `lock s="reifyReporter"><autolambda><block s="reportHyperZip"><block ` +
        `var="fun"/><block s="reportListItem"><l></l><block var="a"/></block>` +
        `<block var="a-rank"/><block s="reportListItem"><l></l><block var="b"` +
        `/></block><block var="b-rank"/></block></autolambda><list></list></b` +
        `lock><block s="reportNumbers"><l>1</l><block s="reportVariadicMin"><` +
        `list><block s="reportListAttribute"><l><option>length</option></l><b` +
        `lock var="a"/></block><block s="reportListAttribute"><l><option>leng` +
        `th</option></l><block var="b"/></block></list></block></block></bloc` +
        `k></block></script><script><block s="doReport"><block s="reportMap">` +
        `<block s="reifyReporter"><autolambda><block s="reportHyperZip"><bloc` +
        `k var="fun"/><l></l><block var="a-rank"/><block var="b"/><block var=` +
        `"b-rank"/></block></autolambda><list></list></block><block var="a"/>` +
        `</block></block></script></block></script><script><block s="doIfElse` +
        `"><block s="reportVariadicGreaterThan"><list><block s="reportListAtt` +
        `ribute"><l><option>rank</option></l><block var="b"/></block><block v` +
        `ar="b-rank"/></list></block><script><block s="doReport"><block s="re` +
        `portMap"><block s="reifyReporter"><autolambda><block s="reportHyperZ` +
        `ip"><block var="fun"/><block var="a"/><block var="a-rank"/><l></l><b` +
        `lock var="b-rank"/></block></autolambda><list></list></block><block ` +
        `var="b"/></block></block></script><script><block s="doReport"><block` +
        ` s="evaluate"><block var="fun"/><list><block var="a"/><block var="b"` +
        `/></list></block></block></script></block></script></block></script>` +
        `</block-definition><block-definition s="move %&apos;steps&apos; step` +
        `s" type="command" category="motion" selector="forward"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `n">10</input><input type="%n">10</input><input type="%n">10</input><` +
        `/inputs><script><block s="doGotoObject"><block s="reportVariadicSum"` +
        `><list><block s="getPosition"></block><block s="reportVariadicProduc` +
        `t"><list><block s="reportNewList"><list><block s="reportMonadic"><l>` +
        `<option>sin</option></l><block s="direction"></block></block><block ` +
        `s="reportMonadic"><l><option>cos</option></l><block s="direction"></` +
        `block></block></list></block><block var="steps"/></list></block></li` +
        `st></block></block></script></block-definition><block-definition s="` +
        `turn $clockwise %&apos;angle&apos; degrees" type="command" category=` +
        `"motion" selector="turn"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n">15</input><input type="%n">` +
        `15</input><input type="%n">15</input></inputs><script><block s="setH` +
        `eading"><block s="reportVariadicSum"><list><block s="direction"></bl` +
        `ock><block var="angle"/></list></block></block></script></block-defi` +
        `nition><block-definition s="turn $counterclockwise %&apos;angle&apos` +
        `; degrees" type="command" category="motion" selector="turnLeft"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">15</input><input type="%n">15</input><input type="%n">15` +
        `</input></inputs><script><block s="setHeading"><block s="reportDiffe` +
        `rence"><block s="direction"></block><block var="angle"/></block></bl` +
        `ock></script></block-definition><block-definition s="point in direct` +
        `ion %&apos;angle&apos;" type="command" category="motion" selector="s` +
        `etHeading"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">90<options>§_dir=&#xD;(90) right=90&#xD;(` +
        `-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$_random</o` +
        `ptions></input><input type="%n">90<options>§_dir=&#xD;(90) right=90&` +
        `#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$_rand` +
        `om</options></input><input type="%n">90<options>§_dir=&#xD;(90) righ` +
        `t=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</` +
        `options></input></inputs><script><block s="doFaceTowards"><block s="` +
        `reportVariadicSum"><list><block s="getPosition"></block><block s="re` +
        `portNewList"><list><block s="reportMonadic"><l><option>sin</option><` +
        `/l><block var="angle"/></block><block s="reportMonadic"><l><option>c` +
        `os</option></l><block var="angle"/></block></list></block></list></b` +
        `lock></block></script></block-definition><block-definition s="point ` +
        `towards %#1" type="command" category="motion" selector="doFaceToward` +
        `s" primitive="doFaceTowards"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true">$_mouse` +
        `-pointer<options>§_destinationsMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="go to x: %&apos;x&apos; y: %&apos;` +
        `y&apos;" type="command" category="motion" selector="gotoXY"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">0</input><input type="%n">0</input><input type="%n">0</input` +
        `><input type="%n">0</input><input type="%n">0</input></inputs><scrip` +
        `t><block s="doGotoObject"><block s="reportNewList"><list><block var=` +
        `"x"/><block var="y"/></list></block></block></script></block-definit` +
        `ion><block-definition s="go to %#1" type="command" category="motion"` +
        ` selector="doGotoObject" primitive="doGotoObject"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true">$_random position<options>§_destinationsMenu</options>` +
        `</input></inputs></block-definition><block-definition s="glide %&apo` +
        `s;span&apos; secs to x: %&apos;x&apos; y: %&apos;y&apos;" type="comm` +
        `and" category="motion" selector="doGlide"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">1</input><` +
        `input type="%n">0</input><input type="%n">0</input><input type="%n">` +
        `1</input><input type="%n">0</input><input type="%n">0</input><input ` +
        `type="%n">1</input></inputs><script><block s="doDeclareVariables"><l` +
        `ist><l>pos</l><l>start</l><l>fract</l></list></block><block s="doSet` +
        `Var"><l>pos</l><block s="getPosition"></block></block><block s="doSe` +
        `tVar"><l>start</l><block s="reportDate"><l><option>time in milliseco` +
        `nds</option></l></block></block><block s="doUntil"><block s="reportV` +
        `ariadicGreaterThanOrEquals"><list><block var="fract"/><l>1</l></list` +
        `></block><script><block s="doSetVar"><l>fract</l><block s="reportQuo` +
        `tient"><block s="reportDifference"><block s="reportDate"><l><option>` +
        `time in milliseconds</option></l></block><block var="start"/></block` +
        `><block s="reportVariadicProduct"><list><block var="span"/><l>1000</` +
        `l></list></block></block></block><block s="doGotoObject"><block s="r` +
        `eportVariadicSum"><list><block var="pos"/><block s="reportVariadicPr` +
        `oduct"><list><block s="reportDifference"><block s="reportNewList"><l` +
        `ist><block var="x"/><block var="y"/></list></block><block var="pos"/` +
        `></block><block var="fract"/></list></block></list></block></block><` +
        `/script></block><block s="gotoXY"><block var="x"/><block var="y"/></` +
        `block></script></block-definition><block-definition s="change x by %` +
        `&apos;delta&apos;" type="command" category="motion" selector="change` +
        `XPosition"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">10</input><input type="%n">10</input><inp` +
        `ut type="%n">10</input></inputs><script><block s="setXPosition"><blo` +
        `ck s="reportVariadicSum"><list><block s="xPosition"></block><block v` +
        `ar="delta"/></list></block></block></script></block-definition><bloc` +
        `k-definition s="set x to %&apos;x&apos;" type="command" category="mo` +
        `tion" selector="setXPosition"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">0</input><input type="` +
        `%n">0</input><input type="%n">0</input></inputs><script><block s="do` +
        `GotoObject"><block s="reportNewList"><list><block var="x"/><block s=` +
        `"yPosition"></block></list></block></block></script></block-definiti` +
        `on><block-definition s="change y by %&apos;delta&apos;" type="comman` +
        `d" category="motion" selector="changeYPosition"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">10</` +
        `input><input type="%n">10</input><input type="%n">10</input></inputs` +
        `><script><block s="setYPosition"><block s="reportVariadicSum"><list>` +
        `<block s="yPosition"></block><block var="delta"/></list></block></bl` +
        `ock></script></block-definition><block-definition s="set y to %&apos` +
        `;y&apos;" type="command" category="motion" selector="setYPosition"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">0</input><input type="%n">0</input><input type="%n">0` +
        `</input></inputs><script><block s="doGotoObject"><block s="reportNew` +
        `List"><list><block s="xPosition"></block><block var="y"/></list></bl` +
        `ock></block></script></block-definition><block-definition s="if on e` +
        `dge, bounce" type="command" category="motion" selector="bounceOffEdg` +
        `e"><header></header><code></code><translations></translations><input` +
        `s></inputs><script><block s="doIf"><block s="reportTouchingObject"><` +
        `l><option>edge</option></l></block><script><block s="doDeclareVariab` +
        `les"><list><l>get bounds</l><l>bounds</l><l>center</l><l>stage bound` +
        `s</l><l>dir x</l><l>dir y</l><l>delta x</l><l>delta y</l></list></bl` +
        `ock><block s="doSetVar"><l>get bounds</l><block s="reifyReporter"><a` +
        `utolambda><block s="reportNewList"><list><block s="reportVariadicMin` +
        `"><block s="reportCONS"><block s="reportNewList"><list><block s="rep` +
        `ortGet"><l><option>left</option></l></block><block s="reportGet"><l>` +
        `<option>bottom</option></l></block></list></block><block s="reportMa` +
        `p"><block s="reifyReporter"><autolambda><block s="reportNewList"><li` +
        `st><block s="reportAttributeOf"><l><option>left</option></l><l></l><` +
        `/block><block s="reportAttributeOf"><l><option>bottom</option></l><l` +
        `></l></block></list></block></autolambda><list></list></block><block` +
        ` s="reportGet"><l><option>parts</option></l></block></block></block>` +
        `</block><block s="reportVariadicMax"><block s="reportCONS"><block s=` +
        `"reportNewList"><list><block s="reportGet"><l><option>right</option>` +
        `</l></block><block s="reportGet"><l><option>top</option></l></block>` +
        `</list></block><block s="reportMap"><block s="reifyReporter"><autola` +
        `mbda><block s="reportNewList"><list><block s="reportAttributeOf"><l>` +
        `<option>right</option></l><l></l></block><block s="reportAttributeOf` +
        `"><l><option>top</option></l><l></l></block></list></block></autolam` +
        `bda><list></list></block><block s="reportGet"><l><option>parts</opti` +
        `on></l></block></block></block></block></list></block></autolambda><` +
        `list></list></block></block><block s="doSetVar"><l>bounds</l><block ` +
        `s="evaluate"><block var="get bounds"/><list></list></block></block><` +
        `block s="doSetVar"><l>center</l><block s="reportQuotient"><block s="` +
        `reportVariadicSum"><block var="bounds"/></block><l>2</l></block></bl` +
        `ock><block s="doSetVar"><l>stage bounds</l><block s="reportAskFor"><` +
        `block s="reportGet"><l><option>stage</option></l></block><block s="r` +
        `eifyReporter"><autolambda><block s="reportNewList"><list><block s="r` +
        `eportNewList"><list><block s="reportGet"><l><option>left</option></l` +
        `></block><block s="reportGet"><l><option>bottom</option></l></block>` +
        `</list></block><block s="reportNewList"><list><block s="reportGet"><` +
        `l><option>right</option></l></block><block s="reportGet"><l><option>` +
        `top</option></l></block></list></block></list></block></autolambda><` +
        `list></list></block><list></list></block></block><block s="doSetVar"` +
        `><l>dir x</l><block s="reportMonadic"><l><option>sin</option></l><bl` +
        `ock s="direction"></block></block></block><block s="doSetVar"><l>dir` +
        ` y</l><block s="reportMonadic"><l><option>cos</option></l><block s="` +
        `direction"></block></block></block><block s="doIf"><block s="reportV` +
        `ariadicLessThan"><list><block s="reportListItem"><l>1</l><block s="r` +
        `eportListItem"><l>1</l><block var="bounds"/></block></block><block s` +
        `="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><block v` +
        `ar="stage bounds"/></block></block></list></block><script><block s="` +
        `doSetVar"><l>dir x</l><block s="reportMonadic"><l><option>abs</optio` +
        `n></l><block var="dir x"/></block></block></script><list></list></bl` +
        `ock><block s="doIf"><block s="reportVariadicGreaterThan"><list><bloc` +
        `k s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l><bloc` +
        `k var="bounds"/></block></block><block s="reportListItem"><l>1</l><b` +
        `lock s="reportListItem"><l>2</l><block var="stage bounds"/></block><` +
        `/block></list></block><script><block s="doSetVar"><l>dir x</l><block` +
        ` s="reportMonadic"><l><option>neg</option></l><block s="reportMonadi` +
        `c"><l><option>abs</option></l><block var="dir x"/></block></block></` +
        `block></script><list></list></block><block s="doIf"><block s="report` +
        `VariadicGreaterThan"><list><block s="reportListItem"><l>2</l><block ` +
        `s="reportListItem"><l>2</l><block var="bounds"/></block></block><blo` +
        `ck s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><blo` +
        `ck var="stage bounds"/></block></block></list></block><script><block` +
        ` s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>neg</o` +
        `ption></l><block s="reportMonadic"><l><option>abs</option></l><block` +
        ` var="dir y"/></block></block></block></script><list></list></block>` +
        `<block s="doIf"><block s="reportVariadicLessThan"><list><block s="re` +
        `portListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="` +
        `bounds"/></block></block><block s="reportListItem"><l>2</l><block s=` +
        `"reportListItem"><l>1</l><block var="stage bounds"/></block></block>` +
        `</list></block><script><block s="doSetVar"><l>dir y</l><block s="rep` +
        `ortMonadic"><l><option>abs</option></l><block var="dir y"/></block><` +
        `/block></script><list></list></block><block s="setHeading"><block s=` +
        `"reportAtan2"><block var="dir x"/><block var="dir y"/></block></bloc` +
        `k><block s="doSetVar"><l>bounds</l><block s="evaluate"><block var="g` +
        `et bounds"/><list></list></block></block><block s="doGotoObject"><bl` +
        `ock s="reportVariadicSum"><list><block s="getPosition"></block><bloc` +
        `k s="reportDifference"><block var="center"/><block s="reportQuotient` +
        `"><block s="reportVariadicSum"><block var="bounds"/></block><l>2</l>` +
        `</block></block></list></block></block><block s="doSetVar"><l>bounds` +
        `</l><block s="evaluate"><block var="get bounds"/><list></list></bloc` +
        `k></block><block s="doIf"><block s="reportVariadicGreaterThan"><list` +
        `><block s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l` +
        `><block var="bounds"/></block></block><block s="reportListItem"><l>1` +
        `</l><block s="reportListItem"><l>2</l><block var="stage bounds"/></b` +
        `lock></block></list></block><script><block s="doSetVar"><l>delta x</` +
        `l><block s="reportDifference"><block s="reportListItem"><l>1</l><blo` +
        `ck s="reportListItem"><l>2</l><block var="stage bounds"/></block></b` +
        `lock><block s="reportListItem"><l>1</l><block s="reportListItem"><l>` +
        `2</l><block var="bounds"/></block></block></block></block></script><` +
        `list></list></block><block s="doIf"><block s="reportVariadicLessThan` +
        `"><list><block s="reportListItem"><l>2</l><block s="reportListItem">` +
        `<l>1</l><block var="bounds"/></block></block><block s="reportListIte` +
        `m"><l>2</l><block s="reportListItem"><l>1</l><block var="stage bound` +
        `s"/></block></block></list></block><script><block s="doSetVar"><l>de` +
        `lta y</l><block s="reportDifference"><block s="reportListItem"><l>2<` +
        `/l><block s="reportListItem"><l>1</l><block var="stage bounds"/></bl` +
        `ock></block><block s="reportListItem"><l>2</l><block s="reportListIt` +
        `em"><l>1</l><block var="bounds"/></block></block></block></block></s` +
        `cript><list></list></block><block s="doIf"><block s="reportVariadicL` +
        `essThan"><list><block s="reportListItem"><l>1</l><block s="reportLis` +
        `tItem"><l>1</l><block var="bounds"/></block></block><block s="report` +
        `ListItem"><l>1</l><block s="reportListItem"><l>1</l><block var="stag` +
        `e bounds"/></block></block></list></block><script><block s="doSetVar` +
        `"><l>delta x</l><block s="reportDifference"><block s="reportListItem` +
        `"><l>1</l><block s="reportListItem"><l>1</l><block var="stage bounds` +
        `"/></block></block><block s="reportListItem"><l>1</l><block s="repor` +
        `tListItem"><l>1</l><block var="bounds"/></block></block></block></bl` +
        `ock></script><list></list></block><block s="doIf"><block s="reportVa` +
        `riadicGreaterThan"><list><block s="reportListItem"><l>2</l><block s=` +
        `"reportListItem"><l>2</l><block var="bounds"/></block></block><block` +
        ` s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><block` +
        ` var="stage bounds"/></block></block></list></block><script><block s` +
        `="doSetVar"><l>delta y</l><block s="reportDifference"><block s="repo` +
        `rtListItem"><l>2</l><block s="reportListItem"><l>2</l><block var="st` +
        `age bounds"/></block></block><block s="reportListItem"><l>2</l><bloc` +
        `k s="reportListItem"><l>2</l><block var="bounds"/></block></block></` +
        `block></block></script><list></list></block><block s="doGotoObject">` +
        `<block s="reportVariadicSum"><list><block s="getPosition"></block><b` +
        `lock s="reportNewList"><list><block var="delta x"/><block var="delta` +
        ` y"/></list></block></list></block></block></script><list></list></b` +
        `lock></script></block-definition><block-definition s="position" type` +
        `="reporter" category="motion" selector="getPosition"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs><script` +
        `><block s="doReport"><block s="reportNewList"><list><block s="xPosit` +
        `ion"></block><block s="yPosition"></block></list></block></block></s` +
        `cript></block-definition><block-definition s="x position" type="repo` +
        `rter" category="motion" selector="xPosition" primitive="xPosition"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="y position" type="rep` +
        `orter" category="motion" selector="yPosition" primitive="yPosition">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="direction" type="rep` +
        `orter" category="motion" selector="direction" primitive="direction">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="switch to costume %#` +
        `1" type="command" category="looks" selector="doSwitchToCostume" prim` +
        `itive="doSwitchToCostume"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true"><options>§` +
        `_costumesMenu</options></input></inputs></block-definition><block-de` +
        `finition s="next costume" type="command" category="looks" selector="` +
        `doWearNextCostume"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs><script><block s="doIf"><block s="reportV` +
        `ariadicGreaterThan"><list><block s="getCostumeIdx"></block><l>0</l><` +
        `/list></block><script><block s="doSwitchToCostume"><block s="reportV` +
        `ariadicSum"><list><block s="reportModulus"><block s="getCostumeIdx">` +
        `</block><block s="reportListAttribute"><l><option>length</option></l` +
        `><block s="reportGet"><l><option>costumes</option></l></block></bloc` +
        `k></block><l>1</l></list></block></block></script><list></list></blo` +
        `ck></script></block-definition><block-definition s="costume #" type=` +
        `"reporter" category="looks" selector="getCostumeIdx"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs><script` +
        `><block s="doReport"><block s="reportListIndex"><block s="reportGet"` +
        `><l><option>costume</option></l></block><block s="reportGet"><l><opt` +
        `ion>costumes</option></l></block></block></block></script></block-de` +
        `finition><block-definition s="%#1 of costume %#2" type="reporter" ca` +
        `tegory="looks" selector="reportGetImageAttribute" primitive="reportG` +
        `etImageAttribute"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s" readonly="true" irreplaceable="tru` +
        `e">$_width<options>name=$_name&#xD;width=$_width&#xD;height=$_height` +
        `&#xD;pixels=$_pixels</options></input><input type="%s" readonly="tru` +
        `e">$_current<options>§_costumesMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="new costume %#1 width %#2 height %` +
        `#3" type="reporter" category="looks" selector="reportNewCostume" pri` +
        `mitive="reportNewCostume"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%l" readonly="true"></input><i` +
        `nput type="%n"><options>a List [2 elements]</options></input><input ` +
        `type="%n"><options>a List [2 elements]</options></input></inputs></b` +
        `lock-definition><block-definition s="stretch %#1 x: %#2 y: %#3 %" ty` +
        `pe="reporter" category="looks" selector="reportNewCostumeStretched" ` +
        `primitive="reportNewCostumeStretched"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `">$_current<options>§_costumesMenu</options></input><input type="%n"` +
        `>100</input><input type="%n">50</input></inputs></block-definition><` +
        `block-definition s="skew %#1 to %#2 degrees %#3 %" type="reporter" c` +
        `ategory="looks" selector="reportNewCostumeSkewed" primitive="reportN` +
        `ewCostumeSkewed"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true">$_current<options>§` +
        `_costumesMenu</options></input><input type="%n">0<options>§_dir=&#xD` +
        `;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#x` +
        `D;random=$_random</options></input><input type="%n">50</input></inpu` +
        `ts></block-definition><block-definition s="say %&apos;msg&apos; for ` +
        `%&apos;time&apos; secs" type="command" category="looks" selector="do` +
        `SayFor"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s">Hello!</input><input type="%n">2</input><inp` +
        `ut type="%s">Hello!</input><input type="%n">2</input><input type="%s` +
        `">Hello!</input></inputs><script><block s="bubble"><block var="msg"/` +
        `></block><block s="doWait"><block var="time"/></block><block s="bubb` +
        `le"><l></l></block></script></block-definition><block-definition s="` +
        `say %#1" type="command" category="looks" selector="bubble" primitive` +
        `="bubble"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s">Hello!</input></inputs></block-definition>` +
        `<block-definition s="think %&apos;msg&apos; for %&apos;time&apos; se` +
        `cs" type="command" category="looks" selector="doThinkFor"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s">Hmm...</input><input type="%n">2</input><input type="%s">Hmm..` +
        `.</input><input type="%n">2</input><input type="%s">Hmm...</input></` +
        `inputs><script><block s="doThink"><block var="msg"/></block><block s` +
        `="doWait"><block var="time"/></block><block s="doThink"><l></l></blo` +
        `ck></script></block-definition><block-definition s="think %#1" type=` +
        `"command" category="looks" selector="doThink" primitive="doThink"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s">Hmm...</input></inputs></block-definition><block-defin` +
        `ition s="change %&apos;effect name&apos; effect by %&apos;delta&apos` +
        `;" type="command" category="looks" selector="changeEffect" primitive` +
        `="changeEffect"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true" irreplaceable="true"` +
        `>$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD;brigh` +
        `tness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl` +
        `=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_` +
        `negative</options></input><input type="%n">25</input><input type="%s` +
        `" readonly="true" irreplaceable="true">$_ghost<options>color=$_color` +
        `&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$` +
        `_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixela` +
        `te&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><inp` +
        `ut type="%n">25</input><input type="%s" readonly="true" irreplaceabl` +
        `e="true">ghost<options>color&#xD;saturation&#xD;brightness&#xD;ghost` +
        `&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</options` +
        `></input></inputs></block-definition><block-definition s="set %#1 ef` +
        `fect to %#2" type="command" category="looks" selector="setEffect" pr` +
        `imitive="setEffect"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD;b` +
        `rightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;w` +
        `hirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negativ` +
        `e=$_negative</options></input><input type="%n">0</input></inputs></b` +
        `lock-definition><block-definition s="%#1 effect" type="reporter" cat` +
        `egory="looks" selector="getEffect" primitive="getEffect"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true" irreplaceable="true">$_ghost<options>color=$_co` +
        `lor&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghos` +
        `t=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pix` +
        `elate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><` +
        `/inputs></block-definition><block-definition s="clear graphic effect` +
        `s" type="command" category="looks" selector="clearEffects" primitive` +
        `="clearEffects"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="chan` +
        `ge size by %&apos;delta&apos;" type="command" category="looks" selec` +
        `tor="changeScale"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n">10</input><input type="%n">10</inp` +
        `ut><input type="%n">10</input></inputs><script><block s="setScale"><` +
        `block s="reportVariadicSum"><list><block s="getScale"></block><block` +
        ` var="delta"/></list></block></block></script></block-definition><bl` +
        `ock-definition s="set size to %#1 %" type="command" category="looks"` +
        ` selector="setScale" primitive="setScale"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">100</input` +
        `></inputs></block-definition><block-definition s="size" type="report` +
        `er" category="looks" selector="getScale" primitive="getScale"><heade` +
        `r></header><code></code><translations></translations><inputs></input` +
        `s></block-definition><block-definition s="show" type="command" categ` +
        `ory="looks" selector="show" primitive="show"><header></header><code>` +
        `</code><translations></translations><inputs></inputs></block-definit` +
        `ion><block-definition s="hide" type="command" category="looks" selec` +
        `tor="hide" primitive="hide"><header></header><code></code><translati` +
        `ons></translations><inputs></inputs></block-definition><block-defini` +
        `tion s="shown?" type="predicate" category="looks" selector="reportSh` +
        `own" primitive="reportShown"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs></block-definition><block-defin` +
        `ition s="go to %&apos;name&apos; layer" type="command" category="loo` +
        `ks" selector="goToLayer" primitive="goToLayer"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true" irreplaceable="true">$_front<options>front=$_front&#xD;ba` +
        `ck=$_back</options></input><input type="%s" readonly="true" irreplac` +
        `eable="true">$_front<options>front=$_front&#xD;back=$_back</options>` +
        `</input></inputs><scripts><script x="10" y="97.83333333333331"><bloc` +
        `k s="doIfElse"><block s="reportVariadicEquals"><list><block s="repor` +
        `tJoinWords"><list><block var="name"/></list></block><l>back</l></lis` +
        `t></block><script><block s="doWarp"><script><block s="doUntil"><bloc` +
        `k s="reportVariadicEquals"><list><block s="reportListIndex"><block s` +
        `="reportGet"><l><option>self</option></l></block><block s="reportAsk` +
        `For"><block s="reportGet"><l><option>stage</option></l></block><bloc` +
        `k s="reifyReporter"><autolambda><block s="reportGet"><l><option>othe` +
        `r sprites</option></l></block></autolambda><list></list></block><lis` +
        `t></list></block></block><l>1</l></list></block><script><block s="go` +
        `Back"><l>1</l></block></script></block></script></block></script><sc` +
        `ript><block s="doWarp"><script><block s="doUntil"><block s="reportVa` +
        `riadicEquals"><list><block s="reportListIndex"><block s="reportGet">` +
        `<l><option>self</option></l></block><block s="reportAskFor"><block s` +
        `="reportGet"><l><option>stage</option></l></block><block s="reifyRep` +
        `orter"><autolambda><block s="reportGet"><l><option>other sprites</op` +
        `tion></l></block></autolambda><list></list></block><list></list></bl` +
        `ock></block><block s="reportVariadicSum"><list><block s="reportListA` +
        `ttribute"><l><option>length</option></l><block s="reportGet"><l><opt` +
        `ion>other sprites</option></l></block></block><l>1</l></list></block` +
        `></list></block><script><block s="goBack"><l>-1</l></block></script>` +
        `</block></script></block></script></block></script></scripts></block` +
        `-definition><block-definition s="go back %#1 layers" type="command" ` +
        `category="looks" selector="goBack" primitive="goBack"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">1</input></inputs></block-definition><block-definition s="save %#1` +
        ` as costume named %#2" type="command" category="looks" selector="doS` +
        `creenshot" primitive="doScreenshot"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true">` +
        `$_pen trails<options>pen trails=$_pen trails&#xD;stage image=$_stage` +
        ` image</options></input><input type="%s">screenshot</input></inputs>` +
        `</block-definition><block-definition s="wardrobe" type="reporter" ca` +
        `tegory="looks" selector="reportCostumes" primitive="reportCostumes">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="alert %#1" type="com` +
        `mand" category="looks" selector="alert" primitive="alert"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%mult%s" readonly="true"></input></inputs></block-definition><bloc` +
        `k-definition s="console log %#1" type="command" category="looks" sel` +
        `ector="log" primitive="log"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%mult%s" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="play sound %#1` +
        `" type="command" category="sound" selector="playSound" primitive="pl` +
        `aySound"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true"><options>§_soundsMenu</opti` +
        `ons></input></inputs></block-definition><block-definition s="play so` +
        `und %&apos;target&apos; until done" type="command" category="sound" ` +
        `selector="doPlaySoundUntilDone" primitive="doPlaySoundUntilDone"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true"><options>§_soundsMenu</options></input>` +
        `<input type="%s" readonly="true"><options>§_soundsMenu</options></in` +
        `put><input type="%s" readonly="true"><options>§_soundsMenu</options>` +
        `</input></inputs><script><block s="doDeclareVariables"><list><l>soun` +
        `d</l></list></block><block s="doSetVar"><l>sound</l><block s="report` +
        `IfElse"><block s="reportIsA"><block var="target"/><l><option>sound</` +
        `option></l></block><block var="target"/><block s="reportIfElse"><blo` +
        `ck s="reportIsA"><block var="target"/><l><option>list</option></l></` +
        `block><block s="reportNewSoundFromSamples"><block var="target"/><l>4` +
        `4100</l></block><block s="reportFindFirst"><block s="reifyPredicate"` +
        `><autolambda><block s="reportVariadicEquals"><list><block s="reportG` +
        `etSoundAttribute"><l><option>name</option></l><l></l></block><block ` +
        `var="target"/></list></block></autolambda><list></list></block><bloc` +
        `k s="reportGet"><l><option>sounds</option></l></block></block></bloc` +
        `k></block></block><block s="doIf"><block s="reportIsA"><block var="s` +
        `ound"/><l><option>sound</option></l></block><script><block s="playSo` +
        `und"><block var="sound"/></block><block s="doWait"><block s="reportG` +
        `etSoundAttribute"><l><option>duration</option></l><block var="sound"` +
        `/></block></block></script><list></list></block></script><scripts><s` +
        `cript x="10" y="98"><block s="doDeclareVariables"><list><l>sound</l>` +
        `</list></block><block s="doSetVar"><l>sound</l><block s="reportIfEls` +
        `e"><block s="reportIsA"><block var="target"/><l><option>sound</optio` +
        `n></l></block><block var="target"/><block s="reportIfElse"><block s=` +
        `"reportIsA"><block var="target"/><l><option>list</option></l></block` +
        `><block s="reportNewSoundFromSamples"><block var="target"/><l>44100<` +
        `/l></block><block s="reportFindFirst"><block s="reifyPredicate"><aut` +
        `olambda><block s="reportVariadicEquals"><list><block s="reportGetSou` +
        `ndAttribute"><l><option>name</option></l><l></l></block><block var="` +
        `target"/></list></block></autolambda><list></list></block><block s="` +
        `reportGet"><l><option>sounds</option></l></block></block></block></b` +
        `lock></block><block s="doIf"><block s="reportIsA"><block var="sound"` +
        `/><l><option>sound</option></l></block><script><block s="playSound">` +
        `<block var="sound"/></block><block s="doWait"><block s="reportGetSou` +
        `ndAttribute"><l><option>duration</option></l><block var="sound"/></b` +
        `lock></block></script><list></list></block></script></scripts></bloc` +
        `k-definition><block-definition s="play sound %&apos;target&apos; at ` +
        `%&apos;rate&apos; Hz" type="command" category="sound" selector="doPl` +
        `aySoundAtRate" primitive="doPlaySoundAtRate"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true"><options>§_soundsMenu</options></input><input type="%n">441` +
        `00<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;8` +
        `8.2 kHz=88200&#xD;96 kHz=96000</options></input><input type="%s" rea` +
        `donly="true"><options>§_soundsMenu</options></input><input type="%n"` +
        `>44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#` +
        `xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input><input type="%s"` +
        ` readonly="true"><options>§_soundsMenu</options></input></inputs><sc` +
        `ript><block s="playSound"><block s="reportNewSoundFromSamples"><bloc` +
        `k s="reportGetSoundAttribute"><l><option>samples</option></l><block ` +
        `var="target"/></block><block var="rate"/></block></block></script><s` +
        `cripts><script x="10" y="98"><block s="playSound"><block s="reportNe` +
        `wSoundFromSamples"><block s="reportGetSoundAttribute"><l><option>sam` +
        `ples</option></l><block var="target"/></block><block var="rate"/></b` +
        `lock></block></script></scripts></block-definition><block-definition` +
        ` s="stop all sounds" type="command" category="sound" selector="doSto` +
        `pAllSounds" primitive="doStopAllSounds"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="%#1 of sound %#2" type="reporter" category="soun` +
        `d" selector="reportGetSoundAttribute" primitive="reportGetSoundAttri` +
        `bute"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true">$_duratio` +
        `n<options>name=$_name&#xD;duration=$_duration&#xD;length=$_length&#x` +
        `D;number of channels=$_number of channels&#xD;sample rate=$_sample r` +
        `ate&#xD;samples=$_samples</options></input><input type="%s" readonly` +
        `="true"><options>§_soundsMenu</options></input></inputs></block-defi` +
        `nition><block-definition s="new sound %#1 rate %#2 Hz" type="reporte` +
        `r" category="sound" selector="reportNewSoundFromSamples" primitive="` +
        `reportNewSoundFromSamples"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%l" readonly="true"></input><` +
        `input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD` +
        `;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input><` +
        `/inputs></block-definition><block-definition s="rest for %&apos;beat` +
        `s&apos; beats" type="command" category="sound" selector="doRest"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">0.2</input><input type="%n">0.2</input><input type="%n"` +
        `>0.2</input></inputs><script><block s="doWait"><block s="reportQuoti` +
        `ent"><l>60</l><block s="reportVariadicProduct"><list><block var="bea` +
        `ts"/><block s="getTempo"></block></list></block></block></block></sc` +
        `ript></block-definition><block-definition s="play note %#1 for %#2 b` +
        `eats" type="command" category="sound" selector="doPlayNote" primitiv` +
        `e="doPlayNote"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">60<options>§_pianoKeyboardMenu</optio` +
        `ns></input><input type="%n">0.5</input></inputs></block-definition><` +
        `block-definition s="play %#1 Hz for %#2 secs" type="command" categor` +
        `y="sound" selector="doPlayFrequency" primitive="doPlayFrequency"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">440</input><input type="%n">2</input></inputs></block-d` +
        `efinition><block-definition s="set instrument to %#1" type="command"` +
        ` category="sound" selector="doSetInstrument" primitive="doSetInstrum` +
        `ent"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">1<options>(1) sine=1&#xD;(2) square=2&#xD;(3) s` +
        `awtooth=3&#xD;(4) triangle=4</options></input></inputs></block-defin` +
        `ition><block-definition s="change tempo by %&apos;delta&apos;" type=` +
        `"command" category="sound" selector="doChangeTempo"><header></header` +
        `><code></code><translations></translations><inputs><input type="%n">` +
        `20</input><input type="%n">20</input><input type="%n">20</input></in` +
        `puts><script><block s="doSetTempo"><block s="reportVariadicSum"><lis` +
        `t><block s="getTempo"></block><block var="delta"/></list></block></b` +
        `lock></script></block-definition><block-definition s="set tempo to %` +
        `#1 bpm" type="command" category="sound" selector="doSetTempo" primit` +
        `ive="doSetTempo"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%n">60</input></inputs></block-definiti` +
        `on><block-definition s="tempo" type="reporter" category="sound" sele` +
        `ctor="getTempo" primitive="getTempo"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="change volume by %&apos;delta&apos;" type="command"` +
        ` category="sound" selector="changeVolume"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">10</input>` +
        `<input type="%n">10</input><input type="%n">10</input></inputs><scri` +
        `pt><block s="setVolume"><block s="reportVariadicSum"><list><block s=` +
        `"getVolume"></block><block var="delta"/></list></block></block></scr` +
        `ipt></block-definition><block-definition s="set volume to %#1 %" typ` +
        `e="command" category="sound" selector="setVolume" primitive="setVolu` +
        `me"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%n">100</input></inputs></block-definition><block-de` +
        `finition s="volume" type="reporter" category="sound" selector="getVo` +
        `lume" primitive="getVolume"><header></header><code></code><translati` +
        `ons></translations><inputs></inputs></block-definition><block-defini` +
        `tion s="change balance by %&apos;delta&apos;" type="command" categor` +
        `y="sound" selector="changePan"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">10</input><input type` +
        `="%n">10</input><input type="%n">10</input></inputs><script><block s` +
        `="setPan"><block s="reportVariadicSum"><list><block s="getPan"></blo` +
        `ck><block var="delta"/></list></block></block></script></block-defin` +
        `ition><block-definition s="set balance to %#1" type="command" catego` +
        `ry="sound" selector="setPan" primitive="setPan"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">0</i` +
        `nput></inputs></block-definition><block-definition s="balance" type=` +
        `"reporter" category="sound" selector="getPan" primitive="getPan"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="play frequency %#1 Hz" ` +
        `type="command" category="sound" selector="playFreq" primitive="playF` +
        `req"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">440</input></inputs></block-definition><block-d` +
        `efinition s="stop frequency" type="command" category="sound" selecto` +
        `r="stopFreq" primitive="stopFreq"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="jukebox" type="reporter" category="sound" selector="re` +
        `portSounds" primitive="reportSounds"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="clear" type="command" category="pen" selector="clea` +
        `r" primitive="clear"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"pen down" type="command" category="pen" selector="down" primitive="` +
        `down"><header></header><code></code><translations></translations><in` +
        `puts></inputs></block-definition><block-definition s="pen up" type="` +
        `command" category="pen" selector="up" primitive="up"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="pen down?" type="predicate" categor` +
        `y="pen" selector="getPenDown" primitive="getPenDown"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="set pen color to %&apos;color&apos;` +
        `" type="command" category="pen" selector="setColor"><header></header` +
        `><code></code><translations></translations><inputs><input type="%clr` +
        `" readonly="true" irreplaceable="true"></input><input type="%clr" re` +
        `adonly="true" irreplaceable="true"></input><input type="%clr" readon` +
        `ly="true" irreplaceable="true"></input></inputs><script><block s="do` +
        `ApplyExtension"><l>clr_setpen(clr)</l><list><block var="color"/></li` +
        `st></block></script></block-definition><block-definition s="set pen ` +
        `%#1 to %#2" type="command" category="pen" selector="setPenColorDimen` +
        `sion" primitive="setPenColorDimension"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_sat` +
        `uration&#xD;brightness=$_brightness&#xD;transparency=$_transparency&` +
        `#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%` +
        `n">50</input></inputs></block-definition><block-definition s="change` +
        ` pen %&apos;aspect&apos; by %&apos;delta&apos;" type="command" categ` +
        `ory="pen" selector="changePenColorDimension" primitive="changePenCol` +
        `orDimension"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true">$_` +
        `hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_b` +
        `rightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$` +
        `_r-g-b(-a)</options></input><input type="%n">10</input><input type="` +
        `%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD` +
        `;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transparenc` +
        `y=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></inp` +
        `ut><input type="%n">10</input><input type="%s" readonly="true" irrep` +
        `laceable="true">hue<options>hue&#xD;saturation&#xD;brightness&#xD;tr` +
        `ansparency&#xD;&#126;&#xD;r-g-b(-a)</options></input></inputs></bloc` +
        `k-definition><block-definition s="pen %#1" type="reporter" category=` +
        `"pen" selector="getPenAttribute" primitive="getPenAttribute"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_hue<options>size=$_s` +
        `ize&#xD;hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brigh` +
        `tness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b-a=$_r-g-b` +
        `-a</options></input></inputs></block-definition><block-definition s=` +
        `"set background color to %#1" type="command" category="pen" selector` +
        `="setBackgroundColor" primitive="setBackgroundColor"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%cl` +
        `r" readonly="true" irreplaceable="true"></input></inputs></block-def` +
        `inition><block-definition s="set background %#1 to %#2" type="comman` +
        `d" category="pen" selector="setBackgroundColorDimension" primitive="` +
        `setBackgroundColorDimension"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#x` +
        `D;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;` +
        `&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">50</inp` +
        `ut></inputs></block-definition><block-definition s="change backgroun` +
        `d %#1 by %#2" type="command" category="pen" selector="changeBackgrou` +
        `ndColorDimension" primitive="changeBackgroundColorDimension"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hu` +
        `e&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transp` +
        `arency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options>` +
        `</input><input type="%n">10</input></inputs></block-definition><bloc` +
        `k-definition s="change pen size by %&apos;delta&apos;" type="command` +
        `" category="pen" selector="changeSize"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">1</input><inp` +
        `ut type="%n">1</input><input type="%n">1</input></inputs><script><bl` +
        `ock s="setSize"><block s="reportVariadicSum"><list><block s="getPenA` +
        `ttribute"><l><option>size</option></l></block><block var="delta"/></` +
        `list></block></block></script></block-definition><block-definition s` +
        `="set pen size to %#1" type="command" category="pen" selector="setSi` +
        `ze" primitive="setSize"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%n">1</input></inputs></block-de` +
        `finition><block-definition s="stamp" type="command" category="pen" s` +
        `elector="doStamp" primitive="doStamp"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="fill" type="command" category="pen" selector="floo` +
        `dFill" primitive="floodFill"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs></block-definition><block-defin` +
        `ition s="write %#1 size %#2" type="command" category="pen" selector=` +
        `"write" primitive="write"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s">Hello!</input><input type=` +
        `"%n">12</input></inputs></block-definition><block-definition s="pen ` +
        `trails" type="reporter" category="pen" selector="reportPenTrailsAsCo` +
        `stume" primitive="reportPenTrailsAsCostume"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="pen vectors" type="reporter" category="pen" ` +
        `selector="reportPentrailsAsSVG" primitive="reportPentrailsAsSVG"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="paste on %#1" type="com` +
        `mand" category="pen" selector="doPasteOn" primitive="doPasteOn"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true"><options>§_objectsMenu</options></input>` +
        `</inputs></block-definition><block-definition s="cut from %#1" type=` +
        `"command" category="pen" selector="doCutFrom" primitive="doCutFrom">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true"><options>§_objectsMenu</options></in` +
        `put></inputs></block-definition><block-definition s="message" type="` +
        `reporter" category="control" selector="getLastMessage" primitive="ge` +
        `tLastMessage"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs></block-definition><block-definition s="broadc` +
        `ast %#1 %#2" type="command" category="control" selector="doBroadcast` +
        `" primitive="doBroadcast"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true"><options>§` +
        `_messagesMenu</options></input><input type="%receive" readonly="true` +
        `" irreplaceable="true" expand="to&#xD;with data" max="2"></input></i` +
        `nputs></block-definition><block-definition s="broadcast %#1 %#2 and ` +
        `wait" type="command" category="control" selector="doBroadcastAndWait` +
        `" primitive="doBroadcastAndWait"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true"><op` +
        `tions>§_messagesMenu</options></input><input type="%receive" readonl` +
        `y="true" irreplaceable="true" expand="to&#xD;with data" max="2"></in` +
        `put></inputs></block-definition><block-definition s="wait %&apos;dur` +
        `ation&apos; secs" type="command" category="control" selector="doWait` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%n">1</input><input type="%n">1</input><input type="%n` +
        `">1</input></inputs><script><block s="doDeclareVariables"><list><l>s` +
        `tart time</l></list></block><block s="doSetVar"><l>start time</l><bl` +
        `ock s="reportDate"><l><option>time in milliseconds</option></l></blo` +
        `ck></block><block s="doWaitUntil"><block s="reportVariadicGreaterTha` +
        `nOrEquals"><list><block s="reportDate"><l><option>time in millisecon` +
        `ds</option></l></block><block s="reportVariadicSum"><list><block var` +
        `="start time"/><block s="reportVariadicProduct"><list><block var="du` +
        `ration"/><l>1000</l></list></block></list></block></list></block></b` +
        `lock></script></block-definition><block-definition s="wait until %&a` +
        `pos;condition&apos;" type="command" category="control" selector="doW` +
        `aitUntil"><header></header><code></code><translations></translations` +
        `><inputs><input type="%boolUE" readonly="true"></input><input type="` +
        `%boolUE" readonly="true"></input><input type="%boolUE" readonly="tru` +
        `e"></input></inputs><script><block s="doIf"><block s="reportNot"><bl` +
        `ock s="evaluate"><block var="condition"/><list></list></block></bloc` +
        `k><script><block s="doWaitUntil"><block s="evaluate"><block var="con` +
        `dition"/><list></list></block></block></script><list></list></block>` +
        `</script></block-definition><block-definition s="forever %&apos;acti` +
        `on&apos;" type="command" category="control" selector="doForever"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%loop" readonly="true" irreplaceable="true"></input><input ` +
        `type="%loop" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%loop" readonly="true" irreplaceable="true"></input></inputs><scr` +
        `ipt><block s="doRun"><block var="action"/><list></list></block><bloc` +
        `k s="doRun"><block s="reportEnvironment"><l><option>script</option><` +
        `/l></block><list><block var="action"/></list></block></script></bloc` +
        `k-definition><block-definition s="repeat %&apos;count&apos; %&apos;a` +
        `ction&apos;" type="command" category="control" selector="doRepeat"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">10</input><input type="%loop" readonly="true" irrepla` +
        `ceable="true"></input><input type="%n">10</input><input type="%loop"` +
        ` readonly="true" irreplaceable="true"></input><input type="%loop" re` +
        `adonly="true" irreplaceable="true"></input></inputs><script><block s` +
        `="doDeclareVariables"><list><l>self</l></list></block><block s="doSe` +
        `tVar"><l>self</l><block s="reportEnvironment"><l><option>script</opt` +
        `ion></l></block></block><block s="doIf"><block s="reportVariadicGrea` +
        `terThan"><list><block var="count"/><l>0</l></list></block><script><b` +
        `lock s="doRun"><block var="action"/><list></list></block><block s="d` +
        `oApplyExtension"><l>snap_yield</l><list></list></block><block s="doR` +
        `un"><block var="self"/><list><block s="reportDifference"><block var=` +
        `"count"/><l>1</l></block><block var="action"/></list></block></scrip` +
        `t><list></list></block></script></block-definition><block-definition` +
        ` s="repeat until %&apos;condition&apos; %&apos;action&apos;" type="c` +
        `ommand" category="control" selector="doUntil"><header></header><code` +
        `></code><translations></translations><inputs><input type="%boolUE" r` +
        `eadonly="true"></input><input type="%loop" readonly="true" irreplace` +
        `able="true"></input><input type="%boolUE" readonly="true"></input><i` +
        `nput type="%loop" readonly="true" irreplaceable="true"></input><inpu` +
        `t type="%loop" readonly="true" irreplaceable="true"></input></inputs` +
        `><script><block s="doDeclareVariables"><list><l>self</l></list></blo` +
        `ck><block s="doSetVar"><l>self</l><block s="reportEnvironment"><l><o` +
        `ption>script</option></l></block></block><block s="doIf"><block s="r` +
        `eportNot"><block s="evaluate"><block var="condition"/><list></list><` +
        `/block></block><script><block s="doRun"><block var="action"/><list><` +
        `/list></block><block s="doApplyExtension"><l>snap_yield</l><list></l` +
        `ist></block><block s="doRun"><block var="self"/><list><block var="co` +
        `ndition"/><block var="action"/></list></block></script><list></list>` +
        `</block></script></block-definition><block-definition s="for %&apos;` +
        `count&apos; = %&apos;start&apos; to %&apos;end&apos; %&apos;action&a` +
        `pos;" type="command" category="control" selector="doFor"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%upvar" readonly="true" irreplaceable="true">i</input><input type="` +
        `%n">1</input><input type="%n">10</input><input type="%loop" readonly` +
        `="true" irreplaceable="true"></input><input type="%upvar" readonly="` +
        `true" irreplaceable="true">i</input><input type="%n">1</input><input` +
        ` type="%n">10</input><input type="%loop" readonly="true" irreplaceab` +
        `le="true"></input><input type="%loop" readonly="true" irreplaceable=` +
        `"true"></input></inputs><script><block s="doDeclareVariables"><list>` +
        `<l>test</l><l>increment</l></list></block><block s="doSetVar"><l>cou` +
        `nt</l><block var="start"/></block><block s="doIfElse"><block s="repo` +
        `rtVariadicLessThan"><list><block var="start"/><block var="end"/></li` +
        `st></block><script><block s="doSetVar"><l>test</l><block s="reifyPre` +
        `dicate"><autolambda><block s="reportVariadicGreaterThan"><list><bloc` +
        `k var="count"/><block var="end"/></list></block></autolambda><list><` +
        `/list></block></block><block s="doSetVar"><l>increment</l><l>1</l></` +
        `block></script><script><block s="doSetVar"><l>test</l><block s="reif` +
        `yPredicate"><autolambda><block s="reportVariadicLessThan"><list><blo` +
        `ck var="count"/><block var="end"/></list></block></autolambda><list>` +
        `</list></block></block><block s="doSetVar"><l>increment</l><l>-1</l>` +
        `</block></script></block><block s="doUntil"><block s="evaluate"><blo` +
        `ck var="test"/><list></list></block><script><block s="doRun"><block ` +
        `var="action"/><list></list></block><block s="doChangeVar"><l>count</` +
        `l><block var="increment"/></block></script></block></script></block-` +
        `definition><block-definition s="if %&apos;condition&apos; %&apos;tru` +
        `e case&apos; %&apos;else pairs&apos;" type="command" category="contr` +
        `ol" selector="doIf" primitive="doIf"><header></header><code></code><` +
        `translations></translations><inputs><input type="%b" readonly="true"` +
        `></input><input type="%cs" readonly="true" irreplaceable="true"></in` +
        `put><input type="%elseif" readonly="true" irreplaceable="true" expan` +
        `d="else if&#xD;"></input><input type="%b" readonly="true"></input><i` +
        `nput type="%cs" readonly="true" irreplaceable="true"></input><input ` +
        `type="%elseif" readonly="true" irreplaceable="true" expand="else if&` +
        `#xD;"></input><input type="%b" readonly="true"></input></inputs><scr` +
        `ipt><block s="doDeclareVariables"><list><l>self</l></list></block><b` +
        `lock s="doSetVar"><l>self</l><block s="reportEnvironment"><l><option` +
        `>script</option></l></block></block><block s="doIfElse"><block var="` +
        `condition"/><script><block s="doRun"><block var="true case"/><list><` +
        `/list></block></script><script><block s="doIfElse"><block s="reportL` +
        `istIsEmpty"><block var="else pairs"/></block><script></script><scrip` +
        `t><block s="doIfElse"><block s="reportListItem"><l>1</l><block var="` +
        `else pairs"/></block><script><block s="doRun"><block s="reportListIt` +
        `em"><l>2</l><block var="else pairs"/></block><list></list></block></` +
        `script><script><block s="doRun"><block var="self"/><list><block s="r` +
        `eportBoolean"><l><bool>false</bool></l></block><l></l><block s="repo` +
        `rtCDR"><block s="reportCDR"><block var="else pairs"/></block></block` +
        `></list></block></script></block></script></block></script></block><` +
        `/script><scripts><script x="10" y="98"><block s="doDeclareVariables"` +
        `><list><l>self</l></list></block><block s="doSetVar"><l>self</l><blo` +
        `ck s="reportEnvironment"><l><option>script</option></l></block></blo` +
        `ck><block s="doIfElse"><block var="condition"/><script><block s="doR` +
        `un"><block var="true case"/><list></list></block></script><script><b` +
        `lock s="doIfElse"><block s="reportListIsEmpty"><block var="else pair` +
        `s"/></block><script></script><script><block s="doIfElse"><block s="r` +
        `eportListItem"><l>1</l><block var="else pairs"/></block><script><blo` +
        `ck s="doRun"><block s="reportListItem"><l>2</l><block var="else pair` +
        `s"/></block><list></list></block></script><script><block s="doRun"><` +
        `block var="self"/><list><block s="reportBoolean"><l><bool>false</boo` +
        `l></l></block><l></l><block s="reportCDR"><block s="reportCDR"><bloc` +
        `k var="else pairs"/></block></block></list></block></script></block>` +
        `</script></block></script></block></script></scripts></block-definit` +
        `ion><block-definition s="if %&apos;condition&apos; %&apos;true case&` +
        `apos; else %&apos;false case&apos;" type="command" category="control` +
        `" selector="doIfElse" primitive="doIfElse"><header></header><code></` +
        `code><translations></translations><inputs><input type="%b" readonly=` +
        `"true"></input><input type="%cs" readonly="true" irreplaceable="true` +
        `"></input><input type="%cs" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%b" readonly="true"></input><input type="%cs" read` +
        `only="true" irreplaceable="true"></input><input type="%cs" readonly=` +
        `"true" irreplaceable="true"></input><input type="%cs" readonly="true` +
        `" irreplaceable="true"></input></inputs><scripts><script x="10" y="9` +
        `7.83333333333331"><block s="doRun"><block s="reportListItem"><block ` +
        `s="reportVariadicSum"><list><block var="condition"/><l>1</l></list><` +
        `/block><block s="reportNewList"><list><block var="false case"/><bloc` +
        `k var="true case"/></list></block></block><list></list></block></scr` +
        `ipt></scripts></block-definition><block-definition s="if %&apos;cond` +
        `ition&apos; then %&apos;true case&apos; else %&apos;false case&apos;` +
        `" type="reporter" category="control" selector="reportIfElse" primiti` +
        `ve="reportIfElse"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%b" readonly="true"></input><input typ` +
        `e="%anyUE"></input><input type="%anyUE"></input><input type="%b" rea` +
        `donly="true"></input><input type="%anyUE"></input><input type="%anyU` +
        `E"></input><input type="%b" readonly="true"></input></inputs><script` +
        `s><script x="10" y="91.83333333333331"><block s="doReport"><block s=` +
        `"reportHyperZip"><block s="reifyReporter"><autolambda><block s="eval` +
        `uate"><block s="reportListItem"><l></l><l/></block><list></list></bl` +
        `ock></autolambda><list></list></block><block s="reportVariadicSum"><` +
        `list><block var="condition"/><l>1</l></list></block><l>0</l><block s` +
        `="reportNewList"><list><block var="false case"/><block var="true cas` +
        `e"/></list></block><l>1</l></block></block></script></scripts></bloc` +
        `k-definition><block-definition s="stop %#1" type="command" category=` +
        `"control" selector="doStopThis" primitive="doStopThis"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true" irreplaceable="true">$_all<options>all=$_all&#xD;` +
        `all scenes=$_all scenes&#xD;this script=$_this script&#xD;this block` +
        `=$_this block&#xD;all but this script=$_all but this script&#xD;othe` +
        `r scripts in sprite=$_other scripts in sprite</options></input></inp` +
        `uts></block-definition><block-definition s="run %#1 %#2" type="comma` +
        `nd" category="control" selector="doRun" primitive="doRun"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%cmdRing" readonly="true"></input><input type="%mult%s" readonly="` +
        `true" expand="with inputs"></input></inputs></block-definition><bloc` +
        `k-definition s="launch %#1 %#2" type="command" category="control" se` +
        `lector="fork" primitive="fork"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%cmdRing" readonly="true"` +
        `></input><input type="%mult%s" readonly="true" expand="with inputs">` +
        `</input></inputs></block-definition><block-definition s="call %#1 %#` +
        `2" type="reporter" category="control" selector="evaluate" primitive=` +
        `"evaluate"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%repRing" readonly="true" irreplaceable="true` +
        `"></input><input type="%mult%s" readonly="true" expand="with inputs"` +
        `></input></inputs></block-definition><block-definition s="report %#1` +
        `" type="command" category="control" selector="doReport" primitive="d` +
        `oReport"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s"></input></inputs></block-definition><block-` +
        `definition s="run %#1 w/continuation" type="command" category="contr` +
        `ol" selector="doCallCC" primitive="doCallCC"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%cmdRing" r` +
        `eadonly="true"></input></inputs></block-definition><block-definition` +
        ` s="call %#1 w/continuation" type="reporter" category="control" sele` +
        `ctor="reportCallCC" primitive="reportCallCC"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%cmdRing" r` +
        `eadonly="true"></input></inputs></block-definition><block-definition` +
        ` s="warp %#1" type="command" category="other" selector="doWarp" prim` +
        `itive="doWarp"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%cs" readonly="true" irreplaceable="true"` +
        `></input></inputs></block-definition><block-definition s="tell %&apo` +
        `s;target&apos; to %&apos;action&apos; %&apos;parameters&apos;" type=` +
        `"command" category="control" selector="doTellTo"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true"><options>§_objectsMenu</options></input><input type="%c` +
        `mdRing" readonly="true"></input><input type="%mult%s" readonly="true` +
        `" expand="with inputs"></input><input type="%s" readonly="true"><opt` +
        `ions>§_objectsMenu</options></input><input type="%cmdRing" readonly=` +
        `"true"></input><input type="%mult%s" readonly="true" expand="with in` +
        `puts"></input><input type="%s" readonly="true"><options>§_objectsMen` +
        `u</options></input></inputs><script><block s="doRun"><block s="repor` +
        `tAttributeOf"><block var="action"/><block var="target"/></block><blo` +
        `ck var="parameters"/></block></script></block-definition><block-defi` +
        `nition s="ask %&apos;target&apos; for %&apos;action&apos; %&apos;par` +
        `ameters&apos;" type="reporter" category="control" selector="reportAs` +
        `kFor"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true"><options>§_objectsMenu</option` +
        `s></input><input type="%repRing" readonly="true" irreplaceable="true` +
        `"></input><input type="%mult%s" readonly="true" expand="with inputs"` +
        `></input><input type="%s" readonly="true"><options>§_objectsMenu</op` +
        `tions></input><input type="%repRing" readonly="true" irreplaceable="` +
        `true"></input><input type="%mult%s" readonly="true" expand="with inp` +
        `uts"></input><input type="%s" readonly="true"><options>§_objectsMenu` +
        `</options></input></inputs><script><block s="doReport"><block s="eva` +
        `luate"><block s="reportAttributeOf"><block var="action"/><block var=` +
        `"target"/></block><block var="parameters"/></block></block></script>` +
        `</block-definition><block-definition s="create a clone of %&apos;tar` +
        `get&apos;" type="command" category="control" selector="createClone">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true">$_myself<options>§_clonablesMenu</op` +
        `tions></input><input type="%s" readonly="true">$_myself<options>§_cl` +
        `onablesMenu</options></input><input type="%s" readonly="true">myself` +
        `<options>§_clonablesMenu</options></input></inputs><script><block s=` +
        `"doReport"><block s="newClone"><block var="target"/></block></block>` +
        `</script></block-definition><block-definition s="a new clone of %#1"` +
        ` type="reporter" category="control" selector="newClone" primitive="n` +
        `ewClone"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true">$_myself<options>§_clonable` +
        `sMenu</options></input></inputs></block-definition><block-definition` +
        ` s="delete this clone" type="command" category="control" selector="r` +
        `emoveClone" primitive="removeClone"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="define %#1 %#2 %#3" type="command" category="control` +
        `" selector="doDefineBlock" primitive="doDefineBlock"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%up` +
        `var" readonly="true" irreplaceable="true">$_block</input><input type` +
        `="%s"></input><input type="%repRing" readonly="true" irreplaceable="` +
        `true"></input></inputs></block-definition><block-definition s="set %` +
        `#1 of block %#2 to %#3" type="command" category="control" selector="` +
        `doSetBlockAttribute" primitive="doSetBlockAttribute"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true" irreplaceable="true">$_label<options>label=$_label&` +
        `#xD;definition=$_definition&#xD;comment=$_comment&#xD;category=$_cat` +
        `egory&#xD;type=$_type&#xD;scope=$_scope&#xD;selector=$_selector&#xD;` +
        `slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#` +
        `xD;editables=$_editables&#xD;replaceables=$_replaceables&#xD;&#126;&` +
        `#xD;separators=$_separators&#xD;collapses=$_collapses&#xD;expands=$_` +
        `expands&#xD;initial slots=$_initial slots&#xD;min slots=$_min slots&` +
        `#xD;max slots=$_max slots&#xD;translations=$_translations</options><` +
        `/input><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%s"></input></inputs></block-definition><block-d` +
        `efinition s="delete block %#1" type="command" category="control" sel` +
        `ector="doDeleteBlock" primitive="doDeleteBlock"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%repRing` +
        `" readonly="true" irreplaceable="true"></input></inputs></block-defi` +
        `nition><block-definition s="%#1 of block %#2" type="reporter" catego` +
        `ry="control" selector="reportBlockAttribute" primitive="reportBlockA` +
        `ttribute"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">$_def` +
        `inition<options>label=$_label&#xD;definition=$_definition&#xD;commen` +
        `t=$_comment&#xD;category=$_category&#xD;custom?=$_custom?&#xD;global` +
        `?=$_global?&#xD;type=$_type&#xD;scope=$_scope&#xD;selector=$_selecto` +
        `r&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD;menus=$_m` +
        `enus&#xD;editables=$_editables&#xD;replaceables=$_replaceables&#xD;&` +
        `#126;&#xD;separators=$_separators&#xD;collapses=$_collapses&#xD;expa` +
        `nds=$_expands&#xD;initial slots=$_initial slots&#xD;min slots=$_min ` +
        `slots&#xD;max slots=$_max slots&#xD;translations=$_translations</opt` +
        `ions></input><input type="%repRing" readonly="true" irreplaceable="t` +
        `rue"></input></inputs></block-definition><block-definition s="this %` +
        `#1" type="reporter" category="control" selector="reportEnvironment" ` +
        `primitive="reportEnvironment"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">$_script<options>script=$_script&#xD;caller=$_caller&` +
        `#xD;continuation=$_continuation&#xD;&#126;&#xD;inputs=$_inputs</opti` +
        `ons></input></inputs></block-definition><block-definition s="pause a` +
        `ll $pause" type="command" category="control" selector="doPauseAll" p` +
        `rimitive="doPauseAll"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="switch to scene %#1 %#2" type="command" category="control" selecto` +
        `r="doSwitchToScene" primitive="doSwitchToScene"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true">$_next<options>§_scenesMenu</options></input><input type` +
        `="%send" readonly="true" irreplaceable="true" expand="and send&#xD;w` +
        `ith data" max="2"></input></inputs></block-definition><block-definit` +
        `ion s="pipe %&apos;value&apos; $arrowRight %&apos;functions&apos;" t` +
        `ype="reporter" category="control" selector="reportPipe"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s"></input><input type="%mult%repRing" readonly="true" initial="1">` +
        `</input></inputs><script><block s="doReport"><block s="reportIfElse"` +
        `><block s="reportListIsEmpty"><block var="functions"/></block><block` +
        ` var="value"/><block s="reportPipe"><block s="evaluate"><block s="re` +
        `portListItem"><l>1</l><block var="functions"/></block><list><block v` +
        `ar="value"/></list></block><block s="reportCDR"><block var="function` +
        `s"/></block></block></block></block></script></block-definition><blo` +
        `ck-definition s="touching %#1 ?" type="predicate" category="sensing"` +
        ` selector="reportTouchingObject" primitive="reportTouchingObject"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true">$_mouse-pointer<options>§_collidablesM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="touching %#1 ?" type="predicate" category="sensing" selector="repo` +
        `rtTouchingColor" primitive="reportTouchingColor"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%clr" r` +
        `eadonly="true" irreplaceable="true"></input></inputs></block-definit` +
        `ion><block-definition s="color %#1 is touching %#2 ?" type="predicat` +
        `e" category="sensing" selector="reportColorIsTouchingColor" primitiv` +
        `e="reportColorIsTouchingColor"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%clr" readonly="true" irr` +
        `eplaceable="true"></input><input type="%clr" readonly="true" irrepla` +
        `ceable="true"></input></inputs></block-definition><block-definition ` +
        `s="%#1 at %#2" type="reporter" category="sensing" selector="reportAs` +
        `pect" primitive="reportAspect"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&` +
        `#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;r-g-` +
        `b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites</options></input><inp` +
        `ut type="%s" readonly="true">$_mouse-pointer<options>§_locationMenu<` +
        `/options></input></inputs></block-definition><block-definition s="st` +
        `ack size" type="reporter" category="sensing" selector="reportStackSi` +
        `ze" primitive="reportStackSize"><header></header><code></code><trans` +
        `lations></translations><inputs></inputs></block-definition><block-de` +
        `finition s="frames" type="reporter" category="sensing" selector="rep` +
        `ortFrameCount" primitive="reportFrameCount"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="yields" type="reporter" category="sensing" s` +
        `elector="reportYieldCount" primitive="reportYieldCount"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="processes" type="reporter" categ` +
        `ory="sensing" selector="reportThreadCount" primitive="reportThreadCo` +
        `unt"><header></header><code></code><translations></translations><inp` +
        `uts></inputs></block-definition><block-definition s="ask %#1 and wai` +
        `t" type="command" category="sensing" selector="doAsk" primitive="doA` +
        `sk"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s">what&apos;s your name?</input></inputs></block-d` +
        `efinition><block-definition s="answer" type="reporter" category="sen` +
        `sing" selector="reportLastAnswer" primitive="reportLastAnswer"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts></block-definition><block-definition s="answer" type="reporter" c` +
        `ategory="sensing" selector="getLastAnswer" primitive="getLastAnswer"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="mouse position" typ` +
        `e="reporter" category="sensing" selector="reportMousePosition"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts><script><block s="doReport"><block s="reportNewList"><list><block` +
        ` s="reportMouseX"></block><block s="reportMouseY"></block></list></b` +
        `lock></block></script></block-definition><block-definition s="mouse ` +
        `x" type="reporter" category="sensing" selector="reportMouseX" primit` +
        `ive="reportMouseX"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs></block-definition><block-definition s="m` +
        `ouse y" type="reporter" category="sensing" selector="reportMouseY" p` +
        `rimitive="reportMouseY"><header></header><code></code><translations>` +
        `</translations><inputs></inputs></block-definition><block-definition` +
        ` s="mouse down?" type="predicate" category="sensing" selector="repor` +
        `tMouseDown" primitive="reportMouseDown"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="key %#1 pressed?" type="predicate" category="sen` +
        `sing" selector="reportKeyPressed" primitive="reportKeyPressed"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true">$_space<options>§_keysMenu</options></inp` +
        `ut></inputs></block-definition><block-definition s="%#1 to %#2" type` +
        `="reporter" category="sensing" selector="reportRelationTo" primitive` +
        `="reportRelationTo"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true">$_distance<optio` +
        `ns>distance=$_distance&#xD;direction=$_direction&#xD;ray length=$_ra` +
        `y length</options></input><input type="%s" readonly="true">$_mouse-p` +
        `ointer<options>§_destinationsMenu</options></input></inputs></block-` +
        `definition><block-definition s="reset timer" type="command" category` +
        `="sensing" selector="doResetTimer" primitive="doResetTimer"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="timer" type="reporter" categ` +
        `ory="sensing" selector="reportTimer" primitive="reportTimer"><header` +
        `></header><code></code><translations></translations><inputs></inputs` +
        `></block-definition><block-definition s="timer" type="reporter" cate` +
        `gory="sensing" selector="getTimer" primitive="getTimer"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="%#1 of %#2" type="reporter" cate` +
        `gory="sensing" selector="reportAttributeOf" primitive="reportAttribu` +
        `teOf"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true">$_costume #<options>§_attribut` +
        `esMenu</options></input><input type="%s" readonly="true"><options>§_` +
        `objectsMenu</options></input></inputs></block-definition><block-defi` +
        `nition s="object %&apos;name&apos;" type="reporter" category="sensin` +
        `g" selector="reportObject" primitive="reportObject"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true">$_myself<options>§_objectsMenuWithSelf</options></in` +
        `put><input type="%s" readonly="true">$_myself<options>§_objectsMenuW` +
        `ithSelf</options></input><input type="%s" readonly="true">myself<opt` +
        `ions>§_objectsMenuWithSelf</options></input></inputs><script><block ` +
        `s="doReport"><block s="reportHyperZip"><block s="reifyReporter"><aut` +
        `olambda><block s="reportFindFirst"><block s="reifyPredicate"><autola` +
        `mbda><block s="reportVariadicEquals"><list><block var="id"/><block s` +
        `="reportAskFor"><l></l><block s="reifyReporter"><autolambda><block s` +
        `="reportGet"><l><option>name</option></l></block></autolambda><list>` +
        `</list></block><list></list></block></list></block></autolambda><lis` +
        `t></list></block><block s="reportConcatenatedLists"><list><block s="` +
        `reportAskFor"><block s="reportGet"><l><option>stage</option></l></bl` +
        `ock><block s="reifyReporter"><autolambda><block s="reportGet"><l><op` +
        `tion>other sprites</option></l></block></autolambda><list></list></b` +
        `lock><list></list></block><block s="reportNewList"><list><block s="r` +
        `eportGet"><l><option>stage</option></l></block></list></block></list` +
        `></block></block></autolambda><list><l>id</l></list></block><block v` +
        `ar="name"/><l>0</l><l></l><l>0</l></block></block></script><scripts>` +
        `<script x="10" y="98"><block s="doReport"><block s="reportHyperZip">` +
        `<block s="reifyReporter"><autolambda><block s="reportFindFirst"><blo` +
        `ck s="reifyPredicate"><autolambda><block s="reportVariadicEquals"><l` +
        `ist><block var="id"/><block s="reportAskFor"><l></l><block s="reifyR` +
        `eporter"><autolambda><block s="reportGet"><l><option>name</option></` +
        `l></block></autolambda><list></list></block><list></list></block></l` +
        `ist></block></autolambda><list></list></block><block s="reportConcat` +
        `enatedLists"><list><block s="reportAskFor"><block s="reportGet"><l><` +
        `option>stage</option></l></block><block s="reifyReporter"><autolambd` +
        `a><block s="reportGet"><l><option>other sprites</option></l></block>` +
        `</autolambda><list></list></block><list></list></block><block s="rep` +
        `ortNewList"><list><block s="reportGet"><l><option>stage</option></l>` +
        `</block></list></block></list></block></block></autolambda><list><l>` +
        `id</l></list></block><block var="name"/><l>0</l><l></l><l>0</l></blo` +
        `ck></block></script></scripts></block-definition><block-definition s` +
        `="url %#1" type="reporter" category="sensing" selector="reportURL" p` +
        `rimitive="reportURL"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s">snap.berkeley.edu</input></inpu` +
        `ts></block-definition><block-definition s="set %#1 to %#2" type="com` +
        `mand" category="sensing" selector="doSetGlobalFlag" primitive="doSet` +
        `GlobalFlag"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">$_v` +
        `ideo capture<options>turbo mode=$_turbo mode&#xD;case sensitivity=$_` +
        `case sensitivity&#xD;flat line ends=$_flat line ends&#xD;log pen vec` +
        `tors=$_log pen vectors&#xD;video capture=$_video capture&#xD;mirror ` +
        `video=$_mirror video</options></input><input type="%b" readonly="tru` +
        `e"></input></inputs></block-definition><block-definition s="is %#1 o` +
        `n?" type="predicate" category="sensing" selector="reportGlobalFlag" ` +
        `primitive="reportGlobalFlag"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">$_turbo mode<options>turbo mode=$_turbo mode&#xD;case ` +
        `sensitivity=$_case sensitivity&#xD;flat line ends=$_flat line ends&#` +
        `xD;log pen vectors=$_log pen vectors&#xD;video capture=$_video captu` +
        `re&#xD;mirror video=$_mirror video</options></input></inputs></block` +
        `-definition><block-definition s="current %#1" type="reporter" catego` +
        `ry="sensing" selector="reportDate" primitive="reportDate"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true">$_date<options>year=$_yea` +
        `r&#xD;month=$_month&#xD;date=$_date&#xD;day of week=$_day of week&#x` +
        `D;hour=$_hour&#xD;minute=$_minute&#xD;second=$_second&#xD;time in mi` +
        `lliseconds=$_time in milliseconds</options></input></inputs></block-` +
        `definition><block-definition s="my %#1" type="reporter" category="se` +
        `nsing" selector="reportGet" primitive="reportGet"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_neighbors<options>§_gettablesMe` +
        `nu</options></input></inputs></block-definition><block-definition s=` +
        `"microphone %#1" type="reporter" category="sensing" selector="report` +
        `Audio" primitive="reportAudio"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">$_volume<options>§_audioMenu</options></input></inpu` +
        `ts></block-definition><block-definition s="%#1" type="reporter" cate` +
        `gory="operators" selector="reportVariadicSum" primitive="reportVaria` +
        `dicSum"><header></header><code></code><translations></translations><` +
        `inputs><input type="%mult%n" readonly="true" separator="+" collapse=` +
        `"sum" initial="2"></input></inputs></block-definition><block-definit` +
        `ion s="%&apos;a&apos; − %&apos;b&apos;" type="reporter" category="op` +
        `erators" selector="reportDifference" primitive="reportDifference"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n"></input><input type="%n"></input></inputs><scripts><sc` +
        `ript x="10" y="91.83333333333331"><block s="doReport"><block s="repo` +
        `rtVariadicSum"><list><block var="a"/><block s="reportMonadic"><l><op` +
        `tion>neg</option></l><block var="b"/></block></list></block></block>` +
        `</script></scripts></block-definition><block-definition s="%#1" type` +
        `="reporter" category="operators" selector="reportVariadicProduct" pr` +
        `imitive="reportVariadicProduct"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%mult%n" readonly="true"` +
        ` separator="×" collapse="product" initial="2"></input></inputs></blo` +
        `ck-definition><block-definition s="%#1 / %#2" type="reporter" catego` +
        `ry="operators" selector="reportQuotient" primitive="reportQuotient">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n"></input><input type="%n"></input></inputs></block-de` +
        `finition><block-definition s="round %#1" type="reporter" category="o` +
        `perators" selector="reportRound" primitive="reportRound"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n"></input></inputs></block-definition><block-definition s="%#1 of` +
        ` %#2" type="reporter" category="operators" selector="reportMonadic" ` +
        `primitive="reportMonadic"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true" irreplacea` +
        `ble="true">$_sqrt<options>abs=$_abs&#xD;neg=$_neg&#xD;sign=$_sign&#x` +
        `D;ceiling=$_ceiling&#xD;floor=$_floor&#xD;sqrt=$_sqrt&#xD;sin=$_sin&` +
        `#xD;cos=$_cos&#xD;tan=$_tan&#xD;asin=$_asin&#xD;acos=$_acos&#xD;atan` +
        `=$_atan&#xD;ln=$_ln&#xD;log=$_log&#xD;lg=$_lg&#xD;e^=$_e^&#xD;10^=$_` +
        `10^&#xD;2^=$_2^&#xD;id=$_id</options></input><input type="%n">10</in` +
        `put></inputs></block-definition><block-definition s="%#1 ^ %#2" type` +
        `="reporter" category="operators" selector="reportPower" primitive="r` +
        `eportPower"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n"></input><input type="%n"></input></input` +
        `s></block-definition><block-definition s="%#1 mod %#2" type="reporte` +
        `r" category="operators" selector="reportModulus" primitive="reportMo` +
        `dulus"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%n"></input><input type="%n"></input></inputs></b` +
        `lock-definition><block-definition s="atan2 %#1 ÷ %#2" type="reporter` +
        `" category="operators" selector="reportAtan2" primitive="reportAtan2` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%n"></input><input type="%n"></input></inputs></block-` +
        `definition><block-definition s="%#1" type="reporter" category="opera` +
        `tors" selector="reportVariadicMin" primitive="reportVariadicMin"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%mult%n" readonly="true" separator="min" collapse="minimum"` +
        ` initial="2"></input></inputs></block-definition><block-definition s` +
        `="%#1" type="reporter" category="operators" selector="reportVariadic` +
        `Max" primitive="reportVariadicMax"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%mult%n" readonly="tr` +
        `ue" separator="max" collapse="maximum" initial="2"></input></inputs>` +
        `</block-definition><block-definition s="pick random %#1 to %#2" type` +
        `="reporter" category="operators" selector="reportRandom" primitive="` +
        `reportRandom"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n">1</input><input type="%n">10</input></` +
        `inputs></block-definition><block-definition s="%#1" type="predicate"` +
        ` category="operators" selector="reportVariadicEquals" primitive="rep` +
        `ortVariadicEquals"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%mult%s" readonly="true" separator="=` +
        `" collapse="all =" initial="2"></input></inputs></block-definition><` +
        `block-definition s="%#1" type="predicate" category="operators" selec` +
        `tor="reportVariadicNotEquals" primitive="reportVariadicNotEquals"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%mult%s" readonly="true" separator="≠" collapse="neighbors` +
        ` ≠" initial="2"></input></inputs></block-definition><block-definitio` +
        `n s="%#1" type="predicate" category="operators" selector="reportVari` +
        `adicLessThan" primitive="reportVariadicLessThan"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%mult%s` +
        `" readonly="true" separator="&lt;" collapse="all &lt;" initial="2"><` +
        `/input></inputs></block-definition><block-definition s="%#1" type="p` +
        `redicate" category="operators" selector="reportVariadicLessThanOrEqu` +
        `als" primitive="reportVariadicLessThanOrEquals"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%mult%s"` +
        ` readonly="true" separator="≤" collapse="all ≤" initial="2"></input>` +
        `</inputs></block-definition><block-definition s="%#1" type="predicat` +
        `e" category="operators" selector="reportVariadicGreaterThan" primiti` +
        `ve="reportVariadicGreaterThan"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%mult%s" readonly="true" ` +
        `separator="&gt;" collapse="all &gt;" initial="2"></input></inputs></` +
        `block-definition><block-definition s="%#1" type="predicate" category` +
        `="operators" selector="reportVariadicGreaterThanOrEquals" primitive=` +
        `"reportVariadicGreaterThanOrEquals"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%mult%s" readonly="t` +
        `rue" separator="≥" collapse="all ≥" initial="2"></input></inputs></b` +
        `lock-definition><block-definition s="%#1" type="predicate" category=` +
        `"operators" selector="reportVariadicAnd" primitive="reportVariadicAn` +
        `d"><header></header><code></code><translations></translations><input` +
        `s><input type="%mult%b" readonly="true" separator="and" collapse="al` +
        `l" initial="2"></input></inputs></block-definition><block-definition` +
        ` s="%#1" type="predicate" category="operators" selector="reportVaria` +
        `dicOr" primitive="reportVariadicOr"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%mult%b" readonly="t` +
        `rue" separator="or" collapse="any" initial="2"></input></inputs></bl` +
        `ock-definition><block-definition s="not %&apos;bool&apos;" type="pre` +
        `dicate" category="operators" selector="reportNot"><header></header><` +
        `code></code><translations></translations><inputs><input type="%b" re` +
        `adonly="true"></input><input type="%b" readonly="true"></input><inpu` +
        `t type="%b" readonly="true"></input></inputs><script><block s="doRep` +
        `ort"><block s="reportIfElse"><block var="bool"/><block s="reportBool` +
        `ean"><l><bool>false</bool></l></block><block s="reportBoolean"><l><b` +
        `ool>true</bool></l></block></block></block></script></block-definiti` +
        `on><block-definition s="%#1" type="predicate" category="operators" s` +
        `elector="reportBoolean" primitive="reportBoolean"><header></header><` +
        `code></code><translations></translations><inputs><input type="%b" re` +
        `adonly="true" irreplaceable="true">true</input></inputs></block-defi` +
        `nition><block-definition s="%#1" type="predicate" category="operator` +
        `s" selector="reportFalse" primitive="reportFalse"><header></header><` +
        `code></code><translations></translations><inputs><input type="%b" re` +
        `adonly="true" irreplaceable="true">false</input></inputs></block-def` +
        `inition><block-definition s="join %#1" type="reporter" category="ope` +
        `rators" selector="reportJoinWords" primitive="reportJoinWords"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%mult%s" readonly="true" initial="2">hello &#xD;world</input>` +
        `</inputs></block-definition><block-definition s="letter %&apos;idx&a` +
        `pos; of %&apos;text&apos;" type="reporter" category="operators" sele` +
        `ctor="reportLetter" primitive="reportLetter"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n">1<optio` +
        `ns>1=1&#xD;last=$_last&#xD;random=$_random</options></input><input t` +
        `ype="%s">world</input><input type="%n">1<options>1=1&#xD;last=$_last` +
        `&#xD;random=$_random</options></input><input type="%s">world</input>` +
        `<input type="%n">1<options>1=1&#xD;last&#xD;random</options></input>` +
        `</inputs><script><block s="doReport"><block s="reportHyperZip"><bloc` +
        `k s="reifyReporter"><autolambda><block s="reportListItem"><l></l><bl` +
        `ock s="reportTextSplit"><l></l><l><option>letter</option></l></block` +
        `></block></autolambda><list></list></block><block var="idx"/><l>0</l` +
        `><block var="text"/><l>0</l></block></block></script><scripts><scrip` +
        `t x="10" y="98"><block s="doReport"><block s="reportHyperZip"><block` +
        ` s="reifyReporter"><autolambda><block s="reportListItem"><l></l><blo` +
        `ck s="reportTextSplit"><l></l><l><option>letter</option></l></block>` +
        `</block></autolambda><list></list></block><block var="idx"/><l>0</l>` +
        `<block var="text"/><l>0</l></block></block></script></scripts></bloc` +
        `k-definition><block-definition s="length of %#1" type="reporter" cat` +
        `egory="operators" selector="reportStringSize" primitive="reportStrin` +
        `gSize"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s">world</input></inputs></block-definition><blo` +
        `ck-definition s="%#1 of text %#2" type="reporter" category="operator` +
        `s" selector="reportTextAttribute" primitive="reportTextAttribute"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true">$_length<options>` +
        `length=$_length&#xD;lower case=$_lower case&#xD;upper case=$_upper c` +
        `ase</options></input><input type="%s">world</input></inputs></block-` +
        `definition><block-definition s="unicode of %#1" type="reporter" cate` +
        `gory="operators" selector="reportUnicode" primitive="reportUnicode">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s">a</input></inputs></block-definition><block-definiti` +
        `on s="unicode %#1 as letter" type="reporter" category="operators" se` +
        `lector="reportUnicodeAsLetter" primitive="reportUnicodeAsLetter"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">65</input></inputs></block-definition><block-definition` +
        ` s="is %#1 a %#2 ?" type="predicate" category="operators" selector="` +
        `reportIsA" primitive="reportIsA"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s">5</input><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_number<options>§_types` +
        `Menu</options></input></inputs></block-definition><block-definition ` +
        `s="is %#1 ?" type="predicate" category="operators" selector="reportV` +
        `ariadicIsIdentical" primitive="reportVariadicIsIdentical"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%mult%s" readonly="true" separator="identical to" collapse="all id` +
        `entical" initial="2"></input></inputs></block-definition><block-defi` +
        `nition s="split %#1 by %#2" type="reporter" category="operators" sel` +
        `ector="reportTextSplit" primitive="reportTextSplit"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s">` +
        `hello world</input><input type="%s"> <options>letter=$_letter&#xD;wo` +
        `rd=$_word&#xD;line=$_line&#xD;tab=$_tab&#xD;cr=$_cr&#xD;csv=$_csv&#x` +
        `D;json=$_json&#xD;&#126;&#xD;blocks=$_blocks</options></input></inpu` +
        `ts></block-definition><block-definition s="JavaScript function ( %#1` +
        ` ) { %#2 }" type="reporter" category="operators" selector="reportJSF` +
        `unction" primitive="reportJSFunction"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%mult%s" readonly=` +
        `"true"></input><input type="%mlt"></input></inputs></block-definitio` +
        `n><block-definition s="type of %#1" type="reporter" category="operat` +
        `ors" selector="reportTypeOf" primitive="reportTypeOf"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `">5</input></inputs></block-definition><block-definition s="%#1 of %` +
        `#2" type="reporter" category="operators" selector="reportTextFunctio` +
        `n" primitive="reportTextFunction"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">$_encode URI<options>encode URI=$_encode URI&#xD;` +
        `decode URI=$_decode URI&#xD;encode URI component=$_encode URI compon` +
        `ent&#xD;decode URI component=$_decode URI component&#xD;XML escape=$` +
        `_XML escape&#xD;XML unescape=$_XML unescape&#xD;JS escape=$_JS escap` +
        `e&#xD;hex sha512 hash=$_hex sha512 hash</options></input><input type` +
        `="%s">Abelson &amp; Sussman</input></inputs></block-definition><bloc` +
        `k-definition s="compile %#1 for %#2 args" type="reporter" category="` +
        `operators" selector="reportCompiled" primitive="reportCompiled"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%repRing" readonly="true" irreplaceable="true"></input><inpu` +
        `t type="%n">0</input></inputs></block-definition><block-definition s` +
        `="set %#1 to %#2" type="command" category="variables" selector="doSe` +
        `tVar" primitive="doSetVar"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true"><options>§_getVarNamesDict</options></input><input type=` +
        `"%s">0</input></inputs></block-definition><block-definition s="chang` +
        `e %#1 by %#2" type="command" category="variables" selector="doChange` +
        `Var" primitive="doChangeVar"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true"><options>§_getVarNamesDict</options></input><input typ` +
        `e="%n">1</input></inputs></block-definition><block-definition s="sho` +
        `w variable %#1" type="command" category="variables" selector="doShow` +
        `Var" primitive="doShowVar"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true"><options>§_getVarNamesDict</options></input></inputs></b` +
        `lock-definition><block-definition s="hide variable %#1" type="comman` +
        `d" category="variables" selector="doHideVar" primitive="doHideVar"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true"><options>§_getVa` +
        `rNamesDict</options></input></inputs></block-definition><block-defin` +
        `ition s="script variables %&apos;#1&apos;" type="command" category="` +
        `other" selector="doDeclareVariables"><header></header><code></code><` +
        `translations></translations><inputs><input type="%scriptVars" readon` +
        `ly="true" irreplaceable="true" initial="1" min="1"></input></inputs>` +
        `</block-definition><block-definition s="inherit %#1" type="command" ` +
        `category="variables" selector="doDeleteAttr" primitive="doDeleteAttr` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_shadowedVariablesMenu</` +
        `options></input></inputs></block-definition><block-definition s="lis` +
        `t %&apos;inputs&apos;" type="reporter" category="lists" selector="re` +
        `portNewList"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%s" readonly="true" irreplaceable="tru` +
        `e" initial="1"></input><input type="%mult%s" readonly="true" irrepla` +
        `ceable="true" initial="1"></input><input type="%mult%s" readonly="tr` +
        `ue" irreplaceable="true" initial="1"></input></inputs><script><block` +
        ` s="doReport"><block var="inputs"/></block></script></block-definiti` +
        `on><block-definition s="%#1 in front of %#2" type="reporter" categor` +
        `y="lists" selector="reportCONS" primitive="reportCONS"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s"></input><input type="%l" readonly="true"></input></inputs></block` +
        `-definition><block-definition s="item %#1 of %#2" type="reporter" ca` +
        `tegory="lists" selector="reportListItem" primitive="reportListItem">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</o` +
        `ptions></input><input type="%l" readonly="true"></input></inputs></b` +
        `lock-definition><block-definition s="all but first of %#1" type="rep` +
        `orter" category="lists" selector="reportCDR" primitive="reportCDR"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%l" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="length of %#1" type="reporter" category="lists" ` +
        `selector="reportListLength" primitive="reportListLength"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%l" readonly="true"></input></inputs></block-definition><block-defi` +
        `nition s="%#1 of %#2" type="reporter" category="lists" selector="rep` +
        `ortListAttribute" primitive="reportListAttribute"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_length<options>length=$_length&` +
        `#xD;rank=$_rank&#xD;dimensions=$_dimensions&#xD;flatten=$_flatten&#x` +
        `D;columns=$_columns&#xD;uniques=$_uniques&#xD;distribution=$_distrib` +
        `ution&#xD;sorted=$_sorted&#xD;shuffled=$_shuffled&#xD;reverse=$_reve` +
        `rse&#xD;&#126;&#xD;lines=$_lines&#xD;csv=$_csv&#xD;json=$_json</opti` +
        `ons></input><input type="%l" readonly="true"></input></inputs></bloc` +
        `k-definition><block-definition s="%&apos;data&apos; contains %&apos;` +
        `value&apos;" type="predicate" category="lists" selector="reportListC` +
        `ontainsItem" primitive="reportListContainsItem"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%l" read` +
        `only="true"></input><input type="%s">thing</input><input type="%l" r` +
        `eadonly="true"></input><input type="%s">thing</input><input type="%s` +
        `">thing</input></inputs><scripts><script x="10" y="91.83333333333331` +
        `"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block ` +
        `s="reportListAttribute"><l><option>length</option></l><block var="da` +
        `ta"/></block><script><block s="doIf"><block s="reportVariadicEquals"` +
        `><list><block s="reportListItem"><block var="i"/><block var="data"/>` +
        `</block><block var="value"/></list></block><script><block s="doRepor` +
        `t"><block s="reportBoolean"><l><bool>true</bool></l></block></block>` +
        `</script><list></list></block></script></block></script></block><blo` +
        `ck s="doReport"><block s="reportBoolean"><l><bool>false</bool></l></` +
        `block></block></script></scripts></block-definition><block-definitio` +
        `n s="is %&apos;data&apos; empty?" type="predicate" category="lists" ` +
        `selector="reportListIsEmpty" primitive="reportListIsEmpty"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%l" readonly="true"></input><input type="%l" readonly="true"></in` +
        `put><input type="%l" readonly="true"></input></inputs><scripts><scri` +
        `pt x="10" y="91.83333333333331"><block s="doReport"><block s="report` +
        `VariadicEquals"><list><block var="data"/><block s="reportNewList"><l` +
        `ist></list></block></list></block></block></script></scripts></block` +
        `-definition><block-definition s="index of %&apos;value&apos; in %&ap` +
        `os;data&apos;" type="reporter" category="lists" selector="reportList` +
        `Index" primitive="reportListIndex"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s">thing</input><inp` +
        `ut type="%l" readonly="true"></input><input type="%s">thing</input><` +
        `input type="%l" readonly="true"></input><input type="%l" readonly="t` +
        `rue"></input></inputs><scripts><script x="10" y="91.83333333333331">` +
        `<block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s=` +
        `"reportListAttribute"><l><option>length</option></l><block var="data` +
        `"/></block><script><block s="doIf"><block s="reportVariadicEquals"><` +
        `list><block s="reportListItem"><block var="i"/><block var="data"/></` +
        `block><block var="value"/></list></block><script><block s="doReport"` +
        `><block var="i"/></block></script><list></list></block></script></bl` +
        `ock></script></block><block s="doReport"><l>0</l></block></script></` +
        `scripts></block-definition><block-definition s="add %#1 to %#2" type` +
        `="command" category="lists" selector="doAddToList" primitive="doAddT` +
        `oList"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s">thing</input><input type="%l" readonly="true"` +
        `></input></inputs></block-definition><block-definition s="delete %#1` +
        ` of %#2" type="command" category="lists" selector="doDeleteFromList"` +
        ` primitive="doDeleteFromList"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">1<options>1=1&#xD;last` +
        `=$_last&#xD;&#126;&#xD;all=$_all</options></input><input type="%l" r` +
        `eadonly="true"></input></inputs></block-definition><block-definition` +
        ` s="insert %#1 at %#2 of %#3" type="command" category="lists" select` +
        `or="doInsertInList" primitive="doInsertInList"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s">thing` +
        `</input><input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_` +
        `random</options></input><input type="%l" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="replace item %#1 of %#` +
        `2 with %#3" type="command" category="lists" selector="doReplaceInLis` +
        `t" primitive="doReplaceInList"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">1<options>1=1&#xD;las` +
        `t=$_last&#xD;random=$_random</options></input><input type="%l" reado` +
        `nly="true"></input><input type="%s">thing</input></inputs></block-de` +
        `finition><block-definition s="numbers from %&apos;start&apos; to %&a` +
        `pos;end&apos;" type="reporter" category="lists" selector="reportNumb` +
        `ers" primitive="reportNumbers"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">1</input><input type=` +
        `"%n">10</input><input type="%n">1</input><input type="%n">10</input>` +
        `<input type="%n">10</input></inputs><scripts><script x="10" y="91.83` +
        `333333333331"><block s="doReport"><block s="reportHyperZip"><block s` +
        `="reifyReporter"><script><block s="doDeclareVariables"><list><l>resu` +
        `lt</l></list></block><block s="doSetVar"><l>result</l><block s="repo` +
        `rtNewList"><list></list></block></block><block s="doWarp"><script><b` +
        `lock s="doFor"><l>i</l><l></l><l></l><script><block s="doAddToList">` +
        `<block var="i"/><block var="result"/></block></script></block></scri` +
        `pt></block><block s="doReport"><block var="result"/></block></script` +
        `><list></list></block><block var="start"/><l>0</l><block var="end"/>` +
        `<l>0</l></block></block></script></scripts></block-definition><block` +
        `-definition s="append %&apos;lists&apos;" type="reporter" category="` +
        `lists" selector="reportConcatenatedLists" primitive="reportConcatena` +
        `tedLists"><header></header><code></code><translations></translations` +
        `><inputs><input type="%mult%l" readonly="true" initial="2"></input><` +
        `input type="%mult%l" readonly="true" initial="2"></input><input type` +
        `="%mult%l" readonly="true" initial="2"></input></inputs><scripts><sc` +
        `ript x="10" y="91.83333333333331"><block s="doDeclareVariables"><lis` +
        `t><l>result</l></list></block><block s="doSetVar"><l>result</l><bloc` +
        `k s="reportNewList"><list></list></block></block><block s="doWarp"><` +
        `script><block s="doForEach"><l>list</l><block var="lists"/><script><` +
        `block s="doForEach"><l>item</l><block var="list"/><script><block s="` +
        `doAddToList"><block var="item"/><block var="result"/></block></scrip` +
        `t></block></script></block></script></block><block s="doReport"><blo` +
        `ck var="result"/></block></script></scripts></block-definition><bloc` +
        `k-definition s="combinations %&apos;lists&apos;" type="reporter" cat` +
        `egory="lists" selector="reportCrossproduct" primitive="reportCrosspr` +
        `oduct"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%l" readonly="true" initial="2"></input><inp` +
        `ut type="%mult%l" readonly="true" initial="2"></input><input type="%` +
        `mult%l" readonly="true" initial="2"></input></inputs><scripts><scrip` +
        `t x="10" y="91.83333333333331"><block s="doReport"><block s="reportI` +
        `fElse"><block s="reportListIsEmpty"><block var="lists"/></block><blo` +
        `ck s="reportNewList"><list><block s="reportNewList"><list></list></b` +
        `lock></list></block><block s="reportConcatenatedLists"><block s="rep` +
        `ortMap"><block s="reifyReporter"><autolambda><block s="reportMap"><b` +
        `lock s="reifyReporter"><autolambda><block s="reportCONS"><block var=` +
        `"first"/><l/></block></autolambda><list></list></block><block s="rep` +
        `ortCrossproduct"><block s="reportCDR"><block var="lists"/></block></` +
        `block></block></autolambda><list><l>first</l></list></block><block s` +
        `="reportListItem"><l>1</l><block var="lists"/></block></block></bloc` +
        `k></block></block></script></scripts></block-definition><block-defin` +
        `ition s="transpose %#1" type="reporter" category="lists" selector="r` +
        `eportTranspose" primitive="reportTranspose"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%l" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="res` +
        `hape %#1 to %#2" type="reporter" category="lists" selector="reportRe` +
        `shape" primitive="reportReshape"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s"></input><input type` +
        `="%mult%n" readonly="true" initial="2">4&#xD;3</input></inputs></blo` +
        `ck-definition><block-definition s="map %&apos;ring&apos; over %&apos` +
        `;data&apos;" type="reporter" category="lists" selector="reportMap" p` +
        `rimitive="reportMap"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%repRing" readonly="true" irreplace` +
        `able="true"></input><input type="%l" readonly="true"></input><input ` +
        `type="%repRing" readonly="true" irreplaceable="true"></input><input ` +
        `type="%l" readonly="true"></input><input type="%l" readonly="true"><` +
        `/input></inputs><scripts><script x="10" y="91.83333333333331"><block` +
        ` s="doDeclareVariables"><list><l>result</l><l>implicit?</l></list></` +
        `block><block s="doSetVar"><l>result</l><block s="reportNewList"><lis` +
        `t></list></block></block><block s="doSetVar"><l>implicit?</l><block ` +
        `s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>input ` +
        `names</option></l><block var="ring"/></block></block></block><block ` +
        `s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="report` +
        `ListAttribute"><l><option>length</option></l><block var="data"/></bl` +
        `ock><script><block s="doAddToList"><block s="evaluate"><block var="r` +
        `ing"/><block s="reportIfElse"><block var="implicit?"/><block s="repo` +
        `rtNewList"><list><block s="reportListItem"><block var="i"/><block va` +
        `r="data"/></block></list></block><block s="reportNewList"><list><blo` +
        `ck s="reportListItem"><block var="i"/><block var="data"/></block><bl` +
        `ock var="i"/><block var="data"/></list></block></block></block><bloc` +
        `k var="result"/></block></script></block></script></block><block s="` +
        `doReport"><block var="result"/></block></script></scripts></block-de` +
        `finition><block-definition s="$blitz map %#1 over %#2" type="reporte` +
        `r" category="lists" selector="reportAtomicMap" primitive="reportAtom` +
        `icMap"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%repRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%l" readonly="true"></input></inputs></block-defi` +
        `nition><block-definition s="keep items %&apos;ring&apos; from %&apos` +
        `;data&apos;" type="reporter" category="lists" selector="reportKeep" ` +
        `primitive="reportKeep"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%predRing" readonly="true" irrepl` +
        `aceable="true"></input><input type="%l" readonly="true"></input><inp` +
        `ut type="%predRing" readonly="true" irreplaceable="true"></input><in` +
        `put type="%l" readonly="true"></input><input type="%l" readonly="tru` +
        `e"></input></inputs><scripts><script x="10" y="91.83333333333331"><b` +
        `lock s="doDeclareVariables"><list><l>result</l><l>implicit?</l></lis` +
        `t></block><block s="doSetVar"><l>result</l><block s="reportNewList">` +
        `<list></list></block></block><block s="doSetVar"><l>implicit?</l><bl` +
        `ock s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>in` +
        `put names</option></l><block var="ring"/></block></block></block><bl` +
        `ock s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="re` +
        `portListAttribute"><l><option>length</option></l><block var="data"/>` +
        `</block><script><block s="doIf"><block s="evaluate"><block var="ring` +
        `"/><block s="reportIfElse"><block var="implicit?"/><block s="reportN` +
        `ewList"><list><block s="reportListItem"><block var="i"/><block var="` +
        `data"/></block></list></block><block s="reportNewList"><list><block ` +
        `s="reportListItem"><block var="i"/><block var="data"/></block><block` +
        ` var="i"/><block var="data"/></list></block></block></block><script>` +
        `<block s="doAddToList"><block s="reportListItem"><block var="i"/><bl` +
        `ock var="data"/></block><block var="result"/></block></script><list>` +
        `</list></block></script></block></script></block><block s="doReport"` +
        `><block var="result"/></block></script></scripts></block-definition>` +
        `<block-definition s="$blitz keep items %#1 from %#2" type="reporter"` +
        ` category="lists" selector="reportAtomicKeep" primitive="reportAtomi` +
        `cKeep"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%predRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%l" readonly="true"></input></inputs></block-def` +
        `inition><block-definition s="find first item %&apos;ring&apos; in %&` +
        `apos;data&apos;" type="reporter" category="lists" selector="reportFi` +
        `ndFirst" primitive="reportFindFirst"><header></header><code></code><` +
        `translations></translations><inputs><input type="%predRing" readonly` +
        `="true" irreplaceable="true"></input><input type="%l" readonly="true` +
        `"></input><input type="%predRing" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%l" readonly="true"></input><input type="%l"` +
        ` readonly="true"></input></inputs><scripts><script x="10" y="91.8333` +
        `3333333331"><block s="doDeclareVariables"><list><l>implicit?</l></li` +
        `st></block><block s="doSetVar"><l>implicit?</l><block s="reportListI` +
        `sEmpty"><block s="reportAttributeOf"><l><option>input names</option>` +
        `</l><block var="ring"/></block></block></block><block s="doWarp"><sc` +
        `ript><block s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"` +
        `><l><option>length</option></l><block var="data"/></block><script><b` +
        `lock s="doIf"><block s="evaluate"><block var="ring"/><block s="repor` +
        `tIfElse"><block var="implicit?"/><block s="reportNewList"><list><blo` +
        `ck s="reportListItem"><block var="i"/><block var="data"/></block></l` +
        `ist></block><block s="reportNewList"><list><block s="reportListItem"` +
        `><block var="i"/><block var="data"/></block><block var="i"/><block v` +
        `ar="data"/></list></block></block></block><script><block s="doReport` +
        `"><block s="reportListItem"><block var="i"/><block var="data"/></blo` +
        `ck></block></script><list></list></block></script></block></script><` +
        `/block><block s="doReport"><l></l></block></script></scripts></block` +
        `-definition><block-definition s="$blitz find first item %#1 in %#2" ` +
        `type="reporter" category="lists" selector="reportAtomicFindFirst" pr` +
        `imitive="reportAtomicFindFirst"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%predRing" readonly="tru` +
        `e" irreplaceable="true"></input><input type="%l" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="combine %&apos` +
        `;data&apos; using %&apos;ring&apos;" type="reporter" category="lists` +
        `" selector="reportCombine" primitive="reportCombine"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%l"` +
        ` readonly="true"></input><input type="%repRing" readonly="true" irre` +
        `placeable="true"></input><input type="%l" readonly="true"></input><i` +
        `nput type="%repRing" readonly="true" irreplaceable="true"></input><i` +
        `nput type="%repRing" readonly="true" irreplaceable="true"></input></` +
        `inputs><scripts><script x="10" y="91.83333333333331"><block s="doIf"` +
        `><block s="reportListIsEmpty"><block var="data"/></block><script><bl` +
        `ock s="doReport"><l>0</l></block></script><list><block s="reportVari` +
        `adicEquals"><list><block s="reportListAttribute"><l><option>length</` +
        `option></l><block var="data"/></block><l>1</l></list></block><script` +
        `><block s="doReport"><block s="reportListItem"><l>1</l><block var="d` +
        `ata"/></block></block></script></list></block><block s="doReport"><b` +
        `lock s="evaluate"><block var="ring"/><list><block s="reportListItem"` +
        `><l>1</l><block var="data"/></block><block s="evaluate"><block s="re` +
        `portEnvironment"><l><option>script</option></l></block><list><block ` +
        `s="reportCDR"><block var="data"/></block><block var="ring"/></list><` +
        `/block></list></block></block></script></scripts></block-definition>` +
        `<block-definition s="$blitz combine %#1 using %#2" type="reporter" c` +
        `ategory="lists" selector="reportAtomicCombine" primitive="reportAtom` +
        `icCombine"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%l" readonly="true"></input><input type="%rep` +
        `Ring" readonly="true" irreplaceable="true"></input></inputs></block-` +
        `definition><block-definition s="for each %&apos;item&apos; in %&apos` +
        `;data&apos; %&apos;action&apos;" type="command" category="lists" sel` +
        `ector="doForEach" primitive="doForEach"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%upvar" readonly` +
        `="true" irreplaceable="true">item</input><input type="%l" readonly="` +
        `true"></input><input type="%loop" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%upvar" readonly="true" irreplaceable="true"` +
        `>item</input><input type="%l" readonly="true"></input><input type="%` +
        `loop" readonly="true" irreplaceable="true"></input><input type="%loo` +
        `p" readonly="true" irreplaceable="true"></input></inputs><scripts><s` +
        `cript x="10" y="97.83333333333331"><block s="doReport"><block s="rep` +
        `ortMap"><block s="reifyReporter"><script><block s="doSetVar"><l>item` +
        `</l><l></l></block><block s="doRun"><block var="action"/><list></lis` +
        `t></block><block s="doReport"><l>0</l></block></script><list></list>` +
        `</block><block var="data"/></block></block></script></scripts></bloc` +
        `k-definition><block-definition s="show table %#1" type="command" cat` +
        `egory="lists" selector="doShowTable" primitive="doShowTable"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%l" readonly="true"></input></inputs></block-definition><block-` +
        `definition s="map %#1 to %#2 %#3" type="command" category="other" se` +
        `lector="doMapCodeOrHeader" primitive="doMapCodeOrHeader"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%cmdRing" readonly="true"></input><input type="%s" readonly="true">` +
        `$_code<options>code=$_code&#xD;header=$_header</options></input><inp` +
        `ut type="%mlt"></input></inputs></block-definition><block-definition` +
        ` s="map %#1 to code %#2" type="command" category="other" selector="d` +
        `oMapValueCode" primitive="doMapValueCode"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">$_String<options>String=$_String&#xD;Numb` +
        `er=$_Number&#xD;true=$_true&#xD;false=$_false</options></input><inpu` +
        `t type="%mlt">&lt;#1&gt;</input></inputs></block-definition><block-d` +
        `efinition s="map %#1 of %#2 to code %#3" type="command" category="ot` +
        `her" selector="doMapListCode" primitive="doMapListCode"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true"><options>list=$_list&#xD;item=$_item&#xD;delimit` +
        `er=$_delimiter</options></input><input type="%s" readonly="true"><op` +
        `tions>collection=$_collection&#xD;variables=$_variables&#xD;paramete` +
        `rs=$_parameters</options></input><input type="%mlt"></input></inputs` +
        `></block-definition><block-definition s="code of %#1" type="reporter` +
        `" category="other" selector="reportMappedCode" primitive="reportMapp` +
        `edCode"><header></header><code></code><translations></translations><` +
        `inputs><input type="%cmdRing" readonly="true"></input></inputs></blo` +
        `ck-definition><block-definition s="primitive %#1" type="command" cat` +
        `egory="other" selector="doPrimitive" primitive="doPrimitive"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true"><options>§_primitivesM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="extension %#1 %#2" type="command" category="other" selector="doApp` +
        `lyExtension" primitive="doApplyExtension"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true"><options>§_extensionsMenu</options></inpu` +
        `t><input type="%mult%s" readonly="true"></input></inputs></block-def` +
        `inition><block-definition s="extension %#1 %#2" type="reporter" cate` +
        `gory="other" selector="reportApplyExtension" primitive="reportApplyE` +
        `xtension"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true"><opti` +
        `ons>§_extensionsMenu</options></input><input type="%mult%s" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="set` +
        ` video transparency to %#1" type="command" category="sensing" select` +
        `or="doSetVideoTransparency" primitive="doSetVideoTransparency"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">50</input></inputs></block-definition><block-definition s` +
        `="video %#1 on %#2" type="reporter" category="sensing" selector="rep` +
        `ortVideo" primitive="reportVideo"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">$_motion<options>snap=$_snap&#xD;motion=$_motion&` +
        `#xD;direction=$_direction</options></input><input type="%s" readonly` +
        `="true">$_myself<options>§_objectsMenuWithSelf</options></input></in` +
        `puts></block-definition></primitives></blocks>`,
        this.stage
    );
};
