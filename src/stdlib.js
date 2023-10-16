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

modules.stdlib = '2023-October-16';

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
        `rimitives><block-definition s="zip %&apos;fun&apos; inputs: %&apos;a` +
        `&apos; %&apos;a-rank&apos; leaf-rank %&apos;b&apos; %&apos;b-rank&ap` +
        `os; leaf-rank" type="reporter" category="control" selector="reportHy` +
        `perZip"><header></header><code></code><translations></translations><` +
        `inputs><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%s"></input><input type="%n"></input><input type` +
        `="%s"></input><input type="%n"></input><input type="%repRing" readon` +
        `ly="true" irreplaceable="true"></input><input type="%s"></input><inp` +
        `ut type="%n"></input><input type="%s"></input><input type="%n"></inp` +
        `ut></inputs><script><block s="doIfElse"><block s="reportVariadicGrea` +
        `terThan"><list><block s="reportListAttribute"><l><option>rank</optio` +
        `n></l><block var="a"/></block><block var="a-rank"/></list></block><s` +
        `cript><block s="doIfElse"><block s="reportVariadicGreaterThan"><list` +
        `><block s="reportListAttribute"><l><option>rank</option></l><block v` +
        `ar="b"/></block><block var="b-rank"/></list></block><script><block s` +
        `="doReport"><block s="reportMap"><block s="reifyReporter"><autolambd` +
        `a><block s="reportHyperZip"><block var="fun"/><block s="reportListIt` +
        `em"><l></l><block var="a"/></block><block var="a-rank"/><block s="re` +
        `portListItem"><l></l><block var="b"/></block><block var="b-rank"/></` +
        `block></autolambda><list></list></block><block s="reportNumbers"><l>` +
        `1</l><block s="reportVariadicMin"><list><block s="reportListAttribut` +
        `e"><l><option>length</option></l><block var="a"/></block><block s="r` +
        `eportListAttribute"><l><option>length</option></l><block var="b"/></` +
        `block></list></block></block></block></block></script><script><block` +
        ` s="doReport"><block s="reportMap"><block s="reifyReporter"><autolam` +
        `bda><block s="reportHyperZip"><block var="fun"/><l></l><block var="a` +
        `-rank"/><block var="b"/><block var="b-rank"/></block></autolambda><l` +
        `ist></list></block><block var="a"/></block></block></script></block>` +
        `</script><script><block s="doIfElse"><block s="reportVariadicGreater` +
        `Than"><list><block s="reportListAttribute"><l><option>rank</option><` +
        `/l><block var="b"/></block><block var="b-rank"/></list></block><scri` +
        `pt><block s="doReport"><block s="reportMap"><block s="reifyReporter"` +
        `><autolambda><block s="reportHyperZip"><block var="fun"/><block var=` +
        `"a"/><block var="a-rank"/><l></l><block var="b-rank"/></block></auto` +
        `lambda><list></list></block><block var="b"/></block></block></script` +
        `><script><block s="doReport"><block s="evaluate"><block var="fun"/><` +
        `list><block var="a"/><block var="b"/></list></block></block></script` +
        `></block></script></block></script></block-definition><block-definit` +
        `ion s="move %&apos;steps&apos; steps" type="command" category="motio` +
        `n" selector="forward"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">10</input><input type="%n">10<` +
        `/input><input type="%n">10</input></inputs><script><block s="doGotoO` +
        `bject"><block s="reportVariadicSum"><list><block s="getPosition"></b` +
        `lock><block s="reportVariadicProduct"><list><block s="reportNewList"` +
        `><list><block s="reportMonadic"><l><option>sin</option></l><block s=` +
        `"direction"></block></block><block s="reportMonadic"><l><option>cos<` +
        `/option></l><block s="direction"></block></block></list></block><blo` +
        `ck var="steps"/></list></block></list></block></block></script></blo` +
        `ck-definition><block-definition s="turn $clockwise %&apos;angle&apos` +
        `; degrees" type="command" category="motion" selector="turn"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">15</input><input type="%n">15</input><input type="%n">15</in` +
        `put></inputs><script><block s="setHeading"><block s="reportVariadicS` +
        `um"><list><block s="direction"></block><block var="angle"/></list></` +
        `block></block></script></block-definition><block-definition s="turn ` +
        `$counterclockwise %&apos;angle&apos; degrees" type="command" categor` +
        `y="motion" selector="turnLeft"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">15</input><input type` +
        `="%n">15</input><input type="%n">15</input></inputs><script><block s` +
        `="setHeading"><block s="reportDifference"><block s="direction"></blo` +
        `ck><block var="angle"/></block></block></script></block-definition><` +
        `block-definition s="point in direction %&apos;angle&apos;" type="com` +
        `mand" category="motion" selector="setHeading"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">90<opt` +
        `ions>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(1` +
        `80) down=180&#xD;random=$_random</options></input><input type="%n">9` +
        `0<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#` +
        `xD;(180) down=180&#xD;random</options></input><input type="%n">90<op` +
        `tions>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(` +
        `180) down=180&#xD;random</options></input></inputs><script><block s=` +
        `"doFaceTowards"><block s="reportVariadicSum"><list><block s="getPosi` +
        `tion"></block><block s="reportNewList"><list><block s="reportMonadic` +
        `"><l><option>sin</option></l><block var="angle"/></block><block s="r` +
        `eportMonadic"><l><option>cos</option></l><block var="angle"/></block` +
        `></list></block></list></block></block></script></block-definition><` +
        `block-definition s="point towards %#1" type="command" category="moti` +
        `on" selector="doFaceTowards" primitive="doFaceTowards"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true">$_mouse-pointer<options>§_destinationsMenu</optio` +
        `ns></input></inputs></block-definition><block-definition s="go to x:` +
        ` %&apos;x&apos; y: %&apos;y&apos;" type="command" category="motion" ` +
        `selector="gotoXY"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n">0</input><input type="%n">0</input` +
        `><input type="%n">0</input><input type="%n">0</input><input type="%n` +
        `">0</input></inputs><script><block s="doGotoObject"><block s="report` +
        `NewList"><list><block var="x"/><block var="y"/></list></block></bloc` +
        `k></script></block-definition><block-definition s="go to %#1" type="` +
        `command" category="motion" selector="doGotoObject" primitive="doGoto` +
        `Object"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true">$_random position<options>§_` +
        `destinationsMenu</options></input></inputs></block-definition><block` +
        `-definition s="glide %&apos;span&apos; secs to x: %&apos;x&apos; y: ` +
        `%&apos;y&apos;" type="command" category="motion" selector="doGlide">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">1</input><input type="%n">0</input><input type="%n">` +
        `0</input><input type="%n">1</input><input type="%n">0</input><input ` +
        `type="%n">0</input><input type="%n">1</input></inputs><script><block` +
        ` s="doDeclareVariables"><list><l>pos</l><l>start</l><l>fract</l></li` +
        `st></block><block s="doSetVar"><l>pos</l><block s="getPosition"></bl` +
        `ock></block><block s="doSetVar"><l>start</l><block s="reportDate"><l` +
        `><option>time in milliseconds</option></l></block></block><block s="` +
        `doUntil"><block s="reportVariadicGreaterThanOrEquals"><list><block v` +
        `ar="fract"/><l>1</l></list></block><script><block s="doSetVar"><l>fr` +
        `act</l><block s="reportQuotient"><block s="reportDifference"><block ` +
        `s="reportDate"><l><option>time in milliseconds</option></l></block><` +
        `block var="start"/></block><block s="reportVariadicProduct"><list><b` +
        `lock var="span"/><l>1000</l></list></block></block></block><block s=` +
        `"doGotoObject"><block s="reportVariadicSum"><list><block var="pos"/>` +
        `<block s="reportVariadicProduct"><list><block s="reportDifference"><` +
        `block s="reportNewList"><list><block var="x"/><block var="y"/></list` +
        `></block><block var="pos"/></block><block var="fract"/></list></bloc` +
        `k></list></block></block></script></block><block s="gotoXY"><block v` +
        `ar="x"/><block var="y"/></block></script></block-definition><block-d` +
        `efinition s="change x by %&apos;delta&apos;" type="command" category` +
        `="motion" selector="changeXPosition"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">10</input><inpu` +
        `t type="%n">10</input><input type="%n">10</input></inputs><script><b` +
        `lock s="setXPosition"><block s="reportVariadicSum"><list><block s="x` +
        `Position"></block><block var="delta"/></list></block></block></scrip` +
        `t></block-definition><block-definition s="set x to %&apos;x&apos;" t` +
        `ype="command" category="motion" selector="setXPosition"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n">0</input><input type="%n">0</input><input type="%n">0</input></i` +
        `nputs><script><block s="doGotoObject"><block s="reportNewList"><list` +
        `><block var="x"/><block s="yPosition"></block></list></block></block` +
        `></script></block-definition><block-definition s="change y by %&apos` +
        `;delta&apos;" type="command" category="motion" selector="changeYPosi` +
        `tion"><header></header><code></code><translations></translations><in` +
        `puts><input type="%n">10</input><input type="%n">10</input><input ty` +
        `pe="%n">10</input></inputs><script><block s="setYPosition"><block s=` +
        `"reportVariadicSum"><list><block s="yPosition"></block><block var="d` +
        `elta"/></list></block></block></script></block-definition><block-def` +
        `inition s="set y to %&apos;y&apos;" type="command" category="motion"` +
        ` selector="setYPosition"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n">0</input><input type="%n">0` +
        `</input><input type="%n">0</input></inputs><script><block s="doGotoO` +
        `bject"><block s="reportNewList"><list><block s="xPosition"></block><` +
        `block var="y"/></list></block></block></script></block-definition><b` +
        `lock-definition s="if on edge, bounce" type="command" category="moti` +
        `on" selector="bounceOffEdge"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs><script><block s="doIf"><block ` +
        `s="reportTouchingObject"><l><option>edge</option></l></block><script` +
        `><block s="doDeclareVariables"><list><l>get bounds</l><l>bounds</l><` +
        `l>center</l><l>stage bounds</l><l>dir x</l><l>dir y</l><l>delta x</l` +
        `><l>delta y</l></list></block><block s="doSetVar"><l>get bounds</l><` +
        `block s="reifyReporter"><autolambda><block s="reportNewList"><list><` +
        `block s="reportVariadicMin"><block s="reportCONS"><block s="reportNe` +
        `wList"><list><block s="reportGet"><l><option>left</option></l></bloc` +
        `k><block s="reportGet"><l><option>bottom</option></l></block></list>` +
        `</block><block s="reportMap"><block s="reifyReporter"><autolambda><b` +
        `lock s="reportNewList"><list><block s="reportAttributeOf"><l><option` +
        `>left</option></l><l></l></block><block s="reportAttributeOf"><l><op` +
        `tion>bottom</option></l><l></l></block></list></block></autolambda><` +
        `list></list></block><block s="reportGet"><l><option>parts</option></` +
        `l></block></block></block></block><block s="reportVariadicMax"><bloc` +
        `k s="reportCONS"><block s="reportNewList"><list><block s="reportGet"` +
        `><l><option>right</option></l></block><block s="reportGet"><l><optio` +
        `n>top</option></l></block></list></block><block s="reportMap"><block` +
        ` s="reifyReporter"><autolambda><block s="reportNewList"><list><block` +
        ` s="reportAttributeOf"><l><option>right</option></l><l></l></block><` +
        `block s="reportAttributeOf"><l><option>top</option></l><l></l></bloc` +
        `k></list></block></autolambda><list></list></block><block s="reportG` +
        `et"><l><option>parts</option></l></block></block></block></block></l` +
        `ist></block></autolambda><list></list></block></block><block s="doSe` +
        `tVar"><l>bounds</l><block s="evaluate"><block var="get bounds"/><lis` +
        `t></list></block></block><block s="doSetVar"><l>center</l><block s="` +
        `reportQuotient"><block s="reportVariadicSum"><block var="bounds"/></` +
        `block><l>2</l></block></block><block s="doSetVar"><l>stage bounds</l` +
        `><block s="reportAskFor"><block s="reportGet"><l><option>stage</opti` +
        `on></l></block><block s="reifyReporter"><autolambda><block s="report` +
        `NewList"><list><block s="reportNewList"><list><block s="reportGet"><` +
        `l><option>left</option></l></block><block s="reportGet"><l><option>b` +
        `ottom</option></l></block></list></block><block s="reportNewList"><l` +
        `ist><block s="reportGet"><l><option>right</option></l></block><block` +
        ` s="reportGet"><l><option>top</option></l></block></list></block></l` +
        `ist></block></autolambda><list></list></block><list></list></block><` +
        `/block><block s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><` +
        `option>sin</option></l><block s="direction"></block></block></block>` +
        `<block s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>` +
        `cos</option></l><block s="direction"></block></block></block><block ` +
        `s="doIf"><block s="reportVariadicLessThan"><list><block s="reportLis` +
        `tItem"><l>1</l><block s="reportListItem"><l>1</l><block var="bounds"` +
        `/></block></block><block s="reportListItem"><l>1</l><block s="report` +
        `ListItem"><l>1</l><block var="stage bounds"/></block></block></list>` +
        `</block><script><block s="doSetVar"><l>dir x</l><block s="reportMona` +
        `dic"><l><option>abs</option></l><block var="dir x"/></block></block>` +
        `</script><list></list></block><block s="doIf"><block s="reportVariad` +
        `icGreaterThan"><list><block s="reportListItem"><l>1</l><block s="rep` +
        `ortListItem"><l>2</l><block var="bounds"/></block></block><block s="` +
        `reportListItem"><l>1</l><block s="reportListItem"><l>2</l><block var` +
        `="stage bounds"/></block></block></list></block><script><block s="do` +
        `SetVar"><l>dir x</l><block s="reportMonadic"><l><option>neg</option>` +
        `</l><block s="reportMonadic"><l><option>abs</option></l><block var="` +
        `dir x"/></block></block></block></script><list></list></block><block` +
        ` s="doIf"><block s="reportVariadicGreaterThan"><list><block s="repor` +
        `tListItem"><l>2</l><block s="reportListItem"><l>2</l><block var="bou` +
        `nds"/></block></block><block s="reportListItem"><l>2</l><block s="re` +
        `portListItem"><l>2</l><block var="stage bounds"/></block></block></l` +
        `ist></block><script><block s="doSetVar"><l>dir y</l><block s="report` +
        `Monadic"><l><option>neg</option></l><block s="reportMonadic"><l><opt` +
        `ion>abs</option></l><block var="dir y"/></block></block></block></sc` +
        `ript><list></list></block><block s="doIf"><block s="reportVariadicLe` +
        `ssThan"><list><block s="reportListItem"><l>2</l><block s="reportList` +
        `Item"><l>1</l><block var="bounds"/></block></block><block s="reportL` +
        `istItem"><l>2</l><block s="reportListItem"><l>1</l><block var="stage` +
        ` bounds"/></block></block></list></block><script><block s="doSetVar"` +
        `><l>dir y</l><block s="reportMonadic"><l><option>abs</option></l><bl` +
        `ock var="dir y"/></block></block></script><list></list></block><bloc` +
        `k s="setHeading"><block s="reportAtan2"><block var="dir x"/><block v` +
        `ar="dir y"/></block></block><block s="doSetVar"><l>bounds</l><block ` +
        `s="evaluate"><block var="get bounds"/><list></list></block></block><` +
        `block s="doGotoObject"><block s="reportVariadicSum"><list><block s="` +
        `getPosition"></block><block s="reportDifference"><block var="center"` +
        `/><block s="reportQuotient"><block s="reportVariadicSum"><block var=` +
        `"bounds"/></block><l>2</l></block></block></list></block></block><bl` +
        `ock s="doSetVar"><l>bounds</l><block s="evaluate"><block var="get bo` +
        `unds"/><list></list></block></block><block s="doIf"><block s="report` +
        `VariadicGreaterThan"><list><block s="reportListItem"><l>1</l><block ` +
        `s="reportListItem"><l>2</l><block var="bounds"/></block></block><blo` +
        `ck s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l><blo` +
        `ck var="stage bounds"/></block></block></list></block><script><block` +
        ` s="doSetVar"><l>delta x</l><block s="reportDifference"><block s="re` +
        `portListItem"><l>1</l><block s="reportListItem"><l>2</l><block var="` +
        `stage bounds"/></block></block><block s="reportListItem"><l>1</l><bl` +
        `ock s="reportListItem"><l>2</l><block var="bounds"/></block></block>` +
        `</block></block></script><list></list></block><block s="doIf"><block` +
        ` s="reportVariadicLessThan"><list><block s="reportListItem"><l>2</l>` +
        `<block s="reportListItem"><l>1</l><block var="bounds"/></block></blo` +
        `ck><block s="reportListItem"><l>2</l><block s="reportListItem"><l>1<` +
        `/l><block var="stage bounds"/></block></block></list></block><script` +
        `><block s="doSetVar"><l>delta y</l><block s="reportDifference"><bloc` +
        `k s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><bloc` +
        `k var="stage bounds"/></block></block><block s="reportListItem"><l>2` +
        `</l><block s="reportListItem"><l>1</l><block var="bounds"/></block><` +
        `/block></block></block></script><list></list></block><block s="doIf"` +
        `><block s="reportVariadicLessThan"><list><block s="reportListItem"><` +
        `l>1</l><block s="reportListItem"><l>1</l><block var="bounds"/></bloc` +
        `k></block><block s="reportListItem"><l>1</l><block s="reportListItem` +
        `"><l>1</l><block var="stage bounds"/></block></block></list></block>` +
        `<script><block s="doSetVar"><l>delta x</l><block s="reportDifference` +
        `"><block s="reportListItem"><l>1</l><block s="reportListItem"><l>1</` +
        `l><block var="stage bounds"/></block></block><block s="reportListIte` +
        `m"><l>1</l><block s="reportListItem"><l>1</l><block var="bounds"/></` +
        `block></block></block></block></script><list></list></block><block s` +
        `="doIf"><block s="reportVariadicGreaterThan"><list><block s="reportL` +
        `istItem"><l>2</l><block s="reportListItem"><l>2</l><block var="bound` +
        `s"/></block></block><block s="reportListItem"><l>2</l><block s="repo` +
        `rtListItem"><l>2</l><block var="stage bounds"/></block></block></lis` +
        `t></block><script><block s="doSetVar"><l>delta y</l><block s="report` +
        `Difference"><block s="reportListItem"><l>2</l><block s="reportListIt` +
        `em"><l>2</l><block var="stage bounds"/></block></block><block s="rep` +
        `ortListItem"><l>2</l><block s="reportListItem"><l>2</l><block var="b` +
        `ounds"/></block></block></block></block></script><list></list></bloc` +
        `k><block s="doGotoObject"><block s="reportVariadicSum"><list><block ` +
        `s="getPosition"></block><block s="reportNewList"><list><block var="d` +
        `elta x"/><block var="delta y"/></list></block></list></block></block` +
        `></script><list></list></block></script></block-definition><block-de` +
        `finition s="position" type="reporter" category="motion" selector="ge` +
        `tPosition"><header></header><code></code><translations></translation` +
        `s><inputs></inputs><script><block s="doReport"><block s="reportNewLi` +
        `st"><list><block s="xPosition"></block><block s="yPosition"></block>` +
        `</list></block></block></script></block-definition><block-definition` +
        ` s="x position" type="reporter" category="motion" selector="xPositio` +
        `n" primitive="xPosition"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="y position" type="reporter" category="motion" selector="yPositi` +
        `on" primitive="yPosition"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="direction" type="reporter" category="motion" selector="directi` +
        `on" primitive="direction"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="switch to costume %#1" type="command" category="looks" selecto` +
        `r="doSwitchToCostume" primitive="doSwitchToCostume"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true"><options>§_costumesMenu</options></input></inputs></` +
        `block-definition><block-definition s="next costume" type="command" c` +
        `ategory="looks" selector="doWearNextCostume"><header></header><code>` +
        `</code><translations></translations><inputs></inputs><script><block ` +
        `s="doIf"><block s="reportVariadicGreaterThan"><list><block s="getCos` +
        `tumeIdx"></block><l>0</l></list></block><script><block s="doSwitchTo` +
        `Costume"><block s="reportVariadicSum"><list><block s="reportModulus"` +
        `><block s="getCostumeIdx"></block><block s="reportListAttribute"><l>` +
        `<option>length</option></l><block s="reportGet"><l><option>costumes<` +
        `/option></l></block></block></block><l>1</l></list></block></block><` +
        `/script><list></list></block></script></block-definition><block-defi` +
        `nition s="costume #" type="reporter" category="looks" selector="getC` +
        `ostumeIdx"><header></header><code></code><translations></translation` +
        `s><inputs></inputs><script><block s="doReport"><block s="reportListI` +
        `ndex"><block s="reportGet"><l><option>costume</option></l></block><b` +
        `lock s="reportGet"><l><option>costumes</option></l></block></block><` +
        `/block></script></block-definition><block-definition s="%#1 of costu` +
        `me %#2" type="reporter" category="looks" selector="reportGetImageAtt` +
        `ribute" primitive="reportGetImageAttribute"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">$_width<options>name=$_name&#xD;width=$` +
        `_width&#xD;height=$_height&#xD;pixels=$_pixels</options></input><inp` +
        `ut type="%s" readonly="true">$_current<options>§_costumesMenu</optio` +
        `ns></input></inputs></block-definition><block-definition s="new cost` +
        `ume %#1 width %#2 height %#3" type="reporter" category="looks" selec` +
        `tor="reportNewCostume" primitive="reportNewCostume"><header></header` +
        `><code></code><translations></translations><inputs><input type="%l" ` +
        `readonly="true"></input><input type="%n"><options>a List [2 elements` +
        `]</options></input><input type="%n"><options>a List [2 elements]</op` +
        `tions></input></inputs></block-definition><block-definition s="stret` +
        `ch %#1 x: %#2 y: %#3 %" type="reporter" category="looks" selector="r` +
        `eportNewCostumeStretched" primitive="reportNewCostumeStretched"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true">$_current<options>§_costumesMenu</option` +
        `s></input><input type="%n">100</input><input type="%n">50</input></i` +
        `nputs></block-definition><block-definition s="skew %#1 to %#2 degree` +
        `s %#3 %" type="reporter" category="looks" selector="reportNewCostume` +
        `Skewed" primitive="reportNewCostumeSkewed"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true">$_current<options>§_costumesMenu</options></input><input type` +
        `="%n">0<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) ` +
        `up=0&#xD;(180) down=180&#xD;random=$_random</options></input><input ` +
        `type="%n">50</input></inputs></block-definition><block-definition s=` +
        `"say %&apos;msg&apos; for %&apos;time&apos; secs" type="command" cat` +
        `egory="looks" selector="doSayFor"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s">Hello!</input><inp` +
        `ut type="%n">2</input><input type="%s">Hello!</input><input type="%n` +
        `">2</input><input type="%s">Hello!</input></inputs><script><block s=` +
        `"bubble"><block var="msg"/></block><block s="doWait"><block var="tim` +
        `e"/></block><block s="bubble"><l></l></block></script></block-defini` +
        `tion><block-definition s="say %#1" type="command" category="looks" s` +
        `elector="bubble" primitive="bubble"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s">Hello!</input></` +
        `inputs></block-definition><block-definition s="think %&apos;msg&apos` +
        `; for %&apos;time&apos; secs" type="command" category="looks" select` +
        `or="doThinkFor"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s">Hmm...</input><input type="%n">2</in` +
        `put><input type="%s">Hmm...</input><input type="%n">2</input><input ` +
        `type="%s">Hmm...</input></inputs><script><block s="doThink"><block v` +
        `ar="msg"/></block><block s="doWait"><block var="time"/></block><bloc` +
        `k s="doThink"><l></l></block></script></block-definition><block-defi` +
        `nition s="think %#1" type="command" category="looks" selector="doThi` +
        `nk" primitive="doThink"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s">Hmm...</input></inputs></blo` +
        `ck-definition><block-definition s="change %&apos;effect name&apos; e` +
        `ffect by %&apos;delta&apos;" type="command" category="looks" selecto` +
        `r="changeEffect" primitive="changeEffect"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">$_ghost<options>color=$_color&#xD;saturat` +
        `ion=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;f` +
        `isheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosai` +
        `c=$_mosaic&#xD;negative=$_negative</options></input><input type="%n"` +
        `>25</input><input type="%s" readonly="true" irreplaceable="true">gho` +
        `st<options>color&#xD;saturation&#xD;brightness&#xD;ghost&#xD;fisheye` +
        `&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</options></input><in` +
        `put type="%n">25</input><input type="%s" readonly="true" irreplaceab` +
        `le="true">ghost<options>color&#xD;saturation&#xD;brightness&#xD;ghos` +
        `t&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</option` +
        `s></input></inputs></block-definition><block-definition s="set %#1 e` +
        `ffect to %#2" type="command" category="looks" selector="setEffect" p` +
        `rimitive="setEffect"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true">$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD;` +
        `brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;` +
        `whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negati` +
        `ve=$_negative</options></input><input type="%n">0</input></inputs></` +
        `block-definition><block-definition s="%#1 effect" type="reporter" ca` +
        `tegory="looks" selector="getEffect" primitive="getEffect"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true">$_ghost<options>color=$_c` +
        `olor&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;gho` +
        `st=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pi` +
        `xelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input>` +
        `</inputs></block-definition><block-definition s="clear graphic effec` +
        `ts" type="command" category="looks" selector="clearEffects" primitiv` +
        `e="clearEffects"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="cha` +
        `nge size by %&apos;delta&apos;" type="command" category="looks" sele` +
        `ctor="changeScale"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%n">10</input><input type="%n">10</in` +
        `put><input type="%n">10</input></inputs><script><block s="setScale">` +
        `<block s="reportVariadicSum"><list><block s="getScale"></block><bloc` +
        `k var="delta"/></list></block></block></script></block-definition><b` +
        `lock-definition s="set size to %#1 %" type="command" category="looks` +
        `" selector="setScale" primitive="setScale"><header></header><code></` +
        `code><translations></translations><inputs><input type="%n">100</inpu` +
        `t></inputs></block-definition><block-definition s="size" type="repor` +
        `ter" category="looks" selector="getScale" primitive="getScale"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts></block-definition><block-definition s="show" type="command" cate` +
        `gory="looks" selector="show" primitive="show"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="hide" type="command" category="looks" sele` +
        `ctor="hide" primitive="hide"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs></block-definition><block-defin` +
        `ition s="shown?" type="predicate" category="looks" selector="reportS` +
        `hown" primitive="reportShown"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="go to %#1 layer" type="command" category="looks" selector=` +
        `"goToLayer" primitive="goToLayer"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">$_front<options>front=$_front&#xD;back=$_back</op` +
        `tions></input></inputs></block-definition><block-definition s="go ba` +
        `ck %#1 layers" type="command" category="looks" selector="goBack" pri` +
        `mitive="goBack"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">1</input></inputs></block-definition` +
        `><block-definition s="save %#1 as costume named %#2" type="command" ` +
        `category="looks" selector="doScreenshot" primitive="doScreenshot"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true">$_pen trails<options>pen trails=$_pen ` +
        `trails&#xD;stage image=$_stage image</options></input><input type="%` +
        `s">screenshot</input></inputs></block-definition><block-definition s` +
        `="wardrobe" type="reporter" category="looks" selector="reportCostume` +
        `s" primitive="reportCostumes"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="alert %#1" type="command" category="looks" selector="alert` +
        `" primitive="alert"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%mult%s" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="console log %#1" type=` +
        `"command" category="looks" selector="log" primitive="log"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%mult%s" readonly="true"></input></inputs></block-definition><bloc` +
        `k-definition s="play sound %#1" type="command" category="sound" sele` +
        `ctor="playSound" primitive="playSound"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e"><options>§_soundsMenu</options></input></inputs></block-definitio` +
        `n><block-definition s="play sound %&apos;target&apos; until done" ty` +
        `pe="command" category="sound" selector="doPlaySoundUntilDone" primit` +
        `ive="doPlaySoundUntilDone"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true"><options>` +
        `§_soundsMenu</options></input><input type="%s" readonly="true"><opti` +
        `ons>§_soundsMenu</options></input><input type="%s" readonly="true"><` +
        `options>§_soundsMenu</options></input></inputs><script><block s="doD` +
        `eclareVariables"><list><l>sound</l></list></block><block s="doSetVar` +
        `"><l>sound</l><block s="reportIfElse"><block s="reportIsA"><block va` +
        `r="target"/><l><option>sound</option></l></block><block var="target"` +
        `/><block s="reportIfElse"><block s="reportIsA"><block var="target"/>` +
        `<l><option>list</option></l></block><block s="reportNewSoundFromSamp` +
        `les"><block var="target"/><l>44100</l></block><block s="reportFindFi` +
        `rst"><block s="reifyPredicate"><autolambda><block s="reportVariadicE` +
        `quals"><list><block s="reportGetSoundAttribute"><l><option>name</opt` +
        `ion></l><l></l></block><block var="target"/></list></block></autolam` +
        `bda><list></list></block><block s="reportGet"><l><option>sounds</opt` +
        `ion></l></block></block></block></block></block><block s="doIf"><blo` +
        `ck s="reportIsA"><block var="sound"/><l><option>sound</option></l></` +
        `block><script><block s="playSound"><block var="sound"/></block><bloc` +
        `k s="doWait"><block s="reportGetSoundAttribute"><l><option>duration<` +
        `/option></l><block var="sound"/></block></block></script><list></lis` +
        `t></block></script><scripts><script x="10" y="98"><block s="doDeclar` +
        `eVariables"><list><l>sound</l></list></block><block s="doSetVar"><l>` +
        `sound</l><block s="reportIfElse"><block s="reportIsA"><block var="ta` +
        `rget"/><l><option>sound</option></l></block><block var="target"/><bl` +
        `ock s="reportIfElse"><block s="reportIsA"><block var="target"/><l><o` +
        `ption>list</option></l></block><block s="reportNewSoundFromSamples">` +
        `<block var="target"/><l>44100</l></block><block s="reportFindFirst">` +
        `<block s="reifyPredicate"><autolambda><block s="reportVariadicEquals` +
        `"><list><block s="reportGetSoundAttribute"><l><option>name</option><` +
        `/l><l></l></block><block var="target"/></list></block></autolambda><` +
        `list></list></block><block s="reportGet"><l><option>sounds</option><` +
        `/l></block></block></block></block></block><block s="doIf"><block s=` +
        `"reportIsA"><block var="sound"/><l><option>sound</option></l></block` +
        `><script><block s="playSound"><block var="sound"/></block><block s="` +
        `doWait"><block s="reportGetSoundAttribute"><l><option>duration</opti` +
        `on></l><block var="sound"/></block></block></script><list></list></b` +
        `lock></script></scripts></block-definition><block-definition s="play` +
        ` sound %&apos;target&apos; at %&apos;rate&apos; Hz" type="command" c` +
        `ategory="sound" selector="doPlaySoundAtRate" primitive="doPlaySoundA` +
        `tRate"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true"><options>§_soundsMenu</option` +
        `s></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kH` +
        `z=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</option` +
        `s></input><input type="%s" readonly="true"><options>§_soundsMenu</op` +
        `tions></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.` +
        `1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</op` +
        `tions></input><input type="%s" readonly="true"><options>§_soundsMenu` +
        `</options></input></inputs><script><block s="playSound"><block s="re` +
        `portNewSoundFromSamples"><block s="reportGetSoundAttribute"><l><opti` +
        `on>samples</option></l><block var="target"/></block><block var="rate` +
        `"/></block></block></script><scripts><script x="10" y="98"><block s=` +
        `"playSound"><block s="reportNewSoundFromSamples"><block s="reportGet` +
        `SoundAttribute"><l><option>samples</option></l><block var="target"/>` +
        `</block><block var="rate"/></block></block></script></scripts></bloc` +
        `k-definition><block-definition s="stop all sounds" type="command" ca` +
        `tegory="sound" selector="doStopAllSounds" primitive="doStopAllSounds` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="%#1 of sound %#2" ` +
        `type="reporter" category="sound" selector="reportGetSoundAttribute" ` +
        `primitive="reportGetSoundAttribute"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true" ` +
        `irreplaceable="true">$_duration<options>name=$_name&#xD;duration=$_d` +
        `uration&#xD;length=$_length&#xD;number of channels=$_number of chann` +
        `els&#xD;sample rate=$_sample rate&#xD;samples=$_samples</options></i` +
        `nput><input type="%s" readonly="true"><options>§_soundsMenu</options` +
        `></input></inputs></block-definition><block-definition s="new sound ` +
        `%#1 rate %#2 Hz" type="reporter" category="sound" selector="reportNe` +
        `wSoundFromSamples" primitive="reportNewSoundFromSamples"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%l" readonly="true"></input><input type="%n">44100<options>22.05 kH` +
        `z=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;9` +
        `6 kHz=96000</options></input></inputs></block-definition><block-defi` +
        `nition s="rest for %&apos;beats&apos; beats" type="command" category` +
        `="sound" selector="doRest"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n">0.2</input><input type="%` +
        `n">0.2</input><input type="%n">0.2</input></inputs><script><block s=` +
        `"doWait"><block s="reportQuotient"><l>60</l><block s="reportVariadic` +
        `Product"><list><block var="beats"/><block s="getTempo"></block></lis` +
        `t></block></block></block></script></block-definition><block-definit` +
        `ion s="play note %#1 for %#2 beats" type="command" category="sound" ` +
        `selector="doPlayNote" primitive="doPlayNote"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n">60<opti` +
        `ons>§_pianoKeyboardMenu</options></input><input type="%n">0.5</input` +
        `></inputs></block-definition><block-definition s="play %#1 Hz for %#` +
        `2 secs" type="command" category="sound" selector="doPlayFrequency" p` +
        `rimitive="doPlayFrequency"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n">440</input><input type="%` +
        `n">2</input></inputs></block-definition><block-definition s="set ins` +
        `trument to %#1" type="command" category="sound" selector="doSetInstr` +
        `ument" primitive="doSetInstrument"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">1<options>(1) sin` +
        `e=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</options>` +
        `</input></inputs></block-definition><block-definition s="change temp` +
        `o by %&apos;delta&apos;" type="command" category="sound" selector="d` +
        `oChangeTempo"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n">20</input><input type="%n">20</input><` +
        `input type="%n">20</input></inputs><script><block s="doSetTempo"><bl` +
        `ock s="reportVariadicSum"><list><block s="getTempo"></block><block v` +
        `ar="delta"/></list></block></block></script></block-definition><bloc` +
        `k-definition s="set tempo to %#1 bpm" type="command" category="sound` +
        `" selector="doSetTempo" primitive="doSetTempo"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">60</i` +
        `nput></inputs></block-definition><block-definition s="tempo" type="r` +
        `eporter" category="sound" selector="getTempo" primitive="getTempo"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="change volume by %&ap` +
        `os;delta&apos;" type="command" category="sound" selector="changeVolu` +
        `me"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%n">10</input><input type="%n">10</input><input type` +
        `="%n">10</input></inputs><script><block s="setVolume"><block s="repo` +
        `rtVariadicSum"><list><block s="getVolume"></block><block var="delta"` +
        `/></list></block></block></script></block-definition><block-definiti` +
        `on s="set volume to %#1 %" type="command" category="sound" selector=` +
        `"setVolume" primitive="setVolume"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">100</input></input` +
        `s></block-definition><block-definition s="volume" type="reporter" ca` +
        `tegory="sound" selector="getVolume" primitive="getVolume"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="change balance by %&apos;delta` +
        `&apos;" type="command" category="sound" selector="changePan"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">10</input><input type="%n">10</input><input type="%n">10</i` +
        `nput></inputs><script><block s="setPan"><block s="reportVariadicSum"` +
        `><list><block s="getPan"></block><block var="delta"/></list></block>` +
        `</block></script></block-definition><block-definition s="set balance` +
        ` to %#1" type="command" category="sound" selector="setPan" primitive` +
        `="setPan"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">0</input></inputs></block-definition><bloc` +
        `k-definition s="balance" type="reporter" category="sound" selector="` +
        `getPan" primitive="getPan"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="play frequency %#1 Hz" type="command" category="sound" select` +
        `or="playFreq" primitive="playFreq"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">440</input></inpu` +
        `ts></block-definition><block-definition s="stop frequency" type="com` +
        `mand" category="sound" selector="stopFreq" primitive="stopFreq"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="jukebox" type="reporter"` +
        ` category="sound" selector="reportSounds" primitive="reportSounds"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="clear" type="command"` +
        ` category="pen" selector="clear" primitive="clear"><header></header>` +
        `<code></code><translations></translations><inputs></inputs></block-d` +
        `efinition><block-definition s="pen down" type="command" category="pe` +
        `n" selector="down" primitive="down"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="pen up" type="command" category="pen" selector="up" ` +
        `primitive="up"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="pen d` +
        `own?" type="predicate" category="pen" selector="getPenDown" primitiv` +
        `e="getPenDown"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="set p` +
        `en color to %&apos;color&apos;" type="command" category="pen" select` +
        `or="setColor"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%clr" readonly="true" irreplaceable="true"` +
        `></input><input type="%clr" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%clr" readonly="true" irreplaceable="true"></input` +
        `></inputs><script><block s="doApplyExtension"><l>clr_setpen(clr)</l>` +
        `<list><block var="color"/></list></block></script></block-definition` +
        `><block-definition s="set pen %#1 to %#2" type="command" category="p` +
        `en" selector="setPenColorDimension" primitive="setPenColorDimension"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true" irreplaceable="true">$_hue<options>` +
        `hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#x` +
        `D;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</` +
        `options></input><input type="%n">50</input></inputs></block-definiti` +
        `on><block-definition s="change pen %&apos;aspect&apos; by %&apos;del` +
        `ta&apos;" type="command" category="pen" selector="changePenColorDime` +
        `nsion" primitive="changePenColorDimension"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$` +
        `_saturation&#xD;brightness=$_brightness&#xD;transparency=$_transpare` +
        `ncy&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input typ` +
        `e="%n">10</input><input type="%s" readonly="true" irreplaceable="tru` +
        `e">hue<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#x` +
        `D;&#126;&#xD;r-g-b(-a)</options></input><input type="%n">10</input><` +
        `input type="%s" readonly="true" irreplaceable="true">hue<options>hue` +
        `&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b` +
        `(-a)</options></input></inputs></block-definition><block-definition ` +
        `s="pen %#1" type="reporter" category="pen" selector="getPenAttribute` +
        `" primitive="getPenAttribute"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">$_hue<options>size=$_size&#xD;hue=$_hue&#xD;saturatio` +
        `n=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_transp` +
        `arency&#xD;&#126;&#xD;r-g-b-a=$_r-g-b-a</options></input></inputs></` +
        `block-definition><block-definition s="set background color to %#1" t` +
        `ype="command" category="pen" selector="setBackgroundColor" primitive` +
        `="setBackgroundColor"><header></header><code></code><translations></` +
        `translations><inputs><input type="%clr" readonly="true" irreplaceabl` +
        `e="true"></input></inputs></block-definition><block-definition s="se` +
        `t background %#1 to %#2" type="command" category="pen" selector="set` +
        `BackgroundColorDimension" primitive="setBackgroundColorDimension"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true">$_hue<options>hue` +
        `=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;t` +
        `ransparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</opt` +
        `ions></input><input type="%n">50</input></inputs></block-definition>` +
        `<block-definition s="change background %#1 by %#2" type="command" ca` +
        `tegory="pen" selector="changeBackgroundColorDimension" primitive="ch` +
        `angeBackgroundColorDimension"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#` +
        `xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126` +
        `;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10</in` +
        `put></inputs></block-definition><block-definition s="change pen size` +
        ` by %&apos;delta&apos;" type="command" category="pen" selector="chan` +
        `geSize"><header></header><code></code><translations></translations><` +
        `inputs><input type="%n">1</input><input type="%n">1</input><input ty` +
        `pe="%n">1</input></inputs><script><block s="setSize"><block s="repor` +
        `tVariadicSum"><list><block s="getPenAttribute"><l><option>size</opti` +
        `on></l></block><block var="delta"/></list></block></block></script><` +
        `/block-definition><block-definition s="set pen size to %#1" type="co` +
        `mmand" category="pen" selector="setSize" primitive="setSize"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">1</input></inputs></block-definition><block-definition s="s` +
        `tamp" type="command" category="pen" selector="doStamp" primitive="do` +
        `Stamp"><header></header><code></code><translations></translations><i` +
        `nputs></inputs></block-definition><block-definition s="fill" type="c` +
        `ommand" category="pen" selector="floodFill" primitive="floodFill"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="write %#1 size %#2" ty` +
        `pe="command" category="pen" selector="write" primitive="write"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s">Hello!</input><input type="%n">12</input></inputs></block` +
        `-definition><block-definition s="pen trails" type="reporter" categor` +
        `y="pen" selector="reportPenTrailsAsCostume" primitive="reportPenTrai` +
        `lsAsCostume"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="pen vec` +
        `tors" type="reporter" category="pen" selector="reportPentrailsAsSVG"` +
        ` primitive="reportPentrailsAsSVG"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="paste on %#1" type="command" category="pen" selector="` +
        `doPasteOn" primitive="doPasteOn"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true"><op` +
        `tions>§_objectsMenu</options></input></inputs></block-definition><bl` +
        `ock-definition s="cut from %#1" type="command" category="pen" select` +
        `or="doCutFrom" primitive="doCutFrom"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        `><options>§_objectsMenu</options></input></inputs></block-definition` +
        `><block-definition s="message" type="reporter" category="control" se` +
        `lector="getLastMessage" primitive="getLastMessage"><header></header>` +
        `<code></code><translations></translations><inputs></inputs></block-d` +
        `efinition><block-definition s="broadcast %#1 %#2" type="command" cat` +
        `egory="control" selector="doBroadcast" primitive="doBroadcast"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true"><options>§_messagesMenu</options></input>` +
        `<input type="%receive" readonly="true" irreplaceable="true" expand="` +
        `to&#xD;with data" max="2"></input></inputs></block-definition><block` +
        `-definition s="broadcast %#1 %#2 and wait" type="command" category="` +
        `control" selector="doBroadcastAndWait" primitive="doBroadcastAndWait` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_messagesMenu</options><` +
        `/input><input type="%receive" readonly="true" irreplaceable="true" e` +
        `xpand="to&#xD;with data" max="2"></input></inputs></block-definition` +
        `><block-definition s="wait %&apos;duration&apos; secs" type="command` +
        `" category="control" selector="doWait"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">1</input><inp` +
        `ut type="%n">1</input></inputs><script><block s="doDeclareVariables"` +
        `><list><l>start time</l></list></block><block s="doSetVar"><l>start ` +
        `time</l><block s="reportDate"><l><option>time in milliseconds</optio` +
        `n></l></block></block><block s="doWaitUntil"><block s="reportVariadi` +
        `cGreaterThanOrEquals"><list><block s="reportDate"><l><option>time in` +
        ` milliseconds</option></l></block><block s="reportVariadicSum"><list` +
        `><block var="start time"/><block s="reportVariadicProduct"><list><bl` +
        `ock var="duration"/><l>1000</l></list></block></list></block></list>` +
        `</block></block></script></block-definition><block-definition s="wai` +
        `t until %&apos;condition&apos;" type="command" category="control" se` +
        `lector="doWaitUntil"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%boolUE" readonly="true"></input><i` +
        `nput type="%boolUE" readonly="true"></input></inputs><script><block ` +
        `s="doIf"><block s="reportNot"><block s="evaluate"><block var="condit` +
        `ion"/><list></list></block></block><script><block s="doWaitUntil"><b` +
        `lock s="evaluate"><block var="condition"/><list></list></block></blo` +
        `ck></script><list></list></block></script></block-definition><block-` +
        `definition s="forever %&apos;action&apos;" type="command" category="` +
        `control" selector="doForever"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%loop" readonly="true" irr` +
        `eplaceable="true"></input><input type="%loop" readonly="true" irrepl` +
        `aceable="true"></input></inputs><script><block s="doRun"><block var=` +
        `"action"/><list></list></block><block s="doRun"><block s="reportEnvi` +
        `ronment"><l><option>script</option></l></block><list><block var="act` +
        `ion"/></list></block></script></block-definition><block-definition s` +
        `="repeat %&apos;count&apos; %&apos;action&apos;" type="command" cate` +
        `gory="control" selector="doRepeat"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">10</input><input ` +
        `type="%loop" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%n">10</input><input type="%loop" readonly="true" irreplaceable="` +
        `true"></input></inputs><script><block s="doDeclareVariables"><list><` +
        `l>self</l></list></block><block s="doSetVar"><l>self</l><block s="re` +
        `portEnvironment"><l><option>script</option></l></block></block><bloc` +
        `k s="doIf"><block s="reportVariadicGreaterThan"><list><block var="co` +
        `unt"/><l>0</l></list></block><script><block s="doRun"><block var="ac` +
        `tion"/><list></list></block><block s="doApplyExtension"><l>snap_yiel` +
        `d</l><list></list></block><block s="doRun"><block var="self"/><list>` +
        `<block s="reportDifference"><block var="count"/><l>1</l></block><blo` +
        `ck var="action"/></list></block></script><list></list></block></scri` +
        `pt></block-definition><block-definition s="repeat until %&apos;condi` +
        `tion&apos; %&apos;action&apos;" type="command" category="control" se` +
        `lector="doUntil"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%boolUE" readonly="true"></input><input` +
        ` type="%loop" readonly="true" irreplaceable="true"></input><input ty` +
        `pe="%boolUE" readonly="true"></input><input type="%loop" readonly="t` +
        `rue" irreplaceable="true"></input></inputs><script><block s="doDecla` +
        `reVariables"><list><l>self</l></list></block><block s="doSetVar"><l>` +
        `self</l><block s="reportEnvironment"><l><option>script</option></l><` +
        `/block></block><block s="doIf"><block s="reportNot"><block s="evalua` +
        `te"><block var="condition"/><list></list></block></block><script><bl` +
        `ock s="doRun"><block var="action"/><list></list></block><block s="do` +
        `ApplyExtension"><l>snap_yield</l><list></list></block><block s="doRu` +
        `n"><block var="self"/><list><block var="condition"/><block var="acti` +
        `on"/></list></block></script><list></list></block></script></block-d` +
        `efinition><block-definition s="for %&apos;count&apos; = %&apos;start` +
        `&apos; to %&apos;end&apos; %&apos;action&apos;" type="command" categ` +
        `ory="control" selector="doFor"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%upvar" readonly="true" i` +
        `rreplaceable="true">i</input><input type="%n">1</input><input type="` +
        `%n">10</input><input type="%loop" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%upvar" readonly="true" irreplaceable="true"` +
        `>i</input><input type="%n">1</input><input type="%n">10</input><inpu` +
        `t type="%loop" readonly="true" irreplaceable="true"></input></inputs` +
        `><script><block s="doDeclareVariables"><list><l>test</l><l>increment` +
        `</l></list></block><block s="doSetVar"><l>count</l><block var="start` +
        `"/></block><block s="doIfElse"><block s="reportVariadicLessThan"><li` +
        `st><block var="start"/><block var="end"/></list></block><script><blo` +
        `ck s="doSetVar"><l>test</l><block s="reifyPredicate"><autolambda><bl` +
        `ock s="reportVariadicGreaterThan"><list><block var="count"/><block v` +
        `ar="end"/></list></block></autolambda><list></list></block></block><` +
        `block s="doSetVar"><l>increment</l><l>1</l></block></script><script>` +
        `<block s="doSetVar"><l>test</l><block s="reifyPredicate"><autolambda` +
        `><block s="reportVariadicLessThan"><list><block var="count"/><block ` +
        `var="end"/></list></block></autolambda><list></list></block></block>` +
        `<block s="doSetVar"><l>increment</l><l>-1</l></block></script></bloc` +
        `k><block s="doUntil"><block s="evaluate"><block var="test"/><list></` +
        `list></block><script><block s="doRun"><block var="action"/><list></l` +
        `ist></block><block s="doChangeVar"><l>count</l><block var="increment` +
        `"/></block></script></block></script></block-definition><block-defin` +
        `ition s="if %&apos;condition&apos; %&apos;true case&apos; %&apos;els` +
        `e pairs&apos;" type="command" category="control" selector="doIf" pri` +
        `mitive="doIf"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%b" readonly="true"></input><input type="%` +
        `cs" readonly="true" irreplaceable="true"></input><input type="%elsei` +
        `f" readonly="true" irreplaceable="true" expand="else if&#xD;"></inpu` +
        `t><input type="%b" readonly="true"></input><input type="%cs" readonl` +
        `y="true" irreplaceable="true"></input><input type="%elseif" readonly` +
        `="true" irreplaceable="true" expand="else if&#xD;"></input><input ty` +
        `pe="%b" readonly="true"></input></inputs><script><block s="doDeclare` +
        `Variables"><list><l>self</l></list></block><block s="doSetVar"><l>se` +
        `lf</l><block s="reportEnvironment"><l><option>script</option></l></b` +
        `lock></block><block s="doIfElse"><block var="condition"/><script><bl` +
        `ock s="doRun"><block var="true case"/><list></list></block></script>` +
        `<script><block s="doIfElse"><block s="reportListIsEmpty"><block var=` +
        `"else pairs"/></block><script></script><script><block s="doIfElse"><` +
        `block s="reportListItem"><l>1</l><block var="else pairs"/></block><s` +
        `cript><block s="doRun"><block s="reportListItem"><l>2</l><block var=` +
        `"else pairs"/></block><list></list></block></script><script><block s` +
        `="doRun"><block var="self"/><list><block s="reportBoolean"><l><bool>` +
        `false</bool></l></block><l></l><block s="reportCDR"><block s="report` +
        `CDR"><block var="else pairs"/></block></block></list></block></scrip` +
        `t></block></script></block></script></block></script><scripts><scrip` +
        `t x="10" y="98"><block s="doDeclareVariables"><list><l>self</l></lis` +
        `t></block><block s="doSetVar"><l>self</l><block s="reportEnvironment` +
        `"><l><option>script</option></l></block></block><block s="doIfElse">` +
        `<block var="condition"/><script><block s="doRun"><block var="true ca` +
        `se"/><list></list></block></script><script><block s="doIfElse"><bloc` +
        `k s="reportListIsEmpty"><block var="else pairs"/></block><script></s` +
        `cript><script><block s="doIfElse"><block s="reportListItem"><l>1</l>` +
        `<block var="else pairs"/></block><script><block s="doRun"><block s="` +
        `reportListItem"><l>2</l><block var="else pairs"/></block><list></lis` +
        `t></block></script><script><block s="doRun"><block var="self"/><list` +
        `><block s="reportBoolean"><l><bool>false</bool></l></block><l></l><b` +
        `lock s="reportCDR"><block s="reportCDR"><block var="else pairs"/></b` +
        `lock></block></list></block></script></block></script></block></scri` +
        `pt></block></script></scripts></block-definition><block-definition s` +
        `="if %&apos;condition&apos; %&apos;true case&apos; else %&apos;false` +
        ` case&apos;" type="command" category="control" selector="doIfElse" p` +
        `rimitive="doIfElse"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%b" readonly="true"></input><input t` +
        `ype="%cs" readonly="true" irreplaceable="true"></input><input type="` +
        `%cs" readonly="true" irreplaceable="true"></input><input type="%b" r` +
        `eadonly="true"></input><input type="%cs" readonly="true" irreplaceab` +
        `le="true"></input><input type="%cs" readonly="true" irreplaceable="t` +
        `rue"></input></inputs><scripts><script x="10" y="97.83333333333331">` +
        `<block s="doRun"><block s="reportListItem"><block s="reportVariadicS` +
        `um"><list><block var="condition"/><l>1</l></list></block><block s="r` +
        `eportNewList"><list><block var="false case"/><block var="true case"/` +
        `></list></block></block><list></list></block></script></scripts></bl` +
        `ock-definition><block-definition s="if %&apos;condition&apos; then %` +
        `&apos;true case&apos; else %&apos;false case&apos;" type="reporter" ` +
        `category="control" selector="reportIfElse" primitive="reportIfElse">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%b" readonly="true"></input><input type="%anyUE"></input` +
        `><input type="%anyUE"></input><input type="%b" readonly="true"></inp` +
        `ut><input type="%anyUE"></input><input type="%anyUE"></input><input ` +
        `type="%b" readonly="true"></input></inputs><scripts><script x="10" y` +
        `="91.83333333333331"><block s="doReport"><block s="reportHyperZip"><` +
        `block s="reifyReporter"><autolambda><block s="evaluate"><block s="re` +
        `portListItem"><l></l><l/></block><list></list></block></autolambda><` +
        `list></list></block><block s="reportVariadicSum"><list><block var="c` +
        `ondition"/><l>1</l></list></block><l>0</l><block s="reportNewList"><` +
        `list><block var="false case"/><block var="true case"/></list></block` +
        `><l>1</l></block></block></script></scripts></block-definition><bloc` +
        `k-definition s="stop %#1" type="command" category="control" selector` +
        `="doStopThis" primitive="doStopThis"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">$_all<options>all=$_all&#xD;all scenes=$_all s` +
        `cenes&#xD;this script=$_this script&#xD;this block=$_this block&#xD;` +
        `all but this script=$_all but this script&#xD;other scripts in sprit` +
        `e=$_other scripts in sprite</options></input></inputs></block-defini` +
        `tion><block-definition s="run %#1 %#2" type="command" category="cont` +
        `rol" selector="doRun" primitive="doRun"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%cmdRing" readon` +
        `ly="true"></input><input type="%mult%s" readonly="true" expand="with` +
        ` inputs"></input></inputs></block-definition><block-definition s="la` +
        `unch %#1 %#2" type="command" category="control" selector="fork" prim` +
        `itive="fork"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%cmdRing" readonly="true"></input><input ty` +
        `pe="%mult%s" readonly="true" expand="with inputs"></input></inputs><` +
        `/block-definition><block-definition s="call %#1 %#2" type="reporter"` +
        ` category="control" selector="evaluate" primitive="evaluate"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%repRing" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%mult%s" readonly="true" expand="with inputs"></input></inputs>` +
        `</block-definition><block-definition s="report %#1" type="command" c` +
        `ategory="control" selector="doReport" primitive="doReport"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s"></input></inputs></block-definition><block-definition s="run ` +
        `%#1 w/continuation" type="command" category="control" selector="doCa` +
        `llCC" primitive="doCallCC"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%cmdRing" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="call %#1 w/con` +
        `tinuation" type="reporter" category="control" selector="reportCallCC` +
        `" primitive="reportCallCC"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%cmdRing" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="warp %#1" type` +
        `="command" category="other" selector="doWarp" primitive="doWarp"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%cs" readonly="true" irreplaceable="true"></input></inputs>` +
        `</block-definition><block-definition s="tell %&apos;target&apos; to ` +
        `%&apos;action&apos; %&apos;parameters&apos;" type="command" category` +
        `="control" selector="doTellTo"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true"><opti` +
        `ons>§_objectsMenu</options></input><input type="%cmdRing" readonly="` +
        `true"></input><input type="%mult%s" readonly="true" expand="with inp` +
        `uts"></input><input type="%s" readonly="true"><options>§_objectsMenu` +
        `</options></input><input type="%cmdRing" readonly="true"></input><in` +
        `put type="%mult%s" readonly="true" expand="with inputs"></input><inp` +
        `ut type="%s" readonly="true"><options>§_objectsMenu</options></input` +
        `></inputs><script><block s="doRun"><block s="reportAttributeOf"><blo` +
        `ck var="action"/><block var="target"/></block><block var="parameters` +
        `"/></block></script></block-definition><block-definition s="ask %&ap` +
        `os;target&apos; for %&apos;action&apos; %&apos;parameters&apos;" typ` +
        `e="reporter" category="control" selector="reportAskFor"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true"><options>§_objectsMenu</options></input><input t` +
        `ype="%repRing" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%mult%s" readonly="true" expand="with inputs"></input><input ty` +
        `pe="%s" readonly="true"><options>§_objectsMenu</options></input><inp` +
        `ut type="%repRing" readonly="true" irreplaceable="true"></input><inp` +
        `ut type="%mult%s" readonly="true" expand="with inputs"></input><inpu` +
        `t type="%s" readonly="true"><options>§_objectsMenu</options></input>` +
        `</inputs><script><block s="doReport"><block s="evaluate"><block s="r` +
        `eportAttributeOf"><block var="action"/><block var="target"/></block>` +
        `<block var="parameters"/></block></block></script></block-definition` +
        `><block-definition s="create a clone of %&apos;target&apos;" type="c` +
        `ommand" category="control" selector="createClone"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true">$_myself<options>§_clonablesMenu</options></input><inp` +
        `ut type="%s" readonly="true">myself<options>§_clonablesMenu</options` +
        `></input><input type="%s" readonly="true">myself<options>§_clonables` +
        `Menu</options></input></inputs><script><block s="doReport"><block s=` +
        `"newClone"><block var="target"/></block></block></script></block-def` +
        `inition><block-definition s="a new clone of %#1" type="reporter" cat` +
        `egory="control" selector="newClone" primitive="newClone"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true">$_myself<options>§_clonablesMenu</options></inp` +
        `ut></inputs></block-definition><block-definition s="delete this clon` +
        `e" type="command" category="control" selector="removeClone" primitiv` +
        `e="removeClone"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="defi` +
        `ne %#1 %#2 %#3" type="command" category="control" selector="doDefine` +
        `Block" primitive="doDefineBlock"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%upvar" readonly="true"` +
        ` irreplaceable="true">$_block</input><input type="%s"></input><input` +
        ` type="%repRing" readonly="true" irreplaceable="true"></input></inpu` +
        `ts></block-definition><block-definition s="set %#1 of block %#2 to %` +
        `#3" type="command" category="control" selector="doSetBlockAttribute"` +
        ` primitive="doSetBlockAttribute"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_label<options>label=$_label&#xD;definition=$_def` +
        `inition&#xD;comment=$_comment&#xD;category=$_category&#xD;type=$_typ` +
        `e&#xD;scope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&#xD;&#` +
        `126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$_edita` +
        `bles&#xD;replaceables=$_replaceables&#xD;&#126;&#xD;separators=$_sep` +
        `arators&#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;initial ` +
        `slots=$_initial slots&#xD;min slots=$_min slots&#xD;max slots=$_max ` +
        `slots&#xD;translations=$_translations</options></input><input type="` +
        `%repRing" readonly="true" irreplaceable="true"></input><input type="` +
        `%s"></input></inputs></block-definition><block-definition s="delete ` +
        `block %#1" type="command" category="control" selector="doDeleteBlock` +
        `" primitive="doDeleteBlock"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%repRing" readonly="true" ir` +
        `replaceable="true"></input></inputs></block-definition><block-defini` +
        `tion s="%#1 of block %#2" type="reporter" category="control" selecto` +
        `r="reportBlockAttribute" primitive="reportBlockAttribute"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true" irreplaceable="true">$_definition<options>labe` +
        `l=$_label&#xD;definition=$_definition&#xD;comment=$_comment&#xD;cate` +
        `gory=$_category&#xD;custom?=$_custom?&#xD;global?=$_global?&#xD;type` +
        `=$_type&#xD;scope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&` +
        `#xD;&#126;&#xD;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$` +
        `_editables&#xD;replaceables=$_replaceables&#xD;&#126;&#xD;separators` +
        `=$_separators&#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;in` +
        `itial slots=$_initial slots&#xD;min slots=$_min slots&#xD;max slots=` +
        `$_max slots&#xD;translations=$_translations</options></input><input ` +
        `type="%repRing" readonly="true" irreplaceable="true"></input></input` +
        `s></block-definition><block-definition s="this %#1" type="reporter" ` +
        `category="control" selector="reportEnvironment" primitive="reportEnv` +
        `ironment"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">$_scr` +
        `ipt<options>script=$_script&#xD;caller=$_caller&#xD;continuation=$_c` +
        `ontinuation&#xD;&#126;&#xD;inputs=$_inputs</options></input></inputs` +
        `></block-definition><block-definition s="pause all $pause" type="com` +
        `mand" category="control" selector="doPauseAll" primitive="doPauseAll` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="switch to scene %#` +
        `1 %#2" type="command" category="control" selector="doSwitchToScene" ` +
        `primitive="doSwitchToScene"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true">$_next<o` +
        `ptions>§_scenesMenu</options></input><input type="%send" readonly="t` +
        `rue" irreplaceable="true" expand="and send&#xD;with data" max="2"></` +
        `input></inputs></block-definition><block-definition s="pipe %&apos;v` +
        `alue&apos; $arrowRight %&apos;functions&apos;" type="reporter" categ` +
        `ory="control" selector="reportPipe"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s"></input><input t` +
        `ype="%mult%repRing" readonly="true"></input><input type="%s"></input` +
        `><input type="%mult%repRing" readonly="true"></input><input type="%s` +
        `"></input></inputs><script><block s="doReport"><block s="reportIfEls` +
        `e"><block s="reportListIsEmpty"><block var="functions"/></block><blo` +
        `ck var="value"/><block s="reportPipe"><block s="evaluate"><block s="` +
        `reportListItem"><l>1</l><block var="functions"/></block><list><block` +
        ` var="value"/></list></block><block s="reportCDR"><block var="functi` +
        `ons"/></block></block></block></block></script></block-definition><b` +
        `lock-definition s="touching %#1 ?" type="predicate" category="sensin` +
        `g" selector="reportTouchingObject" primitive="reportTouchingObject">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true">$_mouse-pointer<options>§_collidable` +
        `sMenu</options></input></inputs></block-definition><block-definition` +
        ` s="touching %#1 ?" type="predicate" category="sensing" selector="re` +
        `portTouchingColor" primitive="reportTouchingColor"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%clr"` +
        ` readonly="true" irreplaceable="true"></input></inputs></block-defin` +
        `ition><block-definition s="color %#1 is touching %#2 ?" type="predic` +
        `ate" category="sensing" selector="reportColorIsTouchingColor" primit` +
        `ive="reportColorIsTouchingColor"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%clr" readonly="true" i` +
        `rreplaceable="true"></input><input type="%clr" readonly="true" irrep` +
        `laceable="true"></input></inputs></block-definition><block-definitio` +
        `n s="%#1 at %#2" type="reporter" category="sensing" selector="report` +
        `Aspect" primitive="reportAspect"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturatio` +
        `n&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;r-` +
        `g-b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites</options></input><i` +
        `nput type="%s" readonly="true">$_mouse-pointer<options>§_locationMen` +
        `u</options></input></inputs></block-definition><block-definition s="` +
        `stack size" type="reporter" category="sensing" selector="reportStack` +
        `Size" primitive="reportStackSize"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="frames" type="reporter" category="sensing" selector="r` +
        `eportFrameCount" primitive="reportFrameCount"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="yields" type="reporter" category="sensing"` +
        ` selector="reportYieldCount" primitive="reportYieldCount"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="processes" type="reporter" cat` +
        `egory="sensing" selector="reportThreadCount" primitive="reportThread` +
        `Count"><header></header><code></code><translations></translations><i` +
        `nputs></inputs></block-definition><block-definition s="ask %#1 and w` +
        `ait" type="command" category="sensing" selector="doAsk" primitive="d` +
        `oAsk"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s">what&apos;s your name?</input></inputs></block` +
        `-definition><block-definition s="answer" type="reporter" category="s` +
        `ensing" selector="reportLastAnswer" primitive="reportLastAnswer"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="answer" type="reporter"` +
        ` category="sensing" selector="getLastAnswer" primitive="getLastAnswe` +
        `r"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="mouse position" t` +
        `ype="reporter" category="sensing" selector="reportMousePosition"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts><script><block s="doReport"><block s="reportNewList"><list><blo` +
        `ck s="reportMouseX"></block><block s="reportMouseY"></block></list><` +
        `/block></block></script></block-definition><block-definition s="mous` +
        `e x" type="reporter" category="sensing" selector="reportMouseX" prim` +
        `itive="reportMouseX"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"mouse y" type="reporter" category="sensing" selector="reportMouseY"` +
        ` primitive="reportMouseY"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="mouse down?" type="predicate" category="sensing" selector="rep` +
        `ortMouseDown" primitive="reportMouseDown"><header></header><code></c` +
        `ode><translations></translations><inputs></inputs></block-definition` +
        `><block-definition s="key %#1 pressed?" type="predicate" category="s` +
        `ensing" selector="reportKeyPressed" primitive="reportKeyPressed"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true">$_space<options>§_keysMenu</options></i` +
        `nput></inputs></block-definition><block-definition s="%#1 to %#2" ty` +
        `pe="reporter" category="sensing" selector="reportRelationTo" primiti` +
        `ve="reportRelationTo"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true">$_distance<opt` +
        `ions>distance=$_distance&#xD;direction=$_direction&#xD;ray length=$_` +
        `ray length</options></input><input type="%s" readonly="true">$_mouse` +
        `-pointer<options>§_destinationsMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="reset timer" type="command" catego` +
        `ry="sensing" selector="doResetTimer" primitive="doResetTimer"><heade` +
        `r></header><code></code><translations></translations><inputs></input` +
        `s></block-definition><block-definition s="timer" type="reporter" cat` +
        `egory="sensing" selector="reportTimer" primitive="reportTimer"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts></block-definition><block-definition s="timer" type="reporter" ca` +
        `tegory="sensing" selector="getTimer" primitive="getTimer"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="%#1 of %#2" type="reporter" ca` +
        `tegory="sensing" selector="reportAttributeOf" primitive="reportAttri` +
        `buteOf"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true">$_costume #<options>§_attrib` +
        `utesMenu</options></input><input type="%s" readonly="true"><options>` +
        `§_objectsMenu</options></input></inputs></block-definition><block-de` +
        `finition s="object %&apos;name&apos;" type="reporter" category="sens` +
        `ing" selector="reportObject" primitive="reportObject"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true">$_myself<options>§_objectsMenuWithSelf</options></` +
        `input><input type="%s" readonly="true">myself<options>§_objectsMenuW` +
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
        `ion s="%#1 − %#2" type="reporter" category="operators" selector="rep` +
        `ortDifference" primitive="reportDifference"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%n"></input>` +
        `<input type="%n"></input></inputs></block-definition><block-definiti` +
        `on s="%#1" type="reporter" category="operators" selector="reportVari` +
        `adicProduct" primitive="reportVariadicProduct"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%n" ` +
        `readonly="true" separator="×" collapse="product" initial="2"></input` +
        `></inputs></block-definition><block-definition s="%#1 / %#2" type="r` +
        `eporter" category="operators" selector="reportQuotient" primitive="r` +
        `eportQuotient"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n"></input><input type="%n"></input></in` +
        `puts></block-definition><block-definition s="round %#1" type="report` +
        `er" category="operators" selector="reportRound" primitive="reportRou` +
        `nd"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%n"></input></inputs></block-definition><block-defin` +
        `ition s="%#1 of %#2" type="reporter" category="operators" selector="` +
        `reportMonadic" primitive="reportMonadic"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">$_sqrt<options>abs=$_abs&#xD;neg=$_neg&#xD` +
        `;sign=$_sign&#xD;ceiling=$_ceiling&#xD;floor=$_floor&#xD;sqrt=$_sqrt` +
        `&#xD;sin=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD;asin=$_asin&#xD;acos=` +
        `$_acos&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_log&#xD;lg=$_lg&#xD;e^=` +
        `$_e^&#xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</options></input><input t` +
        `ype="%n">10</input></inputs></block-definition><block-definition s="` +
        `%#1 ^ %#2" type="reporter" category="operators" selector="reportPowe` +
        `r" primitive="reportPower"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n"></input><input type="%n">` +
        `</input></inputs></block-definition><block-definition s="%#1 mod %#2` +
        `" type="reporter" category="operators" selector="reportModulus" prim` +
        `itive="reportModulus"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n"></input><input type="%n"></inp` +
        `ut></inputs></block-definition><block-definition s="atan2 %#1 ÷ %#2"` +
        ` type="reporter" category="operators" selector="reportAtan2" primiti` +
        `ve="reportAtan2"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%n"></input><input type="%n"></input></` +
        `inputs></block-definition><block-definition s="%#1" type="reporter" ` +
        `category="operators" selector="reportVariadicMin" primitive="reportV` +
        `ariadicMin"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%n" readonly="true" separator="min" col` +
        `lapse="minimum" initial="2"></input></inputs></block-definition><blo` +
        `ck-definition s="%#1" type="reporter" category="operators" selector=` +
        `"reportVariadicMax" primitive="reportVariadicMax"><header></header><` +
        `code></code><translations></translations><inputs><input type="%mult%` +
        `n" readonly="true" separator="max" collapse="maximum" initial="2"></` +
        `input></inputs></block-definition><block-definition s="pick random %` +
        `#1 to %#2" type="reporter" category="operators" selector="reportRand` +
        `om" primitive="reportRandom"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">1</input><input type="%` +
        `n">10</input></inputs></block-definition><block-definition s="%#1" t` +
        `ype="predicate" category="operators" selector="reportVariadicEquals"` +
        ` primitive="reportVariadicEquals"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%mult%s" readonly="tru` +
        `e" separator="=" collapse="all =" initial="2"></input></inputs></blo` +
        `ck-definition><block-definition s="%#1" type="predicate" category="o` +
        `perators" selector="reportVariadicNotEquals" primitive="reportVariad` +
        `icNotEquals"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%s" readonly="true" separator="≠" coll` +
        `apse="neighbors ≠" initial="2"></input></inputs></block-definition><` +
        `block-definition s="%#1" type="predicate" category="operators" selec` +
        `tor="reportVariadicLessThan" primitive="reportVariadicLessThan"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%mult%s" readonly="true" separator="&lt;" collapse="all &lt;` +
        `" initial="2"></input></inputs></block-definition><block-definition ` +
        `s="%#1" type="predicate" category="operators" selector="reportVariad` +
        `icLessThanOrEquals" primitive="reportVariadicLessThanOrEquals"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%mult%s" readonly="true" separator="≤" collapse="all ≤" initi` +
        `al="2"></input></inputs></block-definition><block-definition s="%#1"` +
        ` type="predicate" category="operators" selector="reportVariadicGreat` +
        `erThan" primitive="reportVariadicGreaterThan"><header></header><code` +
        `></code><translations></translations><inputs><input type="%mult%s" r` +
        `eadonly="true" separator="&gt;" collapse="all &gt;" initial="2"></in` +
        `put></inputs></block-definition><block-definition s="%#1" type="pred` +
        `icate" category="operators" selector="reportVariadicGreaterThanOrEqu` +
        `als" primitive="reportVariadicGreaterThanOrEquals"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%mult` +
        `%s" readonly="true" separator="≥" collapse="all ≥" initial="2"></inp` +
        `ut></inputs></block-definition><block-definition s="%#1" type="predi` +
        `cate" category="operators" selector="reportVariadicAnd" primitive="r` +
        `eportVariadicAnd"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%mult%b" readonly="true" separator="an` +
        `d" collapse="all" initial="2"></input></inputs></block-definition><b` +
        `lock-definition s="%#1" type="predicate" category="operators" select` +
        `or="reportVariadicOr" primitive="reportVariadicOr"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%mult` +
        `%b" readonly="true" separator="or" collapse="any" initial="2"></inpu` +
        `t></inputs></block-definition><block-definition s="not %&apos;bool&a` +
        `pos;" type="predicate" category="operators" selector="reportNot"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%b" readonly="true"></input><input type="%b" readonly="true` +
        `"></input><input type="%b" readonly="true"></input></inputs><script>` +
        `<block s="doReport"><block s="reportIfElse"><block var="bool"/><bloc` +
        `k s="reportBoolean"><l><bool>false</bool></l></block><block s="repor` +
        `tBoolean"><l><bool>true</bool></l></block></block></block></script><` +
        `/block-definition><block-definition s="%#1" type="predicate" categor` +
        `y="operators" selector="reportBoolean" primitive="reportBoolean"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%b" readonly="true" irreplaceable="true">true</input></inpu` +
        `ts></block-definition><block-definition s="%#1" type="predicate" cat` +
        `egory="operators" selector="reportFalse" primitive="reportFalse"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%b" readonly="true" irreplaceable="true">false</input></inp` +
        `uts></block-definition><block-definition s="join %#1" type="reporter` +
        `" category="operators" selector="reportJoinWords" primitive="reportJ` +
        `oinWords"><header></header><code></code><translations></translations` +
        `><inputs><input type="%mult%s" readonly="true" initial="2">hello &#x` +
        `D;world</input></inputs></block-definition><block-definition s="lett` +
        `er %&apos;idx&apos; of %&apos;text&apos;" type="reporter" category="` +
        `operators" selector="reportLetter" primitive="reportLetter"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options><` +
        `/input><input type="%s">world</input><input type="%n">1<options>1=1&` +
        `#xD;last&#xD;random</options></input><input type="%s">world</input><` +
        `input type="%n">1<options>1=1&#xD;last&#xD;random</options></input><` +
        `/inputs><script><block s="doReport"><block s="reportHyperZip"><block` +
        ` s="reifyReporter"><autolambda><block s="reportListItem"><l></l><blo` +
        `ck s="reportTextSplit"><l></l><l><option>letter</option></l></block>` +
        `</block></autolambda><list></list></block><block var="idx"/><l>0</l>` +
        `<block var="text"/><l>0</l></block></block></script><scripts><script` +
        ` x="10" y="98"><block s="doReport"><block s="reportHyperZip"><block ` +
        `s="reifyReporter"><autolambda><block s="reportListItem"><l></l><bloc` +
        `k s="reportTextSplit"><l></l><l><option>letter</option></l></block><` +
        `/block></autolambda><list></list></block><block var="idx"/><l>0</l><` +
        `block var="text"/><l>0</l></block></block></script></scripts></block` +
        `-definition><block-definition s="length of %#1" type="reporter" cate` +
        `gory="operators" selector="reportStringSize" primitive="reportString` +
        `Size"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s">world</input></inputs></block-definition><bloc` +
        `k-definition s="%#1 of text %#2" type="reporter" category="operators` +
        `" selector="reportTextAttribute" primitive="reportTextAttribute"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true" irreplaceable="true">$_length<options>l` +
        `ength=$_length&#xD;lower case=$_lower case&#xD;upper case=$_upper ca` +
        `se</options></input><input type="%s">world</input></inputs></block-d` +
        `efinition><block-definition s="unicode of %#1" type="reporter" categ` +
        `ory="operators" selector="reportUnicode" primitive="reportUnicode"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s">a</input></inputs></block-definition><block-definitio` +
        `n s="unicode %#1 as letter" type="reporter" category="operators" sel` +
        `ector="reportUnicodeAsLetter" primitive="reportUnicodeAsLetter"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">65</input></inputs></block-definition><block-definition ` +
        `s="is %#1 a %#2 ?" type="predicate" category="operators" selector="r` +
        `eportIsA" primitive="reportIsA"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%s">5</input><input type` +
        `="%s" readonly="true" irreplaceable="true">$_number<options>§_typesM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="is %#1 ?" type="predicate" category="operators" selector="reportVa` +
        `riadicIsIdentical" primitive="reportVariadicIsIdentical"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%mult%s" readonly="true" separator="identical to" collapse="all ide` +
        `ntical" initial="2"></input></inputs></block-definition><block-defin` +
        `ition s="split %#1 by %#2" type="reporter" category="operators" sele` +
        `ctor="reportTextSplit" primitive="reportTextSplit"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s">h` +
        `ello world</input><input type="%s"> <options>letter=$_letter&#xD;wor` +
        `d=$_word&#xD;line=$_line&#xD;tab=$_tab&#xD;cr=$_cr&#xD;csv=$_csv&#xD` +
        `;json=$_json&#xD;&#126;&#xD;blocks=$_blocks</options></input></input` +
        `s></block-definition><block-definition s="JavaScript function ( %#1 ` +
        `) { %#2 }" type="reporter" category="operators" selector="reportJSFu` +
        `nction" primitive="reportJSFunction"><header></header><code></code><` +
        `translations></translations><inputs><input type="%mult%s" readonly="` +
        `true"></input><input type="%mlt"></input></inputs></block-definition` +
        `><block-definition s="type of %#1" type="reporter" category="operato` +
        `rs" selector="reportTypeOf" primitive="reportTypeOf"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        `>5</input></inputs></block-definition><block-definition s="%#1 of %#` +
        `2" type="reporter" category="operators" selector="reportTextFunction` +
        `" primitive="reportTextFunction"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_encode URI<options>encode URI=$_encode URI&#xD;d` +
        `ecode URI=$_decode URI&#xD;encode URI component=$_encode URI compone` +
        `nt&#xD;decode URI component=$_decode URI component&#xD;XML escape=$_` +
        `XML escape&#xD;XML unescape=$_XML unescape&#xD;JS escape=$_JS escape` +
        `&#xD;hex sha512 hash=$_hex sha512 hash</options></input><input type=` +
        `"%s">Abelson &amp; Sussman</input></inputs></block-definition><block` +
        `-definition s="compile %#1 for %#2 args" type="reporter" category="o` +
        `perators" selector="reportCompiled" primitive="reportCompiled"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%repRing" readonly="true" irreplaceable="true"></input><input` +
        ` type="%n">0</input></inputs></block-definition><block-definition s=` +
        `"set %#1 to %#2" type="command" category="variables" selector="doSet` +
        `Var" primitive="doSetVar"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true" irreplacea` +
        `ble="true"><options>§_getVarNamesDict</options></input><input type="` +
        `%s">0</input></inputs></block-definition><block-definition s="change` +
        ` %#1 by %#2" type="command" category="variables" selector="doChangeV` +
        `ar" primitive="doChangeVar"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true" irreplac` +
        `eable="true"><options>§_getVarNamesDict</options></input><input type` +
        `="%n">1</input></inputs></block-definition><block-definition s="show` +
        ` variable %#1" type="command" category="variables" selector="doShowV` +
        `ar" primitive="doShowVar"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true" irreplacea` +
        `ble="true"><options>§_getVarNamesDict</options></input></inputs></bl` +
        `ock-definition><block-definition s="hide variable %#1" type="command` +
        `" category="variables" selector="doHideVar" primitive="doHideVar"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true"><options>§_getVar` +
        `NamesDict</options></input></inputs></block-definition><block-defini` +
        `tion s="script variables %&apos;#1&apos;" type="command" category="o` +
        `ther" selector="doDeclareVariables"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%scriptVars" readonl` +
        `y="true" irreplaceable="true" initial="1" min="1"></input></inputs><` +
        `/block-definition><block-definition s="inherit %#1" type="command" c` +
        `ategory="variables" selector="doDeleteAttr" primitive="doDeleteAttr"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true"><options>§_shadowedVariablesMenu</o` +
        `ptions></input></inputs></block-definition><block-definition s="list` +
        ` %&apos;inputs&apos;" type="reporter" category="lists" selector="rep` +
        `ortNewList"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%s" readonly="true" irreplaceable="true` +
        `" initial="1"></input><input type="%mult%s" readonly="true" irreplac` +
        `eable="true" initial="1"></input><input type="%mult%s" readonly="tru` +
        `e" irreplaceable="true" initial="1"></input></inputs><script><block ` +
        `s="doReport"><block var="inputs"/></block></script></block-definitio` +
        `n><block-definition s="%#1 in front of %#2" type="reporter" category` +
        `="lists" selector="reportCONS" primitive="reportCONS"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `"></input><input type="%l" readonly="true"></input></inputs></block-` +
        `definition><block-definition s="item %#1 of %#2" type="reporter" cat` +
        `egory="lists" selector="reportListItem" primitive="reportListItem"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</op` +
        `tions></input><input type="%l" readonly="true"></input></inputs></bl` +
        `ock-definition><block-definition s="all but first of %#1" type="repo` +
        `rter" category="lists" selector="reportCDR" primitive="reportCDR"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%l" readonly="true"></input></inputs></block-definition><b` +
        `lock-definition s="length of %#1" type="reporter" category="lists" s` +
        `elector="reportListLength" primitive="reportListLength"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%l" readonly="true"></input></inputs></block-definition><block-defin` +
        `ition s="%#1 of %#2" type="reporter" category="lists" selector="repo` +
        `rtListAttribute" primitive="reportListAttribute"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true">$_length<options>length=$_length&#` +
        `xD;rank=$_rank&#xD;dimensions=$_dimensions&#xD;flatten=$_flatten&#xD` +
        `;columns=$_columns&#xD;uniques=$_uniques&#xD;distribution=$_distribu` +
        `tion&#xD;sorted=$_sorted&#xD;shuffled=$_shuffled&#xD;reverse=$_rever` +
        `se&#xD;&#126;&#xD;lines=$_lines&#xD;csv=$_csv&#xD;json=$_json</optio` +
        `ns></input><input type="%l" readonly="true"></input></inputs></block` +
        `-definition><block-definition s="%&apos;data&apos; contains %&apos;v` +
        `alue&apos;" type="predicate" category="lists" selector="reportListCo` +
        `ntainsItem" primitive="reportListContainsItem"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%l" reado` +
        `nly="true"></input><input type="%s">thing</input><input type="%l" re` +
        `adonly="true"></input><input type="%s">thing</input></inputs><script` +
        `s><script x="10" y="91.83333333333331"><block s="doWarp"><script><bl` +
        `ock s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><opt` +
        `ion>length</option></l><block var="data"/></block><script><block s="` +
        `doIf"><block s="reportVariadicEquals"><list><block s="reportListItem` +
        `"><block var="i"/><block var="data"/></block><block var="value"/></l` +
        `ist></block><script><block s="doReport"><block s="reportBoolean"><l>` +
        `<bool>true</bool></l></block></block></script><list></list></block><` +
        `/script></block></script></block><block s="doReport"><block s="repor` +
        `tBoolean"><l><bool>false</bool></l></block></block></script></script` +
        `s></block-definition><block-definition s="is %&apos;data&apos; empty` +
        `?" type="predicate" category="lists" selector="reportListIsEmpty" pr` +
        `imitive="reportListIsEmpty"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%l" readonly="true"></input>` +
        `<input type="%l" readonly="true"></input></inputs><scripts><script x` +
        `="10" y="91.83333333333331"><block s="doReport"><block s="reportVari` +
        `adicEquals"><list><block var="data"/><block s="reportNewList"><list>` +
        `</list></block></list></block></block></script></scripts></block-def` +
        `inition><block-definition s="index of %&apos;value&apos; in %&apos;d` +
        `ata&apos;" type="reporter" category="lists" selector="reportListInde` +
        `x" primitive="reportListIndex"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s">thing</input><input t` +
        `ype="%l" readonly="true"></input><input type="%s">thing</input><inpu` +
        `t type="%l" readonly="true"></input></inputs><scripts><script x="10"` +
        ` y="91.83333333333331"><block s="doWarp"><script><block s="doFor"><l` +
        `>i</l><l>1</l><block s="reportListAttribute"><l><option>length</opti` +
        `on></l><block var="data"/></block><script><block s="doIf"><block s="` +
        `reportVariadicEquals"><list><block s="reportListItem"><block var="i"` +
        `/><block var="data"/></block><block var="value"/></list></block><scr` +
        `ipt><block s="doReport"><block var="i"/></block></script><list></lis` +
        `t></block></script></block></script></block><block s="doReport"><l>0` +
        `</l></block></script></scripts></block-definition><block-definition ` +
        `s="add %#1 to %#2" type="command" category="lists" selector="doAddTo` +
        `List" primitive="doAddToList"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s">thing</input><input ty` +
        `pe="%l" readonly="true"></input></inputs></block-definition><block-d` +
        `efinition s="delete %#1 of %#2" type="command" category="lists" sele` +
        `ctor="doDeleteFromList" primitive="doDeleteFromList"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>1<options>1=1&#xD;last=$_last&#xD;&#126;&#xD;all=$_all</options></i` +
        `nput><input type="%l" readonly="true"></input></inputs></block-defin` +
        `ition><block-definition s="insert %#1 at %#2 of %#3" type="command" ` +
        `category="lists" selector="doInsertInList" primitive="doInsertInList` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s">thing</input><input type="%n">1<options>1=1&#xD;la` +
        `st=$_last&#xD;random=$_random</options></input><input type="%l" read` +
        `only="true"></input></inputs></block-definition><block-definition s=` +
        `"replace item %#1 of %#2 with %#3" type="command" category="lists" s` +
        `elector="doReplaceInList" primitive="doReplaceInList"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options></input` +
        `><input type="%l" readonly="true"></input><input type="%s">thing</in` +
        `put></inputs></block-definition><block-definition s="numbers from %&` +
        `apos;start&apos; to %&apos;end&apos;" type="reporter" category="list` +
        `s" selector="reportNumbers" primitive="reportNumbers"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">1</input><input type="%n">10</input><input type="%n">1</input><inp` +
        `ut type="%n">10</input></inputs><scripts><script x="10" y="91.833333` +
        `33333331"><block s="doReport"><block s="reportHyperZip"><block s="re` +
        `ifyReporter"><script><block s="doDeclareVariables"><list><l>result</` +
        `l></list></block><block s="doSetVar"><l>result</l><block s="reportNe` +
        `wList"><list></list></block></block><block s="doWarp"><script><block` +
        ` s="doFor"><l>i</l><l></l><l></l><script><block s="doAddToList"><blo` +
        `ck var="i"/><block var="result"/></block></script></block></script><` +
        `/block><block s="doReport"><block var="result"/></block></script><li` +
        `st></list></block><block var="start"/><l>0</l><block var="end"/><l>0` +
        `</l></block></block></script></scripts></block-definition><block-def` +
        `inition s="append %&apos;lists&apos;" type="reporter" category="list` +
        `s" selector="reportConcatenatedLists" primitive="reportConcatenatedL` +
        `ists"><header></header><code></code><translations></translations><in` +
        `puts><input type="%mult%l" readonly="true" initial="2"></input><inpu` +
        `t type="%mult%l" readonly="true" initial="2"></input></inputs><scrip` +
        `ts><script x="10" y="91.83333333333331"><block s="doDeclareVariables` +
        `"><list><l>result</l></list></block><block s="doSetVar"><l>result</l` +
        `><block s="reportNewList"><list></list></block></block><block s="doW` +
        `arp"><script><block s="doForEach"><l>list</l><block var="lists"/><sc` +
        `ript><block s="doForEach"><l>item</l><block var="list"/><script><blo` +
        `ck s="doAddToList"><block var="item"/><block var="result"/></block><` +
        `/script></block></script></block></script></block><block s="doReport` +
        `"><block var="result"/></block></script></scripts></block-definition` +
        `><block-definition s="combinations %&apos;lists&apos;" type="reporte` +
        `r" category="lists" selector="reportCrossproduct" primitive="reportC` +
        `rossproduct"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%l" readonly="true" initial="2"></inpu` +
        `t><input type="%mult%l" readonly="true" initial="2"></input></inputs` +
        `><scripts><script x="10" y="91.83333333333331"><block s="doReport"><` +
        `block s="reportIfElse"><block s="reportListIsEmpty"><block var="list` +
        `s"/></block><block s="reportNewList"><list><block s="reportNewList">` +
        `<list></list></block></list></block><block s="reportConcatenatedList` +
        `s"><block s="reportMap"><block s="reifyReporter"><autolambda><block ` +
        `s="reportMap"><block s="reifyReporter"><autolambda><block s="reportC` +
        `ONS"><block var="first"/><l/></block></autolambda><list></list></blo` +
        `ck><block s="reportCrossproduct"><block s="reportCDR"><block var="li` +
        `sts"/></block></block></block></autolambda><list><l>first</l></list>` +
        `</block><block s="reportListItem"><l>1</l><block var="lists"/></bloc` +
        `k></block></block></block></block></script></scripts></block-definit` +
        `ion><block-definition s="transpose %#1" type="reporter" category="li` +
        `sts" selector="reportTranspose" primitive="reportTranspose"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%l" readonly="true"></input></inputs></block-definition><block-d` +
        `efinition s="reshape %#1 to %#2" type="reporter" category="lists" se` +
        `lector="reportReshape" primitive="reportReshape"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s"></i` +
        `nput><input type="%mult%n" readonly="true" initial="2">4&#xD;3</inpu` +
        `t></inputs></block-definition><block-definition s="map %&apos;ring&a` +
        `pos; over %&apos;data&apos;" type="reporter" category="lists" select` +
        `or="reportMap" primitive="reportMap"><header></header><code></code><` +
        `translations></translations><inputs><input type="%repRing" readonly=` +
        `"true" irreplaceable="true"></input><input type="%l" readonly="true"` +
        `></input><input type="%repRing" readonly="true" irreplaceable="true"` +
        `></input><input type="%l" readonly="true"></input></inputs><scripts>` +
        `<script x="10" y="91.83333333333331"><block s="doDeclareVariables"><` +
        `list><l>result</l><l>implicit?</l></list></block><block s="doSetVar"` +
        `><l>result</l><block s="reportNewList"><list></list></block></block>` +
        `<block s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><bl` +
        `ock s="reportAttributeOf"><l><option>input names</option></l><block ` +
        `var="ring"/></block></block></block><block s="doWarp"><script><block` +
        ` s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><option` +
        `>length</option></l><block var="data"/></block><script><block s="doA` +
        `ddToList"><block s="evaluate"><block var="ring"/><block s="reportIfE` +
        `lse"><block var="implicit?"/><block s="reportNewList"><list><block s` +
        `="reportListItem"><block var="i"/><block var="data"/></block></list>` +
        `</block><block s="reportNewList"><list><block s="reportListItem"><bl` +
        `ock var="i"/><block var="data"/></block><block var="i"/><block var="` +
        `data"/></list></block></block></block><block var="result"/></block><` +
        `/script></block></script></block><block s="doReport"><block var="res` +
        `ult"/></block></script></scripts></block-definition><block-definitio` +
        `n s="$blitz map %#1 over %#2" type="reporter" category="lists" selec` +
        `tor="reportAtomicMap" primitive="reportAtomicMap"><header></header><` +
        `code></code><translations></translations><inputs><input type="%repRi` +
        `ng" readonly="true" irreplaceable="true"></input><input type="%l" re` +
        `adonly="true"></input></inputs></block-definition><block-definition ` +
        `s="keep items %&apos;ring&apos; from %&apos;data&apos;" type="report` +
        `er" category="lists" selector="reportKeep" primitive="reportKeep"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%predRing" readonly="true" irreplaceable="true"></input><i` +
        `nput type="%l" readonly="true"></input><input type="%predRing" reado` +
        `nly="true" irreplaceable="true"></input><input type="%l" readonly="t` +
        `rue"></input></inputs><scripts><script x="10" y="91.83333333333331">` +
        `<block s="doDeclareVariables"><list><l>result</l><l>implicit?</l></l` +
        `ist></block><block s="doSetVar"><l>result</l><block s="reportNewList` +
        `"><list></list></block></block><block s="doSetVar"><l>implicit?</l><` +
        `block s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>` +
        `input names</option></l><block var="ring"/></block></block></block><` +
        `block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="` +
        `reportListAttribute"><l><option>length</option></l><block var="data"` +
        `/></block><script><block s="doIf"><block s="evaluate"><block var="ri` +
        `ng"/><block s="reportIfElse"><block var="implicit?"/><block s="repor` +
        `tNewList"><list><block s="reportListItem"><block var="i"/><block var` +
        `="data"/></block></list></block><block s="reportNewList"><list><bloc` +
        `k s="reportListItem"><block var="i"/><block var="data"/></block><blo` +
        `ck var="i"/><block var="data"/></list></block></block></block><scrip` +
        `t><block s="doAddToList"><block s="reportListItem"><block var="i"/><` +
        `block var="data"/></block><block var="result"/></block></script><lis` +
        `t></list></block></script></block></script></block><block s="doRepor` +
        `t"><block var="result"/></block></script></scripts></block-definitio` +
        `n><block-definition s="$blitz keep items %#1 from %#2" type="reporte` +
        `r" category="lists" selector="reportAtomicKeep" primitive="reportAto` +
        `micKeep"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%predRing" readonly="true" irreplaceable="true"` +
        `></input><input type="%l" readonly="true"></input></inputs></block-d` +
        `efinition><block-definition s="find first item %&apos;ring&apos; in ` +
        `%&apos;data&apos;" type="reporter" category="lists" selector="report` +
        `FindFirst" primitive="reportFindFirst"><header></header><code></code` +
        `><translations></translations><inputs><input type="%predRing" readon` +
        `ly="true" irreplaceable="true"></input><input type="%l" readonly="tr` +
        `ue"></input><input type="%predRing" readonly="true" irreplaceable="t` +
        `rue"></input><input type="%l" readonly="true"></input></inputs><scri` +
        `pts><script x="10" y="91.83333333333331"><block s="doDeclareVariable` +
        `s"><list><l>implicit?</l></list></block><block s="doSetVar"><l>impli` +
        `cit?</l><block s="reportListIsEmpty"><block s="reportAttributeOf"><l` +
        `><option>input names</option></l><block var="ring"/></block></block>` +
        `</block><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><` +
        `block s="reportListAttribute"><l><option>length</option></l><block v` +
        `ar="data"/></block><script><block s="doIf"><block s="evaluate"><bloc` +
        `k var="ring"/><block s="reportIfElse"><block var="implicit?"/><block` +
        ` s="reportNewList"><list><block s="reportListItem"><block var="i"/><` +
        `block var="data"/></block></list></block><block s="reportNewList"><l` +
        `ist><block s="reportListItem"><block var="i"/><block var="data"/></b` +
        `lock><block var="i"/><block var="data"/></list></block></block></blo` +
        `ck><script><block s="doReport"><block s="reportListItem"><block var=` +
        `"i"/><block var="data"/></block></block></script><list></list></bloc` +
        `k></script></block></script></block><block s="doReport"><l></l></blo` +
        `ck></script></scripts></block-definition><block-definition s="$blitz` +
        ` find first item %#1 in %#2" type="reporter" category="lists" select` +
        `or="reportAtomicFindFirst" primitive="reportAtomicFindFirst"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%predRing" readonly="true" irreplaceable="true"></input><input ` +
        `type="%l" readonly="true"></input></inputs></block-definition><block` +
        `-definition s="combine %&apos;data&apos; using %&apos;ring&apos;" ty` +
        `pe="reporter" category="lists" selector="reportCombine" primitive="r` +
        `eportCombine"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%l" readonly="true"></input><input type="%` +
        `repRing" readonly="true" irreplaceable="true"></input><input type="%` +
        `l" readonly="true"></input><input type="%repRing" readonly="true" ir` +
        `replaceable="true"></input></inputs><scripts><script x="10" y="91.83` +
        `333333333331"><block s="doIf"><block s="reportListIsEmpty"><block va` +
        `r="data"/></block><script><block s="doReport"><l>0</l></block></scri` +
        `pt><list><block s="reportVariadicEquals"><list><block s="reportListA` +
        `ttribute"><l><option>length</option></l><block var="data"/></block><` +
        `l>1</l></list></block><script><block s="doReport"><block s="reportLi` +
        `stItem"><l>1</l><block var="data"/></block></block></script></list><` +
        `/block><block s="doReport"><block s="evaluate"><block var="ring"/><l` +
        `ist><block s="reportListItem"><l>1</l><block var="data"/></block><bl` +
        `ock s="evaluate"><block s="reportEnvironment"><l><option>script</opt` +
        `ion></l></block><list><block s="reportCDR"><block var="data"/></bloc` +
        `k><block var="ring"/></list></block></list></block></block></script>` +
        `</scripts></block-definition><block-definition s="$blitz combine %#1` +
        ` using %#2" type="reporter" category="lists" selector="reportAtomicC` +
        `ombine" primitive="reportAtomicCombine"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%l" readonly="tr` +
        `ue"></input><input type="%repRing" readonly="true" irreplaceable="tr` +
        `ue"></input></inputs></block-definition><block-definition s="for eac` +
        `h %&apos;item&apos; in %&apos;data&apos; %&apos;action&apos;" type="` +
        `command" category="lists" selector="doForEach" primitive="doForEach"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%upvar" readonly="true" irreplaceable="true">item</inpu` +
        `t><input type="%l" readonly="true"></input><input type="%loop" reado` +
        `nly="true" irreplaceable="true"></input><input type="%upvar" readonl` +
        `y="true" irreplaceable="true">item</input><input type="%l" readonly=` +
        `"true"></input><input type="%loop" readonly="true" irreplaceable="tr` +
        `ue"></input></inputs><scripts><script x="10" y="97.83333333333331"><` +
        `block s="doReport"><block s="reportMap"><block s="reifyReporter"><sc` +
        `ript><block s="doSetVar"><l>item</l><l></l></block><block s="doRun">` +
        `<block var="action"/><list></list></block><block s="doReport"><l>0</` +
        `l></block></script><list></list></block><block var="data"/></block><` +
        `/block></script></scripts></block-definition><block-definition s="sh` +
        `ow table %#1" type="command" category="lists" selector="doShowTable"` +
        ` primitive="doShowTable"><header></header><code></code><translations` +
        `></translations><inputs><input type="%l" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="map %#1 to %#2 %#3" ty` +
        `pe="command" category="other" selector="doMapCodeOrHeader" primitive` +
        `="doMapCodeOrHeader"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%cmdRing" readonly="true"></input><` +
        `input type="%s" readonly="true">$_code<options>code=$_code&#xD;heade` +
        `r=$_header</options></input><input type="%mlt"></input></inputs></bl` +
        `ock-definition><block-definition s="map %#1 to code %#2" type="comma` +
        `nd" category="other" selector="doMapValueCode" primitive="doMapValue` +
        `Code"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true">$_String<` +
        `options>String=$_String&#xD;Number=$_Number&#xD;true=$_true&#xD;fals` +
        `e=$_false</options></input><input type="%mlt">&lt;#1&gt;</input></in` +
        `puts></block-definition><block-definition s="map %#1 of %#2 to code ` +
        `%#3" type="command" category="other" selector="doMapListCode" primit` +
        `ive="doMapListCode"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true"><options>list=$_` +
        `list&#xD;item=$_item&#xD;delimiter=$_delimiter</options></input><inp` +
        `ut type="%s" readonly="true"><options>collection=$_collection&#xD;va` +
        `riables=$_variables&#xD;parameters=$_parameters</options></input><in` +
        `put type="%mlt"></input></inputs></block-definition><block-definitio` +
        `n s="code of %#1" type="reporter" category="other" selector="reportM` +
        `appedCode" primitive="reportMappedCode"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%cmdRing" readon` +
        `ly="true"></input></inputs></block-definition><block-definition s="p` +
        `rimitive %#1" type="command" category="other" selector="doPrimitive"` +
        ` primitive="doPrimitive"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true"><options>§_primitivesMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="extension %#1 %#2" type="command" ` +
        `category="other" selector="doApplyExtension" primitive="doApplyExten` +
        `sion"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true"><options>` +
        `§_extensionsMenu</options></input><input type="%mult%s" readonly="tr` +
        `ue"></input></inputs></block-definition><block-definition s="extensi` +
        `on %#1 %#2" type="reporter" category="other" selector="reportApplyEx` +
        `tension" primitive="reportApplyExtension"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true"><options>§_extensionsMenu</options></inpu` +
        `t><input type="%mult%s" readonly="true"></input></inputs></block-def` +
        `inition><block-definition s="set video transparency to %#1" type="co` +
        `mmand" category="sensing" selector="doSetVideoTransparency" primitiv` +
        `e="doSetVideoTransparency"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n">50</input></inputs></bloc` +
        `k-definition><block-definition s="video %#1 on %#2" type="reporter" ` +
        `category="sensing" selector="reportVideo" primitive="reportVideo"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true">$_motion<options>` +
        `snap=$_snap&#xD;motion=$_motion&#xD;direction=$_direction</options><` +
        `/input><input type="%s" readonly="true">$_myself<options>§_objectsMe` +
        `nuWithSelf</options></input></inputs></block-definition></primitives` +
        `></blocks>`,
        this.stage
    );
};
