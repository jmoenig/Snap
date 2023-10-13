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

modules.stdlib = '2023-October-13';

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
        `="%n">10</input><input type="%n">10</input><input type="%n">10</inpu` +
        `t></inputs><script><block s="doGotoObject"><block s="reportVariadicS` +
        `um"><list><block s="getPosition"></block><block s="reportVariadicPro` +
        `duct"><list><block s="reportNewList"><list><block s="reportMonadic">` +
        `<l><option>sin</option></l><block s="direction"></block></block><blo` +
        `ck s="reportMonadic"><l><option>cos</option></l><block s="direction"` +
        `></block></block></list></block><block var="steps"/></list></block><` +
        `/list></block></block></script></block-definition><block-definition ` +
        `s="turn $clockwise %&apos;angle&apos; degrees" type="command" catego` +
        `ry="motion" selector="turn"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%n">15</input><input type="%` +
        `n">15</input><input type="%n">15</input></inputs><script><block s="s` +
        `etHeading"><block s="reportVariadicSum"><list><block s="direction"><` +
        `/block><block var="angle"/></list></block></block></script></block-d` +
        `efinition><block-definition s="turn $counterclockwise %&apos;angle&a` +
        `pos; degrees" type="command" category="motion" selector="turnLeft"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">15</input><input type="%n">15</input><input type="%n"` +
        `>15</input></inputs><script><block s="setHeading"><block s="reportDi` +
        `fference"><block s="direction"></block><block var="angle"/></block><` +
        `/block></script></block-definition><block-definition s="point in dir` +
        `ection %&apos;angle&apos;" type="command" category="motion" selector` +
        `="setHeading"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n">90<options>§_dir=&#xD;(90) right=90&#x` +
        `D;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</options` +
        `></input><input type="%n">90<options>§_dir=&#xD;(90) right=90&#xD;(-` +
        `90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</options></i` +
        `nput><input type="%n">90<options>§_dir=&#xD;(90) right=90&#xD;(-90) ` +
        `left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</options></input` +
        `></inputs><script><block s="doFaceTowards"><block s="reportVariadicS` +
        `um"><list><block s="getPosition"></block><block s="reportNewList"><l` +
        `ist><block s="reportMonadic"><l><option>sin</option></l><block var="` +
        `angle"/></block><block s="reportMonadic"><l><option>cos</option></l>` +
        `<block var="angle"/></block></list></block></list></block></block></` +
        `script></block-definition><block-definition s="point towards %#1" ty` +
        `pe="command" category="motion" selector="doFaceTowards" primitive="d` +
        `oFaceTowards"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true">mouse-pointer<options>` +
        `§_destinationsMenu</options></input></inputs></block-definition><blo` +
        `ck-definition s="go to x: %&apos;x&apos; y: %&apos;y&apos;" type="co` +
        `mmand" category="motion" selector="gotoXY"><header></header><code></` +
        `code><translations></translations><inputs><input type="%n">0</input>` +
        `<input type="%n">0</input><input type="%n">0</input><input type="%n"` +
        `>0</input><input type="%n">0</input></inputs><script><block s="doGot` +
        `oObject"><block s="reportNewList"><list><block var="x"/><block var="` +
        `y"/></list></block></block></script></block-definition><block-defini` +
        `tion s="go to %#1" type="command" category="motion" selector="doGoto` +
        `Object" primitive="doGotoObject"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true">ran` +
        `dom position<options>§_destinationsMenu</options></input></inputs></` +
        `block-definition><block-definition s="glide %&apos;span&apos; secs t` +
        `o x: %&apos;x&apos; y: %&apos;y&apos;" type="command" category="moti` +
        `on" selector="doGlide"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">1</input><input type="%n">0</` +
        `input><input type="%n">0</input><input type="%n">1</input><input typ` +
        `e="%n">0</input><input type="%n">0</input><input type="%n">0</input>` +
        `</inputs><script><block s="doDeclareVariables"><list><l>pos</l><l>st` +
        `art</l><l>fract</l></list></block><block s="doSetVar"><l>pos</l><blo` +
        `ck s="getPosition"></block></block><block s="doSetVar"><l>start</l><` +
        `block s="reportDate"><l><option>time in milliseconds</option></l></b` +
        `lock></block><block s="doUntil"><block s="reportVariadicGreaterThanO` +
        `rEquals"><list><block var="fract"/><l>1</l></list></block><script><b` +
        `lock s="doSetVar"><l>fract</l><block s="reportQuotient"><block s="re` +
        `portDifference"><block s="reportDate"><l><option>time in millisecond` +
        `s</option></l></block><block var="start"/></block><block s="reportVa` +
        `riadicProduct"><list><block var="span"/><l>1000</l></list></block></` +
        `block></block><block s="doGotoObject"><block s="reportVariadicSum"><` +
        `list><block var="pos"/><block s="reportVariadicProduct"><list><block` +
        ` s="reportDifference"><block s="reportNewList"><list><block var="x"/` +
        `><block var="y"/></list></block><block var="pos"/></block><block var` +
        `="fract"/></list></block></list></block></block></script></block><bl` +
        `ock s="gotoXY"><block var="x"/><block var="y"/></block></script></bl` +
        `ock-definition><block-definition s="change x by %&apos;delta&apos;" ` +
        `type="command" category="motion" selector="changeXPosition"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">10</input><input type="%n">10</input><input type="%n">10</in` +
        `put></inputs><script><block s="setXPosition"><block s="reportVariadi` +
        `cSum"><list><block s="xPosition"></block><block var="delta"/></list>` +
        `</block></block></script></block-definition><block-definition s="set` +
        ` x to %&apos;x&apos;" type="command" category="motion" selector="set` +
        `XPosition"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">0</input><input type="%n">0</input><input` +
        ` type="%n">0</input></inputs><script><block s="doGotoObject"><block ` +
        `s="reportNewList"><list><block var="x"/><block s="yPosition"></block` +
        `></list></block></block></script></block-definition><block-definitio` +
        `n s="change y by %&apos;delta&apos;" type="command" category="motion` +
        `" selector="changeYPosition"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">10</input><input type="` +
        `%n">10</input><input type="%n">10</input></inputs><script><block s="` +
        `setYPosition"><block s="reportVariadicSum"><list><block s="yPosition` +
        `"></block><block var="delta"/></list></block></block></script></bloc` +
        `k-definition><block-definition s="set y to %&apos;y&apos;" type="com` +
        `mand" category="motion" selector="setYPosition"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">0</i` +
        `nput><input type="%n">0</input><input type="%n">0</input></inputs><s` +
        `cript><block s="doGotoObject"><block s="reportNewList"><list><block ` +
        `s="xPosition"></block><block var="y"/></list></block></block></scrip` +
        `t></block-definition><block-definition s="if on edge, bounce" type="` +
        `command" category="motion" selector="bounceOffEdge"><header></header` +
        `><code></code><translations></translations><inputs></inputs><script>` +
        `<block s="doIf"><block s="reportTouchingObject"><l><option>edge</opt` +
        `ion></l></block><script><block s="doDeclareVariables"><list><l>get b` +
        `ounds</l><l>bounds</l><l>center</l><l>stage bounds</l><l>dir x</l><l` +
        `>dir y</l><l>delta x</l><l>delta y</l></list></block><block s="doSet` +
        `Var"><l>get bounds</l><block s="reifyReporter"><autolambda><block s=` +
        `"reportNewList"><list><block s="reportVariadicMin"><block s="reportC` +
        `ONS"><block s="reportNewList"><list><block s="reportGet"><l><option>` +
        `left</option></l></block><block s="reportGet"><l><option>bottom</opt` +
        `ion></l></block></list></block><block s="reportMap"><block s="reifyR` +
        `eporter"><autolambda><block s="reportNewList"><list><block s="report` +
        `AttributeOf"><l><option>left</option></l><l></l></block><block s="re` +
        `portAttributeOf"><l><option>bottom</option></l><l></l></block></list` +
        `></block></autolambda><list></list></block><block s="reportGet"><l><` +
        `option>parts</option></l></block></block></block></block><block s="r` +
        `eportVariadicMax"><block s="reportCONS"><block s="reportNewList"><li` +
        `st><block s="reportGet"><l><option>right</option></l></block><block ` +
        `s="reportGet"><l><option>top</option></l></block></list></block><blo` +
        `ck s="reportMap"><block s="reifyReporter"><autolambda><block s="repo` +
        `rtNewList"><list><block s="reportAttributeOf"><l><option>right</opti` +
        `on></l><l></l></block><block s="reportAttributeOf"><l><option>top</o` +
        `ption></l><l></l></block></list></block></autolambda><list></list></` +
        `block><block s="reportGet"><l><option>parts</option></l></block></bl` +
        `ock></block></block></list></block></autolambda><list></list></block` +
        `></block><block s="doSetVar"><l>bounds</l><block s="evaluate"><block` +
        ` var="get bounds"/><list></list></block></block><block s="doSetVar">` +
        `<l>center</l><block s="reportQuotient"><block s="reportVariadicSum">` +
        `<block var="bounds"/></block><l>2</l></block></block><block s="doSet` +
        `Var"><l>stage bounds</l><block s="reportAskFor"><block s="reportGet"` +
        `><l><option>stage</option></l></block><block s="reifyReporter"><auto` +
        `lambda><block s="reportNewList"><list><block s="reportNewList"><list` +
        `><block s="reportGet"><l><option>left</option></l></block><block s="` +
        `reportGet"><l><option>bottom</option></l></block></list></block><blo` +
        `ck s="reportNewList"><list><block s="reportGet"><l><option>right</op` +
        `tion></l></block><block s="reportGet"><l><option>top</option></l></b` +
        `lock></list></block></list></block></autolambda><list></list></block` +
        `><list></list></block></block><block s="doSetVar"><l>dir x</l><block` +
        ` s="reportMonadic"><l><option>sin</option></l><block s="direction"><` +
        `/block></block></block><block s="doSetVar"><l>dir y</l><block s="rep` +
        `ortMonadic"><l><option>cos</option></l><block s="direction"></block>` +
        `</block></block><block s="doIf"><block s="reportVariadicLessThan"><l` +
        `ist><block s="reportListItem"><l>1</l><block s="reportListItem"><l>1` +
        `</l><block var="bounds"/></block></block><block s="reportListItem"><` +
        `l>1</l><block s="reportListItem"><l>1</l><block var="stage bounds"/>` +
        `</block></block></list></block><script><block s="doSetVar"><l>dir x<` +
        `/l><block s="reportMonadic"><l><option>abs</option></l><block var="d` +
        `ir x"/></block></block></script><list></list></block><block s="doIf"` +
        `><block s="reportVariadicGreaterThan"><list><block s="reportListItem` +
        `"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds"/></b` +
        `lock></block><block s="reportListItem"><l>1</l><block s="reportListI` +
        `tem"><l>2</l><block var="stage bounds"/></block></block></list></blo` +
        `ck><script><block s="doSetVar"><l>dir x</l><block s="reportMonadic">` +
        `<l><option>neg</option></l><block s="reportMonadic"><l><option>abs</` +
        `option></l><block var="dir x"/></block></block></block></script><lis` +
        `t></list></block><block s="doIf"><block s="reportVariadicGreaterThan` +
        `"><list><block s="reportListItem"><l>2</l><block s="reportListItem">` +
        `<l>2</l><block var="bounds"/></block></block><block s="reportListIte` +
        `m"><l>2</l><block s="reportListItem"><l>2</l><block var="stage bound` +
        `s"/></block></block></list></block><script><block s="doSetVar"><l>di` +
        `r y</l><block s="reportMonadic"><l><option>neg</option></l><block s=` +
        `"reportMonadic"><l><option>abs</option></l><block var="dir y"/></blo` +
        `ck></block></block></script><list></list></block><block s="doIf"><bl` +
        `ock s="reportVariadicLessThan"><list><block s="reportListItem"><l>2<` +
        `/l><block s="reportListItem"><l>1</l><block var="bounds"/></block></` +
        `block><block s="reportListItem"><l>2</l><block s="reportListItem"><l` +
        `>1</l><block var="stage bounds"/></block></block></list></block><scr` +
        `ipt><block s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><opt` +
        `ion>abs</option></l><block var="dir y"/></block></block></script><li` +
        `st></list></block><block s="setHeading"><block s="reportAtan2"><bloc` +
        `k var="dir x"/><block var="dir y"/></block></block><block s="doSetVa` +
        `r"><l>bounds</l><block s="evaluate"><block var="get bounds"/><list><` +
        `/list></block></block><block s="doGotoObject"><block s="reportVariad` +
        `icSum"><list><block s="getPosition"></block><block s="reportDifferen` +
        `ce"><block var="center"/><block s="reportQuotient"><block s="reportV` +
        `ariadicSum"><block var="bounds"/></block><l>2</l></block></block></l` +
        `ist></block></block><block s="doSetVar"><l>bounds</l><block s="evalu` +
        `ate"><block var="get bounds"/><list></list></block></block><block s=` +
        `"doIf"><block s="reportVariadicGreaterThan"><list><block s="reportLi` +
        `stItem"><l>1</l><block s="reportListItem"><l>2</l><block var="bounds` +
        `"/></block></block><block s="reportListItem"><l>1</l><block s="repor` +
        `tListItem"><l>2</l><block var="stage bounds"/></block></block></list` +
        `></block><script><block s="doSetVar"><l>delta x</l><block s="reportD` +
        `ifference"><block s="reportListItem"><l>1</l><block s="reportListIte` +
        `m"><l>2</l><block var="stage bounds"/></block></block><block s="repo` +
        `rtListItem"><l>1</l><block s="reportListItem"><l>2</l><block var="bo` +
        `unds"/></block></block></block></block></script><list></list></block` +
        `><block s="doIf"><block s="reportVariadicLessThan"><list><block s="r` +
        `eportListItem"><l>2</l><block s="reportListItem"><l>1</l><block var=` +
        `"bounds"/></block></block><block s="reportListItem"><l>2</l><block s` +
        `="reportListItem"><l>1</l><block var="stage bounds"/></block></block` +
        `></list></block><script><block s="doSetVar"><l>delta y</l><block s="` +
        `reportDifference"><block s="reportListItem"><l>2</l><block s="report` +
        `ListItem"><l>1</l><block var="stage bounds"/></block></block><block ` +
        `s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><block ` +
        `var="bounds"/></block></block></block></block></script><list></list>` +
        `</block><block s="doIf"><block s="reportVariadicLessThan"><list><blo` +
        `ck s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><blo` +
        `ck var="bounds"/></block></block><block s="reportListItem"><l>1</l><` +
        `block s="reportListItem"><l>1</l><block var="stage bounds"/></block>` +
        `</block></list></block><script><block s="doSetVar"><l>delta x</l><bl` +
        `ock s="reportDifference"><block s="reportListItem"><l>1</l><block s=` +
        `"reportListItem"><l>1</l><block var="stage bounds"/></block></block>` +
        `<block s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l>` +
        `<block var="bounds"/></block></block></block></block></script><list>` +
        `</list></block><block s="doIf"><block s="reportVariadicGreaterThan">` +
        `<list><block s="reportListItem"><l>2</l><block s="reportListItem"><l` +
        `>2</l><block var="bounds"/></block></block><block s="reportListItem"` +
        `><l>2</l><block s="reportListItem"><l>2</l><block var="stage bounds"` +
        `/></block></block></list></block><script><block s="doSetVar"><l>delt` +
        `a y</l><block s="reportDifference"><block s="reportListItem"><l>2</l` +
        `><block s="reportListItem"><l>2</l><block var="stage bounds"/></bloc` +
        `k></block><block s="reportListItem"><l>2</l><block s="reportListItem` +
        `"><l>2</l><block var="bounds"/></block></block></block></block></scr` +
        `ipt><list></list></block><block s="doGotoObject"><block s="reportVar` +
        `iadicSum"><list><block s="getPosition"></block><block s="reportNewLi` +
        `st"><list><block var="delta x"/><block var="delta y"/></list></block` +
        `></list></block></block></script><list></list></block></script></blo` +
        `ck-definition><block-definition s="position" type="reporter" categor` +
        `y="motion" selector="getPosition"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs><script><block s="doReport` +
        `"><block s="reportNewList"><list><block s="xPosition"></block><block` +
        ` s="yPosition"></block></list></block></block></script></block-defin` +
        `ition><block-definition s="x position" type="reporter" category="mot` +
        `ion" selector="xPosition" primitive="xPosition"><header></header><co` +
        `de></code><translations></translations><inputs></inputs></block-defi` +
        `nition><block-definition s="y position" type="reporter" category="mo` +
        `tion" selector="yPosition" primitive="yPosition"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="direction" type="reporter" category="mo` +
        `tion" selector="direction" primitive="direction"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="switch to costume %#1" type="command" c` +
        `ategory="looks" selector="doSwitchToCostume" primitive="doSwitchToCo` +
        `stume"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true"><options>§_costumesMenu</opti` +
        `ons></input></inputs></block-definition><block-definition s="next co` +
        `stume" type="command" category="looks" selector="doWearNextCostume">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs><script><block s="doIf"><block s="reportVariadicGreaterThan"` +
        `><list><block s="getCostumeIdx"></block><l>0</l></list></block><scri` +
        `pt><block s="doSwitchToCostume"><block s="reportVariadicSum"><list><` +
        `block s="reportModulus"><block s="getCostumeIdx"></block><block s="r` +
        `eportListAttribute"><l><option>length</option></l><block s="reportGe` +
        `t"><l><option>costumes</option></l></block></block></block><l>1</l><` +
        `/list></block></block></script><list></list></block></script></block` +
        `-definition><block-definition s="costume #" type="reporter" category` +
        `="looks" selector="getCostumeIdx"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs><script><block s="doReport` +
        `"><block s="reportListIndex"><block s="reportGet"><l><option>costume` +
        `</option></l></block><block s="reportGet"><l><option>costumes</optio` +
        `n></l></block></block></block></script></block-definition><block-def` +
        `inition s="%#1 of costume %#2" type="reporter" category="looks" sele` +
        `ctor="reportGetImageAttribute" primitive="reportGetImageAttribute"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%s" readonly="true" irreplaceable="true">width<options>na` +
        `me&#xD;width&#xD;height&#xD;pixels</options></input><input type="%s"` +
        ` readonly="true">current<options>§_costumesMenu</options></input></i` +
        `nputs></block-definition><block-definition s="new costume %#1 width ` +
        `%#2 height %#3" type="reporter" category="looks" selector="reportNew` +
        `Costume" primitive="reportNewCostume"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%l" readonly="true` +
        `"></input><input type="%n"><options>current</options></input><input ` +
        `type="%n"><options>current</options></input></inputs></block-definit` +
        `ion><block-definition s="stretch %#1 x: %#2 y: %#3 %" type="reporter` +
        `" category="looks" selector="reportNewCostumeStretched" primitive="r` +
        `eportNewCostumeStretched"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%s" readonly="true">current<op` +
        `tions>§_costumesMenu</options></input><input type="%n">100</input><i` +
        `nput type="%n">50</input></inputs></block-definition><block-definiti` +
        `on s="skew %#1 to %#2 degrees %#3 %" type="reporter" category="looks` +
        `" selector="reportNewCostumeSkewed" primitive="reportNewCostumeSkewe` +
        `d"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true">current<options>§_costumesMenu</o` +
        `ptions></input><input type="%n">0<options>§_dir=&#xD;(90) right=90&#` +
        `xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random</option` +
        `s></input><input type="%n">50</input></inputs></block-definition><bl` +
        `ock-definition s="say %&apos;msg&apos; for %&apos;time&apos; secs" t` +
        `ype="command" category="looks" selector="doSayFor"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s">H` +
        `ello!</input><input type="%n">2</input><input type="%s">Hello!</inpu` +
        `t><input type="%n">2</input><input type="%n">2</input></inputs><scri` +
        `pt><block s="bubble"><block var="msg"/></block><block s="doWait"><bl` +
        `ock var="time"/></block><block s="bubble"><l></l></block></script></` +
        `block-definition><block-definition s="say %#1" type="command" catego` +
        `ry="looks" selector="bubble" primitive="bubble"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s">Hell` +
        `o!</input></inputs></block-definition><block-definition s="think %&a` +
        `pos;msg&apos; for %&apos;time&apos; secs" type="command" category="l` +
        `ooks" selector="doThinkFor"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s">Hmm...</input><input typ` +
        `e="%n">2</input><input type="%s">Hmm...</input><input type="%n">2</i` +
        `nput><input type="%n">2</input></inputs><script><block s="doThink"><` +
        `block var="msg"/></block><block s="doWait"><block var="time"/></bloc` +
        `k><block s="doThink"><l></l></block></script></block-definition><blo` +
        `ck-definition s="think %#1" type="command" category="looks" selector` +
        `="doThink" primitive="doThink"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s">Hmm...</input></input` +
        `s></block-definition><block-definition s="change %&apos;effect name&` +
        `apos; effect by %&apos;delta&apos;" type="command" category="looks" ` +
        `selector="changeEffect" primitive="changeEffect"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true" irreplaceable="true">ghost<options>color&#xD;saturation` +
        `&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mos` +
        `aic&#xD;negative</options></input><input type="%n">25</input><input ` +
        `type="%s" readonly="true" irreplaceable="true">ghost<options>color&#` +
        `xD;saturation&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pix` +
        `elate&#xD;mosaic&#xD;negative</options></input><input type="%n">25</` +
        `input><input type="%n">25</input></inputs></block-definition><block-` +
        `definition s="set %#1 effect to %#2" type="command" category="looks"` +
        ` selector="setEffect" primitive="setEffect"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">ghost<options>color&#xD;saturation&#xD;` +
        `brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#` +
        `xD;negative</options></input><input type="%n">0</input></inputs></bl` +
        `ock-definition><block-definition s="%#1 effect" type="reporter" cate` +
        `gory="looks" selector="getEffect" primitive="getEffect"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true" irreplaceable="true">ghost<options>color&#xD;sat` +
        `uration&#xD;brightness&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&` +
        `#xD;mosaic&#xD;negative</options></input></inputs></block-definition` +
        `><block-definition s="clear graphic effects" type="command" category` +
        `="looks" selector="clearEffects" primitive="clearEffects"><header></` +
        `header><code></code><translations></translations><inputs></inputs></` +
        `block-definition><block-definition s="change size by %&apos;delta&ap` +
        `os;" type="command" category="looks" selector="changeScale"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%n">10</input><input type="%n">10</input><input type="%n">10</in` +
        `put></inputs><script><block s="setScale"><block s="reportVariadicSum` +
        `"><list><block s="getScale"></block><block var="delta"/></list></blo` +
        `ck></block></script></block-definition><block-definition s="set size` +
        ` to %#1 %" type="command" category="looks" selector="setScale" primi` +
        `tive="setScale"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%n">100</input></inputs></block-definiti` +
        `on><block-definition s="size" type="reporter" category="looks" selec` +
        `tor="getScale" primitive="getScale"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="show" type="command" category="looks" selector="show` +
        `" primitive="show"><header></header><code></code><translations></tra` +
        `nslations><inputs></inputs></block-definition><block-definition s="h` +
        `ide" type="command" category="looks" selector="hide" primitive="hide` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="shown?" type="pred` +
        `icate" category="looks" selector="reportShown" primitive="reportShow` +
        `n"><header></header><code></code><translations></translations><input` +
        `s></inputs></block-definition><block-definition s="go to %#1 layer" ` +
        `type="command" category="looks" selector="goToLayer" primitive="goTo` +
        `Layer"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true" irreplaceable="true">front<op` +
        `tions>front&#xD;back</options></input></inputs></block-definition><b` +
        `lock-definition s="go back %#1 layers" type="command" category="look` +
        `s" selector="goBack" primitive="goBack"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1</input></i` +
        `nputs></block-definition><block-definition s="save %#1 as costume na` +
        `med %#2" type="command" category="looks" selector="doScreenshot" pri` +
        `mitive="doScreenshot"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true">pen trails<opt` +
        `ions>pen trails&#xD;stage image</options></input><input type="%s">sc` +
        `reenshot</input></inputs></block-definition><block-definition s="war` +
        `drobe" type="reporter" category="looks" selector="reportCostumes" pr` +
        `imitive="reportCostumes"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="alert %#1" type="command" category="looks" selector="alert" pri` +
        `mitive="alert"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%mult%s" readonly="true"></input></inputs` +
        `></block-definition><block-definition s="console log %#1" type="comm` +
        `and" category="looks" selector="log" primitive="log"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%mu` +
        `lt%s" readonly="true"></input></inputs></block-definition><block-def` +
        `inition s="play sound %#1" type="command" category="sound" selector=` +
        `"playSound" primitive="playSound"><header></header><code></code><tra` +
        `nslations></translations><inputs><input type="%s" readonly="true"><o` +
        `ptions>§_soundsMenu</options></input></inputs></block-definition><bl` +
        `ock-definition s="play sound %&apos;target&apos; until done" type="c` +
        `ommand" category="sound" selector="doPlaySoundUntilDone" primitive="` +
        `doPlaySoundUntilDone"><header></header><code></code><translations></` +
        `translations><inputs><input type="%s" readonly="true"><options>§_sou` +
        `ndsMenu</options></input><input type="%s" readonly="true"><options>§` +
        `_soundsMenu</options></input><input type="%s" readonly="true"><optio` +
        `ns>§_soundsMenu</options></input></inputs><script><block s="doDeclar` +
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
        `lock></script><scripts><script x="10" y="98"><block s="doDeclareVari` +
        `ables"><list><l>sound</l></list></block><block s="doSetVar"><l>sound` +
        `</l><block s="reportIfElse"><block s="reportIsA"><block var="target"` +
        `/><l><option>sound</option></l></block><block var="target"/><block s` +
        `="reportIfElse"><block s="reportIsA"><block var="target"/><l><option` +
        `>list</option></l></block><block s="reportNewSoundFromSamples"><bloc` +
        `k var="target"/><l>44100</l></block><block s="reportFindFirst"><bloc` +
        `k s="reifyPredicate"><autolambda><block s="reportVariadicEquals"><li` +
        `st><block s="reportGetSoundAttribute"><l><option>name</option></l><l` +
        `></l></block><block var="target"/></list></block></autolambda><list>` +
        `</list></block><block s="reportGet"><l><option>sounds</option></l></` +
        `block></block></block></block></block><block s="doIf"><block s="repo` +
        `rtIsA"><block var="sound"/><l><option>sound</option></l></block><scr` +
        `ipt><block s="playSound"><block var="sound"/></block><block s="doWai` +
        `t"><block s="reportGetSoundAttribute"><l><option>duration</option></` +
        `l><block var="sound"/></block></block></script><list></list></block>` +
        `</script></scripts></block-definition><block-definition s="play soun` +
        `d %&apos;target&apos; at %&apos;rate&apos; Hz" type="command" catego` +
        `ry="sound" selector="doPlaySoundAtRate" primitive="doPlaySoundAtRate` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true"><options>§_soundsMenu</options></i` +
        `nput><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz=441` +
        `00&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options></i` +
        `nput><input type="%s" readonly="true"><options>§_soundsMenu</options` +
        `></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz` +
        `=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options` +
        `></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.1 kHz` +
        `=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</options` +
        `></input></inputs><script><block s="playSound"><block s="reportNewSo` +
        `undFromSamples"><block s="reportGetSoundAttribute"><l><option>sample` +
        `s</option></l><block var="target"/></block><block var="rate"/></bloc` +
        `k></block></script><scripts><script x="10" y="98"><block s="playSoun` +
        `d"><block s="reportNewSoundFromSamples"><block s="reportGetSoundAttr` +
        `ibute"><l><option>samples</option></l><block var="target"/></block><` +
        `block var="rate"/></block></block></script></scripts></block-definit` +
        `ion><block-definition s="stop all sounds" type="command" category="s` +
        `ound" selector="doStopAllSounds" primitive="doStopAllSounds"><header` +
        `></header><code></code><translations></translations><inputs></inputs` +
        `></block-definition><block-definition s="%#1 of sound %#2" type="rep` +
        `orter" category="sound" selector="reportGetSoundAttribute" primitive` +
        `="reportGetSoundAttribute"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">duration<options>name&#xD;duration&#xD;length&#xD;number` +
        ` of channels&#xD;sample rate&#xD;samples</options></input><input typ` +
        `e="%s" readonly="true"><options>§_soundsMenu</options></input></inpu` +
        `ts></block-definition><block-definition s="new sound %#1 rate %#2 Hz` +
        `" type="reporter" category="sound" selector="reportNewSoundFromSampl` +
        `es" primitive="reportNewSoundFromSamples"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%l" readonly="` +
        `true"></input><input type="%n">44100<options>22.05 kHz=22050&#xD;44.` +
        `1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=96000</op` +
        `tions></input></inputs></block-definition><block-definition s="rest ` +
        `for %&apos;beats&apos; beats" type="command" category="sound" select` +
        `or="doRest"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n">0.2</input><input type="%n">0.2</input><` +
        `input type="%n">0.2</input></inputs><script><block s="doWait"><block` +
        ` s="reportQuotient"><l>60</l><block s="reportVariadicProduct"><list>` +
        `<block var="beats"/><block s="getTempo"></block></list></block></blo` +
        `ck></block></script></block-definition><block-definition s="play not` +
        `e %#1 for %#2 beats" type="command" category="sound" selector="doPla` +
        `yNote" primitive="doPlayNote"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%n">60<options>§_pianoKeyb` +
        `oardMenu</options></input><input type="%n">0.5</input></inputs></blo` +
        `ck-definition><block-definition s="play %#1 Hz for %#2 secs" type="c` +
        `ommand" category="sound" selector="doPlayFrequency" primitive="doPla` +
        `yFrequency"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n">440</input><input type="%n">2</input></i` +
        `nputs></block-definition><block-definition s="set instrument to %#1"` +
        ` type="command" category="sound" selector="doSetInstrument" primitiv` +
        `e="doSetInstrument"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">1<options>(1) sine=1&#xD;(2) squ` +
        `are=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4</options></input></input` +
        `s></block-definition><block-definition s="change tempo by %&apos;del` +
        `ta&apos;" type="command" category="sound" selector="doChangeTempo"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%n">20</input><input type="%n">20</input><input type="%n"` +
        `>20</input></inputs><script><block s="doSetTempo"><block s="reportVa` +
        `riadicSum"><list><block s="getTempo"></block><block var="delta"/></l` +
        `ist></block></block></script></block-definition><block-definition s=` +
        `"set tempo to %#1 bpm" type="command" category="sound" selector="doS` +
        `etTempo" primitive="doSetTempo"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%n">60</input></inputs><` +
        `/block-definition><block-definition s="tempo" type="reporter" catego` +
        `ry="sound" selector="getTempo" primitive="getTempo"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="change volume by %&apos;delta&apos;"` +
        ` type="command" category="sound" selector="changeVolume"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n">10</input><input type="%n">10</input><input type="%n">10</input` +
        `></inputs><script><block s="setVolume"><block s="reportVariadicSum">` +
        `<list><block s="getVolume"></block><block var="delta"/></list></bloc` +
        `k></block></script></block-definition><block-definition s="set volum` +
        `e to %#1 %" type="command" category="sound" selector="setVolume" pri` +
        `mitive="setVolume"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%n">100</input></inputs></block-defin` +
        `ition><block-definition s="volume" type="reporter" category="sound" ` +
        `selector="getVolume" primitive="getVolume"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="change balance by %&apos;delta&apos;" type="c` +
        `ommand" category="sound" selector="changePan"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n">10</in` +
        `put><input type="%n">10</input><input type="%n">10</input></inputs><` +
        `script><block s="setPan"><block s="reportVariadicSum"><list><block s` +
        `="getPan"></block><block var="delta"/></list></block></block></scrip` +
        `t></block-definition><block-definition s="set balance to %#1" type="` +
        `command" category="sound" selector="setPan" primitive="setPan"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%n">0</input></inputs></block-definition><block-definition s=` +
        `"balance" type="reporter" category="sound" selector="getPan" primiti` +
        `ve="getPan"><header></header><code></code><translations></translatio` +
        `ns><inputs></inputs></block-definition><block-definition s="play fre` +
        `quency %#1 Hz" type="command" category="sound" selector="playFreq" p` +
        `rimitive="playFreq"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">440</input></inputs></block-defi` +
        `nition><block-definition s="stop frequency" type="command" category=` +
        `"sound" selector="stopFreq" primitive="stopFreq"><header></header><c` +
        `ode></code><translations></translations><inputs></inputs></block-def` +
        `inition><block-definition s="jukebox" type="reporter" category="soun` +
        `d" selector="reportSounds" primitive="reportSounds"><header></header` +
        `><code></code><translations></translations><inputs></inputs></block-` +
        `definition><block-definition s="clear" type="command" category="pen"` +
        ` selector="clear" primitive="clear"><header></header><code></code><t` +
        `ranslations></translations><inputs></inputs></block-definition><bloc` +
        `k-definition s="pen down" type="command" category="pen" selector="do` +
        `wn" primitive="down"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"pen up" type="command" category="pen" selector="up" primitive="up">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="pen down?" type="pre` +
        `dicate" category="pen" selector="getPenDown" primitive="getPenDown">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="set pen color to %&a` +
        `pos;color&apos;" type="command" category="pen" selector="setColor"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%clr" readonly="true" irreplaceable="true"></input><input` +
        ` type="%clr" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%clr" readonly="true" irreplaceable="true"></input></inputs><scri` +
        `pt><block s="doApplyExtension"><l>clr_setpen(clr)</l><list><block va` +
        `r="color"/></list></block></script></block-definition><block-definit` +
        `ion s="set pen %#1 to %#2" type="command" category="pen" selector="s` +
        `etPenColorDimension" primitive="setPenColorDimension"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true" irreplaceable="true">hue<options>hue&#xD;saturatio` +
        `n&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options>` +
        `</input><input type="%n">50</input></inputs></block-definition><bloc` +
        `k-definition s="change pen %&apos;aspect&apos; by %&apos;delta&apos;` +
        `" type="command" category="pen" selector="changePenColorDimension" p` +
        `rimitive="changePenColorDimension"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">hue<options>hue&#xD;saturation&#xD;brightness&#x` +
        `D;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input><input type` +
        `="%n">10</input><input type="%s" readonly="true" irreplaceable="true` +
        `">hue<options>hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD` +
        `;&#126;&#xD;r-g-b(-a)</options></input><input type="%n">10</input><i` +
        `nput type="%n">10</input></inputs></block-definition><block-definiti` +
        `on s="pen %#1" type="reporter" category="pen" selector="getPenAttrib` +
        `ute" primitive="getPenAttribute"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">hue<options>size&#xD;hue&#xD;saturation&#xD;bright` +
        `ness&#xD;transparency&#xD;&#126;&#xD;r-g-b-a</options></input></inpu` +
        `ts></block-definition><block-definition s="set background color to %` +
        `#1" type="command" category="pen" selector="setBackgroundColor" prim` +
        `itive="setBackgroundColor"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%clr" readonly="true" irrepla` +
        `ceable="true"></input></inputs></block-definition><block-definition ` +
        `s="set background %#1 to %#2" type="command" category="pen" selector` +
        `="setBackgroundColorDimension" primitive="setBackgroundColorDimensio` +
        `n"><header></header><code></code><translations></translations><input` +
        `s><input type="%s" readonly="true" irreplaceable="true">hue<options>` +
        `hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-` +
        `g-b(-a)</options></input><input type="%n">50</input></inputs></block` +
        `-definition><block-definition s="change background %#1 by %#2" type=` +
        `"command" category="pen" selector="changeBackgroundColorDimension" p` +
        `rimitive="changeBackgroundColorDimension"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true">hue<options>hue&#xD;saturation&#xD;bright` +
        `ness&#xD;transparency&#xD;&#126;&#xD;r-g-b(-a)</options></input><inp` +
        `ut type="%n">10</input></inputs></block-definition><block-definition` +
        ` s="change pen size by %&apos;delta&apos;" type="command" category="` +
        `pen" selector="changeSize"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%n">1</input><input type="%n"` +
        `>1</input><input type="%n">1</input></inputs><script><block s="setSi` +
        `ze"><block s="reportVariadicSum"><list><block s="getPenAttribute"><l` +
        `><option>size</option></l></block><block var="delta"/></list></block` +
        `></block></script></block-definition><block-definition s="set pen si` +
        `ze to %#1" type="command" category="pen" selector="setSize" primitiv` +
        `e="setSize"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%n">1</input></inputs></block-definition><bl` +
        `ock-definition s="stamp" type="command" category="pen" selector="doS` +
        `tamp" primitive="doStamp"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="fill" type="command" category="pen" selector="floodFill" primi` +
        `tive="floodFill"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="wri` +
        `te %#1 size %#2" type="command" category="pen" selector="write" prim` +
        `itive="write"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s">Hello!</input><input type="%n">12</inp` +
        `ut></inputs></block-definition><block-definition s="pen trails" type` +
        `="reporter" category="pen" selector="reportPenTrailsAsCostume" primi` +
        `tive="reportPenTrailsAsCostume"><header></header><code></code><trans` +
        `lations></translations><inputs></inputs></block-definition><block-de` +
        `finition s="pen vectors" type="reporter" category="pen" selector="re` +
        `portPentrailsAsSVG" primitive="reportPentrailsAsSVG"><header></heade` +
        `r><code></code><translations></translations><inputs></inputs></block` +
        `-definition><block-definition s="paste on %#1" type="command" catego` +
        `ry="pen" selector="doPasteOn" primitive="doPasteOn"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true"><options>§_objectsMenu</options></input></inputs></b` +
        `lock-definition><block-definition s="cut from %#1" type="command" ca` +
        `tegory="pen" selector="doCutFrom" primitive="doCutFrom"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s" readonly="true"><options>§_objectsMenu</options></input></inputs` +
        `></block-definition><block-definition s="message" type="reporter" ca` +
        `tegory="control" selector="getLastMessage" primitive="getLastMessage` +
        `"><header></header><code></code><translations></translations><inputs` +
        `></inputs></block-definition><block-definition s="broadcast %#1 %#2"` +
        ` type="command" category="control" selector="doBroadcast" primitive=` +
        `"doBroadcast"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true"><options>§_messagesMen` +
        `u</options></input><input type="%receive" readonly="true" irreplacea` +
        `ble="true" expand="to&#xD;with data" max="2"></input></inputs></bloc` +
        `k-definition><block-definition s="broadcast %#1 %#2 and wait" type="` +
        `command" category="control" selector="doBroadcastAndWait" primitive=` +
        `"doBroadcastAndWait"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true"><options>§_mess` +
        `agesMenu</options></input><input type="%receive" readonly="true" irr` +
        `eplaceable="true" expand="to&#xD;with data" max="2"></input></inputs` +
        `></block-definition><block-definition s="wait %&apos;duration&apos; ` +
        `secs" type="command" category="control" selector="doWait"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%n">1</input></inputs><script><block s="doDeclareVariables"><list>` +
        `<l>start time</l></list></block><block s="doSetVar"><l>start time</l` +
        `><block s="reportDate"><l><option>time in milliseconds</option></l><` +
        `/block></block><block s="doWaitUntil"><block s="reportVariadicGreate` +
        `rThanOrEquals"><list><block s="reportDate"><l><option>time in millis` +
        `econds</option></l></block><block s="reportVariadicSum"><list><block` +
        ` var="start time"/><block s="reportVariadicProduct"><list><block var` +
        `="duration"/><l>1000</l></list></block></list></block></list></block` +
        `></block></script></block-definition><block-definition s="wait until` +
        ` %&apos;condition&apos;" type="command" category="control" selector=` +
        `"doWaitUntil"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%boolUE" readonly="true"></input></inputs>` +
        `<script><block s="doIf"><block s="reportNot"><block s="evaluate"><bl` +
        `ock var="condition"/><list></list></block></block><script><block s="` +
        `doWaitUntil"><block s="evaluate"><block var="condition"/><list></lis` +
        `t></block></block></script><list></list></block></script></block-def` +
        `inition><block-definition s="forever %&apos;action&apos;" type="comm` +
        `and" category="control" selector="doForever"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%loop" read` +
        `only="true" irreplaceable="true"></input></inputs><script><block s="` +
        `doRun"><block var="action"/><list></list></block><block s="doRun"><b` +
        `lock s="reportEnvironment"><l><option>script</option></l></block><li` +
        `st><block var="action"/></list></block></script></block-definition><` +
        `block-definition s="repeat %&apos;count&apos; %&apos;action&apos;" t` +
        `ype="command" category="control" selector="doRepeat"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>10</input><input type="%loop" readonly="true" irreplaceable="true">` +
        `</input></inputs><script><block s="doDeclareVariables"><list><l>self` +
        `</l></list></block><block s="doSetVar"><l>self</l><block s="reportEn` +
        `vironment"><l><option>script</option></l></block></block><block s="d` +
        `oIf"><block s="reportVariadicGreaterThan"><list><block var="count"/>` +
        `<l>0</l></list></block><script><block s="doRun"><block var="action"/` +
        `><list></list></block><block s="doApplyExtension"><l>snap_yield</l><` +
        `list></list></block><block s="doRun"><block var="self"/><list><block` +
        ` s="reportDifference"><block var="count"/><l>1</l></block><block var` +
        `="action"/></list></block></script><list></list></block></script></b` +
        `lock-definition><block-definition s="repeat until %&apos;condition&a` +
        `pos; %&apos;action&apos;" type="command" category="control" selector` +
        `="doUntil"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%boolUE" readonly="true"></input><input type=` +
        `"%loop" readonly="true" irreplaceable="true"></input></inputs><scrip` +
        `t><block s="doDeclareVariables"><list><l>self</l></list></block><blo` +
        `ck s="doSetVar"><l>self</l><block s="reportEnvironment"><l><option>s` +
        `cript</option></l></block></block><block s="doIf"><block s="reportNo` +
        `t"><block s="evaluate"><block var="condition"/><list></list></block>` +
        `</block><script><block s="doRun"><block var="action"/><list></list><` +
        `/block><block s="doApplyExtension"><l>snap_yield</l><list></list></b` +
        `lock><block s="doRun"><block var="self"/><list><block var="condition` +
        `"/><block var="action"/></list></block></script><list></list></block` +
        `></script></block-definition><block-definition s="for %&apos;count&a` +
        `pos; = %&apos;start&apos; to %&apos;end&apos; %&apos;action&apos;" t` +
        `ype="command" category="control" selector="doFor"><header></header><` +
        `code></code><translations></translations><inputs><input type="%upvar` +
        `" readonly="true" irreplaceable="true">i</input><input type="%n">1</` +
        `input><input type="%n">10</input><input type="%loop" readonly="true"` +
        ` irreplaceable="true"></input></inputs><script><block s="doDeclareVa` +
        `riables"><list><l>test</l><l>increment</l></list></block><block s="d` +
        `oSetVar"><l>count</l><block var="start"/></block><block s="doIfElse"` +
        `><block s="reportVariadicLessThan"><list><block var="start"/><block ` +
        `var="end"/></list></block><script><block s="doSetVar"><l>test</l><bl` +
        `ock s="reifyPredicate"><autolambda><block s="reportVariadicGreaterTh` +
        `an"><list><block var="count"/><block var="end"/></list></block></aut` +
        `olambda><list></list></block></block><block s="doSetVar"><l>incremen` +
        `t</l><l>1</l></block></script><script><block s="doSetVar"><l>test</l` +
        `><block s="reifyPredicate"><autolambda><block s="reportVariadicLessT` +
        `han"><list><block var="count"/><block var="end"/></list></block></au` +
        `tolambda><list></list></block></block><block s="doSetVar"><l>increme` +
        `nt</l><l>-1</l></block></script></block><block s="doUntil"><block s=` +
        `"evaluate"><block var="test"/><list></list></block><script><block s=` +
        `"doRun"><block var="action"/><list></list></block><block s="doChange` +
        `Var"><l>count</l><block var="increment"/></block></script></block></` +
        `script></block-definition><block-definition s="if %&apos;condition&a` +
        `pos; %&apos;true case&apos; %&apos;else pairs&apos;" type="command" ` +
        `category="control" selector="doIf" primitive="doIf"><header></header` +
        `><code></code><translations></translations><inputs><input type="%b" ` +
        `readonly="true"></input><input type="%cs" readonly="true" irreplacea` +
        `ble="true"></input><input type="%elseif" readonly="true" irreplaceab` +
        `le="true" expand="else if&#xD;"></input><input type="%b" readonly="t` +
        `rue"></input><input type="%cs" readonly="true" irreplaceable="true">` +
        `</input><input type="%elseif" readonly="true" irreplaceable="true" e` +
        `xpand="else if&#xD;"></input><input type="%elseif" readonly="true" i` +
        `rreplaceable="true" expand="else if&#xD;"></input></inputs><script><` +
        `block s="doDeclareVariables"><list><l>self</l></list></block><block ` +
        `s="doSetVar"><l>self</l><block s="reportEnvironment"><l><option>scri` +
        `pt</option></l></block></block><block s="doIfElse"><block var="condi` +
        `tion"/><script><block s="doRun"><block var="true case"/><list></list` +
        `></block></script><script><block s="doIfElse"><block s="reportListIs` +
        `Empty"><block var="else pairs"/></block><script></script><script><bl` +
        `ock s="doIfElse"><block s="reportListItem"><l>1</l><block var="else ` +
        `pairs"/></block><script><block s="doRun"><block s="reportListItem"><` +
        `l>2</l><block var="else pairs"/></block><list></list></block></scrip` +
        `t><script><block s="doRun"><block var="self"/><list><block s="report` +
        `Boolean"><l><bool>false</bool></l></block><l></l><block s="reportCDR` +
        `"><block s="reportCDR"><block var="else pairs"/></block></block></li` +
        `st></block></script></block></script></block></script></block></scri` +
        `pt><scripts><script x="10" y="98"><block s="doDeclareVariables"><lis` +
        `t><l>self</l></list></block><block s="doSetVar"><l>self</l><block s=` +
        `"reportEnvironment"><l><option>script</option></l></block></block><b` +
        `lock s="doIfElse"><block var="condition"/><script><block s="doRun"><` +
        `block var="true case"/><list></list></block></script><script><block ` +
        `s="doIfElse"><block s="reportListIsEmpty"><block var="else pairs"/><` +
        `/block><script></script><script><block s="doIfElse"><block s="report` +
        `ListItem"><l>1</l><block var="else pairs"/></block><script><block s=` +
        `"doRun"><block s="reportListItem"><l>2</l><block var="else pairs"/><` +
        `/block><list></list></block></script><script><block s="doRun"><block` +
        ` var="self"/><list><block s="reportBoolean"><l><bool>false</bool></l` +
        `></block><l></l><block s="reportCDR"><block s="reportCDR"><block var` +
        `="else pairs"/></block></block></list></block></script></block></scr` +
        `ipt></block></script></block></script></scripts></block-definition><` +
        `block-definition s="if %&apos;condition&apos; %&apos;true case&apos;` +
        ` else %&apos;false case&apos;" type="command" category="control" sel` +
        `ector="doIfElse" primitive="doIfElse"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%b" readonly="true` +
        `"></input><input type="%cs" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%cs" readonly="true" irreplaceable="true"></input>` +
        `</inputs><scripts><script x="10" y="97.83333333333331"><block s="doR` +
        `un"><block s="reportListItem"><block s="reportVariadicSum"><list><bl` +
        `ock var="condition"/><l>1</l></list></block><block s="reportNewList"` +
        `><list><block var="false case"/><block var="true case"/></list></blo` +
        `ck></block><list></list></block></script></scripts></block-definitio` +
        `n><block-definition s="if %&apos;condition&apos; then %&apos;true ca` +
        `se&apos; else %&apos;false case&apos;" type="reporter" category="con` +
        `trol" selector="reportIfElse" primitive="reportIfElse"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `b" readonly="true"></input><input type="%anyUE"></input><input type=` +
        `"%anyUE"></input><input type="%b" readonly="true"></input><input typ` +
        `e="%anyUE"></input><input type="%anyUE"></input><input type="%anyUE"` +
        `></input></inputs><scripts><script x="10" y="91.83333333333331"><blo` +
        `ck s="doReport"><block s="reportHyperZip"><block s="reifyReporter"><` +
        `autolambda><block s="evaluate"><block s="reportListItem"><l></l><l/>` +
        `</block><list></list></block></autolambda><list></list></block><bloc` +
        `k s="reportVariadicSum"><list><block var="condition"/><l>1</l></list` +
        `></block><l>0</l><block s="reportNewList"><list><block var="false ca` +
        `se"/><block var="true case"/></list></block><l>1</l></block></block>` +
        `</script></scripts></block-definition><block-definition s="stop %#1"` +
        ` type="command" category="control" selector="doStopThis" primitive="` +
        `doStopThis"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%s" readonly="true" irreplaceable="true">all` +
        `<options>all&#xD;all scenes&#xD;this script&#xD;this block&#xD;all b` +
        `ut this script&#xD;other scripts in sprite</options></input></inputs` +
        `></block-definition><block-definition s="run %#1 %#2" type="command"` +
        ` category="control" selector="doRun" primitive="doRun"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `cmdRing" readonly="true"></input><input type="%mult%s" readonly="tru` +
        `e" expand="with inputs"></input></inputs></block-definition><block-d` +
        `efinition s="launch %#1 %#2" type="command" category="control" selec` +
        `tor="fork" primitive="fork"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%cmdRing" readonly="true"></` +
        `input><input type="%mult%s" readonly="true" expand="with inputs"></i` +
        `nput></inputs></block-definition><block-definition s="call %#1 %#2" ` +
        `type="reporter" category="control" selector="evaluate" primitive="ev` +
        `aluate"><header></header><code></code><translations></translations><` +
        `inputs><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%mult%s" readonly="true" expand="with inputs"></` +
        `input></inputs></block-definition><block-definition s="report %#1" t` +
        `ype="command" category="control" selector="doReport" primitive="doRe` +
        `port"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s"></input></inputs></block-definition><block-def` +
        `inition s="run %#1 w/continuation" type="command" category="control"` +
        ` selector="doCallCC" primitive="doCallCC"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%cmdRing" read` +
        `only="true"></input></inputs></block-definition><block-definition s=` +
        `"call %#1 w/continuation" type="reporter" category="control" selecto` +
        `r="reportCallCC" primitive="reportCallCC"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%cmdRing" read` +
        `only="true"></input></inputs></block-definition><block-definition s=` +
        `"warp %#1" type="command" category="other" selector="doWarp" primiti` +
        `ve="doWarp"><header></header><code></code><translations></translatio` +
        `ns><inputs><input type="%cs" readonly="true" irreplaceable="true"></` +
        `input></inputs></block-definition><block-definition s="tell %&apos;t` +
        `arget&apos; to %&apos;action&apos; %&apos;parameters&apos;" type="co` +
        `mmand" category="control" selector="doTellTo"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true"><options>§_objectsMenu</options></input><input type="%cmdR` +
        `ing" readonly="true"></input><input type="%mult%s" readonly="true" e` +
        `xpand="with inputs"></input><input type="%s" readonly="true"><option` +
        `s>§_objectsMenu</options></input><input type="%cmdRing" readonly="tr` +
        `ue"></input><input type="%mult%s" readonly="true" expand="with input` +
        `s"></input><input type="%mult%s" readonly="true" expand="with inputs` +
        `"></input></inputs><script><block s="doRun"><block s="reportAttribut` +
        `eOf"><block var="action"/><block var="target"/></block><block var="p` +
        `arameters"/></block></script></block-definition><block-definition s=` +
        `"ask %&apos;target&apos; for %&apos;action&apos; %&apos;parameters&a` +
        `pos;" type="reporter" category="control" selector="reportAskFor"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true"><options>§_objectsMenu</options></input` +
        `><input type="%repRing" readonly="true" irreplaceable="true"></input` +
        `><input type="%mult%s" readonly="true" expand="with inputs"></input>` +
        `<input type="%s" readonly="true"><options>§_objectsMenu</options></i` +
        `nput><input type="%repRing" readonly="true" irreplaceable="true"></i` +
        `nput><input type="%mult%s" readonly="true" expand="with inputs"></in` +
        `put><input type="%mult%s" readonly="true" expand="with inputs"></inp` +
        `ut></inputs><script><block s="doReport"><block s="evaluate"><block s` +
        `="reportAttributeOf"><block var="action"/><block var="target"/></blo` +
        `ck><block var="parameters"/></block></block></script></block-definit` +
        `ion><block-definition s="create a clone of %&apos;target&apos;" type` +
        `="command" category="control" selector="createClone"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true">myself<options>§_clonablesMenu</options></input><in` +
        `put type="%s" readonly="true">myself<options>§_clonablesMenu</option` +
        `s></input><input type="%s" readonly="true">myself<options>§_clonable` +
        `sMenu</options></input></inputs><script><block s="doReport"><block s` +
        `="newClone"><block var="target"/></block></block></script></block-de` +
        `finition><block-definition s="a new clone of %#1" type="reporter" ca` +
        `tegory="control" selector="newClone" primitive="newClone"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%s" readonly="true">myself<options>§_clonablesMenu</options></inpu` +
        `t></inputs></block-definition><block-definition s="delete this clone` +
        `" type="command" category="control" selector="removeClone" primitive` +
        `="removeClone"><header></header><code></code><translations></transla` +
        `tions><inputs></inputs></block-definition><block-definition s="defin` +
        `e %#1 %#2 %#3" type="command" category="control" selector="doDefineB` +
        `lock" primitive="doDefineBlock"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%upvar" readonly="true" ` +
        `irreplaceable="true">block</input><input type="%s"></input><input ty` +
        `pe="%repRing" readonly="true" irreplaceable="true"></input></inputs>` +
        `</block-definition><block-definition s="set %#1 of block %#2 to %#3"` +
        ` type="command" category="control" selector="doSetBlockAttribute" pr` +
        `imitive="doSetBlockAttribute"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%s" readonly="true" irrepl` +
        `aceable="true">label<options>label&#xD;definition&#xD;comment&#xD;ca` +
        `tegory&#xD;type&#xD;scope&#xD;selector&#xD;slots&#xD;&#126;&#xD;defa` +
        `ults&#xD;menus&#xD;editables&#xD;replaceables&#xD;&#126;&#xD;separat` +
        `ors&#xD;collapses&#xD;expands&#xD;initial slots&#xD;min slots&#xD;ma` +
        `x slots&#xD;translations</options></input><input type="%repRing" rea` +
        `donly="true" irreplaceable="true"></input><input type="%s"></input><` +
        `/inputs></block-definition><block-definition s="delete block %#1" ty` +
        `pe="command" category="control" selector="doDeleteBlock" primitive="` +
        `doDeleteBlock"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%repRing" readonly="true" irreplaceable="` +
        `true"></input></inputs></block-definition><block-definition s="%#1 o` +
        `f block %#2" type="reporter" category="control" selector="reportBloc` +
        `kAttribute" primitive="reportBlockAttribute"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%s" readonl` +
        `y="true" irreplaceable="true">definition<options>label&#xD;definitio` +
        `n&#xD;comment&#xD;category&#xD;custom?&#xD;global?&#xD;type&#xD;scop` +
        `e&#xD;selector&#xD;slots&#xD;&#126;&#xD;defaults&#xD;menus&#xD;edita` +
        `bles&#xD;replaceables&#xD;&#126;&#xD;separators&#xD;collapses&#xD;ex` +
        `pands&#xD;initial slots&#xD;min slots&#xD;max slots&#xD;translations` +
        `</options></input><input type="%repRing" readonly="true" irreplaceab` +
        `le="true"></input></inputs></block-definition><block-definition s="t` +
        `his %#1" type="reporter" category="control" selector="reportEnvironm` +
        `ent" primitive="reportEnvironment"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">script<options>script&#xD;caller&#xD;continuatio` +
        `n&#xD;&#126;&#xD;inputs</options></input></inputs></block-definition` +
        `><block-definition s="pause all $pause" type="command" category="con` +
        `trol" selector="doPauseAll" primitive="doPauseAll"><header></header>` +
        `<code></code><translations></translations><inputs></inputs></block-d` +
        `efinition><block-definition s="switch to scene %#1 %#2" type="comman` +
        `d" category="control" selector="doSwitchToScene" primitive="doSwitch` +
        `ToScene"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s" readonly="true">next<options>§_scenesMenu</` +
        `options></input><input type="%send" readonly="true" irreplaceable="t` +
        `rue" expand="and send&#xD;with data" max="2"></input></inputs></bloc` +
        `k-definition><block-definition s="pipe %&apos;value&apos; $arrowRigh` +
        `t %&apos;functions&apos;" type="reporter" category="control" selecto` +
        `r="reportPipe"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s"></input><input type="%mult%repRing" r` +
        `eadonly="true"></input><input type="%s"></input><input type="%mult%r` +
        `epRing" readonly="true"></input><input type="%mult%repRing" readonly` +
        `="true"></input></inputs><script><block s="doReport"><block s="repor` +
        `tIfElse"><block s="reportListIsEmpty"><block var="functions"/></bloc` +
        `k><block var="value"/><block s="reportPipe"><block s="evaluate"><blo` +
        `ck s="reportListItem"><l>1</l><block var="functions"/></block><list>` +
        `<block var="value"/></list></block><block s="reportCDR"><block var="` +
        `functions"/></block></block></block></block></script></block-definit` +
        `ion><block-definition s="touching %#1 ?" type="predicate" category="` +
        `sensing" selector="reportTouchingObject" primitive="reportTouchingOb` +
        `ject"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true">mouse-pointer<options>§_collid` +
        `ablesMenu</options></input></inputs></block-definition><block-defini` +
        `tion s="touching %#1 ?" type="predicate" category="sensing" selector` +
        `="reportTouchingColor" primitive="reportTouchingColor"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `clr" readonly="true" irreplaceable="true"></input></inputs></block-d` +
        `efinition><block-definition s="color %#1 is touching %#2 ?" type="pr` +
        `edicate" category="sensing" selector="reportColorIsTouchingColor" pr` +
        `imitive="reportColorIsTouchingColor"><header></header><code></code><` +
        `translations></translations><inputs><input type="%clr" readonly="tru` +
        `e" irreplaceable="true"></input><input type="%clr" readonly="true" i` +
        `rreplaceable="true"></input></inputs></block-definition><block-defin` +
        `ition s="%#1 at %#2" type="reporter" category="sensing" selector="re` +
        `portAspect" primitive="reportAspect"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        ` irreplaceable="true">hue<options>hue&#xD;saturation&#xD;brightness&` +
        `#xD;transparency&#xD;r-g-b-a&#xD;&#126;&#xD;sprites</options></input` +
        `><input type="%s" readonly="true">mouse-pointer<options>§_locationMe` +
        `nu</options></input></inputs></block-definition><block-definition s=` +
        `"stack size" type="reporter" category="sensing" selector="reportStac` +
        `kSize" primitive="reportStackSize"><header></header><code></code><tr` +
        `anslations></translations><inputs></inputs></block-definition><block` +
        `-definition s="frames" type="reporter" category="sensing" selector="` +
        `reportFrameCount" primitive="reportFrameCount"><header></header><cod` +
        `e></code><translations></translations><inputs></inputs></block-defin` +
        `ition><block-definition s="yields" type="reporter" category="sensing` +
        `" selector="reportYieldCount" primitive="reportYieldCount"><header><` +
        `/header><code></code><translations></translations><inputs></inputs><` +
        `/block-definition><block-definition s="processes" type="reporter" ca` +
        `tegory="sensing" selector="reportThreadCount" primitive="reportThrea` +
        `dCount"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="ask %#1 and ` +
        `wait" type="command" category="sensing" selector="doAsk" primitive="` +
        `doAsk"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s">what&apos;s your name?</input></inputs></bloc` +
        `k-definition><block-definition s="answer" type="reporter" category="` +
        `sensing" selector="reportLastAnswer" primitive="reportLastAnswer"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs></block-definition><block-definition s="answer" type="reporter` +
        `" category="sensing" selector="getLastAnswer" primitive="getLastAnsw` +
        `er"><header></header><code></code><translations></translations><inpu` +
        `ts></inputs></block-definition><block-definition s="mouse position" ` +
        `type="reporter" category="sensing" selector="reportMousePosition"><h` +
        `eader></header><code></code><translations></translations><inputs></i` +
        `nputs><script><block s="doReport"><block s="reportNewList"><list><bl` +
        `ock s="reportMouseX"></block><block s="reportMouseY"></block></list>` +
        `</block></block></script></block-definition><block-definition s="mou` +
        `se x" type="reporter" category="sensing" selector="reportMouseX" pri` +
        `mitive="reportMouseX"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="mouse y" type="reporter" category="sensing" selector="reportMouseY` +
        `" primitive="reportMouseY"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="mouse down?" type="predicate" category="sensing" selector="re` +
        `portMouseDown" primitive="reportMouseDown"><header></header><code></` +
        `code><translations></translations><inputs></inputs></block-definitio` +
        `n><block-definition s="key %#1 pressed?" type="predicate" category="` +
        `sensing" selector="reportKeyPressed" primitive="reportKeyPressed"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true">space<options>§_keysMenu</options></in` +
        `put></inputs></block-definition><block-definition s="%#1 to %#2" typ` +
        `e="reporter" category="sensing" selector="reportRelationTo" primitiv` +
        `e="reportRelationTo"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true">distance<option` +
        `s>distance&#xD;direction&#xD;ray length</options></input><input type` +
        `="%s" readonly="true">mouse-pointer<options>§_destinationsMenu</opti` +
        `ons></input></inputs></block-definition><block-definition s="reset t` +
        `imer" type="command" category="sensing" selector="doResetTimer" prim` +
        `itive="doResetTimer"><header></header><code></code><translations></t` +
        `ranslations><inputs></inputs></block-definition><block-definition s=` +
        `"timer" type="reporter" category="sensing" selector="reportTimer" pr` +
        `imitive="reportTimer"><header></header><code></code><translations></` +
        `translations><inputs></inputs></block-definition><block-definition s` +
        `="timer" type="reporter" category="sensing" selector="getTimer" prim` +
        `itive="getTimer"><header></header><code></code><translations></trans` +
        `lations><inputs></inputs></block-definition><block-definition s="%#1` +
        ` of %#2" type="reporter" category="sensing" selector="reportAttribut` +
        `eOf" primitive="reportAttributeOf"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true">c` +
        `ostume #<options>§_attributesMenu</options></input><input type="%s" ` +
        `readonly="true"><options>§_objectsMenu</options></input></inputs></b` +
        `lock-definition><block-definition s="object %&apos;name&apos;" type=` +
        `"reporter" category="sensing" selector="reportObject" primitive="rep` +
        `ortObject"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true">myself<options>§_objectsM` +
        `enuWithSelf</options></input><input type="%s" readonly="true">myself` +
        `<options>§_objectsMenuWithSelf</options></input><input type="%s" rea` +
        `donly="true">myself<options>§_objectsMenuWithSelf</options></input><` +
        `/inputs><script><block s="doReport"><block s="reportHyperZip"><block` +
        ` s="reifyReporter"><autolambda><block s="reportFindFirst"><block s="` +
        `reifyPredicate"><autolambda><block s="reportVariadicEquals"><list><b` +
        `lock var="id"/><block s="reportAskFor"><l></l><block s="reifyReporte` +
        `r"><autolambda><block s="reportGet"><l><option>name</option></l></bl` +
        `ock></autolambda><list></list></block><list></list></block></list></` +
        `block></autolambda><list></list></block><block s="reportConcatenated` +
        `Lists"><list><block s="reportAskFor"><block s="reportGet"><l><option` +
        `>stage</option></l></block><block s="reifyReporter"><autolambda><blo` +
        `ck s="reportGet"><l><option>other sprites</option></l></block></auto` +
        `lambda><list></list></block><list></list></block><block s="reportNew` +
        `List"><list><block s="reportGet"><l><option>stage</option></l></bloc` +
        `k></list></block></list></block></block></autolambda><list><l>id</l>` +
        `</list></block><block var="name"/><l>0</l><l></l><l>0</l></block></b` +
        `lock></script><scripts><script x="10" y="98"><block s="doReport"><bl` +
        `ock s="reportHyperZip"><block s="reifyReporter"><autolambda><block s` +
        `="reportFindFirst"><block s="reifyPredicate"><autolambda><block s="r` +
        `eportVariadicEquals"><list><block var="id"/><block s="reportAskFor">` +
        `<l></l><block s="reifyReporter"><autolambda><block s="reportGet"><l>` +
        `<option>name</option></l></block></autolambda><list></list></block><` +
        `list></list></block></list></block></autolambda><list></list></block` +
        `><block s="reportConcatenatedLists"><list><block s="reportAskFor"><b` +
        `lock s="reportGet"><l><option>stage</option></l></block><block s="re` +
        `ifyReporter"><autolambda><block s="reportGet"><l><option>other sprit` +
        `es</option></l></block></autolambda><list></list></block><list></lis` +
        `t></block><block s="reportNewList"><list><block s="reportGet"><l><op` +
        `tion>stage</option></l></block></list></block></list></block></block` +
        `></autolambda><list><l>id</l></list></block><block var="name"/><l>0<` +
        `/l><l></l><l>0</l></block></block></script></scripts></block-definit` +
        `ion><block-definition s="url %#1" type="reporter" category="sensing"` +
        ` selector="reportURL" primitive="reportURL"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">snap.ber` +
        `keley.edu</input></inputs></block-definition><block-definition s="se` +
        `t %#1 to %#2" type="command" category="sensing" selector="doSetGloba` +
        `lFlag" primitive="doSetGlobalFlag"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">video capture<options>turbo mode&#xD;case sensit` +
        `ivity&#xD;flat line ends&#xD;log pen vectors&#xD;video capture&#xD;m` +
        `irror video</options></input><input type="%b" readonly="true"></inpu` +
        `t></inputs></block-definition><block-definition s="is %#1 on?" type=` +
        `"predicate" category="sensing" selector="reportGlobalFlag" primitive` +
        `="reportGlobalFlag"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">turbo mode<options>turbo mode&#xD;case sensitivity&#xD;flat lin` +
        `e ends&#xD;log pen vectors&#xD;video capture&#xD;mirror video</optio` +
        `ns></input></inputs></block-definition><block-definition s="current ` +
        `%#1" type="reporter" category="sensing" selector="reportDate" primit` +
        `ive="reportDate"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true" irreplaceable="true` +
        `">date<options>year&#xD;month&#xD;date&#xD;day of week&#xD;hour&#xD;` +
        `minute&#xD;second&#xD;time in milliseconds</options></input></inputs` +
        `></block-definition><block-definition s="my %#1" type="reporter" cat` +
        `egory="sensing" selector="reportGet" primitive="reportGet"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">neighbors<options>§_gett` +
        `ablesMenu</options></input></inputs></block-definition><block-defini` +
        `tion s="microphone %#1" type="reporter" category="sensing" selector=` +
        `"reportAudio" primitive="reportAudio"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `" irreplaceable="true">volume<options>§_audioMenu</options></input><` +
        `/inputs></block-definition><block-definition s="%#1" type="reporter"` +
        ` category="operators" selector="reportVariadicSum" primitive="report` +
        `VariadicSum"><header></header><code></code><translations></translati` +
        `ons><inputs><input type="%mult%n" readonly="true" separator="+" coll` +
        `apse="sum" initial="2"></input></inputs></block-definition><block-de` +
        `finition s="%#1 − %#2" type="reporter" category="operators" selector` +
        `="reportDifference" primitive="reportDifference"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%n"></i` +
        `nput><input type="%n"></input></inputs></block-definition><block-def` +
        `inition s="%#1" type="reporter" category="operators" selector="repor` +
        `tVariadicProduct" primitive="reportVariadicProduct"><header></header` +
        `><code></code><translations></translations><inputs><input type="%mul` +
        `t%n" readonly="true" separator="×" collapse="product" initial="2"></` +
        `input></inputs></block-definition><block-definition s="%#1 / %#2" ty` +
        `pe="reporter" category="operators" selector="reportQuotient" primiti` +
        `ve="reportQuotient"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n"></input><input type="%n"></input` +
        `></inputs></block-definition><block-definition s="round %#1" type="r` +
        `eporter" category="operators" selector="reportRound" primitive="repo` +
        `rtRound"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%n"></input></inputs></block-definition><block-` +
        `definition s="%#1 of %#2" type="reporter" category="operators" selec` +
        `tor="reportMonadic" primitive="reportMonadic"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true" irreplaceable="true">sqrt<options>abs&#xD;neg&#xD;sign&#xD` +
        `;ceiling&#xD;floor&#xD;sqrt&#xD;sin&#xD;cos&#xD;tan&#xD;asin&#xD;aco` +
        `s&#xD;atan&#xD;ln&#xD;log&#xD;lg&#xD;e^&#xD;10^&#xD;2^&#xD;id</optio` +
        `ns></input><input type="%n">10</input></inputs></block-definition><b` +
        `lock-definition s="%#1 ^ %#2" type="reporter" category="operators" s` +
        `elector="reportPower" primitive="reportPower"><header></header><code` +
        `></code><translations></translations><inputs><input type="%n"></inpu` +
        `t><input type="%n"></input></inputs></block-definition><block-defini` +
        `tion s="%#1 mod %#2" type="reporter" category="operators" selector="` +
        `reportModulus" primitive="reportModulus"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n"></input><in` +
        `put type="%n"></input></inputs></block-definition><block-definition ` +
        `s="atan2 %#1 ÷ %#2" type="reporter" category="operators" selector="r` +
        `eportAtan2" primitive="reportAtan2"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%n"></input><input t` +
        `ype="%n"></input></inputs></block-definition><block-definition s="%#` +
        `1" type="reporter" category="operators" selector="reportVariadicMin"` +
        ` primitive="reportVariadicMin"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%mult%n" readonly="true" ` +
        `separator="min" collapse="minimum" initial="2"></input></inputs></bl` +
        `ock-definition><block-definition s="%#1" type="reporter" category="o` +
        `perators" selector="reportVariadicMax" primitive="reportVariadicMax"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%mult%n" readonly="true" separator="max" collapse="maxi` +
        `mum" initial="2"></input></inputs></block-definition><block-definiti` +
        `on s="pick random %#1 to %#2" type="reporter" category="operators" s` +
        `elector="reportRandom" primitive="reportRandom"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%n">1</i` +
        `nput><input type="%n">10</input></inputs></block-definition><block-d` +
        `efinition s="%#1" type="predicate" category="operators" selector="re` +
        `portVariadicEquals" primitive="reportVariadicEquals"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%mu` +
        `lt%s" readonly="true" separator="=" collapse="all =" initial="2"></i` +
        `nput></inputs></block-definition><block-definition s="%#1" type="pre` +
        `dicate" category="operators" selector="reportVariadicNotEquals" prim` +
        `itive="reportVariadicNotEquals"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%mult%s" readonly="true"` +
        ` separator="≠" collapse="neighbors ≠" initial="2"></input></inputs><` +
        `/block-definition><block-definition s="%#1" type="predicate" categor` +
        `y="operators" selector="reportVariadicLessThan" primitive="reportVar` +
        `iadicLessThan"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%mult%s" readonly="true" separator="&lt;"` +
        ` collapse="all &lt;" initial="2"></input></inputs></block-definition` +
        `><block-definition s="%#1" type="predicate" category="operators" sel` +
        `ector="reportVariadicLessThanOrEquals" primitive="reportVariadicLess` +
        `ThanOrEquals"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%mult%s" readonly="true" separator="≤" col` +
        `lapse="all ≤" initial="2"></input></inputs></block-definition><block` +
        `-definition s="%#1" type="predicate" category="operators" selector="` +
        `reportVariadicGreaterThan" primitive="reportVariadicGreaterThan"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%mult%s" readonly="true" separator="&gt;" collapse="all &gt` +
        `;" initial="2"></input></inputs></block-definition><block-definition` +
        ` s="%#1" type="predicate" category="operators" selector="reportVaria` +
        `dicGreaterThanOrEquals" primitive="reportVariadicGreaterThanOrEquals` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%mult%s" readonly="true" separator="≥" collapse="all ≥` +
        `" initial="2"></input></inputs></block-definition><block-definition ` +
        `s="%#1" type="predicate" category="operators" selector="reportVariad` +
        `icAnd" primitive="reportVariadicAnd"><header></header><code></code><` +
        `translations></translations><inputs><input type="%mult%b" readonly="` +
        `true" separator="and" collapse="all" initial="2"></input></inputs></` +
        `block-definition><block-definition s="%#1" type="predicate" category` +
        `="operators" selector="reportVariadicOr" primitive="reportVariadicOr` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%mult%b" readonly="true" separator="or" collapse="any"` +
        ` initial="2"></input></inputs></block-definition><block-definition s` +
        `="not %&apos;bool&apos;" type="predicate" category="operators" selec` +
        `tor="reportNot"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%b" readonly="true"></input><input type=` +
        `"%b" readonly="true"></input><input type="%b" readonly="true"></inpu` +
        `t></inputs><script><block s="doReport"><block s="reportIfElse"><bloc` +
        `k var="bool"/><block s="reportBoolean"><l><bool>false</bool></l></bl` +
        `ock><block s="reportBoolean"><l><bool>true</bool></l></block></block` +
        `></block></script></block-definition><block-definition s="%#1" type=` +
        `"predicate" category="operators" selector="reportBoolean" primitive=` +
        `"reportBoolean"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%b" readonly="true" irreplaceable="true"` +
        `>true</input></inputs></block-definition><block-definition s="%#1" t` +
        `ype="predicate" category="operators" selector="reportFalse" primitiv` +
        `e="reportFalse"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%b" readonly="true" irreplaceable="true"` +
        `>false</input></inputs></block-definition><block-definition s="join ` +
        `%#1" type="reporter" category="operators" selector="reportJoinWords"` +
        ` primitive="reportJoinWords"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%mult%s" readonly="true" in` +
        `itial="2">hello </input></inputs></block-definition><block-definitio` +
        `n s="letter %&apos;idx&apos; of %&apos;text&apos;" type="reporter" c` +
        `ategory="operators" selector="reportLetter" primitive="reportLetter"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%n">1<options>1=1&#xD;last&#xD;random</options></input>` +
        `<input type="%s">world</input><input type="%n">1<options>1=1&#xD;las` +
        `t&#xD;random</options></input><input type="%s">world</input><input t` +
        `ype="%s">world</input></inputs><script><block s="doReport"><block s=` +
        `"reportHyperZip"><block s="reifyReporter"><autolambda><block s="repo` +
        `rtListItem"><l></l><block s="reportTextSplit"><l></l><l><option>lett` +
        `er</option></l></block></block></autolambda><list></list></block><bl` +
        `ock var="idx"/><l>0</l><block var="text"/><l>0</l></block></block></` +
        `script><scripts><script x="10" y="98"><block s="doReport"><block s="` +
        `reportHyperZip"><block s="reifyReporter"><autolambda><block s="repor` +
        `tListItem"><l></l><block s="reportTextSplit"><l></l><l><option>lette` +
        `r</option></l></block></block></autolambda><list></list></block><blo` +
        `ck var="idx"/><l>0</l><block var="text"/><l>0</l></block></block></s` +
        `cript></scripts></block-definition><block-definition s="length of %#` +
        `1" type="reporter" category="operators" selector="reportStringSize" ` +
        `primitive="reportStringSize"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s">world</input></inputs><` +
        `/block-definition><block-definition s="%#1 of text %#2" type="report` +
        `er" category="operators" selector="reportTextAttribute" primitive="r` +
        `eportTextAttribute"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true" irreplaceable="t` +
        `rue">length<options>length&#xD;lower case&#xD;upper case</options></` +
        `input><input type="%s">world</input></inputs></block-definition><blo` +
        `ck-definition s="unicode of %#1" type="reporter" category="operators` +
        `" selector="reportUnicode" primitive="reportUnicode"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        `>a</input></inputs></block-definition><block-definition s="unicode %` +
        `#1 as letter" type="reporter" category="operators" selector="reportU` +
        `nicodeAsLetter" primitive="reportUnicodeAsLetter"><header></header><` +
        `code></code><translations></translations><inputs><input type="%n">65` +
        `</input></inputs></block-definition><block-definition s="is %#1 a %#` +
        `2 ?" type="predicate" category="operators" selector="reportIsA" prim` +
        `itive="reportIsA"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%s">5</input><input type="%s" readonly` +
        `="true" irreplaceable="true">number<options>§_typesMenu</options></i` +
        `nput></inputs></block-definition><block-definition s="is %#1 ?" type` +
        `="predicate" category="operators" selector="reportVariadicIsIdentica` +
        `l" primitive="reportVariadicIsIdentical"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%mult%s" readon` +
        `ly="true" separator="identical to" collapse="all identical" initial=` +
        `"2"></input></inputs></block-definition><block-definition s="split %` +
        `#1 by %#2" type="reporter" category="operators" selector="reportText` +
        `Split" primitive="reportTextSplit"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s">hello world</inpu` +
        `t><input type="%s"> <options>letter&#xD;word&#xD;line&#xD;tab&#xD;cr` +
        `&#xD;csv&#xD;json&#xD;&#126;&#xD;blocks</options></input></inputs></` +
        `block-definition><block-definition s="JavaScript function ( %#1 ) { ` +
        `%#2 }" type="reporter" category="operators" selector="reportJSFuncti` +
        `on" primitive="reportJSFunction"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%mult%s" readonly="true` +
        `"></input><input type="%mlt"></input></inputs></block-definition><bl` +
        `ock-definition s="type of %#1" type="reporter" category="operators" ` +
        `selector="reportTypeOf" primitive="reportTypeOf"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s">5</` +
        `input></inputs></block-definition><block-definition s="%#1 of %#2" t` +
        `ype="reporter" category="operators" selector="reportTextFunction" pr` +
        `imitive="reportTextFunction"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">encode URI<options>encode URI&#xD;decode URI&#xD;encod` +
        `e URI component&#xD;decode URI component&#xD;XML escape&#xD;XML unes` +
        `cape&#xD;JS escape&#xD;hex sha512 hash</options></input><input type=` +
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
        `nput type="%n">1<options>1=1&#xD;last&#xD;random</options></input><i` +
        `nput type="%l" readonly="true"></input></inputs></block-definition><` +
        `block-definition s="all but first of %#1" type="reporter" category="` +
        `lists" selector="reportCDR" primitive="reportCDR"><header></header><` +
        `code></code><translations></translations><inputs><input type="%l" re` +
        `adonly="true"></input></inputs></block-definition><block-definition ` +
        `s="length of %#1" type="reporter" category="lists" selector="reportL` +
        `istLength" primitive="reportListLength"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%l" readonly="tr` +
        `ue"></input></inputs></block-definition><block-definition s="%#1 of ` +
        `%#2" type="reporter" category="lists" selector="reportListAttribute"` +
        ` primitive="reportListAttribute"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">length<options>length&#xD;rank&#xD;dimensions&#xD;` +
        `flatten&#xD;columns&#xD;uniques&#xD;distribution&#xD;sorted&#xD;shuf` +
        `fled&#xD;reverse&#xD;&#126;&#xD;lines&#xD;csv&#xD;json</options></in` +
        `put><input type="%l" readonly="true"></input></inputs></block-defini` +
        `tion><block-definition s="%&apos;data&apos; contains %&apos;value&ap` +
        `os;" type="predicate" category="lists" selector="reportListContainsI` +
        `tem" primitive="reportListContainsItem"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%l" readonly="tr` +
        `ue"></input><input type="%s">thing</input></inputs><scripts><script ` +
        `x="10" y="91.83333333333331"><block s="doWarp"><script><block s="doF` +
        `or"><l>i</l><l>1</l><block s="reportListAttribute"><l><option>length` +
        `</option></l><block var="data"/></block><script><block s="doIf"><blo` +
        `ck s="reportVariadicEquals"><list><block s="reportListItem"><block v` +
        `ar="i"/><block var="data"/></block><block var="value"/></list></bloc` +
        `k><script><block s="doReport"><block s="reportBoolean"><l><bool>true` +
        `</bool></l></block></block></script><list></list></block></script></` +
        `block></script></block><block s="doReport"><block s="reportBoolean">` +
        `<l><bool>false</bool></l></block></block></script></scripts></block-` +
        `definition><block-definition s="is %&apos;data&apos; empty?" type="p` +
        `redicate" category="lists" selector="reportListIsEmpty" primitive="r` +
        `eportListIsEmpty"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%l" readonly="true"></input></inputs><` +
        `scripts><script x="10" y="91.83333333333331"><block s="doReport"><bl` +
        `ock s="reportVariadicEquals"><list><block var="data"/><block s="repo` +
        `rtNewList"><list></list></block></list></block></block></script></sc` +
        `ripts></block-definition><block-definition s="index of %&apos;value&` +
        `apos; in %&apos;data&apos;" type="reporter" category="lists" selecto` +
        `r="reportListIndex" primitive="reportListIndex"><header></header><co` +
        `de></code><translations></translations><inputs><input type="%s">thin` +
        `g</input><input type="%l" readonly="true"></input></inputs><scripts>` +
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
        `nput type="%n">1<options>1=1&#xD;last&#xD;&#126;&#xD;all</options></` +
        `input><input type="%l" readonly="true"></input></inputs></block-defi` +
        `nition><block-definition s="insert %#1 at %#2 of %#3" type="command"` +
        ` category="lists" selector="doInsertInList" primitive="doInsertInLis` +
        `t"><header></header><code></code><translations></translations><input` +
        `s><input type="%s">thing</input><input type="%n">1<options>1=1&#xD;l` +
        `ast&#xD;random</options></input><input type="%l" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="replace item %` +
        `#1 of %#2 with %#3" type="command" category="lists" selector="doRepl` +
        `aceInList" primitive="doReplaceInList"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">1<options>1=1` +
        `&#xD;last&#xD;random</options></input><input type="%l" readonly="tru` +
        `e"></input><input type="%s">thing</input></inputs></block-definition` +
        `><block-definition s="numbers from %&apos;start&apos; to %&apos;end&` +
        `apos;" type="reporter" category="lists" selector="reportNumbers" pri` +
        `mitive="reportNumbers"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%n">1</input><input type="%n">10<` +
        `/input></inputs><scripts><script x="10" y="91.83333333333331"><block` +
        ` s="doReport"><block s="reportHyperZip"><block s="reifyReporter"><sc` +
        `ript><block s="doDeclareVariables"><list><l>result</l></list></block` +
        `><block s="doSetVar"><l>result</l><block s="reportNewList"><list></l` +
        `ist></block></block><block s="doWarp"><script><block s="doFor"><l>i<` +
        `/l><l></l><l></l><script><block s="doAddToList"><block var="i"/><blo` +
        `ck var="result"/></block></script></block></script></block><block s=` +
        `"doReport"><block var="result"/></block></script><list></list></bloc` +
        `k><block var="start"/><l>0</l><block var="end"/><l>0</l></block></bl` +
        `ock></script></scripts></block-definition><block-definition s="appen` +
        `d %&apos;lists&apos;" type="reporter" category="lists" selector="rep` +
        `ortConcatenatedLists" primitive="reportConcatenatedLists"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
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
        `nputs><input type="%mult%l" readonly="true" initial="2"></input></in` +
        `puts><scripts><script x="10" y="91.83333333333331"><block s="doRepor` +
        `t"><block s="reportIfElse"><block s="reportListIsEmpty"><block var="` +
        `lists"/></block><block s="reportNewList"><list><block s="reportNewLi` +
        `st"><list></list></block></list></block><block s="reportConcatenated` +
        `Lists"><block s="reportMap"><block s="reifyReporter"><autolambda><bl` +
        `ock s="reportMap"><block s="reifyReporter"><autolambda><block s="rep` +
        `ortCONS"><block var="first"/><l/></block></autolambda><list></list><` +
        `/block><block s="reportCrossproduct"><block s="reportCDR"><block var` +
        `="lists"/></block></block></block></autolambda><list><l>first</l></l` +
        `ist></block><block s="reportListItem"><l>1</l><block var="lists"/></` +
        `block></block></block></block></block></script></scripts></block-def` +
        `inition><block-definition s="transpose %#1" type="reporter" category` +
        `="lists" selector="reportTranspose" primitive="reportTranspose"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%l" readonly="true"></input></inputs></block-definition><blo` +
        `ck-definition s="reshape %#1 to %#2" type="reporter" category="lists` +
        `" selector="reportReshape" primitive="reportReshape"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        `></input><input type="%mult%n" readonly="true" initial="2">4,3</inpu` +
        `t></inputs></block-definition><block-definition s="map %&apos;ring&a` +
        `pos; over %&apos;data&apos;" type="reporter" category="lists" select` +
        `or="reportMap" primitive="reportMap"><header></header><code></code><` +
        `translations></translations><inputs><input type="%repRing" readonly=` +
        `"true" irreplaceable="true"></input><input type="%l" readonly="true"` +
        `></input></inputs><scripts><script x="10" y="91.83333333333331"><blo` +
        `ck s="doDeclareVariables"><list><l>result</l><l>implicit?</l></list>` +
        `</block><block s="doSetVar"><l>result</l><block s="reportNewList"><l` +
        `ist></list></block></block><block s="doSetVar"><l>implicit?</l><bloc` +
        `k s="reportListIsEmpty"><block s="reportAttributeOf"><l><option>inpu` +
        `t names</option></l><block var="ring"/></block></block></block><bloc` +
        `k s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block s="repo` +
        `rtListAttribute"><l><option>length</option></l><block var="data"/></` +
        `block><script><block s="doAddToList"><block s="evaluate"><block var=` +
        `"ring"/><block s="reportIfElse"><block var="implicit?"/><block s="re` +
        `portNewList"><list><block s="reportListItem"><block var="i"/><block ` +
        `var="data"/></block></list></block><block s="reportNewList"><list><b` +
        `lock s="reportListItem"><block var="i"/><block var="data"/></block><` +
        `block var="i"/><block var="data"/></list></block></block></block><bl` +
        `ock var="result"/></block></script></block></script></block><block s` +
        `="doReport"><block var="result"/></block></script></scripts></block-` +
        `definition><block-definition s="$blitz map %#1 over %#2" type="repor` +
        `ter" category="lists" selector="reportAtomicMap" primitive="reportAt` +
        `omicMap"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%repRing" readonly="true" irreplaceable="true">` +
        `</input><input type="%l" readonly="true"></input></inputs></block-de` +
        `finition><block-definition s="keep items %&apos;ring&apos; from %&ap` +
        `os;data&apos;" type="reporter" category="lists" selector="reportKeep` +
        `" primitive="reportKeep"><header></header><code></code><translations` +
        `></translations><inputs><input type="%predRing" readonly="true" irre` +
        `placeable="true"></input><input type="%l" readonly="true"></input></` +
        `inputs><scripts><script x="10" y="91.83333333333331"><block s="doDec` +
        `lareVariables"><list><l>result</l><l>implicit?</l></list></block><bl` +
        `ock s="doSetVar"><l>result</l><block s="reportNewList"><list></list>` +
        `</block></block><block s="doSetVar"><l>implicit?</l><block s="report` +
        `ListIsEmpty"><block s="reportAttributeOf"><l><option>input names</op` +
        `tion></l><block var="ring"/></block></block></block><block s="doWarp` +
        `"><script><block s="doFor"><l>i</l><l>1</l><block s="reportListAttri` +
        `bute"><l><option>length</option></l><block var="data"/></block><scri` +
        `pt><block s="doIf"><block s="evaluate"><block var="ring"/><block s="` +
        `reportIfElse"><block var="implicit?"/><block s="reportNewList"><list` +
        `><block s="reportListItem"><block var="i"/><block var="data"/></bloc` +
        `k></list></block><block s="reportNewList"><list><block s="reportList` +
        `Item"><block var="i"/><block var="data"/></block><block var="i"/><bl` +
        `ock var="data"/></list></block></block></block><script><block s="doA` +
        `ddToList"><block s="reportListItem"><block var="i"/><block var="data` +
        `"/></block><block var="result"/></block></script><list></list></bloc` +
        `k></script></block></script></block><block s="doReport"><block var="` +
        `result"/></block></script></scripts></block-definition><block-defini` +
        `tion s="$blitz keep items %#1 from %#2" type="reporter" category="li` +
        `sts" selector="reportAtomicKeep" primitive="reportAtomicKeep"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%predRing" readonly="true" irreplaceable="true"></input><input` +
        ` type="%l" readonly="true"></input></inputs></block-definition><bloc` +
        `k-definition s="find first item %&apos;ring&apos; in %&apos;data&apo` +
        `s;" type="reporter" category="lists" selector="reportFindFirst" prim` +
        `itive="reportFindFirst"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%predRing" readonly="true" irrep` +
        `laceable="true"></input><input type="%l" readonly="true"></input></i` +
        `nputs><scripts><script x="10" y="91.83333333333331"><block s="doDecl` +
        `areVariables"><list><l>implicit?</l></list></block><block s="doSetVa` +
        `r"><l>implicit?</l><block s="reportListIsEmpty"><block s="reportAttr` +
        `ibuteOf"><l><option>input names</option></l><block var="ring"/></blo` +
        `ck></block></block><block s="doWarp"><script><block s="doFor"><l>i</` +
        `l><l>1</l><block s="reportListAttribute"><l><option>length</option><` +
        `/l><block var="data"/></block><script><block s="doIf"><block s="eval` +
        `uate"><block var="ring"/><block s="reportIfElse"><block var="implici` +
        `t?"/><block s="reportNewList"><list><block s="reportListItem"><block` +
        ` var="i"/><block var="data"/></block></list></block><block s="report` +
        `NewList"><list><block s="reportListItem"><block var="i"/><block var=` +
        `"data"/></block><block var="i"/><block var="data"/></list></block></` +
        `block></block><script><block s="doReport"><block s="reportListItem">` +
        `<block var="i"/><block var="data"/></block></block></script><list></` +
        `list></block></script></block></script></block><block s="doReport"><` +
        `l></l></block></script></scripts></block-definition><block-definitio` +
        `n s="$blitz find first item %#1 in %#2" type="reporter" category="li` +
        `sts" selector="reportAtomicFindFirst" primitive="reportAtomicFindFir` +
        `st"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%predRing" readonly="true" irreplaceable="true"></in` +
        `put><input type="%l" readonly="true"></input></inputs></block-defini` +
        `tion><block-definition s="combine %&apos;data&apos; using %&apos;rin` +
        `g&apos;" type="reporter" category="lists" selector="reportCombine" p` +
        `rimitive="reportCombine"><header></header><code></code><translations` +
        `></translations><inputs><input type="%l" readonly="true"></input><in` +
        `put type="%repRing" readonly="true" irreplaceable="true"></input></i` +
        `nputs><scripts><script x="10" y="91.83333333333331"><block s="doIf">` +
        `<block s="reportListIsEmpty"><block var="data"/></block><script><blo` +
        `ck s="doReport"><l>0</l></block></script><list><block s="reportVaria` +
        `dicEquals"><list><block s="reportListAttribute"><l><option>length</o` +
        `ption></l><block var="data"/></block><l>1</l></list></block><script>` +
        `<block s="doReport"><block s="reportListItem"><l>1</l><block var="da` +
        `ta"/></block></block></script></list></block><block s="doReport"><bl` +
        `ock s="evaluate"><block var="ring"/><list><block s="reportListItem">` +
        `<l>1</l><block var="data"/></block><block s="evaluate"><block s="rep` +
        `ortEnvironment"><l><option>script</option></l></block><list><block s` +
        `="reportCDR"><block var="data"/></block><block var="ring"/></list></` +
        `block></list></block></block></script></scripts></block-definition><` +
        `block-definition s="$blitz combine %#1 using %#2" type="reporter" ca` +
        `tegory="lists" selector="reportAtomicCombine" primitive="reportAtomi` +
        `cCombine"><header></header><code></code><translations></translations` +
        `><inputs><input type="%l" readonly="true"></input><input type="%repR` +
        `ing" readonly="true" irreplaceable="true"></input></inputs></block-d` +
        `efinition><block-definition s="for each %&apos;item&apos; in %&apos;` +
        `data&apos; %&apos;action&apos;" type="command" category="lists" sele` +
        `ctor="doForEach" primitive="doForEach"><header></header><code></code` +
        `><translations></translations><inputs><input type="%upvar" readonly=` +
        `"true" irreplaceable="true">item</input><input type="%l" readonly="t` +
        `rue"></input><input type="%loop" readonly="true" irreplaceable="true` +
        `"></input></inputs><scripts><script x="10" y="97.83333333333331"><bl` +
        `ock s="doReport"><block s="reportMap"><block s="reifyReporter"><scri` +
        `pt><block s="doSetVar"><l>item</l><l></l></block><block s="doRun"><b` +
        `lock var="action"/><list></list></block><block s="doReport"><l>0</l>` +
        `</block></script><list></list></block><block var="data"/></block></b` +
        `lock></script></scripts></block-definition><block-definition s="show` +
        ` table %#1" type="command" category="lists" selector="doShowTable" p` +
        `rimitive="doShowTable"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%l" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="map %#1 to %#2 %#3" type` +
        `="command" category="other" selector="doMapCodeOrHeader" primitive="` +
        `doMapCodeOrHeader"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%cmdRing" readonly="true"></input><in` +
        `put type="%s" readonly="true">code<options>code&#xD;header</options>` +
        `</input><input type="%mlt"></input></inputs></block-definition><bloc` +
        `k-definition s="map %#1 to code %#2" type="command" category="other"` +
        ` selector="doMapValueCode" primitive="doMapValueCode"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%s` +
        `" readonly="true" irreplaceable="true">String<options>String&#xD;Num` +
        `ber&#xD;true&#xD;false</options></input><input type="%mlt">&lt;#1&gt` +
        `;</input></inputs></block-definition><block-definition s="map %#1 of` +
        ` %#2 to code %#3" type="command" category="other" selector="doMapLis` +
        `tCode" primitive="doMapListCode"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true"><op` +
        `tions>list&#xD;item&#xD;delimiter</options></input><input type="%s" ` +
        `readonly="true"><options>collection&#xD;variables&#xD;parameters</op` +
        `tions></input><input type="%mlt"></input></inputs></block-definition` +
        `><block-definition s="code of %#1" type="reporter" category="other" ` +
        `selector="reportMappedCode" primitive="reportMappedCode"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%cmdRing" readonly="true"></input></inputs></block-definition><bloc` +
        `k-definition s="primitive %#1" type="command" category="other" selec` +
        `tor="doPrimitive" primitive="doPrimitive"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s" readonly="` +
        `true" irreplaceable="true"><options>§_primitivesMenu</options></inpu` +
        `t></inputs></block-definition><block-definition s="extension %#1 %#2` +
        `" type="command" category="other" selector="doApplyExtension" primit` +
        `ive="doApplyExtension"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true" irreplaceable` +
        `="true"><options>§_extensionsMenu</options></input><input type="%mul` +
        `t%s" readonly="true"></input></inputs></block-definition><block-defi` +
        `nition s="extension %#1 %#2" type="reporter" category="other" select` +
        `or="reportApplyExtension" primitive="reportApplyExtension"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true"><options>§_extensionsMen` +
        `u</options></input><input type="%mult%s" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="set video transparency` +
        ` to %#1" type="command" category="sensing" selector="doSetVideoTrans` +
        `parency" primitive="doSetVideoTransparency"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%n">50</inpu` +
        `t></inputs></block-definition><block-definition s="video %#1 on %#2"` +
        ` type="reporter" category="sensing" selector="reportVideo" primitive` +
        `="reportVideo"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s" readonly="true" irreplaceable="true">` +
        `motion<options>snap&#xD;motion&#xD;direction</options></input><input` +
        ` type="%s" readonly="true">myself<options>§_objectsMenuWithSelf</opt` +
        `ions></input></inputs></block-definition></primitives></blocks>`,
        this.stage
    );
};
