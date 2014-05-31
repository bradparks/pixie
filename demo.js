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
      undefined: ["Undefined", '#d42828'],
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
      20: ["Extension", '#4b4a60'] // #72228c / #672d79
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
      "contentsOfList:": ["r", "%l.list", 12, 'list'],
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
      var: function(arg) {
        var m = new vis.Menu;
        var editor = arg.app.editor;
        m.addAll(editor.stage.variables.map(getName));
        if (editor.selectedSprite.isSprite && editor.selectedSprite.variables.length) {
          if (editor.stage.variables.length) {
            m.add(vis.Menu.line);
          }
          m.addAll(editor.selectedSprite.variables.map(getName));
        }
        return m;
      },
      list: function(arg) {
        var m = new vis.Menu;
        var editor = arg.app.editor;
        m.addAll(editor.stage.lists.map(getName));
        if (editor.selectedSprite.isSprite && editor.selectedSprite.lists.length) {
          if (editor.stage.lists.length) {
            m.add(vis.Menu.line);
          }
          m.addAll(editor.selectedSprite.lists.map(getName));
        }
        return m;
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
      broadcast: function(arg) {
        return new vis.Menu().addAll(arg.app.editor.broadcastNames).add(vis.Menu.line).add([vis.getText('new message...'), function() {
            var arg = this;
            Dialog.prompt(vis.getText('New Message'), vis.getText('Message name'), function(value) { // NS
              if (value) arg.value = value;
            }).show(arg.app.editor);
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
        var stage = arg.app.editor.stage;
        var name = arg.parent.args[1].value;
        if (name === '_stage_') return new vis.Menu('backdrop #', 'backdrop name', 'volume').translate().addLine().addAll(stage.variables.map(getName));
        var sprite = stage.findChild(name);
        return sprite && new vis.Menu('x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume').translate().addLine().addAll(sprite.variables.map(getName));
      },
      timeAndDate: function() {
        return new vis.Menu('year', 'month', 'date', 'day of week', 'hour', 'minute', 'second').translate();
      },
      mathOp: function() {
        return new vis.Menu('abs', 'floor', 'ceiling', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'e ^', '10 ^').translate();
      },
      drum: function() {
        return new vis.Menu().addAll(['Snare Drum', 'Bass Drum', 'Side Stick', 'Crash Cymbal', 'Open Hi-Hat', 'Closed Hi-Hat', 'Tambourine', 'Hand Clap', 'Claves', 'Wood Block', 'Cowbell', 'Triangle', 'Bongo', 'Conga', 'Cabassa', 'Guiro', 'Vibraslap', 'Open Culca'].map(function(x, i) {return ['('+(i + 1)+') ' + vis.getText(x), i + 1]}));
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
        {watcher: "xpos"},
        {watcher: "ypos"},
        {watcher: "heading"}
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
        {watcher: "costumeIndex"}
      ]},
      {watcher: "sceneName"},
      {if: "stage", then: [{watcher: "backgroundIndex"}], else: [{watcher: "scale"}]}
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
      {watcher: "volume"},
      "--",
      "changeTempoBy:",
      "setTempoTo:",
      {watcher: "tempo"}
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
      {watcher: "answer"},
      "--",
      "keyPressed:",
      "mousePressed",
      "mouseX",
      "mouseY",
      "--",
      {watcher: "soundLevel"},
      "--",
      {watcher: "senseVideoMotion"},
      "setVideoState",
      "setVideoTransparency",
      "--",
      {watcher: "timer"},
      "timerReset",
      "--",
      "getAttribute:of:",
      "--",
      {watcher: "timeAndDate"},
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
        {all: "variables"},
        "--",
        ["setVar:to:", {first: 'var'}, '0'],
        ["changeVar:by:", {first: 'var'}, 1],
        ["showVariable:", {first: 'var'}],
        ["hideVariable:", {first: 'var'}],
        "--"
      ]},

      // lists
      {text: "Make a List", action: "newList"},
      {if: "lists", then: [
        {all: "lists"},
        "--",
        ["append:toList:", "thing", {first: 'list'}],
        "--",
        ["deleteLine:ofList:", 1, {first: 'list'}],
        ["insert:at:ofList:", "thing", 1, {first: 'list'}],
        ["setLine:ofList:to:", 1, {first: 'list'}, "thing"],
        "--",
        ["getLine:ofList:", 1, {first: 'list'}],
        ["lineCountOfList:", {first: 'list'}],
        ["list:contains:", {first: 'list'}, "thing"],
        "--",
        ["showList:", {first: 'list'}],
        ["hideList:", {first: 'list'}]
      ]}
    ],
    10: [
      {text: "Make a Block", action: "newBlock"},
      {text: "Add an Extension", action: "addExtension"},
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
    // TODO
    Dialog.alert('Help', 'Help is not available yet.').show(this.app.editor);
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

  var Server = {
    getProjectURL: function(id) {
      return 'http://projects.scratch.mit.edu/internalapi/project/' + id + '/get/';
    },
    getAssetURL: function(md5) {
      return 'http://cdn.scratch.mit.edu/internalapi/asset/' + md5 + '/get/';
    },
    getImageAsset: function(md5, cb) {
      var img = document.createElement('img');
      img.crossOrigin = "anonymous";
      img.src = Server.getAssetURL(md5);
      if (cb) {
        img.onload = function() {cb(null, img)};
        img.onerror = function() {cb(new Error)};
      }
      return img;
    },
    getAsset: function(md5, cb) {
      Server.get(Server.getAssetURL(md5), cb);
    },
    getProject: function(id, cb) {
      Server.get(Server.getProjectURL(id), cb);
    },
    get: function(url, cb) {
      var xhr = new XMLHttpRequest;
      xhr.open('get', url, true);
      xhr.send();
      if (cb) {
        xhr.onload = function() {
          if (xhr.status == 200) {
            cb(null, xhr.responseText);
          } else {
            cb(new Error('HTTP ' + xhr.status));
          }
        };
        xhr.onerror = function() {cb(new Error)};
      }
    }
  };

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

  function copy(o) {
    return o.copy();
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

  var KEY_NAMES = {
    13: 'return',
    32: 'space',
    37: 'left arrow',
    38: 'up arrow',
    39: 'right arrow',
    40: 'down arrow',
    190: '.'
  };
  function getKeyName(code) {
    return code >= 65 && code <= 90 ? String.fromCharCode(code + 32) :
      code >= 48 && code <= 57 ? String.fromCharCode(code) : KEY_NAMES[code];
  }

  function makePrimitive(value) {
    return typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ? value : 0;
  }

  function notNull(value) {
    return value != null;
  }

  function deserializeScript(json) {
    // TODO not very defensive
    return deserializeStack(json[2]).moveTo(json[0], json[1]);
  }

  function deserializeStack(json) {
    return new vis.Script(json.map(deserializeBlock));
  }

  function deserializeBlock(json) {
    var b = new vis.Block(json[0], json.slice(1).map(deserializeArg));
    if (b.name === 'stopScripts' && ['other scripts in sprite', 'other scripts in stage'].indexOf(b.args[0].value) !== -1) {
      b.type = 'c';
    }
    return b;
  }

  function deserializeArg(json) {
    return Array.isArray(json) ? (typeof json[0] === 'string' ? deserializeBlock(json) : deserializeStack(json)) : json;
  }


  function ScratchObj(name) {
    this.name = name;
    this.scripts = [];
    this.costumes = [];
    this.costume = 0;
    this.sounds = [];
    this.variables = [];
    this.lists = [];
  }

  ScratchObj.prototype.toJSON = function() {
    return {
      objName: this.name,
      variables: this.variables.length ? this.variables : undefined,
      lists: this.lists.length ? this.lists : undefined,
      scripts: this.scripts.length ? this.scripts : undefined,
      scriptComments: undefined, // TODO
      sounds: this.sounds.length ? this.sounds : undefined,
      costumes: this.costumes.length ? this.costumes : undefined,
      currentCostumeIndex: this.costume
    };
  };

  ScratchObj.prototype.fromJSON = function(json) {
    this.name = ''+json.objName;
    this.variables = Array.isArray(json.variables) ? json.variables.map(Variable.deserialize) : [];
    this.lists = Array.isArray(json.lists) ? json.lists.map(List.deserialize) : [];
    this.scripts = Array.isArray(json.scripts) ? json.scripts.map(deserializeScript) : [];
    // this.scriptComments = Array.isArray(json.scriptComments) ? json.scriptComments.map(...) : []; // TODO
    // this.sounds = Array.isArray(json.sounds) ? json.sounds.map(...) : []; // TODO
    if (Array.isArray(json.costumes)) json.costumes.map(Costume.deserialize).forEach(this.addCostume, this);
    this.costume = (Math.round(Number(json.currentCostumeIndex)) % this.costumes.length + this.costumes.length) % this.costumes.length || 0;
    return this;
  };

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

  ScratchObj.prototype.findLocal = function(name) {
    var vars = this.variables;
    for (var i = vars.length; i--;) {
      if (vars[i].name === name) return vars[i];
    }
    return null;
  };

  ScratchObj.prototype.createLocal = function(name, value) {
    var v = new Variable(name, value == null ? 0 : value);
    this.variables.push(v);
    return v;
  };

  ScratchObj.prototype.findOrCreateLocal = function(name) {
    return this.findLocal(name) || this.stage.createLocal(name);
  };

  ScratchObj.prototype.findVariable = function(name) {
    return this.findLocal(name) || this.stage && this.stage.findLocal(name);
  };

  ScratchObj.prototype.findOrCreateVariable = function(name) {
    return this.findLocal(name) || this.stage && this.stage.findOrCreateLocal(name);
  };

  ScratchObj.prototype.findLocalList = function(name) {
    var lists = this.lists;
    for (var i = lists.length; i--;) {
      if (lists[i].name === name) return lists[i];
    }
    return null;
  };

  ScratchObj.prototype.createLocalList = function(name, contents) {
    var l = new List(name, contents || []);
    this.lists.push(l);
    return l;
  };

  ScratchObj.prototype.findOrCreateLocalList = function(name) {
    return this.findLocalList(name) || this.createLocalList(name);
  };

  ScratchObj.prototype.findList = function(name) {
    return this.findLocalList(name) || this.stage && this.stage.findLocalList(name);
  };

  ScratchObj.prototype.findOrCreateList = function(name) {
    return this.findLocalList(name) || this.stage && this.stage.findOrCreateLocalList(name);
  };

  ScratchObj.prototype.forEachScript = function(fn, context) {
    var s = this.scripts;
    for (var i = 0, l = s.length; i < l; i++) {
      if (s[i].blocks.length) fn.call(context, s[i], this);
    }
  };

  ScratchObj.prototype.forEachLocalScript = ScratchObj.prototype.forEachScript;

  ScratchObj.prototype.destroy = function() {
    if (this.stage) this.stage.remove(this);
    return this;
  };

  ScratchObj.prototype.copy = function() {
    var o = new this.constructor(this.name);
    o.scripts = this.scripts.map(copy);
    o.costumes = this.costumes.map(copy);
    o.costume = this.costume;
    o.sounds = this.sounds.map(copy);
    o.variables = this.variables.map(copy);
    o.lists = this.lists.map(copy);
    return o;
  };


  function Costume(name, canvas, cx, cy, pixelRatio) {
    this.baseLayerMD5 = null;
    if (typeof canvas === 'string') { // MD5
      this.baseLayerMD5 = canvas;
      canvas = Server.getImageAsset(canvas);
    }
    if (canvas.tagName === 'IMG') {
      canvas.onload = function() {
        if (this.owner) this.owner.redraw();
      }.bind(this);
    }
    this.name = name;
    this.canvas = canvas;
    this.cx = cx || 0;
    this.cy = cy || 0;
    this.pixelRatio = pixelRatio || 1;
  }

  Costume.prototype.toJSON = function() {
    return {
      costumeName: this.name,
      baseLayerID: -1,
      baseLayerMD5: this.baseLayerMD5, // TODO
      bitmapResolution: this.pixelRatio,
      rotationCenterX: this.cx,
      rotationCenterY: this.cy
    };
  };

  Costume.deserialize = function(json) {
    var cx = Math.max(-1e6, Math.min(1e6, Number(json.rotationCenterX)));
    var cy = Math.max(-1e6, Math.min(1e6, Number(json.rotationCenterY)));
    var pr = Math.max(1, Math.min(16, Number(json.bitmapResolution) || 0));
    return new Costume(''+json.costumeName, ''+json.baseLayerMD5, cx, cy, pr);
  };

  Costume.prototype.copy = function() {
    var c = new Costume(this.name, this.canvas, this.cx, this.cy);
    c.baseLayerMD5 = this.baseLayerMD5;
    return c;
  };


  function Variable(name, value) {
    this.name = name;
    this.value = value == null ? 0 : value;
  }

  Variable.prototype.toJSON = function() {
    return {
      name: this.name,
      value: this.value,
      isPersistent: false // TODO
    };
  };

  Variable.deserialize = function(json) {
    return new Variable(''+json.name, makePrimitive(json.value));
  };

  Variable.prototype.copy = function() {
    return new Variable(this.name, this.value);
  };


  function List(name, contents) {
    this.name = name;
    this.contents = contents || [];
  }

  List.prototype.toJSON = function() {
    return {
      listName: this.name,
      contents: this.contents,
      isPersistent: false // TODO
    };
  };

  List.deserialize = function(json) {
    return new List(''+json.listName, Array.isArray(json.contents) ? json.contents.map(makePrimitive) : []);
  };

  List.prototype.copy = function() {
    return new List(this.name, this.contents);
  };


  function Sprite(name) {
    ScratchObj.call(this, name);
    this.rotationStyle = 'normal';
    this.x = 0;
    this.y = 0;
    this.direction = 90;
    this.scale = 1;
    this.visible = true;
    this.isDraggable = false;
  }
  inherits(Sprite, ScratchObj);

  Sprite.prototype.isSprite = true;

  Sprite.prototype.toJSON = function() {
    var json = ScratchObj.prototype.toJSON.call(this);
    json.scratchX = this.x;
    json.scratchY = this.y;
    json.scale = this.scale;
    json.direction = this.direction;
    json.rotationStyle = this.rotationStyle;
    json.isDraggable = this.isDraggable;
    json.indexInLibrary = 0; // TODO
    json.visible = this.visible;
    json.spriteInfo = {};
    return json;
  };

  Sprite.deserialize = function(json) {return new Sprite().fromJSON(json)};

  Sprite.prototype.fromJSON = function(json) {
    ScratchObj.prototype.fromJSON.call(this, json);
    this.rotationStyle =
      json.rotationStyle === 'leftRight' ||
      json.rotationStyle === 'none' ? json.rotationStyle : 'normal';
    this.x = Math.max(-1e6, Math.min(1e6, Number(json.scratchX) || 0));
    this.y = Math.max(-1e6, Math.min(1e6, Number(json.scratchY) || 0));
    this.direction = json.direction == null ? 90 : 180 - (180 - (Number(json.direction) || 0) % 360) % 360 || 0;
    this.scale = json.scale == null ? 1 : Math.max(0, Math.min(1000, Number(json.scale) || 0));
    this.visible = json.visible == null ? true : !!json.visible;
    this.isDraggable = !!json.isDraggable;
    return this;
  };

  Sprite.prototype.setScale = function(s) {
    var costume = this.costumes[this.costume];
    var w = costume.canvas.width;
    var h = costume.canvas.height;
    this.scale = Math.max(Math.min(1, Math.max(5 / w, 5 / h)), Math.min(1.5 * 480 / w, 1.5 * 360 / h, s));
  };

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

  Sprite.prototype.copy = function() {
    var o = ScratchObj.prototype.copy.call(this);
    this.rotationStyle = 'normal';
    o.x = this.x;
    o.y = this.y;
    o.direction = this.direction;
    o.scale = this.scale;
    o.visible = this.visible;
    return o;
  };


  function Stage() {
    ScratchObj.call(this, 'Stage');

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.keys = {};
    this.children = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width = 480;
    this.canvas.height = 360;
    this.context = this.canvas.getContext('2d');
  }
  inherits(Stage, ScratchObj);

  Stage.prototype.isStage = true;

  Stage.prototype.toJSON = function() {
    var json = ScratchObj.prototype.toJSON.call(this, json);
    json.children = this.children;
    return json;
  };

  Stage.deserialize = function(json) {return new Stage().fromJSON(json)};

  Stage.prototype.fromJSON = function(json) {
    ScratchObj.prototype.fromJSON.call(this, json);
    if (Array.isArray(json.children)) json.children.map(function(child) {
      return child.objName ? new Sprite().fromJSON(child) : null;
    }).filter(notNull).forEach(this.add, this);
    return this;
  };

  Stage.prototype.add = function(child) {
    if (this.children.indexOf(child) === -1) {
      this.children.push(child);
      child.stage = this;
    }
    return this;
  };

  Stage.prototype.remove = function(child) {
    if (!child || child.stage !== this) return;
    var i = this.children.indexOf(child);
    if (i !== -1) this.children.splice(i, 1);
    child.stage = null;
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

  Stage.prototype.findNestedLocal = function(name) {
    var local = this.findLocal(name);
    if (local) return local;
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      local = children[i].findLocal(name);
      if (local) return local;
    }
    return null;
  };

  Stage.prototype.findNestedLocalList = function(name) {
    var local = this.findLocalList(name);
    if (local) return local;
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      local = children[i].findLocalList(name);
      if (local) return local;
    }
    return null;
  };

  Stage.prototype.findChild = function(name) {
    var children = this.children;
    for (var i = 0, l = children.length; i < l; i++) {
      if (children[i].name === name) return children[i];
    }
    return this.name === name ? this : null;
  };

  Stage.prototype.uniqueName = function(base) {
    var x = /\d+$/.exec(base);
    var i = 2;
    if (x) {
      base = base.slice(0, -x[0].length);
      i = Number(x[0]) + 1;
    }
    var sprites = this.children;
    search: for (;;) {
      var name = base + i;
      var j = sprites.length;
      while (j--) {
        if (sprites[j].name === name) {
          i++;
          continue search;
        }
      }
      return name;
    }
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

    this.resetTimer();
    this.addPrimitives(this.table = {});
  }

  Interpreter.prototype.triggerGreenFlag = function() {
    this.stopAll();
    this.resetTimer();
    return this.trigger('whenGreenFlag');
  };

  Interpreter.prototype.triggerBroadcast = function(event) {
    return this.trigger('whenIReceive', event, true);
  };

  Interpreter.prototype.triggerKey = function(key) {
    return this.trigger('whenKeyPressed', key);
  };

  Interpreter.prototype.triggerClick = function(target) {
    return this.triggerFor(target, 'whenClicked', undefined, true);
  };

  Interpreter.prototype.trigger = function(event, arg, restart) {
    var threads = [];
    if (arg !== undefined) arg = (''+arg).toLowerCase();
    this.stage.forEachScript(function(script, target) {
      if (script.blocks[0].name === event && (arg === undefined || (''+script.blocks[0].args[0].value).toLowerCase() === arg)) {
        if (restart) {
          threads.push(this.restartThread(script, target));
        } else {
          threads.push(script.thread || this.toggleThread(script, target));
        }
      }
    }, this);
    return threads;
  };

  Interpreter.prototype.triggerFor = function(target, event, arg, restart) {
    var threads = [];
    if (arg !== undefined) arg = (''+arg).toLowerCase();
    target.forEachLocalScript(function(script, target) {
      if (script.blocks[0].name === event && (arg === undefined || (''+script.blocks[0].args[0].value).toLowerCase() === arg)) {
        if (restart) {
          threads.push(this.restartThread(script, target));
        } else {
          threads.push(script.thread || this.toggleThread(script, target));
        }
      }
    }, this);
    return threads;
  };

  Interpreter.prototype.stopAll = function() {
    var threads = this.threads;
    for (var i = threads.length; i--;) {
      this.stopThread(threads[i]);
    }
    this.threads = [];
  };

  Interpreter.prototype.toggleThread = function(script, target) {
    if (script.isReporter) {
      var pos = script.blocks[0].worldPosition;
      this.activeThread = new Thread(this, script, target);
      this.editor.showBubble(this.evalBlock(script.blocks[0]), pos.x + script.width, pos.y);
      return;
    }
    if (script.thread) {
      this.stopThread(script.thread);
    } else {
      script.addRunningEffect();
      this.threads.push(script.thread = new Thread(this, script, target));
    }
    return script.thread;
  };

  Interpreter.prototype.restartThread = function(script, target) {
    if (script.thread) {
      this.stopThread(script.thread);
    }
    script.addRunningEffect();
    this.threads.push(script.thread = new Thread(this, script, target));
    return script.thread;
  };

  Interpreter.prototype.stopThread = function(thread) {
    if (thread) {
      if (thread.topScript) {
        thread.topScript.removeRunningEffect();
        thread.topScript.thread = null;
      }
      thread.topScript = null;
      thread.done = true;
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

      var canRun = true;

      var threads = this.threads;
      for (var i = 0, l = threads.length; i < l; i++) {
        this.activeThread = threads[i];
        if (!this.activeThread.done) this.stepActiveThread();

        if (this.waiting) canRun = false;
        if (this.activeThread.done) {
          this.stopThread(this.activeThread);
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
    return typeof x === 'number' ? x : Number(x) || 0;
  };

  Interpreter.prototype.barg = function(b, i) {
    var a = b.args[i];
    var x = a.isArg ? a.value : this.evalBlock(a);
    return !!x && x !== '0' && x !== 'false';
  };

  Interpreter.prototype.resetTimer = function() {
    this.timerStart = Date.now();
  };

  Interpreter.prototype.startTimed = function(duration) {
    var thread = this.activeThread;
    thread.tmp = this.time + Math.max(duration * 1000, 0);
    thread.pc--;
    this.yield = true;
    this.waiting = true;
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
      this.waiting = true;
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

    function pointSpriteTowards(sprite, x, y) {
      turnSprite(sprite, 90 - Math.atan2(y - sprite.y, x - sprite.x) * 180 / Math.PI);
    }

    function asNumber(x) {
      return typeof x !== 'string' ? Number(x) : /\d/.test(x) ? Number(x) : NaN;
    }

    function compare(x, y) {
      var a = asNumber(x);
      var b = asNumber(y);
      if (a !== a || b !== b) {
        return x.toLowerCase().localeCompare(y.toLowerCase());
      }
      return a < b ? -1 : a === b ? 0 : 1;
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
        var other = interp.stage.findChild(name);
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
        var other = interp.stage.findChild(name);
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
    };
    table['setRotationStyle'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.rotationStyle = ROTATION_STYLES[interp.arg(b, 0)] || 'normal';
        if (sprite.visible) interp.redraw = true;
      }
    };

    table['xpos'] = function() {
      var sprite = interp.activeThread.target;
      return sprite.isSprite ? sprite.x : 0;
    };

    table['ypos'] = function() {
      var sprite = interp.activeThread.target;
      return sprite.isSprite ? sprite.y : 0;
    };

    table['heading'] = function() {
      var sprite = interp.activeThread.target;
      return sprite.isSprite ? sprite.direction : 0;
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

    table['changeSizeBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        var scale = sprite.scale;
        sprite.setScale(scale + interp.narg(b, 0) / 100);
        if (sprite.visible && sprite.scale !== scale) interp.redraw = true;
      }
    };

    table['setSizeTo:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.setScale(interp.narg(b, 0) / 100);
        if (sprite.visible) interp.redraw = true;
      }
    };

    table['costumeIndex'] = function() {
      return interp.activeThread.target.costume + 1;
    };

    table['sceneName'] = function() {
      var costume = interp.stage.costumes[interp.stage.costume];
      return costume ? costume.name : '';
    };

    table['scale'] = function() {
      var sprite = interp.activeThread.target;
      return sprite.isSprite ? sprite.scale * 100 : 0;
    };

    // Events

    table['whenGreenFlag'] = this.primNoop;
    table['whenKeyPressed'] = this.primNoop;
    // table['whenClicked'] = this.primNoop;
    // table['whenSceneStarts'] = this.primNoop;
    // table['whenSensorGreaterThan'] = this.primNoop;
    table['whenIReceive'] = this.primNoop;

    table['broadcast:'] = function(b) {
      interp.triggerBroadcast(interp.arg(b, 0));
    };

    table['doBroadcastAndWait'] = function(b) {
      if (interp.activeThread.extra === null) {
        interp.activeThread.extra = interp.triggerBroadcast(interp.arg(b, 0));
      }
      if (interp.activeThread.extra.every(function(t) {return t.done})) {
        interp.activeThread.extra = null;
      } else {
        interp.activeThread.pc--;
        interp.yield = true;
        interp.waiting = true;
      }
    };

    // Control

    table['wait:elapsed:from:'] = function(b) {
      if (interp.activeThread.tmp === null) {
        interp.startTimed(interp.arg(b, 0));
      } else {
        interp.stepTimed();
      }
    };

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

    table['doIf'] = function(b) {
      if (interp.barg(b, 0)) {
        interp.startScript(b.args[1].script);
      }
    };

    table['doIfElse'] = function(b) {
      if (interp.barg(b, 0)) {
        interp.startScript(b.args[1].script);
      } else {
        interp.startScript(b.args[2].script);
      }
    };

    table['doWaitUntil'] = function(b) {
      if (!interp.barg(b, 0)) {
        interp.activeThread.pc--;
      }
    };

    table['doUntil'] = function(b) {
      if (interp.barg(b, 0)) {
        interp.startScript(b.args[1].script, true);
      }
    };

    table['stopScripts'] = function(b) {
      switch (interp.arg(b, 0)) {
        case 'all':
          interp.stopAll();
          /* falls through */
        case 'this script':
          interp.yield = true;
          interp.activeThread.pc--;
          interp.activeThread.done = true;
          break;
        case 'other scripts in sprite':
        case 'other scripts in stage':
          var threads = interp.threads;
          var i = threads.length;
          var activeThread = interp.activeThread;
          var target = activeThread.target;
          while (i--) {
            var t = threads[i];
            if (t !== activeThread && t.target === target) {
              t.done = true;
            }
          }
          break;
      }
    };

    // Sensing

    table['keyPressed:'] = function(b) {
      return !!interp.stage.keys[interp.arg(b, 0)];
    };

    table['mousePressed'] = function() {return interp.stage.mouseDown};
    table['mouseX'] = function() {return interp.stage.mouseX};
    table['mouseY'] = function() {return interp.stage.mouseY};

    table['timer'] = function() {
      return (Date.now() - interp.timerStart) / 1000;
    };
    table['timerReset'] = function() {
      interp.resetTimer();
    };

    table['timeAndDate'] = function(b) {
      var d = new Date();
      switch (interp.arg(b, 0)) {
        case 'year': return d.getFullYear();
        case 'month': return d.getMonth() + 1;
        case 'date': return d.getDate();
        case 'day of week': return d.getDay() + 1;
        case 'hour': return d.getHours();
        case 'minute': return d.getMinutes();
        case 'second': return d.getSeconds();
      }
      return 0;
    };

    var epoch = new Date(2000, 0, 1);
    var epochMS = epoch.getTime();
    var epochTimezone = epoch.getTimezoneOffset();
    table['timestamp'] = function() {
      var d = new Date;
      return (d.getTime() - epochMS + epochTimezone * 60 * 1000) / (24 * 60 * 60 * 1000);
    };

    table['getUserName'] = function() {return ''};

    // Operators

    table['+'] = function(b) {return interp.narg(b, 0) + interp.narg(b, 1)};
    table['-'] = function(b) {return interp.narg(b, 0) - interp.narg(b, 1)};
    table['*'] = function(b) {return interp.narg(b, 0) * interp.narg(b, 1)};
    table['/'] = function(b) {return interp.narg(b, 0) / interp.narg(b, 1)};

    table['randomFrom:to:'] = function(b) {
      var x = interp.narg(b, 0);
      var y = interp.narg(b, 1);
      if (x === y) return x;
      if (y < x) {
        var t = x;
        x = y;
        y = t;
      }
      if ((x | 0) === x && (y | 0) === y) {
        return x + Math.random() * (y - x + x) | 0;
      }
      return x + Math.random() * (y - x);
    };

    table['<'] = function(b) {
      return compare(interp.arg(b, 0), interp.arg(b, 1)) === -1;
    };
    table['='] = function(b) {
      return compare(interp.arg(b, 0), interp.arg(b, 1)) === 0;
    };
    table['>'] = function(b) {
      return compare(interp.arg(b, 0), interp.arg(b, 1)) === 1;
    };

    table['&'] = function(b) {return interp.barg(b, 0) && interp.barg(b, 1)};
    table['|'] = function(b) {return interp.barg(b, 0) || interp.barg(b, 1)};
    table['not'] = function(b) {return !interp.barg(b, 0)};

    table['concatenate:with:'] = function(b) {return ''+interp.arg(b, 0)+interp.arg(b, 1)};
    table['letter:of:'] = function(b) {return (''+interp.arg(b, 1)).charAt(interp.narg(b, 0) - 1 | 0) || ''};
    table['stringLength:'] = function(b) {return (''+interp.arg(b, 0)).length};

    table['\\\\'] =
    table['%'] = function(b) {
      var m = interp.narg(b, 1);
      var x = interp.narg(b, 0) % m;
      if (x / m < 0) x += m;
      return x;
    };

    table['rounded'] = function(b) {return Math.round(interp.narg(b, 0))};

    table['computeFunction:of:'] = function(b) {
      var x = interp.narg(b, 1);
      switch (interp.arg(b, 0)) {
        case 'abs': return Math.abs(x);
        case 'floor': return Math.floor(x);
        case 'ceiling': return Math.ceil(x);
        case 'int': return x - x % 1;
        case 'sqrt': return Math.sqrt(x);
        case 'sin': return Math.sin(Math.PI / 180 * x);
        case 'cos': return Math.cos(Math.PI / 180 * x);
        case 'tan': return Math.tan(Math.PI / 180 * x);
        case 'asin': return 180 / Math.PI * Math.asin(x);
        case 'acos': return 180 / Math.PI * Math.acos(x);
        case 'atan': return 180 / Math.PI * Math.atan(x);
        case 'ln': return Math.log(x);
        case 'log': return Math.log(x) / Math.LN10;
        case 'e ^': return Math.exp(x);
        case '10 ^': return Math.exp(x * Math.LN10);
      }
      return 0;
    };

    // Variables

    function getVar(name) {
      return interp.activeThread.target.findOrCreateVariable(name);
    }

    table['readVariable'] = function(b) {
      return getVar(interp.arg(b, 0)).value;
    };

    table['setVar:to:'] = function(b) {
      getVar(interp.arg(b, 0)).value = interp.arg(b, 1);
    };

    table['changeVar:by:'] = function(b) {
      var v = getVar(interp.arg(b, 0));
      v.value = Number(v.value) + interp.narg(b, 1);
    };

    // Lists

    function getListIndex(n, end) {
      if (!end) return -1;
      if (n === 'last') {
        return end - 1;
      }
      if (n === 'any' || n === 'random') {
        return Math.floor(Math.random() * end);
      }
      var i = Number(n);
      return i >= 1 && i <= end ? i - 1 : -1;
    }

    table['contentsOfList:'] = function(b) {
      var contents = interp.activeThread.target.findOrCreateList(interp.arg(b, 0)).contents;
      var i = contents.length;
      while (i--) {
        if (typeof contents[i] !== 'string' || contents[i].length !== 1) {
          return contents.join(' ');
        }
      }
      return contents.join('');
    };

    table['append:toList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      list.contents.push(interp.arg(b, 0));
    };

    table['deleteLine:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var index = interp.arg(b, 0);
      if (index === 'all') {
        list.contents = [];
        return;
      }
      var i = getListIndex(index, list.contents.length);
      if (i === -1) return;
      list.contents.splice(i, 1);
    };

    table['insert:at:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 2));
      var i = getListIndex(interp.arg(b, 1), list.contents.length + 1);
      if (i === -1) return;
      list.contents.splice(i, 0, interp.arg(b, 0));
    };

    table['setLine:ofList:to:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var i = getListIndex(interp.arg(b, 0), list.contents.length);
      if (i === -1) return;
      list.contents[i] = interp.arg(b, 2);
    };

    table['getLine:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var i = getListIndex(interp.arg(b, 0), list.contents.length);
      if (i === -1) return '';
      return list.contents[i];
    };

    table['lineCountOfList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 0));
      return list.contents.length;
    };

    table['list:contains:'] = function(b) {
      var contents = interp.activeThread.target.findOrCreateList(interp.arg(b, 0)).contents;
      var i = contents.length;
      var x = interp.arg(b, 1);
      while (i--) {
        if (compare(contents[i], x) === 0) return true;
      }
      return false;
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
    this.stage = new Stage()
      .addCostume(new Costume('backdrop1', '739b5e2a2435f6e1ec2993791b423146.png', 240, 180));
    this.stage.add(new Sprite('Sprite1')
      .addCostume(new Costume('costume1', 'f9a1c175dbe2e5dee472858dd30d16bb.svg', 47, 55))
      .addCostume(new Costume('costume2', 'c68e7b211672862001dd4fce12129813.png', 57, 41)));

    try {
      this.stage = Stage.deserialize(JSON.parse(localStorage.getItem('visual demo project')));
    } catch (e) {
      console.warn(e.stack);
    }

    this.backpack = new LocalBackpack();

    this.exec = new Interpreter(this.stage, this);

    this.topBar = new TopBar(this);
    this.tabPanel = new TabPanel(this);
    this.stagePanel = new StagePanel(this);
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

    this.tabPanel.scriptEditor.category = 1;

    window.addEventListener('resize', this.app.resize.bind(this.app));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.hideBubble.bind(this));
    document.addEventListener('wheel', this.hideBubble.bind(this));

    this.save = this.save.bind(this);
  }

  Editor.prototype.changed = function() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(this.save, 100);
  };

  Editor.prototype.save = function() {
    localStorage.setItem('visual demo project', JSON.stringify(this.stage));
  };

  Editor.prototype.start = function() {
    this.interval = setInterval(this.step.bind(this), 1000 / 60);
  };

  Editor.prototype.stop = function() {
    clearInterval(this.interval);
  };

  Editor.prototype.resize = function() {
    this.app.resize();
  };

  Editor.prototype.step = function() {
    step(this.exec);
    step(this.topBar);
    step(this.tabPanel);
    step(this.stagePanel);
    step(this.spritePanel);
    step(this.backpackPanel);
  };

  Editor.prototype.addVariable = function(name, local, cloud) {
    name = name.trim();
    if (!name) return;
    if (local && this.selectedSprite.isSprite ? this.selectedSprite.findVariable(name) : this.stage.findNestedLocal(name)) {
      Dialog.alert(vis.getText('New Variable'), vis.getText('A variable with that name already exists.')).show(this); // NS
      return;
    }
    (local ? this.selectedSprite : this.stage).createLocal(name);
    this.tabPanel.scriptEditor.refreshPalette();
  };

  Editor.prototype.addList = function(name, local, cloud) {
    name = name.trim();
    if (!name) return;
    if (local && this.selectedSprite.isSprite ? this.selectedSprite.findList(name) : this.stage.findNestedLocalList(name)) {
      Dialog.alert(vis.getText('New List'), vis.getText('A list with that name already exists.')).show(this); // NS
      return;
    }
    (local ? this.selectedSprite : this.stage).lists.push(new List(name));
    this.tabPanel.scriptEditor.refreshPalette();
  };

  Editor.prototype.newVariable = function() {
    this.newDialog(false);
  };

  Editor.prototype.newList = function() {
    this.newDialog(true);
  };

  Editor.prototype.newDialog = function(list) {
    var name = new Dialog.Field(vis.getText(list ? 'List name' : 'Variable name'));
    var local = new Dialog.Radio(
      [vis.getText('For all sprites'), false],
      [vis.getText('For this sprite only'), true]);
    var cloud = new Dialog.CheckBox(vis.getText(list ? 'Cloud list (stored on server)' : 'Cloud variable (stored on server)'));
    local.setEnabled(1, this.selectedSprite.isSprite); // NS
    cloud.enabled = !list; // NS
    local.onchange = function() {
      cloud.enabled = !list && !local.value;
    };
    cloud.onchange = function() {
      local.setEnabled(1, this.selectedSprite.isSprite && !cloud.value);
    }.bind(this);
    var d = new Dialog(vis.getText(list ? 'New List' : 'New Variable'), Dialog.content(
      name.el,
      local.el,
      Dialog.line(),
      cloud.el,
      Dialog.buttons(
        [vis.getText('OK'), function() {d.commit()}],
        [vis.getText('Cancel'), function() {d.hide()}])));

    d.oncommit = function() {
      if (list) {
        this.addList(name.value, local.value, cloud.value);
      } else {
        this.addVariable(name.value, local.value, cloud.value);
      }
    }.bind(this);
    d.show(this);
  };

  def(Editor.prototype, 'broadcastNames', {get: function() {
    function add(script) {
      if (!script || !script.isScript) return;
      var b = script.blocks;
      for (var i = b.length; i--;) {
        var a = b[i].args;
        for (var j = a.length; j--;) {
          if (a[j].type === 't') {
            add(a[j].script);
          } else if (a[j].menu === 'broadcast') {
            names[a[j].value] = true;
          }
        }
      }
    }
    var names = {};
    this.stage.forEachScript(add);
    this.tabPanel.scriptEditor.palette.scripts.forEach(add.bind(null, null));
    return Object.keys(names);
  }});

  Editor.prototype.bubbleRange = 25;
  Editor.prototype.bubbleMinWidth = 12;
  Editor.prototype.bubbleFont = '12px Arial, Verdana, DejaVu Sans, sans-serif';
  Editor.prototype.bubbleHeight = 18;
  Editor.prototype.bubbleColor = '#fff';
  Editor.prototype.bubbleBorderColor = 'rgba(0, 0, 0, .3)';
  Editor.prototype.bubbleTextColor = '#5c5d5f';
  Editor.prototype.bubblePadding = 4;
  Editor.prototype.bubbleRadius = 5;
  Editor.prototype.bubblePaddingX = 8;
  Editor.prototype.bubblePaddingY = 2;
  Editor.prototype.bubblePointerX = 2;
  Editor.prototype.bubblePointerY = 5;
  Editor.prototype.bubblePointerWidth = 10;
  Editor.prototype.bubbleShadowColor = 'rgba(0, 0, 0, .2)';
  Editor.prototype.bubbleShadowBlur = 8;
  Editor.prototype.bubbleShadowX = 3;
  Editor.prototype.bubbleShadowY = 3;

  Editor.prototype.mouseMove = function(e) {
    if (this.bubble) {
      var dx = e.clientX - this.bubbleX;
      var dy = e.clientY - this.bubbleY;
      if (dx * dx + dy * dy >= this.bubbleRange * this.bubbleRange) {
        this.hideBubble();
      }
    }
  };

  Editor.prototype.showBubble = function(text, x, y) {
    this.hideBubble();

    if (x == null) x = this.app.mouseX;
    if (y == null) y = this.app.mouseY;

    var p = this.bubblePadding;
    var px = this.bubblePaddingX;
    var py = this.bubblePaddingY;
    var ix = this.bubblePointerX;
    var iy = this.bubblePointerY;
    var iw = this.bubblePointerWidth;
    var sx = this.bubbleShadowX;
    var sy = this.bubbleShadowY;
    var sc = this.bubbleShadowColor;
    var sb = this.bubbleShadowBlur;
    var r = this.bubbleRadius;
    var canvas = el('canvas', 'Visual-absolute bubble');
    var ct = canvas.getContext('2d');
    ct.font = this.bubbleFont;
    var w = Math.max(ct.measureText(text).width, this.bubbleMinWidth) + px + Math.max(px, ix);
    var i = Math.max(0, ix - px);
    var h = this.bubbleHeight + py * 2 + iy;
    canvas.width = w + sx + sb * 2;
    canvas.height = h + sy + sb * 2;
    ct.translate(sb, sb);
    ct.moveTo(i + px - ix, h);
    ct.lineTo(i + px, h - iy);
    ct.arc(i + r, h - iy - r, r, Math.PI/2, Math.PI, false);
    ct.arc(i + r, r, r, Math.PI, Math.PI*3/2, false);
    ct.arc(w - r, r, r, Math.PI*3/2, 0, false);
    ct.arc(w - r, h - iy - r, r, 0, Math.PI/2, false);
    ct.lineTo(i + px - ix + iw, h - iy);
    ct.closePath();
    ct.strokeStyle = this.bubbleBorderColor;
    ct.lineWidth = 2;
    ct.stroke();
    ct.fillStyle = this.bubbleColor;
    ct.shadowColor = sc;
    ct.shadowOffsetX = sx;
    ct.shadowOffsetY = sy;
    ct.shadowBlur = sb;
    ct.fill();
    ct.shadowColor = 'transparent';
    ct.shadowBlur = 0;
    ct.shadowOffsetX = 0;
    ct.shadowOffsetY = 0;
    ct.fillStyle = this.bubbleTextColor;
    ct.textBaseline = 'middle';
    ct.textAlign = 'center';
    ct.font = this.bubbleFont;
    ct.fillText(text, i + w/2, (h - iy)/2);

    this.bubble = canvas;
    this.bubbleX = this.app.mouseX;
    this.bubbleY = this.app.mouseY;
    x = Math.max(p, Math.min(window.innerWidth - w - p, x));
    y = Math.max(p, Math.min(window.innerHeight - h - p, y));
    vis.util.setTransform(this.bubble, 'translate('+(x + i - sb)+'px,'+(y - sb - h)+'px)');
    document.body.appendChild(this.bubble);
  };

  Editor.prototype.hideBubble = function() {
    if (this.bubble) {
      document.body.removeChild(this.bubble);
      this.bubble = null;
    }
  };

  Editor.prototype.languageMenu = function() {
    return new vis.Menu(
      'English').withContext(this);
  };

  Editor.prototype.fileMenu = function() {
    return new vis.Menu(
      'New',
      vis.Menu.line,
      ['Save now', this.save],
      'Save as a copy',
      'Go to my stuff',
      vis.Menu.line,
      'Upload from your computer',
      'Download to your computer',
      vis.Menu.line,
      'Revert').translate().withContext(this);
  };

  Editor.prototype.editMenu = function() {
    return new vis.Menu(
      'Undelete',
      vis.Menu.line,
      'Small stage layout',
      'Turbo mode').translate().withContext(this);
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

    this.workspace.on('change', this.save, this);
  }

  ScriptEditor.prototype.save = function() {
    if (this.sprite) this.sprite.scripts = this.workspace.scripts.slice(0);
  };

  ScriptEditor.prototype.showSprite = function(sprite) {
    this.save();
    this.sprite = null;
    if (sprite) {
      this.workspace.clear();
      sprite.scripts.forEach(function(script) {
        this.workspace.add(script);
      }, this);
      this.workspace.scrollTo(0, 0);
      this.sprite = sprite;
    }
    this.refreshPalette();
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
      if (this._category === value) {
        this.refreshPalette();
        return;
      }
      value = Number(value);
      this._category = value;

      if (this.categoryButton) {
        this.categoryButton.className = 'palette-button';
      }
      this.categoryButton = this.buttons[value];
      this.categoryButton.className = 'palette-button selected';

      this.refreshPalette(true);
    }
  });

  ScriptEditor.prototype.refreshPalette = function(resetScroll) {
    if (resetScroll) {
      this.palette.el.scrollLeft =
      this.palette.el.scrollTop = 0;
    } else {
      var sl = this.palette.el.scrollLeft;
      var st = this.palette.el.scrollTop;
    }

    var scripts = this.palette.scripts;
    for (var i = scripts.length; i--;) {
      this.editor.exec.stopThread(scripts[i].thread);
    }

    this.palette.clear();
    (palettes[this._category] || []).forEach(this.eval, this);

    if (!resetScroll) {
      this.palette.el.scrollLeft = sl;
      this.palette.el.scrollTop = st;
    }
  };

  ScriptEditor.prototype.eval = function(t) {
    if (t.if) {
      ((this.evalCondition(t.if) ? t.then : t.else) || []).forEach(this.eval, this);
      return;
    }
    if (t.action) {
      var editor = this.editor;
      var button = el('button', 'ui-button');
      button.textContent = t.text;
      if (editor[t.action]) button.addEventListener('click', editor[t.action].bind(editor));
      return this.palette.add(vis.Palette.element(button));
    }
    if (t.text) {
      var div = el('palette-label');
      div.textContent = vis.getText(t.text);
      return this.palette.add(vis.Palette.element(div));
    }
    if (t.watcher) {
      var b = t.watcher;
      if (!b.pop) b = [b];
      var button = el('button', 'check-box');
      var checked = false;
      button.addEventListener('click', function() {
        if (checked = !checked) {
          button.classList.add('checked');
        } else {
          button.classList.remove('checked');
        }
      });
      this.palette.add(vis.Palette.inline(button));
      return this.eval(b);
    }
    if (t === '==') {
      return this.palette.add(vis.Palette.element(el('palette-separator')));
    }
    if (t === '--' || t === '---') {
      return this.palette.add(vis.Palette.space(t.length * 10 - 5));
    }
    if (t.all) {
      return (this.evalAll(t.all) || []).forEach(this.eval, this);
    }
    if (!Array.isArray(t)) {
      t = [t];
    }
    var script = new vis.Script().add(new vis.Block(t[0], t.slice(1).map(this.evalArg, this)));
    if (!this.editor.exec.table[t[0]]) script.addEffect(script.outline.bind(script, 2, '#faa'));
    this.palette.add(script);
  };

  ScriptEditor.prototype.evalArg = function(arg) {
    if (typeof arg !== 'object') return arg;
    if (arg.first) {
      var key = arg.first === 'var' ? 'variables' : arg.first === 'list' ? 'lists' : '';
      if (key) return this.editor.stage[key].concat(this.editor.selectedSprite[key]).map(getName).sort()[0];
    }
    return '';
  };

  ScriptEditor.prototype.evalCondition = function(condition) {
    var stage = this.editor.stage;
    var sprite = this.editor.selectedSprite;
    switch (condition) {
      case 'variables': return stage.variables.length || sprite.variables.length;
      case 'lists': return stage.lists.length || sprite.lists.length;
      case 'stage': return sprite.isStage;
      case 'sprite': return sprite.isSprite;
    }
  };

  ScriptEditor.prototype.evalAll = function(all) {
    function getter(get) {
      return function(name) {return {watcher: [get, name]}};
    }

    function collection(key, make) { // NS
      var stagec = stage[key].map(getName).sort().map(make);
      var spritec = sprite.isStage ? [] : sprite[key].map(getName).sort().map(make);
      return stagec.concat(stagec.length && spritec.length ? "==" : [], spritec);
    }

    var stage = this.editor.stage;
    var sprite = this.editor.selectedSprite;
    switch (all) {
      case 'variables':
        return collection('variables', getter('readVariable'));
      case 'lists':
        return collection('lists', getter('contentsOfList:'));
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
    this.showMenu(this.languageButton, this.editor.languageMenu());
  };

  TopBar.prototype.fileMenu = function() {
    this.showMenu(this.fileButton, this.editor.fileMenu());
  };

  TopBar.prototype.editMenu = function() {
    this.showMenu(this.editButton, this.editor.editMenu());
  };

  TopBar.prototype.showTips = function() {};
  TopBar.prototype.showAbout = function() {};

  TopBar.prototype.showMenu = function(button, menu) {
    if (!this.parent) return;
    var bb = button.getBoundingClientRect();
    var bb2 = this.el.getBoundingClientRect();
    menu.showAt(bb.left, bb2.bottom, this.parent);
  };


  function StagePanel(editor) {
    this.editor = editor;
    this.stage = editor.stage;
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

    this.el.appendChild(this.elStage = this.stage.canvas);
    this.elStage.classList.add('stage');

    this._showMouseCoords = true;
    this.el.appendChild(this.elMouseCoords = el('mouse-coords'));
    this.elMouseCoords.appendChild(this.elMouseXLabel = el('mouse-label x-axis'));
    this.elMouseXLabel.textContent = 'x:';
    this.elMouseCoords.appendChild(this.elMouseX = el('mouse-coord x-axis'));
    this.elMouseCoords.appendChild(this.elMouseXLabel = el('mouse-label y-axis'));
    this.elMouseXLabel.textContent = 'y:';
    this.elMouseCoords.appendChild(this.elMouseY = el('mouse-coord x-axis'));

    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mousemove', this.updateMouse.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
  }

  StagePanel.prototype.keyDown = function(e) {
    var name = getKeyName(e.keyCode);
    if (e.metaKey || e.ctrlKey) {
      switch (name) {
        case 's':
          this.editor.save();
          break;
        case '.':
          this.editor.exec.stopAll();
          break;
        case 'return':
          this.editor.exec.triggerGreenFlag();
          break;
        default:
          return;
      }
      e.preventDefault();
    }
    if (name) {
      this.stage.keys[name] = true;
      this.editor.exec.triggerKey(getKeyName(name));
    }
  };

  StagePanel.prototype.keyUp = function(e) {
    var name = getKeyName(e.keyCode);
    if (name) {
      this.stage.keys[name] = false;
    }
  };

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

  StagePanel.prototype.mouseDown = function(e) {
    this.updateMouse(e);
    this.stage.mouseDown = true;
  };

  StagePanel.prototype.mouseUp = function(e) {
    this.updateMouse(e);
    this.stage.mouseDown = false;
  };

  def(StagePanel.prototype, 'showMouseCoords', {
    get: function() {return this._showMouseCoords},
    set: function(value) {
      this._showMouseCoords = value;
      this.elMouseCoords.style.visibility = value ? 'visible' : 'hidden';
    }
  });

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
      .addCostume(new Costume('costume1', 'f9a1c175dbe2e5dee472858dd30d16bb.svg', 47, 55))
      .addCostume(new Costume('costume2', 'c68e7b211672862001dd4fce12129813.png', 57, 41));
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
    var tbb = this.elSpriteSection.getBoundingClientRect();
    var ibb = icon.el.getBoundingClientRect();
    var t = ibb.top - 3;
    var b = ibb.bottom + 3;
    if (t < tbb.top) this.elSpriteSection.scrollTop += t - tbb.top;
    else if (b > tbb.bottom) this.elSpriteSection.scrollTop += b - tbb.bottom;
    this.editor.selectedSprite = icon.sprite;
    this.editor.tabPanel.showSprite(icon.sprite);
    return this;
  };

  SpritePanel.prototype.addIcon = function(sprite) {
    var icon = new SpriteIcon(this, sprite);
    this.icons.push(icon);
    this.elSpriteSection.appendChild(icon.el);
    if (this.parent) {
      this.parent.add(icon);
      icon.resize();
    }
    return icon;
  };

  SpritePanel.prototype.removeIcon = function(icon) {
    var i = this.icons.indexOf(icon);
    if (i !== -1) this.icons.splice(i, 1);
    this.elSpriteSection.removeChild(icon.el);
    if (this.parent) {
      this.parent.remove(icon);
    }
    this.select(this.icons[i] || this.icons[i - 1] || this.stageIcon);
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
    this.editor = panel.editor;
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
      ['duplicate', this.duplicateSprite],
      vis.Menu.line,
      this.sprite.visible ? ['hide', this.hideSprite] : ['show', this.showSprite],
      ['delete', this.deleteSprite],
      vis.Menu.line,
      'save to local file').withContext(this).translate();
  }});

  SpriteIcon.prototype.duplicateSprite = function() {
    var sprite = this.sprite.copy();
    sprite.name = this.editor.stage.uniqueName(sprite.name);
    this.editor.stage.add(sprite);
    this.panel.select(this.panel.addIcon(sprite));
  };

  SpriteIcon.prototype.hideSprite = function() {
    if (this.sprite.isSprite) {
      this.sprite.visible = false;
      this.sprite.stage.redraw();
    }
  };

  SpriteIcon.prototype.showSprite = function() {
    if (this.sprite.isSprite) {
      this.sprite.visible = true;
      this.sprite.stage.redraw();
    }
  };

  SpriteIcon.prototype.deleteSprite = function() {
    if (this.sprite.isSprite) {
      this.sprite.destroy();
      this.editor.stage.redraw();
      this.panel.removeIcon(this);
    }
  };

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
    var x = (w - aw)/2;
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


  function Dialog(title, content) {
    this.el = el('dialog');
    this.el.appendChild(this.elTitle = el('dialog-title'));
    this.el.appendChild(this.elContent = content || el('dialog-content'));
    if (content) content.classList.add('dialog-content');

    this.el.addEventListener('keydown', this.keyDown.bind(this));
    this.el.addEventListener('mousedown', this.mouseDown.bind(this));
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.title = title;
    this.x = 0;
    this.y = 0;
  }

  def(Dialog.prototype, 'title', {
    get: function() {return this._title},
    set: function(value) {this._title = this.elTitle.textContent = value}
  });

  Dialog.prototype.padding = 4;

  Dialog.prototype.moveTo = function(x, y) {
    var p = this.padding; // NS
    vis.util.moveTo.call(this, Math.max(p, Math.min(innerWidth - this.width - p, x)), Math.max(p, Math.min(innerHeight - this.height - p, y)));
  };

  Dialog.prototype.show = function(editor) {
    this.editor = editor;

    document.body.appendChild(this.el);
    var ebb = editor.el.getBoundingClientRect();
    var tbb = this.el.getBoundingClientRect();

    this.width = tbb.width | 0;
    this.height = tbb.height | 0;
    this.moveTo(Math.floor((Math.max(0, ebb.left) + Math.min(innerWidth, ebb.right) - tbb.width) / 2), Math.floor((Math.max(0, ebb.top) + Math.min(innerHeight, ebb.bottom) - tbb.height) / 2));

    this.focusFirst(this.elContent);

    return this;
  };

  Dialog.prototype.focusFirst = function(el) {
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'BUTTON') {
      el.focus();
      return true;
    }
    var c = el.childNodes;
    for (var i = 0, l = c.length; i < l; i++) {
      if (this.focusFirst(c[i])) return true;
    }
    return false;
  };

  Dialog.prototype.hide = function() {
    if (this.editor) {
      document.body.removeChild(this.el);
      this.editor = null;
    }
    return this;
  };

  Dialog.prototype.commit = function() {
    if (this.oncommit) this.oncommit();
    this.hide();
    return this;
  };

  Dialog.prototype.cancel = function() {
    if (this.oncancel) this.oncancel();
    this.hide();
    return this;
  };

  Dialog.alert = function(title, text, button, fn, context) {
    if (typeof button === 'function' || button == null) {
      context = fn;
      fn = button;
      button = vis.getText('OK');
    }

    var d = new Dialog(title, Dialog.content(
      Dialog.label(text),
      Dialog.buttons(
        [button, function() {d.commit()}])));

    if (fn) d.oncommit = fn.bind(context);
    return d;
  };

  Dialog.confirm = function(title, text, yes, no, fn, context) {
    if (typeof yes === 'function' || yes == null) {
      context = no;
      fn = yes;
      no = vis.getText('Cancel');
      yes = vis.getText('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = vis.getText('Cancel');
    }

    var d = new Dialog(title, Dialog.content(
      Dialog.label(text),
      Dialog.buttons(
        [yes, function() {d.commit()}],
        [no, function() {d.cancel()}])));

    if (fn) {
      d.oncommit = fn.bind(context, true);
      d.oncancel = fn.bind(context, false);
    }
    return d;
  };

  Dialog.prompt = function(title, label, yes, no, fn, context) {
    if (typeof yes === 'function' || yes == null) {
      context = no;
      fn = yes;
      no = vis.getText('Cancel');
      yes = vis.getText('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = vis.getText('Cancel');
    }

    var field = new Dialog.Field(label);
    var d = new Dialog(title, Dialog.content(
      field.el,
      Dialog.buttons(
        [yes, function() {d.commit()}],
        [no, function() {d.cancel()}])));

    if (fn) {
      d.oncommit = function() {
        fn.call(context, field.value);
      };
      d.oncancel = fn.bind(context, null);
    }
    return d;
  };

  Dialog.label = function(text) {
    var div = el('dialog-label');
    div.textContent = text;
    return div;
  };

  Dialog.Field = function(label) {
    this.value = '';
    this.el = el('label', 'dialog-label');
    this.el.textContent = label + ':';
    this.field = el('input', 'dialog-field');
    this.field.addEventListener('input', this.change.bind(this));
    this.el.appendChild(this.field);
  };

  Dialog.Field.prototype.change = function() {
    this.value = this.field.value;
  };

  Dialog.Radio = function() {
    this.el = el('dialog-label');
    this.radios = [];
    this.labels = [];
    this.values = [];
    var a = this.args = slice.call(arguments);
    for (var i = 0, l = a.length; i < l; i++) {
      var s = a[i];
      var label = el('label', 'dialog-radio-label enabled');
      var radio = el('button', 'dialog-radio');
      radio.dataset.index = i;
      radio.addEventListener('click', this.click.bind(this, i));
      label.appendChild(radio);
      label.appendChild(document.createTextNode(s[0]));
      this.el.appendChild(label);
      this.labels.push(label);
      this.radios.push(radio);
      this.values.push(s[1]);
      if (this.value == null) {
        radio.classList.add('selected');
        this.radio = radio;
        this.value = s[1];
      }
    }
  };

  Dialog.Radio.prototype.setEnabled = function(i, enabled) {
    var radio = this.radios[i];
    if (radio) {
      radio.dataset.enabled = !!enabled;
      var label = this.labels[i];
      if (enabled) {
        label.classList.add('enabled');
      } else {
        label.classList.remove('enabled');
      }
    }
  };

  Dialog.Radio.prototype.click = function(i) {
    var radio = this.radios[i];
    if (radio.dataset.enabled !== 'false') {
      if (this.radio) this.radio.classList.remove('selected');
      this.radio = radio;
      this.value = this.values[i];
      radio.classList.add('selected');
      if (this.onchange) this.onchange();
    }
  };

  Dialog.Radio.prototype.onchange = null;

  Dialog.CheckBox = function(label) {
    this._enabled = true;
    this.value = false;
    this.el = el('label', 'dialog-label dialog-check-box-label enabled');
    this.button = el('button', 'check-box');
    this.button.addEventListener('click', this.click.bind(this));
    this.el.appendChild(this.button);
    this.el.appendChild(document.createTextNode(label));
  };

  Dialog.CheckBox.prototype.click = function(e) {
    e.preventDefault();
    if (!this._enabled) return;
    if (this.value = !this.value) {
      this.button.classList.add('checked');
    } else {
      this.button.classList.remove('checked');
    }
    if (this.onchange) this.onchange();
  };

  def(Dialog.CheckBox.prototype, 'enabled', {
    get: function() {return this._enabled},
    set: function(value) {
      this._enabled = value;
      if (value) {
        this.el.classList.add('enabled');
      } else {
        this.el.classList.remove('enabled');
      }
    }
  });

  Dialog.CheckBox.prototype.onchange = null;

  Dialog.line = function() {
    return el('dialog-separator');
  };

  Dialog.content = function() {
    var div = el('');
    var a = slice.call(arguments);
    for (var i = 0, l = a.length; i < l; i++) {
      div.appendChild(a[i]);
    }
    return div;
  };

  Dialog.buttons = function() {
    var div = el('dialog-buttons');
    var a = slice.call(arguments);
    for (var i = 0, l = a.length; i < l; i++) {
      var b = a[i];
      if (typeof b !== 'object') b = [b, b];
      var button = el('button', 'ui-button');
      button.textContent = b[0];
      div.appendChild(button);
      if (b[1]) button.addEventListener('click', b[1]);
    }
    return div;
  };

  Dialog.prototype.keyDown = function(e) {
    if (e.keyCode === 13) {
      this.commit();
    }
    if (e.keyCode === 27) {
      this.cancel();
    }
  };

  Dialog.prototype.mouseDown = function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'LABEL') return;
    this.dragX = this.x - e.clientX;
    this.dragY = this.y - e.clientY;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  Dialog.prototype.mouseMove = function(e) {
    this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
  };

  Dialog.prototype.mouseUp = function(e) {
    this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };


  var editor = new Editor();
  document.body.appendChild(editor.el);
  editor.resize();
  editor.start();
  window.editor = editor;

  // var player = document.querySelector('.player');
  // var stagePanel = new StagePanel(new Stage());
  // stagePanel.showMouseCoords = false;
  // player.appendChild(stagePanel.el);

  // var flip = editor.elFlipButton;
  // var flipBack = document.querySelector('.flip-back');

  // var flipped = false;
  // function doFlip() {
  //   var time = 1;
  //   editor.el.style.WebkitTransition =
  //   player.style.WebkitTransition = 'none';
  //   editor.el.style.WebkitTransform =
  //   player.style.WebkitTransform = 'none';
  //   var ebb = editor.el.getBoundingClientRect();
  //   var pbb = player.getBoundingClientRect();
  //   var dx = ((pbb.right + pbb.left) - (ebb.right + ebb.left)) / 2;
  //   var dy = ((pbb.bottom + pbb.top) - (ebb.bottom + ebb.top)) / 2;
  //   var sx = pbb.width / ebb.width;
  //   var sy = pbb.height / ebb.height;
  //   if (flipped) {
  //     editor.el.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
  //     editor.el.offsetHeight;
  //     player.offsetHeight;
  //     editor.el.style.WebkitTransition =
  //     player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
  //     editor.el.style.WebkitTransform = 'none';
  //     player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
  //   } else {
  //     player.style.WebkitTransform = 'translate('+(-dx)+'px,'+(-dy)+'px) rotateY(-180deg) scale('+(1/sx)+','+(1/sy)+')';
  //     editor.el.offsetHeight;
  //     player.offsetHeight;
  //     editor.el.style.WebkitTransition =
  //     player.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
  //     editor.el.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) rotateY(180deg) scale('+sx+','+sy+')';
  //     player.style.WebkitTransform = 'none';
  //   }
  //   flipped = !flipped;
  // }

  // flip.addEventListener('click', doFlip);
  // flipBack.addEventListener('click', doFlip);

}());
