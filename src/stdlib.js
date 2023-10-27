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

modules.stdlib = '2023-October-27';

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
        `s" type="command" category="motion" selector="forward" primitive="fo` +
        `rward"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%n">10</input></inputs><script><block s="doPrimit` +
        `ive"><l><bool>true</bool></l><l>forward</l></block><block s="doGotoO` +
        `bject"><block s="reportVariadicSum"><list><block s="getPosition"></b` +
        `lock><block s="reportVariadicProduct"><list><block s="reportNewList"` +
        `><list><block s="reportMonadic"><l><option>sin</option></l><block s=` +
        `"direction"></block></block><block s="reportMonadic"><l><option>cos<` +
        `/option></l><block s="direction"></block></block></list></block><blo` +
        `ck var="steps"/></list></block></list></block></block></script></blo` +
        `ck-definition><block-definition s="turn $clockwise %&apos;angle&apos` +
        `; degrees" type="command" category="motion" selector="turn" primitiv` +
        `e="turn"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%n">15</input></inputs><script><block s="doPrim` +
        `itive"><l><bool>true</bool></l><l>turn</l></block><block s="setHeadi` +
        `ng"><block s="reportVariadicSum"><list><block s="direction"></block>` +
        `<block var="angle"/></list></block></block></script></block-definiti` +
        `on><block-definition s="turn $counterclockwise %&apos;angle&apos; de` +
        `grees" type="command" category="motion" selector="turnLeft" primitiv` +
        `e="turnLeft"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%n">15</input></inputs><script><block s="do` +
        `Primitive"><l><bool>true</bool></l><l>turnLeft</l></block><block s="` +
        `setHeading"><block s="reportDifference"><block s="direction"></block` +
        `><block var="angle"/></block></block></script></block-definition><bl` +
        `ock-definition s="point in direction %&apos;angle&apos;" type="comma` +
        `nd" category="motion" selector="setHeading" primitive="setHeading"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">90<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-9` +
        `0&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$_random</options></inp` +
        `ut></inputs><script><block s="doPrimitive"><l><bool>true</bool></l><` +
        `l>setHeading</l></block><block s="doFaceTowards"><block s="reportVar` +
        `iadicSum"><list><block s="getPosition"></block><block s="reportIfEls` +
        `e"><block s="reportVariadicEquals"><list><block s="reportJoinWords">` +
        `<list><block var="angle"/></list></block><l>random</l></list></block` +
        `><block s="reportNewList"><list><block s="reportMonadic"><l><option>` +
        `sin</option></l><block s="reportRandom"><l>0.1</l><l>360.1</l></bloc` +
        `k></block><block s="reportMonadic"><l><option>cos</option></l><block` +
        ` s="reportRandom"><l>0.1</l><l>360.1</l></block></block></list></blo` +
        `ck><block s="reportNewList"><list><block s="reportMonadic"><l><optio` +
        `n>sin</option></l><block var="angle"/></block><block s="reportMonadi` +
        `c"><l><option>cos</option></l><block var="angle"/></block></list></b` +
        `lock></block></list></block></block></script></block-definition><blo` +
        `ck-definition s="point towards %#1" type="command" category="motion"` +
        ` selector="doFaceTowards" primitive="doFaceTowards"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true">$_mouse-pointer<options>§_destinationsMenu</options>` +
        `</input></inputs></block-definition><block-definition s="go to x: %&` +
        `apos;x&apos; y: %&apos;y&apos;" type="command" category="motion" sel` +
        `ector="gotoXY" primitive="gotoXY"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">0</input><input ty` +
        `pe="%n">0</input></inputs><script><block s="doPrimitive"><l><bool>tr` +
        `ue</bool></l><l>gotoXY</l></block><block s="doGotoObject"><block s="` +
        `reportNewList"><list><block var="x"/><block var="y"/></list></block>` +
        `</block></script></block-definition><block-definition s="go to %#1" ` +
        `type="command" category="motion" selector="doGotoObject" primitive="` +
        `doGotoObject"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true">$_random position<opti` +
        `ons>§_destinationsMenu</options></input></inputs></block-definition>` +
        `<block-definition s="glide %&apos;span&apos; secs to x: %&apos;x&apo` +
        `s; y: %&apos;y&apos;" type="command" category="motion" selector="doG` +
        `lide" primitive="doGlide"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">1</input><input type="%n">` +
        `0</input><input type="%n">0</input></inputs><script><block s="doPrim` +
        `itive"><l><bool>true</bool></l><l>doGlide</l></block><block s="doDec` +
        `lareVariables"><list><l>pos</l><l>start</l><l>fract</l></list></bloc` +
        `k><block s="doSetVar"><l>pos</l><block s="getPosition"></block></blo` +
        `ck><block s="doSetVar"><l>start</l><block s="reportDate"><l><option>` +
        `time in milliseconds</option></l></block></block><block s="doUntil">` +
        `<block s="reportVariadicGreaterThanOrEquals"><list><block var="fract` +
        `"/><l>1</l></list></block><script><block s="doSetVar"><l>fract</l><b` +
        `lock s="reportQuotient"><block s="reportDifference"><block s="report` +
        `Date"><l><option>time in milliseconds</option></l></block><block var` +
        `="start"/></block><block s="reportVariadicProduct"><list><block var=` +
        `"span"/><l>1000</l></list></block></block></block><block s="doGotoOb` +
        `ject"><block s="reportVariadicSum"><list><block var="pos"/><block s=` +
        `"reportVariadicProduct"><list><block s="reportDifference"><block s="` +
        `reportNewList"><list><block var="x"/><block var="y"/></list></block>` +
        `<block var="pos"/></block><block var="fract"/></list></block></list>` +
        `</block></block></script></block><block s="gotoXY"><block var="x"/><` +
        `block var="y"/></block></script></block-definition><block-definition` +
        ` s="change x by %&apos;delta&apos;" type="command" category="motion"` +
        ` selector="changeXPosition" primitive="changeXPosition"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n">10</input></inputs><script><block s="doPrimitive"><l><bool>true<` +
        `/bool></l><l>changeXPosition</l></block><block s="setXPosition"><blo` +
        `ck s="reportVariadicSum"><list><block s="xPosition"></block><block v` +
        `ar="delta"/></list></block></block></script></block-definition><bloc` +
        `k-definition s="set x to %&apos;x&apos;" type="command" category="mo` +
        `tion" selector="setXPosition" primitive="setXPosition"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `n">0</input></inputs><script><block s="doPrimitive"><l><bool>true</b` +
        `ool></l><l>setXPosition</l></block><block s="doGotoObject"><block s=` +
        `"reportNewList"><list><block var="x"/><block s="yPosition"></block><` +
        `/list></block></block></script></block-definition><block-definition ` +
        `s="change y by %&apos;delta&apos;" type="command" category="motion" ` +
        `selector="changeYPosition" primitive="changeYPosition"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `n">10</input></inputs><script><block s="doPrimitive"><l><bool>true</` +
        `bool></l><l>changeYPosition</l></block><block s="setYPosition"><bloc` +
        `k s="reportVariadicSum"><list><block s="yPosition"></block><block va` +
        `r="delta"/></list></block></block></script></block-definition><block` +
        `-definition s="set y to %&apos;y&apos;" type="command" category="mot` +
        `ion" selector="setYPosition" primitive="setYPosition"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">0</input></inputs><script><block s="doPrimitive"><l><bool>true</bo` +
        `ol></l><l>setYPosition</l></block><block s="doGotoObject"><block s="` +
        `reportNewList"><list><block s="xPosition"></block><block var="y"/></` +
        `list></block></block></script></block-definition><block-definition s` +
        `="if on edge, bounce" type="command" category="motion" selector="bou` +
        `nceOffEdge" primitive="bounceOffEdge"><header></header><code></code>` +
        `<translations></translations><inputs></inputs><script><block s="doPr` +
        `imitive"><l><bool>true</bool></l><l>bounceOffEdge</l></block><block ` +
        `s="doIf"><block s="reportTouchingObject"><l><option>edge</option></l` +
        `></block><script><block s="doDeclareVariables"><list><l>get bounds</` +
        `l><l>bounds</l><l>center</l><l>stage bounds</l><l>dir x</l><l>dir y<` +
        `/l><l>delta x</l><l>delta y</l></list></block><block s="doSetVar"><l` +
        `>get bounds</l><block s="reifyReporter"><autolambda><block s="report` +
        `NewList"><list><block s="reportVariadicMin"><block s="reportCONS"><b` +
        `lock s="reportNewList"><list><block s="reportGet"><l><option>left</o` +
        `ption></l></block><block s="reportGet"><l><option>bottom</option></l` +
        `></block></list></block><block s="reportMap"><block s="reifyReporter` +
        `"><autolambda><block s="reportNewList"><list><block s="reportAttribu` +
        `teOf"><l><option>left</option></l><l></l></block><block s="reportAtt` +
        `ributeOf"><l><option>bottom</option></l><l></l></block></list></bloc` +
        `k></autolambda><list></list></block><block s="reportGet"><l><option>` +
        `parts</option></l></block></block></block></block><block s="reportVa` +
        `riadicMax"><block s="reportCONS"><block s="reportNewList"><list><blo` +
        `ck s="reportGet"><l><option>right</option></l></block><block s="repo` +
        `rtGet"><l><option>top</option></l></block></list></block><block s="r` +
        `eportMap"><block s="reifyReporter"><autolambda><block s="reportNewLi` +
        `st"><list><block s="reportAttributeOf"><l><option>right</option></l>` +
        `<l></l></block><block s="reportAttributeOf"><l><option>top</option><` +
        `/l><l></l></block></list></block></autolambda><list></list></block><` +
        `block s="reportGet"><l><option>parts</option></l></block></block></b` +
        `lock></block></list></block></autolambda><list></list></block></bloc` +
        `k><block s="doSetVar"><l>bounds</l><block s="evaluate"><block var="g` +
        `et bounds"/><list></list></block></block><block s="doSetVar"><l>cent` +
        `er</l><block s="reportQuotient"><block s="reportVariadicSum"><block ` +
        `var="bounds"/></block><l>2</l></block></block><block s="doSetVar"><l` +
        `>stage bounds</l><block s="reportAskFor"><block s="reportGet"><l><op` +
        `tion>stage</option></l></block><block s="reifyReporter"><autolambda>` +
        `<block s="reportNewList"><list><block s="reportNewList"><list><block` +
        ` s="reportGet"><l><option>left</option></l></block><block s="reportG` +
        `et"><l><option>bottom</option></l></block></list></block><block s="r` +
        `eportNewList"><list><block s="reportGet"><l><option>right</option></` +
        `l></block><block s="reportGet"><l><option>top</option></l></block></` +
        `list></block></list></block></autolambda><list></list></block><list>` +
        `</list></block></block><block s="doSetVar"><l>dir x</l><block s="rep` +
        `ortMonadic"><l><option>sin</option></l><block s="direction"></block>` +
        `</block></block><block s="doSetVar"><l>dir y</l><block s="reportMona` +
        `dic"><l><option>cos</option></l><block s="direction"></block></block` +
        `></block><block s="doIf"><block s="reportVariadicLessThan"><list><bl` +
        `ock s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><bl` +
        `ock var="bounds"/></block></block><block s="reportListItem"><l>1</l>` +
        `<block s="reportListItem"><l>1</l><block var="stage bounds"/></block` +
        `></block></list></block><script><block s="doSetVar"><l>dir x</l><blo` +
        `ck s="reportMonadic"><l><option>abs</option></l><block var="dir x"/>` +
        `</block></block></script><list></list></block><block s="doIf"><block` +
        ` s="reportVariadicGreaterThan"><list><block s="reportListItem"><l>1<` +
        `/l><block s="reportListItem"><l>2</l><block var="bounds"/></block></` +
        `block><block s="reportListItem"><l>1</l><block s="reportListItem"><l` +
        `>2</l><block var="stage bounds"/></block></block></list></block><scr` +
        `ipt><block s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><opt` +
        `ion>neg</option></l><block s="reportMonadic"><l><option>abs</option>` +
        `</l><block var="dir x"/></block></block></block></script><list></lis` +
        `t></block><block s="doIf"><block s="reportVariadicGreaterThan"><list` +
        `><block s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l` +
        `><block var="bounds"/></block></block><block s="reportListItem"><l>2` +
        `</l><block s="reportListItem"><l>2</l><block var="stage bounds"/></b` +
        `lock></block></list></block><script><block s="doSetVar"><l>dir y</l>` +
        `<block s="reportMonadic"><l><option>neg</option></l><block s="report` +
        `Monadic"><l><option>abs</option></l><block var="dir y"/></block></bl` +
        `ock></block></script><list></list></block><block s="doIf"><block s="` +
        `reportVariadicLessThan"><list><block s="reportListItem"><l>2</l><blo` +
        `ck s="reportListItem"><l>1</l><block var="bounds"/></block></block><` +
        `block s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><` +
        `block var="stage bounds"/></block></block></list></block><script><bl` +
        `ock s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>abs` +
        `</option></l><block var="dir y"/></block></block></script><list></li` +
        `st></block><block s="setHeading"><block s="reportAtan2"><block var="` +
        `dir x"/><block var="dir y"/></block></block><block s="doSetVar"><l>b` +
        `ounds</l><block s="evaluate"><block var="get bounds"/><list></list><` +
        `/block></block><block s="doGotoObject"><block s="reportVariadicSum">` +
        `<list><block s="getPosition"></block><block s="reportDifference"><bl` +
        `ock var="center"/><block s="reportQuotient"><block s="reportVariadic` +
        `Sum"><block var="bounds"/></block><l>2</l></block></block></list></b` +
        `lock></block><block s="doSetVar"><l>bounds</l><block s="evaluate"><b` +
        `lock var="get bounds"/><list></list></block></block><block s="doIf">` +
        `<block s="reportVariadicGreaterThan"><list><block s="reportListItem"` +
        `><l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/></bl` +
        `ock></block><block s="reportListItem"><l>1</l><block s="reportListIt` +
        `em"><l>2</l><block var="stage bounds"/></block></block></list></bloc` +
        `k><script><block s="doSetVar"><l>delta x</l><block s="reportDifferen` +
        `ce"><block s="reportListItem"><l>1</l><block s="reportListItem"><l>2` +
        `</l><block var="stage bounds"/></block></block><block s="reportListI` +
        `tem"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/>` +
        `</block></block></block></block></script><list></list></block><block` +
        ` s="doIf"><block s="reportVariadicLessThan"><list><block s="reportLi` +
        `stItem"><l>2</l><block s="reportListItem"><l>1</l><block var="bounds` +
        `"/></block></block><block s="reportListItem"><l>2</l><block s="repor` +
        `tListItem"><l>1</l><block var="stage bounds"/></block></block></list` +
        `></block><script><block s="doSetVar"><l>delta y</l><block s="reportD` +
        `ifference"><block s="reportListItem"><l>2</l><block s="reportListIte` +
        `m"><l>1</l><block var="stage bounds"/></block></block><block s="repo` +
        `rtListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="bo` +
        `unds"/></block></block></block></block></script><list></list></block` +
        `><block s="doIf"><block s="reportVariadicLessThan"><list><block s="r` +
        `eportListItem"><l>1</l><block s="reportListItem"><l>1</l><block var=` +
        `"bounds"/></block></block><block s="reportListItem"><l>1</l><block s` +
        `="reportListItem"><l>1</l><block var="stage bounds"/></block></block` +
        `></list></block><script><block s="doSetVar"><l>delta x</l><block s="` +
        `reportDifference"><block s="reportListItem"><l>1</l><block s="report` +
        `ListItem"><l>1</l><block var="stage bounds"/></block></block><block ` +
        `s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><block ` +
        `var="bounds"/></block></block></block></block></script><list></list>` +
        `</block><block s="doIf"><block s="reportVariadicGreaterThan"><list><` +
        `block s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><` +
        `block var="bounds"/></block></block><block s="reportListItem"><l>2</` +
        `l><block s="reportListItem"><l>2</l><block var="stage bounds"/></blo` +
        `ck></block></list></block><script><block s="doSetVar"><l>delta y</l>` +
        `<block s="reportDifference"><block s="reportListItem"><l>2</l><block` +
        ` s="reportListItem"><l>2</l><block var="stage bounds"/></block></blo` +
        `ck><block s="reportListItem"><l>2</l><block s="reportListItem"><l>2<` +
        `/l><block var="bounds"/></block></block></block></block></script><li` +
        `st></list></block><block s="doGotoObject"><block s="reportVariadicSu` +
        `m"><list><block s="getPosition"></block><block s="reportNewList"><li` +
        `st><block var="delta x"/><block var="delta y"/></list></block></list` +
        `></block></block></script><list></list></block></script></block-defi` +
        `nition><block-definition s="position" type="reporter" category="moti` +
        `on" selector="getPosition" primitive="getPosition"><header></header>` +
        `<code></code><translations></translations><inputs></inputs><script><` +
        `block s="doPrimitive"><l><bool>true</bool></l><l>getPosition</l></bl` +
        `ock><block s="doReport"><block s="reportNewList"><list><block s="xPo` +
        `sition"></block><block s="yPosition"></block></list></block></block>` +
        `</script></block-definition><block-definition s="x position" type="r` +
        `eporter" category="motion" selector="xPosition" primitive="xPosition` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="y position" type="` +
        `reporter" category="motion" selector="yPosition" primitive="yPositio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="direction" type="` +
        `reporter" category="motion" selector="direction" primitive="directio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="switch to costume` +
        ` %#1" type="command" category="looks" selector="doSwitchToCostume" p` +
        `rimitive="doSwitchToCostume"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true"><option` +
        `s>§_costumesMenu</options></input></inputs></block-definition><block` +
        `-definition s="next costume" type="command" category="looks" selecto` +
        `r="doWearNextCostume" primitive="doWearNextCostume"><header></header` +
        `><code></code><translations></translations><inputs></inputs><script>` +
        `<block s="doPrimitive"><l><bool>true</bool></l><l>doWearNextCostume<` +
        `/l></block><block s="doIf"><block s="reportVariadicGreaterThan"><lis` +
        `t><block s="getCostumeIdx"></block><l>0</l></list></block><script><b` +
        `lock s="doSwitchToCostume"><block s="reportVariadicSum"><list><block` +
        ` s="reportModulus"><block s="getCostumeIdx"></block><block s="report` +
        `ListAttribute"><l><option>length</option></l><block s="reportGet"><l` +
        `><option>costumes</option></l></block></block></block><l>1</l></list` +
        `></block></block></script><list></list></block></script></block-defi` +
        `nition><block-definition s="costume #" type="reporter" category="loo` +
        `ks" selector="getCostumeIdx" primitive="getCostumeIdx"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs><scri` +
        `pt><block s="doPrimitive"><l><bool>true</bool></l><l>getCostumeIdx</` +
        `l></block><block s="doReport"><block s="reportListIndex"><block s="r` +
        `eportGet"><l><option>costume</option></l></block><block s="reportGet` +
        `"><l><option>costumes</option></l></block></block></block></script><` +
        `/block-definition><block-definition s="%#1 of costume %#2" type="rep` +
        `orter" category="looks" selector="reportGetImageAttribute" primitive` +
        `="reportGetImageAttribute"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">$_width<options>name=$_name&#xD;width=$_width&#xD;height` +
        `=$_height&#xD;pixels=$_pixels</options></input><input type="%s" read` +
        `only="true">$_current<options>§_costumesMenu</options></input></inpu` +
        `ts></block-definition><block-definition s="new costume %#1 width %#2` +
        ` height %#3" type="reporter" category="looks" selector="reportNewCos` +
        `tume" primitive="reportNewCostume"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%l" readonly="true"><` +
        `/input><input type="%n"><options>a List [2 elements]</options></inpu` +
        `t><input type="%n"><options>a List [2 elements]</options></input></i` +
        `nputs></block-definition><block-definition s="stretch %#1 x: %#2 y: ` +
        `%#3 %" type="reporter" category="looks" selector="reportNewCostumeSt` +
        `retched" primitive="reportNewCostumeStretched"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true">$_current<options>§_costumesMenu</options></input><input ` +
        `type="%n">100</input><input type="%n">50</input></inputs></block-def` +
        `inition><block-definition s="skew %#1 to %#2 degrees %#3 %" type="re` +
        `porter" category="looks" selector="reportNewCostumeSkewed" primitive` +
        `="reportNewCostumeSkewed"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true">$_current<` +
        `options>§_costumesMenu</options></input><input type="%n">0<options>§` +
        `_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) do` +
        `wn=180&#xD;random=$_random</options></input><input type="%n">50</inp` +
        `ut></inputs></block-definition><block-definition s="say %&apos;msg&a` +
        `pos; for %&apos;time&apos; secs" type="command" category="looks" sel` +
        `ector="doSayFor" primitive="doSayFor"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s">Hello!</input>` +
        `<input type="%n">2</input></inputs><script><block s="doPrimitive"><l` +
        `><bool>true</bool></l><l>doSayFor</l></block><block s="bubble"><bloc` +
        `k var="msg"/></block><block s="doWait"><block var="time"/></block><b` +
        `lock s="bubble"><l></l></block></script></block-definition><block-de` +
        `finition s="say %#1" type="command" category="looks" selector="bubbl` +
        `e" primitive="bubble"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s">Hello!</input></inputs></block` +
        `-definition><block-definition s="think %&apos;msg&apos; for %&apos;t` +
        `ime&apos; secs" type="command" category="looks" selector="doThinkFor` +
        `" primitive="doThinkFor"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s">Hmm...</input><input type="` +
        `%n">2</input></inputs><script><block s="doPrimitive"><l><bool>true</` +
        `bool></l><l>doThinkFor</l></block><block s="doThink"><block var="msg` +
        `"/></block><block s="doWait"><block var="time"/></block><block s="do` +
        `Think"><l></l></block></script></block-definition><block-definition ` +
        `s="think %#1" type="command" category="looks" selector="doThink" pri` +
        `mitive="doThink"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s">Hmm...</input></inputs></block-defi` +
        `nition><block-definition s="change %&apos;effect name&apos; effect b` +
        `y %&apos;delta&apos;" type="command" category="looks" selector="chan` +
        `geEffect" primitive="changeEffect"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">$_ghost<options>color=$_color&#xD;saturation=$_s` +
        `aturation&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=` +
        `$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mos` +
        `aic&#xD;negative=$_negative</options></input><input type="%n">25</in` +
        `put><input type="%s" readonly="true" irreplaceable="true">$_ghost<op` +
        `tions>color=$_color&#xD;saturation=$_saturation&#xD;brightness=$_bri` +
        `ghtness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#x` +
        `D;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</o` +
        `ptions></input><input type="%n">25</input><input type="%s" readonly=` +
        `"true" irreplaceable="true">ghost<options>color&#xD;saturation&#xD;b` +
        `rightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#x` +
        `D;negative</options></input></inputs></block-definition><block-defin` +
        `ition s="set %#1 effect to %#2" type="command" category="looks" sele` +
        `ctor="setEffect" primitive="setEffect"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e" irreplaceable="true">$_ghost<options>color=$_color&#xD;saturation` +
        `=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fish` +
        `eye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$` +
        `_mosaic&#xD;negative=$_negative</options></input><input type="%n">0<` +
        `/input></inputs></block-definition><block-definition s="%#1 effect" ` +
        `type="reporter" category="looks" selector="getEffect" primitive="get` +
        `Effect"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true">$_ghost` +
        `<options>color=$_color&#xD;saturation=$_saturation&#xD;brightness=$_` +
        `brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl` +
        `&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative` +
        `</options></input></inputs></block-definition><block-definition s="c` +
        `lear graphic effects" type="command" category="looks" selector="clea` +
        `rEffects" primitive="clearEffects"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="change size by %&apos;delta&apos;" type="command" cat` +
        `egory="looks" selector="changeScale" primitive="changeScale"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">10</input></inputs><script><block s="doPrimitive"><l><bool>` +
        `true</bool></l><l>changeScale</l></block><block s="setScale"><block ` +
        `s="reportVariadicSum"><list><block s="getScale"></block><block var="` +
        `delta"/></list></block></block></script></block-definition><block-de` +
        `finition s="set size to %#1 %" type="command" category="looks" selec` +
        `tor="setScale" primitive="setScale"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%n">100</input></inp` +
        `uts></block-definition><block-definition s="size" type="reporter" ca` +
        `tegory="looks" selector="getScale" primitive="getScale"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="show" type="command" category="l` +
        `ooks" selector="show" primitive="show"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="hide" type="command" category="looks" selector="h` +
        `ide" primitive="hide"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="shown?" type="predicate" category="looks" selector="reportShown" p` +
        `rimitive="reportShown"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="go to %&apos;name&apos; layer" type="command" category="looks" se` +
        `lector="goToLayer" primitive="goToLayer"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">$_front<options>front=$_front&#xD;back=$_b` +
        `ack</options></input></inputs><script><block s="doPrimitive"><l><boo` +
        `l>true</bool></l><l>goToLayer</l></block><block s="doIfElse"><block ` +
        `s="reportVariadicEquals"><list><block s="reportJoinWords"><list><blo` +
        `ck var="name"/></list></block><l>back</l></list></block><script><blo` +
        `ck s="doWarp"><script><block s="doUntil"><block s="reportVariadicEqu` +
        `als"><list><block s="reportListIndex"><block s="reportGet"><l><optio` +
        `n>self</option></l></block><block s="reportAskFor"><block s="reportG` +
        `et"><l><option>stage</option></l></block><block s="reifyReporter"><a` +
        `utolambda><block s="reportGet"><l><option>other sprites</option></l>` +
        `</block></autolambda><list></list></block><list></list></block></blo` +
        `ck><l>1</l></list></block><script><block s="goBack"><l>1</l></block>` +
        `</script></block></script></block></script><script><block s="doWarp"` +
        `><script><block s="doUntil"><block s="reportVariadicEquals"><list><b` +
        `lock s="reportListIndex"><block s="reportGet"><l><option>self</optio` +
        `n></l></block><block s="reportAskFor"><block s="reportGet"><l><optio` +
        `n>stage</option></l></block><block s="reifyReporter"><autolambda><bl` +
        `ock s="reportGet"><l><option>other sprites</option></l></block></aut` +
        `olambda><list></list></block><list></list></block></block><block s="` +
        `reportVariadicSum"><list><block s="reportListAttribute"><l><option>l` +
        `ength</option></l><block s="reportGet"><l><option>other sprites</opt` +
        `ion></l></block></block><l>1</l></list></block></list></block><scrip` +
        `t><block s="goBack"><l>-1</l></block></script></block></script></blo` +
        `ck></script></block></script></block-definition><block-definition s=` +
        `"go back %#1 layers" type="command" category="looks" selector="goBac` +
        `k" primitive="goBack"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">1</input></inputs></block-defi` +
        `nition><block-definition s="save %#1 as costume named %#2" type="com` +
        `mand" category="looks" selector="doScreenshot" primitive="doScreensh` +
        `ot"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true">$_pen trails<options>pen trails=` +
        `$_pen trails&#xD;stage image=$_stage image</options></input><input t` +
        `ype="%s">screenshot</input></inputs></block-definition><block-defini` +
        `tion s="wardrobe" type="reporter" category="looks" selector="reportC` +
        `ostumes" primitive="reportCostumes"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="alert %#1" type="command" category="looks" selector=` +
        `"alert" primitive="alert"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%mult%s" readonly="true"></inp` +
        `ut></inputs></block-definition><block-definition s="console log %#1"` +
        ` type="command" category="looks" selector="log" primitive="log"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%mult%s" readonly="true"></input></inputs></block-definition` +
        `><block-definition s="play sound %#1" type="command" category="sound` +
        `" selector="playSound" primitive="playSound"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true"><options>§_soundsMenu</options></input></inputs></block-def` +
        `inition><block-definition s="play sound %&apos;target&apos; until do` +
        `ne" type="command" category="sound" selector="doPlaySoundUntilDone" ` +
        `primitive="doPlaySoundUntilDone"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true"><op` +
        `tions>§_soundsMenu</options></input></inputs><script><block s="doPri` +
        `mitive"><l><bool>true</bool></l><l>doPlaySoundUntilDone</l></block><` +
        `block s="doDeclareVariables"><list><l>sound</l></list></block><block` +
        ` s="doSetVar"><l>sound</l><block s="reportIfElse"><block s="reportIs` +
        `A"><block var="target"/><l><option>sound</option></l></block><block ` +
        `var="target"/><block s="reportIfElse"><block s="reportIsA"><block va` +
        `r="target"/><l><option>list</option></l></block><block s="reportNewS` +
        `oundFromSamples"><block var="target"/><l>44100</l></block><block s="` +
        `reportFindFirst"><block s="reifyPredicate"><autolambda><block s="rep` +
        `ortVariadicEquals"><list><block s="reportGetSoundAttribute"><l><opti` +
        `on>name</option></l><l></l></block><block var="target"/></list></blo` +
        `ck></autolambda><list></list></block><block s="reportGet"><l><option` +
        `>sounds</option></l></block></block></block></block></block><block s` +
        `="doIf"><block s="reportIsA"><block var="sound"/><l><option>sound</o` +
        `ption></l></block><script><block s="playSound"><block var="sound"/><` +
        `/block><block s="doWait"><block s="reportGetSoundAttribute"><l><opti` +
        `on>duration</option></l><block var="sound"/></block></block></script` +
        `><list></list></block></script></block-definition><block-definition ` +
        `s="play sound %&apos;target&apos; at %&apos;rate&apos; Hz" type="com` +
        `mand" category="sound" selector="doPlaySoundAtRate" primitive="doPla` +
        `ySoundAtRate"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true"><options>§_soundsMenu<` +
        `/options></input><input type="%n">44100<options>22.05 kHz=22050&#xD;` +
        `44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000<` +
        `/options></input></inputs><script><block s="doPrimitive"><l><bool>tr` +
        `ue</bool></l><l>doPlaySoundAtRate</l></block><block s="playSound"><b` +
        `lock s="reportNewSoundFromSamples"><block s="reportGetSoundAttribute` +
        `"><l><option>samples</option></l><block var="target"/></block><block` +
        ` var="rate"/></block></block></script></block-definition><block-defi` +
        `nition s="stop all sounds" type="command" category="sound" selector=` +
        `"doStopAllSounds" primitive="doStopAllSounds"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="%#1 of sound %#2" type="reporter" category` +
        `="sound" selector="reportGetSoundAttribute" primitive="reportGetSoun` +
        `dAttribute"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">$_d` +
        `uration<options>name=$_name&#xD;duration=$_duration&#xD;length=$_len` +
        `gth&#xD;number of channels=$_number of channels&#xD;sample rate=$_sa` +
        `mple rate&#xD;samples=$_samples</options></input><input type="%s" re` +
        `adonly="true"><options>§_soundsMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="new sound %#1 rate %#2 Hz" type="r` +
        `eporter" category="sound" selector="reportNewSoundFromSamples" primi` +
        `tive="reportNewSoundFromSamples"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%l" readonly="true"></i` +
        `nput><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=441` +
        `00&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></i` +
        `nput></inputs></block-definition><block-definition s="rest for %&apo` +
        `s;beats&apos; beats" type="command" category="sound" selector="doRes` +
        `t" primitive="doRest"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">0.2</input></inputs><script><b` +
        `lock s="doPrimitive"><l><bool>true</bool></l><l>doRest</l></block><b` +
        `lock s="doWait"><block s="reportQuotient"><l>60</l><block s="reportV` +
        `ariadicProduct"><list><block var="beats"/><block s="getTempo"></bloc` +
        `k></list></block></block></block></script></block-definition><block-` +
        `definition s="play note %#1 for %#2 beats" type="command" category="` +
        `sound" selector="doPlayNote" primitive="doPlayNote"><header></header` +
        `><code></code><translations></translations><inputs><input type="%n">` +
        `60<options>§_pianoKeyboardMenu</options></input><input type="%n">0.5` +
        `</input></inputs></block-definition><block-definition s="play %#1 Hz` +
        ` for %#2 secs" type="command" category="sound" selector="doPlayFrequ` +
        `ency" primitive="doPlayFrequency"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">440</input><input ` +
        `type="%n">2</input></inputs></block-definition><block-definition s="` +
        `set instrument to %#1" type="command" category="sound" selector="doS` +
        `etInstrument" primitive="doSetInstrument"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">1<options>` +
        `(1) sine=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</o` +
        `ptions></input></inputs></block-definition><block-definition s="chan` +
        `ge tempo by %&apos;delta&apos;" type="command" category="sound" sele` +
        `ctor="doChangeTempo" primitive="doChangeTempo"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">20</i` +
        `nput></inputs><script><block s="doPrimitive"><l><bool>true</bool></l` +
        `><l>doChangeTempo</l></block><block s="doSetTempo"><block s="reportV` +
        `ariadicSum"><list><block s="getTempo"></block><block var="delta"/></` +
        `list></block></block></script></block-definition><block-definition s` +
        `="set tempo to %#1 bpm" type="command" category="sound" selector="do` +
        `SetTempo" primitive="doSetTempo"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">60</input></inputs>` +
        `</block-definition><block-definition s="tempo" type="reporter" categ` +
        `ory="sound" selector="getTempo" primitive="getTempo"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="change volume by %&apos;delta&apos;` +
        `" type="command" category="sound" selector="changeVolume" primitive=` +
        `"changeVolume"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">10</input></inputs><script><block s="` +
        `doPrimitive"><l><bool>true</bool></l><l>changeVolume</l></block><blo` +
        `ck s="setVolume"><block s="reportVariadicSum"><list><block s="getVol` +
        `ume"></block><block var="delta"/></list></block></block></script></b` +
        `lock-definition><block-definition s="set volume to %#1 %" type="comm` +
        `and" category="sound" selector="setVolume" primitive="setVolume"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">100</input></inputs></block-definition><block-definitio` +
        `n s="volume" type="reporter" category="sound" selector="getVolume" p` +
        `rimitive="getVolume"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"change balance by %&apos;delta&apos;" type="command" category="soun` +
        `d" selector="changePan" primitive="changePan"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">10</in` +
        `put></inputs><script><block s="doPrimitive"><l><bool>true</bool></l>` +
        `<l>changePan</l></block><block s="setPan"><block s="reportVariadicSu` +
        `m"><list><block s="getPan"></block><block var="delta"/></list></bloc` +
        `k></block></script></block-definition><block-definition s="set balan` +
        `ce to %#1" type="command" category="sound" selector="setPan" primiti` +
        `ve="setPan"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n">0</input></inputs></block-definition><bl` +
        `ock-definition s="balance" type="reporter" category="sound" selector` +
        `="getPan" primitive="getPan"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs></block-definition><block-defin` +
        `ition s="play frequency %#1 Hz" type="command" category="sound" sele` +
        `ctor="playFreq" primitive="playFreq"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">440</input></in` +
        `puts></block-definition><block-definition s="stop frequency" type="c` +
        `ommand" category="sound" selector="stopFreq" primitive="stopFreq"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="jukebox" type="reporte` +
        `r" category="sound" selector="reportSounds" primitive="reportSounds"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="clear" type="comman` +
        `d" category="pen" selector="clear" primitive="clear"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="pen down" type="command" category="` +
        `pen" selector="down" primitive="down"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="pen up" type="command" category="pen" selector="up` +
        `" primitive="up"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="pen` +
        ` down?" type="predicate" category="pen" selector="getPenDown" primit` +
        `ive="getPenDown"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="set` +
        ` pen color to %&apos;color&apos;" type="command" category="pen" sele` +
        `ctor="setColor" primitive="setColor"><header></header><code></code><` +
        `translations></translations><inputs><input type="%clr" readonly="tru` +
        `e" irreplaceable="true"></input></inputs><script><block s="doPrimiti` +
        `ve"><l><bool>true</bool></l><l>setColor</l></block><block s="doApply` +
        `Extension"><l>clr_setpen(clr)</l><list><block var="color"/></list></` +
        `block></script></block-definition><block-definition s="set pen %#1 t` +
        `o %#2" type="command" category="pen" selector="setPenColorDimension"` +
        ` primitive="setPenColorDimension"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturati` +
        `on&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&` +
        `#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">50` +
        `</input></inputs></block-definition><block-definition s="change pen ` +
        `%&apos;aspect&apos; by %&apos;delta&apos;" type="command" category="` +
        `pen" selector="changePenColorDimension" primitive="changePenColorDim` +
        `ension"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true">$_hue<o` +
        `ptions>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_bright` +
        `ness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-` +
        `b(-a)</options></input><input type="%n">10</input><input type="%s" r` +
        `eadonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;satu` +
        `ration=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_t` +
        `ransparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><i` +
        `nput type="%n">10</input><input type="%s" readonly="true" irreplacea` +
        `ble="true">hue<options>hue&#xD;saturation&#xD;brightness&#xD;transpa` +
        `rency&#xD;&#126;&#xD;r-g-b(-a)</options></input></inputs></block-def` +
        `inition><block-definition s="pen %#1" type="reporter" category="pen"` +
        ` selector="getPenAttribute" primitive="getPenAttribute"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true" irreplaceable="true">$_hue<options>size=$_size&#` +
        `xD;hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness` +
        `&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b-a=$_r-g-b-a</o` +
        `ptions></input></inputs></block-definition><block-definition s="set ` +
        `background color to %#1" type="command" category="pen" selector="set` +
        `BackgroundColor" primitive="setBackgroundColor"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%clr" re` +
        `adonly="true" irreplaceable="true"></input></inputs></block-definiti` +
        `on><block-definition s="set background %#1 to %#2" type="command" ca` +
        `tegory="pen" selector="setBackgroundColorDimension" primitive="setBa` +
        `ckgroundColorDimension"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true" irreplaceabl` +
        `e="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;bri` +
        `ghtness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;` +
        `r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">50</input></` +
        `inputs></block-definition><block-definition s="change background %#1` +
        ` by %#2" type="command" category="pen" selector="changeBackgroundCol` +
        `orDimension" primitive="changeBackgroundColorDimension"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD` +
        `;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transparenc` +
        `y=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></inp` +
        `ut><input type="%n">10</input></inputs></block-definition><block-def` +
        `inition s="change pen size by %&apos;delta&apos;" type="command" cat` +
        `egory="pen" selector="changeSize" primitive="changeSize"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n">1</input></inputs><script><block s="doPrimitive"><l><bool>true<` +
        `/bool></l><l>changeSize</l></block><block s="setSize"><block s="repo` +
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
        `d" category="control" selector="doWait" primitive="doWait"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n">1</input></inputs><script><block s="doPrimitive"><l><bool>tru` +
        `e</bool></l><l>doWait</l></block><block s="doDeclareVariables"><list` +
        `><l>start time</l></list></block><block s="doSetVar"><l>start time</` +
        `l><block s="reportDate"><l><option>time in milliseconds</option></l>` +
        `</block></block><block s="doWaitUntil"><block s="reportVariadicGreat` +
        `erThanOrEquals"><list><block s="reportDate"><l><option>time in milli` +
        `seconds</option></l></block><block s="reportVariadicSum"><list><bloc` +
        `k var="start time"/><block s="reportVariadicProduct"><list><block va` +
        `r="duration"/><l>1000</l></list></block></list></block></list></bloc` +
        `k></block></script></block-definition><block-definition s="wait unti` +
        `l %&apos;condition&apos;" type="command" category="control" selector` +
        `="doWaitUntil" primitive="doWaitUntil"><header></header><code></code` +
        `><translations></translations><inputs><input type="%boolUE" readonly` +
        `="true"></input></inputs><script><block s="doPrimitive"><l><bool>tru` +
        `e</bool></l><l>doWaitUntil</l></block><block s="doIf"><block s="repo` +
        `rtNot"><block s="evaluate"><block var="condition"/><list></list></bl` +
        `ock></block><script><block s="doWaitUntil"><block s="evaluate"><bloc` +
        `k var="condition"/><list></list></block></block></script><list></lis` +
        `t></block></script></block-definition><block-definition s="forever %` +
        `&apos;action&apos;" type="command" category="control" selector="doFo` +
        `rever" primitive="doForever"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%loop" readonly="true" irre` +
        `placeable="true"></input></inputs><script><block s="doPrimitive"><l>` +
        `<bool>true</bool></l><l>doForever</l></block><block s="doRun"><block` +
        ` var="action"/><list></list></block><block s="doRun"><block s="repor` +
        `tEnvironment"><l><option>script</option></l></block><list><block var` +
        `="action"/></list></block></script></block-definition><block-definit` +
        `ion s="repeat %&apos;count&apos; %&apos;action&apos;" type="command"` +
        ` category="control" selector="doRepeat" primitive="doRepeat"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">10</input><input type="%loop" readonly="true" irreplaceable` +
        `="true"></input></inputs><script><block s="doPrimitive"><l><bool>tru` +
        `e</bool></l><l>doRepeat</l></block><block s="doDeclareVariables"><li` +
        `st><l>self</l></list></block><block s="doSetVar"><l>self</l><block s` +
        `="reportEnvironment"><l><option>script</option></l></block></block><` +
        `block s="doIf"><block s="reportVariadicGreaterThan"><list><block var` +
        `="count"/><l>0</l></list></block><script><block s="doRun"><block var` +
        `="action"/><list></list></block><block s="doApplyExtension"><l>snap_` +
        `yield</l><list></list></block><block s="doRun"><block var="self"/><l` +
        `ist><block s="reportDifference"><block var="count"/><l>1</l></block>` +
        `<block var="action"/></list></block></script><list></list></block></` +
        `script></block-definition><block-definition s="repeat until %&apos;c` +
        `ondition&apos; %&apos;action&apos;" type="command" category="control` +
        `" selector="doUntil" primitive="doUntil"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%boolUE" readon` +
        `ly="true"></input><input type="%loop" readonly="true" irreplaceable=` +
        `"true"></input></inputs><script><block s="doPrimitive"><l><bool>true` +
        `</bool></l><l>doUntil</l></block><block s="doDeclareVariables"><list` +
        `><l>self</l></list></block><block s="doSetVar"><l>self</l><block s="` +
        `reportEnvironment"><l><option>script</option></l></block></block><bl` +
        `ock s="doIf"><block s="reportNot"><block s="evaluate"><block var="co` +
        `ndition"/><list></list></block></block><script><block s="doRun"><blo` +
        `ck var="action"/><list></list></block><block s="doApplyExtension"><l` +
        `>snap_yield</l><list></list></block><block s="doRun"><block var="sel` +
        `f"/><list><block var="condition"/><block var="action"/></list></bloc` +
        `k></script><list></list></block></script></block-definition><block-d` +
        `efinition s="for %&apos;count&apos; = %&apos;start&apos; to %&apos;e` +
        `nd&apos; %&apos;action&apos;" type="command" category="control" sele` +
        `ctor="doFor" primitive="doFor"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%upvar" readonly="true" i` +
        `rreplaceable="true">i</input><input type="%n">1</input><input type="` +
        `%n">10</input><input type="%loop" readonly="true" irreplaceable="tru` +
        `e"></input></inputs><script><block s="doPrimitive"><l><bool>true</bo` +
        `ol></l><l>doFor</l></block><block s="doDeclareVariables"><list><l>te` +
        `st</l><l>increment</l></list></block><block s="doSetVar"><l>count</l` +
        `><block var="start"/></block><block s="doIfElse"><block s="reportVar` +
        `iadicLessThan"><list><block var="start"/><block var="end"/></list></` +
        `block><script><block s="doSetVar"><l>test</l><block s="reifyPredicat` +
        `e"><autolambda><block s="reportVariadicGreaterThan"><list><block var` +
        `="count"/><block var="end"/></list></block></autolambda><list></list` +
        `></block></block><block s="doSetVar"><l>increment</l><l>1</l></block` +
        `></script><script><block s="doSetVar"><l>test</l><block s="reifyPred` +
        `icate"><autolambda><block s="reportVariadicLessThan"><list><block va` +
        `r="count"/><block var="end"/></list></block></autolambda><list></lis` +
        `t></block></block><block s="doSetVar"><l>increment</l><l>-1</l></blo` +
        `ck></script></block><block s="doUntil"><block s="evaluate"><block va` +
        `r="test"/><list></list></block><script><block s="doRun"><block var="` +
        `action"/><list></list></block><block s="doChangeVar"><l>count</l><bl` +
        `ock var="increment"/></block></script></block></script></block-defin` +
        `ition><block-definition s="if %&apos;condition&apos; %&apos;true cas` +
        `e&apos; %&apos;else pairs&apos;" type="command" category="control" s` +
        `elector="doIf" primitive="doIf"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%b" readonly="true"></in` +
        `put><input type="%cs" readonly="true" irreplaceable="true"></input><` +
        `input type="%elseif" readonly="true" irreplaceable="true" expand="el` +
        `se if&#xD;"></input></inputs><script><block s="doPrimitive"><l><bool` +
        `>true</bool></l><l>doIf</l></block><block s="doDeclareVariables"><li` +
        `st><l>self</l></list></block><block s="doSetVar"><l>self</l><block s` +
        `="reportEnvironment"><l><option>script</option></l></block></block><` +
        `block s="doIfElse"><block var="condition"/><script><block s="doRun">` +
        `<block var="true case"/><list></list></block></script><script><block` +
        ` s="doIfElse"><block s="reportListIsEmpty"><block var="else pairs"/>` +
        `</block><script></script><script><block s="doIfElse"><block s="repor` +
        `tListItem"><l>1</l><block var="else pairs"/></block><script><block s` +
        `="doRun"><block s="reportListItem"><l>2</l><block var="else pairs"/>` +
        `</block><list></list></block></script><script><block s="doRun"><bloc` +
        `k var="self"/><list><block s="reportBoolean"><l><bool>false</bool></` +
        `l></block><l></l><block s="reportCDR"><block s="reportCDR"><block va` +
        `r="else pairs"/></block></block></list></block></script></block></sc` +
        `ript></block></script></block></script></block-definition><block-def` +
        `inition s="if %&apos;condition&apos; %&apos;true case&apos; else %&a` +
        `pos;false case&apos;" type="command" category="control" selector="do` +
        `IfElse" primitive="doIfElse"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%b" readonly="true"></input` +
        `><input type="%cs" readonly="true" irreplaceable="true"></input><inp` +
        `ut type="%cs" readonly="true" irreplaceable="true"></input></inputs>` +
        `<script><block s="doPrimitive"><l><bool>true</bool></l><l>doIfElse</` +
        `l></block><block s="doRun"><block s="reportListItem"><block s="repor` +
        `tVariadicSum"><list><block var="condition"/><l>1</l></list></block><` +
        `block s="reportNewList"><list><block var="false case"/><block var="t` +
        `rue case"/></list></block></block><list></list></block></script></bl` +
        `ock-definition><block-definition s="if %&apos;condition&apos; then %` +
        `&apos;true case&apos; else %&apos;false case&apos;" type="reporter" ` +
        `category="control" selector="reportIfElse" primitive="reportIfElse">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%b" readonly="true"></input><input type="%anyUE"></input` +
        `><input type="%anyUE"></input></inputs><script><block s="doPrimitive` +
        `"><l><bool>true</bool></l><l>reportIfElse</l></block><block s="doRep` +
        `ort"><block s="reportHyperZip"><block s="reifyReporter"><autolambda>` +
        `<block s="evaluate"><block s="reportListItem"><l></l><l/></block><li` +
        `st></list></block></autolambda><list></list></block><block s="report` +
        `VariadicSum"><list><block var="condition"/><l>1</l></list></block><l` +
        `>0</l><block s="reportNewList"><list><block var="false case"/><block` +
        ` var="true case"/></list></block><l>1</l></block></block></script></` +
        `block-definition><block-definition s="stop %#1" type="command" categ` +
        `ory="control" selector="doStopThis" primitive="doStopThis"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_all<options>all=$_all&` +
        `#xD;all scenes=$_all scenes&#xD;this script=$_this script&#xD;this b` +
        `lock=$_this block&#xD;all but this script=$_all but this script&#xD;` +
        `other scripts in sprite=$_other scripts in sprite</options></input><` +
        `/inputs></block-definition><block-definition s="run %#1 %#2" type="c` +
        `ommand" category="control" selector="doRun" primitive="doRun"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%cmdRing" readonly="true"></input><input type="%mult%s" readon` +
        `ly="true" expand="with inputs"></input></inputs></block-definition><` +
        `block-definition s="launch %#1 %#2" type="command" category="control` +
        `" selector="fork" primitive="fork"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%cmdRing" readonly="t` +
        `rue"></input><input type="%mult%s" readonly="true" expand="with inpu` +
        `ts"></input></inputs></block-definition><block-definition s="call %#` +
        `1 %#2" type="reporter" category="control" selector="evaluate" primit` +
        `ive="evaluate"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%repRing" readonly="true" irreplaceable="` +
        `true"></input><input type="%mult%s" readonly="true" expand="with inp` +
        `uts"></input></inputs></block-definition><block-definition s="report` +
        ` %#1" type="command" category="control" selector="doReport" primitiv` +
        `e="doReport"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s"></input></inputs></block-definition><bl` +
        `ock-definition s="run %#1 w/continuation" type="command" category="c` +
        `ontrol" selector="doCallCC" primitive="doCallCC"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%cmdRin` +
        `g" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="call %#1 w/continuation" type="reporter" category="control" ` +
        `selector="reportCallCC" primitive="reportCallCC"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%cmdRin` +
        `g" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="warp %#1" type="command" category="other" selector="doWarp" ` +
        `primitive="doWarp"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%cs" readonly="true" irreplaceable="t` +
        `rue"></input></inputs></block-definition><block-definition s="tell %` +
        `&apos;target&apos; to %&apos;action&apos; %&apos;parameters&apos;" t` +
        `ype="command" category="control" selector="doTellTo" primitive="doTe` +
        `llTo"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true"><options>§_objectsMenu</option` +
        `s></input><input type="%cmdRing" readonly="true"></input><input type` +
        `="%mult%s" readonly="true" expand="with inputs"></input></inputs><sc` +
        `ript><block s="doPrimitive"><l><bool>true</bool></l><l>doTellTo</l><` +
        `/block><block s="doRun"><block s="reportAttributeOf"><block var="act` +
        `ion"/><block var="target"/></block><block var="parameters"/></block>` +
        `</script></block-definition><block-definition s="ask %&apos;target&a` +
        `pos; for %&apos;action&apos; %&apos;parameters&apos;" type="reporter` +
        `" category="control" selector="reportAskFor" primitive="reportAskFor` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_objectsMenu</options></` +
        `input><input type="%repRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%mult%s" readonly="true" expand="with inputs"></i` +
        `nput></inputs><script><block s="doPrimitive"><l><bool>true</bool></l` +
        `><l>reportAskFor</l></block><block s="doReport"><block s="evaluate">` +
        `<block s="reportAttributeOf"><block var="action"/><block var="target` +
        `"/></block><block var="parameters"/></block></block></script></block` +
        `-definition><block-definition s="create a clone of %&apos;target&apo` +
        `s;" type="command" category="control" selector="createClone" primiti` +
        `ve="createClone"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true">$_myself<options>§_` +
        `clonablesMenu</options></input></inputs><script><block s="doPrimitiv` +
        `e"><l><bool>true</bool></l><l>createClone</l></block><block s="doRep` +
        `ort"><block s="newClone"><block var="target"/></block></block></scri` +
        `pt></block-definition><block-definition s="a new clone of %#1" type=` +
        `"reporter" category="control" selector="newClone" primitive="newClon` +
        `e"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true">$_myself<options>§_clonablesMenu<` +
        `/options></input></inputs></block-definition><block-definition s="de` +
        `lete this clone" type="command" category="control" selector="removeC` +
        `lone" primitive="removeClone"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="define %#1 %#2 %#3" type="command" category="control" sele` +
        `ctor="doDefineBlock" primitive="doDefineBlock"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%upvar" r` +
        `eadonly="true" irreplaceable="true">$_block</input><input type="%s">` +
        `</input><input type="%repRing" readonly="true" irreplaceable="true">` +
        `</input></inputs></block-definition><block-definition s="set %#1 of ` +
        `block %#2 to %#3" type="command" category="control" selector="doSetB` +
        `lockAttribute" primitive="doSetBlockAttribute"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true" irreplaceable="true">$_label<options>label=$_label&#xD;de` +
        `finition=$_definition&#xD;comment=$_comment&#xD;category=$_category&` +
        `#xD;type=$_type&#xD;scope=$_scope&#xD;selector=$_selector&#xD;slots=` +
        `$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#xD;edi` +
        `tables=$_editables&#xD;replaceables=$_replaceables&#xD;&#126;&#xD;se` +
        `parators=$_separators&#xD;collapses=$_collapses&#xD;expands=$_expand` +
        `s&#xD;initial slots=$_initial slots&#xD;min slots=$_min slots&#xD;ma` +
        `x slots=$_max slots&#xD;translations=$_translations</options></input` +
        `><input type="%repRing" readonly="true" irreplaceable="true"></input` +
        `><input type="%s"></input></inputs></block-definition><block-definit` +
        `ion s="delete block %#1" type="command" category="control" selector=` +
        `"doDeleteBlock" primitive="doDeleteBlock"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%repRing" read` +
        `only="true" irreplaceable="true"></input></inputs></block-definition` +
        `><block-definition s="%#1 of block %#2" type="reporter" category="co` +
        `ntrol" selector="reportBlockAttribute" primitive="reportBlockAttribu` +
        `te"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">$_definitio` +
        `n<options>label=$_label&#xD;definition=$_definition&#xD;comment=$_co` +
        `mment&#xD;category=$_category&#xD;custom?=$_custom?&#xD;global?=$_gl` +
        `obal?&#xD;type=$_type&#xD;scope=$_scope&#xD;selector=$_selector&#xD;` +
        `slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#` +
        `xD;editables=$_editables&#xD;replaceables=$_replaceables&#xD;&#126;&` +
        `#xD;separators=$_separators&#xD;collapses=$_collapses&#xD;expands=$_` +
        `expands&#xD;initial slots=$_initial slots&#xD;min slots=$_min slots&` +
        `#xD;max slots=$_max slots&#xD;translations=$_translations</options><` +
        `/input><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input></inputs></block-definition><block-definition s="this %#1" ty` +
        `pe="reporter" category="control" selector="reportEnvironment" primit` +
        `ive="reportEnvironment"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true" irreplaceabl` +
        `e="true">$_script<options>script=$_script&#xD;caller=$_caller&#xD;co` +
        `ntinuation=$_continuation&#xD;&#126;&#xD;inputs=$_inputs</options></` +
        `input></inputs></block-definition><block-definition s="pause all $pa` +
        `use" type="command" category="control" selector="doPauseAll" primiti` +
        `ve="doPauseAll"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="swit` +
        `ch to scene %#1 %#2" type="command" category="control" selector="doS` +
        `witchToScene" primitive="doSwitchToScene"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true">$_next<options>§_scenesMenu</options></input><input type="%sen` +
        `d" readonly="true" irreplaceable="true" expand="and send&#xD;with da` +
        `ta" max="2"></input></inputs></block-definition><block-definition s=` +
        `"pipe %&apos;value&apos; $arrowRight %&apos;functions&apos;" type="r` +
        `eporter" category="control" selector="reportPipe" primitive="reportP` +
        `ipe"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s"></input><input type="%mult%repRing" readonly="t` +
        `rue" initial="1"></input></inputs><script><block s="doPrimitive"><l>` +
        `<bool>true</bool></l><l>reportPipe</l></block><block s="doReport"><b` +
        `lock s="reportIfElse"><block s="reportListIsEmpty"><block var="funct` +
        `ions"/></block><block var="value"/><block s="reportPipe"><block s="e` +
        `valuate"><block s="reportListItem"><l>1</l><block var="functions"/><` +
        `/block><list><block var="value"/></list></block><block s="reportCDR"` +
        `><block var="functions"/></block></block></block></block></script></` +
        `block-definition><block-definition s="touching %#1 ?" type="predicat` +
        `e" category="sensing" selector="reportTouchingObject" primitive="rep` +
        `ortTouchingObject"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s" readonly="true">$_mouse-pointer<o` +
        `ptions>§_collidablesMenu</options></input></inputs></block-definitio` +
        `n><block-definition s="touching %#1 ?" type="predicate" category="se` +
        `nsing" selector="reportTouchingColor" primitive="reportTouchingColor` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%clr" readonly="true" irreplaceable="true"></input></i` +
        `nputs></block-definition><block-definition s="color %#1 is touching ` +
        `%#2 ?" type="predicate" category="sensing" selector="reportColorIsTo` +
        `uchingColor" primitive="reportColorIsTouchingColor"><header></header` +
        `><code></code><translations></translations><inputs><input type="%clr` +
        `" readonly="true" irreplaceable="true"></input><input type="%clr" re` +
        `adonly="true" irreplaceable="true"></input></inputs></block-definiti` +
        `on><block-definition s="%#1 at %#2" type="reporter" category="sensin` +
        `g" selector="reportAspect" primitive="reportAspect"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;sat` +
        `uration=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_` +
        `transparency&#xD;r-g-b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites<` +
        `/options></input><input type="%s" readonly="true">$_mouse-pointer<op` +
        `tions>§_locationMenu</options></input></inputs></block-definition><b` +
        `lock-definition s="stack size" type="reporter" category="sensing" se` +
        `lector="reportStackSize" primitive="reportStackSize"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="frames" type="reporter" category="s` +
        `ensing" selector="reportFrameCount" primitive="reportFrameCount"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="yields" type="reporter"` +
        ` category="sensing" selector="reportYieldCount" primitive="reportYie` +
        `ldCount"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="processes" ` +
        `type="reporter" category="sensing" selector="reportThreadCount" prim` +
        `itive="reportThreadCount"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="ask %#1 and wait" type="command" category="sensing" selector="` +
        `doAsk" primitive="doAsk"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s">what&apos;s your name?</inp` +
        `ut></inputs></block-definition><block-definition s="answer" type="re` +
        `porter" category="sensing" selector="reportLastAnswer" primitive="re` +
        `portLastAnswer"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="answ` +
        `er" type="reporter" category="sensing" selector="getLastAnswer" prim` +
        `itive="getLastAnswer"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="mouse position" type="reporter" category="sensing" selector="repor` +
        `tMousePosition" primitive="reportMousePosition"><header></header><co` +
        `de></code><translations></translations><inputs></inputs><script><blo` +
        `ck s="doPrimitive"><l><bool>true</bool></l><l>reportMousePosition</l` +
        `></block><block s="doReport"><block s="reportNewList"><list><block s` +
        `="reportMouseX"></block><block s="reportMouseY"></block></list></blo` +
        `ck></block></script></block-definition><block-definition s="mouse x"` +
        ` type="reporter" category="sensing" selector="reportMouseX" primitiv` +
        `e="reportMouseX"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="mou` +
        `se y" type="reporter" category="sensing" selector="reportMouseY" pri` +
        `mitive="reportMouseY"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="mouse down?" type="predicate" category="sensing" selector="reportM` +
        `ouseDown" primitive="reportMouseDown"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="key %#1 pressed?" type="predicate" category="sensi` +
        `ng" selector="reportKeyPressed" primitive="reportKeyPressed"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true">$_space<options>§_keysMenu</options></input` +
        `></inputs></block-definition><block-definition s="%#1 to %#2" type="` +
        `reporter" category="sensing" selector="reportRelationTo" primitive="` +
        `reportRelationTo"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s" readonly="true">$_distance<options` +
        `>distance=$_distance&#xD;direction=$_direction&#xD;ray length=$_ray ` +
        `length</options></input><input type="%s" readonly="true">$_mouse-poi` +
        `nter<options>§_destinationsMenu</options></input></inputs></block-de` +
        `finition><block-definition s="reset timer" type="command" category="` +
        `sensing" selector="doResetTimer" primitive="doResetTimer"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="timer" type="reporter" categor` +
        `y="sensing" selector="reportTimer" primitive="reportTimer"><header><` +
        `/header><code></code><translations></translations><inputs></inputs><` +
        `/block-definition><block-definition s="timer" type="reporter" catego` +
        `ry="sensing" selector="getTimer" primitive="getTimer"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="%#1 of %#2" type="reporter" catego` +
        `ry="sensing" selector="reportAttributeOf" primitive="reportAttribute` +
        `Of"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true">$_costume #<options>§_attributes` +
        `Menu</options></input><input type="%s" readonly="true"><options>§_ob` +
        `jectsMenu</options></input></inputs></block-definition><block-defini` +
        `tion s="object %&apos;name&apos;" type="reporter" category="sensing"` +
        ` selector="reportObject" primitive="reportObject"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true">$_myself<options>§_objectsMenuWithSelf</options></inpu` +
        `t></inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l` +
        `>reportObject</l></block><block s="doReport"><block s="reportHyperZi` +
        `p"><block s="reifyReporter"><autolambda><block s="reportFindFirst"><` +
        `block s="reifyPredicate"><autolambda><block s="reportVariadicEquals"` +
        `><list><block var="id"/><block s="reportAskFor"><l></l><block s="rei` +
        `fyReporter"><autolambda><block s="reportGet"><l><option>name</option` +
        `></l></block></autolambda><list></list></block><list></list></block>` +
        `</list></block></autolambda><list></list></block><block s="reportCon` +
        `catenatedLists"><list><block s="reportAskFor"><block s="reportGet"><` +
        `l><option>stage</option></l></block><block s="reifyReporter"><autola` +
        `mbda><block s="reportGet"><l><option>other sprites</option></l></blo` +
        `ck></autolambda><list></list></block><list></list></block><block s="` +
        `reportNewList"><list><block s="reportGet"><l><option>stage</option><` +
        `/l></block></list></block></list></block></block></autolambda><list>` +
        `<l>id</l></list></block><block var="name"/><l>0</l><l></l><l>0</l></` +
        `block></block></script></block-definition><block-definition s="url %` +
        `#1" type="reporter" category="sensing" selector="reportURL" primitiv` +
        `e="reportURL"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s">snap.berkeley.edu</input></inputs></bl` +
        `ock-definition><block-definition s="set %#1 to %#2" type="command" c` +
        `ategory="sensing" selector="doSetGlobalFlag" primitive="doSetGlobalF` +
        `lag"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true" irreplaceable="true">$_video ca` +
        `pture<options>turbo mode=$_turbo mode&#xD;case sensitivity=$_case se` +
        `nsitivity&#xD;flat line ends=$_flat line ends&#xD;log pen vectors=$_` +
        `log pen vectors&#xD;video capture=$_video capture&#xD;mirror video=$` +
        `_mirror video</options></input><input type="%b" readonly="true"></in` +
        `put></inputs></block-definition><block-definition s="is %#1 on?" typ` +
        `e="predicate" category="sensing" selector="reportGlobalFlag" primiti` +
        `ve="reportGlobalFlag"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true" irreplaceable=` +
        `"true">$_turbo mode<options>turbo mode=$_turbo mode&#xD;case sensiti` +
        `vity=$_case sensitivity&#xD;flat line ends=$_flat line ends&#xD;log ` +
        `pen vectors=$_log pen vectors&#xD;video capture=$_video capture&#xD;` +
        `mirror video=$_mirror video</options></input></inputs></block-defini` +
        `tion><block-definition s="current %#1" type="reporter" category="sen` +
        `sing" selector="reportDate" primitive="reportDate"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true" irreplaceable="true">$_date<options>year=$_year&#xD;m` +
        `onth=$_month&#xD;date=$_date&#xD;day of week=$_day of week&#xD;hour=` +
        `$_hour&#xD;minute=$_minute&#xD;second=$_second&#xD;time in milliseco` +
        `nds=$_time in milliseconds</options></input></inputs></block-definit` +
        `ion><block-definition s="my %#1" type="reporter" category="sensing" ` +
        `selector="reportGet" primitive="reportGet"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true">$_neighbors<options>§_gettablesMenu</opt` +
        `ions></input></inputs></block-definition><block-definition s="microp` +
        `hone %#1" type="reporter" category="sensing" selector="reportAudio" ` +
        `primitive="reportAudio"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true" irreplaceabl` +
        `e="true">$_volume<options>§_audioMenu</options></input></inputs></bl` +
        `ock-definition><block-definition s="%#1" type="reporter" category="o` +
        `perators" selector="reportVariadicSum" primitive="reportVariadicSum"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%n" readonly="true" separator="+" collapse="sum" i` +
        `nitial="2"></input></inputs></block-definition><block-definition s="` +
        `%&apos;a&apos; − %&apos;b&apos;" type="reporter" category="operators` +
        `" selector="reportDifference" primitive="reportDifference"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n"></input><input type="%n"></input><input type="%n"></input><in` +
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
        `dicate" category="operators" selector="reportNot" primitive="reportN` +
        `ot"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%b" readonly="true"></input></inputs><script><block ` +
        `s="doPrimitive"><l><bool>true</bool></l><l>reportNot</l></block><blo` +
        `ck s="doReport"><block s="reportIfElse"><block var="bool"/><block s=` +
        `"reportBoolean"><l><bool>false</bool></l></block><block s="reportBoo` +
        `lean"><l><bool>true</bool></l></block></block></block></script></blo` +
        `ck-definition><block-definition s="%&apos;arg&apos;" type="predicate` +
        `" category="operators" selector="reportBoolean" primitive="reportBoo` +
        `lean"><header></header><code></code><translations></translations><in` +
        `puts><input type="%b" readonly="true" irreplaceable="true">true</inp` +
        `ut></inputs><script><block s="doPrimitive"><l><bool>true</bool></l><` +
        `l>reportBoolean</l></block><block s="doReport"><block var="arg"/></b` +
        `lock></script></block-definition><block-definition s="%#1" type="pre` +
        `dicate" category="operators" selector="reportFalse" primitive="repor` +
        `tFalse"><header></header><code></code><translations></translations><` +
        `inputs><input type="%b" readonly="true" irreplaceable="true">false</` +
        `input></inputs></block-definition><block-definition s="join %#1" typ` +
        `e="reporter" category="operators" selector="reportJoinWords" primiti` +
        `ve="reportJoinWords"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%mult%s" readonly="true" initial="2` +
        `">hello &#xD;world</input></inputs></block-definition><block-definit` +
        `ion s="letter %&apos;idx&apos; of %&apos;text&apos;" type="reporter"` +
        ` category="operators" selector="reportLetter" primitive="reportLette` +
        `r"><header></header><code></code><translations></translations><input` +
        `s><input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random` +
        `</options></input><input type="%s">world</input></inputs><script><bl` +
        `ock s="doPrimitive"><l><bool>true</bool></l><l>reportLetter</l></blo` +
        `ck><block s="doReport"><block s="reportHyperZip"><block s="reifyRepo` +
        `rter"><autolambda><block s="reportListItem"><l></l><block s="reportT` +
        `extSplit"><l></l><l><option>letter</option></l></block></block></aut` +
        `olambda><list></list></block><block var="idx"/><l>0</l><block var="t` +
        `ext"/><l>0</l></block></block></script></block-definition><block-def` +
        `inition s="length of %#1" type="reporter" category="operators" selec` +
        `tor="reportStringSize" primitive="reportStringSize"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s">` +
        `world</input></inputs></block-definition><block-definition s="%#1 of` +
        ` text %#2" type="reporter" category="operators" selector="reportText` +
        `Attribute" primitive="reportTextAttribute"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true">$_length<options>length=$_length&#xD;low` +
        `er case=$_lower case&#xD;upper case=$_upper case</options></input><i` +
        `nput type="%s">world</input></inputs></block-definition><block-defin` +
        `ition s="unicode of %#1" type="reporter" category="operators" select` +
        `or="reportUnicode" primitive="reportUnicode"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s">a</inpu` +
        `t></inputs></block-definition><block-definition s="unicode %#1 as le` +
        `tter" type="reporter" category="operators" selector="reportUnicodeAs` +
        `Letter" primitive="reportUnicodeAsLetter"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">65</input>` +
        `</inputs></block-definition><block-definition s="is %#1 a %#2 ?" typ` +
        `e="predicate" category="operators" selector="reportIsA" primitive="r` +
        `eportIsA"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s">5</input><input type="%s" readonly="true" ` +
        `irreplaceable="true">$_number<options>§_typesMenu</options></input><` +
        `/inputs></block-definition><block-definition s="is %#1 ?" type="pred` +
        `icate" category="operators" selector="reportVariadicIsIdentical" pri` +
        `mitive="reportVariadicIsIdentical"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%mult%s" readonly="tr` +
        `ue" separator="identical to" collapse="all identical" initial="2"></` +
        `input></inputs></block-definition><block-definition s="split %#1 by ` +
        `%#2" type="reporter" category="operators" selector="reportTextSplit"` +
        ` primitive="reportTextSplit"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s">hello world</input><inp` +
        `ut type="%s"> <options>letter=$_letter&#xD;word=$_word&#xD;line=$_li` +
        `ne&#xD;tab=$_tab&#xD;cr=$_cr&#xD;csv=$_csv&#xD;json=$_json&#xD;&#126` +
        `;&#xD;blocks=$_blocks</options></input></inputs></block-definition><` +
        `block-definition s="JavaScript function ( %#1 ) { %#2 }" type="repor` +
        `ter" category="operators" selector="reportJSFunction" primitive="rep` +
        `ortJSFunction"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%mult%s" readonly="true"></input><input t` +
        `ype="%mlt"></input></inputs></block-definition><block-definition s="` +
        `type of %#1" type="reporter" category="operators" selector="reportTy` +
        `peOf" primitive="reportTypeOf"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s">5</input></inputs></b` +
        `lock-definition><block-definition s="%#1 of %#2" type="reporter" cat` +
        `egory="operators" selector="reportTextFunction" primitive="reportTex` +
        `tFunction"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true" irreplaceable="true">$_en` +
        `code URI<options>encode URI=$_encode URI&#xD;decode URI=$_decode URI` +
        `&#xD;encode URI component=$_encode URI component&#xD;decode URI comp` +
        `onent=$_decode URI component&#xD;XML escape=$_XML escape&#xD;XML une` +
        `scape=$_XML unescape&#xD;JS escape=$_JS escape&#xD;hex sha512 hash=$` +
        `_hex sha512 hash</options></input><input type="%s">Abelson &amp; Sus` +
        `sman</input></inputs></block-definition><block-definition s="compile` +
        ` %#1 for %#2 args" type="reporter" category="operators" selector="re` +
        `portCompiled" primitive="reportCompiled"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%repRing" reado` +
        `nly="true" irreplaceable="true"></input><input type="%n">0</input></` +
        `inputs></block-definition><block-definition s="set %#1 to %#2" type=` +
        `"command" category="variables" selector="doSetVar" primitive="doSetV` +
        `ar"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true"><options>§_` +
        `getVarNamesDict</options></input><input type="%s">0</input></inputs>` +
        `</block-definition><block-definition s="change %#1 by %#2" type="com` +
        `mand" category="variables" selector="doChangeVar" primitive="doChang` +
        `eVar"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true"><options>` +
        `§_getVarNamesDict</options></input><input type="%n">1</input></input` +
        `s></block-definition><block-definition s="show variable %#1" type="c` +
        `ommand" category="variables" selector="doShowVar" primitive="doShowV` +
        `ar"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true"><options>§_` +
        `getVarNamesDict</options></input></inputs></block-definition><block-` +
        `definition s="hide variable %#1" type="command" category="variables"` +
        ` selector="doHideVar" primitive="doHideVar"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true"><options>§_getVarNamesDict</options></i` +
        `nput></inputs></block-definition><block-definition s="script variabl` +
        `es %&apos;#1&apos;" type="command" category="other" selector="doDecl` +
        `areVariables" primitive="doDeclareVariables"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%scriptVars` +
        `" readonly="true" irreplaceable="true" initial="1" min="1"></input><` +
        `/inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l>do` +
        `DeclareVariables</l></block></script></block-definition><block-defin` +
        `ition s="inherit %#1" type="command" category="variables" selector="` +
        `doDeleteAttr" primitive="doDeleteAttr"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e"><options>§_shadowedVariablesMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="list %&apos;inputs&apos;" type="re` +
        `porter" category="lists" selector="reportNewList" primitive="reportN` +
        `ewList"><header></header><code></code><translations></translations><` +
        `inputs><input type="%mult%s" readonly="true" irreplaceable="true" in` +
        `itial="1"></input></inputs><script><block s="doPrimitive"><l><bool>t` +
        `rue</bool></l><l>reportNewList</l></block><block s="doReport"><block` +
        ` var="inputs"/></block></script></block-definition><block-definition` +
        ` s="%#1 in front of %#2" type="reporter" category="lists" selector="` +
        `reportCONS" primitive="reportCONS"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s"></input><input ty` +
        `pe="%l" readonly="true"></input></inputs></block-definition><block-d` +
        `efinition s="item %#1 of %#2" type="reporter" category="lists" selec` +
        `tor="reportListItem" primitive="reportListItem"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">1<op` +
        `tions>1=1&#xD;last=$_last&#xD;random=$_random</options></input><inpu` +
        `t type="%l" readonly="true"></input></inputs></block-definition><blo` +
        `ck-definition s="all but first of %#1" type="reporter" category="lis` +
        `ts" selector="reportCDR" primitive="reportCDR"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%l" reado` +
        `nly="true"></input></inputs></block-definition><block-definition s="` +
        `length of %#1" type="reporter" category="lists" selector="reportList` +
        `Length" primitive="reportListLength"><header></header><code></code><` +
        `translations></translations><inputs><input type="%l" readonly="true"` +
        `></input></inputs></block-definition><block-definition s="%#1 of %#2` +
        `" type="reporter" category="lists" selector="reportListAttribute" pr` +
        `imitive="reportListAttribute"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">$_length<options>length=$_length&#xD;rank=$_rank&#xD;` +
        `dimensions=$_dimensions&#xD;flatten=$_flatten&#xD;columns=$_columns&` +
        `#xD;uniques=$_uniques&#xD;distribution=$_distribution&#xD;sorted=$_s` +
        `orted&#xD;shuffled=$_shuffled&#xD;reverse=$_reverse&#xD;&#126;&#xD;l` +
        `ines=$_lines&#xD;csv=$_csv&#xD;json=$_json</options></input><input t` +
        `ype="%l" readonly="true"></input></inputs></block-definition><block-` +
        `definition s="%&apos;data&apos; contains %&apos;value&apos;" type="p` +
        `redicate" category="lists" selector="reportListContainsItem" primiti` +
        `ve="reportListContainsItem"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%l" readonly="true"></input>` +
        `<input type="%s">thing</input></inputs><script><block s="doPrimitive` +
        `"><l><bool>true</bool></l><l>reportListContainsItem</l></block><bloc` +
        `k s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="repo` +
        `rtListAttribute"><l><option>length</option></l><block var="data"/></` +
        `block><script><block s="doIf"><block s="reportVariadicEquals"><list>` +
        `<block s="reportListItem"><block var="i"/><block var="data"/></block` +
        `><block var="value"/></list></block><script><block s="doReport"><blo` +
        `ck s="reportBoolean"><l><bool>true</bool></l></block></block></scrip` +
        `t><list></list></block></script></block></script></block><block s="d` +
        `oReport"><block s="reportBoolean"><l><bool>false</bool></l></block><` +
        `/block></script></block-definition><block-definition s="is %&apos;da` +
        `ta&apos; empty?" type="predicate" category="lists" selector="reportL` +
        `istIsEmpty" primitive="reportListIsEmpty"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%l" readonly="` +
        `true"></input></inputs><script><block s="doPrimitive"><l><bool>true<` +
        `/bool></l><l>reportListIsEmpty</l></block><block s="doReport"><block` +
        ` s="reportVariadicEquals"><list><block var="data"/><block s="reportN` +
        `ewList"><list></list></block></list></block></block></script></block` +
        `-definition><block-definition s="index of %&apos;value&apos; in %&ap` +
        `os;data&apos;" type="reporter" category="lists" selector="reportList` +
        `Index" primitive="reportListIndex"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s">thing</input><inp` +
        `ut type="%l" readonly="true"></input></inputs><script><block s="doPr` +
        `imitive"><l><bool>true</bool></l><l>reportListIndex</l></block><bloc` +
        `k s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="repo` +
        `rtListAttribute"><l><option>length</option></l><block var="data"/></` +
        `block><script><block s="doIf"><block s="reportVariadicEquals"><list>` +
        `<block s="reportListItem"><block var="i"/><block var="data"/></block` +
        `><block var="value"/></list></block><script><block s="doReport"><blo` +
        `ck var="i"/></block></script><list></list></block></script></block><` +
        `/script></block><block s="doReport"><l>0</l></block></script></block` +
        `-definition><block-definition s="add %#1 to %#2" type="command" cate` +
        `gory="lists" selector="doAddToList" primitive="doAddToList"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s">thing</input><input type="%l" readonly="true"></input></inpu` +
        `ts></block-definition><block-definition s="delete %#1 of %#2" type="` +
        `command" category="lists" selector="doDeleteFromList" primitive="doD` +
        `eleteFromList"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;&#1` +
        `26;&#xD;all=$_all</options></input><input type="%l" readonly="true">` +
        `</input></inputs></block-definition><block-definition s="insert %#1 ` +
        `at %#2 of %#3" type="command" category="lists" selector="doInsertInL` +
        `ist" primitive="doInsertInList"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%s">thing</input><input ` +
        `type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options` +
        `></input><input type="%l" readonly="true"></input></inputs></block-d` +
        `efinition><block-definition s="replace item %#1 of %#2 with %#3" typ` +
        `e="command" category="lists" selector="doReplaceInList" primitive="d` +
        `oReplaceInList"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;ra` +
        `ndom=$_random</options></input><input type="%l" readonly="true"></in` +
        `put><input type="%s">thing</input></inputs></block-definition><block` +
        `-definition s="numbers from %&apos;start&apos; to %&apos;end&apos;" ` +
        `type="reporter" category="lists" selector="reportNumbers" primitive=` +
        `"reportNumbers"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">1</input><input type="%n">10</input>` +
        `</inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l>r` +
        `eportNumbers</l></block><block s="doReport"><block s="reportHyperZip` +
        `"><block s="reifyReporter"><script><block s="doDeclareVariables"><li` +
        `st><l>result</l></list></block><block s="doSetVar"><l>result</l><blo` +
        `ck s="reportNewList"><list></list></block></block><block s="doWarp">` +
        `<script><block s="doFor"><l>i</l><l></l><l></l><script><block s="doA` +
        `ddToList"><block var="i"/><block var="result"/></block></script></bl` +
        `ock></script></block><block s="doReport"><block var="result"/></bloc` +
        `k></script><list></list></block><block var="start"/><l>0</l><block v` +
        `ar="end"/><l>0</l></block></block></script></block-definition><block` +
        `-definition s="append %&apos;lists&apos;" type="reporter" category="` +
        `lists" selector="reportConcatenatedLists" primitive="reportConcatena` +
        `tedLists"><header></header><code></code><translations></translations` +
        `><inputs><input type="%mult%l" readonly="true" initial="2"></input><` +
        `/inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l>re` +
        `portConcatenatedLists</l></block><block s="doDeclareVariables"><list` +
        `><l>result</l></list></block><block s="doSetVar"><l>result</l><block` +
        ` s="reportNewList"><list></list></block></block><block s="doWarp"><s` +
        `cript><block s="doForEach"><l>list</l><block var="lists"/><script><b` +
        `lock s="doForEach"><l>item</l><block var="list"/><script><block s="d` +
        `oAddToList"><block var="item"/><block var="result"/></block></script` +
        `></block></script></block></script></block><block s="doReport"><bloc` +
        `k var="result"/></block></script></block-definition><block-definitio` +
        `n s="combinations %&apos;lists&apos;" type="reporter" category="list` +
        `s" selector="reportCrossproduct" primitive="reportCrossproduct"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%mult%l" readonly="true" initial="2"></input></inputs><scrip` +
        `t><block s="doPrimitive"><l><bool>true</bool></l><l>reportCrossprodu` +
        `ct</l></block><block s="doReport"><block s="reportIfElse"><block s="` +
        `reportListIsEmpty"><block var="lists"/></block><block s="reportNewLi` +
        `st"><list><block s="reportNewList"><list></list></block></list></blo` +
        `ck><block s="reportConcatenatedLists"><block s="reportMap"><block s=` +
        `"reifyReporter"><autolambda><block s="reportMap"><block s="reifyRepo` +
        `rter"><autolambda><block s="reportCONS"><block var="first"/><l/></bl` +
        `ock></autolambda><list></list></block><block s="reportCrossproduct">` +
        `<block s="reportCDR"><block var="lists"/></block></block></block></a` +
        `utolambda><list><l>first</l></list></block><block s="reportListItem"` +
        `><l>1</l><block var="lists"/></block></block></block></block></block` +
        `></script></block-definition><block-definition s="transpose %#1" typ` +
        `e="reporter" category="lists" selector="reportTranspose" primitive="` +
        `reportTranspose"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%l" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="reshape %#1 to %#2" type="repo` +
        `rter" category="lists" selector="reportReshape" primitive="reportRes` +
        `hape"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s"></input><input type="%mult%n" readonly="true" ` +
        `initial="2">4&#xD;3</input></inputs></block-definition><block-defini` +
        `tion s="map %&apos;ring&apos; over %&apos;data&apos;" type="reporter` +
        `" category="lists" selector="reportMap" primitive="reportMap"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%repRing" readonly="true" irreplaceable="true"></input><input ` +
        `type="%l" readonly="true"></input></inputs><script><block s="doPrimi` +
        `tive"><l><bool>true</bool></l><l>reportMap</l></block><block s="doDe` +
        `clareVariables"><list><l>result</l><l>implicit?</l></list></block><b` +
        `lock s="doSetVar"><l>result</l><block s="reportNewList"><list></list` +
        `></block></block><block s="doSetVar"><l>implicit?</l><block s="repor` +
        `tListIsEmpty"><block s="reportAttributeOf"><l><option>input names</o` +
        `ption></l><block var="ring"/></block></block></block><block s="doWar` +
        `p"><script><block s="doFor"><l>i</l><l>1</l><block s="reportListAttr` +
        `ibute"><l><option>length</option></l><block var="data"/></block><scr` +
        `ipt><block s="doAddToList"><block s="evaluate"><block var="ring"/><b` +
        `lock s="reportIfElse"><block var="implicit?"/><block s="reportNewLis` +
        `t"><list><block s="reportListItem"><block var="i"/><block var="data"` +
        `/></block></list></block><block s="reportNewList"><list><block s="re` +
        `portListItem"><block var="i"/><block var="data"/></block><block var=` +
        `"i"/><block var="data"/></list></block></block></block><block var="r` +
        `esult"/></block></script></block></script></block><block s="doReport` +
        `"><block var="result"/></block></script></block-definition><block-de` +
        `finition s="$blitz map %#1 over %#2" type="reporter" category="lists` +
        `" selector="reportAtomicMap" primitive="reportAtomicMap"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%repRing" readonly="true" irreplaceable="true"></input><input type=` +
        `"%l" readonly="true"></input></inputs></block-definition><block-defi` +
        `nition s="keep items %&apos;ring&apos; from %&apos;data&apos;" type=` +
        `"reporter" category="lists" selector="reportKeep" primitive="reportK` +
        `eep"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%predRing" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%l" readonly="true"></input></inputs><script><bloc` +
        `k s="doPrimitive"><l><bool>true</bool></l><l>reportKeep</l></block><` +
        `block s="doDeclareVariables"><list><l>result</l><l>implicit?</l></li` +
        `st></block><block s="doSetVar"><l>result</l><block s="reportNewList"` +
        `><list></list></block></block><block s="doSetVar"><l>implicit?</l><b` +
        `lock s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>i` +
        `nput names</option></l><block var="ring"/></block></block></block><b` +
        `lock s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="r` +
        `eportListAttribute"><l><option>length</option></l><block var="data"/` +
        `></block><script><block s="doIf"><block s="evaluate"><block var="rin` +
        `g"/><block s="reportIfElse"><block var="implicit?"/><block s="report` +
        `NewList"><list><block s="reportListItem"><block var="i"/><block var=` +
        `"data"/></block></list></block><block s="reportNewList"><list><block` +
        ` s="reportListItem"><block var="i"/><block var="data"/></block><bloc` +
        `k var="i"/><block var="data"/></list></block></block></block><script` +
        `><block s="doAddToList"><block s="reportListItem"><block var="i"/><b` +
        `lock var="data"/></block><block var="result"/></block></script><list` +
        `></list></block></script></block></script></block><block s="doReport` +
        `"><block var="result"/></block></script></block-definition><block-de` +
        `finition s="$blitz keep items %#1 from %#2" type="reporter" category` +
        `="lists" selector="reportAtomicKeep" primitive="reportAtomicKeep"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%predRing" readonly="true" irreplaceable="true"></input><i` +
        `nput type="%l" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="find first item %&apos;ring&apos; in %&apos;data` +
        `&apos;" type="reporter" category="lists" selector="reportFindFirst" ` +
        `primitive="reportFindFirst"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%predRing" readonly="true" i` +
        `rreplaceable="true"></input><input type="%l" readonly="true"></input` +
        `></inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l>` +
        `reportFindFirst</l></block><block s="doDeclareVariables"><list><l>im` +
        `plicit?</l></list></block><block s="doSetVar"><l>implicit?</l><block` +
        ` s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>input` +
        ` names</option></l><block var="ring"/></block></block></block><block` +
        ` s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="repor` +
        `tListAttribute"><l><option>length</option></l><block var="data"/></b` +
        `lock><script><block s="doIf"><block s="evaluate"><block var="ring"/>` +
        `<block s="reportIfElse"><block var="implicit?"/><block s="reportNewL` +
        `ist"><list><block s="reportListItem"><block var="i"/><block var="dat` +
        `a"/></block></list></block><block s="reportNewList"><list><block s="` +
        `reportListItem"><block var="i"/><block var="data"/></block><block va` +
        `r="i"/><block var="data"/></list></block></block></block><script><bl` +
        `ock s="doReport"><block s="reportListItem"><block var="i"/><block va` +
        `r="data"/></block></block></script><list></list></block></script></b` +
        `lock></script></block><block s="doReport"><l></l></block></script></` +
        `block-definition><block-definition s="$blitz find first item %#1 in ` +
        `%#2" type="reporter" category="lists" selector="reportAtomicFindFirs` +
        `t" primitive="reportAtomicFindFirst"><header></header><code></code><` +
        `translations></translations><inputs><input type="%predRing" readonly` +
        `="true" irreplaceable="true"></input><input type="%l" readonly="true` +
        `"></input></inputs></block-definition><block-definition s="combine %` +
        `&apos;data&apos; using %&apos;ring&apos;" type="reporter" category="` +
        `lists" selector="reportCombine" primitive="reportCombine"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%l" readonly="true"></input><input type="%repRing" readonly="true"` +
        ` irreplaceable="true"></input></inputs><script><block s="doPrimitive` +
        `"><l><bool>true</bool></l><l>reportCombine</l></block><block s="doIf` +
        `"><block s="reportListIsEmpty"><block var="data"/></block><script><b` +
        `lock s="doReport"><l>0</l></block></script><list><block s="reportVar` +
        `iadicEquals"><list><block s="reportListAttribute"><l><option>length<` +
        `/option></l><block var="data"/></block><l>1</l></list></block><scrip` +
        `t><block s="doReport"><block s="reportListItem"><l>1</l><block var="` +
        `data"/></block></block></script></list></block><block s="doReport"><` +
        `block s="evaluate"><block var="ring"/><list><block s="reportListItem` +
        `"><l>1</l><block var="data"/></block><block s="evaluate"><block s="r` +
        `eportEnvironment"><l><option>script</option></l></block><list><block` +
        ` s="reportCDR"><block var="data"/></block><block var="ring"/></list>` +
        `</block></list></block></block></script></block-definition><block-de` +
        `finition s="$blitz combine %#1 using %#2" type="reporter" category="` +
        `lists" selector="reportAtomicCombine" primitive="reportAtomicCombine` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%l" readonly="true"></input><input type="%repRing" rea` +
        `donly="true" irreplaceable="true"></input></inputs></block-definitio` +
        `n><block-definition s="for each %&apos;item&apos; in %&apos;data&apo` +
        `s; %&apos;action&apos;" type="command" category="lists" selector="do` +
        `ForEach" primitive="doForEach"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%upvar" readonly="true" i` +
        `rreplaceable="true">item</input><input type="%l" readonly="true"></i` +
        `nput><input type="%loop" readonly="true" irreplaceable="true"></inpu` +
        `t></inputs><script><block s="doPrimitive"><l><bool>true</bool></l><l` +
        `>doForEach</l></block><block s="doReport"><block s="reportMap"><bloc` +
        `k s="reifyReporter"><script><block s="doSetVar"><l>item</l><l></l></` +
        `block><block s="doRun"><block var="action"/><list></list></block><bl` +
        `ock s="doReport"><l>0</l></block></script><list></list></block><bloc` +
        `k var="data"/></block></block></script></block-definition><block-def` +
        `inition s="show table %#1" type="command" category="lists" selector=` +
        `"doShowTable" primitive="doShowTable"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%l" readonly="true` +
        `"></input></inputs></block-definition><block-definition s="map %#1 t` +
        `o %#2 %#3" type="command" category="other" selector="doMapCodeOrHead` +
        `er" primitive="doMapCodeOrHeader"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%cmdRing" readonly="tr` +
        `ue"></input><input type="%s" readonly="true">$_code<options>code=$_c` +
        `ode&#xD;header=$_header</options></input><input type="%mlt"></input>` +
        `</inputs></block-definition><block-definition s="map %#1 to code %#2` +
        `" type="command" category="other" selector="doMapValueCode" primitiv` +
        `e="doMapValueCode"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s" readonly="true" irreplaceable="tr` +
        `ue">$_String<options>String=$_String&#xD;Number=$_Number&#xD;true=$_` +
        `true&#xD;false=$_false</options></input><input type="%mlt">&lt;#1&gt` +
        `;</input></inputs></block-definition><block-definition s="map %#1 of` +
        ` %#2 to code %#3" type="command" category="other" selector="doMapLis` +
        `tCode" primitive="doMapListCode"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true"><op` +
        `tions>list=$_list&#xD;item=$_item&#xD;delimiter=$_delimiter</options` +
        `></input><input type="%s" readonly="true"><options>collection=$_coll` +
        `ection&#xD;variables=$_variables&#xD;parameters=$_parameters</option` +
        `s></input><input type="%mlt"></input></inputs></block-definition><bl` +
        `ock-definition s="code of %#1" type="reporter" category="other" sele` +
        `ctor="reportMappedCode" primitive="reportMappedCode"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%cm` +
        `dRing" readonly="true"></input></inputs></block-definition><block-de` +
        `finition s="%#1 primitive %#2" type="command" category="other" selec` +
        `tor="doPrimitive" primitive="doPrimitive"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%b" readonly="` +
        `true" irreplaceable="true">true</input><input type="%s" readonly="tr` +
        `ue" irreplaceable="true"><options>§_primitivesMenu</options></input>` +
        `</inputs></block-definition><block-definition s="extension %#1 %#2" ` +
        `type="command" category="other" selector="doApplyExtension" primitiv` +
        `e="doApplyExtension"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true"><options>§_extensionsMenu</options></input><input type="%mult%` +
        `s" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="extension %#1 %#2" type="reporter" category="other" selector` +
        `="reportApplyExtension" primitive="reportApplyExtension"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true" irreplaceable="true"><options>§_extensionsMenu<` +
        `/options></input><input type="%mult%s" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="set video transparency t` +
        `o %#1" type="command" category="sensing" selector="doSetVideoTranspa` +
        `rency" primitive="doSetVideoTransparency"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">50</input>` +
        `</inputs></block-definition><block-definition s="video %#1 on %#2" t` +
        `ype="reporter" category="sensing" selector="reportVideo" primitive="` +
        `reportVideo"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true">$_` +
        `motion<options>snap=$_snap&#xD;motion=$_motion&#xD;direction=$_direc` +
        `tion</options></input><input type="%s" readonly="true">$_myself<opti` +
        `ons>§_objectsMenuWithSelf</options></input></inputs></block-definiti` +
        `on></primitives></blocks>`,
        this.stage
    );
};
