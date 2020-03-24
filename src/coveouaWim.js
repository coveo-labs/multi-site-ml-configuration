!(function(t) {
  function e(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = { exports: {}, id: n, loaded: !1 });
    return t[n].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
  }
  var r = {};
  return (e.m = t), (e.c = r), (e.p = ""), e(0);
})([
  function(t, e, r) {
    (function(t) {
      "use strict";
      var n = r(1),
        o = r(11),
        i = window.Promise;
      i instanceof Function || r(13).polyfill();
      var s = t.coveoua || {};
      (t.coveoua = n.default),
        (t.coveoanalytics = o),
        s.q &&
          s.q.forEach(function(t) {
            return n.default.apply(void 0, t);
          }),
        Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = s);
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e, r) {
    "use strict";
    var n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(t) {
              return typeof t;
            }
          : function(t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            },
      o = r(2),
      i = r(9),
      s = r(10),
      a = (function() {
        function t() {}
        return (
          (t.prototype.init = function(t, e) {
            if ("undefined" == typeof t)
              throw new Error("You must pass your token when you call 'init'");
            if ("string" == typeof t)
              (e = e || o.Endpoints.default),
                (this.client = new o.Client({ token: t, endpoint: e }));
            else {
              if (
                "object" !== ("undefined" == typeof t ? "undefined" : n(t)) ||
                "undefined" == typeof t.sendEvent
              )
                throw new Error(
                  "You must pass either your token or a valid object when you call 'init'"
                );
              this.client = t;
            }
          }),
          (t.prototype.send = function(t, e) {
            if ("undefined" == typeof this.client)
              throw new Error("You must call init before sending an event");
            switch (
              ((e = i.default({}, { hash: window.location.hash }, e)), t)
            ) {
              case "pageview":
                return void this.client.sendViewEvent({
                  location: window.location.toString(),
                  referrer: document.referrer,
                  language: document.documentElement.lang,
                  title: document.title,
                  originLevel1: s.popFromObject(e, "originLevel1"),
                  contentIdKey: s.popFromObject(e, "contentIdKey"),
                  contentIdValue: s.popFromObject(e, "contentIdValue"),
                  contentType: s.popFromObject(e, "contentType"),
                  anonymous: s.popFromObject(e, "anonymous"),
                  customData: e
                });
              default:
                throw new Error("Event type: '" + t + "' not implemented");
            }
          }),
          (t.prototype.onLoad = function(t) {
            if ("undefined" == typeof t)
              throw new Error(
                "You must pass a function when you call 'onLoad'"
              );
            t();
          }),
          t
        );
      })();
    e.SimpleAPI = a;
    var u = new a();
    (e.SimpleAnalytics = function(t) {
      for (var e = [], r = 1; r < arguments.length; r++)
        e[r - 1] = arguments[r];
      var n = u[t];
      if (n) return n.apply(u, e);
    }),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = e.SimpleAnalytics);
  },
  function(t, e, r) {
    (function(t) {
      "use strict";
      function n(t) {
        return t.json().then(function(e) {
          return (e.raw = t), e;
        });
      }
      var o = r(4);
      r(8),
        (e.Version = "v15"),
        (e.Endpoints = {
          default: "https://usageanalytics.coveo.com",
          production: "https://usageanalytics.coveo.com",
          dev: "https://usageanalyticsdev.coveo.com",
          staging: "https://usageanalyticsstaging.coveo.com"
        });
      var i = (function() {
        function r(t) {
          if ("undefined" == typeof t)
            throw new Error("You have to pass options to this constructor");
          (this.endpoint = t.endpoint || e.Endpoints.default),
            (this.token = t.token),
            (this.version = t.version || e.Version);
        }
        return (
          (r.prototype.sendEvent = function(e, r) {
            return t(this.getRestEndpoint() + "/analytics/" + e, {
              method: "POST",
              headers: this.getHeaders(),
              mode: "cors",
              body: JSON.stringify(r),
              credentials: "include"
            });
          }),
          (r.prototype.sendSearchEvent = function(t) {
            return this.sendEvent("search", t).then(n);
          }),
          (r.prototype.sendClickEvent = function(t) {
            return this.sendEvent("click", t).then(n);
          }),
          (r.prototype.sendCustomEvent = function(t) {
            return this.sendEvent("custom", t).then(n);
          }),
          (r.prototype.sendViewEvent = function(t) {
            "" === t.referrer && delete t.referrer;
            var e = new o.HistoryStore(),
              r = {
                name: "PageView",
                value: t.contentIdValue,
                time: JSON.stringify(new Date())
              };
            return e.addElement(r), this.sendEvent("view", t).then(n);
          }),
          (r.prototype.getVisit = function() {
            return t(this.getRestEndpoint() + "/analytics/visit").then(n);
          }),
          (r.prototype.getHealth = function() {
            return t(
              this.getRestEndpoint() + "/analytics/monitoring/health"
            ).then(n);
          }),
          (r.prototype.getRestEndpoint = function() {
            return this.endpoint + "/rest/" + this.version;
          }),
          (r.prototype.getHeaders = function() {
            var t = { "Content-Type": "application/json" };
            return this.token && (t.Authorization = "Bearer " + this.token), t;
          }),
          r
        );
      })();
      (e.Client = i),
        Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = i);
    }.call(e, r(3)));
  },
  function(t, e) {
    !(function(t) {
      "use strict";
      function e(t) {
        if (
          ("string" != typeof t && (t = String(t)),
          /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
        )
          throw new TypeError("Invalid character in header field name");
        return t.toLowerCase();
      }
      function r(t) {
        return "string" != typeof t && (t = String(t)), t;
      }
      function n(t) {
        var e = {
          next: function() {
            var e = t.shift();
            return { done: void 0 === e, value: e };
          }
        };
        return (
          b.iterable &&
            (e[Symbol.iterator] = function() {
              return e;
            }),
          e
        );
      }
      function o(t) {
        (this.map = {}),
          t instanceof o
            ? t.forEach(function(t, e) {
                this.append(e, t);
              }, this)
            : Array.isArray(t)
            ? t.forEach(function(t) {
                this.append(t[0], t[1]);
              }, this)
            : t &&
              Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e]);
              }, this);
      }
      function i(t) {
        return t.bodyUsed
          ? Promise.reject(new TypeError("Already read"))
          : void (t.bodyUsed = !0);
      }
      function s(t) {
        return new Promise(function(e, r) {
          (t.onload = function() {
            e(t.result);
          }),
            (t.onerror = function() {
              r(t.error);
            });
        });
      }
      function a(t) {
        var e = new FileReader(),
          r = s(e);
        return e.readAsArrayBuffer(t), r;
      }
      function u(t) {
        var e = new FileReader(),
          r = s(e);
        return e.readAsText(t), r;
      }
      function c(t) {
        for (
          var e = new Uint8Array(t), r = new Array(e.length), n = 0;
          n < e.length;
          n++
        )
          r[n] = String.fromCharCode(e[n]);
        return r.join("");
      }
      function f(t) {
        if (t.slice) return t.slice(0);
        var e = new Uint8Array(t.byteLength);
        return e.set(new Uint8Array(t)), e.buffer;
      }
      function l() {
        return (
          (this.bodyUsed = !1),
          (this._initBody = function(t) {
            if (((this._bodyInit = t), t))
              if ("string" == typeof t) this._bodyText = t;
              else if (b.blob && Blob.prototype.isPrototypeOf(t))
                this._bodyBlob = t;
              else if (b.formData && FormData.prototype.isPrototypeOf(t))
                this._bodyFormData = t;
              else if (
                b.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(t)
              )
                this._bodyText = t.toString();
              else if (b.arrayBuffer && b.blob && w(t))
                (this._bodyArrayBuffer = f(t.buffer)),
                  (this._bodyInit = new Blob([this._bodyArrayBuffer]));
              else {
                if (
                  !b.arrayBuffer ||
                  (!ArrayBuffer.prototype.isPrototypeOf(t) && !_(t))
                )
                  throw new Error("unsupported BodyInit type");
                this._bodyArrayBuffer = f(t);
              }
            else this._bodyText = "";
            this.headers.get("content-type") ||
              ("string" == typeof t
                ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set("content-type", this._bodyBlob.type)
                : b.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(t) &&
                  this.headers.set(
                    "content-type",
                    "application/x-www-form-urlencoded;charset=UTF-8"
                  ));
          }),
          b.blob &&
            ((this.blob = function() {
              var t = i(this);
              if (t) return t;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer)
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData)
                throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function() {
              return this._bodyArrayBuffer
                ? i(this) || Promise.resolve(this._bodyArrayBuffer)
                : this.blob().then(a);
            })),
          (this.text = function() {
            var t = i(this);
            if (t) return t;
            if (this._bodyBlob) return u(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(c(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }),
          b.formData &&
            (this.formData = function() {
              return this.text().then(p);
            }),
          (this.json = function() {
            return this.text().then(JSON.parse);
          }),
          this
        );
      }
      function h(t) {
        var e = t.toUpperCase();
        return g.indexOf(e) > -1 ? e : t;
      }
      function d(t, e) {
        e = e || {};
        var r = e.body;
        if (t instanceof d) {
          if (t.bodyUsed) throw new TypeError("Already read");
          (this.url = t.url),
            (this.credentials = t.credentials),
            e.headers || (this.headers = new o(t.headers)),
            (this.method = t.method),
            (this.mode = t.mode),
            r || null == t._bodyInit || ((r = t._bodyInit), (t.bodyUsed = !0));
        } else this.url = String(t);
        if (
          ((this.credentials = e.credentials || this.credentials || "omit"),
          (!e.headers && this.headers) || (this.headers = new o(e.headers)),
          (this.method = h(e.method || this.method || "GET")),
          (this.mode = e.mode || this.mode || null),
          (this.referrer = null),
          ("GET" === this.method || "HEAD" === this.method) && r)
        )
          throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(r);
      }
      function p(t) {
        var e = new FormData();
        return (
          t
            .trim()
            .split("&")
            .forEach(function(t) {
              if (t) {
                var r = t.split("="),
                  n = r.shift().replace(/\+/g, " "),
                  o = r.join("=").replace(/\+/g, " ");
                e.append(decodeURIComponent(n), decodeURIComponent(o));
              }
            }),
          e
        );
      }
      function y(t) {
        var e = new o();
        return (
          t.split(/\r?\n/).forEach(function(t) {
            var r = t.split(":"),
              n = r.shift().trim();
            if (n) {
              var o = r.join(":").trim();
              e.append(n, o);
            }
          }),
          e
        );
      }
      function m(t, e) {
        e || (e = {}),
          (this.type = "default"),
          (this.status = "status" in e ? e.status : 200),
          (this.ok = this.status >= 200 && this.status < 300),
          (this.statusText = "statusText" in e ? e.statusText : "OK"),
          (this.headers = new o(e.headers)),
          (this.url = e.url || ""),
          this._initBody(t);
      }
      if (!t.fetch) {
        var b = {
          searchParams: "URLSearchParams" in t,
          iterable: "Symbol" in t && "iterator" in Symbol,
          blob:
            "FileReader" in t &&
            "Blob" in t &&
            (function() {
              try {
                return new Blob(), !0;
              } catch (t) {
                return !1;
              }
            })(),
          formData: "FormData" in t,
          arrayBuffer: "ArrayBuffer" in t
        };
        if (b.arrayBuffer)
          var v = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ],
            w = function(t) {
              return t && DataView.prototype.isPrototypeOf(t);
            },
            _ =
              ArrayBuffer.isView ||
              function(t) {
                return t && v.indexOf(Object.prototype.toString.call(t)) > -1;
              };
        (o.prototype.append = function(t, n) {
          (t = e(t)), (n = r(n));
          var o = this.map[t];
          this.map[t] = o ? o + "," + n : n;
        }),
          (o.prototype.delete = function(t) {
            delete this.map[e(t)];
          }),
          (o.prototype.get = function(t) {
            return (t = e(t)), this.has(t) ? this.map[t] : null;
          }),
          (o.prototype.has = function(t) {
            return this.map.hasOwnProperty(e(t));
          }),
          (o.prototype.set = function(t, n) {
            this.map[e(t)] = r(n);
          }),
          (o.prototype.forEach = function(t, e) {
            for (var r in this.map)
              this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
          }),
          (o.prototype.keys = function() {
            var t = [];
            return (
              this.forEach(function(e, r) {
                t.push(r);
              }),
              n(t)
            );
          }),
          (o.prototype.values = function() {
            var t = [];
            return (
              this.forEach(function(e) {
                t.push(e);
              }),
              n(t)
            );
          }),
          (o.prototype.entries = function() {
            var t = [];
            return (
              this.forEach(function(e, r) {
                t.push([r, e]);
              }),
              n(t)
            );
          }),
          b.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
        var g = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        (d.prototype.clone = function() {
          return new d(this, { body: this._bodyInit });
        }),
          l.call(d.prototype),
          l.call(m.prototype),
          (m.prototype.clone = function() {
            return new m(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new o(this.headers),
              url: this.url
            });
          }),
          (m.error = function() {
            var t = new m(null, { status: 0, statusText: "" });
            return (t.type = "error"), t;
          });
        var E = [301, 302, 303, 307, 308];
        (m.redirect = function(t, e) {
          if (E.indexOf(e) === -1) throw new RangeError("Invalid status code");
          return new m(null, { status: e, headers: { location: t } });
        }),
          (t.Headers = o),
          (t.Request = d),
          (t.Response = m),
          (t.fetch = function(t, e) {
            return new Promise(function(r, n) {
              var o = new d(t, e),
                i = new XMLHttpRequest();
              (i.onload = function() {
                var t = {
                  status: i.status,
                  statusText: i.statusText,
                  headers: y(i.getAllResponseHeaders() || "")
                };
                t.url =
                  "responseURL" in i
                    ? i.responseURL
                    : t.headers.get("X-Request-URL");
                var e = "response" in i ? i.response : i.responseText;
                r(new m(e, t));
              }),
                (i.onerror = function() {
                  n(new TypeError("Network request failed"));
                }),
                (i.ontimeout = function() {
                  n(new TypeError("Network request failed"));
                }),
                i.open(o.method, o.url, !0),
                "include" === o.credentials && (i.withCredentials = !0),
                "responseType" in i && b.blob && (i.responseType = "blob"),
                o.headers.forEach(function(t, e) {
                  i.setRequestHeader(e, t);
                }),
                i.send("undefined" == typeof o._bodyInit ? null : o._bodyInit);
            });
          }),
          (t.fetch.polyfill = !0);
      }
    })("undefined" != typeof self ? self : this),
      (t.exports = self.fetch);
  },
  function(t, e, r) {
    "use strict";
    var n = r(5),
      o = r(6);
    (e.STORE_KEY = "__coveo.analytics.history"),
      (e.MAX_NUMBER_OF_HISTORY_ELEMENTS = 20),
      (e.MIN_THRESHOLD_FOR_DUPLICATE_VALUE = 6e4),
      (e.MAX_VALUE_SIZE = 75);
    var i = (function() {
      function t(t) {
        (this.store = t || n.getAvailableStorage()),
          this.store instanceof n.CookieStorage ||
            !o.hasCookieStorage() ||
            new n.CookieStorage().removeItem(e.STORE_KEY);
      }
      return (
        (t.prototype.addElement = function(t) {
          (t.internalTime = new Date().getTime()), this.cropQueryElement(t);
          var e = this.getHistoryWithInternalTime();
          null != e
            ? this.isValidEntry(t) && this.setHistory([t].concat(e))
            : this.setHistory([t]);
        }),
        (t.prototype.getHistory = function() {
          var t = this.getHistoryWithInternalTime();
          return this.stripInternalTime(t);
        }),
        (t.prototype.getHistoryWithInternalTime = function() {
          try {
            return JSON.parse(this.store.getItem(e.STORE_KEY));
          } catch (t) {
            return [];
          }
        }),
        (t.prototype.setHistory = function(t) {
          try {
            this.store.setItem(
              e.STORE_KEY,
              JSON.stringify(t.slice(0, e.MAX_NUMBER_OF_HISTORY_ELEMENTS))
            );
          } catch (t) {}
        }),
        (t.prototype.clear = function() {
          try {
            this.store.removeItem(e.STORE_KEY);
          } catch (t) {}
        }),
        (t.prototype.getMostRecentElement = function() {
          var t = this.getHistoryWithInternalTime();
          if (null != t) {
            var e = t.sort(function(t, e) {
              return null == t.internalTime && null == e.internalTime
                ? 0
                : null == t.internalTime && null != e.internalTime
                ? 1
                : null != t.internalTime && null == e.internalTime
                ? -1
                : e.internalTime - t.internalTime;
            });
            return e[0];
          }
          return null;
        }),
        (t.prototype.cropQueryElement = function(t) {
          t.name &&
            "query" == t.name.toLowerCase() &&
            null != t.value &&
            (t.value = t.value.slice(0, e.MAX_VALUE_SIZE));
        }),
        (t.prototype.isValidEntry = function(t) {
          var r = this.getMostRecentElement();
          return (
            !r ||
            r.value != t.value ||
            t.internalTime - r.internalTime >
              e.MIN_THRESHOLD_FOR_DUPLICATE_VALUE
          );
        }),
        (t.prototype.stripInternalTime = function(t) {
          return (
            t &&
              t.forEach(function(t, e, r) {
                delete t.internalTime;
              }),
            t
          );
        }),
        t
      );
    })();
    (e.HistoryStore = i),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = i);
  },
  function(t, e, r) {
    "use strict";
    function n() {
      return e.preferredStorage
        ? e.preferredStorage
        : o.hasLocalStorage()
        ? localStorage
        : o.hasCookieStorage()
        ? new s()
        : o.hasSessionStorage()
        ? sessionStorage
        : new a();
    }
    var o = r(6),
      i = r(7);
    (e.preferredStorage = null), (e.getAvailableStorage = n);
    var s = (function() {
      function t() {}
      return (
        (t.prototype.getItem = function(t) {
          return i.Cookie.get(t);
        }),
        (t.prototype.removeItem = function(t) {
          i.Cookie.erase(t);
        }),
        (t.prototype.setItem = function(t, e) {
          i.Cookie.set(t, e);
        }),
        t
      );
    })();
    e.CookieStorage = s;
    var a = (function() {
      function t() {}
      return (
        (t.prototype.getItem = function(t) {
          return null;
        }),
        (t.prototype.removeItem = function(t) {}),
        (t.prototype.setItem = function(t, e) {}),
        t
      );
    })();
    e.NullStorage = a;
  },
  function(t, e) {
    "use strict";
    function r() {
      try {
        return "localStorage" in window && null !== window.localStorage;
      } catch (t) {
        return !1;
      }
    }
    function n() {
      try {
        return "sessionStorage" in window && null !== window.sessionStorage;
      } catch (t) {
        return !1;
      }
    }
    function o() {
      return navigator.cookieEnabled;
    }
    function i() {
      return null !== document;
    }
    function s() {
      return i() && null !== document.location;
    }
    (e.hasLocalStorage = r),
      (e.hasSessionStorage = n),
      (e.hasCookieStorage = o),
      (e.hasDocument = i),
      (e.hasDocumentLocation = s);
  },
  function(t, e) {
    "use strict";
    var r = (function() {
      function t() {}
      return (
        (t.set = function(e, r, n) {
          var o, i, s, a, u;
          n
            ? ((s = new Date()),
              s.setTime(s.getTime() + n),
              (a = "; expires=" + s.toGMTString()))
            : (a = ""),
            (u = location.hostname),
            u.indexOf(".") === -1
              ? (document.cookie = e + "=" + r + a + "; path=/")
              : ((i = u.split(".")),
                i.shift(),
                (o = "." + i.join(".")),
                (document.cookie = e + "=" + r + a + "; path=/; domain=" + o),
                (null != t.get(e) && t.get(e) == r) ||
                  ((o = "." + u),
                  (document.cookie =
                    e + "=" + r + a + "; path=/; domain=" + o)));
        }),
        (t.get = function(t) {
          for (
            var e = t + "=", r = document.cookie.split(";"), n = 0;
            n < r.length;
            n++
          ) {
            var o = r[n];
            if (((o = o.replace(/^\s+/, "")), 0 == o.indexOf(e)))
              return o.substring(e.length, o.length);
          }
          return null;
        }),
        (t.erase = function(e) {
          t.set(e, "", -1);
        }),
        t
      );
    })();
    e.Cookie = r;
  },
  function(t, e) {
    !(function(t) {
      "use strict";
      function e(t) {
        if (
          ("string" != typeof t && (t = String(t)),
          /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
        )
          throw new TypeError("Invalid character in header field name");
        return t.toLowerCase();
      }
      function r(t) {
        return "string" != typeof t && (t = String(t)), t;
      }
      function n(t) {
        var e = {
          next: function() {
            var e = t.shift();
            return { done: void 0 === e, value: e };
          }
        };
        return (
          b.iterable &&
            (e[Symbol.iterator] = function() {
              return e;
            }),
          e
        );
      }
      function o(t) {
        (this.map = {}),
          t instanceof o
            ? t.forEach(function(t, e) {
                this.append(e, t);
              }, this)
            : Array.isArray(t)
            ? t.forEach(function(t) {
                this.append(t[0], t[1]);
              }, this)
            : t &&
              Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e]);
              }, this);
      }
      function i(t) {
        return t.bodyUsed
          ? Promise.reject(new TypeError("Already read"))
          : void (t.bodyUsed = !0);
      }
      function s(t) {
        return new Promise(function(e, r) {
          (t.onload = function() {
            e(t.result);
          }),
            (t.onerror = function() {
              r(t.error);
            });
        });
      }
      function a(t) {
        var e = new FileReader(),
          r = s(e);
        return e.readAsArrayBuffer(t), r;
      }
      function u(t) {
        var e = new FileReader(),
          r = s(e);
        return e.readAsText(t), r;
      }
      function c(t) {
        for (
          var e = new Uint8Array(t), r = new Array(e.length), n = 0;
          n < e.length;
          n++
        )
          r[n] = String.fromCharCode(e[n]);
        return r.join("");
      }
      function f(t) {
        if (t.slice) return t.slice(0);
        var e = new Uint8Array(t.byteLength);
        return e.set(new Uint8Array(t)), e.buffer;
      }
      function l() {
        return (
          (this.bodyUsed = !1),
          (this._initBody = function(t) {
            if (((this._bodyInit = t), t))
              if ("string" == typeof t) this._bodyText = t;
              else if (b.blob && Blob.prototype.isPrototypeOf(t))
                this._bodyBlob = t;
              else if (b.formData && FormData.prototype.isPrototypeOf(t))
                this._bodyFormData = t;
              else if (
                b.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(t)
              )
                this._bodyText = t.toString();
              else if (b.arrayBuffer && b.blob && w(t))
                (this._bodyArrayBuffer = f(t.buffer)),
                  (this._bodyInit = new Blob([this._bodyArrayBuffer]));
              else {
                if (
                  !b.arrayBuffer ||
                  (!ArrayBuffer.prototype.isPrototypeOf(t) && !_(t))
                )
                  throw new Error("unsupported BodyInit type");
                this._bodyArrayBuffer = f(t);
              }
            else this._bodyText = "";
            this.headers.get("content-type") ||
              ("string" == typeof t
                ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set("content-type", this._bodyBlob.type)
                : b.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(t) &&
                  this.headers.set(
                    "content-type",
                    "application/x-www-form-urlencoded;charset=UTF-8"
                  ));
          }),
          b.blob &&
            ((this.blob = function() {
              var t = i(this);
              if (t) return t;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer)
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData)
                throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function() {
              return this._bodyArrayBuffer
                ? i(this) || Promise.resolve(this._bodyArrayBuffer)
                : this.blob().then(a);
            })),
          (this.text = function() {
            var t = i(this);
            if (t) return t;
            if (this._bodyBlob) return u(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(c(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }),
          b.formData &&
            (this.formData = function() {
              return this.text().then(p);
            }),
          (this.json = function() {
            return this.text().then(JSON.parse);
          }),
          this
        );
      }
      function h(t) {
        var e = t.toUpperCase();
        return g.indexOf(e) > -1 ? e : t;
      }
      function d(t, e) {
        e = e || {};
        var r = e.body;
        if (t instanceof d) {
          if (t.bodyUsed) throw new TypeError("Already read");
          (this.url = t.url),
            (this.credentials = t.credentials),
            e.headers || (this.headers = new o(t.headers)),
            (this.method = t.method),
            (this.mode = t.mode),
            r || null == t._bodyInit || ((r = t._bodyInit), (t.bodyUsed = !0));
        } else this.url = String(t);
        if (
          ((this.credentials = e.credentials || this.credentials || "omit"),
          (!e.headers && this.headers) || (this.headers = new o(e.headers)),
          (this.method = h(e.method || this.method || "GET")),
          (this.mode = e.mode || this.mode || null),
          (this.referrer = null),
          ("GET" === this.method || "HEAD" === this.method) && r)
        )
          throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(r);
      }
      function p(t) {
        var e = new FormData();
        return (
          t
            .trim()
            .split("&")
            .forEach(function(t) {
              if (t) {
                var r = t.split("="),
                  n = r.shift().replace(/\+/g, " "),
                  o = r.join("=").replace(/\+/g, " ");
                e.append(decodeURIComponent(n), decodeURIComponent(o));
              }
            }),
          e
        );
      }
      function y(t) {
        var e = new o();
        return (
          t.split(/\r?\n/).forEach(function(t) {
            var r = t.split(":"),
              n = r.shift().trim();
            if (n) {
              var o = r.join(":").trim();
              e.append(n, o);
            }
          }),
          e
        );
      }
      function m(t, e) {
        e || (e = {}),
          (this.type = "default"),
          (this.status = "status" in e ? e.status : 200),
          (this.ok = this.status >= 200 && this.status < 300),
          (this.statusText = "statusText" in e ? e.statusText : "OK"),
          (this.headers = new o(e.headers)),
          (this.url = e.url || ""),
          this._initBody(t);
      }
      if (!t.fetch) {
        var b = {
          searchParams: "URLSearchParams" in t,
          iterable: "Symbol" in t && "iterator" in Symbol,
          blob:
            "FileReader" in t &&
            "Blob" in t &&
            (function() {
              try {
                return new Blob(), !0;
              } catch (t) {
                return !1;
              }
            })(),
          formData: "FormData" in t,
          arrayBuffer: "ArrayBuffer" in t
        };
        if (b.arrayBuffer)
          var v = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ],
            w = function(t) {
              return t && DataView.prototype.isPrototypeOf(t);
            },
            _ =
              ArrayBuffer.isView ||
              function(t) {
                return t && v.indexOf(Object.prototype.toString.call(t)) > -1;
              };
        (o.prototype.append = function(t, n) {
          (t = e(t)), (n = r(n));
          var o = this.map[t];
          this.map[t] = o ? o + "," + n : n;
        }),
          (o.prototype.delete = function(t) {
            delete this.map[e(t)];
          }),
          (o.prototype.get = function(t) {
            return (t = e(t)), this.has(t) ? this.map[t] : null;
          }),
          (o.prototype.has = function(t) {
            return this.map.hasOwnProperty(e(t));
          }),
          (o.prototype.set = function(t, n) {
            this.map[e(t)] = r(n);
          }),
          (o.prototype.forEach = function(t, e) {
            for (var r in this.map)
              this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
          }),
          (o.prototype.keys = function() {
            var t = [];
            return (
              this.forEach(function(e, r) {
                t.push(r);
              }),
              n(t)
            );
          }),
          (o.prototype.values = function() {
            var t = [];
            return (
              this.forEach(function(e) {
                t.push(e);
              }),
              n(t)
            );
          }),
          (o.prototype.entries = function() {
            var t = [];
            return (
              this.forEach(function(e, r) {
                t.push([r, e]);
              }),
              n(t)
            );
          }),
          b.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
        var g = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        (d.prototype.clone = function() {
          return new d(this, { body: this._bodyInit });
        }),
          l.call(d.prototype),
          l.call(m.prototype),
          (m.prototype.clone = function() {
            return new m(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new o(this.headers),
              url: this.url
            });
          }),
          (m.error = function() {
            var t = new m(null, { status: 0, statusText: "" });
            return (t.type = "error"), t;
          });
        var E = [301, 302, 303, 307, 308];
        (m.redirect = function(t, e) {
          if (E.indexOf(e) === -1) throw new RangeError("Invalid status code");
          return new m(null, { status: e, headers: { location: t } });
        }),
          (t.Headers = o),
          (t.Request = d),
          (t.Response = m),
          (t.fetch = function(t, e) {
            return new Promise(function(r, n) {
              var o = new d(t, e),
                i = new XMLHttpRequest();
              (i.onload = function() {
                var t = {
                  status: i.status,
                  statusText: i.statusText,
                  headers: y(i.getAllResponseHeaders() || "")
                };
                t.url =
                  "responseURL" in i
                    ? i.responseURL
                    : t.headers.get("X-Request-URL");
                var e = "response" in i ? i.response : i.responseText;
                r(new m(e, t));
              }),
                (i.onerror = function() {
                  n(new TypeError("Network request failed"));
                }),
                (i.ontimeout = function() {
                  n(new TypeError("Network request failed"));
                }),
                i.open(o.method, o.url, !0),
                "include" === o.credentials && (i.withCredentials = !0),
                "responseType" in i && b.blob && (i.responseType = "blob"),
                o.headers.forEach(function(t, e) {
                  i.setRequestHeader(e, t);
                }),
                i.send("undefined" == typeof o._bodyInit ? null : o._bodyInit);
            });
          }),
          (t.fetch.polyfill = !0);
      }
    })("undefined" != typeof self ? self : this);
  },
  function(t, e) {
    "use strict";
    var r = Object.prototype.hasOwnProperty,
      n = Object.getOwnPropertySymbols,
      o = Object.prototype.propertyIsEnumerable,
      i = function(t) {
        for (var e = [], i = 1; i < arguments.length; i++)
          e[i - 1] = arguments[i];
        if (void 0 === t || null === t)
          throw new TypeError("Cannot convert undefined or null to object");
        var s = Object(t);
        return (
          e.forEach(function(t) {
            var e = Object(t);
            for (var i in e) r.call(e, i) && (s[i] = e[i]);
            if (n) {
              var a = n(e);
              a.forEach(function(t) {
                o.call(e, t) && (s[t] = e[t]);
              });
            }
          }),
          s
        );
      };
    (e.ponyfill = i),
      (e.assign = "function" == typeof Object.assign ? Object.assign : i),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = e.assign);
  },
  function(t, e) {
    "use strict";
    function r(t, e) {
      if (t) {
        var r = t[e];
        return delete t[e], r;
      }
    }
    e.popFromObject = r;
  },
  function(t, e, r) {
    "use strict";
    var n = r(2);
    e.analytics = n;
    var o = r(1);
    e.SimpleAnalytics = o;
    var i = r(4);
    e.history = i;
    var s = r(12);
    e.donottrack = s;
    var a = r(5);
    e.storage = a;
  },
  function(t, e) {
    "use strict";
    (e.doNotTrack = [!0, "yes", "1"].indexOf(
      navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack
    )),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = e.doNotTrack);
  },
  function(t, e, r) {
    (function(e, n) {
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   4.0.2
       */
      !(function(e, r) {
        t.exports = r();
      })(this, function() {
        "use strict";
        function t(t) {
          return "function" == typeof t || ("object" == typeof t && null !== t);
        }
        function o(t) {
          return "function" == typeof t;
        }
        function i(t) {
          W = t;
        }
        function s(t) {
          z = t;
        }
        function a() {
          return function() {
            return e.nextTick(h);
          };
        }
        function u() {
          return function() {
            J(h);
          };
        }
        function c() {
          var t = 0,
            e = new $(h),
            r = document.createTextNode("");
          return (
            e.observe(r, { characterData: !0 }),
            function() {
              r.data = t = ++t % 2;
            }
          );
        }
        function f() {
          var t = new MessageChannel();
          return (
            (t.port1.onmessage = h),
            function() {
              return t.port2.postMessage(0);
            }
          );
        }
        function l() {
          var t = setTimeout;
          return function() {
            return t(h, 1);
          };
        }
        function h() {
          for (var t = 0; t < X; t += 2) {
            var e = rt[t],
              r = rt[t + 1];
            e(r), (rt[t] = void 0), (rt[t + 1] = void 0);
          }
          X = 0;
        }
        function d() {
          try {
            var t = r(15);
            return (J = t.runOnLoop || t.runOnContext), u();
          } catch (t) {
            return l();
          }
        }
        function p(t, e) {
          var r = arguments,
            n = this,
            o = new this.constructor(m);
          void 0 === o[ot] && k(o);
          var i = n._state;
          return (
            i
              ? !(function() {
                  var t = r[i - 1];
                  z(function() {
                    return U(i, o, t, n._result);
                  });
                })()
              : P(n, o, t, e),
            o
          );
        }
        function y(t) {
          var e = this;
          if (t && "object" == typeof t && t.constructor === e) return t;
          var r = new e(m);
          return A(r, t), r;
        }
        function m() {}
        function b() {
          return new TypeError("You cannot resolve a promise with itself");
        }
        function v() {
          return new TypeError(
            "A promises callback cannot return that same promise."
          );
        }
        function w(t) {
          try {
            return t.then;
          } catch (t) {
            return (ut.error = t), ut;
          }
        }
        function _(t, e, r, n) {
          try {
            t.call(e, r, n);
          } catch (t) {
            return t;
          }
        }
        function g(t, e, r) {
          z(function(t) {
            var n = !1,
              o = _(
                r,
                e,
                function(r) {
                  n || ((n = !0), e !== r ? A(t, r) : O(t, r));
                },
                function(e) {
                  n || ((n = !0), B(t, e));
                },
                "Settle: " + (t._label || " unknown promise")
              );
            !n && o && ((n = !0), B(t, o));
          }, t);
        }
        function E(t, e) {
          e._state === st
            ? O(t, e._result)
            : e._state === at
            ? B(t, e._result)
            : P(
                e,
                void 0,
                function(e) {
                  return A(t, e);
                },
                function(e) {
                  return B(t, e);
                }
              );
        }
        function T(t, e, r) {
          e.constructor === t.constructor &&
          r === p &&
          e.constructor.resolve === y
            ? E(t, e)
            : r === ut
            ? B(t, ut.error)
            : void 0 === r
            ? O(t, e)
            : o(r)
            ? g(t, e, r)
            : O(t, e);
        }
        function A(e, r) {
          e === r ? B(e, b()) : t(r) ? T(e, r, w(r)) : O(e, r);
        }
        function S(t) {
          t._onerror && t._onerror(t._result), j(t);
        }
        function O(t, e) {
          t._state === it &&
            ((t._result = e),
            (t._state = st),
            0 !== t._subscribers.length && z(j, t));
        }
        function B(t, e) {
          t._state === it && ((t._state = at), (t._result = e), z(S, t));
        }
        function P(t, e, r, n) {
          var o = t._subscribers,
            i = o.length;
          (t._onerror = null),
            (o[i] = e),
            (o[i + st] = r),
            (o[i + at] = n),
            0 === i && t._state && z(j, t);
        }
        function j(t) {
          var e = t._subscribers,
            r = t._state;
          if (0 !== e.length) {
            for (
              var n = void 0, o = void 0, i = t._result, s = 0;
              s < e.length;
              s += 3
            )
              (n = e[s]), (o = e[s + r]), n ? U(r, n, o, i) : o(i);
            t._subscribers.length = 0;
          }
        }
        function x() {
          this.error = null;
        }
        function I(t, e) {
          try {
            return t(e);
          } catch (t) {
            return (ct.error = t), ct;
          }
        }
        function U(t, e, r, n) {
          var i = o(r),
            s = void 0,
            a = void 0,
            u = void 0,
            c = void 0;
          if (i) {
            if (
              ((s = I(r, n)),
              s === ct ? ((c = !0), (a = s.error), (s = null)) : (u = !0),
              e === s)
            )
              return void B(e, v());
          } else (s = n), (u = !0);
          e._state !== it ||
            (i && u
              ? A(e, s)
              : c
              ? B(e, a)
              : t === st
              ? O(e, s)
              : t === at && B(e, s));
        }
        function R(t, e) {
          try {
            e(
              function(e) {
                A(t, e);
              },
              function(e) {
                B(t, e);
              }
            );
          } catch (e) {
            B(t, e);
          }
        }
        function D() {
          return ft++;
        }
        function k(t) {
          (t[ot] = ft++),
            (t._state = void 0),
            (t._result = void 0),
            (t._subscribers = []);
        }
        function F(t, e) {
          (this._instanceConstructor = t),
            (this.promise = new t(m)),
            this.promise[ot] || k(this.promise),
            G(e)
              ? ((this._input = e),
                (this.length = e.length),
                (this._remaining = e.length),
                (this._result = new Array(this.length)),
                0 === this.length
                  ? O(this.promise, this._result)
                  : ((this.length = this.length || 0),
                    this._enumerate(),
                    0 === this._remaining && O(this.promise, this._result)))
              : B(this.promise, L());
        }
        function L() {
          return new Error("Array Methods must be provided an Array");
        }
        function C(t) {
          return new F(this, t).promise;
        }
        function H(t) {
          var e = this;
          return new e(
            G(t)
              ? function(r, n) {
                  for (var o = t.length, i = 0; i < o; i++)
                    e.resolve(t[i]).then(r, n);
                }
              : function(t, e) {
                  return e(new TypeError("You must pass an array to race."));
                }
          );
        }
        function M(t) {
          var e = this,
            r = new e(m);
          return B(r, t), r;
        }
        function N() {
          throw new TypeError(
            "You must pass a resolver function as the first argument to the promise constructor"
          );
        }
        function V() {
          throw new TypeError(
            "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
          );
        }
        function q(t) {
          (this[ot] = D()),
            (this._result = this._state = void 0),
            (this._subscribers = []),
            m !== t &&
              ("function" != typeof t && N(),
              this instanceof q ? R(this, t) : V());
        }
        function Y() {
          var t = void 0;
          if ("undefined" != typeof n) t = n;
          else if ("undefined" != typeof self) t = self;
          else
            try {
              t = Function("return this")();
            } catch (t) {
              throw new Error(
                "polyfill failed because global object is unavailable in this environment"
              );
            }
          var e = t.Promise;
          if (e) {
            var r = null;
            try {
              r = Object.prototype.toString.call(e.resolve());
            } catch (t) {}
            if ("[object Promise]" === r && !e.cast) return;
          }
          t.Promise = q;
        }
        var K = void 0;
        K = Array.isArray
          ? Array.isArray
          : function(t) {
              return "[object Array]" === Object.prototype.toString.call(t);
            };
        var G = K,
          X = 0,
          J = void 0,
          W = void 0,
          z = function(t, e) {
            (rt[X] = t),
              (rt[X + 1] = e),
              (X += 2),
              2 === X && (W ? W(h) : nt());
          },
          Q = "undefined" != typeof window ? window : void 0,
          Z = Q || {},
          $ = Z.MutationObserver || Z.WebKitMutationObserver,
          tt =
            "undefined" == typeof self &&
            "undefined" != typeof e &&
            "[object process]" === {}.toString.call(e),
          et =
            "undefined" != typeof Uint8ClampedArray &&
            "undefined" != typeof importScripts &&
            "undefined" != typeof MessageChannel,
          rt = new Array(1e3),
          nt = void 0;
        nt = tt ? a() : $ ? c() : et ? f() : void 0 === Q ? d() : l();
        var ot = Math.random()
            .toString(36)
            .substring(16),
          it = void 0,
          st = 1,
          at = 2,
          ut = new x(),
          ct = new x(),
          ft = 0;
        return (
          (F.prototype._enumerate = function() {
            for (
              var t = this.length, e = this._input, r = 0;
              this._state === it && r < t;
              r++
            )
              this._eachEntry(e[r], r);
          }),
          (F.prototype._eachEntry = function(t, e) {
            var r = this._instanceConstructor,
              n = r.resolve;
            if (n === y) {
              var o = w(t);
              if (o === p && t._state !== it)
                this._settledAt(t._state, e, t._result);
              else if ("function" != typeof o)
                this._remaining--, (this._result[e] = t);
              else if (r === q) {
                var i = new r(m);
                T(i, t, o), this._willSettleAt(i, e);
              } else
                this._willSettleAt(
                  new r(function(e) {
                    return e(t);
                  }),
                  e
                );
            } else this._willSettleAt(n(t), e);
          }),
          (F.prototype._settledAt = function(t, e, r) {
            var n = this.promise;
            n._state === it &&
              (this._remaining--, t === at ? B(n, r) : (this._result[e] = r)),
              0 === this._remaining && O(n, this._result);
          }),
          (F.prototype._willSettleAt = function(t, e) {
            var r = this;
            P(
              t,
              void 0,
              function(t) {
                return r._settledAt(st, e, t);
              },
              function(t) {
                return r._settledAt(at, e, t);
              }
            );
          }),
          (q.all = C),
          (q.race = H),
          (q.resolve = y),
          (q.reject = M),
          (q._setScheduler = i),
          (q._setAsap = s),
          (q._asap = z),
          (q.prototype = {
            constructor: q,
            then: p,
            catch: function(t) {
              return this.then(null, t);
            }
          }),
          (q.polyfill = Y),
          (q.Promise = q),
          q
        );
      });
    }.call(
      e,
      r(14),
      (function() {
        return this;
      })()
    ));
  },
  function(t, e) {
    function r() {
      throw new Error("setTimeout has not been defined");
    }
    function n() {
      throw new Error("clearTimeout has not been defined");
    }
    function o(t) {
      if (f === setTimeout) return setTimeout(t, 0);
      if ((f === r || !f) && setTimeout)
        return (f = setTimeout), setTimeout(t, 0);
      try {
        return f(t, 0);
      } catch (e) {
        try {
          return f.call(null, t, 0);
        } catch (e) {
          return f.call(this, t, 0);
        }
      }
    }
    function i(t) {
      if (l === clearTimeout) return clearTimeout(t);
      if ((l === n || !l) && clearTimeout)
        return (l = clearTimeout), clearTimeout(t);
      try {
        return l(t);
      } catch (e) {
        try {
          return l.call(null, t);
        } catch (e) {
          return l.call(this, t);
        }
      }
    }
    function s() {
      y &&
        d &&
        ((y = !1), d.length ? (p = d.concat(p)) : (m = -1), p.length && a());
    }
    function a() {
      if (!y) {
        var t = o(s);
        y = !0;
        for (var e = p.length; e; ) {
          for (d = p, p = []; ++m < e; ) d && d[m].run();
          (m = -1), (e = p.length);
        }
        (d = null), (y = !1), i(t);
      }
    }
    function u(t, e) {
      (this.fun = t), (this.array = e);
    }
    function c() {}
    var f,
      l,
      h = (t.exports = {});
    !(function() {
      try {
        f = "function" == typeof setTimeout ? setTimeout : r;
      } catch (t) {
        f = r;
      }
      try {
        l = "function" == typeof clearTimeout ? clearTimeout : n;
      } catch (t) {
        l = n;
      }
    })();
    var d,
      p = [],
      y = !1,
      m = -1;
    (h.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
      p.push(new u(t, e)), 1 !== p.length || y || o(a);
    }),
      (u.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (h.title = "browser"),
      (h.browser = !0),
      (h.env = {}),
      (h.argv = []),
      (h.version = ""),
      (h.versions = {}),
      (h.on = c),
      (h.addListener = c),
      (h.once = c),
      (h.off = c),
      (h.removeListener = c),
      (h.removeAllListeners = c),
      (h.emit = c),
      (h.prependListener = c),
      (h.prependOnceListener = c),
      (h.listeners = function(t) {
        return [];
      }),
      (h.binding = function(t) {
        throw new Error("process.binding is not supported");
      }),
      (h.cwd = function() {
        return "/";
      }),
      (h.chdir = function(t) {
        throw new Error("process.chdir is not supported");
      }),
      (h.umask = function() {
        return 0;
      });
  },
  function(t, e) {}
]);
//# sourceMappingURL=coveoua.js.map
