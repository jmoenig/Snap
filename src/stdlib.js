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
        `</input><input type="%s" readonly="true" irreplaceable="true">$_fron` +
        `t<options>front=$_front&#xD;back=$_back</options></input></inputs><s` +
        `cripts><script x="10" y="97.83333333333331"><block s="doIfElse"><blo` +
        `ck s="reportVariadicEquals"><list><block s="reportJoinWords"><list><` +
        `block var="name"/></list></block><l>back</l></list></block><script><` +
        `block s="doWarp"><script><block s="doUntil"><block s="reportVariadic` +
        `Equals"><list><block s="reportListIndex"><block s="reportGet"><l><op` +
        `tion>self</option></l></block><block s="reportAskFor"><block s="repo` +
        `rtGet"><l><option>stage</option></l></block><block s="reifyReporter"` +
        `><autolambda><block s="reportGet"><l><option>other sprites</option><` +
        `/l></block></autolambda><list></list></block><list></list></block></` +
        `block><l>1</l></list></block><script><block s="goBack"><l>1</l></blo` +
        `ck></script></block></script></block></script><script><block s="doWa` +
        `rp"><script><block s="doUntil"><block s="reportVariadicEquals"><list` +
        `><block s="reportListIndex"><block s="reportGet"><l><option>self</op` +
        `tion></l></block><block s="reportAskFor"><block s="reportGet"><l><op` +
        `tion>stage</option></l></block><block s="reifyReporter"><autolambda>` +
        `<block s="reportGet"><l><option>other sprites</option></l></block></` +
        `autolambda><list></list></block><list></list></block></block><block ` +
        `s="reportVariadicSum"><list><block s="reportListAttribute"><l><optio` +
        `n>length</option></l><block s="reportGet"><l><option>other sprites</` +
        `option></l></block></block><l>1</l></list></block></list></block><sc` +
        `ript><block s="goBack"><l>-1</l></block></script></block></script></` +
        `block></script></block></script></scripts></block-definition><block-` +
        `definition s="go back %#1 layers" type="command" category="looks" se` +
        `lector="goBack" primitive="goBack"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">1</input></inputs` +
        `></block-definition><block-definition s="save %#1 as costume named %` +
        `#2" type="command" category="looks" selector="doScreenshot" primitiv` +
        `e="doScreenshot"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true">$_pen trails<option` +
        `s>pen trails=$_pen trails&#xD;stage image=$_stage image</options></i` +
        `nput><input type="%s">screenshot</input></inputs></block-definition>` +
        `<block-definition s="wardrobe" type="reporter" category="looks" sele` +
        `ctor="reportCostumes" primitive="reportCostumes"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="alert %#1" type="command" category="loo` +
        `ks" selector="alert" primitive="alert"><header></header><code></code` +
        `><translations></translations><inputs><input type="%mult%s" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="con` +
        `sole log %#1" type="command" category="looks" selector="log" primiti` +
        `ve="log"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%mult%s" readonly="true"></input></inputs></blo` +
        `ck-definition><block-definition s="play sound %#1" type="command" ca` +
        `tegory="sound" selector="playSound" primitive="playSound"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true"><options>§_soundsMenu</options></input></input` +
        `s></block-definition><block-definition s="play sound %&apos;target&a` +
        `pos; until done" type="command" category="sound" selector="doPlaySou` +
        `ndUntilDone" primitive="doPlaySoundUntilDone"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true"><options>§_soundsMenu</options></input><input type="%s" re` +
        `adonly="true"><options>§_soundsMenu</options></input><input type="%s` +
        `" readonly="true"><options>§_soundsMenu</options></input></inputs><s` +
        `cript><block s="doDeclareVariables"><list><l>sound</l></list></block` +
        `><block s="doSetVar"><l>sound</l><block s="reportIfElse"><block s="r` +
        `eportIsA"><block var="target"/><l><option>sound</option></l></block>` +
        `<block var="target"/><block s="reportIfElse"><block s="reportIsA"><b` +
        `lock var="target"/><l><option>list</option></l></block><block s="rep` +
        `ortNewSoundFromSamples"><block var="target"/><l>44100</l></block><bl` +
        `ock s="reportFindFirst"><block s="reifyPredicate"><autolambda><block` +
        ` s="reportVariadicEquals"><list><block s="reportGetSoundAttribute"><` +
        `l><option>name</option></l><l></l></block><block var="target"/></lis` +
        `t></block></autolambda><list></list></block><block s="reportGet"><l>` +
        `<option>sounds</option></l></block></block></block></block></block><` +
        `block s="doIf"><block s="reportIsA"><block var="sound"/><l><option>s` +
        `ound</option></l></block><script><block s="playSound"><block var="so` +
        `und"/></block><block s="doWait"><block s="reportGetSoundAttribute"><` +
        `l><option>duration</option></l><block var="sound"/></block></block><` +
        `/script><list></list></block></script><scripts><script x="10" y="98"` +
        `><block s="doDeclareVariables"><list><l>sound</l></list></block><blo` +
        `ck s="doSetVar"><l>sound</l><block s="reportIfElse"><block s="report` +
        `IsA"><block var="target"/><l><option>sound</option></l></block><bloc` +
        `k var="target"/><block s="reportIfElse"><block s="reportIsA"><block ` +
        `var="target"/><l><option>list</option></l></block><block s="reportNe` +
        `wSoundFromSamples"><block var="target"/><l>44100</l></block><block s` +
        `="reportFindFirst"><block s="reifyPredicate"><autolambda><block s="r` +
        `eportVariadicEquals"><list><block s="reportGetSoundAttribute"><l><op` +
        `tion>name</option></l><l></l></block><block var="target"/></list></b` +
        `lock></autolambda><list></list></block><block s="reportGet"><l><opti` +
        `on>sounds</option></l></block></block></block></block></block><block` +
        ` s="doIf"><block s="reportIsA"><block var="sound"/><l><option>sound<` +
        `/option></l></block><script><block s="playSound"><block var="sound"/` +
        `></block><block s="doWait"><block s="reportGetSoundAttribute"><l><op` +
        `tion>duration</option></l><block var="sound"/></block></block></scri` +
        `pt><list></list></block></script></scripts></block-definition><block` +
        `-definition s="play sound %&apos;target&apos; at %&apos;rate&apos; H` +
        `z" type="command" category="sound" selector="doPlaySoundAtRate" prim` +
        `itive="doPlaySoundAtRate"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true"><options>§` +
        `_soundsMenu</options></input><input type="%n">44100<options>22.05 kH` +
        `z=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;9` +
        `6 kHz=96000</options></input><input type="%s" readonly="true"><optio` +
        `ns>§_soundsMenu</options></input><input type="%n">44100<options>22.0` +
        `5 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#` +
        `xD;96 kHz=96000</options></input><input type="%s" readonly="true"><o` +
        `ptions>§_soundsMenu</options></input></inputs><script><block s="play` +
        `Sound"><block s="reportNewSoundFromSamples"><block s="reportGetSound` +
        `Attribute"><l><option>samples</option></l><block var="target"/></blo` +
        `ck><block var="rate"/></block></block></script><scripts><script x="1` +
        `0" y="98"><block s="playSound"><block s="reportNewSoundFromSamples">` +
        `<block s="reportGetSoundAttribute"><l><option>samples</option></l><b` +
        `lock var="target"/></block><block var="rate"/></block></block></scri` +
        `pt></scripts></block-definition><block-definition s="stop all sounds` +
        `" type="command" category="sound" selector="doStopAllSounds" primiti` +
        `ve="doStopAllSounds"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"%#1 of sound %#2" type="reporter" category="sound" selector="report` +
        `GetSoundAttribute" primitive="reportGetSoundAttribute"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true" irreplaceable="true">$_duration<options>name=$_na` +
        `me&#xD;duration=$_duration&#xD;length=$_length&#xD;number of channel` +
        `s=$_number of channels&#xD;sample rate=$_sample rate&#xD;samples=$_s` +
        `amples</options></input><input type="%s" readonly="true"><options>§_` +
        `soundsMenu</options></input></inputs></block-definition><block-defin` +
        `ition s="new sound %#1 rate %#2 Hz" type="reporter" category="sound"` +
        ` selector="reportNewSoundFromSamples" primitive="reportNewSoundFromS` +
        `amples"><header></header><code></code><translations></translations><` +
        `inputs><input type="%l" readonly="true"></input><input type="%n">441` +
        `00<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;8` +
        `8.2 kHz=88200&#xD;96 kHz=96000</options></input></inputs></block-def` +
        `inition><block-definition s="rest for %&apos;beats&apos; beats" type` +
        `="command" category="sound" selector="doRest"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">0.2</i` +
        `nput><input type="%n">0.2</input><input type="%n">0.2</input></input` +
        `s><script><block s="doWait"><block s="reportQuotient"><l>60</l><bloc` +
        `k s="reportVariadicProduct"><list><block var="beats"/><block s="getT` +
        `empo"></block></list></block></block></block></script></block-defini` +
        `tion><block-definition s="play note %#1 for %#2 beats" type="command` +
        `" category="sound" selector="doPlayNote" primitive="doPlayNote"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">60<options>§_pianoKeyboardMenu</options></input><input t` +
        `ype="%n">0.5</input></inputs></block-definition><block-definition s=` +
        `"play %#1 Hz for %#2 secs" type="command" category="sound" selector=` +
        `"doPlayFrequency" primitive="doPlayFrequency"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">440</i` +
        `nput><input type="%n">2</input></inputs></block-definition><block-de` +
        `finition s="set instrument to %#1" type="command" category="sound" s` +
        `elector="doSetInstrument" primitive="doSetInstrument"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">1<options>(1) sine=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) t` +
        `riangle=4</options></input></inputs></block-definition><block-defini` +
        `tion s="change tempo by %&apos;delta&apos;" type="command" category=` +
        `"sound" selector="doChangeTempo"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">20</input><input ty` +
        `pe="%n">20</input><input type="%n">20</input></inputs><script><block` +
        ` s="doSetTempo"><block s="reportVariadicSum"><list><block s="getTemp` +
        `o"></block><block var="delta"/></list></block></block></script></blo` +
        `ck-definition><block-definition s="set tempo to %#1 bpm" type="comma` +
        `nd" category="sound" selector="doSetTempo" primitive="doSetTempo"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">60</input></inputs></block-definition><block-definitio` +
        `n s="tempo" type="reporter" category="sound" selector="getTempo" pri` +
        `mitive="getTempo"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="ch` +
        `ange volume by %&apos;delta&apos;" type="command" category="sound" s` +
        `elector="changeVolume"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">10</input><input type="%n">10` +
        `</input><input type="%n">10</input></inputs><script><block s="setVol` +
        `ume"><block s="reportVariadicSum"><list><block s="getVolume"></block` +
        `><block var="delta"/></list></block></block></script></block-definit` +
        `ion><block-definition s="set volume to %#1 %" type="command" categor` +
        `y="sound" selector="setVolume" primitive="setVolume"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>100</input></inputs></block-definition><block-definition s="volume"` +
        ` type="reporter" category="sound" selector="getVolume" primitive="ge` +
        `tVolume"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="change bala` +
        `nce by %&apos;delta&apos;" type="command" category="sound" selector=` +
        `"changePan"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n">10</input><input type="%n">10</input><in` +
        `put type="%n">10</input></inputs><script><block s="setPan"><block s=` +
        `"reportVariadicSum"><list><block s="getPan"></block><block var="delt` +
        `a"/></list></block></block></script></block-definition><block-defini` +
        `tion s="set balance to %#1" type="command" category="sound" selector` +
        `="setPan" primitive="setPan"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">0</input></inputs></blo` +
        `ck-definition><block-definition s="balance" type="reporter" category` +
        `="sound" selector="getPan" primitive="getPan"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="play frequency %#1 Hz" type="command" cate` +
        `gory="sound" selector="playFreq" primitive="playFreq"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">440</input></inputs></block-definition><block-definition s="stop f` +
        `requency" type="command" category="sound" selector="stopFreq" primit` +
        `ive="stopFreq"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="jukeb` +
        `ox" type="reporter" category="sound" selector="reportSounds" primiti` +
        `ve="reportSounds"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="cl` +
        `ear" type="command" category="pen" selector="clear" primitive="clear` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="pen down" type="co` +
        `mmand" category="pen" selector="down" primitive="down"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs></blo` +
        `ck-definition><block-definition s="pen up" type="command" category="` +
        `pen" selector="up" primitive="up"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="pen down?" type="predicate" category="pen" selector="g` +
        `etPenDown" primitive="getPenDown"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="set pen color to %&apos;color&apos;" type="command" ca` +
        `tegory="pen" selector="setColor"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%clr" readonly="true" i` +
        `rreplaceable="true"></input><input type="%clr" readonly="true" irrep` +
        `laceable="true"></input><input type="%clr" readonly="true" irreplace` +
        `able="true"></input></inputs><script><block s="doApplyExtension"><l>` +
        `clr_setpen(clr)</l><list><block var="color"/></list></block></script` +
        `></block-definition><block-definition s="set pen %#1 to %#2" type="c` +
        `ommand" category="pen" selector="setPenColorDimension" primitive="se` +
        `tPenColorDimension"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightn` +
        `ess=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-` +
        `b(-a)=$_r-g-b(-a)</options></input><input type="%n">50</input></inpu` +
        `ts></block-definition><block-definition s="change pen %&apos;aspect&` +
        `apos; by %&apos;delta&apos;" type="command" category="pen" selector=` +
        `"changePenColorDimension" primitive="changePenColorDimension"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_h` +
        `ue&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;trans` +
        `parency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options` +
        `></input><input type="%n">10</input><input type="%s" readonly="true"` +
        ` irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_satur` +
        `ation&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#x` +
        `D;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n"` +
        `>10</input><input type="%s" readonly="true" irreplaceable="true">hue` +
        `<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#12` +
        `6;&#xD;r-g-b(-a)</options></input></inputs></block-definition><block` +
        `-definition s="pen %#1" type="reporter" category="pen" selector="get` +
        `PenAttribute" primitive="getPenAttribute"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">$_hue<options>size=$_size&#xD;hue=$_hue&#` +
        `xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transpare` +
        `ncy=$_transparency&#xD;&#126;&#xD;r-g-b-a=$_r-g-b-a</options></input` +
        `></inputs></block-definition><block-definition s="set background col` +
        `or to %#1" type="command" category="pen" selector="setBackgroundColo` +
        `r" primitive="setBackgroundColor"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%clr" readonly="true" ` +
        `irreplaceable="true"></input></inputs></block-definition><block-defi` +
        `nition s="set background %#1 to %#2" type="command" category="pen" s` +
        `elector="setBackgroundColorDimension" primitive="setBackgroundColorD` +
        `imension"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">$_hue` +
        `<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brig` +
        `htness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-` +
        `g-b(-a)</options></input><input type="%n">50</input></inputs></block` +
        `-definition><block-definition s="change background %#1 by %#2" type=` +
        `"command" category="pen" selector="changeBackgroundColorDimension" p` +
        `rimitive="changeBackgroundColorDimension"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_` +
        `saturation&#xD;brightness=$_brightness&#xD;transparency=$_transparen` +
        `cy&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type` +
        `="%n">10</input></inputs></block-definition><block-definition s="cha` +
        `nge pen size by %&apos;delta&apos;" type="command" category="pen" se` +
        `lector="changeSize"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">1</input><input type="%n">1</inp` +
        `ut><input type="%n">1</input></inputs><script><block s="setSize"><bl` +
        `ock s="reportVariadicSum"><list><block s="getPenAttribute"><l><optio` +
        `n>size</option></l></block><block var="delta"/></list></block></bloc` +
        `k></script></block-definition><block-definition s="set pen size to %` +
        `#1" type="command" category="pen" selector="setSize" primitive="setS` +
        `ize"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">1</input></inputs></block-definition><block-def` +
        `inition s="stamp" type="command" category="pen" selector="doStamp" p` +
        `rimitive="doStamp"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs></block-definition><block-definition s="f` +
        `ill" type="command" category="pen" selector="floodFill" primitive="f` +
        `loodFill"><header></header><code></code><translations></translations` +
        `><inputs></inputs></block-definition><block-definition s="write %#1 ` +
        `size %#2" type="command" category="pen" selector="write" primitive="` +
        `write"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s">Hello!</input><input type="%n">12</input></in` +
        `puts></block-definition><block-definition s="pen trails" type="repor` +
        `ter" category="pen" selector="reportPenTrailsAsCostume" primitive="r` +
        `eportPenTrailsAsCostume"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="pen vectors" type="reporter" category="pen" selector="reportPen` +
        `trailsAsSVG" primitive="reportPentrailsAsSVG"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="paste on %#1" type="command" category="pen` +
        `" selector="doPasteOn" primitive="doPasteOn"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true"><options>§_objectsMenu</options></input></inputs></block-de` +
        `finition><block-definition s="cut from %#1" type="command" category=` +
        `"pen" selector="doCutFrom" primitive="doCutFrom"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true"><options>§_objectsMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="message" type="reporter" category=` +
        `"control" selector="getLastMessage" primitive="getLastMessage"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts></block-definition><block-definition s="broadcast %#1 %#2" type="` +
        `command" category="control" selector="doBroadcast" primitive="doBroa` +
        `dcast"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true"><options>§_messagesMenu</opti` +
        `ons></input><input type="%receive" readonly="true" irreplaceable="tr` +
        `ue" expand="to&#xD;with data" max="2"></input></inputs></block-defin` +
        `ition><block-definition s="broadcast %#1 %#2 and wait" type="command` +
        `" category="control" selector="doBroadcastAndWait" primitive="doBroa` +
        `dcastAndWait"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true"><options>§_messagesMen` +
        `u</options></input><input type="%receive" readonly="true" irreplacea` +
        `ble="true" expand="to&#xD;with data" max="2"></input></inputs></bloc` +
        `k-definition><block-definition s="wait %&apos;duration&apos; secs" t` +
        `ype="command" category="control" selector="doWait"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%n">1` +
        `</input><input type="%n">1</input><input type="%n">1</input></inputs` +
        `><script><block s="doDeclareVariables"><list><l>start time</l></list` +
        `></block><block s="doSetVar"><l>start time</l><block s="reportDate">` +
        `<l><option>time in milliseconds</option></l></block></block><block s` +
        `="doWaitUntil"><block s="reportVariadicGreaterThanOrEquals"><list><b` +
        `lock s="reportDate"><l><option>time in milliseconds</option></l></bl` +
        `ock><block s="reportVariadicSum"><list><block var="start time"/><blo` +
        `ck s="reportVariadicProduct"><list><block var="duration"/><l>1000</l` +
        `></list></block></list></block></list></block></block></script></blo` +
        `ck-definition><block-definition s="wait until %&apos;condition&apos;` +
        `" type="command" category="control" selector="doWaitUntil"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%boolUE" readonly="true"></input><input type="%boolUE" readonly="` +
        `true"></input><input type="%boolUE" readonly="true"></input></inputs` +
        `><script><block s="doIf"><block s="reportNot"><block s="evaluate"><b` +
        `lock var="condition"/><list></list></block></block><script><block s=` +
        `"doWaitUntil"><block s="evaluate"><block var="condition"/><list></li` +
        `st></block></block></script><list></list></block></script></block-de` +
        `finition><block-definition s="forever %&apos;action&apos;" type="com` +
        `mand" category="control" selector="doForever"><header></header><code` +
        `></code><translations></translations><inputs><input type="%loop" rea` +
        `donly="true" irreplaceable="true"></input><input type="%loop" readon` +
        `ly="true" irreplaceable="true"></input><input type="%loop" readonly=` +
        `"true" irreplaceable="true"></input></inputs><script><block s="doRun` +
        `"><block var="action"/><list></list></block><block s="doRun"><block ` +
        `s="reportEnvironment"><l><option>script</option></l></block><list><b` +
        `lock var="action"/></list></block></script></block-definition><block` +
        `-definition s="repeat %&apos;count&apos; %&apos;action&apos;" type="` +
        `command" category="control" selector="doRepeat"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">10</` +
        `input><input type="%loop" readonly="true" irreplaceable="true"></inp` +
        `ut><input type="%n">10</input><input type="%loop" readonly="true" ir` +
        `replaceable="true"></input><input type="%loop" readonly="true" irrep` +
        `laceable="true"></input></inputs><script><block s="doDeclareVariable` +
        `s"><list><l>self</l></list></block><block s="doSetVar"><l>self</l><b` +
        `lock s="reportEnvironment"><l><option>script</option></l></block></b` +
        `lock><block s="doIf"><block s="reportVariadicGreaterThan"><list><blo` +
        `ck var="count"/><l>0</l></list></block><script><block s="doRun"><blo` +
        `ck var="action"/><list></list></block><block s="doApplyExtension"><l` +
        `>snap_yield</l><list></list></block><block s="doRun"><block var="sel` +
        `f"/><list><block s="reportDifference"><block var="count"/><l>1</l></` +
        `block><block var="action"/></list></block></script><list></list></bl` +
        `ock></script></block-definition><block-definition s="repeat until %&` +
        `apos;condition&apos; %&apos;action&apos;" type="command" category="c` +
        `ontrol" selector="doUntil"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%boolUE" readonly="true"></in` +
        `put><input type="%loop" readonly="true" irreplaceable="true"></input` +
        `><input type="%boolUE" readonly="true"></input><input type="%loop" r` +
        `eadonly="true" irreplaceable="true"></input><input type="%loop" read` +
        `only="true" irreplaceable="true"></input></inputs><script><block s="` +
        `doDeclareVariables"><list><l>self</l></list></block><block s="doSetV` +
        `ar"><l>self</l><block s="reportEnvironment"><l><option>script</optio` +
        `n></l></block></block><block s="doIf"><block s="reportNot"><block s=` +
        `"evaluate"><block var="condition"/><list></list></block></block><scr` +
        `ipt><block s="doRun"><block var="action"/><list></list></block><bloc` +
        `k s="doApplyExtension"><l>snap_yield</l><list></list></block><block ` +
        `s="doRun"><block var="self"/><list><block var="condition"/><block va` +
        `r="action"/></list></block></script><list></list></block></script></` +
        `block-definition><block-definition s="for %&apos;count&apos; = %&apo` +
        `s;start&apos; to %&apos;end&apos; %&apos;action&apos;" type="command` +
        `" category="control" selector="doFor"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%upvar" readonly="` +
        `true" irreplaceable="true">i</input><input type="%n">1</input><input` +
        ` type="%n">10</input><input type="%loop" readonly="true" irreplaceab` +
        `le="true"></input><input type="%upvar" readonly="true" irreplaceable` +
        `="true">i</input><input type="%n">1</input><input type="%n">10</inpu` +
        `t><input type="%loop" readonly="true" irreplaceable="true"></input><` +
        `input type="%loop" readonly="true" irreplaceable="true"></input></in` +
        `puts><script><block s="doDeclareVariables"><list><l>test</l><l>incre` +
        `ment</l></list></block><block s="doSetVar"><l>count</l><block var="s` +
        `tart"/></block><block s="doIfElse"><block s="reportVariadicLessThan"` +
        `><list><block var="start"/><block var="end"/></list></block><script>` +
        `<block s="doSetVar"><l>test</l><block s="reifyPredicate"><autolambda` +
        `><block s="reportVariadicGreaterThan"><list><block var="count"/><blo` +
        `ck var="end"/></list></block></autolambda><list></list></block></blo` +
        `ck><block s="doSetVar"><l>increment</l><l>1</l></block></script><scr` +
        `ipt><block s="doSetVar"><l>test</l><block s="reifyPredicate"><autola` +
        `mbda><block s="reportVariadicLessThan"><list><block var="count"/><bl` +
        `ock var="end"/></list></block></autolambda><list></list></block></bl` +
        `ock><block s="doSetVar"><l>increment</l><l>-1</l></block></script></` +
        `block><block s="doUntil"><block s="evaluate"><block var="test"/><lis` +
        `t></list></block><script><block s="doRun"><block var="action"/><list` +
        `></list></block><block s="doChangeVar"><l>count</l><block var="incre` +
        `ment"/></block></script></block></script></block-definition><block-d` +
        `efinition s="if %&apos;condition&apos; %&apos;true case&apos; %&apos` +
        `;else pairs&apos;" type="command" category="control" selector="doIf"` +
        ` primitive="doIf"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%b" readonly="true"></input><input typ` +
        `e="%cs" readonly="true" irreplaceable="true"></input><input type="%e` +
        `lseif" readonly="true" irreplaceable="true" expand="else if&#xD;"></` +
        `input><input type="%b" readonly="true"></input><input type="%cs" rea` +
        `donly="true" irreplaceable="true"></input><input type="%elseif" read` +
        `only="true" irreplaceable="true" expand="else if&#xD;"></input><inpu` +
        `t type="%b" readonly="true"></input></inputs><script><block s="doDec` +
        `lareVariables"><list><l>self</l></list></block><block s="doSetVar"><` +
        `l>self</l><block s="reportEnvironment"><l><option>script</option></l` +
        `></block></block><block s="doIfElse"><block var="condition"/><script` +
        `><block s="doRun"><block var="true case"/><list></list></block></scr` +
        `ipt><script><block s="doIfElse"><block s="reportListIsEmpty"><block ` +
        `var="else pairs"/></block><script></script><script><block s="doIfEls` +
        `e"><block s="reportListItem"><l>1</l><block var="else pairs"/></bloc` +
        `k><script><block s="doRun"><block s="reportListItem"><l>2</l><block ` +
        `var="else pairs"/></block><list></list></block></script><script><blo` +
        `ck s="doRun"><block var="self"/><list><block s="reportBoolean"><l><b` +
        `ool>false</bool></l></block><l></l><block s="reportCDR"><block s="re` +
        `portCDR"><block var="else pairs"/></block></block></list></block></s` +
        `cript></block></script></block></script></block></script><scripts><s` +
        `cript x="10" y="98"><block s="doDeclareVariables"><list><l>self</l><` +
        `/list></block><block s="doSetVar"><l>self</l><block s="reportEnviron` +
        `ment"><l><option>script</option></l></block></block><block s="doIfEl` +
        `se"><block var="condition"/><script><block s="doRun"><block var="tru` +
        `e case"/><list></list></block></script><script><block s="doIfElse"><` +
        `block s="reportListIsEmpty"><block var="else pairs"/></block><script` +
        `></script><script><block s="doIfElse"><block s="reportListItem"><l>1` +
        `</l><block var="else pairs"/></block><script><block s="doRun"><block` +
        ` s="reportListItem"><l>2</l><block var="else pairs"/></block><list><` +
        `/list></block></script><script><block s="doRun"><block var="self"/><` +
        `list><block s="reportBoolean"><l><bool>false</bool></l></block><l></` +
        `l><block s="reportCDR"><block s="reportCDR"><block var="else pairs"/` +
        `></block></block></list></block></script></block></script></block></` +
        `script></block></script></scripts></block-definition><block-definiti` +
        `on s="if %&apos;condition&apos; %&apos;true case&apos; else %&apos;f` +
        `alse case&apos;" type="command" category="control" selector="doIfEls` +
        `e" primitive="doIfElse"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%b" readonly="true"></input><inp` +
        `ut type="%cs" readonly="true" irreplaceable="true"></input><input ty` +
        `pe="%cs" readonly="true" irreplaceable="true"></input><input type="%` +
        `b" readonly="true"></input><input type="%cs" readonly="true" irrepla` +
        `ceable="true"></input><input type="%cs" readonly="true" irreplaceabl` +
        `e="true"></input><input type="%cs" readonly="true" irreplaceable="tr` +
        `ue"></input></inputs><scripts><script x="10" y="97.83333333333331"><` +
        `block s="doRun"><block s="reportListItem"><block s="reportVariadicSu` +
        `m"><list><block var="condition"/><l>1</l></list></block><block s="re` +
        `portNewList"><list><block var="false case"/><block var="true case"/>` +
        `</list></block></block><list></list></block></script></scripts></blo` +
        `ck-definition><block-definition s="if %&apos;condition&apos; then %&` +
        `apos;true case&apos; else %&apos;false case&apos;" type="reporter" c` +
        `ategory="control" selector="reportIfElse" primitive="reportIfElse"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%b" readonly="true"></input><input type="%anyUE"></input>` +
        `<input type="%anyUE"></input><input type="%b" readonly="true"></inpu` +
        `t><input type="%anyUE"></input><input type="%anyUE"></input><input t` +
        `ype="%b" readonly="true"></input></inputs><scripts><script x="10" y=` +
        `"91.83333333333331"><block s="doReport"><block s="reportHyperZip"><b` +
        `lock s="reifyReporter"><autolambda><block s="evaluate"><block s="rep` +
        `ortListItem"><l></l><l/></block><list></list></block></autolambda><l` +
        `ist></list></block><block s="reportVariadicSum"><list><block var="co` +
        `ndition"/><l>1</l></list></block><l>0</l><block s="reportNewList"><l` +
        `ist><block var="false case"/><block var="true case"/></list></block>` +
        `<l>1</l></block></block></script></scripts></block-definition><block` +
        `-definition s="stop %#1" type="command" category="control" selector=` +
        `"doStopThis" primitive="doStopThis"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true" ` +
        `irreplaceable="true">$_all<options>all=$_all&#xD;all scenes=$_all sc` +
        `enes&#xD;this script=$_this script&#xD;this block=$_this block&#xD;a` +
        `ll but this script=$_all but this script&#xD;other scripts in sprite` +
        `=$_other scripts in sprite</options></input></inputs></block-definit` +
        `ion><block-definition s="run %&apos;action&apos; %&apos;inputs&apos;` +
        `" type="command" category="control" selector="doRun"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%cm` +
        `dRing" readonly="true"></input><input type="%mult%s" readonly="true"` +
        ` expand="with inputs"></input></inputs><script><block s="doReport"><` +
        `block s="evaluate"><block var="action"/><block var="inputs"/></block` +
        `></block></script></block-definition><block-definition s="launch %#1` +
        ` %#2" type="command" category="control" selector="fork" primitive="f` +
        `ork"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%cmdRing" readonly="true"></input><input type="%mul` +
        `t%s" readonly="true" expand="with inputs"></input></inputs></block-d` +
        `efinition><block-definition s="call %#1 %#2" type="reporter" categor` +
        `y="control" selector="evaluate" primitive="evaluate"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%re` +
        `pRing" readonly="true" irreplaceable="true"></input><input type="%mu` +
        `lt%s" readonly="true" expand="with inputs"></input></inputs></block-` +
        `definition><block-definition s="report %#1" type="command" category=` +
        `"control" selector="doReport" primitive="doReport"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s"><` +
        `/input></inputs></block-definition><block-definition s="run %#1 w/co` +
        `ntinuation" type="command" category="control" selector="doCallCC" pr` +
        `imitive="doCallCC"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%cmdRing" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="call %#1 w/continuatio` +
        `n" type="reporter" category="control" selector="reportCallCC" primit` +
        `ive="reportCallCC"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%cmdRing" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="warp %#1" type="comman` +
        `d" category="other" selector="doWarp" primitive="doWarp"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%cs" readonly="true" irreplaceable="true"></input></inputs></block-` +
        `definition><block-definition s="tell %&apos;target&apos; to %&apos;a` +
        `ction&apos; %&apos;parameters&apos;" type="command" category="contro` +
        `l" selector="doTellTo"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true"><options>§_ob` +
        `jectsMenu</options></input><input type="%cmdRing" readonly="true"></` +
        `input><input type="%mult%s" readonly="true" expand="with inputs"></i` +
        `nput><input type="%s" readonly="true"><options>§_objectsMenu</option` +
        `s></input><input type="%cmdRing" readonly="true"></input><input type` +
        `="%mult%s" readonly="true" expand="with inputs"></input><input type=` +
        `"%s" readonly="true"><options>§_objectsMenu</options></input></input` +
        `s><script><block s="doRun"><block s="reportAttributeOf"><block var="` +
        `action"/><block var="target"/></block><block var="parameters"/></blo` +
        `ck></script></block-definition><block-definition s="ask %&apos;targe` +
        `t&apos; for %&apos;action&apos; %&apos;parameters&apos;" type="repor` +
        `ter" category="control" selector="reportAskFor"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true"><options>§_objectsMenu</options></input><input type="%re` +
        `pRing" readonly="true" irreplaceable="true"></input><input type="%mu` +
        `lt%s" readonly="true" expand="with inputs"></input><input type="%s" ` +
        `readonly="true"><options>§_objectsMenu</options></input><input type=` +
        `"%repRing" readonly="true" irreplaceable="true"></input><input type=` +
        `"%mult%s" readonly="true" expand="with inputs"></input><input type="` +
        `%s" readonly="true"><options>§_objectsMenu</options></input></inputs` +
        `><script><block s="doReport"><block s="evaluate"><block s="reportAtt` +
        `ributeOf"><block var="action"/><block var="target"/></block><block v` +
        `ar="parameters"/></block></block></script></block-definition><block-` +
        `definition s="create a clone of %&apos;target&apos;" type="command" ` +
        `category="control" selector="createClone"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true">$_myself<options>§_clonablesMenu</options></input><input type=` +
        `"%s" readonly="true">$_myself<options>§_clonablesMenu</options></inp` +
        `ut><input type="%s" readonly="true">myself<options>§_clonablesMenu</` +
        `options></input></inputs><script><block s="doReport"><block s="newCl` +
        `one"><block var="target"/></block></block></script></block-definitio` +
        `n><block-definition s="a new clone of %#1" type="reporter" category=` +
        `"control" selector="newClone" primitive="newClone"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true">$_myself<options>§_clonablesMenu</options></input></i` +
        `nputs></block-definition><block-definition s="delete this clone" typ` +
        `e="command" category="control" selector="removeClone" primitive="rem` +
        `oveClone"><header></header><code></code><translations></translations` +
        `><inputs></inputs></block-definition><block-definition s="define %#1` +
        ` %#2 %#3" type="command" category="control" selector="doDefineBlock"` +
        ` primitive="doDefineBlock"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%upvar" readonly="true" irrep` +
        `laceable="true">$_block</input><input type="%s"></input><input type=` +
        `"%repRing" readonly="true" irreplaceable="true"></input></inputs></b` +
        `lock-definition><block-definition s="set %#1 of block %#2 to %#3" ty` +
        `pe="command" category="control" selector="doSetBlockAttribute" primi` +
        `tive="doSetBlockAttribute"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">$_label<options>label=$_label&#xD;definition=$_definitio` +
        `n&#xD;comment=$_comment&#xD;category=$_category&#xD;type=$_type&#xD;` +
        `scope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&#xD;&#126;&#` +
        `xD;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$_editables&#` +
        `xD;replaceables=$_replaceables&#xD;&#126;&#xD;separators=$_separator` +
        `s&#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;initial slots=` +
        `$_initial slots&#xD;min slots=$_min slots&#xD;max slots=$_max slots&` +
        `#xD;translations=$_translations</options></input><input type="%repRi` +
        `ng" readonly="true" irreplaceable="true"></input><input type="%s"></` +
        `input></inputs></block-definition><block-definition s="delete block ` +
        `%#1" type="command" category="control" selector="doDeleteBlock" prim` +
        `itive="doDeleteBlock"><header></header><code></code><translations></` +
        `translations><inputs><input type="%repRing" readonly="true" irreplac` +
        `eable="true"></input></inputs></block-definition><block-definition s` +
        `="%#1 of block %#2" type="reporter" category="control" selector="rep` +
        `ortBlockAttribute" primitive="reportBlockAttribute"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true" irreplaceable="true">$_definition<options>label=$_la` +
        `bel&#xD;definition=$_definition&#xD;comment=$_comment&#xD;category=$` +
        `_category&#xD;custom?=$_custom?&#xD;global?=$_global?&#xD;type=$_typ` +
        `e&#xD;scope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&#xD;&#` +
        `126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$_edita` +
        `bles&#xD;replaceables=$_replaceables&#xD;&#126;&#xD;separators=$_sep` +
        `arators&#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;initial ` +
        `slots=$_initial slots&#xD;min slots=$_min slots&#xD;max slots=$_max ` +
        `slots&#xD;translations=$_translations</options></input><input type="` +
        `%repRing" readonly="true" irreplaceable="true"></input></inputs></bl` +
        `ock-definition><block-definition s="this %#1" type="reporter" catego` +
        `ry="control" selector="reportEnvironment" primitive="reportEnvironme` +
        `nt"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">$_script<op` +
        `tions>script=$_script&#xD;caller=$_caller&#xD;continuation=$_continu` +
        `ation&#xD;&#126;&#xD;inputs=$_inputs</options></input></inputs></blo` +
        `ck-definition><block-definition s="pause all $pause" type="command" ` +
        `category="control" selector="doPauseAll" primitive="doPauseAll"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="switch to scene %#1 %#2"` +
        ` type="command" category="control" selector="doSwitchToScene" primit` +
        `ive="doSwitchToScene"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true">$_next<options` +
        `>§_scenesMenu</options></input><input type="%send" readonly="true" i` +
        `rreplaceable="true" expand="and send&#xD;with data" max="2"></input>` +
        `</inputs></block-definition><block-definition s="pipe %&apos;value&a` +
        `pos; $arrowRight %&apos;functions&apos;" type="reporter" category="c` +
        `ontrol" selector="reportPipe"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s"></input><input type="%` +
        `mult%repRing" readonly="true"></input><input type="%s"></input><inpu` +
        `t type="%mult%repRing" readonly="true" initial="1"></input></inputs>` +
        `<script><block s="doReport"><block s="reportIfElse"><block s="report` +
        `ListIsEmpty"><block var="functions"/></block><block var="value"/><bl` +
        `ock s="reportPipe"><block s="evaluate"><block s="reportListItem"><l>` +
        `1</l><block var="functions"/></block><list><block var="value"/></lis` +
        `t></block><block s="reportCDR"><block var="functions"/></block></blo` +
        `ck></block></block></script></block-definition><block-definition s="` +
        `touching %#1 ?" type="predicate" category="sensing" selector="report` +
        `TouchingObject" primitive="reportTouchingObject"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true">$_mouse-pointer<options>§_collidablesMenu</options></in` +
        `put></inputs></block-definition><block-definition s="touching %#1 ?"` +
        ` type="predicate" category="sensing" selector="reportTouchingColor" ` +
        `primitive="reportTouchingColor"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%clr" readonly="true" ir` +
        `replaceable="true"></input></inputs></block-definition><block-defini` +
        `tion s="color %#1 is touching %#2 ?" type="predicate" category="sens` +
        `ing" selector="reportColorIsTouchingColor" primitive="reportColorIsT` +
        `ouchingColor"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%clr" readonly="true" irreplaceable="true"` +
        `></input><input type="%clr" readonly="true" irreplaceable="true"></i` +
        `nput></inputs></block-definition><block-definition s="%#1 at %#2" ty` +
        `pe="reporter" category="sensing" selector="reportAspect" primitive="` +
        `reportAspect"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true" irreplaceable="true">$` +
        `_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_` +
        `brightness&#xD;transparency=$_transparency&#xD;r-g-b-a=$_r-g-b-a&#xD` +
        `;&#126;&#xD;sprites=$_sprites</options></input><input type="%s" read` +
        `only="true">$_mouse-pointer<options>§_locationMenu</options></input>` +
        `</inputs></block-definition><block-definition s="stack size" type="r` +
        `eporter" category="sensing" selector="reportStackSize" primitive="re` +
        `portStackSize"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="frame` +
        `s" type="reporter" category="sensing" selector="reportFrameCount" pr` +
        `imitive="reportFrameCount"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="yields" type="reporter" category="sensing" selector="reportYi` +
        `eldCount" primitive="reportYieldCount"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="processes" type="reporter" category="sensing" sel` +
        `ector="reportThreadCount" primitive="reportThreadCount"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="ask %#1 and wait" type="command"` +
        ` category="sensing" selector="doAsk" primitive="doAsk"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s">what&apos;s your name?</input></inputs></block-definition><block-` +
        `definition s="answer" type="reporter" category="sensing" selector="r` +
        `eportLastAnswer" primitive="reportLastAnswer"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="answer" type="reporter" category="sensing"` +
        ` selector="getLastAnswer" primitive="getLastAnswer"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="mouse position" type="reporter" cate` +
        `gory="sensing" selector="reportMousePosition"><header></header><code` +
        `></code><translations></translations><inputs></inputs><script><block` +
        ` s="doReport"><block s="reportNewList"><list><block s="reportMouseX"` +
        `></block><block s="reportMouseY"></block></list></block></block></sc` +
        `ript></block-definition><block-definition s="mouse x" type="reporter` +
        `" category="sensing" selector="reportMouseX" primitive="reportMouseX` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="mouse y" type="rep` +
        `orter" category="sensing" selector="reportMouseY" primitive="reportM` +
        `ouseY"><header></header><code></code><translations></translations><i` +
        `nputs></inputs></block-definition><block-definition s="mouse down?" ` +
        `type="predicate" category="sensing" selector="reportMouseDown" primi` +
        `tive="reportMouseDown"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="key %#1 pressed?" type="predicate" category="sensing" selector="r` +
        `eportKeyPressed" primitive="reportKeyPressed"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true">$_space<options>§_keysMenu</options></input></inputs></blo` +
        `ck-definition><block-definition s="%#1 to %#2" type="reporter" categ` +
        `ory="sensing" selector="reportRelationTo" primitive="reportRelationT` +
        `o"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true">$_distance<options>distance=$_dis` +
        `tance&#xD;direction=$_direction&#xD;ray length=$_ray length</options` +
        `></input><input type="%s" readonly="true">$_mouse-pointer<options>§_` +
        `destinationsMenu</options></input></inputs></block-definition><block` +
        `-definition s="reset timer" type="command" category="sensing" select` +
        `or="doResetTimer" primitive="doResetTimer"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="timer" type="reporter" category="sensing" sel` +
        `ector="reportTimer" primitive="reportTimer"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="timer" type="reporter" category="sensing" se` +
        `lector="getTimer" primitive="getTimer"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="%#1 of %#2" type="reporter" category="sensing" se` +
        `lector="reportAttributeOf" primitive="reportAttributeOf"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true">$_costume #<options>§_attributesMenu</options><` +
        `/input><input type="%s" readonly="true"><options>§_objectsMenu</opti` +
        `ons></input></inputs></block-definition><block-definition s="object ` +
        `%&apos;name&apos;" type="reporter" category="sensing" selector="repo` +
        `rtObject" primitive="reportObject"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true">$` +
        `_myself<options>§_objectsMenuWithSelf</options></input><input type="` +
        `%s" readonly="true">$_myself<options>§_objectsMenuWithSelf</options>` +
        `</input><input type="%s" readonly="true">myself<options>§_objectsMen` +
        `uWithSelf</options></input></inputs><script><block s="doReport"><blo` +
        `ck s="reportHyperZip"><block s="reifyReporter"><autolambda><block s=` +
        `"reportFindFirst"><block s="reifyPredicate"><autolambda><block s="re` +
        `portVariadicEquals"><list><block var="id"/><block s="reportAskFor"><` +
        `l></l><block s="reifyReporter"><autolambda><block s="reportGet"><l><` +
        `option>name</option></l></block></autolambda><list></list></block><l` +
        `ist></list></block></list></block></autolambda><list></list></block>` +
        `<block s="reportConcatenatedLists"><list><block s="reportAskFor"><bl` +
        `ock s="reportGet"><l><option>stage</option></l></block><block s="rei` +
        `fyReporter"><autolambda><block s="reportGet"><l><option>other sprite` +
        `s</option></l></block></autolambda><list></list></block><list></list` +
        `></block><block s="reportNewList"><list><block s="reportGet"><l><opt` +
        `ion>stage</option></l></block></list></block></list></block></block>` +
        `</autolambda><list><l>id</l></list></block><block var="name"/><l>0</` +
        `l><l></l><l>0</l></block></block></script><scripts><script x="10" y=` +
        `"98"><block s="doReport"><block s="reportHyperZip"><block s="reifyRe` +
        `porter"><autolambda><block s="reportFindFirst"><block s="reifyPredic` +
        `ate"><autolambda><block s="reportVariadicEquals"><list><block var="i` +
        `d"/><block s="reportAskFor"><l></l><block s="reifyReporter"><autolam` +
        `bda><block s="reportGet"><l><option>name</option></l></block></autol` +
        `ambda><list></list></block><list></list></block></list></block></aut` +
        `olambda><list></list></block><block s="reportConcatenatedLists"><lis` +
        `t><block s="reportAskFor"><block s="reportGet"><l><option>stage</opt` +
        `ion></l></block><block s="reifyReporter"><autolambda><block s="repor` +
        `tGet"><l><option>other sprites</option></l></block></autolambda><lis` +
        `t></list></block><list></list></block><block s="reportNewList"><list` +
        `><block s="reportGet"><l><option>stage</option></l></block></list></` +
        `block></list></block></block></autolambda><list><l>id</l></list></bl` +
        `ock><block var="name"/><l>0</l><l></l><l>0</l></block></block></scri` +
        `pt></scripts></block-definition><block-definition s="url %#1" type="` +
        `reporter" category="sensing" selector="reportURL" primitive="reportU` +
        `RL"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s">snap.berkeley.edu</input></inputs></block-defini` +
        `tion><block-definition s="set %#1 to %#2" type="command" category="s` +
        `ensing" selector="doSetGlobalFlag" primitive="doSetGlobalFlag"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">$_video capture<opti` +
        `ons>turbo mode=$_turbo mode&#xD;case sensitivity=$_case sensitivity&` +
        `#xD;flat line ends=$_flat line ends&#xD;log pen vectors=$_log pen ve` +
        `ctors&#xD;video capture=$_video capture&#xD;mirror video=$_mirror vi` +
        `deo</options></input><input type="%b" readonly="true"></input></inpu` +
        `ts></block-definition><block-definition s="is %#1 on?" type="predica` +
        `te" category="sensing" selector="reportGlobalFlag" primitive="report` +
        `GlobalFlag"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">$_t` +
        `urbo mode<options>turbo mode=$_turbo mode&#xD;case sensitivity=$_cas` +
        `e sensitivity&#xD;flat line ends=$_flat line ends&#xD;log pen vector` +
        `s=$_log pen vectors&#xD;video capture=$_video capture&#xD;mirror vid` +
        `eo=$_mirror video</options></input></inputs></block-definition><bloc` +
        `k-definition s="current %#1" type="reporter" category="sensing" sele` +
        `ctor="reportDate" primitive="reportDate"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">$_date<options>year=$_year&#xD;month=$_mon` +
        `th&#xD;date=$_date&#xD;day of week=$_day of week&#xD;hour=$_hour&#xD` +
        `;minute=$_minute&#xD;second=$_second&#xD;time in milliseconds=$_time` +
        ` in milliseconds</options></input></inputs></block-definition><block` +
        `-definition s="my %#1" type="reporter" category="sensing" selector="` +
        `reportGet" primitive="reportGet"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_neighbors<options>§_gettablesMenu</options></inp` +
        `ut></inputs></block-definition><block-definition s="microphone %#1" ` +
        `type="reporter" category="sensing" selector="reportAudio" primitive=` +
        `"reportAudio"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true" irreplaceable="true">$` +
        `_volume<options>§_audioMenu</options></input></inputs></block-defini` +
        `tion><block-definition s="%#1" type="reporter" category="operators" ` +
        `selector="reportVariadicSum" primitive="reportVariadicSum"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%mult%n" readonly="true" separator="+" collapse="sum" initial="2"` +
        `></input></inputs></block-definition><block-definition s="%&apos;a&a` +
        `pos; − %&apos;b&apos;" type="reporter" category="operators" selector` +
        `="reportDifference" primitive="reportDifference"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n"></i` +
        `nput><input type="%n"></input><input type="%n"></input><input type="` +
        `%n"></input></inputs><scripts><script x="10" y="91.83333333333331"><` +
        `block s="doReport"><block s="reportVariadicSum"><list><block var="a"` +
        `/><block s="reportMonadic"><l><option>neg</option></l><block var="b"` +
        `/></block></list></block></block></script></scripts></block-definiti` +
        `on><block-definition s="%#1" type="reporter" category="operators" se` +
        `lector="reportVariadicProduct" primitive="reportVariadicProduct"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%mult%n" readonly="true" separator="×" collapse="product" i` +
        `nitial="2"></input></inputs></block-definition><block-definition s="` +
        `%#1 / %#2" type="reporter" category="operators" selector="reportQuot` +
        `ient" primitive="reportQuotient"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n"></input><input type` +
        `="%n"></input></inputs></block-definition><block-definition s="round` +
        ` %#1" type="reporter" category="operators" selector="reportRound" pr` +
        `imitive="reportRound"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n"></input></inputs></block-defin` +
        `ition><block-definition s="%#1 of %#2" type="reporter" category="ope` +
        `rators" selector="reportMonadic" primitive="reportMonadic"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_sqrt<options>abs=$_abs` +
        `&#xD;neg=$_neg&#xD;sign=$_sign&#xD;ceiling=$_ceiling&#xD;floor=$_flo` +
        `or&#xD;sqrt=$_sqrt&#xD;sin=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD;asi` +
        `n=$_asin&#xD;acos=$_acos&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_log&#` +
        `xD;lg=$_lg&#xD;e^=$_e^&#xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</option` +
        `s></input><input type="%n">10</input></inputs></block-definition><bl` +
        `ock-definition s="%#1 ^ %#2" type="reporter" category="operators" se` +
        `lector="reportPower" primitive="reportPower"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n"></input` +
        `><input type="%n"></input></inputs></block-definition><block-definit` +
        `ion s="%#1 mod %#2" type="reporter" category="operators" selector="r` +
        `eportModulus" primitive="reportModulus"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n"></input><inp` +
        `ut type="%n"></input></inputs></block-definition><block-definition s` +
        `="atan2 %#1 ÷ %#2" type="reporter" category="operators" selector="re` +
        `portAtan2" primitive="reportAtan2"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n"></input><input ty` +
        `pe="%n"></input></inputs></block-definition><block-definition s="%#1` +
        `" type="reporter" category="operators" selector="reportVariadicMin" ` +
        `primitive="reportVariadicMin"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%mult%n" readonly="true" s` +
        `eparator="min" collapse="minimum" initial="2"></input></inputs></blo` +
        `ck-definition><block-definition s="%#1" type="reporter" category="op` +
        `erators" selector="reportVariadicMax" primitive="reportVariadicMax">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%mult%n" readonly="true" separator="max" collapse="maxim` +
        `um" initial="2"></input></inputs></block-definition><block-definitio` +
        `n s="pick random %#1 to %#2" type="reporter" category="operators" se` +
        `lector="reportRandom" primitive="reportRandom"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">1</in` +
        `put><input type="%n">10</input></inputs></block-definition><block-de` +
        `finition s="%#1" type="predicate" category="operators" selector="rep` +
        `ortVariadicEquals" primitive="reportVariadicEquals"><header></header` +
        `><code></code><translations></translations><inputs><input type="%mul` +
        `t%s" readonly="true" separator="=" collapse="all =" initial="2"></in` +
        `put></inputs></block-definition><block-definition s="%#1" type="pred` +
        `icate" category="operators" selector="reportVariadicNotEquals" primi` +
        `tive="reportVariadicNotEquals"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%mult%s" readonly="true" ` +
        `separator="≠" collapse="neighbors ≠" initial="2"></input></inputs></` +
        `block-definition><block-definition s="%#1" type="predicate" category` +
        `="operators" selector="reportVariadicLessThan" primitive="reportVari` +
        `adicLessThan"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%mult%s" readonly="true" separator="&lt;" ` +
        `collapse="all &lt;" initial="2"></input></inputs></block-definition>` +
        `<block-definition s="%#1" type="predicate" category="operators" sele` +
        `ctor="reportVariadicLessThanOrEquals" primitive="reportVariadicLessT` +
        `hanOrEquals"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%s" readonly="true" separator="≤" coll` +
        `apse="all ≤" initial="2"></input></inputs></block-definition><block-` +
        `definition s="%#1" type="predicate" category="operators" selector="r` +
        `eportVariadicGreaterThan" primitive="reportVariadicGreaterThan"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%mult%s" readonly="true" separator="&gt;" collapse="all &gt;` +
        `" initial="2"></input></inputs></block-definition><block-definition ` +
        `s="%#1" type="predicate" category="operators" selector="reportVariad` +
        `icGreaterThanOrEquals" primitive="reportVariadicGreaterThanOrEquals"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%s" readonly="true" separator="≥" collapse="all ≥"` +
        ` initial="2"></input></inputs></block-definition><block-definition s` +
        `="%#1" type="predicate" category="operators" selector="reportVariadi` +
        `cAnd" primitive="reportVariadicAnd"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%mult%b" readonly="t` +
        `rue" separator="and" collapse="all" initial="2"></input></inputs></b` +
        `lock-definition><block-definition s="%#1" type="predicate" category=` +
        `"operators" selector="reportVariadicOr" primitive="reportVariadicOr"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%b" readonly="true" separator="or" collapse="any" ` +
        `initial="2"></input></inputs></block-definition><block-definition s=` +
        `"not %&apos;bool&apos;" type="predicate" category="operators" select` +
        `or="reportNot"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%b" readonly="true"></input><input type="` +
        `%b" readonly="true"></input><input type="%b" readonly="true"></input` +
        `></inputs><script><block s="doReport"><block s="reportIfElse"><block` +
        ` var="bool"/><block s="reportBoolean"><l><bool>false</bool></l></blo` +
        `ck><block s="reportBoolean"><l><bool>true</bool></l></block></block>` +
        `</block></script></block-definition><block-definition s="%#1" type="` +
        `predicate" category="operators" selector="reportBoolean" primitive="` +
        `reportBoolean"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%b" readonly="true" irreplaceable="true">` +
        `true</input></inputs></block-definition><block-definition s="%#1" ty` +
        `pe="predicate" category="operators" selector="reportFalse" primitive` +
        `="reportFalse"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%b" readonly="true" irreplaceable="true">` +
        `false</input></inputs></block-definition><block-definition s="join %` +
        `#1" type="reporter" category="operators" selector="reportJoinWords" ` +
        `primitive="reportJoinWords"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%mult%s" readonly="true" ini` +
        `tial="2">hello &#xD;world</input></inputs></block-definition><block-` +
        `definition s="letter %&apos;idx&apos; of %&apos;text&apos;" type="re` +
        `porter" category="operators" selector="reportLetter" primitive="repo` +
        `rtLetter"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$` +
        `_random</options></input><input type="%s">world</input><input type="` +
        `%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options></inp` +
        `ut><input type="%s">world</input><input type="%n">1<options>1=1&#xD;` +
        `last&#xD;random</options></input></inputs><script><block s="doReport` +
        `"><block s="reportHyperZip"><block s="reifyReporter"><autolambda><bl` +
        `ock s="reportListItem"><l></l><block s="reportTextSplit"><l></l><l><` +
        `option>letter</option></l></block></block></autolambda><list></list>` +
        `</block><block var="idx"/><l>0</l><block var="text"/><l>0</l></block` +
        `></block></script><scripts><script x="10" y="98"><block s="doReport"` +
        `><block s="reportHyperZip"><block s="reifyReporter"><autolambda><blo` +
        `ck s="reportListItem"><l></l><block s="reportTextSplit"><l></l><l><o` +
        `ption>letter</option></l></block></block></autolambda><list></list><` +
        `/block><block var="idx"/><l>0</l><block var="text"/><l>0</l></block>` +
        `</block></script></scripts></block-definition><block-definition s="l` +
        `ength of %#1" type="reporter" category="operators" selector="reportS` +
        `tringSize" primitive="reportStringSize"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s">world</input` +
        `></inputs></block-definition><block-definition s="%#1 of text %#2" t` +
        `ype="reporter" category="operators" selector="reportTextAttribute" p` +
        `rimitive="reportTextAttribute"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">$_length<options>length=$_length&#xD;lower case=$_lo` +
        `wer case&#xD;upper case=$_upper case</options></input><input type="%` +
        `s">world</input></inputs></block-definition><block-definition s="uni` +
        `code of %#1" type="reporter" category="operators" selector="reportUn` +
        `icode" primitive="reportUnicode"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s">a</input></inputs><` +
        `/block-definition><block-definition s="unicode %#1 as letter" type="` +
        `reporter" category="operators" selector="reportUnicodeAsLetter" prim` +
        `itive="reportUnicodeAsLetter"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">65</input></inputs></b` +
        `lock-definition><block-definition s="is %#1 a %#2 ?" type="predicate` +
        `" category="operators" selector="reportIsA" primitive="reportIsA"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s">5</input><input type="%s" readonly="true" irreplaceabl` +
        `e="true">$_number<options>§_typesMenu</options></input></inputs></bl` +
        `ock-definition><block-definition s="is %#1 ?" type="predicate" categ` +
        `ory="operators" selector="reportVariadicIsIdentical" primitive="repo` +
        `rtVariadicIsIdentical"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%mult%s" readonly="true" separato` +
        `r="identical to" collapse="all identical" initial="2"></input></inpu` +
        `ts></block-definition><block-definition s="split %#1 by %#2" type="r` +
        `eporter" category="operators" selector="reportTextSplit" primitive="` +
        `reportTextSplit"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s">hello world</input><input type="%s"` +
        `> <options>letter=$_letter&#xD;word=$_word&#xD;line=$_line&#xD;tab=$` +
        `_tab&#xD;cr=$_cr&#xD;csv=$_csv&#xD;json=$_json&#xD;&#126;&#xD;blocks` +
        `=$_blocks</options></input></inputs></block-definition><block-defini` +
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
        `nput type="%s" readonly="true" irreplaceable="true">$_encode URI<opt` +
        `ions>encode URI=$_encode URI&#xD;decode URI=$_decode URI&#xD;encode ` +
        `URI component=$_encode URI component&#xD;decode URI component=$_deco` +
        `de URI component&#xD;XML escape=$_XML escape&#xD;XML unescape=$_XML ` +
        `unescape&#xD;JS escape=$_JS escape&#xD;hex sha512 hash=$_hex sha512 ` +
        `hash</options></input><input type="%s">Abelson &amp; Sussman</input>` +
        `</inputs></block-definition><block-definition s="compile %#1 for %#2` +
        ` args" type="reporter" category="operators" selector="reportCompiled` +
        `" primitive="reportCompiled"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%repRing" readonly="true" i` +
        `rreplaceable="true"></input><input type="%n">0</input></inputs></blo` +
        `ck-definition><block-definition s="set %#1 to %#2" type="command" ca` +
        `tegory="variables" selector="doSetVar" primitive="doSetVar"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true" irreplaceable="true"><options>§_getVarNamesD` +
        `ict</options></input><input type="%s">0</input></inputs></block-defi` +
        `nition><block-definition s="change %#1 by %#2" type="command" catego` +
        `ry="variables" selector="doChangeVar" primitive="doChangeVar"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true" irreplaceable="true"><options>§_getVarName` +
        `sDict</options></input><input type="%n">1</input></inputs></block-de` +
        `finition><block-definition s="show variable %#1" type="command" cate` +
        `gory="variables" selector="doShowVar" primitive="doShowVar"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true" irreplaceable="true"><options>§_getVarNamesD` +
        `ict</options></input></inputs></block-definition><block-definition s` +
        `="hide variable %#1" type="command" category="variables" selector="d` +
        `oHideVar" primitive="doHideVar"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%s" readonly="true" irre` +
        `placeable="true"><options>§_getVarNamesDict</options></input></input` +
        `s></block-definition><block-definition s="script variables %&apos;#1` +
        `&apos;" type="command" category="other" selector="doDeclareVariables` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%scriptVars" readonly="true" irreplaceable="true" init` +
        `ial="1" min="1"></input></inputs></block-definition><block-definitio` +
        `n s="inherit %#1" type="command" category="variables" selector="doDe` +
        `leteAttr" primitive="doDeleteAttr"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true"><` +
        `options>§_shadowedVariablesMenu</options></input></inputs></block-de` +
        `finition><block-definition s="list %&apos;inputs&apos;" type="report` +
        `er" category="lists" selector="reportNewList"><header></header><code` +
        `></code><translations></translations><inputs><input type="%mult%s" r` +
        `eadonly="true" irreplaceable="true" initial="1"></input><input type=` +
        `"%mult%s" readonly="true" irreplaceable="true" initial="1"></input><` +
        `input type="%mult%s" readonly="true" irreplaceable="true" initial="1` +
        `"></input></inputs><script><block s="doReport"><block var="inputs"/>` +
        `</block></script></block-definition><block-definition s="%#1 in fron` +
        `t of %#2" type="reporter" category="lists" selector="reportCONS" pri` +
        `mitive="reportCONS"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s"></input><input type="%l" readonl` +
        `y="true"></input></inputs></block-definition><block-definition s="it` +
        `em %#1 of %#2" type="reporter" category="lists" selector="reportList` +
        `Item" primitive="reportListItem"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">1<options>1=1&#xD;l` +
        `ast=$_last&#xD;random=$_random</options></input><input type="%l" rea` +
        `donly="true"></input></inputs></block-definition><block-definition s` +
        `="all but first of %#1" type="reporter" category="lists" selector="r` +
        `eportCDR" primitive="reportCDR"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%l" readonly="true"></in` +
        `put></inputs></block-definition><block-definition s="length of %#1" ` +
        `type="reporter" category="lists" selector="reportListLength" primiti` +
        `ve="reportListLength"><header></header><code></code><translations></` +
        `translations><inputs><input type="%l" readonly="true"></input></inpu` +
        `ts></block-definition><block-definition s="%#1 of %#2" type="reporte` +
        `r" category="lists" selector="reportListAttribute" primitive="report` +
        `ListAttribute"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s" readonly="true" irreplaceable="true">` +
        `$_length<options>length=$_length&#xD;rank=$_rank&#xD;dimensions=$_di` +
        `mensions&#xD;flatten=$_flatten&#xD;columns=$_columns&#xD;uniques=$_u` +
        `niques&#xD;distribution=$_distribution&#xD;sorted=$_sorted&#xD;shuff` +
        `led=$_shuffled&#xD;reverse=$_reverse&#xD;&#126;&#xD;lines=$_lines&#x` +
        `D;csv=$_csv&#xD;json=$_json</options></input><input type="%l" readon` +
        `ly="true"></input></inputs></block-definition><block-definition s="%` +
        `&apos;data&apos; contains %&apos;value&apos;" type="predicate" categ` +
        `ory="lists" selector="reportListContainsItem" primitive="reportListC` +
        `ontainsItem"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%l" readonly="true"></input><input type="%s` +
        `">thing</input><input type="%l" readonly="true"></input><input type=` +
        `"%s">thing</input><input type="%s">thing</input></inputs><scripts><s` +
        `cript x="10" y="91.83333333333331"><block s="doWarp"><script><block ` +
        `s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>` +
        `length</option></l><block var="data"/></block><script><block s="doIf` +
        `"><block s="reportVariadicEquals"><list><block s="reportListItem"><b` +
        `lock var="i"/><block var="data"/></block><block var="value"/></list>` +
        `</block><script><block s="doReport"><block s="reportBoolean"><l><boo` +
        `l>true</bool></l></block></block></script><list></list></block></scr` +
        `ipt></block></script></block><block s="doReport"><block s="reportBoo` +
        `lean"><l><bool>false</bool></l></block></block></script></scripts></` +
        `block-definition><block-definition s="is %&apos;data&apos; empty?" t` +
        `ype="predicate" category="lists" selector="reportListIsEmpty" primit` +
        `ive="reportListIsEmpty"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%l" readonly="true"></input><inp` +
        `ut type="%l" readonly="true"></input><input type="%l" readonly="true` +
        `"></input></inputs><scripts><script x="10" y="91.83333333333331"><bl` +
        `ock s="doReport"><block s="reportVariadicEquals"><list><block var="d` +
        `ata"/><block s="reportNewList"><list></list></block></list></block><` +
        `/block></script></scripts></block-definition><block-definition s="in` +
        `dex of %&apos;value&apos; in %&apos;data&apos;" type="reporter" cate` +
        `gory="lists" selector="reportListIndex" primitive="reportListIndex">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s">thing</input><input type="%l" readonly="true"></inpu` +
        `t><input type="%s">thing</input><input type="%l" readonly="true"></i` +
        `nput><input type="%l" readonly="true"></input></inputs><scripts><scr` +
        `ipt x="10" y="91.83333333333331"><block s="doWarp"><script><block s=` +
        `"doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>le` +
        `ngth</option></l><block var="data"/></block><script><block s="doIf">` +
        `<block s="reportVariadicEquals"><list><block s="reportListItem"><blo` +
        `ck var="i"/><block var="data"/></block><block var="value"/></list></` +
        `block><script><block s="doReport"><block var="i"/></block></script><` +
        `list></list></block></script></block></script></block><block s="doRe` +
        `port"><l>0</l></block></script></scripts></block-definition><block-d` +
        `efinition s="add %#1 to %#2" type="command" category="lists" selecto` +
        `r="doAddToList" primitive="doAddToList"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s">thing</input` +
        `><input type="%l" readonly="true"></input></inputs></block-definitio` +
        `n><block-definition s="delete %#1 of %#2" type="command" category="l` +
        `ists" selector="doDeleteFromList" primitive="doDeleteFromList"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">1<options>1=1&#xD;last=$_last&#xD;&#126;&#xD;all=$_all</o` +
        `ptions></input><input type="%l" readonly="true"></input></inputs></b` +
        `lock-definition><block-definition s="insert %#1 at %#2 of %#3" type=` +
        `"command" category="lists" selector="doInsertInList" primitive="doIn` +
        `sertInList"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s">thing</input><input type="%n">1<options>` +
        `1=1&#xD;last=$_last&#xD;random=$_random</options></input><input type` +
        `="%l" readonly="true"></input></inputs></block-definition><block-def` +
        `inition s="replace item %#1 of %#2 with %#3" type="command" category` +
        `="lists" selector="doReplaceInList" primitive="doReplaceInList"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</optio` +
        `ns></input><input type="%l" readonly="true"></input><input type="%s"` +
        `>thing</input></inputs></block-definition><block-definition s="numbe` +
        `rs from %&apos;start&apos; to %&apos;end&apos;" type="reporter" cate` +
        `gory="lists" selector="reportNumbers" primitive="reportNumbers"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">1</input><input type="%n">10</input><input type="%n">1</` +
        `input><input type="%n">10</input><input type="%n">10</input></inputs` +
        `><scripts><script x="10" y="91.83333333333331"><block s="doReport"><` +
        `block s="reportHyperZip"><block s="reifyReporter"><script><block s="` +
        `doDeclareVariables"><list><l>result</l></list></block><block s="doSe` +
        `tVar"><l>result</l><block s="reportNewList"><list></list></block></b` +
        `lock><block s="doWarp"><script><block s="doFor"><l>i</l><l></l><l></` +
        `l><script><block s="doAddToList"><block var="i"/><block var="result"` +
        `/></block></script></block></script></block><block s="doReport"><blo` +
        `ck var="result"/></block></script><list></list></block><block var="s` +
        `tart"/><l>0</l><block var="end"/><l>0</l></block></block></script></` +
        `scripts></block-definition><block-definition s="append %&apos;lists&` +
        `apos;" type="reporter" category="lists" selector="reportConcatenated` +
        `Lists" primitive="reportConcatenatedLists"><header></header><code></` +
        `code><translations></translations><inputs><input type="%mult%l" read` +
        `only="true" initial="2"></input><input type="%mult%l" readonly="true` +
        `" initial="2"></input><input type="%mult%l" readonly="true" initial=` +
        `"2"></input></inputs><scripts><script x="10" y="91.83333333333331"><` +
        `block s="doDeclareVariables"><list><l>result</l></list></block><bloc` +
        `k s="doSetVar"><l>result</l><block s="reportNewList"><list></list></` +
        `block></block><block s="doWarp"><script><block s="doForEach"><l>list` +
        `</l><block var="lists"/><script><block s="doForEach"><l>item</l><blo` +
        `ck var="list"/><script><block s="doAddToList"><block var="item"/><bl` +
        `ock var="result"/></block></script></block></script></block></script` +
        `></block><block s="doReport"><block var="result"/></block></script><` +
        `/scripts></block-definition><block-definition s="combinations %&apos` +
        `;lists&apos;" type="reporter" category="lists" selector="reportCross` +
        `product" primitive="reportCrossproduct"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%mult%l" readonl` +
        `y="true" initial="2"></input><input type="%mult%l" readonly="true" i` +
        `nitial="2"></input><input type="%mult%l" readonly="true" initial="2"` +
        `></input></inputs><scripts><script x="10" y="91.83333333333331"><blo` +
        `ck s="doReport"><block s="reportIfElse"><block s="reportListIsEmpty"` +
        `><block var="lists"/></block><block s="reportNewList"><list><block s` +
        `="reportNewList"><list></list></block></list></block><block s="repor` +
        `tConcatenatedLists"><block s="reportMap"><block s="reifyReporter"><a` +
        `utolambda><block s="reportMap"><block s="reifyReporter"><autolambda>` +
        `<block s="reportCONS"><block var="first"/><l/></block></autolambda><` +
        `list></list></block><block s="reportCrossproduct"><block s="reportCD` +
        `R"><block var="lists"/></block></block></block></autolambda><list><l` +
        `>first</l></list></block><block s="reportListItem"><l>1</l><block va` +
        `r="lists"/></block></block></block></block></block></script></script` +
        `s></block-definition><block-definition s="transpose %#1" type="repor` +
        `ter" category="lists" selector="reportTranspose" primitive="reportTr` +
        `anspose"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%l" readonly="true"></input></inputs></block-de` +
        `finition><block-definition s="reshape %#1 to %#2" type="reporter" ca` +
        `tegory="lists" selector="reportReshape" primitive="reportReshape"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s"></input><input type="%mult%n" readonly="true" initial=` +
        `"2">4&#xD;3</input></inputs></block-definition><block-definition s="` +
        `map %&apos;ring&apos; over %&apos;data&apos;" type="reporter" catego` +
        `ry="lists" selector="reportMap" primitive="reportMap"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%r` +
        `epRing" readonly="true" irreplaceable="true"></input><input type="%l` +
        `" readonly="true"></input><input type="%repRing" readonly="true" irr` +
        `eplaceable="true"></input><input type="%l" readonly="true"></input><` +
        `input type="%l" readonly="true"></input></inputs><scripts><script x=` +
        `"10" y="91.83333333333331"><block s="doDeclareVariables"><list><l>re` +
        `sult</l><l>implicit?</l></list></block><block s="doSetVar"><l>result` +
        `</l><block s="reportNewList"><list></list></block></block><block s="` +
        `doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><block s="rep` +
        `ortAttributeOf"><l><option>input names</option></l><block var="ring"` +
        `/></block></block></block><block s="doWarp"><script><block s="doFor"` +
        `><l>i</l><l>1</l><block s="reportListAttribute"><l><option>length</o` +
        `ption></l><block var="data"/></block><script><block s="doAddToList">` +
        `<block s="evaluate"><block var="ring"/><block s="reportIfElse"><bloc` +
        `k var="implicit?"/><block s="reportNewList"><list><block s="reportLi` +
        `stItem"><block var="i"/><block var="data"/></block></list></block><b` +
        `lock s="reportNewList"><list><block s="reportListItem"><block var="i` +
        `"/><block var="data"/></block><block var="i"/><block var="data"/></l` +
        `ist></block></block></block><block var="result"/></block></script></` +
        `block></script></block><block s="doReport"><block var="result"/></bl` +
        `ock></script></scripts></block-definition><block-definition s="$blit` +
        `z map %#1 over %#2" type="reporter" category="lists" selector="repor` +
        `tAtomicMap" primitive="reportAtomicMap"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%repRing" readon` +
        `ly="true" irreplaceable="true"></input><input type="%l" readonly="tr` +
        `ue"></input></inputs></block-definition><block-definition s="keep it` +
        `ems %&apos;ring&apos; from %&apos;data&apos;" type="reporter" catego` +
        `ry="lists" selector="reportKeep" primitive="reportKeep"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%predRing" readonly="true" irreplaceable="true"></input><input type=` +
        `"%l" readonly="true"></input><input type="%predRing" readonly="true"` +
        ` irreplaceable="true"></input><input type="%l" readonly="true"></inp` +
        `ut><input type="%l" readonly="true"></input></inputs><scripts><scrip` +
        `t x="10" y="91.83333333333331"><block s="doDeclareVariables"><list><` +
        `l>result</l><l>implicit?</l></list></block><block s="doSetVar"><l>re` +
        `sult</l><block s="reportNewList"><list></list></block></block><block` +
        ` s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><block s=` +
        `"reportAttributeOf"><l><option>input names</option></l><block var="r` +
        `ing"/></block></block></block><block s="doWarp"><script><block s="do` +
        `For"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>lengt` +
        `h</option></l><block var="data"/></block><script><block s="doIf"><bl` +
        `ock s="evaluate"><block var="ring"/><block s="reportIfElse"><block v` +
        `ar="implicit?"/><block s="reportNewList"><list><block s="reportListI` +
        `tem"><block var="i"/><block var="data"/></block></list></block><bloc` +
        `k s="reportNewList"><list><block s="reportListItem"><block var="i"/>` +
        `<block var="data"/></block><block var="i"/><block var="data"/></list` +
        `></block></block></block><script><block s="doAddToList"><block s="re` +
        `portListItem"><block var="i"/><block var="data"/></block><block var=` +
        `"result"/></block></script><list></list></block></script></block></s` +
        `cript></block><block s="doReport"><block var="result"/></block></scr` +
        `ipt></scripts></block-definition><block-definition s="$blitz keep it` +
        `ems %#1 from %#2" type="reporter" category="lists" selector="reportA` +
        `tomicKeep" primitive="reportAtomicKeep"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%predRing" reado` +
        `nly="true" irreplaceable="true"></input><input type="%l" readonly="t` +
        `rue"></input></inputs></block-definition><block-definition s="find f` +
        `irst item %&apos;ring&apos; in %&apos;data&apos;" type="reporter" ca` +
        `tegory="lists" selector="reportFindFirst" primitive="reportFindFirst` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%predRing" readonly="true" irreplaceable="true"></inpu` +
        `t><input type="%l" readonly="true"></input><input type="%predRing" r` +
        `eadonly="true" irreplaceable="true"></input><input type="%l" readonl` +
        `y="true"></input><input type="%l" readonly="true"></input></inputs><` +
        `scripts><script x="10" y="91.83333333333331"><block s="doDeclareVari` +
        `ables"><list><l>implicit?</l></list></block><block s="doSetVar"><l>i` +
        `mplicit?</l><block s="reportListIsEmpty"><block s="reportAttributeOf` +
        `"><l><option>input names</option></l><block var="ring"/></block></bl` +
        `ock></block><block s="doWarp"><script><block s="doFor"><l>i</l><l>1<` +
        `/l><block s="reportListAttribute"><l><option>length</option></l><blo` +
        `ck var="data"/></block><script><block s="doIf"><block s="evaluate"><` +
        `block var="ring"/><block s="reportIfElse"><block var="implicit?"/><b` +
        `lock s="reportNewList"><list><block s="reportListItem"><block var="i` +
        `"/><block var="data"/></block></list></block><block s="reportNewList` +
        `"><list><block s="reportListItem"><block var="i"/><block var="data"/` +
        `></block><block var="i"/><block var="data"/></list></block></block><` +
        `/block><script><block s="doReport"><block s="reportListItem"><block ` +
        `var="i"/><block var="data"/></block></block></script><list></list></` +
        `block></script></block></script></block><block s="doReport"><l></l><` +
        `/block></script></scripts></block-definition><block-definition s="$b` +
        `litz find first item %#1 in %#2" type="reporter" category="lists" se` +
        `lector="reportAtomicFindFirst" primitive="reportAtomicFindFirst"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%predRing" readonly="true" irreplaceable="true"></input><in` +
        `put type="%l" readonly="true"></input></inputs></block-definition><b` +
        `lock-definition s="combine %&apos;data&apos; using %&apos;ring&apos;` +
        `" type="reporter" category="lists" selector="reportCombine" primitiv` +
        `e="reportCombine"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%l" readonly="true"></input><input typ` +
        `e="%repRing" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%l" readonly="true"></input><input type="%repRing" readonly="true` +
        `" irreplaceable="true"></input><input type="%repRing" readonly="true` +
        `" irreplaceable="true"></input></inputs><scripts><script x="10" y="9` +
        `1.83333333333331"><block s="doIf"><block s="reportListIsEmpty"><bloc` +
        `k var="data"/></block><script><block s="doReport"><l>0</l></block></` +
        `script><list><block s="reportVariadicEquals"><list><block s="reportL` +
        `istAttribute"><l><option>length</option></l><block var="data"/></blo` +
        `ck><l>1</l></list></block><script><block s="doReport"><block s="repo` +
        `rtListItem"><l>1</l><block var="data"/></block></block></script></li` +
        `st></block><block s="doReport"><block s="evaluate"><block var="ring"` +
        `/><list><block s="reportListItem"><l>1</l><block var="data"/></block` +
        `><block s="evaluate"><block s="reportEnvironment"><l><option>script<` +
        `/option></l></block><list><block s="reportCDR"><block var="data"/></` +
        `block><block var="ring"/></list></block></list></block></block></scr` +
        `ipt></scripts></block-definition><block-definition s="$blitz combine` +
        ` %#1 using %#2" type="reporter" category="lists" selector="reportAto` +
        `micCombine" primitive="reportAtomicCombine"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%l" readonly` +
        `="true"></input><input type="%repRing" readonly="true" irreplaceable` +
        `="true"></input></inputs></block-definition><block-definition s="for` +
        ` each %&apos;item&apos; in %&apos;data&apos; %&apos;action&apos;" ty` +
        `pe="command" category="lists" selector="doForEach" primitive="doForE` +
        `ach"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%upvar" readonly="true" irreplaceable="true">item</` +
        `input><input type="%l" readonly="true"></input><input type="%loop" r` +
        `eadonly="true" irreplaceable="true"></input><input type="%upvar" rea` +
        `donly="true" irreplaceable="true">item</input><input type="%l" reado` +
        `nly="true"></input><input type="%loop" readonly="true" irreplaceable` +
        `="true"></input><input type="%loop" readonly="true" irreplaceable="t` +
        `rue"></input></inputs><scripts><script x="10" y="97.83333333333331">` +
        `<block s="doReport"><block s="reportMap"><block s="reifyReporter"><s` +
        `cript><block s="doSetVar"><l>item</l><l></l></block><block s="doRun"` +
        `><block var="action"/><list></list></block><block s="doReport"><l>0<` +
        `/l></block></script><list></list></block><block var="data"/></block>` +
        `</block></script></scripts></block-definition><block-definition s="s` +
        `how table %#1" type="command" category="lists" selector="doShowTable` +
        `" primitive="doShowTable"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%l" readonly="true"></input></` +
        `inputs></block-definition><block-definition s="map %#1 to %#2 %#3" t` +
        `ype="command" category="other" selector="doMapCodeOrHeader" primitiv` +
        `e="doMapCodeOrHeader"><header></header><code></code><translations></` +
        `translations><inputs><input type="%cmdRing" readonly="true"></input>` +
        `<input type="%s" readonly="true">$_code<options>code=$_code&#xD;head` +
        `er=$_header</options></input><input type="%mlt"></input></inputs></b` +
        `lock-definition><block-definition s="map %#1 to code %#2" type="comm` +
        `and" category="other" selector="doMapValueCode" primitive="doMapValu` +
        `eCode"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true" irreplaceable="true">$_String` +
        `<options>String=$_String&#xD;Number=$_Number&#xD;true=$_true&#xD;fal` +
        `se=$_false</options></input><input type="%mlt">&lt;#1&gt;</input></i` +
        `nputs></block-definition><block-definition s="map %#1 of %#2 to code` +
        ` %#3" type="command" category="other" selector="doMapListCode" primi` +
        `tive="doMapListCode"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true"><options>list=$` +
        `_list&#xD;item=$_item&#xD;delimiter=$_delimiter</options></input><in` +
        `put type="%s" readonly="true"><options>collection=$_collection&#xD;v` +
        `ariables=$_variables&#xD;parameters=$_parameters</options></input><i` +
        `nput type="%mlt"></input></inputs></block-definition><block-definiti` +
        `on s="code of %#1" type="reporter" category="other" selector="report` +
        `MappedCode" primitive="reportMappedCode"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%cmdRing" reado` +
        `nly="true"></input></inputs></block-definition><block-definition s="` +
        `primitive %#1" type="command" category="other" selector="doPrimitive` +
        `" primitive="doPrimitive"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true" irreplacea` +
        `ble="true"><options>§_primitivesMenu</options></input></inputs></blo` +
        `ck-definition><block-definition s="extension %#1 %#2" type="command"` +
        ` category="other" selector="doApplyExtension" primitive="doApplyExte` +
        `nsion"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true" irreplaceable="true"><options` +
        `>§_extensionsMenu</options></input><input type="%mult%s" readonly="t` +
        `rue"></input></inputs></block-definition><block-definition s="extens` +
        `ion %#1 %#2" type="reporter" category="other" selector="reportApplyE` +
        `xtension" primitive="reportApplyExtension"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true"><options>§_extensionsMenu</options></inp` +
        `ut><input type="%mult%s" readonly="true"></input></inputs></block-de` +
        `finition><block-definition s="set video transparency to %#1" type="c` +
        `ommand" category="sensing" selector="doSetVideoTransparency" primiti` +
        `ve="doSetVideoTransparency"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">50</input></inputs></blo` +
        `ck-definition><block-definition s="video %#1 on %#2" type="reporter"` +
        ` category="sensing" selector="reportVideo" primitive="reportVideo"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">$_motion<options` +
        `>snap=$_snap&#xD;motion=$_motion&#xD;direction=$_direction</options>` +
        `</input><input type="%s" readonly="true">$_myself<options>§_objectsM` +
        `enuWithSelf</options></input></inputs></block-definition></primitive` +
        `s></blocks>`,
        this.stage
    );
};
