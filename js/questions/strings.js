// Questions about strings!
//
// Written by Andrew Dutcher for Project Awesome Next Steps, CMPSC 130E, Spring 2014

var CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
var HEXNUMBERS = '0123456789abcdef';
var ESCAPES = ['\\n', '\\r', '\\t', '\\\\', '\\0', '\\\\0'];
var WORDS = ['pizza', 'password', 'egg', 'nutmeg', 'virginia', 'perhaps', 
    'another', 'mailbox', 'container', 'child', 'shenanigans', 'toodles', 
    'banana', 'moon', 'creation', 'attack', 'poodle', 'belgium', 'foo',
    'terrible', 'laser', 'eight', 'utility', 'government', 'cosine',
    'fragment', 'relatable', 'friendship'];

var ALLOPTIONS = [CAPITALS, LOWERCASE, HEXNUMBERS, ESCAPES, WORDS, WORDS, null];

var NUMCHOICES = 4;

function isInArray(haystack, needle) {
    return haystack.indexOf(needle) != -1;
}

function listMin(list) {
    return list.reduce(function (a, b) { return Math.min(a, b); });
}
function listMax(list) {
    return list.reduce(function (a, b) { return Math.max(a, b); });
}

function setAdd(set, item) {
    if (!isInArray(set, item)) {
        set.push(item);
        return true;
    }
    return false;
}

