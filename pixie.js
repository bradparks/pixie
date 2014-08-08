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
    //   return '\u2023' + (vis.options.strings[key] || key);
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
      "readVariable": ["r", "%l", 9, 'variable'],
      "setVar:to:": ["c", "set %m.var to %s", 9, 'variable', 0],
      "changeVar:by:": ["c", "change %m.var by %n", 9, 'variable', 1],
      "showVariable:": ["c", "show variable %m.var", 9, 'variable'],
      "hideVariable:": ["c", "hide variable %m.var", 9, 'variable'],

      // lists
      "contentsOfList:": ["r", "%l", 12, 'list'],
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
        var m = new Menu;
        [[90, 'right'],
         [-90, 'left'],
         [0, 'up'],
         [180, 'down']].forEach(function(item) {
          m.add(['('+item[0]+') '+T(item[1]), item[0]]);
        });
        return m;
      },
      var: function(arg) {
        var m = new Menu;
        var editor = arg.app.editor;
        m.addAll(editor.stage.variables.map(getName));
        if (editor.selectedSprite.isSprite && editor.selectedSprite.variables.length) {
          if (editor.stage.variables.length) {
            m.add(Menu.line);
          }
          m.addAll(editor.selectedSprite.variables.map(getName));
        }
        return m;
      },
      list: function(arg) {
        var m = new Menu;
        var editor = arg.app.editor;
        m.addAll(editor.stage.lists.map(getName));
        if (editor.selectedSprite.isSprite && editor.selectedSprite.lists.length) {
          if (editor.stage.lists.length) {
            m.add(Menu.line);
          }
          m.addAll(editor.selectedSprite.lists.map(getName));
        }
        return m;
      },
      key: function() {
        var m = new Menu('up arrow', 'down arrow', 'left arrow', 'right arrow', 'space').translate().addAll('abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
        return m;
      },
      spriteOrMouse: function(arg) {
        return spriteMenu(arg, '_mouse_');
      },
      touching: function(arg) {
        return spriteMenu(arg, '_mouse_', '_edge_');
      },
      rotationStyle: function() {
        return new Menu('left-right', 'all around', "don't rotate").translate();
      },
      effect: function() {
        return new Menu('color', 'fisheye', 'whirl', 'pixelate', 'mosaic', 'brightness', 'ghost').translate();
      },
      costume: function(arg) {
        return new Menu().addAll(arg.app.editor.selectedSprite.costumes.map(getName));
      },
      backdrop: function(arg) {
        return new Menu().addAll(arg.app.editor.stage.costumes.map(getName)).addLine().addTranslated('next backdrop').addTranslated('previous backdrop');
      },
      sound: function(arg) {
        return new Menu().addAll(arg.app.editor.selectedSprite.sounds.map(getName)).add(Menu.line).add([T('record...'), function() {
          // TODO record a sound
        }]);
      },
      broadcast: function(arg) {
        return new Menu().addAll(arg.app.editor.broadcastNames).add(Menu.line).add([T('new message...'), function() {
            var arg = this;
            Dialog.prompt(T('New Message'), T('Message name:'), function(value) { // NS
              if (value) arg.value = value;
            }).show(arg.app.editor);
          }]);
      },
      triggerSensor: function() {
        return new Menu('loudness', 'timer', 'video motion').translate();
      },
      stop: function(arg) {
        function item(value, type) {
          return [T(value), function() {
            arg.value = value;
            if (arg.parent) arg.parent.type = type;
          }];
        }
        return new Menu(
          item('all', 'f'),
          item('this script', 'f'),
          item('other scripts in sprite', 'c'));
      },
      spriteOnly: function(arg) {
        return spriteMenu(arg, '_myself_');
      },
      videoMotionType: function() {
        return new Menu('motion', 'direction').translate();
      },
      stageOrThis: function() {
        return new Menu('Stage', 'this sprite').translate();
      },
      videoState: function() {
        return new Menu('off', 'on', 'on-flipped').translate();
      },
      spriteOrStage: function(arg) {
        return spriteMenu(arg, '_stage_');
      },
      attribute: function(arg) {
        var stage = arg.app.editor.stage;
        var name = arg.parent.args[1].value;
        if (name === '_stage_') return new Menu('backdrop #', 'backdrop name', 'volume').translate().addLine().addAll(stage.variables.map(getName));
        var sprite = stage.findObject(name);
        return sprite && new Menu('x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume').translate().addLine().addAll(sprite.variables.map(getName));
      },
      timeAndDate: function() {
        return new Menu('year', 'month', 'date', 'day of week', 'hour', 'minute', 'second').translate();
      },
      mathOp: function() {
        return new Menu('abs', 'floor', 'ceiling', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'e ^', '10 ^').translate();
      },
      drum: function() {
        return new Menu().addAll(['Snare Drum', 'Bass Drum', 'Side Stick', 'Crash Cymbal', 'Open Hi-Hat', 'Closed Hi-Hat', 'Tambourine', 'Hand Clap', 'Claves', 'Wood Block', 'Cowbell', 'Triangle', 'Bongo', 'Conga', 'Cabassa', 'Guiro', 'Vibraslap', 'Open Culca'].map(function(x, i) {return ['('+(i + 1)+') ' + T(x), i + 1]}));
      },
      instrument: function() {
        return new Menu().addAll(['Piano', 'Electric Piano', 'Organ', 'Guitar', 'Electric Guitar', 'Bass', 'Pizzicato', 'Cello', 'Trombone', 'Clarinet', 'Saxophone', 'Flute', 'Wooden Flute', 'Bassoon', 'Choir', 'Vibraphone', 'Music Box', 'Steel Drum', 'Marimba', 'Synth Lead', 'Synth Pad'].map(function(x, i) {return ['('+(i + 1)+') ' + T(x), i + 1]}));
      },
      note: function() {
        return new Menu().addAll([
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
          [72, 'High C']].map(function(i) {return ['('+i[0]+') '+T(i[1]), i[0]]}));
      },
      listItem: function() {
        return new Menu(1).addTranslated('last').addTranslated('random');
      },
      listDeleteItem: function() {
        return new Menu(1).addTranslated('last').add(Menu.line).addTranslated('all');
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
        ["gotoX:y:", {current: 'x'}, {current: 'y'}],
        "gotoSpriteOrMouse:",
        ["glideSecs:toX:y:elapsed:from:", 1, {current: 'x'}, {current: 'y'}],
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
        ["lookLike:", {first: 'costume'}],
        "nextCostume"
      ]},
      ["startScene", {first: 'backdrop'}],
      {if: "stage", then: [
        ["startSceneAndWait", {first: 'backdrop'}],
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
      ["playSound:", {first: 'sound'}],
      ["doPlaySoundAndWait", {first: 'sound'}],
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
      ["whenSceneStarts", {first: 'backdrop'}],
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
      ["getAttribute:of:", {first: 'attribute'}, {first: 'sprite'}],
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

  var tips = {
    'home': 'home',
    'scratchUI': 'ui/editor-map',
    'paint': 'ui/image-editor-map',
    'hoc': 'howto/hoc',
    'madewithcode-card': 'howto/cardtip1',
    'madewithcode-name': 'howto/nametip1',
    'getStarted': 'howto/get-started-1',
    'changeXposBy:': 'blocks/change-x',
    'changeYposBy:': 'blocks/change-y',
    'heading': 'blocks/direction',
    'glideSecs:toX:y:elapsed:from:': 'blocks/glide',
    'gotoSpriteOrMouse:': 'blocks/go-to',
    'gotoX:y:': 'blocks/go-to-xy',
    'bounceOffEdge': 'blocks/if-on-edge-bounce',
    'forward:': 'blocks/move-steps',
    'heading:': 'blocks/point-direction',
    'pointTowards:': 'blocks/point-towards',
    'say:': 'blocks/say',
    'say:duration:elapsed:from:': 'blocks/say-for-seconds',
    'turnLeft:': 'blocks/turn-left',
    'turnRight:': 'blocks/turn-right',
    'xpos:': 'blocks/set-x',
    'ypos:': 'blocks/set-y',
    '&': 'blocks/and',
    '|': 'blocks/or',
    'getAttribute:of:': 'blocks/getattribute',
    'list:contains:': 'blocks/list-contains',
    'computeFunction:of:': 'blocks/computefunction',
    '*': 'blocks/multiply',
    '+': 'blocks/add',
    '-': 'blocks/subtract',
    '/': 'blocks/divide',
    '%': 'blocks/mod',
    '<': 'blocks/less-than',
    '=': 'blocks/equal',
    '>': 'blocks/greater-than',
    'append:toList:': 'blocks/add-to-list',
    'answer': 'blocks/answer',
    'doAsk': 'blocks/ask-and-wait',
    'backgroundIndex': 'blocks/backdrop-number',
    'sceneName': 'blocks/backdrop-name',
    'broadcast:': 'blocks/broadcast',
    'doBroadcastAndWait': 'blocks/broadcast-wait',
    'changeGraphicEffect:by:': 'blocks/change-effect',
    'changeVar:by:': 'blocks/change-variable',
    'changePenHueBy:': 'blocks/changecolor',
    'changePenShadeBy:': 'blocks/changeshadeby',
    'changePenSizeBy:': 'blocks/changepensize',
    'changeSizeBy:': 'blocks/change-size',
    'changeTempoBy:': 'blocks/change-tempo',
    'changeVolumeBy:': 'blocks/change-volume',
    'clearPenTrails': 'blocks/clear',
    'filterReset': 'blocks/clear-graphic-effects',
    'color:sees:': 'blocks/color-is-touching',
    'costumeIndex': 'blocks/costume-number',
    'createCloneOf': 'blocks/create-clone',
    'timeAndDate': 'blocks/current-time',
    'timestamp': 'blocks/timestamp',
    'deleteLine:ofList:': 'blocks/delete-from-list',
    'deleteClone': 'blocks/delete-this-clone',
    'distanceTo:': 'blocks/distance-to',
    'doForever': 'blocks/forever',
    'goBackByLayers:': 'blocks/go-back-layer',
    'comeToFront': 'blocks/go-to-front',
    'hide': 'blocks/hide',
    'hideList:': 'blocks/hide-list',
    'hideVariable:': 'blocks/hide-variable',
    'doIf': 'blocks/if',
    'doIfElse': 'blocks/if-else',
    'insert:at:ofList:': 'blocks/inside-list',
    'getLine:ofList:': 'blocks/item-of-list',
    'concatenate:with:': 'blocks/join',
    'keyPressed:': 'blocks/key-pressed',
    'lineCountOfList:': 'blocks/length-of-list',
    'stringLength:': 'blocks/length-of',
    'letter:of:': 'blocks/letter-of',
    'soundLevel': 'blocks/loudness',
    'mousePressed': 'blocks/mouse-down',
    'mouseX': 'blocks/mouse-x',
    'mouseY': 'blocks/mouse-y',
    'nextScene': 'blocks/nextbackdrop',
    'nextCostume': 'blocks/next-costume',
    'not': 'blocks/not',
    'putPenDown': 'blocks/pendown',
    'putPenUp': 'blocks/penup',
    'randomFrom:to:': 'blocks/pick-random',
    'playDrum': 'blocks/play_drum',
    'noteOn:duration:elapsed:from:': 'blocks/playnote',
    'playSound:': 'blocks/playsound',
    'doPlaySoundAndWait': 'blocks/playsound_untildone',
    'doRepeat': 'blocks/repeat',
    'doUntil': 'blocks/repeat-until',
    'setLine:ofList:to:': 'blocks/replace-list',
    'timerReset': 'blocks/reset-timer',
    'rest:elapsed:from:': 'blocks/rest',
    'rounded': 'blocks/round',
    'setGraphicEffect:to:': 'blocks/set-effect',
    'setVar:to:': 'blocks/set-variable',
    'instrument:': 'blocks/setinstrument',
    'penColor:': 'blocks/setpencolor',
    'setPenHueTo:': 'blocks/setpencolorto',
    'setPenShadeTo:': 'blocks/setshade',
    'penSize:': 'blocks/setpensize',
    'setRotationStyle': 'blocks/setrotation',
    'setSizeTo:': 'blocks/set-size',
    'setTempoTo:': 'blocks/set-tempo',
    'setVideoTransparency': 'blocks/set-video-transparency',
    'setVolumeTo:': 'blocks/set-volume',
    'show': 'blocks/show',
    'showList:': 'blocks/show-list',
    'showVariable:': 'blocks/show-variable',
    'scale': 'blocks/size',
    'stampCostume': 'blocks/stamp',
    'stopScripts': 'blocks/stop',
    'stopAllSounds': 'blocks/stopsound',
    'startScene': 'blocks/switch-backdrop',
    'startSceneAndWait': 'blocks/switch-backdrop-and-wait',
    'lookLike:': 'blocks/switch-costume',
    'tempo': 'blocks/tempo',
    'think:': 'blocks/think',
    'think:duration:elapsed:from:': 'blocks/think-for-seconds',
    'timer': 'blocks/timer',
    'touching:': 'blocks/touching',
    'touchingColor:': 'blocks/touching-color',
    'setVideoState': 'blocks/turn-video',
    'getUserName': 'blocks/username',
    'senseVideoMotion': 'blocks/video-motion',
    'volume': 'blocks/volume',
    'wait:elapsed:from:': 'blocks/wait-secs',
    'doWaitUntil': 'blocks/wait-until',
    'whenKeyPressed': 'blocks/when-key-pressed',
    'whenSensorGreaterThan': 'blocks/when-loudness',
    'whenGreenFlag': 'blocks/when-flag-clicked',
    'whenSceneStarts': 'blocks/when-backdrop-switches',
    'whenIReceive': 'blocks/when-i-receive',
    'whenCloned': 'blocks/clone-startup',
    'whenClicked': 'blocks/when-this-sprite-clicked',
    'xpos': 'blocks/x-position',
    'ypos': 'blocks/y-position',
    'procDef': 'blocks/define',
    'proc_declaration': 'blocks/define',
    'call': 'blocks/usedefine',
    'extensions': 'ui/extensions'
  };

  var Workspace = vis.Workspace;
  var Palette = vis.Palette;
  var Script = vis.Script;
  var Comment = vis.Comment;
  var Block = vis.Block;
  var Arg = vis.Arg;
  var Icon = vis.Icon;
  var Menu = vis.Menu;

  function T(key, values) {
    var text = vis.getText(key);
    return values ? vis.util.format(text, values) : text;
  };

  var menusThatAcceptReporters = ['broadcast', 'costume', 'backdrop', 'scene', 'sound', 'spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'];
  Arg.prototype.acceptsDropOf = function(b) {
    return this.type !== 't' && this.type !== 'l' && (this.type !== 'b' || b.isBoolean) && (this.type !== 'm' || menusThatAcceptReporters.indexOf(this.menu) !== -1);
  };

  Workspace.prototype.paddingLeft = 10;
  Workspace.prototype.paddingTop = 10;
  Workspace.prototype.spacing = 10;

  Palette.prototype.paddingLeft = 6;
  Palette.prototype.paddingTop = 7;
  Palette.prototype.paddingRight = 6;
  Palette.prototype.paddingBottom = 6;
  Palette.prototype.spacing = 5;
  Palette.prototype.spaceSize = 15;

  Block.prototype.click = function() {
    var app = this.app;
    if (app && app.exec) {
      app.exec.toggleThread(this.topScript, app.editor.selectedSprite);
    }
  };

  Block.prototype.groups = [ // NS
    ['changeXposBy:', 'xpos:', 'changeYposBy:', 'ypos:'],
    ['xpos', 'ypos'],
    ['say:', 'think:'],
    ['say:duration:elapsed:from:', 'think:duration:elapsed:from:'],
    ['show', 'hide'],
    ['playSound:', 'doPlaySoundAndWait'],
    ['putPenDown', 'putPenUp'],
    ['setPenHueTo:', 'changePenHueBy:', 'setPenShadeTo:', 'changePenShadeBy:', 'changePenSizeBy:', 'setPenSizeTo:'],
    ['doIf', 'doIfElse'],
    ['mouseX', 'mouseY'],
    ['+', '-', '*', '/', '%'],
    ['&', '|'],
    ['<', '=', '>']
  ];

  Block.prototype.defaultContextMenu = Object.getOwnPropertyDescriptor(Block.prototype, 'contextMenu').get;
  Object.defineProperty(Block.prototype, 'contextMenu', {get: function() {
    var m = this.defaultContextMenu();
    var editor = this.app.editor;
    if (this.name === 'readVariable' || this.name === 'contentsOfList:') {
      var isVar = this.name === 'readVariable';
      if (this.workspace.isPalette) {
        m.insertAllTranslated(0, [
          isVar ? 'rename variable' : 'rename list',
          [isVar ? 'delete variable' : 'delete list', function() {
            if (isVar) {
              editor.removeVariable(this.args[0].value);
            } else {
              editor.removeList(this.args[0].value);
            }
          }.bind(this)],
          Menu.line]);
      } else {
        m.action = function(value) {
          this.args[0].value = value;
        }.bind(this);
        m.addLine();
        var globals = isVar ? editor.stage.variables : editor.stage.lists;
        var locals = isVar ? editor.selectedSprite.variables : editor.selectedSprite.lists;
        m.addAll(globals.map(getName));
        if (editor.selectedSprite.isSprite && locals.length) {
          if (globals.length) m.addLine();
          m.addAll(locals.map(getName));
        }
      }
    } else if (!this.workspace.isPalette) {
      m.addLine();
      m.action = function(value) {
        this.name = value;
        this.infoSpec = vis.getBlock(value)[1];
        this.spec = T(this.infoSpec);
        this.fn = null;
      }.bind(this);
      var gs = this.groups;
      for (var i = gs.length; i--;) {
        var g = gs[i];
        if (g.indexOf(this.name) !== -1) {
          for (var j = 0, l = g.length; j < l; j++) {
            var b = vis.getBlock(g[j]);
            m.add([T(b[1]).replace(/%[\w.]+/g, '').trim(), b[2]]);
          }
        }
      }
    }
    return m;
  }});

  Block.prototype.help = function() {
    // TODO
    Dialog.alert(T('Help'), T('Help is not available yet.')).show(this.app.editor);
  };

  Arg.prototype.menuTranslations = {
    'attribute': ['x position', 'y position', 'direction', 'costume #', 'costume name', 'size', 'volume', 'backdrop #', 'backdrop name', 'volume'],
    'backdrop': ['next backdrop', 'previous backdrop'],
    'broadcast': ['new message...'],
    'list': ['delete list', 'rename list'],
    'sound': ['record...'],
    'var': ['delete variable', 'rename variable'],
    'costume': [],
    'key': ['up arrow', 'down arrow', 'left arrow', 'right arrow', 'space']
  };

  Arg.prototype.shouldTranslate = function(value) {
    if (this.type === 'l') return false;
    if (['spriteOnly', 'spriteOrMouse', 'spriteOrStage', 'touching'].indexOf(this.menu) !== -1) {
      return ['_myself_', '_mouse_', '_edge_', '_stage_'].indexOf(value) !== -1;
    }
    var translations = this.menuTranslations[this.menu];
    return translations ? translations.indexOf(value) !== -1 : true;
  };

  Icon.prototype.icons.turnRight = {
    width: 16,
    height: 15,
    draw: function(context) {
      if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
      context.drawImage(assets, 230, 0, 31, 29, 0, 0, 15.5, 14.5);
    }
  };

  Icon.prototype.icons.turnLeft = {
    width: 16,
    height: 15,
    draw: function(context) {
      if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
      context.drawImage(assets, 230, 30, 30, 29, 0, 0, 15, 14.5);
    }
  };

  Icon.prototype.icons.greenFlag = {
    width: 23,
    height: 23,
    draw: function(context) {
      if (!assetsLoaded) return onAssetsLoaded(this.redraw, this);
      context.drawImage(assets, 262, 0, 46, 46, 0, 0, 23, 23);
    }
  };

  Script.prototype.addRunningEffect = function() {
    if (!this._runningEffect) {
      this.addEffect(this.runningEffect);
      this._runningEffect = true;
    }
    return this;
  };

  Script.prototype.runningEffect = function() {
    var canvas = this.shadow(0, 0, 12, '#ff9');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0);
    ctx.drawImage(canvas, 0, 0);
    return canvas;
  };

  Script.prototype.removeRunningEffect = function() {
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
    getProjectMetadataURL: function(id) {
      return 'http://scratch.mit.edu/api/v1/project/' + id + '/';
    },
    getAssetURL: function(md5) {
      return 'http://cdn.scratch.mit.edu/internalapi/asset/' + md5 + '/get/';
    },
    imageAssetCache: {},
    imageAssetStatus: {},
    getImageAsset: function(md5, cb) {
      var img = Server.imageAssetCache[md5];
      if (img) {
        if (cb) {
          switch (Server.imageAssetStatus[md5]) {
            case 'loading':
              img.addEventListener('load', function() {cb(null, img)});
              img.addEventListener('error', function() {cb(new Error)});
              break;
            case 'error':
              cb(new Error);
              break;
            case 'done':
              cb(null, img);
              break;
          }
        }
        return img;
      }
      img = document.createElement('img');
      Server.imageAssetCache[md5] = img;
      Server.imageAssetStatus[md5] = 'loading';
      img.crossOrigin = "anonymous";
      img.src = Server.getAssetURL(md5);
      if (cb) {
        img.addEventListener('load', function() {
          Server.imageAssetStatus[md5] = 'done';
          cb(null, img);
        });
        img.addEventListener('error', function() {
          Server.imageAssetStatus[md5] = 'error';
          cb(new Error);
        });
      }
      return img;
    },
    getAsset: function(md5, cb) {
      Server.get(Server.getAssetURL(md5), cb);
    },
    getProject: function(id, cb) {
      Server.get(Server.getProjectURL(id), cb);
    },
    getProjectMetadata: function(id, cb) {
      Server.get(Server.getProjectMetadataURL(id), cb && function(err, text) {
        if (err) return cb(err);
        try {
          cb(null, JSON.parse(text));
        } catch (e) {
          cb(e);
        }
      });
    },
    get: function(url, cb) {
      var xhr = new XMLHttpRequest;
      xhr.open('get', url, true);
      xhr.send();
      if (cb) {
        xhr.onload = function() {
          if (xhr.status === 200) {
            cb(null, xhr.responseText);
          } else {
            cb(new Error('HTTP ' + xhr.status));
          }
        };
        xhr.onerror = function() {cb(new Error)};
      }
    }
  };

  var IO = {
    writeArchive: function(object, cb, context) {
      try {
        var zip = new JSZip;
        IO.contents = zip.folder('contents');
        IO.imageCount = 0;
        IO.soundCount = 0;
        IO.contents.file((object.isStage ? 'project' : 'sprite') + '.json', JSON.stringify(object));
        cb.call(context, null, zip.generate({type: "arraybuffer"}));
      } catch (e) {
        cb.call(context, e);
      } finally {
        IO.contents = null;
      }
    },
    writeImage: function(image) {
      if (!IO.contents) return -1;
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      var id = IO.imageCount++;
      IO.contents.file(id+'.png', canvas.toDataURL().slice('data:image/png;base64,'.length), {base64: true});
      return id;
    },
    readArchiveFile: function(file, cb, context) {
      var reader = new FileReader;
      reader.onloadend = function(e) {
        IO.readArchive(reader.result, function(err, object) {
          if (err) return cb.call(context, err);
          if (object.isStage) object.title = stripExtension(file.name);
          cb.call(context, null, object);
        });
      };
      reader.readAsArrayBuffer(file);
    },
    readArchive: function(data, cb, context) {
      var zip = new JSZip(data);
      IO.images = {};
      IO.sounds = {};
      var json, x;
      for (var name in zip.files) if (hasOwnProperty.call(zip.files, name)) {
        if (x = /(\d+)\.(?:gif|jpg|png|svg)$/.exec(name)) {
          IO.images[x[1]] = IO.getImage(zip.file(name));
        } else if (/\.json$/.test(name)) {
          json = zip.file(name).asText();
        }
      }
      if (!json) return cb(new Error('No JSON data'));
      try {
        var object = JSON.parse(json);
        if (hasOwnProperty.call(object, 'children')) {
          cb.call(context, null, Stage.deserialize(object));
        } else if (hasOwnProperty.call(object, 'direction')) {
          cb.call(context, null, Sprite.deserialize(object));
        } else {
          throw new TypeError('Unknown object');
        }
      } catch (e) {
        cb.call(context, e);
      } finally {
        IO.images = null;
        IO.sounds = null;
      }
    },
    MIME_TYPES: {
      'png': 'image/png',
      'gif': 'image/gif',
      'jpg': 'image/jpeg',
      'svg': 'image/svg+xml'
    },
    getImage: function(file, ext) {
      var img = document.createElement('img');
      img.src = 'data:'+IO.MIME_TYPES[file.name.split('.').pop()]+';base64,'+btoa(file.asBinary());
      return img;
    },
    readImageFile: function(file, cb, context) {
      var reader = new FileReader;
      reader.onloadend = function() {
        if (reader.error) return cb.call(context, reader.error);
        var image = document.createElement('img');
        image.src = 'data:'+file.type+';base64,'+btoa(reader.result);
        image.onload = function() {
          cb.call(context, null, image);
        };
        image.onerror = function() {
          cb.call(context, null, new Error('Failed to load image'));
        };
      };
      reader.readAsBinaryString(file);
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

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


  function spriteMenu(arg) { // TODO include/exclude self
    var m = new Menu;
    var a = slice.call(arguments, 1);
    for (var i = 0, l = a.length; i < l; i++) {
      m.add(a[i]);
    }
    m.translate().add(Menu.line);
    arg.app.editor.stage.sprites.forEach(function(sprite) {
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

  function rgbToHSV(rgb) {
    var r = (rgb >> 16 & 0xff) / 0xff;
    var g = (rgb >> 8 & 0xff) / 0xff;
    var b = (rgb & 0xff) / 0xff;
    var i = Math.min(r, g, b);
    var v = Math.max(r, g, b);
    if (i === v) return {h: 0, s: 0, v: v};
    var d, j;
    switch (i) {
      case r: d = g - b; j = 3; break;
      case g: d = b - r; j = 5; break;
      case b: d = r - g; j = 7; break;
    }
    return {
      h: ((j - d / (v - i)) * 60) % 360,
      s: (v - i) / v,
      v: v
    };
  }

  function hsvToRGB(h, s, v) {
    h = h % 360;
    if (h < 0) h += 360;
    if (s < 0) s = 0;
    if (s > 1) s = 1;
    if (v < 0) v = 0;
    if (v > 1) v = 1;

    var j = h / 60 | 0;
    var r = h / 60 - j;
    var p = v * (1 - s);
    var q = v * (1 - s * r);
    var t = v * (1 - s * (1 - r));

    var r, g, b;
    switch (j) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return r * 255 << 16 | g * 255 << 8 | b * 255;
  }

  function mixRGB(c1, c2, f) {
    var g = 1 - f;
    var r1 = c1 >> 16 & 0xff;
    var g1 = c1 >> 8 & 0xff;
    var b1 = c1 & 0xff;
    var r2 = c2 >> 16 & 0xff;
    var g2 = c2 >> 8 & 0xff;
    var b2 = c2 & 0xff;
    return r2 * f + r1 * g << 16 | g2 * f + g1 * g << 8 | b2 * f + b1 * g;
  }

  function stripExtension(filename) {
    return filename.replace(/(.)\.[^.]+$/, '$1');
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
    return (json.length > 3 ? deserializeComment(json) : deserializeStack(json[2])).moveTo(json[0], json[1]);
  }

  function deserializeComment(json) {
    return new Comment(json[6], json[2], json[3], !json[4]);
  }

  function deserializeStack(json) {
    return new Script(json.map(deserializeCommand));
  }

  function deserializeCommand(json) {
    return deserializeBlock(json, 'c');
  }

  function deserializeBlock(json, typeHint) {
    switch (json[0]) {
      case '\\\\':
        json[0] = '%';
        break;
      case 'call':
        return new Block(['c', '%h ' + json[1], 'call', 10], json.slice(1).map(deserializeArg));
      case 'getParam':
        return new Block([json[2] === 'b' ? 'b' : 'r', '%l', 'getParam', 11], [json[1]]);
      case 'procDef':
        return new Block(['h', 'define %l', 'procDef', 10], [json[1]]);
    }
    var info = vis.getBlock(json[0], {
      type: typeHint || 'c',
      argTypes: json.slice(1).map(guessArgType)
    });
    var b = new Block(info, json.slice(1).map(deserializeArg));
    if (b.name === 'stopScripts' && ['other scripts in sprite', 'other scripts in stage'].indexOf(b.args[0].value) !== -1) {
      b.type = 'c';
    }
    return b;
  }

  function guessArgType(json) {
    return Array.isArray(json) && typeof json[0] !== 'string' ? 't' : 's';
  }

  function deserializeArg(json) {
    return Array.isArray(json) ? (typeof json[0] === 'string' ? deserializeBlock(json, 'r') : deserializeStack(json)) : json;
  }

  function chooseFile(filter, multiple, fn) {
    if (typeof filter === 'function') {
      fn = filter;
      filter = null;
      multiple = false;
    }
    if (typeof multiple === 'function') {
      fn = multiple;
      multiple = false;
    }
    var input = document.createElement('input');
    input.type = 'file';
    if (typeof filter === 'string') input.accept = filter;
    if (multiple) input.multiple = true;
    input.onchange = function() {
      fn(multiple ? slice.call(input.files) : input.files[0]);
    };
    input.click();
  }

  function chooseFiles(filter, fn) {
    if (typeof filter === 'function') {
      fn = filter;
      filter = null;
    }
    return chooseFile(filter, true, fn);
  }

  function saveFile(defaultName, mimeType, data, base64) {
    var a = document.createElement('a');
    if (base64) {
      var b64 = atob(data);
      data = new Uint8Array(b64.length);
      for (var i = b64.length; i--;) {
        data[i] = b64.charCodeAt(i);
      }
    }
    var blob = new Blob([data], {type: mimeType})
    a.href = URL.createObjectURL(blob);
    a.download = defaultName;
    a.click();
    setTimeout(function() {
      URL.revokeObjectURL(a.href);
    }, 1500);
  }

  function saveImage(defaultName, canvas) {
    saveFile(defaultName + '.png', 'image/png', canvas.toDataURL().slice('data:image/png;base64,'.length), true);
  }


  function ScratchObj(name) {
    this.name = name;
    this.scripts = [];
    this.costumes = [];
    this.costume = 0;
    this.sounds = [];
    this.variables = [];
    this.lists = [];
    this.info = {};
  }

  ScratchObj.prototype.toJSON = function() {
    var scripts = [];
    var comments = [];
    this.scripts.filter(function(s) {
      (s.isScript ? scripts : comments).push(s);
    })
    return {
      objName: this.name,
      variables: this.variables.length ? this.variables : undefined,
      lists: this.lists.length ? this.lists : undefined,
      scripts: scripts.length ? scripts : undefined,
      scriptComments: comments.length ? comments : undefined, // TODO
      sounds: this.sounds.length ? this.sounds : undefined,
      costumes: this.costumes.length ? this.costumes : undefined,
      currentCostumeIndex: this.costume
    };
  };

  ScratchObj.prototype.fromJSON = function(json) {
    this.name = ''+json.objName;
    this.variables = Array.isArray(json.variables) ? json.variables.map(Variable.deserialize) : [];
    this.lists = Array.isArray(json.lists) ? json.lists.map(function(j) {
      var list = List.deserialize(j);
      list.watcher = new ListWatcher(this, list, Number(j.width) || 100, Number(j.height) || 200);
      list.watcher.moveTo(Number(j.x) || 0, Number(j.y) || 0);
      list.watcher.visible = !!j.visible;
      return list;
    }, this) : [];
    this.scripts = (Array.isArray(json.scriptComments) ? json.scriptComments : []).concat(Array.isArray(json.scripts) ? json.scripts : []).map(deserializeScript);
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

  ScratchObj.prototype.setCostume = function(i) {
    this.costume = i % this.costumes.length || 0;
    if (this.costume < 0) this.costume += this.costumes.length
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

  ScratchObj.prototype.deleteLocal = function(name) {
    var vars = this.variables;
    for (var i = vars.length; i--;) {
      if (vars[i].name === name) {
        vars.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  ScratchObj.prototype.deleteVariable = function(name) {
    return this.deleteLocal(name) || this.stage && this.stage.deleteLocal(name);
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

  ScratchObj.prototype.deleteLocalList = function(name) {
    var lists = this.lists;
    for (var i = lists.length; i--;) {
      if (lists[i].name === name) {
        lists.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  ScratchObj.prototype.deleteList = function(name) {
    return this.deleteLocalList(name) || this.stage && this.stage.deleteLocalList(name);
  };

  ScratchObj.prototype.forEachScript = function(fn, context) {
    var s = this.scripts;
    for (var i = 0, l = s.length; i < l; i++) {
      if (s[i].isScript && s[i].blocks.length) fn.call(context, s[i], this);
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

  def(ScratchObj.prototype, 'localScriptCount', {get: function() {
    return this.scripts.filter(function(s) {
      return s.isBlock && !s.isEmpty && s.blocks[0].isHat;
    }).length;
  }});


  function Costume(name, canvas, cx, cy, pixelRatio, textLayer) {
    this.baseLayerMD5 = null;
    this.loaded = true;
    if (typeof canvas === 'string') { // MD5
      this.baseLayerMD5 = canvas;
      canvas = Server.getImageAsset(canvas);
    }
    if (typeof textLayer === 'string') { // MD5
      this.textLayerMD5 = textLayer;
      textLayer = Server.getImageAsset(textLayer);
    }
    this.name = name;
    this.canvas = canvas;
    if (canvas.tagName === 'IMG') {
      this.textLayer = textLayer;
      this.baseLayer = canvas;
      if (!canvas.width) {
        this.loaded = false;
        canvas.addEventListener('load', this.baseLayerLoaded.bind(this));
      } else if (this.textLayer) {
        this.composite();
      }
    }
    this.cx = cx || 0;
    this.cy = cy || 0;
    this.pixelRatio = pixelRatio || 1;
    this.scale = 1 / this.pixelRatio;
    this.updateSize();
  }

  Costume.prototype.updateSize = function() {
    this.width = this.canvas.width * this.scale;
    this.height = this.canvas.height * this.scale;
  };

  Costume.prototype.toJSON = function() {
    return {
      costumeName: this.name,
      baseLayerID: IO.writeImage(this.canvas),
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
    var canvas = ''+json.baseLayerMD5;
    var textLayer = json.textLayerMD5 && ''+json.textLayerMD5;
    if (typeof json.baseLayerID === 'number' && json.baseLayerID > -1) {
      canvas = IO.images && IO.images[json.baseLayerID] || canvas;
    }
    if (typeof json.textLayerID === 'number' && json.textLayerID > -1) {
      textLayer = IO.images && IO.images[json.textLayerID] || textLayer;
    }
    return new Costume(''+json.costumeName, canvas, cx, cy, pr, textLayer);
  };

  Costume.prototype.copy = function() {
    var c = new Costume(this.name, this.canvas, this.cx, this.cy);
    c.baseLayerMD5 = this.baseLayerMD5;
    return c;
  };

  Costume.prototype.baseLayerLoaded = function() {
    if (this.textLayer) {
      if (this.textLayer.width) {
        this.composite();
      } else {
        this.textLayer.addEventListener('load', this.composite.bind(this));
      }
    } else {
      this.imageLoaded();
    }
  };

  Costume.prototype.composite = function() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.baseLayer.width;
    this.canvas.height = this.baseLayer.height;
    var context = this.canvas.getContext('2d');
    context.drawImage(this.baseLayer, 0, 0);
    if (this.textLayer.width) context.drawImage(this.textLayer, 0, 0);
    this.imageLoaded();
  };

  Costume.prototype.imageLoaded = function() {
    this.loaded = true;
    this.updateSize();
    this.changed();
  };

  Costume.prototype.changed = function(fromEditor) {
    if (this.owner) {
      this.owner.redraw();
      var s = this.owner.stage || this.owner;
      if (s.isStage && s.editor && s.editor.selectedSprite === this.owner) {
        var costumesPanel = s.editor.tabPanel.costumesPanel;
        var icon = costumesPanel.iconFor(this);
        if (icon) icon.updateThumbnail();
        if (!fromEditor && this.owner.costume === this.owner.costumes.indexOf(this)) {
          costumesPanel.imageEditor.updateCanvas();
        }
      }
    }
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
      isPersistent: false, // TODO
      x: this.watcher ? this.watcher.x : undefined,
      y: this.watcher ? this.watcher.y : undefined,
      width: this.watcher ? this.watcher.width : undefined,
      height: this.watcher ? this.watcher.height : undefined,
      visible: this.watcher ? this.watcher.visible : undefined
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
    this.indexInLibrary = 1e6;

    this.isPenDown = false;
    this.penSize = 1;
    this.penHue = 120;
    this.penShade = 50;
    this.penColor = '#0000ff';
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
    json.indexInLibrary = this.indexInLibrary;
    json.visible = this.visible;
    json.spriteInfo = this.info;
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
    this.indexInLibrary = Math.max(-1e6, Math.min(1e6, Number(json.indexInLibrary) || 0));
    this.info = typeof json.spriteInfo === 'object' && !Array.isArray(json.spriteInfo) ? json.spriteInfo : {};
    return this;
  };

  Sprite.prototype.setScale = function(s) {
    var costume = this.costumes[this.costume];
    var w = costume.width;
    var h = costume.height;
    this.scale = Math.max(Math.min(1, Math.max(5 / w, 5 / h)), Math.min(1.5 * 480 / w, 1.5 * 360 / h, s));
  };

  Sprite.prototype.drawOn = function(context) {
    if (!this.visible) return;
    var costume = this.costumes[this.costume];
    if (costume && costume.loaded) {
      context.save();
      context.translate(240 + this.x, 180 - this.y);
      if (this.rotationStyle === 'normal') {
        context.rotate((this.direction - 90) * Math.PI / 180);
      } else if (this.rotationStyle === 'leftRight' && this.direction < 0) {
        context.scale(-1, 1);
      }
      context.scale(this.scale, this.scale);
      context.scale(costume.scale, costume.scale);

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

  var hitTestCanvas = document.createElement('canvas');
  var hitTestContext = hitTestCanvas.getContext('2d');
  Sprite.prototype.opaqueAt = function(x, y) {
    hitTestCanvas.width = hitTestCanvas.height = 1;
    var costume = this.costumes[this.costume];
    if (!costume || !costume.canvas.width) return false;
    hitTestContext.drawImage(costume.canvas, -x - costume.cx, -y - costume.cy);
    return hitTestContext.getImageData(0, 0, 1, 1).data[3] !== 0;
  };

  Sprite.prototype.objectFromPoint = function(x, y) {
    return this.opaqueAt(x, y) ? this : null;
  };

  Sprite.prototype.isTouchingMouse = function() {
    var s = this.stage;
    return s && this.opaqueAt(s.mouseX - this.x, this.y - s.mouseY);
  };

  Sprite.prototype.isTouchingSprite = function(other) {
    hitTestCanvas.width = 480;
    hitTestCanvas.height = 360;
    this.drawOn(hitTestContext);
    hitTestContext.globalCompositeOperation = 'destination-in';
    other.drawOn(hitTestContext);
    var d = hitTestContext.getImageData(0, 0, 480, 360).data;
    for (var i = d.length + 3; (i -= 4) >= 3;) {
      if (d[i]) return true;
    }
    return false;
  };

  Object.defineProperty(Sprite.prototype, 'contextMenu', {get: function() {
    return new Menu(
      'info',
      Menu.line,
      'duplicate',
      ['save to local file', this.saveSpriteFile],
      Menu.line,
      'delete').withContext(this).translate();
  }});

  Sprite.prototype.saveSpriteFile = function() {
    IO.writeArchive(this, function(err, data) {
      if (err) return console.warn(err.stack); // TODO
      saveFile(this.name+'.sprite2', 'application/octet-stream', data);
    }, this);
  };


  function Stage() {
    ScratchObj.call(this, 'Stage');

    this.width = 480;
    this.height = 360;

    this.tempo = 60;
    this.children = [];
    this.sprites = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.keys = {};

    this.title = '';
    this.author = '';
    this.isPublic = true;

    this.el = el('stage');

    this.canvas = el('canvas', 'Visual-absolute');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.el.appendChild(this.canvas);

    this.penCanvas = document.createElement('canvas');
    this.penCanvas.width = this.width;
    this.penCanvas.height = this.height;
    this.penContext = this.penCanvas.getContext('2d');
  }
  inherits(Stage, ScratchObj);

  Stage.prototype.isStage = true;

  Stage.prototype.toJSON = function() {
    var json = ScratchObj.prototype.toJSON.call(this, json);
    json.tempoBPM = this.tempo;
    json.children = this.children;
    this.updateInfo();
    json.info = this.info;
    return json;
  };

  Stage.prototype.updateInfo = function() {
    this.info.scriptCount = this.scriptCount;
    this.info.hasCloudData = false; // TODO
    this.info.spriteCount = this.spriteCount;
    this.info.userAgent = navigator.userAgent;
    // TODO projectID
    this.info.videoOn = false; // TODO
    this.info.appVersion = Editor.prototype.version;
    this.info.title = this.title;
  };

  Stage.deserialize = function(json) {return new Stage().fromJSON(json)};

  Stage.prototype.fromJSON = function(json) {
    ScratchObj.prototype.fromJSON.call(this, json);
    this.tempo = json.tempoBPM == null ? 60 : Math.max(20, Math.min(500, Number(json.tempoBPM) || 0));
    if (Array.isArray(json.children)) {
      json.children.forEach(function(child) {
        if (child.objName) this.add(new Sprite().fromJSON(child));
      }, this);
      this.children.concat(this).forEach(function(child, i) {
        child.lists.forEach(function(list) {
          if (list.watcher) this.add(list.watcher);
        }, this);
      }, this);
    }
    this.info = typeof json.info === 'object' && !Array.isArray(json.info) ? json.info : {};
    if (this.info.title) {
      this.title = ''+this.info.title;
    }
    return this;
  };

  Stage.prototype.add = function(child) {
    if (this.children.indexOf(child) === -1) {
      this.children.push(child);
      child.stage = this;
      if (child.isSprite) this.sprites.push(child);
      if (child.isWatcher) this.el.appendChild(child.el);
    }
    return this;
  };

  Stage.prototype.remove = function(child) {
    if (!child || child.stage !== this) return;
    var i = this.children.indexOf(child);
    if (i !== -1) this.children.splice(i, 1);
    child.stage = null;
    if (child.isSprite) {
      i = this.sprites.indexOf(child);
      if (i !== -1) this.sprites.splice(i, 1);
    }
    if (child.isWatcher) this.el.removeChild(child.el);
    return this;
  };

  Stage.prototype.redraw = function() {
    this.canvas.width = this.canvas.width;
    this.drawOn(this.context);
  };

  Stage.prototype.drawOn = function(context) {
    var costume = this.costumes[this.costume];
    if (costume && costume.loaded) {
      context.save();
      context.scale(costume.scale, costume.scale);
      context.drawImage(costume.canvas, 0, 0);
      context.restore();
    }
    context.drawImage(this.penCanvas, 0, 0);
    var sprites = this.sprites;
    for (var i = 0, length = sprites.length; i < length; i++) {
      sprites[i].drawOn(context);
    }
  };

  Stage.prototype.forEachScript = function(fn, context) {
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      sprites[i].forEachScript(fn, context);
    }
    ScratchObj.prototype.forEachScript.call(this, fn, context);
  };

  Stage.prototype.findNestedLocal = function(name) {
    var local = this.findLocal(name);
    if (local) return local;
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      local = sprites[i].findLocal(name);
      if (local) return local;
    }
    return null;
  };

  Stage.prototype.findNestedLocalList = function(name) {
    var local = this.findLocalList(name);
    if (local) return local;
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      local = sprites[i].findLocalList(name);
      if (local) return local;
    }
    return null;
  };

  Stage.prototype.findObject = function(name) {
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      if (sprites[i].name === name) return sprites[i];
    }
    return this.name === name ? this : null;
  };

  Stage.prototype.findListWatcher = function(name, target) {
    var children = this.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.isListWatcher && c.list.name === name && c.target === target) return c;
    }
    return null;
  };

  Stage.prototype.uniqueName = function(base) {
    var x = /\d+$/.exec(base);
    var i = 2;
    if (x) {
      base = base.slice(0, -x[0].length);
      i = Number(x[0]);
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

  def(Stage.prototype, 'spriteCount', {get: function() {
    return this.sprites.length;
  }});

  def(Stage.prototype, 'scriptCount', {get: function() {
    return this.sprites.reduce(function(sum, sprite) {
      return sum + sprite.localScriptCount;
    }, this.localScriptCount);
  }});

  Object.defineProperty(Stage.prototype, 'contextMenu', {get: function() {
    return new Menu(
      ['save picture of stage', this.savePicture]).withContext(this).translate();
  }});

  Stage.prototype.savePicture = function() {
    saveImage('stage', this.canvas);
  };


  function ListWatcher(target, list, width, height) {
    this.target = target;
    this.list = list;
    list.watcher = this;

    this.cellPool = [];
    this.cellCache = [];
    this.accessTimes = [];
    for (var i = list.contents.length; i--;) {
      this.accessTimes.push(0);
    }
    this.scrollTop = 0;
    this._visible = true;

    this.updateCells = this.updateCells.bind(this);

    this.el = el('list-watcher');
    this.el.appendChild(this.elTitle = el('list-watcher-title'));
    this.el.appendChild(this.elContents = el('list-watcher-contents'));
    this.elContents.appendChild(this.elFiller = el('list-watcher-filler'));
    this.el.appendChild(this.elLength = el('list-watcher-length'));
    this.el.appendChild(this.elAddButton = el('button', 'list-watcher-add-button'));

    this.elAddButton.addEventListener('click', this.addItem.bind(this));
    this.elContents.addEventListener('scroll', this.scroll.bind(this));

    this.elMeasure = el('list-cell-contents list-cell-metrics');
    this.measureNode = document.createTextNode('');
    this.elMeasure.appendChild(this.measureNode);
    vis.util.metricsContainer.appendChild(this.elMeasure);

    this.updateIndexWidth(true);
    this.resizeTo(width || 100, height || 200);

    this.updateFiller();
    this.updateTitle();
    this.updateLength();
  }

  ListWatcher.prototype.isWatcher = true;
  ListWatcher.prototype.isListWatcher = true;

  ListWatcher.measureIndex = vis.util.createMetrics('list-cell-index');

  ListWatcher.prototype.toJSON = function() {
    return this.list.toJSON();
  };

  def(ListWatcher.prototype, 'visible', {
    get: function() {return this._visible},
    set: function(value) {
      if (this._visible !== value) {
        this._visible = value;
        this.el.style.visibility = value ? 'visible' : 'hidden';
      }
    }
  });

  ListWatcher.prototype.objectFromPoint = function(x, y) {
    return x >= -1 && y >= -1 && x < this.width && y < this.height ? this : null;
  };

  def(ListWatcher.prototype, 'contextMenu', {get: function() {
    return new Menu(
      ['import', this.importFromFile, {file: true}],
      ['export', this.exportToFile],
      Menu.line,
      ['hide', this.hide]).withContext(this).translate();
  }});

  ListWatcher.prototype.hide = function() {
    this.visible = false;
  };

  ListWatcher.prototype.importFromFile = function(file) {
    var reader = new FileReader;
    reader.onloadend = function(e) {
      var lines = reader.result.split(/\r\n|[\r\n]/);
      while (lines.length && !lines[lines.length - 1]) lines.pop();
      var delim = this.guessDelimiter(lines);
      if (delim) {
        var count = lines[0].split(delim).length;
        Dialog.prompt(T('Import List'), T('Which column do you want to import? (1-{count} or "all")?', {count: count}), '1', function(column) {
          var n = Math.round(Number(column)) - 1;
          if (n !== n || n < 0 || n >= count) {
            this.setContents(lines);
          } else {
            this.setContents(lines.map(function(l) {
              return l.split(delim)[n];
            }));
          }
        }.bind(this)).show(this.stage.editor);
      } else {
        this.setContents(lines);
      }
    }.bind(this);
    reader.readAsText(file);
  };

  ListWatcher.prototype.exportToFile = function() {
    saveFile(this.list.name+'.txt', 'text/plain', this.list.contents.join('\n') + '\n');
  };

  var DELIMITERS = [',', '\t'];
  ListWatcher.prototype.guessDelimiter = function(lines) {
    var mid = Math.floor(lines.length / 2);
    var end = lines.length - 1;
    for (var i = 0, l = DELIMITERS.length; i < l; i++) {
      var d = DELIMITERS[i];
      var a = lines[0].split(d).length;
      var b = lines[mid].split(d).length;
      var c = lines[end].split(d).length;
      if (a > 1 && a === b && b === c) return d;
    }
    return null;
  };

  ListWatcher.prototype.setContents = function(lines) {
    this.list.contents = lines;
    this.updateLength();
    this.updateFiller();
    this.elContents.scrollTop = this.scrollTop = 0;
    this.updateCells();
  };

  ListWatcher.prototype.measure = function(text) {
    if (hasOwnProperty.call(this.measureCache, text)) {
      return this.measureCache[text];
    }
    this.measureNode.data = text + '\u200C';
    return this.measureCache[text] = this.elMeasure.offsetHeight - 1;
  };

  ListWatcher.prototype.measureAll = function() {
    var heights = [];
    var total = 0;
    var contents = this.list.contents;
    for (var i = 0, l = contents.length; i < l; i++) {
      var h = this.measure(contents[i]);
      heights.push(h);
      total += h;
    }
    this.cellHeights = heights;
    this.contentHeight = total + 1;
  };

  ListWatcher.prototype.updateContentHeight = function() {
    var total = 0;
    var heights = this.cellHeights;
    for (var i = this.list.contents.length; i--;) {
      total += heights[i];
    }
    this.contentHeight = total + 1;
    this.updateFiller();
  };

  ListWatcher.prototype.resizeTo = function(w, h) {
    this.width = w;
    this.height = h;
    this.frameHeight = h - 42;
    this.el.style.width = (w + 2)+'px';
    this.el.style.height = (h + 2)+'px';

    this.updateCellWidth();
  };

  ListWatcher.prototype.updateIndexWidth = function(quiet) {
    var indexLength = (''+this.list.contents.length).length;
    if (this.indexLength !== indexLength) {
      // console.log('update index width'); // debug
      this.indexLength = indexLength;
      var n = Array(indexLength + 1).join('0');
      var w = ListWatcher.measureIndex(n).width + 7;
      this.indexWidth = w;

      var pool = this.cellPool;
      for (var i = pool.length; i--;) {
        var cell = pool[i];
        vis.util.setTransform(cell.elContents, 'translate('+w+'px,0)');
        cell.elIndex.style.width = w+'px';
      }

      if (!quiet) this.updateCellWidth();
    }
  };

  ListWatcher.prototype.updateCellWidth = function() {
    // console.log('update cell width'); // debug
    this.cellWidth = this.width - 7 - this.indexWidth - vis.util.scrollbarWidth;
    this.elMeasure.style.width = this.cellWidth+'px';
    this.measureCache = Object.create(null);

    var pool = this.cellPool;
    for (var i = pool.length; i--;) {
      pool[i].elContents.style.width = this.cellWidth+'px';
    }

    this.measureAll();
    this.updateCells();
  };

  ListWatcher.prototype.addItem = function() {
    this.list.contents.push('');
    this.itemAdded();
  };

  ListWatcher.prototype.moveTo = vis.util.moveTo;

  ListWatcher.prototype.updateTitle = function() {
    // console.log('update title'); // debug
    this.elTitle.textContent = this.target.isStage ? this.list.name : T('{object}: {name}', {object: this.target.name, name: this.list.name});
  };

  ListWatcher.prototype.updateLength = function(quiet) {
    // console.log('update length'); // debug
    this.elLength.textContent = T('length: {count}', {count: this.list.contents.length});
    this.updateIndexWidth(quiet);
  };

  ListWatcher.prototype.updateFiller = function() {
    // console.log('update filler'); // debug
    this.elFiller.style.height = this.contentHeight + 'px';
  };

  ListWatcher.prototype.itemsCleared = function() {
    this.cellHeights = [];
    this.contentHeight = 0;
    this.updateLength();
    this.updateFiller();
    this.updateCells();
  };

  ListWatcher.prototype.itemAdded = function() {
    var contents = this.list.contents;
    var last = contents.length - 1;
    var h = this.measure(contents[last]);
    this.cellHeights.push(h);
    this.contentHeight += h;
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(last);
  };

  ListWatcher.prototype.itemInserted = function(i) {
    var h = this.measure(this.list.contents[i]);
    this.cellHeights.splice(i, 0, h);
    this.contentHeight += h;
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(i);
  };

  ListWatcher.prototype.itemDeleted = function(i) {
    var heights = this.cellHeights;
    this.contentHeight -= heights[i];
    heights.splice(i, 1);
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(i === this.list.contents.length ? i - 1 : i);
  };

  ListWatcher.prototype.itemChanged = function(i) {
    var heights = this.cellHeights;
    var oh = heights[i];
    var h = this.measure(this.list.contents[i]);
    if (h !== oh) {
      this.contentHeight += h - oh;
      heights[i] = h;
      this.updateFiller();
    }
    this.scrollToIndex(i);
  };

  ListWatcher.prototype.itemAccessed = function(i) {
    this.scrollToIndex(i);
  };

  ListWatcher.prototype.scrollToIndex = function(i) {
    var heights = this.cellHeights;
    var y = 0;
    for (var j = 0; j < i; j++) {
      y += heights[j];
    }
    var y2 = y + heights[i] + 1;
    var top = this.scrollTop;
    if (y < top) {
      this.elContents.scrollTop = this.scrollTop = y;
    } else if (y2 > top + this.frameHeight) {
      this.elContents.scrollTop = this.scrollTop = y2 - this.frameHeight;
    }
    this.accessTimes[i] = Date.now();
    this.updateCells();
  };

  ListWatcher.prototype.scroll = function() {
    var top = this.elContents.scrollTop;
    if (this.scrollTop !== top) {
      this.scrollTop = top;
      this.updateCells();
    }
  };

  ListWatcher.prototype.updateCells = function() {
    var now = Date.now();
    this.animating = false;

    var top = this.scrollTop;
    var bottom = top + this.frameHeight;

    var heights = this.cellHeights;
    var accessTimes = this.accessTimes;
    var contents = this.list.contents;
    var length = contents.length;

    var startIndex = 0;
    var startY = 0;
    while (startIndex < length) {
      var h = heights[startIndex];
      if (startY + h >= top) break;
      startY += h;
      startIndex++;
    }
    this.startIndex = startIndex;

    var endIndex = startIndex;
    var y = startY;
    while (endIndex < length && y < bottom) {
      y += heights[endIndex++];
    }
    this.endIndex = endIndex;

    var pool = this.cellPool;
    var usablePool = [];
    for (var i = pool.length; i--;) {
      var c = pool[i];
      if (c.index == null || c.index < startIndex || c.index >= endIndex) {
        usablePool.push(c);
      }
    }
    this.usablePool = usablePool;

    // debug
    // this.reusedCells = 0;
    // this.pooledCells = 0;
    // this.allocatedCells = 0;

    i = startIndex;
    y = startY
    while (i < endIndex) {
      var cell = this.getCell(i, now - accessTimes[i], heights[i], contents[i]);
      cell.moveTo(0, y);
      y += heights[i++];
    }

    // debug
    // console.log('update cells');
    // console.log('update cells reuse: %s pool: %s alloc: %s', this.reusedCells, this.pooledCells, this.allocatedCells);

    while (usablePool.length) {
      var c = usablePool.pop();
      this.cellCache[c.index] = null;
      c.index = null;
      c.visible = false;
      c.el.style.display = 'none';
    }

    if (this.animating) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = requestAnimationFrame(this.updateCells);
    }
  };

  ListWatcher.prototype.getCell = function(i, dt, height, text) {
    var cell = this.cellCache[i];
    if (cell) {
      // this.reusedCells++; // debug
      if (cell.text !== text) {
        cell.text = text;
        cell.elContents.textContent = text+'\u200C';
      }
    } else {
      if (this.usablePool.length) {
        // this.pooledCells++; // debug
        var cell = this.usablePool.pop();
        if (cell.text !== text) {
          cell.text = text;
          cell.elContents.textContent = text+'\u200C';
        }
        if (cell.index != null) {
          this.cellCache[cell.index] = null;
        }
        cell.index = i;
        cell.elIndex.textContent = i + 1;
      } else {
        // this.allocatedCells++; // debug
        cell = new ListCell(i, height, text);
        cell.elContents.style.width = this.cellWidth+'px';
        vis.util.setTransform(cell.elContents, 'translate('+this.indexWidth+'px,0)');
        cell.elIndex.style.width = this.indexWidth+'px';
        this.elContents.appendChild(cell.el);
        this.cellPool.push(cell);
      }
      if (!cell.visible) {
        cell.visible = true;
        cell.el.style.display = 'block';
      }
      this.cellCache[i] = cell;
    }
    if (dt >= 800) {
      dt = 800;
    } else {
      this.animating = true;
    }
    if (dt !== cell.dt) {
      cell.dt = dt;
      var f = (1 - dt / 800) * 100;
      cell.elIndex.style.color = 'rgb('+f+'%,'+f+'%,0%)';
    }
    if (cell.height !== height) {
      cell.height = height;
      cell.elIndex.style.lineHeight = (height + 1)+'px';
    }
    return cell;
  };


  function ListCell(index, height, text) {
    this.el = el('list-cell');
    this.el.appendChild(this.elIndex = el('list-cell-index'));
    this.el.appendChild(this.elContents = el('list-cell-contents'));
    this.dt = 800;
    this.text = text;
    this.elContents.textContent = text+'\u200C';
    this.index = index;
    this.elIndex.textContent = index + 1;
    this.height = height;
    this.elIndex.style.lineHeight = (height + 1)+'px';
    this.visible = true;
  }

  ListCell.prototype.moveTo = vis.util.moveTo;


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

  Interpreter.prototype.installProject = function(stage) {
    this.stopAll();
    this.stage = stage;
  };

  Interpreter.prototype.triggerGreenFlag = function() {
    this.stopAll();
    this.resetTimer();
    return this.trigger('whenGreenFlag');
  };

  Interpreter.prototype.triggerBroadcast = function(event) {
    return this.trigger('whenIReceive', event, true);
  };

  Interpreter.prototype.triggerBackdrop = function(name) {
    return this.trigger('whenSceneStarts', name, true);
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

    function drawPen(sprite, x, y) {
      var cx = interp.stage.penContext;
      cx.strokeStyle = sprite.penColor;
      cx.lineCap = 'round';
      cx.lineWidth = sprite.penSize;
      cx.beginPath();
      cx.moveTo(240 + sprite.x, 180 - sprite.y);
      cx.lineTo(240 + x, 180 - y);
      cx.stroke();
      interp.redraw = true;
    }

    function moveSpriteTo(sprite, x, y) {
      if (sprite.isPenDown) {
        drawPen(sprite, x, y);
      }
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
        return (''+x).toLowerCase().localeCompare((''+y).toLowerCase());
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
        var other = interp.stage.findObject(name);
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
        var other = interp.stage.findObject(name);
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

    table['lookLike:'] = function(b) {
      var name = interp.arg(b, 0);
      var target = interp.activeThread.target;
      if (typeof name !== 'number') {
        name = ''+name;
        for (var i = target.costumes.length; i--;) {
          if (target.costumes[i].name === name) {
            return target.costume = i;
          }
        }
        if (name === 'previous costume') {
          return target.setCostume(target.costume - 1);
        }
        if (name === 'next costume') {
          return target.setCostume(target.costume + 1);
        }
        name = asNumber(name);
        if (name !== name) return;
      }
      target.setCostume(name);
    };

    table['nextCostume'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite && sprite.costumes.length) {
        sprite.costume = (sprite.costume + 1) % sprite.costumes.length;
        if (sprite.visible) interp.redraw = true;
      }
    };

    function startScene(name) {
      var count = interp.stage.costumes.length;
      if (name === 'next backdrop') {
        var i = (interp.stage.costume + 1) % count;
      } else if (name === 'previous backdrop') {
        var i = (interp.stage.costume - 1 + count) % count;
      } else {
        var n = +name;
        if (n === n) {
          i = (n - 1) % count;
          if (i < 0) i += count;
        } else {
          name = ''+name;
          for (var i = count; i--;) {
            if (interp.stage.costumes[i].name === name) break;
          }
        }
      }
      if (i !== -1) interp.stage.costume = i;
      interp.redraw = true;
      return interp.triggerBackdrop(name);
    }

    table['startScene'] = function(b) {
      startScene(interp.arg(b, 0));
    };

    table['startSceneAndWait'] = function(b) {
      if (interp.activeThread.extra === null) {
        interp.activeThread.extra = startScene(interp.arg(b, 0));
      }
      if (interp.activeThread.extra.every(function(t) {return t.done})) {
        interp.activeThread.extra = null;
      } else {
        interp.activeThread.pc--;
        interp.yield = true;
        interp.waiting = true;
      }
    }

    table['nextScene'] = function() {
      interp.stage.costume = (interp.stage.costume + 1) % interp.stage.costumes.length;
      interp.redraw = true;
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

    table['comeToFront'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        var sprites = interp.stage.sprites;
        var i = sprites.indexOf(sprite);
        if (i !== -1) sprites.splice(i, 1);
        sprites.splice(sprites.length, 0, sprite);
        if (sprite.visible) interp.redraw = true;
      }
    };

    table['goBackByLayers:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        var sprites = interp.stage.sprites;
        var i = sprites.indexOf(sprite);
        var delta = interp.narg(b, 0);
        if (i !== -1) sprites.splice(i, 1);
        sprites.splice(Math.max(0, Math.min(sprites.length, i - delta)), 0, sprite);
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

    table['backgroundIndex'] = function() {
      return interp.stage.costume + 1;
    };

    table['scale'] = function() {
      var sprite = interp.activeThread.target;
      return sprite.isSprite ? sprite.scale * 100 : 0;
    };

    // Sounds

    function setTempo(bpm) {
      interp.stage.tempo = Math.max(20, Math.min(500, bpm));
    }

    table['setTempoTo:'] = function(b) {
      setTempo(interp.narg(b, 0));
    };

    table['changeTempoBy:'] = function(b) {
      setTempo(interp.stage.tempo + interp.narg(b, 0));
    };

    table['tempo'] = function() {return interp.stage.tempo};

    // Pen

    table['clearPenTrails'] = function() {
      interp.stage.penContext.clearRect(0, 0, interp.stage.width, interp.stage.height);
      interp.redraw = true;
    };

    table['stampCostume'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.drawOn(interp.stage.penContext);
        interp.redraw = true;
      }
    };

    table['putPenDown'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        sprite.isPenDown = true;
        drawPen(sprite, sprite.x + 0.2, sprite.y + 0.2);
      }
    };

    table['putPenUp'] = function() {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) sprite.isPenDown = false;
    };

    table['penColor:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) {
        var col = interp.narg(b, 0);
        var hsv = rgbToHSV(col);
        sprite.penHue = hsv.h * 200 / 360;
        sprite.penShade = hsv.v * 50;
        sprite.penColor = vis.util.numberToColor(col);
      }
    };

    function updatePenColor(sprite) {
      var rgb = hsvToRGB(sprite.penHue * 360 / 200, 1, 1);
      var s = sprite.penShade;
      if (s > 100) s = 200 - s;
      sprite.penColor = vis.util.numberToColor(s < 50 ? mixRGB(0, rgb, (10 + s) / 60) : mixRGB(rgb, 0xffffff, (s - 50) / 60));
    }

    function setPenHue(sprite, hue) {
      hue = hue % 200;
      if (hue < 0) hue += 200;
      sprite.penHue = hue;
      updatePenColor(sprite);
    }

    function setPenShade(sprite, shade) {
      shade = shade % 200;
      if (shade < 0) shade += 200;
      sprite.penShade = shade;
      updatePenColor(sprite);
    }

    function setPenSize(sprite, size) {
      sprite.penSize = Math.max(1, Math.min(255, Math.round(size)));
    }

    table['changePenHueBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenHue(sprite, sprite.penHue + interp.narg(b, 0));
    };

    table['setPenHueTo:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenHue(sprite, interp.narg(b, 0));
    };

    table['changePenShadeBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenShade(sprite, sprite.penShade + interp.narg(b, 0));
    };

    table['setPenShadeTo:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenShade(sprite, interp.narg(b, 0));
    };

    table['changePenSizeBy:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenSize(sprite, sprite.penSize + interp.narg(b, 0));
    };

    table['penSize:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (sprite.isSprite) setPenSize(sprite, interp.narg(b, 0));
    };

    // Data

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
      if (list.watcher) {
        interp.redraw = true;
        list.watcher.itemAdded();
      }
    };

    table['deleteLine:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var index = interp.arg(b, 0);
      if (index === 'all') {
        list.contents = [];
        if (list.watcher) {
          interp.redraw = true;
          list.watcher.itemsCleared();
        }
        return;
      }
      var i = getListIndex(index, list.contents.length);
      if (i === -1) return;
      list.contents.splice(i, 1);
      if (list.watcher) {
        interp.redraw = true;
        list.watcher.itemDeleted(i);
      }
    };

    table['insert:at:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 2));
      var i = getListIndex(interp.arg(b, 1), list.contents.length + 1);
      if (i === -1) return;
      list.contents.splice(i, 0, interp.arg(b, 0));
      if (list.watcher) {
        interp.redraw = true;
        list.watcher.itemInserted(i);
      }
    };

    table['setLine:ofList:to:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var i = getListIndex(interp.arg(b, 0), list.contents.length);
      if (i === -1) return;
      list.contents[i] = interp.arg(b, 2);
      if (list.watcher) {
        interp.redraw = true;
        list.watcher.itemChanged(i);
      }
    };

    table['getLine:ofList:'] = function(b) {
      var list = interp.activeThread.target.findOrCreateList(interp.arg(b, 1));
      var i = getListIndex(interp.arg(b, 0), list.contents.length);
      if (i === -1) return '';
      if (list.watcher) {
        interp.redraw = true;
        list.watcher.itemAccessed(i);
      }
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

    // Events

    table['whenGreenFlag'] = this.primNoop;
    table['whenKeyPressed'] = this.primNoop;
    table['whenClicked'] = this.primNoop;
    table['whenSceneStarts'] = this.primNoop;
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
        interp.yield = true;
        interp.activeThread.pc--;
      }
    };

    table['doUntil'] = function(b) {
      if (!interp.barg(b, 0)) {
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

    table['touching:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return false;
      var target = interp.arg(b, 0);
      if (target === '_mouse_') return sprite.isTouchingMouse();
      if (target === '_edge_') return false; // TODO
      target = interp.stage.findObject(target);
      return target ? sprite.isTouchingSprite(target) : false;
    };

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

    table['getAttribute:of:'] = function(b) {
      var name = interp.arg(b, 1);
      var target = name === '_stage_' ? interp.stage : interp.stage.findObject(name);
      if (!target) return 0;
      var attribute = interp.arg(b, 0);
      switch (attribute) {
        case 'x position': return target.x;
        case 'y position': return target.y;
        case 'direction': return target.direction;
        case 'costume #':
        case 'backdrop #': return target.costume + 1;
        case 'costume name':
        case 'backdrop name':
          var costume = target.costumes[target.costume];
          return costume ? costume.name : '';
        case 'size': return target.scale * 100;
        case 'volume': return 0; // TODO
      }
      var v = target.findLocal(attribute);
      return v ? v.value : 0;
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
        return x + Math.random() * (y - x + 1) | 0;
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
  };

  Interpreter.prototype.primNoop = function() {};

  var undefinedWarnings = Object.create(null);
  Interpreter.prototype.primUndefined = function(b) {
    if (!undefinedWarnings[b.name]) {
      console.warn('undefined: ' + b.name);
      undefinedWarnings[b.name] = true;
    }
    return 0;
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
    if (location.hash.length > 1) {
      this.stage = this.getEmptyProject();
      var id = location.hash.slice(1).match(/\d+/)+'';
      Server.getProject(id, function(err, data) {
        if (err) {
          Dialog.alert(T('Error'), T('Could not fetch project from scratch.mit.edu.')).show(this);
          return;
        }
        this.installProject(Stage.deserialize(JSON.parse(data)));
        Server.getProjectMetadata(id, function(err, data) {
          if (data) {
            this.stage.title = data.title;
            this.stage.author = data.creator.username;
            this.stage.isPublic = true;
          } else {
            this.stage.title = T('Unshared Project ({id})', {id: id});
            this.stage.author = '';
            this.stage.isPublic = false;
          }
          this.stagePanel.updateTitle();
          this.stagePanel.updateAuthor();
        }.bind(this));
      }.bind(this));
    } else {
      try {
        console.time('load');
        this.stage = Stage.deserialize(JSON.parse(localStorage.getItem('pixie project')));
        console.timeEnd('load');
      } catch (e) {
        console.warn(e.stack);
        this.stage = this.getDefaultProject();
      }
    }

    this.stage.editor = this;
    this.backpack = new LocalBackpack();
    this.isSmallStage = false;

    this.exec = new Interpreter(this.stage, this);

    this.topBar = new TopBar(this);
    this.tabPanel = new TabPanel(this);
    this.stagePanel = new StagePanel(this);
    this.backpackPanel = new BackpackPanel(this);
    this.spritePanel = new SpritePanel(this);
    this.tipsPanel = new TipsPanel(this);

    this.app = new vis.App();
    this.app.editor = this;
    this.app.exec = this.exec;
    this.app.add(this.exec);
    this.app.add(this.topBar);
    this.app.add(this.tabPanel);
    this.app.add(this.stagePanel);
    this.app.add(this.spritePanel);
    this.app.add(this.backpackPanel);
    this.app.add(this.tipsPanel);

    this.el = el('editor Visual-no-select');

    this.el.appendChild(this.elTopButtons = el('project-buttons'));
    this.elTopButtons.appendChild(this.elShareButton = el('button', 'project-button'));
    this.elShareButton.textContent = T('Share');
    this.elTopButtons.appendChild(this.elFlipButton = el('button', 'project-button flip'));
    this.elFlipButton.innerHTML = '<i></i>'+T('See project page');

    this.el.appendChild(this.topBar.el);
    this.el.appendChild(this.tabPanel.el);
    this.el.appendChild(this.stagePanel.el);
    this.el.appendChild(this.spritePanel.el);
    this.el.appendChild(this.backpackPanel.el);
    this.el.appendChild(this.tipsPanel.el);

    this.tabPanel.scriptsPanel.category = 1;

    window.addEventListener('resize', this.app.resize.bind(this.app));
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.hideBubble.bind(this));
    document.addEventListener('wheel', this.hideBubble.bind(this));

    this.save = this.save.bind(this);
    this.resize = this.resize.bind(this);
  }

  Editor.prototype.version = 'js001';

  Editor.prototype.changed = function() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(this.save, 100);
  };

  Editor.prototype.save = function() {
    localStorage.setItem('pixie project', JSON.stringify(this.stage));
  };

  Editor.prototype.newProject = function() {
    this.installProject(this.getDefaultProject());
  };

  Editor.prototype.openProjectFile = function(file) {
    IO.readArchiveFile(file, function(err, stage) {
      if (err) return console.warn(err.stack); // TODO
      if (!stage.isStage) {
        var sprite = stage;
        stage = this.getEmptyProject();
        stage.add(sprite);
      }
      this.installProject(stage);
    }, this);
  };

  Editor.prototype.chooseProjectFile = function() {
    chooseFile('.sb2', this.openProjectFile.bind(this));
  };

  Editor.prototype.saveProjectFile = function() {
    IO.writeArchive(this.stage, function(err, data) {
      if (err) return console.warn(err.stack); // TODO
      saveFile(this.stage.title+'.sb2', 'application/octet-stream', data);
    }, this);
  };

  Editor.prototype.getEmptyProject = function() {
    var stage = new Stage();
    var empty = document.createElement('canvas');
    empty.width = stage.width;
    empty.height = stage.height;
    var context = empty.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, stage.width, stage.height);
    stage.addCostume(new Costume('backdrop1', empty, 240, 180));
    return stage;
  };

  Editor.prototype.getDefaultProject = function() {
    var stage = new Stage()
      .addCostume(new Costume('backdrop1', '739b5e2a2435f6e1ec2993791b423146.png', 240, 180));
    stage.add(new Sprite('Sprite1')
      .addCostume(new Costume('costume1', 'f9a1c175dbe2e5dee472858dd30d16bb.svg', 47, 55))
      .addCostume(new Costume('costume2', 'c68e7b211672862001dd4fce12129813.png', 94, 108, 2)));
    stage.title = T('Untitled');
    return stage;
  };

  Editor.prototype.installProject = function(stage) {
    this.exec.installProject(stage);
    this.spritePanel.installProject(stage);
    this.stagePanel.installProject(stage);
    this.stage = stage;
    stage.editor = this;
  };

  Editor.prototype.stop = function() {
    clearInterval(this.interval);
  };

  Editor.prototype.resize = function() {
    this.app.resize();
  };

  Editor.prototype.setTitle = function(name) {
    this.stage.title = name;
    this.stagePanel.updateTitle();
  };

  Editor.prototype.addSprite = function(sprite) {
    this.stage.add(sprite);
    this.stage.redraw();
    this.spritePanel.select(this.spritePanel.addIcon(sprite));
  };

  Editor.prototype.addVariable = function(name, local, cloud) {
    name = name.trim();
    if (!name) return;
    if (local && this.selectedSprite.isSprite ? this.selectedSprite.findVariable(name) : this.stage.findNestedLocal(name)) {
      Dialog.alert(T('New Variable'), T('A variable with that name already exists.')).show(this); // NS
      return;
    }
    (local ? this.selectedSprite : this.stage).createLocal(name);
    this.refreshPalette();
  };

  Editor.prototype.removeVariable = function(name) {
    Dialog.confirm(T('Delete Variable'), T('Are you sure you want to delete {name}?', {name: name}), function(allow) { // NS
      if (allow && this.selectedSprite.deleteVariable(name)) {
        this.refreshPalette();
      }
    }.bind(this)).show(this);
  };

  Editor.prototype.removeList = function(name) {
    Dialog.confirm(T('Delete List'), T('Are you sure you want to delete {name}?', {name: name}), function(allow) { // NS
      if (allow && this.selectedSprite.deleteList(name)) {
        this.refreshPalette();
      }
    }.bind(this)).show(this);
  };

  Editor.prototype.addList = function(name, local, cloud) {
    name = name.trim();
    if (!name) return;
    if (local && this.selectedSprite.isSprite ? this.selectedSprite.findList(name) : this.stage.findNestedLocalList(name)) {
      Dialog.alert(T('New List'), T('A list with that name already exists.')).show(this); // NS
      return;
    }
    (local ? this.selectedSprite : this.stage).lists.push(new List(name));
    this.toggleWatcher(['contentsOfList:', name]);
    this.refreshPalette();
  };

  Editor.prototype.hasWatcher = function(array) {
    if (array[0] === 'contentsOfList:') {
      return this.hasListWatcher(array[1]);
    }
    return false; // TODO
  };

  Editor.prototype.hasListWatcher = function(name) {
    var watcher = this.findListWatcher(name);
    return !!watcher && watcher.visible;
  };

  Editor.prototype.toggleWatcher = function(array) {
    if (array[0] === 'contentsOfList:') {
      return this.toggleListWatcher(array[1]);
    }
    return false;
  };

  Editor.prototype.toggleListWatcher = function(name) {
    var target = this.selectedSprite;
    var list = target.findLocalList(name);
    if (!list) {
      target = this.stage;
      list = target.findOrCreateLocalList(name);
    }
    var watcher = this.stage.findListWatcher(name, target);
    if (watcher) {
      watcher.visible = !watcher.visible;
      return watcher.visible;
    }
    watcher = new ListWatcher(target, list);
    watcher.moveTo(5, 5);
    this.stage.add(watcher);
    return true;
  };

  Editor.prototype.findListWatcher = function(name) {
    var target = this.selectedSprite;
    var list = target.findLocalList(name);
    if (!list) target = this.stage;
    return this.stage.findListWatcher(name, target);
  };

  Editor.prototype.refreshPalette = function() {
    this.tabPanel.scriptsPanel.refreshPalette();
  };

  Editor.prototype.newVariable = function() {
    this.newDialog(false);
  };

  Editor.prototype.newList = function() {
    this.newDialog(true);
  };

  Editor.prototype.newDialog = function(list) {
    var name = new Dialog.Field(T(list ? 'List name:' : 'Variable name:'));
    var local = new Dialog.Radio(
      [T('For all sprites'), false],
      [T('For this sprite only'), true]);
    var cloud = new Dialog.CheckBox(T(list ? 'Cloud list (stored on server)' : 'Cloud variable (stored on server)'));
    local.setEnabled(1, this.selectedSprite.isSprite); // NS
    cloud.enabled = !list; // NS
    local.onchange = function() {
      cloud.enabled = !list && !local.value;
    };
    cloud.onchange = function() {
      local.setEnabled(1, this.selectedSprite.isSprite && !cloud.value);
    }.bind(this);
    var d = new Dialog(T(list ? 'New List' : 'New Variable'), Dialog.content(
      name.el,
      local.el,
      Dialog.line(),
      cloud.el,
      Dialog.buttons(
        [T('OK'), function() {d.commit()}],
        [T('Cancel'), function() {d.hide()}])));

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
    this.tabPanel.scriptsPanel.palette.scripts.forEach(add.bind(null));
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

  Editor.prototype.toggleSmallStage = function() {
    if (this.isSmallStage = !this.isSmallStage) {
      this.el.classList.add('small-stage');
    } else {
      this.el.classList.remove('small-stage');
    }
    setTimeout(this.resize, 200);
  };

  Editor.prototype.languageMenu = function() {
    return new Menu(
      'English').withContext(this);
  };

  Editor.prototype.fileMenu = function() {
    return new Menu(
      ['New', this.newProject],
      Menu.line,
      ['Save now', this.save],
      'Save as a copy',
      'Go to my stuff',
      Menu.line,
      ['Upload from your computer', this.openProjectFile, {file: '.sb2'}],
      ['Download to your computer', this.saveProjectFile],
      Menu.line,
      'Revert').translate().withContext(this);
  };

  Editor.prototype.editMenu = function() {
    return new Menu(
      'Undelete',
      Menu.line,
      ['Small stage layout', this.toggleSmallStage, {checked: this.isSmallStage}],
      'Turbo mode').translate().withContext(this);
  };


  function ScriptsPanel(editor) {
    this.editor = editor;

    this.el = el('scripts-panel');
    this.el.appendChild(this.elButtons = el('palette-buttons'));
    this.el.appendChild(this.elPalette = el('palette-contents'));
    this.el.appendChild(this.elWorkspace = el('editor-workspace'));
    this.createButtons();

    this.palette = new Palette(this.elPalette);
    this.workspace = new Workspace(this.elWorkspace);

    this.workspace.on('change', this.save, this);
  }

  ScriptsPanel.prototype.save = function() {
    if (this.sprite) this.sprite.scripts = this.workspace.scripts.slice(0);
  };

  ScriptsPanel.prototype.showSprite = function(sprite) {
    this.save();
    this.sprite = null;
    if (sprite) {
      this.workspace.clear();
      this.workspace.addAll(sprite.scripts);
      this.workspace.scrollTo(0, 0);
      this.sprite = sprite;
    }
    this.refreshPalette();
  };

  ScriptsPanel.prototype.createButtons = function() {
    var self = this;
    function buttonClick() {
      self.category = this.value;
    }

    this.buttons = {};
    [1, 5, 2, 6, 3, 7, 4, 8, 9, 10].forEach(function(id) {
      var cat = vis.getCategory(id);

      var b = el('button', 'palette-button');
      b.value = id;
      b.innerHTML = '<div style="color:'+cat[2]+'"><strong>' + T(cat[1]) + '</strong></div>';
      b.addEventListener('click', buttonClick);

      this.buttons[cat[0]] = b;
      this.elButtons.appendChild(b);
    }, this);
  };

  ScriptsPanel.prototype.install = function(parent) {
    parent.add(this.palette);
    parent.add(this.workspace);
  };

  ScriptsPanel.prototype.uninstall = function(parent) {
    parent.remove(this.palette);
    parent.remove(this.workspace);
  };

  def(ScriptsPanel.prototype, 'category', {
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

  ScriptsPanel.prototype.refreshPalette = function(resetScroll) {
    if (!resetScroll) {
      var sx = this.palette.scrollX;
      var sy = this.palette.scrollY;
    }

    var scripts = this.palette.scripts;
    for (var i = scripts.length; i--;) {
      this.editor.exec.stopThread(scripts[i].thread);
    }

    this.palette.clear();
    (palettes[this._category] || []).forEach(this.eval, this);

    if (!resetScroll) {
      this.palette.scrollTo(sx, sy);
    }
  };

  ScriptsPanel.prototype.eval = function(t) {
    if (t.if) {
      ((this.evalCondition(t.if) ? t.then : t.else) || []).forEach(this.eval, this);
      return;
    }
    if (t.action) {
      var editor = this.editor;
      var button = el('button', 'ui-button');
      button.textContent = T(t.text);
      if (editor[t.action]) button.addEventListener('click', editor[t.action].bind(editor));
      return this.palette.add(Palette.element(button, 0, 26));
    }
    if (t.text) {
      var div = el('palette-label');
      div.textContent = T(t.text);
      return this.palette.add(Palette.element(div, 0, 14));
    }
    if (t.watcher) {
      var b = t.watcher;
      if (!Array.isArray(b)) b = [b];
      var checked = this.editor.hasWatcher(b);
      var button = el('button', 'check-box'+(checked ? ' checked' : ''));
      button.addEventListener('click', function() {
        if (checked = this.editor.toggleWatcher(b)) {
          button.classList.add('checked');
        } else {
          button.classList.remove('checked');
        }
      }.bind(this));
      this.palette.add(Palette.inline(button, 13, 12));
      return this.eval(b);
    }
    if (t === '==') {
      return this.palette.add(Palette.element(el('palette-separator'), 0, 2));
    }
    if (t === '--' || t === '---') {
      return this.palette.add(Palette.space(t.length * 10 - 5));
    }
    if (t.all) {
      return (this.evalAll(t.all) || []).forEach(this.eval, this);
    }
    if (!Array.isArray(t)) {
      t = [t];
    }
    var script = new Script().add(new Block(t[0], t.slice(1).map(this.evalArg, this)));
    if (!this.editor.exec.table[t[0]]) script.addEffect(script.outline.bind(script, 2, '#faa'));
    this.palette.add(script);
  };

  ScriptsPanel.prototype.evalArg = function(arg) {
    if (typeof arg !== 'object') return arg;
    if (arg.first) {
      var key = arg.first === 'var' ? 'variables' : arg.first === 'list' ? 'lists' : '';
      if (key) return this.editor.stage[key].concat(this.editor.selectedSprite[key]).map(getName).sort()[0];
      if (arg.first === 'costume' || arg.first === 'backdrop') {
        var costume = (arg.first === 'costume' ? this.editor.selectedSprite : this.editor.stage).costumes[0];
        return costume ? costume.name : '';
      }
      if (arg.first === 'sound') {
        var sound = this.editor.selectedSprite.sounds[0];
        return sound ? sound.name : '';
      }
      if (arg.first === 'attribute') {
        return this.editor.stage.sprites.length ? 'x position' : 'volume';
      }
      if (arg.first === 'sprite') {
        return this.editor.stage.sprites.length ? this.editor.stage.sprites[0].name : '_stage_';
      }
    }
    if (arg.current) {
      switch (arg.current) {
        case 'x': return Math.round(this.editor.selectedSprite.x || 0);
        case 'y': return Math.round(this.editor.selectedSprite.y || 0);
      }
    }
    return '';
  };

  ScriptsPanel.prototype.evalCondition = function(condition) {
    var stage = this.editor.stage;
    var sprite = this.editor.selectedSprite;
    switch (condition) {
      case 'variables': return stage.variables.length || sprite.variables.length;
      case 'lists': return stage.lists.length || sprite.lists.length;
      case 'stage': return sprite.isStage;
      case 'sprite': return sprite.isSprite;
    }
  };

  ScriptsPanel.prototype.evalAll = function(all) {
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


  function CostumesPanel(editor) {
    this.editor = editor;

    this.el = el('costumes-panel');
    this.el.appendChild(this.elNewLabel = el('costume-new-label'));
    this.el.appendChild(this.elNewGroup = el('costume-new-group'));
    this.elLibraryButton = this.addNewButton('new-library', T('Choose costume from library'), this.newFromLibrary);
    this.elPaintButton = this.addNewButton('new-paint', T('Paint new costume'), this.newFromEditor);
    this.elImportButton = this.addNewButton('new-import', T('Upload costume from file'), this.newFromFile, 'image/*');
    this.elCameraButton = this.addNewButton('new-camera', T('New costume from camera'), this.newFromCamera);
    this.el.appendChild(this.elList = el('costume-list'));

    this.imageEditor = new ImageEditor(this);
    this.el.appendChild(this.imageEditor.el);
  }

  CostumesPanel.prototype.addNewButton = function(name, title, fn, file, multiple) {
    var button = el(file ? 'div' : 'button', 'new-button '+name);
    button.title = title;
    if (file) {
      var form = el('form', 'new-button-form');
      var input = el('input', 'new-button-input');
      input.type = 'file';
      if (typeof file === 'string') input.accept = file;
      if (multiple) input.multiple = true;
      form.appendChild(input);
      button.appendChild(form);
      var self = this;
      if (fn) input.addEventListener('change', function() {
        fn.call(self, multiple ? slice.call(input.files) : input.files[0]);
        form.reset();
      });
    } else {
      if (fn) button.addEventListener('click', fn.bind(this));
    }
    this.elNewGroup.appendChild(button);
    return button;
  };

  CostumesPanel.prototype.showSprite = function(sprite) {
    this.sprite = sprite;
    this.elNewLabel.textContent = sprite.isSprite ? T('New costume:') : T('New backdrop:');
    this.elLibraryButton.classList.toggle('new-backdrop-library', sprite.isStage);
    this.elLibraryButton.title = sprite.isSprite ? T('Choose costume from library') : T('Choose backdrop from library');
    this.elPaintButton.title = sprite.isSprite ? T('Paint new costume') : T('Paint new backdrop');
    this.elImportButton.title = sprite.isSprite ? T('Upload costume from file') : T('Upload backdrop from file');
    this.elCameraButton.title = sprite.isSprite ? T('New costume from camera') : T('New backdrop from camera');
    this.updateList();
  };

  CostumesPanel.prototype.updateList = function() {
    while (this.elList.firstChild) this.elList.removeChild(this.elList.lastChild);
    this.icons = this.sprite.costumes.map(function(c) {
      var icon = new CostumeIcon(this, c);
      this.elList.appendChild(icon.el);
      return icon;
    }, this);
  };

  CostumesPanel.prototype.iconFor = function(costume) {
    var i = this.icons.length;
    while (i--) {
      if (this.icons[i].costume === costume) {
        return this.icons[i];
      }
    }
    return null;
  };

  CostumesPanel.prototype.select = function(icon) {
    if (this.selectedIcon) {
      this.selectedIcon.deselect();
    }
    if (this.selectedIcon = icon) {
      icon.select();
      this.imageEditor.costume = icon.costume;
    }
  };

  CostumesPanel.prototype.newFromEditor = function(file) {
    var empty = document.createElement('canvas');
    if (this.sprite.isStage) {
      empty.width = 960;
      empty.height = 720;
      var cx = empty.getContext('2d');
      cx.fillStyle = '#fff';
      cx.fillRect(0, 0, empty.width, empty.height);
    } else {
      empty.width = 2;
      empty.height = 2;
    }
    this.addCostume(new Costume('costume1', empty, 0, 0, 2));
  };

  CostumesPanel.prototype.newFromFile = function(file) {
    IO.readImageFile(file, function(err, image) {
      if (err) return;
      this.addCostume(new Costume(stripExtension(file.name), image, image.width / 2 | 0, image.height / 2 | 0));
    }, this);
  };

  CostumesPanel.prototype.addCostume = function(c) {
      this.sprite.addCostume(c);
      this.sprite.costume = this.sprite.costumes.indexOf(c);
      this.sprite.redraw();
      var icon = new CostumeIcon(this, c);
      this.elList.appendChild(icon.el);
      this.icons.push(icon);
  };

  CostumesPanel.prototype.install = function(parent) {
    parent.add(this.imageEditor);
  };

  CostumesPanel.prototype.uninstall = function(parent) {
    parent.remove(this.imageEditor);
  };

  function CostumeIcon(costumesPanel, costume) {
    this.costumesPanel = costumesPanel;
    this.sprite = costumesPanel.editor.selectedSprite;
    this.costume = costume;

    this.el = el('costume-icon');
    this.el.appendChild(this.elThumbnail = el('canvas', 'costume-thumbnail'));
    this.elThumbnail.width = 68;
    this.elThumbnail.height = 51;
    this.context = this.elThumbnail.getContext('2d');
    this.el.appendChild(this.elNumber = el('costume-number'));
    this.el.appendChild(this.elName = el('costume-name'));
    this.el.appendChild(this.elInfo = el('costume-info'));

    this.el.addEventListener('click', this.click.bind(this));

    this.updateIndex();
    this.updateName();
    this.updateThumbnail();

    if (costume === this.sprite.costumes[this.sprite.costume]) {
      costumesPanel.select(this);
    }
  }

  CostumeIcon.prototype.select = function() {
    this.el.classList.add('selected');
  };

  CostumeIcon.prototype.deselect = function() {
    this.el.classList.remove('selected');
  };

  CostumeIcon.prototype.click = function() {
    this.costumesPanel.select(this);
    this.sprite.costume = this.index;
    this.sprite.redraw();
  };

  CostumeIcon.prototype.updateIndex = function() {
    this.index = this.sprite.costumes.indexOf(this.costume);
    this.elNumber.textContent = this.index + 1;
  };

  CostumeIcon.prototype.updateName = function() {
    this.elName.textContent = this.costume.name;
  };

  CostumeIcon.prototype.updateInfo = function() {
    var s = this.costume.scale;
    this.elInfo.textContent = (this.costume.canvas.width * s | 0) + '\xd7' + (this.costume.canvas.height * s | 0);
  };

  CostumeIcon.prototype.updateThumbnail = function() {
    this.updateInfo();
    var tw = this.elThumbnail.width;
    var th = this.elThumbnail.height;
    var iw = this.costume.canvas.width;
    var ih = this.costume.canvas.height;
    this.context.clearRect(0, 0, tw, th);
    if (!iw || !ih) return;
    var s = Math.min(1, tw / iw, th / ih);
    var sw = s * iw;
    var sh = s * ih;
    this.context.drawImage(this.costume.canvas, (tw - sw) / 2, (th - sh) / 2, sw, sh);
  };


  function ImageEditor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.el = el('image-editor');

    this.el.appendChild(this.elCanvas = el('image-editor-canvas'));
    this.el.appendChild(this.elSettings = el('image-editor-settings'));
    this.el.appendChild(this.elBitmapTools = el('bitmap-tools'));

    this.elCanvas.appendChild(this.elCanvasGrid = el('image-editor-canvas-layer'));
    this.gridCanvas = document.createElement('canvas');
    this.gridContext = this.gridCanvas.getContext('2d');

    this.elCanvas.appendChild(this.elBitmap = el('canvas', 'image-editor-canvas-layer'));
    this.bitmapContext = this.elBitmap.getContext('2d');

    this.elCanvas.appendChild(this.elCursor = el('canvas', 'image-editor-canvas-layer'));
    this.cursorContext = this.elCursor.getContext('2d');
    this.brushCanvas = document.createElement('canvas');
    this.brushCanvas.width = 480 * 2;
    this.brushCanvas.height = 360 * 2;
    this.brushContext = this.brushCanvas.getContext('2d');

    this.elCanvas.appendChild(this.elCanvasScroll = el('image-editor-canvas-scroll'));
    this.elCanvasScroll.appendChild(this.elCanvasFill = el('image-editor-canvas-fill'));
    this.elCanvasScroll.addEventListener('scroll', this.updateScroll.bind(this));
    this.elCanvasScroll.addEventListener('mousedown', this.mouseDown.bind(this));

    this.toolButtons = {};
    this.addBitmapTool('brush', T('Brush'));
    this.addBitmapTool('line', T('Line'));
    this.addBitmapTool('rectangle', T('Rectangle (Shift: Square)'));
    this.addBitmapTool('ellipse', T('Ellipse (Shift: Circle)'));
    this.addBitmapTool('text', T('Text'));
    this.addBitmapTool('fill', T('Fill with color'));
    this.addBitmapTool('erase', T('Erase'));
    this.addBitmapTool('select', T('Select'));
    this.addBitmapTool('duplicate', T('Select and duplicate'));

    this.elSettings.appendChild(this.elZoom = el('image-editor-zoom'));
    this.elZoom.appendChild(this.elZoomOut = el('button', 'zoom-button zoom-out'));
    this.elZoom.appendChild(this.elZoomDefault = el('button', 'zoom-button zoom-default'));
    this.elZoom.appendChild(this.elZoomIn = el('button', 'zoom-button zoom-in'));
    this.elZoomOut.addEventListener('click', this.zoomOut.bind(this));
    this.elZoomDefault.addEventListener('click', this.zoomDefault.bind(this));
    this.elZoomIn.addEventListener('click', this.zoomIn.bind(this));

    this.elSettings.appendChild(this.elZoomLabel = el('image-editor-zoom-label'));

    this.elSettings.appendChild(this.elColorPicker = el('color-picker'));
    this.elColorPicker.appendChild(this.elSwatchButton = el('button', 'color-picker-swatch-button wheel'));
    this.elColorPicker.appendChild(this.elColors = el('color-picker-colors'));
    this.elColors.appendChild(this.elBackground = el('color-picker-color background'));
    this.elColors.appendChild(this.elForeground = el('color-picker-color foreground'));
    this.elColorPicker.appendChild(this.elEyedropperButton = el('button', 'color-picker-eyedropper'));
    this.elEyedropperButton.title = T('Pick up color');
    this.toolButtons.eyedropper = this.elEyedropperButton;
    this.elEyedropperButton.addEventListener('mousedown', this.setTool.bind(this, 'eyedropper'));
    this.elColorPicker.appendChild(this.elPalette = el('color-picker-palette'));
    this.elPalette.addEventListener('mousedown', this.swatchClick.bind(this));
    this.elColors.addEventListener('mousedown', this.swapColors.bind(this));
    this.createPalette();

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this._brushSize = 1.5;
    this.foreground = '#000';
    this.background = '#fff';
    this.tool = 'brush';
    this.zoom = 1;
  }

  ImageEditor.prototype.createPalette = function() {
    [0, 40, 50, 70, 80, 90, 100].forEach(function(l) {
      this.addPaletteColor('hsl(0, 0%, '+l+'%)');
    }, this);
    this.addPaletteColor('transparent');
    var hues = [0, 35, 60, 140, 180, 225, 270, 315];
    [90, 80, 50, 40, 30, 20].forEach(function(l) {
      hues.forEach(function(h) {
        this.addPaletteColor('hsl('+h+', 100%, '+l+'%)');
      }, this);
    }, this);
  };

  ImageEditor.prototype.addBitmapTool = function(name, title) {
    var b = el('button', 'bitmap-tool bitmap-tool-'+name);
    b.addEventListener('mousedown', this.setTool.bind(this, name));
    b.title = title;
    this.elBitmapTools.appendChild(b);
    this.toolButtons[name] = b;
    return b;
  };

  ImageEditor.prototype.setTool = function(name) {
    this.tool = name;
  };

  def(ImageEditor.prototype, 'tool', {
    get: function() {return this._tool},
    set: function(value) {
      this._tool = value;
      this._toolHandler = this.tools[value];
      this.toolData = {};
      this.elCanvasScroll.style.cursor = this._toolHandler && this._toolHandler.cursor || 'default';
      if (this._selectedTool) {
        this._selectedTool.classList.remove('selected');
      }
      if (this._selectedTool = this.toolButtons[value]) {
        this._selectedTool.classList.add('selected');
      }
    }
  });

  ImageEditor.prototype.addPaletteColor = function(color) {
    var b = el('color-picker-palette-color');
    b.style.backgroundColor = color;
    if (color === 'transparent') {
      b.style.backgroundImage = 'linear-gradient(-45deg, transparent 7.5px, #f00 7.5px, #f00 9.5px, transparent 9.5px)';
    }
    this.elPalette.appendChild(b);
  };

  ImageEditor.prototype.resize = function() {
    var vw = this.viewportWidth = this.elCanvas.offsetWidth;
    var vh = this.viewportHeight = this.elCanvas.offsetHeight;
    var zoom = this._zoom;
    var size = 4 * zoom;
    this.gridCanvas.width = size * 2;
    this.gridCanvas.height = size * 2;
    var cx = this.gridContext;
    cx.fillStyle = '#fff';
    cx.fillRect(0, 0, size, size);
    cx.fillRect(size, size, size, size);
    cx.fillStyle = '#e8e8e8';
    cx.fillRect(size, 0, size, size);
    cx.fillRect(0, size, size, size);
    this.elCanvasGrid.style.backgroundImage = 'url('+JSON.stringify(this.gridCanvas.toDataURL())+')';
    this.viewportOffsetX = Math.max(0, (vw - zoom * 480) / 2 | 0);
    this.viewportOffsetY = Math.max(0, (vh - zoom * 360) / 2 | 0);
    this.elCanvasGrid.style.left =
    this.elCanvasFill.style.left = this.viewportOffsetX+'px';
    this.elCanvasGrid.style.top =
    this.elCanvasFill.style.top = this.viewportOffsetY+'px';
    this.elBitmap.width =
    this.elCursor.width = vw;
    this.elBitmap.height =
    this.elCursor.height = vh;
    this.elCanvasGrid.style.width =
    this.elCanvasFill.style.width = zoom * 480+'px';
    this.elCanvasGrid.style.height =
    this.elCanvasFill.style.height = zoom * 360+'px';
    this.updateScroll();
  };

  ImageEditor.prototype.updateScroll = function() {
    this.scrollX = this.elCanvasScroll.scrollLeft;
    this.scrollY = this.elCanvasScroll.scrollTop;
    vis.util.setTransform(this.elCanvasGrid, 'translate('+(-this.scrollX)+'px, '+(-this.scrollY)+'px)');
    this.updateBitmap();
    this.updateCursor();
  };

  ImageEditor.prototype.install = function() {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  ImageEditor.prototype.uninstall = function() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };

  ImageEditor.prototype.mouseDown = function(e) {
    e.preventDefault();
    this.isPressed = true;
    this.toolData.startX =
    this.toolData.lastX =
    this.toolData.x = this.cursorX;
    this.toolData.startY =
    this.toolData.lastY =
    this.toolData.y = this.cursorY;
    this.handleTool('down', this.cursorX, this.cursorY);
    this.mouseMove(e);
  };

  ImageEditor.prototype.mouseMove = function(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.toolData.shiftKey = e.shiftKey;
    this.updateCursor();
  };

  ImageEditor.prototype.mouseUp = function(e) {
    this.mouseMove(e, true);
    if (this.isPressed) {
      this.isPressed = false;
      this.handleTool('up', this.cursorX, this.cursorY);
    }
  };

  ImageEditor.prototype.handleTool = function(name) {
    if (!this._toolHandler) return;
    var handler = this._toolHandler[name];
    if (handler) handler.apply(this, [].slice.call(arguments, 1));
  };

  ImageEditor.prototype.toolMove = function(x, y) {
    this.toolData.lastX = this.toolData.x;
    this.toolData.lastY = this.toolData.y;
    this.toolData.x = this.cursorX;
    this.toolData.y = this.cursorY;
    this.handleTool('move', x, y);
    if (this.isPressed) {
      this.handleTool('drag', x, y);
    }
  };

  ImageEditor.prototype.fixPoint = function(x, y) {
    if (!this.toolData.shiftKey) return {x: x, y: y};
    var dx = Math.abs(x - this.toolData.startX);
    var dy = Math.abs(y - this.toolData.startY);
    if (dx > dy) return {x: x, y: this.toolData.startY};
    return {x: this.toolData.startX, y: y};
  };

  ImageEditor.prototype.fixAspect = function(x, y) {
    if (!this.toolData.shiftKey) return {x: x, y: y};
    var dx = x - this.toolData.startX;
    var dy = y - this.toolData.startY;
    var sx = dx < 0 ? -1 : 1;
    var sy = dy < 0 ? -1 : 1;
    var d = Math.max(Math.abs(dx), Math.abs(dy));
    return {x: this.toolData.startX + sx * d, y: this.toolData.startY + sy * d};
  };

  var colorCanvas = document.createElement('canvas');
  colorCanvas.width = colorCanvas.height = 1;
  var colorContext = colorCanvas.getContext('2d');

  ImageEditor.prototype.tools = {
    brush: {
      cursor: 'none',
      move: function() {this.brushCursor()},
      drag: function(x, y) {
        this.commit('strokeOn', this.toolData.lastX, this.toolData.lastY, x, y);
        this.updateBitmap();
      }
    },
    line: {
      drag: function(x, y) {
        this.clearCursor();
        var point = this.fixPoint(x, y);
        this.strokeOn(this.cursorContext, this.toolData.startX, this.toolData.startY, point.x, point.y);
      },
      up: function(x, y) {
        this.clearCursor();
        var point = this.fixPoint(x, y);
        this.commit('strokeOn', this.toolData.startX, this.toolData.startY, point.x, point.y);
        this.updateBitmap();
      }
    },
    rectangle: {
      drag: function(x, y) {
        this.clearCursor();
        this.rectOn(this.cursorContext, this.toolData.startX, this.toolData.startY, x, y);
      },
      up: function(x, y) {
        this.clearCursor();
        this.commit('rectOn', this.toolData.startX, this.toolData.startY, x, y);
        this.updateBitmap();
      }
    },
    ellipse: {
      drag: function(x, y) {
        this.clearCursor();
        this.ellipseOn(this.cursorContext, this.toolData.startX, this.toolData.startY, x, y, true);
      },
      up: function(x, y) {
        this.clearCursor();
        this.commit('ellipseOn', this.toolData.startX, this.toolData.startY, x, y);
        this.updateBitmap();
      }
    },
    fill: {
      down: function(x, y) {
        this.toolData.initialImage = this.copyCanvas();
      },
      drag: function(x, y) {
        this.context.save();
        this.context.globalCompositeOperation = 'copy';
        this.context.drawImage(this.toolData.initialImage, 0, 0);
        this.context.restore();
        this.floodFill(x, y);
        this.updateBitmap();
      },
      up: function() {
        this.toolData.initialImage = null;
      }
    },
    erase: {
      cursor: 'none',
      move: function() {this.eraseCursor()},
      drag: function(x, y) {
        this.commit('strokeOn', this.toolData.lastX, this.toolData.lastY, x, y);
        this.updateBitmap();
      }
    },
    eyedropper: {
      cursor: 'crosshair',
      drag: function(x, y) {
        var pr = this._costume.pixelRatio;
        var d = this.context.getImageData(x * pr, y * pr, 1, 1).data;
        if (!d[3]) return;
        this.foreground = 'rgb('+d[0]+','+d[1]+','+d[2]+')';
      }
    },
    select: {
      down: function(x, y) {
        if (this.toolData.selection) {
          var sw = this.toolData.selectionWidth;
          var sh = this.toolData.selectionHeight;
          var point = this.selectionPoint(x, y);
          var dx = point.x;
          var dy = point.y;
          this.toolData.handle = null;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              if ((i || j) && Math.abs(dx - sw/2 * i) <= HANDLE_RADIUS && Math.abs(dy - sh/2 * j) <= HANDLE_RADIUS) {
                this.toolData.handle = [i, j];
                this.toolData.initialX = dx;
                this.toolData.initialY = dy;
                this.toolData.baseX = this.toolData.selectionX;
                this.toolData.baseY = this.toolData.selectionY;
                this.toolData.baseWidth = this.toolData.selectionWidth;
                this.toolData.baseHeight = this.toolData.selectionHeight;
                return;
              }
            }
          }
          if (Math.abs(dx) <= HANDLE_RADIUS && Math.abs(dy + sh/2 + ROTATION_HANDLE_OFFSET) <= HANDLE_RADIUS) {
            this.toolData.handle = 'rotation';
            this.toolData.startRotation = this.toolData.selectionRotation;
            this.toolData.mouseRotation = this.toolData.selectionRotation + Math.atan2(dy, dx);
            return;
          }
          if (dx < -sw/2 || dx >= sw/2 || dy < -sh/2 || dy >= sh/2) {
            this.dropSelection();
            this.updateBitmap();
          }
        }
      },
      drag: function(x, y) {
        var d = this.toolData;
        if (d.handle === 'rotation') {
          var dx = x - d.selectionX;
          var dy = y - d.selectionY;
          d.selectionRotation = d.startRotation + (Math.atan2(dy, dx) - d.mouseRotation);
          if (d.shiftKey) {
            d.selectionRotation = Math.round(d.selectionRotation / (Math.PI * .25)) * Math.PI * .25;
          }
          this.showSelection();
        } else if (d.handle) {
          var point = this.selectionPoint(x, y, d.baseX, d.baseY);
          var dx = (d.handle[0] ? 1 : 0) * (point.x - d.initialX) / 2;
          var dy = (d.handle[1] ? 1 : 0) * (point.y - d.initialY) / 2;
          var sin = Math.sin(d.selectionRotation);
          var cos = Math.cos(d.selectionRotation);
          d.selectionX = d.baseX + cos * dx - sin * dy;
          d.selectionY = d.baseY + sin * dx + cos * dy;
          d.selectionWidth = d.baseWidth + d.handle[0] * (point.x - d.initialX);
          d.selectionHeight = d.baseHeight + d.handle[1] * (point.y - d.initialY);
          this.showSelection();
        } else if (d.selection) {
          d.selectionX += x - d.lastX;
          d.selectionY += y - d.lastY;
          this.showSelection();
        } else {
          this.clearCursor();
          var cx = this.cursorContext;
          var sx = d.startX;
          var sy = d.startY;
          var p = this.fixAspect(x, y); // NS
          cx.beginPath();
          cx.moveTo(sx + .5, sy + .5);
          cx.lineTo(sx + .5, p.y + .5);
          cx.lineTo(p.x + .5, p.y + .5);
          cx.lineTo(p.x + .5, sy + .5);
          cx.closePath();
          cx.stroke();
        }
      },
      up: function(x, y) {
        var d = this.toolData;
        if (!this.toolData.selection) {
          var point = this.fixAspect(x, y); // NS
          var x1 = Math.min(d.startX, point.x);
          var y1 = Math.min(d.startY, point.y);
          var x2 = Math.max(d.startX, point.x);
          var y2 = Math.max(d.startY, point.y);
          var w = x2 - x1;
          var h = y2 - y1;
          if (!w || !h) {
            this.clearCursor();
            return;
          }
          var pr = this._costume.pixelRatio;
          d.selection = document.createElement('canvas');
          d.selection.width = w * pr;
          d.selection.height = h * pr;
          var cx = d.selection.getContext('2d');
          cx.drawImage(this.canvas, -x1 * pr, -y1 * pr);
          d.selectionWidth = w;
          d.selectionHeight = h;
          d.selectionX = x1 + w/2;
          d.selectionY = y1 + h/2;
          d.selectionRotation = 0;
          this.showSelection();
          this.context.clearRect(x1 * pr, y1 * pr, w * pr, h * pr);
          this.updateBitmap();
        }
      }
    }
  };

  ImageEditor.prototype.selectionPoint = function(x, y, sx, sy) {
    if (sx == null) sx = this.toolData.selectionX;
    if (sy == null) sy = this.toolData.selectionY;
    var dx = x - sx;
    var dy = y - sy;
    var sin = -Math.sin(this.toolData.selectionRotation);
    var cos = Math.cos(this.toolData.selectionRotation);
    return {
      x: cos * dx - sin * dy,
      y: sin * dx + cos * dy
    };
  };

  ImageEditor.prototype.copyCanvas = function() {
    var c = document.createElement('canvas');
    c.width = this.canvas.width;
    c.height = this.canvas.height;
    c.getContext('2d').drawImage(this.canvas, 0, 0);
    return c;
  };

  ImageEditor.prototype.clearCursor = function() {
    this.elCursor.width = this.elCursor.width;
    this.cursorContext.translate(-this.scrollX + this.viewportOffsetX, -this.scrollY + this.viewportOffsetY);
    this.cursorContext.scale(this._zoom, this._zoom);
  };

  ImageEditor.prototype.strokeOn = function(cx, x1, y1, x2, y2) {
    var d = this._costume.scale;
    cx.save();
    cx.imageSmoothingEnabled = false;
    var offset = this.brushCanvas.width / 2;
    cx.translate(-offset, -offset);
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dx2 = dx * dx;
    var dy2 = dy * dy;
    if (dy2 > dx2) {
      var m = d * dx / dy;
      var x = x1;
      if (dy < 0) {
        var t = y1;
        y1 = y2;
        y2 = t;
        x = x2;
      }
      for (var y = y1; y <= y2; y += d) {
        x += m;
        cx.drawImage(this.brushCanvas, (x / d | 0) * d, y);
      }
    } else if (dx2) {
      var m = d * dy / dx;
      var y = y1;
      if (dx < 0) {
        var t = x1;
        x1 = x2;
        x2 = t;
        y = y2;
      }
      for (var x = x1; x <= x2; x += d) {
        y += m;
        cx.drawImage(this.brushCanvas, x, (y / d | 0) * d);
      }
    } else {
      cx.drawImage(this.brushCanvas, x1, y1);
    }
    cx.restore();
  };

  ImageEditor.prototype.commit = function(fn) {
    this.context.save();
    if (this._tool === 'erase' || this._foreground === 'transparent') { // NS
      this.context.globalCompositeOperation = 'destination-out';
    }
    var pr = this._costume.pixelRatio;
    this.context.scale(pr, pr);
    this[fn].apply(this, [this.context].concat([].slice.call(arguments, 1)));
    this.context.restore();
  };

  ImageEditor.prototype.rectOn = function(cx, sx, sy, ex, ey) {
    var point = this.fixAspect(ex, ey);
    var x1 = Math.min(sx, point.x);
    var y1 = Math.min(sy, point.y);
    var x2 = Math.max(sx, point.x);
    var y2 = Math.max(sy, point.y);
    cx.fillStyle = this._cursorColor;
    cx.fillRect(x1, y1, x2 - x1, y2 - y1);
  };

  ImageEditor.prototype.ellipseOn = function(cx, sx, sy, ex, ey, antialias) {
    var point = this.fixAspect(ex, ey);
    var x = (sx + point.x) / 2;
    var y = (sy + point.y) / 2;
    var rx = Math.abs(x - sx);
    var ry = Math.abs(y - sy);
    cx.save();
    cx.translate(x, y);
    cx.scale(rx, ry);
    cx.beginPath();
    cx.arc(0, 0, 1, 0, Math.PI * 2, false);
    cx.fillStyle = this._cursorColor;
    if (antialias) {
      cx.fill();
    } else {
      cx.clip();
      var x1 = Math.min(sx, point.x);
      var y1 = Math.min(sy, point.y);
      var x2 = Math.max(sx, point.x);
      var y2 = Math.max(sy, point.y);
      cx.fillRect(-1, -1, 2, 2);
    }
    cx.restore();
  };

  ImageEditor.prototype.floodFill = function(x, y) {
    function check(i) {
      if (i < 0 || i >= length) return;
      if (data[i] === targetR &&
        data[i + 1] === targetG &&
        data[i + 2] === targetB &&
        data[i + 3] === targetA) {
        data[i] = foregroundR;
        data[i + 1] = foregroundG;
        data[i + 2] = foregroundB;
        data[i + 3] = foregroundA;
        queue.push(i);
      }
    }
    colorContext.fillStyle = this._foreground;
    colorContext.clearRect(0, 0, 1, 1);
    colorContext.fillRect(0, 0, 1, 1);
    var foreground = colorContext.getImageData(0, 0, 1, 1).data;
    var foregroundR = foreground[0];
    var foregroundG = foreground[1];
    var foregroundB = foreground[2];
    var foregroundA = foreground[3];
    var pr = this._costume.pixelRatio;
    var w = 480 * pr;
    var h = 360 * pr;
    var length = w * h * 4;
    var stride = w * 4;
    var id = this.context.getImageData(0, 0, w, 360 * pr);
    var data = id.data;
    var offset = (y * w + x) * pr * 4;
    var queue = [offset];
    var targetR = data[offset];
    var targetG = data[offset + 1];
    var targetB = data[offset + 2];
    var targetA = data[offset + 3];
    if (targetR === foregroundR &&
      targetG === foregroundG &&
      targetB === foregroundB &&
      targetA === foregroundA) return;
    while (queue.length) {
      var q = queue.pop();
      check(q - stride);
      check(q + stride);
      check(q - 4);
      check(q + 4);
    }
    this.context.putImageData(id, 0, 0);
  };

  ImageEditor.prototype.showSelection = function() {
    var d = this.toolData;
    this.clearCursor();
    var cx = this.cursorContext;
    this.drawSelection(cx, true);
  };

  ImageEditor.prototype.dropSelection = function() {
    var d = this.toolData;
    this.context.save();
    var pr = this._costume.pixelRatio;
    this.context.scale(pr, pr);
    this.drawSelection(this.context);
    this.context.restore();
    d.selection = null;
  };

  var HANDLE_RADIUS = 3.5;
  var ROTATION_HANDLE_OFFSET = 20;
  ImageEditor.prototype.drawSelection = function(cx, frame) {
    var d = this.toolData;
    var sw = d.selectionWidth;
    var sh = d.selectionHeight;
    cx.save();
    cx.translate(d.selectionX, d.selectionY);
    cx.rotate(d.selectionRotation);
    cx.imageSmoothingEnabled = false;
    cx.drawImage(d.selection, -sw/2, -sh/2, sw, sh);
    if (frame) {
      cx.beginPath();
      cx.rect(-sw/2, -sh/2, sw, sh);
      cx.moveTo(0, -sh/2);
      cx.lineTo(0, -sh/2 - ROTATION_HANDLE_OFFSET);
      cx.strokeStyle = 'rgba(0, 0, 255, .6)';
      cx.lineWidth = 2;
      cx.stroke();

      cx.fillStyle = 'rgba(255, 255, 255, .5)';
      cx.strokeStyle = '#000';
      cx.lineWidth = 1;
      cx.beginPath();
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          if (x || y) {
            cx.rect(sw/2 * x - HANDLE_RADIUS, sh/2 * y - HANDLE_RADIUS, HANDLE_RADIUS * 2, HANDLE_RADIUS * 2);
          }
        }
      }
      cx.moveTo(HANDLE_RADIUS, -sh/2 - ROTATION_HANDLE_OFFSET);
      cx.arc(0, -sh/2 - ROTATION_HANDLE_OFFSET, HANDLE_RADIUS, 0, Math.PI * 2);
      cx.fill();
      cx.stroke();
    }
    cx.restore();
  };

  ImageEditor.prototype.updateCursor = function(ignore) {
    if (this.mouseX == null) return;
    var bb = this.elCursor.getBoundingClientRect();
    this.cursorX = (this.mouseX - bb.left + this.scrollX - this.viewportOffsetX) / this._zoom | 0;
    this.cursorY = (this.mouseY - bb.top + this.scrollY - this.viewportOffsetY) / this._zoom | 0;
    var size = this._brushSize;
    var bx = this.brushContext;
    this.brushCanvas.width =
    this.brushCanvas.height = Math.ceil(size) * 2;
    bx.save();
    bx.fillStyle = this._tool === 'erase' ? '#000' : this._cursorColor;
    bx.translate(Math.ceil(size), Math.ceil(size));
    if (size < 1) {
      bx.fillRect(0, 0, 1, 1);
    } else {
      bx.beginPath();
      bx.arc(0, 0, size, 0, Math.PI * 2);
      bx.clip();
      bx.fillRect(-size, -size, size * 2, size * 2);
    }
    bx.restore();

    if (!ignore) this.toolMove(this.cursorX, this.cursorY);
  };

  ImageEditor.prototype.brushCursor = function() {
    this.clearCursor();
    var cx = this.cursorContext;
    cx.save();
    cx.imageSmoothingEnabled = false;
    var offset = this.brushCanvas.width / 2;
    cx.translate(this.cursorX - offset, this.cursorY - offset);
    cx.drawImage(this.brushCanvas, 0, 0);
    cx.restore();
  };

  ImageEditor.prototype.eraseCursor = function() {
    this.clearCursor();
    var cx = this.cursorContext;
    cx.lineWidth = .5;
    cx.beginPath();
    cx.arc(this.cursorX, this.cursorY, this._brushSize - .5, 0, Math.PI * 2);
    cx.stroke();
  };

  ImageEditor.prototype.updateBitmap = function() {
    if (!this._costume) return;
    var cx = this.bitmapContext;
    cx.imageSmoothingEnabled = this._zoom <= this._costume.pixelRatio;
    cx.clearRect(0, 0, this.elBitmap.width, this.elBitmap.height);
    cx.save();
    cx.translate(-this.scrollX + this.viewportOffsetX, -this.scrollY + this.viewportOffsetY);
    var s = this._zoom * this._costume.scale;
    cx.scale(s, s);
    cx.drawImage(this.canvas, 0, 0);
    cx.restore();
  };

  ImageEditor.prototype.updateCanvas = function() {
    var c = this._costume.canvas;
    var pr = this._costume.pixelRatio;
    this.canvas.width = 480 * pr;
    this.canvas.height = 360 * pr;
    try {
      this.context.save();
      this.context.translate(240 * pr, 180 * pr);
      this.context.drawImage(c, -this._costume.cx, -this._costume.cy);
      this.context.restore();
    } catch (e) {}
    this.updateBitmap();
  };

  ImageEditor.prototype.scrollTo = function(x, y) {
    this.elCanvasScroll.scrollLeft = x;
    this.elCanvasScroll.scrollTop = y;
    this.updateScroll();
  };

  def(ImageEditor.prototype, 'zoom', {
    get: function() {return this._zoom},
    set: function(value) {
      var vw = Math.min(this.viewportWidth, 480 * this._zoom) / 2;
      var vh = Math.min(this.viewportHeight, 360 * this._zoom) / 2;
      var sx = Math.max(0, Math.min(480 * value - this.viewportWidth, (this.scrollX + vw) * value / this._zoom - vw));
      var sy = Math.max(0, Math.min(360 * value - this.viewportHeight, (this.scrollY + vh) * value / this._zoom - vh));
      this._zoom = value;
      this.elZoomLabel.textContent = (value * 100 | 0)+'%';
      this.resize();
      this.scrollTo(sx, sy);
    }
  });

  ImageEditor.prototype.zoomOut = function() {
    if (this.zoom > 1) this.zoom /= 2;
  };

  ImageEditor.prototype.zoomDefault = function() {
    this.zoom = 1;
  };

  ImageEditor.prototype.zoomIn = function() {
    if (this.zoom < 16) this.zoom *= 2;
  };

  def(ImageEditor.prototype, 'brushSize', {
    get: function() {return this._brushSize},
    set: function(value) {
      this._brushSize = value;
      this.updateCursor(true);
    }
  });

  def(ImageEditor.prototype, 'costume', {
    get: function() {return this._costume},
    set: function(value) {
      this._costume = value;
      this.updateCanvas();
      this.tool = this._tool;
    }
  });

  ImageEditor.prototype.swatchClick = function(e) {
    if (e.target.className === 'color-picker-palette-color') {
      this.foreground = e.target.style.backgroundColor;
    }
  };

  ImageEditor.prototype.swapColors = function() {
    var fg = this.foreground;
    this.foreground = this.background;
    this.background = fg;
  };

  def(ImageEditor.prototype, 'foreground', {
    get: function() {return this._foreground},
    set: function(value) {
      this._foreground = value;
      this._cursorColor = value === 'transparent' ? '#000' : value;
      this.setSwatchColor(this.elForeground, value);
      this.updateCursor(true);
    }
  });

  def(ImageEditor.prototype, 'background', {
    get: function() {return this._background},
    set: function(value) {
      this._background = value;
      this.setSwatchColor(this.elBackground, value);
    }
  });

  ImageEditor.prototype.setSwatchColor = function(el, color) {
    if (color === 'transparent') {
      el.style.backgroundColor = '#fff';
      el.style.backgroundImage = 'linear-gradient(-45deg, transparent 15.5px, #f00 15.5px, #f00 17.5px, transparent 17.5px)';
    } else {
      el.style.backgroundColor = color;
      el.style.backgroundImage = 'none';
    }
  };


  function SoundsPanel() {
    this.el = el('sounds-panel');
  }

  SoundsPanel.prototype.showSprite = function(sprite) {};


  function TabPanel(editor) {
    this.editor = editor;

    this.el = el('tab-panel');
    this.el.appendChild(this.elContent = el('tab-panel-content'));

    this.tabPanels = [
      this.scriptsPanel = new ScriptsPanel(editor),
      this.costumesPanel = new CostumesPanel(editor),
      this.soundsPanel = new SoundsPanel(editor)];
    this.tabs = [];

    var self = this;
    this.tabClick = function() {
      self.panel = self.tabPanels[this.dataset.index];
    };
    this.scriptsTab = this.makeTab(T('Scripts'));
    this.costumesTab = this.makeTab(T('Costumes'));
    this.soundsTab = this.makeTab(T('Sounds'));

    this.panel = this.costumesPanel;
  }

  TabPanel.prototype.makeTab = function(text) {
    var tab = el('button', 'tab');
    tab.textContent = T(text);
    tab.dataset.index = this.tabs.length;
    tab.addEventListener('click', this.tabClick);
    this.tabs.push(tab);
    this.el.appendChild(tab);
    return tab;
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
        if (this.parent) {
          this.parent.add(value);
          this.parent.resize(); // TODO could resize fewer objects
        }
      }
    }
  });

  TabPanel.prototype.install = function(parent) {
    if (this._panel) parent.add(this._panel);
  };

  TabPanel.prototype.uninstall = function(parent) {
    if (this._panel) parent.remove(this._panel);
  };

  TabPanel.prototype.showSprite = function(sprite) {
    this.costumesTab.textContent = sprite.isStage ? T('Backdrops') : T('Costumes');
    this.tabPanels.forEach(function(panel) {
      if (panel) panel.showSprite(sprite);
    });
  };


  function TopBar(editor) {
    this.editor = editor;

    this.el = el('top-bar');
    this.languageButton = this.addButton('Language', this.languageMenu);
    this.languageButton.classList.add('first');
    this.fileButton = this.addButton(T('File'), this.fileMenu, true);
    this.editButton = this.addButton(T('Edit'), this.editMenu, true);
    this.tipsButton = this.addButton(T('Tips'), this.showTips);
    this.aboutButton = this.addButton(T('About'), this.showAbout);
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

  TopBar.prototype.showTips = function() {
    this.editor.tipsPanel.home();
  };

  TopBar.prototype.showAbout = function() {};

  TopBar.prototype.showMenu = function(button, menu) {
    if (!this.parent) return;
    var bb = button.getBoundingClientRect();
    var bb2 = this.el.getBoundingClientRect();
    menu.showAt(Math.floor(bb.left), Math.floor(bb2.bottom), this.parent);
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
    this.elVersion.textContent = editor.version;

    this.elTitleBar.appendChild(this.elTitle = el('input', 'project-name'));
    this.elTitle.addEventListener('input', this.titleChanged.bind(this));
    this.updateTitle();

    this.elTitleBar.appendChild(this.elAuthor = el('project-author'));
    this.updateAuthor();

    this.stage.redraw();
    this.el.appendChild(this.elStage = this.stage.el);

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
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
  }
  inherits(StagePanel, vis.Target);

  StagePanel.prototype.acceptsDropOf = function() {
    return false;
  };

  StagePanel.prototype.objectFromPoint = function(x, y) {
    var bb = this.stage.el.getBoundingClientRect();
    var bb2 = this.el.getBoundingClientRect();
    x -= bb.left - bb2.left;
    y -= bb.top - bb2.top;
    if (!vis.util.containsPoint(this.stage, x, y)) return null;
    var f = this.editor.isSmallStage ? 2 : 1;
    x *= f;
    y *= f;
    var children = this.stage.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.visible) {
        var o = c.isWatcher ? c.objectFromPoint(x - c.x, y - c.y) : c.objectFromPoint(x - (240 + c.x), y - (180 - c.y));
        if (o) return o;
      }
    }
    return this.stage;
  };

  StagePanel.prototype.click = function(e) {
    var bb = this.el.getBoundingClientRect();
    var x = e.clientX - bb.left;
    var y = e.clientY - bb.top;
    var target = this.objectFromPoint(x, y);
    if (target) this.editor.exec.triggerClick(target);
  };

  StagePanel.prototype.installProject = function(stage) {
    stage.mouseX = this.stage.mouseX;
    stage.mouseY = this.stage.mouseY;
    stage.keys = {};
    for (var k in this.stage.keys) {
      if (this.stage.keys[k]) stage.keys[k] = true;
    }

    stage.redraw();
    this.el.replaceChild(stage.el, this.elStage);

    this.elStage = stage.el;
    this.stage = stage;
    this.updateTitle();
    this.updateAuthor();
  };

  StagePanel.prototype.titleChanged = function() {
    this.stage.title = this.elTitle.value;
  };

  StagePanel.prototype.updateTitle = function() {
    this.elTitle.value = this.stage.title;
  };

  StagePanel.prototype.updateAuthor = function() {
    this.elAuthor.textContent = this.stage.author ? T(this.stage.isPublic ? 'by {author}' : 'by {author} (unshared)', {author: this.stage.author}) : '';
  };

  StagePanel.prototype.keyDown = function(e) {
    var name = getKeyName(e.keyCode);
    if (e.metaKey || e.ctrlKey) {
      switch ((e.altKey ? '~' : '') + (e.shiftKey ? '!' : '') + name) {
        case 's':
          this.editor.save();
          break;
        case 'n':
          this.editor.newProject();
          break;
        case 'u':
          this.editor.chooseProjectFile();
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
    }
    if (document.activeElement === document.body) {
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
    this.stageCenterX = Math.round((bb.left + bb.right) / 2);
    this.stageCenterY = Math.round((bb.top + bb.bottom) / 2);
    this.width = Math.round(bb.width);
    this.height = Math.round(bb.height);
  };

  StagePanel.prototype.updateMouse = function(e) {
    var f = this.editor.isSmallStage ? 2 : 1;
    this.stage.mouseX = Math.max(-240, Math.min(240, f * (e.clientX - this.stageCenterX)));
    this.stage.mouseY = Math.max(-180, Math.min(180, f * (this.stageCenterY - e.clientY)));
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
    this.elLabel.textContent = T('Sprites');

    this.elTitleBar.appendChild(this.elNewGroup = el('new-group'));
    this.elNewGroup.textContent = T('New sprite:');
    this.addNewButton('new-library', T('Choose sprite from library'), this.newFromLibrary);
    this.addNewButton('new-paint', T('Paint new sprite'), this.newFromEditor);
    this.addNewButton('new-import', T('Upload sprite from file'), this.newFromFile, 'image/*,.sprite2');
    this.addNewButton('new-camera', T('New sprite from file'), this.newFromCamera);

    this.el.appendChild(this.elStageSection = el('stage-section'));
    this.elStageSection.appendChild(this.stageIcon.el);
    this.elStageSection.appendChild(this.elNewBackdrop = el('new-backdrop'));
    this.elNewBackdrop.textContent = T('New backdrop:');

    this.el.appendChild(this.elSpriteSection = el('sprite-section'));

    this.addIcons(editor.stage);
  }

  SpritePanel.prototype.installProject = function(stage) {
    this.stageIcon.sprite = stage;
    this.removeAllIcons();
    this.addIcons(stage);
  };

  SpritePanel.prototype.addIcons = function(stage) {
    stage.sprites.slice().sort(function(a, b) {
      return a.indexInLibrary - b.indexInLibrary;
    }).forEach(this.addIcon, this);
    this.select(this.icons[0] || this.stageIcon);
  };

  SpritePanel.prototype.emptySprite = function() {
    return new Sprite(this.editor.stage.uniqueName(T('Sprite1')));
  };

  SpritePanel.prototype.newFromLibrary = function() {
    this.editor.addSprite(this.emptySprite()
      .addCostume(new Costume('costume1', 'f9a1c175dbe2e5dee472858dd30d16bb.svg', 47, 55))
      .addCostume(new Costume('costume2', 'c68e7b211672862001dd4fce12129813.png', 94, 108, 2)));
  };

  SpritePanel.prototype.newFromFile = function(file) {
    if (/^image\//.test(file.type)) {
      IO.readImageFile(file, function(image) {
        this.editor.addSprite(this.emptySprite()
          .addCostume(new Costume(stripExtension(file.name), image, image.width / 2, image.height / 2)));
      }, this);
    } else {
      IO.readArchiveFile(file, function(err, object) {
        if (err || !object.isSprite) return console.warn(err, object); // TODO
        this.editor.addSprite(object);
      }, this);
    }
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

  SpritePanel.prototype.removeAllIcons = function() {
    this.icons.forEach(function(icon) {
      this.elSpriteSection.removeChild(icon.el);
      if (this.parent) this.parent.remove(icon);
    }, this);
    this.icons = [];
  };

  SpritePanel.prototype.addNewButton = CostumesPanel.prototype.addNewButton;

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


  function SpriteIcon(panel, sprite) {
    this.panel = panel;
    this.editor = panel.editor;
    this.sprite = sprite;

    this.el = el('sprite-icon');
    this.el.appendChild(this.elThumbnail = el('canvas', 'sprite-thumbnail'));
    this.elTmp = el('canvas', '');
    this.elThumbnail.width = this.elTmp.width = 68 + 4;
    this.elThumbnail.height = this.elTmp.height = 51 + 4;
    this.context = this.elThumbnail.getContext('2d');
    this.tmpContext = this.elTmp.getContext('2d');

    this.el.appendChild(this.elName = el('sprite-icon-label'));
    this.elName.textContent = sprite.name;

    if (sprite.isStage) {
      this.el.className += ' for-stage';
      this.el.appendChild(this.elInfo = el('sprite-icon-info'));
      this.updateInfo();
    } else {
      this.el.appendChild(this.elButton = el('button', 'sprite-icon-button'));
    }

    this.el.addEventListener('click', function() {
      this.panel.select(this);
    }.bind(this));

    this.update();
    setInterval(this.update.bind(this), 200);
  }
  inherits(SpriteIcon, vis.Target);

  def(SpriteIcon.prototype, 'contextMenu', {get: function() {
    return !this.sprite.isStage && new Menu(
      ['duplicate', this.duplicateSprite],
      Menu.line,
      this.sprite.visible ? ['hide', this.hideSprite] : ['show', this.showSprite],
      ['delete', this.deleteSprite],
      Menu.line,
      ['save to local file', this.saveSpriteFile]).withContext(this).translate();
  }});

  SpriteIcon.prototype.saveSpriteFile = function() {
    this.sprite.saveSpriteFile();
  };

  SpriteIcon.prototype.duplicateSprite = function() {
    var sprite = this.sprite.copy();
    sprite.name = this.editor.stage.uniqueName(sprite.name);
    this.editor.addSprite(sprite);
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
      x: Workspace.prototype.paddingX,
      y: Workspace.prototype.paddingY
    };
    this.sprite.scripts.push(script.copy().moveTo(pos.x, pos.y));
    return false;
  };

  SpriteIcon.prototype.update = function() {
    if (this.sprite.isStage) this.updateInfo();
    var costume = this.sprite.costumes[this.sprite.costume];
    if (costume === this.costume) return;
    this.costume = costume.loaded && costume;

    var w = this.elThumbnail.width;
    var h = this.elThumbnail.height;
    this.context.clearRect(0, 0, w, h);
    if (!costume.loaded) return;

    var cw = costume.canvas.width;
    var ch = costume.canvas.height;
    var scale = Math.min(1, (w - 4) / cw, (h - 4) / ch);
    var aw = scale * cw;
    var ah = scale * ch;
    var x = (w - aw)/2;
    var y = (h - ah)/2;

    this.elTmp.width = this.elTmp.width;
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

  SpriteIcon.prototype.updateInfo = function() {
    var len = this.sprite.costumes.length;
    if (this.costumeCount !== len) {
      this.costumeCount = len;
      this.elInfo.textContent = T(len === 1 ? '{count} backdrop' : '{count} backdrops', {count: len});
    }
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


  function TipsPanel(editor) {
    this.editor = editor;
    this.isOpen = false;

    this.el = el('tips-panel');
    this.el.appendChild(this.elTitle = el('tips-title'));
    this.elTitle.appendChild(this.elIcon = el('tips-icon'));
    this.elIcon.textContent = '?';
    this.elTitle.appendChild(this.elClose = el('tips-close-button'));
    this.elClose.textContent = 'x';
    this.elTitle.appendChild(this.elLabel = el('tips-label'));
    this.elLabel.textContent = T('Tips');
    this.elLabel.appendChild(this.elHome = el('tips-home'));
    this.el.appendChild(this.elContent = el('tips-content'));
    this.elContent.appendChild(this.elFrame = el('iframe', 'tips-frame'));

    this.el.addEventListener('click', this.open.bind(this));
    this.elClose.addEventListener('click', this.close.bind(this));
    this.elLabel.addEventListener('click', this.home.bind(this));
  }

  TipsPanel.prototype.home = function() {
    this.show('home');
  };

  TipsPanel.prototype.show = function(tip) {
    this.setContent(tip);
    this.open();
  };

  TipsPanel.prototype.setContent = function(tip) {
    this.tip = tip;
    this.elFrame.src = 'http://scratch.mit.edu' + (tips[tip] ? '/help/studio/tips/' + tips[tip] : tip);
  };

  TipsPanel.prototype.open = function() {
    if (this.tip == null) this.setContent('home');
    if (!this.isOpen) this.toggle();
  };

  TipsPanel.prototype.close = function(e) {
    if (this.isOpen) this.toggle();
    e.stopPropagation();
  };

  TipsPanel.prototype.toggle = function(e) {
    this.isOpen = !this.isOpen;
    this.editor.el.classList.toggle('tips-open');
    setTimeout(this.editor.resize, 200);
  };


  function Dialog(title, content) {
    this.el = el('dialog Visual-no-select');
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
      button = T('OK');
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
      no = T('Cancel');
      yes = T('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = T('Cancel');
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

  Dialog.prompt = function(title, label, value, yes, no, fn, context) {
    if (typeof value === 'function' || value == null) {
      context = yes;
      fn = value;
      no = T('Cancel');
      yes = T('OK');
      value = '';
    }
    if (typeof yes === 'function' || yes == null) {
      context = no;
      fn = yes;
      no = T('Cancel');
      yes = T('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = T('Cancel');
    }

    var field = new Dialog.Field(label, value);
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

  Dialog.Field = function(label, value) {
    this.value = '';
    this.el = el('label', 'dialog-label');
    this.el.textContent = label;
    this.field = el('input', 'dialog-field');
    if (value != null) this.field.value = value;
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
    document.body.appendChild(this.el);
  };

  Dialog.prototype.mouseMove = function(e) {
    this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
  };

  Dialog.prototype.mouseUp = function(e) {
    this.moveTo(this.dragX + e.clientX, this.dragY + e.clientY);
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };


  console.time('init');
  var editor = new Editor();
  document.body.appendChild(editor.el);
  editor.resize();
  window.editor = editor;
  console.timeEnd('init');

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
