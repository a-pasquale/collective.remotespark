
 function connvertServer(m) {
    var n = {};
    n.id = m.id;
    n.server = m.id;
    n.displayName = m.displayName || m.id;
    if (m = m.rdp) {
        for (var w in m) n[w] = m[w];
        n.user = m.username || "";
        n.pwd = m.password || "";
        n.useConsole = m.console || !1;
        n.legacyMode = m.leagacyMode || m.legacyMode || !1;
        n.server_bpp = m.color || 16;
        n.exe = m.remoteProgram || "";
        n.args = m.remoteArgs || "";
        n.startProgram = 0 < n.exe.length ? "app" : n.command && 0 < n.command.length ? "shell" : "noapp"
    }
    return n
}

function getServers(m, n) {
    var w = Connection.getValue(Connection.KEY_TIMESTAMP),
        w = !w ? "" : "?since=" + w;
    hi5.appcfg && "boolean" === typeof hi5.appcfg.useWSS && (m = (hi5.appcfg.useWSS ? "wss" : "ws") + m.substring(m.indexOf("://")));
    var E = new hi5.WebSocket(m + w),
        q = !1,
        L = !1;
    E.onmessage = function (m) {
        q = !0;
        svGlobal.logger.debug(m.data);
        m = JSON.parse(m.data);
        m.lastModified && Connection.setValue(Connection.KEY_TIMESTAMP, m.lastModified + "");
        if (m = m.connections) for (var n = 0, w = m.length; n < w; n++) {
            var K = m[n];
            Connection.getValue(K.id) || (Connection.save(K.id,
            connvertServer(K)), L = !0)
        }
        E.close()
    };
    E.onclose = function () {
        n(L, q)
    }
}
var svManager = {
    getInstance: function () {
        return window.rdpConnection && rdpConnection.running() ? rdpConnection : null
    }
};
svGlobal.getInstance = svManager.getInstance;
window.addEventListener("beforeunload", function (m) {
    var n = svManager.getInstance();
    if (n && n.isRemoteApp()) {
        var n = n.getRunninApps(),
            w = n.length;
        if (0 < w) {
            for (var E = __svi18n.remoteApp.warn + "\n\n", q = 0; q < w; q++) E += n[q] + "\n";
            E += "\n" + __svi18n.remoteApp.close + "\n";
            hi5.browser.isFirefox && hi5.notifications.notify({
                msg: E
            });
            m && (m.returnValue = E);
            return E
        }
    }
}, !1);

function Rdp2(m) {
    if (!m) {
        var n = window.opener;
        try {
            n && (n.__sparkUser && n.__sparkUser.server) && (m = n.__sparkUser.server), !m && n.sparkServer && (m = n.sparkServer)
        } catch (w) {}
        m || (m = hi5.browser.cookie2Obj());
        if (!m) return alert(__svi18n.noauth), null
    }
    var n = "",
        E = m.gateway || "",
        q = window.innerWidth,
        L = window.innerHeight,
        H = 16,
        t = null;
    m.width && (q = parseInt(m.width, 10));
    m.height && (L = parseInt(m.height, 10));
    m.color && (H = parseInt(m.color, 10));
    m.server_bpp && (H = parseInt(m.server_bpp, 10));
    for (var ea in m) {
        svGlobal.logger.debug("** p:" + ea + " v=" + m[ea]);
        var K = m[ea];
        if ("useSSL" === ea) t = "true" === K || !0 === K;
        else {
            if ("boolean" === typeof K) if (K) K = "on";
            else continue;
            "" !== n && (n += "&");
            n += ea + "=" + encodeURIComponent(K)
        }
    }
    t || (t = "https:" === location.protocol);
    n = (t ? "wss://" : "ws://") + E + "/RDP?" + n;
    return new Rdp(n, q, L, H)
}
svGlobal.Rdp2 = Rdp2;

