(function() {

  'use strict';

  var vis = Visual({
    categories: {
      0: ["undefined", '#d42828'],
      1: ["Motion", '#4a6cd4'],
      2: ["Looks", '#8a55d7'],
      3: ["Sound", '#bb42c3'],
      4: ["Pen", '#0e9a6c'], // Scratch 1.4: #009870
      5: ["Events", '#c88330'],
      6: ["Control", '#e1a91a'],
      7: ["Sensing", '#2ca5e2'],
      8: ["Operators", '#5cb712'],
      9: ["Data", '#ee7d16'], // Scratch 1.4: #f3761d
      10: ["More Blocks", '#632d99'], // #531e99
      11: ["Parameter", '#5947b1'],
      12: ["List", '#cc5b22'], // Scratch 1.4: #d94d11
      20: ["Exension", '#4b4a60'] // #72228c / #672d79
    },
    blocks: {
      // motion
      "forward:": ["c", "move %n steps", 1, 10],
      "turnRight:": ["c", "turn @turnRight %n degrees", 1, 15],
      "turnLeft:": ["c", "turn @turnLeft %n degrees", 1, 15],

      "heading:": ["c", "point in direction %d.direction", 1, 90],
      "pointTowards:": ["c", "point towards %m.spriteOrMouse", 1, ""],

      "gotoX:y:": ["c", "go to x:%n y:%n", 1, 0, 0],
      "gotoSpriteOrMouse:": ["c", "go to %m.spriteOrMouse", 1, "mouse-pointer"],
      "glideSecs:toX:y:elapsed:from:": ["c", "glide %n secs to x:%n y:%n", 1, 1, 0, 0],

      "changeXposBy:": ["c", "change x by %n", 1, 10],
      "xpos:": ["c", "set x to %n", 1, 0],
      "changeYposBy:": ["c", "change y by %n", 1, 10],
      "ypos:": ["c", "set y to %n", 1, 0],

      "bounceOffEdge": ["c", "if on edge, bounce", 1],

      "setRotationStyle": ["c", "set rotation style %m.rotationStyle", 1, "left-right"],

      "xpos": ["r", "x position", 1],
      "ypos": ["r", "y position", 1],
      "heading": ["r", "direction", 1],

      // looks
      "say:duration:elapsed:from:": ["c", "say %s for %n secs", 2, "Hello!", 2],
      "say:": ["c", "say %s", 2, "Hello!"],
      "think:duration:elapsed:from:": ["c", "think %s for %n secs", 2, "Hmm...", 2],
      "think:": ["c", "think %s", 2, "Hmm..."],

      "show": ["c", "show", 2],
      "hide": ["c", "hide", 2],

      "lookLike:": ["c", "switch costume to %m.costume", 2, "costume1"],
      "nextCostume": ["c", "next costume", 2],
      "startScene": ["c", "switch backdrop to %m.backdrop", 2, "backdrop1"],

      "changeGraphicEffect:by:": ["c", "change %m.effect effect by %n", 2, "color", 25],
      "setGraphicEffect:to:": ["c", "set %m.effect effect to %n", 2, "color", 0],
      "filterReset": ["c", "clear graphic effects", 2],

      "changeSizeBy:": ["c", "change size by %n", 2, 10],
      "setSizeTo:": ["c", "set size to %n%", 2, 100],

      "comeToFront": ["c", "go to front", 2],
      "goBackByLayers:": ["c", "go back %n layers", 2, 1],

      "costumeIndex": ["r", "costume #", 2],
      "sceneName": ["r", "backdrop name", 2],
      "scale": ["r", "size", 2],

      // stage looks
      "startSceneAndWait": ["c", "switch backdrop to %m.backdrop and wait", 102, "backdrop1"],
      "nextScene": ["c", "next backdrop", 102],

      "backgroundIndex": ["r", "backdrop #", 102],

      // sound
      "playSound:": ["c", "play sound %m.sound", 3, "pop"],
      "doPlaySoundAndWait": ["c", "play sound %m.sound until done", 3, "pop"],
      "stopAllSounds": ["c", "stop all sounds", 3],

      "playDrum": ["c", "play drum %d.drum for %n beats", 3, 1, 0.25],
      "rest:elapsed:from:": ["c", "rest for %n beats", 3, 0.25],

      "noteOn:duration:elapsed:from:": ["c", "play note %d.note for %n beats", 3, 60, 0.5],
      "instrument:": ["c", "set instrument to %d.instrument", 3, 1],


      "changeVolumeBy:": ["c", "change volume by %n", 3, -10],
      "setVolumeTo:": ["c", "set volume to %n%", 3, 100],
      "volume": ["r", "volume", 3],

      "changeTempoBy:": ["c", "change tempo by %n", 3, 20],
      "setTempoTo:": ["c", "set tempo to %n bpm", 3, 60],
      "tempo": ["r", "tempo", 3],

      // pen
      "clearPenTrails": ["c", "clear", 4],

      "stampCostume": ["c", "stamp", 4],

      "putPenDown": ["c", "pen down", 4],
      "putPenUp": ["c", "pen up", 4],

      "penColor:": ["c", "set pen color to %c", 4],
      "changePenHueBy:": ["c", "change pen color by %n", 4, 10],
      "setPenHueTo:": ["c", "set pen color to %n", 4, 0],

      "changePenShadeBy:": ["c", "change pen shade by %n", 4, 10],
      "setPenShadeTo:": ["c", "set pen shade to %n", 4, 50],

      "changePenSizeBy:": ["c", "change pen size by %n", 4, 1],
      "penSize:": ["c", "set pen size to %n", 4, 1],

      // triggers
      "whenGreenFlag": ["h", "when @greenFlag clicked", 5],
      "whenKeyPressed": ["h", "when %m.key key pressed", 5, "space"],
      "whenClicked": ["h", "when this sprite clicked", 5],
      "whenSceneStarts": ["h", "when backdrop switches to %m.backdrop", 5, "backdrop1"],

      "whenSensorGreaterThan": ["h", "when %m.triggerSensor > %n", 5, "loudness", 10],

      "whenIReceive": ["h", "when I receive %m.broadcast", 5, "message1"],
      "broadcast:": ["c", "broadcast %m.broadcast", 5, "message1"],
      "doBroadcastAndWait": ["c", "broadcast %m.broadcast and wait", 5, "message1"],

      // control - sprite
      "wait:elapsed:from:": ["c", "wait %n secs", 6, 1],

      "doRepeat": ["c", "repeat %n %t", 6, 10],
      "doForever": ["f", "forever %t", 6],

      "doIf": ["c", "if %b then %t", 6],
      "doIfElse": ["c", "if %b then %t else %t", 6],
      "doWaitUntil": ["c", "wait until %b", 6],
      "doUntil": ["c", "repeat until %b %t", 6],

      "stopScripts": ["f", "stop %m.stop", 6, "all"],

      "whenCloned": ["h", "when I start as a clone", 6],
      "createCloneOf": ["c", "create clone of %m.spriteOnly", 6, 'myself'],
      "deleteClone": ["f", "delete this clone", 6],

      // sensing
      "touching:": ["b", "touching %m.touching?", 7, ""],
      "touchingColor:": ["b", "touching color %c?", 7],
      "color:sees:": ["b", "color %c is touching %c?", 7],
      "distanceTo:": ["r", "distance to %m.spriteOrMouse", 7, ""],

      "doAsk": ["c", "ask %s and wait", 7, "What's your name?"],
      "answer": ["r", "answer", 7],

      "keyPressed:": ["b", "key %m.key pressed?", 7, "space"],
      "mousePressed": ["b", "mouse down?", 7],
      "mouseX": ["r", "mouse x", 7],
      "mouseY": ["r", "mouse y", 7],

      "soundLevel": ["r", "loudness", 7],

      "senseVideoMotion": ["r", "video %m.videoMotionType on %m.stageOrThis", 7, "motion", 'this sprite'],
      "setVideoState": ["c", "turn video %m.videoState", 7, "on"],
      "setVideoTransparency": ["c", "set video transparency to %n%", 7, 50],

      "timer": ["r", "timer", 7],
      "timerReset": ["c", "reset timer", 7],

      "getAttribute:of:": ["r", "%m.attribute of %m.spriteOrStage", 7, 'x position', 'Sprite1'],

      "timeAndDate": ["r", "current %m.timeAndDate", 7, "minute"],
      "timestamp": ["r", "days since 2000", 7],
      "getUserName": ["r", "username", 7],

      // operators
      "+": ["r", "%n + %n", 8, "", ""],
      "-": ["r", "%n - %n", 8, "", ""],
      "*": ["r", "%n * %n", 8, "", ""],
      "/": ["r", "%n / %n", 8, "", ""],

      "randomFrom:to:": ["r", "pick random %n to %n", 8, 1, 10],

      "<": ["b", "%s < %s", 8, "", ""],
      "=": ["b", "%s = %s", 8, "", ""],
      ">": ["b", "%s > %s", 8, "", ""],

      "&": ["b", "%b and %b", 8],
      "|": ["b", "%b or %b", 8],
      "not": ["b", "not %b", 8],

      "concatenate:with:": ["r", "join %s %s", 8, "hello ", "world"],
      "letter:of:": ["r", "letter %n of %s", 8, 1, "world"],
      "stringLength:": ["r", "length of %s", 8, "world"],

      "%": ["r", "%n mod %n", 8, "", ""],
      "rounded": ["r", "round %n", 8, ""],

      "computeFunction:of:": ["r", "%m.mathOp of %n", 8, "sqrt", 9],

      // variables
      "setVar:to:": ["c", "set %m.var to %s", 9, 'variable', 0],
      "changeVar:by:": ["c", "change %m.var by %n", 9, 'variable', 1],
      "showVariable:": ["c", "show variable %m.var", 9, 'variable'],
      "hideVariable:": ["c", "hide variable %m.var", 9, 'variable'],

      // lists
      "append:toList:": ["c", "add %s to %m.list", 12, 'thing', 'list'],

      "deleteLine:ofList:": ["c", "delete %d.listDeleteItem of %m.list", 12, '1', 'list'],
      "insert:at:ofList:": ["c", "insert %s at %d.listItem of %m.list", 12, 'thing', '1', 'list'],
      "setLine:ofList:to:": ["c", "replace item %d.listItem of %m.list with %s", 12, '1', 'list', 'thing'],

      "getLine:ofList:": ["r", "item %d.listItem of %m.list", 12, '1', 'list'],
      "lineCountOfList:": ["r", "length of %m.list", 12, 'list'],
      "list:contains:": ["b", "%m.list contains %s", 12, 'list', 'thing'],

      "showList:": ["c", "show list %m.list", 12, 'list'],
      "hideList:": ["c", "hide list %m.list", 12, 'list'],

      // obsolete blocks from Scratch 1.4 that may be used in older projects
      "drum:duration:elapsed:from:": ["c", "play drum %n for %n beats", 98, 1, 0.25], // Scratch 1.4 MIDI drum
      "midiInstrument:": ["c", "set instrument to %n", 98, 1],
      "isLoud": ["b", "loud?", 98],

      // obsolete blocks from Scratch 1.4 that are converted to new forms (so should never appear):
      "abs": ["r", "abs %n", 98],
      "sqrt": ["r", "sqrt %n", 98],
      "doReturn": ["f", "stop script", 98],
      "stopAll": ["f", "stop all", 98],
      "showBackground:": ["c", "switch to background %m.costume", 98, "backdrop1"],
      "nextBackground": ["c", "next background", 98],
      "doForeverIf": ["f", "forever if %b %t", 98],

      // testing and experimental control prims
      "COUNT": ["r", "counter", 99],
      "CLR_COUNT": ["c", "clear counter", 99],
      "INCR_COUNT": ["c", "incr counter", 99],
      "doForLoop": ["c", "for each %m.varName in %s %t", 99, "v", 10],
      "doWhile": ["c", "while %b %t", 99],
      "warpSpeed": ["c", "all at once %t", 99],

      // stage motion (scrolling)
      "scrollRight": ["c", "scroll right %n", 99, 10],
      "scrollUp": ["c", "scroll up %n", 99, 10],
      "scrollAlign": ["c", "align scene %m.scrollAlign", 99, 'bottom-left'],
      "xScroll": ["r", "x scroll", 99],
      "yScroll": ["r", "y scroll", 99],

      // other obsolete blocks from alpha/beta
      "hideAll": ["c", "hide all sprites", 99],
      "getUserId": ["r", "user id", 99],
    },
    menus: {
      direction: function() {
        return new vis.Menu(
          ['(90) right', 90],
          ['(-90) left', -90],
          ['(0) up', 0],
          ['(180) down', 180]);
      },
      var: function() {
        return new vis.Menu('variable', 'another', vis.Menu.line, 'local');
      },
      list: function() {
        return new vis.Menu('list', 'another', vis.Menu.line, 'local');
      },
      key: function() {
        var m = new vis.Menu('up arrow', 'down arrow', 'left arrow', 'right arrow', 'space');
        var z = 'z'.charCodeAt(0);
        for (var i = 'a'.charCodeAt(0); i <= z; i++) {
          m.add(String.fromCharCode(i));
        }
        var nine = '9'.charCodeAt(0);
        for (var i = '0'.charCodeAt(0); i <= nine; i++) {
          m.add(String.fromCharCode(i));
        }
        return m;
      },
      spriteOrMouse: function() {
        return new vis.Menu('mouse-pointer', vis.Menu.line, 'Sprite2');
      },
      touching: function() {
        return new vis.Menu('mouse-pointer', 'edge', vis.Menu.line, 'Sprite2');
      },
      rotationStyle: function() {
        return new vis.Menu('left-right', 'all around', "don't rotate");
      },
      effect: function() {
        return new vis.Menu('color', 'fisheye', 'whirl', 'pixelate', 'mosaic', 'brightness', 'ghost');
      },
      costume: function() {
        return new vis.Menu('costume1', 'costume2', 'costume3');
      },
      backdrop: function() {
        return new vis.Menu('backdrop1', 'backdrop2', 'backdrop3');
      },
      sound: function() {
        return new vis.Menu('pop');
      },
      broadcast: function() {
        return new vis.Menu(
          'broadcast1',
          vis.Menu.line,
          ['new message...', function() {
            var arg = this;
            var value = prompt('Message name?');
            if (value != null) arg.value = value;
          }]);
      },
      triggerSensor: function() {
        return new vis.Menu('loudness', 'timer', 'video motion');
      },
      stop: function() {
        return new vis.Menu('all', 'this script', 'other scripts in sprite');
      },
      spriteOnly: function() {
        return new vis.Menu('myself', vis.Menu.line, 'Sprite1', 'Sprite2');
      },
      videoMotionType: function() {
        return new vis.Menu('motion', 'direction');
      },
      stageOrThis: function() {
        return new vis.Menu('stage', 'this sprite');
      },
      videoState: function() {
        return new vis.Menu('off', 'on', 'on-flipped');
      },
      spriteOrStage: function() {
        return new vis.Menu('Stage', vis.Menu.line, 'Sprite2');
      },
      attribute: function(arg) {
        return arg.parent.args[1].value === 'Stage' ? new vis.Menu('backdrop #', 'backdrop name', 'volume') : new vis.Menu('x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume');
      },
      timeAndDate: function() {
        return new vis.Menu('year', 'month', 'date', 'day of week', 'hour', 'minute', 'second');
      },
      mathOp: function() {
        return new vis.Menu('abs', 'floor', 'ceiling', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'e ^', '10 ^');
      },
      drum: function() {
        var m = new vis.Menu();
        ['Snare Drum', 'Bass Drum', 'Side Stick', 'Crash Cymbal', 'Open Hi-Hat', 'Closed Hi-Hat', 'Tambourine', 'Hand Clap', 'Claves', 'Wood Block', 'Cowbell', 'Triangle', 'Bongo', 'Conga', 'Cabassa', 'Guiro', 'Vibraslap', 'Open Culca'].forEach(function(x, i) {
          m.add(['('+(i + 1)+') ' + x, i + 1]);
        });
        return m;
      },
      instrument: function() {
        var m = new vis.Menu();
        ['Piano', 'Electric Piano', 'Organ', 'Guitar', 'Electric Guitar', 'Bass', 'Pizzicato', 'Cello', 'Trombone', 'Clarinet', 'Saxophone', 'Flute', 'Wooden Flute', 'Bassoon', 'Choir', 'Vibraphone', 'Music Box', 'Steel Drum', 'Marimba', 'Synth Lead', 'Synth Pad'].forEach(function(x, i) {
          m.add(['('+(i + 1)+') ' + x, i + 1]);
        });
        return m;
      },
      note: function() {
        return new vis.Menu(
          ['(48) Low C', 48],
          ['(50) D', 50],
          ['(52) E', 52],
          ['(53) F', 53],
          ['(55) G', 55],
          ['(57) A', 57],
          ['(59) B', 59],
          ['(60) Middle C', 60],
          ['(62) D', 62],
          ['(64) E', 64],
          ['(65) F', 65],
          ['(67) G', 67],
          ['(69) A', 69],
          ['(71) B', 71],
          ['(72) High C', 72]);
      },
      listItem: function() {
        return new vis.Menu(1, 'last', 'random');
      },
      listDeleteItem: function() {
        return new vis.Menu(1, 'last', vis.Menu.line, 'all');
      }
    }
  });

  var menusThatAcceptReporters = ['broadcast', 'costume', 'backdrop', 'scene', 'sound', 'spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'];
  vis.Arg.prototype.acceptsDropOf = function(b) {
    return this.type !== 't' && (this.type !== 'b' || b.isBoolean) && (this.type !== 'm' || menusThatAcceptReporters.indexOf(this.menu) !== -1);
  };

  var app = new vis.App();

  var p = new vis.Palette(document.querySelector('.palette'));
  app.add(p);

  var palettes = {
    1: [
      // motion
      "forward:",
      "turnRight:",
      "turnLeft:",
      "--",
      "heading:",
      "pointTowards:",
      "--",
      "gotoX:y:",
      "gotoSpriteOrMouse:",
      "glideSecs:toX:y:elapsed:from:",
      "--",
      "changeXposBy:",
      "xpos:",
      "changeYposBy:",
      "ypos:",
      "--",
      "bounceOffEdge",
      "--",
      "setRotationStyle",
      "--",
      "xpos",
      "ypos",
      "heading",
    ],
    2: [
      // looks
      "say:duration:elapsed:from:",
      "say:",
      "think:duration:elapsed:from:",
      "think:",
      "--",
      "show",
      "hide",
      "--",
      "lookLike:",
      "nextCostume",
      "startScene",
      "--",
      "changeGraphicEffect:by:",
      "setGraphicEffect:to:",
      "filterReset",
      "--",
      "changeSizeBy:",
      "setSizeTo:",
      "--",
      "comeToFront",
      "goBackByLayers:",
      "--",
      "costumeIndex",
      "sceneName",
      "scale",
    ],
    102: [
      // stage looks
      "startScene",
      "startSceneAndWait",
      "nextScene",
      "--",
      "changeGraphicEffect:by:",
      "setGraphicEffect:to:",
      "filterReset",
      "--",
      "sceneName",
      "backgroundIndex",
    ],
    3: [
      // sound
      "playSound:",
      "doPlaySoundAndWait",
      "stopAllSounds",
      "--",
      "playDrum",
      "rest:elapsed:from:",
      "--",
      "noteOn:duration:elapsed:from:",
      "instrument:",
      "--",
      "changeVolumeBy:",
      "setVolumeTo:",
      "volume",
      "--",
      "changeTempoBy:",
      "setTempoTo:",
      "tempo",
    ],
    4: [
      // pen
      "clearPenTrails",
      "--",
      "stampCostume",
      "--",
      "putPenDown",
      "putPenUp",
      "--",
      "penColor:",
      "changePenHueBy:",
      "setPenHueTo:",
      "--",
      "changePenShadeBy:",
      "setPenShadeTo:",
      "--",
      "changePenSizeBy:",
      "penSize:",
      "--",
    ],
    104: [
      // stage pen
      "clearPenTrails",
    ],
    5: [
      // triggers
      "whenGreenFlag",
      "whenKeyPressed",
      "whenClicked",
      "whenSceneStarts",
      "--",
      "whenSensorGreaterThan",
      "--",
      "whenIReceive",
      "broadcast:",
      "doBroadcastAndWait",
    ],
    6: [
      // control - sprite
      "wait:elapsed:from:",
      "--",
      "doRepeat",
      "doForever",
      "--",
      "doIf",
      "doIfElse",
      "doWaitUntil",
      "doUntil",
      "--",
      "stopScripts",
      "--",
      "whenCloned",
      "createCloneOf",
      "deleteClone",
      "--",
    ],
    106: [
      // control - stage
      "wait:elapsed:from:",
      "--",
      "doRepeat",
      "doForever",
      "--",
      "doIf",
      "doIfElse",
      "doWaitUntil",
      "doUntil",
      "--",
      "stopScripts",
      "--",
      "createCloneOf",
    ],
    7: [
      // sensing
      "touching:",
      "touchingColor:",
      "color:sees:",
      "distanceTo:",
      "--",
      "doAsk",
      "answer",
      "--",
      "keyPressed:",
      "mousePressed",
      "mouseX",
      "mouseY",
      "--",
      "soundLevel",
      "--",
      "senseVideoMotion",
      "setVideoState",
      "setVideoTransparency",
      "--",
      "timer",
      "timerReset",
      "--",
      "getAttribute:of:",
      "--",
      "timeAndDate",
      "timestamp",
      "getUserName",
    ],
    107: [
      // stage sensing
      "doAsk",
      "answer",
      "--",
      "keyPressed:",
      "mousePressed",
      "mouseX",
      "mouseY",
      "--",
      "soundLevel",
      "--",
      "senseVideoMotion",
      "setVideoState",
      "setVideoTransparency",
      "--",
      "timer",
      "timerReset",
      "--",
      "getAttribute:of:",
      "--",
      "timeAndDate",
      "timestamp",
      "getUserName",
    ],
    8: [
      // operators
      "+",
      "-",
      "*",
      "/",
      "--",
      "randomFrom:to:",
      "--",
      "<",
      "=",
      ">",
      "--",
      "&",
      "|",
      "not",
      "--",
      "concatenate:with:",
      "letter:of:",
      "stringLength:",
      "--",
      "%",
      "rounded",
      "--",
      "computeFunction:of:",
    ],
    9: [
      // variables
      'setVar:to:',
      "changeVar:by:",
      "showVariable:",
      "hideVariable:",

      // lists
      "append:toList:",
      "--",
      "deleteLine:ofList:",
      "insert:at:ofList:",
      "setLine:ofList:to:",
      "--",
      "getLine:ofList:",
      "lineCountOfList:",
      "list:contains:",
      "--",
      "showList:",
      "hideList:"
    ]
  };

  var categoryButton;
  var buttons = {};
  function switchPalette(category) {
    if (categoryButton) {
      categoryButton.className = '';
    }
    categoryButton = buttons[category];
    categoryButton.className = 'selected';
    p.clear();
    (palettes[category] || []).forEach(function(name) {
      p.add(name === '--' ? vis.Palette.space() : new vis.Script().add(new vis.Block(name)));
    });
  }

  function buttonClick() {
    switchPalette(this.value);
  }

  [].forEach.call(document.querySelectorAll('button'), function(b) {
    var cat = vis.getCategory(b.value);
    b.style.color = cat[2];
    b.innerHTML = '<div><strong>' + cat[1] + '</strong></div>';
    buttons[cat[0]] = b;
    b.addEventListener('click', buttonClick);
  });

  switchPalette(1);

  var w = new vis.Workspace(document.querySelector('.workspace'));
  app.add(w);

}());