function cStringsQuestion(randomStream) {
    this.choices = [];
    this.dummylength = randomStream.nextIntRange(256) + 256;
    this.choices.push(this.dummylength);
    var magicString = randString(randomStream, 10, true);
    this.questionString = '"' + magicString.string + '"';
    this.answer = magicString.length;
    setAdd(this.choices, this.answer);
    this.dumbanswer = magicString.string.length;

    if (randomStream.nextIntRange(3) == 0) {
        magicString = randString(randomStream, 8, true);
        this.questionString += ';\nchar buf2[' + this.dummylength + '] = "' + magicString.string + '";\nstrcat(buf, buf2)';
        this.answer += magicString.length;
        this.dumbanswer += magicString.string.length;
        setAdd(this.choices, this.answer);
    }

    setAdd(this.choices, this.dumbanswer);
    while (this.choices.length < NUMCHOICES) {
        setAdd(this.choices, randomStream.nextIntRange(listMax(this.choices)));
    }

    randomStream.shuffle(this.choices);
    this.correctIndex = this.choices.indexOf(this.answer);

    this.formatQuestion = function (format) {
        switch (format) {
            case 'HTML':
                return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var out = '<p><pre>char buf[' + this.dummylength + '] = '+ this.questionString + ';\nint x = strlen(buf);'
            + "</pre> What is the value of x?</p><p>";
        for (var i = 0; i < this.choices.length; i++) {
            out += '<strong>' + String.fromCharCode(i + 0x61) + ') </strong>';
            out += this.choices[i].toString() + '<br>';
        }
        out += '</p>';
        return out;
    };

    this.formatAnswer = function (format) {
        switch (format) {
            case 'HTML':
            case 'text':
                return String.fromCharCode(this.correctIndex + 0x41);
        }
    };
}

function pyStringsQuestion(randomStream) {
    this.choices = [];
    var magicString = randString(randomStream, 10, false);
    this.questionString = '"' + magicString.string + '"';
    var slicequestion = randomStream.nextIntRange(3) != 0;
    if (slicequestion) {
        var step = 1;
        if (randomStream.nextIntRange(4) == 0) {
            step = -1;
        }
        var to = randomStream.nextIntRange(magicString.length + 1);
        var from = randomStream.nextIntRange(to + 1);
        if (to != magicString.length && randomStream.nextIntRange(4) == 0) to -= magicString.length;
        if (randomStream.nextIntRange(4) == 0) from -= magicString.length;

        if (step < 0) {
            var t = to;
            to = from;
            from = t;
        }
        if (randomStream.nextIntRange(4) == 0) step *= 3;
        else if (randomStream.nextIntRange(4) == 0) step *= 3;

        this.answer = magicSlice(magicString, from, to, step).string;
        this.choices.push('"' + this.answer + '"');
        while (this.choices.length < NUMCHOICES) {
            var ato = to;
            var afrom = from;
            var astep = step;
            for (var acc = 0; acc < 10; acc += randomStream.nextIntRange(12)) {
                switch (randomStream.nextIntRange(8)) {
                    case 0:
                        ato++;
                        break;
                    case 1:
                        ato--;
                        break;
                    case 2:
                        afrom--;
                        break;
                    case 3:
                        afrom++;
                        break;
                    case 4:
                        astep--;
                        break;
                    case 5:
                        astep++;
                        break;
                    case 6:
                        astep = 1;
                        break;
                    case 7:
                        var t = ato;
                        ato = afrom;
                        afrom = t;
                        astep *= -1;
                        break;
                }
            }
            var res = magicSlice(magicString, afrom, ato, astep);
            if (res !== null) {
                setAdd(this.choices, '"' + res.string + '"');
            }
        }

        if ((from == 0 || from == -magicString.length) && randomStream.nextIntRange(4) != 0) {
            from == '';
        }
        if (to == magicString.length) {
            to == '';
        }
        this.questionString += '[' + from + ':' + to;
        if (step != 1) {
            this.questionString += ':' + step;
        }
        this.questionString += ']';
        randomStream.shuffle(this.choices);
        this.correctIndex = this.choices.indexOf('"' + this.answer + '"');
    } else {
        this.questionString = 'len(' + this.questionString + ')';
        this.answer = magicString.length;
        setAdd(this.choices, this.answer);
        setAdd(this.choices, magicString.string.length);
        while (this.choices.length < NUMCHOICES) {
            setAdd(this.choices, randomStream.nextIntRange(Math.round(listMax(this.choices)*1.25)));
        }
        randomStream.shuffle(this.choices);
        this.correctIndex = this.choices.indexOf(this.answer);
    }


    this.formatQuestion = function (format) {
        switch (format) {
            case 'HTML':
                return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var out = '<p><pre>&gt;&gt;&gt; x = ' + this.questionString
            + "</pre> What is the value of x?</p><p>";
        for (var i = 0; i < this.choices.length; i++) {
            out += '<strong>' + String.fromCharCode(i + 0x61) + ') </strong>'
                + this.choices[i] + '<br>';
        }
        return out;
    };

    this.formatAnswer = function (format) {
        switch (format) {
            case 'HTML':
            case 'text':
                return String.fromCharCode(this.correctIndex + 0x41);
        }
    };
}

function randString(randomStream, minLength, isC) {
    var out = '';
    var countHalted = false;
    var length = 0;
    while (out.length < minLength || randomStream.nextIntRange(out.length) < minLength) {
        var type = randomStream.pick(ALLOPTIONS);
        if (type === null) {
            if (isC) {
                continue;
            } else {
                out += '\\x' + randomStream.pick(HEXNUMBERS) + randomStream.pick(HEXNUMBERS);
                length++;
            }
        } else {
            var item = randomStream.pick(type);
            out += item;
            if (countHalted) continue;
            if (item == '\\0' && isC) {
                countHalted = true;
                continue;
            }
            if (type == ESCAPES) {
                length++;
                if (item == '\\\\0') length++;
            } else {
                length += item.length;
            }
        }
    }
    return {
        string: out,
        length: length
    };
}

function magicSlice(magicString, from, to, step) {
    if (typeof step == 'undefined') step = 1;
    if (typeof to == 'undefined') {
        if (from == -1) to = magicString.length;
        else to = from + 1;
    }
    if (from < 0) {
        from = magicString.length + from;
    }
    if (to < 0) {
        to = magicString.length + to;
    }
    var reversed = step < 0;
    if (reversed) {
        step *= -1;
    }
    // This function would be like ten zillion times easier to write in python
    
    var out = '';
    var ch = '';
    var length = 0;
    for (var i = 0, c = 0; i < magicString.string.length; c++) {
        ch = magicString.string[i];
        i++;
        if (ch == '\\') {
            ch += magicString.string[i];
            i++;
            if (ch == '\\x') {
                ch += magicString.string[i] + magicString.string[i+1];
                i += 2;
            }
        }
        if (reversed) {
            if (c <= from && c > to && (c - from) % step == 0) {
                out = ch + out;
                length++;
            }
        } else {
            if (c >= from && c < to && (c - from) % step == 0) {
                out += ch;
                length++;
            }
        }
    }
    return {
        string: out,
        length: length
    };
}