function Rdp(m, n, w, E) {
    var q, L, H, t;

    function ea() {
        function a(a) {
            a &= 65535;
            return 32767 < a ? a - 65536 : a
        }
        function b(a) {
            for (var b, e = 0, d = 0; 320 > d; d++) b = a[d], q[e++] = b & 255, q[e++] = b >> 8 & 255;
            return q
        }
        function c(a, b) {
            var e = Array(8),
                d = Array(4),
                c = Array(4),
                j = Array(4),
                h = Array(4),
                g = Array(52),
                l = b,
                f = 0,
                f = a[l++] & 255;
            e[0] = f & 63;
            f = (65535 & f) >>> 6 | a[l++] << 2 & 1023;
            e[1] = f & 63;
            f = (65535 & f) >>> 6;
            f |= a[l++] << 4 & 4095;
            e[2] = f & 31;
            f = (65535 & f) >>> 5;
            e[3] = f & 31;
            f = (65535 & f) >>> 5;
            f |= a[l++] << 2 & 1023;
            e[4] = f & 15;
            f = (65535 & f) >>> 4;
            e[5] = f & 15;
            f = (65535 & f) >>> 4;
            f |= a[l++] << 2 & 1023;
            e[6] = f & 7;
            f = (65535 & f) >>> 3;
            e[7] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 4 & 4095;
            d[0] = f & 127;
            f = (65535 & f) >>> 7;
            j[0] = f & 3;
            f = (65535 & f) >>> 2;
            c[0] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 1 & 511;
            h[0] = f & 63;
            f = (65535 & f) >>> 6;
            g[0] = f & 7;
            f = a[l++] & 255;
            g[1] = f & 7;
            f = (65535 & f) >>> 3;
            g[2] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[3] = f & 7;
            f = (65535 & f) >>> 3;
            g[4] = f & 7;
            f = (65535 & f) >>> 3;
            g[5] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[6] = f & 7;
            f = (65535 & f) >>> 3;
            g[7] = f & 7;
            f = (65535 & f) >>> 3;
            g[8] = f & 7;
            f = a[l++] & 255;
            g[9] = f & 7;
            f = (65535 & f) >>> 3;
            g[10] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[11] = f & 7;
            f = (65535 & f) >>> 3;
            g[12] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 4 & 4095;
            d[1] = f & 127;
            f = (65535 & f) >>> 7;
            j[1] = f & 3;
            f = (65535 & f) >>> 2;
            c[1] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 1 & 511;
            h[1] = f & 63;
            f = (65535 & f) >>> 6;
            g[13] = f & 7;
            f = a[l++] & 255;
            g[14] = f & 7;
            f = (65535 & f) >>> 3;
            g[15] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[16] = f & 7;
            f = (65535 & f) >>> 3;
            g[17] = f & 7;
            f = (65535 & f) >>> 3;
            g[18] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[19] = f & 7;
            f = (65535 & f) >>> 3;
            g[20] = f & 7;
            f = (65535 & f) >>> 3;
            g[21] = f & 7;
            f = a[l++] & 255;
            g[22] = f & 7;
            f = (65535 & f) >>> 3;
            g[23] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[24] = f & 7;
            f = (65535 & f) >>> 3;
            g[25] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 4 & 4095;
            d[2] = f & 127;
            f = (65535 & f) >>> 7;
            j[2] = f & 3;
            f = (65535 & f) >>> 2;
            c[2] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 1 & 511;
            h[2] = f & 63;
            f = (65535 & f) >>> 6;
            g[26] = f & 7;
            f = a[l++] & 255;
            g[27] = f & 7;
            f = (65535 & f) >>> 3;
            g[28] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[29] = f & 7;
            f = (65535 & f) >>> 3;
            g[30] = f & 7;
            f = (65535 & f) >>> 3;
            g[31] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[32] = f & 7;
            f = (65535 & f) >>> 3;
            g[33] = f & 7;
            f = (65535 & f) >>> 3;
            g[34] = f & 7;
            f = a[l++] & 255;
            g[35] = f & 7;
            f = (65535 & f) >>> 3;
            g[36] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[37] = f & 7;
            f = (65535 & f) >>> 3;
            g[38] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 4 & 4095;
            d[3] = f & 127;
            f = (65535 & f) >>> 7;
            j[3] = f & 3;
            f = (65535 & f) >>> 2;
            c[3] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 1 & 511;
            h[3] = f & 63;
            f = (65535 & f) >>> 6;
            g[39] = f & 7;
            f = a[l++] & 255;
            g[40] = f & 7;
            f = (65535 & f) >>> 3;
            g[41] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[42] = f & 7;
            f = (65535 & f) >>> 3;
            g[43] = f & 7;
            f = (65535 & f) >>> 3;
            g[44] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[45] = f & 7;
            f = (65535 & f) >>> 3;
            g[46] = f & 7;
            f = (65535 & f) >>> 3;
            g[47] = f & 7;
            f = a[l++] & 255;
            g[48] = f & 7;
            f = (65535 & f) >>> 3;
            g[49] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[50] = f & 7;
            f = (65535 & f) >>> 3;
            g[51] = f & 7;
            f = (65535 & f) >>> 3;
            k(e, d, c, j, h, g, u, 0);
            f &= 15;
            f |= a[l++] << 4 & 4095;
            e[0] = f & 63;
            f = (65535 & f) >>> 6;
            e[1] = f & 63;
            f = a[l++] & 255;
            e[2] = f & 31;
            f = (65535 & f) >>> 5;
            f |= a[l++] << 3 & 2047;
            e[3] = f & 31;
            f = (65535 & f) >>> 5;
            e[4] = f & 15;
            f = (65535 & f) >>> 4;
            f |= a[l++] << 2 & 1023;
            e[5] = f & 15;
            f = (65535 & f) >>> 4;
            e[6] = f & 7;
            f = (65535 & f) >>> 3;
            e[7] = f & 7;
            f = a[l++] & 255;
            d[0] = f & 127;
            f = (65535 & f) >>> 7;
            f |= a[l++] << 1 & 511;
            j[0] = f & 3;
            f = (65535 & f) >>> 2;
            c[0] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 5 & 8191;
            h[0] = f & 63;
            f = (65535 & f) >>> 6;
            g[0] = f & 7;
            f = (65535 & f) >>> 3;
            g[1] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[2] = f & 7;
            f = (65535 & f) >>> 3;
            g[3] = f & 7;
            f = (65535 & f) >>> 3;
            g[4] = f & 7;
            f = a[l++] & 255;
            g[5] = f & 7;
            f = (65535 & f) >>> 3;
            g[6] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[7] = f & 7;
            f = (65535 & f) >>> 3;
            g[8] = f & 7;
            f = (65535 & f) >>> 3;
            g[9] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[10] = f & 7;
            f = (65535 & f) >>> 3;
            g[11] = f & 7;
            f = (65535 & f) >>> 3;
            g[12] = f & 7;
            f = a[l++] & 255;
            d[1] = f & 127;
            f = (65535 & f) >>> 7;
            f |= a[l++] << 1 & 511;
            j[1] = f & 3;
            f = (65535 & f) >>> 2;
            c[1] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 5 & 8191;
            h[1] = f & 63;
            f = (65535 & f) >>> 6;
            g[13] = f & 7;
            f = (65535 & f) >>> 3;
            g[14] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[15] = f & 7;
            f = (65535 & f) >>> 3;
            g[16] = f & 7;
            f = (65535 & f) >>> 3;
            g[17] = f & 7;
            f = a[l++] & 255;
            g[18] = f & 7;
            f = (65535 & f) >>> 3;
            g[19] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[20] = f & 7;
            f = (65535 & f) >>> 3;
            g[21] = f & 7;
            f = (65535 & f) >>> 3;
            g[22] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[23] = f & 7;
            f = (65535 & f) >>> 3;
            g[24] = f & 7;
            f = (65535 & f) >>> 3;
            g[25] = f & 7;
            f = a[l++] & 255;
            d[2] = f & 127;
            f = (65535 & f) >>> 7;
            f |= a[l++] << 1 & 511;
            j[2] = f & 3;
            f = (65535 & f) >>> 2;
            c[2] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 5 & 8191;
            h[2] = f & 63;
            f = (65535 & f) >>> 6;
            g[26] = f & 7;
            f = (65535 & f) >>> 3;
            g[27] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[28] = f & 7;
            f = (65535 & f) >>> 3;
            g[29] = f & 7;
            f = (65535 & f) >>> 3;
            g[30] = f & 7;
            f = a[l++] & 255;
            g[31] = f & 7;
            f = (65535 & f) >>> 3;
            g[32] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[33] = f & 7;
            f = (65535 & f) >>> 3;
            g[34] = f & 7;
            f = (65535 & f) >>> 3;
            g[35] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[36] = f & 7;
            f = (65535 & f) >>> 3;
            g[37] = f & 7;
            f = (65535 & f) >>> 3;
            g[38] = f & 7;
            f = a[l++] & 255;
            d[3] = f & 127;
            f = (65535 & f) >>> 7;
            f |= a[l++] << 1 & 511;
            j[3] = f & 3;
            f = (65535 & f) >>> 2;
            c[3] = f & 3;
            f = (65535 & f) >>> 2;
            f |= a[l++] << 5 & 8191;
            h[3] = f & 63;
            f = (65535 & f) >>> 6;
            g[39] = f & 7;
            f = (65535 & f) >>> 3;
            g[40] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[41] = f & 7;
            f = (65535 & f) >>> 3;
            g[42] = f & 7;
            f = (65535 & f) >>> 3;
            g[43] = f & 7;
            f = a[l++] & 255;
            g[44] = f & 7;
            f = (65535 & f) >>> 3;
            g[45] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 2 & 1023;
            g[46] = f & 7;
            f = (65535 & f) >>> 3;
            g[47] = f & 7;
            f = (65535 & f) >>> 3;
            g[48] = f & 7;
            f = (65535 & f) >>> 3;
            f |= a[l++] << 1 & 511;
            g[49] = f & 7;
            f = (65535 & f) >>> 3;
            g[50] = f & 7;
            f = (65535 & f) >>> 3;
            g[51] = f & 7;
            k(e, d, c, j, h, g, u, 160);
            return u
        }

        function k(a, b, c, k, u, n, Ba, q) {
            var z = 0,
                f = Array(160);
            qa(f, 0, 160, 0);
            var w = Array(40);
            qa(w, 0, 40, 0);
            for (var C = 0; 3 >= C; C++, z += 13) {
                var G = u[C],
                    t = c[C],
                    oe = z,
                    A = n,
                    F = w,
                    B = Array(13);
                qa(B, 0, 13, 0);
                var x = void 0,
                    E = x = 0;
                15 < G && (x = (G >> 3) - 1);
                E = G - (x << 3);
                if (0 === E) x = -4, E = 7;
                else {
                    for (; 7 >= E;) E = E << 1 | 1, x--;
                    E -= 8
                }
                if (-4 > x || 6 < x) throw "Invalid quantization, exp:" + x;
                if (0 > E || 7 < E) throw "Invalid quantization, mant = " + E;
                G = Array(2);
                G[0] = x;
                G[1] = E;
                for (var x = G, G = B, I = void 0, K = E = void 0, H = void 0, E = j[x[1]], K = g(6, x[0]), x = g(K, 1), H = 16 <= x ? 0 : -16 >= x ? -0 : 0 > x ? 16 <= -x ? 0 : -16 >= -x ? 0 : 0 > -x ? 1 << --x : 1 >> -x : 1 << x, L = x = 0; 13 > L; L++) {
                    I = (A[oe++] << 1) - 7;
                    if (!(7 >= I && -7 <= I)) throw "Invalid inverse quantization, temp = " + I;
                    I <<= 12;
                    I = p(E, I);
                    I = e(I, H);
                    G[x++] = 16 <= K ? 0 > I ? -1 : 0 : -16 >= K ? 0 : 0 > K ? I << -K : I >> K
                }
                A = 13;
                x = G = 0;
                if (!(0 <= t && 3 >= t)) throw "Invalid positioning: Mc = " + t;
                switch (t) {
                    case 3:
                        F[x++] = 0;
                    case 2:
                        F[x++] = 0;
                    case 1:
                        F[x++] = 0;
                    case 0:
                        F[x++] = B[G++], A--
                }
                do F[x++] = 0, F[x++] = 0, F[x++] = B[G++];
                while (0 < --A);
                for (; 4 > ++t;) F[x++] = 0;
                G = b[C];
                x = k[C];
                F = w;
                A = t = B = void 0;
                v = A = 40 > G || 120 < G ? v : G;
                if (!(40 <= A && 120 >= A)) throw "Invlaid filtering Nr = " + A;
                B = M[x];
                if (-32768 === B) throw "Invlaid filtering brp = " + B;
                for (G = 0; 39 >= G; G++) t = p(B, ra[G - A + 120]), ra[G + 120] = e(F[G], t);
                fa(ra, 40, ra, 0, 120);
                fa(ra, 120, f, 40 * C, 39)
            }
            b = Array(8);
            c = m[r];
            k = m[r ^= 1];
            u = 0;
            h(a, c, u++, 0, 0, -32, 13107);
            h(a, c, u++, 0, 0, -32, 13107);
            h(a, c, u++, 0, 2048, -16, 13107);
            h(a, c, u++, 0, -2560, -16, 13107);
            h(a, c, u++, 0, 94, -8, 19223);
            h(a, c, u++, 0, -1792, -8, 17476);
            h(a, c, u++, 0, -341, -4, 31454);
            h(a, c, u++, 0, -1144, -4, 29708);
            for (a = 0; 8 > a; a++) b[a] = e(k[a] >> 2, c[a] >> 2), b[a] = e(b[a], k[a] >> 1);
            d(b);
            l(b, 13, f, Ba, 0, q);
            for (a = 0; 8 > a; a++) b[a] = e(k[a] >> 1, c[a] >> 1);
            d(b);
            l(b, 14, f, Ba, 13, q);
            for (a = 0; 8 > a; a++) b[a] = e(k[a] >> 2, c[a] >> 2), b[a] = e(b[a], c[a] >> 1);
            d(b);
            l(b, 13, f, Ba, 27, q);
            for (a = 0; 8 > a; a++) b[a] = c[a];
            d(b);
            l(b, 120, f, Ba, 40, q);
            a = q;
            for (b = q + 160; b-- > q; a++) f = p(y, 28180), y = e(Ba[a], f), Ba[a] = e(y, y) & 65528
        }
        function h(a, b, c, d, j, h, l) {
            d = e(a[c], h) << 10;
            d = g(d, j << 1);
            d = p(l, d);
            b[c] = e(d, d)
        }
        function d(a) {
            for (var b = 0, d = 0; 8 > d; d++) 0 > a[d] ? (b = -32768 === a[d] ? 32767 : -a[d], a[d] = -(11059 > b ? b << 1 : 20070 > b ? b + 11059 : e(b >> 2, 26112))) : (b = a[d], a[d] = 11059 > b ? b << 1 : 20070 > b ? b + 11059 : e(b >> 2, 26112))
        }

        function l(b, d, c, j, h, l) {
            for (var k = 0, p = 0, M = 0, f = a; 0 !== d;) {
                d--;
                for (var k = c[h], ra = 7; 0 <= ra; ra--) p = b[ra], M = n[ra], M = f(-32768 === p && -32768 === M ? 32767 : 65535 & p * M + 16384 >> 15), k = g(k, M), p = f(-32768 === p && -32768 === k ? 32767 : 65535 & p * k + 16384 >> 15), n[ra + 1] = e(n[ra], p);
                j[l + h++] = n[0] = k
            }
        }
        function p(b, d) {
            if (-32768 === b && -32768 === d) return 32767;
            var e;
            e = b * d + 16384 >> 15;
            return a(e)
        }
        function e(a, b) {
            var d = a + b;
            return -32768 > d ? -32768 : 32767 < d ? 32767 : d
        }
        function g(a, b) {
            var d = a - b;
            return -32768 > d ? -32768 : 32767 < d ? 32767 : d
        }
        var j = [18431, 20479, 22527,
        24575, 26623, 28671, 30719, 32767],
            M = [3277, 11469, 21299, 32767],
            ra = Array(280);
        ra[0] = 0;
        var m = [Array(8), Array(8)],
            r = 0,
            v = 40,
            n = Array(9),
            y = 0,
            q = Array(640);
        q[0] = 0;
        var u = Array(320);
        u[0] = 0;
        this.decode = function (a, d, e) {
            for (var g = []; d < e;) {
                var j = c(a, d),
                    g = g.concat(b(j));
                d += 65
            }
            return g
        };
        this.decodeBytes = c
    }
    function K(a, b) {
        var c = Array(b),
            k = Array(a);
        k[0] = 0;
        c[0] = k;
        for (var h = 0; h < b; h++) k = Array(a), k[0] = 0, c[h] = k;
        var d = null;
        this.width = a;
        this.height = b;
        this.getBuffer = function () {
            return c
        };
        this.setRGB = function (a, b, d) {
            c[b][a] = d
        };
        this.getRGB = function (a, b) {
            return c[b][a]
        };
        this.setRGBs = function (a, b, d, g, j, h, k) {
            if (j) {
                var m = 0,
                    r = 0;
                d = a + d;
                g = b + g;
                for (var v = b; v < g; v++, h += k) {
                    r = h;
                    b = c[v];
                    for (m = a; m < d; m++) b[m] = j[r++]
                }
            } else console.log("xxx null")
        };
        this.copyArea = function (a, b, d, g, j, h) {
            j = a + j;
            h = b + h;
            var k, m, r, v;
            for (m = 0; m < g; m++) {
                r = c[h + m];
                v = c[b + m];
                for (k = 0; k < d; k++) r[j + k] = v[a + k]
            }
        };
        this.moveArea = function (a, b, d, g, j, h) {
            if (0 < h) {
                j = a + j;
                h = b + h;
                var k, m, r;
                for (k = g - 1; 0 <= k; k--) {
                    m = c[h + k];
                    r = c[b + k];
                    for (g = 0; g < d; g++) m[j + g] = r[a + g]
                }
            } else if (0 > h) this.copyArea(a, b, d, g, j, h);
            else if (0 < j) {
                j = a + j;
                h = b + h;
                for (d -= 1; 0 <= d; d--) {
                    m = j + d;
                    r = a + d;
                    for (k = 0; k < g; k++) c[h + k][m] = c[b + k][r]
                }
            } else {
                j = a + j;
                h = b + h;
                var v;
                for (k = 0; k < d; k++) {
                    r = j + k;
                    v = a + k;
                    for (m = 0; m < g; m++) c[h + m][r] = c[b + m][v]
                }
            }
        };
        this.getRGBs = function (a, b, d, g) {
            var h = Array(d * g);
            h[0] = 0;
            d = a + d;
            g = b + g;
            for (var k = 0, m = b; m < g; m++) for (b = a; b < d; b++) h[k++] = c[m][b];
            return h
        };
        this.repaint = function (d, h, e, g) {
            d + e > a && (e = a - d);
            h + g > b && (g = b - h);
            var k = e,
                M = g;
            g = ab.createImageData(k, M);
            e = g.data;
            for (var k = d + k, M = h + M, m, J, r = 0, v, n = h; n < M; n++) for (v = d; v < k; v++) m = c[n][v], J = r << 2, e[J] = m >> 16 & 255,
            e[J + 1] = m >> 8 & 255, e[J + 2] = m & 255, e[J + 3] = 255, r++;
            ab.putImageData(g, d, h)
        };
        this.postPaint = function (a, b, c, g) {
            d ? d.union(a, b, c, g) : d = new Ka(a, b, c, g)
        };
        this.commitPaint = function () {
            d && (this.repaint(d.x, d.y, d.width, d.height), d = null)
        };
        this.fillRect = function (a, b, d, g, h) {
            d = a + d;
            g = b + g;
            for (var k = b; k < g; k++) for (b = a; b < d; b++) c[k][b] = h
        }
    }
    function qb() {
        var a = "SI_" + z.server;
        W.domain && (a += W.domain);
        W.user && (a += W.user);
        return a
    }
    function Ac() {
        if (!Z && "sessionStorage" in window && !W.pwd) {
            var a = sessionStorage[qb()];
            if (a) try {
                var b = JSON.parse(a);
                if (!("random" in b)) return "";
                for (var c = b.random, a = 0; 16 > a; a++) c[a] &= 255;
                svGlobal.logger.info("load session, id=" + b.logId + " server=" + z.server);
                return "&logId=" + b.logId + "&random=" + encodeURIComponent(sa.enc(c))
            } catch (k) {}
        }
        return ""
    }
    function Hb(a) {
        return 4278190080 | (a >> 8 & 248 | a >> 13 & 7) << 16 | (a >> 3 & 252 | a >> 9 & 3) << 8 | a << 3 & 248 | a >> 2 & 7
    }
    function dd(a) {
        return 4278190080 | (a >> 7 & 248 | a >> 12 & 7) << 16 | (a >> 2 & 248 | a >> 8 & 7) << 8 | a << 3 & 248 | a >> 2 & 7
    }
    function ed(a) {
        return 4278190080 | ha[0][a] << 16 | ha[1][a] << 8 | ha[2][a]
    }
    function fd(a) {
        return 4278190080 | (a & 255) << 16 | a & 65280 | (a & 16711680) >> 16
    }
    function gd(a) {
        return 4278190080 | (a & 255) << 16 | a & 65280 | (a & 16711680) >> 16
    }
    function bb(a, b, c, k, h, d) {
        for (var l = 0, p = 0, e = 0, g = e = 0, j = 0, M = 0, m = M = 0, J = 0, r = b, v = d; p < k;) {
            d = v + 4 * c * k - 4 * (p + 1) * c;
            j = 0;
            J = d;
            l = 0;
            if (0 === m) for (; l < c;) {
                e = a[b++];
                g = e & 15;
                e = e >> 4 & 15;
                M = g << 4 | e;
                47 >= M && 16 <= M && (g = M, e = 0);
                for (; 0 < e;) j = a[b++], h[d] = j, d += 4, l++, e--;
                for (; 0 < g;) h[d] = j, d += 4, l++, g--
            } else for (; l < c;) {
                e = a[b++];
                g = e & 15;
                e = e >> 4 & 15;
                M = g << 4 | e;
                47 >= M && 16 <= M && (g = M, e = 0);
                for (; 0 < e;) M = a[b++], 0 !== (M & 1) ? (M >>= 1, M += 1, j = -M) : j = M >>= 1, M = h[m + 4 * l] + j, h[d] = M, d += 4, l++, e--;
                for (; 0 < g;) M = h[m + 4 * l] + j, h[d] = M, d += 4, l++, g--
            }
            p++;
            m = J
        }
        return b - r
    }
    function hd(a, b, c) {
        b || (b = a.length);
        c || (c = 0);
        b = Math.floor(b / 4);
        for (var k = Array(b), h = k[0] = 0, d = 0; d < b; d++) h = (d << 2) + c, k[d] = (a[h + 3] & 255) << 24 | (a[h + 2] & 255) << 16 | (a[h + 1] & 255) << 8 | (a[h + 0] & 255) << 0;
        return k
    }
    function rb(a, b, c, k, h, d) {
        var l, p;
        for (p = 0; p < k; p++) for (l = 0; l < c; l++) h[d + 4 * ((k - p - 1) * c + l)] = a[b + (p * c + l)]
    }
    function id(a, b, c, k, h) {
        c = k[h];
        var d = 0;
        h += 1;
        var l = a * b,
            p = Array(4 * l);
        p[0] = 0;
        var e = c & 16;
        0 == (c & 32) && (d = bb(k, h, a, b, p, 3), h += d);
        0 != e ? (d = bb(k, h, a, b, p, 2), h += d, d = bb(k, h, a, b, p, 1), bb(k, h + d, a, b, p, 0)) : (rb(k, h, a, b, p, 2), h += l, rb(k, h, a, b, p, 1), h += l, rb(k, h, a, b, p, 0));
        return hd(p)
    }
    function jd(a, b, c, k, h) {
        var d = -1,
            l = -1;
        c = h + c;
        var p = 0,
            e = 0,
            g = 0,
            j = a,
            M = -1,
            m = 0,
            J = e = 0,
            r = 0,
            v = g = 0,
            n = 4294967295,
            y = !1,
            q = !1,
            u = !1,
            s = Array(a * b);
        for (s[0] = 0; h < c;) {
            m = 0;
            e = k[h++];
            p = e >> 4;
            switch (p) {
                case 12:
                case 13:
                case 14:
                    p -= 6;
                    e &= 15;
                    g = 16;
                    break;
                case 15:
                    p = e & 15;
                    9 > p ? (e = k[h++], e |= k[h++] << 8) : e = 11 > p ? 8 : 1;
                    g = 0;
                    break;
                default:
                    p >>= 1, e &= 31, g = 32
            }
            0 !== g && (u = 2 === p || 7 === p, 0 === e ? e = u ? k[h++] + 1 : k[h++] + g : u && (e <<= 3));
            switch (p) {
                case 0:
                    M === p && !(j === a && -1 === d) && (y = !0);
                    break;
                case 8:
                    J = k[h++] | k[h++] << 8 | k[h++] << 16;
                case 3:
                    r = k[h++] | k[h++] << 8 | k[h++] << 16;
                    break;
                case 6:
                case 7:
                    n = k[h++] | k[h++] << 8 | k[h++] << 16;
                    p -= 5;
                    break;
                case 9:
                    v = 3;
                    p = 2;
                    m = 3;
                    break;
                case 10:
                    v = 5, p = 2, m = 5
            }
            M = p;
            for (g = 0; 0 < e;) {
                if (j >= a) {
                    if (0 >= b) throw "Decompressing bitmap failed! Height = " + b;
                    j = 0;
                    b--;
                    d = l;
                    l = 0 + b * a
                }
                switch (p) {
                    case 0:
                        y && (s[l + j] = -1 === d ? n : s[d + j] ^ n, y = !1, e--, j++);
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 0, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = s[d + j], e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = s[d + j], e--, j++
                        }
                        break;
                    case 1:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = n, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = n, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = s[d + j] ^ n, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = s[d + j] ^ n, e--, j++
                        }
                        break;
                    case 2:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? n : 0, e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255,
                            0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? n : 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? s[d + j] ^ n : s[d + j], e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? s[d + j] ^ n : s[d + j], e--, j++
                        }
                        break;
                    case 3:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = r, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = r, e--, j++;
                        break;
                    case 4:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = k[h++] | k[h++] << 8 | k[h++] << 16, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = k[h++] | k[h++] << 8 | k[h++] << 16, e--, j++;
                        break;
                    case 8:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) q ? (s[l + j] = r, q = !1) : (s[l + j] = J, q = !0, e++), e--, j++;
                        for (; 0 < e && j < a;) q ? (s[l + j] = r, q = !1) : (s[l + j] = J, q = !0, e++), e--, j++;
                        break;
                    case 13:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 16777215, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = 16777215, e--, j++;
                        break;
                    case 14:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 0, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = 0, e--, j++;
                        break;
                    default:
                        throw "Unimplemented decompress opcode " + p;
                }
            }
        }
        return s
    }
    function Bc(a,
    b, c, k, h) {
        var d = -1,
            l = -1;
        c = h + c;
        var p = 0,
            e = 0,
            g = 0,
            j = a,
            M = -1,
            m = 0,
            n = e = 0,
            r = 0,
            v = g = 0,
            q = 4294967295,
            y = 0,
            t = !1,
            u = !1,
            y = !1,
            s = Array(a * b);
        for (s[0] = 0; h < c;) {
            m = 0;
            e = k[h++];
            p = e >> 4;
            switch (p) {
                case 12:
                case 13:
                case 14:
                    p -= 6;
                    e &= 15;
                    g = 16;
                    break;
                case 15:
                    p = e & 15;
                    9 > p ? (e = k[h++], e |= k[h++] << 8) : e = 11 > p ? 8 : 1;
                    g = 0;
                    break;
                default:
                    p >>= 1, e &= 31, g = 32
            }
            0 !== g && (y = 2 === p || 7 === p, 0 === e ? e = y ? k[h++] + 1 : k[h++] + g : y && (e <<= 3));
            switch (p) {
                case 0:
                    M === p && !(j === a && -1 === d) && (t = !0);
                    break;
                case 8:
                    y = k[h++] | k[h++] << 8, n = (y >> 8 & 248 | y >> 13 & 7) << 16 | (y >> 3 & 252 | y >> 9 & 3) << 8 | y << 3 & 248 | y >> 2 & 7;
                case 3:
                    y = k[h++] | k[h++] << 8;
                    r = (y >> 8 & 248 | y >> 13 & 7) << 16 | (y >> 3 & 252 | y >> 9 & 3) << 8 | y << 3 & 248 | y >> 2 & 7;
                    break;
                case 6:
                case 7:
                    y = k[h++] | k[h++] << 8;
                    q = (y >> 8 & 248 | y >> 13 & 7) << 16 | (y >> 3 & 252 | y >> 9 & 3) << 8 | y << 3 & 248 | y >> 2 & 7;
                    p -= 5;
                    break;
                case 9:
                    v = 3;
                    p = 2;
                    m = 3;
                    break;
                case 10:
                    v = 5, p = 2, m = 5
            }
            M = p;
            for (g = 0; 0 < e;) {
                if (j >= a) {
                    if (0 >= b) throw "Decompressing bitmap failed! Height = " + b;
                    j = 0;
                    b--;
                    d = l;
                    l = 0 + b * a
                }
                switch (p) {
                    case 0:
                        t && (s[l + j] = -1 === d ? q : s[d + j] ^ q, t = !1, e--, j++);
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (var D = 0; 8 > D; D++) s[l + j] = 0, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = s[d + j], e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = s[d + j], e--, j++
                        }
                        break;
                    case 1:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = q, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = q, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = s[d + j] ^ q, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = s[d + j] ^ q, e--, j++
                        }
                        break;
                    case 2:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? q : 0, e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? q : 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? s[d + j] ^ q : s[d + j], e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255, 0 === g && (v = 0 !== m ? m & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? s[d + j] ^ q : s[d + j], e--, j++
                        }
                        break;
                    case 3:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = r, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = r, e--, j++;
                        break;
                    case 4:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) y = k[h++] | k[h++] << 8, s[l + j] = (y >> 8 & 248 | y >> 13 & 7) << 16 | (y >> 3 & 252 | y >> 9 & 3) << 8 | y << 3 & 248 | y >> 2 & 7, e--, j++;
                        for (; 0 < e && j < a;) y = k[h++] | k[h++] << 8, s[l + j] = (y >> 8 & 248 | y >> 13 & 7) << 16 | (y >> 3 & 252 | y >> 9 & 3) << 8 | y << 3 & 248 | y >> 2 & 7, e--, j++;
                        break;
                    case 8:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) u ? (s[l + j] = r, u = !1) : (s[l + j] = n, u = !0, e++), e--, j++;
                        for (; 0 < e && j < a;) u ? (s[l + j] = r, u = !1) : (s[l + j] = n, u = !0, e++), e--, j++;
                        break;
                    case 13:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = 16777215, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = 16777215, e--, j++;
                        break;
                    case 14:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (D = 0; 8 > D; D++) s[l + j] = 0, e--,
                        j++;
                        for (; 0 < e && j < a;) s[l + j] = 0, e--, j++;
                        break;
                    default:
                        throw "Invalid decompress opcode " + p;
                }
            }
        }
        return s
    }
    function cb(a) {
        E = a;
        kd = (a + 7) / 8 >> 0;
        switch (a) {
            case 16:
                ta = Hb;
                Ib = Bc;
                break;
            case 15:
                ta = dd;
                break;
            case 8:
                ta = ed;
                break;
            case 32:
                ta = fd;
                Ib = id;
                break;
            case 24:
                ta = gd, Ib = jd
        }
    }
    function sb(a, b) {
        n = a;
        w = b;
        X = Y = 0;
        P = n - 1;
        Q = w - 1
    }
    function Jb(a, b, c, k, h, d) {
        this.data = a;
        this.left = k;
        this.top = h;
        this.width = b;
        this.height = c;
        this.bitsperpixel = d;
        this.bytesperpixel = Math.floor((d + 7) / 8)
    }
    function gc() {
        var a, b = Array(5),
            c = Array(5);
        c[0] = null;
        for (var k = 0; 5 > k; k++) a = Array(600), a[0] = null, b[k] = a;
        this.putBitmap = function (a, d, k) {
            32767 === d ? (c[a] && (c[a].data = null, c[a] = null), c[a] = k) : (a = b[a], a[d] && (a[d].data = null, a[d] = null), a[d] = k)
        };
        this.getBitmap = function (a, d) {
            return 32767 === d ? c[a] : b[a][d]
        }
    }
    function Cc(a) {
        var b = __svi18n.errorCode[a];
        if (b) {
            if (z.onerror) z.onerror({
                name: a,
                message: b
            });
            z.displayMsg && hi5.notifications.notify({
                msg: b
            });
            0 < svGlobal.log && console.error(b)
        }
    }
    function ld() {
        if (!db) return "";
        var a = eb() + "/CLIP?s=" + db + "&t=" + (new Date).getTime(),
            b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        b.send(null);
        return b.responseText
    }
    function md() {
        function a(a) {
            return a.winWidth && a.winHeight && a.showState && 45 < a.winHeight && 45 < a.winWidth
        }
        var b = [],
            c = (new Date).getTime(),
            k = this;
        this.addWin = function (a) {
            b.push(a)
        };
        this.isNew = function () {
            return 3E4 > (new Date).getTime() - c
        };
        this.getAll = function () {
            return b
        };
        this.hasWin = function (a) {
            return 0 <= b.indexOf(a)
        };
        this.close = function () {
            for (var a = 0, d = b.length; a < d; a++) b[a].close()
        };
        this.delWin = function (a) {
            for (var d = 0, c = b.length; d < c; d++) if (b[d].id === a) return b.splice(d, 1), d;
            return -1
        };
        this.isRunning = function () {
            var c, d = b.length;
            if (1 > d) return !1;
            for (var k = 0, d = b.length; k < d; k++) if (c = b[k], a(c)) return !0;
            return !1
        };
        this.getWinById = function (a) {
            var d, c = b.length;
            if (1 > c) return !1;
            for (var k = 0, c = b.length; k < c; k++) if (d = b[k], d.id === a) return d;
            return null
        };
        this.getTopWin = function (c) {
            var d = null,
                l, p = c.length;
            for (l = 0; l < p && (!(d = k.getWinById(c[l])) || !a(d)); l++) d = null;
            if (!d) {
                svGlobal.logger.warn("No win found");
                p = b.length;
                for (l = p - 1; 0 <= l && !(d = b[l], a(d)); l--) d = null
            }
            return d
        };
        this.getMain = function (b) {
            if (b = k.getTopWin(b)) {
                for (var d; 0 < b.ownerWinid;) if ((d = k.getWinById(b.ownerWinid)) && a(d)) b = d;
                else break;
                return b
            }
            return null
        }
    }
    function Kb(a, b) {
        T && (svGlobal.logger.info("reconnecting..."), x.send("8E0" + (a & -4) + "\t" + (b & -4)))
    }
    function Dc(a) {
        var b = {}, c = 0;
        this.read = function (k, h, d) {
            function l(b) {
                b.target.readyState === FileReader.DONE && (b = new Uint8Array(b.target.result), a.send(k, h, d, b), c += d, p.setProgress(c))
            }
            var p = F.getFocused().fileProgress,
                e = b[k];
            if ("undefined" !== typeof e) {
                var g = e.name;
                1 > e.size ? alert(__svi18n.file.zero + g) : (e = e.slice(h, h + d), g = new FileReader, g.onloadend = l, g.readAsArrayBuffer(e))
            }
        };
        this.addFile = function (c) {
            if (!("slice" in c) && (c.slice = c.webkitSlice || c.mozSlice, !("slice" in c))) {
                alert(__svi18n.file.slice);
                return
            }
            var h = F.getFocused().fileProgress;
            "none" === h.style.display && (h.style.display = "block");
            var d = c.name;
            b[d] = c;
            h.maxValue += c.size;
            a.start(d, c.size)
        };
        this.confirmId = function (a, c) {
            b[a] = b[c]
        };
        this.close = function (a) {
            var h = F.getFocused(),
                d = h.fileProgress,
                l = b[a];
            l && (delete b[a], delete b[l.name]);
            for (var p in b) return;
            c = d.maxValue = 0;
            d.style.display = "none";
            h.showMessage(__svi18n.file.uploadDone);
            h.refreshFiles()
        }
    }
    function Lb(a) {
        if (ma && La) for (var b = 0, c = a.length; b < c; b++) ma.addFile(a[b])
    }
    function Ec() {
        this.start = function (a, b) {
            x.send("3A0" + a + "\t" + b)
        };
        this.send = function (a, b, c, k) {
            x.send("3A3" + a + "\t" + b + "\t" + c + "\t" + sa.enc(k))
        }
    }
    function Mb(a, b) {
        return B && B.width > a && B.height > b ? B : new K(a, b)
    }
    function nd(a) {
        svGlobal.logger.warn(a)
    }

    function od() {
        $("#remotectrl").fadeIn();
        $("#login_loading").hide();
        svGlobal.logger.info("opened...");
        T = !0;
        x.send("87" + navigator.userAgent);
        if (z.onopen) z.onopen()
    }
    function Nb(a) {
        a = sa.dec(a, 0);
        ca.attach(a, 0, a.length);
        return ca
    }
    function pd(a) {
        var b, c = a.data;
        if ("string" !== typeof c) switch (ca.attach(new Uint8Array(c), 0, c.byteLength), b = ca.getLittleEndian16(), b) {
            case 48:
                Fc(ca);
                break;
            case 49:
                Gc(ca);
                break;
            case 55:
                c = ca;
                switch (c.getByte()) {
                    case 0:
                        q = c.getLittleEndian16();
                        L = c.getLittleEndian16();
                        H = c.getLittleEndian32();
                        c.skipPosition(6);
                        t = c.getLittleEndian16();
                        svGlobal.logger.info("Audio Format, tag=" + q + " channels=" + L + " bitsPerSample=" + t + " samplePerSec=" + H);
                        hi5.browser.isFirefox && (Ma = new hc(z.audioBuffer));
                        break;
                    case 1:
                        if (a = function () {
                            x.send("8A" + k)
                        }, ga.available) {
                            var k = c.getByte() + "," + c.getLittleEndian16() + "," + c.getLittleEndian64(),
                                h = c.getPosition();
                            b = c.getData();
                            c = c.getEnd() - h;
                            49 === q && (fb || (fb = new ea), b = fb.decode(b, h, c), h = 0, c = b.length);
                            var d = t,
                                l = Math.floor(c / (d >> 3)),
                                c = Math.pow(2, d - 1) - 1,
                                p = -c - 1,
                                d = Math.pow(2, d),
                                e = 0,
                                g = 0;
                            if (hi5.browser.isFirefox) {
                                var j = Array(l);
                                j[0] = 0.1;
                                for (e = 0; e < l; e++) g = b[h++] | b[h++] << 8, g > c ? (g -= d, g /= -p) : g /= c, j[e] = g;
                                b = Ma.add(j);
                                setTimeout(a, b - 1E3 * ga.delay)
                            } else {
                                for (var j = L, l = Math.floor(l / j), M = ga.getBuffer(l), m = M.getChannelData(0), J = M.getChannelData(1), e = 0; e < l;) g = b[h++] | b[h++] << 8, g > c ? (g -= d, g /= -p) : g /= c, 1 === j ? (g *= 0.707, m[e] = g) : (m[e] = g, g = b[h++] | b[h++] << 8, g > c ? (g -= d, g /= -p) : g /= c), J[e] = g, e++;
                                b = ga.playBuffer(M);
                                gb || setTimeout(a, 1E3 * (b - ga.delay))
                            }
                        }
                }
                break;
            case 60:
                ic(ca);
                break;
            case 63:
                na && na.process(ca);
                break;
            default:
                svGlobal.logger.warn("@TODO:" + b + "\n")
        } else switch (b = parseInt(c.substring(0,
        2), 16), a = c.substring(2), b) {
            case 15:
                if (na && na.onopen) na.onopen();
                break;
            case 26:
                b = JSON.parse(a);
                if (b.name) {
                    svGlobal.logger.info("msg=" + a);
                    if (z.onerror) z.onerror(b);
                    a = __svi18n.errorCode["S" + b.name];
                    a += b.message;
                    z.displayMsg && z.showMessage(a)
                } else 0 < svGlobal.log && console.erro("No error code for message:" + a);
                break;
            case 27:
                F.drawLicense(a);
                break;
            case 48:
                Fc(Nb(a));
                break;
            case 49:
                Gc(Nb(a));
                break;
            case 50:
                b = parseInt(a.substring(0, 1), 10);
                a = a.substring(1);
                switch (b) {
                    case 1:
                        svGlobal.logger.info("....... copy to clip:" + a);
                        F.copyToClip(a);
                        z.openLink && (b = 0 === a.indexOf("http://") || 0 === a.indexOf("https://") || 0 === a.indexOf("ftp://") || 0 === a.indexOf("mailto:") || 0 === a.indexOf("tel:") || 0 === a.indexOf("callto:"), !b && 0 === a.indexOf("www.") && (b = !0, a = "http://" + a), b && (b = F.getFocused()) && b.processLink(a));
                        break;
                    case 2:
                        svGlobal.logger.info("....... clipReq, clipString:" + Na), Ca.clipRequired = !0, Ca.prePaste || (x.send("881" + (!Na ? "" : Na)), Ca.clipRequired = !1, Na = "")
                }
                break;
            case 51:
                F.setReadOnly("1" === a);
                break;
            case 54:
                b = a.split("\t");
                a = eb() + b[0];
                svGlobal.logger.info("Downloading file:" + a + " name:" + b[1] + " driver:" + b[2]);
                if (!z.onprintingready || !z.onprintingready({
                    link: a,
                    printerName: b[1],
                    pinterDriver: b[2]
                }))(b = F.getFocused()) && b.showPDF(a);
                break;
            case 55:
                b = parseInt(a.substring(0, 1), 16);
                c = a.substring(1);
                switch (b) {
                    case 0:
                        a = c.split("\t");
                        q = parseInt(a[0], 10);
                        L = parseInt(a[1], 10);
                        t = parseInt(a[2], 10);
                        H = parseInt(a[3], 10);
                        svGlobal.logger.debug("Audio Format, tag=" + q + " channels=" + L + " bitsPerSample=" + t + " samplePerSec=" + H);
                        hi5.browser.isFirefox && (Ma || (Ma = new hc(z.audioBuffer)));
                        break;
                    case 1:
                        if (b = function (a) {
                            var b = 0;
                            a *= Ba;
                            for (y = 0; y < Ba; y++) b |= (v[a + y] & 255) << 8 * y;
                            b > A ? (b -= s, b /= -u) : b /= A;
                            return b
                        }, a = function () {
                            x.send("8A" + r)
                        }, ga.available) {
                            var p = c.indexOf("\t"),
                                r = c.substring(0, p),
                                v = sa.dec(c, p + 1);
                            49 === q && (fb || (fb = new ea), v = fb.decode(v, 0, v.length));
                            var c = t,
                                Ba = c >> 3,
                                d = Math.floor(v.length / Ba),
                                y = 0,
                                A = Math.pow(2, c - 1) - 1,
                                u = -A - 1,
                                s = Math.pow(2, c),
                                c = 0;
                            if (hi5.browser.isFirefox) {
                                p = Array(d);
                                p[0] = 0.1;
                                for (c = 0; c < d; c++) p[c] = b(c);
                                b = Ma.add(p);
                                setTimeout(a, b - 1E3 * ga.delay)
                            } else {
                                p = L;
                                d = Math.floor(d / p);
                                h = ga.getBuffer(d);
                                e = h.getChannelData(0);
                                g = h.getChannelData(1);
                                for (c = 0; c < d;) j = 2 * c, l = b(j), 1 === p ? (l *= 0.707, e[c] = l, g[c] = l) : (e[c] = l, g[c] = b(j + 1)), c++;
                                b = ga.playBuffer(h);
                                setTimeout(a, 1E3 * (b - ga.delay))
                            }
                        }
                }
                break;
            case 56:
                xa = a = JSON.parse(a);
                db = a.session;
                xa.server = z.server;
                if (a = hi5.$("joinSelect")) a.value = xa.joinMode;
                if (a = hi5.$("requestControl")) a.disabled = xa.hasControl;
                break;
            case 58:
                b = a;
                a = parseInt(b.charAt(0), 10);
                b = b.substring(1);
                if (5 === a) Ca.notifyFiles(JSON.parse(b));
                else if (ma) switch (b = b.split("\t"), a) {
                    case 1:
                        ma.confirmId(b[0], b[1]);
                        break;
                    case 2:
                        ma.read(b[0], parseInt(b[1], 10), parseInt(b[2], 10));
                        break;
                    case 4:
                        ma.close(b[0])
                }
                break;
            case 59:
                a = sa.dec(a, 0);
                a = (new RdpBuffer(a, 0, a.length)).getLittleEndian32();
                gb || !(a & 16) ? (Ob = !1, ma = null, F.execute("setFileHandler", [null])) : a & 128 && (ma = null, F.execute("disableUpload", [null]));
                if (a & 64 && (b = __svi18n.info.recording)) z.displayMsg && hi5.notifications.notify({
                    msg: b
                }), svGlobal.logger.info(b);
                a & 256 || F.execute("disableShadow", [null]);
                break;
            case 60:
                ic(Nb(a));
                break;
            case 61:
                a = JSON.parse(a);
                switch (a.type) {
                    case 0:
                        sb(a.width, a.height);
                        B = Mb(n, w);
                        cb(a.color);
                        if (b = a.server) z.server = a.server;
                        jc = a.length;
                        if (c = F.getFocused()) if (c.setSize(n, w, Z ? "hidden" : null), b && z.setTitle && (c.browser.document.title = W.displayName || z.server), b = a.keyboard, "undefined" !== typeof b && 0 === b && c.setUnicode(!0), b = a.mapDisk) Ob = !0, c.setFileHandler(Lb), ma || (ma = new Dc(new Ec));
                        if (z.onopened) z.onopened(a);
                        break;
                    case 1:
                        if (a = a.duration, z.onprogress) z.onprogress(a, jc)
                }
                break;
            case 62:
                b = parseInt(a.substring(0,
                1), 16);
                var D, c = a.substring(1);
                a = !1;
                switch (b) {
                    case 0:
                        D = JSON.parse(c);
                        Na = null;
                        T = !1;
                        ha = null;
                        Sd();
                        ia = new Hc;
                        hb = 0;
                        Ic = null;
                        Pb = Array(256);
                        tb = new gc;
                        for (a = 0; 12 > a; a++) kc[a] = Array(256);
                        ub = Array(20);
                        Da.reset();
                        T = !0;
                        a = D.width;
                        b = D.height;
                        if (a === n && b === w) break;
                        sb(a, b);
                        F.setSize(a, b, Z ? "hidden" : null);
                        B = Mb(a, b);
                        break;
                    case 1:
                        Jc = z.reconnectOnResize;
                        z.reconnectOnResize = !1;
                        D = JSON.parse(c);
                        z.onsessionjoin && (a = z.onsessionjoin(D));
                        if (a) break;
                        z.showMessage(__svi18n.info.joinsession.applyArgs([D.numericId, D.__ip, D.name]));
                        break;
                    case 2:
                        D = JSON.parse(c);
                        0 === D.joined && (z.reconnectOnResize = Jc);
                        z.onsessionexit && (a = z.onsessionexit(D));
                        if (a) break;
                        z.showMessage(__svi18n.info.exitsession.applyArgs([D.numericId, D.__ip, D.name]));
                        break;
                    case 3:
                        F.setReadOnly(!1);
                        if (b = hi5.$("requestControl")) b.disabled = !0;
                        z.ongivecontrol && (a = z.ongivecontrol());
                        if (a) break;
                        z.showMessage(__svi18n.info.givecontrol);
                        break;
                    case 4:
                        F.setReadOnly(!0);
                        if (b = hi5.$("requestControl")) b.disabled = !1;
                        z.ontakebackcontrol && (a = z.ontakebackcontrol());
                        if (a) break;
                        z.showMessage(__svi18n.info.nocontrol);
                        break;
                    case 5:
                        D = JSON.parse(c);
                        z.onrequirecontrol && (a = z.onrequirecontrol(D));
                        if (a) break;
                        a = __svi18n.info.title.applyArgs([D.name, D.numericId, D.__ip]);
                        hi5.notifications.notify({
                            title: a,
                            msg: "Requesting control.",
                            cbYes: function () {
                                z.giveControl(D.numericId);
                                this.destroy()
                            },
                            cbNo: function () {
                                z.refuseControl(D.numericId);
                                this.destroy()
                            }
                        });
                        break;
                    case 6:
                        F.execute("setTouchRemoting", [!0]);
                        break;
                    case 7:
                        D = JSON.parse(c);
                        D.width & D.height && (z.reconnectOnResize = !1, B = Mb(D.width, D.height), sb(D.width, D.height), F.setSize(D.width,
                        D.height), svGlobal.logger.warn("Resolution changed, width:" + D.width + " height:" + D.height));
                        D.color && (cb(D.color), svGlobal.logger.warn("Color depth changed to:" + D.color));
                        break;
                    case 8:
                        D = JSON.parse(c), F.getFocused().requestCredential(D)
                }
                break;
            case 63:
                a = Nb(a);
                na && na.process(a);
                break;
            default:
                svGlobal.logger.warn("@TODO:" + c + "\n")
        }
    }
    function ic(a) {
        switch (a.getByte()) {
            case 32:
                a.getLittleEndian16();
                var b = a.getLittleEndian16();
                a = a.getLittleEndian16();
                F.getFocused().moveCursor(b, a, !0)
        }
    }
    function hc(a) {
        var b = [],
            c, k, h, d = new qd(L, H, function (b) {
                var d = b.length,
                    c = d > l.size();
                if (k || c) l.stop(), setTimeout(function () {
                    l.start()
                }, 1E3 * a);
                else for (c = 0; c < d; c++) b[c] = l.pull()
            }),
            l = this;
        this.delay = a;
        this.reset = function () {
            c = b.length = 0;
            k = !0;
            d.stop();
            h = 0
        };
        this.reset();
        this.start = function () {
            k && (d.start(), k = !1)
        };
        this.stop = function () {
            d.stop();
            k = !0
        };
        this.size = function () {
            for (var a = b.length, d = 0, c = 0; c < a; c++) d += b[c].length;
            return d
        };
        this.add = function (c) {
            var k = (new Date).getTime();
            h < k && (h = k);
            h += 1E3 * (c.length / (H * L));
            var g = b.length;
            b[g] = c;
            0 === g && (k = (new Date).getTime(), setTimeout(function () {
                d.start()
            }, 1E3 * a));
            return h - k
        };
        this.pull = function () {
            if (0 === b.length) return null;
            var a = b[0];
            if (c < a.length) return a[c++];
            b.shift();
            c = 0;
            return this.pull()
        }
    }
    function qd(a, b, c) {
        function k() {
            var a;
            if (p) {
                a = h.mozWriteAudio(p.subarray(e));
                d += a;
                e += a;
                if (e < p.length) return;
                p = null
            }
            a = h.mozCurrentSampleOffset() + l - d;
            if (0 < a) {
                var b = new Float32Array(a);
                c(b);
                a = h.mozWriteAudio(b);
                a < b.length && (p = b, e = a);
                d += a
            }
        }
        var h = new Audio;
        h.mozSetup(a, b);
        var d = 0,
            l = a * b / 2,
            p = null,
            e = 0,
            g = null;
        this.start = function () {
            g = setInterval(k, 100)
        };
        this.stop = function () {
            g && clearInterval(g)
        }
    }
    function eb() {
        var a = m.indexOf("://"),
            b = m.substring(a + 3),
            a = b.indexOf("/");
        0 < a && (b = b.substring(0, a));
        return location.protocol + "//" + b
    }
    function Fc(a) {
        a.getLittleEndian16();
        var b = a.getByte(),
            c = a.getByte(),
            k = a.getLittleEndian16(),
            h = null;
        if (0 !== (c & 32)) {
            if (-1 === Da.dec(a.getData(), a.getPosition(), k - 18, c)) throw "Error on decompressing data.";
            h = Da.getData()
        } else h = a;
        switch (b) {
            case 2:
                var d = h,
                    l = d.getLittleEndian16();
                switch (l) {
                    case 0:
                        d.skipPosition(2);
                        l = d.getLittleEndian16();
                        d.skipPosition(2);
                        Kc(d, l);
                        break;
                    case 1:
                        Lc(d);
                        break;
                    case 2:
                        lc(d);
                        break;
                    case 3:
                        break;
                    default:
                        svGlobal.logger.warn("Unimplemented Update type " + l)
                }
                break;
            case 20:
                break;
            case 31:
                break;
            case 27:
                d = h;
                l = 0;
                l = d.getLittleEndian16();
                d.skipPosition(2);
                switch (l) {
                    case 3:
                        d.skipPositon(4);
                        break;
                    case 6:
                        Oa(d, 24);
                        break;
                    case 7:
                        mc(d);
                        break;
                    case 1:
                        d = d.getLittleEndian16();
                        switch (d) {
                            case 0:
                                F.setCursor("default");
                                break;
                            default:
                                svGlobal.logger.warn("XXX system pointer message " + d)
                        }
                        break;
                    case 8:
                        l = d.getLittleEndian16(), Oa(d, l)
                }
                break;
            case 34:
                break;
            case 38:
                a = h;
                b = a.getLittleEndian32();
                if (3 > b) {
                    La = !0;
                    try {
                        var p = z.sessionInfo;
                        switch (b) {
                            case 0:
                                a.skipPosition(4);
                                p.domain = a.getUnicodeString(52, !0);
                                a.skipPosition(4);
                                p.userName = a.getUnicodeString(512, !0);
                                p.sessionId = a.getLittleEndian32();
                                break;
                            case 1:
                                p.version = a.getLittleEndian16(), a.skipPosition(4), p.sessionId = a.getLittleEndian32(), d = a.getLittleEndian32(), l = a.getLittleEndian32(), a.skipPosition(558), p.domain = a.getUnicodeString(d, !0),
                                p.userName = a.getUnicodeString(l, !0)
                        }
                        if (z.onloggedin) z.onloggedin()
                    } catch (e) {}
                } else if (3 === b && (a.skipPosition(2), 2 !== a.getLittleEndian32())) {
                    a.skipPosition(4);
                    if (28 !== a.getLittleEndian32()) throw "Invalid length of SaveSessoinInfo PDU";
                    a.skipPosition(4);
                    d = {};
                    d.logId = a.getLittleEndian32();
                    d.time = (new Date).getTime();
                    z.sessionInfo.sessionId = d.logId;
                    if (!La && z.onloggedin) z.onloggedin();
                    La = !0;
                    l = a.getBytes(16);
                    p = Array(16);
                    for (a = 0; 16 > a; a++) p[a] = l[a] & 255;
                    d.random = p;
                    x.send("8D" + d.logId + "\t" + sa.enc(p));
                    if ("sessionStorage" in window) try {
                        sessionStorage[qb()] = JSON.stringify(d)
                    } catch (g) {}
                }
                break;
            case 40:
                x.send("8E50");
                break;
            case 41:
                break;
            case 47:
                d = h.getLittleEndian32();
                1 > d || Cc(d);
                break;
            case 54:
                d = h.getLittleEndian32().toString(16).toUpperCase();
                d = __svi18n.serverStatus[d];
                z.displayMsg && console.log(d);
                break;
            case 55:
                break;
            default:
                svGlobal.logger.warn("Unimplemented Data PDU type " + b)
        }
    }
    function Gc(a) {
        var b = a.getByte(),
            c = b & 15,
            k = b >> 4 & 3,
            h, d = 0;
        2 === (b >> 6 & 3) && (d = a.getByte());
        h = a.getLittleEndian16();
        b = null;
        if (0 !== (d & 32)) {
            if (-1 === Da.dec(a.getData(),
            a.getPosition(), h, d)) throw __svi18n.errorDecompress;
            b = Da.getData();
            h = Da.getDecompressedLength()
        } else b = a;
        if (0 !== k) switch (k) {
            case 2:
            case 3:
                vb.addFragement(b, h);
                return;
            case 1:
                vb.addFragement(b, h), b = vb.clearFragements()
        }
        switch (c) {
            case 0:
                a = b.getLittleEndian16();
                Kc(b, a);
                break;
            case 1:
                b.skipPosition(2);
                Lc(b);
                break;
            case 2:
                b.skipPosition(2);
                lc(b);
                break;
            case 3:
                break;
            case 4:
                a = b;
                for (c = a.getEnd(); a.getPosition() < c;) switch (k = a.getLittleEndian16(), k) {
                    case 1:
                    case 6:
                        d = a.getLittleEndian16();
                        b = a.getLittleEndian16();
                        a.getLittleEndian16();
                        a.getBigEndian16();
                        var k = a,
                            l = k.getByte();
                        k.skipPosition(2);
                        var p = k.getByte(),
                            e = k.getLittleEndian16(),
                            g = k.getLittleEndian16(),
                            j = k.getLittleEndian32(),
                            m = void 0;
                        h = k.getPosition() + j;
                        switch (p) {
                            case 0:
                                l = hd(k.getData(), j, k.getPosition());
                                m = Array(l.length);
                                Mc(l, 0, m, e, g, 1);
                                B.setRGBs(d, b, e, g, m, 0, e);
                                B.postPaint(d, b, e, g);
                                break;
                            case 1:
                                Td(k, l, e, g, Qb);
                                l = Qb.getData();
                                m = Qb.getDataSize();
                                m = Array(m);
                                Mc(l, 0, m, e, g, 1);
                                B.setRGBs(d, b, e, g, m, 0, e);
                                B.postPaint(d, b, e, g);
                                break;
                            case 3:
                                for (var p = rd.decode(k,
                                j), e = new Ka(0, 0, 0, 0), g = p.getRects(), m = p.getTiles(), l = p.getTileSize(), p = p.getRectSize(), n = j = 0; n < l; n++) for (var J = m[n], r = 0; r < p; r++) g[r].intersection(J.x, J.y, 64, 64, e), e.isEmpty() || (j = 64 * (e.y - J.y) + (e.x - J.x), e.x += d, e.y += b, B.setRGBs(e.x, e.y, e.width, e.height, J.data, j, 64), B.postPaint(e.x, e.y, e.width, e.height));
                                break;
                            default:
                                throw "Codec " + p + " is not supporeted";
                        }
                        k.setPosition(h);
                        break;
                    case 4:
                        d = a;
                        k = d.getLittleEndian16();
                        d = d.getLittleEndian32();
                        1 == k && x.send("91" + d);
                        break;
                    default:
                        svGlobal.logger.warn("Invalid surface cmd:" + k)
                }
                B.commitPaint();
                break;
            case 5:
                F.setCursor("default");
                break;
            case 6:
                break;
            case 8:
                break;
            case 9:
                Oa(b, 24);
                break;
            case 10:
                mc(b);
                break;
            case 11:
                a = b;
                c = a.getLittleEndian16();
                Oa(a, c);
                break;
            default:
                svGlobal.logger.warn("XXX RDP5 opcode " + c)
        }
    }
    function Mc(a, b, c, k, h, d) {
        d *= k;
        for (var l = 0; l < h; l++) k = b + (h - l - 1) * d, fa(a, k, c, l * d, d)
    }
    function Nc(a, b, c) {
        var k = a,
            h = c,
            d = 0,
            l = 8,
            p = b;
        this.attach = function (a, b, c) {
            k = a;
            h = c;
            d = 0;
            l = 8;
            p = b
        };
        this.getBits = function (a) {
            for (var b = 0, c = 0; d < h && 0 < a;) b = a, b > l && (b = l), 0 != c && (c <<= b), c |= k[d + p] >> l - b & (1 << b) - 1, l -= b, a -= b, 0 == l && (l = 8, d++);
            return c
        };
        this.putBits = function (a, b) {
            for (var c = b, m = 0; d < h && 0 < c;) m = c, m > l && (m = l), k[d + p] |= (a >> c - m & (1 << m) - 1) << l - m, l -= m, c -= m, 0 == l && (l = 8, d++)
        };
        this.eos = function () {
            return d > h
        };
        this.left = function () {
            return d >= h ? 0 : 8 * (h - d - 1) + l
        };
        this.getProcessBytes = function () {
            return 8 > l ? d + 1 : d
        }
    }
    function nc() {
        this.y = this.x = this.CrLen = this.CbLen = this.YLen = this.quantIdxCr = this.quantIdxCb = this.quantIdxY = 0;
        this.data = Array(4096);
        var a = this;
        this.readHeaderfromStream = function (b) {
            b.skipPosition(6);
            a.quantIdxY = b.getByte();
            a.quantIdxCb = b.getByte();
            a.quantIdxCr = b.getByte();
            a.x = 64 * b.getLittleEndian16();
            a.y = 64 * b.getLittleEndian16();
            a.YLen = b.getLittleEndian16();
            a.CbLen = b.getLittleEndian16();
            a.CrLen = b.getLittleEndian16()
        }
    }
    function pe() {
        function a(a, h, d, l, p, e, g) {
            d = a.et;
            var j = 4096,
                m = a.bitStream,
                n, J, r;
            null == m ? m = new Nc(l, p, e) : m.attach(l, p, e);
            var v = 0;
            n = 1;
            l = n << 3;
            p = 1;
            for (e = p << 3; !m.eos() && 0 < j;) if (0 != n) {
                for (; !m.eos();) {
                    J = m.getBits(1);
                    if (0 != J) break;
                    r = n = 1 << n;
                    r > j && (r = j);
                    0 < r && (qa(g, v, v + r, 0), v += r);
                    j -= n;
                    l += 4;
                    80 < l && (l = 80);
                    0 > l && (l = 0);
                    n = l >> 3
                }
                r = n = m.getBits(n);
                r > j && (r = j);
                0 < r && (qa(g, v, v + r, 0), v += r);
                j -= n;
                n = m.getBits(1);
                r = 0;
                do if (J = m.getBits(1), 1 == J) r++;
                else break;
                while (1);
                J = m.getBits(p);
                J |= r << p;
                0 == r ? (e += -2, 80 < e && (e = 80), 0 > e && (e = 0), p = e >> 3) : 1 != r && (e += r, 80 < e && (e = 80), 0 > e && (e = 0), p = e >> 3);
                r = J + 1;
                0 < j && (g[v++] = 0 != n ? -r : r);
                j--;
                l += -6;
                80 < l && (l = 80);
                0 > l && (l = 0);
                n = l >> 3
            } else {
                r = 0;
                do if (J = m.getBits(1), 1 == J) r++;
                else break;
                while (1);
                J = m.getBits(p);
                J |= r << p;
                0 == r ? (e += -2, 80 < e && (e = 80), 0 > e && (e = 0), p = e >> 3) : 1 != r && (e += r, 80 < e && (e = 80), 0 > e && (e = 0), p = e >> 3);
                r = J;
                if (1 != d) {
                    var q = r;
                    for (J = 0; 0 != q;) q >>= 1, J++;
                    J = m.getBits(J);
                    r -= J;
                    0 != J && 0 != r ? (l += -6, 80 < l && (l = 80), 0 > l && (l = 0), n = l >> 3) : 0 == J && 0 == r && (l += 6, 80 < l && (l = 80), 0 > l && (l = 0), n = l >> 3);
                    0 < j && (g[v++] = 0 != (J & 1) ? -1 * (J + 1 >> 1) : J >> 1);
                    j--;
                    0 < j && (g[v++] = 0 != (r & 1) ? -1 * (r + 1 >> 1) : r >> 1);
                    j--
                } else 0 == r ? (0 < j && (g[v++] = 0), j--, l += 3) : (0 < j && (g[v++] = 0 != (r & 1) ? -1 * (r + 1 >> 1) : r >> 1), j--, l += -3), 80 < l && (l = 80), 0 > l && (l = 0), n = l >> 3
            }
            d = 64;
            j = 4032;
            for (m = 4033; 1 < d; j++, m++, d--) g[m] += g[j];
            c(g, 0, 4096, 5);
            c(g, 0, 1024, h[8] - 6);
            c(g, 1024, 1024, h[7] - 6);
            c(g, 2048, 1024, h[9] - 6);
            c(g, 3072, 256,
            h[5] - 6);
            c(g, 3328, 256, h[4] - 6);
            c(g, 3584, 256, h[6] - 6);
            c(g, 3840, 64, h[2] - 6);
            c(g, 3904, 64, h[1] - 6);
            c(g, 3968, 64, h[3] - 6);
            c(g, 4032, 64, h[0] - 6);
            a = a.dwtBuffer;
            b(g, 3840, a, 8);
            b(g, 3072, a, 16);
            b(g, 0, a, 32)
        }
        function b(a, b, d, c) {
            var p, e, g, j, m, n, J, r, v, q, y;
            r = c << 1;
            J = b + 3 * c * c;
            j = b;
            p = 0;
            m = b + c * c;
            n = b + 2 * c * c;
            g = 2 * c * c;
            for (q = 0; q < c; q++) {
                e = a[J] - (a[j] + a[j] + 1 >> 1);
                d[p] = 32767 < e ? e - 65536 : e;
                e = a[m] - (a[n] + a[n] + 1 >> 1);
                d[g] = 32767 < e ? e - 65536 : e;
                for (y = 1; y < c; y++) v = y << 1, e = a[J + y] - (a[j + y - 1] + a[j + y] + 1 >> 1), d[p + v] = 32767 < e ? e - 65536 : e, e = a[m + y] - (a[n + y - 1] + a[n + y] + 1 >> 1), d[g + v] = 32767 < e ? e - 65536 : e;
                for (y = 0; y < c - 1; y++) v = y << 1, e = (a[j + y] << 1) + (d[p + v] + d[p + v + 2] >> 1), d[p + v + 1] = 32767 < e ? e - 65536 : e, e = (a[n + y] << 1) + (d[g + v] + d[g + v + 2] >> 1), d[g + v + 1] = 32767 < e ? e - 65536 : e;
                v = y << 1;
                e = (a[j + y] << 1) + d[p + v];
                d[p + v + 1] = 32767 < e ? e - 65536 : e;
                e = (a[n + y] << 1) + d[g + v];
                d[g + v + 1] = 32767 < e ? e - 65536 : e;
                J += c;
                j += c;
                p += r;
                m += c;
                n += c;
                g += r
            }
            for (v = 0; v < r; v++) {
                for (y = 0; y < c; y++) q = y << 1, p = b + q * r + v, e = y * r + v, g = e + c * r, e = d[e] - ((0 < y ? d[g - r] : d[g]) + d[g] + 1 >> 1), a[p] = 32767 < e ? e - 65536 : e;
                for (y = 0; y < c; y++) q = y << 1, p = b + q * r + v, e = y * r + v, g = e + c * r, e = (d[g] << 1) + (a[p] + a[p + (y < c - 1 ? 2 * r : 0)] >> 1), a[p + r] = 32767 < e ? e - 65536 : e
            }
        }
        function c(a, b, c, l) {
            if (0 != l) for (; 0 < c; b++, c--) a[b] <<= l
        }
        this.decodeRgb = function (b, c, d, l, p, e, g, j, m, n) {
            a(b, d, p, c.getData(), c.getPosition(), l, b.yrBuffer);
            c.skipPosition(l);
            a(b, d, g, c.getData(), c.getPosition(), e, b.cbgBuffer);
            c.skipPosition(e);
            a(b, d, m, c.getData(), c.getPosition(), j, b.crbBuffer);
            c.skipPosition(j);
            c = b.yrBuffer;
            d = b.cbgBuffer;
            l = b.crbBuffer;
            for (e = 0; 4096 > e; e++) g = c[e], j = d[e], m = l[e], g = g + 4096 << 16, p = g + 91947 * m, m = g - 22544 * j - 46792 * m, g += 115998 * j, p >>= 21, m >>= 21, g >>= 21, c[e] = 0 > p ? 0 : 255 < p ? 255 : p, d[e] = 0 > m ? 0 : 255 < m ? 255 : m, l[e] = 0 > g ? 0 : 255 < g ? 255 : g;
            c = b.yrBuffer;
            d = b.cbgBuffer;
            b = b.crbBuffer;
            for (l = 0; 4096 > l; l++) n[l] = c[l] << 16 | d[l] << 8 | b[l] | -16777216
        }
    }
    function qe() {
        var a = [new Ka],
            b = [new nc],
            c = 0,
            k = 0;
        this.resetRects = function (b) {
            if (a.length < b) {
                var d = a.length;
                for (a.length = b; d < b; d++) a[d] = new Ka
            }
            c = b;
            return a
        };
        this.resetTiles = function (a) {
            if (b.length < a) {
                var c = b.length;
                for (b.length = a; c < a; c++) b[c] = new nc
            }
            k = a;
            return b
        };
        this.getRectSize = function () {
            return c
        };
        this.getTileSize = function () {
            return k
        };
        this.getRects = function () {
            return a
        };
        this.getTiles = function () {
            return b
        }
    }
    function re() {
        this.ctxId = 0;
        this.tileSize = 64;
        this.qt = this.et = this.xft = this.cct = this.flags = 0;
        this.yrBuffer = Array(4096);
        this.cbgBuffer = Array(4096);
        this.crbBuffer = Array(4096);
        this.dwtBuffer = Array(4096);
        var a = this;
        this.setProperties = function (b) {
            a.flags = b & 7;
            a.cct = b >> 3 & 3;
            a.xft = b >> 5 & 15;
            a.et = b >> 9 & 15
        };
        this.bitStream = new Nc
    }
    function mc(a) {
        a = a.getLittleEndian16();
        (a = oc(a)) && F.setCursor(a)
    }
    function se(a, b, c, k, h, d, l, p) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = k;
        this.mask = h;
        this.pixel = d;
        this.bpp = l;
        this.cache_idx = p
    }
    function Oa(a, b) {
        if (!te) {
            var c = 0,
                k = 0,
                h = 0,
                d = 0,
                l = 0,
                p = 0,
                e = 0,
                l = a.getLittleEndian16(),
                c = a.getLittleEndian16(),
                k = a.getLittleEndian16(),
                h = a.getLittleEndian16(),
                d = a.getLittleEndian16(),
                p = a.getLittleEndian16(),
                e = a.getLittleEndian16(),
                e = a.getBytes(e),
                g = a.getBytes(p);
            if (0 > c || c >= h - 1) c = 0;
            0 > k ? k = 0 : k >= d && (k = d - 1);
            for (var j = !0, m = 0; m < p; m++) if (-1 !== g[m]) {
                j = !1;
                break
            }
            if (!j) {
                e = new se(c, k, h, d, g, e, b, l);
                if (!hi5.browser.isOpera) {
                    for (var k = e.x, h = e.y, p = e.width,
                    d = e.height, c = e.cache_idx, g = e.mask, j = e.pixel, m = e.bpp, e = Array(p * d), n = e[0] = 0, q = !0, r = g.length, v = 0; v < r; v++) if (0 !== g[v]) {
                        q = !1;
                        break
                    }
                    for (var t = 0, v = 0; v < d; v++) for (r = 0; r < p; r++) {
                        e[n] = ue(r, v, p, d, m, j);
                        if (!q) if (t = v, 1 !== m && (t = d - t - 1), t = t * p + r, t = 0 === (g[t / 8 >> 0] & 128 >> t % 8) ? 1 : 0, 0 === t && 0 !== e[n]) e[n] = ~e[n], e[n] |= 4278190080;
                        else if (1 === t || 0 !== e[n]) e[n] |= 4278190080;
                        n++
                    }
                    j = 4 * p * d;
                    m = p * d / 8;
                    g = 62 + j + m + m;
                    n = Array(g);
                    n[0] = 0;
                    g = new RdpBuffer(n, 0, g);
                    g.setLittleEndian16(0);
                    g.setLittleEndian16(2);
                    g.setLittleEndian16(1);
                    g.setByte(p);
                    g.setByte(d);
                    g.setByte(0);
                    g.setByte(0);
                    g.setLittleEndian16(k);
                    g.setLittleEndian16(h);
                    g.setLittleEndian32(40 + j + m + m);
                    g.setLittleEndian32(22);
                    g.setLittleEndian32(40);
                    g.setLittleEndian32(p);
                    g.setLittleEndian32(2 * d);
                    g.setLittleEndian16(1);
                    g.setLittleEndian16(32);
                    g.setLittleEndian32(0);
                    g.setLittleEndian32(m + m);
                    g.setLittleEndian32(0);
                    g.setLittleEndian32(0);
                    g.setLittleEndian32(0);
                    g.setLittleEndian32(0);
                    for (j = d - 1; 0 <= j; j--) for (m = 0; m < p; m++) n = e[p * j + m], g.setByte(n & 255), g.setByte(n >> 8 & 255), g.setByte(n >> 16 & 255), g.setByte(n >> 24 & 255);
                    p = p / 8 >> 0;
                    for (j = 0; j < d; j += 1) for (m = 0; m < p; m += 1) g.setByte(0);
                    for (j = 0; j < d; j += 1) for (m = 0; m < p; m += 1) g.setByte(0);
                    k = {
                        data: "data:image/x-icon;base64," + sa.enc(g.getData()),
                        hotX: k,
                        hotY: h
                    };
                    if (20 > c) ub[c] = k;
                    else throw "Could not put Cursor!";
                }(l = oc(l)) && F.setCursor(l)
            }
        }
    }
    function ue(a, b, c, k, h, d) {
        1 !== h && (b = k - b - 1);
        b = (b * c + a) * h;
        c = b / 8 >> 0;
        a = d[c] & 255;
        switch (h) {
            case 1:
                return 0 === (a & 128 >> b % 8) ? 0 : 4294967295;
            case 8:
                return 0 === a ? 0 : 4294967295;
            case 15:
                return a |= (d[c + 1] & 255) << 8, h = Array(4), Oc(a, 15, h, 0), h[0] << 16 | h[1] << 8 | h[2];
            case 16:
                return a |= (d[c + 1] & 255) << 8, h = Array(4), Oc(a, 16, h, 0), h[0] << 16 | h[1] << 8 | h[2];
            case 24:
                return (d[c + 2] & 255) << 16 | (d[c + 1] & 255) << 8 | a;
            case 32:
                return (d[c + 3] & 255) << 24 | (d[c + 2] & 255) << 16 | (d[c + 1] & 255) << 8 | a;
            default:
                throw "invalid bpp value for Xor Mask.";
        }
    }
    function lc(a) {
        var b = 0,
            c = null,
            k = null,
            h = null,
            d = 0;
        a.skipPosition(2);
        b = a.getLittleEndian16();
        a.skipPosition(2);
        c = Array(b);
        k = Array(b);
        h = Array(b);
        a = a.getBytes(3 * b);
        for (var l = 0; l < b; l++) c[l] = a[d], k[l] = a[d + 1], h[l] = a[d + 2], d += 3;
        256 === b && (ha || (ha = Array(3)), ha[0] = c, ha[1] = k, ha[2] = h)
    }
    function Kc(a, b) {
        for (var c = 0, k = 0, h = 0; c < b;) {
            k = a.getByte();
            h = k & 3;
            switch (h) {
                case 1:
                    var d = a,
                        l = k,
                        p = 0,
                        e = 0,
                        g = !1;
                    if (0 === (l & 1)) throw "Not a standard order!";
                    0 !== (l & 8) && (ia.orderType = d.getByte());
                    var e = ve[ia.orderType],
                        j = d,
                        m = e,
                        q = 0,
                        J = 0;
                    0 !== (l & 64) && m--;
                    0 !== (l & 128) && (m = 2 > m ? 0 : m - 2);
                    for (var r = 0; r < m; r++) J = j.getByte(), q |= J << 8 * r;
                    p = q;
                    if (0 !== (l & 4)) {
                        if (0 === (l & 32)) {
                            var v = d,
                                t = ia.bounds,
                                y = v.getByte();
                            0 !== (y & 1) ? t.left = I(v, t.left, !1) : 0 !== (y & 16) && (t.left = I(v, t.left, !0));
                            0 !== (y & 2) ? t.top = I(v, t.top, !1) : 0 !== (y & 32) && (t.top = I(v, t.top, !0));
                            0 !== (y & 4) ? t.right = I(v, t.right, !1) : 0 !== (y & 64) && (t.right = I(v, t.right, !0));
                            0 !== (y & 8) ? t.bottom = I(v, t.bottom, !1) : 0 !== (y & 128) && (t.bottom = I(v, t.bottom, !0))
                        }
                        var z = ia.bounds;
                        Y = z.left;
                        0 > Y && (Y = 0);
                        X = z.top;
                        0 > X && (X = 0);
                        P = z.right;
                        P >= n && (P = n - 1);
                        Q = z.bottom;
                        Q >= w && (Q = w - 1)
                    }
                    g = 0 !== (l & 16);
                    switch (ia.orderType) {
                        case 0:
                            var u = d,
                                s = ia.destBlt,
                                D = p,
                                zc = g;
                            0 !== (D & 1) && (s.x = I(u, s.x, zc));
                            0 !== (D & 2) && (s.y = I(u, s.y, zc));
                            0 !== (D & 4) && (s.cx = I(u, s.cx, zc));
                            0 !== (D & 8) && (s.cy = I(u, s.cy, zc));
                            0 !== (D & 16) && (s.opcode = sd(u.getByte()));
                            var x = s.x,
                                A = s.y,
                                fc = s.cx,
                                K = s.cy,
                                H = s.opcode;
                            if (!(x > n || A > w)) {
                                var L = x + fc - 1;
                                L > P && (L = P);
                                x < Y && (x = Y);
                                var fc = L - x + 1,
                                    f = A + K - 1;
                                f > Q && (f = Q);
                                A < X && (A = X);
                                K = f - A + 1;
                                1 > fc || 1 > K || (pc(H, B, n, x, A, fc, K, null, 0, 0, 0), B.postPaint(x, A, fc, K))
                            }
                            break;
                        case 1:
                            var $a = d,
                                C = ia.patBlt,
                                G = p,
                                ea = g;
                            0 !== (G & 1) && (C.x = I($a, C.x, ea));
                            0 !== (G & 2) && (C.y = I($a, C.y, ea));
                            0 !== (G & 4) && (C.cx = I($a, C.cx, ea));
                            0 !== (G & 8) && (C.cy = I($a, C.cy, ea));
                            if (0 !== (G & 16)) {
                                var V = C,
                                    W = $a.getByte();
                                V.opcode = W & 3 | (W & 48) >> 2
                            }
                            0 !== (G & 32) && (C.backgroundColor = wb($a));
                            0 !== (G & 64) && (C.foregroundColor = wb($a));
                            var T = $a,
                                U = C.brush,
                                Z = G >> 7;
                            0 !== (Z & 1) && (U.xOrigin = T.getByte());
                            0 !== (Z & 2) && (U.yOrigin = T.getByte());
                            0 !== (Z & 4) && (U.style = T.getByte());
                            var ga = U.pattern;
                            0 !== (Z & 8) && (ga[0] = T.getByte());
                            if (0 !== (Z & 16)) for (var ha = 1; 8 > ha; ha++) ga[ha] = T.getByte();
                            U.pattern = ga;
                            var ma = C.x,
                                na = C.y;
                            if (!(ma > P || na > Q)) {
                                var qa = C.opcode,
                                    ca = ma,
                                    fa = na,
                                    ua = C.cx,
                                    Ea = C.cy,
                                    qb = C.foregroundColor,
                                    sa = C.backgroundColor,
                                    Ma = C.brush.xOrigin,
                                    Na = C.brush.yOrigin,
                                    La = C.brush.style,
                                    fb = C.brush.pattern,
                                    qb = ta(qb),
                                    sa = ta(sa),
                                    Ca = ca + ua - 1;
                                Ca > P && (Ca = P);
                                ca < Y && (ca = Y);
                                var ua = Ca - ca + 1,
                                    Da = fa + Ea - 1;
                                Da > Q && (Da = Q);
                                fa < X && (fa = X);
                                Ea = Da - fa + 1;
                                if (!(1 > ua || 1 > Ea)) {
                                    var Pa = null;
                                    switch (La) {
                                        case 0:
                                            for (var Pa = Array(ua * Ea), xb = Pa[0] = 0; xb < Pa.length; xb++) Pa[xb] = qb;
                                            pc(qa, B, n, ca, fa, ua, Ea, Pa, ua, 0, 0);
                                            B.postPaint(ca, fa, ua, Ea);
                                            break;
                                        case 2:
                                            svGlobal.logger.warn("hatch");
                                            break;
                                        case 3:
                                            for (var Pa = Array(ua * Ea), Ac = Pa[0] = 0, xb = 0; xb < Ea; xb++) for (var Hb = 0; Hb < ua; Hb++) Pa[Ac] = 0 === (fb[(xb + Na) % 8] & 1 << (Hb + Ma) % 8) ? qb : sa, Ac++;
                                            pc(qa, B, n, ca, fa, ua, Ea, Pa, ua, 0, 0);
                                            B.postPaint(ca, fa, ua, Ea);
                                            break;
                                        default:
                                            svGlobal.logger.warn("Unsupported brush style " + La)
                                    }
                                }
                            }
                            break;
                        case 2:
                            var yb = d,
                                $ = ia.screenBlt,
                                zb = p,
                                Rb = g;
                            0 !== (zb & 1) && ($.x = I(yb, $.x, Rb));
                            0 !== (zb & 2) && ($.y = I(yb, $.y, Rb));
                            0 !== (zb & 4) && ($.cx = I(yb, $.cx, Rb));
                            0 !== (zb & 8) && ($.cy = I(yb, $.cy, Rb));
                            0 !== (zb & 16) && ($.opcode = sd(yb.getByte()));
                            0 !== (zb & 32) && ($.srcX = I(yb, $.srcX, Rb));
                            0 !== (zb & 64) && ($.srcY = I(yb, $.srcY, Rb));
                            var Qa = $.x,
                                Ra = $.y;
                            if (!(Qa > P || Ra > Q)) {
                                var ib = $.cx,
                                    Sb = $.cy,
                                    db = $.opcode,
                                    xa = $.srcX,
                                    Aa = $.srcY,
                                    Ya = Qa + ib - 1;
                                Ya > P && (Ya = P);
                                Qa < Y && (Qa = Y);
                                var ib = Ya - Qa + 1,
                                    ab = Ra + Sb - 1;
                                ab > Q && (ab = Q);
                                Ra < X && (Ra = X);
                                Sb = ab - Ra + 1;
                                xa += Qa - $.x;
                                Aa += Ra - $.y;
                                1 > ib || 1 > Sb || (12 === db ? B.moveArea(xa, Aa, ib, Sb, Qa - xa, Ra - Aa) : pc(db, B, ib, Qa, Ra, ib, Sb, null, ib, xa, Aa), B.postPaint(Qa, Ra, ib, Sb))
                            }
                            break;
                        case 9:
                            var jb = d,
                                da = ia.line,
                                kb = p,
                                Ka = g;
                            0 !== (kb & 1) && (da.mixmode = jb.getLittleEndian16());
                            0 !== (kb & 2) && (da.startX = I(jb, da.startX, Ka));
                            0 !== (kb & 4) && (da.startY = I(jb, da.startY, Ka));
                            0 !== (kb & 8) && (da.endX = I(jb, da.endX, Ka));
                            0 !== (kb & 16) && (da.endY = I(jb, da.endY, Ka));
                            0 !== (kb & 32) && (da.backgroundColor = wb(jb));
                            0 !== (kb & 64) && (da.opcode = jb.getByte());
                            var bb = jb,
                                cb = da.pen,
                                eb = kb >> 7;
                            0 !== (eb & 1) && (cb.style = bb.getByte());
                            0 !== (eb & 2) && (cb.width = bb.getByte());
                            0 !== (eb & 4) && (cb.color = wb(bb));
                            var Ab = da.startX,
                                Sa = da.startY,
                                Bb = da.endX,
                                qc = da.endY,
                                Mb = da.pen.color,
                                Nb = da.opcode - 1;
                            if (Sa === qc) {
                                if (Ab > Bb) var gb = Ab,
                                    Ab = Bb,
                                    Bb = gb;
                                Ab < Y && (Ab = Y);
                                Bb > P && (Bb = P)
                            } else Ab === Bb && (Sa > qc && (gb = Sa, Sa = qc, qc = gb), Sa < X && (Sa = X), Sa > Q && (Sa = Q));
                            Ud(Ab, Sa, Bb, qc, Mb, Nb);
                            break;
                        case 10:
                            var Cb = d,
                                pa = ia.rectangle,
                                Db = p,
                                Oa = g;
                            0 !== (Db & 1) && (pa.x = I(Cb, pa.x, Oa));
                            0 !== (Db & 2) && (pa.y = I(Cb, pa.y, Oa));
                            0 !== (Db & 4) && (pa.cx = I(Cb, pa.cx, Oa));
                            0 !== (Db & 8) && (pa.cy = I(Cb, pa.cy, Oa));
                            0 !== (Db & 16) && (hb = hb & 4294967040 | Cb.getByte());
                            0 !== (Db & 32) && (hb = hb & 4294902015 | Cb.getByte() << 8);
                            0 !== (Db & 64) && (hb = hb & 4278255615 | Cb.getByte() << 16);
                            pa.color = hb;
                            td(pa.x, pa.y, pa.cx, pa.cy, pa.color, !0);
                            break;
                        case 11:
                            var Tb = d,
                                ya = ia.deskSave,
                                Ub = p,
                                Za = g;
                            0 !== (Ub & 1) && (ya.offset = Tb.getLittleEndian32());
                            0 !== (Ub & 2) && (ya.left = I(Tb, ya.left, Za));
                            0 !== (Ub & 4) && (ya.top = I(Tb, ya.top, Za));
                            0 !== (Ub & 8) && (ya.right = I(Tb, ya.right, Za));
                            0 !== (Ub & 16) && (ya.bottom = I(Tb, ya.bottom, Za));
                            0 !== (Ub & 32) && (ya.action = Tb.getByte());
                            var Ta = ya,
                                pb = Ta.right - Ta.left + 1,
                                rb = Ta.bottom - Ta.top + 1;
                            if (0 === Ta.action) 1 > pb || 1 > rb || (Ic = B.getRGBs(Ta.left, Ta.top, pb, rb));
                            else {
                                var sb = pb,
                                    Kb = rb,
                                    Lb = Ta.left,
                                    Ob = Ta.top;
                                Ic ? (B.setRGBs(Lb, Ob, sb, Kb, Ic, 0, sb), B.postPaint(Lb, Ob, sb, Kb)) : svGlobal.logger.warn("XXX no matched desktop save.")
                            }
                            break;
                        case 13:
                            var Fa = d,
                                R = ia.memBlt,
                                Ua = p,
                                Vb = g;
                            0 !== (Ua & 1) && (R.cacheID = Fa.getByte(), R.colorTable = Fa.getByte());
                            0 !== (Ua & 2) && (R.x = I(Fa, R.x, Vb));
                            0 !== (Ua & 4) && (R.y = I(Fa, R.y, Vb));
                            0 !== (Ua & 8) && (R.cx = I(Fa, R.cx, Vb));
                            0 !== (Ua & 16) && (R.cy = I(Fa,
                            R.cy, Vb));
                            0 !== (Ua & 32) && (R.opcode = sd(Fa.getByte()));
                            0 !== (Ua & 64) && (R.srcX = I(Fa, R.srcX, Vb));
                            0 !== (Ua & 128) && (R.srcY = I(Fa, R.srcY, Vb));
                            0 !== (Ua & 256) && (R.cacheIDX = Fa.getLittleEndian16());
                            var Va = R.x,
                                Wa = R.y;
                            if (!(Va > P || Wa > Q)) {
                                var rc = R.cx,
                                    sc = R.cy,
                                    Pc = R.srcX,
                                    Qc = R.srcY,
                                    ub = Va + rc - 1;
                                ub > P && (ub = P);
                                Va < Y && (Va = Y);
                                var rc = ub - Va + 1,
                                    vb = Wa + sc - 1;
                                vb > Q && (vb = Q);
                                Wa < X && (Wa = X);
                                var sc = vb - Wa + 1,
                                    Pc = Pc + (Va - R.x),
                                    Qc = Qc + (Wa - R.y),
                                    Wb = tb.getBitmap(R.cacheID, R.cacheIDX);
                                Wb ? (12 === R.opcode ? B.setRGBs(Va, Wa, rc, sc, Wb.data, Qc * Wb.width + Pc, Wb.width) : pc(R.opcode,
                                B, n, Va, Wa, rc, sc, Wb.data, Wb.width, Pc, Qc), B.postPaint(Va, Wa, rc, sc)) : svGlobal.logger.warn("Failed to get bitmap from cache, id:" + R.cacheID + " idx=" + R.cacheIDX)
                            }
                            break;
                        case 22:
                            var Eb = d,
                                Ga = ia.polyLine,
                                Xb = p,
                                dc = g;
                            0 !== (Xb & 1) && (Ga.x = I(Eb, Ga.x, dc));
                            0 !== (Xb & 2) && (Ga.y = I(Eb, Ga.y, dc));
                            0 !== (Xb & 4) && (Ga.opcode = Eb.getByte());
                            0 !== (Xb & 16) && (Ga.foregroundColor = wb(Eb));
                            0 !== (Xb & 32) && (Ga.lines = Eb.getByte());
                            if (0 !== (Xb & 64)) {
                                var ec = Eb.getByte();
                                Ga.dataSize = ec;
                                Ga.data = Eb.getBytes(ec)
                            }
                            var Fb = Ga,
                                Rc = Fb.x,
                                Sc = Fb.y,
                                Bc = Fb.foregroundColor,
                                gc = Fb.lines,
                                Cc = Fb.dataSize,
                                ud = Fb.data,
                                Tc = Array(1);
                            Tc[0] = Math.floor((gc - 1) / 4) + 1;
                            for (var lb = 0, Dc = 0, Ec = Fb.opcode - 1, vd = 0; vd < gc && Tc[0] < Cc; vd++) {
                                var Fc = Rc,
                                    Gc = Sc;
                                0 === vd % 4 && (lb = ud[Dc++]);
                                0 === (lb & 192) && (lb |= 192);
                                0 !== (lb & 64) && (Rc += Vd(ud, Tc));
                                0 !== (lb & 128) && (Sc += Vd(ud, Tc));
                                Ud(Fc, Gc, Rc, Sc, Bc, Ec);
                                lb <<= 2
                            }
                            break;
                        case 27:
                            var O = d,
                                N = ia.text2,
                                aa = p;
                            0 !== (aa & 1) && (N.font = O.getByte());
                            0 !== (aa & 2) && (N.flags = O.getByte());
                            0 !== (aa & 4) && (N.opcode = O.getByte());
                            0 !== (aa & 8) && (N.mixmode = O.getByte());
                            0 !== (aa & 16) && (N.foregroundColor = wb(O));
                            0 !== (aa & 32) && (N.backgroundColor = wb(O));
                            0 !== (aa & 64) && (N.clipLeft = O.getLittleEndian16());
                            0 !== (aa & 128) && (N.clipTop = O.getLittleEndian16());
                            0 !== (aa & 256) && (N.clipRight = O.getLittleEndian16());
                            0 !== (aa & 512) && (N.clipBottom = O.getLittleEndian16());
                            0 !== (aa & 1024) && (N.boxLeft = O.getLittleEndian16());
                            0 !== (aa & 2048) && (N.boxTop = O.getLittleEndian16());
                            0 !== (aa & 4096) && (N.boxRight = O.getLittleEndian16());
                            0 !== (aa & 8192) && (N.boxBottom = O.getLittleEndian16());
                            0 !== (aa & 16384) && O.skipPosition(1);
                            0 !== (aa & 32768) && O.skipPosition(1);
                            0 !== (aa & 65536) && O.skipPosition(1);
                            0 !== (aa & 131072) && O.skipPosition(1);
                            0 !== (aa & 262144) && O.skipPosition(7);
                            0 !== (aa & 524288) && (N.x = O.getLittleEndian16());
                            0 !== (aa & 1048576) && (N.y = O.getLittleEndian16());
                            if (0 !== (aa & 2097152)) {
                                var hc = O.getByte();
                                N.length = hc;
                                N.text = O.getBytes(hc);
                                N.textPos = 0
                            }
                            var ic = N.font,
                                Ha = N.flags,
                                wd = N.mixmode,
                                jc = N.foregroundColor,
                                Uc = N.backgroundColor,
                                xd = N.clipLeft,
                                yd = N.clipTop,
                                tc = N.boxLeft,
                                zd = N.boxTop,
                                ja = N.x,
                                va = N.y,
                                mb = N.length,
                                oa = N.text,
                                Ad = N.clipRight - xd,
                                Bd = N.clipBottom - yd,
                                Yb = N.boxRight - tc,
                                Cd = N.boxBottom - zd,
                                ka = null,
                                nb = 0,
                                ba = 0;
                            tc + Yb > n && (Yb = n - tc);
                            1 < Yb ? td(tc, zd, Yb, Cd, Uc, !1) : 1 === wd && td(xd, yd, Ad, Bd, Uc, !1);
                            for (var Hc = mb, S = 0; S < mb;) switch (oa[ba + S]) {
                                case 255:
                                    var Vc = oa[ba + S + 2];
                                    if (Vc > Hc - ba) {
                                        S = mb = 0;
                                        break
                                    }
                                    var Jc = oa.slice ? oa.slice(ba, ba + Vc) : new Uint8Array(oa.buffer.slice(ba, ba + Vc)),
                                        Kc = new we(Vc, Jc),
                                        Dd = oa[ba + S + 1],
                                        Lc = Kc;
                                    if (Dd < Pb.length) {
                                        var lc = Pb[Dd];
                                        lc && (lc.data = null);
                                        Pb[Dd] = Lc
                                    } else throw "Could not put Text in cache";
                                    S += 3;
                                    mb -= S;
                                    ba = S;
                                    S = 0;
                                    break;
                                case 254:
                                    var Zb;
                                    a: {
                                        var mc = oa[ba + S + 1],
                                            Ed = null;
                                        if (mc < Pb.length && (Ed = Pb[mc]) && Ed.data) {
                                            Zb = Ed;
                                            break a
                                        }
                                        Zb = null
                                    }(O = Zb ? Zb.data : null) && 0 === O[1] && 0 === (Ha & 32) && (0 !== (Ha & 4) ? va += oa[ba + S + 2] : ja += oa[ba + S + 2]);
                                    S = S + 2 < mb ? S + 3 : S + 2;
                                    mb -= S;
                                    ba = S;
                                    S = 0;
                                    if (!Zb) break;
                                    for (var Nc = Zb.size, Ia = 0; Ia < Nc; Ia++) ka = Wd(ic, O[Ia]), 0 === (Ha & 32) && (nb = O[++Ia], 0 !== (nb & 128) ? (0 !== (Ha & 4) ? va += O[Ia + 1] | O[Ia + 2] << 8 : ja += O[Ia + 1] | O[Ia + 2] << 8, Ia += 2) : 0 !== (Ha & 4) ? va += nb : ja += nb), ka && (Xd(wd, ja + ka.offset & 65535, va + ka.baseLine & 65535, ka.width, ka.height, ka.fontData, Uc, jc, kd, E), 0 !== (Ha & 32) && (ja += ka.width));
                                    break;
                                default:
                                    ka = Wd(ic,
                                    oa[ba + S]), 0 === (Ha & 32) && (nb = oa[ba + ++S], 0 !== (nb & 128) ? (0 !== (Ha & 4) ? va += oa[ba + S + 1] | oa[ba + S + 2] << 8 : ja += oa[ba + S + 1] | oa[ba + S + 2] << 8, S += 2) : 0 !== (Ha & 4) ? va += nb : ja += nb), ka && (Xd(wd, ja + ka.offset & 65535, va + ka.baseLine & 65535, ka.width, ka.height, ka.fontData, Uc, jc, kd, E), 0 !== (Ha & 32) && (ja += ka.width)), S++
                            }
                            1 < Yb ? 0 < Cd && B.postPaint(tc, zd, Yb, Cd) : 0 < Ad && 0 < Bd && B.postPaint(xd, yd, Ad, Bd);
                            break;
                        default:
                            svGlobal.logger.warn("XXX Order type " + ia.orderType)
                    }
                    0 !== (l & 4) && Sd();
                    break;
                case 2:
                    var nc = a,
                        oc = k >> 2;
                    if (2 !== (k & 3)) throw "Not a valid Alt secondary order";
                    switch (oc) {
                        case 11:
                            var $b = nc,
                                Oc = $b.getLittleEndian16(),
                                Gb = $b.getLittleEndian32(),
                                ad = $b.getPosition() + (Oc - 7);
                            if (0 !== (Gb & 16777216)) xe(Gb, $b);
                            else if (0 !== (Gb & 33554432)) svGlobal.logger.info("XXX Alt Sec window Notify=" + Gb);
                            else if (0 !== (Gb & 67108864)) {
                                var ac = Gb,
                                    Fd = $b;
                                svGlobal.logger.info("*** -- Alt Sec window Desktop=" + ac);
                                if (0 !== (ac & 1)) svGlobal.logger.info("Desktop non monitored flags=" + ac);
                                else if (0 !== (ac & 32)) {
                                    var bd = Fd.getLittleEndian32();
                                    svGlobal.logger.info("Desktop monitored flags=" + ac + " winId=" + bd);
                                    if (0 !== (ac & 16)) {
                                        var Gd = Fd.getByte();
                                        if (0 < Gd) {
                                            var Hd = F.zOrders;
                                            Hd.length = Gd;
                                            for (var Wc = 0; Wc < Gd; Wc++) Hd[Wc] = Fd.getLittleEndian32(), svGlobal.logger.info("---zorders:" + Hd[Wc])
                                        }
                                    }
                                }
                            } else svGlobal.logger.info("XXX Alt Sec window order flgas=" + Gb);
                            $b.setPosition(ad);
                            break;
                        case 13:
                            nc.getLittleEndian32();
                            break;
                        default:
                            svGlobal.logger.warn("XXX Alt Sec order not implemented:" + oc)
                    }
                    break;
                case 3:
                    var za = a,
                        xc = void 0,
                        Id = void 0,
                        bc = void 0,
                        yc = void 0,
                        xc = za.getLittleEndian16(),
                        bc = za.getLittleEndian16(),
                        Id = za.getByte(),
                        yc = za.getPosition() + xc + 7;
                    switch (Id) {
                        case 0:
                            var Ja = za,
                                cd = Ja.getByte();
                            Ja.skipPosition(1);
                            var Jd = Ja.getByte(),
                                Xc = Ja.getByte(),
                                dd = Ja.getByte(),
                                Yc = Math.floor((dd + 7) / 8),
                                ed = Ja.getLittleEndian16(),
                                fd = Ja.getLittleEndian16(),
                                gd = Ja.getPosition();
                            Ja.skipPosition(ed);
                            for (var Kd = Array(Jd * Xc * Yc), Yd = Kd[0] = 0, Ld = Jd * Yc, Zc = 0; Zc < Xc; Zc++) Yd = gd + (Xc - Zc - 1) * Ld, Ja.copyToByteArray(Kd, Zc * Ld, Yd, Ld);
                            tb.putBitmap(cd, fd, new Jb($c(Kd, Yc), Jd, Xc, 0, 0, 8 * Yc));
                            break;
                        case 1:
                            svGlobal.logger.info("TODO: color cache");
                            break;
                        case 2:
                            var la = za,
                                id = bc,
                                jd = la.getByte();
                            la.getByte();
                            var Md = la.getByte(),
                                Nd = la.getByte(),
                                Zd = la.getByte(),
                                ld = Math.floor((Zd + 7) / 8),
                                md = la.getLittleEndian16(),
                                nd = la.getLittleEndian16(),
                                uc = 0;
                            0 !== (id & 1024) ? uc = md : (la.skipPosition(2), uc = la.getLittleEndian16(), la.skipPosition(2), la.skipPosition(2));
                            var $d = void 0,
                                $d = 1 === ld ? Od(Md, Nd, uc, la.getData(), la.getPosition()) : Ib(Md, Nd, uc, la.getData(), la.getPosition());
                            la.skipPosition(uc);
                            tb.putBitmap(jd, nd, new Jb($d, Md, Nd, 0, 0, Zd));
                            break;
                        case 3:
                            for (var ob = za, od = null, ae = 0, be = 0, ce = 0, de = 0, ee = 0, Pd = 0, Qd = 0, fe = 0, ae = ob.getByte(), be = ob.getByte(), ge = 0; ge < be; ge++) {
                                var ce = ob.getLittleEndian16(),
                                    de = ob.getLittleEndian16(),
                                    ee = ob.getLittleEndian16(),
                                    Pd = ob.getLittleEndian16(),
                                    Qd = ob.getLittleEndian16(),
                                    fe = Qd * Math.floor((Pd + 7) / 8) + 3 & -4,
                                    Xa = od = new ye(ae, ce, de, ee, Pd, Qd, ob.getBytes(fe));
                                if (12 > Xa.font && 256 > Xa.character) {
                                    var he = kc[Xa.font][Xa.character];
                                    he && (he.fontData = null);
                                    kc[Xa.font][Xa.character] = Xa
                                } else throw svGlobal.logger.warn("put font: font=" + Xa.font + " c=" + Xa.character), "Could not put font in cache";
                            }
                            break;
                        case 4:
                            ie(za, bc, !1);
                            break;
                        case 5:
                            ie(za, bc, !0);
                            break;
                        case 8:
                            var wa = za,
                                je = bc & 7,
                                ke = ((bc & 120) >> 3) - 2,
                                le = wa.getLittleEndian16();
                            wa.skipPosition(8);
                            4 != ke && console.log("XXXXXXXX, bpp:" + ke);
                            var pd = wa.getByte();
                            wa.skipPosition(2);
                            var Rd = wa.getByte(),
                                vc = wa.getLittleEndian16(),
                                wc = wa.getLittleEndian16(),
                                me = wa.getLittleEndian32(),
                                cc = [];
                            if (1 == Rd) {
                                Td(wa, pd, vc, wc, Qb);
                                var qd = Qb.getData(),
                                    rd = Qb.getDataSize();
                                cc.length = rd;
                                Mc(qd, 0, cc, vc, wc, 1);
                                tb.putBitmap(je, le, new Jb(cc, vc, wc, 0, 0, 32))
                            } else if (0 == Rd) {
                                var ne = hd(wa.getData(),
                                me, wa.getPosition());
                                cc.length = ne.length;
                                Mc(ne, 0, cc, vc, wc, 1);
                                tb.putBitmap(je, le, new Jb(cc, vc, wc, 0, 0, 32))
                            } else svGlobal.logger.warn("XXX invalid codec id:" + Rd);
                            wa.skipPosition(me);
                            break;
                        default:
                            svGlobal.logger.info("XXX second Order, type=" + Id)
                    }
                    za.setPosition(yc)
            }
            c++
        }
        B.commitPaint()
    }
    function xe(a, b) {
        var c = b.getLittleEndian32();
        if (0 !== (a & 1073741824)) svGlobal.logger.info("XXX rail icon, winId=" + c);
        else if (0 !== (a & 2147483648)) svGlobal.logger.info("XXX rail cache icon, winId=" + c);
        else if (0 !== (a & 536870912)) svGlobal.logger.info("***** delete winId=" + c), F.delWin(c);
        else {
            Z || (Z = !0);
            var k = 0 === (a & 268435456);
            svGlobal.logger.info("\n\n================= winId=" + c + " existed=" + k);
            var h = k ? F.getWinById(c) : new ze(c);
            if (h) {
                0 !== (a & 2) && (h.ownerWinid = b.getLittleEndian32(), svGlobal.logger.info("***** ownerWinid=" + h.ownerWinid));
                0 !== (a & 8) && (h.style = b.getLittleEndian32(), h.extStyle = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " style=" + h.style + " extStyle=" + h.extStyle), svGlobal.logger.info("*****--- WS_POPUP=" + (0 !== (h.style & 2147483648))), svGlobal.logger.info("*****--- WS_DLGFRAME=" + (0 !== (h.style & 4194304))), svGlobal.logger.info("*****--- DS_MODALFRAME=" + (0 !== (h.style & 128))), svGlobal.logger.info("*****--- WS_EX_DLGMODALFRAME=" + (0 !== (h.extStyle & 1))), svGlobal.logger.info("*****--- WS_EX_TOOLWINDOW=" + (0 !== (h.extStyle & 128))), svGlobal.logger.info("*****--- WS_BORDER=" + (0 !== (h.style & 8388608))), svGlobal.logger.info("*****--- WS_CAPTION=" + (0 !== (h.style & 12582912))), svGlobal.logger.info("*****--- WS_OVERLAPPED=" + (0 !== (h.style & 0))), svGlobal.logger.info("*****--- WS_OVERLAPPEDWINDOW=" + (0 !== (h.style & 13565952))), svGlobal.logger.info("*****--- WS_POPUPWINDOW=" + (0 !== (h.style & 2156396544))), svGlobal.logger.info("*****--- WS_SIZEBOX=" + (0 !== (h.style & 262144))), svGlobal.logger.info("*****--- WS_CHILD=" + (0 !== (h.style & 1073741824))), svGlobal.logger.info("*****--- WS_EX_MDICHILD=" + (0 !== (h.extStyle & 64))), svGlobal.logger.info("*****--- WS_EX_LAYERED=" + (0 !== (h.extStyle & 524288))));
                if (0 !== (a & 16)) {
                    h.showState = b.getByte();
                    svGlobal.logger.info("***** winId=" + c + " showState=" + h.showState);
                    var d = h.showState;
                    if (3 === d) h.fillBrowser();
                    else switch (d) {
                        case 2:
                            3 === z.windowState && setTimeout(function () {
                                h.exeCommand(61728)
                            }, 50);
                            break;
                        case 3:
                            setTimeout(function () {
                                h.fillBrowser()
                            }, 50)
                    }
                }
                0 !== (a & 4) && (d = b.getLittleEndian16(), h.titleInfo = b.getUnicodeString(d, !1), svGlobal.logger.info("***** winId=" + c + " title=" + h.titleInfo));
                0 !== (a & 16384) && (h.clientOffsetX = b.getLittleEndian32(), h.clientOffsetY = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " coffX" + h.clientOffsetX + " coffY=" + h.clientOffsetY));
                0 !== (a & 65536) && (h.clientAreaWidth = b.getLittleEndian32(), h.clientAreaHeight = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " cw" + h.clientAreaWidth + " ch=" + h.clientAreaHeight));
                0 !== (a & 131072) && (h.rpContent = b.getLittleEndian32());
                0 !== (a & 262144) && (h.rootParentHandle = b.getLittleEndian32());
                0 !== (a & 2048) && (h.winOffsetX = b.getLittleEndian32(), h.winOffsetY = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " offX" + h.winOffsetX + " offY=" + h.winOffsetY));
                0 !== (a & 32768) && (h.winClientDeltaX = b.getLittleEndian32(),
                h.winClientDeltaY = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " dX" + h.winClientDeltaX + " dY=" + h.winClientDeltaY));
                0 !== (a & 1024) && (h.winWidth = b.getLittleEndian32(), h.winHeight = b.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " w" + h.winWidth + " h=" + h.winHeight));
                0 !== (a & 256) && (c = b.getLittleEndian16(), 0 < c && b.skipPosition(8 * c));
                0 !== (a & 4096) && (h.visibleOffsetX = b.getLittleEndian32(), h.visibleOffsetY = b.getLittleEndian32());
                0 !== (a & 512) && (c = b.getLittleEndian16(), h.numVisibilityRects = c, 0 < c && b.skipPosition(8 * c));
                k || F.addWin(h)
            } else svGlobal.logger.warn("XXX, No win with id:" + c)
        }
    }
    function ze(a) {
        this.id = a;
        this.fillBrowser = function () {
            var b = F.getOwnerSurface(this);
            b ? (b = b.browser, this.resize(0, 0, b.innerWidth, b.innerHeight)) : svGlobal.logger.warn("XXX No browser for " + a)
        };
        this.parent = function () {
            return F.getWinById(this.ownerWinid)
        };
        this.resize = function (a, c, k, h) {
            x.send("8C1" + this.id + "\t" + a + "\t" + c + "\t" + k + "\t" + h)
        };
        this.checkBound = function () {
            var a = F.getOwnerSurface(this);
            if (a) {
                var a = a.browser,
                    c = this.winWidth,
                    k = this.winHeight,
                    h = this.winOffsetX,
                    d = this.winOffsetY;
                if (!(1 > c || 1 > k)) if (h > a.innerWidth || d > a.innerHeight) h > a.innerWidth && (h = Math.floor(a.innerWidth / 2)), d > a.innerHeight && (d = Math.floor(a.innerHeight / 2)), this.resize(h, d, c, k)
            } else svGlobal.logger.warn("no surface for checkBound")
        };
        this.exeCommand = function (b) {
            x.send("8C4" + a + "\t" + b)
        };
        this.activate = function (b) {
            x.send("8C3" + a + "\t" + b)
        };
        this.close = function () {
            this.exeCommand(61536)
        }
    }
    function ad(a, b, c) {
        x.send("8C1" + a.id + "\t0\t0\t" + b + "\t" + c);
        a.winWidth = b;
        a.winHeight = c
    }
    function ie(a, b, c) {
        var k, h, d, l, p, e;
        k = 0;
        h = b & 7;
        p = ((b & 120) >> 3) - 2;
        b = (b & 65408) >> 7;
        0 !== (b & 2) && a.skipPosition(8);
        0 !== (b & 1) ? l = d = Aa.readVar2Bytes(a) : (d = Aa.readVar2Bytes(a), l = Aa.readVar2Bytes(a));
        k = Aa.readVar4Bytes(a);
        e = Aa.readVar2Bytes(a);
        if (c) {
            c = 1 === p ? Od(d, l, k, a.getData(), a.getPosition()) : Ib(d, l, k, a.getData(), a.getPosition());
            a.skipPosition(k);
            if (!c) {
                svGlobal.logger.warn("Failed to decompress bitmap data");
                return
            }
            a = new Jb(c, d, l, 0, 0, 8 * p)
        } else {
            c = Array(d * l * p);
            c[0] = 0;
            var g = a.getPosition(),
                j = 0,
                m = d * p;
            for (k = 0; k < l; k++) j = g + (l - k - 1) * m, a.copyToByteArray(c, k * m, j, m);
            a = new Jb($c(c, p), d, l, 0, 0, 8 * p)
        }
        tb.putBitmap(h, e, a);
        if (0 !== (b & 2)) throw svGlobal.logger.warn("XXX:TODO, persistent"), "Persistent erro";
    }
    function I(a, b, c) {
        var k = 0;
        c ? (k = a.getByte(), 127 < k && (k -= 256), b += k) : b = a.getLittleEndian16();
        return b
    }
    function sd(a) {
        return a & 15
    }
    function wb(a) {
        var b = 0,
            c = 0,
            b = c = a.getByte(),
            c = a.getByte(),
            b = b | c << 8,
            c = a.getByte();
        return b | c << 16
    }
    function Lc(a) {
        var b = 0,
            c = 0,
            k = 0,
            h = 0,
            d = 0,
            l = 0,
            p = 0,
            e = 0,
            g = 0,
            j = 0,
            m = 0,
            q = 0,
            h = 0,
            J, r, v, t;
        v = t = 0;
        J = n;
        r = w;
        for (var b = a.getLittleEndian16(), y = 0; y < b; y++) {
            var c = a.getLittleEndian16(),
                k = a.getLittleEndian16(),
                h = a.getLittleEndian16(),
                d = a.getLittleEndian16(),
                l = a.getLittleEndian16(),
                p = a.getLittleEndian16(),
                j = a.getLittleEndian16(),
                x = Math.floor((j + 7) / 8),
                m = a.getLittleEndian16(),
                q = a.getLittleEndian16(),
                e = h - c + 1,
                g = d - k + 1;
            J > c && (J = c);
            r > k && (r = k);
            v < h && (v = h);
            t < d && (t = d);
            E !== j && (svGlobal.logger.warn("Server limited colour depth to " + j + " bits"), cb(j));
            if (0 === m) {
                d = l * x;
                j = p * d;
                h = Array(j);
                h[0] = 0;
                m = a.getPosition();
                for (q = 0; q < p; q++) fa(a.getData(), m, h, (p - q - 1) * d, d), m += d;
                a.skipPosition(j);
                p = void 0;
                p = 0;
                x = $c(h, x);
                B.setRGBs(c, k, e, g, x, p, l);
                B.postPaint(c, k, e, g)
            } else 0 !== (m & 1024) ? h = q : (a.skipPosition(2), h = a.getLittleEndian16(), a.skipPosition(4)), d = a.getData(), j = h, m = a.getPosition(), 1 === x ? (p = Od(l, p, j, d, m), d = void 0, d = 0, x = $c(p, x), B.setRGBs(c, k, e, g, x, d, l), B.postPaint(c, k, e, g)) : (x = Ib(l, p, j, d, m), 1 > e || 1 > g || (B.setRGBs(c, k, e, g, x, 0, l), B.postPaint(c, k, e, g))), a.skipPosition(h)
        }
        B.commitPaint()
    }
    function Sd() {
        Y = 0;
        P = n - 1;
        X = 0;
        Q = w - 1
    }
    function Ud(a,
    b, c, k, h, d) {
        h = ta(h);
        if (a === c || b === k) {
            var l, p;
            if (b === k) {
                if (b >= X && b <= Q) if (c > a) {
                    if (a < Y && (a = Y), c > P && (c = P), p = c - a, !(1 > p)) {
                        for (l = 0; l < p; l++) Ya(d, B, a + l, b, h);
                        B.postPaint(a, b, p + 1, 1)
                    }
                } else if (c < Y && (c = Y), a > P && (a = P), p = a - c, !(1 > p)) {
                    for (l = 0; l < p; l++) Ya(d, B, c + l, b, h);
                    B.postPaint(c, b, p + 1, 1)
                }
            } else if (a >= Y && a <= P) if (k > b) {
                if (b < X && (b = X), k > Q && (k = Q), p = k - b, !(1 > p)) {
                    for (l = 0; l < p; l++) Ya(d, B, a, b + l, h);
                    B.postPaint(a, b, 1, p + 1)
                }
            } else if (k < X && (k = X), b > Q && (b = Q), p = b - k, !(1 > p)) {
                for (l = 0; l < p; l++) Ya(d, B, a, k + l, h);
                B.postPaint(a, k, 1, p + 1)
            }
        } else {
            var e = Math.abs(c - a),
                g = Math.abs(k - b);
            l = a;
            p = b;
            var j, m, n, q, r, v, t;
            m = c >= a ? j = 1 : j = -1;
            q = k >= b ? n = 1 : n = -1;
            e >= g ? (q = j = 0, v = e, r = e / 2, t = g) : (n = m = 0, v = g, r = g / 2, t = e, e = g);
            if (!(1 > e)) {
                for (g = 0; g <= e; g++) l < Y || (l > P || p < X || p > Q) || Ya(d, B, l, p, h), r += t, r >= v && (r -= v, l += j, p += n), l += m, p += q;
                d = a < c ? a : c;
                h = a > c ? a : c;
                c = b < k ? b : k;
                k = b > k ? b : k;
                0 > h - d || 0 > k - c || B.postPaint(d, c, h - d + 1, k - c + 1)
            }
        }
    }
    function Xd(a, b, c, k, h, d, l, m) {
        var e = 0,
            g = 128,
            e = Math.floor((k - 1) / 8) + 1,
            j, n;
        m = ta(m);
        l = ta(l);
        if (!(b > P || c > Q)) if (j = b + k - 1, j > P && (j = P), k = b < Y ? Y : b, j = j - b + 1, n = c + h - 1, n > Q && (n = Q), h = c < X ? X : c, n = n - c + 1, !(1 > j || 1 > n)) {
            var e = e * (h - c),
                q = B.setRGB;
            if (0 === a) for (a = 0; a < n; a++) {
                for (var t = 0; t < j; t++) 0 === g && (e++, g = 128), b + t >= k && c + a >= h && 0 <= b + t && 0 <= c + a && 0 !== (d[e] & g) && q(b + t, c + a, m), g >>= 1;
                e++;
                g = 128;
                e === d.length && (e = 0)
            } else for (a = 0; a < n; a++) {
                for (t = 0; t < j; t++) 0 === g && (e++, g = 128), b + t >= k && c + a >= h && 0 <= b + t && 0 <= c + a && (0 !== (d[e] & g) ? q(b + t, c + a, m) : q(b + t, c + a, l)), g >>= 1;
                e++;
                g = 128;
                e === d.length && (e = 0)
            }
        }
    }
    function Vd(a, b) {
        var c = a[b[0]++] & 255,
            k = c & 128,
            c = 0 !== (c & 64) ? c | -64 : c & 63;
        0 !== k && (c = c << 8 | a[b[0]++] & 255);
        return c
    }
    function td(a, b, c, k, h) {
        a > P || b > Q || (c = a + c - 1, c > P && (c = P), a < Y && (a = Y), c = c - a + 1, k = b + k - 1, k > Q && (k = Q), b < X && (b = X), k = k - b + 1, 1 > c || 1 > k || (B.fillRect(a, b, c, k, ta(h)), B.postPaint(a, b, c, k)))
    }
    function bd() {
        if (x && T) try {
            x.send("85"), x.close()
        } catch (a) {}
        window && delete window.rdpConnection
    }
    function we(a, b) {
        this.size = a;
        this.data = b
    }
    function ye(a, b, c, k, h, d, l) {
        this.font = a;
        this.character = b;
        this.offset = c;
        this.baseLine = k;
        this.width = h;
        this.height = d;
        this.fontData = l
    }
    function Za(a, b, c, k, h, d, l) {
        for (var m = h * c + k, e = a.setRGB, g = a.getRGB, j = 0; j < l; j++) {
            for (var n = 0; n < d; n++) {
                if (a) {
                    var q = g(k + n, h + j);
                    e(k + n, h + j, ~q & V)
                } else b[m] = ~b[m] & V;
                m++
            }
            m += c - d
        }
    }
    function pc(a, b, c, k, h, d, l, m, e, g, j) {
        if (!(0 > d | 0 > l | 0 > c | 0 > e)) switch (a) {
            case 0:
                m = b.setRGB;
                for (e = k; e < k + d; e++) for (b = h; b < h + l; b++) m(e, b, 0);
                break;
            case 1:
                a = j * e + g;
                c = b.setRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) c(k + d, h + l, ~ (b.getRGB(k + d, h + l) | m[a]) & V);
                    a += e - d
                }
                break;
            case 2:
                a = j * e + g;
                c = b.setRGB;
                b = b.getRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) {
                        var n = b(k + d, h + l);
                        c(k + d, h + l, n & ~m[a] & V);
                        a++
                    }
                    a += e - d
                }
                break;
            case 3:
                Za(b, m, e, g, j, d, l);
                m ? b.setRGBs(k, h, d, l, m, j * e + g,
                e) : b.moveArea(g, j, d, l, k - g, h - j);
                break;
            case 4:
                Za(b, null, c, k, h, d, l);
                xc(b, c, k, h, d, l, m, e, g, j);
                break;
            case 5:
                Za(b, null, c, k, h, d, l);
                break;
            case 6:
                a = j * e + g;
                c = b.setRGB;
                b = b.getRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) n = b(k + j, h + g), c(k + j, h + g, n ^ m[a] & V), a++;
                    a += e - d
                }
                break;
            case 7:
                a = j * e + g;
                c = b.setRGB;
                b = b.getRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) n = b(k + j, h + g), c(k + j, h + g, ~ (n & m[a]) & V), a++;
                    a += e - d
                }
                break;
            case 8:
                xc(b, c, k, h, d, l, m, e, g, j);
                break;
            case 9:
                a = j * e + g;
                c = b.setRGB;
                b = b.getRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) n = b(k + j, h + g), c(k + j, h + g,
                    n ^ ~m[a] & V), a++;
                    a += e - d
                }
                break;
            case 10:
                break;
            case 11:
                a = j * e + g;
                c = b.setRGB;
                b = b.getRGB;
                for (g = 0; g < l; g++) {
                    for (j = 0; j < d; j++) n = b(k + j, h + g), c(k + j, h + g, n | ~m[a] & V), a++;
                    a += e - d
                }
                break;
            case 12:
                m ? b.setRGBs(k, h, d, l, m, j * e + g, e) : b.moveArea(g, j, d, l, k - g, h - j);
                break;
            case 13:
                Za(b, null, c, k, h, d, l);
                yc(b, c, k, h, d, l, m, e, g, j);
                break;
            case 14:
                yc(b, c, k, h, d, l, m, e, g, j);
                break;
            case 15:
                m = b.setRGB;
                for (e = k; e < k + d; e++) for (b = h; b < h + l; b++) m(e, b, V);
                break;
            default:
                svGlobal.logger.warn("unsupported opcode: " + a)
        }
    }
    function Ya(a, b, c, k, h) {
        if (b) {
            var d = b.getRGB(c,
            k);
            switch (a) {
                case 0:
                    b.setRGB(c, k, 0);
                    break;
                case 1:
                    b.setRGB(c, k, ~ (d | h) & V);
                    break;
                case 2:
                    b.setRGB(c, k, d & ~h & V);
                    break;
                case 3:
                    b.setRGB(c, k, ~h & V);
                    break;
                case 4:
                    b.setRGB(c, k, (~d & h) * V);
                    break;
                case 5:
                    b.setRGB(c, k, ~d & V);
                    break;
                case 6:
                    b.setRGB(c, k, d ^ h & V);
                    break;
                case 7:
                    b.setRGB(c, k, ~d & h & V);
                    break;
                case 8:
                    b.setRGB(c, k, d & h & V);
                    break;
                case 9:
                    b.setRGB(c, k, d ^ ~h & V);
                    break;
                case 10:
                    break;
                case 11:
                    b.setRGB(c, k, d | ~h & V);
                    break;
                case 12:
                    b.setRGB(c, k, h);
                    break;
                case 13:
                    b.setRGB(c, k, (~d | h) & V);
                    break;
                case 14:
                    b.setRGB(c, k, d | h & V);
                    break;
                case 15:
                    b.setRGB(c,
                    k, V);
                    break;
                default:
                    svGlobal.logger.warn("unsupported pixel opcode: " + a), b.setRGB(c, k, h)
            }
        }
    }
    function xc(a, b, c, k, h, d, l, m, e, g) {
        b = g * m + e;
        e = a.setRGB;
        a = a.getRGB;
        for (g = 0; g < d; g++) {
            for (var j = 0; j < h; j++) {
                var n = a(c + j, k + g);
                e(c + j, k + g, n & l[b] & V);
                b++
            }
            b += m - h
        }
    }
    function yc(a, b, c, k, h, d, l, m, e, g) {
        b = g * m + e;
        e = a.setRGB;
        a = a.getRGB;
        for (g = 0; g < d; g++) {
            for (var j = 0; j < h; j++) {
                var n = a(c + j, k + g);
                e(c + j, k + g, n | l[b] & V);
                b++
            }
            b += m - h
        }
    }
    function Wd(a, b) {
        if (12 > a && 256 > b) {
            var c = kc[a][b];
            if (c) return c
        }
        return null
    }
    function oc(a) {
        return 20 > a && (a = ub[a]) ? a : null
    }
    function Oc(a, b, c, k) {
        switch (b) {
            case 16:
                b = a >> 8 & 248;
                var h = a >> 3 & 252;
                a = a << 3 & 255;
                c[k] = b | b >> 5;
                c[k + 1] = h | h >> 6;
                c[k + 2] = a | a >> 5;
                c[k + 3] = 255;
                break;
            case 15:
                b = a >> 7 & 248;
                h = a >> 2 & 248;
                a = a << 3 & 255;
                c[k] = b | b >> 5;
                c[k + 1] = h | h >> 5;
                c[k + 2] = a | a >> 5;
                c[k + 3] = 255;
                break;
            case 8:
                c[k] = ha[0][a];
                c[k + 1] = ha[1][a];
                c[k + 2] = ha[2][a];
                c[k + 3] = 255;
                break;
            case 32:
                c[k] = a & 255, c[k + 1] = a >> 8 & 255, c[k + 2] = a >> 16 & 255, c[k + 3] = a >> 24 & 255;
            default:
                c[k] = a & 255, c[k + 1] = a >> 8 & 255, c[k + 2] = a >> 16 & 255, c[k + 3] = 255
        }
    }
    function cd(a, b, c) {
        return a = 0 | a[b + c] & 255
    }
    function $c(a, b) {
        var c = a.length / b >> 0,
            k = Array(c);
        k[0] = 0;
        var h = ta;
        switch (b) {
            case 1:
                for (var d = 0; d < c; d++) k[d] = h(a[d] & 255);
                break;
            case 2:
                for (d = 0; d < c; d++) k[d] = h((a[2 * d + 1] & 255) << 8 | a[2 * d] & 255);
                break;
            default:
                for (d = 0; d < c; d++) k[d] = h((a[d * b + 2] & 255) << 16) | (a[d * b + 1] & 255) << 8 | a[d * b] & 255
        }
        return k
    }
    function Od(a, b, c, k, h) {
        var d = -1,
            l = 0;
        c += h;
        var m = 0,
            e = 0,
            g = 0,
            j = a,
            n = -1,
            q = 0,
            t = e = 0,
            r = 0,
            v = g = 0,
            x = 4294967295,
            y = !1,
            z = !1,
            u = !1,
            s = Array(a * b);
        for (s[0] = 0; h < c;) {
            q = 0;
            e = k[h++] & 255;
            m = e >> 4;
            switch (m) {
                case 12:
                case 13:
                case 14:
                    m -= 6;
                    e &= 15;
                    g = 16;
                    break;
                case 15:
                    m = e & 15;
                    9 > m ? (e = k[h++] & 255, e |= (k[h++] & 255) << 8) : e = 11 > m ? 8 : 1;
                    g = 0;
                    break;
                default:
                    m >>= 1, e &= 31, g = 32
            }
            0 !== g && (u = 2 === m || 7 === m, 0 === e ? e = u ? (k[h++] & 255) + 1 : (k[h++] & 255) + g : u && (e <<= 3));
            switch (m) {
                case 0:
                    n === m && !(j === a && -1 === d) && (y = !0);
                    break;
                case 8:
                    t = k[h++] & 255;
                case 3:
                    r = k[h++] & 255;
                    break;
                case 6:
                case 7:
                    x = k[h++];
                    m -= 5;
                    break;
                case 9:
                    v = 3;
                    m = 2;
                    q = 3;
                    break;
                case 10:
                    v = 5, m = 2, q = 5
            }
            n = m;
            for (g = 0; 0 < e;) {
                if (j >= a) {
                    if (0 >= b) throw "Decompressing bitmap failed! Height = " + b;
                    j = 0;
                    b--;
                    d = l;
                    l = 0 + b * a
                }
                switch (m) {
                    case 0:
                        y && (s[l + j] = -1 === d ? x & 255 : (s[d + j] ^ x & 255) & 255, y = !1, e--,
                        j++);
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 0, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = s[d + j], e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = s[d + j], e--, j++
                        }
                        break;
                    case 1:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = x & 255, e--, j++;
                            for (; 0 < e && j < a;) s[l + j] = x & 255, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) {
                                var D = cd(s, d, j) ^ x;
                                s[l + j] = D & 255;
                                e--;
                                j++
                            }
                            for (; 0 < e && j < a;) u = cd(s, d, j) ^ x, s[l + j] = u & 255, e--, j++
                        }
                        break;
                    case 2:
                        if (-1 === d) {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) g <<= 1, g &= 255, 0 === g && (v = 0 !== q ? q & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? x & 255 : 0, e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255, 0 === g && (v = 0 !== q ? q & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? x & 255 : 0, e--, j++
                        } else {
                            for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) g <<= 1, g &= 255, 0 === g && (v = 0 !== q ? q & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? (s[d + j] ^ x & 255) & 255 : s[d + j], e--, j++;
                            for (; 0 < e && j < a;) g <<= 1, g &= 255, 0 === g && (v = 0 !== q ? q & 255 : k[h++], g = 1), s[l + j] = 0 !== (v & g) ? (s[d + j] ^ x & 255) & 255 : s[d + j], e--, j++
                        }
                        break;
                    case 3:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = r & 255, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = r & 255, e--, j++;
                        break;
                    case 4:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = k[h++], e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = k[h++], e--, j++;
                        break;
                    case 8:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) z ? (s[l + j] = r & 255, z = !1) : (s[l + j] = t & 255, z = !0, e++), e--, j++;
                        for (; 0 < e && j < a;) z ? (s[l + j] = r & 255, z = !1) : (s[l + j] = t & 255, z = !0, e++), e--, j++;
                        break;
                    case 13:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 255, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = 255, e--, j++;
                        break;
                    case 14:
                        for (; 0 !== (e & -8) && j + 8 < a;) for (u = 0; 8 > u; u++) s[l + j] = 0, e--, j++;
                        for (; 0 < e && j < a;) s[l + j] = 0, e--, j++;
                        break;
                    default:
                        throw "Unimplemented decompress opcode " + m;
                }
            }
        }
        return s
    }
    function Hc() {
        this.orderType = 0;
        this.bounds = new BoundsOrder;
        this.destBlt = new DestBltOrder;
        this.patBlt = new PatBltOrder;
        this.screenBlt = new ScreenBltOrder;
        this.line = new LineOrder;
        this.rectangle = new RectangleOrder;
        this.deskSave = new DeskSaveOrder;
        this.memBlt = new MemBltOrder;
        this.polyLine = new PolyLineOrder;
        this.text2 = new Text2Order
    }
    sessionStorage && sessionStorage.clear();
    this.displayMsg = this.reconnectOnResize = !0;
    this.sessionTimeout = 3E5;
    this.appTimeout = 800;
    this.reconnectTimes = 0;
    this.windowState = 3;
    this.setTitle = this.notification = this.openLink = !0;
    this.audioBuffer = 0;
    this.sessionInfo = {};
    this.mode = 0;
    var na = null,
        z = this,
        Jc = !0,
        ab = null,
        fb = null,
        dc = "object" === typeof m ? m : null,
        gb = "object" === typeof m || 0 < m.indexOf("/PLAY?");
    gb ? (this.mode = 1, dc ? m = "" : (n = screen.width, w = screen.height), m += "&touchpad=on", this.reconnectOnResize = !1) : 0 < m.indexOf("/JOIN?") && (this.mode = 2, this.reconnectOnResize = !1);
    n || (n = window.innerWidth,
    w = window.innerHeight);
    var W = hi5.tool.queryToObj(m.substring(m.indexOf("?") + 1));
    W.minWidth && n < W.minWidth && (n = W.minWidth);
    W.minHeight && w < W.minHeight && (w = W.minHeight);
    if (hi5.appcfg) {
        var U = hi5.appcfg;
        "undefined" !== typeof U.displayMsg && (this.displayMsg = U.displayMsg);
        "undefined" !== typeof U.sessionTimeout && (this.sessionTimeout = U.sessionTimeout);
        "undefined" !== typeof U.appTimeout && (this.appTimeout = U.appTimeout);
        "undefined" !== typeof U.reconnectOnResize && (this.reconnectOnResize = U.reconnectOnResize);
        "undefined" !== typeof U.reconnectTimes && (this.reconnectTimes = U.reconnectTimes);
        "undefined" !== typeof U.windowState && (this.windowState = U.windowState);
        "undefined" !== typeof U.openLink && (this.openLink = U.openLink);
        "undefined" !== typeof U.notification && (this.notification = U.notification);
        "undefined" !== typeof U.setTitle && (this.setTitle = U.setTitle);
        "undefined" !== typeof U.audioBuffer && (this.audioBuffer = U.audioBuffer);
        "boolean" === typeof U.useWSS && (m = (hi5.appcfg.useWSS ? "wss" : "ws") + m.substring(m.indexOf("://")))
    }
    W.vmid && (this.reconnectOnResize = !1);
    this.displayMsg || (this.notification = !1);
    n = parseInt(n, 10);
    w = parseInt(w, 10);
    E = E ? parseInt(E, 10) : 16;
    this.server = W.server;
    this.port = parseInt(W.port, 10);
    var fa = hi5.Arrays.arraycopy,
        qa = hi5.Arrays.fill,
        Ka = hi5.graphic.Rectangle,
        sa = {
            table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
            pad: "=",
            enc: function (a, b) {
                var c = "",
                    k = this.table,
                    h = this.pad,
                    d;
                b || (b = a.length);
                var l = b - 1;
                for (d = 0; d < l; d += 3) c += k[a[d] >> 2], c += k[((a[d] & 3) << 4) + (a[d + 1] >> 4)], c += k[((a[d + 1] & 15) << 2) + (a[d + 2] >> 6)], c += k[a[d + 2] & 63];
                b % 3 && (d = b - b % 3, c += k[a[d] >> 2], 2 === b % 3 ? (c += k[((a[d] & 3) << 4) + (a[d + 1] >> 4)], c += k[(a[d + 1] & 15) << 2], c += h) : (c += k[(a[d] & 3) << 4], c += h + h));
                return c
            },
            binaries: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, -1, -1, -1, -1, -1],
            dec: function (a, b) {
                var c = this.binaries,
                    k = this.pad,
                    h, d, l, m, e, g = 0,
                    j = 0;
                h = a.indexOf("=") - b;
                var n = a.length;
                0 > h && (h = n - b);
                h = Array(3 * (h >> 2) + Math.floor(h % 4 / 1.5));
                d = h[0] = 0;
                for (l = b; l < n; l++) m = c[a.charCodeAt(l) & 127], e = a.charAt(l) === k, -1 === m ? 0 < svGlobal.log && console.error("Illegal character '" + a.charCodeAt(l) + "'") : (j = j << 6 | m, g += 6, 8 <= g && (g -= 8, e || (h[d++] = j >> g & 255), j &= (1 << g) - 1));
                if (g) throw "Invalid base64 encoding";
                return h
            }
        }, Da = new function () {
            function a(a) {
                a = (a & 1431655765) << 1 | a >>> 1 & 1431655765;
                a = (a & 858993459) << 2 | a >>> 2 & 858993459;
                a = (a & 252645135) << 4 | a >>> 4 & 252645135;
                if (0 === a >>> 8) return a;
                a = (a & 16711935) << 8 | a >>> 8 & 16711935;
                return 0 === a >>> 16 ? a : (a & 65535) << 16 | a >>> 16 & 65535
            }
            function b(a, b, g, e) {
                var j, h = 0,
                    m = 0,
                    p, n, q, r, t = 0 !== (e & 1),
                    f = k;
                if (0 === (e & 32)) return d = 0, l = g, 0;
                0 !== (e & 64) && (c = 0);
                if (0 !== (e & 128)) {
                    for (e = 65536; 0 <= --e;) f[e] = 0;
                    c = 0
                }
                l = d = 0;
                d = q = p = e = c;
                if (0 === g) return 0;
                g += m;
                do {
                    if (0 === h) {
                        if (m >= g) break;
                        e = a[b + m++] << 24;
                        h = 8
                    }
                    if (0 <= e) {
                        if (8 > h) {
                            if (m >= g) {
                                if (0 !== e) return -1;
                                break
                            }
                            e |= a[b + m++] << 24 - h;
                            h += 8
                        }
                        if (65536 <= p) return -1;
                        f[p++] = e >>> 24 & 255;
                        e <<= 8;
                        h -= 8
                    } else {
                        e <<= 1;
                        if (0 === --h) {
                            if (m >= g) return -1;
                            e = a[b + m++] << 24;
                            h = 8
                        }
                        if (0 <= e) {
                            if (8 > h) {
                                if (m >= g) return -1;
                                e |= a[b + m++] << 24 - h;
                                h += 8
                            }
                            if (65536 <= p) return -1;
                            f[p++] = (e >>> 24 | 128) & 255;
                            e <<= 8;
                            h -= 8
                        } else {
                            e <<= 1;
                            if (--h < (t ? 3 : 2)) {
                                if (m >= g) return -1;
                                e |= a[b + m++] << 24 - h;
                                h += 8
                            }
                            if (t) switch (e >>> 29) {
                                case 7:
                                    for (; 9 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    e <<= 3;
                                    j = e >>> 26;
                                    e <<= 6;
                                    h -= 9;
                                    break;
                                case 6:
                                    for (; 11 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    e <<= 3;
                                    j = (e >>> 24) + 64;
                                    e <<= 8;
                                    h -= 11;
                                    break;
                                case 5:
                                case 4:
                                    for (; 13 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    e <<= 2;
                                    j = (e >>> 21) + 320;
                                    e <<= 11;
                                    h -= 13;
                                    break;
                                default:
                                    for (; 17 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    e <<= 1;
                                    j = (e >>> 16) + 2368;
                                    e <<= 16;
                                    h -= 17
                            } else switch (e >>> 30) {
                                case 3:
                                    if (8 > h) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h;
                                        h += 8
                                    }
                                    e <<= 2;
                                    j = e >>> 26;
                                    e <<= 6;
                                    h -= 8;
                                    break;
                                case 2:
                                    for (; 10 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    e <<= 2;
                                    j = (e >>> 24) + 64;
                                    e <<= 8;
                                    h -= 10;
                                    break;
                                default:
                                    for (; 14 > h; h += 8) {
                                        if (m >= g) return -1;
                                        e |= a[b + m++] << 24 - h
                                    }
                                    j = (e >>> 18) + 320;
                                    e <<= 14;
                                    h -= 14
                            }
                            if (0 === h) {
                                if (m >= g) return -1;
                                e = a[b + m++] << 24;
                                h = 8
                            }
                            if (0 <= e) n = 3, e <<= 1, h--;
                            else {
                                r = t ? 14 : 11;
                                do {
                                    e <<= 1;
                                    if (0 === --h) {
                                        if (m >= g) return -1;
                                        e = a[b + m++] << 24;
                                        h = 8
                                    }
                                    if (0 <= e) break;
                                    if (0 === --r) return -1
                                } while (1);
                                n = (t ? 16 : 13) - r;
                                e <<= 1;
                                if (--h < n) for (; h < n; h += 8) {
                                    if (m >= g) return -1;
                                    e |= a[b + m++] << 24 - h
                                }
                                r = n;
                                n = e >>> 32 - r & ~ (-1 << r) | 1 << r;
                                e <<= r;
                                h -= r
                            }
                            if (65536 <= p + n) return -1;
                            j = p - j & (t ? 65535 : 8191);
                            do f[p++] = f[j++];
                            while (0 !== --n)
                        }
                    }
                } while (1);
                c = p;
                d = q;
                l = p - q;
                return 0
            }
            var c = 0,
                k = Array(65536);
            k[0] = 0;
            qa(k, 0, 65536, 0);
            var h = Array(8);
            qa(h, 0, 8, 0);
            var d = 0,
                l = 0,
                m = [6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 8, 9, 9, 9, 9, 8, 8, 9,
                9, 9, 9, 9, 9, 8, 9, 9, 10, 9, 9, 9, 9, 9, 9, 9, 10, 9, 10, 10, 10, 9, 9, 10, 9, 10, 9, 10, 9, 9, 9, 10, 10, 9, 10, 9, 9, 8, 9, 9, 9, 9, 10, 10, 10, 9, 9, 10, 10, 10, 10, 10, 10, 9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 9, 7, 9, 9, 10, 9, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 9, 10, 10, 10, 9, 10, 10,
                10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 8, 9, 9, 10, 9, 10, 10, 10, 9, 10, 10, 10, 9, 9, 8, 7, 13, 13, 7, 7, 10, 7, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 5, 6, 7, 7],
                e = [123, 65311, 65293, 65063, 65024, 65285, 65303, 65128, 197, 65031, 65299, 65216, 65288, 65048, 65307, 65203, 65027, 162, 65090, 65296, 65035, 65026, 65169, 65305, 65152, 233, 65082, 65301, 65042, 87, 65239, 65309, 65294, 65077, 65129, 65314, 65304, 65146, 65025, 65315, 65300, 65268, 65204, 65033, 65308, 65220, 65289, 65120, 65136, 65298, 65029, 65170,
                65185, 65306, 65039, 65287, 65110, 65302, 65282, 65240, 65256, 65310, 65053, 59, 65535, 65286, 65535, 65137, 65161, 65535, 65535, 65068, 65067, 65056, 65535, 65211, 65231, 65032, 65535, 65248, 65037, 65535, 65177, 65535, 65028, 65194, 65097, 65535, 65047, 65121, 65247, 65535, 65279, 65270, 65100, 65535, 65535, 65159, 65535, 65316, 65535, 65084, 65138, 65535, 65535, 65230, 65535, 65278, 65535, 65059, 65212, 65034, 65193, 65535, 65041, 65535, 65154, 65535, 65030, 65178, 65269, 65535, 65058, 65101, 65119, 65535, 65283, 65249, 65535, 65226, 65228, 65535, 65049, 65535, 65207, 65535,
                65535, 65155, 65065, 65535, 65535, 65535, 65132, 65535, 65261, 65535, 65535, 65094, 65116, 65045, 65535, 65243, 65190, 65535, 65535, 65092, 65535, 65036, 65535, 65173, 65276, 65535, 65535, 65208, 5833, 65535, 65264, 65535, 65080, 65535, 65535, 65133, 65150, 65535, 65535, 65535, 65535, 65115, 65244, 65535, 65535, 65260, 65095, 65055, 65535, 65151, 65174, 65535, 65535, 65189, 65535, 65040, 65088, 65074, 65215, 65535, 65535, 65236, 65265, 65535, 65535, 65535, 65141, 65535, 65535, 65165, 65073, 65535, 65125, 65051, 65535, 65252, 65275, 65535, 65535, 65106, 65535, 65038, 65535, 65181,
                65199, 65535, 65535, 65105, 65235, 65535, 65312, 65535, 65071, 65535, 65535, 65217, 65164, 65535, 65535, 65535, 65087, 65535, 65535, 65142, 65535, 65274, 65107, 65061, 65535, 65124, 65253, 65535, 65535, 65198, 65535, 65043, 65535, 65160, 65182, 65535, 65091, 65535, 65535, 65188, 65171, 65535, 65535, 65535, 65085, 65535, 65535, 65259, 65241, 65535, 65044, 65114, 65535, 65064, 65149, 65535, 65535, 65130, 65535, 65535, 65281, 65222, 65224, 65535, 65535, 65205, 65535, 65535, 65535, 65172, 65144, 65535, 65535, 65535, 65187, 65535, 65535, 65242, 65112, 65535, 65054, 65093, 65258, 65535,
                65131, 65535, 65535, 65079, 65535, 65535, 65535, 65148, 65206, 65535, 65535, 65272, 65535, 65535, 65535, 65223, 65179, 65535, 65535, 65535, 65104, 65535, 65535, 65197, 65250, 65535, 65050, 65123, 65102, 65535, 65535, 65273, 65535, 65139, 65535, 65535, 65535, 65072, 65163, 65535, 65535, 65213, 65070, 256, 65535, 65262, 65234, 65535, 65535, 65535, 65196, 65535, 65535, 65180, 65156, 65535, 65060, 65103, 65271, 65535, 65535, 65251, 65122, 65535, 65535, 65535, 65535, 65162, 65140, 65535, 65535, 65086, 65535, 65535, 65535, 65233, 65214, 65535, 65535, 65069, 65535, 65098, 65267, 65535,
                65535, 65245, 65118, 65046, 65535, 65096, 65192, 65535, 65195, 65175, 65535, 65535, 65232, 65535, 65535, 65229, 65209, 65535, 65535, 65535, 65066, 65535, 65535, 65158, 65134, 65535, 65535, 65535, 65246, 65535, 65535, 65117, 65099, 65057, 65535, 65263, 65176, 65535, 65535, 65153, 65535, 65535, 65535, 65191, 65535, 65210, 65277, 65535, 65535, 65535, 65227, 65535, 65535, 65135, 65081, 65535, 65535, 65535, 65157, 65535, 268, 65254, 65127, 65052, 65535, 65108, 65202, 65535, 65535, 65183, 65535, 65535, 65535, 65113, 65201, 65535, 65218, 65535, 65535, 65078, 65266, 65535, 65535, 65238,
                65143, 65535, 65535, 65535, 65075, 65535, 65535, 65167, 65109, 65062, 266, 65284, 65255, 65535, 289, 65126, 65535, 65535, 65535, 65200, 65184, 65535, 271, 65168, 65535, 65535, 65237, 65535, 65535, 65219, 65076, 65535, 65535, 65535, 65166, 65535, 273, 65145, 65089, 267],
                g = [511, 0, 508, 448, 494, 347, 486, 482],
                j = [4, 2, 3, 4, 3, 4, 4, 5, 4, 5, 5, 6, 6, 7, 7, 8, 7, 8, 8, 9, 9, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                n = [4065, 4064, 4066, 4072, 14, 4069, 4068, 4074, 4081, 4067, 21, 4071, 4079, 70, 4080, 4077, 4095, 4087, 4091, 25, 4093, 4084, 300, 4075, 4094, 4086, 4090, 137, 4092, 4083, 4088, 4082],
                q = [0, 4, 10, 19],
                t = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15],
                r = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 32769, 49153, 65537],
                v = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 8, 8, 14, 14],
                x = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 22, 26, 30, 34, 42, 50, 58, 66, 82, 98, 114, 130, 194, 258, 514, 2, 2];
            this.reset = function () {
                c = 0;
                k = Array(65536);
                l = d = k[0] = 0
            };
            this.getData = function () {
                var a = new RdpBuffer(k, d, l);
                a.markEnd(d + l);
                return a
            };
            this.getDecompressedLength = function () {
                return l
            };
            this.dec = function (y, z, u, s) {
                if (2 === (s & 15)) {
                    var D = k,
                        A = c,
                        w = 0,
                        F = 0,
                        B = 0,
                        E = 0,
                        I = z,
                        K = 0,
                        f = 0,
                        H = 0,
                        C, G = 0;
                    l = 0;
                    d = A;
                    0 !== (s & 64) && (fa(D, A - 32768, D, 0, 32768), d = c = A = 32768);
                    0 !== (s & 128) && (A = 0, qa(D, 0, 65536, 0), h.fill(0), d = 0);
                    if (32 !== (s & 32)) fa(y, 0, D, A, u), A += u, l = A - c;
                    else {
                        C = 0;
                        for (z += u; I < z && !(G = y[I++] & 255, w |= G << C, f += 8, C += 8, 32 <= C););
                        w = a(w);
                        I < z ? (K = a(y[I++] & 255) & 255, H = 8) : H = 0;
                        for (; 8 <= f;) {
                            F = 0;
                            for (C = 5; 13 >= C && !(12 !== C && (G = a(w & 4294967295 << 32 - C), B = e[G & 511 ^ G >>> 9 ^ G >>> 4 ^ G >>> 7], 0 !== (B ^ G) >>> 9 ? G = B & 511 : (B = e, E = g, u = void 0,
                            u = (G >>> 8 ^ G & 255) >>> 2 & 15, 0 !== G >>> 9 && (u = ~u), u &= 65535, G = B[E[u % 12]]), C === m[G])); C++);
                            w <<= C;
                            f -= C;
                            if (256 > G) D[A++] = G & 255;
                            else if (256 < G && 289 > G) {
                                B = G - 257;
                                C = t[B];
                                F = r[B] - 1;
                                0 !== C && (F += a(w & 4294967295 << 32 - C));
                                B = h;
                                E = F;
                                u = B[2] | B[3] << 16;
                                u <<= 16;
                                B[2] = u & 65535;
                                B[3] = u >>> 16 & 65535;
                                var L = B[0] | B[1] << 16;
                                u |= L >>> 16;
                                B[2] = u & 65535;
                                B[3] = u >>> 16 & 65535;
                                L = L << 16 | E;
                                B[0] = L & 65535;
                                B[1] = L >>> 16 & 65535;
                                w <<= C;
                                f -= C
                            } else if (288 < G && 293 > G) B = G - 289, F = h[B], 0 !== B && (C = h, E = C[0], C[0] = C[B], C[B] = E);
                            else if (256 === G) break;
                            for (C = 32 - f; 0 < C;) if (H < C) G = K >>> 8 - H, w |= G << 32 - f - H, f += H, C -= H, I < z ? (K = a(y[I++] & 255) & 255, H = 8) : H = C = 0;
                            else {
                                H > C ? (w |= K >>> 8 - C, K <<= C, K &= 255, H -= C, f = 32) : (w |= K >>> 8 - C, f = 32, I < z ? (K = a(y[I++] & 255) & 255, H = 8) : H = 0);
                                break
                            }
                            if (0 !== F) {
                                for (C = 2; 9 >= C && !(G = a(w & 4294967295 << 32 - C), B = n[G & 31 ^ G >>> 5 ^ G >>> 9], 0 !== (B ^ G) >>> 5 ? G = B & 31 : (B = n, E = q, u = void 0, u = G >>> 4 & 15, G = B[E[(u ^ u >>> 2 ^ u >>> 3) & 3]]), C === j[G]); C++);
                                w <<= C;
                                f -= C;
                                C = v[G];
                                B = x[G];
                                0 !== C && (B += a(w & 4294967295 << 32 - C));
                                w <<= C;
                                f -= C;
                                E = A - F;
                                C = B > F ? F : B;
                                for (G = 0; 0 < C;) D[A++] = D[E++], C--;
                                for (; B > F;) G = G >= F ? 0 : G, D[A++] = D[E + G++], B--;
                                for (C = 32 - f; 0 < C;) if (H < C) G = K >>> 8 - H, w |= G << 32 - f - H, f += H, C -= H, I < z ? (K = a(y[I++] & 255) & 255, H = 8) : H = C = 0;
                                else {
                                    H > C ? (w |= K >>> 8 - C, K <<= C, K &= 255, H -= C, f = 32) : (w |= K >>> 8 - C, f = 32, I < z ? (K = a(y[I++] & 255) & 255, H = 8) : H = 0);
                                    break
                                }
                            }
                        }
                        l = 0 !== (s & 128) ? A : A - c
                    }
                    c = A;
                    return 0
                }
                return b(y, z, u, s)
            }
        }, te = 0 < m.indexOf("nocurosr=on"),
        Z = 0 < m.indexOf("startProgram=app"),
        Ob = 0 < m.indexOf("mapDisk=on"),
        ma = null;
    Z && (this.reconnectOnResize = !1);
    hi5.browser.isTouch && Math.max(n, w) > Math.max(window.innerWidth, window.innerHeight) && (this.reconnectOnResize = !1);
    this.isRemoteApp = function () {
        return Z
    };
    if (Z) if (hi5.browser.isTouch) {
        var Ae = Math.max(window.innerWidth, window.innerHeight),
            Be = Math.max(n, w),
            pb = Math.max(Ae, Be);
        n < pb && (n = pb);
        w < pb && (w = pb)
    } else n = screen.width, w = screen.height, 0 === z.windowState && (w -= window.outerHeight - window.innerHeight + 25);
    else n &= -4, w &= -4;
    var x = null,
        Na = null,
        T = !1,
        La = !1,
        ga = new function (a) {
            var b = null;
            this.available = !1;
            this.delay = a;
            "webkitAudioContext" in window ? (b = new webkitAudioContext, this.available = !0) : "AudioContext" in window ? (b = new AudioContext, this.available = !0) : hi5.browser.isFirefox && (this.available = !0);
            this.getBuffer = function (a) {
                return b.createBuffer(2, a, H)
            };
            var c = 0;
            this.playBuffer = function (k) {
                var h = b.createBufferSource();
                h.buffer = k;
                h.connect(b.destination);
                var d = b.currentTime,
                    l = 0 < c ? c : d + a;
                l < d && (l = d + a);
                c = l + k.duration;
                h.noteOn(l);
                return c - d
            };
            this.iOSFix = function () {
                if (hi5.browser.isTouch && hi5.browser.isSafari) {
                    var a = this.getBuffer(1024),
                        c = b.createBufferSource();
                    c.buffer = a;
                    c.connect(b.destination);
                    c.noteOn(0)
                }
            }
        }(z.audioBuffer),
        B = Mb(n, w);
    this.setAudioBuffer = function (a) {
        z.audioBuffer = a;
        ga.delay = a;
        Ma && (Ma.delay = a)
    };
    for (var Ma = null, kc = Array(12), ec = 0; 12 > ec; ec++) kc[ec] = Array(256);
    var Pb = Array(256),
        Y = 0,
        X = 0,
        P = n - 1,
        Q = w - 1,
        ha = null,
        db = null,
        xa, kd = 0;
    window.rdpConnection = this;
    var ta = Hb,
        Ib = Bc;
    cb(E);
    this.running = function () {
        return T
    };
    this.hide = function () {
        F && F.hide()
    };
    var tb = new gc;
    this.getFileUrl = function (a) {
        return eb() + "/DOWNLOAD?s=" + db + "&f=" + a
    };
    var Ca = new function () {
            this.ws = null;
            this.clipRequired = this.prePaste = !1;
            this.send = function (a) {
                T && this.ws.send(a)
            };
            var a = null;
            this.getAppInfo = function () {
                return xa
            };
            this.onresize = function (b) {
                var c = b.target.innerWidth,
                    k = b.target.innerHeight - 26;
                Z ? b.target.svSurface && (b = b.target.svSurface.railWin.getMain(F.zOrders)) && ad(b, c, k) : !hi5.browser.isTouch && !hi5.browser.isOpera && (z.reconnectOnResize && T) && (a && (clearTimeout(a), a = null), a = setTimeout(function () {
                    4 > Math.abs(c - n) && 4 > Math.abs(k - w) || (svGlobal.logger.warn("w:" + c + " ww:" + n + " h:" + k + " hh:" + w), Kb(c, k))
                }, 1E3))
            };
            this.onorientationchange = function (a) {
                if (z.reconnectOnResize) Kb(window.innerWidth, window.innerHeight);
                else if (Z && a.target.svSurface) {
                    var c = a.target.svSurface.railWin.getMain(F.zOrders);
                    c && ad(c, a.target.innerWidth, a.target.innerHeight)
                }
            };
            this.getClipData = ld;
            this.setDataFromClip = function (a) {
                Na = a;
                this.prePaste && this.clipRequired && (x.send("881" + a), Na = "", this.clipRequired = !1);
                this.prePaste = !1
            };
            this.onfocus = function (a) {
                if (Z && a.target.svSurface.railWin) {
                    var c = a.target.svSurface.railWin.getTopWin(F.zOrders);
                    c && x && (c.activate(1), svGlobal.logger.info("Activate win:" + c.id), ab = a.target.svSurface.context)
                }
            };
            this.fileCallback = [];
            this.getShareFiles = function (a, c) {
                La && (this.ws.send("3A5" + a), this.fileCallback.push(c))
            };
            this.notifyFiles = function (a) {
                for (var c = this.fileCallback, k = 0, h = c.length; k < h; k++) c[k](a)
            };
            this.getFile = function (a) {
                z.reconnectOnResize = !1;
                window.open(z.getFileUrl(a))
            };
            this.getFileLink = function (a) {
                return eb() + "/DOWNLOAD?s=" + db + "&f=" + a
            };
            this.getGateway = function () {
                return m
            };
            this.reconnect = function (a, c, k) {
                m = hi5.tool.replaceQuery(m, "user", a);
                m = hi5.tool.replaceQuery(m, "pwd", c);
                m = hi5.tool.replaceQuery(m, "domain", k);
                "sessionStorage" in window && sessionStorage.clear();
                window.rdpConnection = this;
                a = F.getFocused();
                F.removeElm(a);
                z.addSurface(a);
                z.run()
            }
        }, F, A = [];
    A.addSurface = function (a) {
        Z && (a.railWin = new md);
        A.push(a)
    };
    A.setSize = function (a, b, c) {
        for (var k = 0, h = A.length; k < h; k++) A[k].setSize(a, b, c)
    };
    A.zOrders = [];
    A.drawLicense = function (a) {
        for (var b = 0, c = A.length; b < c; b++) A[b].drawLicense(a)
    };
    A.removeEvents = function () {
        for (var a = 0, b = A.length; a < b; a++) A[a] && A[a].removeEvents()
    };
    A.setReadOnly = function (a) {
        for (var b = 0, c = A.length; b < c; b++) A[b].setReadOnly(a)
    };
    A.setVisible = function () {
        svGlobal.logger.info("TODO: setVisible")
    };
    A.copyToClip = function (a) {
        1 > A.length || A[0].copyToClip(a)
    };
    A.setCursor = function (a) {
        Z || A[0].setCursor(a);
        var b = A.getFocused();
        b && b.setCursor(a)
    };
    A.hide = function () {
        if (Z) for (var a = 0, b = A.length; a < b; a++) A[a].browser.close();
        else A[0].hide()
    };
    A.execute = function (a, b) {
        for (var c = 0, k = A.length; c < k; c++) A[c][a].apply(A[c], b)
    };
    A.addWin = function (a) {
        function b() {
            var b = 1 > a.ownerWinid;
            if (!b) return b;
            if (0 === a.showState) return !1;
            var c = a.style;
            if (0 !== (c & 4194304)) return !0;
            var d = 0 !== (a.extStyle & 128);
            (b = b && !d) && (0 !== (c & 2147483648) && 0 === (c & 2156396544)) && (b = !1);
            svGlobal.logger.info("*** win id=" + a.id + " isMain=" + b);
            return b
        }
        var c = A.getFocused();
        c || (svGlobal.logger.warn("Focusd surface not found!"), c = A[A.length - 1]);
        c ? (c.railWin.addWin(a), 0 < z.windowState && (b() ? ("titleInfo" in a && z.setTitle && (c.browser.document.title = a.titleInfo + " - " + (W.displayName || z.server)), a.fillBrowser(), a.activate(1)) : a.checkBound())) : svGlobal.logger.warn("No surface available!")
    };
    A.delWin = function (a) {
        for (var b, c = A.length - 1; 0 <= c; c--) if (b = A[c].railWin, 0 <= b.delWin(a)) if (b.isRunning()) {
            if (0 < z.windowState) {
                var k = b.getMain(A.zOrders);
                k && k.fillBrowser();
                (k = b.getTopWin(A.zOrders)) && k.activate(1)
            }
        } else {
            var h = A[c],
                k = z.appTimeout;
            b.isNew() && (k *= 10);
            setTimeout(function () {
                h.railWin.isRunning() || A.delSurface(h)
            }, k)
        }
    };
    A.getWinById = function (a) {
        for (var b, c = 0, k = A.length; c < k; c++) if (b = A[c].railWin.getWinById(a)) return b;
        return null
    };
    A.delSurface = function (a) {
        a.railWin.isRunning() || (svGlobal.logger.info("delete surface..."),
        A.removeElm(a), a.close())
    };
    A.getOwnerSurface = function (a) {
        for (var b = 0, c = A.length; b < c; b++) if (A[b].railWin.hasWin(a)) return A[b];
        return null
    };
    A.getFocused = function () {
        if (!Z) return A[0];
        for (var a = A.length, b = 0; b < a; b++) if (A[b].focused) return A[b];
        return A[a - 1]
    };
    A.close = function () {
        for (var a = 0, b = A.length; a < b; a++) A[a] && A[a].close()
    };
    F = A;
    this.getSurfaces = function () {
        return F
    };
    this.exeAppCmd = function (a) {
        var b = F.getFocused();
        b && b.exeCommand(a)
    };
    this.setJoinMode = function (a) {
        T && x.send("8E1" + a)
    };
    this.putFiles = Lb;
    this.addSurface = function (a) {
        ab = a.context; - 1 !== F.indexOf(a) && a.railWin || (gb && a.setPlayerMode(), a.setAutoScale(0 < z.mode), a.setSize(n, w, Z ? "hidden" : null), a.setController(Ca), a.setFastCopy("on" === W.fastCopy), a.setTouchpad("on" === W.touchpad), a.setClipboard("on" === W.mapClipboard), Ob && (a.setFileHandler(Lb), ma || (ma = new Dc(new Ec))), a.run(0 < m.indexOf("keyboard=99999")), F.addSurface(a))
    };
    this.getRunninApps = function () {
        for (var a = [], b = 0, c = F.length; b < c; b++) F[b].railWin.getMain(F.zOrders) && a.push(F[b].railWin.getMain(F.zOrders).titleInfo);
        return a
    };
    this.startApp = function (a, b, c) {
        x.send("8C2" + a + "\t" + b + "\t" + c);
        var k = F[F.length - 1];
        k && (k.remoteApp = {
            exe: a,
            args: b,
            dir: c
        })
    };
    this.VirtualChannel = function () {
        this.send = function (a) {
            a = a.getData();
            x.send("8F" + sa.enc(a, a.length))
        }
    };
    this.addChannel = function (a) {
        a.rdp = z;
        na = a
    };
    this.run = function () {
        setTimeout(__run, 5);
        ga.iOSFix()
    };
    __run = function () {
        if (!T) {
            La = !1;
            if (dc) x = dc;
            else {
                var a = m + "&width=" + n + "&height=" + w + "&server_bpp=" + E + "&audio=" + ga.available + Ac();
                0 > m.indexOf("waWidth") && (a += Z ? "&waWidth=" + n + "&waHeight=" + w : "");
                var b = new Date,
                    a = a + ("&tzOffset=" + b.getTimezoneOffset() + "&time=" + b.getTime());
                (b = hi5.browser.binaryWS(a.substring(0, a.indexOf("/", 6)))) && (a += "&binary=on");
                na && (a += "&channelName=" + na.name, na.flags && (a += "&channelFlags=" + na.flags));
                var c = window.opener;
                if (c) {
                    var k = null;
                    try {
                        k = c.__sparkUser
                    } catch (h) {}
                    k && (c = k.account, k = k.session, c && (a += "&account=" + c), k && (a += "&session=" + k))
                }
                a += "&isTouch=" + (hi5.browser.isTouch && (1024 <= window.innerWidth || 768 <= window.innerHeight));
                x = new hi5.WebSocket(a);
                b && (x.binaryType =
                    "arraybuffer")
            }
            Ca.ws = x;
            svGlobal.logger.info(m);
            x.onopen = od;
            x.onmessage = pd;
            x.onclose = function (a) {
                svGlobal.logger.warn("closed, code=" + a.code + " reason=" + a.reason);
                T || Cc("connection");
                if (z.reconnectTimes) z.reconnectTimes--, T = !0, Kb(window.innerWidth, window.innerHeight);
                else {
                    T = !1;
                    try {
                        F && F.close()
                    } catch (b) {}
                    window && delete window.rdpConnection;
                    if (z && z.onclose) z.onclose()
                }
            };
            x.onerror = nd;
            a = F[F.length - 1];
            Z ? a && (a.remoteApp = {
                exe: W.exe,
                args: W.args,
                dir: ""
            }) : z.setTitle && (a.browser.document.title = W.displayName || z.server)
        }
    };
    this.getDesktop = function () {
        return B
    };
    this.mouseDown = function (a, b, c) {
        T && x.send("80" + a + "\t" + b + "\t" + c)
    };
    this.mouseMove = function (a, b) {
        console.log(a + ", " + b); 
        T && x.send("82" + a + "\t" + b)
    };
    this.mouseUp = function (a, b, c) {
        T && x.send("81" + a + "\t" + b + "\t" + c)
    };
    this.writeKeyCode = function (a, b) {
        T && x.send("8B" + (a ? 0 : 49152) + "\t" + b)
    };
    this.writeScancode = function (a, b) {
        T && ("number" === typeof a ? (x.send("840\t" + a), x.send("8449152\t" + a)) : x.send("84" + (a ? 0 : 49152) + "\t" + b))
    };
    this.writeText = function (a) {
        T && x.send("86" + a)
    };
    var ca = new RdpBuffer([],
    0, 0);
    this.refuseControl = function (a) {
        T && x.send("8E3" + a)
    };
    this.giveControl = function (a) {
        T && x.send("8E4" + a)
    };
    this.requestControl = function () {
        T && x.send("8E2")
    };
    var jc = 0;
    this.play = function () {
        x.send("F3")
    };
    this.pause = function () {
        x.send("F2")
    };
    this.scan = function (a) {
        x.send("F4" + (a ? "1" : "0"))
    };
    t = L = q = 0;
    H = 22050;
    this.showMessage = function (a) {
        var b = F.getFocused();
        b ? b.showMessage(a) : hi5.notifications.notify({
            msg: a
        })
    };
    var vb = new function () {
            var a = 0,
                b = 0,
                c = [0],
                k = new RdpBuffer(c, 0, 0);
            this.addFragement = function (h, d) {
                fa(h.getData(),
                h.getPosition(), c, b, d);
                b += d;
                a += d
            };
            this.clearFragements = function () {
                k.setPosition(0);
                k.markEnd(a);
                b = a = 0;
                return k
            }
        }, ia = new Hc,
        Qb = new function () {
            var a = [0],
                b = 0,
                c = [0],
                k = 0,
                h = [0],
                d = 0,
                l = [0],
                m = 0,
                e = [0],
                g = 0;
            this.getData = function () {
                return a
            };
            this.getDataSize = function () {
                return b
            };
            this.resetData = function (c) {
                a.length < c && (a.length = c);
                b = c;
                return a
            };
            this.resetLumaPlane = function (a) {
                c.length < a && (c.length = a);
                k = a;
                return c
            };
            this.getLumaPlanceSize = function () {
                return k
            };
            this.resetOrangeChromaPlane = function (a) {
                h.length < a && (h.length = a);
                d = a;
                return h
            };
            this.getOrangeChromaPlane = function () {
                return d
            };
            this.resetGreenChromaPlane = function (a) {
                l.length < a && (l.length = a);
                m = a;
                return l
            };
            this.getGreenChromaPlane = function () {
                return m
            };
            this.resetAlphaPlane = function (a) {
                e.length < a && (e.length = a);
                g = a;
                return e
            };
            this.getAlphaPlane = function () {
                return g
            }
        }, rd = new function () {
            var a = new qe,
                b = new pe,
                c = new re;
            this.decode = function (b, h) {
                for (var d, l, m = b.getPosition() + h; b.getPosition() < m;) {
                    d = b.getLittleEndian16();
                    l = b.getLittleEndian32();
                    if (0 == l) break;
                    l = b.getPosition() - 6 + l;
                    switch (d) {
                        case 52416:
                            d = b;
                            d.getLittleEndian32();
                            if (256 != d.getLittleEndian16()) throw "Wrong version for RemoteFX";
                            break;
                        case 52417:
                            b.skipPosition(4);
                            break;
                        case 52418:
                            d = b;
                            for (var e = d.getByte(), g = 0; g < e; g++) {
                                var j = d.getByte(),
                                    n = d.getLittleEndian16(),
                                    q = d.getLittleEndian16();
                                svGlobal.logger.info("Channel, id:" + j + " width:" + n + " height:" + q)
                            }
                            break;
                        case 52419:
                            d = b;
                            d.skipPosition(2);
                            c.ctxId = d.getByte();
                            c.tileSize = d.getLittleEndian16();
                            c.setProperties(d.getLittleEndian16());
                            break;
                        case 52420:
                            b.skipPosition(10);
                            break;
                        case 52421:
                            b.skipPosition(2);
                            break;
                        case 52422:
                            d = b;
                            d.skipPosition(2);
                            d.skipPosition(1);
                            e = d.getLittleEndian16();
                            g = a.resetRects(e);
                            for (j = 0; j < e; j++) n = g[j], n.x = d.getLittleEndian16(), n.y = d.getLittleEndian16(), n.width = d.getLittleEndian16(), n.height = d.getLittleEndian16();
                            d.skipPosition(4);
                            break;
                        case 52423:
                            d = b;
                            e = c;
                            d.skipPosition(6);
                            g = d.getLittleEndian16();
                            e.cct = g >>> 4 & 3;
                            e.xft = g >>> 6 & 15;
                            e.et = g >>> 10 & 15;
                            e.qt = g >>> 14 & 3;
                            q = d.getByte();
                            d.skipPosition(1);
                            g = d.getLittleEndian16();
                            d.skipPosition(4);
                            for (var j = Array(10 * q), t = 0, r = void 0, n = void 0, n = 0; n < q; n++) r = d.getByte(), j[t++] = r & 15, j[t++] = r >>> 4, r = d.getByte(), j[t++] = r & 15, j[t++] = r >>> 4, r = d.getByte(), j[t++] = r & 15, j[t++] = r >>> 4, r = d.getByte(), j[t++] = r & 15, j[t++] = r >>> 4, r = d.getByte(), j[t++] = r & 15, j[t++] = r >>> 4;
                            q = a.resetTiles(g);
                            for (n = 0; n < g; n++) t = q[n], t.readHeaderfromStream(d), rfxDecodeRgb(e, d, j, t.YLen, 10 * t.quantIdxY, t.CbLen, 10 * t.quantIdxCb, t.CrLen, 10 * t.quantIdxCr, t.data);
                            break;
                        default:
                            System.out.println("unknown blockType 0x%X" + d)
                    }
                    b.setPosition(l)
                }
                return a
            };
            rfxDecodeRgb = b.decodeRgb;
            this.getResult = function () {
                return a
            }
        }, Td = (new function () {
            function a(a, c, k, h, d) {
                if (0 == k) qa(h, 0, d, 255);
                else if (k < d) {
                    var l, m;
                    l = d;
                    for (d = 0; 4 < l;) m = a[c++], 5 == l ? (h[d++] = m, l--) : m == a[c] ? (c++, 255 > (a[c] & 255) ? (k = a[c++] & 255, k += 2) : (c++, k = (a[c + 3] & 255) << 24 | (a[c + 2] & 255) << 16 | (a[c + 1] & 255) << 8 | a[c] & 255, c += 4), qa(h, d, d + k, m), d += k, l -= k) : (h[d++] = m, l--);
                    for (k = 0; 4 > k; k++) h[d++] = a[c++]
                } else fa(a, c, h, 0, d)
            }
            this.process = function (b, c, k, h, d) {
                var l = b.getLittleEndian32(),
                    m = b.getLittleEndian32(),
                    e = b.getLittleEndian32(),
                    g = b.getLittleEndian32(),
                    j = b.getByte();
                c = b.getByte();
                b.skipPosition(2);
                var n = b.getData(),
                    q = b.getPosition();
                b = k * h;
                var t = 4 * b;
                b = d.resetData(b);
                var r = k + (~ (k & 7) + 1 & 7),
                    v = h + (~ (h & 1) + 1 & 1),
                    t = r * v,
                    x = d.resetLumaPlane(t),
                    y = d.resetOrangeChromaPlane(t),
                    w = d.resetGreenChromaPlane(t);
                d = d.resetAlphaPlane(t);
                var t = k * h,
                    v = 0 < c ? (r >> 1) * (v >> 1) : t,
                    u = 0 < c ? v : t;
                a(n, q, l, x, 0 < c ? r * h : t);
                q += l;
                a(n, q, m, y, v);
                q += m;
                a(n, q, e, w, u);
                a(n, q + e, g, d, t);
                for (var s, z, A, l = 0, m = k + (~ (k & 7) + 1 & 7), u = j - 1, e = 0; e < h; e++) {
                    0 < c ? (g = e * m, n = (e >> 1) * (m >> 1), q = (e >> 1) * (m >> 1)) : (g = e * k, n = e * k, q = e * k);
                    r = e * k;
                    for (j = 0; j < k; j++) s = x[g] & 255, z = (y[n] & 255) << u, 127 < z && (z -= 256), A = w[q] << u, 127 < A && (A -= 256), v = s + z - A, t = s + A, s = s - z - A, s = 0 > s ? 0 : 255 < s ? 255 : s, t = 0 > t ? 0 : 255 < t ? 255 : t, v = 0 > v ? 0 : 255 < v ? 255 : v, b[l++] = d[r] << 24 | v << 16 | t << 8 | s, g++, n += 0 < c ? j % 2 : 1, q += 0 < c ? j % 2 : 1, r++
                }
            }
        }).process,
        ve = [1, 2, 1, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 2, 3, 1, 2, 2, 2, 2, 1, 2, 1, 0, 2, 1, 2, 3],
        Aa = {
            readVar4Bytes: function (a) {
                var b = a.getByte(),
                    c = 0;
                switch ((b & 192) >> 6) {
                    case 0:
                        c = b & 63;
                        break;
                    case 1:
                        c = (b & 63) << 8 | a.getByte();
                        break;
                    case 2:
                        c = (b & 63) << 16;
                        b = a.getByte();
                        c |= b << 8;
                        b = a.getByte();
                        c |= b;
                        break;
                    case 3:
                        c = (b & 63) << 24, b = a.getByte(), c |= b << 16, b = a.getByte(), c |= b << 8, b = a.getByte(), c |= b
                }
                return c
            },
            readVar2Bytes: function (a) {
                var b = a.getByte();
                return 0 !== (b & 128) ? (b & 127) << 8 | a.getByte() : b
            }
        }, hb = 0,
        Ic = null;
    this.close = bd;
    window.addEventListener("unload", bd, !1);
    var V = 16777215,
        ub = Array(20)
}

