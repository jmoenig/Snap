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
        `ptions></input></inputs><script><block s="doFaceTowards"><block s="r` +
        `eportVariadicSum"><list><block s="getPosition"></block><block s="rep` +
        `ortIfElse"><block s="reportVariadicEquals"><list><block s="reportJoi` +
        `nWords"><list><block var="angle"/></list></block><l>random</l></list` +
        `></block><block s="reportNewList"><list><block s="reportMonadic"><l>` +
        `<option>sin</option></l><block s="reportRandom"><l>0.1</l><l>360.1</` +
        `l></block></block><block s="reportMonadic"><l><option>cos</option></` +
        `l><block s="reportRandom"><l>0.1</l><l>360.1</l></block></block></li` +
        `st></block><block s="reportNewList"><list><block s="reportMonadic"><` +
        `l><option>sin</option></l><block var="angle"/></block><block s="repo` +
        `rtMonadic"><l><option>cos</option></l><block var="angle"/></block></` +
        `list></block></block></list></block></block></script></block-definit` +
        `ion><block-definition s="point towards %#1" type="command" category=` +
        `"motion" selector="doFaceTowards" primitive="doFaceTowards"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true">$_mouse-pointer<options>§_destinationsMenu</` +
        `options></input></inputs></block-definition><block-definition s="go ` +
        `to x: %&apos;x&apos; y: %&apos;y&apos;" type="command" category="mot` +
        `ion" selector="gotoXY"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">0</input><input type="%n">0</` +
        `input><input type="%n">0</input><input type="%n">0</input><input typ` +
        `e="%n">0</input></inputs><script><block s="doGotoObject"><block s="r` +
        `eportNewList"><list><block var="x"/><block var="y"/></list></block><` +
        `/block></script></block-definition><block-definition s="go to %#1" t` +
        `ype="command" category="motion" selector="doGotoObject" primitive="d` +
        `oGotoObject"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true">$_random position<optio` +
        `ns>§_destinationsMenu</options></input></inputs></block-definition><` +
        `block-definition s="glide %&apos;span&apos; secs to x: %&apos;x&apos` +
        `; y: %&apos;y&apos;" type="command" category="motion" selector="doGl` +
        `ide"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">1</input><input type="%n">0</input><input type=` +
        `"%n">0</input><input type="%n">1</input><input type="%n">0</input><i` +
        `nput type="%n">0</input><input type="%n">1</input></inputs><script><` +
        `block s="doDeclareVariables"><list><l>pos</l><l>start</l><l>fract</l` +
        `></list></block><block s="doSetVar"><l>pos</l><block s="getPosition"` +
        `></block></block><block s="doSetVar"><l>start</l><block s="reportDat` +
        `e"><l><option>time in milliseconds</option></l></block></block><bloc` +
        `k s="doUntil"><block s="reportVariadicGreaterThanOrEquals"><list><bl` +
        `ock var="fract"/><l>1</l></list></block><script><block s="doSetVar">` +
        `<l>fract</l><block s="reportQuotient"><block s="reportDifference"><b` +
        `lock s="reportDate"><l><option>time in milliseconds</option></l></bl` +
        `ock><block var="start"/></block><block s="reportVariadicProduct"><li` +
        `st><block var="span"/><l>1000</l></list></block></block></block><blo` +
        `ck s="doGotoObject"><block s="reportVariadicSum"><list><block var="p` +
        `os"/><block s="reportVariadicProduct"><list><block s="reportDifferen` +
        `ce"><block s="reportNewList"><list><block var="x"/><block var="y"/><` +
        `/list></block><block var="pos"/></block><block var="fract"/></list><` +
        `/block></list></block></block></script></block><block s="gotoXY"><bl` +
        `ock var="x"/><block var="y"/></block></script></block-definition><bl` +
        `ock-definition s="change x by %&apos;delta&apos;" type="command" cat` +
        `egory="motion" selector="changeXPosition"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">10</input>` +
        `<input type="%n">10</input><input type="%n">10</input></inputs><scri` +
        `pt><block s="setXPosition"><block s="reportVariadicSum"><list><block` +
        ` s="xPosition"></block><block var="delta"/></list></block></block></` +
        `script></block-definition><block-definition s="set x to %&apos;x&apo` +
        `s;" type="command" category="motion" selector="setXPosition"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%n">0</input><input type="%n">0</input><input type="%n">0</inpu` +
        `t></inputs><script><block s="doGotoObject"><block s="reportNewList">` +
        `<list><block var="x"/><block s="yPosition"></block></list></block></` +
        `block></script></block-definition><block-definition s="change y by %` +
        `&apos;delta&apos;" type="command" category="motion" selector="change` +
        `YPosition"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">10</input><input type="%n">10</input><inp` +
        `ut type="%n">10</input></inputs><script><block s="setYPosition"><blo` +
        `ck s="reportVariadicSum"><list><block s="yPosition"></block><block v` +
        `ar="delta"/></list></block></block></script></block-definition><bloc` +
        `k-definition s="set y to %&apos;y&apos;" type="command" category="mo` +
        `tion" selector="setYPosition"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">0</input><input type="` +
        `%n">0</input><input type="%n">0</input></inputs><script><block s="do` +
        `GotoObject"><block s="reportNewList"><list><block s="xPosition"></bl` +
        `ock><block var="y"/></list></block></block></script></block-definiti` +
        `on><block-definition s="if on edge, bounce" type="command" category=` +
        `"motion" selector="bounceOffEdge"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs><script><block s="doIf"><b` +
        `lock s="reportTouchingObject"><l><option>edge</option></l></block><s` +
        `cript><block s="doDeclareVariables"><list><l>get bounds</l><l>bounds` +
        `</l><l>center</l><l>stage bounds</l><l>dir x</l><l>dir y</l><l>delta` +
        ` x</l><l>delta y</l></list></block><block s="doSetVar"><l>get bounds` +
        `</l><block s="reifyReporter"><autolambda><block s="reportNewList"><l` +
        `ist><block s="reportVariadicMin"><block s="reportCONS"><block s="rep` +
        `ortNewList"><list><block s="reportGet"><l><option>left</option></l><` +
        `/block><block s="reportGet"><l><option>bottom</option></l></block></` +
        `list></block><block s="reportMap"><block s="reifyReporter"><autolamb` +
        `da><block s="reportNewList"><list><block s="reportAttributeOf"><l><o` +
        `ption>left</option></l><l></l></block><block s="reportAttributeOf"><` +
        `l><option>bottom</option></l><l></l></block></list></block></autolam` +
        `bda><list></list></block><block s="reportGet"><l><option>parts</opti` +
        `on></l></block></block></block></block><block s="reportVariadicMax">` +
        `<block s="reportCONS"><block s="reportNewList"><list><block s="repor` +
        `tGet"><l><option>right</option></l></block><block s="reportGet"><l><` +
        `option>top</option></l></block></list></block><block s="reportMap"><` +
        `block s="reifyReporter"><autolambda><block s="reportNewList"><list><` +
        `block s="reportAttributeOf"><l><option>right</option></l><l></l></bl` +
        `ock><block s="reportAttributeOf"><l><option>top</option></l><l></l><` +
        `/block></list></block></autolambda><list></list></block><block s="re` +
        `portGet"><l><option>parts</option></l></block></block></block></bloc` +
        `k></list></block></autolambda><list></list></block></block><block s=` +
        `"doSetVar"><l>bounds</l><block s="evaluate"><block var="get bounds"/` +
        `><list></list></block></block><block s="doSetVar"><l>center</l><bloc` +
        `k s="reportQuotient"><block s="reportVariadicSum"><block var="bounds` +
        `"/></block><l>2</l></block></block><block s="doSetVar"><l>stage boun` +
        `ds</l><block s="reportAskFor"><block s="reportGet"><l><option>stage<` +
        `/option></l></block><block s="reifyReporter"><autolambda><block s="r` +
        `eportNewList"><list><block s="reportNewList"><list><block s="reportG` +
        `et"><l><option>left</option></l></block><block s="reportGet"><l><opt` +
        `ion>bottom</option></l></block></list></block><block s="reportNewLis` +
        `t"><list><block s="reportGet"><l><option>right</option></l></block><` +
        `block s="reportGet"><l><option>top</option></l></block></list></bloc` +
        `k></list></block></autolambda><list></list></block><list></list></bl` +
        `ock></block><block s="doSetVar"><l>dir x</l><block s="reportMonadic"` +
        `><l><option>sin</option></l><block s="direction"></block></block></b` +
        `lock><block s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><op` +
        `tion>cos</option></l><block s="direction"></block></block></block><b` +
        `lock s="doIf"><block s="reportVariadicLessThan"><list><block s="repo` +
        `rtListItem"><l>1</l><block s="reportListItem"><l>1</l><block var="bo` +
        `unds"/></block></block><block s="reportListItem"><l>1</l><block s="r` +
        `eportListItem"><l>1</l><block var="stage bounds"/></block></block></` +
        `list></block><script><block s="doSetVar"><l>dir x</l><block s="repor` +
        `tMonadic"><l><option>abs</option></l><block var="dir x"/></block></b` +
        `lock></script><list></list></block><block s="doIf"><block s="reportV` +
        `ariadicGreaterThan"><list><block s="reportListItem"><l>1</l><block s` +
        `="reportListItem"><l>2</l><block var="bounds"/></block></block><bloc` +
        `k s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l><bloc` +
        `k var="stage bounds"/></block></block></list></block><script><block ` +
        `s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><option>neg</op` +
        `tion></l><block s="reportMonadic"><l><option>abs</option></l><block ` +
        `var="dir x"/></block></block></block></script><list></list></block><` +
        `block s="doIf"><block s="reportVariadicGreaterThan"><list><block s="` +
        `reportListItem"><l>2</l><block s="reportListItem"><l>2</l><block var` +
        `="bounds"/></block></block><block s="reportListItem"><l>2</l><block ` +
        `s="reportListItem"><l>2</l><block var="stage bounds"/></block></bloc` +
        `k></list></block><script><block s="doSetVar"><l>dir y</l><block s="r` +
        `eportMonadic"><l><option>neg</option></l><block s="reportMonadic"><l` +
        `><option>abs</option></l><block var="dir y"/></block></block></block` +
        `></script><list></list></block><block s="doIf"><block s="reportVaria` +
        `dicLessThan"><list><block s="reportListItem"><l>2</l><block s="repor` +
        `tListItem"><l>1</l><block var="bounds"/></block></block><block s="re` +
        `portListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="` +
        `stage bounds"/></block></block></list></block><script><block s="doSe` +
        `tVar"><l>dir y</l><block s="reportMonadic"><l><option>abs</option></` +
        `l><block var="dir y"/></block></block></script><list></list></block>` +
        `<block s="setHeading"><block s="reportAtan2"><block var="dir x"/><bl` +
        `ock var="dir y"/></block></block><block s="doSetVar"><l>bounds</l><b` +
        `lock s="evaluate"><block var="get bounds"/><list></list></block></bl` +
        `ock><block s="doGotoObject"><block s="reportVariadicSum"><list><bloc` +
        `k s="getPosition"></block><block s="reportDifference"><block var="ce` +
        `nter"/><block s="reportQuotient"><block s="reportVariadicSum"><block` +
        ` var="bounds"/></block><l>2</l></block></block></list></block></bloc` +
        `k><block s="doSetVar"><l>bounds</l><block s="evaluate"><block var="g` +
        `et bounds"/><list></list></block></block><block s="doIf"><block s="r` +
        `eportVariadicGreaterThan"><list><block s="reportListItem"><l>1</l><b` +
        `lock s="reportListItem"><l>2</l><block var="bounds"/></block></block` +
        `><block s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l` +
        `><block var="stage bounds"/></block></block></list></block><script><` +
        `block s="doSetVar"><l>delta x</l><block s="reportDifference"><block ` +
        `s="reportListItem"><l>1</l><block s="reportListItem"><l>2</l><block ` +
        `var="stage bounds"/></block></block><block s="reportListItem"><l>1</` +
        `l><block s="reportListItem"><l>2</l><block var="bounds"/></block></b` +
        `lock></block></block></script><list></list></block><block s="doIf"><` +
        `block s="reportVariadicLessThan"><list><block s="reportListItem"><l>` +
        `2</l><block s="reportListItem"><l>1</l><block var="bounds"/></block>` +
        `</block><block s="reportListItem"><l>2</l><block s="reportListItem">` +
        `<l>1</l><block var="stage bounds"/></block></block></list></block><s` +
        `cript><block s="doSetVar"><l>delta y</l><block s="reportDifference">` +
        `<block s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l>` +
        `<block var="stage bounds"/></block></block><block s="reportListItem"` +
        `><l>2</l><block s="reportListItem"><l>1</l><block var="bounds"/></bl` +
        `ock></block></block></block></script><list></list></block><block s="` +
        `doIf"><block s="reportVariadicLessThan"><list><block s="reportListIt` +
        `em"><l>1</l><block s="reportListItem"><l>1</l><block var="bounds"/><` +
        `/block></block><block s="reportListItem"><l>1</l><block s="reportLis` +
        `tItem"><l>1</l><block var="stage bounds"/></block></block></list></b` +
        `lock><script><block s="doSetVar"><l>delta x</l><block s="reportDiffe` +
        `rence"><block s="reportListItem"><l>1</l><block s="reportListItem"><` +
        `l>1</l><block var="stage bounds"/></block></block><block s="reportLi` +
        `stItem"><l>1</l><block s="reportListItem"><l>1</l><block var="bounds` +
        `"/></block></block></block></block></script><list></list></block><bl` +
        `ock s="doIf"><block s="reportVariadicGreaterThan"><list><block s="re` +
        `portListItem"><l>2</l><block s="reportListItem"><l>2</l><block var="` +
        `bounds"/></block></block><block s="reportListItem"><l>2</l><block s=` +
        `"reportListItem"><l>2</l><block var="stage bounds"/></block></block>` +
        `</list></block><script><block s="doSetVar"><l>delta y</l><block s="r` +
        `eportDifference"><block s="reportListItem"><l>2</l><block s="reportL` +
        `istItem"><l>2</l><block var="stage bounds"/></block></block><block s` +
        `="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><block v` +
        `ar="bounds"/></block></block></block></block></script><list></list><` +
        `/block><block s="doGotoObject"><block s="reportVariadicSum"><list><b` +
        `lock s="getPosition"></block><block s="reportNewList"><list><block v` +
        `ar="delta x"/><block var="delta y"/></list></block></list></block></` +
        `block></script><list></list></block></script></block-definition><blo` +
        `ck-definition s="position" type="reporter" category="motion" selecto` +
        `r="getPosition"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs><script><block s="doReport"><block s="report` +
        `NewList"><list><block s="xPosition"></block><block s="yPosition"></b` +
        `lock></list></block></block></script></block-definition><block-defin` +
        `ition s="x position" type="reporter" category="motion" selector="xPo` +
        `sition" primitive="xPosition"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs></block-definition><block-defi` +
        `nition s="y position" type="reporter" category="motion" selector="yP` +
        `osition" primitive="yPosition"><header></header><code></code><transl` +
        `ations></translations><inputs></inputs></block-definition><block-def` +
        `inition s="direction" type="reporter" category="motion" selector="di` +
        `rection" primitive="direction"><header></header><code></code><transl` +
        `ations></translations><inputs></inputs></block-definition><block-def` +
        `inition s="switch to costume %#1" type="command" category="looks" se` +
        `lector="doSwitchToCostume" primitive="doSwitchToCostume"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true"><options>§_costumesMenu</options></input></inpu` +
        `ts></block-definition><block-definition s="next costume" type="comma` +
        `nd" category="looks" selector="doWearNextCostume"><header></header><` +
        `code></code><translations></translations><inputs></inputs><script><b` +
        `lock s="doIf"><block s="reportVariadicGreaterThan"><list><block s="g` +
        `etCostumeIdx"></block><l>0</l></list></block><script><block s="doSwi` +
        `tchToCostume"><block s="reportVariadicSum"><list><block s="reportMod` +
        `ulus"><block s="getCostumeIdx"></block><block s="reportListAttribute` +
        `"><l><option>length</option></l><block s="reportGet"><l><option>cost` +
        `umes</option></l></block></block></block><l>1</l></list></block></bl` +
        `ock></script><list></list></block></script></block-definition><block` +
        `-definition s="costume #" type="reporter" category="looks" selector=` +
        `"getCostumeIdx"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs><script><block s="doReport"><block s="report` +
        `ListIndex"><block s="reportGet"><l><option>costume</option></l></blo` +
        `ck><block s="reportGet"><l><option>costumes</option></l></block></bl` +
        `ock></block></script></block-definition><block-definition s="%#1 of ` +
        `costume %#2" type="reporter" category="looks" selector="reportGetIma` +
        `geAttribute" primitive="reportGetImageAttribute"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true">$_width<options>name=$_name&#xD;wi` +
        `dth=$_width&#xD;height=$_height&#xD;pixels=$_pixels</options></input` +
        `><input type="%s" readonly="true">$_current<options>§_costumesMenu</` +
        `options></input></inputs></block-definition><block-definition s="new` +
        ` costume %#1 width %#2 height %#3" type="reporter" category="looks" ` +
        `selector="reportNewCostume" primitive="reportNewCostume"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%l" readonly="true"></input><input type="%n"><options>a List [2 ele` +
        `ments]</options></input><input type="%n"><options>a List [2 elements` +
        `]</options></input></inputs></block-definition><block-definition s="` +
        `stretch %#1 x: %#2 y: %#3 %" type="reporter" category="looks" select` +
        `or="reportNewCostumeStretched" primitive="reportNewCostumeStretched"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true">$_current<options>§_costumesMenu</o` +
        `ptions></input><input type="%n">100</input><input type="%n">50</inpu` +
        `t></inputs></block-definition><block-definition s="skew %#1 to %#2 d` +
        `egrees %#3 %" type="reporter" category="looks" selector="reportNewCo` +
        `stumeSkewed" primitive="reportNewCostumeSkewed"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true">$_current<options>§_costumesMenu</options></input><input` +
        ` type="%n">0<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD` +
        `;(0) up=0&#xD;(180) down=180&#xD;random=$_random</options></input><i` +
        `nput type="%n">50</input></inputs></block-definition><block-definiti` +
        `on s="say %&apos;msg&apos; for %&apos;time&apos; secs" type="command` +
        `" category="looks" selector="doSayFor"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s">Hello!</input` +
        `><input type="%n">2</input><input type="%s">Hello!</input><input typ` +
        `e="%n">2</input><input type="%s">Hello!</input></inputs><script><blo` +
        `ck s="bubble"><block var="msg"/></block><block s="doWait"><block var` +
        `="time"/></block><block s="bubble"><l></l></block></script></block-d` +
        `efinition><block-definition s="say %#1" type="command" category="loo` +
        `ks" selector="bubble" primitive="bubble"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s">Hello!</inp` +
        `ut></inputs></block-definition><block-definition s="think %&apos;msg` +
        `&apos; for %&apos;time&apos; secs" type="command" category="looks" s` +
        `elector="doThinkFor"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s">Hmm...</input><input type="%n">` +
        `2</input><input type="%s">Hmm...</input><input type="%n">2</input><i` +
        `nput type="%s">Hmm...</input></inputs><script><block s="doThink"><bl` +
        `ock var="msg"/></block><block s="doWait"><block var="time"/></block>` +
        `<block s="doThink"><l></l></block></script></block-definition><block` +
        `-definition s="think %#1" type="command" category="looks" selector="` +
        `doThink" primitive="doThink"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s">Hmm...</input></inputs>` +
        `</block-definition><block-definition s="change %&apos;effect name&ap` +
        `os; effect by %&apos;delta&apos;" type="command" category="looks" se` +
        `lector="changeEffect" primitive="changeEffect"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%s" reado` +
        `nly="true" irreplaceable="true">$_ghost<options>color=$_color&#xD;sa` +
        `turation=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$_ghost&` +
        `#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;` +
        `mosaic=$_mosaic&#xD;negative=$_negative</options></input><input type` +
        `="%n">25</input><input type="%s" readonly="true" irreplaceable="true` +
        `">$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD;brig` +
        `htness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whir` +
        `l=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$` +
        `_negative</options></input><input type="%n">25</input><input type="%` +
        `s" readonly="true" irreplaceable="true">ghost<options>color&#xD;satu` +
        `ration&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#` +
        `xD;mosaic&#xD;negative</options></input></inputs></block-definition>` +
        `<block-definition s="set %#1 effect to %#2" type="command" category=` +
        `"looks" selector="setEffect" primitive="setEffect"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true" irreplaceable="true">$_ghost<options>color=$_color&#x` +
        `D;saturation=$_saturation&#xD;brightness=$_brightness&#xD;ghost=$_gh` +
        `ost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&` +
        `#xD;mosaic=$_mosaic&#xD;negative=$_negative</options></input><input ` +
        `type="%n">0</input></inputs></block-definition><block-definition s="` +
        `%#1 effect" type="reporter" category="looks" selector="getEffect" pr` +
        `imitive="getEffect"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">$_ghost<options>color=$_color&#xD;saturation=$_saturation&#xD;b` +
        `rightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;w` +
        `hirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negativ` +
        `e=$_negative</options></input></inputs></block-definition><block-def` +
        `inition s="clear graphic effects" type="command" category="looks" se` +
        `lector="clearEffects" primitive="clearEffects"><header></header><cod` +
        `e></code><translations></translations><inputs></inputs></block-defin` +
        `ition><block-definition s="change size by %&apos;delta&apos;" type="` +
        `command" category="looks" selector="changeScale"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n">10<` +
        `/input><input type="%n">10</input><input type="%n">10</input></input` +
        `s><script><block s="setScale"><block s="reportVariadicSum"><list><bl` +
        `ock s="getScale"></block><block var="delta"/></list></block></block>` +
        `</script></block-definition><block-definition s="set size to %#1 %" ` +
        `type="command" category="looks" selector="setScale" primitive="setSc` +
        `ale"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%n">100</input></inputs></block-definition><block-d` +
        `efinition s="size" type="reporter" category="looks" selector="getSca` +
        `le" primitive="getScale"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="show" type="command" category="looks" selector="show" primitive` +
        `="show"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="hide" type="` +
        `command" category="looks" selector="hide" primitive="hide"><header><` +
        `/header><code></code><translations></translations><inputs></inputs><` +
        `/block-definition><block-definition s="shown?" type="predicate" cate` +
        `gory="looks" selector="reportShown" primitive="reportShown"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="go to %&apos;name&apos; laye` +
        `r" type="command" category="looks" selector="goToLayer" primitive="g` +
        `oToLayer"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">$_fro` +
        `nt<options>front=$_front&#xD;back=$_back</options></input><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_front<options>front=$_` +
        `front&#xD;back=$_back</options></input><input type="%s" readonly="tr` +
        `ue" irreplaceable="true">$_front<options>front=$_front&#xD;back=$_ba` +
        `ck</options></input></inputs><scripts><script x="10" y="97.833333333` +
        `33331"><block s="doIfElse"><block s="reportVariadicEquals"><list><bl` +
        `ock s="reportJoinWords"><list><block var="name"/></list></block><l>b` +
        `ack</l></list></block><script><block s="doWarp"><script><block s="do` +
        `Until"><block s="reportVariadicEquals"><list><block s="reportListInd` +
        `ex"><block s="reportGet"><l><option>self</option></l></block><block ` +
        `s="reportAskFor"><block s="reportGet"><l><option>stage</option></l><` +
        `/block><block s="reifyReporter"><autolambda><block s="reportGet"><l>` +
        `<option>other sprites</option></l></block></autolambda><list></list>` +
        `</block><list></list></block></block><l>1</l></list></block><script>` +
        `<block s="goBack"><l>1</l></block></script></block></script></block>` +
        `</script><script><block s="doWarp"><script><block s="doUntil"><block` +
        ` s="reportVariadicEquals"><list><block s="reportListIndex"><block s=` +
        `"reportGet"><l><option>self</option></l></block><block s="reportAskF` +
        `or"><block s="reportGet"><l><option>stage</option></l></block><block` +
        ` s="reifyReporter"><autolambda><block s="reportGet"><l><option>other` +
        ` sprites</option></l></block></autolambda><list></list></block><list` +
        `></list></block></block><block s="reportVariadicSum"><list><block s=` +
        `"reportListAttribute"><l><option>length</option></l><block s="report` +
        `Get"><l><option>other sprites</option></l></block></block><l>1</l></` +
        `list></block></list></block><script><block s="goBack"><l>-1</l></blo` +
        `ck></script></block></script></block></script></block></script></scr` +
        `ipts></block-definition><block-definition s="go back %#1 layers" typ` +
        `e="command" category="looks" selector="goBack" primitive="goBack"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">1</input></inputs></block-definition><block-definition` +
        ` s="save %#1 as costume named %#2" type="command" category="looks" s` +
        `elector="doScreenshot" primitive="doScreenshot"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s" read` +
        `only="true">$_pen trails<options>pen trails=$_pen trails&#xD;stage i` +
        `mage=$_stage image</options></input><input type="%s">screenshot</inp` +
        `ut></inputs></block-definition><block-definition s="wardrobe" type="` +
        `reporter" category="looks" selector="reportCostumes" primitive="repo` +
        `rtCostumes"><header></header><code></code><translations></translatio` +
        `ns><inputs></inputs></block-definition><block-definition s="alert %#` +
        `1" type="command" category="looks" selector="alert" primitive="alert` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%mult%s" readonly="true"></input></inputs></block-defi` +
        `nition><block-definition s="console log %#1" type="command" category` +
        `="looks" selector="log" primitive="log"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%mult%s" readonl` +
        `y="true"></input></inputs></block-definition><block-definition s="pl` +
        `ay sound %#1" type="command" category="sound" selector="playSound" p` +
        `rimitive="playSound"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true"><options>§_soun` +
        `dsMenu</options></input></inputs></block-definition><block-definitio` +
        `n s="play sound %&apos;target&apos; until done" type="command" categ` +
        `ory="sound" selector="doPlaySoundUntilDone" primitive="doPlaySoundUn` +
        `tilDone"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true"><options>§_soundsMenu</opti` +
        `ons></input><input type="%s" readonly="true"><options>§_soundsMenu</` +
        `options></input><input type="%s" readonly="true"><options>§_soundsMe` +
        `nu</options></input></inputs><script><block s="doDeclareVariables"><` +
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
        `><scripts><script x="10" y="98"><block s="doDeclareVariables"><list>` +
        `<l>sound</l></list></block><block s="doSetVar"><l>sound</l><block s=` +
        `"reportIfElse"><block s="reportIsA"><block var="target"/><l><option>` +
        `sound</option></l></block><block var="target"/><block s="reportIfEls` +
        `e"><block s="reportIsA"><block var="target"/><l><option>list</option` +
        `></l></block><block s="reportNewSoundFromSamples"><block var="target` +
        `"/><l>44100</l></block><block s="reportFindFirst"><block s="reifyPre` +
        `dicate"><autolambda><block s="reportVariadicEquals"><list><block s="` +
        `reportGetSoundAttribute"><l><option>name</option></l><l></l></block>` +
        `<block var="target"/></list></block></autolambda><list></list></bloc` +
        `k><block s="reportGet"><l><option>sounds</option></l></block></block` +
        `></block></block></block><block s="doIf"><block s="reportIsA"><block` +
        ` var="sound"/><l><option>sound</option></l></block><script><block s=` +
        `"playSound"><block var="sound"/></block><block s="doWait"><block s="` +
        `reportGetSoundAttribute"><l><option>duration</option></l><block var=` +
        `"sound"/></block></block></script><list></list></block></script></sc` +
        `ripts></block-definition><block-definition s="play sound %&apos;targ` +
        `et&apos; at %&apos;rate&apos; Hz" type="command" category="sound" se` +
        `lector="doPlaySoundAtRate" primitive="doPlaySoundAtRate"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true"><options>§_soundsMenu</options></input><input t` +
        `ype="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz` +
        `=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input><input t` +
        `ype="%s" readonly="true"><options>§_soundsMenu</options></input><inp` +
        `ut type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48` +
        ` kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></input><inp` +
        `ut type="%s" readonly="true"><options>§_soundsMenu</options></input>` +
        `</inputs><script><block s="playSound"><block s="reportNewSoundFromSa` +
        `mples"><block s="reportGetSoundAttribute"><l><option>samples</option` +
        `></l><block var="target"/></block><block var="rate"/></block></block` +
        `></script><scripts><script x="10" y="98"><block s="playSound"><block` +
        ` s="reportNewSoundFromSamples"><block s="reportGetSoundAttribute"><l` +
        `><option>samples</option></l><block var="target"/></block><block var` +
        `="rate"/></block></block></script></scripts></block-definition><bloc` +
        `k-definition s="stop all sounds" type="command" category="sound" sel` +
        `ector="doStopAllSounds" primitive="doStopAllSounds"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="%#1 of sound %#2" type="reporter" ca` +
        `tegory="sound" selector="reportGetSoundAttribute" primitive="reportG` +
        `etSoundAttribute"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s" readonly="true" irreplaceable="tru` +
        `e">$_duration<options>name=$_name&#xD;duration=$_duration&#xD;length` +
        `=$_length&#xD;number of channels=$_number of channels&#xD;sample rat` +
        `e=$_sample rate&#xD;samples=$_samples</options></input><input type="` +
        `%s" readonly="true"><options>§_soundsMenu</options></input></inputs>` +
        `</block-definition><block-definition s="new sound %#1 rate %#2 Hz" t` +
        `ype="reporter" category="sound" selector="reportNewSoundFromSamples"` +
        ` primitive="reportNewSoundFromSamples"><header></header><code></code` +
        `><translations></translations><inputs><input type="%l" readonly="tru` +
        `e"></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 k` +
        `Hz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</optio` +
        `ns></input></inputs></block-definition><block-definition s="rest for` +
        ` %&apos;beats&apos; beats" type="command" category="sound" selector=` +
        `"doRest" primitive="doRest"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">0.2</input><input type="` +
        `%n">0.2</input><input type="%n">0.2</input></inputs><scripts><script` +
        ` x="10" y="97.83333333333331"><block s="doWait"><block s="reportQuot` +
        `ient"><l>60</l><block s="reportVariadicProduct"><list><block var="be` +
        `ats"/><block s="getTempo"></block></list></block></block></block></s` +
        `cript></scripts></block-definition><block-definition s="play note %#` +
        `1 for %#2 beats" type="command" category="sound" selector="doPlayNot` +
        `e" primitive="doPlayNote"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">60<options>§_pianoKeyboard` +
        `Menu</options></input><input type="%n">0.5</input></inputs></block-d` +
        `efinition><block-definition s="play %#1 Hz for %#2 secs" type="comma` +
        `nd" category="sound" selector="doPlayFrequency" primitive="doPlayFre` +
        `quency"><header></header><code></code><translations></translations><` +
        `inputs><input type="%n">440</input><input type="%n">2</input></input` +
        `s></block-definition><block-definition s="set instrument to %#1" typ` +
        `e="command" category="sound" selector="doSetInstrument" primitive="d` +
        `oSetInstrument"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">1<options>(1) sine=1&#xD;(2) square=` +
        `2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</options></input></inputs></` +
        `block-definition><block-definition s="change tempo by %&apos;delta&a` +
        `pos;" type="command" category="sound" selector="doChangeTempo"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">20</input><input type="%n">20</input><input type="%n">20<` +
        `/input></inputs><script><block s="doSetTempo"><block s="reportVariad` +
        `icSum"><list><block s="getTempo"></block><block var="delta"/></list>` +
        `</block></block></script></block-definition><block-definition s="set` +
        ` tempo to %#1 bpm" type="command" category="sound" selector="doSetTe` +
        `mpo" primitive="doSetTempo"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">60</input></inputs></blo` +
        `ck-definition><block-definition s="tempo" type="reporter" category="` +
        `sound" selector="getTempo" primitive="getTempo"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="change volume by %&apos;delta&apos;" typ` +
        `e="command" category="sound" selector="changeVolume"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>10</input><input type="%n">10</input><input type="%n">10</input></i` +
        `nputs><script><block s="setVolume"><block s="reportVariadicSum"><lis` +
        `t><block s="getVolume"></block><block var="delta"/></list></block></` +
        `block></script></block-definition><block-definition s="set volume to` +
        ` %#1 %" type="command" category="sound" selector="setVolume" primiti` +
        `ve="setVolume"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%n">100</input></inputs></block-definitio` +
        `n><block-definition s="volume" type="reporter" category="sound" sele` +
        `ctor="getVolume" primitive="getVolume"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="change balance by %&apos;delta&apos;" type="comma` +
        `nd" category="sound" selector="changePan"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">10</input>` +
        `<input type="%n">10</input><input type="%n">10</input></inputs><scri` +
        `pt><block s="setPan"><block s="reportVariadicSum"><list><block s="ge` +
        `tPan"></block><block var="delta"/></list></block></block></script></` +
        `block-definition><block-definition s="set balance to %#1" type="comm` +
        `and" category="sound" selector="setPan" primitive="setPan"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n">0</input></inputs></block-definition><block-definition s="bal` +
        `ance" type="reporter" category="sound" selector="getPan" primitive="` +
        `getPan"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="play frequen` +
        `cy %#1 Hz" type="command" category="sound" selector="playFreq" primi` +
        `tive="playFreq"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">440</input></inputs></block-definiti` +
        `on><block-definition s="stop frequency" type="command" category="sou` +
        `nd" selector="stopFreq" primitive="stopFreq"><header></header><code>` +
        `</code><translations></translations><inputs></inputs></block-definit` +
        `ion><block-definition s="jukebox" type="reporter" category="sound" s` +
        `elector="reportSounds" primitive="reportSounds"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="clear" type="command" category="pen" sel` +
        `ector="clear" primitive="clear"><header></header><code></code><trans` +
        `lations></translations><inputs></inputs></block-definition><block-de` +
        `finition s="pen down" type="command" category="pen" selector="down" ` +
        `primitive="down"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="pen` +
        ` up" type="command" category="pen" selector="up" primitive="up"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="pen down?" type="predica` +
        `te" category="pen" selector="getPenDown" primitive="getPenDown"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="set pen color to %&apos;` +
        `color&apos;" type="command" category="pen" selector="setColor"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%clr" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%clr" readonly="true" irreplaceable="true"></input><input type="%` +
        `clr" readonly="true" irreplaceable="true"></input></inputs><script><` +
        `block s="doApplyExtension"><l>clr_setpen(clr)</l><list><block var="c` +
        `olor"/></list></block></script></block-definition><block-definition ` +
        `s="set pen %#1 to %#2" type="command" category="pen" selector="setPe` +
        `nColorDimension" primitive="setPenColorDimension"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;satur` +
        `ation=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_tr` +
        `ansparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><in` +
        `put type="%n">50</input></inputs></block-definition><block-definitio` +
        `n s="change pen %&apos;aspect&apos; by %&apos;delta&apos;" type="com` +
        `mand" category="pen" selector="changePenColorDimension" primitive="c` +
        `hangePenColorDimension"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true" irreplaceabl` +
        `e="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;bri` +
        `ghtness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;` +
        `r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10</input><i` +
        `nput type="%s" readonly="true" irreplaceable="true">$_hue<options>hu` +
        `e=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#xD;` +
        `transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</op` +
        `tions></input><input type="%n">10</input><input type="%s" readonly="` +
        `true" irreplaceable="true">hue<options>hue&#xD;saturation&#xD;bright` +
        `ness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input></in` +
        `puts></block-definition><block-definition s="pen %#1" type="reporter` +
        `" category="pen" selector="getPenAttribute" primitive="getPenAttribu` +
        `te"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">$_hue<optio` +
        `ns>size=$_size&#xD;hue=$_hue&#xD;saturation=$_saturation&#xD;brightn` +
        `ess=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-` +
        `b-a=$_r-g-b-a</options></input></inputs></block-definition><block-de` +
        `finition s="set background color to %#1" type="command" category="pe` +
        `n" selector="setBackgroundColor" primitive="setBackgroundColor"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%clr" readonly="true" irreplaceable="true"></input></inputs>` +
        `</block-definition><block-definition s="set background %#1 to %#2" t` +
        `ype="command" category="pen" selector="setBackgroundColorDimension" ` +
        `primitive="setBackgroundColorDimension"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s" readonly="tr` +
        `ue" irreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_sa` +
        `turation&#xD;brightness=$_brightness&#xD;transparency=$_transparency` +
        `&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="` +
        `%n">50</input></inputs></block-definition><block-definition s="chang` +
        `e background %#1 by %#2" type="command" category="pen" selector="cha` +
        `ngeBackgroundColorDimension" primitive="changeBackgroundColorDimensi` +
        `on"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">$_hue<optio` +
        `ns>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness` +
        `&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a` +
        `)</options></input><input type="%n">10</input></inputs></block-defin` +
        `ition><block-definition s="change pen size by %&apos;delta&apos;" ty` +
        `pe="command" category="pen" selector="changeSize"><header></header><` +
        `code></code><translations></translations><inputs><input type="%n">1<` +
        `/input><input type="%n">1</input><input type="%n">1</input></inputs>` +
        `<script><block s="setSize"><block s="reportVariadicSum"><list><block` +
        ` s="getPenAttribute"><l><option>size</option></l></block><block var=` +
        `"delta"/></list></block></block></script></block-definition><block-d` +
        `efinition s="set pen size to %#1" type="command" category="pen" sele` +
        `ctor="setSize" primitive="setSize"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%n">1</input></inputs` +
        `></block-definition><block-definition s="stamp" type="command" categ` +
        `ory="pen" selector="doStamp" primitive="doStamp"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="fill" type="command" category="pen" sel` +
        `ector="floodFill" primitive="floodFill"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="write %#1 size %#2" type="command" category="pen` +
        `" selector="write" primitive="write"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s">Hello!</input><` +
        `input type="%n">12</input></inputs></block-definition><block-definit` +
        `ion s="pen trails" type="reporter" category="pen" selector="reportPe` +
        `nTrailsAsCostume" primitive="reportPenTrailsAsCostume"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs></blo` +
        `ck-definition><block-definition s="pen vectors" type="reporter" cate` +
        `gory="pen" selector="reportPentrailsAsSVG" primitive="reportPentrail` +
        `sAsSVG"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="paste on %#1` +
        `" type="command" category="pen" selector="doPasteOn" primitive="doPa` +
        `steOn"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true"><options>§_objectsMenu</optio` +
        `ns></input></inputs></block-definition><block-definition s="cut from` +
        ` %#1" type="command" category="pen" selector="doCutFrom" primitive="` +
        `doCutFrom"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true"><options>§_objectsMenu</o` +
        `ptions></input></inputs></block-definition><block-definition s="mess` +
        `age" type="reporter" category="control" selector="getLastMessage" pr` +
        `imitive="getLastMessage"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="broadcast %#1 %#2" type="command" category="control" selector="` +
        `doBroadcast" primitive="doBroadcast"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        `><options>§_messagesMenu</options></input><input type="%receive" rea` +
        `donly="true" irreplaceable="true" expand="to&#xD;with data" max="2">` +
        `</input></inputs></block-definition><block-definition s="broadcast %` +
        `#1 %#2 and wait" type="command" category="control" selector="doBroad` +
        `castAndWait" primitive="doBroadcastAndWait"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true"><options>§_messagesMenu</options></input><input type="%recei` +
        `ve" readonly="true" irreplaceable="true" expand="to&#xD;with data" m` +
        `ax="2"></input></inputs></block-definition><block-definition s="wait` +
        ` %&apos;duration&apos; secs" type="command" category="control" selec` +
        `tor="doWait"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%n">1</input><input type="%n">1</input><inp` +
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
        `nput type="%boolUE" readonly="true"></input><input type="%boolUE" re` +
        `adonly="true"></input></inputs><script><block s="doIf"><block s="rep` +
        `ortNot"><block s="evaluate"><block var="condition"/><list></list></b` +
        `lock></block><script><block s="doWaitUntil"><block s="evaluate"><blo` +
        `ck var="condition"/><list></list></block></block></script><list></li` +
        `st></block></script></block-definition><block-definition s="forever ` +
        `%&apos;action&apos;" type="command" category="control" selector="doF` +
        `orever"><header></header><code></code><translations></translations><` +
        `inputs><input type="%loop" readonly="true" irreplaceable="true"></in` +
        `put><input type="%loop" readonly="true" irreplaceable="true"></input` +
        `><input type="%loop" readonly="true" irreplaceable="true"></input></` +
        `inputs><script><block s="doRun"><block var="action"/><list></list></` +
        `block><block s="doRun"><block s="reportEnvironment"><l><option>scrip` +
        `t</option></l></block><list><block var="action"/></list></block></sc` +
        `ript></block-definition><block-definition s="repeat %&apos;count&apo` +
        `s; %&apos;action&apos;" type="command" category="control" selector="` +
        `doRepeat"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">10</input><input type="%loop" readonly="tr` +
        `ue" irreplaceable="true"></input><input type="%n">10</input><input t` +
        `ype="%loop" readonly="true" irreplaceable="true"></input><input type` +
        `="%loop" readonly="true" irreplaceable="true"></input></inputs><scri` +
        `pt><block s="doDeclareVariables"><list><l>self</l></list></block><bl` +
        `ock s="doSetVar"><l>self</l><block s="reportEnvironment"><l><option>` +
        `script</option></l></block></block><block s="doIf"><block s="reportV` +
        `ariadicGreaterThan"><list><block var="count"/><l>0</l></list></block` +
        `><script><block s="doRun"><block var="action"/><list></list></block>` +
        `<block s="doApplyExtension"><l>snap_yield</l><list></list></block><b` +
        `lock s="doRun"><block var="self"/><list><block s="reportDifference">` +
        `<block var="count"/><l>1</l></block><block var="action"/></list></bl` +
        `ock></script><list></list></block></script></block-definition><block` +
        `-definition s="repeat until %&apos;condition&apos; %&apos;action&apo` +
        `s;" type="command" category="control" selector="doUntil"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%boolUE" readonly="true"></input><input type="%loop" readonly="true` +
        `" irreplaceable="true"></input><input type="%boolUE" readonly="true"` +
        `></input><input type="%loop" readonly="true" irreplaceable="true"></` +
        `input><input type="%loop" readonly="true" irreplaceable="true"></inp` +
        `ut></inputs><script><block s="doDeclareVariables"><list><l>self</l><` +
        `/list></block><block s="doSetVar"><l>self</l><block s="reportEnviron` +
        `ment"><l><option>script</option></l></block></block><block s="doIf">` +
        `<block s="reportNot"><block s="evaluate"><block var="condition"/><li` +
        `st></list></block></block><script><block s="doRun"><block var="actio` +
        `n"/><list></list></block><block s="doApplyExtension"><l>snap_yield</` +
        `l><list></list></block><block s="doRun"><block var="self"/><list><bl` +
        `ock var="condition"/><block var="action"/></list></block></script><l` +
        `ist></list></block></script></block-definition><block-definition s="` +
        `for %&apos;count&apos; = %&apos;start&apos; to %&apos;end&apos; %&ap` +
        `os;action&apos;" type="command" category="control" selector="doFor">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%upvar" readonly="true" irreplaceable="true">i</input><i` +
        `nput type="%n">1</input><input type="%n">10</input><input type="%loo` +
        `p" readonly="true" irreplaceable="true"></input><input type="%upvar"` +
        ` readonly="true" irreplaceable="true">i</input><input type="%n">1</i` +
        `nput><input type="%n">10</input><input type="%loop" readonly="true" ` +
        `irreplaceable="true"></input><input type="%loop" readonly="true" irr` +
        `eplaceable="true"></input></inputs><script><block s="doDeclareVariab` +
        `les"><list><l>test</l><l>increment</l></list></block><block s="doSet` +
        `Var"><l>count</l><block var="start"/></block><block s="doIfElse"><bl` +
        `ock s="reportVariadicLessThan"><list><block var="start"/><block var=` +
        `"end"/></list></block><script><block s="doSetVar"><l>test</l><block ` +
        `s="reifyPredicate"><autolambda><block s="reportVariadicGreaterThan">` +
        `<list><block var="count"/><block var="end"/></list></block></autolam` +
        `bda><list></list></block></block><block s="doSetVar"><l>increment</l` +
        `><l>1</l></block></script><script><block s="doSetVar"><l>test</l><bl` +
        `ock s="reifyPredicate"><autolambda><block s="reportVariadicLessThan"` +
        `><list><block var="count"/><block var="end"/></list></block></autola` +
        `mbda><list></list></block></block><block s="doSetVar"><l>increment</` +
        `l><l>-1</l></block></script></block><block s="doUntil"><block s="eva` +
        `luate"><block var="test"/><list></list></block><script><block s="doR` +
        `un"><block var="action"/><list></list></block><block s="doChangeVar"` +
        `><l>count</l><block var="increment"/></block></script></block></scri` +
        `pt></block-definition><block-definition s="if %&apos;condition&apos;` +
        ` %&apos;true case&apos; %&apos;else pairs&apos;" type="command" cate` +
        `gory="control" selector="doIf" primitive="doIf"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%b" read` +
        `only="true"></input><input type="%cs" readonly="true" irreplaceable=` +
        `"true"></input><input type="%elseif" readonly="true" irreplaceable="` +
        `true" expand="else if&#xD;"></input><input type="%b" readonly="true"` +
        `></input><input type="%cs" readonly="true" irreplaceable="true"></in` +
        `put><input type="%elseif" readonly="true" irreplaceable="true" expan` +
        `d="else if&#xD;"></input><input type="%b" readonly="true"></input></` +
        `inputs><script><block s="doDeclareVariables"><list><l>self</l></list` +
        `></block><block s="doSetVar"><l>self</l><block s="reportEnvironment"` +
        `><l><option>script</option></l></block></block><block s="doIfElse"><` +
        `block var="condition"/><script><block s="doRun"><block var="true cas` +
        `e"/><list></list></block></script><script><block s="doIfElse"><block` +
        ` s="reportListIsEmpty"><block var="else pairs"/></block><script></sc` +
        `ript><script><block s="doIfElse"><block s="reportListItem"><l>1</l><` +
        `block var="else pairs"/></block><script><block s="doRun"><block s="r` +
        `eportListItem"><l>2</l><block var="else pairs"/></block><list></list` +
        `></block></script><script><block s="doRun"><block var="self"/><list>` +
        `<block s="reportBoolean"><l><bool>false</bool></l></block><l></l><bl` +
        `ock s="reportCDR"><block s="reportCDR"><block var="else pairs"/></bl` +
        `ock></block></list></block></script></block></script></block></scrip` +
        `t></block></script><scripts><script x="10" y="98"><block s="doDeclar` +
        `eVariables"><list><l>self</l></list></block><block s="doSetVar"><l>s` +
        `elf</l><block s="reportEnvironment"><l><option>script</option></l></` +
        `block></block><block s="doIfElse"><block var="condition"/><script><b` +
        `lock s="doRun"><block var="true case"/><list></list></block></script` +
        `><script><block s="doIfElse"><block s="reportListIsEmpty"><block var` +
        `="else pairs"/></block><script></script><script><block s="doIfElse">` +
        `<block s="reportListItem"><l>1</l><block var="else pairs"/></block><` +
        `script><block s="doRun"><block s="reportListItem"><l>2</l><block var` +
        `="else pairs"/></block><list></list></block></script><script><block ` +
        `s="doRun"><block var="self"/><list><block s="reportBoolean"><l><bool` +
        `>false</bool></l></block><l></l><block s="reportCDR"><block s="repor` +
        `tCDR"><block var="else pairs"/></block></block></list></block></scri` +
        `pt></block></script></block></script></block></script></scripts></bl` +
        `ock-definition><block-definition s="if %&apos;condition&apos; %&apos` +
        `;true case&apos; else %&apos;false case&apos;" type="command" catego` +
        `ry="control" selector="doIfElse" primitive="doIfElse"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%b` +
        `" readonly="true"></input><input type="%cs" readonly="true" irreplac` +
        `eable="true"></input><input type="%cs" readonly="true" irreplaceable` +
        `="true"></input><input type="%b" readonly="true"></input><input type` +
        `="%cs" readonly="true" irreplaceable="true"></input><input type="%cs` +
        `" readonly="true" irreplaceable="true"></input><input type="%cs" rea` +
        `donly="true" irreplaceable="true"></input></inputs><scripts><script ` +
        `x="10" y="97.83333333333331"><block s="doRun"><block s="reportListIt` +
        `em"><block s="reportVariadicSum"><list><block var="condition"/><l>1<` +
        `/l></list></block><block s="reportNewList"><list><block var="false c` +
        `ase"/><block var="true case"/></list></block></block><list></list></` +
        `block></script></scripts></block-definition><block-definition s="if ` +
        `%&apos;condition&apos; then %&apos;true case&apos; else %&apos;false` +
        ` case&apos;" type="reporter" category="control" selector="reportIfEl` +
        `se" primitive="reportIfElse"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%b" readonly="true"></input` +
        `><input type="%anyUE"></input><input type="%anyUE"></input><input ty` +
        `pe="%b" readonly="true"></input><input type="%anyUE"></input><input ` +
        `type="%anyUE"></input><input type="%b" readonly="true"></input></inp` +
        `uts><scripts><script x="10" y="91.83333333333331"><block s="doReport` +
        `"><block s="reportHyperZip"><block s="reifyReporter"><autolambda><bl` +
        `ock s="evaluate"><block s="reportListItem"><l></l><l/></block><list>` +
        `</list></block></autolambda><list></list></block><block s="reportVar` +
        `iadicSum"><list><block var="condition"/><l>1</l></list></block><l>0<` +
        `/l><block s="reportNewList"><list><block var="false case"/><block va` +
        `r="true case"/></list></block><l>1</l></block></block></script></scr` +
        `ipts></block-definition><block-definition s="stop %#1" type="command` +
        `" category="control" selector="doStopThis" primitive="doStopThis"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true" irreplaceable="true">$_all<options>all` +
        `=$_all&#xD;all scenes=$_all scenes&#xD;this script=$_this script&#xD` +
        `;this block=$_this block&#xD;all but this script=$_all but this scri` +
        `pt&#xD;other scripts in sprite=$_other scripts in sprite</options></` +
        `input></inputs></block-definition><block-definition s="run %#1 %#2" ` +
        `type="command" category="control" selector="doRun" primitive="doRun"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%cmdRing" readonly="true"></input><input type="%mult%s"` +
        ` readonly="true" expand="with inputs"></input></inputs></block-defin` +
        `ition><block-definition s="launch %#1 %#2" type="command" category="` +
        `control" selector="fork" primitive="fork"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%cmdRing" read` +
        `only="true"></input><input type="%mult%s" readonly="true" expand="wi` +
        `th inputs"></input></inputs></block-definition><block-definition s="` +
        `call %#1 %#2" type="reporter" category="control" selector="evaluate"` +
        ` primitive="evaluate"><header></header><code></code><translations></` +
        `translations><inputs><input type="%repRing" readonly="true" irreplac` +
        `eable="true"></input><input type="%mult%s" readonly="true" expand="w` +
        `ith inputs"></input></inputs></block-definition><block-definition s=` +
        `"report %#1" type="command" category="control" selector="doReport" p` +
        `rimitive="doReport"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s"></input></inputs></block-definit` +
        `ion><block-definition s="run %#1 w/continuation" type="command" cate` +
        `gory="control" selector="doCallCC" primitive="doCallCC"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%cmdRing" readonly="true"></input></inputs></block-definition><block` +
        `-definition s="call %#1 w/continuation" type="reporter" category="co` +
        `ntrol" selector="reportCallCC" primitive="reportCallCC"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%cmdRing" readonly="true"></input></inputs></block-definition><block` +
        `-definition s="warp %#1" type="command" category="other" selector="d` +
        `oWarp" primitive="doWarp"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%cs" readonly="true" irreplace` +
        `able="true"></input></inputs></block-definition><block-definition s=` +
        `"tell %&apos;target&apos; to %&apos;action&apos; %&apos;parameters&a` +
        `pos;" type="command" category="control" selector="doTellTo"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true"><options>§_objectsMenu</options></input><inp` +
        `ut type="%cmdRing" readonly="true"></input><input type="%mult%s" rea` +
        `donly="true" expand="with inputs"></input><input type="%s" readonly=` +
        `"true"><options>§_objectsMenu</options></input><input type="%cmdRing` +
        `" readonly="true"></input><input type="%mult%s" readonly="true" expa` +
        `nd="with inputs"></input><input type="%s" readonly="true"><options>§` +
        `_objectsMenu</options></input></inputs><script><block s="doRun"><blo` +
        `ck s="reportAttributeOf"><block var="action"/><block var="target"/><` +
        `/block><block var="parameters"/></block></script></block-definition>` +
        `<block-definition s="ask %&apos;target&apos; for %&apos;action&apos;` +
        ` %&apos;parameters&apos;" type="reporter" category="control" selecto` +
        `r="reportAskFor"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true"><options>§_objectsM` +
        `enu</options></input><input type="%repRing" readonly="true" irreplac` +
        `eable="true"></input><input type="%mult%s" readonly="true" expand="w` +
        `ith inputs"></input><input type="%s" readonly="true"><options>§_obje` +
        `ctsMenu</options></input><input type="%repRing" readonly="true" irre` +
        `placeable="true"></input><input type="%mult%s" readonly="true" expan` +
        `d="with inputs"></input><input type="%s" readonly="true"><options>§_` +
        `objectsMenu</options></input></inputs><script><block s="doReport"><b` +
        `lock s="evaluate"><block s="reportAttributeOf"><block var="action"/>` +
        `<block var="target"/></block><block var="parameters"/></block></bloc` +
        `k></script></block-definition><block-definition s="create a clone of` +
        ` %&apos;target&apos;" type="command" category="control" selector="cr` +
        `eateClone"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true">$_myself<options>§_clonab` +
        `lesMenu</options></input><input type="%s" readonly="true">$_myself<o` +
        `ptions>§_clonablesMenu</options></input><input type="%s" readonly="t` +
        `rue">myself<options>§_clonablesMenu</options></input></inputs><scrip` +
        `t><block s="doReport"><block s="newClone"><block var="target"/></blo` +
        `ck></block></script></block-definition><block-definition s="a new cl` +
        `one of %#1" type="reporter" category="control" selector="newClone" p` +
        `rimitive="newClone"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true">$_myself<options` +
        `>§_clonablesMenu</options></input></inputs></block-definition><block` +
        `-definition s="delete this clone" type="command" category="control" ` +
        `selector="removeClone" primitive="removeClone"><header></header><cod` +
        `e></code><translations></translations><inputs></inputs></block-defin` +
        `ition><block-definition s="define %#1 %#2 %#3" type="command" catego` +
        `ry="control" selector="doDefineBlock" primitive="doDefineBlock"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%upvar" readonly="true" irreplaceable="true">$_block</input>` +
        `<input type="%s"></input><input type="%repRing" readonly="true" irre` +
        `placeable="true"></input></inputs></block-definition><block-definiti` +
        `on s="set %#1 of block %#2 to %#3" type="command" category="control"` +
        ` selector="doSetBlockAttribute" primitive="doSetBlockAttribute"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true" irreplaceable="true">$_label<options>lab` +
        `el=$_label&#xD;definition=$_definition&#xD;comment=$_comment&#xD;cat` +
        `egory=$_category&#xD;type=$_type&#xD;scope=$_scope&#xD;selector=$_se` +
        `lector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#xD;menu` +
        `s=$_menus&#xD;editables=$_editables&#xD;replaceables=$_replaceables&` +
        `#xD;&#126;&#xD;separators=$_separators&#xD;collapses=$_collapses&#xD` +
        `;expands=$_expands&#xD;initial slots=$_initial slots&#xD;min slots=$` +
        `_min slots&#xD;max slots=$_max slots&#xD;translations=$_translations` +
        `</options></input><input type="%repRing" readonly="true" irreplaceab` +
        `le="true"></input><input type="%s"></input></inputs></block-definiti` +
        `on><block-definition s="delete block %#1" type="command" category="c` +
        `ontrol" selector="doDeleteBlock" primitive="doDeleteBlock"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%repRing" readonly="true" irreplaceable="true"></input></inputs><` +
        `/block-definition><block-definition s="%#1 of block %#2" type="repor` +
        `ter" category="control" selector="reportBlockAttribute" primitive="r` +
        `eportBlockAttribute"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true">$_definition<options>label=$_label&#xD;definition=$_definition` +
        `&#xD;comment=$_comment&#xD;category=$_category&#xD;custom?=$_custom?` +
        `&#xD;global?=$_global?&#xD;type=$_type&#xD;scope=$_scope&#xD;selecto` +
        `r=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD;defaults=$_defaults&#x` +
        `D;menus=$_menus&#xD;editables=$_editables&#xD;replaceables=$_replace` +
        `ables&#xD;&#126;&#xD;separators=$_separators&#xD;collapses=$_collaps` +
        `es&#xD;expands=$_expands&#xD;initial slots=$_initial slots&#xD;min s` +
        `lots=$_min slots&#xD;max slots=$_max slots&#xD;translations=$_transl` +
        `ations</options></input><input type="%repRing" readonly="true" irrep` +
        `laceable="true"></input></inputs></block-definition><block-definitio` +
        `n s="this %#1" type="reporter" category="control" selector="reportEn` +
        `vironment" primitive="reportEnvironment"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">$_script<options>script=$_script&#xD;calle` +
        `r=$_caller&#xD;continuation=$_continuation&#xD;&#126;&#xD;inputs=$_i` +
        `nputs</options></input></inputs></block-definition><block-definition` +
        ` s="pause all $pause" type="command" category="control" selector="do` +
        `PauseAll" primitive="doPauseAll"><header></header><code></code><tran` +
        `slations></translations><inputs></inputs></block-definition><block-d` +
        `efinition s="switch to scene %#1 %#2" type="command" category="contr` +
        `ol" selector="doSwitchToScene" primitive="doSwitchToScene"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true">$_next<options>§_scenesMenu</options></input>` +
        `<input type="%send" readonly="true" irreplaceable="true" expand="and` +
        ` send&#xD;with data" max="2"></input></inputs></block-definition><bl` +
        `ock-definition s="pipe %&apos;value&apos; $arrowRight %&apos;functio` +
        `ns&apos;" type="reporter" category="control" selector="reportPipe"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s"></input><input type="%mult%repRing" readonly="true"><` +
        `/input><input type="%s"></input><input type="%mult%repRing" readonly` +
        `="true"></input><input type="%mult%repRing" readonly="true" initial=` +
        `"1"></input></inputs><script><block s="doReport"><block s="reportIfE` +
        `lse"><block s="reportListIsEmpty"><block var="functions"/></block><b` +
        `lock var="value"/><block s="reportPipe"><block s="evaluate"><block s` +
        `="reportListItem"><l>1</l><block var="functions"/></block><list><blo` +
        `ck var="value"/></list></block><block s="reportCDR"><block var="func` +
        `tions"/></block></block></block></block></script></block-definition>` +
        `<block-definition s="touching %#1 ?" type="predicate" category="sens` +
        `ing" selector="reportTouchingObject" primitive="reportTouchingObject` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true">$_mouse-pointer<options>§_collidab` +
        `lesMenu</options></input></inputs></block-definition><block-definiti` +
        `on s="touching %#1 ?" type="predicate" category="sensing" selector="` +
        `reportTouchingColor" primitive="reportTouchingColor"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%cl` +
        `r" readonly="true" irreplaceable="true"></input></inputs></block-def` +
        `inition><block-definition s="color %#1 is touching %#2 ?" type="pred` +
        `icate" category="sensing" selector="reportColorIsTouchingColor" prim` +
        `itive="reportColorIsTouchingColor"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%clr" readonly="true"` +
        ` irreplaceable="true"></input><input type="%clr" readonly="true" irr` +
        `eplaceable="true"></input></inputs></block-definition><block-definit` +
        `ion s="%#1 at %#2" type="reporter" category="sensing" selector="repo` +
        `rtAspect" primitive="reportAspect"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturat` +
        `ion&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;` +
        `r-g-b-a=$_r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites</options></input>` +
        `<input type="%s" readonly="true">$_mouse-pointer<options>§_locationM` +
        `enu</options></input></inputs></block-definition><block-definition s` +
        `="stack size" type="reporter" category="sensing" selector="reportSta` +
        `ckSize" primitive="reportStackSize"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="frames" type="reporter" category="sensing" selector=` +
        `"reportFrameCount" primitive="reportFrameCount"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="yields" type="reporter" category="sensin` +
        `g" selector="reportYieldCount" primitive="reportYieldCount"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="processes" type="reporter" c` +
        `ategory="sensing" selector="reportThreadCount" primitive="reportThre` +
        `adCount"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="ask %#1 and` +
        ` wait" type="command" category="sensing" selector="doAsk" primitive=` +
        `"doAsk"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s">what&apos;s your name?</input></inputs></blo` +
        `ck-definition><block-definition s="answer" type="reporter" category=` +
        `"sensing" selector="reportLastAnswer" primitive="reportLastAnswer"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="answer" type="reporte` +
        `r" category="sensing" selector="getLastAnswer" primitive="getLastAns` +
        `wer"><header></header><code></code><translations></translations><inp` +
        `uts></inputs></block-definition><block-definition s="mouse position"` +
        ` type="reporter" category="sensing" selector="reportMousePosition"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs><script><block s="doReport"><block s="reportNewList"><list><b` +
        `lock s="reportMouseX"></block><block s="reportMouseY"></block></list` +
        `></block></block></script></block-definition><block-definition s="mo` +
        `use x" type="reporter" category="sensing" selector="reportMouseX" pr` +
        `imitive="reportMouseX"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="mouse y" type="reporter" category="sensing" selector="reportMouse` +
        `Y" primitive="reportMouseY"><header></header><code></code><translati` +
        `ons></translations><inputs></inputs></block-definition><block-defini` +
        `tion s="mouse down?" type="predicate" category="sensing" selector="r` +
        `eportMouseDown" primitive="reportMouseDown"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="key %#1 pressed?" type="predicate" category=` +
        `"sensing" selector="reportKeyPressed" primitive="reportKeyPressed"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true">$_space<options>§_keysMenu</options><` +
        `/input></inputs></block-definition><block-definition s="%#1 to %#2" ` +
        `type="reporter" category="sensing" selector="reportRelationTo" primi` +
        `tive="reportRelationTo"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true">$_distance<o` +
        `ptions>distance=$_distance&#xD;direction=$_direction&#xD;ray length=` +
        `$_ray length</options></input><input type="%s" readonly="true">$_mou` +
        `se-pointer<options>§_destinationsMenu</options></input></inputs></bl` +
        `ock-definition><block-definition s="reset timer" type="command" cate` +
        `gory="sensing" selector="doResetTimer" primitive="doResetTimer"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts></block-definition><block-definition s="timer" type="reporter" c` +
        `ategory="sensing" selector="reportTimer" primitive="reportTimer"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="timer" type="reporter" ` +
        `category="sensing" selector="getTimer" primitive="getTimer"><header>` +
        `</header><code></code><translations></translations><inputs></inputs>` +
        `</block-definition><block-definition s="%#1 of %#2" type="reporter" ` +
        `category="sensing" selector="reportAttributeOf" primitive="reportAtt` +
        `ributeOf"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true">$_costume #<options>§_attr` +
        `ibutesMenu</options></input><input type="%s" readonly="true"><option` +
        `s>§_objectsMenu</options></input></inputs></block-definition><block-` +
        `definition s="object %&apos;name&apos;" type="reporter" category="se` +
        `nsing" selector="reportObject" primitive="reportObject"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true">$_myself<options>§_objectsMenuWithSelf</options>` +
        `</input><input type="%s" readonly="true">$_myself<options>§_objectsM` +
        `enuWithSelf</options></input><input type="%s" readonly="true">myself` +
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
        `ck var="name"/><l>0</l><l></l><l>0</l></block></block></script><scri` +
        `pts><script x="10" y="98"><block s="doReport"><block s="reportHyperZ` +
        `ip"><block s="reifyReporter"><autolambda><block s="reportFindFirst">` +
        `<block s="reifyPredicate"><autolambda><block s="reportVariadicEquals` +
        `"><list><block var="id"/><block s="reportAskFor"><l></l><block s="re` +
        `ifyReporter"><autolambda><block s="reportGet"><l><option>name</optio` +
        `n></l></block></autolambda><list></list></block><list></list></block` +
        `></list></block></autolambda><list></list></block><block s="reportCo` +
        `ncatenatedLists"><list><block s="reportAskFor"><block s="reportGet">` +
        `<l><option>stage</option></l></block><block s="reifyReporter"><autol` +
        `ambda><block s="reportGet"><l><option>other sprites</option></l></bl` +
        `ock></autolambda><list></list></block><list></list></block><block s=` +
        `"reportNewList"><list><block s="reportGet"><l><option>stage</option>` +
        `</l></block></list></block></list></block></block></autolambda><list` +
        `><l>id</l></list></block><block var="name"/><l>0</l><l></l><l>0</l><` +
        `/block></block></script></scripts></block-definition><block-definiti` +
        `on s="url %#1" type="reporter" category="sensing" selector="reportUR` +
        `L" primitive="reportURL"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s">snap.berkeley.edu</input></` +
        `inputs></block-definition><block-definition s="set %#1 to %#2" type=` +
        `"command" category="sensing" selector="doSetGlobalFlag" primitive="d` +
        `oSetGlobalFlag"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true" irreplaceable="true"` +
        `>$_video capture<options>turbo mode=$_turbo mode&#xD;case sensitivit` +
        `y=$_case sensitivity&#xD;flat line ends=$_flat line ends&#xD;log pen` +
        ` vectors=$_log pen vectors&#xD;video capture=$_video capture&#xD;mir` +
        `ror video=$_mirror video</options></input><input type="%b" readonly=` +
        `"true"></input></inputs></block-definition><block-definition s="is %` +
        `#1 on?" type="predicate" category="sensing" selector="reportGlobalFl` +
        `ag" primitive="reportGlobalFlag"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_turbo mode<options>turbo mode=$_turbo mode&#xD;c` +
        `ase sensitivity=$_case sensitivity&#xD;flat line ends=$_flat line en` +
        `ds&#xD;log pen vectors=$_log pen vectors&#xD;video capture=$_video c` +
        `apture&#xD;mirror video=$_mirror video</options></input></inputs></b` +
        `lock-definition><block-definition s="current %#1" type="reporter" ca` +
        `tegory="sensing" selector="reportDate" primitive="reportDate"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true" irreplaceable="true">$_date<options>year=$` +
        `_year&#xD;month=$_month&#xD;date=$_date&#xD;day of week=$_day of wee` +
        `k&#xD;hour=$_hour&#xD;minute=$_minute&#xD;second=$_second&#xD;time i` +
        `n milliseconds=$_time in milliseconds</options></input></inputs></bl` +
        `ock-definition><block-definition s="my %#1" type="reporter" category` +
        `="sensing" selector="reportGet" primitive="reportGet"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true" irreplaceable="true">$_neighbors<options>§_gettabl` +
        `esMenu</options></input></inputs></block-definition><block-definitio` +
        `n s="microphone %#1" type="reporter" category="sensing" selector="re` +
        `portAudio" primitive="reportAudio"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">$_volume<options>§_audioMenu</options></input></` +
        `inputs></block-definition><block-definition s="%#1" type="reporter" ` +
        `category="operators" selector="reportVariadicSum" primitive="reportV` +
        `ariadicSum"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%n" readonly="true" separator="+" colla` +
        `pse="sum" initial="2"></input></inputs></block-definition><block-def` +
        `inition s="%&apos;a&apos; − %&apos;b&apos;" type="reporter" category` +
        `="operators" selector="reportDifference" primitive="reportDifference` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%n"></input><input type="%n"></input><input type="%n">` +
        `</input><input type="%n"></input><input type="%n"></input></inputs><` +
        `scripts><script x="10" y="91.83333333333331"><block s="doReport"><bl` +
        `ock s="reportVariadicSum"><list><block var="a"/><block s="reportMona` +
        `dic"><l><option>neg</option></l><block var="b"/></block></list></blo` +
        `ck></block></script></scripts></block-definition><block-definition s` +
        `="%#1" type="reporter" category="operators" selector="reportVariadic` +
        `Product" primitive="reportVariadicProduct"><header></header><code></` +
        `code><translations></translations><inputs><input type="%mult%n" read` +
        `only="true" separator="×" collapse="product" initial="2"></input></i` +
        `nputs></block-definition><block-definition s="%#1 / %#2" type="repor` +
        `ter" category="operators" selector="reportQuotient" primitive="repor` +
        `tQuotient"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n"></input><input type="%n"></input></inputs` +
        `></block-definition><block-definition s="round %#1" type="reporter" ` +
        `category="operators" selector="reportRound" primitive="reportRound">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%n"></input></inputs></block-definition><block-definitio` +
        `n s="%#1 of %#2" type="reporter" category="operators" selector="repo` +
        `rtMonadic" primitive="reportMonadic"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">$_sqrt<options>abs=$_abs&#xD;neg=$_neg&#xD;sig` +
        `n=$_sign&#xD;ceiling=$_ceiling&#xD;floor=$_floor&#xD;sqrt=$_sqrt&#xD` +
        `;sin=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD;asin=$_asin&#xD;acos=$_ac` +
        `os&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_log&#xD;lg=$_lg&#xD;e^=$_e^` +
        `&#xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</options></input><input type=` +
        `"%n">10</input></inputs></block-definition><block-definition s="%#1 ` +
        `^ %#2" type="reporter" category="operators" selector="reportPower" p` +
        `rimitive="reportPower"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n"></input><input type="%n"></in` +
        `put></inputs></block-definition><block-definition s="%#1 mod %#2" ty` +
        `pe="reporter" category="operators" selector="reportModulus" primitiv` +
        `e="reportModulus"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%n"></input><input type="%n"></input><` +
        `/inputs></block-definition><block-definition s="atan2 %#1 ÷ %#2" typ` +
        `e="reporter" category="operators" selector="reportAtan2" primitive="` +
        `reportAtan2"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%n"></input><input type="%n"></input></inpu` +
        `ts></block-definition><block-definition s="%#1" type="reporter" cate` +
        `gory="operators" selector="reportVariadicMin" primitive="reportVaria` +
        `dicMin"><header></header><code></code><translations></translations><` +
        `inputs><input type="%mult%n" readonly="true" separator="min" collaps` +
        `e="minimum" initial="2"></input></inputs></block-definition><block-d` +
        `efinition s="%#1" type="reporter" category="operators" selector="rep` +
        `ortVariadicMax" primitive="reportVariadicMax"><header></header><code` +
        `></code><translations></translations><inputs><input type="%mult%n" r` +
        `eadonly="true" separator="max" collapse="maximum" initial="2"></inpu` +
        `t></inputs></block-definition><block-definition s="pick random %#1 t` +
        `o %#2" type="reporter" category="operators" selector="reportRandom" ` +
        `primitive="reportRandom"><header></header><code></code><translations` +
        `></translations><inputs><input type="%n">1</input><input type="%n">1` +
        `0</input></inputs></block-definition><block-definition s="%#1" type=` +
        `"predicate" category="operators" selector="reportVariadicEquals" pri` +
        `mitive="reportVariadicEquals"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%mult%s" readonly="true" s` +
        `eparator="=" collapse="all =" initial="2"></input></inputs></block-d` +
        `efinition><block-definition s="%#1" type="predicate" category="opera` +
        `tors" selector="reportVariadicNotEquals" primitive="reportVariadicNo` +
        `tEquals"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%mult%s" readonly="true" separator="≠" collapse` +
        `="neighbors ≠" initial="2"></input></inputs></block-definition><bloc` +
        `k-definition s="%#1" type="predicate" category="operators" selector=` +
        `"reportVariadicLessThan" primitive="reportVariadicLessThan"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%mult%s" readonly="true" separator="&lt;" collapse="all &lt;" in` +
        `itial="2"></input></inputs></block-definition><block-definition s="%` +
        `#1" type="predicate" category="operators" selector="reportVariadicLe` +
        `ssThanOrEquals" primitive="reportVariadicLessThanOrEquals"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%mult%s" readonly="true" separator="≤" collapse="all ≤" initial="` +
        `2"></input></inputs></block-definition><block-definition s="%#1" typ` +
        `e="predicate" category="operators" selector="reportVariadicGreaterTh` +
        `an" primitive="reportVariadicGreaterThan"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%mult%s" reado` +
        `nly="true" separator="&gt;" collapse="all &gt;" initial="2"></input>` +
        `</inputs></block-definition><block-definition s="%#1" type="predicat` +
        `e" category="operators" selector="reportVariadicGreaterThanOrEquals"` +
        ` primitive="reportVariadicGreaterThanOrEquals"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%s" ` +
        `readonly="true" separator="≥" collapse="all ≥" initial="2"></input><` +
        `/inputs></block-definition><block-definition s="%#1" type="predicate` +
        `" category="operators" selector="reportVariadicAnd" primitive="repor` +
        `tVariadicAnd"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%mult%b" readonly="true" separator="and" c` +
        `ollapse="all" initial="2"></input></inputs></block-definition><block` +
        `-definition s="%#1" type="predicate" category="operators" selector="` +
        `reportVariadicOr" primitive="reportVariadicOr"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%b" ` +
        `readonly="true" separator="or" collapse="any" initial="2"></input></` +
        `inputs></block-definition><block-definition s="not %&apos;bool&apos;` +
        `" type="predicate" category="operators" selector="reportNot"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%b" readonly="true"></input><input type="%b" readonly="true"></` +
        `input><input type="%b" readonly="true"></input></inputs><script><blo` +
        `ck s="doReport"><block s="reportIfElse"><block var="bool"/><block s=` +
        `"reportBoolean"><l><bool>false</bool></l></block><block s="reportBoo` +
        `lean"><l><bool>true</bool></l></block></block></block></script></blo` +
        `ck-definition><block-definition s="%#1" type="predicate" category="o` +
        `perators" selector="reportBoolean" primitive="reportBoolean"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%b" readonly="true" irreplaceable="true">true</input></inputs><` +
        `/block-definition><block-definition s="%#1" type="predicate" categor` +
        `y="operators" selector="reportFalse" primitive="reportFalse"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%b" readonly="true" irreplaceable="true">false</input></inputs>` +
        `</block-definition><block-definition s="join %#1" type="reporter" ca` +
        `tegory="operators" selector="reportJoinWords" primitive="reportJoinW` +
        `ords"><header></header><code></code><translations></translations><in` +
        `puts><input type="%mult%s" readonly="true" initial="2">hello &#xD;wo` +
        `rld</input></inputs></block-definition><block-definition s="letter %` +
        `&apos;idx&apos; of %&apos;text&apos;" type="reporter" category="oper` +
        `ators" selector="reportLetter" primitive="reportLetter"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options></inp` +
        `ut><input type="%s">world</input><input type="%n">1<options>1=1&#xD;` +
        `last=$_last&#xD;random=$_random</options></input><input type="%s">wo` +
        `rld</input><input type="%n">1<options>1=1&#xD;last&#xD;random</optio` +
        `ns></input></inputs><script><block s="doReport"><block s="reportHype` +
        `rZip"><block s="reifyReporter"><autolambda><block s="reportListItem"` +
        `><l></l><block s="reportTextSplit"><l></l><l><option>letter</option>` +
        `</l></block></block></autolambda><list></list></block><block var="id` +
        `x"/><l>0</l><block var="text"/><l>0</l></block></block></script><scr` +
        `ipts><script x="10" y="98"><block s="doReport"><block s="reportHyper` +
        `Zip"><block s="reifyReporter"><autolambda><block s="reportListItem">` +
        `<l></l><block s="reportTextSplit"><l></l><l><option>letter</option><` +
        `/l></block></block></autolambda><list></list></block><block var="idx` +
        `"/><l>0</l><block var="text"/><l>0</l></block></block></script></scr` +
        `ipts></block-definition><block-definition s="length of %#1" type="re` +
        `porter" category="operators" selector="reportStringSize" primitive="` +
        `reportStringSize"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s">world</input></inputs></block-defi` +
        `nition><block-definition s="%#1 of text %#2" type="reporter" categor` +
        `y="operators" selector="reportTextAttribute" primitive="reportTextAt` +
        `tribute"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true" irreplaceable="true">$_leng` +
        `th<options>length=$_length&#xD;lower case=$_lower case&#xD;upper cas` +
        `e=$_upper case</options></input><input type="%s">world</input></inpu` +
        `ts></block-definition><block-definition s="unicode of %#1" type="rep` +
        `orter" category="operators" selector="reportUnicode" primitive="repo` +
        `rtUnicode"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s">a</input></inputs></block-definition><blo` +
        `ck-definition s="unicode %#1 as letter" type="reporter" category="op` +
        `erators" selector="reportUnicodeAsLetter" primitive="reportUnicodeAs` +
        `Letter"><header></header><code></code><translations></translations><` +
        `inputs><input type="%n">65</input></inputs></block-definition><block` +
        `-definition s="is %#1 a %#2 ?" type="predicate" category="operators"` +
        ` selector="reportIsA" primitive="reportIsA"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">5</input` +
        `><input type="%s" readonly="true" irreplaceable="true">$_number<opti` +
        `ons>§_typesMenu</options></input></inputs></block-definition><block-` +
        `definition s="is %#1 ?" type="predicate" category="operators" select` +
        `or="reportVariadicIsIdentical" primitive="reportVariadicIsIdentical"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%s" readonly="true" separator="identical to" colla` +
        `pse="all identical" initial="2"></input></inputs></block-definition>` +
        `<block-definition s="split %#1 by %#2" type="reporter" category="ope` +
        `rators" selector="reportTextSplit" primitive="reportTextSplit"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s">hello world</input><input type="%s"> <options>letter=$_le` +
        `tter&#xD;word=$_word&#xD;line=$_line&#xD;tab=$_tab&#xD;cr=$_cr&#xD;c` +
        `sv=$_csv&#xD;json=$_json&#xD;&#126;&#xD;blocks=$_blocks</options></i` +
        `nput></inputs></block-definition><block-definition s="JavaScript fun` +
        `ction ( %#1 ) { %#2 }" type="reporter" category="operators" selector` +
        `="reportJSFunction" primitive="reportJSFunction"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%mult%s` +
        `" readonly="true"></input><input type="%mlt"></input></inputs></bloc` +
        `k-definition><block-definition s="type of %#1" type="reporter" categ` +
        `ory="operators" selector="reportTypeOf" primitive="reportTypeOf"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s">5</input></inputs></block-definition><block-definition ` +
        `s="%#1 of %#2" type="reporter" category="operators" selector="report` +
        `TextFunction" primitive="reportTextFunction"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">$_encode URI<options>encode URI=$_enco` +
        `de URI&#xD;decode URI=$_decode URI&#xD;encode URI component=$_encode` +
        ` URI component&#xD;decode URI component=$_decode URI component&#xD;X` +
        `ML escape=$_XML escape&#xD;XML unescape=$_XML unescape&#xD;JS escape` +
        `=$_JS escape&#xD;hex sha512 hash=$_hex sha512 hash</options></input>` +
        `<input type="%s">Abelson &amp; Sussman</input></inputs></block-defin` +
        `ition><block-definition s="compile %#1 for %#2 args" type="reporter"` +
        ` category="operators" selector="reportCompiled" primitive="reportCom` +
        `piled"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%repRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%n">0</input></inputs></block-definition><block-d` +
        `efinition s="set %#1 to %#2" type="command" category="variables" sel` +
        `ector="doSetVar" primitive="doSetVar"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `" irreplaceable="true"><options>§_getVarNamesDict</options></input><` +
        `input type="%s">0</input></inputs></block-definition><block-definiti` +
        `on s="change %#1 by %#2" type="command" category="variables" selecto` +
        `r="doChangeVar" primitive="doChangeVar"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s" readonly="tr` +
        `ue" irreplaceable="true"><options>§_getVarNamesDict</options></input` +
        `><input type="%n">1</input></inputs></block-definition><block-defini` +
        `tion s="show variable %#1" type="command" category="variables" selec` +
        `tor="doShowVar" primitive="doShowVar"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `" irreplaceable="true"><options>§_getVarNamesDict</options></input><` +
        `/inputs></block-definition><block-definition s="hide variable %#1" t` +
        `ype="command" category="variables" selector="doHideVar" primitive="d` +
        `oHideVar"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true"><opti` +
        `ons>§_getVarNamesDict</options></input></inputs></block-definition><` +
        `block-definition s="script variables %&apos;#1&apos;" type="command"` +
        ` category="other" selector="doDeclareVariables"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%scriptV` +
        `ars" readonly="true" irreplaceable="true" initial="1" min="1"></inpu` +
        `t></inputs></block-definition><block-definition s="inherit %#1" type` +
        `="command" category="variables" selector="doDeleteAttr" primitive="d` +
        `oDeleteAttr"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true"><options>§_shadowedVari` +
        `ablesMenu</options></input></inputs></block-definition><block-defini` +
        `tion s="list %&apos;inputs&apos;" type="reporter" category="lists" s` +
        `elector="reportNewList"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%mult%s" readonly="true" irrepla` +
        `ceable="true" initial="1"></input><input type="%mult%s" readonly="tr` +
        `ue" irreplaceable="true" initial="1"></input><input type="%mult%s" r` +
        `eadonly="true" irreplaceable="true" initial="1"></input></inputs><sc` +
        `ript><block s="doReport"><block var="inputs"/></block></script></blo` +
        `ck-definition><block-definition s="%#1 in front of %#2" type="report` +
        `er" category="lists" selector="reportCONS" primitive="reportCONS"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s"></input><input type="%l" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="item %#1 of %#2" type="r` +
        `eporter" category="lists" selector="reportListItem" primitive="repor` +
        `tListItem"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=` +
        `$_random</options></input><input type="%l" readonly="true"></input><` +
        `/inputs></block-definition><block-definition s="all but first of %#1` +
        `" type="reporter" category="lists" selector="reportCDR" primitive="r` +
        `eportCDR"><header></header><code></code><translations></translations` +
        `><inputs><input type="%l" readonly="true"></input></inputs></block-d` +
        `efinition><block-definition s="length of %#1" type="reporter" catego` +
        `ry="lists" selector="reportListLength" primitive="reportListLength">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%l" readonly="true"></input></inputs></block-definition>` +
        `<block-definition s="%#1 of %#2" type="reporter" category="lists" se` +
        `lector="reportListAttribute" primitive="reportListAttribute"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true" irreplaceable="true">$_length<options>lengt` +
        `h=$_length&#xD;rank=$_rank&#xD;dimensions=$_dimensions&#xD;flatten=$` +
        `_flatten&#xD;columns=$_columns&#xD;uniques=$_uniques&#xD;distributio` +
        `n=$_distribution&#xD;sorted=$_sorted&#xD;shuffled=$_shuffled&#xD;rev` +
        `erse=$_reverse&#xD;&#126;&#xD;lines=$_lines&#xD;csv=$_csv&#xD;json=$` +
        `_json</options></input><input type="%l" readonly="true"></input></in` +
        `puts></block-definition><block-definition s="%&apos;data&apos; conta` +
        `ins %&apos;value&apos;" type="predicate" category="lists" selector="` +
        `reportListContainsItem" primitive="reportListContainsItem"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%l" readonly="true"></input><input type="%s">thing</input><input ` +
        `type="%l" readonly="true"></input><input type="%s">thing</input><inp` +
        `ut type="%s">thing</input></inputs><scripts><script x="10" y="91.833` +
        `33333333331"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1` +
        `</l><block s="reportListAttribute"><l><option>length</option></l><bl` +
        `ock var="data"/></block><script><block s="doIf"><block s="reportVari` +
        `adicEquals"><list><block s="reportListItem"><block var="i"/><block v` +
        `ar="data"/></block><block var="value"/></list></block><script><block` +
        ` s="doReport"><block s="reportBoolean"><l><bool>true</bool></l></blo` +
        `ck></block></script><list></list></block></script></block></script><` +
        `/block><block s="doReport"><block s="reportBoolean"><l><bool>false</` +
        `bool></l></block></block></script></scripts></block-definition><bloc` +
        `k-definition s="is %&apos;data&apos; empty?" type="predicate" catego` +
        `ry="lists" selector="reportListIsEmpty" primitive="reportListIsEmpty` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%l" readonly="true"></input><input type="%l" readonly=` +
        `"true"></input><input type="%l" readonly="true"></input></inputs><sc` +
        `ripts><script x="10" y="91.83333333333331"><block s="doReport"><bloc` +
        `k s="reportVariadicEquals"><list><block var="data"/><block s="report` +
        `NewList"><list></list></block></list></block></block></script></scri` +
        `pts></block-definition><block-definition s="index of %&apos;value&ap` +
        `os; in %&apos;data&apos;" type="reporter" category="lists" selector=` +
        `"reportListIndex" primitive="reportListIndex"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s">thing<` +
        `/input><input type="%l" readonly="true"></input><input type="%s">thi` +
        `ng</input><input type="%l" readonly="true"></input><input type="%l" ` +
        `readonly="true"></input></inputs><scripts><script x="10" y="91.83333` +
        `333333331"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</` +
        `l><block s="reportListAttribute"><l><option>length</option></l><bloc` +
        `k var="data"/></block><script><block s="doIf"><block s="reportVariad` +
        `icEquals"><list><block s="reportListItem"><block var="i"/><block var` +
        `="data"/></block><block var="value"/></list></block><script><block s` +
        `="doReport"><block var="i"/></block></script><list></list></block></` +
        `script></block></script></block><block s="doReport"><l>0</l></block>` +
        `</script></scripts></block-definition><block-definition s="add %#1 t` +
        `o %#2" type="command" category="lists" selector="doAddToList" primit` +
        `ive="doAddToList"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s">thing</input><input type="%l" read` +
        `only="true"></input></inputs></block-definition><block-definition s=` +
        `"delete %#1 of %#2" type="command" category="lists" selector="doDele` +
        `teFromList" primitive="doDeleteFromList"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n">1<options>1` +
        `=1&#xD;last=$_last&#xD;&#126;&#xD;all=$_all</options></input><input ` +
        `type="%l" readonly="true"></input></inputs></block-definition><block` +
        `-definition s="insert %#1 at %#2 of %#3" type="command" category="li` +
        `sts" selector="doInsertInList" primitive="doInsertInList"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s">thing</input><input type="%n">1<options>1=1&#xD;last=$_last&#x` +
        `D;random=$_random</options></input><input type="%l" readonly="true">` +
        `</input></inputs></block-definition><block-definition s="replace ite` +
        `m %#1 of %#2 with %#3" type="command" category="lists" selector="doR` +
        `eplaceInList" primitive="doReplaceInList"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">1<options>` +
        `1=1&#xD;last=$_last&#xD;random=$_random</options></input><input type` +
        `="%l" readonly="true"></input><input type="%s">thing</input></inputs` +
        `></block-definition><block-definition s="numbers from %&apos;start&a` +
        `pos; to %&apos;end&apos;" type="reporter" category="lists" selector=` +
        `"reportNumbers" primitive="reportNumbers"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">1</input><` +
        `input type="%n">10</input><input type="%n">1</input><input type="%n"` +
        `>10</input><input type="%n">10</input></inputs><scripts><script x="1` +
        `0" y="91.83333333333331"><block s="doReport"><block s="reportHyperZi` +
        `p"><block s="reifyReporter"><script><block s="doDeclareVariables"><l` +
        `ist><l>result</l></list></block><block s="doSetVar"><l>result</l><bl` +
        `ock s="reportNewList"><list></list></block></block><block s="doWarp"` +
        `><script><block s="doFor"><l>i</l><l></l><l></l><script><block s="do` +
        `AddToList"><block var="i"/><block var="result"/></block></script></b` +
        `lock></script></block><block s="doReport"><block var="result"/></blo` +
        `ck></script><list></list></block><block var="start"/><l>0</l><block ` +
        `var="end"/><l>0</l></block></block></script></scripts></block-defini` +
        `tion><block-definition s="append %&apos;lists&apos;" type="reporter"` +
        ` category="lists" selector="reportConcatenatedLists" primitive="repo` +
        `rtConcatenatedLists"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%mult%l" readonly="true" initial="2` +
        `"></input><input type="%mult%l" readonly="true" initial="2"></input>` +
        `<input type="%mult%l" readonly="true" initial="2"></input></inputs><` +
        `scripts><script x="10" y="91.83333333333331"><block s="doDeclareVari` +
        `ables"><list><l>result</l></list></block><block s="doSetVar"><l>resu` +
        `lt</l><block s="reportNewList"><list></list></block></block><block s` +
        `="doWarp"><script><block s="doForEach"><l>list</l><block var="lists"` +
        `/><script><block s="doForEach"><l>item</l><block var="list"/><script` +
        `><block s="doAddToList"><block var="item"/><block var="result"/></bl` +
        `ock></script></block></script></block></script></block><block s="doR` +
        `eport"><block var="result"/></block></script></scripts></block-defin` +
        `ition><block-definition s="combinations %&apos;lists&apos;" type="re` +
        `porter" category="lists" selector="reportCrossproduct" primitive="re` +
        `portCrossproduct"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%mult%l" readonly="true" initial="2"><` +
        `/input><input type="%mult%l" readonly="true" initial="2"></input><in` +
        `put type="%mult%l" readonly="true" initial="2"></input></inputs><scr` +
        `ipts><script x="10" y="91.83333333333331"><block s="doReport"><block` +
        ` s="reportIfElse"><block s="reportListIsEmpty"><block var="lists"/><` +
        `/block><block s="reportNewList"><list><block s="reportNewList"><list` +
        `></list></block></list></block><block s="reportConcatenatedLists"><b` +
        `lock s="reportMap"><block s="reifyReporter"><autolambda><block s="re` +
        `portMap"><block s="reifyReporter"><autolambda><block s="reportCONS">` +
        `<block var="first"/><l/></block></autolambda><list></list></block><b` +
        `lock s="reportCrossproduct"><block s="reportCDR"><block var="lists"/` +
        `></block></block></block></autolambda><list><l>first</l></list></blo` +
        `ck><block s="reportListItem"><l>1</l><block var="lists"/></block></b` +
        `lock></block></block></block></script></scripts></block-definition><` +
        `block-definition s="transpose %#1" type="reporter" category="lists" ` +
        `selector="reportTranspose" primitive="reportTranspose"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `l" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="reshape %#1 to %#2" type="reporter" category="lists" selecto` +
        `r="reportReshape" primitive="reportReshape"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s"></input>` +
        `<input type="%mult%n" readonly="true" initial="2">4&#xD;3</input></i` +
        `nputs></block-definition><block-definition s="map %&apos;ring&apos; ` +
        `over %&apos;data&apos;" type="reporter" category="lists" selector="r` +
        `eportMap" primitive="reportMap"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%repRing" readonly="true` +
        `" irreplaceable="true"></input><input type="%l" readonly="true"></in` +
        `put><input type="%repRing" readonly="true" irreplaceable="true"></in` +
        `put><input type="%l" readonly="true"></input><input type="%l" readon` +
        `ly="true"></input></inputs><scripts><script x="10" y="91.83333333333` +
        `331"><block s="doDeclareVariables"><list><l>result</l><l>implicit?</` +
        `l></list></block><block s="doSetVar"><l>result</l><block s="reportNe` +
        `wList"><list></list></block></block><block s="doSetVar"><l>implicit?` +
        `</l><block s="reportListIsEmpty"><block s="reportAttributeOf"><l><op` +
        `tion>input names</option></l><block var="ring"/></block></block></bl` +
        `ock><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><bloc` +
        `k s="reportListAttribute"><l><option>length</option></l><block var="` +
        `data"/></block><script><block s="doAddToList"><block s="evaluate"><b` +
        `lock var="ring"/><block s="reportIfElse"><block var="implicit?"/><bl` +
        `ock s="reportNewList"><list><block s="reportListItem"><block var="i"` +
        `/><block var="data"/></block></list></block><block s="reportNewList"` +
        `><list><block s="reportListItem"><block var="i"/><block var="data"/>` +
        `</block><block var="i"/><block var="data"/></list></block></block></` +
        `block><block var="result"/></block></script></block></script></block` +
        `><block s="doReport"><block var="result"/></block></script></scripts` +
        `></block-definition><block-definition s="$blitz map %#1 over %#2" ty` +
        `pe="reporter" category="lists" selector="reportAtomicMap" primitive=` +
        `"reportAtomicMap"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%repRing" readonly="true" irreplaceabl` +
        `e="true"></input><input type="%l" readonly="true"></input></inputs><` +
        `/block-definition><block-definition s="keep items %&apos;ring&apos; ` +
        `from %&apos;data&apos;" type="reporter" category="lists" selector="r` +
        `eportKeep" primitive="reportKeep"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%predRing" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%l" readonly="true"><` +
        `/input><input type="%predRing" readonly="true" irreplaceable="true">` +
        `</input><input type="%l" readonly="true"></input><input type="%l" re` +
        `adonly="true"></input></inputs><scripts><script x="10" y="91.8333333` +
        `3333331"><block s="doDeclareVariables"><list><l>result</l><l>implici` +
        `t?</l></list></block><block s="doSetVar"><l>result</l><block s="repo` +
        `rtNewList"><list></list></block></block><block s="doSetVar"><l>impli` +
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
        `ck><script><block s="doAddToList"><block s="reportListItem"><block v` +
        `ar="i"/><block var="data"/></block><block var="result"/></block></sc` +
        `ript><list></list></block></script></block></script></block><block s` +
        `="doReport"><block var="result"/></block></script></scripts></block-` +
        `definition><block-definition s="$blitz keep items %#1 from %#2" type` +
        `="reporter" category="lists" selector="reportAtomicKeep" primitive="` +
        `reportAtomicKeep"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%predRing" readonly="true" irreplaceab` +
        `le="true"></input><input type="%l" readonly="true"></input></inputs>` +
        `</block-definition><block-definition s="find first item %&apos;ring&` +
        `apos; in %&apos;data&apos;" type="reporter" category="lists" selecto` +
        `r="reportFindFirst" primitive="reportFindFirst"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%predRin` +
        `g" readonly="true" irreplaceable="true"></input><input type="%l" rea` +
        `donly="true"></input><input type="%predRing" readonly="true" irrepla` +
        `ceable="true"></input><input type="%l" readonly="true"></input><inpu` +
        `t type="%l" readonly="true"></input></inputs><scripts><script x="10"` +
        ` y="91.83333333333331"><block s="doDeclareVariables"><list><l>implic` +
        `it?</l></list></block><block s="doSetVar"><l>implicit?</l><block s="` +
        `reportListIsEmpty"><block s="reportAttributeOf"><l><option>input nam` +
        `es</option></l><block var="ring"/></block></block></block><block s="` +
        `doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="reportLis` +
        `tAttribute"><l><option>length</option></l><block var="data"/></block` +
        `><script><block s="doIf"><block s="evaluate"><block var="ring"/><blo` +
        `ck s="reportIfElse"><block var="implicit?"/><block s="reportNewList"` +
        `><list><block s="reportListItem"><block var="i"/><block var="data"/>` +
        `</block></list></block><block s="reportNewList"><list><block s="repo` +
        `rtListItem"><block var="i"/><block var="data"/></block><block var="i` +
        `"/><block var="data"/></list></block></block></block><script><block ` +
        `s="doReport"><block s="reportListItem"><block var="i"/><block var="d` +
        `ata"/></block></block></script><list></list></block></script></block` +
        `></script></block><block s="doReport"><l></l></block></script></scri` +
        `pts></block-definition><block-definition s="$blitz find first item %` +
        `#1 in %#2" type="reporter" category="lists" selector="reportAtomicFi` +
        `ndFirst" primitive="reportAtomicFindFirst"><header></header><code></` +
        `code><translations></translations><inputs><input type="%predRing" re` +
        `adonly="true" irreplaceable="true"></input><input type="%l" readonly` +
        `="true"></input></inputs></block-definition><block-definition s="com` +
        `bine %&apos;data&apos; using %&apos;ring&apos;" type="reporter" cate` +
        `gory="lists" selector="reportCombine" primitive="reportCombine"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%l" readonly="true"></input><input type="%repRing" readonly=` +
        `"true" irreplaceable="true"></input><input type="%l" readonly="true"` +
        `></input><input type="%repRing" readonly="true" irreplaceable="true"` +
        `></input><input type="%repRing" readonly="true" irreplaceable="true"` +
        `></input></inputs><scripts><script x="10" y="91.83333333333331"><blo` +
        `ck s="doIf"><block s="reportListIsEmpty"><block var="data"/></block>` +
        `<script><block s="doReport"><l>0</l></block></script><list><block s=` +
        `"reportVariadicEquals"><list><block s="reportListAttribute"><l><opti` +
        `on>length</option></l><block var="data"/></block><l>1</l></list></bl` +
        `ock><script><block s="doReport"><block s="reportListItem"><l>1</l><b` +
        `lock var="data"/></block></block></script></list></block><block s="d` +
        `oReport"><block s="evaluate"><block var="ring"/><list><block s="repo` +
        `rtListItem"><l>1</l><block var="data"/></block><block s="evaluate"><` +
        `block s="reportEnvironment"><l><option>script</option></l></block><l` +
        `ist><block s="reportCDR"><block var="data"/></block><block var="ring` +
        `"/></list></block></list></block></block></script></scripts></block-` +
        `definition><block-definition s="$blitz combine %#1 using %#2" type="` +
        `reporter" category="lists" selector="reportAtomicCombine" primitive=` +
        `"reportAtomicCombine"><header></header><code></code><translations></` +
        `translations><inputs><input type="%l" readonly="true"></input><input` +
        ` type="%repRing" readonly="true" irreplaceable="true"></input></inpu` +
        `ts></block-definition><block-definition s="for each %&apos;item&apos` +
        `; in %&apos;data&apos; %&apos;action&apos;" type="command" category=` +
        `"lists" selector="doForEach" primitive="doForEach"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%upva` +
        `r" readonly="true" irreplaceable="true">item</input><input type="%l"` +
        ` readonly="true"></input><input type="%loop" readonly="true" irrepla` +
        `ceable="true"></input><input type="%upvar" readonly="true" irreplace` +
        `able="true">item</input><input type="%l" readonly="true"></input><in` +
        `put type="%loop" readonly="true" irreplaceable="true"></input><input` +
        ` type="%loop" readonly="true" irreplaceable="true"></input></inputs>` +
        `<scripts><script x="10" y="97.83333333333331"><block s="doReport"><b` +
        `lock s="reportMap"><block s="reifyReporter"><script><block s="doSetV` +
        `ar"><l>item</l><l></l></block><block s="doRun"><block var="action"/>` +
        `<list></list></block><block s="doReport"><l>0</l></block></script><l` +
        `ist></list></block><block var="data"/></block></block></script></scr` +
        `ipts></block-definition><block-definition s="show table %#1" type="c` +
        `ommand" category="lists" selector="doShowTable" primitive="doShowTab` +
        `le"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%l" readonly="true"></input></inputs></block-definit` +
        `ion><block-definition s="map %#1 to %#2 %#3" type="command" category` +
        `="other" selector="doMapCodeOrHeader" primitive="doMapCodeOrHeader">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%cmdRing" readonly="true"></input><input type="%s" reado` +
        `nly="true">$_code<options>code=$_code&#xD;header=$_header</options><` +
        `/input><input type="%mlt"></input></inputs></block-definition><block` +
        `-definition s="map %#1 to code %#2" type="command" category="other" ` +
        `selector="doMapValueCode" primitive="doMapValueCode"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true" irreplaceable="true">$_String<options>String=$_Stri` +
        `ng&#xD;Number=$_Number&#xD;true=$_true&#xD;false=$_false</options></` +
        `input><input type="%mlt">&lt;#1&gt;</input></inputs></block-definiti` +
        `on><block-definition s="map %#1 of %#2 to code %#3" type="command" c` +
        `ategory="other" selector="doMapListCode" primitive="doMapListCode"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true"><options>list=$_list&#xD;item=$_item&` +
        `#xD;delimiter=$_delimiter</options></input><input type="%s" readonly` +
        `="true"><options>collection=$_collection&#xD;variables=$_variables&#` +
        `xD;parameters=$_parameters</options></input><input type="%mlt"></inp` +
        `ut></inputs></block-definition><block-definition s="code of %#1" typ` +
        `e="reporter" category="other" selector="reportMappedCode" primitive=` +
        `"reportMappedCode"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%cmdRing" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="primitive %#1" type="c` +
        `ommand" category="other" selector="doPrimitive" primitive="doPrimiti` +
        `ve"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true"><options>§_` +
        `primitivesMenu</options></input></inputs></block-definition><block-d` +
        `efinition s="extension %#1 %#2" type="command" category="other" sele` +
        `ctor="doApplyExtension" primitive="doApplyExtension"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true" irreplaceable="true"><options>§_extensionsMenu</opt` +
        `ions></input><input type="%mult%s" readonly="true"></input></inputs>` +
        `</block-definition><block-definition s="extension %#1 %#2" type="rep` +
        `orter" category="other" selector="reportApplyExtension" primitive="r` +
        `eportApplyExtension"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true"><options>§_extensionsMenu</options></input><input type="%mult%` +
        `s" readonly="true"></input></inputs></block-definition><block-defini` +
        `tion s="set video transparency to %#1" type="command" category="sens` +
        `ing" selector="doSetVideoTransparency" primitive="doSetVideoTranspar` +
        `ency"><header></header><code></code><translations></translations><in` +
        `puts><input type="%n">50</input></inputs></block-definition><block-d` +
        `efinition s="video %#1 on %#2" type="reporter" category="sensing" se` +
        `lector="reportVideo" primitive="reportVideo"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">$_motion<options>snap=$_snap&#xD;motio` +
        `n=$_motion&#xD;direction=$_direction</options></input><input type="%` +
        `s" readonly="true">$_myself<options>§_objectsMenuWithSelf</options><` +
        `/input></inputs></block-definition></primitives></blocks>`,
        this.stage
    );
};
