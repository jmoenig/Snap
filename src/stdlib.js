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
        `t=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$` +
        `_random</options></input></inputs><script><block s="doFaceTowards"><` +
        `block s="reportVariadicSum"><list><block s="getPosition"></block><bl` +
        `ock s="reportIfElse"><block s="reportVariadicEquals"><list><block s=` +
        `"reportJoinWords"><list><block var="angle"/></list></block><l>random` +
        `</l></list></block><block s="reportNewList"><list><block s="reportMo` +
        `nadic"><l><option>sin</option></l><block s="reportRandom"><l>0.1</l>` +
        `<l>360.1</l></block></block><block s="reportMonadic"><l><option>cos<` +
        `/option></l><block s="reportRandom"><l>0.1</l><l>360.1</l></block></` +
        `block></list></block><block s="reportNewList"><list><block s="report` +
        `Monadic"><l><option>sin</option></l><block var="angle"/></block><blo` +
        `ck s="reportMonadic"><l><option>cos</option></l><block var="angle"/>` +
        `</block></list></block></block></list></block></block></script></blo` +
        `ck-definition><block-definition s="point towards %#1" type="command"` +
        ` category="motion" selector="doFaceTowards" primitive="doFaceTowards` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true">$_mouse-pointer<options>§_destinat` +
        `ionsMenu</options></input></inputs></block-definition><block-definit` +
        `ion s="go to x: %&apos;x&apos; y: %&apos;y&apos;" type="command" cat` +
        `egory="motion" selector="gotoXY"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">0</input><input typ` +
        `e="%n">0</input><input type="%n">0</input><input type="%n">0</input>` +
        `<input type="%n">0</input></inputs><script><block s="doGotoObject"><` +
        `block s="reportNewList"><list><block var="x"/><block var="y"/></list` +
        `></block></block></script></block-definition><block-definition s="go` +
        ` to %#1" type="command" category="motion" selector="doGotoObject" pr` +
        `imitive="doGotoObject"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true">$_random posi` +
        `tion<options>§_destinationsMenu</options></input></inputs></block-de` +
        `finition><block-definition s="glide %&apos;span&apos; secs to x: %&a` +
        `pos;x&apos; y: %&apos;y&apos;" type="command" category="motion" sele` +
        `ctor="doGlide"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">1</input><input type="%n">0</input><i` +
        `nput type="%n">0</input><input type="%n">1</input><input type="%n">0` +
        `</input><input type="%n">0</input><input type="%n">1</input></inputs` +
        `><script><block s="doDeclareVariables"><list><l>pos</l><l>start</l><` +
        `l>fract</l></list></block><block s="doSetVar"><l>pos</l><block s="ge` +
        `tPosition"></block></block><block s="doSetVar"><l>start</l><block s=` +
        `"reportDate"><l><option>time in milliseconds</option></l></block></b` +
        `lock><block s="doUntil"><block s="reportVariadicGreaterThanOrEquals"` +
        `><list><block var="fract"/><l>1</l></list></block><script><block s="` +
        `doSetVar"><l>fract</l><block s="reportQuotient"><block s="reportDiff` +
        `erence"><block s="reportDate"><l><option>time in milliseconds</optio` +
        `n></l></block><block var="start"/></block><block s="reportVariadicPr` +
        `oduct"><list><block var="span"/><l>1000</l></list></block></block></` +
        `block><block s="doGotoObject"><block s="reportVariadicSum"><list><bl` +
        `ock var="pos"/><block s="reportVariadicProduct"><list><block s="repo` +
        `rtDifference"><block s="reportNewList"><list><block var="x"/><block ` +
        `var="y"/></list></block><block var="pos"/></block><block var="fract"` +
        `/></list></block></list></block></block></script></block><block s="g` +
        `otoXY"><block var="x"/><block var="y"/></block></script></block-defi` +
        `nition><block-definition s="change x by %&apos;delta&apos;" type="co` +
        `mmand" category="motion" selector="changeXPosition"><header></header` +
        `><code></code><translations></translations><inputs><input type="%n">` +
        `10</input><input type="%n">10</input><input type="%n">10</input></in` +
        `puts><script><block s="setXPosition"><block s="reportVariadicSum"><l` +
        `ist><block s="xPosition"></block><block var="delta"/></list></block>` +
        `</block></script></block-definition><block-definition s="set x to %&` +
        `apos;x&apos;" type="command" category="motion" selector="setXPositio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s><input type="%n">0</input><input type="%n">0</input><input type="%` +
        `n">0</input></inputs><script><block s="doGotoObject"><block s="repor` +
        `tNewList"><list><block var="x"/><block s="yPosition"></block></list>` +
        `</block></block></script></block-definition><block-definition s="cha` +
        `nge y by %&apos;delta&apos;" type="command" category="motion" select` +
        `or="changeYPosition"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%n">10</input><input type="%n">10</` +
        `input><input type="%n">10</input></inputs><script><block s="setYPosi` +
        `tion"><block s="reportVariadicSum"><list><block s="yPosition"></bloc` +
        `k><block var="delta"/></list></block></block></script></block-defini` +
        `tion><block-definition s="set y to %&apos;y&apos;" type="command" ca` +
        `tegory="motion" selector="setYPosition"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">0</input><in` +
        `put type="%n">0</input><input type="%n">0</input></inputs><script><b` +
        `lock s="doGotoObject"><block s="reportNewList"><list><block s="xPosi` +
        `tion"></block><block var="y"/></list></block></block></script></bloc` +
        `k-definition><block-definition s="if on edge, bounce" type="command"` +
        ` category="motion" selector="bounceOffEdge"><header></header><code><` +
        `/code><translations></translations><inputs></inputs><script><block s` +
        `="doIf"><block s="reportTouchingObject"><l><option>edge</option></l>` +
        `</block><script><block s="doDeclareVariables"><list><l>get bounds</l` +
        `><l>bounds</l><l>center</l><l>stage bounds</l><l>dir x</l><l>dir y</` +
        `l><l>delta x</l><l>delta y</l></list></block><block s="doSetVar"><l>` +
        `get bounds</l><block s="reifyReporter"><autolambda><block s="reportN` +
        `ewList"><list><block s="reportVariadicMin"><block s="reportCONS"><bl` +
        `ock s="reportNewList"><list><block s="reportGet"><l><option>left</op` +
        `tion></l></block><block s="reportGet"><l><option>bottom</option></l>` +
        `</block></list></block><block s="reportMap"><block s="reifyReporter"` +
        `><autolambda><block s="reportNewList"><list><block s="reportAttribut` +
        `eOf"><l><option>left</option></l><l></l></block><block s="reportAttr` +
        `ibuteOf"><l><option>bottom</option></l><l></l></block></list></block` +
        `></autolambda><list></list></block><block s="reportGet"><l><option>p` +
        `arts</option></l></block></block></block></block><block s="reportVar` +
        `iadicMax"><block s="reportCONS"><block s="reportNewList"><list><bloc` +
        `k s="reportGet"><l><option>right</option></l></block><block s="repor` +
        `tGet"><l><option>top</option></l></block></list></block><block s="re` +
        `portMap"><block s="reifyReporter"><autolambda><block s="reportNewLis` +
        `t"><list><block s="reportAttributeOf"><l><option>right</option></l><` +
        `l></l></block><block s="reportAttributeOf"><l><option>top</option></` +
        `l><l></l></block></list></block></autolambda><list></list></block><b` +
        `lock s="reportGet"><l><option>parts</option></l></block></block></bl` +
        `ock></block></list></block></autolambda><list></list></block></block` +
        `><block s="doSetVar"><l>bounds</l><block s="evaluate"><block var="ge` +
        `t bounds"/><list></list></block></block><block s="doSetVar"><l>cente` +
        `r</l><block s="reportQuotient"><block s="reportVariadicSum"><block v` +
        `ar="bounds"/></block><l>2</l></block></block><block s="doSetVar"><l>` +
        `stage bounds</l><block s="reportAskFor"><block s="reportGet"><l><opt` +
        `ion>stage</option></l></block><block s="reifyReporter"><autolambda><` +
        `block s="reportNewList"><list><block s="reportNewList"><list><block ` +
        `s="reportGet"><l><option>left</option></l></block><block s="reportGe` +
        `t"><l><option>bottom</option></l></block></list></block><block s="re` +
        `portNewList"><list><block s="reportGet"><l><option>right</option></l` +
        `></block><block s="reportGet"><l><option>top</option></l></block></l` +
        `ist></block></list></block></autolambda><list></list></block><list><` +
        `/list></block></block><block s="doSetVar"><l>dir x</l><block s="repo` +
        `rtMonadic"><l><option>sin</option></l><block s="direction"></block><` +
        `/block></block><block s="doSetVar"><l>dir y</l><block s="reportMonad` +
        `ic"><l><option>cos</option></l><block s="direction"></block></block>` +
        `</block><block s="doIf"><block s="reportVariadicLessThan"><list><blo` +
        `ck s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><blo` +
        `ck var="bounds"/></block></block><block s="reportListItem"><l>1</l><` +
        `block s="reportListItem"><l>1</l><block var="stage bounds"/></block>` +
        `</block></list></block><script><block s="doSetVar"><l>dir x</l><bloc` +
        `k s="reportMonadic"><l><option>abs</option></l><block var="dir x"/><` +
        `/block></block></script><list></list></block><block s="doIf"><block ` +
        `s="reportVariadicGreaterThan"><list><block s="reportListItem"><l>1</` +
        `l><block s="reportListItem"><l>2</l><block var="bounds"/></block></b` +
        `lock><block s="reportListItem"><l>1</l><block s="reportListItem"><l>` +
        `2</l><block var="stage bounds"/></block></block></list></block><scri` +
        `pt><block s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><opti` +
        `on>neg</option></l><block s="reportMonadic"><l><option>abs</option><` +
        `/l><block var="dir x"/></block></block></block></script><list></list` +
        `></block><block s="doIf"><block s="reportVariadicGreaterThan"><list>` +
        `<block s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l>` +
        `<block var="bounds"/></block></block><block s="reportListItem"><l>2<` +
        `/l><block s="reportListItem"><l>2</l><block var="stage bounds"/></bl` +
        `ock></block></list></block><script><block s="doSetVar"><l>dir y</l><` +
        `block s="reportMonadic"><l><option>neg</option></l><block s="reportM` +
        `onadic"><l><option>abs</option></l><block var="dir y"/></block></blo` +
        `ck></block></script><list></list></block><block s="doIf"><block s="r` +
        `eportVariadicLessThan"><list><block s="reportListItem"><l>2</l><bloc` +
        `k s="reportListItem"><l>1</l><block var="bounds"/></block></block><b` +
        `lock s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><b` +
        `lock var="stage bounds"/></block></block></list></block><script><blo` +
        `ck s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>abs<` +
        `/option></l><block var="dir y"/></block></block></script><list></lis` +
        `t></block><block s="setHeading"><block s="reportAtan2"><block var="d` +
        `ir x"/><block var="dir y"/></block></block><block s="doSetVar"><l>bo` +
        `unds</l><block s="evaluate"><block var="get bounds"/><list></list></` +
        `block></block><block s="doGotoObject"><block s="reportVariadicSum"><` +
        `list><block s="getPosition"></block><block s="reportDifference"><blo` +
        `ck var="center"/><block s="reportQuotient"><block s="reportVariadicS` +
        `um"><block var="bounds"/></block><l>2</l></block></block></list></bl` +
        `ock></block><block s="doSetVar"><l>bounds</l><block s="evaluate"><bl` +
        `ock var="get bounds"/><list></list></block></block><block s="doIf"><` +
        `block s="reportVariadicGreaterThan"><list><block s="reportListItem">` +
        `<l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/></blo` +
        `ck></block><block s="reportListItem"><l>1</l><block s="reportListIte` +
        `m"><l>2</l><block var="stage bounds"/></block></block></list></block` +
        `><script><block s="doSetVar"><l>delta x</l><block s="reportDifferenc` +
        `e"><block s="reportListItem"><l>1</l><block s="reportListItem"><l>2<` +
        `/l><block var="stage bounds"/></block></block><block s="reportListIt` +
        `em"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/><` +
        `/block></block></block></block></script><list></list></block><block ` +
        `s="doIf"><block s="reportVariadicLessThan"><list><block s="reportLis` +
        `tItem"><l>2</l><block s="reportListItem"><l>1</l><block var="bounds"` +
        `/></block></block><block s="reportListItem"><l>2</l><block s="report` +
        `ListItem"><l>1</l><block var="stage bounds"/></block></block></list>` +
        `</block><script><block s="doSetVar"><l>delta y</l><block s="reportDi` +
        `fference"><block s="reportListItem"><l>2</l><block s="reportListItem` +
        `"><l>1</l><block var="stage bounds"/></block></block><block s="repor` +
        `tListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="bou` +
        `nds"/></block></block></block></block></script><list></list></block>` +
        `<block s="doIf"><block s="reportVariadicLessThan"><list><block s="re` +
        `portListItem"><l>1</l><block s="reportListItem"><l>1</l><block var="` +
        `bounds"/></block></block><block s="reportListItem"><l>1</l><block s=` +
        `"reportListItem"><l>1</l><block var="stage bounds"/></block></block>` +
        `</list></block><script><block s="doSetVar"><l>delta x</l><block s="r` +
        `eportDifference"><block s="reportListItem"><l>1</l><block s="reportL` +
        `istItem"><l>1</l><block var="stage bounds"/></block></block><block s` +
        `="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><block v` +
        `ar="bounds"/></block></block></block></block></script><list></list><` +
        `/block><block s="doIf"><block s="reportVariadicGreaterThan"><list><b` +
        `lock s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><b` +
        `lock var="bounds"/></block></block><block s="reportListItem"><l>2</l` +
        `><block s="reportListItem"><l>2</l><block var="stage bounds"/></bloc` +
        `k></block></list></block><script><block s="doSetVar"><l>delta y</l><` +
        `block s="reportDifference"><block s="reportListItem"><l>2</l><block ` +
        `s="reportListItem"><l>2</l><block var="stage bounds"/></block></bloc` +
        `k><block s="reportListItem"><l>2</l><block s="reportListItem"><l>2</` +
        `l><block var="bounds"/></block></block></block></block></script><lis` +
        `t></list></block><block s="doGotoObject"><block s="reportVariadicSum` +
        `"><list><block s="getPosition"></block><block s="reportNewList"><lis` +
        `t><block var="delta x"/><block var="delta y"/></list></block></list>` +
        `</block></block></script><list></list></block></script></block-defin` +
        `ition><block-definition s="position" type="reporter" category="motio` +
        `n" selector="getPosition"><header></header><code></code><translation` +
        `s></translations><inputs></inputs><script><block s="doReport"><block` +
        ` s="reportNewList"><list><block s="xPosition"></block><block s="yPos` +
        `ition"></block></list></block></block></script></block-definition><b` +
        `lock-definition s="x position" type="reporter" category="motion" sel` +
        `ector="xPosition" primitive="xPosition"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="y position" type="reporter" category="motion" se` +
        `lector="yPosition" primitive="yPosition"><header></header><code></co` +
        `de><translations></translations><inputs></inputs></block-definition>` +
        `<block-definition s="direction" type="reporter" category="motion" se` +
        `lector="direction" primitive="direction"><header></header><code></co` +
        `de><translations></translations><inputs></inputs></block-definition>` +
        `<block-definition s="switch to costume %#1" type="command" category=` +
        `"looks" selector="doSwitchToCostume" primitive="doSwitchToCostume"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true"><options>§_costumesMenu</options></in` +
        `put></inputs></block-definition><block-definition s="next costume" t` +
        `ype="command" category="looks" selector="doWearNextCostume"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `<script><block s="doIf"><block s="reportVariadicGreaterThan"><list><` +
        `block s="getCostumeIdx"></block><l>0</l></list></block><script><bloc` +
        `k s="doSwitchToCostume"><block s="reportVariadicSum"><list><block s=` +
        `"reportModulus"><block s="getCostumeIdx"></block><block s="reportLis` +
        `tAttribute"><l><option>length</option></l><block s="reportGet"><l><o` +
        `ption>costumes</option></l></block></block></block><l>1</l></list></` +
        `block></block></script><list></list></block></script></block-definit` +
        `ion><block-definition s="costume #" type="reporter" category="looks"` +
        ` selector="getCostumeIdx"><header></header><code></code><translation` +
        `s></translations><inputs></inputs><script><block s="doReport"><block` +
        ` s="reportListIndex"><block s="reportGet"><l><option>costume</option` +
        `></l></block><block s="reportGet"><l><option>costumes</option></l></` +
        `block></block></block></script></block-definition><block-definition ` +
        `s="%#1 of costume %#2" type="reporter" category="looks" selector="re` +
        `portGetImageAttribute" primitive="reportGetImageAttribute"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_width<options>name=$_n` +
        `ame&#xD;width=$_width&#xD;height=$_height&#xD;pixels=$_pixels</optio` +
        `ns></input><input type="%s" readonly="true">$_current<options>§_cost` +
        `umesMenu</options></input></inputs></block-definition><block-definit` +
        `ion s="new costume %#1 width %#2 height %#3" type="reporter" categor` +
        `y="looks" selector="reportNewCostume" primitive="reportNewCostume"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%l" readonly="true"></input><input type="%n"><options>a L` +
        `ist [2 elements]</options></input><input type="%n"><options>a List [` +
        `2 elements]</options></input></inputs></block-definition><block-defi` +
        `nition s="stretch %#1 x: %#2 y: %#3 %" type="reporter" category="loo` +
        `ks" selector="reportNewCostumeStretched" primitive="reportNewCostume` +
        `Stretched"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true">$_current<options>§_costu` +
        `mesMenu</options></input><input type="%n">100</input><input type="%n` +
        `">50</input></inputs></block-definition><block-definition s="skew %#` +
        `1 to %#2 degrees %#3 %" type="reporter" category="looks" selector="r` +
        `eportNewCostumeSkewed" primitive="reportNewCostumeSkewed"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true">$_current<options>§_costumesMenu</options></in` +
        `put><input type="%n">0<options>§_dir=&#xD;(90) right=90&#xD;(-90) le` +
        `ft=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$_random</options>` +
        `</input><input type="%n">50</input></inputs></block-definition><bloc` +
        `k-definition s="say %&apos;msg&apos; for %&apos;time&apos; secs" typ` +
        `e="command" category="looks" selector="doSayFor"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s">Hel` +
        `lo!</input><input type="%n">2</input><input type="%s">Hello!</input>` +
        `<input type="%n">2</input><input type="%s">Hello!</input></inputs><s` +
        `cript><block s="bubble"><block var="msg"/></block><block s="doWait">` +
        `<block var="time"/></block><block s="bubble"><l></l></block></script` +
        `></block-definition><block-definition s="say %#1" type="command" cat` +
        `egory="looks" selector="bubble" primitive="bubble"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s">H` +
        `ello!</input></inputs></block-definition><block-definition s="think ` +
        `%&apos;msg&apos; for %&apos;time&apos; secs" type="command" category` +
        `="looks" selector="doThinkFor"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s">Hmm...</input><input ` +
        `type="%n">2</input><input type="%s">Hmm...</input><input type="%n">2` +
        `</input><input type="%s">Hmm...</input></inputs><script><block s="do` +
        `Think"><block var="msg"/></block><block s="doWait"><block var="time"` +
        `/></block><block s="doThink"><l></l></block></script></block-definit` +
        `ion><block-definition s="think %#1" type="command" category="looks" ` +
        `selector="doThink" primitive="doThink"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s">Hmm...</input` +
        `></inputs></block-definition><block-definition s="change %&apos;effe` +
        `ct name&apos; effect by %&apos;delta&apos;" type="command" category=` +
        `"looks" selector="changeEffect" primitive="changeEffect"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true" irreplaceable="true">$_ghost<options>color=$_co` +
        `lor&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghos` +
        `t=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pix` +
        `elate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><` +
        `input type="%n">25</input><input type="%s" readonly="true" irreplace` +
        `able="true">$_ghost<options>color=$_color&#xD;saturation=$_saturatio` +
        `n&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fishey` +
        `e&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;` +
        `negative=$_negative</options></input><input type="%n">25</input><inp` +
        `ut type="%s" readonly="true" irreplaceable="true">ghost<options>colo` +
        `r&#xD;saturation&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;` +
        `pixelate&#xD;mosaic&#xD;negative</options></input></inputs></block-d` +
        `efinition><block-definition s="set %#1 effect to %#2" type="command"` +
        ` category="looks" selector="setEffect" primitive="setEffect"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_ghost<options>color=` +
        `$_color&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;` +
        `ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$` +
        `_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></inp` +
        `ut><input type="%n">0</input></inputs></block-definition><block-defi` +
        `nition s="%#1 effect" type="reporter" category="looks" selector="get` +
        `Effect" primitive="getEffect"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">$_ghost<options>color=$_color&#xD;saturation=$_satura` +
        `tion&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fis` +
        `heye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#` +
        `xD;negative=$_negative</options></input></inputs></block-definition>` +
        `<block-definition s="clear graphic effects" type="command" category=` +
        `"looks" selector="clearEffects" primitive="clearEffects"><header></h` +
        `eader><code></code><translations></translations><inputs></inputs></b` +
        `lock-definition><block-definition s="change size by %&apos;delta&apo` +
        `s;" type="command" category="looks" selector="changeScale"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n">10</input><input type="%n">10</input><input type="%n">10</inp` +
        `ut></inputs><script><block s="setScale"><block s="reportVariadicSum"` +
        `><list><block s="getScale"></block><block var="delta"/></list></bloc` +
        `k></block></script></block-definition><block-definition s="set size ` +
        `to %#1 %" type="command" category="looks" selector="setScale" primit` +
        `ive="setScale"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">100</input></inputs></block-definitio` +
        `n><block-definition s="size" type="reporter" category="looks" select` +
        `or="getScale" primitive="getScale"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="show" type="command" category="looks" selector="show"` +
        ` primitive="show"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="hi` +
        `de" type="command" category="looks" selector="hide" primitive="hide"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="shown?" type="predi` +
        `cate" category="looks" selector="reportShown" primitive="reportShown` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="go to %&apos;name&` +
        `apos; layer" type="command" category="looks" selector="goToLayer" pr` +
        `imitive="goToLayer"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">$_front<options>front=$_front&#xD;back=$_back</options></input>` +
        `<input type="%s" readonly="true" irreplaceable="true">$_front<option` +
        `s>front=$_front&#xD;back=$_back</options></input><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_front<options>front=$_front&#xD` +
        `;back=$_back</options></input></inputs><scripts><script x="10" y="97` +
        `.83333333333331"><block s="doIfElse"><block s="reportVariadicEquals"` +
        `><list><block s="reportJoinWords"><list><block var="name"/></list></` +
        `block><l>back</l></list></block><script><block s="doWarp"><script><b` +
        `lock s="doUntil"><block s="reportVariadicEquals"><list><block s="rep` +
        `ortListIndex"><block s="reportGet"><l><option>self</option></l></blo` +
        `ck><block s="reportAskFor"><block s="reportGet"><l><option>stage</op` +
        `tion></l></block><block s="reifyReporter"><autolambda><block s="repo` +
        `rtGet"><l><option>other sprites</option></l></block></autolambda><li` +
        `st></list></block><list></list></block></block><l>1</l></list></bloc` +
        `k><script><block s="goBack"><l>1</l></block></script></block></scrip` +
        `t></block></script><script><block s="doWarp"><script><block s="doUnt` +
        `il"><block s="reportVariadicEquals"><list><block s="reportListIndex"` +
        `><block s="reportGet"><l><option>self</option></l></block><block s="` +
        `reportAskFor"><block s="reportGet"><l><option>stage</option></l></bl` +
        `ock><block s="reifyReporter"><autolambda><block s="reportGet"><l><op` +
        `tion>other sprites</option></l></block></autolambda><list></list></b` +
        `lock><list></list></block></block><block s="reportVariadicSum"><list` +
        `><block s="reportListAttribute"><l><option>length</option></l><block` +
        ` s="reportGet"><l><option>other sprites</option></l></block></block>` +
        `<l>1</l></list></block></list></block><script><block s="goBack"><l>-` +
        `1</l></block></script></block></script></block></script></block></sc` +
        `ript></scripts></block-definition><block-definition s="go back %#1 l` +
        `ayers" type="command" category="looks" selector="goBack" primitive="` +
        `goBack"><header></header><code></code><translations></translations><` +
        `inputs><input type="%n">1</input></inputs></block-definition><block-` +
        `definition s="save %#1 as costume named %#2" type="command" category` +
        `="looks" selector="doScreenshot" primitive="doScreenshot"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true">$_pen trails<options>pen trails=$_pen trails&#` +
        `xD;stage image=$_stage image</options></input><input type="%s">scree` +
        `nshot</input></inputs></block-definition><block-definition s="wardro` +
        `be" type="reporter" category="looks" selector="reportCostumes" primi` +
        `tive="reportCostumes"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="alert %#1" type="command" category="looks" selector="alert" primit` +
        `ive="alert"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%s" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="console log %#1" type="command` +
        `" category="looks" selector="log" primitive="log"><header></header><` +
        `code></code><translations></translations><inputs><input type="%mult%` +
        `s" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="play sound %#1" type="command" category="sound" selector="pl` +
        `aySound" primitive="playSound"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true"><opti` +
        `ons>§_soundsMenu</options></input></inputs></block-definition><block` +
        `-definition s="play sound %&apos;target&apos; until done" type="comm` +
        `and" category="sound" selector="doPlaySoundUntilDone" primitive="doP` +
        `laySoundUntilDone"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s" readonly="true"><options>§_sounds` +
        `Menu</options></input><input type="%s" readonly="true"><options>§_so` +
        `undsMenu</options></input><input type="%s" readonly="true"><options>` +
        `§_soundsMenu</options></input></inputs><script><block s="doDeclareVa` +
        `riables"><list><l>sound</l></list></block><block s="doSetVar"><l>sou` +
        `nd</l><block s="reportIfElse"><block s="reportIsA"><block var="targe` +
        `t"/><l><option>sound</option></l></block><block var="target"/><block` +
        ` s="reportIfElse"><block s="reportIsA"><block var="target"/><l><opti` +
        `on>list</option></l></block><block s="reportNewSoundFromSamples"><bl` +
        `ock var="target"/><l>44100</l></block><block s="reportFindFirst"><bl` +
        `ock s="reifyPredicate"><autolambda><block s="reportVariadicEquals"><` +
        `list><block s="reportGetSoundAttribute"><l><option>name</option></l>` +
        `<l></l></block><block var="target"/></list></block></autolambda><lis` +
        `t></list></block><block s="reportGet"><l><option>sounds</option></l>` +
        `</block></block></block></block></block><block s="doIf"><block s="re` +
        `portIsA"><block var="sound"/><l><option>sound</option></l></block><s` +
        `cript><block s="playSound"><block var="sound"/></block><block s="doW` +
        `ait"><block s="reportGetSoundAttribute"><l><option>duration</option>` +
        `</l><block var="sound"/></block></block></script><list></list></bloc` +
        `k></script><scripts><script x="10" y="98"><block s="doDeclareVariabl` +
        `es"><list><l>sound</l></list></block><block s="doSetVar"><l>sound</l` +
        `><block s="reportIfElse"><block s="reportIsA"><block var="target"/><` +
        `l><option>sound</option></l></block><block var="target"/><block s="r` +
        `eportIfElse"><block s="reportIsA"><block var="target"/><l><option>li` +
        `st</option></l></block><block s="reportNewSoundFromSamples"><block v` +
        `ar="target"/><l>44100</l></block><block s="reportFindFirst"><block s` +
        `="reifyPredicate"><autolambda><block s="reportVariadicEquals"><list>` +
        `<block s="reportGetSoundAttribute"><l><option>name</option></l><l></` +
        `l></block><block var="target"/></list></block></autolambda><list></l` +
        `ist></block><block s="reportGet"><l><option>sounds</option></l></blo` +
        `ck></block></block></block></block><block s="doIf"><block s="reportI` +
        `sA"><block var="sound"/><l><option>sound</option></l></block><script` +
        `><block s="playSound"><block var="sound"/></block><block s="doWait">` +
        `<block s="reportGetSoundAttribute"><l><option>duration</option></l><` +
        `block var="sound"/></block></block></script><list></list></block></s` +
        `cript></scripts></block-definition><block-definition s="play sound %` +
        `&apos;target&apos; at %&apos;rate&apos; Hz" type="command" category=` +
        `"sound" selector="doPlaySoundAtRate" primitive="doPlaySoundAtRate"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true"><options>§_soundsMenu</options></inpu` +
        `t><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&` +
        `#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></inpu` +
        `t><input type="%s" readonly="true"><options>§_soundsMenu</options></` +
        `input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44` +
        `100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></` +
        `input><input type="%s" readonly="true"><options>§_soundsMenu</option` +
        `s></input></inputs><script><block s="playSound"><block s="reportNewS` +
        `oundFromSamples"><block s="reportGetSoundAttribute"><l><option>sampl` +
        `es</option></l><block var="target"/></block><block var="rate"/></blo` +
        `ck></block></script><scripts><script x="10" y="98"><block s="playSou` +
        `nd"><block s="reportNewSoundFromSamples"><block s="reportGetSoundAtt` +
        `ribute"><l><option>samples</option></l><block var="target"/></block>` +
        `<block var="rate"/></block></block></script></scripts></block-defini` +
        `tion><block-definition s="stop all sounds" type="command" category="` +
        `sound" selector="doStopAllSounds" primitive="doStopAllSounds"><heade` +
        `r></header><code></code><translations></translations><inputs></input` +
        `s></block-definition><block-definition s="%#1 of sound %#2" type="re` +
        `porter" category="sound" selector="reportGetSoundAttribute" primitiv` +
        `e="reportGetSoundAttribute"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true" irreplac` +
        `eable="true">$_duration<options>name=$_name&#xD;duration=$_duration&` +
        `#xD;length=$_length&#xD;number of channels=$_number of channels&#xD;` +
        `sample rate=$_sample rate&#xD;samples=$_samples</options></input><in` +
        `put type="%s" readonly="true"><options>§_soundsMenu</options></input` +
        `></inputs></block-definition><block-definition s="new sound %#1 rate` +
        ` %#2 Hz" type="reporter" category="sound" selector="reportNewSoundFr` +
        `omSamples" primitive="reportNewSoundFromSamples"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%l" rea` +
        `donly="true"></input><input type="%n">44100<options>22.05 kHz=22050&` +
        `#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96` +
        `000</options></input></inputs></block-definition><block-definition s` +
        `="rest for %&apos;beats&apos; beats" type="command" category="sound"` +
        ` selector="doRest" primitive="doRest"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%n">0.2</input><in` +
        `put type="%n">0.2</input><input type="%n">0.2</input></inputs><scrip` +
        `ts><script x="10" y="97.83333333333331"><block s="doWait"><block s="` +
        `reportQuotient"><l>60</l><block s="reportVariadicProduct"><list><blo` +
        `ck var="beats"/><block s="getTempo"></block></list></block></block><` +
        `/block></script></scripts></block-definition><block-definition s="pl` +
        `ay note %#1 for %#2 beats" type="command" category="sound" selector=` +
        `"doPlayNote" primitive="doPlayNote"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%n">60<options>§_pia` +
        `noKeyboardMenu</options></input><input type="%n">0.5</input></inputs` +
        `></block-definition><block-definition s="play %#1 Hz for %#2 secs" t` +
        `ype="command" category="sound" selector="doPlayFrequency" primitive=` +
        `"doPlayFrequency"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n">440</input><input type="%n">2</inp` +
        `ut></inputs></block-definition><block-definition s="set instrument t` +
        `o %#1" type="command" category="sound" selector="doSetInstrument" pr` +
        `imitive="doSetInstrument"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">1<options>(1) sine=1&#xD;(` +
        `2) square=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</options></input><` +
        `/inputs></block-definition><block-definition s="change tempo by %&ap` +
        `os;delta&apos;" type="command" category="sound" selector="doChangeTe` +
        `mpo"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">20</input><input type="%n">20</input><input typ` +
        `e="%n">20</input></inputs><script><block s="doSetTempo"><block s="re` +
        `portVariadicSum"><list><block s="getTempo"></block><block var="delta` +
        `"/></list></block></block></script></block-definition><block-definit` +
        `ion s="set tempo to %#1 bpm" type="command" category="sound" selecto` +
        `r="doSetTempo" primitive="doSetTempo"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%n">60</input></in` +
        `puts></block-definition><block-definition s="tempo" type="reporter" ` +
        `category="sound" selector="getTempo" primitive="getTempo"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="change volume by %&apos;delta&` +
        `apos;" type="command" category="sound" selector="changeVolume"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">10</input><input type="%n">10</input><input type="%n">10<` +
        `/input></inputs><script><block s="setVolume"><block s="reportVariadi` +
        `cSum"><list><block s="getVolume"></block><block var="delta"/></list>` +
        `</block></block></script></block-definition><block-definition s="set` +
        ` volume to %#1 %" type="command" category="sound" selector="setVolum` +
        `e" primitive="setVolume"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n">100</input></inputs></block` +
        `-definition><block-definition s="volume" type="reporter" category="s` +
        `ound" selector="getVolume" primitive="getVolume"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="change balance by %&apos;delta&apos;" t` +
        `ype="command" category="sound" selector="changePan"><header></header` +
        `><code></code><translations></translations><inputs><input type="%n">` +
        `10</input><input type="%n">10</input><input type="%n">10</input></in` +
        `puts><script><block s="setPan"><block s="reportVariadicSum"><list><b` +
        `lock s="getPan"></block><block var="delta"/></list></block></block><` +
        `/script></block-definition><block-definition s="set balance to %#1" ` +
        `type="command" category="sound" selector="setPan" primitive="setPan"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%n">0</input></inputs></block-definition><block-definit` +
        `ion s="balance" type="reporter" category="sound" selector="getPan" p` +
        `rimitive="getPan"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="pl` +
        `ay frequency %#1 Hz" type="command" category="sound" selector="playF` +
        `req" primitive="playFreq"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">440</input></inputs></bloc` +
        `k-definition><block-definition s="stop frequency" type="command" cat` +
        `egory="sound" selector="stopFreq" primitive="stopFreq"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs></blo` +
        `ck-definition><block-definition s="jukebox" type="reporter" category` +
        `="sound" selector="reportSounds" primitive="reportSounds"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="clear" type="command" category` +
        `="pen" selector="clear" primitive="clear"><header></header><code></c` +
        `ode><translations></translations><inputs></inputs></block-definition` +
        `><block-definition s="pen down" type="command" category="pen" select` +
        `or="down" primitive="down"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="pen up" type="command" category="pen" selector="up" primitive` +
        `="up"><header></header><code></code><translations></translations><in` +
        `puts></inputs></block-definition><block-definition s="pen down?" typ` +
        `e="predicate" category="pen" selector="getPenDown" primitive="getPen` +
        `Down"><header></header><code></code><translations></translations><in` +
        `puts></inputs></block-definition><block-definition s="set pen color ` +
        `to %&apos;color&apos;" type="command" category="pen" selector="setCo` +
        `lor"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%clr" readonly="true" irreplaceable="true"></input>` +
        `<input type="%clr" readonly="true" irreplaceable="true"></input><inp` +
        `ut type="%clr" readonly="true" irreplaceable="true"></input></inputs` +
        `><script><block s="doApplyExtension"><l>clr_setpen(clr)</l><list><bl` +
        `ock var="color"/></list></block></script></block-definition><block-d` +
        `efinition s="set pen %#1 to %#2" type="command" category="pen" selec` +
        `tor="setPenColorDimension" primitive="setPenColorDimension"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hue` +
        `&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transpa` +
        `rency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options><` +
        `/input><input type="%n">50</input></inputs></block-definition><block` +
        `-definition s="change pen %&apos;aspect&apos; by %&apos;delta&apos;"` +
        ` type="command" category="pen" selector="changePenColorDimension" pr` +
        `imitive="changePenColorDimension"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturati` +
        `on&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&` +
        `#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10` +
        `</input><input type="%s" readonly="true" irreplaceable="true">$_hue<` +
        `options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brigh` +
        `tness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g` +
        `-b(-a)</options></input><input type="%n">10</input><input type="%s" ` +
        `readonly="true" irreplaceable="true">hue<options>hue&#xD;saturation&` +
        `#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></` +
        `input></inputs></block-definition><block-definition s="pen %#1" type` +
        `="reporter" category="pen" selector="getPenAttribute" primitive="get` +
        `PenAttribute"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true" irreplaceable="true">$` +
        `_hue<options>size=$_size&#xD;hue=$_hue&#xD;saturation=$_saturation&#` +
        `xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126` +
        `;&#xD;r-g-b-a=$_r-g-b-a</options></input></inputs></block-definition` +
        `><block-definition s="set background color to %#1" type="command" ca` +
        `tegory="pen" selector="setBackgroundColor" primitive="setBackgroundC` +
        `olor"><header></header><code></code><translations></translations><in` +
        `puts><input type="%clr" readonly="true" irreplaceable="true"></input` +
        `></inputs></block-definition><block-definition s="set background %#1` +
        ` to %#2" type="command" category="pen" selector="setBackgroundColorD` +
        `imension" primitive="setBackgroundColorDimension"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;satur` +
        `ation=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_tr` +
        `ansparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><in` +
        `put type="%n">50</input></inputs></block-definition><block-definitio` +
        `n s="change background %#1 by %#2" type="command" category="pen" sel` +
        `ector="changeBackgroundColorDimension" primitive="changeBackgroundCo` +
        `lorDimension"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true" irreplaceable="true">$` +
        `_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_` +
        `brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=` +
        `$_r-g-b(-a)</options></input><input type="%n">10</input></inputs></b` +
        `lock-definition><block-definition s="change pen size by %&apos;delta` +
        `&apos;" type="command" category="pen" selector="changeSize"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">1</input><input type="%n">1</input><input type="%n">1</input` +
        `></inputs><script><block s="setSize"><block s="reportVariadicSum"><l` +
        `ist><block s="getPenAttribute"><l><option>size</option></l></block><` +
        `block var="delta"/></list></block></block></script></block-definitio` +
        `n><block-definition s="set pen size to %#1" type="command" category=` +
        `"pen" selector="setSize" primitive="setSize"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n">1</inpu` +
        `t></inputs></block-definition><block-definition s="stamp" type="comm` +
        `and" category="pen" selector="doStamp" primitive="doStamp"><header><` +
        `/header><code></code><translations></translations><inputs></inputs><` +
        `/block-definition><block-definition s="fill" type="command" category` +
        `="pen" selector="floodFill" primitive="floodFill"><header></header><` +
        `code></code><translations></translations><inputs></inputs></block-de` +
        `finition><block-definition s="write %#1 size %#2" type="command" cat` +
        `egory="pen" selector="write" primitive="write"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s">Hello` +
        `!</input><input type="%n">12</input></inputs></block-definition><blo` +
        `ck-definition s="pen trails" type="reporter" category="pen" selector` +
        `="reportPenTrailsAsCostume" primitive="reportPenTrailsAsCostume"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="pen vectors" type="repo` +
        `rter" category="pen" selector="reportPentrailsAsSVG" primitive="repo` +
        `rtPentrailsAsSVG"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="pa` +
        `ste on %#1" type="command" category="pen" selector="doPasteOn" primi` +
        `tive="doPasteOn"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true"><options>§_objectsM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="cut from %#1" type="command" category="pen" selector="doCutFrom" p` +
        `rimitive="doCutFrom"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true"><options>§_obje` +
        `ctsMenu</options></input></inputs></block-definition><block-definiti` +
        `on s="message" type="reporter" category="control" selector="getLastM` +
        `essage" primitive="getLastMessage"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="broadcast %#1 %#2" type="command" category="control" ` +
        `selector="doBroadcast" primitive="doBroadcast"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true"><options>§_messagesMenu</options></input><input type="%re` +
        `ceive" readonly="true" irreplaceable="true" expand="to&#xD;with data` +
        `" max="2"></input></inputs></block-definition><block-definition s="b` +
        `roadcast %#1 %#2 and wait" type="command" category="control" selecto` +
        `r="doBroadcastAndWait" primitive="doBroadcastAndWait"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true"><options>§_messagesMenu</options></input><input ty` +
        `pe="%receive" readonly="true" irreplaceable="true" expand="to&#xD;wi` +
        `th data" max="2"></input></inputs></block-definition><block-definiti` +
        `on s="wait %&apos;duration&apos; secs" type="command" category="cont` +
        `rol" selector="doWait"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">1</input><input type="%n">1</` +
        `input><input type="%n">1</input></inputs><script><block s="doDeclare` +
        `Variables"><list><l>start time</l></list></block><block s="doSetVar"` +
        `><l>start time</l><block s="reportDate"><l><option>time in milliseco` +
        `nds</option></l></block></block><block s="doWaitUntil"><block s="rep` +
        `ortVariadicGreaterThanOrEquals"><list><block s="reportDate"><l><opti` +
        `on>time in milliseconds</option></l></block><block s="reportVariadic` +
        `Sum"><list><block var="start time"/><block s="reportVariadicProduct"` +
        `><list><block var="duration"/><l>1000</l></list></block></list></blo` +
        `ck></list></block></block></script></block-definition><block-definit` +
        `ion s="wait until %&apos;condition&apos;" type="command" category="c` +
        `ontrol" selector="doWaitUntil"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%boolUE" readonly="true">` +
        `</input><input type="%boolUE" readonly="true"></input><input type="%` +
        `boolUE" readonly="true"></input></inputs><script><block s="doIf"><bl` +
        `ock s="reportNot"><block s="evaluate"><block var="condition"/><list>` +
        `</list></block></block><script><block s="doWaitUntil"><block s="eval` +
        `uate"><block var="condition"/><list></list></block></block></script>` +
        `<list></list></block></script></block-definition><block-definition s` +
        `="forever %&apos;action&apos;" type="command" category="control" sel` +
        `ector="doForever"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%loop" readonly="true" irreplaceable="` +
        `true"></input><input type="%loop" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%loop" readonly="true" irreplaceable="true">` +
        `</input></inputs><script><block s="doRun"><block var="action"/><list` +
        `></list></block><block s="doRun"><block s="reportEnvironment"><l><op` +
        `tion>script</option></l></block><list><block var="action"/></list></` +
        `block></script></block-definition><block-definition s="repeat %&apos` +
        `;count&apos; %&apos;action&apos;" type="command" category="control" ` +
        `selector="doRepeat"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">10</input><input type="%loop" re` +
        `adonly="true" irreplaceable="true"></input><input type="%n">10</inpu` +
        `t><input type="%loop" readonly="true" irreplaceable="true"></input><` +
        `input type="%loop" readonly="true" irreplaceable="true"></input></in` +
        `puts><script><block s="doDeclareVariables"><list><l>self</l></list><` +
        `/block><block s="doSetVar"><l>self</l><block s="reportEnvironment"><` +
        `l><option>script</option></l></block></block><block s="doIf"><block ` +
        `s="reportVariadicGreaterThan"><list><block var="count"/><l>0</l></li` +
        `st></block><script><block s="doRun"><block var="action"/><list></lis` +
        `t></block><block s="doApplyExtension"><l>snap_yield</l><list></list>` +
        `</block><block s="doRun"><block var="self"/><list><block s="reportDi` +
        `fference"><block var="count"/><l>1</l></block><block var="action"/><` +
        `/list></block></script><list></list></block></script></block-definit` +
        `ion><block-definition s="repeat until %&apos;condition&apos; %&apos;` +
        `action&apos;" type="command" category="control" selector="doUntil"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%boolUE" readonly="true"></input><input type="%loop" read` +
        `only="true" irreplaceable="true"></input><input type="%boolUE" reado` +
        `nly="true"></input><input type="%loop" readonly="true" irreplaceable` +
        `="true"></input><input type="%loop" readonly="true" irreplaceable="t` +
        `rue"></input></inputs><script><block s="doDeclareVariables"><list><l` +
        `>self</l></list></block><block s="doSetVar"><l>self</l><block s="rep` +
        `ortEnvironment"><l><option>script</option></l></block></block><block` +
        ` s="doIf"><block s="reportNot"><block s="evaluate"><block var="condi` +
        `tion"/><list></list></block></block><script><block s="doRun"><block ` +
        `var="action"/><list></list></block><block s="doApplyExtension"><l>sn` +
        `ap_yield</l><list></list></block><block s="doRun"><block var="self"/` +
        `><list><block var="condition"/><block var="action"/></list></block><` +
        `/script><list></list></block></script></block-definition><block-defi` +
        `nition s="for %&apos;count&apos; = %&apos;start&apos; to %&apos;end&` +
        `apos; %&apos;action&apos;" type="command" category="control" selecto` +
        `r="doFor"><header></header><code></code><translations></translations` +
        `><inputs><input type="%upvar" readonly="true" irreplaceable="true">i` +
        `</input><input type="%n">1</input><input type="%n">10</input><input ` +
        `type="%loop" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%upvar" readonly="true" irreplaceable="true">i</input><input type` +
        `="%n">1</input><input type="%n">10</input><input type="%loop" readon` +
        `ly="true" irreplaceable="true"></input><input type="%loop" readonly=` +
        `"true" irreplaceable="true"></input></inputs><script><block s="doDec` +
        `lareVariables"><list><l>test</l><l>increment</l></list></block><bloc` +
        `k s="doSetVar"><l>count</l><block var="start"/></block><block s="doI` +
        `fElse"><block s="reportVariadicLessThan"><list><block var="start"/><` +
        `block var="end"/></list></block><script><block s="doSetVar"><l>test<` +
        `/l><block s="reifyPredicate"><autolambda><block s="reportVariadicGre` +
        `aterThan"><list><block var="count"/><block var="end"/></list></block` +
        `></autolambda><list></list></block></block><block s="doSetVar"><l>in` +
        `crement</l><l>1</l></block></script><script><block s="doSetVar"><l>t` +
        `est</l><block s="reifyPredicate"><autolambda><block s="reportVariadi` +
        `cLessThan"><list><block var="count"/><block var="end"/></list></bloc` +
        `k></autolambda><list></list></block></block><block s="doSetVar"><l>i` +
        `ncrement</l><l>-1</l></block></script></block><block s="doUntil"><bl` +
        `ock s="evaluate"><block var="test"/><list></list></block><script><bl` +
        `ock s="doRun"><block var="action"/><list></list></block><block s="do` +
        `ChangeVar"><l>count</l><block var="increment"/></block></script></bl` +
        `ock></script></block-definition><block-definition s="if %&apos;condi` +
        `tion&apos; %&apos;true case&apos; %&apos;else pairs&apos;" type="com` +
        `mand" category="control" selector="doIf" primitive="doIf"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%b" readonly="true"></input><input type="%cs" readonly="true" irre` +
        `placeable="true"></input><input type="%elseif" readonly="true" irrep` +
        `laceable="true" expand="else if&#xD;"></input><input type="%b" reado` +
        `nly="true"></input><input type="%cs" readonly="true" irreplaceable="` +
        `true"></input><input type="%elseif" readonly="true" irreplaceable="t` +
        `rue" expand="else if&#xD;"></input><input type="%b" readonly="true">` +
        `</input></inputs><script><block s="doDeclareVariables"><list><l>self` +
        `</l></list></block><block s="doSetVar"><l>self</l><block s="reportEn` +
        `vironment"><l><option>script</option></l></block></block><block s="d` +
        `oIfElse"><block var="condition"/><script><block s="doRun"><block var` +
        `="true case"/><list></list></block></script><script><block s="doIfEl` +
        `se"><block s="reportListIsEmpty"><block var="else pairs"/></block><s` +
        `cript></script><script><block s="doIfElse"><block s="reportListItem"` +
        `><l>1</l><block var="else pairs"/></block><script><block s="doRun"><` +
        `block s="reportListItem"><l>2</l><block var="else pairs"/></block><l` +
        `ist></list></block></script><script><block s="doRun"><block var="sel` +
        `f"/><list><block s="reportBoolean"><l><bool>false</bool></l></block>` +
        `<l></l><block s="reportCDR"><block s="reportCDR"><block var="else pa` +
        `irs"/></block></block></list></block></script></block></script></blo` +
        `ck></script></block></script><scripts><script x="10" y="98"><block s` +
        `="doDeclareVariables"><list><l>self</l></list></block><block s="doSe` +
        `tVar"><l>self</l><block s="reportEnvironment"><l><option>script</opt` +
        `ion></l></block></block><block s="doIfElse"><block var="condition"/>` +
        `<script><block s="doRun"><block var="true case"/><list></list></bloc` +
        `k></script><script><block s="doIfElse"><block s="reportListIsEmpty">` +
        `<block var="else pairs"/></block><script></script><script><block s="` +
        `doIfElse"><block s="reportListItem"><l>1</l><block var="else pairs"/` +
        `></block><script><block s="doRun"><block s="reportListItem"><l>2</l>` +
        `<block var="else pairs"/></block><list></list></block></script><scri` +
        `pt><block s="doRun"><block var="self"/><list><block s="reportBoolean` +
        `"><l><bool>false</bool></l></block><l></l><block s="reportCDR"><bloc` +
        `k s="reportCDR"><block var="else pairs"/></block></block></list></bl` +
        `ock></script></block></script></block></script></block></script></sc` +
        `ripts></block-definition><block-definition s="if %&apos;condition&ap` +
        `os; %&apos;true case&apos; else %&apos;false case&apos;" type="comma` +
        `nd" category="control" selector="doIfElse" primitive="doIfElse"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%b" readonly="true"></input><input type="%cs" readonly="true` +
        `" irreplaceable="true"></input><input type="%cs" readonly="true" irr` +
        `eplaceable="true"></input><input type="%b" readonly="true"></input><` +
        `input type="%cs" readonly="true" irreplaceable="true"></input><input` +
        ` type="%cs" readonly="true" irreplaceable="true"></input><input type` +
        `="%cs" readonly="true" irreplaceable="true"></input></inputs><script` +
        `s><script x="10" y="97.83333333333331"><block s="doRun"><block s="re` +
        `portListItem"><block s="reportVariadicSum"><list><block var="conditi` +
        `on"/><l>1</l></list></block><block s="reportNewList"><list><block va` +
        `r="false case"/><block var="true case"/></list></block></block><list` +
        `></list></block></script></scripts></block-definition><block-definit` +
        `ion s="if %&apos;condition&apos; then %&apos;true case&apos; else %&` +
        `apos;false case&apos;" type="reporter" category="control" selector="` +
        `reportIfElse" primitive="reportIfElse"><header></header><code></code` +
        `><translations></translations><inputs><input type="%b" readonly="tru` +
        `e"></input><input type="%anyUE"></input><input type="%anyUE"></input` +
        `><input type="%b" readonly="true"></input><input type="%anyUE"></inp` +
        `ut><input type="%anyUE"></input><input type="%b" readonly="true"></i` +
        `nput></inputs><scripts><script x="10" y="91.83333333333331"><block s` +
        `="doReport"><block s="reportHyperZip"><block s="reifyReporter"><auto` +
        `lambda><block s="evaluate"><block s="reportListItem"><l></l><l/></bl` +
        `ock><list></list></block></autolambda><list></list></block><block s=` +
        `"reportVariadicSum"><list><block var="condition"/><l>1</l></list></b` +
        `lock><l>0</l><block s="reportNewList"><list><block var="false case"/` +
        `><block var="true case"/></list></block><l>1</l></block></block></sc` +
        `ript></scripts></block-definition><block-definition s="stop %#1" typ` +
        `e="command" category="control" selector="doStopThis" primitive="doSt` +
        `opThis"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true">$_all<o` +
        `ptions>all=$_all&#xD;all scenes=$_all scenes&#xD;this script=$_this ` +
        `script&#xD;this block=$_this block&#xD;all but this script=$_all but` +
        ` this script&#xD;other scripts in sprite=$_other scripts in sprite</` +
        `options></input></inputs></block-definition><block-definition s="run` +
        ` %#1 %#2" type="command" category="control" selector="doRun" primiti` +
        `ve="doRun"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%cmdRing" readonly="true"></input><input type` +
        `="%mult%s" readonly="true" expand="with inputs"></input></inputs></b` +
        `lock-definition><block-definition s="launch %#1 %#2" type="command" ` +
        `category="control" selector="fork" primitive="fork"><header></header` +
        `><code></code><translations></translations><inputs><input type="%cmd` +
        `Ring" readonly="true"></input><input type="%mult%s" readonly="true" ` +
        `expand="with inputs"></input></inputs></block-definition><block-defi` +
        `nition s="call %#1 %#2" type="reporter" category="control" selector=` +
        `"evaluate" primitive="evaluate"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%repRing" readonly="true` +
        `" irreplaceable="true"></input><input type="%mult%s" readonly="true"` +
        ` expand="with inputs"></input></inputs></block-definition><block-def` +
        `inition s="report %#1" type="command" category="control" selector="d` +
        `oReport" primitive="doReport"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s"></input></inputs></blo` +
        `ck-definition><block-definition s="run %#1 w/continuation" type="com` +
        `mand" category="control" selector="doCallCC" primitive="doCallCC"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%cmdRing" readonly="true"></input></inputs></block-definit` +
        `ion><block-definition s="call %#1 w/continuation" type="reporter" ca` +
        `tegory="control" selector="reportCallCC" primitive="reportCallCC"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%cmdRing" readonly="true"></input></inputs></block-definit` +
        `ion><block-definition s="warp %#1" type="command" category="other" s` +
        `elector="doWarp" primitive="doWarp"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%cs" readonly="true"` +
        ` irreplaceable="true"></input></inputs></block-definition><block-def` +
        `inition s="tell %&apos;target&apos; to %&apos;action&apos; %&apos;pa` +
        `rameters&apos;" type="command" category="control" selector="doTellTo` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_objectsMenu</options></` +
        `input><input type="%cmdRing" readonly="true"></input><input type="%m` +
        `ult%s" readonly="true" expand="with inputs"></input><input type="%s"` +
        ` readonly="true"><options>§_objectsMenu</options></input><input type` +
        `="%cmdRing" readonly="true"></input><input type="%mult%s" readonly="` +
        `true" expand="with inputs"></input><input type="%s" readonly="true">` +
        `<options>§_objectsMenu</options></input></inputs><script><block s="d` +
        `oRun"><block s="reportAttributeOf"><block var="action"/><block var="` +
        `target"/></block><block var="parameters"/></block></script></block-d` +
        `efinition><block-definition s="ask %&apos;target&apos; for %&apos;ac` +
        `tion&apos; %&apos;parameters&apos;" type="reporter" category="contro` +
        `l" selector="reportAskFor"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true"><options>` +
        `§_objectsMenu</options></input><input type="%repRing" readonly="true` +
        `" irreplaceable="true"></input><input type="%mult%s" readonly="true"` +
        ` expand="with inputs"></input><input type="%s" readonly="true"><opti` +
        `ons>§_objectsMenu</options></input><input type="%repRing" readonly="` +
        `true" irreplaceable="true"></input><input type="%mult%s" readonly="t` +
        `rue" expand="with inputs"></input><input type="%s" readonly="true"><` +
        `options>§_objectsMenu</options></input></inputs><script><block s="do` +
        `Report"><block s="evaluate"><block s="reportAttributeOf"><block var=` +
        `"action"/><block var="target"/></block><block var="parameters"/></bl` +
        `ock></block></script></block-definition><block-definition s="create ` +
        `a clone of %&apos;target&apos;" type="command" category="control" se` +
        `lector="createClone"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true">$_myself<option` +
        `s>§_clonablesMenu</options></input><input type="%s" readonly="true">` +
        `$_myself<options>§_clonablesMenu</options></input><input type="%s" r` +
        `eadonly="true">myself<options>§_clonablesMenu</options></input></inp` +
        `uts><script><block s="doReport"><block s="newClone"><block var="targ` +
        `et"/></block></block></script></block-definition><block-definition s` +
        `="a new clone of %#1" type="reporter" category="control" selector="n` +
        `ewClone" primitive="newClone"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true">$_myse` +
        `lf<options>§_clonablesMenu</options></input></inputs></block-definit` +
        `ion><block-definition s="delete this clone" type="command" category=` +
        `"control" selector="removeClone" primitive="removeClone"><header></h` +
        `eader><code></code><translations></translations><inputs></inputs></b` +
        `lock-definition><block-definition s="define %#1 %#2 %#3" type="comma` +
        `nd" category="control" selector="doDefineBlock" primitive="doDefineB` +
        `lock"><header></header><code></code><translations></translations><in` +
        `puts><input type="%upvar" readonly="true" irreplaceable="true">$_blo` +
        `ck</input><input type="%s"></input><input type="%repRing" readonly="` +
        `true" irreplaceable="true"></input></inputs></block-definition><bloc` +
        `k-definition s="set %#1 of block %#2 to %#3" type="command" category` +
        `="control" selector="doSetBlockAttribute" primitive="doSetBlockAttri` +
        `bute"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true">$_label<o` +
        `ptions>label=$_label&#xD;definition=$_definition&#xD;comment=$_comme` +
        `nt&#xD;category=$_category&#xD;type=$_type&#xD;scope=$_scope&#xD;sel` +
        `ector=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_default` +
        `s&#xD;menus=$_menus&#xD;editables=$_editables&#xD;replaceables=$_rep` +
        `laceables&#xD;&#126;&#xD;separators=$_separators&#xD;collapses=$_col` +
        `lapses&#xD;expands=$_expands&#xD;initial slots=$_initial slots&#xD;m` +
        `in slots=$_min slots&#xD;max slots=$_max slots&#xD;translations=$_tr` +
        `anslations</options></input><input type="%repRing" readonly="true" i` +
        `rreplaceable="true"></input><input type="%s"></input></inputs></bloc` +
        `k-definition><block-definition s="delete block %#1" type="command" c` +
        `ategory="control" selector="doDeleteBlock" primitive="doDeleteBlock"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%repRing" readonly="true" irreplaceable="true"></input>` +
        `</inputs></block-definition><block-definition s="%#1 of block %#2" t` +
        `ype="reporter" category="control" selector="reportBlockAttribute" pr` +
        `imitive="reportBlockAttribute"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">$_definition<options>label=$_label&#xD;definition=$_` +
        `definition&#xD;comment=$_comment&#xD;category=$_category&#xD;custom?` +
        `=$_custom?&#xD;global?=$_global?&#xD;type=$_type&#xD;scope=$_scope&#` +
        `xD;selector=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_d` +
        `efaults&#xD;menus=$_menus&#xD;editables=$_editables&#xD;replaceables` +
        `=$_replaceables&#xD;&#126;&#xD;separators=$_separators&#xD;collapses` +
        `=$_collapses&#xD;expands=$_expands&#xD;initial slots=$_initial slots` +
        `&#xD;min slots=$_min slots&#xD;max slots=$_max slots&#xD;translation` +
        `s=$_translations</options></input><input type="%repRing" readonly="t` +
        `rue" irreplaceable="true"></input></inputs></block-definition><block` +
        `-definition s="this %#1" type="reporter" category="control" selector` +
        `="reportEnvironment" primitive="reportEnvironment"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true" irreplaceable="true">$_script<options>script=$_script` +
        `&#xD;caller=$_caller&#xD;continuation=$_continuation&#xD;&#126;&#xD;` +
        `inputs=$_inputs</options></input></inputs></block-definition><block-` +
        `definition s="pause all $pause" type="command" category="control" se` +
        `lector="doPauseAll" primitive="doPauseAll"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="switch to scene %#1 %#2" type="command" categ` +
        `ory="control" selector="doSwitchToScene" primitive="doSwitchToScene"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true">$_next<options>§_scenesMenu</option` +
        `s></input><input type="%send" readonly="true" irreplaceable="true" e` +
        `xpand="and send&#xD;with data" max="2"></input></inputs></block-defi` +
        `nition><block-definition s="pipe %&apos;value&apos; $arrowRight %&ap` +
        `os;functions&apos;" type="reporter" category="control" selector="rep` +
        `ortPipe"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s"></input><input type="%mult%repRing" readonl` +
        `y="true"></input><input type="%s"></input><input type="%mult%repRing` +
        `" readonly="true" initial="1"></input></inputs><script><block s="doR` +
        `eport"><block s="reportIfElse"><block s="reportListIsEmpty"><block v` +
        `ar="functions"/></block><block var="value"/><block s="reportPipe"><b` +
        `lock s="evaluate"><block s="reportListItem"><l>1</l><block var="func` +
        `tions"/></block><list><block var="value"/></list></block><block s="r` +
        `eportCDR"><block var="functions"/></block></block></block></block></` +
        `script></block-definition><block-definition s="touching %#1 ?" type=` +
        `"predicate" category="sensing" selector="reportTouchingObject" primi` +
        `tive="reportTouchingObject"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true">$_mouse-` +
        `pointer<options>§_collidablesMenu</options></input></inputs></block-` +
        `definition><block-definition s="touching %#1 ?" type="predicate" cat` +
        `egory="sensing" selector="reportTouchingColor" primitive="reportTouc` +
        `hingColor"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%clr" readonly="true" irreplaceable="true"></` +
        `input></inputs></block-definition><block-definition s="color %#1 is ` +
        `touching %#2 ?" type="predicate" category="sensing" selector="report` +
        `ColorIsTouchingColor" primitive="reportColorIsTouchingColor"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%clr" readonly="true" irreplaceable="true"></input><input type=` +
        `"%clr" readonly="true" irreplaceable="true"></input></inputs></block` +
        `-definition><block-definition s="%#1 at %#2" type="reporter" categor` +
        `y="sensing" selector="reportAspect" primitive="reportAspect"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hu` +
        `e&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;transp` +
        `arency=$_transparency&#xD;r-g-b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$` +
        `_sprites</options></input><input type="%s" readonly="true">$_mouse-p` +
        `ointer<options>§_locationMenu</options></input></inputs></block-defi` +
        `nition><block-definition s="stack size" type="reporter" category="se` +
        `nsing" selector="reportStackSize" primitive="reportStackSize"><heade` +
        `r></header><code></code><translations></translations><inputs></input` +
        `s></block-definition><block-definition s="frames" type="reporter" ca` +
        `tegory="sensing" selector="reportFrameCount" primitive="reportFrameC` +
        `ount"><header></header><code></code><translations></translations><in` +
        `puts></inputs></block-definition><block-definition s="yields" type="` +
        `reporter" category="sensing" selector="reportYieldCount" primitive="` +
        `reportYieldCount"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="pr` +
        `ocesses" type="reporter" category="sensing" selector="reportThreadCo` +
        `unt" primitive="reportThreadCount"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="ask %#1 and wait" type="command" category="sensing" s` +
        `elector="doAsk" primitive="doAsk"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s">what&apos;s your n` +
        `ame?</input></inputs></block-definition><block-definition s="answer"` +
        ` type="reporter" category="sensing" selector="reportLastAnswer" prim` +
        `itive="reportLastAnswer"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="answer" type="reporter" category="sensing" selector="getLastAns` +
        `wer" primitive="getLastAnswer"><header></header><code></code><transl` +
        `ations></translations><inputs></inputs></block-definition><block-def` +
        `inition s="mouse position" type="reporter" category="sensing" select` +
        `or="reportMousePosition"><header></header><code></code><translations` +
        `></translations><inputs></inputs><script><block s="doReport"><block ` +
        `s="reportNewList"><list><block s="reportMouseX"></block><block s="re` +
        `portMouseY"></block></list></block></block></script></block-definiti` +
        `on><block-definition s="mouse x" type="reporter" category="sensing" ` +
        `selector="reportMouseX" primitive="reportMouseX"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="mouse y" type="reporter" category="sens` +
        `ing" selector="reportMouseY" primitive="reportMouseY"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="mouse down?" type="predicate" cate` +
        `gory="sensing" selector="reportMouseDown" primitive="reportMouseDown` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="key %#1 pressed?" ` +
        `type="predicate" category="sensing" selector="reportKeyPressed" prim` +
        `itive="reportKeyPressed"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true">$_space<opt` +
        `ions>§_keysMenu</options></input></inputs></block-definition><block-` +
        `definition s="%#1 to %#2" type="reporter" category="sensing" selecto` +
        `r="reportRelationTo" primitive="reportRelationTo"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true">$_distance<options>distance=$_distance&#xD;direction=$` +
        `_direction&#xD;ray length=$_ray length</options></input><input type=` +
        `"%s" readonly="true">$_mouse-pointer<options>§_destinationsMenu</opt` +
        `ions></input></inputs></block-definition><block-definition s="reset ` +
        `timer" type="command" category="sensing" selector="doResetTimer" pri` +
        `mitive="doResetTimer"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="timer" type="reporter" category="sensing" selector="reportTimer" p` +
        `rimitive="reportTimer"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="timer" type="reporter" category="sensing" selector="getTimer" pri` +
        `mitive="getTimer"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="%#` +
        `1 of %#2" type="reporter" category="sensing" selector="reportAttribu` +
        `teOf" primitive="reportAttributeOf"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true">` +
        `$_costume #<options>§_attributesMenu</options></input><input type="%` +
        `s" readonly="true"><options>§_objectsMenu</options></input></inputs>` +
        `</block-definition><block-definition s="object %&apos;name&apos;" ty` +
        `pe="reporter" category="sensing" selector="reportObject" primitive="` +
        `reportObject"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true">$_myself<options>§_obj` +
        `ectsMenuWithSelf</options></input><input type="%s" readonly="true">$` +
        `_myself<options>§_objectsMenuWithSelf</options></input><input type="` +
        `%s" readonly="true">myself<options>§_objectsMenuWithSelf</options></` +
        `input></inputs><script><block s="doReport"><block s="reportHyperZip"` +
        `><block s="reifyReporter"><autolambda><block s="reportFindFirst"><bl` +
        `ock s="reifyPredicate"><autolambda><block s="reportVariadicEquals"><` +
        `list><block var="id"/><block s="reportAskFor"><l></l><block s="reify` +
        `Reporter"><autolambda><block s="reportGet"><l><option>name</option><` +
        `/l></block></autolambda><list></list></block><list></list></block></` +
        `list></block></autolambda><list></list></block><block s="reportConca` +
        `tenatedLists"><list><block s="reportAskFor"><block s="reportGet"><l>` +
        `<option>stage</option></l></block><block s="reifyReporter"><autolamb` +
        `da><block s="reportGet"><l><option>other sprites</option></l></block` +
        `></autolambda><list></list></block><list></list></block><block s="re` +
        `portNewList"><list><block s="reportGet"><l><option>stage</option></l` +
        `></block></list></block></list></block></block></autolambda><list><l` +
        `>id</l></list></block><block var="name"/><l>0</l><l></l><l>0</l></bl` +
        `ock></block></script><scripts><script x="10" y="98"><block s="doRepo` +
        `rt"><block s="reportHyperZip"><block s="reifyReporter"><autolambda><` +
        `block s="reportFindFirst"><block s="reifyPredicate"><autolambda><blo` +
        `ck s="reportVariadicEquals"><list><block var="id"/><block s="reportA` +
        `skFor"><l></l><block s="reifyReporter"><autolambda><block s="reportG` +
        `et"><l><option>name</option></l></block></autolambda><list></list></` +
        `block><list></list></block></list></block></autolambda><list></list>` +
        `</block><block s="reportConcatenatedLists"><list><block s="reportAsk` +
        `For"><block s="reportGet"><l><option>stage</option></l></block><bloc` +
        `k s="reifyReporter"><autolambda><block s="reportGet"><l><option>othe` +
        `r sprites</option></l></block></autolambda><list></list></block><lis` +
        `t></list></block><block s="reportNewList"><list><block s="reportGet"` +
        `><l><option>stage</option></l></block></list></block></list></block>` +
        `</block></autolambda><list><l>id</l></list></block><block var="name"` +
        `/><l>0</l><l></l><l>0</l></block></block></script></scripts></block-` +
        `definition><block-definition s="url %#1" type="reporter" category="s` +
        `ensing" selector="reportURL" primitive="reportURL"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s">s` +
        `nap.berkeley.edu</input></inputs></block-definition><block-definitio` +
        `n s="set %#1 to %#2" type="command" category="sensing" selector="doS` +
        `etGlobalFlag" primitive="doSetGlobalFlag"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">$_video capture<options>turbo mode=$_turb` +
        `o mode&#xD;case sensitivity=$_case sensitivity&#xD;flat line ends=$_` +
        `flat line ends&#xD;log pen vectors=$_log pen vectors&#xD;video captu` +
        `re=$_video capture&#xD;mirror video=$_mirror video</options></input>` +
        `<input type="%b" readonly="true"></input></inputs></block-definition` +
        `><block-definition s="is %#1 on?" type="predicate" category="sensing` +
        `" selector="reportGlobalFlag" primitive="reportGlobalFlag"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_turbo mode<options>tur` +
        `bo mode=$_turbo mode&#xD;case sensitivity=$_case sensitivity&#xD;fla` +
        `t line ends=$_flat line ends&#xD;log pen vectors=$_log pen vectors&#` +
        `xD;video capture=$_video capture&#xD;mirror video=$_mirror video</op` +
        `tions></input></inputs></block-definition><block-definition s="curre` +
        `nt %#1" type="reporter" category="sensing" selector="reportDate" pri` +
        `mitive="reportDate"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">$_date<options>year=$_year&#xD;month=$_month&#xD;date=$_date&#x` +
        `D;day of week=$_day of week&#xD;hour=$_hour&#xD;minute=$_minute&#xD;` +
        `second=$_second&#xD;time in milliseconds=$_time in milliseconds</opt` +
        `ions></input></inputs></block-definition><block-definition s="my %#1` +
        `" type="reporter" category="sensing" selector="reportGet" primitive=` +
        `"reportGet"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">$_n` +
        `eighbors<options>§_gettablesMenu</options></input></inputs></block-d` +
        `efinition><block-definition s="microphone %#1" type="reporter" categ` +
        `ory="sensing" selector="reportAudio" primitive="reportAudio"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_volume<options>§_aud` +
        `ioMenu</options></input></inputs></block-definition><block-definitio` +
        `n s="%#1" type="reporter" category="operators" selector="reportVaria` +
        `dicSum" primitive="reportVariadicSum"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%mult%n" readonly=` +
        `"true" separator="+" collapse="sum" initial="2"></input></inputs></b` +
        `lock-definition><block-definition s="%&apos;a&apos; − %&apos;b&apos;` +
        `" type="reporter" category="operators" selector="reportDifference" p` +
        `rimitive="reportDifference"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n"></input><input type="%n"` +
        `></input><input type="%n"></input><input type="%n"></input><input ty` +
        `pe="%n"></input></inputs><scripts><script x="10" y="91.8333333333333` +
        `1"><block s="doReport"><block s="reportVariadicSum"><list><block var` +
        `="a"/><block s="reportMonadic"><l><option>neg</option></l><block var` +
        `="b"/></block></list></block></block></script></scripts></block-defi` +
        `nition><block-definition s="%#1" type="reporter" category="operators` +
        `" selector="reportVariadicProduct" primitive="reportVariadicProduct"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%n" readonly="true" separator="×" collapse="produc` +
        `t" initial="2"></input></inputs></block-definition><block-definition` +
        ` s="%#1 / %#2" type="reporter" category="operators" selector="report` +
        `Quotient" primitive="reportQuotient"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n"></input><input ` +
        `type="%n"></input></inputs></block-definition><block-definition s="r` +
        `ound %#1" type="reporter" category="operators" selector="reportRound` +
        `" primitive="reportRound"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n"></input></inputs></block-d` +
        `efinition><block-definition s="%#1 of %#2" type="reporter" category=` +
        `"operators" selector="reportMonadic" primitive="reportMonadic"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">$_sqrt<options>abs=$` +
        `_abs&#xD;neg=$_neg&#xD;sign=$_sign&#xD;ceiling=$_ceiling&#xD;floor=$` +
        `_floor&#xD;sqrt=$_sqrt&#xD;sin=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD` +
        `;asin=$_asin&#xD;acos=$_acos&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_l` +
        `og&#xD;lg=$_lg&#xD;e^=$_e^&#xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</op` +
        `tions></input><input type="%n">10</input></inputs></block-definition` +
        `><block-definition s="%#1 ^ %#2" type="reporter" category="operators` +
        `" selector="reportPower" primitive="reportPower"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n"></i` +
        `nput><input type="%n"></input></inputs></block-definition><block-def` +
        `inition s="%#1 mod %#2" type="reporter" category="operators" selecto` +
        `r="reportModulus" primitive="reportModulus"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%n"></input>` +
        `<input type="%n"></input></inputs></block-definition><block-definiti` +
        `on s="atan2 %#1 ÷ %#2" type="reporter" category="operators" selector` +
        `="reportAtan2" primitive="reportAtan2"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n"></input><inpu` +
        `t type="%n"></input></inputs></block-definition><block-definition s=` +
        `"%#1" type="reporter" category="operators" selector="reportVariadicM` +
        `in" primitive="reportVariadicMin"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%mult%n" readonly="tru` +
        `e" separator="min" collapse="minimum" initial="2"></input></inputs><` +
        `/block-definition><block-definition s="%#1" type="reporter" category` +
        `="operators" selector="reportVariadicMax" primitive="reportVariadicM` +
        `ax"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%mult%n" readonly="true" separator="max" collapse="m` +
        `aximum" initial="2"></input></inputs></block-definition><block-defin` +
        `ition s="pick random %#1 to %#2" type="reporter" category="operators` +
        `" selector="reportRandom" primitive="reportRandom"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%n">1` +
        `</input><input type="%n">10</input></inputs></block-definition><bloc` +
        `k-definition s="%#1" type="predicate" category="operators" selector=` +
        `"reportVariadicEquals" primitive="reportVariadicEquals"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%mult%s" readonly="true" separator="=" collapse="all =" initial="2">` +
        `</input></inputs></block-definition><block-definition s="%#1" type="` +
        `predicate" category="operators" selector="reportVariadicNotEquals" p` +
        `rimitive="reportVariadicNotEquals"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%mult%s" readonly="tr` +
        `ue" separator="≠" collapse="neighbors ≠" initial="2"></input></input` +
        `s></block-definition><block-definition s="%#1" type="predicate" cate` +
        `gory="operators" selector="reportVariadicLessThan" primitive="report` +
        `VariadicLessThan"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%mult%s" readonly="true" separator="&l` +
        `t;" collapse="all &lt;" initial="2"></input></inputs></block-definit` +
        `ion><block-definition s="%#1" type="predicate" category="operators" ` +
        `selector="reportVariadicLessThanOrEquals" primitive="reportVariadicL` +
        `essThanOrEquals"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%mult%s" readonly="true" separator="≤" ` +
        `collapse="all ≤" initial="2"></input></inputs></block-definition><bl` +
        `ock-definition s="%#1" type="predicate" category="operators" selecto` +
        `r="reportVariadicGreaterThan" primitive="reportVariadicGreaterThan">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%mult%s" readonly="true" separator="&gt;" collapse="all ` +
        `&gt;" initial="2"></input></inputs></block-definition><block-definit` +
        `ion s="%#1" type="predicate" category="operators" selector="reportVa` +
        `riadicGreaterThanOrEquals" primitive="reportVariadicGreaterThanOrEqu` +
        `als"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%mult%s" readonly="true" separator="≥" collapse="al` +
        `l ≥" initial="2"></input></inputs></block-definition><block-definiti` +
        `on s="%#1" type="predicate" category="operators" selector="reportVar` +
        `iadicAnd" primitive="reportVariadicAnd"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%mult%b" readonl` +
        `y="true" separator="and" collapse="all" initial="2"></input></inputs` +
        `></block-definition><block-definition s="%#1" type="predicate" categ` +
        `ory="operators" selector="reportVariadicOr" primitive="reportVariadi` +
        `cOr"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%mult%b" readonly="true" separator="or" collapse="a` +
        `ny" initial="2"></input></inputs></block-definition><block-definitio` +
        `n s="not %&apos;bool&apos;" type="predicate" category="operators" se` +
        `lector="reportNot"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%b" readonly="true"></input><input ty` +
        `pe="%b" readonly="true"></input><input type="%b" readonly="true"></i` +
        `nput></inputs><script><block s="doReport"><block s="reportIfElse"><b` +
        `lock var="bool"/><block s="reportBoolean"><l><bool>false</bool></l><` +
        `/block><block s="reportBoolean"><l><bool>true</bool></l></block></bl` +
        `ock></block></script></block-definition><block-definition s="%#1" ty` +
        `pe="predicate" category="operators" selector="reportBoolean" primiti` +
        `ve="reportBoolean"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%b" readonly="true" irreplaceable="tr` +
        `ue">true</input></inputs></block-definition><block-definition s="%#1` +
        `" type="predicate" category="operators" selector="reportFalse" primi` +
        `tive="reportFalse"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%b" readonly="true" irreplaceable="tr` +
        `ue">false</input></inputs></block-definition><block-definition s="jo` +
        `in %#1" type="reporter" category="operators" selector="reportJoinWor` +
        `ds" primitive="reportJoinWords"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%mult%s" readonly="true"` +
        ` initial="2">hello &#xD;world</input></inputs></block-definition><bl` +
        `ock-definition s="letter %&apos;idx&apos; of %&apos;text&apos;" type` +
        `="reporter" category="operators" selector="reportLetter" primitive="` +
        `reportLetter"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;rand` +
        `om=$_random</options></input><input type="%s">world</input><input ty` +
        `pe="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options><` +
        `/input><input type="%s">world</input><input type="%n">1<options>1=1&` +
        `#xD;last&#xD;random</options></input></inputs><script><block s="doRe` +
        `port"><block s="reportHyperZip"><block s="reifyReporter"><autolambda` +
        `><block s="reportListItem"><l></l><block s="reportTextSplit"><l></l>` +
        `<l><option>letter</option></l></block></block></autolambda><list></l` +
        `ist></block><block var="idx"/><l>0</l><block var="text"/><l>0</l></b` +
        `lock></block></script><scripts><script x="10" y="98"><block s="doRep` +
        `ort"><block s="reportHyperZip"><block s="reifyReporter"><autolambda>` +
        `<block s="reportListItem"><l></l><block s="reportTextSplit"><l></l><` +
        `l><option>letter</option></l></block></block></autolambda><list></li` +
        `st></block><block var="idx"/><l>0</l><block var="text"/><l>0</l></bl` +
        `ock></block></script></scripts></block-definition><block-definition ` +
        `s="length of %#1" type="reporter" category="operators" selector="rep` +
        `ortStringSize" primitive="reportStringSize"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">world</i` +
        `nput></inputs></block-definition><block-definition s="%#1 of text %#` +
        `2" type="reporter" category="operators" selector="reportTextAttribut` +
        `e" primitive="reportTextAttribute"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">$_length<options>length=$_length&#xD;lower case=` +
        `$_lower case&#xD;upper case=$_upper case</options></input><input typ` +
        `e="%s">world</input></inputs></block-definition><block-definition s=` +
        `"unicode of %#1" type="reporter" category="operators" selector="repo` +
        `rtUnicode" primitive="reportUnicode"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s">a</input></inpu` +
        `ts></block-definition><block-definition s="unicode %#1 as letter" ty` +
        `pe="reporter" category="operators" selector="reportUnicodeAsLetter" ` +
        `primitive="reportUnicodeAsLetter"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">65</input></inputs` +
        `></block-definition><block-definition s="is %#1 a %#2 ?" type="predi` +
        `cate" category="operators" selector="reportIsA" primitive="reportIsA` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s">5</input><input type="%s" readonly="true" irreplac` +
        `eable="true">$_number<options>§_typesMenu</options></input></inputs>` +
        `</block-definition><block-definition s="is %#1 ?" type="predicate" c` +
        `ategory="operators" selector="reportVariadicIsIdentical" primitive="` +
        `reportVariadicIsIdentical"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%mult%s" readonly="true" sepa` +
        `rator="identical to" collapse="all identical" initial="2"></input></` +
        `inputs></block-definition><block-definition s="split %#1 by %#2" typ` +
        `e="reporter" category="operators" selector="reportTextSplit" primiti` +
        `ve="reportTextSplit"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s">hello world</input><input type=` +
        `"%s"> <options>letter=$_letter&#xD;word=$_word&#xD;line=$_line&#xD;t` +
        `ab=$_tab&#xD;cr=$_cr&#xD;csv=$_csv&#xD;json=$_json&#xD;&#126;&#xD;bl` +
        `ocks=$_blocks</options></input></inputs></block-definition><block-de` +
        `finition s="JavaScript function ( %#1 ) { %#2 }" type="reporter" cat` +
        `egory="operators" selector="reportJSFunction" primitive="reportJSFun` +
        `ction"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true"></input><input type="%ml` +
        `t"></input></inputs></block-definition><block-definition s="type of ` +
        `%#1" type="reporter" category="operators" selector="reportTypeOf" pr` +
        `imitive="reportTypeOf"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s">5</input></inputs></block-def` +
        `inition><block-definition s="%#1 of %#2" type="reporter" category="o` +
        `perators" selector="reportTextFunction" primitive="reportTextFunctio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true" irreplaceable="true">$_encode URI` +
        `<options>encode URI=$_encode URI&#xD;decode URI=$_decode URI&#xD;enc` +
        `ode URI component=$_encode URI component&#xD;decode URI component=$_` +
        `decode URI component&#xD;XML escape=$_XML escape&#xD;XML unescape=$_` +
        `XML unescape&#xD;JS escape=$_JS escape&#xD;hex sha512 hash=$_hex sha` +
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
        `nputs></block-definition><block-definition s="script variables %&apo` +
        `s;#1&apos;" type="command" category="other" selector="doDeclareVaria` +
        `bles"><header></header><code></code><translations></translations><in` +
        `puts><input type="%scriptVars" readonly="true" irreplaceable="true" ` +
        `initial="1" min="1"></input></inputs></block-definition><block-defin` +
        `ition s="inherit %#1" type="command" category="variables" selector="` +
        `doDeleteAttr" primitive="doDeleteAttr"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s" readonly="tru` +
        `e"><options>§_shadowedVariablesMenu</options></input></inputs></bloc` +
        `k-definition><block-definition s="list %&apos;inputs&apos;" type="re` +
        `porter" category="lists" selector="reportNewList"><header></header><` +
        `code></code><translations></translations><inputs><input type="%mult%` +
        `s" readonly="true" irreplaceable="true" initial="1"></input><input t` +
        `ype="%mult%s" readonly="true" irreplaceable="true" initial="1"></inp` +
        `ut><input type="%mult%s" readonly="true" irreplaceable="true" initia` +
        `l="1"></input></inputs><script><block s="doReport"><block var="input` +
        `s"/></block></script></block-definition><block-definition s="%#1 in ` +
        `front of %#2" type="reporter" category="lists" selector="reportCONS"` +
        ` primitive="reportCONS"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s"></input><input type="%l" rea` +
        `donly="true"></input></inputs></block-definition><block-definition s` +
        `="item %#1 of %#2" type="reporter" category="lists" selector="report` +
        `ListItem" primitive="reportListItem"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">1<options>1=1&#` +
        `xD;last=$_last&#xD;random=$_random</options></input><input type="%l"` +
        ` readonly="true"></input></inputs></block-definition><block-definiti` +
        `on s="all but first of %#1" type="reporter" category="lists" selecto` +
        `r="reportCDR" primitive="reportCDR"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%l" readonly="true">` +
        `</input></inputs></block-definition><block-definition s="length of %` +
        `#1" type="reporter" category="lists" selector="reportListLength" pri` +
        `mitive="reportListLength"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%l" readonly="true"></input></` +
        `inputs></block-definition><block-definition s="%#1 of %#2" type="rep` +
        `orter" category="lists" selector="reportListAttribute" primitive="re` +
        `portListAttribute"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s" readonly="true" irreplaceable="tr` +
        `ue">$_length<options>length=$_length&#xD;rank=$_rank&#xD;dimensions=` +
        `$_dimensions&#xD;flatten=$_flatten&#xD;columns=$_columns&#xD;uniques` +
        `=$_uniques&#xD;distribution=$_distribution&#xD;sorted=$_sorted&#xD;s` +
        `huffled=$_shuffled&#xD;reverse=$_reverse&#xD;&#126;&#xD;lines=$_line` +
        `s&#xD;csv=$_csv&#xD;json=$_json</options></input><input type="%l" re` +
        `adonly="true"></input></inputs></block-definition><block-definition ` +
        `s="%&apos;data&apos; contains %&apos;value&apos;" type="predicate" c` +
        `ategory="lists" selector="reportListContainsItem" primitive="reportL` +
        `istContainsItem"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%l" readonly="true"></input><input type` +
        `="%s">thing</input><input type="%l" readonly="true"></input><input t` +
        `ype="%s">thing</input><input type="%s">thing</input></inputs><script` +
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
        `<input type="%l" readonly="true"></input><input type="%l" readonly="` +
        `true"></input></inputs><scripts><script x="10" y="91.83333333333331"` +
        `><block s="doReport"><block s="reportVariadicEquals"><list><block va` +
        `r="data"/><block s="reportNewList"><list></list></block></list></blo` +
        `ck></block></script></scripts></block-definition><block-definition s` +
        `="index of %&apos;value&apos; in %&apos;data&apos;" type="reporter" ` +
        `category="lists" selector="reportListIndex" primitive="reportListInd` +
        `ex"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s">thing</input><input type="%l" readonly="true"></` +
        `input><input type="%s">thing</input><input type="%l" readonly="true"` +
        `></input><input type="%l" readonly="true"></input></inputs><scripts>` +
        `<script x="10" y="91.83333333333331"><block s="doWarp"><script><bloc` +
        `k s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><optio` +
        `n>length</option></l><block var="data"/></block><script><block s="do` +
        `If"><block s="reportVariadicEquals"><list><block s="reportListItem">` +
        `<block var="i"/><block var="data"/></block><block var="value"/></lis` +
        `t></block><script><block s="doReport"><block var="i"/></block></scri` +
        `pt><list></list></block></script></block></script></block><block s="` +
        `doReport"><l>0</l></block></script></scripts></block-definition><blo` +
        `ck-definition s="add %#1 to %#2" type="command" category="lists" sel` +
        `ector="doAddToList" primitive="doAddToList"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">thing</i` +
        `nput><input type="%l" readonly="true"></input></inputs></block-defin` +
        `ition><block-definition s="delete %#1 of %#2" type="command" categor` +
        `y="lists" selector="doDeleteFromList" primitive="doDeleteFromList"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">1<options>1=1&#xD;last=$_last&#xD;&#126;&#xD;all=$_al` +
        `l</options></input><input type="%l" readonly="true"></input></inputs` +
        `></block-definition><block-definition s="insert %#1 at %#2 of %#3" t` +
        `ype="command" category="lists" selector="doInsertInList" primitive="` +
        `doInsertInList"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s">thing</input><input type="%n">1<opti` +
        `ons>1=1&#xD;last=$_last&#xD;random=$_random</options></input><input ` +
        `type="%l" readonly="true"></input></inputs></block-definition><block` +
        `-definition s="replace item %#1 of %#2 with %#3" type="command" cate` +
        `gory="lists" selector="doReplaceInList" primitive="doReplaceInList">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</o` +
        `ptions></input><input type="%l" readonly="true"></input><input type=` +
        `"%s">thing</input></inputs></block-definition><block-definition s="n` +
        `umbers from %&apos;start&apos; to %&apos;end&apos;" type="reporter" ` +
        `category="lists" selector="reportNumbers" primitive="reportNumbers">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">1</input><input type="%n">10</input><input type="%n"` +
        `>1</input><input type="%n">10</input><input type="%n">10</input></in` +
        `puts><scripts><script x="10" y="91.83333333333331"><block s="doRepor` +
        `t"><block s="reportHyperZip"><block s="reifyReporter"><script><block` +
        ` s="doDeclareVariables"><list><l>result</l></list></block><block s="` +
        `doSetVar"><l>result</l><block s="reportNewList"><list></list></block` +
        `></block><block s="doWarp"><script><block s="doFor"><l>i</l><l></l><` +
        `l></l><script><block s="doAddToList"><block var="i"/><block var="res` +
        `ult"/></block></script></block></script></block><block s="doReport">` +
        `<block var="result"/></block></script><list></list></block><block va` +
        `r="start"/><l>0</l><block var="end"/><l>0</l></block></block></scrip` +
        `t></scripts></block-definition><block-definition s="append %&apos;li` +
        `sts&apos;" type="reporter" category="lists" selector="reportConcaten` +
        `atedLists" primitive="reportConcatenatedLists"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%l" ` +
        `readonly="true" initial="2"></input><input type="%mult%l" readonly="` +
        `true" initial="2"></input><input type="%mult%l" readonly="true" init` +
        `ial="2"></input></inputs><scripts><script x="10" y="91.8333333333333` +
        `1"><block s="doDeclareVariables"><list><l>result</l></list></block><` +
        `block s="doSetVar"><l>result</l><block s="reportNewList"><list></lis` +
        `t></block></block><block s="doWarp"><script><block s="doForEach"><l>` +
        `list</l><block var="lists"/><script><block s="doForEach"><l>item</l>` +
        `<block var="list"/><script><block s="doAddToList"><block var="item"/` +
        `><block var="result"/></block></script></block></script></block></sc` +
        `ript></block><block s="doReport"><block var="result"/></block></scri` +
        `pt></scripts></block-definition><block-definition s="combinations %&` +
        `apos;lists&apos;" type="reporter" category="lists" selector="reportC` +
        `rossproduct" primitive="reportCrossproduct"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%mult%l" rea` +
        `donly="true" initial="2"></input><input type="%mult%l" readonly="tru` +
        `e" initial="2"></input><input type="%mult%l" readonly="true" initial` +
        `="2"></input></inputs><scripts><script x="10" y="91.83333333333331">` +
        `<block s="doReport"><block s="reportIfElse"><block s="reportListIsEm` +
        `pty"><block var="lists"/></block><block s="reportNewList"><list><blo` +
        `ck s="reportNewList"><list></list></block></list></block><block s="r` +
        `eportConcatenatedLists"><block s="reportMap"><block s="reifyReporter` +
        `"><autolambda><block s="reportMap"><block s="reifyReporter"><autolam` +
        `bda><block s="reportCONS"><block var="first"/><l/></block></autolamb` +
        `da><list></list></block><block s="reportCrossproduct"><block s="repo` +
        `rtCDR"><block var="lists"/></block></block></block></autolambda><lis` +
        `t><l>first</l></list></block><block s="reportListItem"><l>1</l><bloc` +
        `k var="lists"/></block></block></block></block></block></script></sc` +
        `ripts></block-definition><block-definition s="transpose %#1" type="r` +
        `eporter" category="lists" selector="reportTranspose" primitive="repo` +
        `rtTranspose"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%l" readonly="true"></input></inputs></bloc` +
        `k-definition><block-definition s="reshape %#1 to %#2" type="reporter` +
        `" category="lists" selector="reportReshape" primitive="reportReshape` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s"></input><input type="%mult%n" readonly="true" init` +
        `ial="2">4&#xD;3</input></inputs></block-definition><block-definition` +
        ` s="map %&apos;ring&apos; over %&apos;data&apos;" type="reporter" ca` +
        `tegory="lists" selector="reportMap" primitive="reportMap"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%repRing" readonly="true" irreplaceable="true"></input><input type` +
        `="%l" readonly="true"></input><input type="%repRing" readonly="true"` +
        ` irreplaceable="true"></input><input type="%l" readonly="true"></inp` +
        `ut><input type="%l" readonly="true"></input></inputs><scripts><scrip` +
        `t x="10" y="91.83333333333331"><block s="doDeclareVariables"><list><` +
        `l>result</l><l>implicit?</l></list></block><block s="doSetVar"><l>re` +
        `sult</l><block s="reportNewList"><list></list></block></block><block` +
        ` s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><block s=` +
        `"reportAttributeOf"><l><option>input names</option></l><block var="r` +
        `ing"/></block></block></block><block s="doWarp"><script><block s="do` +
        `For"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>lengt` +
        `h</option></l><block var="data"/></block><script><block s="doAddToLi` +
        `st"><block s="evaluate"><block var="ring"/><block s="reportIfElse"><` +
        `block var="implicit?"/><block s="reportNewList"><list><block s="repo` +
        `rtListItem"><block var="i"/><block var="data"/></block></list></bloc` +
        `k><block s="reportNewList"><list><block s="reportListItem"><block va` +
        `r="i"/><block var="data"/></block><block var="i"/><block var="data"/` +
        `></list></block></block></block><block var="result"/></block></scrip` +
        `t></block></script></block><block s="doReport"><block var="result"/>` +
        `</block></script></scripts></block-definition><block-definition s="$` +
        `blitz map %#1 over %#2" type="reporter" category="lists" selector="r` +
        `eportAtomicMap" primitive="reportAtomicMap"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%repRing" re` +
        `adonly="true" irreplaceable="true"></input><input type="%l" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="kee` +
        `p items %&apos;ring&apos; from %&apos;data&apos;" type="reporter" ca` +
        `tegory="lists" selector="reportKeep" primitive="reportKeep"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%predRing" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%l" readonly="true"></input><input type="%predRing" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%l" readonly="true"><` +
        `/input><input type="%l" readonly="true"></input></inputs><scripts><s` +
        `cript x="10" y="91.83333333333331"><block s="doDeclareVariables"><li` +
        `st><l>result</l><l>implicit?</l></list></block><block s="doSetVar"><` +
        `l>result</l><block s="reportNewList"><list></list></block></block><b` +
        `lock s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><bloc` +
        `k s="reportAttributeOf"><l><option>input names</option></l><block va` +
        `r="ring"/></block></block></block><block s="doWarp"><script><block s` +
        `="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>l` +
        `ength</option></l><block var="data"/></block><script><block s="doIf"` +
        `><block s="evaluate"><block var="ring"/><block s="reportIfElse"><blo` +
        `ck var="implicit?"/><block s="reportNewList"><list><block s="reportL` +
        `istItem"><block var="i"/><block var="data"/></block></list></block><` +
        `block s="reportNewList"><list><block s="reportListItem"><block var="` +
        `i"/><block var="data"/></block><block var="i"/><block var="data"/></` +
        `list></block></block></block><script><block s="doAddToList"><block s` +
        `="reportListItem"><block var="i"/><block var="data"/></block><block ` +
        `var="result"/></block></script><list></list></block></script></block` +
        `></script></block><block s="doReport"><block var="result"/></block><` +
        `/script></scripts></block-definition><block-definition s="$blitz kee` +
        `p items %#1 from %#2" type="reporter" category="lists" selector="rep` +
        `ortAtomicKeep" primitive="reportAtomicKeep"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%predRing" r` +
        `eadonly="true" irreplaceable="true"></input><input type="%l" readonl` +
        `y="true"></input></inputs></block-definition><block-definition s="fi` +
        `nd first item %&apos;ring&apos; in %&apos;data&apos;" type="reporter` +
        `" category="lists" selector="reportFindFirst" primitive="reportFindF` +
        `irst"><header></header><code></code><translations></translations><in` +
        `puts><input type="%predRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%l" readonly="true"></input><input type="%predRin` +
        `g" readonly="true" irreplaceable="true"></input><input type="%l" rea` +
        `donly="true"></input><input type="%l" readonly="true"></input></inpu` +
        `ts><scripts><script x="10" y="91.83333333333331"><block s="doDeclare` +
        `Variables"><list><l>implicit?</l></list></block><block s="doSetVar">` +
        `<l>implicit?</l><block s="reportListIsEmpty"><block s="reportAttribu` +
        `teOf"><l><option>input names</option></l><block var="ring"/></block>` +
        `</block></block><block s="doWarp"><script><block s="doFor"><l>i</l><` +
        `l>1</l><block s="reportListAttribute"><l><option>length</option></l>` +
        `<block var="data"/></block><script><block s="doIf"><block s="evaluat` +
        `e"><block var="ring"/><block s="reportIfElse"><block var="implicit?"` +
        `/><block s="reportNewList"><list><block s="reportListItem"><block va` +
        `r="i"/><block var="data"/></block></list></block><block s="reportNew` +
        `List"><list><block s="reportListItem"><block var="i"/><block var="da` +
        `ta"/></block><block var="i"/><block var="data"/></list></block></blo` +
        `ck></block><script><block s="doReport"><block s="reportListItem"><bl` +
        `ock var="i"/><block var="data"/></block></block></script><list></lis` +
        `t></block></script></block></script></block><block s="doReport"><l><` +
        `/l></block></script></scripts></block-definition><block-definition s` +
        `="$blitz find first item %#1 in %#2" type="reporter" category="lists` +
        `" selector="reportAtomicFindFirst" primitive="reportAtomicFindFirst"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%predRing" readonly="true" irreplaceable="true"></input` +
        `><input type="%l" readonly="true"></input></inputs></block-definitio` +
        `n><block-definition s="combine %&apos;data&apos; using %&apos;ring&a` +
        `pos;" type="reporter" category="lists" selector="reportCombine" prim` +
        `itive="reportCombine"><header></header><code></code><translations></` +
        `translations><inputs><input type="%l" readonly="true"></input><input` +
        ` type="%repRing" readonly="true" irreplaceable="true"></input><input` +
        ` type="%l" readonly="true"></input><input type="%repRing" readonly="` +
        `true" irreplaceable="true"></input><input type="%repRing" readonly="` +
        `true" irreplaceable="true"></input></inputs><scripts><script x="10" ` +
        `y="91.83333333333331"><block s="doIf"><block s="reportListIsEmpty"><` +
        `block var="data"/></block><script><block s="doReport"><l>0</l></bloc` +
        `k></script><list><block s="reportVariadicEquals"><list><block s="rep` +
        `ortListAttribute"><l><option>length</option></l><block var="data"/><` +
        `/block><l>1</l></list></block><script><block s="doReport"><block s="` +
        `reportListItem"><l>1</l><block var="data"/></block></block></script>` +
        `</list></block><block s="doReport"><block s="evaluate"><block var="r` +
        `ing"/><list><block s="reportListItem"><l>1</l><block var="data"/></b` +
        `lock><block s="evaluate"><block s="reportEnvironment"><l><option>scr` +
        `ipt</option></l></block><list><block s="reportCDR"><block var="data"` +
        `/></block><block var="ring"/></list></block></list></block></block><` +
        `/script></scripts></block-definition><block-definition s="$blitz com` +
        `bine %#1 using %#2" type="reporter" category="lists" selector="repor` +
        `tAtomicCombine" primitive="reportAtomicCombine"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%l" read` +
        `only="true"></input><input type="%repRing" readonly="true" irreplace` +
        `able="true"></input></inputs></block-definition><block-definition s=` +
        `"for each %&apos;item&apos; in %&apos;data&apos; %&apos;action&apos;` +
        `" type="command" category="lists" selector="doForEach" primitive="do` +
        `ForEach"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%upvar" readonly="true" irreplaceable="true">it` +
        `em</input><input type="%l" readonly="true"></input><input type="%loo` +
        `p" readonly="true" irreplaceable="true"></input><input type="%upvar"` +
        ` readonly="true" irreplaceable="true">item</input><input type="%l" r` +
        `eadonly="true"></input><input type="%loop" readonly="true" irreplace` +
        `able="true"></input><input type="%loop" readonly="true" irreplaceabl` +
        `e="true"></input></inputs><scripts><script x="10" y="97.833333333333` +
        `31"><block s="doReport"><block s="reportMap"><block s="reifyReporter` +
        `"><script><block s="doSetVar"><l>item</l><l></l></block><block s="do` +
        `Run"><block var="action"/><list></list></block><block s="doReport"><` +
        `l>0</l></block></script><list></list></block><block var="data"/></bl` +
        `ock></block></script></scripts></block-definition><block-definition ` +
        `s="show table %#1" type="command" category="lists" selector="doShowT` +
        `able" primitive="doShowTable"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%l" readonly="true"></inpu` +
        `t></inputs></block-definition><block-definition s="map %#1 to %#2 %#` +
        `3" type="command" category="other" selector="doMapCodeOrHeader" prim` +
        `itive="doMapCodeOrHeader"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%cmdRing" readonly="true"></in` +
        `put><input type="%s" readonly="true">$_code<options>code=$_code&#xD;` +
        `header=$_header</options></input><input type="%mlt"></input></inputs` +
        `></block-definition><block-definition s="map %#1 to code %#2" type="` +
        `command" category="other" selector="doMapValueCode" primitive="doMap` +
        `ValueCode"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true" irreplaceable="true">$_St` +
        `ring<options>String=$_String&#xD;Number=$_Number&#xD;true=$_true&#xD` +
        `;false=$_false</options></input><input type="%mlt">&lt;#1&gt;</input` +
        `></inputs></block-definition><block-definition s="map %#1 of %#2 to ` +
        `code %#3" type="command" category="other" selector="doMapListCode" p` +
        `rimitive="doMapListCode"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true"><options>li` +
        `st=$_list&#xD;item=$_item&#xD;delimiter=$_delimiter</options></input` +
        `><input type="%s" readonly="true"><options>collection=$_collection&#` +
        `xD;variables=$_variables&#xD;parameters=$_parameters</options></inpu` +
        `t><input type="%mlt"></input></inputs></block-definition><block-defi` +
        `nition s="code of %#1" type="reporter" category="other" selector="re` +
        `portMappedCode" primitive="reportMappedCode"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%cmdRing" r` +
        `eadonly="true"></input></inputs></block-definition><block-definition` +
        ` s="%#1 primitive %#2" type="command" category="other" selector="doP` +
        `rimitive" primitive="doPrimitive"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%b" readonly="true" ir` +
        `replaceable="true">true</input><input type="%s" readonly="true" irre` +
        `placeable="true"><options>§_primitivesMenu</options></input></inputs` +
        `></block-definition><block-definition s="extension %#1 %#2" type="co` +
        `mmand" category="other" selector="doApplyExtension" primitive="doApp` +
        `lyExtension"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true"><o` +
        `ptions>§_extensionsMenu</options></input><input type="%mult%s" reado` +
        `nly="true"></input></inputs></block-definition><block-definition s="` +
        `extension %#1 %#2" type="reporter" category="other" selector="report` +
        `ApplyExtension" primitive="reportApplyExtension"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true"><options>§_extensionsMenu</options` +
        `></input><input type="%mult%s" readonly="true"></input></inputs></bl` +
        `ock-definition><block-definition s="set video transparency to %#1" t` +
        `ype="command" category="sensing" selector="doSetVideoTransparency" p` +
        `rimitive="doSetVideoTransparency"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%n">50</input></inputs` +
        `></block-definition><block-definition s="video %#1 on %#2" type="rep` +
        `orter" category="sensing" selector="reportVideo" primitive="reportVi` +
        `deo"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true" irreplaceable="true">$_motion<o` +
        `ptions>snap=$_snap&#xD;motion=$_motion&#xD;direction=$_direction</op` +
        `tions></input><input type="%s" readonly="true">$_myself<options>§_ob` +
        `jectsMenuWithSelf</options></input></inputs></block-definition></pri` +
        `mitives></blocks>`,
        this.stage
    );
};