function RdpBuffer(m, n, w) {
    var E = w,
        q = n,
        L = n + w,
        H = hi5.Arrays.arraycopy;
    this.attach = function (n, w, K) {
        m && (m = null);
        m = n;
        q = w;
        E = K;
        L = w + K
    };
    this.markEnd = function () {
        L = getPosition()
    };
    this.markEnd = function (m) {
        L = m
    };
    this.getEnd = function () {
        return L
    };
    this.getStart = function () {
        return start
    };
    this.setStart = function (m) {
        start = m
    };
    this.getByte = function () {
        return m[q++]
    };
    this.getBytes = function (n) {
        var w;
        if (m.slice) w = m.slice(q, q + n);
        else if (m.buffer && m.buffer.slice) w = new Uint8Array(m.buffer.slice(q, q + n));
        else {
            w = Array(n);
            for (var E = w[0] = 0; E < n; E++) w[E] = m[q + E]
        }
        q += n;
        return w
    };
    this.copyToByteArray = function (n, q, w, E) {
        H(m, w, n, q, E)
    };
    this.getCapacity = function () {
        return m.length
    };
    this.size = function () {
        return E
    };
    this.getPosition = function () {
        return q
    };
    this.getLittleEndian16 = function () {
        var n = m[q + 1] << 8 | m[q];
        q += 2;
        return n
    };
    this.getBigEndian16 = function () {
        var n = m[q] << 8 | m[q + 1];
        q += 2;
        return n
    };
    this.getLittleEndian32 = function () {
        var n = m[q + 3] << 24 | m[q + 2] << 16 | m[q + 1] << 8 | m[q];
        q += 4;
        return n
    };
    this.getLittleEndian64 = function () {
        var n = m[q + 7] << 56 | m[q + 6] << 48 | m[q + 5] << 40 | m[q + 4] << 32 | m[q + 3] << 24 | m[q + 2] << 16 | m[q + 1] << 8 | m[q];
        q += 8;
        return n
    };
    this.getBigEndian32 = function () {
        var n = m[q] << 24 | m[q + 1] << 16 | m[q + 2] << 8 | m[q + 3];
        q += 4;
        return n
    };
    this.getUnicodeString = function (m, n) {
        for (var q = Math.floor(m / 2), w = "", E = 0; E < q; E++) {
            var H = this.getLittleEndian16();
            if (n && 0 === H) {
                this.skipPosition(2 * (q - E - 1));
                break
            }
            w += String.fromCharCode(H)
        }
        return w
    };
    this.setUnicodeString = function (m) {
        for (var n = m.length, q = 0; q < n; q++) this.setLittleEndian16(m.charCodeAt(q))
    };
    this.skipPosition = function (m) {
        q += m
    };
    this.setPosition = function (m) {
        q = m
    };
    this.getData = function () {
        return m
    };
    this.setByte = function (n) {
        m[q++] = n
    };
    this.setLittleEndian16 = function (n) {
        m[q++] = n & 255;
        m[q++] = n >> 8 & 255
    };
    this.setLittleEndian32 = function (n) {
        m[q++] = n & 255;
        m[q++] = n >> 8 & 255;
        m[q++] = n >> 16 & 255;
        m[q++] = n >> 24 & 255
    }
}
function Brush() {
    this.style = this.yOrigin = this.xOrigin = 0;
    this.pattern = Array(8)
}
function BoundsOrder() {
    this.bottom = this.top = this.right = this.left = 0
}
function DeskSaveOrder() {
    this.action = this.offset = this.bottom = this.top = this.right = this.left = 0
}

