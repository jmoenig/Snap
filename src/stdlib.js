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
        `rimitives><block-definition s="zip %&apos;fun&apos; inputs: $nl %&ap` +
        `os;a&apos; leaf-rank %&apos;a-rank&apos; $nl %&apos;b&apos; leaf-ran` +
        `k %&apos;b-rank&apos;" type="reporter" category="control" selector="` +
        `reportHyperZip"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%repRing" readonly="true" irreplaceable=` +
        `"true"></input><input type="%s"></input><input type="%n"></input><in` +
        `put type="%s"></input><input type="%n"></input></inputs><script><blo` +
        `ck s="doIfElse"><block s="reportVariadicGreaterThan"><list><block s=` +
        `"reportListAttribute"><l><option>rank</option></l><block var="a"/></` +
        `block><block var="a-rank"/></list></block><script><block s="doIfElse` +
        `"><block s="reportVariadicGreaterThan"><list><block s="reportListAtt` +
        `ribute"><l><option>rank</option></l><block var="b"/></block><block v` +
        `ar="b-rank"/></list></block><script><block s="doReport"><block s="re` +
        `portMap"><block s="reifyReporter"><autolambda><block s="reportHyperZ` +
        `ip"><block var="fun"/><block s="reportListItem"><l></l><block var="a` +
        `"/></block><block var="a-rank"/><block s="reportListItem"><l></l><bl` +
        `ock var="b"/></block><block var="b-rank"/></block></autolambda><list` +
        `></list></block><block s="reportNumbers"><l>1</l><block s="reportVar` +
        `iadicMin"><list><block s="reportListAttribute"><l><option>length</op` +
        `tion></l><block var="a"/></block><block s="reportListAttribute"><l><` +
        `option>length</option></l><block var="b"/></block></list></block></b` +
        `lock></block></block></script><script><block s="doReport"><block s="` +
        `reportMap"><block s="reifyReporter"><autolambda><block s="reportHype` +
        `rZip"><block var="fun"/><l></l><block var="a-rank"/><block var="b"/>` +
        `<block var="b-rank"/></block></autolambda><list></list></block><bloc` +
        `k var="a"/></block></block></script></block></script><script><block ` +
        `s="doIfElse"><block s="reportVariadicGreaterThan"><list><block s="re` +
        `portListAttribute"><l><option>rank</option></l><block var="b"/></blo` +
        `ck><block var="b-rank"/></list></block><script><block s="doReport"><` +
        `block s="reportMap"><block s="reifyReporter"><autolambda><block s="r` +
        `eportHyperZip"><block var="fun"/><block var="a"/><block var="a-rank"` +
        `/><l></l><block var="b-rank"/></block></autolambda><list></list></bl` +
        `ock><block var="b"/></block></block></script><script><block s="doRep` +
        `ort"><block s="evaluate"><block var="fun"/><list><block var="a"/><bl` +
        `ock var="b"/></list></block></block></script></block></script></bloc` +
        `k></script></block-definition><block-definition s="move %&apos;steps` +
        `&apos; steps" type="command" category="motion" selector="forward"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n">10</input><input type="%n">10</input><input type="%n">` +
        `10</input></inputs><script><block s="doGotoObject"><block s="reportV` +
        `ariadicSum"><list><block s="getPosition"></block><block s="reportVar` +
        `iadicProduct"><list><block s="reportNewList"><list><block s="reportM` +
        `onadic"><l><option>sin</option></l><block s="direction"></block></bl` +
        `ock><block s="reportMonadic"><l><option>cos</option></l><block s="di` +
        `rection"></block></block></list></block><block var="steps"/></list><` +
        `/block></list></block></block></script></block-definition><block-def` +
        `inition s="turn $clockwise %&apos;angle&apos; degrees" type="command` +
        `" category="motion" selector="turn"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%n">15</input><input` +
        ` type="%n">15</input><input type="%n">15</input></inputs><script><bl` +
        `ock s="setHeading"><block s="reportVariadicSum"><list><block s="dire` +
        `ction"></block><block var="angle"/></list></block></block></script><` +
        `/block-definition><block-definition s="turn $counterclockwise %&apos` +
        `;angle&apos; degrees" type="command" category="motion" selector="tur` +
        `nLeft"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%n">15</input><input type="%n">15</input><input t` +
        `ype="%n">15</input></inputs><script><block s="setHeading"><block s="` +
        `reportDifference"><block s="direction"></block><block var="angle"/><` +
        `/block></block></script></block-definition><block-definition s="poin` +
        `t in direction %&apos;angle&apos;" type="command" category="motion" ` +
        `selector="setHeading"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">90<options>§_dir=&#xD;(90) rig` +
        `ht=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;random=` +
        `$_random</options></input><input type="%n">90<options>§_dir=&#xD;(90` +
        `) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#xD;ra` +
        `ndom=$_random</options></input><input type="%n">90<options>§_dir=&#x` +
        `D;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) down=180&#` +
        `xD;random</options></input></inputs><script><block s="doFaceTowards"` +
        `><block s="reportVariadicSum"><list><block s="getPosition"></block><` +
        `block s="reportNewList"><list><block s="reportMonadic"><l><option>si` +
        `n</option></l><block var="angle"/></block><block s="reportMonadic"><` +
        `l><option>cos</option></l><block var="angle"/></block></list></block` +
        `></list></block></block></script></block-definition><block-definitio` +
        `n s="point towards %#1" type="command" category="motion" selector="d` +
        `oFaceTowards" primitive="doFaceTowards"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s" readonly="tr` +
        `ue">$_mouse-pointer<options>§_destinationsMenu</options></input></in` +
        `puts></block-definition><block-definition s="go to x: %&apos;x&apos;` +
        ` y: %&apos;y&apos;" type="command" category="motion" selector="gotoX` +
        `Y"><header></header><code></code><translations></translations><input` +
        `s><input type="%n">0</input><input type="%n">0</input><input type="%` +
        `n">0</input><input type="%n">0</input><input type="%n">0</input></in` +
        `puts><script><block s="doGotoObject"><block s="reportNewList"><list>` +
        `<block var="x"/><block var="y"/></list></block></block></script></bl` +
        `ock-definition><block-definition s="go to %#1" type="command" catego` +
        `ry="motion" selector="doGotoObject" primitive="doGotoObject"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s" readonly="true">$_random position<options>§_destinationsMen` +
        `u</options></input></inputs></block-definition><block-definition s="` +
        `glide %&apos;span&apos; secs to x: %&apos;x&apos; y: %&apos;y&apos;"` +
        ` type="command" category="motion" selector="doGlide"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>1</input><input type="%n">0</input><input type="%n">0</input><input` +
        ` type="%n">1</input><input type="%n">0</input><input type="%n">0</in` +
        `put><input type="%n">1</input></inputs><script><block s="doDeclareVa` +
        `riables"><list><l>pos</l><l>start</l><l>fract</l></list></block><blo` +
        `ck s="doSetVar"><l>pos</l><block s="getPosition"></block></block><bl` +
        `ock s="doSetVar"><l>start</l><block s="reportDate"><l><option>time i` +
        `n milliseconds</option></l></block></block><block s="doUntil"><block` +
        ` s="reportVariadicGreaterThanOrEquals"><list><block var="fract"/><l>` +
        `1</l></list></block><script><block s="doSetVar"><l>fract</l><block s` +
        `="reportQuotient"><block s="reportDifference"><block s="reportDate">` +
        `<l><option>time in milliseconds</option></l></block><block var="star` +
        `t"/></block><block s="reportVariadicProduct"><list><block var="span"` +
        `/><l>1000</l></list></block></block></block><block s="doGotoObject">` +
        `<block s="reportVariadicSum"><list><block var="pos"/><block s="repor` +
        `tVariadicProduct"><list><block s="reportDifference"><block s="report` +
        `NewList"><list><block var="x"/><block var="y"/></list></block><block` +
        ` var="pos"/></block><block var="fract"/></list></block></list></bloc` +
        `k></block></script></block><block s="gotoXY"><block var="x"/><block ` +
        `var="y"/></block></script></block-definition><block-definition s="ch` +
        `ange x by %&apos;delta&apos;" type="command" category="motion" selec` +
        `tor="changeXPosition"><header></header><code></code><translations></` +
        `translations><inputs><input type="%n">10</input><input type="%n">10<` +
        `/input><input type="%n">10</input></inputs><script><block s="setXPos` +
        `ition"><block s="reportVariadicSum"><list><block s="xPosition"></blo` +
        `ck><block var="delta"/></list></block></block></script></block-defin` +
        `ition><block-definition s="set x to %&apos;x&apos;" type="command" c` +
        `ategory="motion" selector="setXPosition"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%n">0</input><i` +
        `nput type="%n">0</input><input type="%n">0</input></inputs><script><` +
        `block s="doGotoObject"><block s="reportNewList"><list><block var="x"` +
        `/><block s="yPosition"></block></list></block></block></script></blo` +
        `ck-definition><block-definition s="change y by %&apos;delta&apos;" t` +
        `ype="command" category="motion" selector="changeYPosition"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%n">10</input><input type="%n">10</input><input type="%n">10</inp` +
        `ut></inputs><script><block s="setYPosition"><block s="reportVariadic` +
        `Sum"><list><block s="yPosition"></block><block var="delta"/></list><` +
        `/block></block></script></block-definition><block-definition s="set ` +
        `y to %&apos;y&apos;" type="command" category="motion" selector="setY` +
        `Position"><header></header><code></code><translations></translations` +
        `><inputs><input type="%n">0</input><input type="%n">0</input><input ` +
        `type="%n">0</input></inputs><script><block s="doGotoObject"><block s` +
        `="reportNewList"><list><block s="xPosition"></block><block var="y"/>` +
        `</list></block></block></script></block-definition><block-definition` +
        ` s="if on edge, bounce" type="command" category="motion" selector="b` +
        `ounceOffEdge"><header></header><code></code><translations></translat` +
        `ions><inputs></inputs><script><block s="doIf"><block s="reportTouchi` +
        `ngObject"><l><option>edge</option></l></block><script><block s="doDe` +
        `clareVariables"><list><l>get bounds</l><l>bounds</l><l>center</l><l>` +
        `stage bounds</l><l>dir x</l><l>dir y</l><l>delta x</l><l>delta y</l>` +
        `</list></block><block s="doSetVar"><l>get bounds</l><block s="reifyR` +
        `eporter"><autolambda><block s="reportNewList"><list><block s="report` +
        `VariadicMin"><block s="reportCONS"><block s="reportNewList"><list><b` +
        `lock s="reportGet"><l><option>left</option></l></block><block s="rep` +
        `ortGet"><l><option>bottom</option></l></block></list></block><block ` +
        `s="reportMap"><block s="reifyReporter"><autolambda><block s="reportN` +
        `ewList"><list><block s="reportAttributeOf"><l><option>left</option><` +
        `/l><l></l></block><block s="reportAttributeOf"><l><option>bottom</op` +
        `tion></l><l></l></block></list></block></autolambda><list></list></b` +
        `lock><block s="reportGet"><l><option>parts</option></l></block></blo` +
        `ck></block></block><block s="reportVariadicMax"><block s="reportCONS` +
        `"><block s="reportNewList"><list><block s="reportGet"><l><option>rig` +
        `ht</option></l></block><block s="reportGet"><l><option>top</option><` +
        `/l></block></list></block><block s="reportMap"><block s="reifyReport` +
        `er"><autolambda><block s="reportNewList"><list><block s="reportAttri` +
        `buteOf"><l><option>right</option></l><l></l></block><block s="report` +
        `AttributeOf"><l><option>top</option></l><l></l></block></list></bloc` +
        `k></autolambda><list></list></block><block s="reportGet"><l><option>` +
        `parts</option></l></block></block></block></block></list></block></a` +
        `utolambda><list></list></block></block><block s="doSetVar"><l>bounds` +
        `</l><block s="evaluate"><block var="get bounds"/><list></list></bloc` +
        `k></block><block s="doSetVar"><l>center</l><block s="reportQuotient"` +
        `><block s="reportVariadicSum"><block var="bounds"/></block><l>2</l><` +
        `/block></block><block s="doSetVar"><l>stage bounds</l><block s="repo` +
        `rtAskFor"><block s="reportGet"><l><option>stage</option></l></block>` +
        `<block s="reifyReporter"><autolambda><block s="reportNewList"><list>` +
        `<block s="reportNewList"><list><block s="reportGet"><l><option>left<` +
        `/option></l></block><block s="reportGet"><l><option>bottom</option><` +
        `/l></block></list></block><block s="reportNewList"><list><block s="r` +
        `eportGet"><l><option>right</option></l></block><block s="reportGet">` +
        `<l><option>top</option></l></block></list></block></list></block></a` +
        `utolambda><list></list></block><list></list></block></block><block s` +
        `="doSetVar"><l>dir x</l><block s="reportMonadic"><l><option>sin</opt` +
        `ion></l><block s="direction"></block></block></block><block s="doSet` +
        `Var"><l>dir y</l><block s="reportMonadic"><l><option>cos</option></l` +
        `><block s="direction"></block></block></block><block s="doIf"><block` +
        ` s="reportVariadicLessThan"><list><block s="reportListItem"><l>1</l>` +
        `<block s="reportListItem"><l>1</l><block var="bounds"/></block></blo` +
        `ck><block s="reportListItem"><l>1</l><block s="reportListItem"><l>1<` +
        `/l><block var="stage bounds"/></block></block></list></block><script` +
        `><block s="doSetVar"><l>dir x</l><block s="reportMonadic"><l><option` +
        `>abs</option></l><block var="dir x"/></block></block></script><list>` +
        `</list></block><block s="doIf"><block s="reportVariadicGreaterThan">` +
        `<list><block s="reportListItem"><l>1</l><block s="reportListItem"><l` +
        `>2</l><block var="bounds"/></block></block><block s="reportListItem"` +
        `><l>1</l><block s="reportListItem"><l>2</l><block var="stage bounds"` +
        `/></block></block></list></block><script><block s="doSetVar"><l>dir ` +
        `x</l><block s="reportMonadic"><l><option>neg</option></l><block s="r` +
        `eportMonadic"><l><option>abs</option></l><block var="dir x"/></block` +
        `></block></block></script><list></list></block><block s="doIf"><bloc` +
        `k s="reportVariadicGreaterThan"><list><block s="reportListItem"><l>2` +
        `</l><block s="reportListItem"><l>2</l><block var="bounds"/></block><` +
        `/block><block s="reportListItem"><l>2</l><block s="reportListItem"><` +
        `l>2</l><block var="stage bounds"/></block></block></list></block><sc` +
        `ript><block s="doSetVar"><l>dir y</l><block s="reportMonadic"><l><op` +
        `tion>neg</option></l><block s="reportMonadic"><l><option>abs</option` +
        `></l><block var="dir y"/></block></block></block></script><list></li` +
        `st></block><block s="doIf"><block s="reportVariadicLessThan"><list><` +
        `block s="reportListItem"><l>2</l><block s="reportListItem"><l>1</l><` +
        `block var="bounds"/></block></block><block s="reportListItem"><l>2</` +
        `l><block s="reportListItem"><l>1</l><block var="stage bounds"/></blo` +
        `ck></block></list></block><script><block s="doSetVar"><l>dir y</l><b` +
        `lock s="reportMonadic"><l><option>abs</option></l><block var="dir y"` +
        `/></block></block></script><list></list></block><block s="setHeading` +
        `"><block s="reportAtan2"><block var="dir x"/><block var="dir y"/></b` +
        `lock></block><block s="doSetVar"><l>bounds</l><block s="evaluate"><b` +
        `lock var="get bounds"/><list></list></block></block><block s="doGoto` +
        `Object"><block s="reportVariadicSum"><list><block s="getPosition"></` +
        `block><block s="reportDifference"><block var="center"/><block s="rep` +
        `ortQuotient"><block s="reportVariadicSum"><block var="bounds"/></blo` +
        `ck><l>2</l></block></block></list></block></block><block s="doSetVar` +
        `"><l>bounds</l><block s="evaluate"><block var="get bounds"/><list></` +
        `list></block></block><block s="doIf"><block s="reportVariadicGreater` +
        `Than"><list><block s="reportListItem"><l>1</l><block s="reportListIt` +
        `em"><l>2</l><block var="bounds"/></block></block><block s="reportLis` +
        `tItem"><l>1</l><block s="reportListItem"><l>2</l><block var="stage b` +
        `ounds"/></block></block></list></block><script><block s="doSetVar"><` +
        `l>delta x</l><block s="reportDifference"><block s="reportListItem"><` +
        `l>1</l><block s="reportListItem"><l>2</l><block var="stage bounds"/>` +
        `</block></block><block s="reportListItem"><l>1</l><block s="reportLi` +
        `stItem"><l>2</l><block var="bounds"/></block></block></block></block` +
        `></script><list></list></block><block s="doIf"><block s="reportVaria` +
        `dicLessThan"><list><block s="reportListItem"><l>2</l><block s="repor` +
        `tListItem"><l>1</l><block var="bounds"/></block></block><block s="re` +
        `portListItem"><l>2</l><block s="reportListItem"><l>1</l><block var="` +
        `stage bounds"/></block></block></list></block><script><block s="doSe` +
        `tVar"><l>delta y</l><block s="reportDifference"><block s="reportList` +
        `Item"><l>2</l><block s="reportListItem"><l>1</l><block var="stage bo` +
        `unds"/></block></block><block s="reportListItem"><l>2</l><block s="r` +
        `eportListItem"><l>1</l><block var="bounds"/></block></block></block>` +
        `</block></script><list></list></block><block s="doIf"><block s="repo` +
        `rtVariadicLessThan"><list><block s="reportListItem"><l>1</l><block s` +
        `="reportListItem"><l>1</l><block var="bounds"/></block></block><bloc` +
        `k s="reportListItem"><l>1</l><block s="reportListItem"><l>1</l><bloc` +
        `k var="stage bounds"/></block></block></list></block><script><block ` +
        `s="doSetVar"><l>delta x</l><block s="reportDifference"><block s="rep` +
        `ortListItem"><l>1</l><block s="reportListItem"><l>1</l><block var="s` +
        `tage bounds"/></block></block><block s="reportListItem"><l>1</l><blo` +
        `ck s="reportListItem"><l>1</l><block var="bounds"/></block></block><` +
        `/block></block></script><list></list></block><block s="doIf"><block ` +
        `s="reportVariadicGreaterThan"><list><block s="reportListItem"><l>2</` +
        `l><block s="reportListItem"><l>2</l><block var="bounds"/></block></b` +
        `lock><block s="reportListItem"><l>2</l><block s="reportListItem"><l>` +
        `2</l><block var="stage bounds"/></block></block></list></block><scri` +
        `pt><block s="doSetVar"><l>delta y</l><block s="reportDifference"><bl` +
        `ock s="reportListItem"><l>2</l><block s="reportListItem"><l>2</l><bl` +
        `ock var="stage bounds"/></block></block><block s="reportListItem"><l` +
        `>2</l><block s="reportListItem"><l>2</l><block var="bounds"/></block` +
        `></block></block></block></script><list></list></block><block s="doG` +
        `otoObject"><block s="reportVariadicSum"><list><block s="getPosition"` +
        `></block><block s="reportNewList"><list><block var="delta x"/><block` +
        ` var="delta y"/></list></block></list></block></block></script><list` +
        `></list></block></script></block-definition><block-definition s="pos` +
        `ition" type="reporter" category="motion" selector="getPosition"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts><script><block s="doReport"><block s="reportNewList"><list><bloc` +
        `k s="xPosition"></block><block s="yPosition"></block></list></block>` +
        `</block></script></block-definition><block-definition s="x position"` +
        ` type="reporter" category="motion" selector="xPosition" primitive="x` +
        `Position"><header></header><code></code><translations></translations` +
        `><inputs></inputs></block-definition><block-definition s="y position` +
        `" type="reporter" category="motion" selector="yPosition" primitive="` +
        `yPosition"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="direction` +
        `" type="reporter" category="motion" selector="direction" primitive="` +
        `direction"><header></header><code></code><translations></translation` +
        `s><inputs></inputs></block-definition><block-definition s="switch to` +
        ` costume %#1" type="command" category="looks" selector="doSwitchToCo` +
        `stume" primitive="doSwitchToCostume"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        `><options>§_costumesMenu</options></input></inputs></block-definitio` +
        `n><block-definition s="next costume" type="command" category="looks"` +
        ` selector="doWearNextCostume"><header></header><code></code><transla` +
        `tions></translations><inputs></inputs><script><block s="doIf"><block` +
        ` s="reportVariadicGreaterThan"><list><block s="getCostumeIdx"></bloc` +
        `k><l>0</l></list></block><script><block s="doSwitchToCostume"><block` +
        ` s="reportVariadicSum"><list><block s="reportModulus"><block s="getC` +
        `ostumeIdx"></block><block s="reportListAttribute"><l><option>length<` +
        `/option></l><block s="reportGet"><l><option>costumes</option></l></b` +
        `lock></block></block><l>1</l></list></block></block></script><list><` +
        `/list></block></script></block-definition><block-definition s="costu` +
        `me #" type="reporter" category="looks" selector="getCostumeIdx"><hea` +
        `der></header><code></code><translations></translations><inputs></inp` +
        `uts><script><block s="doReport"><block s="reportListIndex"><block s=` +
        `"reportGet"><l><option>costume</option></l></block><block s="reportG` +
        `et"><l><option>costumes</option></l></block></block></block></script` +
        `></block-definition><block-definition s="%#1 of costume %#2" type="r` +
        `eporter" category="looks" selector="reportGetImageAttribute" primiti` +
        `ve="reportGetImageAttribute"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%s" readonly="true" irrepla` +
        `ceable="true">$_width<options>name=$_name&#xD;width=$_width&#xD;heig` +
        `ht=$_height&#xD;pixels=$_pixels</options></input><input type="%s" re` +
        `adonly="true">$_current<options>§_costumesMenu</options></input></in` +
        `puts></block-definition><block-definition s="new costume %#1 width %` +
        `#2 height %#3" type="reporter" category="looks" selector="reportNewC` +
        `ostume" primitive="reportNewCostume"><header></header><code></code><` +
        `translations></translations><inputs><input type="%l" readonly="true"` +
        `></input><input type="%n"><options>a List [2 elements]</options></in` +
        `put><input type="%n"><options>a List [2 elements]</options></input><` +
        `/inputs></block-definition><block-definition s="stretch %#1 x: %#2 y` +
        `: %#3 %" type="reporter" category="looks" selector="reportNewCostume` +
        `Stretched" primitive="reportNewCostumeStretched"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true">$_current<options>§_costumesMenu</options></input><inpu` +
        `t type="%n">100</input><input type="%n">50</input></inputs></block-d` +
        `efinition><block-definition s="skew %#1 to %#2 degrees %#3 %" type="` +
        `reporter" category="looks" selector="reportNewCostumeSkewed" primiti` +
        `ve="reportNewCostumeSkewed"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s" readonly="true">$_curren` +
        `t<options>§_costumesMenu</options></input><input type="%n">0<options` +
        `>§_dir=&#xD;(90) right=90&#xD;(-90) left=-90&#xD;(0) up=0&#xD;(180) ` +
        `down=180&#xD;random=$_random</options></input><input type="%n">50</i` +
        `nput></inputs></block-definition><block-definition s="say %&apos;msg` +
        `&apos; for %&apos;time&apos; secs" type="command" category="looks" s` +
        `elector="doSayFor"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s">Hello!</input><input type="%n">2<` +
        `/input><input type="%s">Hello!</input><input type="%n">2</input><inp` +
        `ut type="%s">Hello!</input></inputs><script><block s="bubble"><block` +
        ` var="msg"/></block><block s="doWait"><block var="time"/></block><bl` +
        `ock s="bubble"><l></l></block></script></block-definition><block-def` +
        `inition s="say %#1" type="command" category="looks" selector="bubble` +
        `" primitive="bubble"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s">Hello!</input></inputs></block-` +
        `definition><block-definition s="think %&apos;msg&apos; for %&apos;ti` +
        `me&apos; secs" type="command" category="looks" selector="doThinkFor"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s">Hmm...</input><input type="%n">2</input><input type` +
        `="%s">Hmm...</input><input type="%n">2</input><input type="%s">Hmm..` +
        `.</input></inputs><script><block s="doThink"><block var="msg"/></blo` +
        `ck><block s="doWait"><block var="time"/></block><block s="doThink"><` +
        `l></l></block></script></block-definition><block-definition s="think` +
        ` %#1" type="command" category="looks" selector="doThink" primitive="` +
        `doThink"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s">Hmm...</input></inputs></block-definition><` +
        `block-definition s="change %&apos;effect name&apos; effect by %&apos` +
        `;delta&apos;" type="command" category="looks" selector="changeEffect` +
        `" primitive="changeEffect"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">$_ghost<options>color=$_color&#xD;saturation=$_saturatio` +
        `n&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fishey` +
        `e&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&#xD;` +
        `negative=$_negative</options></input><input type="%n">25</input><inp` +
        `ut type="%s" readonly="true" irreplaceable="true">$_ghost<options>co` +
        `lor=$_color&#xD;saturation=$_saturation&#xD;brightness=$_brightness&` +
        `#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pixela` +
        `te=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</options><` +
        `/input><input type="%n">25</input><input type="%s" readonly="true" i` +
        `rreplaceable="true">ghost<options>color&#xD;saturation&#xD;brightnes` +
        `s&#xD;ghost&#xD;fisheye&#xD;whirl&#xD;pixelate&#xD;mosaic&#xD;negati` +
        `ve</options></input></inputs></block-definition><block-definition s=` +
        `"set %#1 effect to %#2" type="command" category="looks" selector="se` +
        `tEffect" primitive="setEffect"><header></header><code></code><transl` +
        `ations></translations><inputs><input type="%s" readonly="true" irrep` +
        `laceable="true">$_ghost<options>color=$_color&#xD;saturation=$_satur` +
        `ation&#xD;brightness=$_brightness&#xD;ghost=$_ghost&#xD;fisheye=$_fi` +
        `sheye&#xD;whirl=$_whirl&#xD;pixelate=$_pixelate&#xD;mosaic=$_mosaic&` +
        `#xD;negative=$_negative</options></input><input type="%n">0</input><` +
        `/inputs></block-definition><block-definition s="%#1 effect" type="re` +
        `porter" category="looks" selector="getEffect" primitive="getEffect">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true" irreplaceable="true">$_ghost<options` +
        `>color=$_color&#xD;saturation=$_saturation&#xD;brightness=$_brightne` +
        `ss&#xD;ghost=$_ghost&#xD;fisheye=$_fisheye&#xD;whirl=$_whirl&#xD;pix` +
        `elate=$_pixelate&#xD;mosaic=$_mosaic&#xD;negative=$_negative</option` +
        `s></input></inputs></block-definition><block-definition s="clear gra` +
        `phic effects" type="command" category="looks" selector="clearEffects` +
        `" primitive="clearEffects"><header></header><code></code><translatio` +
        `ns></translations><inputs></inputs></block-definition><block-definit` +
        `ion s="change size by %&apos;delta&apos;" type="command" category="l` +
        `ooks" selector="changeScale"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%n">10</input><input type="` +
        `%n">10</input><input type="%n">10</input></inputs><script><block s="` +
        `setScale"><block s="reportVariadicSum"><list><block s="getScale"></b` +
        `lock><block var="delta"/></list></block></block></script></block-def` +
        `inition><block-definition s="set size to %#1 %" type="command" categ` +
        `ory="looks" selector="setScale" primitive="setScale"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%n"` +
        `>100</input></inputs></block-definition><block-definition s="size" t` +
        `ype="reporter" category="looks" selector="getScale" primitive="getSc` +
        `ale"><header></header><code></code><translations></translations><inp` +
        `uts></inputs></block-definition><block-definition s="show" type="com` +
        `mand" category="looks" selector="show" primitive="show"><header></he` +
        `ader><code></code><translations></translations><inputs></inputs></bl` +
        `ock-definition><block-definition s="hide" type="command" category="l` +
        `ooks" selector="hide" primitive="hide"><header></header><code></code` +
        `><translations></translations><inputs></inputs></block-definition><b` +
        `lock-definition s="shown?" type="predicate" category="looks" selecto` +
        `r="reportShown" primitive="reportShown"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="go to %#1 layer" type="command" category="looks"` +
        ` selector="goToLayer" primitive="goToLayer"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">$_front<options>front=$_front&#xD;back=` +
        `$_back</options></input></inputs></block-definition><block-definitio` +
        `n s="go back %#1 layers" type="command" category="looks" selector="g` +
        `oBack" primitive="goBack"><header></header><code></code><translation` +
        `s></translations><inputs><input type="%n">1</input></inputs></block-` +
        `definition><block-definition s="save %#1 as costume named %#2" type=` +
        `"command" category="looks" selector="doScreenshot" primitive="doScre` +
        `enshot"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true">$_pen trails<options>pen tra` +
        `ils=$_pen trails&#xD;stage image=$_stage image</options></input><inp` +
        `ut type="%s">screenshot</input></inputs></block-definition><block-de` +
        `finition s="wardrobe" type="reporter" category="looks" selector="rep` +
        `ortCostumes" primitive="reportCostumes"><header></header><code></cod` +
        `e><translations></translations><inputs></inputs></block-definition><` +
        `block-definition s="alert %#1" type="command" category="looks" selec` +
        `tor="alert" primitive="alert"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%mult%s" readonly="true"><` +
        `/input></inputs></block-definition><block-definition s="console log ` +
        `%#1" type="command" category="looks" selector="log" primitive="log">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%mult%s" readonly="true"></input></inputs></block-defini` +
        `tion><block-definition s="play sound %#1" type="command" category="s` +
        `ound" selector="playSound" primitive="playSound"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true"><options>§_soundsMenu</options></input></inputs></block` +
        `-definition><block-definition s="play sound %&apos;target&apos; unti` +
        `l done" type="command" category="sound" selector="doPlaySoundUntilDo` +
        `ne" primitive="doPlaySoundUntilDone"><header></header><code></code><` +
        `translations></translations><inputs><input type="%s" readonly="true"` +
        `><options>§_soundsMenu</options></input><input type="%s" readonly="t` +
        `rue"><options>§_soundsMenu</options></input><input type="%s" readonl` +
        `y="true"><options>§_soundsMenu</options></input></inputs><script><bl` +
        `ock s="doDeclareVariables"><list><l>sound</l></list></block><block s` +
        `="doSetVar"><l>sound</l><block s="reportIfElse"><block s="reportIsA"` +
        `><block var="target"/><l><option>sound</option></l></block><block va` +
        `r="target"/><block s="reportIfElse"><block s="reportIsA"><block var=` +
        `"target"/><l><option>list</option></l></block><block s="reportNewSou` +
        `ndFromSamples"><block var="target"/><l>44100</l></block><block s="re` +
        `portFindFirst"><block s="reifyPredicate"><autolambda><block s="repor` +
        `tVariadicEquals"><list><block s="reportGetSoundAttribute"><l><option` +
        `>name</option></l><l></l></block><block var="target"/></list></block` +
        `></autolambda><list></list></block><block s="reportGet"><l><option>s` +
        `ounds</option></l></block></block></block></block></block><block s="` +
        `doIf"><block s="reportIsA"><block var="sound"/><l><option>sound</opt` +
        `ion></l></block><script><block s="playSound"><block var="sound"/></b` +
        `lock><block s="doWait"><block s="reportGetSoundAttribute"><l><option` +
        `>duration</option></l><block var="sound"/></block></block></script><` +
        `list></list></block></script><scripts><script x="10" y="98"><block s` +
        `="doDeclareVariables"><list><l>sound</l></list></block><block s="doS` +
        `etVar"><l>sound</l><block s="reportIfElse"><block s="reportIsA"><blo` +
        `ck var="target"/><l><option>sound</option></l></block><block var="ta` +
        `rget"/><block s="reportIfElse"><block s="reportIsA"><block var="targ` +
        `et"/><l><option>list</option></l></block><block s="reportNewSoundFro` +
        `mSamples"><block var="target"/><l>44100</l></block><block s="reportF` +
        `indFirst"><block s="reifyPredicate"><autolambda><block s="reportVari` +
        `adicEquals"><list><block s="reportGetSoundAttribute"><l><option>name` +
        `</option></l><l></l></block><block var="target"/></list></block></au` +
        `tolambda><list></list></block><block s="reportGet"><l><option>sounds` +
        `</option></l></block></block></block></block></block><block s="doIf"` +
        `><block s="reportIsA"><block var="sound"/><l><option>sound</option><` +
        `/l></block><script><block s="playSound"><block var="sound"/></block>` +
        `<block s="doWait"><block s="reportGetSoundAttribute"><l><option>dura` +
        `tion</option></l><block var="sound"/></block></block></script><list>` +
        `</list></block></script></scripts></block-definition><block-definiti` +
        `on s="play sound %&apos;target&apos; at %&apos;rate&apos; Hz" type="` +
        `command" category="sound" selector="doPlaySoundAtRate" primitive="do` +
        `PlaySoundAtRate"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%s" readonly="true"><options>§_soundsMe` +
        `nu</options></input><input type="%n">44100<options>22.05 kHz=22050&#` +
        `xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz=960` +
        `00</options></input><input type="%s" readonly="true"><options>§_soun` +
        `dsMenu</options></input><input type="%n">44100<options>22.05 kHz=220` +
        `50&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=88200&#xD;96 kHz` +
        `=96000</options></input><input type="%s" readonly="true"><options>§_` +
        `soundsMenu</options></input></inputs><script><block s="playSound"><b` +
        `lock s="reportNewSoundFromSamples"><block s="reportGetSoundAttribute` +
        `"><l><option>samples</option></l><block var="target"/></block><block` +
        ` var="rate"/></block></block></script><scripts><script x="10" y="98"` +
        `><block s="playSound"><block s="reportNewSoundFromSamples"><block s=` +
        `"reportGetSoundAttribute"><l><option>samples</option></l><block var=` +
        `"target"/></block><block var="rate"/></block></block></script></scri` +
        `pts></block-definition><block-definition s="stop all sounds" type="c` +
        `ommand" category="sound" selector="doStopAllSounds" primitive="doSto` +
        `pAllSounds"><header></header><code></code><translations></translatio` +
        `ns><inputs></inputs></block-definition><block-definition s="%#1 of s` +
        `ound %#2" type="reporter" category="sound" selector="reportGetSoundA` +
        `ttribute" primitive="reportGetSoundAttribute"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true" irreplaceable="true">$_duration<options>name=$_name&#xD;du` +
        `ration=$_duration&#xD;length=$_length&#xD;number of channels=$_numbe` +
        `r of channels&#xD;sample rate=$_sample rate&#xD;samples=$_samples</o` +
        `ptions></input><input type="%s" readonly="true"><options>§_soundsMen` +
        `u</options></input></inputs></block-definition><block-definition s="` +
        `new sound %#1 rate %#2 Hz" type="reporter" category="sound" selector` +
        `="reportNewSoundFromSamples" primitive="reportNewSoundFromSamples"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%l" readonly="true"></input><input type="%n">44100<option` +
        `s>22.05 kHz=22050&#xD;44.1 kHz=44100&#xD;48 kHz=48000&#xD;88.2 kHz=8` +
        `8200&#xD;96 kHz=96000</options></input></inputs></block-definition><` +
        `block-definition s="rest for %&apos;beats&apos; beats" type="command` +
        `" category="sound" selector="doRest"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">0.2</input><inp` +
        `ut type="%n">0.2</input><input type="%n">0.2</input></inputs><script` +
        `><block s="doWait"><block s="reportQuotient"><l>60</l><block s="repo` +
        `rtVariadicProduct"><list><block var="beats"/><block s="getTempo"></b` +
        `lock></list></block></block></block></script></block-definition><blo` +
        `ck-definition s="play note %#1 for %#2 beats" type="command" categor` +
        `y="sound" selector="doPlayNote" primitive="doPlayNote"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `n">60<options>§_pianoKeyboardMenu</options></input><input type="%n">` +
        `0.5</input></inputs></block-definition><block-definition s="play %#1` +
        ` Hz for %#2 secs" type="command" category="sound" selector="doPlayFr` +
        `equency" primitive="doPlayFrequency"><header></header><code></code><` +
        `translations></translations><inputs><input type="%n">440</input><inp` +
        `ut type="%n">2</input></inputs></block-definition><block-definition ` +
        `s="set instrument to %#1" type="command" category="sound" selector="` +
        `doSetInstrument" primitive="doSetInstrument"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n">1<optio` +
        `ns>(1) sine=1&#xD;(2) square=2&#xD;(3) sawtooth=3&#xD;(4) triangle=4` +
        `</options></input></inputs></block-definition><block-definition s="c` +
        `hange tempo by %&apos;delta&apos;" type="command" category="sound" s` +
        `elector="doChangeTempo"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%n">20</input><input type="%n">2` +
        `0</input><input type="%n">20</input></inputs><script><block s="doSet` +
        `Tempo"><block s="reportVariadicSum"><list><block s="getTempo"></bloc` +
        `k><block var="delta"/></list></block></block></script></block-defini` +
        `tion><block-definition s="set tempo to %#1 bpm" type="command" categ` +
        `ory="sound" selector="doSetTempo" primitive="doSetTempo"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%n">60</input></inputs></block-definition><block-definition s="temp` +
        `o" type="reporter" category="sound" selector="getTempo" primitive="g` +
        `etTempo"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="change volu` +
        `me by %&apos;delta&apos;" type="command" category="sound" selector="` +
        `changeVolume"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%n">10</input><input type="%n">10</input><` +
        `input type="%n">10</input></inputs><script><block s="setVolume"><blo` +
        `ck s="reportVariadicSum"><list><block s="getVolume"></block><block v` +
        `ar="delta"/></list></block></block></script></block-definition><bloc` +
        `k-definition s="set volume to %#1 %" type="command" category="sound"` +
        ` selector="setVolume" primitive="setVolume"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%n">100</inp` +
        `ut></inputs></block-definition><block-definition s="volume" type="re` +
        `porter" category="sound" selector="getVolume" primitive="getVolume">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `/inputs></block-definition><block-definition s="change balance by %&` +
        `apos;delta&apos;" type="command" category="sound" selector="changePa` +
        `n"><header></header><code></code><translations></translations><input` +
        `s><input type="%n">10</input><input type="%n">10</input><input type=` +
        `"%n">10</input></inputs><script><block s="setPan"><block s="reportVa` +
        `riadicSum"><list><block s="getPan"></block><block var="delta"/></lis` +
        `t></block></block></script></block-definition><block-definition s="s` +
        `et balance to %#1" type="command" category="sound" selector="setPan"` +
        ` primitive="setPan"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%n">0</input></inputs></block-defini` +
        `tion><block-definition s="balance" type="reporter" category="sound" ` +
        `selector="getPan" primitive="getPan"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="play frequency %#1 Hz" type="command" category="sou` +
        `nd" selector="playFreq" primitive="playFreq"><header></header><code>` +
        `</code><translations></translations><inputs><input type="%n">440</in` +
        `put></inputs></block-definition><block-definition s="stop frequency"` +
        ` type="command" category="sound" selector="stopFreq" primitive="stop` +
        `Freq"><header></header><code></code><translations></translations><in` +
        `puts></inputs></block-definition><block-definition s="jukebox" type=` +
        `"reporter" category="sound" selector="reportSounds" primitive="repor` +
        `tSounds"><header></header><code></code><translations></translations>` +
        `<inputs></inputs></block-definition><block-definition s="clear" type` +
        `="command" category="pen" selector="clear" primitive="clear"><header` +
        `></header><code></code><translations></translations><inputs></inputs` +
        `></block-definition><block-definition s="pen down" type="command" ca` +
        `tegory="pen" selector="down" primitive="down"><header></header><code` +
        `></code><translations></translations><inputs></inputs></block-defini` +
        `tion><block-definition s="pen up" type="command" category="pen" sele` +
        `ctor="up" primitive="up"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="pen down?" type="predicate" category="pen" selector="getPenDown` +
        `" primitive="getPenDown"><header></header><code></code><translations` +
        `></translations><inputs></inputs></block-definition><block-definitio` +
        `n s="set pen color to %&apos;color&apos;" type="command" category="p` +
        `en" selector="setColor"><header></header><code></code><translations>` +
        `</translations><inputs><input type="%clr" readonly="true" irreplacea` +
        `ble="true"></input><input type="%clr" readonly="true" irreplaceable=` +
        `"true"></input><input type="%clr" readonly="true" irreplaceable="tru` +
        `e"></input></inputs><script><block s="doApplyExtension"><l>clr_setpe` +
        `n(clr)</l><list><block var="color"/></list></block></script></block-` +
        `definition><block-definition s="set pen %#1 to %#2" type="command" c` +
        `ategory="pen" selector="setPenColorDimension" primitive="setPenColor` +
        `Dimension"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true" irreplaceable="true">$_hu` +
        `e<options>hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_bri` +
        `ghtness&#xD;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r` +
        `-g-b(-a)</options></input><input type="%n">50</input></inputs></bloc` +
        `k-definition><block-definition s="change pen %&apos;aspect&apos; by ` +
        `%&apos;delta&apos;" type="command" category="pen" selector="changePe` +
        `nColorDimension" primitive="changePenColorDimension"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%s"` +
        ` readonly="true" irreplaceable="true">$_hue<options>hue=$_hue&#xD;sa` +
        `turation=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$` +
        `_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input>` +
        `<input type="%n">10</input><input type="%s" readonly="true" irreplac` +
        `eable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD` +
        `;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#126;&` +
        `#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10</inpu` +
        `t><input type="%s" readonly="true" irreplaceable="true">hue<options>` +
        `hue&#xD;saturation&#xD;brightness&#xD;transparency&#xD;&#126;&#xD;r-` +
        `g-b(-a)</options></input></inputs></block-definition><block-definiti` +
        `on s="pen %#1" type="reporter" category="pen" selector="getPenAttrib` +
        `ute" primitive="getPenAttribute"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_hue<options>size=$_size&#xD;hue=$_hue&#xD;satura` +
        `tion=$_saturation&#xD;brightness=$_brightness&#xD;transparency=$_tra` +
        `nsparency&#xD;&#126;&#xD;r-g-b-a=$_r-g-b-a</options></input></inputs` +
        `></block-definition><block-definition s="set background color to %#1` +
        `" type="command" category="pen" selector="setBackgroundColor" primit` +
        `ive="setBackgroundColor"><header></header><code></code><translations` +
        `></translations><inputs><input type="%clr" readonly="true" irreplace` +
        `able="true"></input></inputs></block-definition><block-definition s=` +
        `"set background %#1 to %#2" type="command" category="pen" selector="` +
        `setBackgroundColorDimension" primitive="setBackgroundColorDimension"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `<input type="%s" readonly="true" irreplaceable="true">$_hue<options>` +
        `hue=$_hue&#xD;saturation=$_saturation&#xD;brightness=$_brightness&#x` +
        `D;transparency=$_transparency&#xD;&#126;&#xD;r-g-b(-a)=$_r-g-b(-a)</` +
        `options></input><input type="%n">50</input></inputs></block-definiti` +
        `on><block-definition s="change background %#1 by %#2" type="command"` +
        ` category="pen" selector="changeBackgroundColorDimension" primitive=` +
        `"changeBackgroundColorDimension"><header></header><code></code><tran` +
        `slations></translations><inputs><input type="%s" readonly="true" irr` +
        `eplaceable="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturatio` +
        `n&#xD;brightness=$_brightness&#xD;transparency=$_transparency&#xD;&#` +
        `126;&#xD;r-g-b(-a)=$_r-g-b(-a)</options></input><input type="%n">10<` +
        `/input></inputs></block-definition><block-definition s="change pen s` +
        `ize by %&apos;delta&apos;" type="command" category="pen" selector="c` +
        `hangeSize"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%n">1</input><input type="%n">1</input><input` +
        ` type="%n">1</input></inputs><script><block s="setSize"><block s="re` +
        `portVariadicSum"><list><block s="getPenAttribute"><l><option>size</o` +
        `ption></l></block><block var="delta"/></list></block></block></scrip` +
        `t></block-definition><block-definition s="set pen size to %#1" type=` +
        `"command" category="pen" selector="setSize" primitive="setSize"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%n">1</input></inputs></block-definition><block-definition s` +
        `="stamp" type="command" category="pen" selector="doStamp" primitive=` +
        `"doStamp"><header></header><code></code><translations></translations` +
        `><inputs></inputs></block-definition><block-definition s="fill" type` +
        `="command" category="pen" selector="floodFill" primitive="floodFill"` +
        `><header></header><code></code><translations></translations><inputs>` +
        `</inputs></block-definition><block-definition s="write %#1 size %#2"` +
        ` type="command" category="pen" selector="write" primitive="write"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s">Hello!</input><input type="%n">12</input></inputs></bl` +
        `ock-definition><block-definition s="pen trails" type="reporter" cate` +
        `gory="pen" selector="reportPenTrailsAsCostume" primitive="reportPenT` +
        `railsAsCostume"><header></header><code></code><translations></transl` +
        `ations><inputs></inputs></block-definition><block-definition s="pen ` +
        `vectors" type="reporter" category="pen" selector="reportPentrailsAsS` +
        `VG" primitive="reportPentrailsAsSVG"><header></header><code></code><` +
        `translations></translations><inputs></inputs></block-definition><blo` +
        `ck-definition s="paste on %#1" type="command" category="pen" selecto` +
        `r="doPasteOn" primitive="doPasteOn"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true">` +
        `<options>§_objectsMenu</options></input></inputs></block-definition>` +
        `<block-definition s="cut from %#1" type="command" category="pen" sel` +
        `ector="doCutFrom" primitive="doCutFrom"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s" readonly="tr` +
        `ue"><options>§_objectsMenu</options></input></inputs></block-definit` +
        `ion><block-definition s="message" type="reporter" category="control"` +
        ` selector="getLastMessage" primitive="getLastMessage"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="broadcast %#1 %#2" type="command" ` +
        `category="control" selector="doBroadcast" primitive="doBroadcast"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s" readonly="true"><options>§_messagesMenu</options></inp` +
        `ut><input type="%receive" readonly="true" irreplaceable="true" expan` +
        `d="to&#xD;with data" max="2"></input></inputs></block-definition><bl` +
        `ock-definition s="broadcast %#1 %#2 and wait" type="command" categor` +
        `y="control" selector="doBroadcastAndWait" primitive="doBroadcastAndW` +
        `ait"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%s" readonly="true"><options>§_messagesMenu</option` +
        `s></input><input type="%receive" readonly="true" irreplaceable="true` +
        `" expand="to&#xD;with data" max="2"></input></inputs></block-definit` +
        `ion><block-definition s="wait %&apos;duration&apos; secs" type="comm` +
        `and" category="control" selector="doWait"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%n">1</input><` +
        `input type="%n">1</input><input type="%n">1</input></inputs><script>` +
        `<block s="doDeclareVariables"><list><l>start time</l></list></block>` +
        `<block s="doSetVar"><l>start time</l><block s="reportDate"><l><optio` +
        `n>time in milliseconds</option></l></block></block><block s="doWaitU` +
        `ntil"><block s="reportVariadicGreaterThanOrEquals"><list><block s="r` +
        `eportDate"><l><option>time in milliseconds</option></l></block><bloc` +
        `k s="reportVariadicSum"><list><block var="start time"/><block s="rep` +
        `ortVariadicProduct"><list><block var="duration"/><l>1000</l></list><` +
        `/block></list></block></list></block></block></script></block-defini` +
        `tion><block-definition s="wait until %&apos;condition&apos;" type="c` +
        `ommand" category="control" selector="doWaitUntil"><header></header><` +
        `code></code><translations></translations><inputs><input type="%boolU` +
        `E" readonly="true"></input><input type="%boolUE" readonly="true"></i` +
        `nput><input type="%boolUE" readonly="true"></input></inputs><script>` +
        `<block s="doIf"><block s="reportNot"><block s="evaluate"><block var=` +
        `"condition"/><list></list></block></block><script><block s="doWaitUn` +
        `til"><block s="evaluate"><block var="condition"/><list></list></bloc` +
        `k></block></script><list></list></block></script></block-definition>` +
        `<block-definition s="forever %&apos;action&apos;" type="command" cat` +
        `egory="control" selector="doForever"><header></header><code></code><` +
        `translations></translations><inputs><input type="%loop" readonly="tr` +
        `ue" irreplaceable="true"></input><input type="%loop" readonly="true"` +
        ` irreplaceable="true"></input><input type="%loop" readonly="true" ir` +
        `replaceable="true"></input></inputs><script><block s="doRun"><block ` +
        `var="action"/><list></list></block><block s="doRun"><block s="report` +
        `Environment"><l><option>script</option></l></block><list><block var=` +
        `"action"/></list></block></script></block-definition><block-definiti` +
        `on s="repeat %&apos;count&apos; %&apos;action&apos;" type="command" ` +
        `category="control" selector="doRepeat"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">10</input><in` +
        `put type="%loop" readonly="true" irreplaceable="true"></input><input` +
        ` type="%n">10</input><input type="%loop" readonly="true" irreplaceab` +
        `le="true"></input><input type="%loop" readonly="true" irreplaceable=` +
        `"true"></input></inputs><script><block s="doDeclareVariables"><list>` +
        `<l>self</l></list></block><block s="doSetVar"><l>self</l><block s="r` +
        `eportEnvironment"><l><option>script</option></l></block></block><blo` +
        `ck s="doIf"><block s="reportVariadicGreaterThan"><list><block var="c` +
        `ount"/><l>0</l></list></block><script><block s="doRun"><block var="a` +
        `ction"/><list></list></block><block s="doApplyExtension"><l>snap_yie` +
        `ld</l><list></list></block><block s="doRun"><block var="self"/><list` +
        `><block s="reportDifference"><block var="count"/><l>1</l></block><bl` +
        `ock var="action"/></list></block></script><list></list></block></scr` +
        `ipt></block-definition><block-definition s="repeat until %&apos;cond` +
        `ition&apos; %&apos;action&apos;" type="command" category="control" s` +
        `elector="doUntil"><header></header><code></code><translations></tran` +
        `slations><inputs><input type="%boolUE" readonly="true"></input><inpu` +
        `t type="%loop" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%boolUE" readonly="true"></input><input type="%loop" readonly="` +
        `true" irreplaceable="true"></input><input type="%loop" readonly="tru` +
        `e" irreplaceable="true"></input></inputs><script><block s="doDeclare` +
        `Variables"><list><l>self</l></list></block><block s="doSetVar"><l>se` +
        `lf</l><block s="reportEnvironment"><l><option>script</option></l></b` +
        `lock></block><block s="doIf"><block s="reportNot"><block s="evaluate` +
        `"><block var="condition"/><list></list></block></block><script><bloc` +
        `k s="doRun"><block var="action"/><list></list></block><block s="doAp` +
        `plyExtension"><l>snap_yield</l><list></list></block><block s="doRun"` +
        `><block var="self"/><list><block var="condition"/><block var="action` +
        `"/></list></block></script><list></list></block></script></block-def` +
        `inition><block-definition s="for %&apos;count&apos; = %&apos;start&a` +
        `pos; to %&apos;end&apos; %&apos;action&apos;" type="command" categor` +
        `y="control" selector="doFor"><header></header><code></code><translat` +
        `ions></translations><inputs><input type="%upvar" readonly="true" irr` +
        `eplaceable="true">i</input><input type="%n">1</input><input type="%n` +
        `">10</input><input type="%loop" readonly="true" irreplaceable="true"` +
        `></input><input type="%upvar" readonly="true" irreplaceable="true">i` +
        `</input><input type="%n">1</input><input type="%n">10</input><input ` +
        `type="%loop" readonly="true" irreplaceable="true"></input><input typ` +
        `e="%loop" readonly="true" irreplaceable="true"></input></inputs><scr` +
        `ipt><block s="doDeclareVariables"><list><l>test</l><l>increment</l><` +
        `/list></block><block s="doSetVar"><l>count</l><block var="start"/></` +
        `block><block s="doIfElse"><block s="reportVariadicLessThan"><list><b` +
        `lock var="start"/><block var="end"/></list></block><script><block s=` +
        `"doSetVar"><l>test</l><block s="reifyPredicate"><autolambda><block s` +
        `="reportVariadicGreaterThan"><list><block var="count"/><block var="e` +
        `nd"/></list></block></autolambda><list></list></block></block><block` +
        ` s="doSetVar"><l>increment</l><l>1</l></block></script><script><bloc` +
        `k s="doSetVar"><l>test</l><block s="reifyPredicate"><autolambda><blo` +
        `ck s="reportVariadicLessThan"><list><block var="count"/><block var="` +
        `end"/></list></block></autolambda><list></list></block></block><bloc` +
        `k s="doSetVar"><l>increment</l><l>-1</l></block></script></block><bl` +
        `ock s="doUntil"><block s="evaluate"><block var="test"/><list></list>` +
        `</block><script><block s="doRun"><block var="action"/><list></list><` +
        `/block><block s="doChangeVar"><l>count</l><block var="increment"/></` +
        `block></script></block></script></block-definition><block-definition` +
        ` s="if %&apos;condition&apos; %&apos;true case&apos; %&apos;else pai` +
        `rs&apos;" type="command" category="control" selector="doIf" primitiv` +
        `e="doIf"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%b" readonly="true"></input><input type="%cs" r` +
        `eadonly="true" irreplaceable="true"></input><input type="%elseif" re` +
        `adonly="true" irreplaceable="true" expand="else if&#xD;"></input><in` +
        `put type="%b" readonly="true"></input><input type="%cs" readonly="tr` +
        `ue" irreplaceable="true"></input><input type="%elseif" readonly="tru` +
        `e" irreplaceable="true" expand="else if&#xD;"></input><input type="%` +
        `b" readonly="true"></input></inputs><script><block s="doDeclareVaria` +
        `bles"><list><l>self</l></list></block><block s="doSetVar"><l>self</l` +
        `><block s="reportEnvironment"><l><option>script</option></l></block>` +
        `</block><block s="doIfElse"><block var="condition"/><script><block s` +
        `="doRun"><block var="true case"/><list></list></block></script><scri` +
        `pt><block s="doIfElse"><block s="reportListIsEmpty"><block var="else` +
        ` pairs"/></block><script></script><script><block s="doIfElse"><block` +
        ` s="reportListItem"><l>1</l><block var="else pairs"/></block><script` +
        `><block s="doRun"><block s="reportListItem"><l>2</l><block var="else` +
        ` pairs"/></block><list></list></block></script><script><block s="doR` +
        `un"><block var="self"/><list><block s="reportBoolean"><l><bool>false` +
        `</bool></l></block><l></l><block s="reportCDR"><block s="reportCDR">` +
        `<block var="else pairs"/></block></block></list></block></script></b` +
        `lock></script></block></script></block></script><scripts><script x="` +
        `10" y="98"><block s="doDeclareVariables"><list><l>self</l></list></b` +
        `lock><block s="doSetVar"><l>self</l><block s="reportEnvironment"><l>` +
        `<option>script</option></l></block></block><block s="doIfElse"><bloc` +
        `k var="condition"/><script><block s="doRun"><block var="true case"/>` +
        `<list></list></block></script><script><block s="doIfElse"><block s="` +
        `reportListIsEmpty"><block var="else pairs"/></block><script></script` +
        `><script><block s="doIfElse"><block s="reportListItem"><l>1</l><bloc` +
        `k var="else pairs"/></block><script><block s="doRun"><block s="repor` +
        `tListItem"><l>2</l><block var="else pairs"/></block><list></list></b` +
        `lock></script><script><block s="doRun"><block var="self"/><list><blo` +
        `ck s="reportBoolean"><l><bool>false</bool></l></block><l></l><block ` +
        `s="reportCDR"><block s="reportCDR"><block var="else pairs"/></block>` +
        `</block></list></block></script></block></script></block></script></` +
        `block></script></scripts></block-definition><block-definition s="if ` +
        `%&apos;condition&apos; %&apos;true case&apos; else %&apos;false case` +
        `&apos;" type="command" category="control" selector="doIfElse" primit` +
        `ive="doIfElse"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%b" readonly="true"></input><input type="` +
        `%cs" readonly="true" irreplaceable="true"></input><input type="%cs" ` +
        `readonly="true" irreplaceable="true"></input><input type="%b" readon` +
        `ly="true"></input><input type="%cs" readonly="true" irreplaceable="t` +
        `rue"></input><input type="%cs" readonly="true" irreplaceable="true">` +
        `</input><input type="%cs" readonly="true" irreplaceable="true"></inp` +
        `ut></inputs><scripts><script x="10" y="97.83333333333331"><block s="` +
        `doRun"><block s="reportListItem"><block s="reportVariadicSum"><list>` +
        `<block var="condition"/><l>1</l></list></block><block s="reportNewLi` +
        `st"><list><block var="false case"/><block var="true case"/></list></` +
        `block></block><list></list></block></script></scripts></block-defini` +
        `tion><block-definition s="if %&apos;condition&apos; then %&apos;true` +
        ` case&apos; else %&apos;false case&apos;" type="reporter" category="` +
        `control" selector="reportIfElse" primitive="reportIfElse"><header></` +
        `header><code></code><translations></translations><inputs><input type` +
        `="%b" readonly="true"></input><input type="%anyUE"></input><input ty` +
        `pe="%anyUE"></input><input type="%b" readonly="true"></input><input ` +
        `type="%anyUE"></input><input type="%anyUE"></input><input type="%b" ` +
        `readonly="true"></input></inputs><scripts><script x="10" y="91.83333` +
        `333333331"><block s="doReport"><block s="reportHyperZip"><block s="r` +
        `eifyReporter"><autolambda><block s="evaluate"><block s="reportListIt` +
        `em"><l></l><l/></block><list></list></block></autolambda><list></lis` +
        `t></block><block s="reportVariadicSum"><list><block var="condition"/` +
        `><l>1</l></list></block><l>0</l><block s="reportNewList"><list><bloc` +
        `k var="false case"/><block var="true case"/></list></block><l>1</l><` +
        `/block></block></script></scripts></block-definition><block-definiti` +
        `on s="stop %#1" type="command" category="control" selector="doStopTh` +
        `is" primitive="doStopThis"><header></header><code></code><translatio` +
        `ns></translations><inputs><input type="%s" readonly="true" irreplace` +
        `able="true">$_all<options>all=$_all&#xD;all scenes=$_all scenes&#xD;` +
        `this script=$_this script&#xD;this block=$_this block&#xD;all but th` +
        `is script=$_all but this script&#xD;other scripts in sprite=$_other ` +
        `scripts in sprite</options></input></inputs></block-definition><bloc` +
        `k-definition s="run %#1 %#2" type="command" category="control" selec` +
        `tor="doRun" primitive="doRun"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%cmdRing" readonly="true">` +
        `</input><input type="%mult%s" readonly="true" expand="with inputs"><` +
        `/input></inputs></block-definition><block-definition s="launch %#1 %` +
        `#2" type="command" category="control" selector="fork" primitive="for` +
        `k"><header></header><code></code><translations></translations><input` +
        `s><input type="%cmdRing" readonly="true"></input><input type="%mult%` +
        `s" readonly="true" expand="with inputs"></input></inputs></block-def` +
        `inition><block-definition s="call %#1 %#2" type="reporter" category=` +
        `"control" selector="evaluate" primitive="evaluate"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%repR` +
        `ing" readonly="true" irreplaceable="true"></input><input type="%mult` +
        `%s" readonly="true" expand="with inputs"></input></inputs></block-de` +
        `finition><block-definition s="report %#1" type="command" category="c` +
        `ontrol" selector="doReport" primitive="doReport"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s"></i` +
        `nput></inputs></block-definition><block-definition s="run %#1 w/cont` +
        `inuation" type="command" category="control" selector="doCallCC" prim` +
        `itive="doCallCC"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%cmdRing" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="call %#1 w/continuation"` +
        ` type="reporter" category="control" selector="reportCallCC" primitiv` +
        `e="reportCallCC"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%cmdRing" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="warp %#1" type="command"` +
        ` category="other" selector="doWarp" primitive="doWarp"><header></hea` +
        `der><code></code><translations></translations><inputs><input type="%` +
        `cs" readonly="true" irreplaceable="true"></input></inputs></block-de` +
        `finition><block-definition s="tell %&apos;target&apos; to %&apos;act` +
        `ion&apos; %&apos;parameters&apos;" type="command" category="control"` +
        ` selector="doTellTo"><header></header><code></code><translations></t` +
        `ranslations><inputs><input type="%s" readonly="true"><options>§_obje` +
        `ctsMenu</options></input><input type="%cmdRing" readonly="true"></in` +
        `put><input type="%mult%s" readonly="true" expand="with inputs"></inp` +
        `ut><input type="%s" readonly="true"><options>§_objectsMenu</options>` +
        `</input><input type="%cmdRing" readonly="true"></input><input type="` +
        `%mult%s" readonly="true" expand="with inputs"></input><input type="%` +
        `s" readonly="true"><options>§_objectsMenu</options></input></inputs>` +
        `<script><block s="doRun"><block s="reportAttributeOf"><block var="ac` +
        `tion"/><block var="target"/></block><block var="parameters"/></block` +
        `></script></block-definition><block-definition s="ask %&apos;target&` +
        `apos; for %&apos;action&apos; %&apos;parameters&apos;" type="reporte` +
        `r" category="control" selector="reportAskFor"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true"><options>§_objectsMenu</options></input><input type="%repR` +
        `ing" readonly="true" irreplaceable="true"></input><input type="%mult` +
        `%s" readonly="true" expand="with inputs"></input><input type="%s" re` +
        `adonly="true"><options>§_objectsMenu</options></input><input type="%` +
        `repRing" readonly="true" irreplaceable="true"></input><input type="%` +
        `mult%s" readonly="true" expand="with inputs"></input><input type="%s` +
        `" readonly="true"><options>§_objectsMenu</options></input></inputs><` +
        `script><block s="doReport"><block s="evaluate"><block s="reportAttri` +
        `buteOf"><block var="action"/><block var="target"/></block><block var` +
        `="parameters"/></block></block></script></block-definition><block-de` +
        `finition s="create a clone of %&apos;target&apos;" type="command" ca` +
        `tegory="control" selector="createClone"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%s" readonly="tr` +
        `ue">$_myself<options>§_clonablesMenu</options></input><input type="%` +
        `s" readonly="true">$_myself<options>§_clonablesMenu</options></input` +
        `><input type="%s" readonly="true">myself<options>§_clonablesMenu</op` +
        `tions></input></inputs><script><block s="doReport"><block s="newClon` +
        `e"><block var="target"/></block></block></script></block-definition>` +
        `<block-definition s="a new clone of %#1" type="reporter" category="c` +
        `ontrol" selector="newClone" primitive="newClone"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%s" rea` +
        `donly="true">$_myself<options>§_clonablesMenu</options></input></inp` +
        `uts></block-definition><block-definition s="delete this clone" type=` +
        `"command" category="control" selector="removeClone" primitive="remov` +
        `eClone"><header></header><code></code><translations></translations><` +
        `inputs></inputs></block-definition><block-definition s="define %#1 %` +
        `#2 %#3" type="command" category="control" selector="doDefineBlock" p` +
        `rimitive="doDefineBlock"><header></header><code></code><translations` +
        `></translations><inputs><input type="%upvar" readonly="true" irrepla` +
        `ceable="true">$_block</input><input type="%s"></input><input type="%` +
        `repRing" readonly="true" irreplaceable="true"></input></inputs></blo` +
        `ck-definition><block-definition s="set %#1 of block %#2 to %#3" type` +
        `="command" category="control" selector="doSetBlockAttribute" primiti` +
        `ve="doSetBlockAttribute"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true">$_label<options>label=$_label&#xD;definition=$_definition&` +
        `#xD;comment=$_comment&#xD;category=$_category&#xD;type=$_type&#xD;sc` +
        `ope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&#xD;&#126;&#xD` +
        `;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$_editables&#xD` +
        `;replaceables=$_replaceables&#xD;&#126;&#xD;separators=$_separators&` +
        `#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;initial slots=$_` +
        `initial slots&#xD;min slots=$_min slots&#xD;max slots=$_max slots&#x` +
        `D;translations=$_translations</options></input><input type="%repRing` +
        `" readonly="true" irreplaceable="true"></input><input type="%s"></in` +
        `put></inputs></block-definition><block-definition s="delete block %#` +
        `1" type="command" category="control" selector="doDeleteBlock" primit` +
        `ive="doDeleteBlock"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%repRing" readonly="true" irreplacea` +
        `ble="true"></input></inputs></block-definition><block-definition s="` +
        `%#1 of block %#2" type="reporter" category="control" selector="repor` +
        `tBlockAttribute" primitive="reportBlockAttribute"><header></header><` +
        `code></code><translations></translations><inputs><input type="%s" re` +
        `adonly="true" irreplaceable="true">$_definition<options>label=$_labe` +
        `l&#xD;definition=$_definition&#xD;comment=$_comment&#xD;category=$_c` +
        `ategory&#xD;custom?=$_custom?&#xD;global?=$_global?&#xD;type=$_type&` +
        `#xD;scope=$_scope&#xD;selector=$_selector&#xD;slots=$_slots&#xD;&#12` +
        `6;&#xD;defaults=$_defaults&#xD;menus=$_menus&#xD;editables=$_editabl` +
        `es&#xD;replaceables=$_replaceables&#xD;&#126;&#xD;separators=$_separ` +
        `ators&#xD;collapses=$_collapses&#xD;expands=$_expands&#xD;initial sl` +
        `ots=$_initial slots&#xD;min slots=$_min slots&#xD;max slots=$_max sl` +
        `ots&#xD;translations=$_translations</options></input><input type="%r` +
        `epRing" readonly="true" irreplaceable="true"></input></inputs></bloc` +
        `k-definition><block-definition s="this %#1" type="reporter" category` +
        `="control" selector="reportEnvironment" primitive="reportEnvironment` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true" irreplaceable="true">$_script<opti` +
        `ons>script=$_script&#xD;caller=$_caller&#xD;continuation=$_continuat` +
        `ion&#xD;&#126;&#xD;inputs=$_inputs</options></input></inputs></block` +
        `-definition><block-definition s="pause all $pause" type="command" ca` +
        `tegory="control" selector="doPauseAll" primitive="doPauseAll"><heade` +
        `r></header><code></code><translations></translations><inputs></input` +
        `s></block-definition><block-definition s="switch to scene %#1 %#2" t` +
        `ype="command" category="control" selector="doSwitchToScene" primitiv` +
        `e="doSwitchToScene"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%s" readonly="true">$_next<options>§` +
        `_scenesMenu</options></input><input type="%send" readonly="true" irr` +
        `eplaceable="true" expand="and send&#xD;with data" max="2"></input></` +
        `inputs></block-definition><block-definition s="pipe %&apos;value&apo` +
        `s; $arrowRight %&apos;functions&apos;" type="reporter" category="con` +
        `trol" selector="reportPipe"><header></header><code></code><translati` +
        `ons></translations><inputs><input type="%s"></input><input type="%mu` +
        `lt%repRing" readonly="true"></input><input type="%s"></input><input ` +
        `type="%mult%repRing" readonly="true"></input><input type="%s"></inpu` +
        `t></inputs><script><block s="doReport"><block s="reportIfElse"><bloc` +
        `k s="reportListIsEmpty"><block var="functions"/></block><block var="` +
        `value"/><block s="reportPipe"><block s="evaluate"><block s="reportLi` +
        `stItem"><l>1</l><block var="functions"/></block><list><block var="va` +
        `lue"/></list></block><block s="reportCDR"><block var="functions"/></` +
        `block></block></block></block></script></block-definition><block-def` +
        `inition s="touching %#1 ?" type="predicate" category="sensing" selec` +
        `tor="reportTouchingObject" primitive="reportTouchingObject"><header>` +
        `</header><code></code><translations></translations><inputs><input ty` +
        `pe="%s" readonly="true">$_mouse-pointer<options>§_collidablesMenu</o` +
        `ptions></input></inputs></block-definition><block-definition s="touc` +
        `hing %#1 ?" type="predicate" category="sensing" selector="reportTouc` +
        `hingColor" primitive="reportTouchingColor"><header></header><code></` +
        `code><translations></translations><inputs><input type="%clr" readonl` +
        `y="true" irreplaceable="true"></input></inputs></block-definition><b` +
        `lock-definition s="color %#1 is touching %#2 ?" type="predicate" cat` +
        `egory="sensing" selector="reportColorIsTouchingColor" primitive="rep` +
        `ortColorIsTouchingColor"><header></header><code></code><translations` +
        `></translations><inputs><input type="%clr" readonly="true" irreplace` +
        `able="true"></input><input type="%clr" readonly="true" irreplaceable` +
        `="true"></input></inputs></block-definition><block-definition s="%#1` +
        ` at %#2" type="reporter" category="sensing" selector="reportAspect" ` +
        `primitive="reportAspect"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true">$_hue<options>hue=$_hue&#xD;saturation=$_saturation&#xD;br` +
        `ightness=$_brightness&#xD;transparency=$_transparency&#xD;r-g-b-a=$_` +
        `r-g-b-a&#xD;&#126;&#xD;sprites=$_sprites</options></input><input typ` +
        `e="%s" readonly="true">$_mouse-pointer<options>§_locationMenu</optio` +
        `ns></input></inputs></block-definition><block-definition s="stack si` +
        `ze" type="reporter" category="sensing" selector="reportStackSize" pr` +
        `imitive="reportStackSize"><header></header><code></code><translation` +
        `s></translations><inputs></inputs></block-definition><block-definiti` +
        `on s="frames" type="reporter" category="sensing" selector="reportFra` +
        `meCount" primitive="reportFrameCount"><header></header><code></code>` +
        `<translations></translations><inputs></inputs></block-definition><bl` +
        `ock-definition s="yields" type="reporter" category="sensing" selecto` +
        `r="reportYieldCount" primitive="reportYieldCount"><header></header><` +
        `code></code><translations></translations><inputs></inputs></block-de` +
        `finition><block-definition s="processes" type="reporter" category="s` +
        `ensing" selector="reportThreadCount" primitive="reportThreadCount"><` +
        `header></header><code></code><translations></translations><inputs></` +
        `inputs></block-definition><block-definition s="ask %#1 and wait" typ` +
        `e="command" category="sensing" selector="doAsk" primitive="doAsk"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%s">what&apos;s your name?</input></inputs></block-definit` +
        `ion><block-definition s="answer" type="reporter" category="sensing" ` +
        `selector="reportLastAnswer" primitive="reportLastAnswer"><header></h` +
        `eader><code></code><translations></translations><inputs></inputs></b` +
        `lock-definition><block-definition s="answer" type="reporter" categor` +
        `y="sensing" selector="getLastAnswer" primitive="getLastAnswer"><head` +
        `er></header><code></code><translations></translations><inputs></inpu` +
        `ts></block-definition><block-definition s="mouse position" type="rep` +
        `orter" category="sensing" selector="reportMousePosition"><header></h` +
        `eader><code></code><translations></translations><inputs></inputs><sc` +
        `ript><block s="doReport"><block s="reportNewList"><list><block s="re` +
        `portMouseX"></block><block s="reportMouseY"></block></list></block><` +
        `/block></script></block-definition><block-definition s="mouse x" typ` +
        `e="reporter" category="sensing" selector="reportMouseX" primitive="r` +
        `eportMouseX"><header></header><code></code><translations></translati` +
        `ons><inputs></inputs></block-definition><block-definition s="mouse y` +
        `" type="reporter" category="sensing" selector="reportMouseY" primiti` +
        `ve="reportMouseY"><header></header><code></code><translations></tran` +
        `slations><inputs></inputs></block-definition><block-definition s="mo` +
        `use down?" type="predicate" category="sensing" selector="reportMouse` +
        `Down" primitive="reportMouseDown"><header></header><code></code><tra` +
        `nslations></translations><inputs></inputs></block-definition><block-` +
        `definition s="key %#1 pressed?" type="predicate" category="sensing" ` +
        `selector="reportKeyPressed" primitive="reportKeyPressed"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%s" readonly="true">$_space<options>§_keysMenu</options></input></i` +
        `nputs></block-definition><block-definition s="%#1 to %#2" type="repo` +
        `rter" category="sensing" selector="reportRelationTo" primitive="repo` +
        `rtRelationTo"><header></header><code></code><translations></translat` +
        `ions><inputs><input type="%s" readonly="true">$_distance<options>dis` +
        `tance=$_distance&#xD;direction=$_direction&#xD;ray length=$_ray leng` +
        `th</options></input><input type="%s" readonly="true">$_mouse-pointer` +
        `<options>§_destinationsMenu</options></input></inputs></block-defini` +
        `tion><block-definition s="reset timer" type="command" category="sens` +
        `ing" selector="doResetTimer" primitive="doResetTimer"><header></head` +
        `er><code></code><translations></translations><inputs></inputs></bloc` +
        `k-definition><block-definition s="timer" type="reporter" category="s` +
        `ensing" selector="reportTimer" primitive="reportTimer"><header></hea` +
        `der><code></code><translations></translations><inputs></inputs></blo` +
        `ck-definition><block-definition s="timer" type="reporter" category="` +
        `sensing" selector="getTimer" primitive="getTimer"><header></header><` +
        `code></code><translations></translations><inputs></inputs></block-de` +
        `finition><block-definition s="%#1 of %#2" type="reporter" category="` +
        `sensing" selector="reportAttributeOf" primitive="reportAttributeOf">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%s" readonly="true">$_costume #<options>§_attributesMenu` +
        `</options></input><input type="%s" readonly="true"><options>§_object` +
        `sMenu</options></input></inputs></block-definition><block-definition` +
        ` s="object %&apos;name&apos;" type="reporter" category="sensing" sel` +
        `ector="reportObject" primitive="reportObject"><header></header><code` +
        `></code><translations></translations><inputs><input type="%s" readon` +
        `ly="true">$_myself<options>§_objectsMenuWithSelf</options></input><i` +
        `nput type="%s" readonly="true">$_myself<options>§_objectsMenuWithSel` +
        `f</options></input><input type="%s" readonly="true">myself<options>§` +
        `_objectsMenuWithSelf</options></input></inputs><script><block s="doR` +
        `eport"><block s="reportHyperZip"><block s="reifyReporter"><autolambd` +
        `a><block s="reportFindFirst"><block s="reifyPredicate"><autolambda><` +
        `block s="reportVariadicEquals"><list><block var="id"/><block s="repo` +
        `rtAskFor"><l></l><block s="reifyReporter"><autolambda><block s="repo` +
        `rtGet"><l><option>name</option></l></block></autolambda><list></list` +
        `></block><list></list></block></list></block></autolambda><list></li` +
        `st></block><block s="reportConcatenatedLists"><list><block s="report` +
        `AskFor"><block s="reportGet"><l><option>stage</option></l></block><b` +
        `lock s="reifyReporter"><autolambda><block s="reportGet"><l><option>o` +
        `ther sprites</option></l></block></autolambda><list></list></block><` +
        `list></list></block><block s="reportNewList"><list><block s="reportG` +
        `et"><l><option>stage</option></l></block></list></block></list></blo` +
        `ck></block></autolambda><list><l>id</l></list></block><block var="na` +
        `me"/><l>0</l><l></l><l>0</l></block></block></script><scripts><scrip` +
        `t x="10" y="98"><block s="doReport"><block s="reportHyperZip"><block` +
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
        `lock></script></scripts></block-definition><block-definition s="url ` +
        `%#1" type="reporter" category="sensing" selector="reportURL" primiti` +
        `ve="reportURL"><header></header><code></code><translations></transla` +
        `tions><inputs><input type="%s">snap.berkeley.edu</input></inputs></b` +
        `lock-definition><block-definition s="set %#1 to %#2" type="command" ` +
        `category="sensing" selector="doSetGlobalFlag" primitive="doSetGlobal` +
        `Flag"><header></header><code></code><translations></translations><in` +
        `puts><input type="%s" readonly="true" irreplaceable="true">$_video c` +
        `apture<options>turbo mode=$_turbo mode&#xD;case sensitivity=$_case s` +
        `ensitivity&#xD;flat line ends=$_flat line ends&#xD;log pen vectors=$` +
        `_log pen vectors&#xD;video capture=$_video capture&#xD;mirror video=` +
        `$_mirror video</options></input><input type="%b" readonly="true"></i` +
        `nput></inputs></block-definition><block-definition s="is %#1 on?" ty` +
        `pe="predicate" category="sensing" selector="reportGlobalFlag" primit` +
        `ive="reportGlobalFlag"><header></header><code></code><translations><` +
        `/translations><inputs><input type="%s" readonly="true" irreplaceable` +
        `="true">$_turbo mode<options>turbo mode=$_turbo mode&#xD;case sensit` +
        `ivity=$_case sensitivity&#xD;flat line ends=$_flat line ends&#xD;log` +
        ` pen vectors=$_log pen vectors&#xD;video capture=$_video capture&#xD` +
        `;mirror video=$_mirror video</options></input></inputs></block-defin` +
        `ition><block-definition s="current %#1" type="reporter" category="se` +
        `nsing" selector="reportDate" primitive="reportDate"><header></header` +
        `><code></code><translations></translations><inputs><input type="%s" ` +
        `readonly="true" irreplaceable="true">$_date<options>year=$_year&#xD;` +
        `month=$_month&#xD;date=$_date&#xD;day of week=$_day of week&#xD;hour` +
        `=$_hour&#xD;minute=$_minute&#xD;second=$_second&#xD;time in millisec` +
        `onds=$_time in milliseconds</options></input></inputs></block-defini` +
        `tion><block-definition s="my %#1" type="reporter" category="sensing"` +
        ` selector="reportGet" primitive="reportGet"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s" readonly` +
        `="true" irreplaceable="true">$_neighbors<options>§_gettablesMenu</op` +
        `tions></input></inputs></block-definition><block-definition s="micro` +
        `phone %#1" type="reporter" category="sensing" selector="reportAudio"` +
        ` primitive="reportAudio"><header></header><code></code><translations` +
        `></translations><inputs><input type="%s" readonly="true" irreplaceab` +
        `le="true">$_volume<options>§_audioMenu</options></input></inputs></b` +
        `lock-definition><block-definition s="%#1" type="reporter" category="` +
        `operators" selector="reportVariadicSum" primitive="reportVariadicSum` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%mult%n" readonly="true" separator="+" collapse="sum" ` +
        `initial="2"></input></inputs></block-definition><block-definition s=` +
        `"%#1 − %#2" type="reporter" category="operators" selector="reportDif` +
        `ference" primitive="reportDifference"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%n"></input><input` +
        ` type="%n"></input></inputs></block-definition><block-definition s="` +
        `%#1" type="reporter" category="operators" selector="reportVariadicPr` +
        `oduct" primitive="reportVariadicProduct"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%mult%n" readon` +
        `ly="true" separator="×" collapse="product" initial="2"></input></inp` +
        `uts></block-definition><block-definition s="%#1 / %#2" type="reporte` +
        `r" category="operators" selector="reportQuotient" primitive="reportQ` +
        `uotient"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%n"></input><input type="%n"></input></inputs><` +
        `/block-definition><block-definition s="round %#1" type="reporter" ca` +
        `tegory="operators" selector="reportRound" primitive="reportRound"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%n"></input></inputs></block-definition><block-definition ` +
        `s="%#1 of %#2" type="reporter" category="operators" selector="report` +
        `Monadic" primitive="reportMonadic"><header></header><code></code><tr` +
        `anslations></translations><inputs><input type="%s" readonly="true" i` +
        `rreplaceable="true">$_sqrt<options>abs=$_abs&#xD;neg=$_neg&#xD;sign=` +
        `$_sign&#xD;ceiling=$_ceiling&#xD;floor=$_floor&#xD;sqrt=$_sqrt&#xD;s` +
        `in=$_sin&#xD;cos=$_cos&#xD;tan=$_tan&#xD;asin=$_asin&#xD;acos=$_acos` +
        `&#xD;atan=$_atan&#xD;ln=$_ln&#xD;log=$_log&#xD;lg=$_lg&#xD;e^=$_e^&#` +
        `xD;10^=$_10^&#xD;2^=$_2^&#xD;id=$_id</options></input><input type="%` +
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
        `type="predicate" category="operators" selector="reportNot"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%b" readonly="true"></input><input type="%b" readonly="true"></in` +
        `put><input type="%b" readonly="true"></input></inputs><script><block` +
        ` s="doReport"><block s="reportIfElse"><block var="bool"/><block s="r` +
        `eportBoolean"><l><bool>false</bool></l></block><block s="reportBoole` +
        `an"><l><bool>true</bool></l></block></block></block></script></block` +
        `-definition><block-definition s="%#1" type="predicate" category="ope` +
        `rators" selector="reportBoolean" primitive="reportBoolean"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%b" readonly="true" irreplaceable="true">true</input></inputs></b` +
        `lock-definition><block-definition s="%#1" type="predicate" category=` +
        `"operators" selector="reportFalse" primitive="reportFalse"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%b" readonly="true" irreplaceable="true">false</input></inputs></` +
        `block-definition><block-definition s="join %#1" type="reporter" cate` +
        `gory="operators" selector="reportJoinWords" primitive="reportJoinWor` +
        `ds"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%mult%s" readonly="true" initial="2">hello &#xD;worl` +
        `d</input></inputs></block-definition><block-definition s="letter %&a` +
        `pos;idx&apos; of %&apos;text&apos;" type="reporter" category="operat` +
        `ors" selector="reportLetter" primitive="reportLetter"><header></head` +
        `er><code></code><translations></translations><inputs><input type="%n` +
        `">1<options>1=1&#xD;last=$_last&#xD;random=$_random</options></input` +
        `><input type="%s">world</input><input type="%n">1<options>1=1&#xD;la` +
        `st=$_last&#xD;random=$_random</options></input><input type="%s">worl` +
        `d</input><input type="%n">1<options>1=1&#xD;last&#xD;random</options` +
        `></input></inputs><script><block s="doReport"><block s="reportHyperZ` +
        `ip"><block s="reifyReporter"><autolambda><block s="reportListItem"><` +
        `l></l><block s="reportTextSplit"><l></l><l><option>letter</option></` +
        `l></block></block></autolambda><list></list></block><block var="idx"` +
        `/><l>0</l><block var="text"/><l>0</l></block></block></script><scrip` +
        `ts><script x="10" y="98"><block s="doReport"><block s="reportHyperZi` +
        `p"><block s="reifyReporter"><autolambda><block s="reportListItem"><l` +
        `></l><block s="reportTextSplit"><l></l><l><option>letter</option></l` +
        `></block></block></autolambda><list></list></block><block var="idx"/` +
        `><l>0</l><block var="text"/><l>0</l></block></block></script></scrip` +
        `ts></block-definition><block-definition s="length of %#1" type="repo` +
        `rter" category="operators" selector="reportStringSize" primitive="re` +
        `portStringSize"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s">world</input></inputs></block-defini` +
        `tion><block-definition s="%#1 of text %#2" type="reporter" category=` +
        `"operators" selector="reportTextAttribute" primitive="reportTextAttr` +
        `ibute"><header></header><code></code><translations></translations><i` +
        `nputs><input type="%s" readonly="true" irreplaceable="true">$_length` +
        `<options>length=$_length&#xD;lower case=$_lower case&#xD;upper case=` +
        `$_upper case</options></input><input type="%s">world</input></inputs` +
        `></block-definition><block-definition s="unicode of %#1" type="repor` +
        `ter" category="operators" selector="reportUnicode" primitive="report` +
        `Unicode"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%s">a</input></inputs></block-definition><block` +
        `-definition s="unicode %#1 as letter" type="reporter" category="oper` +
        `ators" selector="reportUnicodeAsLetter" primitive="reportUnicodeAsLe` +
        `tter"><header></header><code></code><translations></translations><in` +
        `puts><input type="%n">65</input></inputs></block-definition><block-d` +
        `efinition s="is %#1 a %#2 ?" type="predicate" category="operators" s` +
        `elector="reportIsA" primitive="reportIsA"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s">5</input><` +
        `input type="%s" readonly="true" irreplaceable="true">$_number<option` +
        `s>§_typesMenu</options></input></inputs></block-definition><block-de` +
        `finition s="is %#1 ?" type="predicate" category="operators" selector` +
        `="reportVariadicIsIdentical" primitive="reportVariadicIsIdentical"><` +
        `header></header><code></code><translations></translations><inputs><i` +
        `nput type="%mult%s" readonly="true" separator="identical to" collaps` +
        `e="all identical" initial="2"></input></inputs></block-definition><b` +
        `lock-definition s="split %#1 by %#2" type="reporter" category="opera` +
        `tors" selector="reportTextSplit" primitive="reportTextSplit"><header` +
        `></header><code></code><translations></translations><inputs><input t` +
        `ype="%s">hello world</input><input type="%s"> <options>letter=$_lett` +
        `er&#xD;word=$_word&#xD;line=$_line&#xD;tab=$_tab&#xD;cr=$_cr&#xD;csv` +
        `=$_csv&#xD;json=$_json&#xD;&#126;&#xD;blocks=$_blocks</options></inp` +
        `ut></inputs></block-definition><block-definition s="JavaScript funct` +
        `ion ( %#1 ) { %#2 }" type="reporter" category="operators" selector="` +
        `reportJSFunction" primitive="reportJSFunction"><header></header><cod` +
        `e></code><translations></translations><inputs><input type="%mult%s" ` +
        `readonly="true"></input><input type="%mlt"></input></inputs></block-` +
        `definition><block-definition s="type of %#1" type="reporter" categor` +
        `y="operators" selector="reportTypeOf" primitive="reportTypeOf"><head` +
        `er></header><code></code><translations></translations><inputs><input` +
        ` type="%s">5</input></inputs></block-definition><block-definition s=` +
        `"%#1 of %#2" type="reporter" category="operators" selector="reportTe` +
        `xtFunction" primitive="reportTextFunction"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true">$_encode URI<options>encode URI=$_encode` +
        ` URI&#xD;decode URI=$_decode URI&#xD;encode URI component=$_encode U` +
        `RI component&#xD;decode URI component=$_decode URI component&#xD;XML` +
        ` escape=$_XML escape&#xD;XML unescape=$_XML unescape&#xD;JS escape=$` +
        `_JS escape&#xD;hex sha512 hash=$_hex sha512 hash</options></input><i` +
        `nput type="%s">Abelson &amp; Sussman</input></inputs></block-definit` +
        `ion><block-definition s="compile %#1 for %#2 args" type="reporter" c` +
        `ategory="operators" selector="reportCompiled" primitive="reportCompi` +
        `led"><header></header><code></code><translations></translations><inp` +
        `uts><input type="%repRing" readonly="true" irreplaceable="true"></in` +
        `put><input type="%n">0</input></inputs></block-definition><block-def` +
        `inition s="set %#1 to %#2" type="command" category="variables" selec` +
        `tor="doSetVar" primitive="doSetVar"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true" ` +
        `irreplaceable="true"><options>§_getVarNamesDict</options></input><in` +
        `put type="%s">0</input></inputs></block-definition><block-definition` +
        ` s="change %#1 by %#2" type="command" category="variables" selector=` +
        `"doChangeVar" primitive="doChangeVar"><header></header><code></code>` +
        `<translations></translations><inputs><input type="%s" readonly="true` +
        `" irreplaceable="true"><options>§_getVarNamesDict</options></input><` +
        `input type="%n">1</input></inputs></block-definition><block-definiti` +
        `on s="show variable %#1" type="command" category="variables" selecto` +
        `r="doShowVar" primitive="doShowVar"><header></header><code></code><t` +
        `ranslations></translations><inputs><input type="%s" readonly="true" ` +
        `irreplaceable="true"><options>§_getVarNamesDict</options></input></i` +
        `nputs></block-definition><block-definition s="hide variable %#1" typ` +
        `e="command" category="variables" selector="doHideVar" primitive="doH` +
        `ideVar"><header></header><code></code><translations></translations><` +
        `inputs><input type="%s" readonly="true" irreplaceable="true"><option` +
        `s>§_getVarNamesDict</options></input></inputs></block-definition><bl` +
        `ock-definition s="script variables %&apos;#1&apos;" type="command" c` +
        `ategory="other" selector="doDeclareVariables"><header></header><code` +
        `></code><translations></translations><inputs><input type="%scriptVar` +
        `s" readonly="true" irreplaceable="true" initial="1" min="1"></input>` +
        `</inputs></block-definition><block-definition s="inherit %#1" type="` +
        `command" category="variables" selector="doDeleteAttr" primitive="doD` +
        `eleteAttr"><header></header><code></code><translations></translation` +
        `s><inputs><input type="%s" readonly="true"><options>§_shadowedVariab` +
        `lesMenu</options></input></inputs></block-definition><block-definiti` +
        `on s="list %&apos;inputs&apos;" type="reporter" category="lists" sel` +
        `ector="reportNewList"><header></header><code></code><translations></` +
        `translations><inputs><input type="%mult%s" readonly="true" irreplace` +
        `able="true" initial="1"></input><input type="%mult%s" readonly="true` +
        `" irreplaceable="true" initial="1"></input><input type="%mult%s" rea` +
        `donly="true" irreplaceable="true" initial="1"></input></inputs><scri` +
        `pt><block s="doReport"><block var="inputs"/></block></script></block` +
        `-definition><block-definition s="%#1 in front of %#2" type="reporter` +
        `" category="lists" selector="reportCONS" primitive="reportCONS"><hea` +
        `der></header><code></code><translations></translations><inputs><inpu` +
        `t type="%s"></input><input type="%l" readonly="true"></input></input` +
        `s></block-definition><block-definition s="item %#1 of %#2" type="rep` +
        `orter" category="lists" selector="reportListItem" primitive="reportL` +
        `istItem"><header></header><code></code><translations></translations>` +
        `<inputs><input type="%n">1<options>1=1&#xD;last=$_last&#xD;random=$_` +
        `random</options></input><input type="%l" readonly="true"></input></i` +
        `nputs></block-definition><block-definition s="all but first of %#1" ` +
        `type="reporter" category="lists" selector="reportCDR" primitive="rep` +
        `ortCDR"><header></header><code></code><translations></translations><` +
        `inputs><input type="%l" readonly="true"></input></inputs></block-def` +
        `inition><block-definition s="length of %#1" type="reporter" category` +
        `="lists" selector="reportListLength" primitive="reportListLength"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%l" readonly="true"></input></inputs></block-definition><b` +
        `lock-definition s="%#1 of %#2" type="reporter" category="lists" sele` +
        `ctor="reportListAttribute" primitive="reportListAttribute"><header><` +
        `/header><code></code><translations></translations><inputs><input typ` +
        `e="%s" readonly="true" irreplaceable="true">$_length<options>length=` +
        `$_length&#xD;rank=$_rank&#xD;dimensions=$_dimensions&#xD;flatten=$_f` +
        `latten&#xD;columns=$_columns&#xD;uniques=$_uniques&#xD;distribution=` +
        `$_distribution&#xD;sorted=$_sorted&#xD;shuffled=$_shuffled&#xD;rever` +
        `se=$_reverse&#xD;&#126;&#xD;lines=$_lines&#xD;csv=$_csv&#xD;json=$_j` +
        `son</options></input><input type="%l" readonly="true"></input></inpu` +
        `ts></block-definition><block-definition s="%&apos;data&apos; contain` +
        `s %&apos;value&apos;" type="predicate" category="lists" selector="re` +
        `portListContainsItem" primitive="reportListContainsItem"><header></h` +
        `eader><code></code><translations></translations><inputs><input type=` +
        `"%l" readonly="true"></input><input type="%s">thing</input><input ty` +
        `pe="%l" readonly="true"></input><input type="%s">thing</input><input` +
        ` type="%s">thing</input></inputs><scripts><script x="10" y="91.83333` +
        `333333331"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</` +
        `l><block s="reportListAttribute"><l><option>length</option></l><bloc` +
        `k var="data"/></block><script><block s="doIf"><block s="reportVariad` +
        `icEquals"><list><block s="reportListItem"><block var="i"/><block var` +
        `="data"/></block><block var="value"/></list></block><script><block s` +
        `="doReport"><block s="reportBoolean"><l><bool>true</bool></l></block` +
        `></block></script><list></list></block></script></block></script></b` +
        `lock><block s="doReport"><block s="reportBoolean"><l><bool>false</bo` +
        `ol></l></block></block></script></scripts></block-definition><block-` +
        `definition s="is %&apos;data&apos; empty?" type="predicate" category` +
        `="lists" selector="reportListIsEmpty" primitive="reportListIsEmpty">` +
        `<header></header><code></code><translations></translations><inputs><` +
        `input type="%l" readonly="true"></input><input type="%l" readonly="t` +
        `rue"></input><input type="%l" readonly="true"></input></inputs><scri` +
        `pts><script x="10" y="91.83333333333331"><block s="doReport"><block ` +
        `s="reportVariadicEquals"><list><block var="data"/><block s="reportNe` +
        `wList"><list></list></block></list></block></block></script></script` +
        `s></block-definition><block-definition s="index of %&apos;value&apos` +
        `; in %&apos;data&apos;" type="reporter" category="lists" selector="r` +
        `eportListIndex" primitive="reportListIndex"><header></header><code><` +
        `/code><translations></translations><inputs><input type="%s">thing</i` +
        `nput><input type="%l" readonly="true"></input><input type="%s">thing` +
        `</input><input type="%l" readonly="true"></input><input type="%l" re` +
        `adonly="true"></input></inputs><scripts><script x="10" y="91.8333333` +
        `3333331"><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l>` +
        `<block s="reportListAttribute"><l><option>length</option></l><block ` +
        `var="data"/></block><script><block s="doIf"><block s="reportVariadic` +
        `Equals"><list><block s="reportListItem"><block var="i"/><block var="` +
        `data"/></block><block var="value"/></list></block><script><block s="` +
        `doReport"><block var="i"/></block></script><list></list></block></sc` +
        `ript></block></script></block><block s="doReport"><l>0</l></block></` +
        `script></scripts></block-definition><block-definition s="add %#1 to ` +
        `%#2" type="command" category="lists" selector="doAddToList" primitiv` +
        `e="doAddToList"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%s">thing</input><input type="%l" readon` +
        `ly="true"></input></inputs></block-definition><block-definition s="d` +
        `elete %#1 of %#2" type="command" category="lists" selector="doDelete` +
        `FromList" primitive="doDeleteFromList"><header></header><code></code` +
        `><translations></translations><inputs><input type="%n">1<options>1=1` +
        `&#xD;last=$_last&#xD;&#126;&#xD;all=$_all</options></input><input ty` +
        `pe="%l" readonly="true"></input></inputs></block-definition><block-d` +
        `efinition s="insert %#1 at %#2 of %#3" type="command" category="list` +
        `s" selector="doInsertInList" primitive="doInsertInList"><header></he` +
        `ader><code></code><translations></translations><inputs><input type="` +
        `%s">thing</input><input type="%n">1<options>1=1&#xD;last=$_last&#xD;` +
        `random=$_random</options></input><input type="%l" readonly="true"></` +
        `input></inputs></block-definition><block-definition s="replace item ` +
        `%#1 of %#2 with %#3" type="command" category="lists" selector="doRep` +
        `laceInList" primitive="doReplaceInList"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1<options>1=` +
        `1&#xD;last=$_last&#xD;random=$_random</options></input><input type="` +
        `%l" readonly="true"></input><input type="%s">thing</input></inputs><` +
        `/block-definition><block-definition s="numbers from %&apos;start&apo` +
        `s; to %&apos;end&apos;" type="reporter" category="lists" selector="r` +
        `eportNumbers" primitive="reportNumbers"><header></header><code></cod` +
        `e><translations></translations><inputs><input type="%n">1</input><in` +
        `put type="%n">10</input><input type="%n">1</input><input type="%n">1` +
        `0</input><input type="%n">10</input></inputs><scripts><script x="10"` +
        ` y="91.83333333333331"><block s="doReport"><block s="reportHyperZip"` +
        `><block s="reifyReporter"><script><block s="doDeclareVariables"><lis` +
        `t><l>result</l></list></block><block s="doSetVar"><l>result</l><bloc` +
        `k s="reportNewList"><list></list></block></block><block s="doWarp"><` +
        `script><block s="doFor"><l>i</l><l></l><l></l><script><block s="doAd` +
        `dToList"><block var="i"/><block var="result"/></block></script></blo` +
        `ck></script></block><block s="doReport"><block var="result"/></block` +
        `></script><list></list></block><block var="start"/><l>0</l><block va` +
        `r="end"/><l>0</l></block></block></script></scripts></block-definiti` +
        `on><block-definition s="append %&apos;lists&apos;" type="reporter" c` +
        `ategory="lists" selector="reportConcatenatedLists" primitive="report` +
        `ConcatenatedLists"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%mult%l" readonly="true" initial="2">` +
        `</input><input type="%mult%l" readonly="true" initial="2"></input><i` +
        `nput type="%mult%l" readonly="true" initial="2"></input></inputs><sc` +
        `ripts><script x="10" y="91.83333333333331"><block s="doDeclareVariab` +
        `les"><list><l>result</l></list></block><block s="doSetVar"><l>result` +
        `</l><block s="reportNewList"><list></list></block></block><block s="` +
        `doWarp"><script><block s="doForEach"><l>list</l><block var="lists"/>` +
        `<script><block s="doForEach"><l>item</l><block var="list"/><script><` +
        `block s="doAddToList"><block var="item"/><block var="result"/></bloc` +
        `k></script></block></script></block></script></block><block s="doRep` +
        `ort"><block var="result"/></block></script></scripts></block-definit` +
        `ion><block-definition s="combinations %&apos;lists&apos;" type="repo` +
        `rter" category="lists" selector="reportCrossproduct" primitive="repo` +
        `rtCrossproduct"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%mult%l" readonly="true" initial="2"></i` +
        `nput><input type="%mult%l" readonly="true" initial="2"></input><inpu` +
        `t type="%mult%l" readonly="true" initial="2"></input></inputs><scrip` +
        `ts><script x="10" y="91.83333333333331"><block s="doReport"><block s` +
        `="reportIfElse"><block s="reportListIsEmpty"><block var="lists"/></b` +
        `lock><block s="reportNewList"><list><block s="reportNewList"><list><` +
        `/list></block></list></block><block s="reportConcatenatedLists"><blo` +
        `ck s="reportMap"><block s="reifyReporter"><autolambda><block s="repo` +
        `rtMap"><block s="reifyReporter"><autolambda><block s="reportCONS"><b` +
        `lock var="first"/><l/></block></autolambda><list></list></block><blo` +
        `ck s="reportCrossproduct"><block s="reportCDR"><block var="lists"/><` +
        `/block></block></block></autolambda><list><l>first</l></list></block` +
        `><block s="reportListItem"><l>1</l><block var="lists"/></block></blo` +
        `ck></block></block></block></script></scripts></block-definition><bl` +
        `ock-definition s="transpose %#1" type="reporter" category="lists" se` +
        `lector="reportTranspose" primitive="reportTranspose"><header></heade` +
        `r><code></code><translations></translations><inputs><input type="%l"` +
        ` readonly="true"></input></inputs></block-definition><block-definiti` +
        `on s="reshape %#1 to %#2" type="reporter" category="lists" selector=` +
        `"reportReshape" primitive="reportReshape"><header></header><code></c` +
        `ode><translations></translations><inputs><input type="%s"></input><i` +
        `nput type="%mult%n" readonly="true" initial="2">4&#xD;3</input></inp` +
        `uts></block-definition><block-definition s="map %&apos;ring&apos; ov` +
        `er %&apos;data&apos;" type="reporter" category="lists" selector="rep` +
        `ortMap" primitive="reportMap"><header></header><code></code><transla` +
        `tions></translations><inputs><input type="%repRing" readonly="true" ` +
        `irreplaceable="true"></input><input type="%l" readonly="true"></inpu` +
        `t><input type="%repRing" readonly="true" irreplaceable="true"></inpu` +
        `t><input type="%l" readonly="true"></input><input type="%l" readonly` +
        `="true"></input></inputs><scripts><script x="10" y="91.8333333333333` +
        `1"><block s="doDeclareVariables"><list><l>result</l><l>implicit?</l>` +
        `</list></block><block s="doSetVar"><l>result</l><block s="reportNewL` +
        `ist"><list></list></block></block><block s="doSetVar"><l>implicit?</` +
        `l><block s="reportListIsEmpty"><block s="reportAttributeOf"><l><opti` +
        `on>input names</option></l><block var="ring"/></block></block></bloc` +
        `k><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><block ` +
        `s="reportListAttribute"><l><option>length</option></l><block var="da` +
        `ta"/></block><script><block s="doAddToList"><block s="evaluate"><blo` +
        `ck var="ring"/><block s="reportIfElse"><block var="implicit?"/><bloc` +
        `k s="reportNewList"><list><block s="reportListItem"><block var="i"/>` +
        `<block var="data"/></block></list></block><block s="reportNewList"><` +
        `list><block s="reportListItem"><block var="i"/><block var="data"/></` +
        `block><block var="i"/><block var="data"/></list></block></block></bl` +
        `ock><block var="result"/></block></script></block></script></block><` +
        `block s="doReport"><block var="result"/></block></script></scripts><` +
        `/block-definition><block-definition s="$blitz map %#1 over %#2" type` +
        `="reporter" category="lists" selector="reportAtomicMap" primitive="r` +
        `eportAtomicMap"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%repRing" readonly="true" irreplaceable=` +
        `"true"></input><input type="%l" readonly="true"></input></inputs></b` +
        `lock-definition><block-definition s="keep items %&apos;ring&apos; fr` +
        `om %&apos;data&apos;" type="reporter" category="lists" selector="rep` +
        `ortKeep" primitive="reportKeep"><header></header><code></code><trans` +
        `lations></translations><inputs><input type="%predRing" readonly="tru` +
        `e" irreplaceable="true"></input><input type="%l" readonly="true"></i` +
        `nput><input type="%predRing" readonly="true" irreplaceable="true"></` +
        `input><input type="%l" readonly="true"></input><input type="%l" read` +
        `only="true"></input></inputs><scripts><script x="10" y="91.833333333` +
        `33331"><block s="doDeclareVariables"><list><l>result</l><l>implicit?` +
        `</l></list></block><block s="doSetVar"><l>result</l><block s="report` +
        `NewList"><list></list></block></block><block s="doSetVar"><l>implici` +
        `t?</l><block s="reportListIsEmpty"><block s="reportAttributeOf"><l><` +
        `option>input names</option></l><block var="ring"/></block></block></` +
        `block><block s="doWarp"><script><block s="doFor"><l>i</l><l>1</l><bl` +
        `ock s="reportListAttribute"><l><option>length</option></l><block var` +
        `="data"/></block><script><block s="doIf"><block s="evaluate"><block ` +
        `var="ring"/><block s="reportIfElse"><block var="implicit?"/><block s` +
        `="reportNewList"><list><block s="reportListItem"><block var="i"/><bl` +
        `ock var="data"/></block></list></block><block s="reportNewList"><lis` +
        `t><block s="reportListItem"><block var="i"/><block var="data"/></blo` +
        `ck><block var="i"/><block var="data"/></list></block></block></block` +
        `><script><block s="doAddToList"><block s="reportListItem"><block var` +
        `="i"/><block var="data"/></block><block var="result"/></block></scri` +
        `pt><list></list></block></script></block></script></block><block s="` +
        `doReport"><block var="result"/></block></script></scripts></block-de` +
        `finition><block-definition s="$blitz keep items %#1 from %#2" type="` +
        `reporter" category="lists" selector="reportAtomicKeep" primitive="re` +
        `portAtomicKeep"><header></header><code></code><translations></transl` +
        `ations><inputs><input type="%predRing" readonly="true" irreplaceable` +
        `="true"></input><input type="%l" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="find first item %&apos;ring&ap` +
        `os; in %&apos;data&apos;" type="reporter" category="lists" selector=` +
        `"reportFindFirst" primitive="reportFindFirst"><header></header><code` +
        `></code><translations></translations><inputs><input type="%predRing"` +
        ` readonly="true" irreplaceable="true"></input><input type="%l" reado` +
        `nly="true"></input><input type="%predRing" readonly="true" irreplace` +
        `able="true"></input><input type="%l" readonly="true"></input><input ` +
        `type="%l" readonly="true"></input></inputs><scripts><script x="10" y` +
        `="91.83333333333331"><block s="doDeclareVariables"><list><l>implicit` +
        `?</l></list></block><block s="doSetVar"><l>implicit?</l><block s="re` +
        `portListIsEmpty"><block s="reportAttributeOf"><l><option>input names` +
        `</option></l><block var="ring"/></block></block></block><block s="do` +
        `Warp"><script><block s="doFor"><l>i</l><l>1</l><block s="reportListA` +
        `ttribute"><l><option>length</option></l><block var="data"/></block><` +
        `script><block s="doIf"><block s="evaluate"><block var="ring"/><block` +
        ` s="reportIfElse"><block var="implicit?"/><block s="reportNewList"><` +
        `list><block s="reportListItem"><block var="i"/><block var="data"/></` +
        `block></list></block><block s="reportNewList"><list><block s="report` +
        `ListItem"><block var="i"/><block var="data"/></block><block var="i"/` +
        `><block var="data"/></list></block></block></block><script><block s=` +
        `"doReport"><block s="reportListItem"><block var="i"/><block var="dat` +
        `a"/></block></block></script><list></list></block></script></block><` +
        `/script></block><block s="doReport"><l></l></block></script></script` +
        `s></block-definition><block-definition s="$blitz find first item %#1` +
        ` in %#2" type="reporter" category="lists" selector="reportAtomicFind` +
        `First" primitive="reportAtomicFindFirst"><header></header><code></co` +
        `de><translations></translations><inputs><input type="%predRing" read` +
        `only="true" irreplaceable="true"></input><input type="%l" readonly="` +
        `true"></input></inputs></block-definition><block-definition s="combi` +
        `ne %&apos;data&apos; using %&apos;ring&apos;" type="reporter" catego` +
        `ry="lists" selector="reportCombine" primitive="reportCombine"><heade` +
        `r></header><code></code><translations></translations><inputs><input ` +
        `type="%l" readonly="true"></input><input type="%repRing" readonly="t` +
        `rue" irreplaceable="true"></input><input type="%l" readonly="true"><` +
        `/input><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input><input type="%repRing" readonly="true" irreplaceable="true"><` +
        `/input></inputs><scripts><script x="10" y="91.83333333333331"><block` +
        ` s="doIf"><block s="reportListIsEmpty"><block var="data"/></block><s` +
        `cript><block s="doReport"><l>0</l></block></script><list><block s="r` +
        `eportVariadicEquals"><list><block s="reportListAttribute"><l><option` +
        `>length</option></l><block var="data"/></block><l>1</l></list></bloc` +
        `k><script><block s="doReport"><block s="reportListItem"><l>1</l><blo` +
        `ck var="data"/></block></block></script></list></block><block s="doR` +
        `eport"><block s="evaluate"><block var="ring"/><list><block s="report` +
        `ListItem"><l>1</l><block var="data"/></block><block s="evaluate"><bl` +
        `ock s="reportEnvironment"><l><option>script</option></l></block><lis` +
        `t><block s="reportCDR"><block var="data"/></block><block var="ring"/` +
        `></list></block></list></block></block></script></scripts></block-de` +
        `finition><block-definition s="$blitz combine %#1 using %#2" type="re` +
        `porter" category="lists" selector="reportAtomicCombine" primitive="r` +
        `eportAtomicCombine"><header></header><code></code><translations></tr` +
        `anslations><inputs><input type="%l" readonly="true"></input><input t` +
        `ype="%repRing" readonly="true" irreplaceable="true"></input></inputs` +
        `></block-definition><block-definition s="for each %&apos;item&apos; ` +
        `in %&apos;data&apos; %&apos;action&apos;" type="command" category="l` +
        `ists" selector="doForEach" primitive="doForEach"><header></header><c` +
        `ode></code><translations></translations><inputs><input type="%upvar"` +
        ` readonly="true" irreplaceable="true">item</input><input type="%l" r` +
        `eadonly="true"></input><input type="%loop" readonly="true" irreplace` +
        `able="true"></input><input type="%upvar" readonly="true" irreplaceab` +
        `le="true">item</input><input type="%l" readonly="true"></input><inpu` +
        `t type="%loop" readonly="true" irreplaceable="true"></input><input t` +
        `ype="%loop" readonly="true" irreplaceable="true"></input></inputs><s` +
        `cripts><script x="10" y="97.83333333333331"><block s="doReport"><blo` +
        `ck s="reportMap"><block s="reifyReporter"><script><block s="doSetVar` +
        `"><l>item</l><l></l></block><block s="doRun"><block var="action"/><l` +
        `ist></list></block><block s="doReport"><l>0</l></block></script><lis` +
        `t></list></block><block var="data"/></block></block></script></scrip` +
        `ts></block-definition><block-definition s="show table %#1" type="com` +
        `mand" category="lists" selector="doShowTable" primitive="doShowTable` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%l" readonly="true"></input></inputs></block-definitio` +
        `n><block-definition s="map %#1 to %#2 %#3" type="command" category="` +
        `other" selector="doMapCodeOrHeader" primitive="doMapCodeOrHeader"><h` +
        `eader></header><code></code><translations></translations><inputs><in` +
        `put type="%cmdRing" readonly="true"></input><input type="%s" readonl` +
        `y="true">$_code<options>code=$_code&#xD;header=$_header</options></i` +
        `nput><input type="%mlt"></input></inputs></block-definition><block-d` +
        `efinition s="map %#1 to code %#2" type="command" category="other" se` +
        `lector="doMapValueCode" primitive="doMapValueCode"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true" irreplaceable="true">$_String<options>String=$_String` +
        `&#xD;Number=$_Number&#xD;true=$_true&#xD;false=$_false</options></in` +
        `put><input type="%mlt">&lt;#1&gt;</input></inputs></block-definition` +
        `><block-definition s="map %#1 of %#2 to code %#3" type="command" cat` +
        `egory="other" selector="doMapListCode" primitive="doMapListCode"><he` +
        `ader></header><code></code><translations></translations><inputs><inp` +
        `ut type="%s" readonly="true"><options>list=$_list&#xD;item=$_item&#x` +
        `D;delimiter=$_delimiter</options></input><input type="%s" readonly="` +
        `true"><options>collection=$_collection&#xD;variables=$_variables&#xD` +
        `;parameters=$_parameters</options></input><input type="%mlt"></input` +
        `></inputs></block-definition><block-definition s="code of %#1" type=` +
        `"reporter" category="other" selector="reportMappedCode" primitive="r` +
        `eportMappedCode"><header></header><code></code><translations></trans` +
        `lations><inputs><input type="%cmdRing" readonly="true"></input></inp` +
        `uts></block-definition><block-definition s="primitive %#1" type="com` +
        `mand" category="other" selector="doPrimitive" primitive="doPrimitive` +
        `"><header></header><code></code><translations></translations><inputs` +
        `><input type="%s" readonly="true" irreplaceable="true"><options>§_pr` +
        `imitivesMenu</options></input></inputs></block-definition><block-def` +
        `inition s="extension %#1 %#2" type="command" category="other" select` +
        `or="doApplyExtension" primitive="doApplyExtension"><header></header>` +
        `<code></code><translations></translations><inputs><input type="%s" r` +
        `eadonly="true" irreplaceable="true"><options>§_extensionsMenu</optio` +
        `ns></input><input type="%mult%s" readonly="true"></input></inputs></` +
        `block-definition><block-definition s="extension %#1 %#2" type="repor` +
        `ter" category="other" selector="reportApplyExtension" primitive="rep` +
        `ortApplyExtension"><header></header><code></code><translations></tra` +
        `nslations><inputs><input type="%s" readonly="true" irreplaceable="tr` +
        `ue"><options>§_extensionsMenu</options></input><input type="%mult%s"` +
        ` readonly="true"></input></inputs></block-definition><block-definiti` +
        `on s="set video transparency to %#1" type="command" category="sensin` +
        `g" selector="doSetVideoTransparency" primitive="doSetVideoTransparen` +
        `cy"><header></header><code></code><translations></translations><inpu` +
        `ts><input type="%n">50</input></inputs></block-definition><block-def` +
        `inition s="video %#1 on %#2" type="reporter" category="sensing" sele` +
        `ctor="reportVideo" primitive="reportVideo"><header></header><code></` +
        `code><translations></translations><inputs><input type="%s" readonly=` +
        `"true" irreplaceable="true">$_motion<options>snap=$_snap&#xD;motion=` +
        `$_motion&#xD;direction=$_direction</options></input><input type="%s"` +
        ` readonly="true">$_myself<options>§_objectsMenuWithSelf</options></i` +
        `nput></inputs></block-definition></primitives></blocks>`,
        this.stage
    );
};
