var svGlobal={version:"2.8.5",log:1,isMultitask:hi5.browser.isMultitask,util:{},logger:{debug:function(f){2<svGlobal.log&&console.log(f)},info:function(f){1<svGlobal.log&&console.log(f)},warn:function(f){0<svGlobal.log&&console.log(f)}}},isTouch=hi5.browser.isTouch;function cancelDefault(f){f.preventDefault();f.stopPropagation()}
function LocalInterface(){function f(){return g.railWin?!0:!ba&&u<=window.innerWidth&&q<=window.innerHeight}function G(a){function b(a,b){for(var c,e=a.length,d=Array(e),g=0;g<e;g++){c=a[g];var h=d,f=g,k;k=c.identifier;if(!(256>k)){var l=j.indexOf(k);-1!=l?k=l:(j.push(k),k=j.length-1)}h[f]={contactId:k,contactFlags:b,x:c.pageX-i.offsetLeft,y:c.pageY-i.offsetTop}}return d}var c,j=[],e=!1;this.handle=function(d){var g=d.type,h=d.touches,i=d.changedTouches;cancelDefault(d);switch(g){case "touchstart":e=
!1;c=d=b(h,25);break;case "touchmove":d=b(i,26);g=!1;if(0<c.length&&1==d.length){a:{h=c.length;for(i=0;i<h;i++)if(c[i].contactId==d[0].contactId){h=i;break a}h=-1}-1!=h&&(c[h].x==d[0].x&&c[h].y==d[0].y)&&(g=!0)}if(g)break;else 0<c.length&&(a.redirectTouches(c),c.length=0);a.redirectTouches(d);e=!0;break;case "touchend":if(e)d=b(i,4);else{a.redirectTouches(c);d=c.length;for(g=0;g<d;g++)c[g].contactFlags=4;d=c}a.redirectTouches(d);j.length=c.length=0;break;case "touchcancel":a.redirectTouches(b(i,34)),
j.length=c.length=0}}}function r(a){function b(a,b){for(var c=0,j=a.length;c<j;c++)if(a[c].identifier==b)return a[c];return null}var c=0,j=0,e=0,d=0,g=!1,h=0,i=0,k=0,l=0,w=!1,m=!1,s=2*window.devicePixelRatio,t=0,O=!1;this.delay=!1;this.handle=function(E){var v=0,v=E.touches,n=E.changedTouches,q,p;switch(E.type){case "touchstart":moveSpace=moveCount=0;O=!1;j=v.length;m=!1;d=(new Date).getTime();g=200>d-e;p=v[0];c=p.identifier;h=p.pageX;i=p.pageY;w=!0;2==j?(p=v[1].screenX-v[0].screenX,v=v[1].screenY-
v[0].screenY,t=Math.sqrt(p*p+v*v)):t=0;O=2==j&&t>110*window.devicePixelRatio;break;case "touchmove":if(O)return;1==j&&f()&&(window.scrollTo(0,0),cancelDefault(E));p=n[v.length-1];if(p.identifier!=c&&(p=b(n,c),!p)){cancelDefault(E);return}n=p.pageX;q=p.pageY;if(w){if(Math.abs(n-h)<s&&Math.abs(q-i)<s){cancelDefault(E);return}w=!1;v=(new Date).getTime()-d;if((m=180>v)&&!f()&&1==j){O=!0;return}a.touchstart({x:h,y:i,flick:m,pointes:j,screenX:p.screenX,screenY:p.screenY,distance:t})}cancelDefault(E);a.touchmove({x:n,
y:q,flick:m,pointes:j,screenX:p.screenX,screenY:p.screenY,distance:t});break;case "touchend":if(O)return;if(p=b(n,c)){var u=(new Date).getTime(),n=p.pageX;q=p.pageY;m?a.touchend({x:n,y:q,flick:!0,pointes:j,moved:!w,screenX:p.screenX,screenY:p.screenY}):(v=u-d,w?(e=u,g||(k=n,l=q),500>v?(e=u,a.touchstart({x:k,y:l,flick:!1,pointes:j,moved:!w,screenX:p.screenX,screenY:p.screenY}),a.touchend({x:k,y:l,flick:!1,pointes:j,moved:!w,screenX:p.screenX,screenY:p.screenY})):a.longpress({x:n,y:q,flick:!1,pointes:j,
screenX:p.screenX,screenY:p.screenY})):a.touchend({x:n,y:q,flick:!1,pointes:j,moved:!w,screenX:p.screenX,screenY:p.screenY}))}break;case "touchcancel":console.log("canceled!!")}g&&cancelDefault(E)}}function B(){if(!e&&!hi5.$("wsinput")){e=document.createElement("textarea");e.id="wsinput";e.style.resize="none";e.style.opacity=0;e.style.position="absolute";e.style.margin="0";e.style.border="0";var a=hi5.tool.getPos(i);e.style.left=a.x+"px";e.style.top=a.y+"px";e.style.width=u+"px";e.style.height=q+
"px";e.style.zIndex=88;e.style.cursor="default";e.style.fontSize="1px";i.parentNode.appendChild(e)}}function x(){d||(d=document.getElementById("svImgCursor"),d||(d=document.createElement("img"),d.id="svImgCursor",d.alt="+",d.style.position="absolute",d.style.left=90,d.style.top=90,d.scrX=0,d.scrY=0,d.hotX=0,d.hotY=0,ca&&(d.src=ca.data),document.documentElement.appendChild(d),1<svGlobal.log&&console.log("imgCursor: enabled"),d.addEventListener("touchstart",F,!1),d.addEventListener("touchend",F,!1),
d.addEventListener("touchmove",F,!1),d.addEventListener("touchcancel",F,!1)))}function n(){var a=document.documentElement;a.style.overflow="hidden";y=Math.min(window.innerWidth/u,window.innerHeight/q);hi5.tool.scale(a,y)}function K(){g.toolbar&&g.toolbar.parentNode&&(g.toolbar.parentNode.removeChild(g.toolbar),g.toolbar=null)}function P(){var a=document.createElement("div");a.contentEditable="true";a.style.position="absolute";a.style.zIndex=89;a.style.left=0;a.style.top=0;a.tabIndex=1;a.style.outline=
"none";a.style.opacity=0;i.parentNode.appendChild(a);return a}function Q(a){g.focused=!0;k.onfocus(a);da=!0;null==e||(hi5.browser.isOpera||!s)||(h(!1,29),h(!1,56),h(!1,42),ea&&setTimeout(function(){if(!("undefined"==typeof k||null==k)){k.send("880");var a=P();try{a.focus();document.execCommand("paste",!1,null);var c="";if("innerText"in a)c=a.innerText;else var j=c=a.innerHTML,j=j.replace(/<br\/?>/gi,"\r\n").replace(/(<([^>]+)>)/gi,""),c=j.replace(/&[^;]+;/gi,function(a){return Fa[a]||a});0<c.length&&
k.setDataFromClip(c)}catch(d){}finally{a.parentNode.removeChild(a),e.focus()}}},3))}function t(a){if(!na&&g.railWin&&g.railWin.isRunning()){var b=__svi18n.remoteApp.close;a||(a=window.event);a&&(a.returnValue=b);hi5.browser.isFirefox&&hi5.notifications.show({msg:b});return b}}function oa(){document.oncontextmenu=function(){return!1};document.onselectstart=function(){return!1}}function Ga(a){if(L)hi5.browser.isTouch||n();else k.onresize(a)}function fa(a){var b=hi5.browser;b.isChrome||b.isSafari?a.addEventListener("textInput",
pa,!1):a.addEventListener("input",qa,!1)}function Ha(){ba=!0;var a=document.getElementById("pc_key");a&&(a.style.display="block",a.style.top=window.pageYOffset+"px")}function w(){ba=!1;var a=document.getElementById("pc_key");a&&(a.style.display="none")}function ra(a){cancelDefault(a);if("touchstart"==a.type){var b=a.target,c=0;switch(b.innerHTML.charCodeAt(0)){case 8592:c=203;break;case 8593:c=200;break;case 8594:c=205;break;case 8595:c=208;break;default:switch(a.target.innerHTML){case "Ctrl":M?h(!1,
29):h(!0,29);M=!M;b.style.color=M?"red":"white";return;case "Alt":N?h(!1,56):h(!0,56);N=!N;b.style.color=N?"red":"white";return;case "Del":c=211;break;case "F1":c=59;break;case "F2":c=60;break;case "F3":c=61;break;case "F4":c=62;break;case "F5":c=63;break;case "F6":c=64;break;case "F7":c=65;break;case "F8":c=66;break;case "F9":c=67;break;case "F10":c=68;break;case "F11":c=87;break;case "F12":c=88;break;case "Esc":c=1;break;case "Alt+F4":h(!0,56);h(!0,62);h(!1,62);h(!1,56);return;case "Start":h(!0,
29);h(!0,1);h(!1,1);h(!1,29);return;case "Ctrl+Alt+Del":h(!0,29);h(!0,56);h(!0,211);h(!1,211);h(!1,56);h(!1,29);return;case "...":if(a=document.getElementById("pc_key_more"))a.style.display="block"==a.style.display?"none":"block";return}}h(!0,c);h(!1,c)}}function sa(){var a=hi5.browser.isRIM;m=document.getElementById("svTouchInput");if(!m&&(m=document.createElement(a?"input":"textarea"),a&&(m.type="password"),m.id="svTouchInput",m.style.resize="none",m.style.cursor="default",m.cols=1,m.rows=1,m.style.opacity=
0,m.style.fontSize="2em",m.style.width="1px",m.style.height="1px",m.style.display="inline-block",m.onkeydown=ta,m.onkeyup=ta,m.autocorrect="boolean"==typeof m.autocorrect?!1:"off",m.autocomplete="boolean"==typeof m.autocomplete?!1:"off",m.spellcheck=!1,m.autocapitalize="boolean"==typeof m.autocapitalize?!1:"none",fa(m),m.addEventListener("focus",Ha,!1),m.addEventListener("blur",w,!1),a=document.getElementById("pc_key"))){for(var b=a.getElementsByTagName("span"),c=b.length,j=0;j<c;j++)b[j].className=
"button",b[j].style.color="white",b[j].addEventListener("touchstart",ra,!1),b[j].addEventListener("touchup",ra,!1);hi5.browser.isSafari&&(a.style.position="absolute")}}function z(a,b){function c(a,c){var j=document.createElement("span");j.data_path=a;j.className="path";j.innerHTML=c;j.onclick=function(){z(this.data_path,b)};return j}var j=document.getElementById("parentPath");j.currentDir||(j.currentDir="/");"."==a?a=j.currentDir:j.currentDir=a;j.currentDir=a;k.getShareFiles(a,function(a){function e(b){b||
(b=g.getValue("Name"));var c=a.parent;if(""==c||"/"!=c.charAt(c.length-1))c+="/";return c+b}a.error&&alert(__svi18n.file[a.error]);var d=new hi5.DataTable(a),g=new hi5.DataGrid(document.getElementById("filelist"));g.dataTable=d;var h=hi5.tool.bytesToSize;g.beforeDisplayValue=function(a,b){var c=d.cols[a].name;return"Date Modified"==c?(new Date(b)).toLocaleString():"Size"==c?h(b):"Type"==c&&"folder"==b?__svi18n.file.folder:b};g.onrowclick=function(c){var j=g.getValue("Name");"folder"==g.getValue("Type")?
z(("/"==a.parent?"":a.parent)+"/"+j,b):(j=e(j),"view"==c.target.name&&(j+="&action=view"),k.getFile(j))};g.beforeAppendRow=function(a){if("folder"==d.getValue(d.getColNo("Type")))a.getElementsByTagName("img")[0].style.visibility="hidden";else{a.draggable=!0;var b=g.getValue("Name"),c=e(b),c="application/octet-stream:"+b+":"+k.getFileLink(c);a.addEventListener("dragstart",function(a){a.dataTransfer.setData("DownloadURL",c)},!1)}};g.open();for(var i=a.parent;j.hasChildNodes();)j.removeChild(j.firstChild);
var f=c("/","&nbsp&nbsp&nbsp/");j.appendChild(f);if(!("/"==i||""==i))for(var i=i.split("/"),l="/",w=0,m=i.length;w<m;w++)f=i[w],""!=f&&(l=l+i[w]+"/",f=c(l,f+"/"),j.appendChild(f));b.resize()})}function A(){var a=document.getElementById("filecontainer");C=new hi5.Lightbox(a);z(".",C);C.show()}function l(){m&&m.focus()}function H(){var a=hi5.$("appinfo");if(g.showToolbar&&(hi5.browser.isTouch||D||a)){g.toolbar=new hi5.Toolbar;var b=hi5.appcfg,c=b&&b.img?b.img:null;hi5.browser.isTouch&&g.toolbar.addButton(c&&
c.kbd?c.kbd:"kbd.png",l);D&&(c=g.toolbar.addButton(c&&c.cloud?c.cloud:"cloud.png",A),c.title=__svi18n.info.files);hi5.browser.isTouch&&(g.toolbar.appendChild(m),g.toolbar.activeObj=m);document.documentElement.appendChild(g.toolbar);new hi5.Fadable(g.toolbar,3E3,hi5.browser.isTouch?i:e);c=!0;b&&b.toolbar&&(c=b.toolbar.fadable);g.toolbar.setFadable(c);c&&(g.toolbar.style.display="none");hi5.browser.isTouch&&hi5.browser.isSafari&&(g.toolbar.style.position="absolute",g.toolbar.style.marginLeft=0);c=function(){var a=
k.getAppInfo(),b=hi5.$("numericId");b&&(b.innerHTML=a.numericId);if(b=hi5.$("connectingTo"))b.innerHTML=a.server;if(b=hi5.$("joinLink")){var c=hi5.appcfg&&hi5.appcfg.pageJoin?hi5.appcfg.pageJoin:"join.html",c=location.protocol+"//"+location.host+"/"+c+"?id="+a.numericId,d=a.webAddress;if(!d||1>d.length)d=k.getGateway();a=d.indexOf("://");d=d.substring(a+3);a=d.indexOf("/");0<a&&(d=d.substring(0,a));d.toLowerCase()!=location.host.toLowerCase()&&(c+="&gateway="+d);b.innerHTML=c;b.href=c}b=new hi5.Lightbox(hi5.$("appinfo"));
b.show();document.oncontextmenu=null;document.onselectstart=null;b.onclose=oa};a&&(c=g.toolbar.addButton(b&&b.img&&b.img.shadowing?hi5.appcfg.img.shadowing:"info.png",c),c.title=__svi18n.info.info);if(g.onloadtoolbar)g.onloadtoolbar(g.toolbar)}}function ga(a,b,c){a=d.scrX+a;b=d.scrY+b;0>a?a=0:a>u&&(a=u-1);0>b?b=0:b>q&&(b=q-1);d.scrX=a;d.scrY=b;d.style.left=i.offsetLeft+a-d.hotX+"px";d.style.top=i.offsetTop+b-d.hotY+"px";s&&!c&&k.send("82"+a+"\t"+b)}function V(a,b,c){d||x();ga(a-d.scrX,b-d.scrY,c)}
function ha(a,b,c,j){var e;switch(a){case "touchstart":ia=!1;touchStartX=b;touchStartY=c;0==d.scrX&&0==d.scrY&&V(b-50,c-50);j&&k.send("80"+d.scrX+"\t"+d.scrY+"\t0");break;case "touchmove":ia=!0;j=b-W;a=c-R;if(0==j&&0==a)return;(e=5>Math.abs(ua)&&5>Math.abs(va)&&(7<Math.abs(j)||7<Math.abs(a)))||ga(j,a);ua=j;va=a;break;case "touchend":(a=!ia&&!j)&&k.send("80"+d.scrX+"\t"+d.scrY+"\t0"),(a||j)&&k.send("81"+d.scrX+"\t"+d.scrY+"\t0")}W=b;R=c}function F(a){s&&X.handle(a)}function ja(a){if(hi5.browser.isFirefox){switch(a){case 109:return 189;
case 107:return 187;case 59:return 186;case 61:return ka?187:61;case 220:return ka?222:220;case 222:return ka?192:222;case 224:return 17}return a}if(hi5.browser.isOpera){switch(a){case 59:return 186;case 61:return 187;case 109:return 189;case 219:return 91;case 57351:return 93}return a}return 91==a||93==a?17:a}function wa(a){var b=a.keyCode,c="keydown"==a.type;c&&(229<=b&&e?e.svIMEMode||(e.style.background="transparent",e.style.opacity=1,e.style.fontSize="1em",e.svIMEMode=!0):e.svIMEMode&&(e.style.opacity=
0,e.style.fontSize="1px",e.svIMEMode=!1));if(xa(a,b,c))return cancelDefault(a);if(17==b){if(a.altKey)return!0;h(c,29);return!0}if(18==b){if(a.ctrlKey)return!0;h(c,56);h(!1,56);h(!1,29);return!0}if(a.ctrlKey&&a.altKey)return!0;var b=ja(b),d=la(b);if(0<d)return h(c,d),cancelDefault(a);if(a.ctrlKey||a.altKey)return Y(c,b),c&&(Z=b),17==b||(a.ctrlKey||a.metaKey)&&(86==b||67==b||88==b)?(c&&67==b&&(e.value="A",e.select()),!0):cancelDefault(a);if(b==Z&&!c)return Y(!1,b),Z=0,cancelDefault(a);Z=0;return!0}
function xa(a,b,c){if(!a.altKey)return!1;switch(b){case 35:if(!a.ctrlKey)return!1;h(c,83);break;case 33:h(c,15);break;case 34:c?(h(!0,42),h(!0,15)):(h(!1,15),h(!1,42));break;case 45:h(c,1);break;case 36:c?(h(!1,56),h(!0,29),h(!0,1)):(h(!1,1),h(!1,29));break;default:return!1}return!0}function ya(a){if(!s)return!1;var b=a.keyCode,c="keydown"==a.type;if(c)229<=b&&e?e.svIMEMode||(e.style.background="transparent",e.style.opacity=1,e.style.fontSize="1em",e.svIMEMode=!0):e.svIMEMode&&(e.style.opacity=0,
e.style.fontSize="1px",e.svIMEMode=!1);else if(e&&e.svIMEMode)return;if(xa(a,b,c))return cancelDefault(a);if(229<=b)return c&&a.ctrlKey?h(!0,29):h(!1,29),!0;if(1>b)return!0;b=ja(b);if(za(b,c))return cancelDefault(a);var d=la(b);0<d?h(c,d):Y(c,b);c&&(a.altKey&&31<b)&&(Y(!1,b),h(!1,56));return 17==b||(a.ctrlKey||a.metaKey)&&(86==b||67==b||88==b)?(c&&67==b&&(e.value="A",e.select()),!0):144==b?!1:cancelDefault(a)}function ta(a){if(!s)return!1;var b=ja(a.keyCode),c="keydown"==a.type;if(!za(b,c)){13==b&&
(a.target.value="");b=la(b);if(-1==b)return!0;h(c,b)}return cancelDefault(a)}function pa(a){if(s)return k.send("86"+a.data+"\t"+(M||N?1:0)),isTouch||(a.target.value=""),cancelDefault(a)}function qa(a){if(!s)return!1;k.send("86"+a.target.value+"\t"+(M||N?1:0));a.target.value="";return cancelDefault(a)}function Ia(a){if(!s||!da)return cancelDefault(a);da=!1;k.prePaste=!0;if("clipboardData"in a)return k.setDataFromClip(a.clipboardData.getData("text/plain")),cancelDefault(a);var b=a.target,c=b.value;
hi5.browser.isFirefox||hi5.browser.isOpera?b.removeEventListener("input",qa,!1):b.removeEventListener("textInput",pa,!1);var d=function(){b.value==c&&setTimeout(d,5);k.setDataFromClip(b.value);b.value="";fa(b)};setTimeout(d,5);return!0}function Aa(a){if(s){if(Ba){var b=(new Date).getTime(),c=b-Ca;Ca=b;if(500<c)return}a.target.value=k.getClipData();a.target.select();setTimeout(function(){e.value=""},555)}}function za(a,b){return 44==a?(h(!0,170),h(!0,183),!0):19==a?(b?(h(!0,225),h(!0,29),h(!0,69),
h(!0,225),h(!0,157),h(!0,197)):h(!1,29),!0):!1}function h(a,b){s&&k.send("84"+(a?0:49152)+"\t"+b)}function Y(a,b){s&&k.send("8B"+(a?0:49152)+"\t"+b)}function $(a,b,c,d){d||(d=y);k.send("80"+a/d+"\t"+b/d+"\t"+c)}function Ja(a){a.target.focus();if(!s)return!1;var b=a.pageX-i.offsetLeft,c=a.pageY-i.offsetTop;if(g.railWin){var d=g.railWin.winClientDeltaX;S=b<=d||b>=window.innerWidth-d||c<=d||c>=window.innerHeight-d}else S=!1;if(S)return!1;$(b,c,a.button);return cancelDefault(a)}function Ka(a){if(!s)return!1;
d&&"-30px"!=d.style.left&&(d.style.left="-30px");var b=a.pageX-i.offsetLeft,c=a.pageY-i.offsetTop,e=void 0,e=y;k.send("82"+b/e+"\t"+c/e);return cancelDefault(a)}function aa(a,b,c,d){d||(d=y);k.send("81"+a/d+"\t"+b/d+"\t"+c)}function La(a){if(!s)return!1;if(S)return S=!1;aa(a.pageX-i.offsetLeft,a.pageY-i.offsetTop,a.button);return cancelDefault(a)}function Da(a){if(!s)return!1;var b=a.pageX-i.offsetLeft,c=a.pageY-i.offsetTop,d="1";a.wheelDelta?0<a.wheelDelta&&(d="0"):a.detail&&0>a.detail&&(d="0");
a=void 0;a=y;k.send("83"+b/a+"\t"+c/a+"\t"+d);return!1}function la(a){switch(a){case 33:return 201;case 34:return 209;case 35:return 207;case 36:return 199;case 37:return 203;case 38:return 200;case 39:return 205;case 40:return 208;case 154:return 183;case 45:return 210;case 46:return 211;case 65406:return 184;case 91:return 91;case 93:return 93;case 27:return 1;case 8:return 14;case 9:return 15;case 13:return 28;case 224:case 17:return 29;case 16:return 54;case 18:return 56;case 20:return 58;case 112:return 59;
case 113:return 60;case 114:return 61;case 115:return 62;case 116:return 63;case 117:return 64;case 118:return 65;case 119:return 66;case 120:return 67;case 121:return 68;case 122:return 87;case 123:return 88;case 144:return 69;case 145:return 70}return-1}function Ea(a){return"url("+a.data+") "+a.hotX+" "+a.hotY+", default"}var i=document.getElementById("remotectrl"),k=null,L=!1,y=1;i.style.outline="none";var u=0,q=0,I=i.getContext("2d"),e=null,Ba=!1,M=!1,N=!1,na=!1,da=!1,D=null,ea=!0;this.context=
I;this.fileProgress=null;var g=this,s=!0,T=!1,J=!1,U=null,C=null,d=null,ca=null,X=null,m=null,ba=!1,W=-1,R=-1,ua=0,va=0,ia=!1,ma=null;window.devicePixelRatio=window.devicePixelRatio||1;this.railWin=this.toolbar=null;this.browser=window;this.focused=!1;this.showToolbar=!0;this.requestCredential=function(a){var b=__svi18n.template.login;if(b){console.log(a);var c=document.createElement("div");c.className="appdlg";c.innerHTML=b;document.documentElement.appendChild(c);if((b=hi5.$("loginDomain"))&&a.nbDomain)b.innerHTML=
a.nbDomain;var d=new hi5.Lightbox(c,0.9);d.onclose=function(){document.documentElement.removeChild(c)};try{g.close()}catch(e){}d.show();(b=hi5.$("loginUser"))&&b.focus();if(b=hi5.$("frmLogin"))b.onsubmit=function(){var a=hi5.$("loginUser").value,b=hi5.$("loginPassword").value,c=hi5.$("loginDomain").innerHTML;d.dismiss();setTimeout(function(){k.reconnect(a,b,c)},5);return!1}}else alert("No value for login template")};hi5.browser.isTouch?sa():B();window.addEventListener("scroll",function(){setTimeout(function(){var a=
document.getElementById("pc_key");a&&(a.style.left=window.pageXOffset+"px",a.style.top=window.pageYOffset+"px");g.toolbar&&(g.toolbar.style.top=window.pageYOffset+"px",g.toolbar.style.left=window.pageXOffset+(window.innerWidth-g.toolbar.offsetWidth)/2+"px")},200)},!1);this.setCaretPos=function(){};this.showMessage=function(a){hi5.notifications.notify({msg:a})};this.hideWhenClose=!0;this.setReadOnly=function(a){s=!a};this.setPlayerMode=function(){J=!0;g.showToolbar=!1;g.setReadOnly(!0);g.hideWhenClose=
!1};this.setAutoScale=function(a){L=a};this.setTouchpad=function(a){(T=a)?d||x():d&&d.parentNode&&(d.parentNode.removeChild(d),d=null)};this.setSize=function(a,b,c){window.scrollTo(0,0);u=a;q=b;i.width=u;i.height=q;hi5.browser.isTouch?sa():(B(),e.style.width=u+"px",e.style.height=q+"px");C&&C.visible()&&C.dismiss();if(L){if(!(a=!hi5.browser.isTouch))a=window.innerWidth,b=window.innerHeight,a=Math.max(u,q)<Math.max(a,b)&&Math.min(u,q)<Math.min(a,b);a&&(L=!1)}L?n():(a=document.documentElement,c?(ma=
c,a.style.overflow=c):(ma=u<=window.innerWidth&&q<=window.innerHeight?"hidden":"visible",a.style.overflow=ma))};window.svSurface=this;this.setController=function(a){k=a;hi5.browser.isTouch&&window.addEventListener("orientationchange",function(a){L?n():(k.onorientationchange(a),window.scrollTo(0,0))},!1)};this.setFileHandler=function(a){a?!D&&!J&&(D=a,g.fileProgress=new hi5.ProgressBar(document.getElementById("total")),K(),H(),a=hi5.browser.isTouch?i:e,D&&!J&&(svGlobal.util.initMapDisk(a,D),svGlobal.util.initMapDisk(document.getElementById("filecontainer"),
D),document.getElementById("uploadfile").addEventListener("change",function(a){D(a.target.files)},!1))):(D=null,g.fileProgress=null,g.toolbar&&g.toolbar.removeButton("cloud.png"),K(),H())};this.disableUpload=function(){document.getElementById("uploadfile").style.visibility="hidden"};this.disableShadow=function(){g.toolbar&&g.toolbar.removeButton("info.png")};this.close=function(){if(0<hi5.notifications.notifySize())hi5.notifications.onempty=function(){g.close()};else{g.removeEvents();try{d&&d.parentNode&&
(d.parentNode.removeChild(d),d=null),K(),na=!0,window&&!J&&(window.opener?window.close():this.hide())}catch(a){}}};this.setFastCopy=function(a){Ba=a};this.drawLicense=function(a){var b=a.charAt(0);I.font="12pt Arial";I.fillStyle="W"==b?"red":"black";a=a.substring(1);I.fillText(a,10,q-24)};this.drawText=function(a){I.font="18pt Arial";I.fillStyle="black";I.fillText(a,20,50)};this.showPDF=function(a){var b=document.createElement("div");b.style.backgroundColor="white";b.style.width=hi5.browser.isTouch?
"30%":"95%";b.style.height=hi5.browser.isTouch?"4elm":"90%";b.innerHTML=hi5.browser.isTouch?'<p style="text-align:center;line-height:4em"><a href="'+a+'" target="_blank">Your document is ready.</a></p>':'<iframe src="'+a+'" width="100%" height="100%"><html><body marginwidth="0" marginheight="0"><embed width="100%" height="100%" name="plugin" src="'+a+'" type="application/pdf"></body></html></iframe>';document.documentElement.appendChild(b);(new hi5.Lightbox(b)).show()};this.hide=function(){g.hideWhenClose&&
(i.height=1,i.width=1);null!=e&&(e.style.visibility="hidden")};this.copyToClip=function(a){if(window.clipboardData)window.clipboardData.setData("Text",a);else{var b=P();"innerText"in b?b.innerText=a:b.innerHTML=a.replace(/\r\n/g,"<br/>");try{b.focus(),document.execCommand("selectAll",!1,null),document.execCommand("copy",!1,null)}catch(c){}finally{b.parentNode.removeChild(b),e&&e.focus()}}};this.fullScreen=function(){i.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)};this.removeEvents=function(){if(window){window.removeEventListener("beforeunload",
t,!1);window.removeEventListener("focus",Q,!1);window.onresize=null;try{U&&U.parentNode&&(U.parentNode.removeChild(U),U=null),e&&e.parentNode&&(e.parentNode.removeChild(e),e=null)}catch(a){}}document&&(document.oncontextmenu=null,document.onselectstart=null,document.documentElement.style.overflow="visible")};this.refreshFiles=function(){C&&C.visible()&&z(".",C)};this.processLink=function(a){g.toolbar.addButton(hi5.appcfg&&hi5.appcfg.img&&hi5.appcfg.img.info?hi5.appcfg.img.info:"info.png",function(b){window.open(a);
b.target.parentNode.removeChild(b.target)}).title=a;g.toolbar.startFade()};this.setUnicode=function(a){e&&(a?(0<svGlobal.log&&console.log("Using unicode"),e.onkeydown=wa,e.onkeyup=wa):(0<svGlobal.log&&console.log("Using non-unicode"),e.onkeydown=ya,e.onkeyup=ya))};this.setTouchRemoting=function(a){!0===a?(X=new G(g,i),console.log("touch remoting"),g.showMessage(__svi18n.info.touchremoting)):X=new r(g)};this.setClipboard=function(a){ea=a};this.run=function(a){window.scrollTo(0,0);K();H();J||(window.addEventListener("beforeunload",
t,!1),oa(),window.addEventListener("focus",Q,!1),window.addEventListener("blur",function(){g.focused=!1},!1),window.addEventListener("resize",Ga,!1));hi5.browser.isTouch?J||(X=new r(g),i.addEventListener("touchstart",F,!1),i.addEventListener("touchend",F,!1),i.addEventListener("touchmove",F,!1),i.addEventListener("touchcancel",F,!1)):(J||(e.addEventListener("mousemove",Ka,!1),e.addEventListener("mousedown",Ja,!1),e.addEventListener("mouseup",La,!1),e.addEventListener("mousewheel",Da,!0),e.addEventListener("DOMMouseScroll",
Da,!0),ea&&(e.addEventListener("paste",Ia,!1),e.addEventListener("copy",Aa,!1),e.addEventListener("cut",Aa,!1))),g.setUnicode(a),fa(e),a=hi5.tool.getPos(i),e.style.left=a.x+"px",e.style.top=a.y+"px",e.focus());this.drawText(__svi18n.wait);if(g.onstart)g.onstart(i)};var Fa={"&euro;":"\ufffd","&nbsp;":" ","&quot;":'"',"&amp;":"&","&lt;":"<","&gt;":">","&iexcl;":"\ufffd","&cent;":"\ufffd","&pound;":"\ufffd","&curren;":"\ufffd","&yen;":"\ufffd","&brvbar;":"\ufffd","&sect;":"\ufffd","&uml;":"\ufffd","&copy;":"\ufffd",
"&ordf;":"\ufffd","&reg;":"\ufffd"};this.movCursorBy=ga;this.moveCursor=V;this.touchstart=function(a){T&&1==a.pointes&&(a.pointes=2);switch(a.pointes){case 1:(!a.flick||f())&&$(a.x-i.offsetLeft,a.y-i.offsetTop,0);break;case 2:d||x();ha("touchstart",a.screenX,a.screenY,!a.flick);break;case 3:W=a.screenX,R=a.screenY}};this.touchmove=function(a){T&&1==a.pointes&&(a.pointes=2);switch(a.pointes){case 1:if(!a.flick||f()){var b=void 0,b=y;k.send("82"+(a.x-i.offsetLeft)/b+"\t"+(a.y-i.offsetTop)/b)}break;
case 2:ha("touchmove",a.screenX,a.screenY,!a.flick);break;case 3:b=void 0,b=y,k.send("83"+(a.x-i.offsetLeft)/b+"\t"+(a.y-i.offsetTop)/b+"\t"+(0<a.screenY-R?0:1)),W=a.screenX,R=a.screenY}};this.touchend=function(a){a.moved||i.focus();T&&1==a.pointes&&(a.pointes=2);switch(a.pointes){case 1:V(a.x,a.y,!0);(!a.flick||f())&&aa(a.x-i.offsetLeft,a.y-i.offsetTop,0);break;case 2:ha("touchend",a.screenX,a.screenY,!a.flick);break;case 3:a.moved||(g.toolbar&&(g.toolbar.style.display="block"),m&&m.focus())}};this.flick=
function(a){switch(a.from){case 4:console.log("flick from botton");k.send("840\t209");k.send("8449152\t209");break;case 2:console.log("flick from top"),k.send("840\t201"),k.send("8449152\t201")}};this.longpress=function(a){T&&(a.pointes=2);switch(a.pointes){case 1:var b=a.x-i.offsetLeft,a=a.y-i.offsetTop;V(b,a);$(b,a,2);aa(b,a,2);break;case 2:d&&($(d.scrX,d.scrY,2,1),aa(d.scrX,d.scrY,2,1))}};this.redirectTouches=function(a){if(s){for(var b=a.length,c,d="90"+b,e=0;e<b;e++)c=a[e],d=d+"\t"+c.contactId+
";"+c.contactFlags+";"+Math.floor(c.x/y)+";"+Math.floor(c.y/y);k.send(d)}};var ka=-1!=navigator.platform.indexOf("Mac"),Z=0,Ca=0,S=!1;this.setCursor=function(a){ca=a;hi5.browser.isOpera||(d&&(d.src=a.data,d.hotX=a.hotX,d.hotY=a.hotY),e?e.style.cursor=Ea(a):i.style.cursor=Ea(a))};this.setVisible=function(a,b){var c=a?"visible":"hidden";"number"==typeof b?setTimeout(function(){i.style.visibility=c},b):i.style.visibility=c}}svGlobal.LocalInterface=LocalInterface;
function initDragDrop(f,G){function r(f){if(1!=f.length)alert("Please one file only");else{var n=f[0],f=n.name,r=f.length;if(4<r&&".rdp"==f.substring(r-4).toLowerCase()){var x=new FileReader,B=!1;x.onload=function(f){var t=f.target.result;if(null!=t){var r=G,f=r.elements,z=t.split("\r\n");2>z.length&&(z=t.split("\n"));if(2>z.length)f=!1;else{var t=document.getElementById("gateway"),A=t.value;r.reset();t.value=A;r=0;for(t=z.length;r<t;r++){var l=z[r],A=l.indexOf(":"),H=l.substring(0,A),l=l.substring(A+
3),H=H.toLowerCase();switch(H){case "full address":A=l.indexOf(":");0<A?(f.server.value=l.substring(0,A),f.port.value=l.substring(A+1)):f.server.value=l;break;case "username":f.user.value=l;break;case "domain":f.domain.value=l;break;case "connect to console":f.useConsole.checked="0"!=l;break;case "desktopwidth":f.width.value=l;break;case "desktopheight":f.height.value=l;break;case "session bpp":f.server_bpp.value=l;break;case "audiomode":f.playSound.value=l;break;case "alternate shell":0<l.length&&
(f.command.value=l,document.getElementById("app").checked||(document.getElementById("shell").checked=!0));break;case "shell working directory":f.directory=l;break;case "redirectclipboard":f.mapClipboard.checked="0"!=l;break;case "redirectprinters":f.mapPrinter.checked="0"!=l;break;case "server port":0<l.length&&(f.port.value=l);break;case "disable wallpaper":f.background.checked="0"==l;break;case "disable themes":f.styles.checked="0"==l;case "disable menu anims":f.animation.checked="0"==l;break;case "disable full window drag":f.contents.checked=
"0"==l;break;case "allow font smoothing":f.smoothfont.checked="0"!=l;break;case "allow desktop composition":f.composition.checked="0"!=l;break;case "bitmapcachepersistenable":f.bitmap.checked="0"!=l;break;case "remoteapplicationprogram":f.exe.value=l;break;case "remoteapplicationcmdline":f.args.value=l;break;case "remoteapplicationmode":document.getElementById("app").checked="1"==l;break;case "loadbalanceinfo":f.loadBalanceInfo.value=l}}f=!0}!f&&!B&&(B=!0,x.readAsText(n))}};x.readAsText(n,"UTF-16LE")}else alert("Sorry, Please .rdp file only")}}
function B(f){r(f.target.files)}function x(n){cancelDefault(n);f.style.backgroundColor=P;r(n.dataTransfer.files)}function n(n){cancelDefault(n);f.style.backgroundColor="yellow"}function K(n){cancelDefault(n);f.style.backgroundColor=P}if("FileReader"in window){var P=f.style.backgroundColor,Q=document.getElementById("rdpfile");Q&&Q.addEventListener("change",B,!1);f.addEventListener("dragover",n,!1);f.addEventListener("dragleave",K,!1);f.addEventListener("drop",x,!1)}}svGlobal.util.initDragDrop=initDragDrop;
svGlobal.util.initMapDisk=function(f,G){function r(n){cancelDefault(n);"0"==f.style.opacity&&(f.style.opacity="0.611");f.style.backgroundColor="yellow"}function B(n){n.stopPropagation();n.preventDefault();"0.611"==f.style.opacity&&(f.style.opacity="0");f.style.backgroundColor=f.__oldColor}function x(n){n.stopPropagation();n.preventDefault();"0.611"==f.style.opacity&&(f.style.opacity="0");f.style.backgroundColor=f.__oldColor;G(n.dataTransfer.files)}"FileReader"in window&&(f.__oldColor=f.style.backgroundColor,
f.addEventListener("dragover",r,!1),f.addEventListener("dragleave",B,!1),f.addEventListener("drop",x,!1))};window.addEventListener("load",function(){for(var f=document.getElementsByClassName("ver"),G=f.length,r=0;r<G;r++)f[r].innerHTML=svGlobal.version},!1);