function DestBltOrder() {
    this.opcode = this.cy = this.cx = this.y = this.x = 0
}
function FontData(m, n, w, E, q, L, H) {
    this.font = m;
    this.character = n;
    this.offset = w;
    this.baseline = E;
    this.width = q;
    this.height = L;
    this.fontdata = H
}
function LineOrder() {
    this.opcode = this.backgroundColor = this.endY = this.endX = this.startY = this.startX = this.mixmode = 0;
    this.pen = new Pen
}
function MemBltOrder() {
    this.cacheIDX = this.cacheID = this.colorTable = this.srcY = this.srcX = this.opcode = this.cy = this.cx = this.y = this.x = 0
}

function PaletteData(m, n, w, E, q) {
    this.bits = m;
    this.size = n;
    this.red = w;
    this.green = E;
    this.blue = q
}
function PatBltOrder() {
    this.foregroundColor = this.backgroundColor = this.opcode = this.cy = this.cx = this.y = this.x = 0;
    this.brush = new Brush
}
function Pen() {
    this.color = this.width = this.style = 0
}
function PolyLineOrder() {
    this.dataSize = this.opcode = this.lines = this.foregroundColor = this.flags = this.y = this.x = 0;
    this.data = Array(256)
}
function RectangleOrder() {
    this.color = this.cy = this.cx = this.y = this.x = 0
}

