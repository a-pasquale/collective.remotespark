if("undefined"==typeof hi5)var hi5={};hi5.init={funcs:[],push:function(a){hi5.init.funcs.push(a)},start:function(){for(var a=hi5.init.funcs,c=0,d=a.length;c<d;c++)a[c]()}};String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});Number.prototype.toByte=function(){var a=this&255;return a>127?a-256:a};
String.prototype.applyArgs=function(a){for(var c=this.split("%"),d,e,b=c[0],f=1,g=c.length;f<g;f++){d=c[f];var h=parseInt(d);if(isNaN(h))b=b+d;else{e=d.substring((h+"").length);(d=a[h-1])&&(b=b+d);b=b+e}}return b};Array.prototype.removeElm=function(a){a=this.indexOf(a);a!=-1&&this.splice(a,1)};Array.prototype.fill=function(a){for(var c=this.length;--c>=0;)this[c]=a};
Date.prototype.getStdTimezoneOffset=function(){var a=new Date(this.getFullYear(),0,1),c=new Date(this.getFullYear(),6,1);return Math.max(a.getTimezoneOffset(),c.getTimezoneOffset())};hi5.WebSocket=window.WebSocket||window.MozWebSocket;hi5.$=function(a){return document.getElementById(a)};hi5.callback={callbacks:{},no:0,put:function(a){var c="CB"+this.no++;this.callbacks[c]=a;return c},get:function(a){var c=this.callbacks[a];c&&delete this.callbacks[a];return c}};
hi5.tool={isNumber:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},getMousePos:function(a){var c=0,d=0;if(!a)a=window.event;if(a.pageX){c=a.pageX;d=a.pageY}else if(a.clientX){c=a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;d=a.clientY+document.body.scrollTop+document.documentElement.scrollTop}return{x:c,y:d}},getPos:function(a){var c=0,d=0;if(a.offsetParent){do{c=c+a.offsetLeft;d=d+a.offsetTop}while(a=a.offsetParent)}return{x:c,y:d}},bytesToSize:function(a){if(isNaN(a))return"";
var c=Math.floor(Math.log(+a)/Math.log(2));c<1&&(c=0);c=Math.floor(c/10);a=+a/Math.pow(2,10*c);a.toString().length>a.toFixed(3).toString().length&&(a=a.toFixed(3));return a+[" bytes"," KB"," MB"," GB"," TB"," PB"," EB"," ZB"," YB"][c]},queryToObj:function(a){a||(a=location.search.substring(1));var c={};if(a)for(var a=a.split("&"),d=a.length,e=0;e<d;e++){var b=a[e].split("=");c[b[0]]=decodeURIComponent(b[1])}return c},disableInput:function(){var a=document.createElement("div");a.style.position="fixed";
a.style.left=0;a.style.top=0;a.style.width="100%";a.style.height="100%";a.style.zIndex=99999;a.style.background="url(spinner.gif) no-repeat center center";document.documentElement.appendChild(a);window.__hi5_bk=a},enableInput:function(){if(window.__hi5_bk){document.documentElement.removeChild(window.__hi5_bk);window.__hi5_bk=null}},scale:function(a,c,d,e){d||(d=0);e||(e=0);d=d+" "+e;a.style.transformOrigin=d;a.style.MozTransformOrigin=d;a.style.webkitTransformOrigin=d;a.style.msTransformOrigin=d;
a.style.OTransformOrigin=d;c="scale("+c+")";a.style.transform=c;a.style.MozTransform=c;a.style.webkitTransform=c;a.style.msTransform=c;a.style.OTransform=c},openWebSocket:function(a,c,d){var e=false;if(d){d=hi5.callback.put(d);a=a+("&callback="+d)}var b=new hi5.WebSocket(a);b.onopen=function(){e=true;c&&b.send(c)};b.onclose=function(){e||alert(__svi18n.errorCode.connection)};b.onmessage=function(a){b.close();a=JSON.parse(a.data);a.callback?hi5.callback.get(a.callback)(a):console.log(a)};return b},
getChildNodesByTag:function(a,c){for(var d=a.childNodes,e=[],b=0,f=d.length;b<f;b++)d[b].nodeName.toLowerCase()==c&&e.push(d[b]);return e},arraycopy:function(a,c,d,e,b){for(var f=0;f<b;f++)d[e+f]=a[c+f]},hasProperty:function(a,c){return c in a||c in a.prototype?true:c in(a.__proto__||a.constructor.prototype)},isCapslock:function(a){var c=String.fromCharCode(a.keyCode||a.which);return c.toUpperCase()===c&&c.toLowerCase()!==c&&!a.shiftKey?true:false}};
hi5.browser=function(){var a=navigator.userAgent,a={isTouch:"createTouch"in document||a.indexOf("Mobile")!=-1,isFirefox:a.indexOf("Firefox")!=-1,isOpera:a.indexOf("Opera")!=-1,isRIM:a.indexOf(" RIM ")!=-1,isChrome:a.indexOf("Chrome")!=-1,isMacOS:a.indexOf("Mac OS")!=-1,isiOS:navigator.userAgent.match(/(iPad|iPhone|iPod)/i)?true:false,isSafari:a.indexOf("Chrome")==-1&&a.indexOf("Safari")!=-1};a.isMultitask=!(a.isTouch&&a.isMacOS);a.iOSFix=function(a,d){if(hi5.browser.isTouch&&hi5.browser.isSafari){d||
(d=0.1);a||(a=8);var e=document.querySelector('meta[name="viewport"]');if(e){var b=999,f=true,g=function(){timeoutId=setTimeout(function(){console.log("... restore");e.scaleDisabled=false;e.content="width=device-width, minimum-scale="+d+", maximum-scale="+a},999)};window.addEventListener("deviceorientation",function(a){a=a.beta;if(f){f=false;b=a}else{var c=false;if((c=Math.abs(b)<5?Math.abs(a-b)>20:a/b<0.6)&&!e.scaleDisabled){e.scaleDisabled=true;e.content="width=device-width, minimum-scale=1, maximum-scale=1";
console.log("....Disabled, "+a+" start:"+b+" o:"+window.orientation);g()}}},false);window.addEventListener("orientationchange",function(){f=true},false)}}};a.binaryWS=function(a){var d=false;try{var e=new hi5.WebSocket(a||"ws://localhost"),d="binaryType"in e;e.close()}catch(b){}return d};a.cookie2Obj=function(){var a=document.cookie,d={},e;if(a=="")return d;for(var b=a.split(";"),f=0,g=b.length;f<g;f++){for(var h=b[f];h.charAt(0)==" ";)h=h.substring(1,h.length);a=h.indexOf("=");if(a>0){e=decodeURIComponent(h.substring(a+
1).replace(/\+/g," "));hi5.tool.isNumber(e)&&(e=parseFloat(e));if(e==="true"||e==="on")e=true;else if(e==="false"||e==="off")e=false;d[h.substring(0,a)]=e}}return d};a.getLibPath=function(a){for(var d=document.getElementsByTagName("script"),e,b,f=null,g=d.length,h=0;h<g;h++){b=d[h].src;e=b.indexOf(a);if(e>-1){f=b.substring(0,e);break}}return f};a.loadJS=function(a){a.indexOf("/")<0&&(a=hi5.libPath+a);getLibPath(a)||document.writeln('<script type="text/javascript" src="'+a+'"><\/script>')};a.formToObj=
function(a,d){var e=a.elements,b,f,g,h=e.length;d||(d={});for(var i=0;i<h;i++){b=e[i];g=b.name;f=b.type;switch(f){case "button":continue;case "checkbox":b=b.checked;break;case "raido":if(!b.checked)continue;b=b.checked;break;case "number":parseFloat(b.value);default:b=b.value}b!==""&&(d[g]=b)}return d};a.objToForm=function(a,d){var e,b,f=d.elements,g;for(g in a)if(e=f[g]){b=a[g];typeof b=="boolean"?e.checked=b:e.value=b}};a.getScale=function(){return document.documentElement.clientWidth/window.innerWidth};
return a}();hi5.libPath=hi5.browser.getLibPath("hi5_min.js");hi5.libPath||(hi5.libPath=hi5.browser.getLibPath("hi5.js"));
hi5.EventControl=function(a){a.addEvent=function(c,d){if(!a[c]||!a[c]._evt_listeners){a[c]=function(){a.fireEvent(c,arguments)};a[c]._evt_listeners=[]}a[c]._evt_listeners.push(d)};a.removeEvent=function(c,d){if(!a[c]&&!a[c]._evt_listeners)return false;var e=a[c]._evt_listeners,b=e.indexOf(d);if(b>-1){e.removeElm(b);return true}return false};a.fireEvent=function(c,d){if(a[c]&&a[c]._evt_listeners){var e=a[c]._evt_listeners;d||(d=[]);for(var b=0,f=e.length;b<f;b++)e[b].apply(a,d)}};return a};
hi5.Dragable=function(a){function c(b){b.preventDefault&&b.preventDefault();b.touches&&(b=b.touches.length==1?b.touches[0]:b.changedTouches[0]);var b=e(b),c=b.y-d.y;a.style.left=a.offsetLeft+(b.x-d.x)+"px";a.style.top=a.offsetTop+c+"px";d.x=b.x;d.y=b.y}a.draggable=true;var d={},e=hi5.tool.getMousePos,b=hi5.browser.isTouch;a.addEventListener(b?"touchstart":"dragstart",function(a){a.stopPropagation&&a.stopPropagation();a.touches&&(a=a.touches[0]);d=e(a)},false);a.addEventListener(b?"touchend":"dragend",
function(b){b.stopPropagation&&b.stopPropagation();if(!b.touches){var b=e(b),c=b.y-d.y;a.style.left=a.offsetLeft+(b.x-d.x)+"px";a.style.top=a.offsetTop+c+"px"}},false);b&&a.addEventListener("touchmove",c,false);return a};
hi5.Fadable=function(a,c,d){function e(){document.activeElement==a.activeObj?setTimeout(e,h):a.style.display="none"}function b(){a.beforeDisplay&&a.beforeDisplay();a.style.display=g;if(j){i!=null&&clearTimeout(i);i=setTimeout(e,h)}}if(a.tabIndex<0)a.tabIndex=999;var f=d||document,g=a.style.display,h=c||3E3,i=null,j=true;a.setFadable=function(c){(j=c)?f.addEventListener(hi5.browser.isTouch?"touchend":"mouseup",b,false):a.style.display=g};a.startFade=b};
hi5.Toolbar=function(){var a=document.createElement("div");a.className="toolbar";a.addButton=function(c,d){var e=document.createElement("img");c.indexOf("/")<0&&(c=hi5.libPath+c);e.src=c;e.onclick=d;a.appendChild(e);return e};a.removeButton=function(c){for(var d=a.getElementsByTagName("img"),e=d.length,b=0;b<e;b++)if(d[b].src.indexOf(c)>=0){a.removeChild(d[b]);e==1&&a.parentNode.removeChild(a);break}};return a};
hi5.ProgressBar=function(a){a.progress=0;a.maxValue=0;var c=a.getElementsByTagName("div")[0];a.setProgress=function(d){d=Math.floor(d/a.maxValue*100);if(d!=a.progress){a.progress=d;c.style.width=d/100*a.offsetWidth+"px"}};return a};
hi5.Lightbox=function(a,c){function d(){var b=e.clientWidth,c=e.clientHeight,d=a.offsetWidth,g=a.offsetHeight;if(d>b*0.96){d=b*0.96;a.style.width=d+"px"}if(g>c*0.96){g=c*0.96;a.style.height=g+"px";a.style.width=a.offsetWidth+22+"px"}b=(b-d)/2;c=(c-g)/3;a.style.left=b+"px";a.style.top=c+"px";f.style.left=b+a.offsetWidth-6+"px";f.style.top=c-6+"px"}var e=document.createElement("div");e.style.position="fixed";e.style.left=0;e.style.top=0;e.style.width="100%";e.style.height="100%";e.style.zIndex=999;
e.style.backgroundColor="#222";c||(c=0.4);e.style.opacity=c;var b=a.style.display;a.style.position="absolute";a.style.zIndex=1E3;a.style.visibility="hidden";var f=document.createElement("div");f.style.position="absolute";var g=document.createElement("img");g.width=25;g.height=25;g.src=hi5.appcfg&&hi5.appcfg.img&&hi5.appcfg.img.close?hi5.appcfg.img.close:hi5.libPath+"del.png";g.style.cursor="pointer";f.style.zIndex=10001;g.align="top";f.appendChild(g);a.resize=d;a.show=function(){var b=document.documentElement;
b.appendChild(e);b.appendChild(f);a.style.display="block";a.style.visibility="visible";d()};a.visible=function(){return a&&a.style.visibility=="visible"};a.dismiss=function(c){function d(){var c=document.documentElement;c.removeChild(e);c.removeChild(f);a.style.visibility="hidden";a.style.display=b;if(a.onclose)a.onclose()}c?setTimeout(d,c):d()};a.background=e;g.addEventListener("click",a.dismiss,false);return a};
hi5.DataTable=function(a){hi5.EventControl(a);typeof a==="string"&&(a=JSON.parse(a));var c=a.rows,d=a.cols;a.rowNo=-1;a.beforeGetValue=null;a.moveTo=function(c){a.rowNo=c};a.getColNo=function(a){for(var b=0,c=d.length;b<c;b++)if(d[b].name===a)return b;return-1};a.getValue=function(d){var b=c[a.rowNo][d];return a.beforeGetValue==null?b:a.beforeGetValue(d,b)};a.setValue=function(d,b){c[a.rowNo][d]=b;a.fireEvent("onchange",[d,a.rowNo,b])};a.first=function(){a.moveTo(0)};a.next=function(){a.moveTo(a.rowNo+
1)};a.last=function(){a.moveTo(c.length-1)};a.hasNext=function(){return a.rowNo<c.length-1};a.remove=function(d){if(!d)d=a.rowNo;var b=[d];a.fireEvent("beforeremove",b);c.splice(d,1);a.fireEvent("onremove",b)};a.perform=function(c){typeof a[c]=="function"?a[c].apply(a):a.fireEvent("onaction",[c])};a.fireEvent("onopen");return a};
hi5.DataGrid=function(a){function c(c){var b=this.rowIndex;if(typeof b=="number"){d=b=b-a.tHead.rows.length;a.dataTable.moveTo(b)}if(a.onrowclick)a.onrowclick(c)}if("TABLE"!=a.nodeName)throw"Not HTML Table";a.dataTable=null;a.onrowclick=null;var d=-1;a.getValue=function(c){var b=a.dataTable;b.moveTo(d);return b.getValue(b.getColNo(c))};a.fillData=function(e){var b=e.rows,f=e.cols.length,g=a.tBodies[0],h,i,j,l;if(!a._rowTemp)a._rowTemp=a.tBodies[0].rows[0].cloneNode(true);l=a._rowTemp;var k,m=g.cloneNode(false),
n;i=b.length;for(h=0;h<i;h++){k=l.cloneNode(true);n=k.cells;e.moveTo(h);for(b=0;b<f;b++){j=e.getValue(b);a.beforeDisplayValue&&(j=a.beforeDisplayValue(b,j));n[b].innerHTML=j}d=h;k.addEventListener("click",c,false);a.beforeAppendRow&&a.beforeAppendRow(k);m.appendChild(k)}a.removeChild(g);a.appendChild(m)};a.open=function(){if(a.dataTable!=null){a.fillData(a.dataTable);a.dataTable.addEvent("onremove",function(c){var b=a.tBodies[0];(c=b.rows[c])&&b.removeChild(c)})}};return a};
hi5.Select=function(a){var c=a.parentNode,d=document.createElement("div");d.style.padding="0";d.style.display="inline";c.insertBefore(d,a);var e=document.createElement("img");e.src="/++resource++collective.remotespark/select.png";e.height=a.offsetHeight;e.style.verticalAlign="-6px";d.appendChild(a);d.appendChild(e);var b=document.createElement("select"),c=a.getAttribute("hi5_size");b.size=c?c:10;if(c=a.getAttribute("hi5_list")){c=c.split(";");d=c.length;if(d>0)for(var f=b.options,g=0;g<d;g++)f[g]=new Option(c[g])}b.style.position="absolute";
b.style.zIndex=99999;b.style.display="none";document.documentElement.appendChild(b);a.show=function(){a.beforedropdown&&a.beforedropdown(a);b.style.display="";b.focus()};a.hide=function(){b.style.display="none";a.focus()};e.onclick=function(){if(b.style.display=="none"){if(b.options.length==0){var c=a.getAttribute("onfetchlist");c&&eval(c)}c=hi5.tool.getPos(a);b.style.left=c.x+"px";b.style.top=c.y+a.offsetHeight+"px";b.style.width=a.offsetWidth+e.width+3+"px";a.show()}else a.hide()};b.onchange=function(){a.value=
b.value;b.style.display="none";if(a.onchange)a.onchange()};a.options=b.options;return a};hi5.init.push(function(){for(var a=document.getElementsByClassName("Hi5Select"),c=a.length,d=0;d<c;d++)new hi5.Select(a[d])});
hi5.Tab=function(a){function c(b){var c=f;if(f!=b){g[f].className="tab_back";h[f].className="tab_hide";f=b}g[b].className="tab_front";h[b].className="tab_show";g[b].focus();c!=b&&a.fireEvent("ontabchange",[b,c])}function d(a){a=g.indexOf(a.target);a!=-1&&c(a)}hi5.EventControl(a);for(var e=a.getElementsByClassName("tab")[0].getElementsByClassName("tab_title")[0].childNodes,b=e.length,f=0,g=[],h=[],i=0;i<b;i++){var j=e[i];if(j.nodeName.toUpperCase()=="SPAN"){j.className="tab_back";j.onclick=d;j.onfocus=
d;g[g.length]=j}}e=a.getElementsByClassName("tab_body")[0].childNodes;b=e.length;for(i=0;i<b;i++){j=e[i];if(j.nodeName.toUpperCase()=="DIV"){h[h.length]=j;j.className="tab_hide"}}c(f);a.setSelected=c;a.getSelected=function(){return f};return a};hi5.init.push(function(){for(var a=document.getElementsByClassName("tab_all"),c=a.length,d=0;d<c;d++)new hi5.Tab(a[d])});hi5.graphic={};
hi5.graphic.Rectangle=function(a,c,d,e){this.x=a;this.y=c;this.width=d;this.height=e;this.union=function(a,c,d,e){var i=this.width,j=this.height;if((i|j)<0){this.x=a;this.y=c;this.width=d;this.height=e}else if(!((d|e)<0)){var l=this.x,k=this.y,i=i+l,j=j+k,d=d+a,e=e+c;l>a&&(l=a);k>c&&(k=c);i<d&&(i=d);j<e&&(j=e);this.x=l;this.y=k;this.width=i-l;this.height=j-k}}};
hi5.init.push(function(){function a(d){function e(a,c){g=document.createElement("img");g.src=hi5.libPath+a;g.className="hi5_notifer_button";g.onclick=function(a){c.apply(b,[a])};return g}var b=document.createElement("div");b.className="hi5_notifer";var f=document.createElement("div");f.className="hi5_notifer_title";var g,h=document.createElement("img");h.src=hi5.libPath+"info.png";h.className="hi5_notifer_icon";f.appendChild(h);f.appendChild(document.createTextNode(d.title?d.title:""));b.appendChild(f);
f=document.createElement("div");f.appendChild(document.createTextNode(d.msg));b.countNode=document.createElement("span");b.countNode.className="hi5_notifer_count";f.appendChild(b.countNode);d.cbNo&&f.appendChild(e("del.png",d.cbNo));d.cbYes&&f.appendChild(e("ok.png",d.cbYes));b.title=d.title;b.message=d.msg;b.msgCount=1;b.addCount=function(){b.msgCount++;b.countNode.innerHTML="("+b.msgCount+")"};b.appendChild(f);b.destroy=function(){if(b.parentNode){b.parentNode.removeChild(b);var d=c.notifyPool.shift();
if(d)c.appendChild(new a(d));else if(c.onempty&&c.notifySize()==0)c.onempty()}};d.timeout&&setTimeout(function(){b.destroy()},d.timeout);if(!d.cbYes&&!d.cbNo)b.onclick=b.destroy;return b}var c=hi5.$("hi5_notifer_all");if(!c){c=document.createElement("div");c.id="hi5_notifer_all";document.documentElement.appendChild(c)}c.notifyPool=[];c.getNotifier=function(a,e){for(var b=c.getElementsByTagName("div"),f=0,g=b.length;f<g;f++)if(b[f].title==a&&b[f].message==e)return b[f];return null};c.notify=function(d){var e=
c.getNotifier(d.title,d.msg);e?e.addCount():hi5.tool.getChildNodesByTag(c,"div").length<3?c.appendChild(new a(d)):c.notifyPool.push(d)};c.notifySize=function(){return hi5.tool.getChildNodesByTag(c,"div").length};hi5.notifications=c});document.addEventListener("DOMContentLoaded",hi5.init.start,!1);
