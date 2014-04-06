(function() {
  'use strict';

  var vis = Visual({
    strings: {
      '_mouse_': 'mouse-pointer',
      '_edge_': 'edge',
      '_myself_': 'myself',
      '_stage_': 'Stage'
    },
    // for testing translation
    // getText: function(key) {
    //   return 'TR: ' + (vis.options.strings[key] || key);
    // },
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
      "gotoSpriteOrMouse:": ["c", "go to %m.spriteOrMouse", 1, "_mouse_"],
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
      "startSceneAndWait": ["c", "switch backdrop to %m.backdrop and wait", 2, "backdrop1"],
      "nextScene": ["c", "next backdrop", 2],

      "backgroundIndex": ["r", "backdrop #", 2],

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

      "doRepeat": ["c", "@loop repeat %n %t", 6, 10],
      "doForever": ["f", "@loop forever %t", 6],

      "doIf": ["c", "if %b then %t", 6],
      "doIfElse": ["c", "if %b then %t else %t", 6],
      "doWaitUntil": ["c", "wait until %b", 6],
      "doUntil": ["c", "@loop repeat until %b %t", 6],

      "stopScripts": ["f", "stop %m.stop", 6, "all"],

      "whenCloned": ["h", "when I start as a clone", 6],
      "createCloneOf": ["c", "create clone of %m.spriteOnly", 6, '_myself_'],
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
      "readVariable": ["r", "%l.var", 9, 'variable'],
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
        var m = new vis.Menu;
        [[90, 'right'],
         [-90, 'left'],
         [0, 'up'],
         [180, 'down']].forEach(function(item) {
          m.add(['('+item[0]+') '+vis.getText(item[1]), item[0]]);
        });
        return m;
      },
      var: function() {
        return new vis.Menu('variable', 'another', vis.Menu.line, 'local');
      },
      list: function() {
        return new vis.Menu('list', 'another', vis.Menu.line, 'local');
      },
      key: function() {
        var m = new vis.Menu('up arrow', 'down arrow', 'left arrow', 'right arrow', 'space').translate().addAll('abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
        return m;
      },
      spriteOrMouse: function(arg) {
        return spriteMenu(arg, '_mouse_');
      },
      touching: function(arg) {
        return spriteMenu(arg, '_mouse_', '_edge_');
      },
      rotationStyle: function() {
        return new vis.Menu('left-right', 'all around', "don't rotate").translate();
      },
      effect: function() {
        return new vis.Menu('color', 'fisheye', 'whirl', 'pixelate', 'mosaic', 'brightness', 'ghost').translate();
      },
      costume: function(arg) {
        return new vis.Menu().addAll(arg.app.editor.selectedSprite.costumes.map(getName));
      },
      backdrop: function(arg) {
        return new vis.Menu().addAll(arg.app.editor.stage.costumes.map(getName));
      },
      sound: function(arg) {
        return new vis.Menu().addAll(arg.app.editor.selectedSprite.sounds.map(getName)).add(vis.Menu.line).add(['record...', function() {
          // TODO record a sound
        }]);
      },
      broadcast: function() {
        return new vis.Menu(
          'broadcast1',
          vis.Menu.line,
          [vis.getText('new message...'), function() {
            var arg = this;
            var value = prompt('Message name?');
            if (value != null) arg.value = value;
          }]);
      },
      triggerSensor: function() {
        return new vis.Menu('loudness', 'timer', 'video motion').translate();
      },
      stop: function(arg) {
        function item(value, type) {
          return [vis.getText(value), function() {
            arg.value = value;
            if (arg.parent) arg.parent.type = type;
          }];
        }
        return new vis.Menu(
          item('all', 'f'),
          item('this script', 'f'),
          item('other scripts in sprite', 'c'));
      },
      spriteOnly: function(arg) {
        return spriteMenu(arg, '_myself_');
      },
      videoMotionType: function() {
        return new vis.Menu('motion', 'direction').translate();
      },
      stageOrThis: function() {
        return new vis.Menu('Stage', 'this sprite').translate();
      },
      videoState: function() {
        return new vis.Menu('off', 'on', 'on-flipped').translate();
      },
      spriteOrStage: function(arg) {
        return spriteMenu(arg, '_stage_');
      },
      attribute: function(arg) {
        return arg.parent.args[1].value === '_stage_' ? new vis.Menu('backdrop #', 'backdrop name', 'volume').translate() : new vis.Menu('x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume').translate(); // TODO variables
      },
      timeAndDate: function() {
        return new vis.Menu('year', 'month', 'date', 'day of week', 'hour', 'minute', 'second').translate();
      },
      mathOp: function() {
        return new vis.Menu('abs', 'floor', 'ceiling', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'e ^', '10 ^').translate();
      },
      drum: function() {
        return new vis.Menu().addAll(['Snare Drum', 'Bass Drum', 'Side Stick', 'Crash Cymbal', 'Open Hi-Hat', 'Closed Hi-Hat', 'Tambourine', 'Hand Clap', 'Claves', 'Wood Block', 'Cowbell', 'Triangle', 'Bongo', 'Conga', 'Cabassa', 'Guiro', 'Vibraslap', 'Open Culca'].map(function(x, i) {return ['('+(i + 1)+') ' + vis.getText(x), i + 1]}));
        return m;
      },
      instrument: function() {
        return new vis.Menu().addAll(['Piano', 'Electric Piano', 'Organ', 'Guitar', 'Electric Guitar', 'Bass', 'Pizzicato', 'Cello', 'Trombone', 'Clarinet', 'Saxophone', 'Flute', 'Wooden Flute', 'Bassoon', 'Choir', 'Vibraphone', 'Music Box', 'Steel Drum', 'Marimba', 'Synth Lead', 'Synth Pad'].map(function(x, i) {return ['('+(i + 1)+') ' + vis.getText(x), i + 1]}));
      },
      note: function() {
        return new vis.Menu().addAll([
          [48, 'Low C'],
          [50, 'D'],
          [52, 'E'],
          [53, 'F'],
          [55, 'G'],
          [57, 'A'],
          [59, 'B'],
          [60, 'Middle C'],
          [62, 'D'],
          [64, 'E'],
          [65, 'F'],
          [67, 'G'],
          [69, 'A'],
          [71, 'B'],
          [72, 'High C']].map(function(i) {return ['('+i[0]+') '+vis.getText(i[1]), i[0]]}));
      },
      listItem: function() {
        return new vis.Menu(1).addTranslated('last').addTranslated('random');
      },
      listDeleteItem: function() {
        return new vis.Menu(1).addTranslated('last').add(vis.Menu.line).addTranslated('all');
      }
    }
  });

  var palettes = {
    1: [
      // motion
      {if: "stage", then: [
        {text: "Stage selected:"},
        {text: "No motion blocks"}
      ], else: [
        "forward:",
        "turnRight:",
        "turnLeft:",
        "---",
        "heading:",
        "pointTowards:",
        "---",
        "gotoX:y:",
        "gotoSpriteOrMouse:",
        "glideSecs:toX:y:elapsed:from:",
        "---",
        "changeXposBy:",
        "xpos:",
        "changeYposBy:",
        "ypos:",
        "---",
        "bounceOffEdge",
        "--",
        "setRotationStyle",
        "---",
        "xpos",
        "ypos",
        "heading"
      ]}
    ],
    2: [
      // looks
      {if: "sprite", then: [
        "say:duration:elapsed:from:",
        "say:",
        "think:duration:elapsed:from:",
        "think:",
        "--",
        "show",
        "hide",
        "--",
        "lookLike:",
        "nextCostume"
      ]},
      "startScene",
      {if: "stage", then: [
        "startSceneAndWait",
        "nextScene"
      ]},
      "--",
      "changeGraphicEffect:by:",
      "setGraphicEffect:to:",
      "filterReset",
      "--",
      {if: "sprite", then: [
        "changeSizeBy:",
        "setSizeTo:",
        "--",
        "comeToFront",
        "goBackByLayers:",
        "--",
        "costumeIndex"
      ]},
      "sceneName",
      {if: "stage", then: ["backgroundIndex"], else: ["scale"]}
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
      {if: "sprite", then: [
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
        "penSize:"
      ]}
    ],
    5: [
      // triggers
      "whenGreenFlag",
      "whenKeyPressed",
      "whenClicked",
      "whenSceneStarts",
      "---",
      "whenSensorGreaterThan",
      "---",
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
      {if: "sprite", then: ["whenCloned"]},
      "createCloneOf",
      {if: "sprite", then: ["deleteClone"]}
    ],
    7: [
      // sensing
      {if: "sprite", then: [
        "touching:",
        "touchingColor:",
        "color:sees:",
        "distanceTo:",
        "--",
      ]},
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
      "getUserName"
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
      "computeFunction:of:"
    ],
    9: [
      // variables
      {text: "Make a Variable", action: "newVariable"},
      {if: "variables", then: [
        "readVariable",
        "--",
        "setVar:to:",
        "changeVar:by:",
        "showVariable:",
        "hideVariable:",
        "--"
      ]},

      // lists
      {text: "Make a List", action: "newList"},
      {if: "lists", then: [
        "--",
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
      ]}
    ],
    10: [
      {text: "Make a Block", action: "newBlock"}
    ]
  };

  var menusThatAcceptReporters = ['broadcast', 'costume', 'backdrop', 'scene', 'sound', 'spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'];
  vis.Arg.prototype.acceptsDropOf = function(b) {
    return this.type !== 't' && this.type !== 'l' && (this.type !== 'b' || b.isBoolean) && (this.type !== 'm' || menusThatAcceptReporters.indexOf(this.menu) !== -1);
  };

  vis.Workspace.prototype.paddingX = 10;
  vis.Workspace.prototype.paddingY = 10;
  vis.Workspace.prototype.spacing = 10;

  vis.Palette.prototype.paddingX = 6;
  vis.Palette.prototype.paddingY = 7;
  vis.Palette.prototype.spacing = 5;
  vis.Palette.prototype.extraSpace = 6;
  vis.Palette.prototype.spaceSize = 15;

  vis.Block.prototype.click = function() {
    var app = this.app;
    if (app && app.exec) {
      app.exec.toggleThread(this.topScript, app.editor.selectedSprite);
    }
  };

  vis.Block.prototype.help = function() {
    alert('Help is not available yet.'); // TODO
  };

  vis.Arg.prototype.menuTranslations = {
    'attribute': ['x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume', 'backdrop #', 'backdrop name', 'volume'],
    'backdrop': ['next backdrop', 'previous backdrop'],
    'broadcast': ['new message...'],
    'list': ['delete list', 'rename list'],
    'sound': ['record...'],
    'var': ['delete variable', 'rename variable'],
    'costume': []
  };

  vis.Arg.prototype.shouldTranslate = function(value) {
    if (['spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'].indexOf(this.menu) !== -1) {
      return ['_myself_', '_mouse_', '_edge_', '_stage_'].indexOf(value) !== -1;
    }
    var translations = this.menuTranslations[this.menu];
    return translations ? translations.indexOf(value) !== -1 : true;
  };

  vis.Icon.prototype.icons.turnRight = function(context) {
    context.canvas.width = 16;
    context.canvas.height = 15;
    if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
    context.drawImage(assets, 229, 0, 16, 15, 0, 0, 16, 15);
  };

  vis.Icon.prototype.icons.turnLeft = function(context) {
    context.canvas.width = 16;
    context.canvas.height = 15;
    if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
    context.drawImage(assets, 229, 15, 16, 15, 0, 0, 16, 15);
  };

  vis.Icon.prototype.icons.greenFlag = function(context) {
    context.canvas.width = 23;
    context.canvas.height = 23;
    if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
    context.drawImage(assets, 245, 0, 23, 23, 0, 0, 23, 23);
  };

  vis.Script.prototype.addRunningEffect = function() {
    if (!this._runningEffect) {
      this.addEffect(this.runningEffect);
      this._runningEffect = true;
    }
    return this;
  };

  vis.Script.prototype.runningEffect = function() {
    var canvas = this.shadow(0, 0, 12, '#ff9');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0);
    ctx.drawImage(canvas, 0, 0);
    return canvas;
  };

  vis.Script.prototype.removeRunningEffect = function() {
    this.removeEffect(this.runningEffect);
    this._runningEffect = false;
    return this;
  };

  function el(tagName, className) {
    var e = document.createElement(className == null ? 'div' : tagName);
    e.className = className || tagName || '';
    return e;
  }

  var assets = document.createElement('img');
  var assetsLoaded = false;
  assets.src = 'assets.png';

  assets.onload = function() {
    assetsLoaded = true;
    var i = onAssetsLoadedQueue.length;
    while (i--) {
      var q = onAssetsLoadedQueue[i];
      q[0].call(q[1]);
    }
  };

  var onAssetsLoadedQueue = [];
  function onAssetsLoaded(fn, thisArg) {
    if (assetsLoaded) {
      fn.call(thisArg);
    } else {
      onAssetsLoadedQueue.push([fn, thisArg]);
    }
  }

  var def = Object.defineProperty;
  var slice = [].slice;

  function spriteMenu(arg) { // TODO include/exclude self
    var m = new vis.Menu;
    var a = slice.call(arguments, 1);
    for (var i = 0, l = a.length; i < l; i++) {
      m.add(a[i]);
    }
    m.translate().add(vis.Menu.line);
    arg.app.editor.stage.children.forEach(function(sprite) {
      m.add(sprite.name);
    });
    return m;
  }

  function getName(o) {
    return o.name;
  }

  function resize(o) {
    if (o.resize) o.resize();
  }

  function step(o) {
    if (o.step) o.step();
  }

  function inherits(sub, sup) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }


  function ScratchObj(name) {
    this.name = name;
    this.scripts = [];
    this.costumes = [];
    this.costume = 0;
    this.sounds = [];
  }

  ScratchObj.prototype.addCostume = function(costume) {
    if (this.costumes.indexOf(costume) === -1) {
      this.costumes.push(costume);
      costume.owner = this;
    }
    return this;
  };

  ScratchObj.prototype.redraw = function() {
    this.stage.redraw();
  };


  ScratchObj.prototype.forEachScript = function(fn, context) {
    var s = this.scripts;
    for (var i = 0, l = s.length; i < l; i++) {
      fn.call(context, this, s[i]);
    }
  };


  function Costume(name, canvas, cx, cy) {
    if (typeof canvas === 'string') {
      var img = document.createElement('img');
      img.src = canvas;
      canvas = img;
    }
    if (canvas.tagName === 'IMG') {
      var img = canvas;
      canvas = document.createElement('canvas');
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        this.owner.redraw();
      }.bind(this);
    }
    this.name = name;
    this.canvas = canvas;
    this.cx = cx || 0;
    this.cy = cy || 0;
  }


  function Sprite(name) {
    ScratchObj.call(this, name);
    this.rotationStyle = 'normal';
    this.x = 0;
    this.y = 0;
    this.direction = 90;
    this.scale = 1;
    this.visible = true;
  }
  inherits(Sprite, ScratchObj);

  Sprite.prototype.isSprite = true;

  Sprite.prototype.drawOn = function(context) {
    if (!this.visible) return;
    var costume = this.costumes[this.costume];
    if (costume) {
      context.save();
      context.translate(240 + this.x, 180 - this.y);
      if (this.rotationStyle === 'normal') {
        context.rotate((this.direction - 90) * Math.PI / 180);
      } else if (this.rotationStyle === 'leftRight' && this.direction < 0) {
        context.scale(-1, 1);
      }
      context.scale(this.scale, this.scale);

      context.drawImage(costume.canvas, -costume.cx, -costume.cy);
      context.restore();
    }
  };


  function Stage() {
    ScratchObj.call(this, 'Stage');

    this.mouseX = 0;
    this.mouseY = 0;
    this.children = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width = 480;
    this.canvas.height = 360;
    this.context = this.canvas.getContext('2d');
  }
  inherits(Stage, ScratchObj);

  Stage.prototype.isStage = true;

  Stage.prototype.add = function(child) {
    if (this.children.indexOf(child) === -1) {
      this.children.push(child);
      child.stage = this;
    }
    return this;
  };

  Stage.prototype.redraw = function() {
    this.canvas.width = this.canvas.width;
    this.drawOn(this.context);
  };

  Stage.prototype.drawOn = function(context) {
    var costume = this.costumes[this.costume];
    if (costume) {
      context.drawImage(costume.canvas, 0, 0);
    }
    var children = this.children;
    for (var i = 0, length = children.length; i < length; i++) {
      children[i].drawOn(context);
    }
  };

  Stage.prototype.forEachScript = function(fn, context) {
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      children[i].forEachScript(fn, context);
    }
    ScratchObj.prototype.forEachScript.call(this, fn, context);
  };


  function LocalBackpack() {}

  LocalBackpack.prototype.isBackpack = true;


  function Interpreter(stage, editor) {
    this.stage = stage;
    this.editor = editor;
    this.frameRate = 30;
    this.warpTime = 500;

    this.threads = [];
    this.warpThread = null;

    this.turbo = false;
    this.yield = false;
    this.waiting = false;
    this.redraw = false;

    this.addPrimitives(this.table = {});
  }

  Interpreter.prototype.triggerGreenFlag = function() {
    this.stopAll();
    this.trigger('whenGreenFlag');
  };

  Interpreter.prototype.trigger = function(event, arg) {
    if (arg !== undefined) arg = (''+arg).toLowerCase();
    this.stage.forEachScript(function(sprite, script) {
      if (!script.isEmpty && script.blocks[0].name === event && (arg === undefined || (''+script.blocks[0].args[0].value).toLowerCase() === arg)) {
        this.toggleThread(script, sprite);
      }
    }, this);
  };

  Interpreter.prototype.stopAll = function() {
    var threads = this.threads;
    for (var i = threads.length; i--;) {
      threads[i].topScript.removeRunningEffect();
      threads[i].topScript.thread = null;
    }
    this.threads = [];
  };

  Interpreter.prototype.toggleThread = function(script, target) {
    if (script.isReporter) {
      // TODO
      return;
    }
    if (script.thread) {
      this.stopThread(script.thread);
      return;
    }
    script.addRunningEffect();
    this.threads.push(script.thread = new Thread(this, script, target));
  };

  Interpreter.prototype.findThread = function(script, target) {
    var threads = this.threads;
    for (var i = threads.length; i--;) {
      var t = threads[i];
      if (t.topScript === script && t.target === target) return t;
    }
    return null;
  };

  Interpreter.prototype.stopThread = function(thread) {
    if (thread) {
      var i = this.threads.indexOf(thread);
      if (i !== -1) this.threads.splice(i, 1);
      thread.topScript.removeRunningEffect();
      thread.topScript.thread = null;
    }
  };

  Interpreter.prototype.install = function() {
    this.interval = setInterval(this.step.bind(this), 1000 / this.frameRate);
  };

  Interpreter.prototype.uninstall = function() {
    clearInterval(this.interval);
  };

  Interpreter.prototype.step = function() {
    if (this.threads.length === 0) {
      if (this.editor) this.editor.stagePanel.running = false;
      return;
    }

    var maxTime = 1000 / this.frameRate * .2;

    this.redraw = false;
    this.start = Date.now();
    this.time = this.start;
    do {
      if (this.warpThread && this.warpThread.done) this.warpThread = null;

      var canRun = false;

      var threads = this.threads;
      for (var i = 0, l = threads.length; i < l; i++) {
        this.activeThread = threads[i];
        this.stepActiveThread();

        if (!this.waiting) canRun = true;
        if (this.activeThread.done) {
          this.activeThread.topScript.thread = null;
          this.activeThread.topScript.removeRunningEffect();
          threads.splice(i, 1);
          i--;
          l--;
        }
      }
      this.time = Date.now();
    } while ((this.turbo || !this.redraw) && canRun && this.threads.length && this.time - this.start < maxTime);

    if (this.redraw) {
      this.stage.redraw();
    }
    if (this.editor) this.editor.stagePanel.running = !!this.threads.length;
  };

  Interpreter.prototype.stepActiveThread = function() {
    var thread = this.activeThread;

    this.yield = false;
    this.waiting = false;
    while (!this.yield) {
      if (this.warpThread === thread) this.time = Date.now();

      if (thread.pc < thread.script.blocks.length) {
        this.evalBlock(thread.script.blocks[thread.pc++]);
      }

      while (thread.pc >= thread.script.blocks.length) {
        if (thread.unwarp) {
          this.warpThread = null;
        }
        if (!thread.popStack()) {
          thread.done = true;
          return;
        }
        if (thread.isLoop) {
          if (this.activeThread !== this.warpThread || this.time - this.start > this.warpTime) return;
        }
      }
    }
  };

  Interpreter.prototype.evalBlock = function(b) {
    // log block arguments
    // console.log.apply(console, [b.name].concat(b.args.map(function(a) {
    //   return a.isArg ? a.value : ['block'];
    // })));
    return (b.fn || (b.fn = this.table[b.name] || this.primUndefined))(b);
  };

  Interpreter.prototype.startScript = function(s, isLoop, args) {
    var thread = this.activeThread;
    if (isLoop) thread.pc--;
    if (s.isEmpty) {
      this.yield = true;
      return;
    }
    thread.isLoop = isLoop;
    thread.pushStack(s);
    if (args) thread.args = args;
  };

  Interpreter.prototype.arg = function(b, i) {
    var a = b.args[i];
    return a.isArg ? a.value : this.evalBlock(a);
  };

  Interpreter.prototype.narg = function(b, i) {
    var a = b.args[i];
    var x = a.isArg ? a.value : this.evalBlock(a);
    return Number(x) || 0;
  };

  Interpreter.prototype.barg = function() {
    var a = b.args[i];
    var x = a.isArg ? a.value : this.evalBlock(a);
    return x && x !== '0' && x !== 'false';
  };

  Interpreter.prototype.startTimed = function(duration) {
    var thread = this.activeThread;
    thread.tmp = this.time + Math.max(duration * 1000, 0);
    thread.pc--;
    this.yield = true;
  };

  Interpreter.prototype.stepTimed = function() {
    var thread = this.activeThread;
    if (this.time >= thread.tmp) {
      thread.tmp = null;
      thread.extra = null;
      return true;
    } else {
      thread.pc--;
      this.yield = true;
      return false;
    }
  };

  Interpreter.prototype.addPrimitives = function(table) {
    var interp = this;

    function moveSpriteTo(sprite, x, y) {
      sprite.x = x;
      sprite.y = y;
      if (sprite.visible) interp.redraw = true;
    }

    function turnSprite(sprite, d) {
      d = d % 360;
      if (d <= -180) d += 360;
      if (d > 180) d -= 360;
      sprite.direction = d;
      if (sprite.visible) interp.redraw = true;
    }

    function spriteNamed(name) {
      var children = interp.stage.children;
      for (var i = 0, l = children.length; i < l; i++) {
        if (children[i].name === name) return children[i];
      }
      if (interp.stage.name === name) return interp.stage;
      return null;
    }

    function pointSpriteTowards(sprite, x, y) {
      turnSprite(sprite, 90 - Math.atan2(y - sprite.y, x - sprite.x) * 180 / Math.PI);
    }

    // Motion

    table['forward:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return;

      var steps = interp.narg(b, 0);
      var d = sprite.direction * Math.PI / 180;
      moveSpriteTo(sprite, sprite.x + Math.sin(d) * steps, sprite.y + Math.cos(d) * steps);
    };

    table['turnRight:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) turnSprite(sprite, sprite.direction + interp.narg(b, 0));
    };

    table['turnLeft:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) turnSprite(sprite, sprite.direction - interp.narg(b, 0));
    };

    table['heading:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) turnSprite(sprite, interp.narg(b, 0));
    };

    table['pointTowards:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return;

      var name = interp.arg(b, 0);
      if (name === '_mouse_') {
        pointSpriteTowards(sprite, interp.stage.mouseX, interp.stage.mouseY);
      } else {
        var other = spriteNamed(name);
        if (other) pointSpriteTowards(sprite, other.x, other.y);
      }
    };

    table['gotoX:y:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) moveSpriteTo(sprite, interp.narg(b, 0), interp.narg(b, 1));
    };

    table['gotoSpriteOrMouse:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return;

      var name = interp.arg(b, 0);
      if (name === '_mouse_') {
        moveSpriteTo(sprite, interp.stage.mouseX, interp.stage.mouseY);
      } else {
        var other = spriteNamed(name);
        if (other) moveSpriteTo(sprite, other.x, other.y);
      }
    };

    table['glideSecs:toX:y:elapsed:from:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return;

      if (interp.activeThread.tmp === null) {
        var duration = interp.narg(b, 0);
        interp.startTimed(duration);
        interp.activeThread.extra = {
          start: interp.time,
          ms: duration * 1000,
          sx: sprite.x,
          sy: sprite.y,
          x: interp.narg(b, 1),
          y: interp.narg(b, 2)
        };
        interp.redraw = true;
      } else {
        var extra = interp.activeThread.extra;
        if (interp.stepTimed()) {
          moveSpriteTo(sprite, extra.x, extra.y);
        } else {
          var p = (interp.time - extra.start) / extra.ms;
          var q = 1 - p;
          moveSpriteTo(sprite, extra.sx * q + extra.x * p, extra.sy * q + extra.y * p);
        }
      }
    };

    table['changeXposBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) moveSpriteTo(sprite, sprite.x + interp.narg(b, 0), sprite.y);
    };

    table['xpos:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) moveSpriteTo(sprite, interp.narg(b, 0), sprite.y);
    };

    table['changeYposBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) moveSpriteTo(sprite, sprite.x, sprite.y + interp.narg(b, 0));
    };

    table['ypos:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) moveSpriteTo(sprite, sprite.x, interp.narg(b, 0));
    };

    var ROTATION_STYLES = {
      'all around': 'normal',
      'left-right': 'leftRight',
      "don't rotate": 'none'
    }
    table['setRotationStyle'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) sprite.rotationStyle = ROTATION_STYLES[interp.arg(b, 0)] || 'normal';
    };

    // Looks

    table['say:'] = function(b) {console.log(interp.arg(b, 0))};

    table['show'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.visible = true;
        interp.redraw = true;
      }
    };

    table['hide'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.visible = false;
        interp.redraw = true;
      }
    };

    // Events

    table['whenGreenFlag'] = this.primNoop;
    table['whenKeyPressed'] = this.primNoop;
    table['whenClicked'] = this.primNoop;
    table['whenSceneStarts'] = this.primNoop;
    table['whenSensorGreaterThan'] = this.primNoop;
    table['whenIReceive'] = this.primNoop;

    // Control

    table['doRepeat'] = function(b) {
      if (interp.activeThread.tmp === null) {
        interp.activeThread.tmp = Math.max(0, interp.arg(b, 0));
      }
      if (interp.activeThread.tmp >= 0.5) {
        interp.activeThread.tmp--;
        interp.startScript(b.args[1].script, true);
      } else {
        interp.activeThread.tmp = null;
      }
    };
    table['doForever'] = function(b) {interp.startScript(b.args[0].script, true)};

    // Operators

    table['+'] = function(b) {return interp.narg(b, 0) + interp.narg(b, 1)};
    table['-'] = function(b) {return interp.narg(b, 0) - interp.narg(b, 1)};
    table['*'] = function(b) {return interp.narg(b, 0) * interp.narg(b, 1)};
    table['/'] = function(b) {return interp.narg(b, 0) / interp.narg(b, 1)};

    table['&'] = function(b) {return interp.barg(b, 0) && interp.barg(b, 1)};
    table['|'] = function(b) {return interp.barg(b, 0) || interp.barg(b, 1)};

    table['\\\\'] =
    table['%'] = function(b) {
      var m = interp.narg(b, 1);
      var x = interp.narg(b, 0) % m;
      if (x / m < 0) x += m;
      return x;
    };
  };

  Interpreter.prototype.primNoop = function() {};

  Interpreter.prototype.primUndefined = function(b) {
    console.log('undefined: ' + b.name);
  };


  function Thread(exec, script, target) {
    this.exec = exec;
    this.topScript = script;
    this.target = target;

    this.stack = [];
    this.sp = 0;
    this.extra = null;
    this.expandStack();

    this.script = script;
    this.pc = 0;
    this.tmp = null;
    this.isLoop = false;
    this.unwarp = false;
    this.args = [];

    this.done = false;
    this.yield = false;
  }

  Thread.prototype.pushStack = function(script) {
    if (this.sp === this.stack.length) this.expandStack();

    var state = this.stack[this.sp++];
    state.script = this.script;
    state.pc = this.pc;
    state.tmp = this.tmp;
    state.isLoop = this.isLoop;
    state.unwarp = this.unwarp;
    state.args = this.args;

    this.script = script;
    this.pc = 0;
    this.tmp = null;
    this.isLoop = false;
    this.unwarp = false;
  };

  Thread.prototype.popStack = function() {
    if (this.sp === 0) return false;

    var state = this.stack[--this.sp];
    this.script = state.script;
    this.pc = state.pc;
    this.tmp = state.tmp;
    this.isLoop = state.isLoop;
    this.unwarp = state.unwarp;
    this.args = state.args;
    return true;
  };

  Thread.prototype.expandStack = function() {
    var i = this.stack.length || 4;
    while (i--) {
      this.stack.push({
        script: null,
        pc: null,
        tmp: null,
        isLoop: null,
        args: null
      });
    }
  };


  function Editor() {
    this.stage = new Stage();
    this.stage.add(new Sprite('Sprite1')
      .addCostume(new Costume('costume1', 'costume1.svg', 47, 55))
      .addCostume(new Costume('costume2', 'costume2.png', 57, 41)));
    this.backpack = new LocalBackpack();

    this.exec = new Interpreter(this.stage, this);

    this.topBar = new TopBar(this);
    this.tabPanel = new TabPanel(this);
    this.stagePanel = new StagePanel(this.stage);
    this.backpackPanel = new BackpackPanel(this);
    this.spritePanel = new SpritePanel(this);

    this.app = new vis.App();
    this.app.editor = this;
    this.app.exec = this.exec;
    this.app.add(this.exec);
    this.app.add(this.topBar);
    this.app.add(this.tabPanel);
    this.app.add(this.stagePanel);
    this.app.add(this.spritePanel);
    this.app.add(this.backpackPanel);

    this.el = el('editor');

    this.el.appendChild(this.elTopButtons = el('project-buttons'));
    this.elTopButtons.appendChild(this.elShareButton = el('button', 'project-button'));
    this.elShareButton.innerHTML = 'Share';
    this.elTopButtons.appendChild(this.elFlipButton = el('button', 'project-button flip'));
    this.elFlipButton.innerHTML = '<i></i>See project page';

    this.el.appendChild(this.topBar.el);
    this.el.appendChild(this.tabPanel.el);
    this.el.appendChild(this.stagePanel.el);
    this.el.appendChild(this.spritePanel.el);
    this.el.appendChild(this.backpackPanel.el);

    window.addEventListener('resize', this.resize.bind(this));
  }

  Editor.prototype.start = function() {
    this.interval = setInterval(this.step.bind(this), 1000 / 60);
  };

  Editor.prototype.stop = function() {
    clearInterval(this.interval);
  };

  Editor.prototype.resize = function() {
    resize(this.exec);
    resize(this.topBar);
    resize(this.tabPanel);
    resize(this.stagePanel);
    resize(this.spritePanel);
    resize(this.backpackPanel);
  };

  Editor.prototype.step = function() {
    step(this.exec);
    step(this.topBar);
    step(this.tabPanel);
    step(this.stagePanel);
    step(this.spritePanel);
    step(this.backpackPanel);
  };


  function ScriptEditor(editor) {
    this.editor = editor;

    this.el = el('script-editor');
    this.el.appendChild(this.elButtons = el('palette-buttons'));
    this.el.appendChild(this.elPalette = el('palette-contents'));
    this.el.appendChild(this.elWorkspace = el('editor-workspace'));
    this.createButtons();

    this.palette = new vis.Palette(this.elPalette);
    this.workspace = new vis.Workspace(this.elWorkspace);

    this.category = 1;
  };

  ScriptEditor.prototype.showSprite = function(sprite) {
    if (this.sprite) {
      this.sprite.scripts = this.workspace.scripts.slice(0);
    }
    if (this.sprite = sprite) {
      this.workspace.clear();
      sprite.scripts.forEach(function(script) {
        this.workspace.add(script);
      }, this);
    }
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

      this.refreshPalette();
    }
  });

  ScriptEditor.prototype.refreshPalette = function() {
    var scripts = this.palette.scripts;
    for (var i = scripts.length; i--;) {
      this.editor.exec.stopThread(scripts[i].thread);
    }

    this.palette.clear();
    (palettes[this._category] || []).forEach(this.eval, this);
  };

  ScriptEditor.prototype.eval = function(t) {
    if (t.if) {
      ((this.evalCondition(t.if) ? t.then : t.else) || []).forEach(this.eval, this);
      return;
    }
    if (t.action) {
      var button = el('button', 'palette-action');
      button.textContent = t.text;
      if (this[t.action]) button.addEventListener('click', this[t.action].bind(this));
      return this.palette.add(vis.Palette.element(button));
    }
    if (t.text) {
      var div = el('palette-label');
      div.textContent = vis.getText(t.text);
      return this.palette.add(vis.Palette.element(div));
    }
    if (t === '--' || t === '---') {
      return this.palette.add(vis.Palette.space(t.length * 10 - 5));
    }
    this.palette.add(new vis.Script().add(new vis.Block(t)));
  };

  ScriptEditor.prototype.evalCondition = function(condition) {
    switch (condition) {
      case 'variables': return true; // TODO
      case 'lists': return false; // TODO
      case 'stage': return this.editor.selectedSprite && this.editor.selectedSprite.isStage;
      case 'sprite': return !this.editor.selectedSprite || this.editor.selectedSprite.isSprite;
    }
  };


  function TabPanel(editor) {
    this.editor = editor;

    this.el = el('tab-panel');
    this.el.appendChild(this.elContent = el('tab-panel-content'));

    this.tabPanels = [
      this.scriptEditor = new ScriptEditor(editor),
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

  TabPanel.prototype.showSprite = function(sprite) {
    this.tabPanels.forEach(function(panel) {
      if (panel) panel.showSprite(sprite);
    });
  };


  function TopBar(editor) {
    this.editor = editor;

    this.el = el('top-bar');
    this.languageButton = this.addButton('Language', this.languageMenu);
    this.languageButton.classList.add('first');
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


  function StagePanel(stage) {
    this.stage = stage;
    this._running = false;

    this.el = el('stage-panel stopped');

    this.el.appendChild(this.elTitleBar = el('title-bar'));
    this.fullScreenButton = this.addButton('full-screen');
    this.stopButton = this.addButton('stop', function() {
      this.parent.exec.stopAll();
    });
    this.runButton = this.addButton('run', function() {
      this.parent.exec.triggerGreenFlag();
    });

    this.elTitleBar.appendChild(this.elVersion = el('version'));
    this.elVersion.textContent = 'js001';

    this.elTitleBar.appendChild(this.elName = el('input', 'project-name'));
    this.elName.value = 'Untitled';

    this.elTitleBar.appendChild(this.elAuthor = el('project-author'));
    this.elAuthor.textContent = 'by nXIII (unshared)';

    this.el.appendChild(this.elStage = stage.canvas);
    this.elStage.classList.add('stage');

    this.el.appendChild(this.elMouseCoords = el('mouse-coords'));
    this.elMouseCoords.appendChild(this.elMouseXLabel = el('mouse-label x-axis'));
    this.elMouseXLabel.textContent = 'x:';
    this.elMouseCoords.appendChild(this.elMouseX = el('mouse-coord x-axis'));
    this.elMouseCoords.appendChild(this.elMouseXLabel = el('mouse-label y-axis'));
    this.elMouseXLabel.textContent = 'y:';
    this.elMouseCoords.appendChild(this.elMouseY = el('mouse-coord x-axis'));

    document.addEventListener('mousemove', this.updateMouse.bind(this));
  }

  StagePanel.prototype.addButton = function(className, fn) {
    var button = el('button', 'title-button ' + className);
    this.elTitleBar.appendChild(button);
    if (fn) button.addEventListener('click', fn.bind(this));
    return button;
  };

  StagePanel.prototype.resize = function() {
    var bb = this.elStage.getBoundingClientRect();
    this.stageCenterX = (bb.left + bb.right) / 2;
    this.stageCenterY = (bb.top + bb.bottom) / 2;
  };

  StagePanel.prototype.updateMouse = function(e) {
    this.stage.mouseX = Math.max(-240, Math.min(240, e.clientX - this.stageCenterX));
    this.stage.mouseY = Math.max(-180, Math.min(180, this.stageCenterY - e.clientY));
    this.elMouseX.textContent = this.stage.mouseX;
    this.elMouseY.textContent = this.stage.mouseY;
  };

  def(StagePanel.prototype, 'running', {
    get: function() {return this._running},
    set: function(running) {
      if (running !== this._running) {
        this._running = running;
        this.el.className = running ? 'stage-panel running' : 'stage-panel stopped';
      }
    }
  });


  function SpritePanel(editor) {
    this.editor = editor;

    this.stageIcon = new SpriteIcon(this, editor.stage);
    this.icons = [];

    this.el = el('sprite-panel');

    this.el.appendChild(this.elTitleBar = el('title-bar'));
    this.elTitleBar.appendChild(this.elLabel = el('title-label'));
    this.elLabel.textContent = 'Sprites';

    this.elTitleBar.appendChild(this.elNewGroup = el('new-group'));
    this.elNewGroup.textContent = 'New sprite:';
    this.addNewButton('new-library', this.newFromLibrary);
    this.addNewButton('new-paint');
    this.addNewButton('new-import');
    this.addNewButton('new-camera');

    this.el.appendChild(this.elStageSection = el('stage-section'));
    this.elStageSection.appendChild(this.stageIcon.el);
    this.elStageSection.appendChild(this.elNewBackdrop = el('new-backdrop'));
    this.elNewBackdrop.textContent = 'New backdrop:';

    this.el.appendChild(this.elSpriteSection = el('sprite-section'));

    editor.stage.children.forEach(this.addIcon, this);
    this.select(this.icons[0] || this.stageIcon);
  }

  SpritePanel.prototype.newFromLibrary = function() {
    var sprite = new Sprite('Sprite'+(this.editor.stage.children.length + 1))
      .addCostume(new Costume('costume1', 'costume1.svg', 47, 55));
    this.editor.stage.add(sprite);
    this.select(this.addIcon(sprite));
  };

  SpritePanel.prototype.select = function(icon) {
    if (this.selectedIcon) {
      this.selectedIcon.el.classList.remove('selected');
    }
    if (this.selectedIcon = icon) {
      icon.el.classList.add('selected');
    }
    this.editor.selectedSprite = icon.sprite;
    var tabPanel = this.editor.tabPanel;
    tabPanel.showSprite(icon.sprite);
    tabPanel.scriptEditor.refreshPalette();
    return this;
  };

  SpritePanel.prototype.addIcon = function(name) {
    var icon = new SpriteIcon(this, name);
    this.icons.push(icon);
    this.elSpriteSection.appendChild(icon.el);
    if (this.parent) {
      this.parent.add(icon);
      icon.resize();
    }
    return icon;
  };

  SpritePanel.prototype.addNewButton = function(name, fn) {
    var button = el('button', 'new-button '+name);
    if (fn) button.addEventListener('click', fn.bind(this));
    this.elNewGroup.appendChild(button);
  };

  SpritePanel.prototype.install = function(parent) {
    parent.add(this.stageIcon);
    this.icons.forEach(function(icon) {
      parent.add(icon);
    });
  };

  SpritePanel.prototype.resize = function() {
    resize(this.stageIcon);
    this.icons.forEach(resize);
  };

  SpritePanel.prototype.uninstall = function() {
    parent.remove(this.stageIcon);
    this.icons.forEach(function(icon) {
      parent.remove(icon);
    });
  };


  function SpriteIcon(panel, sprite) {
    this.panel = panel;
    this.sprite = sprite;

    this.el = el('sprite-icon');
    this.el.appendChild(this.elThumbnail = el('canvas', 'sprite-thumbnail'));
    this.elTmp = el('canvas', '');
    this.elThumbnail.width = this.elTmp.width = 68;
    this.elThumbnail.height = this.elTmp.height = 51;
    this.context = this.elThumbnail.getContext('2d');
    this.tmpContext = this.elTmp.getContext('2d');

    this.el.appendChild(this.elName = el('sprite-icon-label'));
    this.elName.textContent = sprite.name;

    if (sprite.isStage) {
      this.el.className += ' for-stage';
      this.el.appendChild(this.elInfo = el('sprite-icon-info'));
      this.elInfo.textContent = '1 backdrop';
    } else {
      this.el.appendChild(this.elButton = el('button', 'sprite-icon-button'));
    }

    this.el.addEventListener('click', function() {
      this.panel.select(this);
    }.bind(this));

    setInterval(this.update.bind(this), 200);
  }
  inherits(SpriteIcon, vis.Target);

  def(SpriteIcon.prototype, 'contextMenu', {get: function() {
    return !this.sprite.isStage && new vis.Menu(
      'duplicate',
      vis.Menu.line,
      'hide',
      'delete',
      vis.Menu.line,
      'save to local file').translate();
  }});

  SpriteIcon.prototype.acceptsDropOf = function(script) {
    return !this.el.classList.contains('selected');
  };

  SpriteIcon.prototype.drop = function(script) {
    var pos = this.parent.dragPos || {
      x: vis.Workspace.prototype.paddingX,
      y: vis.Workspace.prototype.paddingY
    };
    this.sprite.scripts.push(script.copy().moveTo(pos.x, pos.y));
    return false;
  };

  SpriteIcon.prototype.update = function() {
    var costume = this.sprite.costumes[this.sprite.costume];
    if (costume === this.costume) return;
    this.costume = costume.canvas && costume;

    var w = this.elThumbnail.width;
    var h = this.elThumbnail.height;
    this.context.clearRect(0, 0, w, h);
    if (!costume.canvas) return;

    var cw = costume.canvas.width;
    var ch = costume.canvas.height;
    var scale = Math.min((w - 4) / cw, (h - 4) / ch);
    var aw = scale * cw;
    var ah = scale * ch;
    var x = (w - aw)/2
    var y = (h - ah)/2;

    this.tmpContext.width = this.tmpContext.width;
    this.tmpContext.drawImage(costume.canvas, x, y, aw, ah);

    var ps = [-1, 0, 1];
    for (var i = 0, l = ps.length; i < l; i++) {
      for (var j = 0; j < l; j++) {
        if (i !== j) {
          this.context.shadowOffsetX = 10000 + ps[i];
          this.context.shadowOffsetY = 10000 + ps[j];
          this.context.shadowColor = 'rgba(0, 0, 0, .1)';
          this.context.drawImage(this.elTmp, -10000, -10000);
        }
      }
    }
    this.context.drawImage(this.elTmp, 0, 0);
  };


  function BackpackPanel(editor) {
    this.editor = editor;

    this.el = el('backpack-panel');
    this.el.appendChild(this.elTitle = el('backpack-title'));
    this.elTitle.textContent = 'Backpack';
    this.el.appendChild(this.elContent = el('backpack-content'));

    this.elTitle.addEventListener('click', this.toggle.bind(this));
  }

  BackpackPanel.prototype.toggle = function() {
    this.editor.el.classList.toggle('backpack-open');
  };


  var editor = new Editor();
  document.body.appendChild(editor.el);
  editor.resize();
  editor.start();
  window.editor = editor;

  var player = document.querySelector('.player');
  var stagePanel = new StagePanel(new Stage());
  player.appendChild(stagePanel.el);

  var flip = editor.elFlipButton;
  var flipBack = document.querySelector('.flip-back');

  var flipped = false;
  function doFlip() {
    var time = 1;
    editor.el.style.WebkitTransition =
    player.style.WebkitTransition = 'none';
    editor.el.style.WebkitTransform =
    player.style.WebkitTransform = 'none';
    var ebb = editor.el.getBoundingClientRect();
    var pbb = player.getBoundingClientRect();
    var dx = ((pbb.right + pbb.left) - (ebb.right + ebb.left)) / 2;
    var dy = ((pbb.bottom + pbb.top) - (ebb.bottom + ebb.top)) / 2;
    var sx = pbb.width / ebb.width;
    var sy = pbb.height / ebb.height;
    if (flipped) {
      editor.el.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
      editor.el.offsetHeight;
      player.offsetHeight;
      editor.el.style.WebkitTransition =
      player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
      editor.el.style.WebkitTransform = 'none';
      player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
    } else {
      player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
      editor.el.offsetHeight;
      player.offsetHeight;
      editor.el.style.WebkitTransition =
      player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
      editor.el.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
      player.style.WebkitTransform = 'none';
    }
    flipped = !flipped;
  }

  flip.addEventListener('click', doFlip);
  flipBack.addEventListener('click', doFlip);

}());