function ScreenBltOrder() {
    this.srcY = this.srcX = this.opcode = this.cy = this.cx = this.y = this.x = 0
}
function Text2Order() {
    this.length = this.opcode = this.boxBottom = this.boxRight = this.boxTop = this.boxLeft = this.clipBottom = this.clipRight = this.clipTop = this.clipLeft = this.font = this.unknown = this.y = this.x = this.backgroundColor = this.foregroundColor = this.mixmode = this.flags = 0;
    this.text = null;
    this.textPos = 0
}
var Connection = {
    KEY_IDS: "__CONNS",
    KEY_TIMESTAMP: "__TIMESTAMP",
    hasStorage: "localStorage" in window,
    getAll: function () {
        var m = localStorage[this.KEY_IDS];
        return !m ? [] : m.split(",")
    },
    saveForm: function (m) {
        m = m.elements;
        for (var n = m.length, w = {}, E = null, q = 0; q < n; q++) {
            var L = m[q];
            if ("button" !== L.type) {
                var H = L.name,
                    t = L.value;
                "server" === H && (E = t);
                if ("checkbox" === L.type) t = L.checked;
                else if ("radio" === L.type && !L.checked) continue;
                if ("width" === H && (t = parseInt(t, 10), t === window.innerWidth || t === screen.width)) continue;
                if ("height" === H && (t = parseInt(t, 10), t === window.innerHeight || t === screen.height)) continue;
                "pwd" !== H && (w[H] = t)
            }
        }
        return this.save(E, w) ? E : null
    },
    save: function (m, n) {
        if (!m) return !1;
        localStorage[m] = JSON.stringify(n);
        var w = localStorage[this.KEY_IDS];
        w ? 0 > w.split(",").indexOf(m) && (w = w + "," + m) : w = m;
        localStorage[this.KEY_IDS] = w;
        return !0
    },
    loadToForm: function (m, n) {
        if (!n) return !1;
        var w = localStorage[n];
        if (!w) return !1;
        for (var w = JSON.parse(w), E = m.elements, q = 0, L = E.length; q < L; q++) {
            var H = E[q],
                t = H.type;
            if (!("button" === t || "submit" === t)) {
                var ea = H.name,
                    K = w[ea];
                if ("undefined" === typeof K) {
                    if ("gateway" !== ea) switch (t) {
                        case "text":
                            H.value = "";
                            break;
                        case "checkbox":
                            H.checked = !1;
                        case "radio":
                            H.checked = !1
                    }
                } else "startProgram" === ea ? "shell" === H.id ? (H.checked = !0 === K || "shell" === K, H.value = "shell") : H.checked = K === H.id : "checkbox" === t ? H.checked = K : H.value = K
            }
        }
        return !0
    },
    clear: function () {
        localStorage.clear()
    },
    remove: function (m) {
        localStorage.removeItem(m);
        for (var n = this.getAll(), w = "", E = 0, q = n.length; E < q; E++) m !== n[E] && ("" !== w && (w += ","), w += n[E]);
        localStorage[this.KEY_IDS] = w
    },
    getValue: function (m) {
        return this.hasStorage ? localStorage[m] : null
    },
    setValue: function (m, n) {
        localStorage[m] = n
    },
    removeItem: function (m) {
        localStorage.removeItem(m)
    }
};
svGlobal.Rdp = Rdp;
