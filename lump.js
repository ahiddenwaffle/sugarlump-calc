// JavaScript source code
(function (a, b, c, d, e, f) { function k(a) { var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = []; for (c || (a = [c++]); d > f;)h[f] = f++; for (f = 0; d > f; f++)h[f] = h[g = j & g + a[f % c] + (b = h[f])], h[g] = b; (e.g = function (a) { for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;)b = h[f = j & f + 1], c = c * d + h[j & (h[f] = h[g = j & g + b]) + (h[g] = b)]; return e.i = f, e.j = g, c })(d) } function l(a, b) { var e, c = [], d = (typeof a)[0]; if (b && "o" == d) for (e in a) try { c.push(l(a[e], b - 1)) } catch (f) { } return c.length ? c : "s" == d ? a : a + "\0" } function m(a, b) { for (var d, c = a + "", e = 0; c.length > e;)b[j & e] = j & (d ^= 19 * b[j & e]) + c.charCodeAt(e++); return o(b) } function n(c) { try { return a.crypto.getRandomValues(c = new Uint8Array(d)), o(c) } catch (e) { return [+new Date, a, a.navigator.plugins, a.screen, o(b)] } } function o(a) { return String.fromCharCode.apply(0, a) } var g = c.pow(d, e), h = c.pow(2, f), i = 2 * h, j = d - 1; c.seedrandom = function (a, f) { var j = [], p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j), q = new k(j); return m(o(q.S), b), c.random = function () { for (var a = q.g(e), b = g, c = 0; h > a;)a = (a + c) * d, b *= d, c = q.g(1); for (; a >= i;)a /= 2, b /= 2, c >>>= 1; return (a + c) / b }, p }, m(c.random(), b) })(this, [], Math, 256, 6, 52);
function choose(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

seed = "" //test
ascensionMode = 0
spellsCastTotal = 0
dragonflight = false
on_screen_cookies = 0
save_string = ""
lookahead = 10

load_more = function () {
    lookahead += 10
    update_cookies()
}

loadGame = function () {
    str = document.getElementById("save").value
    if (!str) {
        str = save_string
    }
    str = str.split('!END!')[0];
    str = Base64.decode(str);
    str = str.split('|');
    //console.log(str)
    warning = ''
    sucralosia = false
    upgrades = str[6].split('')
    grandmas = str[5].split(';')[1].toString().split(',')[0]
    otherStuff = str[4]
    spl = str[2].split(';');
    lumpT = parseInt(otherStuff[44])
    seed = spl[4];
    hour = 1000 * 60 * 60;
    lumpMatureAge = hour * 20;
    lumpRipeAge = hour * 23;
    curve = false
    //console.log("lumpT: " + lumpT)
    //console.log("seed: " + seed)
    lumpCurrentType = 0;
    elder = 0
    if (otherStuff[9]) {
        elder = 1
    }
    // What upgrades are owned?
    if (upgrades[408 * 2]) { //heavenly upgrade
        var mestr = [upgrades[408 * 2], upgrades[408 * 2 + 1]];
        if (parseInt(mestr[1]) == 1) {
            lumpRipeAge -= hour
        }
    }
    if (upgrades[410 * 2]) { //heavenly upgrade
        var mestr = [upgrades[410 * 2], upgrades[410 * 2 + 1]];
        if (parseInt(mestr[1]) == 1) {
            sucralosia = true
        }
    }
    if (upgrades[451 * 2]) { //sugar aging processes
        var mestr = [upgrades[451 * 2], upgrades[451 * 2 + 1]];
        if (parseInt(mestr[1]) == 1) {
            lumpRipeAge -= (6000 * Math.min(600, grandmas))
        }
    }
    godLevel = document.getElementById("god").value //god
    switch (godLevel) {
        case "none":
            break;
        case "diamond":
            lumpRipeAge -= hour
            break;
        case "ruby":
            lumpRipeAge -= (hour / 3) * 2
            break;
        case "jade":
            lumpRipeAge -= (hour / 3)
            break;
    }
    if (parseInt(str[4].split(';')[36]) == 17 || parseInt(str[4].split(';')[37]) == 17) { //Dragon's curve
        lumpRipeAge /= 1.05
        curve = true
    }
    for (elmo = 1; lumpCurrentType == 0; elmo++) {
        Math.seedrandom(seed + '/' + (lumpT + (lumpRipeAge + hour) * elmo));
        if ((lumpT + (lumpRipeAge + hour) * elmo) % 1 != 0) {
            warning = "(lumpT will not be a whole number, accuracy may vary)"
        }
        var rand = Math.random();
        var types = [0];
        var loop = 1;
        if (curve) loop = 2;
        for (var i = 0; i < loop; i++) {
            if (rand < (sucralosia ? 0.15 : 0.1)) types.push(1);//bifurcated
            if (rand < 3 / 1000) types.push(2);//golden
            if (rand < 0.1 * elder) types.push(3);//meaty
            if (rand < 1 / 50) types.push(4);//caramelized
        }
        lumpCurrentType = choose(types);
    }
    switch (lumpCurrentType) {
        case 0:
            lumpNexttype = "Normal"
            break;
        case 1:
            lumpNexttype = "Bifurcated"
            break;
        case 2:
            lumpNexttype = "Golden"
            break;
        case 3:
            lumpNexttype = "Meaty"
            break;
        case 4:
            lumpNexttype = "Carmelized"
            break;
    }

    document.getElementById("lump").innerHTML = "You will have a " + lumpNexttype + " after " + elmo + " lumps" + warning;
}

    //ABOVE CODE "BORROWED" FROM  http://fthof-planner.s3-website.us-east-2.amazonaws.com/

