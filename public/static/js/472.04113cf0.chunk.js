"use strict";(self.webpackChunkt2shira=self.webpackChunkt2shira||[]).push([[472],{828:function(e,r,t){t.d(r,{a:function(){return l}});var n=t(5861),o=t(7757),i=t.n(o),a=t(2496),l=function(){var e=(0,n.Z)(i().mark((function e(r){var t,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Z.post("upload",r);case 3:return n=e.sent,e.abrupt("return",null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0,"api error"),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(r){return e.apply(this,arguments)}}()},6472:function(e,r,t){t.r(r),t.d(r,{default:function(){return N}});var n=t(2791),o=t(7022),i=t(9743),a=t(2677),l="addVisaPage_body__+y1NP",s="addVisaPage_contianer__GyZcd",c="addVisaPage_accordionForms__o8xLJ",u=t(1413),f=t(5861),d=t(7757),p=t.n(d),y=t(828),h=t(2496),m=t(2808),b=t.n(m),x=function(){var e=(0,f.Z)(p().mark((function e(r){return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.Z.post("/visa",b().stringify(r));case 3:return e.sent,e.abrupt("return","done");case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0),new Error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(r){return e.apply(this,arguments)}}(),v=t(1134),j=t(3539),g=t(4349),O=t(9434),w=t(577),_=t(184),Z=function(){var e=(0,v.cI)({reValidateMode:"onSubmit"}),r=e.register,t=e.handleSubmit,o=e.formState.errors,l=(0,O.v9)((function(e){return e})),s=l.empolyee.specialties,c=l.meta.locale,d=(0,j.Z)(),h=function(){var e=(0,f.Z)(p().mark((function e(r){var t,n,o,i;return p().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(n=new FormData).append("files",null===(t=r.doc_url)||void 0===t?void 0:t[0]),e.next=5,(0,y.a)(n);case 5:return o=e.sent,console.log(o),e.next=9,x((0,u.Z)((0,u.Z)({},r),{},{doc_url:null===o||void 0===o?void 0:o[0]}));case 9:i=e.sent,console.log(i),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),w.Am.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(r){return e.apply(this,arguments)}}();return(0,n.useEffect)((function(){Object.keys(o).length>0&&w.Am.error((0,_.jsx)(g.Z,{id:"fill-required-input"}))})),(0,_.jsx)("div",{children:(0,_.jsx)("form",{onSubmit:t(h),children:(0,_.jsxs)(i.Z,{style:{rowGap:"1rem"},children:[(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"sponsor_number",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"sponsorNumber"})}),(0,_.jsx)("input",(0,u.Z)({id:"sponsor_number",name:"sponsor_number",type:"text"},r("sponsor_number",{required:!0})))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"number_issued",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"outgoingNumber"})}),(0,_.jsx)("input",(0,u.Z)({type:"text",id:"number_issued",name:"number_issued"},r("number_issued",{required:!0})))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"occupation_required",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"Occupation"})}),(0,_.jsx)("select",(0,u.Z)((0,u.Z)({id:"occupation_required",name:"occupation_required"},r("occupation_required",{required:!0})),{},{children:s.map((function(e){return(0,_.jsxs)("option",{value:null===e||void 0===e?void 0:e._id,children:["ar"===c&&(null===e||void 0===e?void 0:e.name_ar),"en"===c&&(null===e||void 0===e?void 0:e.name_en)]})}))}))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"arrival",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"destination"})}),(0,_.jsx)("input",(0,u.Z)({type:"text",id:"arrival",name:"arrival"},r("arrival",{required:!0})))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"sex",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"ChooseType"})}),(0,_.jsxs)("select",(0,u.Z)((0,u.Z)({id:"sex",name:"sex"},r("sex",{required:!0})),{},{children:[(0,_.jsx)("option",{value:"",children:d.formatMessage({id:"ChooseType"})}),(0,_.jsx)("option",{value:"male",children:"\u0630\u0643\u0631"})]}))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"number_of_visas",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"numberOfVisas"})}),(0,_.jsx)("input",(0,u.Z)({type:"number",id:"number_of_visas",name:"number_of_visas"},r("number_of_visas",{required:!0})))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"country",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"country"})}),(0,_.jsx)("input",(0,u.Z)({type:"text",id:"country",name:"country"},r("country",{required:!0})))]})}),(0,_.jsx)(a.Z,{xs:12,children:(0,_.jsxs)("label",{htmlFor:"doc_url",children:[(0,_.jsx)("p",{children:(0,_.jsx)(g.Z,{id:"addAttachment"})}),(0,_.jsx)("input",(0,u.Z)({type:"file",id:"doc_url",name:"doc_url"},r("doc_url",{required:!0})))]})}),(0,_.jsx)(a.Z,{children:(0,_.jsx)("input",{type:"submit",value:"\u0627\u0636\u0641"})})]})})})},N=function(){return(0,_.jsx)("div",{children:(0,_.jsx)(o.Z,{className:l,children:(0,_.jsx)(i.Z,{style:{justifyContent:"center"},children:(0,_.jsx)(a.Z,{xs:12,md:8,className:s,children:(0,_.jsx)("div",{className:c,children:(0,_.jsx)(Z,{})})})})})})}},9874:function(e){var r=String.prototype.replace,t=/%20/g,n="RFC1738",o="RFC3986";e.exports={default:o,formatters:{RFC1738:function(e){return r.call(e,t,"+")},RFC3986:function(e){return String(e)}},RFC1738:n,RFC3986:o}},2808:function(e,r,t){var n=t(2334),o=t(4360),i=t(9874);e.exports={formats:i,parse:o,stringify:n}},4360:function(e,r,t){var n=t(4184),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},l=function(e){return e.replace(/&#(\d+);/g,(function(e,r){return String.fromCharCode(parseInt(r,10))}))},s=function(e,r){return e&&"string"===typeof e&&r.comma&&e.indexOf(",")>-1?e.split(","):e},c=function(e,r,t,n){if(e){var i=t.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,l=t.depth>0&&/(\[[^[\]]*])/.exec(i),c=l?i.slice(0,l.index):i,u=[];if(c){if(!t.plainObjects&&o.call(Object.prototype,c)&&!t.allowPrototypes)return;u.push(c)}for(var f=0;t.depth>0&&null!==(l=a.exec(i))&&f<t.depth;){if(f+=1,!t.plainObjects&&o.call(Object.prototype,l[1].slice(1,-1))&&!t.allowPrototypes)return;u.push(l[1])}return l&&u.push("["+i.slice(l.index)+"]"),function(e,r,t,n){for(var o=n?r:s(r,t),i=e.length-1;i>=0;--i){var a,l=e[i];if("[]"===l&&t.parseArrays)a=[].concat(o);else{a=t.plainObjects?Object.create(null):{};var c="["===l.charAt(0)&&"]"===l.charAt(l.length-1)?l.slice(1,-1):l,u=parseInt(c,10);t.parseArrays||""!==c?!isNaN(u)&&l!==c&&String(u)===c&&u>=0&&t.parseArrays&&u<=t.arrayLimit?(a=[])[u]=o:"__proto__"!==c&&(a[c]=o):a={0:o}}o=a}return o}(u,r,t,n)}};e.exports=function(e,r){var t=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:r,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}}(r);if(""===e||null===e||"undefined"===typeof e)return t.plainObjects?Object.create(null):{};for(var u="string"===typeof e?function(e,r){var t,c={},u=r.ignoreQueryPrefix?e.replace(/^\?/,""):e,f=r.parameterLimit===1/0?void 0:r.parameterLimit,d=u.split(r.delimiter,f),p=-1,y=r.charset;if(r.charsetSentinel)for(t=0;t<d.length;++t)0===d[t].indexOf("utf8=")&&("utf8=%E2%9C%93"===d[t]?y="utf-8":"utf8=%26%2310003%3B"===d[t]&&(y="iso-8859-1"),p=t,t=d.length);for(t=0;t<d.length;++t)if(t!==p){var h,m,b=d[t],x=b.indexOf("]="),v=-1===x?b.indexOf("="):x+1;-1===v?(h=r.decoder(b,a.decoder,y,"key"),m=r.strictNullHandling?null:""):(h=r.decoder(b.slice(0,v),a.decoder,y,"key"),m=n.maybeMap(s(b.slice(v+1),r),(function(e){return r.decoder(e,a.decoder,y,"value")}))),m&&r.interpretNumericEntities&&"iso-8859-1"===y&&(m=l(m)),b.indexOf("[]=")>-1&&(m=i(m)?[m]:m),o.call(c,h)?c[h]=n.combine(c[h],m):c[h]=m}return c}(e,t):e,f=t.plainObjects?Object.create(null):{},d=Object.keys(u),p=0;p<d.length;++p){var y=d[p],h=c(y,u[y],t,"string"===typeof e);f=n.merge(f,h,t)}return n.compact(f)}},2334:function(e,r,t){var n=t(4184),o=t(9874),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},l=Array.isArray,s=String.prototype.split,c=Array.prototype.push,u=function(e,r){c.apply(e,l(r)?r:[r])},f=Date.prototype.toISOString,d=o.default,p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:d,formatter:o.formatters[d],indices:!1,serializeDate:function(e){return f.call(e)},skipNulls:!1,strictNullHandling:!1},y=function e(r,t,o,i,a,c,f,d,y,h,m,b,x,v){var j,g=r;if("function"===typeof f?g=f(t,g):g instanceof Date?g=h(g):"comma"===o&&l(g)&&(g=n.maybeMap(g,(function(e){return e instanceof Date?h(e):e}))),null===g){if(i)return c&&!x?c(t,p.encoder,v,"key",m):t;g=""}if("string"===typeof(j=g)||"number"===typeof j||"boolean"===typeof j||"symbol"===typeof j||"bigint"===typeof j||n.isBuffer(g)){if(c){var O=x?t:c(t,p.encoder,v,"key",m);if("comma"===o&&x){for(var w=s.call(String(g),","),_="",Z=0;Z<w.length;++Z)_+=(0===Z?"":",")+b(c(w[Z],p.encoder,v,"value",m));return[b(O)+"="+_]}return[b(O)+"="+b(c(g,p.encoder,v,"value",m))]}return[b(t)+"="+b(String(g))]}var N,S=[];if("undefined"===typeof g)return S;if("comma"===o&&l(g))N=[{value:g.length>0?g.join(",")||null:void 0}];else if(l(f))N=f;else{var k=Object.keys(g);N=d?k.sort(d):k}for(var P=0;P<N.length;++P){var D=N[P],A="object"===typeof D&&"undefined"!==typeof D.value?D.value:g[D];if(!a||null!==A){var C=l(g)?"function"===typeof o?o(t,D):t:t+(y?"."+D:"["+D+"]");u(S,e(A,C,o,i,a,c,f,d,y,h,m,b,x,v))}}return S};e.exports=function(e,r){var t,n=e,s=function(e){if(!e)return p;if(null!==e.encoder&&"undefined"!==typeof e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var r=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=o.default;if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");t=e.format}var n=o.formatters[t],a=p.filter;return("function"===typeof e.filter||l(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:r,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,format:t,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}}(r);"function"===typeof s.filter?n=(0,s.filter)("",n):l(s.filter)&&(t=s.filter);var c,f=[];if("object"!==typeof n||null===n)return"";c=r&&r.arrayFormat in a?r.arrayFormat:r&&"indices"in r?r.indices?"indices":"repeat":"indices";var d=a[c];t||(t=Object.keys(n)),s.sort&&t.sort(s.sort);for(var h=0;h<t.length;++h){var m=t[h];s.skipNulls&&null===n[m]||u(f,y(n[m],m,d,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.format,s.formatter,s.encodeValuesOnly,s.charset))}var b=f.join(s.delimiter),x=!0===s.addQueryPrefix?"?":"";return s.charsetSentinel&&("iso-8859-1"===s.charset?x+="utf8=%26%2310003%3B&":x+="utf8=%E2%9C%93&"),b.length>0?x+b:""}},4184:function(e,r,t){var n=t(9874),o=Object.prototype.hasOwnProperty,i=Array.isArray,a=function(){for(var e=[],r=0;r<256;++r)e.push("%"+((r<16?"0":"")+r.toString(16)).toUpperCase());return e}(),l=function(e,r){for(var t=r&&r.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(t[n]=e[n]);return t};e.exports={arrayToObject:l,assign:function(e,r){return Object.keys(r).reduce((function(e,t){return e[t]=r[t],e}),e)},combine:function(e,r){return[].concat(e,r)},compact:function(e){for(var r=[{obj:{o:e},prop:"o"}],t=[],n=0;n<r.length;++n)for(var o=r[n],a=o.obj[o.prop],l=Object.keys(a),s=0;s<l.length;++s){var c=l[s],u=a[c];"object"===typeof u&&null!==u&&-1===t.indexOf(u)&&(r.push({obj:a,prop:c}),t.push(u))}return function(e){for(;e.length>1;){var r=e.pop(),t=r.obj[r.prop];if(i(t)){for(var n=[],o=0;o<t.length;++o)"undefined"!==typeof t[o]&&n.push(t[o]);r.obj[r.prop]=n}}}(r),e},decode:function(e,r,t){var n=e.replace(/\+/g," ");if("iso-8859-1"===t)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},encode:function(e,r,t,o,i){if(0===e.length)return e;var l=e;if("symbol"===typeof e?l=Symbol.prototype.toString.call(e):"string"!==typeof e&&(l=String(e)),"iso-8859-1"===t)return escape(l).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var s="",c=0;c<l.length;++c){var u=l.charCodeAt(c);45===u||46===u||95===u||126===u||u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122||i===n.RFC1738&&(40===u||41===u)?s+=l.charAt(c):u<128?s+=a[u]:u<2048?s+=a[192|u>>6]+a[128|63&u]:u<55296||u>=57344?s+=a[224|u>>12]+a[128|u>>6&63]+a[128|63&u]:(c+=1,u=65536+((1023&u)<<10|1023&l.charCodeAt(c)),s+=a[240|u>>18]+a[128|u>>12&63]+a[128|u>>6&63]+a[128|63&u])}return s},isBuffer:function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},maybeMap:function(e,r){if(i(e)){for(var t=[],n=0;n<e.length;n+=1)t.push(r(e[n]));return t}return r(e)},merge:function e(r,t,n){if(!t)return r;if("object"!==typeof t){if(i(r))r.push(t);else{if(!r||"object"!==typeof r)return[r,t];(n&&(n.plainObjects||n.allowPrototypes)||!o.call(Object.prototype,t))&&(r[t]=!0)}return r}if(!r||"object"!==typeof r)return[r].concat(t);var a=r;return i(r)&&!i(t)&&(a=l(r,n)),i(r)&&i(t)?(t.forEach((function(t,i){if(o.call(r,i)){var a=r[i];a&&"object"===typeof a&&t&&"object"===typeof t?r[i]=e(a,t,n):r.push(t)}else r[i]=t})),r):Object.keys(t).reduce((function(r,i){var a=t[i];return o.call(r,i)?r[i]=e(r[i],a,n):r[i]=a,r}),a)}}}}]);
//# sourceMappingURL=472.04113cf0.chunk.js.map