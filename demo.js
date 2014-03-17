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
      "--",

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

  var menusThatAcceptReporters = ['broadcast', 'costume', 'backdrop', 'scene', 'sound', 'spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'];
  vis.Arg.prototype.acceptsDropOf = function(b) {
    return this.type !== 't' && (this.type !== 'b' || b.isBoolean) && (this.type !== 'm' || menusThatAcceptReporters.indexOf(this.menu) !== -1);
  };

  vis.Workspace.prototype.padding = 10;
  vis.Workspace.prototype.spacing = 10;

  vis.Palette.prototype.padding = 6;
  vis.Palette.prototype.extraSpace = 6;

  function el(tagName, className) {
    var e = document.createElement(className == null ? 'div' : tagName);
    e.className = className || tagName || '';
    return e;
  }

  var def = Object.defineProperty;

  function resize(o) {
    if (o.resize) o.resize();
  }


  function Editor() {
    this.topBar = new TopBar();
    this.tabPanel = new TabPanel();
    this.stagePanel = new StagePanel();

    this.spritePanel = new SpritePanel();
    this.spritePanel.addIcon('Sprite1');
    this.spritePanel.addIcon('Sprite2');
    this.spritePanel.select(this.spritePanel.icons[0]);

    this.app = new vis.App();
    this.app.add(this.topBar);
    this.app.add(this.tabPanel);
    this.app.add(this.stagePanel);
    this.app.add(this.spritePanel);

    this.el = el('editor');

    this.el.appendChild(this.elFlipButton = el('button', 'flip'));
    this.elFlipButton.innerHTML = '<i></i>See project page';

    this.el.appendChild(this.topBar.el);
    this.el.appendChild(this.tabPanel.el);
    this.el.appendChild(this.stagePanel.el);
    this.el.appendChild(this.spritePanel.el);

    window.addEventListener('resize', this.resize.bind(this));
  }

  Editor.prototype.resize = function() {
    resize(this.topBar);
    resize(this.tabPanel);
    resize(this.stagePanel);
    resize(this.spritePanel);
  };

  function ScriptEditor() {
    this.el = el('script-editor');
    this.el.appendChild(this.elButtons = el('palette-buttons'));
    this.el.appendChild(this.elPalette = el('palette-contents'));
    this.el.appendChild(this.elWorkspace = el('editor-workspace'));
    this.createButtons();

    this.palette = new vis.Palette(this.elPalette);
    this.workspace = new vis.Workspace(this.elWorkspace);

    this.category = 1;
  };

  ScriptEditor.prototype.createButtons = function() {
    var self = this;
    function buttonClick() {
      self.category = this.value;
    }

    this.buttons = {};
    [1, 5, 2, 6, 3, 7, 4, 8, 9, 10].forEach(function(id) {
      var cat = vis.getCategory(id);

      var b = el('button', 'palette-button');
      b.value = id;
      b.style.color = cat[2];
      b.innerHTML = '<div><strong>' + cat[1] + '</strong></div>';
      b.addEventListener('click', buttonClick);

      this.buttons[cat[0]] = b;
      this.elButtons.appendChild(b);
    }, this);
  };

  ScriptEditor.prototype.install = function(parent) {
    parent.add(this.palette);
    parent.add(this.workspace);
    this.resize();
  };

  ScriptEditor.prototype.resize = function() {
    this.palette.resize();
    this.workspace.resize();
  };

  ScriptEditor.prototype.uninstall = function(parent) {
    parent.remove(this.palette);
    parent.remove(this.workspace);
  };

  def(ScriptEditor.prototype, 'category', {
    get: function() {return this._category},
    set: function(value) {
      value = Number(value);
      this._category = value;

      if (this.categoryButton) {
        this.categoryButton.className = 'palette-button';
      }
      this.categoryButton = this.buttons[value];
      this.categoryButton.className = 'palette-button selected';
      this.palette.clear();
      (palettes[value] || []).forEach(function(name) {
        this.palette.add(name === '--' ? vis.Palette.space() : new vis.Script().add(new vis.Block(name)));
      }, this);
    }
  });

  function TabPanel() {
    this.el = el('tab-panel');
    this.el.appendChild(this.elContent = el('tab-panel-content'));

    this.tabPanels = [
      this.scriptEditor = new ScriptEditor(),
      null,
      null];
    this.tabs = [];

    var self = this;
    this.tabClick = function() {
      self.panel = self.tabPanels[this.dataset.index];
    };
    ['Scripts', 'Costumes', 'Sounds'].forEach(this.makeTab, this);

    this.panel = this.scriptEditor;
  }

  TabPanel.prototype.makeTab = function(text) {
    var tab = el('button', 'tab');
    tab.textContent = text;
    tab.dataset.index = this.tabs.length;
    tab.addEventListener('click', this.tabClick);
    this.tabs.push(tab);
    this.el.appendChild(tab);
  };

  def(TabPanel.prototype, 'panel', {
    get: function() {return this._panel},
    set: function(value) {
      if (this._panel) {
        this._tab.className = 'tab';
        this.elContent.removeChild(this._panel.el);
        if (this.parent) this.parent.remove(this._panel);
      }
      this._panel = value;
      this._tab = value && this.tabs[this.tabPanels.indexOf(value)];
      if (value) {
        this._tab.className = 'tab selected';
        this.elContent.appendChild(value.el);
        if (this.parent) this.parent.add(value);
      }
    }
  });

  TabPanel.prototype.install = function(parent) {
    if (this._panel) parent.add(this._panel);
    this.resize();
  };

  TabPanel.prototype.resize = function() {
    if (this._panel) this._panel.resize();
  };

  TabPanel.prototype.uninstall = function(parent) {
    if (this._panel) parent.remove(this._panel);
  };

  function TopBar() {
    this.el = el('top-bar');
    this.languageButton = this.addButton('Language', this.languageMenu);
    this.fileButton = this.addButton('File', this.fileMenu, true);
    this.editButton = this.addButton('Edit', this.editMenu, true);
    this.tipsButton = this.addButton('Tips', this.showTips);
    this.aboutButton = this.addButton('About', this.showAbout);
  }

  TopBar.prototype.addButton = function(text, action, arrow) {
    var button = el('button', 'top-button' + (text === 'Language' ? ' language' : ''));
    button.textContent = text === 'Language' ? '' : text;
    button.addEventListener('click', action.bind(this));
    this.el.appendChild(button);
    if (arrow) {
      [['#ffffff', 'arrow normal'], ['#fba939', 'arrow hovered']].forEach(function(info) {
        var canvas = el('canvas', info[1]);
        canvas.width = 8;
        canvas.height = 6;
        var context = canvas.getContext('2d');
        context.moveTo(0, 0);
        context.lineTo(8, 0);
        context.lineTo(4, 6);
        context.fillStyle = info[0];
        context.fill();
        button.appendChild(canvas);
      });
    }
    return button;
  };

  TopBar.prototype.languageMenu = function() {
    this.showMenu(this.languageButton, new vis.Menu(
      'English').withContext('this'));
  };

  TopBar.prototype.fileMenu = function() {
    this.showMenu(this.fileButton, new vis.Menu(
      'New',
      vis.Menu.line,
      'Save now',
      'Save as a copy',
      'Go to my stuff',
      vis.Menu.line,
      'Upload from your computer',
      'Download to your computer',
      vis.Menu.line,
      'Revert').withContext('this'));
  };

  TopBar.prototype.editMenu = function() {
    this.showMenu(this.editButton, new vis.Menu(
      'Undelete',
      vis.Menu.line,
      'Small stage layout',
      vis.Menu.line,
      'Turbo mode').withContext('this'));
  };
  TopBar.prototype.showTips = function() {};
  TopBar.prototype.showAbout = function() {};

  TopBar.prototype.showMenu = function(button, menu) {
    if (!this.parent) return;
    var bb = button.getBoundingClientRect();
    var bb2 = this.el.getBoundingClientRect();
    menu.showAt(bb.left, bb2.bottom, this.parent);
  };

  function StagePanel() {
    this.el = el('stage-panel stopped');

    this.el.appendChild(this.elTitleBar = el('title-bar'));
    this.fullScreenButton = this.addButton('full-screen');
    this.stopButton = this.addButton('stop');
    this.runButton = this.addButton('run');

    this.elTitleBar.appendChild(this.elVersion = el('version'));
    this.elVersion.textContent = 'js001';

    this.elTitleBar.appendChild(this.elName = el('input', 'project-name'));
    this.elName.value = 'Untitled';

    this.elTitleBar.appendChild(this.elAuthor = el('project-author'));
    this.elAuthor.textContent = 'by nXIII (unshared)';

    this.el.appendChild(this.elStage = el('stage'));
  }

  StagePanel.prototype.addButton = function(className) {
    var button = el('button', 'title-button ' + className);
    this.elTitleBar.appendChild(button);
    return button;
  };

  function SpritePanel() {
    this.stageIcon = new SpriteIcon(this, 'Stage');
    this.icons = [];

    this.el = el('sprite-panel');

    this.el.appendChild(this.elTitleBar = el('title-bar'));
    this.elTitleBar.appendChild(this.elLabel = el('title-label'));
    this.elLabel.textContent = 'Sprites';

    this.elTitleBar.appendChild(this.elNewGroup = el('new-group'));
    this.elNewGroup.textContent = 'New sprite:';
    this.elNewGroup.appendChild(el('button', 'new-button new-library'));
    this.elNewGroup.appendChild(el('button', 'new-button new-paint'));
    this.elNewGroup.appendChild(el('button', 'new-button new-import'));
    this.elNewGroup.appendChild(el('button', 'new-button new-camera'));

    this.el.appendChild(this.elStageSection = el('stage-section'));
    this.elStageSection.appendChild(this.stageIcon.el);
    this.elStageSection.appendChild(this.elNewBackdrop = el('new-backdrop'));
    this.elNewBackdrop.textContent = 'New backdrop:';

    this.el.appendChild(this.elSpriteSection = el('sprite-section'));
    this.select(this.stageIcon);
  }

  SpritePanel.prototype.select = function(icon) {
    if (this.selectedIcon) {
      this.selectedIcon.el.classList.remove('selected');
    }
    if (this.selectedIcon = icon) {
      icon.el.classList.add('selected');
    }
    return this;
  };

  SpritePanel.prototype.addIcon = function(name) {
    var icon = new SpriteIcon(this, name);
    this.icons.push(icon);
    this.elSpriteSection.appendChild(icon.el);
    return this;
  };

  SpritePanel.prototype.install = function(parent) {
    parent.add(this.stageIcon);
    this.icons.forEach(function(icon) {
      parent.add(icon);
    });
  };

  SpritePanel.prototype.uninstall = function() {
    parent.remove(this.stageIcon);
    this.icons.forEach(function(icon) {
      parent.remove(icon);
    });
  };

  function SpriteIcon(panel, name) {
    this.panel = panel;
    this.el = el('sprite-icon');
    this.el.appendChild(this.elThumbnail = el('sprite-thumbnail'));
    this.el.appendChild(this.elName = el('sprite-icon-label'));
    this.elName.textContent = name;
    if (name === 'Stage') {
      this.el.className += ' for-stage';
      this.el.appendChild(this.elInfo = el('sprite-icon-info'));
      this.elInfo.textContent = '1 backdrop';
    } else {
      this.el.appendChild(this.elButton = el('button', 'sprite-icon-button'));
    }
    this.el.addEventListener('click', function() {
      this.panel.select(this);
    }.bind(this));
  }

  var editor = new Editor();
  document.body.appendChild(editor.el);
  editor.resize();
  window.editor = editor;

  var player = document.querySelector('.player');
  var stagePanel = new StagePanel();
  player.appendChild(stagePanel.el);

  var flip = editor.elFlipButton;
  var flipBack = document.querySelector('.flip-back');

  var flipped = false;
  function doFlip() {
    var time = 1;
    editor.style.WebkitTransition =
    player.style.WebkitTransition = 'none';
    editor.style.WebkitTransform =
    player.style.WebkitTransform = 'none';
    var ebb = editor.getBoundingClientRect();
    var pbb = player.getBoundingClientRect();
    var dx = ((pbb.right + pbb.left) - (ebb.right + ebb.left)) / 2;
    var dy = ((pbb.bottom + pbb.top) - (ebb.bottom + ebb.top)) / 2;
    var sx = pbb.width / ebb.width;
    var sy = pbb.height / ebb.height;
    if (flipped) {
      editor.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
      editor.offsetHeight;
      player.offsetHeight;
      editor.style.WebkitTransition =
      player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
      editor.style.WebkitTransform = 'none';
      player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
    } else {
      player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
      editor.offsetHeight;
      player.offsetHeight;
      editor.style.WebkitTransition =
      player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
      editor.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
      player.style.WebkitTransform = 'none';
    }
    flipped = !flipped;
  }

  flip.addEventListener('click', doFlip);
  flipBack.addEventListener('click', doFlip);

}());
