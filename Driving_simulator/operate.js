(function(l) {
    function z(c, a, b) {
        for (var e = d.pop().copy(a.c).sub(c.c), h = a.d, k = h * h, g = c.q, f = g.length, l = d.pop(), n = d.pop(), t = 0; t < f; t++) {
            var r = t === f - 1 ? 0 : t + 1,
                p = 0 === t ? f - 1 : t - 1,
                u = 0,
                q = null;
            l.copy(c.n[t]);
            n.copy(e).sub(g[t]);
            b && n.k() > k && (b.j = !1);
            var m = y(l, n);
            if (-1 === m) {
                l.copy(c.n[p]);
                r = d.pop().copy(e).sub(g[p]);
                m = y(l, r);
                if (1 === m) {
                    m = n.o();
                    if (m > h) return d.push(e), d.push(l), d.push(n), d.push(r), !1;
                    b && (b.e = !1, q = n.normalize(), u = h - m)
                }
                d.push(r)
            } else if (1 === m) {
                if (l.copy(c.n[r]), n.copy(e).sub(g[r]), m = y(l, n), -1 === m) {
                    m = n.o();
                    if (m > h) return d.push(e), d.push(l), d.push(n), !1;
                    b && (b.e = !1, q = n.normalize(), u = h - m)
                }
            } else {
                r = l.t().normalize();
                m = n.f(r);
                p = Math.abs(m);
                if (0 < m && p > h) return d.push(e), d.push(r), d.push(n), !1;
                b && (q = r, u = h - m, 0 <= m || u < 2 * h) && (b.e = !1)
            }
            q && b && Math.abs(u) < Math.abs(b.g) && (b.g = u, b.i.copy(q))
        }
        b && (b.l = c, b.m = a, b.p.copy(b.i).scale(b.g));
        d.push(e);
        d.push(l);
        d.push(n);
        return !0
    }

    function y(c, a) {
        var b = c.k(),
            e = a.f(c);
        return 0 > e ? -1 : e > b ? 1 : 0
    }

    function A(c, a, b, e, h, k) {
        var g = p.pop(),
            f = p.pop();
        c = d.pop().copy(a).sub(c);
        a = c.f(h);
        B(b, h, g);
        B(e, h, f);
        f[0] += a;
        f[1] += a;
        if (g[0] > f[1] || f[0] > g[1]) return d.push(c), p.push(g), p.push(f), !0;
        k && (b = 0, g[0] < f[0] ? (k.j = !1, g[1] < f[1] ? (b = g[1] - f[0], k.e = !1) : (b = g[1] - f[0], e = f[1] - g[0], b = b < e ? b : -e)) : (k.e = !1, g[1] > f[1] ? (b = g[0] - f[1], k.j = !1) : (b = g[1] - f[0], e = f[1] - g[0], b = b < e ? b : -e)), e = Math.abs(b), e < k.g && (k.g = e, k.i.copy(h), 0 > b && k.i.reverse()));
        d.push(c);
        p.push(g);
        p.push(f);
        return !1
    }

    function B(c, a, b) {
        for (var e = Number.MAX_VALUE, h = -Number.MAX_VALUE, d = c.length, g = 0; g < d; g++) {
            var f = c[g].f(a);
            f < e && (e = f);
            f > h && (h = f)
        }
        b[0] = e;
        b[1] = h
    }

    function w() {
        this.b = this.m = this.a = this.l = null;
        this.overlapN = this.i = new a;
        this.overlapV = this.p = new a;
        this.clear()
    }

    function x(c, s, b) {
        this.pos = this.c = c || new a;
        this.w = this.F = s || 0;
        this.h = this.A = b || 0
    }

    function q(c, s) {
        this.pos = this.c = c || new a;
        this.points = this.q = s || [];
        this.recalc()
    }

    function a(c, a) {
        this.x = this.x = c || 0;
        this.y = this.y = a || 0
    }
    l.Vector = a;
    l.V = a;
    a.prototype.copy = function(c) {
        this.x = c.x;
        this.y = c.y;
        return this
    };
    a.prototype.copy = a.prototype.copy;
    a.prototype.t = function() {
        var c = this.x;
        this.x = this.y;
        this.y = -c;
        return this
    };
    a.prototype.perp = a.prototype.t;
    a.prototype.reverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    };
    a.prototype.reverse = a.prototype.reverse;
    a.prototype.normalize = function() {
        var c = this.o();
        0 < c && (this.x /= c, this.y /= c);
        return this
    };
    a.prototype.normalize = a.prototype.normalize;
    a.prototype.add = function(c) {
        this.x += c.x;
        this.y += c.y;
        return this
    };
    a.prototype.add = a.prototype.add;
    a.prototype.sub = function(c) {
        this.x -= c.x;
        this.y -= c.y;
        return this
    };
    a.prototype.sub = a.prototype.sub;
    a.prototype.scale =
        function(c, a) {
            this.x *= c;
            this.y *= a || c;
            return this
        };
    a.prototype.scale = a.prototype.scale;
    a.prototype.u = function(c) {
        var a = this.f(c) / c.k();
        this.x = a * c.x;
        this.y = a * c.y;
        return this
    };
    a.prototype.project = a.prototype.u;
    a.prototype.v = function(c) {
        var a = this.f(c);
        this.x = a * c.x;
        this.y = a * c.y;
        return this
    };
    a.prototype.projectN = a.prototype.v;
    a.prototype.B = function(c) {
        var a = this.x,
            b = this.y;
        this.u(c).scale(2);
        this.x -= a;
        this.y -= b;
        return this
    };
    a.prototype.reflect = a.prototype.B;
    a.prototype.C = function(c) {
        var a = this.x,
            b = this.y;
        this.v(c).scale(2);
        this.x -= a;
        this.y -= b;
        return this
    };
    a.prototype.relectN = a.prototype.C;
    a.prototype.f = function(c) {
        return this.x * c.x + this.y * c.y
    };
    a.prototype.dot = a.prototype.f;
    a.prototype.k = function() {
        return this.f(this)
    };
    a.prototype.len2 = a.prototype.k;
    a.prototype.o = function() {
        return Math.sqrt(this.k())
    };
    a.prototype.len = a.prototype.o;
    l.Circle = function(c, s) {
        this.pos = this.c = c || new a;
        this.r = this.d = s || 0
    };
    l.Polygon = q;
    q.prototype.recalc = function() {
        var c = this.q,
            s = c.length;
        this.n = [];
        this.s = [];
        for (var b = 0; b < s; b++) {
            var e =
                c[b],
                e = (new a).copy(b < s - 1 ? c[b + 1] : c[0]).sub(e),
                d = (new a).copy(e).t().normalize();
            this.n.push(e);
            this.s.push(d)
        }
    };
    q.prototype.recalc = q.prototype.recalc;
    l.Box = x;
    x.prototype.D = function() {
        var c = this.c,
            d = this.F,
            b = this.A;
        return new q(new a(c.x, c.y), [new a, new a(d, 0), new a(d, b), new a(0, b)])
    };
    x.prototype.toPolygon = x.prototype.D;
    for (var d = [], v = 0; 10 > v; v++) d.push(new a);
    for (var p = [], v = 0; 5 > v; v++) p.push([]);
    l.Response = w;
    w.prototype.clear = function() {
        this.bInA = this.e = this.aInB = this.j = !0;
        this.overlap = this.g = Number.MAX_VALUE;
        return this
    };
    w.prototype.clear = w.prototype.clear;
    l.testCircleCircle = function(c, a, b) {
        var e = d.pop().copy(a.c).sub(c.c),
            h = c.d + a.d,
            k = e.k();
        if (k > h * h) return d.push(e), !1;
        b && (k = Math.sqrt(k), b.l = c, b.m = a, b.g = h - k, b.i.copy(e.normalize()), b.p.copy(e).scale(b.g), b.j = c.d <= a.d && k <= a.d - c.d, b.e = a.d <= c.d && k <= c.d - a.d);
        d.push(e);
        return !0
    };
    l.testPolygonCircle = z;
    l.testCirclePolygon = function(a, d, b) {
        if ((a = z(d, a, b)) && b) {
            d = b.l;
            var e = b.j;
            b.i.reverse();
            b.p.reverse();
            b.l = b.m;
            b.m = d;
            b.j = b.e;
            b.e = e
        }
        return a
    };
    l.testPolygonPolygon =
        function(a, d, b) {
            for (var e = a.q, h = e.length, k = d.q, g = k.length, f = 0; f < h; f++)
                if (A(a.c, d.c, e, k, a.s[f], b)) return !1;
            for (f = 0; f < g; f++)
                if (A(a.c, d.c, e, k, d.s[f], b)) return !1;
            b && (b.l = a, b.m = d, b.p.copy(b.i).scale(b.g));
            return !0
        }
})(window.SAT = {});