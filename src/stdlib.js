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
        `perZip" primitive="reportHyperZip"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%repRing" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%s"></input><input ty` +
        `pe="%n"></input><input type="%s"></input><input type="%n"></input><i` +
        `nput type="%repRing" readonly="true" irreplaceable="true"></input><i` +
        `nput type="%s"></input><input type="%n"></input><input type="%s"></i` +
        `nput><input type="%n"></input></inputs><script><block s="doIfElse"><` +
        `block s="reportVariadicGreaterThan"><list><block s="reportListAttrib` +
        `ute"><l><option>rank</option></l><block var="a"/></block><block var=` +
        `"a-rank"/></list></block><script><block s="doIfElse"><block s="repor` +
        `tVariadicGreaterThan"><list><block s="reportListAttribute"><l><optio` +
        `n>rank</option></l><block var="b"/></block><block var="b-rank"/></li` +
        `st></block><script><block s="doReport"><block s="reportMap"><block s` +
        `="reifyReporter"><autolambda><block s="reportHyperZip"><block var="f` +
        `un"/><block s="reportListItem"><l></l><block var="a"/></block><block` +
        ` var="a-rank"/><block s="reportListItem"><l></l><block var="b"/></bl` +
        `ock><block var="b-rank"/></block></autolambda><list></list></block><` +
        `block s="reportNumbers"><l>1</l><block s="reportVariadicMin"><list><` +
        `block s="reportListAttribute"><l><option>length</option></l><block v` +
        `ar="a"/></block><block s="reportListAttribute"><l><option>length</op` +
        `tion></l><block var="b"/></block></list></block></block></block></bl` +
        `ock></script><script><block s="doReport"><block s="reportMap"><block` +
        ` s="reifyReporter"><autolambda><block s="reportHyperZip"><block var=` +
        `"fun"/><l></l><block var="a-rank"/><block var="b"/><block var="b-ran` +
        `k"/></block></autolambda><list></list></block><block var="a"/></bloc` +
        `k></block></script></block></script><script><block s="doIfElse"><blo` +
        `ck s="reportVariadicGreaterThan"><list><block s="reportListAttribute` +
        `"><l><option>rank</option></l><block var="b"/></block><block var="b-` +
        `rank"/></list></block><script><block s="doReport"><block s="reportMa` +
        `p"><block s="reifyReporter"><autolambda><block s="reportHyperZip"><b` +
        `lock var="fun"/><block var="a"/><block var="a-rank"/><l></l><block v` +
        `ar="b-rank"/></block></autolambda><list></list></block><block var="b` +
        `"/></block></block></script><script><block s="doReport"><block s="ev` +
        `aluate"><block var="fun"/><list><block var="a"/><block var="b"/></li` +
        `st></block></block></script></block></script></block></script><scrip` +
        `ts><script x="10" y="98"><block s="doIfElse"><block s="reportVariadi` +
        `cGreaterThan"><list><block s="reportListAttribute"><l><option>rank</` +
        `option></l><block var="a"/></block><block var="a-rank"/></list></blo` +
        `ck><script><block s="doIfElse"><block s="reportVariadicGreaterThan">` +
        `<list><block s="reportListAttribute"><l><option>rank</option></l><bl` +
        `ock var="b"/></block><block var="b-rank"/></list></block><script><bl` +
        `ock s="doReport"><block s="reportMap"><block s="reifyReporter"><auto` +
        `lambda><block s="reportHyperZip"><block var="fun"/><block s="reportL` +
        `istItem"><l></l><block var="a"/></block><block var="a-rank"/><block ` +
        `s="reportListItem"><l></l><block var="b"/></block><block var="b-rank` +
        `"/></block></autolambda><list></list></block><block s="reportNumbers` +
        `"><l>1</l><block s="reportVariadicMin"><list><block s="reportListAtt` +
        `ribute"><l><option>length</option></l><block var="a"/></block><block` +
        ` s="reportListAttribute"><l><option>length</option></l><block var="b` +
        `"/></block></list></block></block></block></block></script><script><` +
        `block s="doReport"><block s="reportMap"><block s="reifyReporter"><au` +
        `tolambda><block s="reportHyperZip"><block var="fun"/><l></l><block v` +
        `ar="a-rank"/><block var="b"/><block var="b-rank"/></block></autolamb` +
        `da><list></list></block><block var="a"/></block></block></script></b` +
        `lock></script><script><block s="doIfElse"><block s="reportVariadicGr` +
        `eaterThan"><list><block s="reportListAttribute"><l><option>rank</opt` +
        `ion></l><block var="b"/></block><block var="b-rank"/></list></block>` +
        `<script><block s="doReport"><block s="reportMap"><block s="reifyRepo` +
        `rter"><autolambda><block s="reportHyperZip"><block var="fun"/><block` +
        ` var="a"/><block var="a-rank"/><l></l><block var="b-rank"/></block><` +
        `/autolambda><list></list></block><block var="b"/></block></block></s` +
        `cript><script><block s="doReport"><block s="evaluate"><block var="fu` +
        `n"/><list><block var="a"/><block var="b"/></list></block></block></s` +
        `cript></block></script></block></script></scripts></block-definition` +
        `><block-definition s="move %&apos;steps&apos; steps" type="command" ` +
        `category="motion" selector="forward" primitive="forward"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n">10</input><input type="%n">10</input></inputs><script><block s=` +
        `"doGotoObject"><block s="reportVariadicSum"><list><block s="getPosit` +
        `ion"></block><block s="reportVariadicProduct"><list><block s="report` +
        `NewList"><list><block s="reportMonadic"><l><option>sin</option></l><` +
        `block s="direction"></block></block><block s="reportMonadic"><l><opt` +
        `ion>cos</option></l><block s="direction"></block></block></list></bl` +
        `ock><block var="steps"/></list></block></list></block></block></scri` +
        `pt><scripts><script x="10" y="98"><block s="doGotoObject"><block s="` +
        `reportVariadicSum"><list><block s="getPosition"></block><block s="re` +
        `portVariadicProduct"><list><block s="reportNewList"><list><block s="` +
        `reportMonadic"><l><option>sin</option></l><block s="direction"></blo` +
        `ck></block><block s="reportMonadic"><l><option>cos</option></l><bloc` +
        `k s="direction"></block></block></list></block><block var="steps"/><` +
        `/list></block></list></block></block></script></scripts></block-defi` +
        `nition><block-definition s="turn $clockwise %&apos;angle&apos; degre` +
        `es" type="command" category="motion" selector="turn" primitive="turn` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%n">15</input><input type="%n">15</input></inputs><scr` +
        `ipt><block s="setHeading"><block s="reportVariadicSum"><list><block ` +
        `s="direction"></block><block var="angle"/></list></block></block></s` +
        `cript><scripts><script x="10" y="98"><block s="setHeading"><block s=` +
        `"reportVariadicSum"><list><block s="direction"></block><block var="a` +
        `ngle"/></list></block></block></script></scripts></block-definition>` +
        `<block-definition s="turn $counterclockwise %&apos;angle&apos; degre` +
        `es" type="command" category="motion" selector="turnLeft" primitive="` +
        `turnLeft"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">15</input><input type="%n">15</input></inp` +
        `uts><script><block s="setHeading"><block s="reportDifference"><block` +
        ` s="direction"></block><block var="angle"/></block></block></script>` +
        `<scripts><script x="10" y="98"><block s="setHeading"><block s="repor` +
        `tDifference"><block s="direction"></block><block var="angle"/></bloc` +
        `k></block></script></scripts></block-definition><block-definition s=` +
        `"point in direction %&apos;angle&apos;" type="command" category="mot` +
        `ion" selector="setHeading" primitive="setHeading"><header></header><` +
        `code></code><translations></translations><inputs><input type="%n">90` +
        `<options>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#x` +
        `D;(180) down=180&#xD;random</options></input><input type="%n">90<opt` +
        `ions>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(1` +
        `80) down=180&#xD;random</options></input></inputs><script><block s="` +
        `doFaceTowards"><block s="reportVariadicSum"><list><block s="getPosit` +
        `ion"></block><block s="reportNewList"><list><block s="reportMonadic"` +
        `><l><option>sin</option></l><block var="angle"/></block><block s="re` +
        `portMonadic"><l><option>cos</option></l><block var="angle"/></block>` +
        `</list></block></list></block></block></script><scripts><script x="1` +
        `0" y="98"><block s="doFaceTowards"><block s="reportVariadicSum"><lis` +
        `t><block s="getPosition"></block><block s="reportNewList"><list><blo` +
        `ck s="reportMonadic"><l><option>sin</option></l><block var="angle"/>` +
        `</block><block s="reportMonadic"><l><option>cos</option></l><block v` +
        `ar="angle"/></block></list></block></list></block></block></script><` +
        `/scripts></block-definition><block-definition s="point towards %#1" ` +
        `type="command" category="motion" selector="doFaceTowards" primitive=` +
        `"doFaceTowards"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s" readonly="true">mouse-pointer<option` +
        `s>§_destinationsMenu</options></input></inputs></block-definition><b` +
        `lock-definition s="go to x: %&apos;x&apos; y: %&apos;y&apos;" type="` +
        `command" category="motion" selector="gotoXY" primitive="gotoXY"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">0</input><input type="%n">0</input><input type="%n">0</i` +
        `nput><input type="%n">0</input></inputs><script><block s="doGotoObje` +
        `ct"><block s="reportNewList"><list><block var="x"/><block var="y"/><` +
        `/list></block></block></script><scripts><script x="10" y="98"><block` +
        ` s="doGotoObject"><block s="reportNewList"><list><block var="x"/><bl` +
        `ock var="y"/></list></block></block></script></scripts></block-defin` +
        `ition><block-definition s="go to %#1" type="command" category="motio` +
        `n" selector="doGotoObject" primitive="doGotoObject"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true">random position<options>§_destinationsMenu</options>` +
        `</input></inputs></block-definition><block-definition s="glide %&apo` +
        `s;span&apos; secs to x: %&apos;x&apos; y: %&apos;y&apos;" type="comm` +
        `and" category="motion" selector="doGlide" primitive="doGlide"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%n">1</input><input type="%n">0</input><input type="%n">0</inp` +
        `ut><input type="%n">1</input><input type="%n">0</input><input type="` +
        `%n">0</input></inputs><script><block s="doDeclareVariables"><list><l` +
        `>pos</l><l>start</l><l>fract</l></list></block><block s="doSetVar"><` +
        `l>pos</l><block s="getPosition"></block></block><block s="doSetVar">` +
        `<l>start</l><block s="reportDate"><l><option>time in milliseconds</o` +
        `ption></l></block></block><block s="doUntil"><block s="reportVariadi` +
        `cGreaterThanOrEquals"><list><block var="fract"/><l>1</l></list></blo` +
        `ck><script><block s="doSetVar"><l>fract</l><block s="reportQuotient"` +
        `><block s="reportDifference"><block s="reportDate"><l><option>time i` +
        `n milliseconds</option></l></block><block var="start"/></block><bloc` +
        `k s="reportVariadicProduct"><list><block var="span"/><l>1000</l></li` +
        `st></block></block></block><block s="doGotoObject"><block s="reportV` +
        `ariadicSum"><list><block var="pos"/><block s="reportVariadicProduct"` +
        `><list><block s="reportDifference"><block s="reportNewList"><list><b` +
        `lock var="x"/><block var="y"/></list></block><block var="pos"/></blo` +
        `ck><block var="fract"/></list></block></list></block></block></scrip` +
        `t></block><block s="gotoXY"><block var="x"/><block var="y"/></block>` +
        `</script><scripts><script x="10" y="98"><block s="doDeclareVariables` +
        `"><list><l>pos</l><l>start</l><l>fract</l></list></block><block s="d` +
        `oSetVar"><l>pos</l><block s="getPosition"></block></block><block s="` +
        `doSetVar"><l>start</l><block s="reportDate"><l><option>time in milli` +
        `seconds</option></l></block></block><block s="doUntil"><block s="rep` +
        `ortVariadicGreaterThanOrEquals"><list><block var="fract"/><l>1</l></` +
        `list></block><script><block s="doSetVar"><l>fract</l><block s="repor` +
        `tQuotient"><block s="reportDifference"><block s="reportDate"><l><opt` +
        `ion>time in milliseconds</option></l></block><block var="start"/></b` +
        `lock><block s="reportVariadicProduct"><list><block var="span"/><l>10` +
        `00</l></list></block></block></block><block s="doGotoObject"><block ` +
        `s="reportVariadicSum"><list><block var="pos"/><block s="reportVariad` +
        `icProduct"><list><block s="reportDifference"><block s="reportNewList` +
        `"><list><block var="x"/><block var="y"/></list></block><block var="p` +
        `os"/></block><block var="fract"/></list></block></list></block></blo` +
        `ck></script></block><block s="gotoXY"><block var="x"/><block var="y"` +
        `/></block></script></scripts></block-definition><block-definition s=` +
        `"change x by %&apos;delta&apos;" type="command" category="motion" se` +
        `lector="changeXPosition" primitive="changeXPosition"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>10</input><input type="%n">10</input></inputs><script><block s="set` +
        `XPosition"><block s="reportVariadicSum"><list><block s="xPosition"><` +
        `/block><block var="delta"/></list></block></block></script><scripts>` +
        `<script x="10" y="98"><block s="setXPosition"><block s="reportVariad` +
        `icSum"><list><block s="xPosition"></block><block var="delta"/></list` +
        `></block></block></script></scripts></block-definition><block-defini` +
        `tion s="set x to %&apos;x&apos;" type="command" category="motion" se` +
        `lector="setXPosition" primitive="setXPosition"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%n">0</in` +
        `put><input type="%n">0</input></inputs><script><block s="doGotoObjec` +
        `t"><block s="reportNewList"><list><block var="x"/><block s="yPositio` +
        `n"></block></list></block></block></script><scripts><script x="10" y` +
        `="98"><block s="doGotoObject"><block s="reportNewList"><list><block ` +
        `var="x"/><block s="yPosition"></block></list></block></block></scrip` +
        `t></scripts></block-definition><block-definition s="change y by %&ap` +
        `os;delta&apos;" type="command" category="motion" selector="changeYPo` +
        `sition" primitive="changeYPosition"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%n">10</input><input` +
        ` type="%n">10</input></inputs><script><block s="setYPosition"><block` +
        ` s="reportVariadicSum"><list><block s="yPosition"></block><block var` +
        `="delta"/></list></block></block></script><scripts><script x="10" y=` +
        `"98"><block s="setYPosition"><block s="reportVariadicSum"><list><blo` +
        `ck s="yPosition"></block><block var="delta"/></list></block></block>` +
        `</script></scripts></block-definition><block-definition s="set y to ` +
        `%&apos;y&apos;" type="command" category="motion" selector="setYPosit` +
        `ion" primitive="setYPosition"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">0</input><input type="` +
        `%n">0</input></inputs><script><block s="doGotoObject"><block s="repo` +
        `rtNewList"><list><block s="xPosition"></block><block var="y"/></list` +
        `></block></block></script><scripts><script x="10" y="98"><block s="d` +
        `oGotoObject"><block s="reportNewList"><list><block s="xPosition"></b` +
        `lock><block var="y"/></list></block></block></script></scripts></blo` +
        `ck-definition><block-definition s="if on edge, bounce" type="command` +
        `" category="motion" selector="bounceOffEdge" primitive="bounceOffEdg` +
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
        `lock></script><scripts><script x="10" y="98"><block s="doIf"><block ` +
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
        `></script><list></list></block></script></scripts></block-definition` +
        `><block-definition s="position" type="reporter" category="motion" se` +
        `lector="getPosition" primitive="getPosition"><header></header><code>` +
        `</code><translations></translations><inputs></inputs><script><block ` +
        `s="doReport"><block s="reportNewList"><list><block s="xPosition"></b` +
        `lock><block s="yPosition"></block></list></block></block></script><s` +
        `cripts><script x="10" y="98"><block s="doReport"><block s="reportNew` +
        `List"><list><block s="xPosition"></block><block s="yPosition"></bloc` +
        `k></list></block></block></script></scripts></block-definition><bloc` +
        `k-definition s="x position" type="reporter" category="motion" select` +
        `or="xPosition" primitive="xPosition"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="y position" type="reporter" category="motion" selec` +
        `tor="yPosition" primitive="yPosition"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="direction" type="reporter" category="motion" selec` +
        `tor="direction" primitive="direction"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="switch to costume %#1" type="command" category="lo` +
        `oks" selector="doSwitchToCostume" primitive="doSwitchToCostume"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true"><options>§_costumesMenu</options></input` +
        `></inputs></block-definition><block-definition s="next costume" type` +
        `="command" category="looks" selector="doWearNextCostume" primitive="` +
        `doWearNextCostume"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs><script><block s="doIf"><block s="reportV` +
        `ariadicGreaterThan"><list><block s="getCostumeIdx"></block><l>0</l><` +
        `/list></block><script><block s="doSwitchToCostume"><block s="reportV` +
        `ariadicSum"><list><block s="reportModulus"><block s="getCostumeIdx">` +
        `</block><block s="reportListAttribute"><l><option>length</option></l` +
        `><block s="reportGet"><l><option>costumes</option></l></block></bloc` +
        `k></block><l>1</l></list></block></block></script><list></list></blo` +
        `ck></script><scripts><script x="10" y="98"><block s="doIf"><block s=` +
        `"reportVariadicGreaterThan"><list><block s="getCostumeIdx"></block><` +
        `l>0</l></list></block><script><block s="doSwitchToCostume"><block s=` +
        `"reportVariadicSum"><list><block s="reportModulus"><block s="getCost` +
        `umeIdx"></block><block s="reportListAttribute"><l><option>length</op` +
        `tion></l><block s="reportGet"><l><option>costumes</option></l></bloc` +
        `k></block></block><l>1</l></list></block></block></script><list></li` +
        `st></block></script></scripts></block-definition><block-definition s` +
        `="costume #" type="reporter" category="looks" selector="getCostumeId` +
        `x" primitive="getCostumeIdx"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs><script><block s="doReport"><bl` +
        `ock s="reportListIndex"><block s="reportGet"><l><option>costume</opt` +
        `ion></l></block><block s="reportGet"><l><option>costumes</option></l` +
        `></block></block></block></script><scripts><script x="10" y="98"><bl` +
        `ock s="doReport"><block s="reportListIndex"><block s="reportGet"><l>` +
        `<option>costume</option></l></block><block s="reportGet"><l><option>` +
        `costumes</option></l></block></block></block></script></scripts></bl` +
        `ock-definition><block-definition s="%#1 of costume %#2" type="report` +
        `er" category="looks" selector="reportGetImageAttribute" primitive="r` +
        `eportGetImageAttribute"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%s" readonly="true" irreplaceabl` +
        `e="true">width<options>name&#xD;width&#xD;height&#xD;pixels</options` +
        `></input><input type="%s" readonly="true">current<options>§_costumes` +
        `Menu</options></input></inputs></block-definition><block-definition ` +
        `s="new costume %#1 width %#2 height %#3" type="reporter" category="l` +
        `ooks" selector="reportNewCostume" primitive="reportNewCostume"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%l" readonly="true"></input><input type="%n"><options>current` +
        `</options></input><input type="%n"><options>current</options></input` +
        `></inputs></block-definition><block-definition s="stretch %#1 x: %#2` +
        ` y: %#3 %" type="reporter" category="looks" selector="reportNewCostu` +
        `meStretched" primitive="reportNewCostumeStretched"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true">current<options>§_costumesMenu</options></input><inpu` +
        `t type="%n">100</input><input type="%n">50</input></inputs></block-d` +
        `efinition><block-definition s="skew %#1 to %#2 degrees %#3 %" type="` +
        `reporter" category="looks" selector="reportNewCostumeSkewed" primiti` +
        `ve="reportNewCostumeSkewed"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true">current<` +
        `options>§_costumesMenu</options></input><input type="%n">0<options>§` +
        `_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) do` +
        `wn=180&#xD;random</options></input><input type="%n">50</input></inpu` +
        `ts></block-definition><block-definition s="say %&apos;msg&apos; for ` +
        `%&apos;time&apos; secs" type="command" category="looks" selector="do` +
        `SayFor" primitive="doSayFor"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s">Hello!</input><input ty` +
        `pe="%n">2</input><input type="%s">Hello!</input><input type="%n">2</` +
        `input></inputs><script><block s="bubble"><block var="msg"/></block><` +
        `block s="doWait"><block var="time"/></block><block s="bubble"><l></l` +
        `></block></script><scripts><script x="10" y="98"><block s="bubble"><` +
        `block var="msg"/></block><block s="doWait"><block var="time"/></bloc` +
        `k><block s="bubble"><l></l></block></script></scripts></block-defini` +
        `tion><block-definition s="say %#1" type="command" category="looks" s` +
        `elector="bubble" primitive="bubble"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s">Hello!</input></` +
        `inputs></block-definition><block-definition s="think %&apos;msg&apos` +
        `; for %&apos;time&apos; secs" type="command" category="looks" select` +
        `or="doThinkFor" primitive="doThinkFor"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s">Hmm...</input` +
        `><input type="%n">2</input><input type="%s">Hmm...</input><input typ` +
        `e="%n">2</input></inputs><script><block s="doThink"><block var="msg"` +
        `/></block><block s="doWait"><block var="time"/></block><block s="doT` +
        `hink"><l></l></block></script><scripts><script x="10" y="98"><block ` +
        `s="doThink"><block var="msg"/></block><block s="doWait"><block var="` +
        `time"/></block><block s="doThink"><l></l></block></script></scripts>` +
        `</block-definition><block-definition s="think %#1" type="command" ca` +
        `tegory="looks" selector="doThink" primitive="doThink"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `">Hmm...</input></inputs></block-definition><block-definition s="cha` +
        `nge %&apos;effect name&apos; effect by %&apos;delta&apos;" type="com` +
        `mand" category="looks" selector="changeEffect" primitive="changeEffe` +
        `ct"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true" irreplaceable="true">ghost<optio` +
        `ns>color&#xD;saturation&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whi` +
        `rl&#xD;pixelate&#xD;mosaic&#xD;negative</options></input><input type` +
        `="%n">25</input><input type="%s" readonly="true" irreplaceable="true` +
        `">ghost<options>color&#xD;saturation&#xD;brightness&#xD;ghost&#xD;fi` +
        `sheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</options></inpu` +
        `t><input type="%n">25</input></inputs><script><block s="doRun"><bloc` +
        `k s="reifyScript"><script><block s="setEffect"><l></l><block s="repo` +
        `rtVariadicSum"><list><block s="getEffect"><l></l></block><block var=` +
        `"delta"/></list></block></block></script><list></list></block><list>` +
        `<block var="effect name"/></list></block></script><scripts><script x` +
        `="10" y="98"><block s="doRun"><block s="reifyScript"><script><block ` +
        `s="setEffect"><l></l><block s="reportVariadicSum"><list><block s="ge` +
        `tEffect"><l></l></block><block var="delta"/></list></block></block><` +
        `/script><list></list></block><list><block var="effect name"/></list>` +
        `</block></script></scripts></block-definition><block-definition s="s` +
        `et %#1 effect to %#2" type="command" category="looks" selector="setE` +
        `ffect" primitive="setEffect"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">ghost<options>color&#xD;saturation&#xD;brightness&#xD;` +
        `ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negative</op` +
        `tions></input><input type="%n">0</input></inputs></block-definition>` +
        `<block-definition s="%#1 effect" type="reporter" category="looks" se` +
        `lector="getEffect" primitive="getEffect"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">ghost<options>color&#xD;saturation&#xD;bri` +
        `ghtness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;` +
        `negative</options></input></inputs></block-definition><block-definit` +
        `ion s="clear graphic effects" type="command" category="looks" select` +
        `or="clearEffects" primitive="clearEffects"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="change size by %&apos;delta&apos;" type="comm` +
        `and" category="looks" selector="changeScale" primitive="changeScale"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%n">10</input><input type="%n">10</input></inputs><scri` +
        `pt><block s="setScale"><block s="reportVariadicSum"><list><block s="` +
        `getScale"></block><block var="delta"/></list></block></block></scrip` +
        `t><scripts><script x="10" y="98"><block s="setScale"><block s="repor` +
        `tVariadicSum"><list><block s="getScale"></block><block var="delta"/>` +
        `</list></block></block></script></scripts></block-definition><block-` +
        `definition s="set size to %#1 %" type="command" category="looks" sel` +
        `ector="setScale" primitive="setScale"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%n">100</input></i` +
        `nputs></block-definition><block-definition s="size" type="reporter" ` +
        `category="looks" selector="getScale" primitive="getScale"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="show" type="command" category=` +
        `"looks" selector="show" primitive="show"><header></header><code></co` +
        `de><translations></translations><inputs></inputs></block-definition>` +
        `<block-definition s="hide" type="command" category="looks" selector=` +
        `"hide" primitive="hide"><header></header><code></code><translations>` +
        `</translations><inputs></inputs></block-definition><block-definition` +
        ` s="shown?" type="predicate" category="looks" selector="reportShown"` +
        ` primitive="reportShown"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="go to %#1 layer" type="command" category="looks" selector="goTo` +
        `Layer" primitive="goToLayer"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">front<options>front&#xD;back</options></input></inputs` +
        `></block-definition><block-definition s="go back %#1 layers" type="c` +
        `ommand" category="looks" selector="goBack" primitive="goBack"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%n">1</input></inputs></block-definition><block-definition s="` +
        `save %#1 as costume named %#2" type="command" category="looks" selec` +
        `tor="doScreenshot" primitive="doScreenshot"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true">pen trails<options>pen trails&#xD;stage image</options></inp` +
        `ut><input type="%s">screenshot</input></inputs></block-definition><b` +
        `lock-definition s="wardrobe" type="reporter" category="looks" select` +
        `or="reportCostumes" primitive="reportCostumes"><header></header><cod` +
        `e></code><translations></translations><inputs></inputs></block-defin` +
        `ition><block-definition s="alert %#1" type="command" category="looks` +
        `" selector="alert" primitive="alert"><header></header><code></code><` +
        `translations></translations><inputs><input type="%mult%s" readonly="` +
        `true"></input></inputs></block-definition><block-definition s="conso` +
        `le log %#1" type="command" category="looks" selector="log" primitive` +
        `="log"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true"></input></inputs></block` +
        `-definition><block-definition s="play sound %#1" type="command" cate` +
        `gory="sound" selector="playSound" primitive="playSound"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true"><options>§_soundsMenu</options></input></inputs>` +
        `</block-definition><block-definition s="play sound %&apos;target&apo` +
        `s; until done" type="command" category="sound" selector="doPlaySound` +
        `UntilDone" primitive="doPlaySoundUntilDone"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true"><options>§_soundsMenu</options></input><input type="%s" read` +
        `only="true"><options>§_soundsMenu</options></input></inputs><script>` +
        `<block s="doDeclareVariables"><list><l>sound</l></list></block><bloc` +
        `k s="doSetVar"><l>sound</l><block s="reportIfElse"><block s="reportI` +
        `sA"><block var="target"/><l><option>sound</option></l></block><block` +
        ` var="target"/><block s="reportIfElse"><block s="reportIsA"><block v` +
        `ar="target"/><l><option>list</option></l></block><block s="reportNew` +
        `SoundFromSamples"><block var="target"/><l>44100</l></block><block s=` +
        `"reportFindFirst"><block s="reifyPredicate"><autolambda><block s="re` +
        `portVariadicEquals"><list><block s="reportGetSoundAttribute"><l><opt` +
        `ion>name</option></l><l></l></block><block var="target"/></list></bl` +
        `ock></autolambda><list></list></block><block s="reportGet"><l><optio` +
        `n>sounds</option></l></block></block></block></block></block><block ` +
        `s="doIf"><block s="reportIsA"><block var="sound"/><l><option>sound</` +
        `option></l></block><script><block s="playSound"><block var="sound"/>` +
        `</block><block s="doWait"><block s="reportGetSoundAttribute"><l><opt` +
        `ion>duration</option></l><block var="sound"/></block></block></scrip` +
        `t><list></list></block></script><scripts><script x="10" y="98"><bloc` +
        `k s="doDeclareVariables"><list><l>sound</l></list></block><block s="` +
        `doSetVar"><l>sound</l><block s="reportIfElse"><block s="reportIsA"><` +
        `block var="target"/><l><option>sound</option></l></block><block var=` +
        `"target"/><block s="reportIfElse"><block s="reportIsA"><block var="t` +
        `arget"/><l><option>list</option></l></block><block s="reportNewSound` +
        `FromSamples"><block var="target"/><l>44100</l></block><block s="repo` +
        `rtFindFirst"><block s="reifyPredicate"><autolambda><block s="reportV` +
        `ariadicEquals"><list><block s="reportGetSoundAttribute"><l><option>n` +
        `ame</option></l><l></l></block><block var="target"/></list></block><` +
        `/autolambda><list></list></block><block s="reportGet"><l><option>sou` +
        `nds</option></l></block></block></block></block></block><block s="do` +
        `If"><block s="reportIsA"><block var="sound"/><l><option>sound</optio` +
        `n></l></block><script><block s="playSound"><block var="sound"/></blo` +
        `ck><block s="doWait"><block s="reportGetSoundAttribute"><l><option>d` +
        `uration</option></l><block var="sound"/></block></block></script><li` +
        `st></list></block></script></scripts></block-definition><block-defin` +
        `ition s="play sound %&apos;target&apos; at %&apos;rate&apos; Hz" typ` +
        `e="command" category="sound" selector="doPlaySoundAtRate" primitive=` +
        `"doPlaySoundAtRate"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true"><options>§_sound` +
        `sMenu</options></input><input type="%n">44100<options>22.05 kHz=2205` +
        `0&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=` +
        `96000</options></input><input type="%s" readonly="true"><options>§_s` +
        `oundsMenu</options></input><input type="%n">44100<options>22.05 kHz=` +
        `22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 ` +
        `kHz=96000</options></input></inputs><script><block s="playSound"><bl` +
        `ock s="reportNewSoundFromSamples"><block s="reportGetSoundAttribute"` +
        `><l><option>samples</option></l><block var="target"/></block><block ` +
        `var="rate"/></block></block></script><scripts><script x="10" y="98">` +
        `<block s="playSound"><block s="reportNewSoundFromSamples"><block s="` +
        `reportGetSoundAttribute"><l><option>samples</option></l><block var="` +
        `target"/></block><block var="rate"/></block></block></script></scrip` +
        `ts></block-definition><block-definition s="stop all sounds" type="co` +
        `mmand" category="sound" selector="doStopAllSounds" primitive="doStop` +
        `AllSounds"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="%#1 of so` +
        `und %#2" type="reporter" category="sound" selector="reportGetSoundAt` +
        `tribute" primitive="reportGetSoundAttribute"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">duration<options>name&#xD;duration&#xD` +
        `;length&#xD;number of channels&#xD;sample rate&#xD;samples</options>` +
        `</input><input type="%s" readonly="true"><options>§_soundsMenu</opti` +
        `ons></input></inputs></block-definition><block-definition s="new sou` +
        `nd %#1 rate %#2 Hz" type="reporter" category="sound" selector="repor` +
        `tNewSoundFromSamples" primitive="reportNewSoundFromSamples"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%l" readonly="true"></input><input type="%n">44100<options>22.05` +
        ` kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#x` +
        `D;96 kHz=96000</options></input></inputs></block-definition><block-d` +
        `efinition s="rest for %&apos;beats&apos; beats" type="command" categ` +
        `ory="sound" selector="doRest" primitive="doRest"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n">0.2` +
        `</input><input type="%n">0.2</input></inputs><script><block s="doWai` +
        `t"><block s="reportQuotient"><l>60</l><block s="reportVariadicProduc` +
        `t"><list><block var="beats"/><block s="getTempo"></block></list></bl` +
        `ock></block></block></script><scripts><script x="10" y="98"><block s` +
        `="doWait"><block s="reportQuotient"><l>60</l><block s="reportVariadi` +
        `cProduct"><list><block var="beats"/><block s="getTempo"></block></li` +
        `st></block></block></block></script></scripts></block-definition><bl` +
        `ock-definition s="play note %#1 for %#2 beats" type="command" catego` +
        `ry="sound" selector="doPlayNote" primitive="doPlayNote"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%n">60<options>§_pianoKeyboardMenu</options></input><input type="%n"` +
        `>0.5</input></inputs></block-definition><block-definition s="play %#` +
        `1 Hz for %#2 secs" type="command" category="sound" selector="doPlayF` +
        `requency" primitive="doPlayFrequency"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%n">440</input><in` +
        `put type="%n">2</input></inputs></block-definition><block-definition` +
        ` s="set instrument to %#1" type="command" category="sound" selector=` +
        `"doSetInstrument" primitive="doSetInstrument"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">1<opti` +
        `ons>(1) sine=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) triangle=` +
        `4</options></input></inputs></block-definition><block-definition s="` +
        `change tempo by %&apos;delta&apos;" type="command" category="sound" ` +
        `selector="doChangeTempo" primitive="doChangeTempo"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%n">2` +
        `0</input><input type="%n">20</input></inputs><script><block s="doSet` +
        `Tempo"><block s="reportVariadicSum"><list><block s="getTempo"></bloc` +
        `k><block var="delta"/></list></block></block></script><scripts><scri` +
        `pt x="10" y="98"><block s="doSetTempo"><block s="reportVariadicSum">` +
        `<list><block s="getTempo"></block><block var="delta"/></list></block` +
        `></block></script></scripts></block-definition><block-definition s="` +
        `set tempo to %#1 bpm" type="command" category="sound" selector="doSe` +
        `tTempo" primitive="doSetTempo"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%n">60</input></inputs></` +
        `block-definition><block-definition s="tempo" type="reporter" categor` +
        `y="sound" selector="getTempo" primitive="getTempo"><header></header>` +
        `<code></code><translations></translations><inputs></inputs></block-d` +
        `efinition><block-definition s="change volume by %&apos;delta&apos;" ` +
        `type="command" category="sound" selector="changeVolume" primitive="c` +
        `hangeVolume"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%n">10</input><input type="%n">10</input></` +
        `inputs><script><block s="setVolume"><block s="reportVariadicSum"><li` +
        `st><block s="getVolume"></block><block var="delta"/></list></block><` +
        `/block></script><scripts><script x="10" y="98"><block s="setVolume">` +
        `<block s="reportVariadicSum"><list><block s="getVolume"></block><blo` +
        `ck var="delta"/></list></block></block></script></scripts></block-de` +
        `finition><block-definition s="set volume to %#1 %" type="command" ca` +
        `tegory="sound" selector="setVolume" primitive="setVolume"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%n">100</input></inputs></block-definition><block-definition s="vo` +
        `lume" type="reporter" category="sound" selector="getVolume" primitiv` +
        `e="getVolume"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs></block-definition><block-definition s="change` +
        ` balance by %&apos;delta&apos;" type="command" category="sound" sele` +
        `ctor="changePan" primitive="changePan"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">10</input><in` +
        `put type="%n">10</input></inputs><script><block s="setPan"><block s=` +
        `"reportVariadicSum"><list><block s="getPan"></block><block var="delt` +
        `a"/></list></block></block></script><scripts><script x="10" y="98"><` +
        `block s="setPan"><block s="reportVariadicSum"><list><block s="getPan` +
        `"></block><block var="delta"/></list></block></block></script></scri` +
        `pts></block-definition><block-definition s="set balance to %#1" type` +
        `="command" category="sound" selector="setPan" primitive="setPan"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">0</input></inputs></block-definition><block-definition ` +
        `s="balance" type="reporter" category="sound" selector="getPan" primi` +
        `tive="getPan"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs></block-definition><block-definition s="play f` +
        `requency %#1 Hz" type="command" category="sound" selector="playFreq"` +
        ` primitive="playFreq"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">440</input></inputs></block-de` +
        `finition><block-definition s="stop frequency" type="command" categor` +
        `y="sound" selector="stopFreq" primitive="stopFreq"><header></header>` +
        `<code></code><translations></translations><inputs></inputs></block-d` +
        `efinition><block-definition s="jukebox" type="reporter" category="so` +
        `und" selector="reportSounds" primitive="reportSounds"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="clear" type="command" category="pe` +
        `n" selector="clear" primitive="clear"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="pen down" type="command" category="pen" selector="` +
        `down" primitive="down"><header></header><code></code><translations><` +
        `/translations><inputs></inputs></block-definition><block-definition ` +
        `s="pen up" type="command" category="pen" selector="up" primitive="up` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="pen down?" type="p` +
        `redicate" category="pen" selector="getPenDown" primitive="getPenDown` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="set pen color to %` +
        `&apos;color&apos;" type="command" category="pen" selector="setColor"` +
        ` primitive="setColor"><header></header><code></code><translations></` +
        `translations><inputs><input type="%clr" readonly="true" irreplaceabl` +
        `e="true"></input><input type="%clr" readonly="true" irreplaceable="t` +
        `rue"></input></inputs><script><block s="doApplyExtension"><l>clr_set` +
        `pen(clr)</l><list><block var="color"/></list></block></script><scrip` +
        `ts><script x="10" y="98"><block s="doApplyExtension"><l>clr_setpen(c` +
        `lr)</l><list><block var="color"/></list></block></script></scripts><` +
        `/block-definition><block-definition s="set pen %#1 to %#2" type="com` +
        `mand" category="pen" selector="setPenColorDimension" primitive="setP` +
        `enColorDimension"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s" readonly="true" irreplaceable="tru` +
        `e">hue<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#x` +
        `D;&#126;&#xD;r-g-b(-a)</options></input><input type="%n">50</input><` +
        `/inputs></block-definition><block-definition s="change pen %&apos;as` +
        `pect&apos; by %&apos;delta&apos;" type="command" category="pen" sele` +
        `ctor="changePenColorDimension" primitive="changePenColorDimension"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">hue<options>hue&` +
        `#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(` +
        `-a)</options></input><input type="%n">10</input><input type="%s" rea` +
        `donly="true" irreplaceable="true">hue<options>hue&#xD;saturation&#xD` +
        `;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></inp` +
        `ut><input type="%n">10</input></inputs><script><block s="doRun"><blo` +
        `ck s="reifyScript"><script><block s="setPenColorDimension"><l></l><b` +
        `lock var="delta"/></block></script><list></list></block><list><block` +
        ` var="aspect"/></list></block></script><scripts><script x="10" y="98` +
        `"><block s="doRun"><block s="reifyScript"><script><block s="setPenCo` +
        `lorDimension"><l></l><block var="delta"/></block></script><list></li` +
        `st></block><list><block var="aspect"/></list></block></script></scri` +
        `pts></block-definition><block-definition s="pen %#1" type="reporter"` +
        ` category="pen" selector="getPenAttribute" primitive="getPenAttribut` +
        `e"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true" irreplaceable="true">hue<options>` +
        `size&#xD;hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#12` +
        `6;&#xD;r-g-b-a</options></input></inputs></block-definition><block-d` +
        `efinition s="set background color to %#1" type="command" category="p` +
        `en" selector="setBackgroundColor" primitive="setBackgroundColor"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%clr" readonly="true" irreplaceable="true"></input></inputs` +
        `></block-definition><block-definition s="set background %#1 to %#2" ` +
        `type="command" category="pen" selector="setBackgroundColorDimension"` +
        ` primitive="setBackgroundColorDimension"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%s" readonly="t` +
        `rue" irreplaceable="true">hue<options>hue&#xD;saturation&#xD;brightn` +
        `ess&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input><inpu` +
        `t type="%n">50</input></inputs></block-definition><block-definition ` +
        `s="change background %#1 by %#2" type="command" category="pen" selec` +
        `tor="changeBackgroundColorDimension" primitive="changeBackgroundColo` +
        `rDimension"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">hue` +
        `<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#12` +
        `6;&#xD;r-g-b(-a)</options></input><input type="%n">10</input></input` +
        `s></block-definition><block-definition s="change pen size by %&apos;` +
        `delta&apos;" type="command" category="pen" selector="changeSize" pri` +
        `mitive="changeSize"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">1</input><input type="%n">1</inp` +
        `ut></inputs><script><block s="setSize"><block s="reportVariadicSum">` +
        `<list><block s="getPenAttribute"><l><option>size</option></l></block` +
        `><block var="delta"/></list></block></block></script><scripts><scrip` +
        `t x="10" y="98"><block s="setSize"><block s="reportVariadicSum"><lis` +
        `t><block s="getPenAttribute"><l><option>size</option></l></block><bl` +
        `ock var="delta"/></list></block></block></script></scripts></block-d` +
        `efinition><block-definition s="set pen size to %#1" type="command" c` +
        `ategory="pen" selector="setSize" primitive="setSize"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>1</input></inputs></block-definition><block-definition s="stamp" ty` +
        `pe="command" category="pen" selector="doStamp" primitive="doStamp"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="fill" type="command" ` +
        `category="pen" selector="floodFill" primitive="floodFill"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="write %#1 size %#2" type="comm` +
        `and" category="pen" selector="write" primitive="write"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s">Hello!</input><input type="%n">12</input></inputs></block-definit` +
        `ion><block-definition s="pen trails" type="reporter" category="pen" ` +
        `selector="reportPenTrailsAsCostume" primitive="reportPenTrailsAsCost` +
        `ume"><header></header><code></code><translations></translations><inp` +
        `uts></inputs></block-definition><block-definition s="pen vectors" ty` +
        `pe="reporter" category="pen" selector="reportPentrailsAsSVG" primiti` +
        `ve="reportPentrailsAsSVG"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="paste on %#1" type="command" category="pen" selector="doPasteO` +
        `n" primitive="doPasteOn"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true"><options>§_` +
        `objectsMenu</options></input></inputs></block-definition><block-defi` +
        `nition s="cut from %#1" type="command" category="pen" selector="doCu` +
        `tFrom" primitive="doCutFrom"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true"><option` +
        `s>§_objectsMenu</options></input></inputs></block-definition><block-` +
        `definition s="message" type="reporter" category="control" selector="` +
        `getLastMessage" primitive="getLastMessage"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="broadcast %#1 %#2" type="command" category="c` +
        `ontrol" selector="doBroadcast" primitive="doBroadcast"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true"><options>§_messagesMenu</options></input><input t` +
        `ype="%receive" readonly="true" irreplaceable="true" expand="to&#xD;w` +
        `ith data" max="2"></input></inputs></block-definition><block-definit` +
        `ion s="broadcast %#1 %#2 and wait" type="command" category="control"` +
        ` selector="doBroadcastAndWait" primitive="doBroadcastAndWait"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%s" readonly="true"><options>§_messagesMenu</options></input><` +
        `input type="%receive" readonly="true" irreplaceable="true" expand="t` +
        `o&#xD;with data" max="2"></input></inputs></block-definition><block-` +
        `definition s="wait %&apos;duration&apos; secs" type="command" catego` +
        `ry="control" selector="doWait" primitive="doWait"><header></header><` +
        `code></code><translations></translations><inputs><input type="%n">1<` +
        `/input><input type="%n">1</input></inputs><script><block s="doDeclar` +
        `eVariables"><list><l>start time</l></list></block><block s="doSetVar` +
        `"><l>start time</l><block s="reportDate"><l><option>time in millisec` +
        `onds</option></l></block></block><block s="doWaitUntil"><block s="re` +
        `portVariadicGreaterThanOrEquals"><list><block s="reportDate"><l><opt` +
        `ion>time in milliseconds</option></l></block><block s="reportVariadi` +
        `cSum"><list><block var="start time"/><block s="reportVariadicProduct` +
        `"><list><block var="duration"/><l>1000</l></list></block></list></bl` +
        `ock></list></block></block></script><scripts><script x="10" y="98"><` +
        `block s="doDeclareVariables"><list><l>start time</l></list></block><` +
        `block s="doSetVar"><l>start time</l><block s="reportDate"><l><option` +
        `>time in milliseconds</option></l></block></block><block s="doWaitUn` +
        `til"><block s="reportVariadicGreaterThanOrEquals"><list><block s="re` +
        `portDate"><l><option>time in milliseconds</option></l></block><block` +
        ` s="reportVariadicSum"><list><block var="start time"/><block s="repo` +
        `rtVariadicProduct"><list><block var="duration"/><l>1000</l></list></` +
        `block></list></block></list></block></block></script></scripts></blo` +
        `ck-definition><block-definition s="wait until %&apos;condition&apos;` +
        `" type="command" category="control" selector="doWaitUntil" primitive` +
        `="doWaitUntil"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%boolUE" readonly="true"></input><input t` +
        `ype="%boolUE" readonly="true"></input></inputs><script><block s="doI` +
        `f"><block s="reportNot"><block s="evaluate"><block var="condition"/>` +
        `<list></list></block></block><script><block s="doWaitUntil"><block s` +
        `="evaluate"><block var="condition"/><list></list></block></block></s` +
        `cript><list></list></block></script><scripts><script x="10" y="98"><` +
        `block s="doIf"><block s="reportNot"><block s="evaluate"><block var="` +
        `condition"/><list></list></block></block><script><block s="doWaitUnt` +
        `il"><block s="evaluate"><block var="condition"/><list></list></block` +
        `></block></script><list></list></block></script></scripts></block-de` +
        `finition><block-definition s="forever %&apos;action&apos;" type="com` +
        `mand" category="control" selector="doForever" primitive="doForever">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%loop" readonly="true" irreplaceable="true"></input><inp` +
        `ut type="%loop" readonly="true" irreplaceable="true"></input></input` +
        `s><script><block s="doRun"><block var="action"/><list></list></block` +
        `><block s="doRun"><block s="reportEnvironment"><l><option>script</op` +
        `tion></l></block><list><block var="action"/></list></block></script>` +
        `<scripts><script x="10" y="98"><block s="doRun"><block var="action"/` +
        `><list></list></block><block s="doRun"><block s="reportEnvironment">` +
        `<l><option>script</option></l></block><list><block var="action"/></l` +
        `ist></block></script></scripts></block-definition><block-definition ` +
        `s="repeat %&apos;count&apos; %&apos;action&apos;" type="command" cat` +
        `egory="control" selector="doRepeat" primitive="doRepeat"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n">10</input><input type="%loop" readonly="true" irreplaceable="tr` +
        `ue"></input><input type="%n">10</input><input type="%loop" readonly=` +
        `"true" irreplaceable="true"></input></inputs><script><block s="doDec` +
        `lareVariables"><list><l>self</l></list></block><block s="doSetVar"><` +
        `l>self</l><block s="reportEnvironment"><l><option>script</option></l` +
        `></block></block><block s="doIf"><block s="reportVariadicGreaterThan` +
        `"><list><block var="count"/><l>0</l></list></block><script><block s=` +
        `"doRun"><block var="action"/><list></list></block><block s="doApplyE` +
        `xtension"><l>snap_yield</l><list></list></block><block s="doRun"><bl` +
        `ock var="self"/><list><block s="reportDifference"><block var="count"` +
        `/><l>1</l></block><block var="action"/></list></block></script><list` +
        `></list></block></script><scripts><script x="10" y="98"><block s="do` +
        `DeclareVariables"><list><l>self</l></list></block><block s="doSetVar` +
        `"><l>self</l><block s="reportEnvironment"><l><option>script</option>` +
        `</l></block></block><block s="doIf"><block s="reportVariadicGreaterT` +
        `han"><list><block var="count"/><l>0</l></list></block><script><block` +
        ` s="doRun"><block var="action"/><list></list></block><block s="doApp` +
        `lyExtension"><l>snap_yield</l><list></list></block><block s="doRun">` +
        `<block var="self"/><list><block s="reportDifference"><block var="cou` +
        `nt"/><l>1</l></block><block var="action"/></list></block></script><l` +
        `ist></list></block></script></scripts></block-definition><block-defi` +
        `nition s="repeat until %&apos;condition&apos; %&apos;action&apos;" t` +
        `ype="command" category="control" selector="doUntil" primitive="doUnt` +
        `il"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%boolUE" readonly="true"></input><input type="%loop"` +
        ` readonly="true" irreplaceable="true"></input><input type="%boolUE" ` +
        `readonly="true"></input><input type="%loop" readonly="true" irreplac` +
        `eable="true"></input></inputs><script><block s="doDeclareVariables">` +
        `<list><l>self</l></list></block><block s="doSetVar"><l>self</l><bloc` +
        `k s="reportEnvironment"><l><option>script</option></l></block></bloc` +
        `k><block s="doIf"><block s="reportNot"><block s="evaluate"><block va` +
        `r="condition"/><list></list></block></block><script><block s="doRun"` +
        `><block var="action"/><list></list></block><block s="doApplyExtensio` +
        `n"><l>snap_yield</l><list></list></block><block s="doRun"><block var` +
        `="self"/><list><block var="condition"/><block var="action"/></list><` +
        `/block></script><list></list></block></script><scripts><script x="10` +
        `" y="98"><block s="doDeclareVariables"><list><l>self</l></list></blo` +
        `ck><block s="doSetVar"><l>self</l><block s="reportEnvironment"><l><o` +
        `ption>script</option></l></block></block><block s="doIf"><block s="r` +
        `eportNot"><block s="evaluate"><block var="condition"/><list></list><` +
        `/block></block><script><block s="doRun"><block var="action"/><list><` +
        `/list></block><block s="doApplyExtension"><l>snap_yield</l><list></l` +
        `ist></block><block s="doRun"><block var="self"/><list><block var="co` +
        `ndition"/><block var="action"/></list></block></script><list></list>` +
        `</block></script></scripts></block-definition><block-definition s="f` +
        `or %&apos;count&apos; = %&apos;start&apos; to %&apos;end&apos; %&apo` +
        `s;action&apos;" type="command" category="control" selector="doFor" p` +
        `rimitive="doFor"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%upvar" readonly="true" irreplaceable="` +
        `true">i</input><input type="%n">1</input><input type="%n">10</input>` +
        `<input type="%loop" readonly="true" irreplaceable="true"></input><in` +
        `put type="%upvar" readonly="true" irreplaceable="true">i</input><inp` +
        `ut type="%n">1</input><input type="%n">10</input><input type="%loop"` +
        ` readonly="true" irreplaceable="true"></input></inputs><script><bloc` +
        `k s="doDeclareVariables"><list><l>test</l><l>increment</l></list></b` +
        `lock><block s="doSetVar"><l>count</l><block var="start"/></block><bl` +
        `ock s="doIfElse"><block s="reportVariadicLessThan"><list><block var=` +
        `"start"/><block var="end"/></list></block><script><block s="doSetVar` +
        `"><l>test</l><block s="reifyPredicate"><autolambda><block s="reportV` +
        `ariadicGreaterThan"><list><block var="count"/><block var="end"/></li` +
        `st></block></autolambda><list></list></block></block><block s="doSet` +
        `Var"><l>increment</l><l>1</l></block></script><script><block s="doSe` +
        `tVar"><l>test</l><block s="reifyPredicate"><autolambda><block s="rep` +
        `ortVariadicLessThan"><list><block var="count"/><block var="end"/></l` +
        `ist></block></autolambda><list></list></block></block><block s="doSe` +
        `tVar"><l>increment</l><l>-1</l></block></script></block><block s="do` +
        `Until"><block s="evaluate"><block var="test"/><list></list></block><` +
        `script><block s="doRun"><block var="action"/><list></list></block><b` +
        `lock s="doChangeVar"><l>count</l><block var="increment"/></block></s` +
        `cript></block></script><scripts><script x="10" y="98"><block s="doDe` +
        `clareVariables"><list><l>test</l><l>increment</l></list></block><blo` +
        `ck s="doSetVar"><l>count</l><block var="start"/></block><block s="do` +
        `IfElse"><block s="reportVariadicLessThan"><list><block var="start"/>` +
        `<block var="end"/></list></block><script><block s="doSetVar"><l>test` +
        `</l><block s="reifyPredicate"><autolambda><block s="reportVariadicGr` +
        `eaterThan"><list><block var="count"/><block var="end"/></list></bloc` +
        `k></autolambda><list></list></block></block><block s="doSetVar"><l>i` +
        `ncrement</l><l>1</l></block></script><script><block s="doSetVar"><l>` +
        `test</l><block s="reifyPredicate"><autolambda><block s="reportVariad` +
        `icLessThan"><list><block var="count"/><block var="end"/></list></blo` +
        `ck></autolambda><list></list></block></block><block s="doSetVar"><l>` +
        `increment</l><l>-1</l></block></script></block><block s="doUntil"><b` +
        `lock s="evaluate"><block var="test"/><list></list></block><script><b` +
        `lock s="doRun"><block var="action"/><list></list></block><block s="d` +
        `oChangeVar"><l>count</l><block var="increment"/></block></script></b` +
        `lock></script></scripts></block-definition><block-definition s="if %` +
        `&apos;condition&apos; %&apos;true case&apos; %&apos;else pairs&apos;` +
        `" type="command" category="control" selector="doIf" primitive="doIf"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%b" readonly="true"></input><input type="%cs" readonly=` +
        `"true" irreplaceable="true"></input><input type="%elseif" readonly="` +
        `true" irreplaceable="true" expand="else if&#xD;"></input><input type` +
        `="%b" readonly="true"></input><input type="%cs" readonly="true" irre` +
        `placeable="true"></input><input type="%elseif" readonly="true" irrep` +
        `laceable="true" expand="else if&#xD;"></input></inputs><script><bloc` +
        `k s="doDeclareVariables"><list><l>self</l></list></block><block s="d` +
        `oSetVar"><l>self</l><block s="reportEnvironment"><l><option>script</` +
        `option></l></block></block><block s="doIfElse"><block var="condition` +
        `"/><script><block s="doRun"><block var="true case"/><list></list></b` +
        `lock></script><script><block s="doIfElse"><block s="reportListIsEmpt` +
        `y"><block var="else pairs"/></block><script></script><script><block ` +
        `s="doIfElse"><block s="reportListItem"><l>1</l><block var="else pair` +
        `s"/></block><script><block s="doRun"><block s="reportListItem"><l>2<` +
        `/l><block var="else pairs"/></block><list></list></block></script><s` +
        `cript><block s="doRun"><block var="self"/><list><block s="reportBool` +
        `ean"><l><bool>false</bool></l></block><l></l><block s="reportCDR"><b` +
        `lock s="reportCDR"><block var="else pairs"/></block></block></list><` +
        `/block></script></block></script></block></script></block></script><` +
        `scripts><script x="10" y="98"><block s="doDeclareVariables"><list><l` +
        `>self</l></list></block><block s="doSetVar"><l>self</l><block s="rep` +
        `ortEnvironment"><l><option>script</option></l></block></block><block` +
        ` s="doIfElse"><block var="condition"/><script><block s="doRun"><bloc` +
        `k var="true case"/><list></list></block></script><script><block s="d` +
        `oIfElse"><block s="reportListIsEmpty"><block var="else pairs"/></blo` +
        `ck><script></script><script><block s="doIfElse"><block s="reportList` +
        `Item"><l>1</l><block var="else pairs"/></block><script><block s="doR` +
        `un"><block s="reportListItem"><l>2</l><block var="else pairs"/></blo` +
        `ck><list></list></block></script><script><block s="doRun"><block var` +
        `="self"/><list><block s="reportBoolean"><l><bool>false</bool></l></b` +
        `lock><l></l><block s="reportCDR"><block s="reportCDR"><block var="el` +
        `se pairs"/></block></block></list></block></script></block></script>` +
        `</block></script></block></script></scripts></block-definition><bloc` +
        `k-definition s="if %&apos;condition&apos; %&apos;true case&apos; els` +
        `e %&apos;false case&apos;" type="command" category="control" selecto` +
        `r="doIfElse" primitive="doIfElse"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%b" readonly="true"></` +
        `input><input type="%cs" readonly="true" irreplaceable="true"></input` +
        `><input type="%cs" readonly="true" irreplaceable="true"></input><inp` +
        `ut type="%b" readonly="true"></input><input type="%cs" readonly="tru` +
        `e" irreplaceable="true"></input><input type="%cs" readonly="true" ir` +
        `replaceable="true"></input></inputs><script><block s="doRun"><block ` +
        `s="reportListItem"><block s="reportVariadicSum"><list><block var="co` +
        `ndition"/><l>1</l></list></block><block s="reportNewList"><list><blo` +
        `ck var="false case"/><block var="true case"/></list></block></block>` +
        `<list></list></block></script><scripts><script x="10" y="98"><block ` +
        `s="doRun"><block s="reportListItem"><block s="reportVariadicSum"><li` +
        `st><block var="condition"/><l>1</l></list></block><block s="reportNe` +
        `wList"><list><block var="false case"/><block var="true case"/></list` +
        `></block></block><list></list></block></script></scripts></block-def` +
        `inition><block-definition s="if %&apos;condition&apos; then %&apos;t` +
        `rue case&apos; else %&apos;false case&apos;" type="reporter" categor` +
        `y="control" selector="reportIfElse" primitive="reportIfElse"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%b" readonly="true"></input><input type="%anyUE"></input><input` +
        ` type="%anyUE"></input><input type="%b" readonly="true"></input><inp` +
        `ut type="%anyUE"></input><input type="%anyUE"></input></inputs><scri` +
        `pt><block s="doReport"><block s="reportHyperZip"><block s="reifyRepo` +
        `rter"><autolambda><block s="evaluate"><block s="reportListItem"><l><` +
        `/l><l/></block><list></list></block></autolambda><list></list></bloc` +
        `k><block s="reportVariadicSum"><list><block var="condition"/><l>1</l` +
        `></list></block><l>0</l><block s="reportNewList"><list><block var="f` +
        `alse case"/><block var="true case"/></list></block><l>1</l></block><` +
        `/block></script><scripts><script x="10" y="98"><block s="doReport"><` +
        `block s="reportHyperZip"><block s="reifyReporter"><autolambda><block` +
        ` s="evaluate"><block s="reportListItem"><l></l><l/></block><list></l` +
        `ist></block></autolambda><list></list></block><block s="reportVariad` +
        `icSum"><list><block var="condition"/><l>1</l></list></block><l>0</l>` +
        `<block s="reportNewList"><list><block var="false case"/><block var="` +
        `true case"/></list></block><l>1</l></block></block></script></script` +
        `s></block-definition><block-definition s="stop %#1" type="command" c` +
        `ategory="control" selector="doStopThis" primitive="doStopThis"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">all<options>all&#xD;` +
        `all scenes&#xD;this script&#xD;this block&#xD;all but this script&#x` +
        `D;other scripts in sprite</options></input></inputs></block-definiti` +
        `on><block-definition s="run %#1 %#2" type="command" category="contro` +
        `l" selector="doRun" primitive="doRun"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%cmdRing" readonly` +
        `="true"></input><input type="%mult%s" readonly="true" expand="with i` +
        `nputs"></input></inputs></block-definition><block-definition s="laun` +
        `ch %#1 %#2" type="command" category="control" selector="fork" primit` +
        `ive="fork"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%cmdRing" readonly="true"></input><input type` +
        `="%mult%s" readonly="true" expand="with inputs"></input></inputs></b` +
        `lock-definition><block-definition s="call %#1 %#2" type="reporter" c` +
        `ategory="control" selector="evaluate" primitive="evaluate"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%repRing" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%mult%s" readonly="true" expand="with inputs"></input></inputs></` +
        `block-definition><block-definition s="report %#1" type="command" cat` +
        `egory="control" selector="doReport" primitive="doReport"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s"></input></inputs></block-definition><block-definition s="run %#` +
        `1 w/continuation" type="command" category="control" selector="doCall` +
        `CC" primitive="doCallCC"><header></header><code></code><translations` +
        `></translations><inputs><input type="%cmdRing" readonly="true"></inp` +
        `ut></inputs></block-definition><block-definition s="call %#1 w/conti` +
        `nuation" type="reporter" category="control" selector="reportCallCC" ` +
        `primitive="reportCallCC"><header></header><code></code><translations` +
        `></translations><inputs><input type="%cmdRing" readonly="true"></inp` +
        `ut></inputs></block-definition><block-definition s="warp %#1" type="` +
        `command" category="other" selector="doWarp" primitive="doWarp"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%cs" readonly="true" irreplaceable="true"></input></inputs></` +
        `block-definition><block-definition s="tell %&apos;target&apos; to %&` +
        `apos;action&apos; %&apos;parameters&apos;" type="command" category="` +
        `control" selector="doTellTo" primitive="doTellTo"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true"><options>§_objectsMenu</options></input><input type="%` +
        `cmdRing" readonly="true"></input><input type="%mult%s" readonly="tru` +
        `e" expand="with inputs"></input><input type="%s" readonly="true"><op` +
        `tions>§_objectsMenu</options></input><input type="%cmdRing" readonly` +
        `="true"></input><input type="%mult%s" readonly="true" expand="with i` +
        `nputs"></input></inputs><script><block s="doRun"><block s="reportAtt` +
        `ributeOf"><block var="action"/><block var="target"/></block><block v` +
        `ar="parameters"/></block></script><scripts><script x="10" y="98"><bl` +
        `ock s="doRun"><block s="reportAttributeOf"><block var="action"/><blo` +
        `ck var="target"/></block><block var="parameters"/></block></script><` +
        `/scripts></block-definition><block-definition s="ask %&apos;target&a` +
        `pos; for %&apos;action&apos; %&apos;parameters&apos;" type="reporter` +
        `" category="control" selector="reportAskFor" primitive="reportAskFor` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_objectsMenu</options></` +
        `input><input type="%repRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%mult%s" readonly="true" expand="with inputs"></i` +
        `nput><input type="%s" readonly="true"><options>§_objectsMenu</option` +
        `s></input><input type="%repRing" readonly="true" irreplaceable="true` +
        `"></input><input type="%mult%s" readonly="true" expand="with inputs"` +
        `></input></inputs><script><block s="doReport"><block s="evaluate"><b` +
        `lock s="reportAttributeOf"><block var="action"/><block var="target"/` +
        `></block><block var="parameters"/></block></block></script><scripts>` +
        `<script x="10" y="98"><block s="doReport"><block s="evaluate"><block` +
        ` s="reportAttributeOf"><block var="action"/><block var="target"/></b` +
        `lock><block var="parameters"/></block></block></script></scripts></b` +
        `lock-definition><block-definition s="create a clone of %&apos;target` +
        `&apos;" type="command" category="control" selector="createClone" pri` +
        `mitive="createClone"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true">myself<options>` +
        `§_clonablesMenu</options></input><input type="%s" readonly="true">my` +
        `self<options>§_clonablesMenu</options></input></inputs><script><bloc` +
        `k s="doReport"><block s="newClone"><block var="target"/></block></bl` +
        `ock></script><scripts><script x="10" y="98"><block s="doReport"><blo` +
        `ck s="newClone"><block var="target"/></block></block></script></scri` +
        `pts></block-definition><block-definition s="a new clone of %#1" type` +
        `="reporter" category="control" selector="newClone" primitive="newClo` +
        `ne"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%s" readonly="true">myself<options>§_clonablesMenu</` +
        `options></input></inputs></block-definition><block-definition s="del` +
        `ete this clone" type="command" category="control" selector="removeCl` +
        `one" primitive="removeClone"><header></header><code></code><translat` +
        `ions></translations><inputs></inputs></block-definition><block-defin` +
        `ition s="define %#1 %#2 %#3" type="command" category="control" selec` +
        `tor="doDefineBlock" primitive="doDefineBlock"><header></header><code` +
        `></code><translations></translations><inputs><input type="%upvar" re` +
        `adonly="true" irreplaceable="true">block</input><input type="%s"></i` +
        `nput><input type="%repRing" readonly="true" irreplaceable="true"></i` +
        `nput></inputs></block-definition><block-definition s="set %#1 of blo` +
        `ck %#2 to %#3" type="command" category="control" selector="doSetBloc` +
        `kAttribute" primitive="doSetBlockAttribute"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">label<options>label&#xD;definition&#xD;` +
        `comment&#xD;category&#xD;type&#xD;scope&#xD;selector&#xD;slots&#xD;&` +
        `#126;&#xD;defaults&#xD;menus&#xD;editables&#xD;replaceables&#xD;&#12` +
        `6;&#xD;separators&#xD;collapses&#xD;expands&#xD;initial slots&#xD;mi` +
        `n slots&#xD;max slots&#xD;translations</options></input><input type=` +
        `"%repRing" readonly="true" irreplaceable="true"></input><input type=` +
        `"%s"></input></inputs></block-definition><block-definition s="delete` +
        ` block %#1" type="command" category="control" selector="doDeleteBloc` +
        `k" primitive="doDeleteBlock"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%repRing" readonly="true" i` +
        `rreplaceable="true"></input></inputs></block-definition><block-defin` +
        `ition s="%#1 of block %#2" type="reporter" category="control" select` +
        `or="reportBlockAttribute" primitive="reportBlockAttribute"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">definition<options>label` +
        `&#xD;definition&#xD;comment&#xD;category&#xD;custom?&#xD;global?&#xD` +
        `;type&#xD;scope&#xD;selector&#xD;slots&#xD;&#126;&#xD;defaults&#xD;m` +
        `enus&#xD;editables&#xD;replaceables&#xD;&#126;&#xD;separators&#xD;co` +
        `llapses&#xD;expands&#xD;initial slots&#xD;min slots&#xD;max slots&#x` +
        `D;translations</options></input><input type="%repRing" readonly="tru` +
        `e" irreplaceable="true"></input></inputs></block-definition><block-d` +
        `efinition s="this %#1" type="reporter" category="control" selector="` +
        `reportEnvironment" primitive="reportEnvironment"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true">script<options>script&#xD;caller&#` +
        `xD;continuation&#xD;&#126;&#xD;inputs</options></input></inputs></bl` +
        `ock-definition><block-definition s="pause all $pause" type="command"` +
        ` category="control" selector="doPauseAll" primitive="doPauseAll"><he` +
        `ader></header><code></code><translations></translations><inputs></in` +
        `puts></block-definition><block-definition s="switch to scene %#1 %#2` +
        `" type="command" category="control" selector="doSwitchToScene" primi` +
        `tive="doSwitchToScene"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true">next<options>` +
        `§_scenesMenu</options></input><input type="%send" readonly="true" ir` +
        `replaceable="true" expand="and send&#xD;with data" max="2"></input><` +
        `/inputs></block-definition><block-definition s="pipe %&apos;value&ap` +
        `os; $arrowRight %&apos;functions&apos;" type="reporter" category="co` +
        `ntrol" selector="reportPipe" primitive="reportPipe"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s">` +
        `</input><input type="%mult%repRing" readonly="true"></input><input t` +
        `ype="%s"></input><input type="%mult%repRing" readonly="true"></input` +
        `></inputs><script><block s="doReport"><block s="reportIfElse"><block` +
        ` s="reportListIsEmpty"><block var="functions"/></block><block var="v` +
        `alue"/><block s="reportPipe"><block s="evaluate"><block s="reportLis` +
        `tItem"><l>1</l><block var="functions"/></block><list><block var="val` +
        `ue"/></list></block><block s="reportCDR"><block var="functions"/></b` +
        `lock></block></block></block></script><scripts><script x="10" y="98"` +
        `><block s="doReport"><block s="reportIfElse"><block s="reportListIsE` +
        `mpty"><block var="functions"/></block><block var="value"/><block s="` +
        `reportPipe"><block s="evaluate"><block s="reportListItem"><l>1</l><b` +
        `lock var="functions"/></block><list><block var="value"/></list></blo` +
        `ck><block s="reportCDR"><block var="functions"/></block></block></bl` +
        `ock></block></script></scripts></block-definition><block-definition ` +
        `s="touching %#1 ?" type="predicate" category="sensing" selector="rep` +
        `ortTouchingObject" primitive="reportTouchingObject"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true">mouse-pointer<options>§_collidablesMenu</options></i` +
        `nput></inputs></block-definition><block-definition s="touching %#1 ?` +
        `" type="predicate" category="sensing" selector="reportTouchingColor"` +
        ` primitive="reportTouchingColor"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%clr" readonly="true" i` +
        `rreplaceable="true"></input></inputs></block-definition><block-defin` +
        `ition s="color %#1 is touching %#2 ?" type="predicate" category="sen` +
        `sing" selector="reportColorIsTouchingColor" primitive="reportColorIs` +
        `TouchingColor"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%clr" readonly="true" irreplaceable="true` +
        `"></input><input type="%clr" readonly="true" irreplaceable="true"></` +
        `input></inputs></block-definition><block-definition s="%#1 at %#2" t` +
        `ype="reporter" category="sensing" selector="reportAspect" primitive=` +
        `"reportAspect"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s" readonly="true" irreplaceable="true">` +
        `hue<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;r` +
        `-g-b-a&#xD;&#126;&#xD;sprites</options></input><input type="%s" read` +
        `only="true">mouse-pointer<options>§_locationMenu</options></input></` +
        `inputs></block-definition><block-definition s="stack size" type="rep` +
        `orter" category="sensing" selector="reportStackSize" primitive="repo` +
        `rtStackSize"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="frames"` +
        ` type="reporter" category="sensing" selector="reportFrameCount" prim` +
        `itive="reportFrameCount"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="yields" type="reporter" category="sensing" selector="reportYiel` +
        `dCount" primitive="reportYieldCount"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="processes" type="reporter" category="sensing" selec` +
        `tor="reportThreadCount" primitive="reportThreadCount"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="ask %#1 and wait" type="command" c` +
        `ategory="sensing" selector="doAsk" primitive="doAsk"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        `>what&apos;s your name?</input></inputs></block-definition><block-de` +
        `finition s="answer" type="reporter" category="sensing" selector="rep` +
        `ortLastAnswer" primitive="reportLastAnswer"><header></header><code><` +
        `/code><translations></translations><inputs></inputs></block-definiti` +
        `on><block-definition s="answer" type="reporter" category="sensing" s` +
        `elector="getLastAnswer" primitive="getLastAnswer"><header></header><` +
        `code></code><translations></translations><inputs></inputs></block-de` +
        `finition><block-definition s="mouse position" type="reporter" catego` +
        `ry="sensing" selector="reportMousePosition" primitive="reportMousePo` +
        `sition"><header></header><code></code><translations></translations><` +
        `inputs></inputs><script><block s="doReport"><block s="reportNewList"` +
        `><list><block s="reportMouseX"></block><block s="reportMouseY"></blo` +
        `ck></list></block></block></script><scripts><script x="10" y="98"><b` +
        `lock s="doReport"><block s="reportNewList"><list><block s="reportMou` +
        `seX"></block><block s="reportMouseY"></block></list></block></block>` +
        `</script></scripts></block-definition><block-definition s="mouse x" ` +
        `type="reporter" category="sensing" selector="reportMouseX" primitive` +
        `="reportMouseX"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="mous` +
        `e y" type="reporter" category="sensing" selector="reportMouseY" prim` +
        `itive="reportMouseY"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"mouse down?" type="predicate" category="sensing" selector="reportMo` +
        `useDown" primitive="reportMouseDown"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="key %#1 pressed?" type="predicate" category="sensin` +
        `g" selector="reportKeyPressed" primitive="reportKeyPressed"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true">space<options>§_keysMenu</options></input></` +
        `inputs></block-definition><block-definition s="%#1 to %#2" type="rep` +
        `orter" category="sensing" selector="reportRelationTo" primitive="rep` +
        `ortRelationTo"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s" readonly="true">distance<options>dist` +
        `ance&#xD;direction&#xD;ray length</options></input><input type="%s" ` +
        `readonly="true">mouse-pointer<options>§_destinationsMenu</options></` +
        `input></inputs></block-definition><block-definition s="reset timer" ` +
        `type="command" category="sensing" selector="doResetTimer" primitive=` +
        `"doResetTimer"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="timer` +
        `" type="reporter" category="sensing" selector="reportTimer" primitiv` +
        `e="reportTimer"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="time` +
        `r" type="reporter" category="sensing" selector="getTimer" primitive=` +
        `"getTimer"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="%#1 of %#` +
        `2" type="reporter" category="sensing" selector="reportAttributeOf" p` +
        `rimitive="reportAttributeOf"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true">costume` +
        ` #<options>§_attributesMenu</options></input><input type="%s" readon` +
        `ly="true"><options>§_objectsMenu</options></input></inputs></block-d` +
        `efinition><block-definition s="object %&apos;name&apos;" type="repor` +
        `ter" category="sensing" selector="reportObject" primitive="reportObj` +
        `ect"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true">myself<options>§_objectsMenuWit` +
        `hSelf</options></input><input type="%s" readonly="true">myself<optio` +
        `ns>§_objectsMenuWithSelf</options></input></inputs><script><block s=` +
        `"doReport"><block s="reportHyperZip"><block s="reifyReporter"><autol` +
        `ambda><block s="reportFindFirst"><block s="reifyPredicate"><autolamb` +
        `da><block s="reportVariadicEquals"><list><block var="id"/><block s="` +
        `reportAskFor"><l></l><block s="reifyReporter"><autolambda><block s="` +
        `reportGet"><l><option>name</option></l></block></autolambda><list></` +
        `list></block><list></list></block></list></block></autolambda><list>` +
        `</list></block><block s="reportConcatenatedLists"><list><block s="re` +
        `portAskFor"><block s="reportGet"><l><option>stage</option></l></bloc` +
        `k><block s="reifyReporter"><autolambda><block s="reportGet"><l><opti` +
        `on>other sprites</option></l></block></autolambda><list></list></blo` +
        `ck><list></list></block><block s="reportNewList"><list><block s="rep` +
        `ortGet"><l><option>stage</option></l></block></list></block></list><` +
        `/block></block></autolambda><list><l>id</l></list></block><block var` +
        `="name"/><l>0</l><l></l><l>0</l></block></block></script><scripts><s` +
        `cript x="10" y="98"><block s="doReport"><block s="reportHyperZip"><b` +
        `lock s="reifyReporter"><autolambda><block s="reportFindFirst"><block` +
        ` s="reifyPredicate"><autolambda><block s="reportVariadicEquals"><lis` +
        `t><block var="id"/><block s="reportAskFor"><l></l><block s="reifyRep` +
        `orter"><autolambda><block s="reportGet"><l><option>name</option></l>` +
        `</block></autolambda><list></list></block><list></list></block></lis` +
        `t></block></autolambda><list></list></block><block s="reportConcaten` +
        `atedLists"><list><block s="reportAskFor"><block s="reportGet"><l><op` +
        `tion>stage</option></l></block><block s="reifyReporter"><autolambda>` +
        `<block s="reportGet"><l><option>other sprites</option></l></block></` +
        `autolambda><list></list></block><list></list></block><block s="repor` +
        `tNewList"><list><block s="reportGet"><l><option>stage</option></l></` +
        `block></list></block></list></block></block></autolambda><list><l>id` +
        `</l></list></block><block var="name"/><l>0</l><l></l><l>0</l></block` +
        `></block></script></scripts></block-definition><block-definition s="` +
        `url %#1" type="reporter" category="sensing" selector="reportURL" pri` +
        `mitive="reportURL"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s">snap.berkeley.edu</input></inputs` +
        `></block-definition><block-definition s="set %#1 to %#2" type="comma` +
        `nd" category="sensing" selector="doSetGlobalFlag" primitive="doSetGl` +
        `obalFlag"><header></header><code></code><translations></translations` +
        `><inputs><input type="%s" readonly="true" irreplaceable="true">video` +
        ` capture<options>turbo mode&#xD;case sensitivity&#xD;flat line ends&` +
        `#xD;log pen vectors&#xD;video capture&#xD;mirror video</options></in` +
        `put><input type="%b" readonly="true"></input></inputs></block-defini` +
        `tion><block-definition s="is %#1 on?" type="predicate" category="sen` +
        `sing" selector="reportGlobalFlag" primitive="reportGlobalFlag"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">turbo mode<options>t` +
        `urbo mode&#xD;case sensitivity&#xD;flat line ends&#xD;log pen vector` +
        `s&#xD;video capture&#xD;mirror video</options></input></inputs></blo` +
        `ck-definition><block-definition s="current %#1" type="reporter" cate` +
        `gory="sensing" selector="reportDate" primitive="reportDate"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true" irreplaceable="true">date<options>year&#xD;m` +
        `onth&#xD;date&#xD;day of week&#xD;hour&#xD;minute&#xD;second&#xD;tim` +
        `e in milliseconds</options></input></inputs></block-definition><bloc` +
        `k-definition s="my %#1" type="reporter" category="sensing" selector=` +
        `"reportGet" primitive="reportGet"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true" ir` +
        `replaceable="true">neighbors<options>§_gettablesMenu</options></inpu` +
        `t></inputs></block-definition><block-definition s="microphone %#1" t` +
        `ype="reporter" category="sensing" selector="reportAudio" primitive="` +
        `reportAudio"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true">vo` +
        `lume<options>§_audioMenu</options></input></inputs></block-definitio` +
        `n><block-definition s="%#1" type="reporter" category="operators" sel` +
        `ector="reportVariadicSum" primitive="reportVariadicSum"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%mult%n" readonly="true" separator="+" collapse="sum" initial="2"></` +
        `input></inputs></block-definition><block-definition s="%#1 − %#2" ty` +
        `pe="reporter" category="operators" selector="reportDifference" primi` +
        `tive="reportDifference"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%n"></input><input type="%n"></i` +
        `nput></inputs></block-definition><block-definition s="%#1" type="rep` +
        `orter" category="operators" selector="reportVariadicProduct" primiti` +
        `ve="reportVariadicProduct"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%mult%n" readonly="true" sepa` +
        `rator="×" collapse="product" initial="2"></input></inputs></block-de` +
        `finition><block-definition s="%#1 / %#2" type="reporter" category="o` +
        `perators" selector="reportQuotient" primitive="reportQuotient"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n"></input><input type="%n"></input></inputs></block-definit` +
        `ion><block-definition s="round %#1" type="reporter" category="operat` +
        `ors" selector="reportRound" primitive="reportRound"><header></header` +
        `><code></code><translations></translations><inputs><input type="%n">` +
        `</input></inputs></block-definition><block-definition s="%#1 of %#2"` +
        ` type="reporter" category="operators" selector="reportMonadic" primi` +
        `tive="reportMonadic"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true" irreplaceable="` +
        `true">sqrt<options>abs&#xD;neg&#xD;sign&#xD;ceiling&#xD;floor&#xD;sq` +
        `rt&#xD;sin&#xD;cos&#xD;tan&#xD;asin&#xD;acos&#xD;atan&#xD;ln&#xD;log` +
        `&#xD;lg&#xD;e^&#xD;10^&#xD;2^&#xD;id</options></input><input type="%` +
        `n">10</input></inputs></block-definition><block-definition s="%#1 ^ ` +
        `%#2" type="reporter" category="operators" selector="reportPower" pri` +
        `mitive="reportPower"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%n"></input><input type="%n"></inpu` +
        `t></inputs></block-definition><block-definition s="%#1 mod %#2" type` +
        `="reporter" category="operators" selector="reportModulus" primitive=` +
        `"reportModulus"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n"></input><input type="%n"></input></i` +
        `nputs></block-definition><block-definition s="atan2 %#1 ÷ %#2" type=` +
        `"reporter" category="operators" selector="reportAtan2" primitive="re` +
        `portAtan2"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n"></input><input type="%n"></input></inputs` +
        `></block-definition><block-definition s="%#1" type="reporter" catego` +
        `ry="operators" selector="reportVariadicMin" primitive="reportVariadi` +
        `cMin"><header></header><code></code><translations></translations><in` +
        `puts><input type="%mult%n" readonly="true" separator="min" collapse=` +
        `"minimum" initial="2"></input></inputs></block-definition><block-def` +
        `inition s="%#1" type="reporter" category="operators" selector="repor` +
        `tVariadicMax" primitive="reportVariadicMax"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%mult%n" rea` +
        `donly="true" separator="max" collapse="maximum" initial="2"></input>` +
        `</inputs></block-definition><block-definition s="pick random %#1 to ` +
        `%#2" type="reporter" category="operators" selector="reportRandom" pr` +
        `imitive="reportRandom"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">1</input><input type="%n">10<` +
        `/input></inputs></block-definition><block-definition s="%#1" type="p` +
        `redicate" category="operators" selector="reportVariadicEquals" primi` +
        `tive="reportVariadicEquals"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%mult%s" readonly="true" sep` +
        `arator="=" collapse="all =" initial="2"></input></inputs></block-def` +
        `inition><block-definition s="%#1" type="predicate" category="operato` +
        `rs" selector="reportVariadicNotEquals" primitive="reportVariadicNotE` +
        `quals"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true" separator="≠" collapse="` +
        `neighbors ≠" initial="2"></input></inputs></block-definition><block-` +
        `definition s="%#1" type="predicate" category="operators" selector="r` +
        `eportVariadicLessThan" primitive="reportVariadicLessThan"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%mult%s" readonly="true" separator="&lt;" collapse="all &lt;" init` +
        `ial="2"></input></inputs></block-definition><block-definition s="%#1` +
        `" type="predicate" category="operators" selector="reportVariadicLess` +
        `ThanOrEquals" primitive="reportVariadicLessThanOrEquals"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%mult%s" readonly="true" separator="≤" collapse="all ≤" initial="2"` +
        `></input></inputs></block-definition><block-definition s="%#1" type=` +
        `"predicate" category="operators" selector="reportVariadicGreaterThan` +
        `" primitive="reportVariadicGreaterThan"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%mult%s" readonl` +
        `y="true" separator="&gt;" collapse="all &gt;" initial="2"></input></` +
        `inputs></block-definition><block-definition s="%#1" type="predicate"` +
        ` category="operators" selector="reportVariadicGreaterThanOrEquals" p` +
        `rimitive="reportVariadicGreaterThanOrEquals"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%mult%s" re` +
        `adonly="true" separator="≥" collapse="all ≥" initial="2"></input></i` +
        `nputs></block-definition><block-definition s="%#1" type="predicate" ` +
        `category="operators" selector="reportVariadicAnd" primitive="reportV` +
        `ariadicAnd"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%mult%b" readonly="true" separator="and" col` +
        `lapse="all" initial="2"></input></inputs></block-definition><block-d` +
        `efinition s="%#1" type="predicate" category="operators" selector="re` +
        `portVariadicOr" primitive="reportVariadicOr"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%mult%b" re` +
        `adonly="true" separator="or" collapse="any" initial="2"></input></in` +
        `puts></block-definition><block-definition s="not %&apos;bool&apos;" ` +
        `type="predicate" category="operators" selector="reportNot" primitive` +
        `="reportNot"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%b" readonly="true"></input><input type="%b` +
        `" readonly="true"></input></inputs><script><block s="doReport"><bloc` +
        `k s="reportIfElse"><block var="bool"/><block s="reportBoolean"><l><b` +
        `ool>false</bool></l></block><block s="reportBoolean"><l><bool>true</` +
        `bool></l></block></block></block></script><scripts><script x="10" y=` +
        `"98"><block s="doReport"><block s="reportIfElse"><block var="bool"/>` +
        `<block s="reportBoolean"><l><bool>false</bool></l></block><block s="` +
        `reportBoolean"><l><bool>true</bool></l></block></block></block></scr` +
        `ipt></scripts></block-definition><block-definition s="%#1" type="pre` +
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
        `ory="operators" selector="reportLetter" primitive="reportLetter"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%n">1<options>1=1&#xD;last&#xD;random</options></input><inp` +
        `ut type="%s">world</input><input type="%n">1<options>1=1&#xD;last&#x` +
        `D;random</options></input><input type="%s">world</input></inputs><sc` +
        `ript><block s="doReport"><block s="reportHyperZip"><block s="reifyRe` +
        `porter"><autolambda><block s="reportListItem"><l></l><block s="repor` +
        `tTextSplit"><l></l><l><option>letter</option></l></block></block></a` +
        `utolambda><list></list></block><block var="idx"/><l>0</l><block var=` +
        `"text"/><l>0</l></block></block></script><scripts><script x="10" y="` +
        `98"><block s="doReport"><block s="reportHyperZip"><block s="reifyRep` +
        `orter"><autolambda><block s="reportListItem"><l></l><block s="report` +
        `TextSplit"><l></l><l><option>letter</option></l></block></block></au` +
        `tolambda><list></list></block><block var="idx"/><l>0</l><block var="` +
        `text"/><l>0</l></block></block></script></scripts></block-definition` +
        `><block-definition s="length of %#1" type="reporter" category="opera` +
        `tors" selector="reportStringSize" primitive="reportStringSize"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s">world</input></inputs></block-definition><block-definitio` +
        `n s="%#1 of text %#2" type="reporter" category="operators" selector=` +
        `"reportTextAttribute" primitive="reportTextAttribute"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true" irreplaceable="true">length<options>length&#xD;low` +
        `er case&#xD;upper case</options></input><input type="%s">world</inpu` +
        `t></inputs></block-definition><block-definition s="unicode of %#1" t` +
        `ype="reporter" category="operators" selector="reportUnicode" primiti` +
        `ve="reportUnicode"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s">a</input></inputs></block-definit` +
        `ion><block-definition s="unicode %#1 as letter" type="reporter" cate` +
        `gory="operators" selector="reportUnicodeAsLetter" primitive="reportU` +
        `nicodeAsLetter"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">65</input></inputs></block-definitio` +
        `n><block-definition s="is %#1 a %#2 ?" type="predicate" category="op` +
        `erators" selector="reportIsA" primitive="reportIsA"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s">` +
        `5</input><input type="%s" readonly="true" irreplaceable="true">numbe` +
        `r<options>§_typesMenu</options></input></inputs></block-definition><` +
        `block-definition s="is %#1 ?" type="predicate" category="operators" ` +
        `selector="reportVariadicIsIdentical" primitive="reportVariadicIsIden` +
        `tical"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%mult%s" readonly="true" separator="identical to"` +
        ` collapse="all identical" initial="2"></input></inputs></block-defin` +
        `ition><block-definition s="split %#1 by %#2" type="reporter" categor` +
        `y="operators" selector="reportTextSplit" primitive="reportTextSplit"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s">hello world</input><input type="%s"> <options>lette` +
        `r&#xD;word&#xD;line&#xD;tab&#xD;cr&#xD;csv&#xD;json&#xD;&#126;&#xD;b` +
        `locks</options></input></inputs></block-definition><block-definition` +
        ` s="JavaScript function ( %#1 ) { %#2 }" type="reporter" category="o` +
        `perators" selector="reportJSFunction" primitive="reportJSFunction"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%mult%s" readonly="true"></input><input type="%mlt"></inp` +
        `ut></inputs></block-definition><block-definition s="type of %#1" typ` +
        `e="reporter" category="operators" selector="reportTypeOf" primitive=` +
        `"reportTypeOf"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s">5</input></inputs></block-definition>` +
        `<block-definition s="%#1 of %#2" type="reporter" category="operators` +
        `" selector="reportTextFunction" primitive="reportTextFunction"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s" readonly="true" irreplaceable="true">encode URI<options>e` +
        `ncode URI&#xD;decode URI&#xD;encode URI component&#xD;decode URI com` +
        `ponent&#xD;XML escape&#xD;XML unescape&#xD;JS escape&#xD;hex sha512 ` +
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
        `s></block-definition><block-definition s="script variables %#1" type` +
        `="command" category="other" selector="doDeclareVariables" primitive=` +
        `"doDeclareVariables"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%scriptVars" readonly="true" irrepl` +
        `aceable="true" initial="1" min="1"></input></inputs></block-definiti` +
        `on><block-definition s="inherit %#1" type="command" category="variab` +
        `les" selector="doDeleteAttr" primitive="doDeleteAttr"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true"><options>§_shadowedVariablesMenu</options></input>` +
        `</inputs></block-definition><block-definition s="list %&apos;inputs&` +
        `apos;" type="reporter" category="lists" selector="reportNewList" pri` +
        `mitive="reportNewList"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%mult%s" readonly="true" irreplac` +
        `eable="true" initial="1"></input><input type="%mult%s" readonly="tru` +
        `e" irreplaceable="true" initial="1"></input></inputs><script><block ` +
        `s="doReport"><block var="inputs"/></block></script><scripts><script ` +
        `x="10" y="98"><block s="doReport"><block var="inputs"/></block></scr` +
        `ipt></scripts></block-definition><block-definition s="%#1 in front o` +
        `f %#2" type="reporter" category="lists" selector="reportCONS" primit` +
        `ive="reportCONS"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s"></input><input type="%l" readonly="` +
        `true"></input></inputs></block-definition><block-definition s="item ` +
        `%#1 of %#2" type="reporter" category="lists" selector="reportListIte` +
        `m" primitive="reportListItem"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">1<options>1=1&#xD;last` +
        `&#xD;random</options></input><input type="%l" readonly="true"></inpu` +
        `t></inputs></block-definition><block-definition s="all but first of ` +
        `%#1" type="reporter" category="lists" selector="reportCDR" primitive` +
        `="reportCDR"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%l" readonly="true"></input></inputs></bloc` +
        `k-definition><block-definition s="length of %#1" type="reporter" cat` +
        `egory="lists" selector="reportListLength" primitive="reportListLengt` +
        `h"><header></header><code></code><translations></translations><input` +
        `s><input type="%l" readonly="true"></input></inputs></block-definiti` +
        `on><block-definition s="%#1 of %#2" type="reporter" category="lists"` +
        ` selector="reportListAttribute" primitive="reportListAttribute"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true" irreplaceable="true">length<options>leng` +
        `th&#xD;rank&#xD;dimensions&#xD;flatten&#xD;columns&#xD;uniques&#xD;d` +
        `istribution&#xD;sorted&#xD;shuffled&#xD;reverse&#xD;&#126;&#xD;lines` +
        `&#xD;csv&#xD;json</options></input><input type="%l" readonly="true">` +
        `</input></inputs></block-definition><block-definition s="%&apos;data` +
        `&apos; contains %&apos;value&apos;" type="predicate" category="lists` +
        `" selector="reportListContainsItem" primitive="reportListContainsIte` +
        `m"><header></header><code></code><translations></translations><input` +
        `s><input type="%l" readonly="true"></input><input type="%s">thing</i` +
        `nput><input type="%l" readonly="true"></input><input type="%s">thing` +
        `</input></inputs><script><block s="doWarp"><script><block s="doFor">` +
        `<l>i</l><l>1</l><block s="reportListAttribute"><l><option>length</op` +
        `tion></l><block var="data"/></block><script><block s="doIf"><block s` +
        `="reportVariadicEquals"><list><block s="reportListItem"><block var="` +
        `i"/><block var="data"/></block><block var="value"/></list></block><s` +
        `cript><block s="doReport"><block s="reportBoolean"><l><bool>true</bo` +
        `ol></l></block></block></script><list></list></block></script></bloc` +
        `k></script></block><block s="doReport"><block s="reportBoolean"><l><` +
        `bool>false</bool></l></block></block></script><scripts><script x="10` +
        `" y="98"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l>` +
        `<block s="reportListAttribute"><l><option>length</option></l><block ` +
        `var="data"/></block><script><block s="doIf"><block s="reportVariadic` +
        `Equals"><list><block s="reportListItem"><block var="i"/><block var="` +
        `data"/></block><block var="value"/></list></block><script><block s="` +
        `doReport"><block s="reportBoolean"><l><bool>true</bool></l></block><` +
        `/block></script><list></list></block></script></block></script></blo` +
        `ck><block s="doReport"><block s="reportBoolean"><l><bool>false</bool` +
        `></l></block></block></script></scripts></block-definition><block-de` +
        `finition s="is %&apos;data&apos; empty?" type="predicate" category="` +
        `lists" selector="reportListIsEmpty" primitive="reportListIsEmpty"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%l" readonly="true"></input><input type="%l" readonly="tru` +
        `e"></input></inputs><script><block s="doReport"><block s="reportVari` +
        `adicEquals"><list><block var="data"/><block s="reportNewList"><list>` +
        `</list></block></list></block></block></script><scripts><script x="1` +
        `0" y="98"><block s="doReport"><block s="reportVariadicEquals"><list>` +
        `<block var="data"/><block s="reportNewList"><list></list></block></l` +
        `ist></block></block></script></scripts></block-definition><block-def` +
        `inition s="index of %&apos;value&apos; in %&apos;data&apos;" type="r` +
        `eporter" category="lists" selector="reportListIndex" primitive="repo` +
        `rtListIndex"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s">thing</input><input type="%l" readonly=` +
        `"true"></input><input type="%s">thing</input><input type="%l" readon` +
        `ly="true"></input></inputs><script><block s="doWarp"><script><block ` +
        `s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>` +
        `length</option></l><block var="data"/></block><script><block s="doIf` +
        `"><block s="reportVariadicEquals"><list><block s="reportListItem"><b` +
        `lock var="i"/><block var="data"/></block><block var="value"/></list>` +
        `</block><script><block s="doReport"><block var="i"/></block></script` +
        `><list></list></block></script></block></script></block><block s="do` +
        `Report"><l>0</l></block></script><scripts><script x="10" y="98"><blo` +
        `ck s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="rep` +
        `ortListAttribute"><l><option>length</option></l><block var="data"/><` +
        `/block><script><block s="doIf"><block s="reportVariadicEquals"><list` +
        `><block s="reportListItem"><block var="i"/><block var="data"/></bloc` +
        `k><block var="value"/></list></block><script><block s="doReport"><bl` +
        `ock var="i"/></block></script><list></list></block></script></block>` +
        `</script></block><block s="doReport"><l>0</l></block></script></scri` +
        `pts></block-definition><block-definition s="add %#1 to %#2" type="co` +
        `mmand" category="lists" selector="doAddToList" primitive="doAddToLis` +
        `t"><header></header><code></code><translations></translations><input` +
        `s><input type="%s">thing</input><input type="%l" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="delete %#1 of ` +
        `%#2" type="command" category="lists" selector="doDeleteFromList" pri` +
        `mitive="doDeleteFromList"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">1<options>1=1&#xD;last&#xD` +
        `;&#126;&#xD;all</options></input><input type="%l" readonly="true"></` +
        `input></inputs></block-definition><block-definition s="insert %#1 at` +
        ` %#2 of %#3" type="command" category="lists" selector="doInsertInLis` +
        `t" primitive="doInsertInList"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s">thing</input><input ty` +
        `pe="%n">1<options>1=1&#xD;last&#xD;random</options></input><input ty` +
        `pe="%l" readonly="true"></input></inputs></block-definition><block-d` +
        `efinition s="replace item %#1 of %#2 with %#3" type="command" catego` +
        `ry="lists" selector="doReplaceInList" primitive="doReplaceInList"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">1<options>1=1&#xD;last&#xD;random</options></input><in` +
        `put type="%l" readonly="true"></input><input type="%s">thing</input>` +
        `</inputs></block-definition><block-definition s="numbers from %&apos` +
        `;start&apos; to %&apos;end&apos;" type="reporter" category="lists" s` +
        `elector="reportNumbers" primitive="reportNumbers"><header></header><` +
        `code></code><translations></translations><inputs><input type="%n">1<` +
        `/input><input type="%n">10</input><input type="%n">1</input><input t` +
        `ype="%n">10</input></inputs><script><block s="doReport"><block s="re` +
        `portHyperZip"><block s="reifyReporter"><script><block s="doDeclareVa` +
        `riables"><list><l>result</l></list></block><block s="doSetVar"><l>re` +
        `sult</l><block s="reportNewList"><list></list></block></block><block` +
        ` s="doWarp"><script><block s="doFor"><l>i</l><l></l><l></l><script><` +
        `block s="doAddToList"><block var="i"/><block var="result"/></block><` +
        `/script></block></script></block><block s="doReport"><block var="res` +
        `ult"/></block></script><list></list></block><block var="start"/><l>0` +
        `</l><block var="end"/><l>0</l></block></block></script><scripts><scr` +
        `ipt x="10" y="98"><block s="doReport"><block s="reportHyperZip"><blo` +
        `ck s="reifyReporter"><script><block s="doDeclareVariables"><list><l>` +
        `result</l></list></block><block s="doSetVar"><l>result</l><block s="` +
        `reportNewList"><list></list></block></block><block s="doWarp"><scrip` +
        `t><block s="doFor"><l>i</l><l></l><l></l><script><block s="doAddToLi` +
        `st"><block var="i"/><block var="result"/></block></script></block></` +
        `script></block><block s="doReport"><block var="result"/></block></sc` +
        `ript><list></list></block><block var="start"/><l>0</l><block var="en` +
        `d"/><l>0</l></block></block></script></scripts></block-definition><b` +
        `lock-definition s="append %&apos;lists&apos;" type="reporter" catego` +
        `ry="lists" selector="reportConcatenatedLists" primitive="reportConca` +
        `tenatedLists"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%mult%l" readonly="true" initial="2"></inp` +
        `ut><input type="%mult%l" readonly="true" initial="2"></input></input` +
        `s><script><block s="doDeclareVariables"><list><l>result</l></list></` +
        `block><block s="doSetVar"><l>result</l><block s="reportNewList"><lis` +
        `t></list></block></block><block s="doWarp"><script><block s="doForEa` +
        `ch"><l>list</l><block var="lists"/><script><block s="doForEach"><l>i` +
        `tem</l><block var="list"/><script><block s="doAddToList"><block var=` +
        `"item"/><block var="result"/></block></script></block></script></blo` +
        `ck></script></block><block s="doReport"><block var="result"/></block` +
        `></script><scripts><script x="10" y="98"><block s="doDeclareVariable` +
        `s"><list><l>result</l></list></block><block s="doSetVar"><l>result</` +
        `l><block s="reportNewList"><list></list></block></block><block s="do` +
        `Warp"><script><block s="doForEach"><l>list</l><block var="lists"/><s` +
        `cript><block s="doForEach"><l>item</l><block var="list"/><script><bl` +
        `ock s="doAddToList"><block var="item"/><block var="result"/></block>` +
        `</script></block></script></block></script></block><block s="doRepor` +
        `t"><block var="result"/></block></script></scripts></block-definitio` +
        `n><block-definition s="combinations %&apos;lists&apos;" type="report` +
        `er" category="lists" selector="reportCrossproduct" primitive="report` +
        `Crossproduct"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%mult%l" readonly="true" initial="2"></inp` +
        `ut><input type="%mult%l" readonly="true" initial="2"></input></input` +
        `s><script><block s="doReport"><block s="reportIfElse"><block s="repo` +
        `rtListIsEmpty"><block var="lists"/></block><block s="reportNewList">` +
        `<list><block s="reportNewList"><list></list></block></list></block><` +
        `block s="reportConcatenatedLists"><block s="reportMap"><block s="rei` +
        `fyReporter"><autolambda><block s="reportMap"><block s="reifyReporter` +
        `"><autolambda><block s="reportCONS"><block var="first"/><l/></block>` +
        `</autolambda><list></list></block><block s="reportCrossproduct"><blo` +
        `ck s="reportCDR"><block var="lists"/></block></block></block></autol` +
        `ambda><list><l>first</l></list></block><block s="reportListItem"><l>` +
        `1</l><block var="lists"/></block></block></block></block></block></s` +
        `cript><scripts><script x="10" y="98"><block s="doReport"><block s="r` +
        `eportIfElse"><block s="reportListIsEmpty"><block var="lists"/></bloc` +
        `k><block s="reportNewList"><list><block s="reportNewList"><list></li` +
        `st></block></list></block><block s="reportConcatenatedLists"><block ` +
        `s="reportMap"><block s="reifyReporter"><autolambda><block s="reportM` +
        `ap"><block s="reifyReporter"><autolambda><block s="reportCONS"><bloc` +
        `k var="first"/><l/></block></autolambda><list></list></block><block ` +
        `s="reportCrossproduct"><block s="reportCDR"><block var="lists"/></bl` +
        `ock></block></block></autolambda><list><l>first</l></list></block><b` +
        `lock s="reportListItem"><l>1</l><block var="lists"/></block></block>` +
        `</block></block></block></script></scripts></block-definition><block` +
        `-definition s="transpose %#1" type="reporter" category="lists" selec` +
        `tor="reportTranspose" primitive="reportTranspose"><header></header><` +
        `code></code><translations></translations><inputs><input type="%l" re` +
        `adonly="true"></input></inputs></block-definition><block-definition ` +
        `s="reshape %#1 to %#2" type="reporter" category="lists" selector="re` +
        `portReshape" primitive="reportReshape"><header></header><code></code` +
        `><translations></translations><inputs><input type="%s"></input><inpu` +
        `t type="%mult%n" readonly="true" initial="2">4,3</input></inputs></b` +
        `lock-definition><block-definition s="map %&apos;ring&apos; over %&ap` +
        `os;data&apos;" type="reporter" category="lists" selector="reportMap"` +
        ` primitive="reportMap"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%repRing" readonly="true" irrepla` +
        `ceable="true"></input><input type="%l" readonly="true"></input><inpu` +
        `t type="%repRing" readonly="true" irreplaceable="true"></input><inpu` +
        `t type="%l" readonly="true"></input></inputs><script><block s="doDec` +
        `lareVariables"><list><l>result</l><l>implicit?</l></list></block><bl` +
        `ock s="doSetVar"><l>result</l><block s="reportNewList"><list></list>` +
        `</block></block><block s="doSetVar"><l>implicit?</l><block s="report` +
        `ListIsEmpty"><block s="reportAttributeOf"><l><option>input names</op` +
        `tion></l><block var="ring"/></block></block></block><block s="doWarp` +
        `"><script><block s="doFor"><l>i</l><l>1</l><block s="reportListAttri` +
        `bute"><l><option>length</option></l><block var="data"/></block><scri` +
        `pt><block s="doAddToList"><block s="evaluate"><block var="ring"/><bl` +
        `ock s="reportIfElse"><block var="implicit?"/><block s="reportNewList` +
        `"><list><block s="reportListItem"><block var="i"/><block var="data"/` +
        `></block></list></block><block s="reportNewList"><list><block s="rep` +
        `ortListItem"><block var="i"/><block var="data"/></block><block var="` +
        `i"/><block var="data"/></list></block></block></block><block var="re` +
        `sult"/></block></script></block></script></block><block s="doReport"` +
        `><block var="result"/></block></script><scripts><script x="10" y="98` +
        `"><block s="doDeclareVariables"><list><l>result</l><l>implicit?</l><` +
        `/list></block><block s="doSetVar"><l>result</l><block s="reportNewLi` +
        `st"><list></list></block></block><block s="doSetVar"><l>implicit?</l` +
        `><block s="reportListIsEmpty"><block s="reportAttributeOf"><l><optio` +
        `n>input names</option></l><block var="ring"/></block></block></block` +
        `><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s` +
        `="reportListAttribute"><l><option>length</option></l><block var="dat` +
        `a"/></block><script><block s="doAddToList"><block s="evaluate"><bloc` +
        `k var="ring"/><block s="reportIfElse"><block var="implicit?"/><block` +
        ` s="reportNewList"><list><block s="reportListItem"><block var="i"/><` +
        `block var="data"/></block></list></block><block s="reportNewList"><l` +
        `ist><block s="reportListItem"><block var="i"/><block var="data"/></b` +
        `lock><block var="i"/><block var="data"/></list></block></block></blo` +
        `ck><block var="result"/></block></script></block></script></block><b` +
        `lock s="doReport"><block var="result"/></block></script></scripts></` +
        `block-definition><block-definition s="$blitz map %#1 over %#2" type=` +
        `"reporter" category="lists" selector="reportAtomicMap" primitive="re` +
        `portAtomicMap"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%repRing" readonly="true" irreplaceable="` +
        `true"></input><input type="%l" readonly="true"></input></inputs></bl` +
        `ock-definition><block-definition s="keep items %&apos;ring&apos; fro` +
        `m %&apos;data&apos;" type="reporter" category="lists" selector="repo` +
        `rtKeep" primitive="reportKeep"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%predRing" readonly="true` +
        `" irreplaceable="true"></input><input type="%l" readonly="true"></in` +
        `put><input type="%predRing" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%l" readonly="true"></input></inputs><script><bloc` +
        `k s="doDeclareVariables"><list><l>result</l><l>implicit?</l></list><` +
        `/block><block s="doSetVar"><l>result</l><block s="reportNewList"><li` +
        `st></list></block></block><block s="doSetVar"><l>implicit?</l><block` +
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
        `ock s="doAddToList"><block s="reportListItem"><block var="i"/><block` +
        ` var="data"/></block><block var="result"/></block></script><list></l` +
        `ist></block></script></block></script></block><block s="doReport"><b` +
        `lock var="result"/></block></script><scripts><script x="10" y="98"><` +
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
        `"><block var="result"/></block></script></scripts></block-definition` +
        `><block-definition s="$blitz keep items %#1 from %#2" type="reporter` +
        `" category="lists" selector="reportAtomicKeep" primitive="reportAtom` +
        `icKeep"><header></header><code></code><translations></translations><` +
        `inputs><input type="%predRing" readonly="true" irreplaceable="true">` +
        `</input><input type="%l" readonly="true"></input></inputs></block-de` +
        `finition><block-definition s="find first item %&apos;ring&apos; in %` +
        `&apos;data&apos;" type="reporter" category="lists" selector="reportF` +
        `indFirst" primitive="reportFindFirst"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%predRing" readonl` +
        `y="true" irreplaceable="true"></input><input type="%l" readonly="tru` +
        `e"></input><input type="%predRing" readonly="true" irreplaceable="tr` +
        `ue"></input><input type="%l" readonly="true"></input></inputs><scrip` +
        `t><block s="doDeclareVariables"><list><l>implicit?</l></list></block` +
        `><block s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty"><b` +
        `lock s="reportAttributeOf"><l><option>input names</option></l><block` +
        ` var="ring"/></block></block></block><block s="doWarp"><script><bloc` +
        `k s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><optio` +
        `n>length</option></l><block var="data"/></block><script><block s="do` +
        `If"><block s="evaluate"><block var="ring"/><block s="reportIfElse"><` +
        `block var="implicit?"/><block s="reportNewList"><list><block s="repo` +
        `rtListItem"><block var="i"/><block var="data"/></block></list></bloc` +
        `k><block s="reportNewList"><list><block s="reportListItem"><block va` +
        `r="i"/><block var="data"/></block><block var="i"/><block var="data"/` +
        `></list></block></block></block><script><block s="doReport"><block s` +
        `="reportListItem"><block var="i"/><block var="data"/></block></block` +
        `></script><list></list></block></script></block></script></block><bl` +
        `ock s="doReport"><l></l></block></script><scripts><script x="10" y="` +
        `98"><block s="doDeclareVariables"><list><l>implicit?</l></list></blo` +
        `ck><block s="doSetVar"><l>implicit?</l><block s="reportListIsEmpty">` +
        `<block s="reportAttributeOf"><l><option>input names</option></l><blo` +
        `ck var="ring"/></block></block></block><block s="doWarp"><script><bl` +
        `ock s="doFor"><l>i</l><l>1</l><block s="reportListAttribute"><l><opt` +
        `ion>length</option></l><block var="data"/></block><script><block s="` +
        `doIf"><block s="evaluate"><block var="ring"/><block s="reportIfElse"` +
        `><block var="implicit?"/><block s="reportNewList"><list><block s="re` +
        `portListItem"><block var="i"/><block var="data"/></block></list></bl` +
        `ock><block s="reportNewList"><list><block s="reportListItem"><block ` +
        `var="i"/><block var="data"/></block><block var="i"/><block var="data` +
        `"/></list></block></block></block><script><block s="doReport"><block` +
        ` s="reportListItem"><block var="i"/><block var="data"/></block></blo` +
        `ck></script><list></list></block></script></block></script></block><` +
        `block s="doReport"><l></l></block></script></scripts></block-definit` +
        `ion><block-definition s="$blitz find first item %#1 in %#2" type="re` +
        `porter" category="lists" selector="reportAtomicFindFirst" primitive=` +
        `"reportAtomicFindFirst"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%predRing" readonly="true" irrep` +
        `laceable="true"></input><input type="%l" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="combine %&apos;data&ap` +
        `os; using %&apos;ring&apos;" type="reporter" category="lists" select` +
        `or="reportCombine" primitive="reportCombine"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%l" readonl` +
        `y="true"></input><input type="%repRing" readonly="true" irreplaceabl` +
        `e="true"></input><input type="%l" readonly="true"></input><input typ` +
        `e="%repRing" readonly="true" irreplaceable="true"></input></inputs><` +
        `script><block s="doIf"><block s="reportListIsEmpty"><block var="data` +
        `"/></block><script><block s="doReport"><l>0</l></block></script><lis` +
        `t><block s="reportVariadicEquals"><list><block s="reportListAttribut` +
        `e"><l><option>length</option></l><block var="data"/></block><l>1</l>` +
        `</list></block><script><block s="doReport"><block s="reportListItem"` +
        `><l>1</l><block var="data"/></block></block></script></list></block>` +
        `<block s="doReport"><block s="evaluate"><block var="ring"/><list><bl` +
        `ock s="reportListItem"><l>1</l><block var="data"/></block><block s="` +
        `evaluate"><block s="reportEnvironment"><l><option>script</option></l` +
        `></block><list><block s="reportCDR"><block var="data"/></block><bloc` +
        `k var="ring"/></list></block></list></block></block></script><script` +
        `s><script x="10" y="98"><block s="doIf"><block s="reportListIsEmpty"` +
        `><block var="data"/></block><script><block s="doReport"><l>0</l></bl` +
        `ock></script><list><block s="reportVariadicEquals"><list><block s="r` +
        `eportListAttribute"><l><option>length</option></l><block var="data"/` +
        `></block><l>1</l></list></block><script><block s="doReport"><block s` +
        `="reportListItem"><l>1</l><block var="data"/></block></block></scrip` +
        `t></list></block><block s="doReport"><block s="evaluate"><block var=` +
        `"ring"/><list><block s="reportListItem"><l>1</l><block var="data"/><` +
        `/block><block s="evaluate"><block s="reportEnvironment"><l><option>s` +
        `cript</option></l></block><list><block s="reportCDR"><block var="dat` +
        `a"/></block><block var="ring"/></list></block></list></block></block` +
        `></script></scripts></block-definition><block-definition s="$blitz c` +
        `ombine %#1 using %#2" type="reporter" category="lists" selector="rep` +
        `ortAtomicCombine" primitive="reportAtomicCombine"><header></header><` +
        `code></code><translations></translations><inputs><input type="%l" re` +
        `adonly="true"></input><input type="%repRing" readonly="true" irrepla` +
        `ceable="true"></input></inputs></block-definition><block-definition ` +
        `s="for each %&apos;item&apos; in %&apos;data&apos; %&apos;action&apo` +
        `s;" type="command" category="lists" selector="doForEach" primitive="` +
        `doForEach"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%upvar" readonly="true" irreplaceable="true">` +
        `item</input><input type="%l" readonly="true"></input><input type="%l` +
        `oop" readonly="true" irreplaceable="true"></input><input type="%upva` +
        `r" readonly="true" irreplaceable="true">item</input><input type="%l"` +
        ` readonly="true"></input><input type="%loop" readonly="true" irrepla` +
        `ceable="true"></input></inputs><script><block s="doReport"><block s=` +
        `"reportMap"><block s="reifyReporter"><script><block s="doSetVar"><l>` +
        `item</l><l></l></block><block s="doRun"><block var="action"/><list><` +
        `/list></block><block s="doReport"><l>0</l></block></script><list></l` +
        `ist></block><block var="data"/></block></block></script><scripts><sc` +
        `ript x="10" y="98"><block s="doReport"><block s="reportMap"><block s` +
        `="reifyReporter"><script><block s="doSetVar"><l>item</l><l></l></blo` +
        `ck><block s="doRun"><block var="action"/><list></list></block><block` +
        ` s="doReport"><l>0</l></block></script><list></list></block><block v` +
        `ar="data"/></block></block></script></scripts></block-definition><bl` +
        `ock-definition s="show table %#1" type="command" category="lists" se` +
        `lector="doShowTable" primitive="doShowTable"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%l" readonl` +
        `y="true"></input></inputs></block-definition><block-definition s="ma` +
        `p %#1 to %#2 %#3" type="command" category="other" selector="doMapCod` +
        `eOrHeader" primitive="doMapCodeOrHeader"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%cmdRing" reado` +
        `nly="true"></input><input type="%s" readonly="true">code<options>cod` +
        `e&#xD;header</options></input><input type="%mlt"></input></inputs></` +
        `block-definition><block-definition s="map %#1 to code %#2" type="com` +
        `mand" category="other" selector="doMapValueCode" primitive="doMapVal` +
        `ueCode"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true">String<` +
        `options>String&#xD;Number&#xD;true&#xD;false</options></input><input` +
        ` type="%mlt">&lt;#1&gt;</input></inputs></block-definition><block-de` +
        `finition s="map %#1 of %#2 to code %#3" type="command" category="oth` +
        `er" selector="doMapListCode" primitive="doMapListCode"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `s" readonly="true"><options>list&#xD;item&#xD;delimiter</options></i` +
        `nput><input type="%s" readonly="true"><options>collection&#xD;variab` +
        `les&#xD;parameters</options></input><input type="%mlt"></input></inp` +
        `uts></block-definition><block-definition s="code of %#1" type="repor` +
        `ter" category="other" selector="reportMappedCode" primitive="reportM` +
        `appedCode"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%cmdRing" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="primitive %#1" type="command" ` +
        `category="other" selector="doPrimitive" primitive="doPrimitive"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s" readonly="true" irreplaceable="true"><options>§_primitiv` +
        `esMenu</options></input></inputs></block-definition><block-definitio` +
        `n s="extension %#1 %#2" type="command" category="other" selector="do` +
        `ApplyExtension" primitive="doApplyExtension"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true"><options>§_extensionsMenu</options></i` +
        `nput><input type="%mult%s" readonly="true"></input></inputs></block-` +
        `definition><block-definition s="extension %#1 %#2" type="reporter" c` +
        `ategory="other" selector="reportApplyExtension" primitive="reportApp` +
        `lyExtension"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%s" readonly="true" irreplaceable="true"><o` +
        `ptions>§_extensionsMenu</options></input><input type="%mult%s" reado` +
        `nly="true"></input></inputs></block-definition><block-definition s="` +
        `set video transparency to %#1" type="command" category="sensing" sel` +
        `ector="doSetVideoTransparency" primitive="doSetVideoTransparency"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">50</input></inputs></block-definition><block-definitio` +
        `n s="video %#1 on %#2" type="reporter" category="sensing" selector="` +
        `reportVideo" primitive="reportVideo"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">motion<options>snap&#xD;motion&#xD;direction</` +
        `options></input><input type="%s" readonly="true">myself<options>§_ob` +
        `jectsMenuWithSelf</options></input></inputs></block-definition></pri` +
        `mitives></blocks>`,
        this.stage
    );
};
