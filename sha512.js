/*

	sha512.js

	encryption for SNAP!
    This file is derived from crypto-js.

    © 2009–2012 by Jeff Mott. All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    Redistributions of source code must retain the above copyright notice, this list of conditions, and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions, and the following disclaimer in the documentation or other materials provided with the distribution.
    Neither the name CryptoJS nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS," AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var hex_sha512 = (function (hex_sha512) {

    var hexcase = 0; 

    function hex_sha512(s)
    {
      return CryptoJS.SHA512(str2rstr_utf8(s)).toString(CryptoJS.enc.Hex);
    }

    function rstr_sha512(s)
    {
      return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
    }

    var CryptoJS=CryptoJS||function(a,g){var m={},e=m.lib={},q=e.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var d=new a;b&&d.mixIn(b);d.$super=this;return d},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var k in a)a.hasOwnProperty(k)&&(this[k]=a[k]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),r=e.WordArray=q.extend({init:function(a,b){a=
    this.words=a||[];this.sigBytes=b!=g?b:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes,a=a.sigBytes;this.clamp();if(c%4)for(var i=0;i<a;i++)b[c+i>>>2]|=(d[i>>>2]>>>24-8*(i%4)&255)<<24-8*((c+i)%4);else if(65535<d.length)for(i=0;i<a;i+=4)b[c+i>>>2]=d[i>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var k=this.words,b=this.sigBytes;k[b>>>2]&=4294967295<<32-8*(b%4);k.length=a.ceil(b/4)},clone:function(){var a=
    q.clone.call(this);a.words=this.words.slice(0);return a},random:function(k){for(var b=[],d=0;d<k;d+=4)b.push(4294967296*a.random()|0);return r.create(b,k)}}),y=m.enc={},n=y.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,d=[],c=0;c<a;c++){var i=b[c>>>2]>>>24-8*(c%4)&255;d.push((i>>>4).toString(16));d.push((i&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,2),16)<<24-4*(c%8);return r.create(d,b/2)}},l=y.Latin1={stringify:function(a){for(var b=
    a.words,a=a.sigBytes,d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return r.create(d,b)}},da=y.Utf8={stringify:function(a){try{return decodeURIComponent(escape(l.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return l.parse(unescape(encodeURIComponent(a)))}},h=e.BufferedBlockAlgorithm=q.extend({reset:function(){this._data=
    r.create();this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=da.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(k){var b=this._data,d=b.words,c=b.sigBytes,i=this.blockSize,l=c/(4*i),l=k?a.ceil(l):a.max((l|0)-this._minBufferSize,0),k=l*i,c=a.min(4*k,c);if(k){for(var h=0;h<k;h+=i)this._doProcessBlock(d,h);h=d.splice(0,k);b.sigBytes-=c}return r.create(h,c)},clone:function(){var a=q.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});e.Hasher=
    h.extend({init:function(){this.reset()},reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=h.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,d){return a.create(d).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return ea.HMAC.create(a,d).finalize(b)}}});
    var ea=m.algo={};return m}(Math);
    (function(a){var g=CryptoJS,m=g.lib,e=m.Base,q=m.WordArray,g=g.x64={};g.Word=e.extend({init:function(a,e){this.high=a;this.low=e}});g.WordArray=e.extend({init:function(e,y){e=this.words=e||[];this.sigBytes=y!=a?y:8*e.length},toX32:function(){for(var a=this.words,e=a.length,n=[],l=0;l<e;l++){var g=a[l];n.push(g.high);n.push(g.low)}return q.create(n,this.sigBytes)},clone:function(){for(var a=e.clone.call(this),g=a.words=this.words.slice(0),n=g.length,l=0;l<n;l++)g[l]=g[l].clone();return a}})})();
    (function(){function a(){return q.create.apply(q,arguments)}var g=CryptoJS,m=g.lib.Hasher,e=g.x64,q=e.Word,r=e.WordArray,e=g.algo,y=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
    a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
    2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
    a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
    3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],n=[];(function(){for(var l=0;80>l;l++)n[l]=a()})();e=e.SHA512=m.extend({_doReset:function(){this._hash=r.create([a(1779033703,4089235720),a(3144134277,2227873595),a(1013904242,4271175723),a(2773480762,1595750129),a(1359893119,2917565137),a(2600822924,725511199),a(528734635,4215389547),a(1541459225,327033209)])},_doProcessBlock:function(a,e){for(var h=this._hash.words,g=h[0],k=h[1],b=h[2],d=h[3],c=h[4],i=h[5],m=
    h[6],h=h[7],q=g.high,r=g.low,W=k.high,K=k.low,X=b.high,L=b.low,Y=d.high,M=d.low,Z=c.high,N=c.low,$=i.high,O=i.low,aa=m.high,P=m.low,ba=h.high,Q=h.low,t=q,o=r,E=W,C=K,F=X,D=L,T=Y,G=M,u=Z,p=N,R=$,H=O,S=aa,I=P,U=ba,J=Q,v=0;80>v;v++){var z=n[v];if(16>v)var s=z.high=a[e+2*v]|0,f=z.low=a[e+2*v+1]|0;else{var s=n[v-15],f=s.high,w=s.low,s=(w<<31|f>>>1)^(w<<24|f>>>8)^f>>>7,w=(f<<31|w>>>1)^(f<<24|w>>>8)^(f<<25|w>>>7),B=n[v-2],f=B.high,j=B.low,B=(j<<13|f>>>19)^(f<<3|j>>>29)^f>>>6,j=(f<<13|j>>>19)^(j<<3|f>>>29)^
    (f<<26|j>>>6),f=n[v-7],V=f.high,A=n[v-16],x=A.high,A=A.low,f=w+f.low,s=s+V+(f>>>0<w>>>0?1:0),f=f+j,s=s+B+(f>>>0<j>>>0?1:0),f=f+A,s=s+x+(f>>>0<A>>>0?1:0);z.high=s;z.low=f}var V=u&R^~u&S,A=p&H^~p&I,z=t&E^t&F^E&F,fa=o&C^o&D^C&D,w=(o<<4|t>>>28)^(t<<30|o>>>2)^(t<<25|o>>>7),B=(t<<4|o>>>28)^(o<<30|t>>>2)^(o<<25|t>>>7),j=y[v],ga=j.high,ca=j.low,j=J+((u<<18|p>>>14)^(u<<14|p>>>18)^(p<<23|u>>>9)),x=U+((p<<18|u>>>14)^(p<<14|u>>>18)^(u<<23|p>>>9))+(j>>>0<J>>>0?1:0),j=j+A,x=x+V+(j>>>0<A>>>0?1:0),j=j+ca,x=x+ga+
    (j>>>0<ca>>>0?1:0),j=j+f,x=x+s+(j>>>0<f>>>0?1:0),f=B+fa,z=w+z+(f>>>0<B>>>0?1:0),U=S,J=I,S=R,I=H,R=u,H=p,p=G+j|0,u=T+x+(p>>>0<G>>>0?1:0)|0,T=F,G=D,F=E,D=C,E=t,C=o,o=j+f|0,t=x+z+(o>>>0<j>>>0?1:0)|0}r=g.low=r+o|0;g.high=q+t+(r>>>0<o>>>0?1:0)|0;K=k.low=K+C|0;k.high=W+E+(K>>>0<C>>>0?1:0)|0;L=b.low=L+D|0;b.high=X+F+(L>>>0<D>>>0?1:0)|0;M=d.low=M+G|0;d.high=Y+T+(M>>>0<G>>>0?1:0)|0;N=c.low=N+p|0;c.high=Z+u+(N>>>0<p>>>0?1:0)|0;O=i.low=O+H|0;i.high=$+R+(O>>>0<H>>>0?1:0)|0;P=m.low=P+I|0;m.high=aa+S+(P>>>0<I>>>
    0?1:0)|0;Q=h.low=Q+J|0;h.high=ba+U+(Q>>>0<J>>>0?1:0)|0},_doFinalize:function(){var a=this._data,e=a.words,h=8*this._nDataBytes,g=8*a.sigBytes;e[g>>>5]|=128<<24-g%32;e[(g+128>>>10<<5)+31]=h;a.sigBytes=4*e.length;this._process();this._hash=this._hash.toX32()},blockSize:32});g.SHA512=m._createHelper(e);g.HmacSHA512=m._createHmacHelper(e)})();

    function rstr2hex(input)
    {
      try { hexcase } catch(e) { hexcase=0; }
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var output = "";
      var x;
      for(var i = 0; i < input.length; i++)
      {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
               +  hex_tab.charAt( x        & 0x0F);
      }
      return output;
    }

    function str2rstr_utf8(input)
    {
      var output = "";
      var i = -1;
      var x, y;

      while(++i < input.length)
      {
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
        {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }

        if(x <= 0x7F)
          output += String.fromCharCode(x);
        else if(x <= 0x7FF)
          output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0xFFFF)
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0x1FFFFF)
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                        0x80 | ((x >>> 12) & 0x3F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
      }
      return output;
    }

    function rstr2binb(input)
    {
      var output = Array(input.length >> 2);
      for(var i = 0; i < output.length; i++)
        output[i] = 0;
      for(var i = 0; i < input.length * 8; i += 8)
        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
      return output;
    }

    function binb2rstr(input)
    {
      var output = "";
      for(var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
      return output;
    }

    var sha512_k;
    function binb_sha512(x, len)
    {
      if(sha512_k == undefined)
      {
        sha512_k = new Array(
    new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd),
    new int64(-1245643825, -330482897), new int64(-373957723, -2121671748),
    new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031),
    new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736),
    new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe),
    new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302),
    new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1),
    new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428),
    new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3),
    new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65),
    new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
    new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459),
    new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210),
    new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340),
    new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395),
    new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70),
    new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
    new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473),
    new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8),
    new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b),
    new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023),
    new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30),
    new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910),
    new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
    new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53),
    new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016),
    new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893),
    new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397),
    new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
    new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec),
    new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047),
    new int64(-1090935817, -1295615723), new int64(-965641998, -479046869),
    new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207),
    new int64(-354779690, -840897762), new int64(-176337025, -294727304),
    new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026),
    new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b),
    new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
    new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620),
    new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430),
    new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817));
      }

      var H = new Array(
    new int64(0x6a09e667, -205731576),
    new int64(-1150833019, -2067093701),
    new int64(0x3c6ef372, -23791573),
    new int64(-1521486534, 0x5f1d36f1),
    new int64(0x510e527f, -1377402159),
    new int64(-1694144372, 0x2b3e6c1f),
    new int64(0x1f83d9ab, -79577749),
    new int64(0x5be0cd19, 0x137e2179));

      var T1 = new int64(0, 0),
        T2 = new int64(0, 0),
        a = new int64(0,0),
        b = new int64(0,0),
        c = new int64(0,0),
        d = new int64(0,0),
        e = new int64(0,0),
        f = new int64(0,0),
        g = new int64(0,0),
        h = new int64(0,0),

        s0 = new int64(0, 0),
        s1 = new int64(0, 0),
        Ch = new int64(0, 0),
        Maj = new int64(0, 0),
        r1 = new int64(0, 0),
        r2 = new int64(0, 0),
        r3 = new int64(0, 0);
      var j, i;
      var W = new Array(80);
      for(i=0; i<80; i++)
        W[i] = new int64(0, 0);

      x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
      x[((len + 128 >> 10)<< 5) + 31] = len;

      for(i = 0; i<x.length; i+=32)
      {
        int64copy(a, H[0]);
        int64copy(b, H[1]);
        int64copy(c, H[2]);
        int64copy(d, H[3]);
        int64copy(e, H[4]);
        int64copy(f, H[5]);
        int64copy(g, H[6]);
        int64copy(h, H[7]);

        for(j=0; j<16; j++)
        {
            W[j].h = x[i + 2*j];
            W[j].l = x[i + 2*j + 1];
        }

        for(j=16; j<80; j++)
        {
          int64rrot(r1, W[j-2], 19);
          int64revrrot(r2, W[j-2], 29);
          int64shr(r3, W[j-2], 6);
          s1.l = r1.l ^ r2.l ^ r3.l;
          s1.h = r1.h ^ r2.h ^ r3.h;
          int64rrot(r1, W[j-15], 1);
          int64rrot(r2, W[j-15], 8);
          int64shr(r3, W[j-15], 7);
          s0.l = r1.l ^ r2.l ^ r3.l;
          s0.h = r1.h ^ r2.h ^ r3.h;

          int64add4(W[j], s1, W[j-7], s0, W[j-16]);
        }

        for(j = 0; j < 80; j++)
        {
          Ch.l = (e.l & f.l) ^ (~e.l & g.l);
          Ch.h = (e.h & f.h) ^ (~e.h & g.h);

          int64rrot(r1, e, 14);
          int64rrot(r2, e, 18);
          int64revrrot(r3, e, 9);
          s1.l = r1.l ^ r2.l ^ r3.l;
          s1.h = r1.h ^ r2.h ^ r3.h;
          int64rrot(r1, a, 28);
          int64revrrot(r2, a, 2);
          int64revrrot(r3, a, 7);
          s0.l = r1.l ^ r2.l ^ r3.l;
          s0.h = r1.h ^ r2.h ^ r3.h;

          Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
          Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);

          int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
          int64add(T2, s0, Maj);

          int64copy(h, g);
          int64copy(g, f);
          int64copy(f, e);
          int64add(e, d, T1);
          int64copy(d, c);
          int64copy(c, b);
          int64copy(b, a);
          int64add(a, T1, T2);
        }
        int64add(H[0], H[0], a);
        int64add(H[1], H[1], b);
        int64add(H[2], H[2], c);
        int64add(H[3], H[3], d);
        int64add(H[4], H[4], e);
        int64add(H[5], H[5], f);
        int64add(H[6], H[6], g);
        int64add(H[7], H[7], h);
      }

      var hash = new Array(16);
      for(i=0; i<8; i++)
      {
        hash[2*i] = H[i].h;
        hash[2*i + 1] = H[i].l;
      }
      return hash;
    }

    function int64(h, l)
    {
      this.h = h;
      this.l = l;
    }

    function int64copy(dst, src)
    {
      dst.h = src.h;
      dst.l = src.l;
    }

    function int64rrot(dst, x, shift)
    {
        dst.l = (x.l >>> shift) | (x.h << (32-shift));
        dst.h = (x.h >>> shift) | (x.l << (32-shift));
    }

    function int64revrrot(dst, x, shift)
    {
        dst.l = (x.h >>> shift) | (x.l << (32-shift));
        dst.h = (x.l >>> shift) | (x.h << (32-shift));
    }

    function int64shr(dst, x, shift)
    {
        dst.l = (x.l >>> shift) | (x.h << (32-shift));
        dst.h = (x.h >>> shift);
    }

    function int64add(dst, x, y)
    {
       var w0 = (x.l & 0xffff) + (y.l & 0xffff);
       var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
       var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
       var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
       dst.l = (w0 & 0xffff) | (w1 << 16);
       dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    function int64add4(dst, a, b, c, d)
    {
       var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
       var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
       var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
       var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
       dst.l = (w0 & 0xffff) | (w1 << 16);
       dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    function int64add5(dst, a, b, c, d, e)
    {
       var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
       var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
       var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
       var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
       dst.l = (w0 & 0xffff) | (w1 << 16);
       dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    return hex_sha512;

})({});
