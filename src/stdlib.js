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

modules.stdlib = '2023-October-25';

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
        `om</options></input></inputs><script><block s="doFaceTowards"><block` +
        ` s="reportVariadicSum"><list><block s="getPosition"></block><block s` +
        `="reportIfElse"><block s="reportVariadicEquals"><list><block s="repo` +
        `rtJoinWords"><list><block var="angle"/></list></block><l>random</l><` +
        `/list></block><block s="reportNewList"><list><block s="reportMonadic` +
        `"><l><option>sin</option></l><block s="reportRandom"><l>0.1</l><l>36` +
        `0.1</l></block></block><block s="reportMonadic"><l><option>cos</opti` +
        `on></l><block s="reportRandom"><l>0.1</l><l>360.1</l></block></block` +
        `></list></block><block s="reportNewList"><list><block s="reportMonad` +
        `ic"><l><option>sin</option></l><block var="angle"/></block><block s=` +
        `"reportMonadic"><l><option>cos</option></l><block var="angle"/></blo` +
        `ck></list></block></block></list></block></block></script></block-de` +
        `finition><block-definition s="point towards %#1" type="command" cate` +
        `gory="motion" selector="doFaceTowards" primitive="doFaceTowards"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true">$_mouse-pointer<options>§_destinationsM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="go to x: %&apos;x&apos; y: %&apos;y&apos;" type="command" category` +
        `="motion" selector="gotoXY"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">0</input><input type="%n` +
        `">0</input><input type="%n">0</input><input type="%n">0</input><inpu` +
        `t type="%n">0</input></inputs><script><block s="doGotoObject"><block` +
        ` s="reportNewList"><list><block var="x"/><block var="y"/></list></bl` +
        `ock></block></script></block-definition><block-definition s="go to %` +
        `#1" type="command" category="motion" selector="doGotoObject" primiti` +
        `ve="doGotoObject"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s" readonly="true">$_random position<` +
        `options>§_destinationsMenu</options></input></inputs></block-definit` +
        `ion><block-definition s="glide %&apos;span&apos; secs to x: %&apos;x` +
        `&apos; y: %&apos;y&apos;" type="command" category="motion" selector=` +
        `"doGlide"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">1</input><input type="%n">0</input><input ` +
        `type="%n">0</input><input type="%n">1</input><input type="%n">0</inp` +
        `ut><input type="%n">0</input><input type="%n">1</input></inputs><scr` +
        `ipt><block s="doDeclareVariables"><list><l>pos</l><l>start</l><l>fra` +
        `ct</l></list></block><block s="doSetVar"><l>pos</l><block s="getPosi` +
        `tion"></block></block><block s="doSetVar"><l>start</l><block s="repo` +
        `rtDate"><l><option>time in milliseconds</option></l></block></block>` +
        `<block s="doUntil"><block s="reportVariadicGreaterThanOrEquals"><lis` +
        `t><block var="fract"/><l>1</l></list></block><script><block s="doSet` +
        `Var"><l>fract</l><block s="reportQuotient"><block s="reportDifferenc` +
        `e"><block s="reportDate"><l><option>time in milliseconds</option></l` +
        `></block><block var="start"/></block><block s="reportVariadicProduct` +
        `"><list><block var="span"/><l>1000</l></list></block></block></block` +
        `><block s="doGotoObject"><block s="reportVariadicSum"><list><block v` +
        `ar="pos"/><block s="reportVariadicProduct"><list><block s="reportDif` +
        `ference"><block s="reportNewList"><list><block var="x"/><block var="` +
        `y"/></list></block><block var="pos"/></block><block var="fract"/></l` +
        `ist></block></list></block></block></script></block><block s="gotoXY` +
        `"><block var="x"/><block var="y"/></block></script></block-definitio` +
        `n><block-definition s="change x by %&apos;delta&apos;" type="command` +
        `" category="motion" selector="changeXPosition"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">10</i` +
        `nput><input type="%n">10</input><input type="%n">10</input></inputs>` +
        `<script><block s="setXPosition"><block s="reportVariadicSum"><list><` +
        `block s="xPosition"></block><block var="delta"/></list></block></blo` +
        `ck></script></block-definition><block-definition s="set x to %&apos;` +
        `x&apos;" type="command" category="motion" selector="setXPosition"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">0</input><input type="%n">0</input><input type="%n">0<` +
        `/input></inputs><script><block s="doGotoObject"><block s="reportNewL` +
        `ist"><list><block var="x"/><block s="yPosition"></block></list></blo` +
        `ck></block></script></block-definition><block-definition s="change y` +
        ` by %&apos;delta&apos;" type="command" category="motion" selector="c` +
        `hangeYPosition"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">10</input><input type="%n">10</input` +
        `><input type="%n">10</input></inputs><script><block s="setYPosition"` +
        `><block s="reportVariadicSum"><list><block s="yPosition"></block><bl` +
        `ock var="delta"/></list></block></block></script></block-definition>` +
        `<block-definition s="set y to %&apos;y&apos;" type="command" categor` +
        `y="motion" selector="setYPosition"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">0</input><input t` +
        `ype="%n">0</input><input type="%n">0</input></inputs><script><block ` +
        `s="doGotoObject"><block s="reportNewList"><list><block s="xPosition"` +
        `></block><block var="y"/></list></block></block></script></block-def` +
        `inition><block-definition s="if on edge, bounce" type="command" cate` +
        `gory="motion" selector="bounceOffEdge"><header></header><code></code` +
        `><translations></translations><inputs></inputs><script><block s="doI` +
        `f"><block s="reportTouchingObject"><l><option>edge</option></l></blo` +
        `ck><script><block s="doDeclareVariables"><list><l>get bounds</l><l>b` +
        `ounds</l><l>center</l><l>stage bounds</l><l>dir x</l><l>dir y</l><l>` +
        `delta x</l><l>delta y</l></list></block><block s="doSetVar"><l>get b` +
        `ounds</l><block s="reifyReporter"><autolambda><block s="reportNewLis` +
        `t"><list><block s="reportVariadicMin"><block s="reportCONS"><block s` +
        `="reportNewList"><list><block s="reportGet"><l><option>left</option>` +
        `</l></block><block s="reportGet"><l><option>bottom</option></l></blo` +
        `ck></list></block><block s="reportMap"><block s="reifyReporter"><aut` +
        `olambda><block s="reportNewList"><list><block s="reportAttributeOf">` +
        `<l><option>left</option></l><l></l></block><block s="reportAttribute` +
        `Of"><l><option>bottom</option></l><l></l></block></list></block></au` +
        `tolambda><list></list></block><block s="reportGet"><l><option>parts<` +
        `/option></l></block></block></block></block><block s="reportVariadic` +
        `Max"><block s="reportCONS"><block s="reportNewList"><list><block s="` +
        `reportGet"><l><option>right</option></l></block><block s="reportGet"` +
        `><l><option>top</option></l></block></list></block><block s="reportM` +
        `ap"><block s="reifyReporter"><autolambda><block s="reportNewList"><l` +
        `ist><block s="reportAttributeOf"><l><option>right</option></l><l></l` +
        `></block><block s="reportAttributeOf"><l><option>top</option></l><l>` +
        `</l></block></list></block></autolambda><list></list></block><block ` +
        `s="reportGet"><l><option>parts</option></l></block></block></block><` +
        `/block></list></block></autolambda><list></list></block></block><blo` +
        `ck s="doSetVar"><l>bounds</l><block s="evaluate"><block var="get bou` +
        `nds"/><list></list></block></block><block s="doSetVar"><l>center</l>` +
        `<block s="reportQuotient"><block s="reportVariadicSum"><block var="b` +
        `ounds"/></block><l>2</l></block></block><block s="doSetVar"><l>stage` +
        ` bounds</l><block s="reportAskFor"><block s="reportGet"><l><option>s` +
        `tage</option></l></block><block s="reifyReporter"><autolambda><block` +
        ` s="reportNewList"><list><block s="reportNewList"><list><block s="re` +
        `portGet"><l><option>left</option></l></block><block s="reportGet"><l` +
        `><option>bottom</option></l></block></list></block><block s="reportN` +
        `ewList"><list><block s="reportGet"><l><option>right</option></l></bl` +
        `ock><block s="reportGet"><l><option>top</option></l></block></list><` +
        `/block></list></block></autolambda><list></list></block><list></list` +
        `></block></block><block s="doSetVar"><l>dir x</l><block s="reportMon` +
        `adic"><l><option>sin</option></l><block s="direction"></block></bloc` +
        `k></block><block s="doSetVar"><l>dir y</l><block s="reportMonadic"><` +
        `l><option>cos</option></l><block s="direction"></block></block></blo` +
        `ck><block s="doIf"><block s="reportVariadicLessThan"><list><block s=` +
        `"reportListItem"><l>1</l><block s="reportListItem"><l>1</l><block va` +
        `r="bounds"/></block></block><block s="reportListItem"><l>1</l><block` +
        ` s="reportListItem"><l>1</l><block var="stage bounds"/></block></blo` +
        `ck></list></block><script><block s="doSetVar"><l>dir x</l><block s="` +
        `reportMonadic"><l><option>abs</option></l><block var="dir x"/></bloc` +
        `k></block></script><list></list></block><block s="doIf"><block s="re` +
        `portVariadicGreaterThan"><list><block s="reportListItem"><l>1</l><bl` +
        `ock s="reportListItem"><l>2</l><block var="bounds"/></block></block>` +
        `<block s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l>` +
        `<block var="stage bounds"/></block></block></list></block><script><b` +
        `lock s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><option>ne` +
        `g</option></l><block s="reportMonadic"><l><option>abs</option></l><b` +
        `lock var="dir x"/></block></block></block></script><list></list></bl` +
        `ock><block s="doIf"><block s="reportVariadicGreaterThan"><list><bloc` +
        `k s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><bloc` +
        `k var="bounds"/></block></block><block s="reportListItem"><l>2</l><b` +
        `lock s="reportListItem"><l>2</l><block var="stage bounds"/></block><` +
        `/block></list></block><script><block s="doSetVar"><l>dir y</l><block` +
        ` s="reportMonadic"><l><option>neg</option></l><block s="reportMonadi` +
        `c"><l><option>abs</option></l><block var="dir y"/></block></block></` +
        `block></script><list></list></block><block s="doIf"><block s="report` +
        `VariadicLessThan"><list><block s="reportListItem"><l>2</l><block s="` +
        `reportListItem"><l>1</l><block var="bounds"/></block></block><block ` +
        `s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><block ` +
        `var="stage bounds"/></block></block></list></block><script><block s=` +
        `"doSetVar"><l>dir y</l><block s="reportMonadic"><l><option>abs</opti` +
        `on></l><block var="dir y"/></block></block></script><list></list></b` +
        `lock><block s="setHeading"><block s="reportAtan2"><block var="dir x"` +
        `/><block var="dir y"/></block></block><block s="doSetVar"><l>bounds<` +
        `/l><block s="evaluate"><block var="get bounds"/><list></list></block` +
        `></block><block s="doGotoObject"><block s="reportVariadicSum"><list>` +
        `<block s="getPosition"></block><block s="reportDifference"><block va` +
        `r="center"/><block s="reportQuotient"><block s="reportVariadicSum"><` +
        `block var="bounds"/></block><l>2</l></block></block></list></block><` +
        `/block><block s="doSetVar"><l>bounds</l><block s="evaluate"><block v` +
        `ar="get bounds"/><list></list></block></block><block s="doIf"><block` +
        ` s="reportVariadicGreaterThan"><list><block s="reportListItem"><l>1<` +
        `/l><block s="reportListItem"><l>2</l><block var="bounds"/></block></` +
        `block><block s="reportListItem"><l>1</l><block s="reportListItem"><l` +
        `>2</l><block var="stage bounds"/></block></block></list></block><scr` +
        `ipt><block s="doSetVar"><l>delta x</l><block s="reportDifference"><b` +
        `lock s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l><b` +
        `lock var="stage bounds"/></block></block><block s="reportListItem"><` +
        `l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/></bloc` +
        `k></block></block></block></script><list></list></block><block s="do` +
        `If"><block s="reportVariadicLessThan"><list><block s="reportListItem` +
        `"><l>2</l><block s="reportListItem"><l>1</l><block var="bounds"/></b` +
        `lock></block><block s="reportListItem"><l>2</l><block s="reportListI` +
        `tem"><l>1</l><block var="stage bounds"/></block></block></list></blo` +
        `ck><script><block s="doSetVar"><l>delta y</l><block s="reportDiffere` +
        `nce"><block s="reportListItem"><l>2</l><block s="reportListItem"><l>` +
        `1</l><block var="stage bounds"/></block></block><block s="reportList` +
        `Item"><l>2</l><block s="reportListItem"><l>1</l><block var="bounds"/` +
        `></block></block></block></block></script><list></list></block><bloc` +
        `k s="doIf"><block s="reportVariadicLessThan"><list><block s="reportL` +
        `istItem"><l>1</l><block s="reportListItem"><l>1</l><block var="bound` +
        `s"/></block></block><block s="reportListItem"><l>1</l><block s="repo` +
        `rtListItem"><l>1</l><block var="stage bounds"/></block></block></lis` +
        `t></block><script><block s="doSetVar"><l>delta x</l><block s="report` +
        `Difference"><block s="reportListItem"><l>1</l><block s="reportListIt` +
        `em"><l>1</l><block var="stage bounds"/></block></block><block s="rep` +
        `ortListItem"><l>1</l><block s="reportListItem"><l>1</l><block var="b` +
        `ounds"/></block></block></block></block></script><list></list></bloc` +
        `k><block s="doIf"><block s="reportVariadicGreaterThan"><list><block ` +
        `s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><block ` +
        `var="bounds"/></block></block><block s="reportListItem"><l>2</l><blo` +
        `ck s="reportListItem"><l>2</l><block var="stage bounds"/></block></b` +
        `lock></list></block><script><block s="doSetVar"><l>delta y</l><block` +
        ` s="reportDifference"><block s="reportListItem"><l>2</l><block s="re` +
        `portListItem"><l>2</l><block var="stage bounds"/></block></block><bl` +
        `ock s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><bl` +
        `ock var="bounds"/></block></block></block></block></script><list></l` +
        `ist></block><block s="doGotoObject"><block s="reportVariadicSum"><li` +
        `st><block s="getPosition"></block><block s="reportNewList"><list><bl` +
        `ock var="delta x"/><block var="delta y"/></list></block></list></blo` +
        `ck></block></script><list></list></block></script></block-definition` +
        `><block-definition s="position" type="reporter" category="motion" se` +
        `lector="getPosition"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs><script><block s="doReport"><block s="r` +
        `eportNewList"><list><block s="xPosition"></block><block s="yPosition` +
        `"></block></list></block></block></script></block-definition><block-` +
        `definition s="x position" type="reporter" category="motion" selector` +
        `="xPosition" primitive="xPosition"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="y position" type="reporter" category="motion" selecto` +
        `r="yPosition" primitive="yPosition"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="direction" type="reporter" category="motion" selecto` +
        `r="direction" primitive="direction"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="switch to costume %#1" type="command" category="look` +
        `s" selector="doSwitchToCostume" primitive="doSwitchToCostume"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true"><options>§_costumesMenu</options></input><` +
        `/inputs></block-definition><block-definition s="next costume" type="` +
        `command" category="looks" selector="doWearNextCostume"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs><scri` +
        `pt><block s="doIf"><block s="reportVariadicGreaterThan"><list><block` +
        ` s="getCostumeIdx"></block><l>0</l></list></block><script><block s="` +
        `doSwitchToCostume"><block s="reportVariadicSum"><list><block s="repo` +
        `rtModulus"><block s="getCostumeIdx"></block><block s="reportListAttr` +
        `ibute"><l><option>length</option></l><block s="reportGet"><l><option` +
        `>costumes</option></l></block></block></block><l>1</l></list></block` +
        `></block></script><list></list></block></script></block-definition><` +
        `block-definition s="costume #" type="reporter" category="looks" sele` +
        `ctor="getCostumeIdx"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs><script><block s="doReport"><block s="r` +
        `eportListIndex"><block s="reportGet"><l><option>costume</option></l>` +
        `</block><block s="reportGet"><l><option>costumes</option></l></block` +
        `></block></block></script></block-definition><block-definition s="%#` +
        `1 of costume %#2" type="reporter" category="looks" selector="reportG` +
        `etImageAttribute" primitive="reportGetImageAttribute"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true" irreplaceable="true">$_width<options>name=$_name&#` +
        `xD;width=$_width&#xD;height=$_height&#xD;pixels=$_pixels</options></` +
        `input><input type="%s" readonly="true">$_current<options>§_costumesM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="new costume %#1 width %#2 height %#3" type="reporter" category="lo` +
        `oks" selector="reportNewCostume" primitive="reportNewCostume"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%l" readonly="true"></input><input type="%n"><options>a List [` +
        `2 elements]</options></input><input type="%n"><options>a List [2 ele` +
        `ments]</options></input></inputs></block-definition><block-definitio` +
        `n s="stretch %#1 x: %#2 y: %#3 %" type="reporter" category="looks" s` +
        `elector="reportNewCostumeStretched" primitive="reportNewCostumeStret` +
        `ched"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true">$_current<options>§_costumesMe` +
        `nu</options></input><input type="%n">100</input><input type="%n">50<` +
        `/input></inputs></block-definition><block-definition s="skew %#1 to ` +
        `%#2 degrees %#3 %" type="reporter" category="looks" selector="report` +
        `NewCostumeSkewed" primitive="reportNewCostumeSkewed"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true">$_current<options>§_costumesMenu</options></input><` +
        `input type="%n">0<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-9` +
        `0&#xD;(0) up=0&#xD;(180) down=180&#xD;random=$_random</options></inp` +
        `ut><input type="%n">50</input></inputs></block-definition><block-def` +
        `inition s="say %&apos;msg&apos; for %&apos;time&apos; secs" type="co` +
        `mmand" category="looks" selector="doSayFor"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">Hello!</` +
        `input><input type="%n">2</input><input type="%s">Hello!</input><inpu` +
        `t type="%n">2</input><input type="%s">Hello!</input></inputs><script` +
        `><block s="bubble"><block var="msg"/></block><block s="doWait"><bloc` +
        `k var="time"/></block><block s="bubble"><l></l></block></script></bl` +
        `ock-definition><block-definition s="say %#1" type="command" category` +
        `="looks" selector="bubble" primitive="bubble"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s">Hello!` +
        `</input></inputs></block-definition><block-definition s="think %&apo` +
        `s;msg&apos; for %&apos;time&apos; secs" type="command" category="loo` +
        `ks" selector="doThinkFor"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s">Hmm...</input><input type=` +
        `"%n">2</input><input type="%s">Hmm...</input><input type="%n">2</inp` +
        `ut><input type="%s">Hmm...</input></inputs><script><block s="doThink` +
        `"><block var="msg"/></block><block s="doWait"><block var="time"/></b` +
        `lock><block s="doThink"><l></l></block></script></block-definition><` +
        `block-definition s="think %#1" type="command" category="looks" selec` +
        `tor="doThink" primitive="doThink"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s">Hmm...</input></in` +
        `puts></block-definition><block-definition s="change %&apos;effect na` +
        `me&apos; effect by %&apos;delta&apos;" type="command" category="look` +
        `s" selector="changeEffect" primitive="changeEffect"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true" irreplaceable="true">$_ghost<options>color=$_color&#` +
        `xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$_g` +
        `host&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate` +
        `&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><input` +
        ` type="%n">25</input><input type="%s" readonly="true" irreplaceable=` +
        `"true">$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD` +
        `;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD` +
        `;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negat` +
        `ive=$_negative</options></input><input type="%n">25</input><input ty` +
        `pe="%s" readonly="true" irreplaceable="true">ghost<options>color&#xD` +
        `;saturation&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixel` +
        `ate&#xD;mosaic&#xD;negative</options></input></inputs></block-defini` +
        `tion><block-definition s="set %#1 effect to %#2" type="command" cate` +
        `gory="looks" selector="setEffect" primitive="setEffect"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true" irreplaceable="true">$_ghost<options>color=$_col` +
        `or&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghost` +
        `=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixe` +
        `late&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><i` +
        `nput type="%n">0</input></inputs></block-definition><block-definitio` +
        `n s="%#1 effect" type="reporter" category="looks" selector="getEffec` +
        `t" primitive="getEffect"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true">$_ghost<options>color=$_color&#xD;saturation=$_saturation&` +
        `#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&` +
        `#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;ne` +
        `gative=$_negative</options></input></inputs></block-definition><bloc` +
        `k-definition s="clear graphic effects" type="command" category="look` +
        `s" selector="clearEffects" primitive="clearEffects"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="change size by %&apos;delta&apos;" t` +
        `ype="command" category="looks" selector="changeScale"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">10</input><input type="%n">10</input><input type="%n">10</input></` +
        `inputs><script><block s="setScale"><block s="reportVariadicSum"><lis` +
        `t><block s="getScale"></block><block var="delta"/></list></block></b` +
        `lock></script></block-definition><block-definition s="set size to %#` +
        `1 %" type="command" category="looks" selector="setScale" primitive="` +
        `setScale"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">100</input></inputs></block-definition><bl` +
        `ock-definition s="size" type="reporter" category="looks" selector="g` +
        `etScale" primitive="getScale"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="show" type="command" category="looks" selector="show" prim` +
        `itive="show"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="hide" t` +
        `ype="command" category="looks" selector="hide" primitive="hide"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="shown?" type="predicate"` +
        ` category="looks" selector="reportShown" primitive="reportShown"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="go to %&apos;name&apos;` +
        ` layer" type="command" category="looks" selector="goToLayer" primiti` +
        `ve="goToLayer"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s" readonly="true" irreplaceable="true">` +
        `$_front<options>front=$_front&#xD;back=$_back</options></input><inpu` +
        `t type="%s" readonly="true" irreplaceable="true">$_front<options>fro` +
        `nt=$_front&#xD;back=$_back</options></input><input type="%s" readonl` +
        `y="true" irreplaceable="true">$_front<options>front=$_front&#xD;back` +
        `=$_back</options></input></inputs><scripts><script x="10" y="97.8333` +
        `3333333331"><block s="doIfElse"><block s="reportVariadicEquals"><lis` +
        `t><block s="reportJoinWords"><list><block var="name"/></list></block` +
        `><l>back</l></list></block><script><block s="doWarp"><script><block ` +
        `s="doUntil"><block s="reportVariadicEquals"><list><block s="reportLi` +
        `stIndex"><block s="reportGet"><l><option>self</option></l></block><b` +
        `lock s="reportAskFor"><block s="reportGet"><l><option>stage</option>` +
        `</l></block><block s="reifyReporter"><autolambda><block s="reportGet` +
        `"><l><option>other sprites</option></l></block></autolambda><list></` +
        `list></block><list></list></block></block><l>1</l></list></block><sc` +
        `ript><block s="goBack"><l>1</l></block></script></block></script></b` +
        `lock></script><script><block s="doWarp"><script><block s="doUntil"><` +
        `block s="reportVariadicEquals"><list><block s="reportListIndex"><blo` +
        `ck s="reportGet"><l><option>self</option></l></block><block s="repor` +
        `tAskFor"><block s="reportGet"><l><option>stage</option></l></block><` +
        `block s="reifyReporter"><autolambda><block s="reportGet"><l><option>` +
        `other sprites</option></l></block></autolambda><list></list></block>` +
        `<list></list></block></block><block s="reportVariadicSum"><list><blo` +
        `ck s="reportListAttribute"><l><option>length</option></l><block s="r` +
        `eportGet"><l><option>other sprites</option></l></block></block><l>1<` +
        `/l></list></block></list></block><script><block s="goBack"><l>-1</l>` +
        `</block></script></block></script></block></script></block></script>` +
        `</scripts></block-definition><block-definition s="go back %#1 layers` +
        `" type="command" category="looks" selector="goBack" primitive="goBac` +
        `k"><header></header><code></code><translations></translations><input` +
        `s><input type="%n">1</input></inputs></block-definition><block-defin` +
        `ition s="save %#1 as costume named %#2" type="command" category="loo` +
        `ks" selector="doScreenshot" primitive="doScreenshot"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true">$_pen trails<options>pen trails=$_pen trails&#xD;st` +
        `age image=$_stage image</options></input><input type="%s">screenshot` +
        `</input></inputs></block-definition><block-definition s="wardrobe" t` +
        `ype="reporter" category="looks" selector="reportCostumes" primitive=` +
        `"reportCostumes"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="ale` +
        `rt %#1" type="command" category="looks" selector="alert" primitive="` +
        `alert"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true"></input></inputs></block` +
        `-definition><block-definition s="console log %#1" type="command" cat` +
        `egory="looks" selector="log" primitive="log"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%mult%s" re` +
        `adonly="true"></input></inputs></block-definition><block-definition ` +
        `s="play sound %#1" type="command" category="sound" selector="playSou` +
        `nd" primitive="playSound"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true"><options>§` +
        `_soundsMenu</options></input></inputs></block-definition><block-defi` +
        `nition s="play sound %&apos;target&apos; until done" type="command" ` +
        `category="sound" selector="doPlaySoundUntilDone" primitive="doPlaySo` +
        `undUntilDone"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true"><options>§_soundsMenu<` +
        `/options></input><input type="%s" readonly="true"><options>§_soundsM` +
        `enu</options></input><input type="%s" readonly="true"><options>§_sou` +
        `ndsMenu</options></input></inputs><script><block s="doDeclareVariabl` +
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
        `cript><scripts><script x="10" y="98"><block s="doDeclareVariables"><` +
        `list><l>sound</l></list></block><block s="doSetVar"><l>sound</l><blo` +
        `ck s="reportIfElse"><block s="reportIsA"><block var="target"/><l><op` +
        `tion>sound</option></l></block><block var="target"/><block s="report` +
        `IfElse"><block s="reportIsA"><block var="target"/><l><option>list</o` +
        `ption></l></block><block s="reportNewSoundFromSamples"><block var="t` +
        `arget"/><l>44100</l></block><block s="reportFindFirst"><block s="rei` +
        `fyPredicate"><autolambda><block s="reportVariadicEquals"><list><bloc` +
        `k s="reportGetSoundAttribute"><l><option>name</option></l><l></l></b` +
        `lock><block var="target"/></list></block></autolambda><list></list><` +
        `/block><block s="reportGet"><l><option>sounds</option></l></block></` +
        `block></block></block></block><block s="doIf"><block s="reportIsA"><` +
        `block var="sound"/><l><option>sound</option></l></block><script><blo` +
        `ck s="playSound"><block var="sound"/></block><block s="doWait"><bloc` +
        `k s="reportGetSoundAttribute"><l><option>duration</option></l><block` +
        ` var="sound"/></block></block></script><list></list></block></script` +
        `></scripts></block-definition><block-definition s="play sound %&apos` +
        `;target&apos; at %&apos;rate&apos; Hz" type="command" category="soun` +
        `d" selector="doPlaySoundAtRate" primitive="doPlaySoundAtRate"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true"><options>§_soundsMenu</options></input><in` +
        `put type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;4` +
        `8 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input><in` +
        `put type="%s" readonly="true"><options>§_soundsMenu</options></input` +
        `><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#` +
        `xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input` +
        `><input type="%s" readonly="true"><options>§_soundsMenu</options></i` +
        `nput></inputs><script><block s="playSound"><block s="reportNewSoundF` +
        `romSamples"><block s="reportGetSoundAttribute"><l><option>samples</o` +
        `ption></l><block var="target"/></block><block var="rate"/></block></` +
        `block></script><scripts><script x="10" y="98"><block s="playSound"><` +
        `block s="reportNewSoundFromSamples"><block s="reportGetSoundAttribut` +
        `e"><l><option>samples</option></l><block var="target"/></block><bloc` +
        `k var="rate"/></block></block></script></scripts></block-definition>` +
        `<block-definition s="stop all sounds" type="command" category="sound` +
        `" selector="doStopAllSounds" primitive="doStopAllSounds"><header></h` +
        `eader><code></code><translations></translations><inputs></inputs></b` +
        `lock-definition><block-definition s="%#1 of sound %#2" type="reporte` +
        `r" category="sound" selector="reportGetSoundAttribute" primitive="re` +
        `portGetSoundAttribute"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true" irreplaceable` +
        `="true">$_duration<options>name=$_name&#xD;duration=$_duration&#xD;l` +
        `ength=$_length&#xD;number of channels=$_number of channels&#xD;sampl` +
        `e rate=$_sample rate&#xD;samples=$_samples</options></input><input t` +
        `ype="%s" readonly="true"><options>§_soundsMenu</options></input></in` +
        `puts></block-definition><block-definition s="new sound %#1 rate %#2 ` +
        `Hz" type="reporter" category="sound" selector="reportNewSoundFromSam` +
        `ples" primitive="reportNewSoundFromSamples"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%l" readonly` +
        `="true"></input><input type="%n">44100<options>22.05 kHz=22050&#xD;4` +
        `4.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</` +
        `options></input></inputs></block-definition><block-definition s="res` +
        `t for %&apos;beats&apos; beats" type="command" category="sound" sele` +
        `ctor="doRest" primitive="doRest"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">0.2</input><input t` +
        `ype="%n">0.2</input><input type="%n">0.2</input></inputs><scripts><s` +
        `cript x="10" y="97.83333333333331"><block s="doWait"><block s="repor` +
        `tQuotient"><l>60</l><block s="reportVariadicProduct"><list><block va` +
        `r="beats"/><block s="getTempo"></block></list></block></block></bloc` +
        `k></script></scripts></block-definition><block-definition s="play no` +
        `te %#1 for %#2 beats" type="command" category="sound" selector="doPl` +
        `ayNote" primitive="doPlayNote"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">60<options>§_pianoKey` +
        `boardMenu</options></input><input type="%n">0.5</input></inputs></bl` +
        `ock-definition><block-definition s="play %#1 Hz for %#2 secs" type="` +
        `command" category="sound" selector="doPlayFrequency" primitive="doPl` +
        `ayFrequency"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%n">440</input><input type="%n">2</input></` +
        `inputs></block-definition><block-definition s="set instrument to %#1` +
        `" type="command" category="sound" selector="doSetInstrument" primiti` +
        `ve="doSetInstrument"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%n">1<options>(1) sine=1&#xD;(2) sq` +
        `uare=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</options></input></inpu` +
        `ts></block-definition><block-definition s="change tempo by %&apos;de` +
        `lta&apos;" type="command" category="sound" selector="doChangeTempo">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">20</input><input type="%n">20</input><input type="%n` +
        `">20</input></inputs><script><block s="doSetTempo"><block s="reportV` +
        `ariadicSum"><list><block s="getTempo"></block><block var="delta"/></` +
        `list></block></block></script></block-definition><block-definition s` +
        `="set tempo to %#1 bpm" type="command" category="sound" selector="do` +
        `SetTempo" primitive="doSetTempo"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%n">60</input></inputs>` +
        `</block-definition><block-definition s="tempo" type="reporter" categ` +
        `ory="sound" selector="getTempo" primitive="getTempo"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="change volume by %&apos;delta&apos;` +
        `" type="command" category="sound" selector="changeVolume"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%n">10</input><input type="%n">10</input><input type="%n">10</inpu` +
        `t></inputs><script><block s="setVolume"><block s="reportVariadicSum"` +
        `><list><block s="getVolume"></block><block var="delta"/></list></blo` +
        `ck></block></script></block-definition><block-definition s="set volu` +
        `me to %#1 %" type="command" category="sound" selector="setVolume" pr` +
        `imitive="setVolume"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">100</input></inputs></block-defi` +
        `nition><block-definition s="volume" type="reporter" category="sound"` +
        ` selector="getVolume" primitive="getVolume"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="change balance by %&apos;delta&apos;" type="` +
        `command" category="sound" selector="changePan"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">10</i` +
        `nput><input type="%n">10</input><input type="%n">10</input></inputs>` +
        `<script><block s="setPan"><block s="reportVariadicSum"><list><block ` +
        `s="getPan"></block><block var="delta"/></list></block></block></scri` +
        `pt></block-definition><block-definition s="set balance to %#1" type=` +
        `"command" category="sound" selector="setPan" primitive="setPan"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">0</input></inputs></block-definition><block-definition s` +
        `="balance" type="reporter" category="sound" selector="getPan" primit` +
        `ive="getPan"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="play fr` +
        `equency %#1 Hz" type="command" category="sound" selector="playFreq" ` +
        `primitive="playFreq"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%n">440</input></inputs></block-def` +
        `inition><block-definition s="stop frequency" type="command" category` +
        `="sound" selector="stopFreq" primitive="stopFreq"><header></header><` +
        `code></code><translations></translations><inputs></inputs></block-de` +
        `finition><block-definition s="jukebox" type="reporter" category="sou` +
        `nd" selector="reportSounds" primitive="reportSounds"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="clear" type="command" category="pen` +
        `" selector="clear" primitive="clear"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="pen down" type="command" category="pen" selector="d` +
        `own" primitive="down"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="pen up" type="command" category="pen" selector="up" primitive="up"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="pen down?" type="pr` +
        `edicate" category="pen" selector="getPenDown" primitive="getPenDown"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="set pen color to %&` +
        `apos;color&apos;" type="command" category="pen" selector="setColor">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%clr" readonly="true" irreplaceable="true"></input><inpu` +
        `t type="%clr" readonly="true" irreplaceable="true"></input><input ty` +
        `pe="%clr" readonly="true" irreplaceable="true"></input></inputs><scr` +
        `ipt><block s="doApplyExtension"><l>clr_setpen(clr)</l><list><block v` +
        `ar="color"/></list></block></script></block-definition><block-defini` +
        `tion s="set pen %#1 to %#2" type="command" category="pen" selector="` +
        `setPenColorDimension" primitive="setPenColorDimension"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;` +
        `saturation=$_saturation&#xD;brightness=$_brightness&#xD;transparency` +
        `=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></inpu` +
        `t><input type="%n">50</input></inputs></block-definition><block-defi` +
        `nition s="change pen %&apos;aspect&apos; by %&apos;delta&apos;" type` +
        `="command" category="pen" selector="changePenColorDimension" primiti` +
        `ve="changePenColorDimension"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#x` +
        `D;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;` +
        `&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10</inp` +
        `ut><input type="%s" readonly="true" irreplaceable="true">$_hue<optio` +
        `ns>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness` +
        `&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a` +
        `)</options></input><input type="%n">10</input><input type="%s" reado` +
        `nly="true" irreplaceable="true">hue<options>hue&#xD;saturation&#xD;b` +
        `rightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input` +
        `></inputs></block-definition><block-definition s="pen %#1" type="rep` +
        `orter" category="pen" selector="getPenAttribute" primitive="getPenAt` +
        `tribute"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true" irreplaceable="true">$_hue<` +
        `options>size=$_size&#xD;hue=$_hue&#xD;saturation=$_saturation&#xD;br` +
        `ightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD` +
        `;r-g-b-a=$_r-g-b-a</options></input></inputs></block-definition><blo` +
        `ck-definition s="set background color to %#1" type="command" categor` +
        `y="pen" selector="setBackgroundColor" primitive="setBackgroundColor"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%clr" readonly="true" irreplaceable="true"></input></in` +
        `puts></block-definition><block-definition s="set background %#1 to %` +
        `#2" type="command" category="pen" selector="setBackgroundColorDimens` +
        `ion" primitive="setBackgroundColorDimension"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation` +
        `=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_transpa` +
        `rency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input t` +
        `ype="%n">50</input></inputs></block-definition><block-definition s="` +
        `change background %#1 by %#2" type="command" category="pen" selector` +
        `="changeBackgroundColorDimension" primitive="changeBackgroundColorDi` +
        `mension"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true" irreplaceable="true">$_hue<` +
        `options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brigh` +
        `tness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g` +
        `-b(-a)</options></input><input type="%n">10</input></inputs></block-` +
        `definition><block-definition s="change pen size by %&apos;delta&apos` +
        `;" type="command" category="pen" selector="changeSize"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `n">1</input><input type="%n">1</input><input type="%n">1</input></in` +
        `puts><script><block s="setSize"><block s="reportVariadicSum"><list><` +
        `block s="getPenAttribute"><l><option>size</option></l></block><block` +
        ` var="delta"/></list></block></block></script></block-definition><bl` +
        `ock-definition s="set pen size to %#1" type="command" category="pen"` +
        ` selector="setSize" primitive="setSize"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1</input></i` +
        `nputs></block-definition><block-definition s="stamp" type="command" ` +
        `category="pen" selector="doStamp" primitive="doStamp"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="fill" type="command" category="pen` +
        `" selector="floodFill" primitive="floodFill"><header></header><code>` +
        `</code><translations></translations><inputs></inputs></block-definit` +
        `ion><block-definition s="write %#1 size %#2" type="command" category` +
        `="pen" selector="write" primitive="write"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s">Hello!</in` +
        `put><input type="%n">12</input></inputs></block-definition><block-de` +
        `finition s="pen trails" type="reporter" category="pen" selector="rep` +
        `ortPenTrailsAsCostume" primitive="reportPenTrailsAsCostume"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="pen vectors" type="reporter"` +
        ` category="pen" selector="reportPentrailsAsSVG" primitive="reportPen` +
        `trailsAsSVG"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="paste o` +
        `n %#1" type="command" category="pen" selector="doPasteOn" primitive=` +
        `"doPasteOn"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true"><options>§_objectsMenu</` +
        `options></input></inputs></block-definition><block-definition s="cut` +
        ` from %#1" type="command" category="pen" selector="doCutFrom" primit` +
        `ive="doCutFrom"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true"><options>§_objectsMe` +
        `nu</options></input></inputs></block-definition><block-definition s=` +
        `"message" type="reporter" category="control" selector="getLastMessag` +
        `e" primitive="getLastMessage"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="broadcast %#1 %#2" type="command" category="control" selec` +
        `tor="doBroadcast" primitive="doBroadcast"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true"><options>§_messagesMenu</options></input><input type="%receive` +
        `" readonly="true" irreplaceable="true" expand="to&#xD;with data" max` +
        `="2"></input></inputs></block-definition><block-definition s="broadc` +
        `ast %#1 %#2 and wait" type="command" category="control" selector="do` +
        `BroadcastAndWait" primitive="doBroadcastAndWait"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true"><options>§_messagesMenu</options></input><input type="%` +
        `receive" readonly="true" irreplaceable="true" expand="to&#xD;with da` +
        `ta" max="2"></input></inputs></block-definition><block-definition s=` +
        `"wait %&apos;duration&apos; secs" type="command" category="control" ` +
        `selector="doWait"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n">1</input><input type="%n">1</input` +
        `><input type="%n">1</input></inputs><script><block s="doDeclareVaria` +
        `bles"><list><l>start time</l></list></block><block s="doSetVar"><l>s` +
        `tart time</l><block s="reportDate"><l><option>time in milliseconds</` +
        `option></l></block></block><block s="doWaitUntil"><block s="reportVa` +
        `riadicGreaterThanOrEquals"><list><block s="reportDate"><l><option>ti` +
        `me in milliseconds</option></l></block><block s="reportVariadicSum">` +
        `<list><block var="start time"/><block s="reportVariadicProduct"><lis` +
        `t><block var="duration"/><l>1000</l></list></block></list></block></` +
        `list></block></block></script></block-definition><block-definition s` +
        `="wait until %&apos;condition&apos;" type="command" category="contro` +
        `l" selector="doWaitUntil"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%boolUE" readonly="true"></inp` +
        `ut><input type="%boolUE" readonly="true"></input><input type="%boolU` +
        `E" readonly="true"></input></inputs><script><block s="doIf"><block s` +
        `="reportNot"><block s="evaluate"><block var="condition"/><list></lis` +
        `t></block></block><script><block s="doWaitUntil"><block s="evaluate"` +
        `><block var="condition"/><list></list></block></block></script><list` +
        `></list></block></script></block-definition><block-definition s="for` +
        `ever %&apos;action&apos;" type="command" category="control" selector` +
        `="doForever"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%loop" readonly="true" irreplaceable="true"` +
        `></input><input type="%loop" readonly="true" irreplaceable="true"></` +
        `input><input type="%loop" readonly="true" irreplaceable="true"></inp` +
        `ut></inputs><script><block s="doRun"><block var="action"/><list></li` +
        `st></block><block s="doRun"><block s="reportEnvironment"><l><option>` +
        `script</option></l></block><list><block var="action"/></list></block` +
        `></script></block-definition><block-definition s="repeat %&apos;coun` +
        `t&apos; %&apos;action&apos;" type="command" category="control" selec` +
        `tor="doRepeat"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">10</input><input type="%loop" readonl` +
        `y="true" irreplaceable="true"></input><input type="%n">10</input><in` +
        `put type="%loop" readonly="true" irreplaceable="true"></input><input` +
        ` type="%loop" readonly="true" irreplaceable="true"></input></inputs>` +
        `<script><block s="doDeclareVariables"><list><l>self</l></list></bloc` +
        `k><block s="doSetVar"><l>self</l><block s="reportEnvironment"><l><op` +
        `tion>script</option></l></block></block><block s="doIf"><block s="re` +
        `portVariadicGreaterThan"><list><block var="count"/><l>0</l></list></` +
        `block><script><block s="doRun"><block var="action"/><list></list></b` +
        `lock><block s="doApplyExtension"><l>snap_yield</l><list></list></blo` +
        `ck><block s="doRun"><block var="self"/><list><block s="reportDiffere` +
        `nce"><block var="count"/><l>1</l></block><block var="action"/></list` +
        `></block></script><list></list></block></script></block-definition><` +
        `block-definition s="repeat until %&apos;condition&apos; %&apos;actio` +
        `n&apos;" type="command" category="control" selector="doUntil"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%boolUE" readonly="true"></input><input type="%loop" readonly=` +
        `"true" irreplaceable="true"></input><input type="%boolUE" readonly="` +
        `true"></input><input type="%loop" readonly="true" irreplaceable="tru` +
        `e"></input><input type="%loop" readonly="true" irreplaceable="true">` +
        `</input></inputs><script><block s="doDeclareVariables"><list><l>self` +
        `</l></list></block><block s="doSetVar"><l>self</l><block s="reportEn` +
        `vironment"><l><option>script</option></l></block></block><block s="d` +
        `oIf"><block s="reportNot"><block s="evaluate"><block var="condition"` +
        `/><list></list></block></block><script><block s="doRun"><block var="` +
        `action"/><list></list></block><block s="doApplyExtension"><l>snap_yi` +
        `eld</l><list></list></block><block s="doRun"><block var="self"/><lis` +
        `t><block var="condition"/><block var="action"/></list></block></scri` +
        `pt><list></list></block></script></block-definition><block-definitio` +
        `n s="for %&apos;count&apos; = %&apos;start&apos; to %&apos;end&apos;` +
        ` %&apos;action&apos;" type="command" category="control" selector="do` +
        `For"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%upvar" readonly="true" irreplaceable="true">i</inp` +
        `ut><input type="%n">1</input><input type="%n">10</input><input type=` +
        `"%loop" readonly="true" irreplaceable="true"></input><input type="%u` +
        `pvar" readonly="true" irreplaceable="true">i</input><input type="%n"` +
        `>1</input><input type="%n">10</input><input type="%loop" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%loop" readonly="true` +
        `" irreplaceable="true"></input></inputs><script><block s="doDeclareV` +
        `ariables"><list><l>test</l><l>increment</l></list></block><block s="` +
        `doSetVar"><l>count</l><block var="start"/></block><block s="doIfElse` +
        `"><block s="reportVariadicLessThan"><list><block var="start"/><block` +
        ` var="end"/></list></block><script><block s="doSetVar"><l>test</l><b` +
        `lock s="reifyPredicate"><autolambda><block s="reportVariadicGreaterT` +
        `han"><list><block var="count"/><block var="end"/></list></block></au` +
        `tolambda><list></list></block></block><block s="doSetVar"><l>increme` +
        `nt</l><l>1</l></block></script><script><block s="doSetVar"><l>test</` +
        `l><block s="reifyPredicate"><autolambda><block s="reportVariadicLess` +
        `Than"><list><block var="count"/><block var="end"/></list></block></a` +
        `utolambda><list></list></block></block><block s="doSetVar"><l>increm` +
        `ent</l><l>-1</l></block></script></block><block s="doUntil"><block s` +
        `="evaluate"><block var="test"/><list></list></block><script><block s` +
        `="doRun"><block var="action"/><list></list></block><block s="doChang` +
        `eVar"><l>count</l><block var="increment"/></block></script></block><` +
        `/script></block-definition><block-definition s="if %&apos;condition&` +
        `apos; %&apos;true case&apos; %&apos;else pairs&apos;" type="command"` +
        ` category="control" selector="doIf" primitive="doIf"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%b"` +
        ` readonly="true"></input><input type="%cs" readonly="true" irreplace` +
        `able="true"></input><input type="%elseif" readonly="true" irreplacea` +
        `ble="true" expand="else if&#xD;"></input><input type="%b" readonly="` +
        `true"></input><input type="%cs" readonly="true" irreplaceable="true"` +
        `></input><input type="%elseif" readonly="true" irreplaceable="true" ` +
        `expand="else if&#xD;"></input><input type="%b" readonly="true"></inp` +
        `ut></inputs><script><block s="doDeclareVariables"><list><l>self</l><` +
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
        `script></block></script><scripts><script x="10" y="98"><block s="doD` +
        `eclareVariables"><list><l>self</l></list></block><block s="doSetVar"` +
        `><l>self</l><block s="reportEnvironment"><l><option>script</option><` +
        `/l></block></block><block s="doIfElse"><block var="condition"/><scri` +
        `pt><block s="doRun"><block var="true case"/><list></list></block></s` +
        `cript><script><block s="doIfElse"><block s="reportListIsEmpty"><bloc` +
        `k var="else pairs"/></block><script></script><script><block s="doIfE` +
        `lse"><block s="reportListItem"><l>1</l><block var="else pairs"/></bl` +
        `ock><script><block s="doRun"><block s="reportListItem"><l>2</l><bloc` +
        `k var="else pairs"/></block><list></list></block></script><script><b` +
        `lock s="doRun"><block var="self"/><list><block s="reportBoolean"><l>` +
        `<bool>false</bool></l></block><l></l><block s="reportCDR"><block s="` +
        `reportCDR"><block var="else pairs"/></block></block></list></block><` +
        `/script></block></script></block></script></block></script></scripts` +
        `></block-definition><block-definition s="if %&apos;condition&apos; %` +
        `&apos;true case&apos; else %&apos;false case&apos;" type="command" c` +
        `ategory="control" selector="doIfElse" primitive="doIfElse"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%b" readonly="true"></input><input type="%cs" readonly="true" irr` +
        `eplaceable="true"></input><input type="%cs" readonly="true" irreplac` +
        `eable="true"></input><input type="%b" readonly="true"></input><input` +
        ` type="%cs" readonly="true" irreplaceable="true"></input><input type` +
        `="%cs" readonly="true" irreplaceable="true"></input><input type="%cs` +
        `" readonly="true" irreplaceable="true"></input></inputs><scripts><sc` +
        `ript x="10" y="97.83333333333331"><block s="doRun"><block s="reportL` +
        `istItem"><block s="reportVariadicSum"><list><block var="condition"/>` +
        `<l>1</l></list></block><block s="reportNewList"><list><block var="fa` +
        `lse case"/><block var="true case"/></list></block></block><list></li` +
        `st></block></script></scripts></block-definition><block-definition s` +
        `="if %&apos;condition&apos; then %&apos;true case&apos; else %&apos;` +
        `false case&apos;" type="reporter" category="control" selector="repor` +
        `tIfElse" primitive="reportIfElse"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%b" readonly="true"></` +
        `input><input type="%anyUE"></input><input type="%anyUE"></input><inp` +
        `ut type="%b" readonly="true"></input><input type="%anyUE"></input><i` +
        `nput type="%anyUE"></input><input type="%b" readonly="true"></input>` +
        `</inputs><scripts><script x="10" y="91.83333333333331"><block s="doR` +
        `eport"><block s="reportHyperZip"><block s="reifyReporter"><autolambd` +
        `a><block s="evaluate"><block s="reportListItem"><l></l><l/></block><` +
        `list></list></block></autolambda><list></list></block><block s="repo` +
        `rtVariadicSum"><list><block var="condition"/><l>1</l></list></block>` +
        `<l>0</l><block s="reportNewList"><list><block var="false case"/><blo` +
        `ck var="true case"/></list></block><l>1</l></block></block></script>` +
        `</scripts></block-definition><block-definition s="stop %#1" type="co` +
        `mmand" category="control" selector="doStopThis" primitive="doStopThi` +
        `s"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true" irreplaceable="true">$_all<option` +
        `s>all=$_all&#xD;all scenes=$_all scenes&#xD;this script=$_this scrip` +
        `t&#xD;this block=$_this block&#xD;all but this script=$_all but this` +
        ` script&#xD;other scripts in sprite=$_other scripts in sprite</optio` +
        `ns></input></inputs></block-definition><block-definition s="run %#1 ` +
        `%#2" type="command" category="control" selector="doRun" primitive="d` +
        `oRun"><header></header><code></code><translations></translations><in` +
        `puts><input type="%cmdRing" readonly="true"></input><input type="%mu` +
        `lt%s" readonly="true" expand="with inputs"></input></inputs></block-` +
        `definition><block-definition s="launch %#1 %#2" type="command" categ` +
        `ory="control" selector="fork" primitive="fork"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%cmdRing"` +
        ` readonly="true"></input><input type="%mult%s" readonly="true" expan` +
        `d="with inputs"></input></inputs></block-definition><block-definitio` +
        `n s="call %#1 %#2" type="reporter" category="control" selector="eval` +
        `uate" primitive="evaluate"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%repRing" readonly="true" irr` +
        `eplaceable="true"></input><input type="%mult%s" readonly="true" expa` +
        `nd="with inputs"></input></inputs></block-definition><block-definiti` +
        `on s="report %#1" type="command" category="control" selector="doRepo` +
        `rt" primitive="doReport"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s"></input></inputs></block-de` +
        `finition><block-definition s="run %#1 w/continuation" type="command"` +
        ` category="control" selector="doCallCC" primitive="doCallCC"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%cmdRing" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="call %#1 w/continuation" type="reporter" categor` +
        `y="control" selector="reportCallCC" primitive="reportCallCC"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%cmdRing" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="warp %#1" type="command" category="other" select` +
        `or="doWarp" primitive="doWarp"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%cs" readonly="true" irre` +
        `placeable="true"></input></inputs></block-definition><block-definiti` +
        `on s="tell %&apos;target&apos; to %&apos;action&apos; %&apos;paramet` +
        `ers&apos;" type="command" category="control" selector="doTellTo"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true"><options>§_objectsMenu</options></input` +
        `><input type="%cmdRing" readonly="true"></input><input type="%mult%s` +
        `" readonly="true" expand="with inputs"></input><input type="%s" read` +
        `only="true"><options>§_objectsMenu</options></input><input type="%cm` +
        `dRing" readonly="true"></input><input type="%mult%s" readonly="true"` +
        ` expand="with inputs"></input><input type="%s" readonly="true"><opti` +
        `ons>§_objectsMenu</options></input></inputs><script><block s="doRun"` +
        `><block s="reportAttributeOf"><block var="action"/><block var="targe` +
        `t"/></block><block var="parameters"/></block></script></block-defini` +
        `tion><block-definition s="ask %&apos;target&apos; for %&apos;action&` +
        `apos; %&apos;parameters&apos;" type="reporter" category="control" se` +
        `lector="reportAskFor"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true"><options>§_obj` +
        `ectsMenu</options></input><input type="%repRing" readonly="true" irr` +
        `eplaceable="true"></input><input type="%mult%s" readonly="true" expa` +
        `nd="with inputs"></input><input type="%s" readonly="true"><options>§` +
        `_objectsMenu</options></input><input type="%repRing" readonly="true"` +
        ` irreplaceable="true"></input><input type="%mult%s" readonly="true" ` +
        `expand="with inputs"></input><input type="%s" readonly="true"><optio` +
        `ns>§_objectsMenu</options></input></inputs><script><block s="doRepor` +
        `t"><block s="evaluate"><block s="reportAttributeOf"><block var="acti` +
        `on"/><block var="target"/></block><block var="parameters"/></block><` +
        `/block></script></block-definition><block-definition s="create a clo` +
        `ne of %&apos;target&apos;" type="command" category="control" selecto` +
        `r="createClone"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true">$_myself<options>§_c` +
        `lonablesMenu</options></input><input type="%s" readonly="true">$_mys` +
        `elf<options>§_clonablesMenu</options></input><input type="%s" readon` +
        `ly="true">myself<options>§_clonablesMenu</options></input></inputs><` +
        `script><block s="doReport"><block s="newClone"><block var="target"/>` +
        `</block></block></script></block-definition><block-definition s="a n` +
        `ew clone of %#1" type="reporter" category="control" selector="newClo` +
        `ne" primitive="newClone"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true">$_myself<op` +
        `tions>§_clonablesMenu</options></input></inputs></block-definition><` +
        `block-definition s="delete this clone" type="command" category="cont` +
        `rol" selector="removeClone" primitive="removeClone"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="define %#1 %#2 %#3" type="command" c` +
        `ategory="control" selector="doDefineBlock" primitive="doDefineBlock"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%upvar" readonly="true" irreplaceable="true">$_block</i` +
        `nput><input type="%s"></input><input type="%repRing" readonly="true"` +
        ` irreplaceable="true"></input></inputs></block-definition><block-def` +
        `inition s="set %#1 of block %#2 to %#3" type="command" category="con` +
        `trol" selector="doSetBlockAttribute" primitive="doSetBlockAttribute"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true" irreplaceable="true">$_label<option` +
        `s>label=$_label&#xD;definition=$_definition&#xD;comment=$_comment&#x` +
        `D;category=$_category&#xD;type=$_type&#xD;scope=$_scope&#xD;selector` +
        `=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD` +
        `;menus=$_menus&#xD;editables=$_editables&#xD;replaceables=$_replacea` +
        `bles&#xD;&#126;&#xD;separators=$_separators&#xD;collapses=$_collapse` +
        `s&#xD;expands=$_expands&#xD;initial slots=$_initial slots&#xD;min sl` +
        `ots=$_min slots&#xD;max slots=$_max slots&#xD;translations=$_transla` +
        `tions</options></input><input type="%repRing" readonly="true" irrepl` +
        `aceable="true"></input><input type="%s"></input></inputs></block-def` +
        `inition><block-definition s="delete block %#1" type="command" catego` +
        `ry="control" selector="doDeleteBlock" primitive="doDeleteBlock"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%repRing" readonly="true" irreplaceable="true"></input></inp` +
        `uts></block-definition><block-definition s="%#1 of block %#2" type="` +
        `reporter" category="control" selector="reportBlockAttribute" primiti` +
        `ve="reportBlockAttribute"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true" irreplacea` +
        `ble="true">$_definition<options>label=$_label&#xD;definition=$_defin` +
        `ition&#xD;comment=$_comment&#xD;category=$_category&#xD;custom?=$_cu` +
        `stom?&#xD;global?=$_global?&#xD;type=$_type&#xD;scope=$_scope&#xD;se` +
        `lector=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_defaul` +
        `ts&#xD;menus=$_menus&#xD;editables=$_editables&#xD;replaceables=$_re` +
        `placeables&#xD;&#126;&#xD;separators=$_separators&#xD;collapses=$_co` +
        `llapses&#xD;expands=$_expands&#xD;initial slots=$_initial slots&#xD;` +
        `min slots=$_min slots&#xD;max slots=$_max slots&#xD;translations=$_t` +
        `ranslations</options></input><input type="%repRing" readonly="true" ` +
        `irreplaceable="true"></input></inputs></block-definition><block-defi` +
        `nition s="this %#1" type="reporter" category="control" selector="rep` +
        `ortEnvironment" primitive="reportEnvironment"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true" irreplaceable="true">$_script<options>script=$_script&#xD;` +
        `caller=$_caller&#xD;continuation=$_continuation&#xD;&#126;&#xD;input` +
        `s=$_inputs</options></input></inputs></block-definition><block-defin` +
        `ition s="pause all $pause" type="command" category="control" selecto` +
        `r="doPauseAll" primitive="doPauseAll"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="switch to scene %#1 %#2" type="command" category="` +
        `control" selector="doSwitchToScene" primitive="doSwitchToScene"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true">$_next<options>§_scenesMenu</options></i` +
        `nput><input type="%send" readonly="true" irreplaceable="true" expand` +
        `="and send&#xD;with data" max="2"></input></inputs></block-definitio` +
        `n><block-definition s="pipe %&apos;value&apos; $arrowRight %&apos;fu` +
        `nctions&apos;" type="reporter" category="control" selector="reportPi` +
        `pe"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s"></input><input type="%mult%repRing" readonly="tr` +
        `ue" initial="1"></input></inputs><script><block s="doReport"><block ` +
        `s="reportIfElse"><block s="reportListIsEmpty"><block var="functions"` +
        `/></block><block var="value"/><block s="reportPipe"><block s="evalua` +
        `te"><block s="reportListItem"><l>1</l><block var="functions"/></bloc` +
        `k><list><block var="value"/></list></block><block s="reportCDR"><blo` +
        `ck var="functions"/></block></block></block></block></script></block` +
        `-definition><block-definition s="touching %#1 ?" type="predicate" ca` +
        `tegory="sensing" selector="reportTouchingObject" primitive="reportTo` +
        `uchingObject"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true">$_mouse-pointer<option` +
        `s>§_collidablesMenu</options></input></inputs></block-definition><bl` +
        `ock-definition s="touching %#1 ?" type="predicate" category="sensing` +
        `" selector="reportTouchingColor" primitive="reportTouchingColor"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%clr" readonly="true" irreplaceable="true"></input></inputs` +
        `></block-definition><block-definition s="color %#1 is touching %#2 ?` +
        `" type="predicate" category="sensing" selector="reportColorIsTouchin` +
        `gColor" primitive="reportColorIsTouchingColor"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%clr" rea` +
        `donly="true" irreplaceable="true"></input><input type="%clr" readonl` +
        `y="true" irreplaceable="true"></input></inputs></block-definition><b` +
        `lock-definition s="%#1 at %#2" type="reporter" category="sensing" se` +
        `lector="reportAspect" primitive="reportAspect"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturati` +
        `on=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_trans` +
        `parency&#xD;r-g-b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites</opti` +
        `ons></input><input type="%s" readonly="true">$_mouse-pointer<options` +
        `>§_locationMenu</options></input></inputs></block-definition><block-` +
        `definition s="stack size" type="reporter" category="sensing" selecto` +
        `r="reportStackSize" primitive="reportStackSize"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="frames" type="reporter" category="sensin` +
        `g" selector="reportFrameCount" primitive="reportFrameCount"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="yields" type="reporter" cate` +
        `gory="sensing" selector="reportYieldCount" primitive="reportYieldCou` +
        `nt"><header></header><code></code><translations></translations><inpu` +
        `ts></inputs></block-definition><block-definition s="processes" type=` +
        `"reporter" category="sensing" selector="reportThreadCount" primitive` +
        `="reportThreadCount"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"ask %#1 and wait" type="command" category="sensing" selector="doAsk` +
        `" primitive="doAsk"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s">what&apos;s your name?</input></` +
        `inputs></block-definition><block-definition s="answer" type="reporte` +
        `r" category="sensing" selector="reportLastAnswer" primitive="reportL` +
        `astAnswer"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="answer" t` +
        `ype="reporter" category="sensing" selector="getLastAnswer" primitive` +
        `="getLastAnswer"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="mou` +
        `se position" type="reporter" category="sensing" selector="reportMous` +
        `ePosition"><header></header><code></code><translations></translation` +
        `s><inputs></inputs><script><block s="doReport"><block s="reportNewLi` +
        `st"><list><block s="reportMouseX"></block><block s="reportMouseY"></` +
        `block></list></block></block></script></block-definition><block-defi` +
        `nition s="mouse x" type="reporter" category="sensing" selector="repo` +
        `rtMouseX" primitive="reportMouseX"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="mouse y" type="reporter" category="sensing" selector=` +
        `"reportMouseY" primitive="reportMouseY"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="mouse down?" type="predicate" category="sensing"` +
        ` selector="reportMouseDown" primitive="reportMouseDown"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="key %#1 pressed?" type="predicat` +
        `e" category="sensing" selector="reportKeyPressed" primitive="reportK` +
        `eyPressed"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true">$_space<options>§_keysMen` +
        `u</options></input></inputs></block-definition><block-definition s="` +
        `%#1 to %#2" type="reporter" category="sensing" selector="reportRelat` +
        `ionTo" primitive="reportRelationTo"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true">` +
        `$_distance<options>distance=$_distance&#xD;direction=$_direction&#xD` +
        `;ray length=$_ray length</options></input><input type="%s" readonly=` +
        `"true">$_mouse-pointer<options>§_destinationsMenu</options></input><` +
        `/inputs></block-definition><block-definition s="reset timer" type="c` +
        `ommand" category="sensing" selector="doResetTimer" primitive="doRese` +
        `tTimer"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="timer" type=` +
        `"reporter" category="sensing" selector="reportTimer" primitive="repo` +
        `rtTimer"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="timer" type` +
        `="reporter" category="sensing" selector="getTimer" primitive="getTim` +
        `er"><header></header><code></code><translations></translations><inpu` +
        `ts></inputs></block-definition><block-definition s="%#1 of %#2" type` +
        `="reporter" category="sensing" selector="reportAttributeOf" primitiv` +
        `e="reportAttributeOf"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true">$_costume #<op` +
        `tions>§_attributesMenu</options></input><input type="%s" readonly="t` +
        `rue"><options>§_objectsMenu</options></input></inputs></block-defini` +
        `tion><block-definition s="object %&apos;name&apos;" type="reporter" ` +
        `category="sensing" selector="reportObject" primitive="reportObject">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true">$_myself<options>§_objectsMenuWithSe` +
        `lf</options></input><input type="%s" readonly="true">$_myself<option` +
        `s>§_objectsMenuWithSelf</options></input><input type="%s" readonly="` +
        `true">myself<options>§_objectsMenuWithSelf</options></input></inputs` +
        `><script><block s="doReport"><block s="reportHyperZip"><block s="rei` +
        `fyReporter"><autolambda><block s="reportFindFirst"><block s="reifyPr` +
        `edicate"><autolambda><block s="reportVariadicEquals"><list><block va` +
        `r="id"/><block s="reportAskFor"><l></l><block s="reifyReporter"><aut` +
        `olambda><block s="reportGet"><l><option>name</option></l></block></a` +
        `utolambda><list></list></block><list></list></block></list></block><` +
        `/autolambda><list></list></block><block s="reportConcatenatedLists">` +
        `<list><block s="reportAskFor"><block s="reportGet"><l><option>stage<` +
        `/option></l></block><block s="reifyReporter"><autolambda><block s="r` +
        `eportGet"><l><option>other sprites</option></l></block></autolambda>` +
        `<list></list></block><list></list></block><block s="reportNewList"><` +
        `list><block s="reportGet"><l><option>stage</option></l></block></lis` +
        `t></block></list></block></block></autolambda><list><l>id</l></list>` +
        `</block><block var="name"/><l>0</l><l></l><l>0</l></block></block></` +
        `script><scripts><script x="10" y="98"><block s="doReport"><block s="` +
        `reportHyperZip"><block s="reifyReporter"><autolambda><block s="repor` +
        `tFindFirst"><block s="reifyPredicate"><autolambda><block s="reportVa` +
        `riadicEquals"><list><block var="id"/><block s="reportAskFor"><l></l>` +
        `<block s="reifyReporter"><autolambda><block s="reportGet"><l><option` +
        `>name</option></l></block></autolambda><list></list></block><list></` +
        `list></block></list></block></autolambda><list></list></block><block` +
        ` s="reportConcatenatedLists"><list><block s="reportAskFor"><block s=` +
        `"reportGet"><l><option>stage</option></l></block><block s="reifyRepo` +
        `rter"><autolambda><block s="reportGet"><l><option>other sprites</opt` +
        `ion></l></block></autolambda><list></list></block><list></list></blo` +
        `ck><block s="reportNewList"><list><block s="reportGet"><l><option>st` +
        `age</option></l></block></list></block></list></block></block></auto` +
        `lambda><list><l>id</l></list></block><block var="name"/><l>0</l><l><` +
        `/l><l>0</l></block></block></script></scripts></block-definition><bl` +
        `ock-definition s="url %#1" type="reporter" category="sensing" select` +
        `or="reportURL" primitive="reportURL"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s">snap.berkeley.e` +
        `du</input></inputs></block-definition><block-definition s="set %#1 t` +
        `o %#2" type="command" category="sensing" selector="doSetGlobalFlag" ` +
        `primitive="doSetGlobalFlag"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true" irreplac` +
        `eable="true">$_video capture<options>turbo mode=$_turbo mode&#xD;cas` +
        `e sensitivity=$_case sensitivity&#xD;flat line ends=$_flat line ends` +
        `&#xD;log pen vectors=$_log pen vectors&#xD;video capture=$_video cap` +
        `ture&#xD;mirror video=$_mirror video</options></input><input type="%` +
        `b" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="is %#1 on?" type="predicate" category="sensing" selector="re` +
        `portGlobalFlag" primitive="reportGlobalFlag"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">$_turbo mode<options>turbo mode=$_turb` +
        `o mode&#xD;case sensitivity=$_case sensitivity&#xD;flat line ends=$_` +
        `flat line ends&#xD;log pen vectors=$_log pen vectors&#xD;video captu` +
        `re=$_video capture&#xD;mirror video=$_mirror video</options></input>` +
        `</inputs></block-definition><block-definition s="current %#1" type="` +
        `reporter" category="sensing" selector="reportDate" primitive="report` +
        `Date"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true">$_date<op` +
        `tions>year=$_year&#xD;month=$_month&#xD;date=$_date&#xD;day of week=` +
        `$_day of week&#xD;hour=$_hour&#xD;minute=$_minute&#xD;second=$_secon` +
        `d&#xD;time in milliseconds=$_time in milliseconds</options></input><` +
        `/inputs></block-definition><block-definition s="my %#1" type="report` +
        `er" category="sensing" selector="reportGet" primitive="reportGet"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true">$_neighbors<optio` +
        `ns>§_gettablesMenu</options></input></inputs></block-definition><blo` +
        `ck-definition s="microphone %#1" type="reporter" category="sensing" ` +
        `selector="reportAudio" primitive="reportAudio"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true" irreplaceable="true">$_volume<options>§_audioMenu</option` +
        `s></input></inputs></block-definition><block-definition s="%#1" type` +
        `="reporter" category="operators" selector="reportVariadicSum" primit` +
        `ive="reportVariadicSum"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%mult%n" readonly="true" separat` +
        `or="+" collapse="sum" initial="2"></input></inputs></block-definitio` +
        `n><block-definition s="%&apos;a&apos; − %&apos;b&apos;" type="report` +
        `er" category="operators" selector="reportDifference" primitive="repo` +
        `rtDifference"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n"></input><input type="%n"></input><inpu` +
        `t type="%n"></input><input type="%n"></input><input type="%n"></inpu` +
        `t></inputs><scripts><script x="10" y="91.83333333333331"><block s="d` +
        `oReport"><block s="reportVariadicSum"><list><block var="a"/><block s` +
        `="reportMonadic"><l><option>neg</option></l><block var="b"/></block>` +
        `</list></block></block></script></scripts></block-definition><block-` +
        `definition s="%#1" type="reporter" category="operators" selector="re` +
        `portVariadicProduct" primitive="reportVariadicProduct"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `mult%n" readonly="true" separator="×" collapse="product" initial="2"` +
        `></input></inputs></block-definition><block-definition s="%#1 / %#2"` +
        ` type="reporter" category="operators" selector="reportQuotient" prim` +
        `itive="reportQuotient"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n"></input><input type="%n"></in` +
        `put></inputs></block-definition><block-definition s="round %#1" type` +
        `="reporter" category="operators" selector="reportRound" primitive="r` +
        `eportRound"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n"></input></inputs></block-definition><blo` +
        `ck-definition s="%#1 of %#2" type="reporter" category="operators" se` +
        `lector="reportMonadic" primitive="reportMonadic"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true">$_sqrt<options>abs=$_abs&#xD;neg=$` +
        `_neg&#xD;sign=$_sign&#xD;ceiling=$_ceiling&#xD;floor=$_floor&#xD;sqr` +
        `t=$_sqrt&#xD;sin=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD;asin=$_asin&#` +
        `xD;acos=$_acos&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_log&#xD;lg=$_lg` +
        `&#xD;e^=$_e^&#xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</options></input>` +
        `<input type="%n">10</input></inputs></block-definition><block-defini` +
        `tion s="%#1 ^ %#2" type="reporter" category="operators" selector="re` +
        `portPower" primitive="reportPower"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n"></input><input ty` +
        `pe="%n"></input></inputs></block-definition><block-definition s="%#1` +
        ` mod %#2" type="reporter" category="operators" selector="reportModul` +
        `us" primitive="reportModulus"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n"></input><input type="%` +
        `n"></input></inputs></block-definition><block-definition s="atan2 %#` +
        `1 ÷ %#2" type="reporter" category="operators" selector="reportAtan2"` +
        ` primitive="reportAtan2"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n"></input><input type="%n"></` +
        `input></inputs></block-definition><block-definition s="%#1" type="re` +
        `porter" category="operators" selector="reportVariadicMin" primitive=` +
        `"reportVariadicMin"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%mult%n" readonly="true" separator="` +
        `min" collapse="minimum" initial="2"></input></inputs></block-definit` +
        `ion><block-definition s="%#1" type="reporter" category="operators" s` +
        `elector="reportVariadicMax" primitive="reportVariadicMax"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%mult%n" readonly="true" separator="max" collapse="maximum" initia` +
        `l="2"></input></inputs></block-definition><block-definition s="pick ` +
        `random %#1 to %#2" type="reporter" category="operators" selector="re` +
        `portRandom" primitive="reportRandom"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">1</input><input` +
        ` type="%n">10</input></inputs></block-definition><block-definition s` +
        `="%#1" type="predicate" category="operators" selector="reportVariadi` +
        `cEquals" primitive="reportVariadicEquals"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%mult%s" reado` +
        `nly="true" separator="=" collapse="all =" initial="2"></input></inpu` +
        `ts></block-definition><block-definition s="%#1" type="predicate" cat` +
        `egory="operators" selector="reportVariadicNotEquals" primitive="repo` +
        `rtVariadicNotEquals"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%mult%s" readonly="true" separator=` +
        `"≠" collapse="neighbors ≠" initial="2"></input></inputs></block-defi` +
        `nition><block-definition s="%#1" type="predicate" category="operator` +
        `s" selector="reportVariadicLessThan" primitive="reportVariadicLessTh` +
        `an"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%mult%s" readonly="true" separator="&lt;" collapse="` +
        `all &lt;" initial="2"></input></inputs></block-definition><block-def` +
        `inition s="%#1" type="predicate" category="operators" selector="repo` +
        `rtVariadicLessThanOrEquals" primitive="reportVariadicLessThanOrEqual` +
        `s"><header></header><code></code><translations></translations><input` +
        `s><input type="%mult%s" readonly="true" separator="≤" collapse="all ` +
        `≤" initial="2"></input></inputs></block-definition><block-definition` +
        ` s="%#1" type="predicate" category="operators" selector="reportVaria` +
        `dicGreaterThan" primitive="reportVariadicGreaterThan"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%m` +
        `ult%s" readonly="true" separator="&gt;" collapse="all &gt;" initial=` +
        `"2"></input></inputs></block-definition><block-definition s="%#1" ty` +
        `pe="predicate" category="operators" selector="reportVariadicGreaterT` +
        `hanOrEquals" primitive="reportVariadicGreaterThanOrEquals"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%mult%s" readonly="true" separator="≥" collapse="all ≥" initial="` +
        `2"></input></inputs></block-definition><block-definition s="%#1" typ` +
        `e="predicate" category="operators" selector="reportVariadicAnd" prim` +
        `itive="reportVariadicAnd"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%mult%b" readonly="true" separ` +
        `ator="and" collapse="all" initial="2"></input></inputs></block-defin` +
        `ition><block-definition s="%#1" type="predicate" category="operators` +
        `" selector="reportVariadicOr" primitive="reportVariadicOr"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%mult%b" readonly="true" separator="or" collapse="any" initial="2` +
        `"></input></inputs></block-definition><block-definition s="not %&apo` +
        `s;bool&apos;" type="predicate" category="operators" selector="report` +
        `Not"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%b" readonly="true"></input><input type="%b" readon` +
        `ly="true"></input><input type="%b" readonly="true"></input></inputs>` +
        `<script><block s="doReport"><block s="reportIfElse"><block var="bool` +
        `"/><block s="reportBoolean"><l><bool>false</bool></l></block><block ` +
        `s="reportBoolean"><l><bool>true</bool></l></block></block></block></` +
        `script></block-definition><block-definition s="%#1" type="predicate"` +
        ` category="operators" selector="reportBoolean" primitive="reportBool` +
        `ean"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%b" readonly="true" irreplaceable="true">true</inpu` +
        `t></inputs></block-definition><block-definition s="%#1" type="predic` +
        `ate" category="operators" selector="reportFalse" primitive="reportFa` +
        `lse"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%b" readonly="true" irreplaceable="true">false</inp` +
        `ut></inputs></block-definition><block-definition s="join %#1" type="` +
        `reporter" category="operators" selector="reportJoinWords" primitive=` +
        `"reportJoinWords"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%mult%s" readonly="true" initial="2">h` +
        `ello &#xD;world</input></inputs></block-definition><block-definition` +
        ` s="letter %&apos;idx&apos; of %&apos;text&apos;" type="reporter" ca` +
        `tegory="operators" selector="reportLetter" primitive="reportLetter">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</o` +
        `ptions></input><input type="%s">world</input><input type="%n">1<opti` +
        `ons>1=1&#xD;last=$_last&#xD;random=$_random</options></input><input ` +
        `type="%s">world</input><input type="%n">1<options>1=1&#xD;last&#xD;r` +
        `andom</options></input></inputs><script><block s="doReport"><block s` +
        `="reportHyperZip"><block s="reifyReporter"><autolambda><block s="rep` +
        `ortListItem"><l></l><block s="reportTextSplit"><l></l><l><option>let` +
        `ter</option></l></block></block></autolambda><list></list></block><b` +
        `lock var="idx"/><l>0</l><block var="text"/><l>0</l></block></block><` +
        `/script><scripts><script x="10" y="98"><block s="doReport"><block s=` +
        `"reportHyperZip"><block s="reifyReporter"><autolambda><block s="repo` +
        `rtListItem"><l></l><block s="reportTextSplit"><l></l><l><option>lett` +
        `er</option></l></block></block></autolambda><list></list></block><bl` +
        `ock var="idx"/><l>0</l><block var="text"/><l>0</l></block></block></` +
        `script></scripts></block-definition><block-definition s="length of %` +
        `#1" type="reporter" category="operators" selector="reportStringSize"` +
        ` primitive="reportStringSize"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s">world</input></inputs>` +
        `</block-definition><block-definition s="%#1 of text %#2" type="repor` +
        `ter" category="operators" selector="reportTextAttribute" primitive="` +
        `reportTextAttribute"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true">$_length<options>length=$_length&#xD;lower case=$_lower case&#` +
        `xD;upper case=$_upper case</options></input><input type="%s">world</` +
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
        `%s">5</input><input type="%s" readonly="true" irreplaceable="true">$` +
        `_number<options>§_typesMenu</options></input></inputs></block-defini` +
        `tion><block-definition s="is %#1 ?" type="predicate" category="opera` +
        `tors" selector="reportVariadicIsIdentical" primitive="reportVariadic` +
        `IsIdentical"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%s" readonly="true" separator="identic` +
        `al to" collapse="all identical" initial="2"></input></inputs></block` +
        `-definition><block-definition s="split %#1 by %#2" type="reporter" c` +
        `ategory="operators" selector="reportTextSplit" primitive="reportText` +
        `Split"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s">hello world</input><input type="%s"> <options` +
        `>letter=$_letter&#xD;word=$_word&#xD;line=$_line&#xD;tab=$_tab&#xD;c` +
        `r=$_cr&#xD;csv=$_csv&#xD;json=$_json&#xD;&#126;&#xD;blocks=$_blocks<` +
        `/options></input></inputs></block-definition><block-definition s="Ja` +
        `vaScript function ( %#1 ) { %#2 }" type="reporter" category="operato` +
        `rs" selector="reportJSFunction" primitive="reportJSFunction"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%mult%s" readonly="true"></input><input type="%mlt"></input></i` +
        `nputs></block-definition><block-definition s="type of %#1" type="rep` +
        `orter" category="operators" selector="reportTypeOf" primitive="repor` +
        `tTypeOf"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s">5</input></inputs></block-definition><block` +
        `-definition s="%#1 of %#2" type="reporter" category="operators" sele` +
        `ctor="reportTextFunction" primitive="reportTextFunction"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true" irreplaceable="true">$_encode URI<options>encod` +
        `e URI=$_encode URI&#xD;decode URI=$_decode URI&#xD;encode URI compon` +
        `ent=$_encode URI component&#xD;decode URI component=$_decode URI com` +
        `ponent&#xD;XML escape=$_XML escape&#xD;XML unescape=$_XML unescape&#` +
        `xD;JS escape=$_JS escape&#xD;hex sha512 hash=$_hex sha512 hash</opti` +
        `ons></input><input type="%s">Abelson &amp; Sussman</input></inputs><` +
        `/block-definition><block-definition s="compile %#1 for %#2 args" typ` +
        `e="reporter" category="operators" selector="reportCompiled" primitiv` +
        `e="reportCompiled"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%repRing" readonly="true" irreplaceab` +
        `le="true"></input><input type="%n">0</input></inputs></block-definit` +
        `ion><block-definition s="set %#1 to %#2" type="command" category="va` +
        `riables" selector="doSetVar" primitive="doSetVar"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true"><options>§_getVarNamesDict</optio` +
        `ns></input><input type="%s">0</input></inputs></block-definition><bl` +
        `ock-definition s="change %#1 by %#2" type="command" category="variab` +
        `les" selector="doChangeVar" primitive="doChangeVar"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true" irreplaceable="true"><options>§_getVarNamesDict</opt` +
        `ions></input><input type="%n">1</input></inputs></block-definition><` +
        `block-definition s="show variable %#1" type="command" category="vari` +
        `ables" selector="doShowVar" primitive="doShowVar"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true"><options>§_getVarNamesDict</optio` +
        `ns></input></inputs></block-definition><block-definition s="hide var` +
        `iable %#1" type="command" category="variables" selector="doHideVar" ` +
        `primitive="doHideVar"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true" irreplaceable=` +
        `"true"><options>§_getVarNamesDict</options></input></inputs></block-` +
        `definition><block-definition s="script variables %&apos;#1&apos;" ty` +
        `pe="command" category="other" selector="doDeclareVariables"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%scriptVars" readonly="true" irreplaceable="true" initial="1" mi` +
        `n="1"></input></inputs></block-definition><block-definition s="inher` +
        `it %#1" type="command" category="variables" selector="doDeleteAttr" ` +
        `primitive="doDeleteAttr"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true"><options>§_` +
        `shadowedVariablesMenu</options></input></inputs></block-definition><` +
        `block-definition s="list %&apos;inputs&apos;" type="reporter" catego` +
        `ry="lists" selector="reportNewList"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%mult%s" readonly="t` +
        `rue" irreplaceable="true" initial="1"></input><input type="%mult%s" ` +
        `readonly="true" irreplaceable="true" initial="1"></input><input type` +
        `="%mult%s" readonly="true" irreplaceable="true" initial="1"></input>` +
        `</inputs><script><block s="doReport"><block var="inputs"/></block></` +
        `script></block-definition><block-definition s="%#1 in front of %#2" ` +
        `type="reporter" category="lists" selector="reportCONS" primitive="re` +
        `portCONS"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s"></input><input type="%l" readonly="true"><` +
        `/input></inputs></block-definition><block-definition s="item %#1 of ` +
        `%#2" type="reporter" category="lists" selector="reportListItem" prim` +
        `itive="reportListItem"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">1<options>1=1&#xD;last=$_last` +
        `&#xD;random=$_random</options></input><input type="%l" readonly="tru` +
        `e"></input></inputs></block-definition><block-definition s="all but ` +
        `first of %#1" type="reporter" category="lists" selector="reportCDR" ` +
        `primitive="reportCDR"><header></header><code></code><translations></` +
        `translations><inputs><input type="%l" readonly="true"></input></inpu` +
        `ts></block-definition><block-definition s="length of %#1" type="repo` +
        `rter" category="lists" selector="reportListLength" primitive="report` +
        `ListLength"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%l" readonly="true"></input></inputs></block` +
        `-definition><block-definition s="%#1 of %#2" type="reporter" categor` +
        `y="lists" selector="reportListAttribute" primitive="reportListAttrib` +
        `ute"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true" irreplaceable="true">$_length<o` +
        `ptions>length=$_length&#xD;rank=$_rank&#xD;dimensions=$_dimensions&#` +
        `xD;flatten=$_flatten&#xD;columns=$_columns&#xD;uniques=$_uniques&#xD` +
        `;distribution=$_distribution&#xD;sorted=$_sorted&#xD;shuffled=$_shuf` +
        `fled&#xD;reverse=$_reverse&#xD;&#126;&#xD;lines=$_lines&#xD;csv=$_cs` +
        `v&#xD;json=$_json</options></input><input type="%l" readonly="true">` +
        `</input></inputs></block-definition><block-definition s="%&apos;data` +
        `&apos; contains %&apos;value&apos;" type="predicate" category="lists` +
        `" selector="reportListContainsItem" primitive="reportListContainsIte` +
        `m"><header></header><code></code><translations></translations><input` +
        `s><input type="%l" readonly="true"></input><input type="%s">thing</i` +
        `nput><input type="%l" readonly="true"></input><input type="%s">thing` +
        `</input><input type="%s">thing</input></inputs><scripts><script x="1` +
        `0" y="91.83333333333331"><block s="doWarp"><script><block s="doFor">` +
        `<l>i</l><l>1</l><block s="reportListAttribute"><l><option>length</op` +
        `tion></l><block var="data"/></block><script><block s="doIf"><block s` +
        `="reportVariadicEquals"><list><block s="reportListItem"><block var="` +
        `i"/><block var="data"/></block><block var="value"/></list></block><s` +
        `cript><block s="doReport"><block s="reportBoolean"><l><bool>true</bo` +
        `ol></l></block></block></script><list></list></block></script></bloc` +
        `k></script></block><block s="doReport"><block s="reportBoolean"><l><` +
        `bool>false</bool></l></block></block></script></scripts></block-defi` +
        `nition><block-definition s="is %&apos;data&apos; empty?" type="predi` +
        `cate" category="lists" selector="reportListIsEmpty" primitive="repor` +
        `tListIsEmpty"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%l" readonly="true"></input><input type="%` +
        `l" readonly="true"></input><input type="%l" readonly="true"></input>` +
        `</inputs><scripts><script x="10" y="91.83333333333331"><block s="doR` +
        `eport"><block s="reportVariadicEquals"><list><block var="data"/><blo` +
        `ck s="reportNewList"><list></list></block></list></block></block></s` +
        `cript></scripts></block-definition><block-definition s="index of %&a` +
        `pos;value&apos; in %&apos;data&apos;" type="reporter" category="list` +
        `s" selector="reportListIndex" primitive="reportListIndex"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s">thing</input><input type="%l" readonly="true"></input><input t` +
        `ype="%s">thing</input><input type="%l" readonly="true"></input><inpu` +
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
        `ut type="%n">10</input><input type="%n">10</input></inputs><scripts>` +
        `<script x="10" y="91.83333333333331"><block s="doReport"><block s="r` +
        `eportHyperZip"><block s="reifyReporter"><script><block s="doDeclareV` +
        `ariables"><list><l>result</l></list></block><block s="doSetVar"><l>r` +
        `esult</l><block s="reportNewList"><list></list></block></block><bloc` +
        `k s="doWarp"><script><block s="doFor"><l>i</l><l></l><l></l><script>` +
        `<block s="doAddToList"><block var="i"/><block var="result"/></block>` +
        `</script></block></script></block><block s="doReport"><block var="re` +
        `sult"/></block></script><list></list></block><block var="start"/><l>` +
        `0</l><block var="end"/><l>0</l></block></block></script></scripts></` +
        `block-definition><block-definition s="append %&apos;lists&apos;" typ` +
        `e="reporter" category="lists" selector="reportConcatenatedLists" pri` +
        `mitive="reportConcatenatedLists"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%mult%l" readonly="true` +
        `" initial="2"></input><input type="%mult%l" readonly="true" initial=` +
        `"2"></input><input type="%mult%l" readonly="true" initial="2"></inpu` +
        `t></inputs><scripts><script x="10" y="91.83333333333331"><block s="d` +
        `oDeclareVariables"><list><l>result</l></list></block><block s="doSet` +
        `Var"><l>result</l><block s="reportNewList"><list></list></block></bl` +
        `ock><block s="doWarp"><script><block s="doForEach"><l>list</l><block` +
        ` var="lists"/><script><block s="doForEach"><l>item</l><block var="li` +
        `st"/><script><block s="doAddToList"><block var="item"/><block var="r` +
        `esult"/></block></script></block></script></block></script></block><` +
        `block s="doReport"><block var="result"/></block></script></scripts><` +
        `/block-definition><block-definition s="combinations %&apos;lists&apo` +
        `s;" type="reporter" category="lists" selector="reportCrossproduct" p` +
        `rimitive="reportCrossproduct"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%mult%l" readonly="true" i` +
        `nitial="2"></input><input type="%mult%l" readonly="true" initial="2"` +
        `></input><input type="%mult%l" readonly="true" initial="2"></input><` +
        `/inputs><scripts><script x="10" y="91.83333333333331"><block s="doRe` +
        `port"><block s="reportIfElse"><block s="reportListIsEmpty"><block va` +
        `r="lists"/></block><block s="reportNewList"><list><block s="reportNe` +
        `wList"><list></list></block></list></block><block s="reportConcatena` +
        `tedLists"><block s="reportMap"><block s="reifyReporter"><autolambda>` +
        `<block s="reportMap"><block s="reifyReporter"><autolambda><block s="` +
        `reportCONS"><block var="first"/><l/></block></autolambda><list></lis` +
        `t></block><block s="reportCrossproduct"><block s="reportCDR"><block ` +
        `var="lists"/></block></block></block></autolambda><list><l>first</l>` +
        `</list></block><block s="reportListItem"><l>1</l><block var="lists"/` +
        `></block></block></block></block></block></script></scripts></block-` +
        `definition><block-definition s="transpose %#1" type="reporter" categ` +
        `ory="lists" selector="reportTranspose" primitive="reportTranspose"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%l" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="reshape %#1 to %#2" type="reporter" category="li` +
        `sts" selector="reportReshape" primitive="reportReshape"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s"></input><input type="%mult%n" readonly="true" initial="2">4&#xD;` +
        `3</input></inputs></block-definition><block-definition s="map %&apos` +
        `;ring&apos; over %&apos;data&apos;" type="reporter" category="lists"` +
        ` selector="reportMap" primitive="reportMap"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%repRing" re` +
        `adonly="true" irreplaceable="true"></input><input type="%l" readonly` +
        `="true"></input><input type="%repRing" readonly="true" irreplaceable` +
        `="true"></input><input type="%l" readonly="true"></input><input type` +
        `="%l" readonly="true"></input></inputs><scripts><script x="10" y="91` +
        `.83333333333331"><block s="doDeclareVariables"><list><l>result</l><l` +
        `>implicit?</l></list></block><block s="doSetVar"><l>result</l><block` +
        ` s="reportNewList"><list></list></block></block><block s="doSetVar">` +
        `<l>implicit?</l><block s="reportListIsEmpty"><block s="reportAttribu` +
        `teOf"><l><option>input names</option></l><block var="ring"/></block>` +
        `</block></block><block s="doWarp"><script><block s="doFor"><l>i</l><` +
        `l>1</l><block s="reportListAttribute"><l><option>length</option></l>` +
        `<block var="data"/></block><script><block s="doAddToList"><block s="` +
        `evaluate"><block var="ring"/><block s="reportIfElse"><block var="imp` +
        `licit?"/><block s="reportNewList"><list><block s="reportListItem"><b` +
        `lock var="i"/><block var="data"/></block></list></block><block s="re` +
        `portNewList"><list><block s="reportListItem"><block var="i"/><block ` +
        `var="data"/></block><block var="i"/><block var="data"/></list></bloc` +
        `k></block></block><block var="result"/></block></script></block></sc` +
        `ript></block><block s="doReport"><block var="result"/></block></scri` +
        `pt></scripts></block-definition><block-definition s="$blitz map %#1 ` +
        `over %#2" type="reporter" category="lists" selector="reportAtomicMap` +
        `" primitive="reportAtomicMap"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%repRing" readonly="true" ` +
        `irreplaceable="true"></input><input type="%l" readonly="true"></inpu` +
        `t></inputs></block-definition><block-definition s="keep items %&apos` +
        `;ring&apos; from %&apos;data&apos;" type="reporter" category="lists"` +
        ` selector="reportKeep" primitive="reportKeep"><header></header><code` +
        `></code><translations></translations><inputs><input type="%predRing"` +
        ` readonly="true" irreplaceable="true"></input><input type="%l" reado` +
        `nly="true"></input><input type="%predRing" readonly="true" irreplace` +
        `able="true"></input><input type="%l" readonly="true"></input><input ` +
        `type="%l" readonly="true"></input></inputs><scripts><script x="10" y` +
        `="91.83333333333331"><block s="doDeclareVariables"><list><l>result</` +
        `l><l>implicit?</l></list></block><block s="doSetVar"><l>result</l><b` +
        `lock s="reportNewList"><list></list></block></block><block s="doSetV` +
        `ar"><l>implicit?</l><block s="reportListIsEmpty"><block s="reportAtt` +
        `ributeOf"><l><option>input names</option></l><block var="ring"/></bl` +
        `ock></block></block><block s="doWarp"><script><block s="doFor"><l>i<` +
        `/l><l>1</l><block s="reportListAttribute"><l><option>length</option>` +
        `</l><block var="data"/></block><script><block s="doIf"><block s="eva` +
        `luate"><block var="ring"/><block s="reportIfElse"><block var="implic` +
        `it?"/><block s="reportNewList"><list><block s="reportListItem"><bloc` +
        `k var="i"/><block var="data"/></block></list></block><block s="repor` +
        `tNewList"><list><block s="reportListItem"><block var="i"/><block var` +
        `="data"/></block><block var="i"/><block var="data"/></list></block><` +
        `/block></block><script><block s="doAddToList"><block s="reportListIt` +
        `em"><block var="i"/><block var="data"/></block><block var="result"/>` +
        `</block></script><list></list></block></script></block></script></bl` +
        `ock><block s="doReport"><block var="result"/></block></script></scri` +
        `pts></block-definition><block-definition s="$blitz keep items %#1 fr` +
        `om %#2" type="reporter" category="lists" selector="reportAtomicKeep"` +
        ` primitive="reportAtomicKeep"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%predRing" readonly="true"` +
        ` irreplaceable="true"></input><input type="%l" readonly="true"></inp` +
        `ut></inputs></block-definition><block-definition s="find first item ` +
        `%&apos;ring&apos; in %&apos;data&apos;" type="reporter" category="li` +
        `sts" selector="reportFindFirst" primitive="reportFindFirst"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%predRing" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%l" readonly="true"></input><input type="%predRing" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%l" readonly="true"><` +
        `/input><input type="%l" readonly="true"></input></inputs><scripts><s` +
        `cript x="10" y="91.83333333333331"><block s="doDeclareVariables"><li` +
        `st><l>implicit?</l></list></block><block s="doSetVar"><l>implicit?</` +
        `l><block s="reportListIsEmpty"><block s="reportAttributeOf"><l><opti` +
        `on>input names</option></l><block var="ring"/></block></block></bloc` +
        `k><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block ` +
        `s="reportListAttribute"><l><option>length</option></l><block var="da` +
        `ta"/></block><script><block s="doIf"><block s="evaluate"><block var=` +
        `"ring"/><block s="reportIfElse"><block var="implicit?"/><block s="re` +
        `portNewList"><list><block s="reportListItem"><block var="i"/><block ` +
        `var="data"/></block></list></block><block s="reportNewList"><list><b` +
        `lock s="reportListItem"><block var="i"/><block var="data"/></block><` +
        `block var="i"/><block var="data"/></list></block></block></block><sc` +
        `ript><block s="doReport"><block s="reportListItem"><block var="i"/><` +
        `block var="data"/></block></block></script><list></list></block></sc` +
        `ript></block></script></block><block s="doReport"><l></l></block></s` +
        `cript></scripts></block-definition><block-definition s="$blitz find ` +
        `first item %#1 in %#2" type="reporter" category="lists" selector="re` +
        `portAtomicFindFirst" primitive="reportAtomicFindFirst"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `predRing" readonly="true" irreplaceable="true"></input><input type="` +
        `%l" readonly="true"></input></inputs></block-definition><block-defin` +
        `ition s="combine %&apos;data&apos; using %&apos;ring&apos;" type="re` +
        `porter" category="lists" selector="reportCombine" primitive="reportC` +
        `ombine"><header></header><code></code><translations></translations><` +
        `inputs><input type="%l" readonly="true"></input><input type="%repRin` +
        `g" readonly="true" irreplaceable="true"></input><input type="%l" rea` +
        `donly="true"></input><input type="%repRing" readonly="true" irreplac` +
        `eable="true"></input><input type="%repRing" readonly="true" irreplac` +
        `eable="true"></input></inputs><scripts><script x="10" y="91.83333333` +
        `333331"><block s="doIf"><block s="reportListIsEmpty"><block var="dat` +
        `a"/></block><script><block s="doReport"><l>0</l></block></script><li` +
        `st><block s="reportVariadicEquals"><list><block s="reportListAttribu` +
        `te"><l><option>length</option></l><block var="data"/></block><l>1</l` +
        `></list></block><script><block s="doReport"><block s="reportListItem` +
        `"><l>1</l><block var="data"/></block></block></script></list></block` +
        `><block s="doReport"><block s="evaluate"><block var="ring"/><list><b` +
        `lock s="reportListItem"><l>1</l><block var="data"/></block><block s=` +
        `"evaluate"><block s="reportEnvironment"><l><option>script</option></` +
        `l></block><list><block s="reportCDR"><block var="data"/></block><blo` +
        `ck var="ring"/></list></block></list></block></block></script></scri` +
        `pts></block-definition><block-definition s="$blitz combine %#1 using` +
        ` %#2" type="reporter" category="lists" selector="reportAtomicCombine` +
        `" primitive="reportAtomicCombine"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%l" readonly="true"></` +
        `input><input type="%repRing" readonly="true" irreplaceable="true"></` +
        `input></inputs></block-definition><block-definition s="for each %&ap` +
        `os;item&apos; in %&apos;data&apos; %&apos;action&apos;" type="comman` +
        `d" category="lists" selector="doForEach" primitive="doForEach"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%upvar" readonly="true" irreplaceable="true">item</input><inp` +
        `ut type="%l" readonly="true"></input><input type="%loop" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%upvar" readonly="tru` +
        `e" irreplaceable="true">item</input><input type="%l" readonly="true"` +
        `></input><input type="%loop" readonly="true" irreplaceable="true"></` +
        `input><input type="%loop" readonly="true" irreplaceable="true"></inp` +
        `ut></inputs><scripts><script x="10" y="97.83333333333331"><block s="` +
        `doReport"><block s="reportMap"><block s="reifyReporter"><script><blo` +
        `ck s="doSetVar"><l>item</l><l></l></block><block s="doRun"><block va` +
        `r="action"/><list></list></block><block s="doReport"><l>0</l></block` +
        `></script><list></list></block><block var="data"/></block></block></` +
        `script></scripts></block-definition><block-definition s="show table ` +
        `%#1" type="command" category="lists" selector="doShowTable" primitiv` +
        `e="doShowTable"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%l" readonly="true"></input></inputs></b` +
        `lock-definition><block-definition s="map %#1 to %#2 %#3" type="comma` +
        `nd" category="other" selector="doMapCodeOrHeader" primitive="doMapCo` +
        `deOrHeader"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%cmdRing" readonly="true"></input><input typ` +
        `e="%s" readonly="true">$_code<options>code=$_code&#xD;header=$_heade` +
        `r</options></input><input type="%mlt"></input></inputs></block-defin` +
        `ition><block-definition s="map %#1 to code %#2" type="command" categ` +
        `ory="other" selector="doMapValueCode" primitive="doMapValueCode"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true" irreplaceable="true">$_String<options>S` +
        `tring=$_String&#xD;Number=$_Number&#xD;true=$_true&#xD;false=$_false` +
        `</options></input><input type="%mlt">&lt;#1&gt;</input></inputs></bl` +
        `ock-definition><block-definition s="map %#1 of %#2 to code %#3" type` +
        `="command" category="other" selector="doMapListCode" primitive="doMa` +
        `pListCode"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true"><options>list=$_list&#xD;` +
        `item=$_item&#xD;delimiter=$_delimiter</options></input><input type="` +
        `%s" readonly="true"><options>collection=$_collection&#xD;variables=$` +
        `_variables&#xD;parameters=$_parameters</options></input><input type=` +
        `"%mlt"></input></inputs></block-definition><block-definition s="code` +
        ` of %#1" type="reporter" category="other" selector="reportMappedCode` +
        `" primitive="reportMappedCode"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%cmdRing" readonly="true"` +
        `></input></inputs></block-definition><block-definition s="primitive ` +
        `%#1" type="command" category="other" selector="doPrimitive" primitiv` +
        `e="doPrimitive"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true" irreplaceable="true"` +
        `><options>§_primitivesMenu</options></input></inputs></block-definit` +
        `ion><block-definition s="extension %#1 %#2" type="command" category=` +
        `"other" selector="doApplyExtension" primitive="doApplyExtension"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true" irreplaceable="true"><options>§_extensi` +
        `onsMenu</options></input><input type="%mult%s" readonly="true"></inp` +
        `ut></inputs></block-definition><block-definition s="extension %#1 %#` +
        `2" type="reporter" category="other" selector="reportApplyExtension" ` +
        `primitive="reportApplyExtension"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true"><options>§_extensionsMenu</options></input><input ` +
        `type="%mult%s" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="set video transparency to %#1" type="command" ca` +
        `tegory="sensing" selector="doSetVideoTransparency" primitive="doSetV` +
        `ideoTransparency"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n">50</input></inputs></block-definit` +
        `ion><block-definition s="video %#1 on %#2" type="reporter" category=` +
        `"sensing" selector="reportVideo" primitive="reportVideo"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true" irreplaceable="true">$_motion<options>snap=$_sn` +
        `ap&#xD;motion=$_motion&#xD;direction=$_direction</options></input><i` +
        `nput type="%s" readonly="true">$_myself<options>§_objectsMenuWithSel` +
        `f</options></input></inputs></block-definition></primitives></blocks` +
        `>`,
        this.stage
    );
};
