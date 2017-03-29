(function() {
  'use strict';

  PIXI.dontSayHello = true;
  var audio;
  var imageSrc;
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
      undefined: ['Undefined', '#d42828'],
      1: ['Motion', '#4a6cd4'],
      2: ['Looks', '#8a55d7'],
      3: ['Sound', '#bb42c3'],
      4: ['Pen', '#0e9a6c'], // Scratch 1.4: #009870
      5: ['Events', '#c88330'],
      6: ['Control', '#e1a91a'],
      7: ['Sensing', '#2ca5e2'],
      8: ['Operators', '#5cb712'],
      9: ['Data', '#ee7d16'], // Scratch 1.4: #f3761d
      10: ['More Blocks', '#632d99'], // #531e99
      11: ['Parameter', '#5947b1'],
      12: ['List', '#cc5b22'], // Scratch 1.4: #d94d11
      20: ['Extension', '#4b4a60'] // #72228c / #672d79
    },
    blocks: {
      // motion
      'forward:': ['c', 'move %n steps', 1, 10],
      'turnRight:': ['c', 'turn @turnRight %n degrees', 1, 15],
      'turnLeft:': ['c', 'turn @turnLeft %n degrees', 1, 15],

      'heading:': ['c', 'point in direction %d.direction', 1, 90],
      'pointTowards:': ['c', 'point towards %m.spriteOrMouse', 1, ''],

      'gotoX:y:': ['c', 'go to x:%n y:%n', 1, 0, 0],
      'gotoSpriteOrMouse:': ['c', 'go to %m.spriteOrMouse', 1, '_mouse_'],
      'glideSecs:toX:y:elapsed:from:': ['c', 'glide %n secs to x:%n y:%n', 1, 1, 0, 0],

      'changeXposBy:': ['c', 'change x by %n', 1, 10],
      'xpos:': ['c', 'set x to %n', 1, 0],
      'changeYposBy:': ['c', 'change y by %n', 1, 10],
      'ypos:': ['c', 'set y to %n', 1, 0],

      'bounceOffEdge': ['c', 'if on edge, bounce', 1],
      /*'doIf xpos = "240"| xpos = "-240" | ypos = "180" ypos = "-180" heading "0" - heading': ['c', 'if on edge, bounce', 1],*/
      'setRotationStyle': ['c', 'set rotation style %m.rotationStyle', 1, 'left-right'],

      'xpos': ['r', 'x position', 1],
      'ypos': ['r', 'y position', 1],
      'heading': ['r', 'direction', 1],

      // looks
      'say:duration:elapsed:from:': ['c', 'say %s for %n secs', 2, 'Hello!', 2],
      'say:': ['c', 'say %s', 2, 'Hello!'],
      'think:duration:elapsed:from:': ['c', 'think %s for %n secs', 2, 'Hmm...', 2],
      'think:': ['c', 'think %s', 2, 'Hmm...'],

      'show': ['c', 'show', 2],
      'hide': ['c', 'hide', 2],

      'lookLike:': ['c', 'switch costume to %m.costume', 2, 'costume1'],
      'nextCostume': ['c', 'next costume', 2],
      'startScene': ['c', 'switch backdrop to %m.backdrop', 2, 'backdrop1'],

      'changeGraphicEffect:by:': ['c', 'change %m.effect effect by %n', 2, 'color', 25],
      'setGraphicEffect:to:': ['c', 'set %m.effect effect to %n', 2, 'color', 0],
      'filterReset': ['c', 'clear graphic effects', 2],

      'changeSizeBy:': ['c', 'change size by %n', 2, 10],
      'setSizeTo:': ['c', 'set size to %n%', 2, 100],

      'comeToFront': ['c', 'go to front', 2],
      'goBackByLayers:': ['c', 'go back %n layers', 2, 1],

      'costumeIndex': ['r', 'costume #', 2],
      'sceneName': ['r', 'backdrop name', 2],
      'scale': ['r', 'size', 2],

      // stage looks
      'startSceneAndWait': ['c', 'switch backdrop to %m.backdrop and wait', 2, 'backdrop1'],
      'nextScene': ['c', 'next backdrop', 2],

      'backgroundIndex': ['r', 'backdrop #', 2],

      // sound
      'playSound:': ['c', 'play sound %m.sound', 3, 'pop'],
      'doPlaySoundAndWait': ['c', 'play sound %m.sound until done', 3, 'pop'],
      'stopAllSounds': ['c', 'stop all sounds', 3],

      'playDrum': ['c', 'play drum %d.drum for %n beats', 3, 1, 0.25],
      'rest:elapsed:from:': ['c', 'rest for %n beats', 3, 0.25],

      'noteOn:duration:elapsed:from:': ['c', 'play note %d.note for %n beats', 3, 60, 0.5],
      'instrument:': ['c', 'set instrument to %d.instrument', 3, 1],

      'changeVolumeBy:': ['c', 'change volume by %n', 3, -10],
      'setVolumeTo:': ['c', 'set volume to %n%', 3, 100],
      'volume': ['r', 'volume', 3],

      'changeTempoBy:': ['c', 'change tempo by %n', 3, 20],
      'setTempoTo:': ['c', 'set tempo to %n bpm', 3, 60],
      'tempo': ['r', 'tempo', 3],

      // pen
      'clearPenTrails': ['c', 'clear', 4],

      'stampCostume': ['c', 'stamp', 4],

      'putPenDown': ['c', 'pen down', 4],
      'putPenUp': ['c', 'pen up', 4],

      'penColor:': ['c', 'set pen color to %c', 4],
      'changePenHueBy:': ['c', 'change pen color by %n', 4, 10],
      'setPenHueTo:': ['c', 'set pen color to %n', 4, 0],

      'changePenShadeBy:': ['c', 'change pen shade by %n', 4, 10],
      'setPenShadeTo:': ['c', 'set pen shade to %n', 4, 50],

      'changePenSizeBy:': ['c', 'change pen size by %n', 4, 1],
      'penSize:': ['c', 'set pen size to %n', 4, 1],

      // triggers
      'whenGreenFlag': ['h', 'when @greenFlag clicked', 5],
      'whenKeyPressed': ['h', 'when %m.key key pressed', 5, 'space'],
      'whenClicked': ['h', 'when this sprite clicked', 5],
      'whenSceneStarts': ['h', 'when backdrop switches to %m.backdrop', 5, 'backdrop1'],

      'whenSensorGreaterThan': ['h', 'when %m.triggerSensor > %n', 5, 'loudness', 10],

      'whenIReceive': ['h', 'when I receive %m.broadcast', 5, 'message1'],
      'broadcast:': ['c', 'broadcast %m.broadcast', 5, 'message1'],
      'doBroadcastAndWait': ['c', 'broadcast %m.broadcast and wait', 5, 'message1'],

      // control - sprite
      'wait:elapsed:from:': ['c', 'wait %n secs', 6, 1],

      'doRepeat': ['c', '@loop repeat %n %t', 6, 10],
      'doForever': ['f', '@loop forever %t', 6],

      'doIf': ['c', 'if %b then %t', 6],
      'doIfElse': ['c', 'if %b then %t else %t', 6],
      'doWaitUntil': ['c', 'wait until %b', 6],
      'doUntil': ['c', '@loop repeat until %b %t', 6],

      'stopScripts': ['f', 'stop %m.stop', 6, 'all'],

      'whenCloned': ['h', 'when I start as a clone', 6],
      'createCloneOf': ['c', 'create clone of %m.spriteOnly', 6, '_myself_'],
      'deleteClone': ['f', 'delete this clone', 6],

      // sensing
      'touching:': ['b', 'touching %m.touching?', 7, ''],
      'touchingColor:': ['b', 'touching color %c?', 7],
      'color:sees:': ['b', 'color %c is touching %c?', 7],
      'distanceTo:': ['r', 'distance to %m.spriteOrMouse', 7, ''],

      'doAsk': ['c', 'ask %s and wait', 7, "What's your name?"],
      'answer': ['r', 'answer', 7],

      'keyPressed:': ['b', 'key %m.key pressed?', 7, 'space'],
      'mousePressed': ['b', 'mouse down?', 7],
      'mouseX': ['r', 'mouse x', 7],
      'mouseY': ['r', 'mouse y', 7],

      'soundLevel': ['r', 'loudness', 7],

      'senseVideoMotion': ['r', 'video %m.videoMotionType on %m.stageOrThis', 7, 'motion', 'this sprite'],
      'setVideoState': ['c', 'turn video %m.videoState', 7, 'on'],
      'setVideoTransparency': ['c', 'set video transparency to %n%', 7, 50],

      'timer': ['r', 'timer', 7],
      'timerReset': ['c', 'reset timer', 7],

      'getAttribute:of:': ['r', '%m.attribute of %m.spriteOrStage', 7, 'x position', 'Sprite1'],

      'timeAndDate': ['r', 'current %m.timeAndDate', 7, 'minute'],
      'timestamp': ['r', 'days since 2000', 7],
      'getUserName': ['r', 'username', 7],

      // operators
      '+': ['r', '%n + %n', 8, '', ''],
      '-': ['r', '%n - %n', 8, '', ''],
      '*': ['r', '%n * %n', 8, '', ''],
      '/': ['r', '%n / %n', 8, '', ''],

      'randomFrom:to:': ['r', 'pick random %n to %n', 8, 1, 10],

      '<': ['b', '%s < %s', 8, '', ''],
      '=': ['b', '%s = %s', 8, '', ''],
      '>': ['b', '%s > %s', 8, '', ''],

      '&': ['b', '%b and %b', 8],
      '|': ['b', '%b or %b', 8],
      'not': ['b', 'not %b', 8],

      'concatenate:with:': ['r', 'join %s %s', 8, 'hello ', 'world'],
      'letter:of:': ['r', 'letter %n of %s', 8, 1, 'world'],
      'stringLength:': ['r', 'length of %s', 8, 'world'],

      '%': ['r', '%n mod %n', 8, '', ''],
      'rounded': ['r', 'round %n', 8, ''],

      'computeFunction:of:': ['r', '%m.mathOp of %n', 8, 'sqrt', 9],

      // variables
      'readVariable': ['r', '%l', 9, 'variable'],
      'setVar:to:': ['c', 'set %m.var to %s', 9, 'variable', 0],
      'changeVar:by:': ['c', 'change %m.var by %n', 9, 'variable', 1],
      'showVariable:': ['c', 'show variable %m.var', 9, 'variable'],
      'hideVariable:': ['c', 'hide variable %m.var', 9, 'variable'],

      // lists
      'contentsOfList:': ['r', '%l', 12, 'list'],
      'append:toList:': ['c', 'add %s to %m.list', 12, 'thing', 'list'],

      'deleteLine:ofList:': ['c', 'delete %d.listDeleteItem of %m.list', 12, '1', 'list'],
      'insert:at:ofList:': ['c', 'insert %s at %d.listItem of %m.list', 12, 'thing', '1', 'list'],
      'setLine:ofList:to:': ['c', 'replace item %d.listItem of %m.list with %s', 12, '1', 'list', 'thing'],

      'getLine:ofList:': ['r', 'item %d.listItem of %m.list', 12, '1', 'list'],
      'lineCountOfList:': ['r', 'length of %m.list', 12, 'list'],
      'list:contains:': ['b', '%m.list contains %s?', 12, 'list', 'thing'],

      'showList:': ['c', 'show list %m.list', 12, 'list'],
      'hideList:': ['c', 'hide list %m.list', 12, 'list'],

      // obsolete blocks from Scratch 1.4 that may be used in older projects
      'drum:duration:elapsed:from:': ['c', 'play drum %n for %n beats', 98, 1, 0.25], // Scratch 1.4 MIDI drum
      'midiInstrument:': ['c', 'set instrument to %n', 98, 1],
      'isLoud': ['b', 'loud?', 98],

      // obsolete blocks from Scratch 1.4 that are converted to new forms (so should never appear):
      'abs': ['r', 'abs %n', 98],
      'sqrt': ['r', 'sqrt %n', 98],
      'doReturn': ['f', 'stop script', 98],
      'stopAll': ['f', 'stop all', 98],
      'showBackground:': ['c', 'switch to background %m.costume', 98, 'backdrop1'],
      'nextBackground': ['c', 'next background', 98],
      'doForeverIf': ['f', 'forever if %b %t', 98],

      // testing and experimental control prims
      'COUNT': ['r', 'counter', 99],
      'CLR_COUNT': ['c', 'clear counter', 99],
      'INCR_COUNT': ['c', 'incr counter', 99],
      'doForLoop': ['c', 'for each %m.varName in %s %t', 99, 'v', 10],
      'doWhile': ['c', 'while %b %t', 99],
      'warpSpeed': ['c', 'all at once %t', 99],

      // stage motion (scrolling)
      'scrollRight': ['c', 'scroll right %n', 99, 10],
      'scrollUp': ['c', 'scroll up %n', 99, 10],
      'scrollAlign': ['c', 'align scene %m.scrollAlign', 99, 'bottom-left'],
      'xScroll': ['r', 'x scroll', 99],
      'yScroll': ['r', 'y scroll', 99],

      // other obsolete blocks from alpha/beta
      'hideAll': ['c', 'hide all sprites', 99],
      'getUserId': ['r', 'user id', 99],
    },
    menus: {
      direction: function() {
        var m = new Menu;
        [[90, 'right'],
         [-90, 'left'],
         [0, 'up'],
         [180, 'down']].forEach(function(item) {
          m.add(['('+item[0]+') '+_(item[1]), item[0]]);
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
        return spriteMenu(arg, false, '_mouse_');
      },
      touching: function(arg) {
        return spriteMenu(arg, false, '_mouse_', '_edge_');
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
    	  //TODO this is taking the sound information from the SoundsPanel rather than the sprite in question
          return new Menu().addLine().addTranslated('miaow').addTranslated('purring').addTranslated('siamese').addTranslated('yowl').addAll(arg.app.editor.tabPanel.soundsPanel.icons.map(getName)).add(Menu.line).add([_('record...'), function() {}]);
      },
      broadcast: function(arg) {
        return new Menu().addAll(arg.app.editor.broadcastNames).add(Menu.line).add([_('new message...'), function() {
            var arg = this;
            Dialog.prompt(_('New Message'), _('Message name:'), function(value) { // NS
              if (value) arg.value = value;
            }).show(arg.app.editor);
          }]);
      },
      triggerSensor: function() {
        return new Menu('loudness', 'timer', 'video motion').translate();
      },
      stop: function(arg) {
        function item(value, type) {
          return [_(value), function() {
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
        return spriteMenu(arg, true, '_myself_');
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
        return spriteMenu(arg, false, '_stage_');
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
        return new Menu().addAll(['Snare Drum', 'Bass Drum', 'Side Stick', 'Crash Cymbal', 'Open Hi-Hat', 'Closed Hi-Hat', 'Tambourine', 'Hand Clap', 'Claves', 'Wood Block', 'Cowbell', 'Triangle', 'Bongo', 'Conga', 'Cabassa', 'Guiro', 'Vibraslap', 'Open Culca'].map(function(x, i) {return ['('+(i + 1)+') ' + _(x), i + 1]}));
      },
      instrument: function() {
        return new Menu().addAll(['Piano', 'Electric Piano', 'Organ', 'Guitar', 'Electric Guitar', 'Bass', 'Pizzicato', 'Cello', 'Trombone', 'Clarinet', 'Saxophone', 'Flute', 'Wooden Flute', 'Bassoon', 'Choir', 'Vibraphone', 'Music Box', 'Steel Drum', 'Marimba', 'Synth Lead', 'Synth Pad'].map(function(x, i) {return ['('+(i + 1)+') ' + _(x), i + 1]}));
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
          [72, 'High C']].map(function(i) {return ['('+i[0]+') '+_(i[1]), i[0]]}));
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
      {if: 'stage', then: [
        {text: 'Stage selected:'},
        {text: 'No motion blocks'}
      ], else: [
        'forward:',
        'turnRight:',
        'turnLeft:',
        '---',
        'heading:',
        'pointTowards:',
        '---',
        ['gotoX:y:', {current: 'x'}, {current: 'y'}],
        'gotoSpriteOrMouse:',
        ['glideSecs:toX:y:elapsed:from:', 1, {current: 'x'}, {current: 'y'}],
        '---',
        'changeXposBy:',
        'xpos:',
        'changeYposBy:',
        'ypos:',
        '---',
        'bounceOffEdge',
        '--',
        'setRotationStyle',
        '---',
        {watcher: 'xpos'},
        {watcher: 'ypos'},
        {watcher: 'heading'}
      ]}
    ],
    2: [
      // looks
      {if: 'sprite', then: [
        'say:duration:elapsed:from:',
        'say:',
        'think:duration:elapsed:from:',
        'think:',
        '--',
        'show',
        'hide',
        '--',
        ['lookLike:', {first: 'costume'}],
        'nextCostume'
      ]},
      ['startScene', {first: 'backdrop'}],
      {if: 'stage', then: [
        ['startSceneAndWait', {first: 'backdrop'}],
        'nextScene'
      ]},
      '--',
      'changeGraphicEffect:by:',
      'setGraphicEffect:to:',
      'filterReset',
      '--',
      {if: 'sprite', then: [
        'changeSizeBy:',
        'setSizeTo:',
        '--',
        'comeToFront',
        'goBackByLayers:',
        '--',
        {watcher: 'costumeIndex'}
      ]},
      {watcher: 'sceneName'},
      {if: 'stage', then: [{watcher: 'backgroundIndex'}], else: [{watcher: 'scale'}]}
    ],
    3: [
      // sound
      ['playSound:', {first: 'sound'}],
      ['doPlaySoundAndWait', {first: 'sound'}],
      'stopAllSounds',
      '--',
      'playDrum',
      'rest:elapsed:from:',
      '--',
      'noteOn:duration:elapsed:from:',
      'instrument:',
      '--',
      'changeVolumeBy:',
      'setVolumeTo:',
      {watcher: 'volume'},
      '--',
      'changeTempoBy:',
      'setTempoTo:',
      {watcher: 'tempo'}
    ],
    4: [
      // pen
      'clearPenTrails',
      {if: 'sprite', then: [
        '--',
        'stampCostume',
        '--',
        'putPenDown',
        'putPenUp',
        '--',
        'penColor:',
        'changePenHueBy:',
        'setPenHueTo:',
        '--',
        'changePenShadeBy:',
        'setPenShadeTo:',
        '--',
        'changePenSizeBy:',
        'penSize:'
      ]}
    ],
    5: [
      // triggers
      'whenGreenFlag',
      'whenKeyPressed',
      'whenClicked',
      ['whenSceneStarts', {first: 'backdrop'}],
      '---',
      'whenSensorGreaterThan',
      '---',
      'whenIReceive',
      'broadcast:',
      'doBroadcastAndWait',
    ],
    6: [
      // control - sprite
      'wait:elapsed:from:',
      '--',
      'doRepeat',
      'doForever',
      '--',
      'doIf',
      'doIfElse',
      'doWaitUntil',
      'doUntil',
      '--',
      'stopScripts',
      '--',
      {if: 'sprite', then: ['whenCloned']},
      'createCloneOf',
      {if: 'sprite', then: ['deleteClone']}
    ],
    7: [
      // sensing
      {if: 'sprite', then: [
        'touching:',
        'touchingColor:',
        'color:sees:',
        'distanceTo:',
        '--',
      ]},
      'doAsk',
      {watcher: 'answer'},
      '--',
      'keyPressed:',
      'mousePressed',
      'mouseX',
      'mouseY',
      '--',
      {watcher: 'soundLevel'},
      '--',
      {watcher: 'senseVideoMotion'},
      'setVideoState',
      'setVideoTransparency',
      '--',
      {watcher: 'timer'},
      'timerReset',
      '--',
      ['getAttribute:of:', {first: 'attribute'}, {first: 'otherSprite'}],
      '--',
      {watcher: 'timeAndDate'},
      'timestamp',
      'getUserName'
    ],
    8: [
      // operators
      '+',
      '-',
      '*',
      '/',
      '--',
      'randomFrom:to:',
      '--',
      '<',
      '=',
      '>',
      '--',
      '&',
      '|',
      'not',
      '--',
      'concatenate:with:',
      'letter:of:',
      'stringLength:',
      '--',
      '%',
      'rounded',
      '--',
      'computeFunction:of:'
    ],
    9: [
      // variables
      {text: 'Make a Variable', action: 'newVariable'},
      {if: 'variables', then: [
        {all: 'variables'},
        '--',
        ['setVar:to:', {first: 'var'}, '0'],
        ['changeVar:by:', {first: 'var'}, 1],
        ['showVariable:', {first: 'var'}],
        ['hideVariable:', {first: 'var'}],
        '--'
      ]},

      // lists
      {text: 'Make a List', action: 'newList'},
      {if: 'lists', then: [
        {all: 'lists'},
        '--',
        ['append:toList:', 'thing', {first: 'list'}],
        '--',
        ['deleteLine:ofList:', 1, {first: 'list'}],
        ['insert:at:ofList:', 'thing', 1, {first: 'list'}],
        ['setLine:ofList:to:', 1, {first: 'list'}, 'thing'],
        '--',
        ['getLine:ofList:', 1, {first: 'list'}],
        ['lineCountOfList:', {first: 'list'}],
        ['list:contains:', {first: 'list'}, 'thing'],
        '--',
        ['showList:', {first: 'list'}],
        ['hideList:', {first: 'list'}]
      ]}
    ],
    10: [
      {text: 'Make a Block', action: 'newBlock'},
      {text: 'Add an Extension', action: 'addExtension'},
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

  function _(key, values) {
    var text = vis.getText(key);
    return values ? vis.util.format(text, values) : text;
  }

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
        this.spec = _(this.infoSpec);
        this.fn = null;
      }.bind(this);
      var gs = this.groups;
      for (var i = gs.length; i--;) {
        var g = gs[i];
        if (g.indexOf(this.name) !== -1) {
          for (var j = 0, l = g.length; j < l; j++) {
            var b = vis.getBlock(g[j]);
            m.add([_(b[1]).replace(/%[\w.]+/g, '').trim(), b[2]]);
          }
        }
      }
    }
    return m;
  }});

  Block.prototype.help = function() {
    // TODO
    Dialog.alert(_('Help'), _('Help is not available yet.')).show(this.app.editor);
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
      context.drawImage(assets, 230, 30, 31, 29, 0, 0, 15.5, 14.5);
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

  function el(tagName, properties, children) {
    if (Array.isArray(properties)) {
      children = properties;
      properties = undefined;
    }
    var e = document.createElement(tagName);
    if (properties) {
      extendr(e, properties);
    }
    if (children) {
      for (var i = 0, l = children.length; i < l; i++) {
        var c = children[i];
        e.appendChild(typeof c === 'object' ? c : document.createTextNode(c));
      }
    }
    return e;
  }

  function cl(tagName, className, properties, children) {
    if (typeof className !== 'string') {
      children = properties;
      properties = className;
      className = tagName;
      tagName = 'div';
    }
    var e = el(tagName, properties, children);
    e.className = className;
    return e;
  }

  function extendr(o, properties) {
    for (var k in properties) if (hasOwnProperty.call(properties, k)) {
      var v = properties[k];
      if (typeof v === 'object') {
        extendr(o[k], v);
      } else {
        o[k] = v;
      }
    }
    return o;
  }

  var Server = {
    getProjectURL: function(id) {
      return 'http://projects.scratch.mit.edu/internalapi/project/' + id + '/get/';
    },
    getProjectMetadataURL: function(id) {
      return 'http://scratch.mit.edu/api/v1/project/' + id + '/';
    },
    getAssetURL: function(md5) {
      return 'http://cdn.assets.scratch.mit.edu/internalapi/asset/' + md5 + '/get/';
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
      img.crossOrigin = 'anonymous';
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
        cb.call(context, null, zip.generate({type: 'arraybuffer'}));
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
  assets.src = 'assets/assets.svg';

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


  function getCategoryColor(id) {
    return vis.getCategory(id)[2];
  }

  function spriteMenu(arg, includeCurrent) {
    var m = new Menu;
    var a = slice.call(arguments, 2);
    for (var i = 0, l = a.length; i < l; i++) {
      m.add(a[i]);
    }
    m.translate().add(Menu.line);
    var editor = arg.app.editor;
    editor.stage.sprites.forEach(function(sprite) {
      if (!includeCurrent && sprite === editor.selectedSprite) return;
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

  function uniqueName(extant, base) {
    var x = /\d+$/.exec(base);
    var i = 2;
    var name = base;
    if (x) {
      base = base.slice(0, -x[0].length);
      i = +x[0];
    }
    search: for (;;) {
      var j = extant.length;
      while (j--) {
        if (extant[j].name === name) {
          name = base + i++;
          continue search;
        }
      }
      return name;
    }
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
    var blob = new Blob([data], {type: mimeType});
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

  function scrollIntoView(el, container) {
    var bb = el.getBoundingClientRect();
    var cbb = container.getBoundingClientRect();
    if (bb.top < cbb.top) {
      container.scrollTop += bb.top - cbb.top;
    } else if (bb.bottom > cbb.bottom) {
      container.scrollTop += bb.bottom - cbb.bottom;
    }
    if (bb.left < cbb.left) {
      container.scrollLeft += bb.left - cbb.left;
    } else if (bb.right > cbb.right) {
      container.scrollLeft += bb.right - cbb.right;
    }
  }


  function EffectsFilter() {
    PIXI.AbstractFilter.call(this);

    this.uniforms = {
      dimensions: {type: '2fv', value:[0,0]},
      alpha: {type: '1f', value: 1},
      hueShift: {type: '1f', value: 0},
      valueShift: {type: '1f', value: 0},
      mosaic: {type: '1f', value: 1},
      pixelSize: {type: '1f', value: 1},
      whirlAngle: {type: '1f', value: 0},
      fisheye: {type: '1f', value: 1}
    };

    this.passes = [this];

    this.fragmentSrc = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform vec2 dimensions;',
    'uniform float alpha;',
    'uniform float hueShift;',
    'uniform float valueShift;',
    'uniform float mosaic;',
    'uniform float pixelSize;',
    'uniform float whirlAngle;',
    'uniform float fisheye;',
    'uniform sampler2D uSampler;',

    'void main(void) {',
    '  vec2 pos = vTextureCoord;',
    '  if (mosaic != 1.) pos = mod(pos * mosaic, 1.);',
    '  if (pixelSize != 1.) pos = (floor(pos * dimensions / pixelSize) + 0.5) / dimensions * pixelSize;',
    '  if (whirlAngle != 0.) {',
    '    float wh = min(dimensions.x, dimensions.y);',
    '    vec2 scale = vec2(wh) / dimensions;',
    '    vec2 offset = scale * dimensions * (pos - vec2(.5));',
    '    float r = 1. - length(offset) / (wh / 2.);',
    '    if (r > 0.) {',
    '      float a = whirlAngle * r * r;',
    '      float s = sin(a); float c = cos(a);',
    '      mat2 m = mat2(c, -s, s, c);',
    '      pos = m * offset / scale / dimensions + vec2(.5);',
    '    }',
    '  }',
    '  if (fisheye != 1.) {',
    '    vec2 offset = 2. * (pos - vec2(.5));',
    '    float l = length(offset);',
    '    float r = pow(l, fisheye);',
    '    if (r < 1.) pos = vec2(.5) + .5 * offset / l * r;',
    '  }',
    '  gl_FragColor = texture2D(uSampler, pos);',
    '  if (hueShift != 0. || valueShift != 0.) {',
    '    float M = max(gl_FragColor.r, max(gl_FragColor.g, gl_FragColor.b));',
    '    float m = min(gl_FragColor.r, min(gl_FragColor.g, gl_FragColor.b));',
    '    float c = M - m;',
    '    float h =',
    '      c == 0. ? 0. :',
    '      M == gl_FragColor.r ?',
    '             (gl_FragColor.g - gl_FragColor.b) / c :',
    '      M == gl_FragColor.r ?',
    '        2. + (gl_FragColor.b - gl_FragColor.r) / c :',
    '        4. + (gl_FragColor.r - gl_FragColor.g) / c ;',
    '    float s = c == 0. ? 0. : c / M;',
    '    M = max(0., min(1., M + valueShift));',
    '    h = mod(h + hueShift, 6.);',
    '    c = M * s;',
    '    float x = c * (1. - abs(mod(h, 2.) - 1.));',
    '    gl_FragColor.rgb = vec3(M - c) + (',
    '      h < 1. ? vec3(c,x,0) :',
    '      h < 2. ? vec3(x,c,0) :',
    '      h < 3. ? vec3(0,c,x) :',
    '      h < 4. ? vec3(0,x,c) :',
    '      h < 5. ? vec3(x,0,c) :',
    '               vec3(c,0,x));',
    '  }',
    '  gl_FragColor *= alpha;',
    '}',
    ];
  }

  EffectsFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
  EffectsFilter.prototype.constructor = EffectsFilter;

  def(EffectsFilter.prototype, 'alpha', {
    get: function() {return this.uniforms.alpha.value},
    set: function(value) {
      this.uniforms.alpha.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'hueShift', {
    get: function() {return this.uniforms.hueShift.value},
    set: function(value) {
      this.uniforms.hueShift.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'valueShift', {
    get: function() {return this.uniforms.valueShift.value},
    set: function(value) {
      this.uniforms.valueShift.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'mosaic', {
    get: function() {return this.uniforms.mosaic.value},
    set: function(value) {
      this.uniforms.mosaic.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'pixelSize', {
    get: function() {return this.uniforms.pixelSize.value},
    set: function(value) {
      this.uniforms.pixelSize.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'whirlAngle', {
    get: function() {return this.uniforms.whirlAngle.value},
    set: function(value) {
      this.uniforms.whirlAngle.value = value;
      this.dirty = true;
    }
  });
  def(EffectsFilter.prototype, 'fisheye', {
    get: function() {return this.uniforms.fisheye.value},
    set: function(value) {
      this.uniforms.fisheye.value = value;
      this.dirty = true;
    }
  });


  function ScratchObj(name) {
    this.name = name;
    this.scripts = [];
    this.costumes = [];
    this.costume = 0;
    this.sounds = [];
    this.variables = [];
    this.lists = [];
    this.info = {};

    this.pixiSprite = new PIXI.Sprite;
    this.pixiEmptyTexture = this.pixiSprite.texture;
    this.pixiSprite.shader = this.pixiEffectsFilter = new EffectsFilter;

    this.effectsChanged = false;
    this.effects = {
      color: 0,
      fisheye: 0,
      whirl: 0,
      pixelate: 0,
      mosaic: 0,
      brightness: 0,
      ghost: 0
    };
  }

  ScratchObj.prototype.toJSON = function() {
    var scripts = [];
    var comments = [];
    this.scripts.filter(function(s) {
      (s.isScript ? scripts : comments).push(s);
    });
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
      list.watcher = new ListWatcher(this, list, +j.width || 100, +j.height || 200);
      list.watcher.moveTo(+j.x || 0, +j.y || 0);
      list.watcher.visible = !!j.visible;
      return list;
    }, this) : [];
    this.scripts = (Array.isArray(json.scriptComments) ? json.scriptComments : []).concat(Array.isArray(json.scripts) ? json.scripts : []).map(deserializeScript);
    // this.sounds = Array.isArray(json.sounds) ? json.sounds.map(...) : []; // TODO
    if (Array.isArray(json.costumes)) json.costumes.map(Costume.deserialize).forEach(this.addCostume, this);
    this.setCostume(Math.round(+json.currentCostumeIndex) || 0);
    return this;
  };

  ScratchObj.prototype.addCostume = function(costume) {
    if (this.costumes.indexOf(costume) === -1) {
      this.costumes.push(costume);
      costume.owner = this;
    }
    return this;
  };

  ScratchObj.prototype.removeCostume = function(costume) {
    var i = this.costumes.indexOf(costume);
    if (i !== -1) {
      this.costumes.splice(i, 1);
      costume.owner = null;
      if (this.costume >= this.costumes.length && this.costume) {
        this.costume--;
      }
    }
    return this;
  };

  ScratchObj.prototype.setCostume = function(i) {
    this.costume = Math.round(i) % this.costumes.length || 0;
    if (this.costume < 0) this.costume += this.costumes.length;
    var costume = this.costumes[this.costume];
  };

  ScratchObj.prototype.setEffect = function(name, value) {
    switch (name) {
      case 'brightness':
        if (value < -100) value = -100;
        else if (value > 100) value = 100;
        break;
      case 'ghost':
        if (value < 0) value = 0;
        else if (value > 100) value = 100;
        break;
    }
    this.effects[name] = value;
    this.effectsChanged = true;
  };

  ScratchObj.prototype.clearEffects = function() {
    this.effects.color = 0;
    this.effects.fisheye = 0;
    this.effects.whirl = 0;
    this.effects.pixelate = 0;
    this.effects.mosaic = 0;
    this.effects.brightness = 0;
    this.effects.ghost = 0;
  };

  ScratchObj.prototype.redraw = function() {
    this.stage.redraw();
  };

  ScratchObj.prototype.updatePixi = function() {
    var costume = this.costumes[this.costume];
    if (!costume) {
      this.pixiSprite.setTexture(this.pixiEmptyTexture);
      return;
    }
    this.pixiSprite.setTexture(costume.baseLayerTexture);

    if (!this.isSprite) return;

    this.pixiSprite.visible = this.visible;

    this.pixiEffectsFilter.alpha = 1 - this.effects.ghost / 100;
    this.pixiEffectsFilter.valueShift = this.effects.brightness / 100;
    var hs = this.effects.color * 0.03 % 6;
    this.pixiEffectsFilter.hueShift = hs < 0 ? hs + 6 : hs;
    this.pixiEffectsFilter.mosaic = Math.round(Math.abs(this.effects.mosaic) / 10 + 1);
    this.pixiEffectsFilter.whirlAngle = -this.effects.whirl * Math.PI / 180;
    this.pixiEffectsFilter.fisheye = Math.max(0.001, 1 + this.effects.fisheye / 100); // NS
    this.pixiEffectsFilter.pixelSize = this.effects.pixelate ? Math.min(Math.abs(this.effects.pixelate / 10) + 1, costume.width, costume.height) : 1;
    if (this.effects.pixelate || this.effects.whirl) {
      this.pixiEffectsFilter.uniforms.dimensions.value[0] = costume.width;
      this.pixiEffectsFilter.uniforms.dimensions.value[1] = costume.height;
    }

    this.pixiSprite.scale.x =
    this.pixiSprite.scale.y = this.scale;
    this.pixiSprite.anchor.x = costume.cx / costume.baseLayerTexture.width;
    this.pixiSprite.anchor.y = costume.cy / costume.baseLayerTexture.height;
    this.pixiSprite.position.x = 240 + this.x;
    this.pixiSprite.position.y = 180 - this.y;

    if (this.rotationStyle === 'normal') {
      this.pixiSprite.rotation = (this.direction - 90) * Math.PI / 180;
    } else {
      this.pixiSprite.rotation = 0;
      if (this.rotationStyle === 'leftRight') {
        this.pixiSprite.scale.x *= this.direction < 0 ? -1 : 1;
      }
    }
  };

  ScratchObj.prototype.uniqueCostumeName = function(base) {
    return uniqueName(this.costumes, base);
  };

  ScratchObj.prototype.makeEmptyCostume = function() {
    var empty = document.createElement('canvas');
    if (this.isStage) {
      empty.width = 960;
      empty.height = 720;
      var cx = empty.getContext('2d');
      cx.fillStyle = '#fff';
      cx.fillRect(0, 0, empty.width, empty.height);
    } else {
      empty.width = 2;
      empty.height = 2;
    }
    return new Costume(this.newCostumeName(), empty, 0, 0, 2);
  };

  ScratchObj.prototype.newCostumeName = function() {
    return this.uniqueCostumeName(this.isStage ? 'backdrop1' : 'costume1');
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

	function Costume(name, baseLayer, cx, cy, pixelRatio, textLayer) {
		this.baseLayerMD5 = null;
		if (typeof baseLayer === 'string') { // MD5
			this.baseLayerMD5 = baseLayer;
			// Data URI to allow operation without internet connection
			if (baseLayer=="c68e7b211672862001dd4fce12129813.png") // cat.png
				this.baseLayerTexture = PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAADaCAYAAADpGqNcAAAMjUlEQVR42u2dTXIkNRCF7XDhWwx4AjZcgyVHsCM4yBxgDkIEHIEl1/BmCAbmFhBEgzwjW2gklX4ypczUy03b7XZ3V+mrVy/1kzquEKbi66/uLu7xtz/eX+9yzAea3R7AuwUgBsCAGCEH4Me3/zz9/u2bm6fndrEUh/SG2c3fjQIMJRbcUAAZAKuF2DWQvz1ClQGwWiX2IEOV6wAOL/wdzpWaxC5OWnZVZSiwIogdoK7BHLRhg+2sygBYuRLvrsoA2BjEu6kyADYM8Q6q3AvwTsmdmRE7i6oMBd4MYmuqDIA3hVi7KseTeADwxhAXVNk9XM+CkOL7IzaGOKXKn8KDdi0B1k8X1lP89dMrlmO3ntxtMRXzRZXvQmguZyC3wtqjnrcP4c8f2ICGEi+K3KjdmDLdhQr4DHILsJS3+hDWEGL3M0CGEteq8kWKL80BjQDERVX29sI9SlI+qu+ygy/eennSR6V99ax8uIUDYtXh4PUgI7ECxOpBtpZYWbcUgDjjRa0lVpZBBsTMiRVABsQIRpDd7xZgFg8x9YAHwt60VSixkYjmhxQBDh8t2AtAvBHA4WtDmLWDDIiNAPzu/e9Vr//m7vXz/6VA1uiTAfFm4WF3MKdA1uiTAfFGKhzD7EH2EGv1yYB4Q4BjkEv2QgPIgBj2omgvNIAMiBuzfKt91aG90AbyAXBvul5vEWatIKuAmGvULga4xl+mPKRGP9wS0kHeVol7Qch5SMtqjMTOeGZv0V5oA/kAwOONvdpe7G4p1Gw8I9VLWrUXmpK8Q5sa4Bb8ApP7vFnJHewEgQprUDiNSZGF49nGE8/qlrIGsgZvjBE7gKzeG4uGGIWmEaoh1g4wtxojuYOdQBjyxoB4czX2gzWlpFe6xxcJMbzwnAgB9r9rtCbHLgCv8pBS1TgGGJ4YYUqday8GKb4YEBPcilffgnfvqRAFsRYvLNFL7gzyAYDHAK4BeVZ2vyvIW9kJDBB8fmGlns9duOHf/v75SzG+GJ544wt15EL+4v7PZ5ChxJOtxA5qHB4jZ+IZg7xKjaHExhU5Zwdac4DS/8Z13NzjTJirIY6XCGmuZzuixi1eUsJxuqCAuaTGT+95/9EnryhK2K3EVFecxiHmVgg8PKuOMVwHeNaT0qrCMdAhzDNU2X1GNcTxF/FfUGtN2116KrxSxjDXDjv3nBv3mY9X/Krs2etWYv+lNMMsGWSKLchyO0DlLBF170WsypRshLwNJ3Y5mLX7ZqqIb8k13VJUe+i597nc0wPaA7M7DxRCl+KLrHcihrkGaAl+mFuNY9Xzt/camH/4/ruhz/7xl1+vrq+vry6Xy/KLObQyLaqcqzkS/j95F1v45i1AW7UVufcMvSrHoIED2IUEgFMXdQ7ks0I5qf9h7ScuAS0ZZKrbbW3yFAL95GX/S4qcFXAgjqqx5FykprJTDSfTBjtioKlKU3Gc3J7upRy8vdn91YOtdOL/F/TNELTLII6/qESIQ3/eCzPVPGNnA5yf9bagRZGlWglKcJdDHIMssTxqDuaWJGY0PMgeTM3WojQ7bjREzZ2QtprWdw+1nHDqxNCraa0qa1Jhqmmch5SDCVVvJbSz4BxV5RTM2mzE0/l+M67Gh7QrUxq8kiJU5RDa1Gs09lT0qvHWUzG1wHsGs1aAqdT4ALx6QyO0HHEAXgQgRiAAsS0VjrvisKcGf3LXDDHHvGHLW81KqhQEJc7ADBVOR7wkKPwZMC+GODVvmOJ2Ykl1Q0jDn8M1bjuqc85q+Tvx9H5iKjvBsfG41B6JkjoDaiR2qiKlzqWGtQJ2fBzxsfbc3UnW2I2Gn82mfbusXr971rCW7Yc7lrBWBZTYoEqnILas1KrnTlhR4xX2Q7tSjyZ1UOINlFoy1B8XyI5PvxUDMdR4XqLYepFIVuEtlNhd7TtN/KlJFGsSVE3WRBTEmtXY11OQVhKrt/ghd/jPoRhvgCdGJC9GTSEOYnjjtTFjfgelCotVYmqQd/PFOwEs2k5oVGSpvthiMqfGE1OCDDVeDzCHCiOx21yNZ85v5gJYBcQa1Vg6yLPtAyfAapQYIANgE3YC/liXfZgFsDpPHILsYgTmGSBLUuMV/ncGwCoTu7gkrCaQZ6qgZftgonciXKxKAbILTpjDodxVijjr81xb3D58mFrmXnUXmyafnNrVkwOuFfOJQ/W9fZjPQRXEpQV8qzeQ0Zbw5WAegS43YceqfWiCuGb1qYSdkLQlfCmYz4Bsfd9Z8K6wD11KnDsxXFue7pDw5c5tD8Qzk8VwdfIq+1ANsQPCgVBqTKpy9VwJ34gqr+pLljpU/QIvzZIidohrAPZBUa4+ti2jJ4hqZ6YZPRfSI4ZXGsBFJa5tuF41LvltjmKFgNkevFmIewBqVeP4M2KwOHdRAsy1PR3y4S0qcasva1FjD3AJIspJ8LkLIny+9fOswZwrJSUd3iTEmmoOt9wlztQ9/lst1Fph9t/75bhv1IFbVGLO7LhGhblhDhsvV2u5FWqJMPvvlD4uvapbhHhUhc+Weq8EuOThS5C3Qh2DMwPqFKy1eYVmcLNKTKHCEgY+WkBOQXmWaKYASYEdAjYCdBnU+iTYCrRJiLm9sCQVToF8NsJX03tyqnxDg0LtvTVWgS0qMYUKa6weUwvymequ2Fx9J1CLEO+qwpyJY0tQVYbcGmKcgj415kgyAfIAxNTdar5BdlFh6vOGMwElVnsnQABiqDEgpgmNPRQIQMweszYwl+LdocZCINYymWjWBYJQrMSjcIQJTyn5qfkcJE+GIa4ps5Qbv5cyc6sXUCjwJkqcAzj+GwfQYfdTySfW2BcAuynEJYBzr318O//WPQp4S9RcrC3nDbFB7wRFgjmqwq13Gf/6GpjD5BK+fQDiVJ0FqMm4TWqBGdEJcVgC6t09AOZKXN374JzCTky1EhxJKlQZEC/xwtyBwRYiiL2l8EWSATC/RYEaQ4lZAZ41gAMVJoYYG4MjoMSIdrV/8xqCQQ0xpRpTrVtrWUipaTkU5lwrUeKZCzApAV65WSMWjhJATO2NV64klq7COB+MSswJcvgclZXgsBHcagyAFSZ28eSWXbuXarwwLAURxBxdbqnKk2eztlaoMJcat9gIgEykxJx9xzXFryU0HhXIPT4YIAuzE7U2Q2JjSemtkHiRq4B4xkheCLJvLGkNJAHknJXaHe4qJZ4FcmgvwgaS0ii92xpQdKm1lJOVeO5E2AnK/ZNbvbI0dW5RZc4+4dx7ps6dZaCrIU5tzsLZPZbqyZBUkMXDWVNRdEW52BzQFkE+aqEtXfGzykudbeM1ExbvU0s1OyTMj4iBtgjyUQtwad+KWQClFCYEfAXIOVV2z2F6qwA7cbYZS67EFHeDSRvtC1V51x4CURC3jIDlun44IZM6XJ2zPJLU2OrgyUF1YkL18RdC73azPQBLmS2HUbbFEFPNQ6jZbpary0kiyPDGwpW4pD6xEoVQt9qC2tfH0z5XQVMCWaId2h7i2tto+HzKcpx13rdslhjOkpMG8urvBYiJ/GDKcqSA7lWuuOttlfqlQPbHPRtkqxs/HtyNVuufa4AeTTxXwZw6J7PtheWdSw/qpC5utJYTl1Jnqu8TNqQUXxrbi7PvPwKvVYBZlDilgC3dTZwrNVbCfJb8lob5KWoWW+7uY1+y7xuhRpVn1Y1IwbwS5NrzAngXQJxT5RrAZocEkHcGUTzEKfVbDXBqlFEyyAgBEK9W2rNMHYMRyiHWVMOMA+BcbwH3pH+osVIlXg3vmcdcORiBAMTDAKdUGSADYtH2YTXIsBSAmBVgBCA2AzBsxUYQS+maop4rsFPPDZQ4AdHshtc22QV2RxjEqRG5meoMIAAxecYdA8YJMhfAsBJI7D4bOKAGQvNcWdw5iCHmzsBzk797Pis1gYgDBKgwlLioyiUge94TAYinRm5NnSRwocKAuHo4VaKSzgAYfli5EksOKLByiDG8il4JKLHyhoIKA2LYCIQMiGEpYCWgxAobapYKA+CJEO+ixtSlshBGlFij2gBgoxD31GDA7RLnRpwS11ZsjP9Hy4HPsk0AeLGdqKnYqBHg3fw/PDFUBCq8U2KnMWaoMepKAGK1IPcWGkcAYnEge2sBkAGxamuBklWAeAnIoZJSg4yEDxBPAdnbAPhkQKwWZA8afDIghk+GTwbElkFGAGL1IEONATEUGQGIJYAMNQbEUGRAjJAAMtQYEEORATFiNciYewyIociAGAGQATFiAGRYCUAsFmTf6wCAAbFakENIU0ADYEAsHmT3eLZHCQAGxGpgjoEGwHTxLzILQsBkPD7CAAAALXRFWHRTb2Z0d2FyZQBieS5ibG9vZGR5LmNyeXB0by5pbWFnZS5QTkcyNEVuY29kZXKoBn/uAAAAAElFTkSuQmCC", true, PIXI.scaleModes.LINEAR);
			else if (baseLayer=="739b5e2a2435f6e1ec2993791b423146.png") // stage.png
				this.baseLayerTexture = PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAEfklEQVR42u3VOQEAAAjEMIbzb5nHBFMioUvTqwCAV5EAAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAwYAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYADBgADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAwYAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYADBgADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAwYAAwYAAwYADAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAMGAAwIABwIABAAMGAAMGAAwYAAwYADBgADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAwYAAwYADAgAHAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAwIABwIABwIABAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAcCAAQADBgADBgAMGAAMGAAwYAAwYADAgAHAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAwIABwIABwIABAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAcCAAQADBgADBgAMGAAMGAAwYAAwYADAgAHAgAHAgAEAAwYAAwYADBgADBgAMGAAMGAAwIABwIABwIABAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAcCAAQADBgADBgAMGAAMGAAwYAAwYADAgAHAgAHAgCUAAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgADBgAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYAAwYADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgADBgAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYAAwYADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgADBgAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYAAwYADBgADBgAMGAAMGAAwIABwIABAAMGAAMGAAMGAAwYAAwYADBgADBgAMCAAcCAAQADBgADBgAMGAAMGAAMGAAwYAAwYADAgAHAgAEAAwYAAwYAzgDzBgmdc+DZigAAAC10RVh0U29mdHdhcmUAYnkuYmxvb2RkeS5jcnlwdG8uaW1hZ2UuUE5HMjRFbmNvZGVyqAZ/7gAAAABJRU5ErkJggg==", true, PIXI.scaleModes.LINEAR);
			else if (baseLayer=="f9a1c175dbe2e5dee472858dd30d16bb.svg") // cat.svg
				this.baseLayerTexture = PIXI.Texture.fromImage("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJjYXQiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTVweCIgaGVpZ2h0PSIxMTFweCIgdmlld0JveD0iMCAwIDk1IDExMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgOTUgMTExIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8Zz4KICAgIDxnIGlkPSJMYXllcl8zIj4KICAgICAgPHBhdGggZmlsbD0iI0ZBQTUxRCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNMjIuNDYyLDc5LjAzOWMtMi40MTUtMC40NTEtNS4zMDQtMS4zMDktNy43NDItMy41MDMmI3hEOyYjeEE7JiN4OTsmI3g5O0M5LjI2OCw3MC42MjksNy41MjYsNjIuNTM1LDMuNjcyLDY0LjYyMmMtMy44NTYsMi4wODgtMy43ODIsMTUuMTY1LDguMzUzLDE5LjE5NGM0LjE4MiwxLjM5MSw3Ljk5OCwxLjM5NiwxMS4wOTEsMS4zMTImI3hEOyYjeEE7JiN4OTsmI3g5O2MwLjgxMS0wLjAyNSw3LjcxNy0wLjY1NCwxMC4wNzktNC4wNzRjMi4zNjEtMy40MiwwLjcxOS00LjI3Mi0wLjA5LTQuNzQ0QzMyLjI5NSw3NS44MzgsMjUuODc4LDc5LjY3NywyMi40NjIsNzkuMDM5eiIvPgogICAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNC4yMzYsNjQuODc3Yy0xLjk4OSwwLjYxMy0zLjA3NSw0Ljk5OC0yLjA3Niw4LjQ4NGMwLjk5OCwzLjQ5LDIuNjM0LDUuMDIyLDMuODYzLDYuMzk4JiN4RDsmI3hBOyYjeDk7JiN4OTtjMS41MjgsMS4wMzgtMC43Mi0yLjQwMiwxLjM2MS00LjE1YzIuMDc1LTEuNzQ0LDUuNzMzLTAuOTE0LDUuNzMzLTAuOTE0cy0yLjkwOS0zLjk4Ny00LjU3LTYuMzk2JiN4RDsmI3hBOyYjeDk7JiN4OTtDNi45NzUsNjUuOTg4LDYuMzU5LDY0LjM3NSw0LjIzNiw2NC44Nzd6Ii8+CiAgICA8L2c+CiAgICA8Zz4KICAgICAgPHBhdGggZmlsbD0iI0ZBQTUxRCIgZD0iTTM4LjIxNyw4Ni43NTZjMCwwLTguODMyLDYuMi0xNy4wNzEsOC40MTJsMC4wODYsMC4yMTVjMS4yNDcsMS44MjQsNS44Nyw3LjQ5Ny0wLjMzNCw5LjQ5NiYjeEQ7JiN4QTsmI3g5OyYjeDk7Yy01LjMzMywxLjcxNy0xNS4xMi0xMy4xMDQtMTAuODIxLTE1LjkwMmMyLjYyNi0xLjcxMyw0Ljg5Mi0wLjI1Miw0Ljg5Mi0wLjI1MnMzLjQ3NC0xLjA3LDYuMDAxLTIuMzQ1JiN4RDsmI3hBOyYjeDk7JiN4OTtjNC4zMDMtMi4xNjEsNS43ODQtMy40NTMsNS43ODQtMy40NTNzNC4xODQtNC4zMDYsNi44NTYtNC4xMzdDMzYuMjgxLDc4Ljk2LDQxLjY2OSw4My41MDQsMzguMjE3LDg2Ljc1NnoiLz4KICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjMxRjIwIiBzdHJva2Utd2lkdGg9IjEuMiIgZD0iTTIxLjIzMiw5NS4zODNjMS4yNDcsMS44MjQsNS44Nyw3LjQ5Ny0wLjMzNCw5LjQ5NiYjeEQ7JiN4QTsmI3g5OyYjeDk7Yy01LjMzMywxLjcxNy0xNS4zMjktMTMuMzQ0LTExLjAzLTE2LjE0NWMyLjYyNi0xLjcxMyw1LjEwMS0wLjAxLDUuMTAxLTAuMDFzMy40NzQtMS4wNzIsNi4wMDEtMi4zNDgmI3hEOyYjeEE7JiN4OTsmI3g5O2M0LjMwMy0yLjE2MSw1Ljc4NC0zLjQ1Myw1Ljc4NC0zLjQ1MyIvPgogICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMyMzFGMjAiIHN0cm9rZS13aWR0aD0iMS4yIiBkPSJNMzguMjE3LDg2Ljc1NmMwLDAtMTAuMTIzLDcuMTA3LTE4LjgwNCw4LjgxOSIvPgogICAgPC9nPgogICAgPHBhdGggZmlsbD0iI0ZBQTUxRCIgc3Ryb2tlPSIjMjMxRjIwIiBzdHJva2Utd2lkdGg9IjEuMiIgZD0iTTUyLjE2OSw3NC44ODVjMCwwLDEuMjM1LDAuMTY1LDQuNzQ0LDMuNjc2JiN4RDsmI3hBOyYjeDk7YzMuNTA5LDMuNTA4LDYuMDI2LDIuMTYsOC45MTEsMC43MjRjMi44NzctMS40NDMsMTAuNTM3LTYuMTI2LDYuNDktOS44MTdjLTQuMDQ5LTMuNjg4LTYuMjA3LDEuMTQ2LTkuNzE1LDIuNDA1JiN4RDsmI3hBOyYjeDk7Yy0zLjUxMiwxLjI2LTUuMDYxLTIuNDg3LTYuODU4LTQuMjg3Yy0wLjU4OS0wLjU5My0xLjE4OC0xLjA5OS0xLjcyOS0xLjUwNWMwLDAtMC45NzEtMC43Ni0xLjkwNiwyLjc5JiN4RDsmI3hBOyYjeDk7QzUxLjE3Miw3Mi40MTIsNTAuMTYyLDczLjQxNSw1Mi4xNjksNzQuODg1eiIvPgogICAgPGcgaWQ9IkxheWVyXzJfMV8iPgogICAgICA8cGF0aCBmaWxsPSIjRkFBNTFEIiBzdHJva2U9IiMyMzFGMjAiIHN0cm9rZS13aWR0aD0iMS4yIiBkPSJNNDYuNzUzLDgyLjAxMmMxLjE4OC0wLjkxMiwyLjM5Ny0yLjQwMiwzLjk1MS00LjcxMyYjeEQ7JiN4QTsmI3g5OyYjeDk7YzEuMjk2LTEuOTI3LDIuNy01LjU3OCwyLjctNS41NzhjMC44NzUtMi41MjEsMS45MzQtNi41NzYtMS45MDItNy4yOTZjLTEuNTUzLTAuMjkxLTQuMDc5LTAuMDk4LTcuNjctMC43NzYmI3hEOyYjeEE7JiN4OTsmI3g5O2MtMy41OTMtMC42ODEtNi43OTgtMi41MjItOS41MTcsMi4yMzNjLTIuNzE4LDQuNzU3LTkuNTksOC4yNzEtMS4wNTYsMTYuNTYzYzAsMCw0LjkwMSwzLjg0MiwxMC43NjQsOS42MzkmI3hEOyYjeEE7JiN4OTsmI3g5O2M0LjgzMSw0Ljc3NSwxMi4wNDUsMTAuNjAyLDEyLjA0NSwxMC42MDJzMTguOTcyLDIuMTg4LDE5LjUzNS0wLjY5M2MxLjkyMi05Ljc5LTE0Ljc3Ny02LjkxMS0xNC43NzctNi45MTEmI3hEOyYjeEE7JiN4OTsmI3g5O3MtNC42MDUtMy45MzMtNi43MjUtNS43OTRjLTMuNDc4LTMuMDU5LTExLjEyNS0xMC43NzEtMTEuMTI1LTEwLjc3MSIvPgogICAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNTEuMjUzLDc1LjQzNGMwLDAsMi40Ny0yLjY2LTIuNDY5LTUuMzE3Yy00LjkzOS0yLjY1Ny03LjIxMy0wLjAxNy04LjczOSwxLjUyMSYjeEQ7JiN4QTsmI3g5OyYjeDk7Yy0yLjY0NCwyLjY1NSwzLjQ0Myw2LjYxMSwzLjQ0Myw2LjYxMWwzLjE3NiwzLjIwNGMwLDAsMS43MzgtMS42NDcsMi40OTktMi45NzlDNTAuMDM2LDc3LjI2LDUxLjI1Myw3NS40MzQsNTEuMjUzLDc1LjQzNCIvPgogICAgPC9nPgogICAgPGcgaWQ9IkxheWVyXzgiLz4KICAgIDxwYXRoIGZpbGw9IiNGQUE1MUQiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik0yOS45MjYsNzMuMjE4YzAuNzQ5LTAuNTcxLDIuODg5LTIuMjAyLDQuODU0LTMuNjU3JiN4RDsmI3hBOyYjeDk7YzIuNDI4LTEuNzk5LDYuMTE3LTUuODQ5LDEuMDc3LTcuNjQ2Yy01LjA0LTEuODAxLTcuNTA3LDEuNjA0LTExLjUxOSw0Ljk0NmMtMi4xNTksMS44MDEtNS4zMDgsMi42OTktNC4zMTksNi4yMDkmI3hEOyYjeEE7JiN4OTtjMC45OTMsMy41MTEsNC44NjIsMTMuNDA4LDExLjc4OSwxMC4xN2M2LjkyOS0zLjIzOS0xLjc5OS05LjE4LTMuMDYtMTEuMTU3Ii8+CiAgICA8ZyBpZD0iTGF5ZXJfMiI+CiAgICAgIDxwYXRoIGZpbGw9IiNGQUE1MUQiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik01Mi43MDksMTQuMTU2Yy0xLjU0LTAuMTQzLTQuNzUtMC4zMTYtNi41MTgtMC4yMzEmI3hEOyYjeEE7JiN4OTsmI3g5O2MtNC43MjgsMC4yMjUtOS4yMjQsMS45MjgtOS4yMjQsMS45MjhMMjMuOTQ5LDcuMzU3bDIuMjM1LDE4LjkwNmMwLjY0Ni0wLjc4Mi0xMC41NTUsMTIuODA0LTMuNDc5LDI0LjIyNCYjeEQ7JiN4QTsmI3g5OyYjeDk7YzcuMDgsMTEuNDI2LDIyLjIzMywxNi41MTgsNDAuOTg4LDEyLjc5MmMxOC43NTUtMy43MjksMjMuMjI5LTE0LjUzMSwyMS45ODYtMjAuMjQ2Yy0xLjI0Mi01LjcxNC04LjMyMi03LjgyMy04LjMyMi03LjgyMyYjeEQ7JiN4QTsmI3g5OyYjeDk7cy0wLjA5LTQuNDgtMy4zMjgtOS45N2MtMS45MjYtMy4yNjgtOC4zNDgtOC4wNDEtOC4zNDgtOC4wNDFMNjIuODIyLDUuNjQ3bC03LjQ1Miw3LjIwNEw1Mi43MDksMTQuMTU2eiIvPgogICAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNzYuNDIsMzUuMDY2bC0yLjQ4Mi0yLjA2NGwtOS4xMTUsMi42NjFjMCwwLDAsMy40MTktNC4zNjcsNC4zNjdjLTQuMzcsMC45NTEtMTEuMjExLTIuMjc3LTExLjIxMS0yLjI3NyYjeEQ7JiN4QTsmI3g5OyYjeDk7TDQxLjQ2LDQxLjE3YzAsMC04LjQzNywwLjkyOC04LjczOSw2LjA4MUMzMi4wNDgsNTguNzA0LDQ2LjEsNjMuNDc5LDUxLjQyNSw2My43ODNjMi45MDUsMC4xNjcsOC4yMzUtMC4zMzgsMTIuMjc3LTEuMTQxJiN4RDsmI3hBOyYjeDk7JiN4OTtjMTcuNzUyLTMuMjM0LDIyLjU1MS0xMy45MTksMjEuMzEtMTkuNjM1Yy0xLjI0Mi01LjcxNC03Ljk3OC03LjE5Ni03Ljk3OC03LjE5Nkw3Ni40MiwzNS4wNjZ6Ii8+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik0xMC42NzMsNDYuMTU1YzAsMCw0LjEwNywwLjM3NCw1Ljk3NCwwLjI2OCYjeEQ7JiN4QTsmI3g5OyYjeDk7YzEuODY1LTAuMTA3LDUuNDkyLTAuNTg3LDUuNDkyLTAuNTg3Ii8+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik04MS42NTYsNDAuNjcxYzAsMCw0LjU0OS0wLjc0Myw2Ljg1OS0xLjU0OSYjeEQ7JiN4QTsmI3g5OyYjeDk7YzIuNzE1LTAuOTQyLDQuNTQzLTIuNTQ1LDQuNTQzLTIuNTQ1Ii8+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik0yMi4zMzcsNDEuOTA5YzAsMC0yLjM4NC0xLjc3Ny02LjExNy0zLjQzJiN4RDsmI3hBOyYjeDk7JiN4OTtjLTQuMTM0LTEuODMxLTYuNDA1LTIuMzAzLTYuNDA1LTIuMzAzIi8+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik04Mi4xMTcsNDYuNjIyYzAsMCwyLjcyNiwxLjEwNCw1LjUzMywxLjM4NSYjeEQ7JiN4QTsmI3g5OyYjeDk7YzIuNzcsMC4yNzYsNC42NDYsMC4xMSw0LjY0NiwwLjExIi8+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik01Mi4zNSwxNC4yMTImI3hEOyYjeEE7JiN4OTsmI3g5O2MyLjg0LDAuNywzLjg4NywxLjQ2OSwzLjg4NywxLjQ2OSIvPgogICAgICA8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHgxPSIzMy44OTgiIHkxPSIxMy42ODQiIHgyPSIzOS45NTYiIHkyPSIxOC4wNDIiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJMYXllcl81Ij4KICAgICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMjMxRjIwIiBkPSJNNzEuODQsMjUuMzY2YzIuOTI0LDQuNDc5LDMuMDMzLDkuNTkxLDAuMjQyLDExLjQxNSYjeEQ7JiN4QTsmI3g5OyYjeDk7Yy0yLjc5MywxLjgyNS03LjQyNi0wLjMzMi0xMC4zNTQtNC44MTNjLTIuOTMzLTQuNDgtMy4wMzctOS41ODktMC4yNDQtMTEuNDE1QzY0LjI3NSwxOC43Myw2OC45MTMsMjAuODg0LDcxLjg0LDI1LjM2NnoiLz4KICAgICAgPHBhdGggZmlsbD0iIzIzMUYyMCIgZD0iTTcxLjA4OSwzMi41MjJjMCwxLjA4LTAuODAyLDEuOTU2LTEuOCwxLjk1NmMtMC45OTMsMC0xLjgwMy0wLjg3Ny0xLjgwMy0xLjk1NiYjeEQ7JiN4QTsmI3g5OyYjeDk7YzAtMS4wOCwwLjgxLTEuOTU4LDEuODAzLTEuOTU4QzcwLjI4NywzMC41NjQsNzEuMDg5LDMxLjQ0Miw3MS4wODksMzIuNTIyIi8+CiAgICA8L2c+CiAgICA8ZyBpZD0iTGF5ZXJfNyI+CiAgICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzIzMUYyMCIgZD0iTTQ3Ljg2NywyOC42MTljMi45MjYsNC40OCwyLjYxOSw5Ljg2Mi0wLjY4MSwxMi4wMTUmI3hEOyYjeEE7JiN4OTsmI3g5O2MtMy4zMDIsMi4xNTktOC4zNTEsMC4yNzItMTEuMjc2LTQuMjA4Yy0yLjkyOC00LjQ4LTIuNjI0LTkuODYsMC42NzgtMTIuMDE3QzM5Ljg5MSwyMi4yNTMsNDQuOTM4LDI0LjEzNyw0Ny44NjcsMjguNjE5eiIvPgogICAgICA8cGF0aCBmaWxsPSIjMjMxRjIwIiBkPSJNNDYuMDc5LDM0LjUwN2MwLDEuMDgxLTAuODAzLDEuOTU3LTEuODAxLDEuOTU3Yy0wLjk5MiwwLTEuODAzLTAuODc4LTEuODAzLTEuOTU3JiN4RDsmI3hBOyYjeDk7JiN4OTtjMC0xLjA4LDAuODExLTEuOTU3LDEuODAzLTEuOTU3QzQ1LjI3NCwzMi41NSw0Ni4wNzksMzMuNDI3LDQ2LjA3OSwzNC41MDciLz4KICAgIDwvZz4KICAgIDxwYXRoIGZpbGw9IiM1RTRBNDIiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTU5Ljc2NiwzNy45MjZjMS44NTQsMCw0LjU1NS0wLjI4NCw0LjY5NywwLjU2OWMwLjE0MywwLjg1NS0xLjcwOSw0LjIwMy0yLjk4OCw0LjM0NSYjeEQ7JiN4QTsmI3g5O2MtMS4yODMsMC4xNDItNi4xMjUtMi4zNTMtNi4xOTUtMy45MTlDNTUuMjA2LDM3LjM1NSw1OC4wNTUsMzcuOTI2LDU5Ljc2NiwzNy45MjZ6Ii8+CiAgICA8ZyBpZD0iTGF5ZXJfNCI+CiAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLXdpZHRoPSIxLjIiIGQ9Ik00Ni43NzQsNDUuMjM1YzAsMCwxMC4zNDcsMy4wNTQsMTQuMjE3LDMuODk3JiN4RDsmI3hBOyYjeDk7JiN4OTtjMy44NjgsMC44NDIsMTAuODUxLDEuNjg0LDEwLjg1MSwxLjY4NHMtNy45OSwxMC4yNDUtMTcuMzI4LDcuNjQ0QzQ1LjE3Niw1NS44NjMsNDUuMzQ1LDQ5Ljk3NSw0Ni43NzQsNDUuMjM1eiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+", true, PIXI.scaleModes.LINEAR);
			else {
				//console.log("not default"+baseLayer);
				//TODO temporary get resource from localhost
				//this.baseLayerTexture = PIXI.Texture.fromImage(Server.getAssetURL(baseLayer), true, PIXI.scaleModes.LINEAR);
				this.baseLayerTexture = PIXI.Texture.fromImage(baseLayer, true, PIXI.scaleModes.LINEAR);
			}
		} else if (baseLayer) {
			this.baseLayerTexture = PIXI.Texture.fromCanvas(baseLayer, PIXI.scaleModes.LINEAR);
		}
		if (typeof baseLayer === 'object') {this.baseLayerTexture = PIXI.Texture.fromImage(baseLayer.src, true, PIXI.scaleModes.LINEAR);}
		if (typeof textLayer === 'string') { // MD5
			this.textLayerMD5 = textLayer;
			this.textLayerTexture = PIXI.Texture.fromImage(Server.getAssetURL(textLayer), true, PIXI.scaleModes.LINEAR);
		}
		this.name = name;
		this.cx = cx || 0;
		this.cy = cy || 0;
		this.pixelRatio = pixelRatio || 1;
		this.scale = 1 / this.pixelRatio;
		this.width = this.height = 1;
		this.loaded = false;
		if (this.baseLayerTexture) {
			this.baseLayerTexture.baseTexture.resolution = this.pixelRatio;
			this.baseLayerTexture.on('update', this.updateSize.bind(this));
		}
	}

	Costume.centered = function(name, image) {
		return new Costume(name, image, image.width / 2 | 0, image.height / 2 | 0);
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
    var cx = Math.max(-1e6, Math.min(1e6, +json.rotationCenterX));
    var cy = Math.max(-1e6, Math.min(1e6, +json.rotationCenterY));
    var pr = Math.max(1, Math.min(16, +json.bitmapResolution || 0));
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
    var c = new Costume(this.name, null, this.cx, this.cy, this.pixelRatio);
    c.baseLayerTexture = this.baseLayerTexture;
    c.baseLayerMD5 = this.baseLayerMD5;
    c.textLayerTexture = this.textLayerTexture;
    c.textLayerMD5 = this.textLayerMD5;
    c.updateSize();
    return c;
  };

  Costume.prototype.updateSize = function() {
    this.loaded = true;
    this.width = this.baseLayerTexture.width * this.scale;
    this.height = this.baseLayerTexture.height * this.scale;
    this.changed();
  };

  Costume.prototype.changed = function(fromEditor) {
    if (this.owner) {
      var i = this.owner.costumes.indexOf(this);
      if (i === this.owner.costume) {
        this.owner.redraw();
      }
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

  List.prototype.isList = true;

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
    this.x = Math.max(-1e6, Math.min(1e6, +json.scratchX || 0));
    this.y = Math.max(-1e6, Math.min(1e6, +json.scratchY || 0));
    this.direction = json.direction == null ? 90 : 180 - (180 - (+json.direction || 0) % 360) % 360 || 0;
    this.scale = json.scale == null ? 1 : Math.max(0, Math.min(1000, +json.scale || 0));
    this.visible = json.visible == null || !!json.visible;
    this.isDraggable = !!json.isDraggable;
    this.indexInLibrary = Math.max(-1e6, Math.min(1e6, +json.indexInLibrary || 0));
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
    if (!costume || !costume.loaded) return false;
    hitTestContext.drawImage(costume.baseLayerTexture.baseTexture.source, -x - costume.cx, -y - costume.cy);
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
    this.visible = true;

    this.tempo = 60;
    this.volume = 100;
    this.children = [];
    this.sprites = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.keys = {};

    this.title = '';
    this.author = '';
    this.isPublic = true;

    this.pixiStage = new PIXI.Stage(0xffffff);
    this.pixiStage.addChild(this.pixiSprite);
    this.pixiRenderer = PIXI.autoDetectRenderer(480, 360);

    this.el = cl('stage', [
      this.pixiRenderer.view
    ]);

    this.penCanvas = el('canvas');
    this.penContext = this.penCanvas.getContext('2d');

    this.updatePixelRatio(true);
    this.render = this.render.bind(this);
    this.renderScheduled = false;
  }
  inherits(Stage, ScratchObj);

  Stage.prototype.isStage = true;

  Stage.prototype.redraw = function() {
    if (this.renderScheduled) return;
    requestAnimationFrame(this.render);
    this.renderScheduled = true;
  };

  Stage.prototype.render = function() {
    this.renderScheduled = false;
    this.updatePixi();
    var sprites = this.sprites;
    for (var i = sprites.length; i--;) {
      sprites[i].updatePixi();
    }
    this.pixiRenderer.render(this.pixiStage);
  };

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
    this.tempo = json.tempoBPM == null ? 60 : Math.max(20, Math.min(500, +json.tempoBPM || 0));
    if (Array.isArray(json.children)) {
      json.children.forEach(function(child) {
        if (child.objName) this.add(new Sprite().fromJSON(child));
      }, this);
      json.children.forEach(function(child, i) {
        if (child.cmd) {
          var watcher = Watcher.deserialize(this, child);
          if (watcher) this.add(watcher);
        }
      }, this);
      this.sprites.concat(this).forEach(function(child, i) {
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
      if (child.isSprite) {
        this.sprites.push(child);
        this.pixiStage.addChild(child.pixiSprite);
      }
      if (child.isWatcher) this.el.appendChild(child.el);
    }
    return this;
  };

  Stage.prototype.bringToFront = function(child) {
    if (child.isSprite) {
      this.pixiStage.setChildIndex(child.pixiSprite, this.pixiStage.children.length - 1);
    } else {
      this.el.appendChild(child.el);
    }
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

  Stage.prototype.updatePixelRatio = function(quiet) {
    var pr = window.devicePixelRatio || 1;
    if (pr === this.pixelRatio) return;

    this.pixelRatio = pr;
    this.pixiRenderer.resolution = pr;
    this.pixiRenderer.resize(this.width, this.height);
    this.pixiRenderer.view.style.transform = 'scale('+(1/pr)+','+(1/pr)+')';

    this.penCanvas.width = this.width * pr;
    this.penCanvas.height = this.height * pr;
    this.penContext.scale(pr, pr);

    if (!quiet) this.redraw();
  };

  Stage.prototype.drawOn = function(context) {
    var costume = this.costumes[this.costume];
    if (costume && costume.loaded) {
      context.save();
      context.scale(costume.scale, costume.scale);
      context.drawImage(costume.canvas, 0, 0);
      context.restore();
    }
    context.drawImage(this.penCanvas, 0, 0, this.width, this.height);
    var sprites = this.sprites;
    for (var i = 0, length = sprites.length; i < length; i++) {
      sprites[i].drawOn(context);
    }
  };

  Stage.prototype.reset = function() {
    this.clearEffects();
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      sprites[i].clearEffects();
    }
    this.redraw();
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
    return this.name === name ? this : this.findSprite(name);
  };

  Stage.prototype.findSprite = function(name) {
    var sprites = this.sprites;
    for (var i = 0, l = sprites.length; i < l; i++) {
      if (sprites[i].name === name) return sprites[i];
    }
    return null;
  };

  Stage.prototype.toggleWatcher = function(array, target, force) {
    if (array[0] === 'contentsOfList:') {
      return this.toggleListWatcher(array[1], target, force);
    }
    return this.toggleValueWatcher(array[0], array[1], target, force);
  };

  Stage.prototype.toggleValueWatcher = function(kind, arg, target, force) {
    var info = Watcher.kinds[kind];
    if (info && (info.isGlobal || info.isSensor)) target = this;
    if (kind === 'readVariable' && !target.findLocal(arg)) {
      target = this;
      target.findOrCreateLocal(arg);
    }
    var watcher = this.findValueWatcher(kind, arg, target);
    if (watcher) {
      if (watcher.visible = force == null ? !watcher.visible : force) {
        this.bringToFront(watcher);
        watcher.update();
      }
      return watcher.visible;
    }
    if (force === false) return;
    watcher = new Watcher(target, kind, arg);
    watcher.moveTo(5, 5); // NS
    this.add(watcher);
    return true;
  };

  Stage.prototype.toggleListWatcher = function(name, target, force) {
    var list = target.findLocalList(name);
    if (!list) {
      target = this;
      list = target.findOrCreateLocalList(name);
    }
    var watcher = this.findListWatcher(name, target);
    if (watcher) {
      if (watcher.visible = force == null ? !watcher.visible : force) {
        this.bringToFront(watcher);
        watcher.update();
      }
      return watcher.visible;
    }
    watcher = new ListWatcher(target, list);
    watcher.moveTo(5, 5); // NS
    this.add(watcher);
    return true;
  };

  Stage.prototype.findWatcher = function(array, target) {
    if (array[0] === 'contentsOfList:') {
      return this.findListWatcher(array[1], target);
    }

    var info = Watcher.kinds[array[0]];
    if (info && (info.isGlobal || info.isSensor) ||
        array[0] === 'readVariable' && !target.findLocal(array[1])) {
      target = this;
    }
    return this.findValueWatcher(array[0], array[1], target);
  };

  Stage.prototype.findListWatcher = function(name, target) {
    if (!target.findLocalList(name)) target = this;
    var children = this.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.isListWatcher && c.list.name === name && c.target === target) return c;
    }
    return null;
  };

  Stage.prototype.findValueWatcher = function(kind, arg, target) {
    var children = this.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.isWatcher && c.kind === kind && c.arg === arg && c.target === target) return c;
    }
    return null;
  };

  Stage.prototype.removeWatcher = function(array, target) {
    var watcher = this.findWatcher(array, target);
    if (watcher) this.remove(watcher);
  };

  Stage.prototype.updateWatcher = function(array, target) {
    var watcher = this.findWatcher(array, target);
    if (watcher && watcher.visible) watcher.update();
  };

  Stage.prototype.updateWatchers = function(sensorOnly) {
    var children = this.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.update && c.visible && (!sensorOnly || c.isSensor)) c.update();
    }
  };

  Stage.prototype.updateWatcherLabels = function(target) {
    var children = this.children;
    for (var i = children.length; i--;) {
      var c = children[i];
      if (c.isWatcher && (!target || c.target === target)) c.updateLabel();
    }
  };

  Stage.prototype.uniqueSpriteName = function(base) {
    if (['_myself_', '_mouse_', '_edge_', '_stage_'].indexOf(base) !== -1) {
      base = base + '2';
    }
    return uniqueName(this.sprites, base);
  };
  Stage.prototype.uniqueSoundName = function(base) {
	    if (['_myself_', '_mouse_', '_edge_', '_stage_'].indexOf(base) !== -1) {
	      base = base + '2';
	    }
	    return uniqueName(this.sprites, base);
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


  function Watcher(target, kind, arg, hidden) {
    this.target = target;
    this.kind = kind;
    this.arg = arg;
    this.value = null;
    this._visible = true;
    this._mode = WatcherMode.normal;

    if (kind === 'readVariable') {
      this.variable = target.findLocal(arg);
      if (!this.variable) kind = 'undefined';
    }

    var info = Watcher.kinds[kind];
    this.color = info.color || Watcher.kinds.undefined.color;
    this.isSensor = info.isSensor;
    this.label = info.label || Watcher.kinds.undefined.label;
    this.read = info.read || Watcher.kinds.undefined.read;

    this.el = cl('watcher', [
      this.elLabel = cl('watcher-label'),
      this.elContents = cl('watcher-contents')
    ]);
    this.elContents.style.backgroundColor = this.color;

    this.updateLabel();
    if (hidden) {
      this.visible = false;
    } else {
      this.update();
    }
  }

  Watcher.prototype.updateLabel = function() {
    var label = typeof this.label === 'function' ? this.label() : this.label;
    this.elLabel.textContent = this.target.isStage ? label : this.target.name + ': ' + label;
  };

  Watcher.prototype.update = function() {
    var value = this.read();
    if (this.value === value) return;
    // debug:
    // console.log('update', this.target.name, this.kind, this.arg);
    this.value = value;
    if (typeof value === 'number' || ''+(+value) === value) {
      value = +value;
      if (Math.abs(value) < 1e10) value = Math.round(value * 1e6) / 1e6;
    }
    this.elContents.textContent = value === '' ? '\u200B' : value;
  };

  Watcher.prototype.objectFromPoint = function(x, y) {
    var bb = this.el.getBoundingClientRect();
    return x >= 0 && y >= 0 && x < bb.width && y < bb.height ? this : null;
  };

  def(Watcher.prototype, 'contextMenu', {get: function() {
    return new Menu().addAll([].concat([
      ['normal readout', this.modeSetter(WatcherMode.normal)],
      ['large readout', this.modeSetter(WatcherMode.large)],
      ['slider', this.modeSetter(WatcherMode.slider)]],
      this.mode === WatcherMode.slider ? [
        Menu.line,
        ['set slider min and max', this.chooseBounds]] : [], [
      Menu.line,
      ['hide', this.hide]])).withContext(this).translate();
  }});

  Watcher.prototype.modeSetter = function(n) {
    return function() {this.mode = n}.bind(this);
  };

  Watcher.prototype.hide = function() {
    this.visible = false;
  };

  Watcher.prototype.isWatcher = true;
  Watcher.prototype.moveTo = vis.util.moveTo;

  def(Watcher.prototype, 'mode', {
    get: function() {return this._mode},
    set: function(value) {
      if (this._mode !== value) {
        this._mode = value;
        this.el.className = 'watcher' + (
          value === WatcherMode.large ? ' large' :
          value === WatcherMode.slider ? ' slider' : '');
      }
    }
  });

  def(Watcher.prototype, 'visible', {
    get: function() {return this._visible},
    set: function(value) {
      if (this._visible !== value) {
        this._visible = value;
        this.el.style.visibility = value ? 'visible' : 'hidden';
      }
    }
  });

  Watcher.prototype.toJSON = function() {
    return {
      target: this.target.name,
      cmd: this.kind === 'readVariable' ? 'getVar:' : this.kind,
      param: this.arg,
      color: this.color,
      label: this.elLabel.textContent,
      mode: this.mode,
      sliderMin: undefined,
      sliderMax: undefined,
      isDiscrete: undefined,
      x: this.x,
      y: this.y,
      visible: this.visible
    };
  };

  Watcher.deserialize = function(stage, json) {
    var target = stage.findObject(json.target);
    return target && new Watcher(target, json.cmd === 'getVar:' ? 'readVariable' : json.cmd, json.param, !json.visible).fromJSON(json);
  };

  Watcher.prototype.fromJSON = function(json) {
    this.moveTo(+json.x || 0, +json.y || 0);
    this.sliderMin = +json.sliderMin || 0;
    this.sliderMax = json.sliderMin == null ? 100 : +json.sliderMin || 0;
    this.isDiscrete = json.isDiscrete == null || !!json.isDiscrete;
    this.mode = json.mode === WatcherMode.large || json.mode === WatcherMode.slider ? json.mode : WatcherMode.normal;
    // TODO
    return this;
  };

  var WatcherMode = {
    normal: 1,
    large: 2,
    slider: 3
  };

  Watcher.kinds = {
    answer: {
      isGlobal: true,
      color: getCategoryColor(7),
      label: 'answer'
    },
    backgroundIndex: {
      isGlobal: true,
      color: getCategoryColor(2),
      label: 'backdrop #',
      read: function() {
        return this.target.costume + 1;
      }
    },
    costumeIndex: {
      color: getCategoryColor(2),
      label: 'costume #',
      read: function() {
        return this.target.costume + 1;
      }
    },
    readVariable: {
      color: getCategoryColor(9),
      label: function() {
        return this.arg;
      },
      read: function() {
        return this.variable.value;
      }
    },
    heading: {
      color: getCategoryColor(1),
      label: 'direction',
      read: function() {
        return this.target.isSprite ? this.target.direction : 0;
      }
    },
    scale: {
      color: getCategoryColor(2),
      label: 'size',
      read: function() {
        return this.target.isSprite ? this.target.scale * 100 : 1;
      }
    },
    sceneName: {
      isGlobal: true,
      color: getCategoryColor(2),
      label: 'backdrop name',
      read: function() {
        var costume = this.target.costumes[this.target.costume];
        return costume ? costume.name : '';
      }
    },
    senseVideoMotion: {
      isSensor: true,
      color: getCategoryColor(7),
      label: function() {
        return _('video {type}', {type: this.arg});
      }
    },
    soundLevel: {
      isSensor: true,
      color: getCategoryColor(7),
      label: 'loudness'
    },
    tempo: {
      isGlobal: true,
      color: getCategoryColor(3),
      label: 'tempo',
      read: function() {
        return this.target.tempo;
      }
    },
    timeAndDate: {
      isSensor: true,
      color: getCategoryColor(7),
      label: function() {
        return _('current {time}', {time: this.arg});
      }
    },
    timer: {
      isSensor: true,
      color: getCategoryColor(7),
      label: 'timer',
      read: function() {
        return this.target.exec ? this.target.exec.getTimer().toFixed(1) : 0; // NS
      }
    },
    volume: {
    	isGlobal: true,
      color: getCategoryColor(3),
      label: 'volume',
      read: function() {
          return this.target.volume;
        }

    },
    xpos: {
      color: getCategoryColor(1),
      label: 'x position',
      read: function() {
        return this.target.isSprite ? this.target.x : 0;
      }
    },
    ypos: {
      color: getCategoryColor(1),
      label: 'y position',
      read: function() {
        return this.target.isSprite ? this.target.y : 0;
      }
    },
    undefined: {
      color: getCategoryColor(undefined),
      label: '???',
      read: function() {
        return '';
      }
    }
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
    this.editIndex = null;
    this.editor = null;

    this.updateCells = this.updateCells.bind(this);

    this.el = cl('list-watcher', [
      this.elLabel = cl('list-watcher-title'),
      this.elContents = cl('list-watcher-contents', [
        this.elFiller = cl('list-watcher-filler')
      ]),
      this.elEmpty = cl('list-watcher-empty', [_('(empty)')]),
      this.elLength = cl('list-watcher-length'),
      this.elAddButton = cl('button', 'list-watcher-add-button')
    ]);

    this.elAddButton.addEventListener('click', this.addItem.bind(this));
    this.elContents.addEventListener('scroll', this.scroll.bind(this));
    this.elContents.addEventListener('keydown', this.keyDown.bind(this));
    this.elContents.addEventListener('mousedown', this.mouseDown.bind(this));
    this.recoverScroll = this.recoverScroll.bind(this);

    this.elMeasure = cl('list-cell-contents list-cell-metrics', [
      this.measureNode = document.createTextNode('')
    ]);
    vis.util.metricsContainer.appendChild(this.elMeasure);

    this.updateIndexWidth(true);
    this.resizeTo(width || 100, height || 200);

    this.updateFiller();
    this.updateLabel();
    this.updateLength();

    this.lengthChanged = false;
    this.heightChanged = false;
    this.cellsChanged = false;
    this.indexChanged = null;
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
        if (value) setTimeout(this.recoverScroll);
      }
    }
  });

  ListWatcher.prototype.recoverScroll = function() {
    if (this.elContents.scrollTop !== this.scrollTop) {
      this.elContents.scrollTop = this.scrollTop;
    }
  };

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
        Dialog.prompt(_('Import List'), _('Which column do you want to import? (1-{count} or "all")?', {count: count}), '1', function(column) {
          var n = Math.round(+column) - 1;
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
    if (this.editor) this.editor.acceptEdit();
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
    this.measureNode.data = text + '\u200B';
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
    this.elEmpty.style.lineHeight = this.frameHeight+'px';

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

      var transform = 'translate('+w+'px,0)';
      var css = w+'px';

      var pool = this.cellPool;
      for (var i = pool.length; i--;) {
        var cell = pool[i];
        vis.util.setTransform(cell.elContents, transform);
        if (cell.elField) vis.util.setTransform(cell.elField, transform);
        cell.elIndex.style.width = css;
      }

      if (!quiet) this.updateCellWidth();
    }
  };

  ListWatcher.prototype.updateCellWidth = function() {
    // console.log('update cell width'); // debug
    this.cellWidth = this.width - 7 - this.indexWidth - vis.util.scrollbarWidth;
    var css = this.cellWidth+'px';
    this.elMeasure.style.width = css;
    this.measureCache = Object.create(null);

    var pool = this.cellPool;
    for (var i = pool.length; i--;) {
      var cell = pool[i];
      cell.elContents.style.width = css;
      if (cell.elField) cell.elField.style.width = css;
    }

    this.measureAll();
    this.updateCells();
  };

  ListWatcher.prototype.addItem = function(e) {
    var i = this.lastEditIndex;
    var length = this.list.contents.length;
    var j = i == null ? // NS for shift + add button
      (e.shiftKey ? 0 : length) :
      e.shiftKey ? i : Math.min(length, i + 1);
    this.list.contents.splice(j, 0, '');
    this.itemInserted(j);
    this.edit(j);
  };

  ListWatcher.prototype.moveTo = vis.util.moveTo;

  ListWatcher.prototype.updateLabel = function() {
    // console.log('update label'); // debug
    this.elLabel.textContent = this.target.isStage ? this.list.name : _('{object}: {name}', {object: this.target.name, name: this.list.name});
  };

  ListWatcher.prototype.updateLength = function(quiet) {
    if (ListWatcher.atomic) {
      this.lengthChanged = true;
      return;
    }
    // console.log('update length'); // debug
    this.elLength.textContent = _('length: {count}', {count: this.list.contents.length});
    this.updateIndexWidth(quiet);
  };

  ListWatcher.prototype.updateFiller = function() {
    if (ListWatcher.atomic) {
      this.heightChanged = true;
      return;
    }
    // console.log('update filler'); // debug
    this.elFiller.style.height = this.contentHeight + 'px';
  };

  ListWatcher.prototype.update = function() {
    if (!this.visible) return;
    if (this.lengthChanged) {
      this.updateLength();
      this.lengthChanged = false;
    }
    if (this.heightChanged) {
      this.updateFiller();
      this.heightChanged = false;
    }
    if (this.editIndex != null) {
      this.edit(this.editIndex);
    } else if (this.indexChanged) {
      this.scrollToIndex(this.indexChanged, true);
    } else if (this.cellsChanged) {
      this.updateCells();
    }
    this.indexChanged = this.cellsChanged = false;
  };

  ListWatcher.prototype.itemsCleared = function() {
    if (this.editor) {
      this.editor.acceptEdit();
    }
    this.cellHeights = [];
    this.accessTimes = [];
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
    this.accessTimes.push(0);
    this.contentHeight += h;
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(last);
  };

  ListWatcher.prototype.itemInserted = function(i) {
    var h = this.measure(this.list.contents[i]);
    this.cellHeights.splice(i, 0, h);
    this.accessTimes.splice(i, 0, 0);
    this.contentHeight += h;
    var ei = this.editIndex;
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(i);
    if (ei != null && ei >= i) {
      this.edit(ei + 1);
    }
  };

  ListWatcher.prototype.itemDeleted = function(i) {
    var heights = this.cellHeights;
    this.contentHeight -= heights[i];
    heights.splice(i, 1);
    this.accessTimes.splice(i, 1);
    var ei = this.editIndex;
    if (ei === i) {
      this.editor.acceptEdit();
    }
    this.updateLength();
    this.updateFiller();
    this.scrollToIndex(i === this.list.contents.length ? i - 1 : i);
    if (ei != null && ei > i) {
      this.edit(ei - 1);
    }
  };

  ListWatcher.prototype.itemChanged = function(i, quiet) {
    var heights = this.cellHeights;
    var oh = heights[i];
    var h = this.measure(this.list.contents[i]);
    if (h !== oh) {
      this.contentHeight += h - oh;
      heights[i] = h;
      this.updateFiller();
    }
    if (quiet) {
      this.updateCells();
    } else {
      this.scrollToIndex(i);
    }
  };

  ListWatcher.prototype.itemAccessed = function(i) {
    this.scrollToIndex(i);
  };

  ListWatcher.prototype.scrollToIndex = function(i, quiet) {
    if (ListWatcher.atomic) {
      this.indexChanged = i;
    } else {
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
    }
    if (!quiet) {
      this.accessTimes[i] = Date.now();
    }
    this.updateCells();
  };

  ListWatcher.prototype.scroll = function() {
    var top = this.elContents.scrollTop;
    if (this.scrollTop !== top) {
      this.scrollTop = top;
      this.updateCells();
    }
  };

  ListWatcher.prototype.keyDown = function(e) {
    if (e.metaKey || e.ctrlKey) return;
    var k = e.keyCode;
    if ((k === 9 || k === 38 || k === 40) && this.editIndex != null) {
      e.preventDefault();
      var length = this.list.contents.length;
      this.edit((this.editIndex + (k === 9 && e.shiftKey || k === 38 ? length - 1 : 1)) % length);
    }
    if (k === 13) {
      e.preventDefault();
      this.addItem(e);
    }
    e.stopPropagation();
  };

  ListWatcher.prototype.mouseDown = function(e) {
    if (e.button !== 0) return;
    var t = e.target;
    while (!t.classList.contains('list-cell')) {
      if (t === this.elContents || t.tagName === 'TEXTAREA') return;
      t = t.parentNode;
    }
    e.preventDefault();
    var pool = this.cellPool;
    for (var i = pool.length; i--;) {
      var cell = pool[i];
      if (cell.el === t) {
        this.edit(cell.index);
        return;
      }
    }
  };

  ListWatcher.prototype.edit = function(index) {
    if (this.editor) {
      this.editor.endEdit();
    }
    if (ListWatcher.atomic) {
      this.editIndex = index;
      return;
    }
    this.editIndex = this.lastEditIndex = index;
    this.scrollToIndex(index, true);
    this.editor = this.cellCache[index];
    this.editor.startEdit();
  };

  ListWatcher.prototype.updateCells = function() {
    if (ListWatcher.atomic) {
      this.cellsChanged = true;
      return;
    }
    var contents = this.list.contents;
    var length = contents.length;
    if (length === 0) {
      if (!this.showEmpty) {
        this.showEmpty = true;
        this.elEmpty.style.display = 'block';
      }
    } else if (this.showEmpty) {
      this.showEmpty = false;
      this.elEmpty.style.display = 'none';
    }

    var now = Date.now();
    this.animating = false;

    var top = this.scrollTop;
    var bottom = top + this.frameHeight;

    var heights = this.cellHeights;
    var accessTimes = this.accessTimes;

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

    this.editor = null;
    i = startIndex;
    y = startY;
    while (i < endIndex) {
      var cell = this.getCell(i, now - accessTimes[i], heights[i], contents[i]);
      cell.moveTo(0, y);
      if (cell.editing) this.editor = cell;
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
      if (c.editing) c.endEdit();
      c.el.style.display = 'none';
    }

    if (this.editor) {
      this.editor.elField.focus();
      this.elContents.scrollTop = this.scrollTop;
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
        cell.elContents.textContent = text+'\u200B';
        if (cell.editing) cell.elField.value = text;
      }
    } else {
      if (this.usablePool.length) {
        // this.pooledCells++; // debug
        var cell = this.usablePool.pop();
        if (cell.text !== text) {
          cell.text = text;
          cell.elContents.textContent = text+'\u200B';
          if (cell.editing) cell.elField.value = text;
        }
        if (cell.index != null) {
          this.cellCache[cell.index] = null;
        }
        if (cell.editing) {
          if (this.editIndex !== i) cell.endEdit();
        } else if (this.editIndex === i) {
          cell.startEdit();
        }
        cell.index = i;
        cell.elIndex.textContent = i + 1;
      } else {
        // this.allocatedCells++; // debug
        cell = new ListCell(this, i, height, text);
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
      if (cell.elField) cell.elField.style.height = (height + 1)+'px';
    }
    return cell;
  };


  function ListCell(watcher, index, height, text) {
    this.watcher = watcher;
    this.text = text;
    this.index = index;
    this.height = height;
    this.visible = true;
    this.dt = 800;

    this.el = cl('list-cell', [
      this.elIndex = cl('list-cell-index', {
        style: {lineHeight: (height + 1)+'px'}
      }, [''+(index + 1)]),
      this.elContents = cl('list-cell-contents', [text+'\u200B'])
    ]);
  }

  ListCell.prototype.startEdit = function() {
    this.editing = true;
    this.elContents.style.display = 'none';
    if (!this.elField) {
      this.el.appendChild(this.elField = cl('textarea', 'list-cell-contents'));
      this.elField.addEventListener('blur', this.acceptEdit.bind(this));
      this.elField.addEventListener('input', this.update.bind(this));
      this.elField.spellcheck = false;
      this.elField.style.height = (this.height + 1)+'px';
      this.elField.style.width = this.watcher.cellWidth+'px';
      this.elField.style.transform = this.elContents.style.transform;
    }
    this.elField.value = this.text;
    this.elField.style.display = 'block';
    this.elField.focus();
  };

  ListCell.prototype.update = function() {
    this.watcher.list.contents[this.index] = this.elField.value;
    this.watcher.itemChanged(this.index, true);
  };

  ListCell.prototype.endEdit = function() {
    if (this.editing) {
      this.editing = false;
      this.elField.style.display = 'none';
      this.elContents.style.display = 'block';
    }
  };

  ListCell.prototype.acceptEdit = function() {
    if (this.editing) {
      this.watcher.editIndex = null;
      this.watcher.editor = null;
      this.endEdit();
    }
  };

  ListCell.prototype.moveTo = vis.util.moveTo;


  function LocalBackpack() {}

  LocalBackpack.prototype.isBackpack = true;


  function Interpreter(stage, editor) {
    this.stage = stage;
    this.stage.exec = this;
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
    this.stage.reset();
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
      var result = this.evalBlock(script.blocks[0]);
      if (this.editor) {
        this.editor.showBubble(result, pos.x + script.width, pos.y);
      }
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
    if (this.editor) this.editor.stagePanel.running = !!this.threads.length;
    if (this.threads.length === 0) {
      this.stage.updateWatchers(true);
      return;
    }

    var maxTime = 1000 / this.frameRate * .2;

    this.redraw = false;
    this.start = Date.now();
    this.time = this.start;
    ListWatcher.atomic = true;
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
    ListWatcher.atomic = false;
    this.stage.updateWatchers();
    if (this.editor) {
      this.editor.updateInfo();
    }
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
    return typeof x === 'number' ? x : +x || 0;
  };

  Interpreter.prototype.barg = function(b, i) {
    var a = b.args[i];
    var x = a.isArg ? a.value : this.evalBlock(a);
    return !!x && x !== '0' && x !== 'false';
  };

  Interpreter.prototype.resetTimer = function() {
    this.timerStart = Date.now();
  };

  Interpreter.prototype.getTimer = function() {
    return (Date.now() - this.timerStart) / 1000;
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
      return typeof x !== 'string' ? +x : /\d/.test(x) ? +x : NaN;
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
        var other = interp.stage.findSprite(name);
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
        var other = interp.stage.findSprite(name);
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

    table['bounceOffEdge'] = function() {
        var sprite = interp.activeThread.target;
        if (sprite.isSprite) {
            var heading = sprite.isSprite ? sprite.direction : 0;
            if (sprite.x >= "240"|| sprite.x <= "-240"){
                heading = (360-heading) % 360;
            }
            if (sprite.y >= "180" || sprite.y <= "-180") {
                heading = (180-heading) % 360;
            }
            if (heading !== sprite.direction) {
                //console.log("bounce off edge. New heading "+heading+" Old heading "+sprite.direction);
                sprite.direction=heading;
            }
        }
     }
    
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
      if (target.visible) interp.redraw = true;
      if (typeof name !== 'number') {
        name = ''+name;
        for (var i = target.costumes.length; i--;) {
          if (target.costumes[i].name === name) {
            target.costume = i;
            return;
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
      target.setCostume(name - 1);
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
          var i = (n - 1) % count;
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
    };

    table['nextScene'] = function() {
      interp.stage.costume = (interp.stage.costume + 1) % interp.stage.costumes.length;
      interp.redraw = true;
    };

    table['changeGraphicEffect:by:'] = function(b) {
      var target = interp.activeThread.target;
      var name = interp.arg(b, 0);
      var v = target.effects[name];
      if (v == null) return;
      target.setEffect(name, v + interp.narg(b, 1));
      interp.redraw = true;
    };

    table['setGraphicEffect:to:'] = function(b) {
      var target = interp.activeThread.target;
      target.setEffect(interp.arg(b, 0), interp.narg(b, 1));
      interp.redraw = true;
    };

    table['filterReset'] = function() {
      interp.activeThread.target.clearEffects();
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
        interp.stage.bringToFront(sprite);
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

    table['playSound:'] = function(b) {
    	//console.log(b.args[0]._value);
    	if(audio){audio.pause();}
    	audio = new Audio('library/sounds/'+b.args[0]._value+'.mp3');
    	audio.volume = parseFloat(interp.stage.volume/100);
    	audio.play();
    };
    
    table['doPlaySoundAndWait'] = function(b) {
    	if(audio){audio.pause();}
    	audio = new Audio('library/sounds/'+b.args[0]._value+'.mp3');
    	audio.volume = parseFloat(interp.stage.volume/100);
    	audio.onplaying = function() {
        	console.log(audio.duration);
    	};
    	audio.play();
    };
    table['stopAllSounds'] = function(b) {
    	if(audio){audio.pause();}
    };
 
    table['playDrum'] = function(b) {
    	//console.log(b.args[0]._value);
    	//console.log(b.args[1]._value);
    	var drums =[
    			'soundbank/drums/SnareDrum(1)_22k.wav',
    			'soundbank/drums/BassDrum(1b)_22k.wav',
    			'soundbank/drums/SideStick(1)_22k.wav',
    			'soundbank/drums/Crash(2)_22k.wav',
    			'soundbank/drums/HiHatOpen(2)_22k.wav',
    			'soundbank/drums/HiHatClosed(1)_22k.wav',
    			'soundbank/drums/Tambourine(3)_22k.wav',
    			'soundbank/drums/Clap(1)_22k.wav',
    			'soundbank/drums/Claves(1)_22k.wav',
    			'soundbank/drums/WoodBlock(1)_22k.wav',
    			'soundbank/drums/Cowbell(3)_22k.wav',
    			'soundbank/drums/Triangle(1)_22k.wav',
    			'soundbank/drums/Bongo_22k.wav',
    			'soundbank/drums/Conga(1)_22k.wav',
    			'soundbank/drums/Cabasa(1)_22k.wav',
    			'soundbank/drums/GuiroShort(1)_22k.wav',
    			'soundbank/drums/Vibraslap(1)_22k.wav',
    			'soundbank/drums/Cuica(2)_22k.wav'
    	];
    	var fileName=drums[b.args[0]._value-1];
    	//console.log(fileName);
    	if(audio){audio.pause();}
    	audio = new Audio(fileName);
    	audio.volume = parseFloat(interp.stage.volume/100);
    	audio.play();
        if (interp.activeThread.tmp === null) {
            interp.startTimed(b.args[1]._value);
          } else {
            interp.stepTimed();
          }

    };
    
    table['rest:elapsed:from:'] = function(b) {};
    table['noteOn:duration:elapsed:from:'] = function(b) {};
    
    table['instrument:'] = function(b) {
    	//console.log(Instr.wavs.getOwnPropertyNames(interp.narg(b, 0)));
    	console.log(b.args[0]._value);
        //var keys = Object.keys(Instr.wavs)
        //console.log(Instr.wavs[keys[interp.narg(b, 0)]]);
    };
 
    table['changeVolumeBy:'] = function(b) {setVolume(interp.stage.volume + interp.narg(b, 0));};
    
    table['setVolumeTo:'] = function(b) {setVolume(interp.narg(b, 0));};
    
    function setVolume(percent){interp.stage.volume = Math.max(0, Math.min(100,percent));}
    
    table['volume'] = function() {return interp.stage.volume};
 
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
      v.value = +v.value + interp.narg(b, 1);
    };

    table['showVariable:'] = function(b) {
      interp.stage.toggleWatcher(['readVariable', ''+interp.arg(b, 0)], interp.activeThread.target, true);
    };

    table['hideVariable:'] = function(b) {
      interp.stage.toggleWatcher(['readVariable', ''+interp.arg(b, 0)], interp.activeThread.target, false);
    };

    function getListIndex(n, end) {
      if (!end) return -1;
      if (n === 'last') {
        return end - 1;
      }
      if (n === 'any' || n === 'random') {
        return Math.floor(Math.random() * end);
      }
      var i = +n;
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

    table['showList:'] = function(b) {
      interp.stage.toggleWatcher(['contentsOfList:', ''+interp.arg(b, 0)], interp.activeThread.target, true);
    };

    table['hideList:'] = function(b) {
      interp.stage.toggleWatcher(['contentsOfList:', ''+interp.arg(b, 0)], interp.activeThread.target, false);
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
      target = interp.stage.findSprite(target);
      return target ? sprite.isTouchingSprite(target) : false;
    };

    table['distanceTo:'] = function(b) {
      var sprite = interp.activeThread.target;
      if (!sprite.isSprite) return 10000;
      var target = interp.arg(b, 0);
      if (target === '_mouse_') {
        var x = interp.stage.mouseX;
        var y = interp.stage.mouseY;
      } else {
        target = interp.stage.findSprite(target);
        if (!target) return 10000;
        var x = target.x;
        var y = target.y;
      }
      var dx = sprite.x - x;
      var dy = sprite.y - y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    table['keyPressed:'] = function(b) {
      return !!interp.stage.keys[interp.arg(b, 0)];
    };

    table['mousePressed'] = function() {return interp.stage.mouseDown};
    table['mouseX'] = function() {return interp.stage.mouseX};
    table['mouseY'] = function() {return interp.stage.mouseY};

    table['timer'] = function() {
      return interp.getTimer();
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
      this.stack.push(new StackFrame);
    }
  };

  function StackFrame() {
    this.script = null;
    this.pc = null;
    this.tmp = null;
    this.isLoop = null;
    this.args = null;
  }


  function Editor() {
    if (location.hash.length > 1) {
      this.stage = this.getEmptyProject();
      var id = location.hash.slice(1).match(/\d+/)+'';
      Server.getProject(id, function(err, data) {
        if (err) {
          Dialog.alert(_('Error'), _('Could not fetch project from scratch.mit.edu.')).show(this);
          return;
        }
        this.installProject(Stage.deserialize(JSON.parse(data)));
        Server.getProjectMetadata(id, function(err, data) {
          if (data) {
            this.stage.title = data.title;
            this.stage.author = data.creator.username;
            this.stage.isPublic = true;
          } else {
            this.stage.title = _('Unshared Project ({id})', {id: id});
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
        console.log(localStorage.getItem('pixie project'));
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

    this.el = cl('editor Visual-no-select', [
      this.elTopButtons = cl('project-buttons', [
        this.elShareButton = cl('button', 'project-button', [_('Share')]),
        this.elFlipButton = cl('button', 'project-button flip', [
          el('i'),
          _('See project page')
        ])
      ]),
      this.topBar.el,
      this.tabPanel.el,
      this.spritePanel.el,
      this.backpackPanel.el,
      this.tipsPanel.el,
      this.stagePanel.el
    ]);

    this.tabPanel.scriptsPanel.category = 1;

    window.addEventListener('resize', this.resize.bind(this));
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
    stage.title = _('Untitled');
    return stage;
  };

  Editor.prototype.installProject = function(stage) {
    this.exec.installProject(stage);
    this.spritePanel.installProject(stage);
    this.stagePanel.installProject(stage);
    //this.soundsPanel.installProject(stage); //TODO ????
    this.stage = stage;
    stage.editor = this;
  };

  Editor.prototype.resize = function() {
    this.app.resize();
    this.stage.updatePixelRatio();
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
    if (this.checkName(name, local, _('New Variable'))) return;
    (local ? this.selectedSprite : this.stage).createLocal(name);
    this.toggleWatcher(['readVariable', name]);
    this.refreshPalette();
  };

  Editor.prototype.addList = function(name, local, cloud) {
    name = name.trim();
    if (!name) return;
    if (this.checkName(name, local, _('New List'))) return;
    (local ? this.selectedSprite : this.stage).lists.push(new List(name));
    this.toggleWatcher(['contentsOfList:', name]);
    this.refreshPalette();
  };

  Editor.prototype.checkName = function(name, local, title) {
    var old = this.findName(name, local);
    if (old) {
      Dialog.alert(title, _(old.isList ? 'A list with the name “{name}” already exists.' : 'A variable with the name “{name}” already exists.', {name: name})).show(this); // NS
    }
    return old;
  };

  Editor.prototype.findName = function(name, local) {
    var t = this.selectedSprite;
    return local && t.isSprite ? t.findVariable(name) || t.findList(name) : this.stage.findNestedLocal(name) || this.stage.findNestedLocalList(name);
  };

  Editor.prototype.removeVariable = function(name) {
    Dialog.confirm(_('Delete Variable'), _('Are you sure you want to delete “{name}”?', {name: name}), function(allow) { // NS
      if (!allow) return;
      this.removeWatcher(['readVariable', name]);
      if (this.selectedSprite.deleteVariable(name)) {
        this.refreshPalette();
      }
    }.bind(this)).show(this);
  };

  Editor.prototype.removeList = function(name) {
    Dialog.confirm(_('Delete List'), _('Are you sure you want to delete “{name}”?', {name: name}), function(allow) { // NS
      if (!allow) return;
      this.removeWatcher(['contentsOfList:', name]);
      if (this.selectedSprite.deleteList(name)) {
        this.refreshPalette();
      }
    }.bind(this)).show(this);
  };

  Editor.prototype.hasWatcher = function(array) {
    var watcher = this.findWatcher(array);
    return !!watcher && watcher.visible;
  };

  Editor.prototype.toggleWatcher = function(array, force) {
    return this.stage.toggleWatcher(array, this.selectedSprite, force);
  };

  Editor.prototype.removeWatcher = function(array) {
    return this.stage.removeWatcher(array, this.selectedSprite);
  };

  Editor.prototype.findWatcher = function(array) {
    return this.stage.findWatcher(array, this.selectedSprite);
  };

  Editor.prototype.updateInfo = function() {
    this.spritePanel.updateSpriteInfo();
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
    var name = new Dialog.Field(_(list ? 'List name:' : 'Variable name:'));
    var local = new Dialog.Radio(
      [_('For all sprites'), false],
      [_('For this sprite only'), true]);
    var cloud = new Dialog.CheckBox(_(list ? 'Cloud list (stored on server)' : 'Cloud variable (stored on server)'));
    local.setEnabled(1, this.selectedSprite.isSprite); // NS
    cloud.enabled = !list; // NS
    local.onchange = function() {
      cloud.enabled = !list && !local.value;
    };
    cloud.onchange = function() {
      local.setEnabled(1, this.selectedSprite.isSprite && !cloud.value);
    }.bind(this);
    var d = new Dialog(_(list ? 'New List' : 'New Variable'), Dialog.content(
      name.el,
      local.el,
      Dialog.line(),
      cloud.el,
      Dialog.buttons(
        [_('OK'), function() {d.commit()}],
        [_('Cancel'), function() {d.hide()}])));

    d.oncommit = function() {
      if (list) {
        this.addList(name.value, local.value, cloud.value);
      } else {
        this.addVariable(name.value, local.value, cloud.value);
      }
    }.bind(this);
    d.show(this);
  };

  Editor.prototype.newBlock = function() {
    var d = new Dialog(_('New Block'), Dialog.content(
      Dialog.buttons(
        [_('OK'), function() {d.commit()}],
        [_('Cancel'), function() {d.hide()}])));
    d.oncommit = function() {
      // TODO
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
    var canvas = cl('canvas', 'Visual-absolute bubble');
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
    this.isSmallStage = !this.isSmallStage;
    this.el.classList.toggle('small-stage', this.isSmallStage);
    setTimeout(this.resize, 200);
  };

  Editor.prototype.toggleTurbo = function() {
    this.exec.turbo = !this.exec.turbo;
    this.el.classList.toggle('turbo', this.exec.turbo);
  };

  Editor.prototype.showCostumes = function() {
    this.tabPanel.panel = this.tabPanel.costumesPanel;
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
      ['Turbo mode', this.toggleTurbo, {checked: this.exec.turbo}]).translate().withContext(this);
  };


  function ScriptsPanel(editor) {
    this.editor = editor;

    this.el = cl('scripts-panel', [
      this.elButtons = cl('palette-buttons'),
      this.elPalette = cl('palette-contents'),
      this.elWorkspace = cl('editor-workspace')
    ]);
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

      var b = cl('button', 'palette-button', {value: id}, [
        el('div', {style: {color: cat[2]}}, [
          el('strong', [_(cat[1])])
        ])
      ]);
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
      value = +value;
      this._category = value;

      if (this.categoryButton) {
        this.categoryButton.classList.remove('selected');
      }
      this.categoryButton = this.buttons[value];
      this.categoryButton.classList.add('selected');

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
    (palettes[this._category] || []).forEach(this.append, this);

    if (!resetScroll) {
      this.palette.scrollTo(sx, sy);
    }
  };

  ScriptsPanel.prototype.append = function(t) {
    if (t.if) {
      ((this.appendCondition(t.if) ? t.then : t.else) || []).forEach(this.append, this);
      return;
    }
    if (t.action) {
      var editor = this.editor;
      var button = cl('button', 'ui-button', [_(t.text)]);
      if (editor[t.action]) button.addEventListener('click', editor[t.action].bind(editor));
      return this.palette.add(Palette.element(button, 0, 26));
    }
    if (t.text) {
      var div = cl('palette-label', [_(t.text)]);
      return this.palette.add(Palette.element(div, 0, 14));
    }
    if (t.watcher) {
      var b = t.watcher;
      if (!Array.isArray(b)) b = [b];
      var checked = this.editor.hasWatcher(b);
      var button = cl('button', 'check-box'+(checked ? ' checked' : ''));
      button.addEventListener('click', function() {
        checked = this.editor.toggleWatcher(b);
        button.classList.toggle('checked', !!checked);
      }.bind(this));
      this.palette.add(Palette.inline(button, 13, 12));
      return this.append(b);
    }
    if (t === '==') {
      return this.palette.add(Palette.element(cl('palette-separator'), 0, 2));
    }
    if (t === '--' || t === '---') {
      return this.palette.add(Palette.space(t.length * 10 - 5));
    }
    if (t.all) {
      return (this.appendAll(t.all) || []).forEach(this.append, this);
    }
    if (!Array.isArray(t)) {
      t = [t];
    }
    var script = new Script().add(new Block(t[0], t.slice(1).map(this.appendArg, this)));
    if (!this.editor.exec.table[t[0]]) script.addEffect(script.outline.bind(script, 2, '#faa'));
    this.palette.add(script);
  };

  ScriptsPanel.prototype.appendArg = function(arg) {
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
      if (arg.first === 'attribute' || arg.first === 'otherSprite') {
        var sprites = this.editor.stage.sprites;
        var sprite = this.editor.stage;
        if (sprites.length) {
          if (sprites[0] !== this.editor.selectedSprite) {
            sprite = sprites[0];
          } else if (sprites.length > 1) {
            sprite = sprites[1];
          }
        }
        return arg.first === 'attribute' ? sprite.isStage ? 'backdrop #' : 'x position' : sprite.isStage ? '_stage_' : sprite.name;
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

  ScriptsPanel.prototype.appendCondition = function(condition) {
    var stage = this.editor.stage;
    var sprite = this.editor.selectedSprite;
    switch (condition) {
      case 'variables': return stage.variables.length || sprite.variables.length;
      case 'lists': return stage.lists.length || sprite.lists.length;
      case 'stage': return sprite.isStage;
      case 'sprite': return sprite.isSprite;
    }
  };

  ScriptsPanel.prototype.appendAll = function(all) {
    function getter(get) {
      return function(name) {return {watcher: [get, name]}};
    }

    function collection(key, make) { // NS
      var stagec = stage[key].map(getName).sort().map(make);
      var spritec = sprite.isStage ? [] : sprite[key].map(getName).sort().map(make);
      return stagec.concat(stagec.length && spritec.length ? '==' : [], spritec);
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

    this.imageEditor = new ImageEditor(this);

    this.el = cl('costumes-panel', [
      this.elNewLabel = cl('costume-new-label'),
      this.elNewGroup = cl('costume-new-group', [
        this.elLibraryButton = this.makeNewButton('new-library', _('Choose costume from library'), this.newFromLibrary),
        this.elPaintButton = this.makeNewButton('new-paint', _('Paint new costume'), this.newFromEditor),
        this.elImportButton = this.makeNewButton('new-import', _('Upload costume from file'), this.newFromFile, 'image/*'),
        this.elCameraButton = this.makeNewButton('new-camera', _('New costume from camera'), this.newFromCamera)
      ]),
      this.elList = cl('costume-list'),
      this.imageEditor.el
    ]);
  }

  CostumesPanel.prototype.makeNewButton = function(name, title, fn, file, multiple) {
    var button = cl(file ? 'div' : 'button', 'new-button '+name, {title: title});
    if (file) {
      var form = cl('form', 'new-button-form');
      var input = cl('input', 'new-button-input', {
        type: 'file',
        title: title
      });
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
    return button;
  };

  CostumesPanel.prototype.showSprite = function(sprite) {
    this.sprite = sprite;
    this.elNewLabel.textContent = sprite.isSprite ? _('New costume:') : _('New backdrop:');
    this.elLibraryButton.classList.toggle('new-backdrop-library', sprite.isStage);
    this.elLibraryButton.title = sprite.isSprite ? _('Choose costume from library') : _('Choose backdrop from library');
    this.elPaintButton.title = sprite.isSprite ? _('Paint new costume') : _('Paint new backdrop');
    this.elImportButton.title = sprite.isSprite ? _('Upload costume from file') : _('Upload backdrop from file');
    this.elCameraButton.title = sprite.isSprite ? _('New costume from camera') : _('New backdrop from camera');
    this.updateList();
  };

  CostumesPanel.prototype.updateList = function() {
    while (this.elList.firstChild) this.elList.removeChild(this.elList.lastChild);
    if (this.parent) {
      this.icons.forEach(function(icon) {
        //this.parent.remove(icon); //why?
      });
    }
    this.icons = this.sprite.costumes.map(function(c) {
      var icon = new CostumeIcon(this, c);
      this.elList.appendChild(icon.el);
      if (this.parent) {
        this.parent.add(icon);
        icon.resize();
      }
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
      scrollIntoView(icon.el, this.elList);
      this.imageEditor.costume = icon.costume;
      this.sprite.costume = icon.index;
      if (this.sprite.isStage) {
        this.sprite.updateWatcher(['sceneName'], this.sprite);
        this.sprite.updateWatcher(['backgroundIndex'], this.sprite);
      } else {
        this.sprite.stage.updateWatcher(['costumeIndex'], this.sprite);
      }
      this.sprite.redraw();
    }
  };

  CostumesPanel.prototype.newFromEditor = function(file) {
    this.addCostume(this.sprite.makeEmptyCostume());
  };

	CostumesPanel.prototype.newFromLibrary = function(file) {
		var arrValues;
		if (this.sprite.isSprite) {
			arrValues = showModalDialog("library/sprite/costumeLibrary.html","","center=yes;dialogWidth=1024;dialogHeight=768; resizable: Yes; status: Yes; scroll:yes");
		} else {
			arrValues = showModalDialog("library/backdrop/backdropLibrary.html","","center=yes;dialogWidth=1024;dialogHeight=768; resizable: Yes; status: Yes; scroll:yes");
		}
		if(arrValues)
		{
			var image = document.createElement('img');
			image.src = arrValues[0]; 
			//this.addCostume(Costume.centered(arrValues[1], image));
			this.addCostume(new Costume(arrValues[1], arrValues[0]));
		}
	};

  CostumesPanel.prototype.newFromCamera = function() {
    Dialog.camera(function(image) {
      this.addCostume(Costume.centered('photo1', image));
    }, this).show(this.editor);
  };

  CostumesPanel.prototype.newFromFile = function(file) {
    IO.readImageFile(file, function(err, image) {
      if (err) return;
      this.addCostume(Costume.centered(stripExtension(file.name), image));
    }, this);
  };

  CostumesPanel.prototype.addCostume = function(c) {
    this.sprite.addCostume(c);
    var icon = new CostumeIcon(this, c);
    this.elList.appendChild(icon.el);
    if (this.icons.length === 1) {
      this.icons[0].enableDelete();
    }
    if (this.parent) {
      this.parent.add(icon);
      icon.resize();
    }
    this.icons.push(icon);
    this.select(icon);
  };

  CostumesPanel.prototype.removeIcon = function(icon) {
    this.sprite.removeCostume(icon.costume);
    if (this.parent) {
      this.parent.remove(icon);
    }
    var i = this.icons.indexOf(icon);
    if (i === -1) return;
    for (var j = this.icons.length; j-- > i;) {
      this.icons[j].updateIndex();
    }
    this.icons.splice(i, 1);
    this.elList.removeChild(icon.el);
    this.select(this.icons[i] || this.icons[i - 1]);
    if (this.icons.length === 1) {
      this.icons[0].disableDelete();
    }
  };

  CostumesPanel.prototype.install = function(parent) {
    parent.add(this.imageEditor);
    this.icons.forEach(function(icon) {
      parent.add(icon);
    });
  };

  CostumesPanel.prototype.uninstall = function(parent) {
    parent.remove(this.imageEditor);
    this.icons.forEach(function(icon) {
      parent.remove(icon);
    });
  };

  function CostumeIcon(costumesPanel, costume) {
    this.costumesPanel = costumesPanel;
    this.sprite = costumesPanel.editor.selectedSprite;
    this.costume = costume;

    this.el = cl('costume-icon', {draggable: true}, [
      this.elThumbnail = cl('canvas', 'costume-thumbnail'),
      this.elNumber = cl('costume-number'),
      this.elName = cl('costume-name'),
      this.elInfo = cl('costume-info'),
      this.elDelete = cl('button', 'costume-delete')
    ]);

    this.context = this.elThumbnail.getContext('2d');
    this.el.addEventListener('click', this.click.bind(this));
    this.elDelete.addEventListener('click', this.deleteCostume.bind(this));

    this.updateIndex();
    this.updateName();
    this.resize();

    if (costume === this.sprite.costumes[this.sprite.costume]) {
      costumesPanel.select(this);
    }
    if (this.sprite.costumes.length === 1) this.disableDelete();
  }

  CostumeIcon.prototype.select = function() {
    this.el.classList.add('selected');
  };

  CostumeIcon.prototype.deselect = function() {
    this.el.classList.remove('selected');
  };

  CostumeIcon.prototype.click = function() {
    this.costumesPanel.select(this);
  };

  CostumeIcon.prototype.deleteCostume = function(e) {
    e.stopPropagation();
    this.costumesPanel.removeIcon(this);
  };

  CostumeIcon.prototype.enableDelete = function() {
    this.elDelete.style.display = '';
  };

  CostumeIcon.prototype.disableDelete = function() {
    this.elDelete.style.display = 'none';
  };

  CostumeIcon.prototype.updateIndex = function() {
    this.index = this.sprite.costumes.indexOf(this.costume);
    this.elNumber.textContent = this.index + 1;
  };

  CostumeIcon.prototype.updateName = function() {
    this.elName.textContent = this.elName.title = this.costume.name;
  };

  CostumeIcon.prototype.updateInfo = function() {
    this.elInfo.textContent = (this.costume.width | 0) + '\xd7' + (this.costume.height | 0);
  };

  CostumeIcon.prototype.updateThumbnail = function() {
    this.updateInfo();
    var tw = this.elThumbnail.width;
    var th = this.elThumbnail.height;
    if (!this.costume.loaded) return;
    var source = this.costume.baseLayerTexture.baseTexture.source;
    var iw = source.width;
    var ih = source.height;
    this.context.clearRect(0, 0, tw, th);
    if (!iw || !ih) return;
    var s = Math.min(this.scale, tw / iw, th / ih);
    var sw = s * iw;
    var sh = s * ih;
    this.context.drawImage(source, (tw - sw) / 2, (th - sh) / 2, sw, sh);
  };

  CostumeIcon.prototype.resize = function() {
    this.scale = window.devicePixelRatio || 1;
    this.elThumbnail.width = this.scale * 68;
    this.elThumbnail.height = this.scale * 51;
    this.updateThumbnail();
  };


  function ImageEditor() {
    this.canvas = el('canvas');
    this.context = this.canvas.getContext('2d');
    this.toolButtons = {};

    var grad = 'linear-gradient(45deg, #e8e8e8 25%, transparent 25.5%, transparent 74.5%, #e8e8e8 75%)';

    this.el = cl('image-editor', [
      this.elCanvas = cl('image-editor-canvas', [
        this.elCanvasGrid = cl('image-editor-canvas-layer', {
          style: {
            backgroundColor: '#fff',
            backgroundImage: grad+', '+grad
          }
        }),
        this.elBitmap = cl('canvas', 'image-editor-canvas-layer'),
        this.elCursor = cl('canvas', 'image-editor-canvas-layer'),
        this.elCanvasScroll = cl('image-editor-canvas-scroll', [
          this.elCanvasFill = cl('image-editor-canvas-fill')
        ])
      ]),
      this.elSettings = cl('image-editor-settings', [
        this.elZoom = cl('image-editor-zoom', [
          this.elZoomOut = cl('button', 'zoom-button zoom-out'),
          this.elZoomDefault = cl('button', 'zoom-button zoom-default'),
          this.elZoomIn = cl('button', 'zoom-button zoom-in')
        ]),
        this.elZoomLabel = cl('image-editor-zoom-label'),
        this.elColorPicker = cl('color-picker', [
          this.elSwatchButton = cl('button', 'color-picker-swatch-button wheel'),
          this.elColors = cl('color-picker-colors', [
            this.elBackground = cl('color-picker-color background'),
            this.elForeground = cl('color-picker-color foreground')
          ]),
          this.toolButtons.eyedropper =
          this.elEyedropperButton = cl('button', 'color-picker-eyedropper', {
            title: _('Pick up color')
          }),
          this.elPalette = cl('color-picker-palette')
        ])
      ]),
      this.elBitmapTools = cl('bitmap-tools', [
        this.addBitmapTool('brush', _('Brush')),
        this.addBitmapTool('line', _('Line')),
        this.addBitmapTool('rectangle', _('Rectangle (Shift: Square)')),
        this.addBitmapTool('ellipse', _('Ellipse (Shift: Circle)')),
        this.addBitmapTool('text', _('Text')),
        this.addBitmapTool('fill', _('Fill with color')),
        this.addBitmapTool('erase', _('Erase')),
        this.addBitmapTool('select', _('Select')),
        this.addBitmapTool('duplicate', _('Select and duplicate'))
      ])
    ]);

    this.brushCanvas = el('canvas', {
      width: 480 * 2,
      height: 360 * 2
    });
    this.bitmapContext = this.elBitmap.getContext('2d');
    this.cursorContext = this.elCursor.getContext('2d');
    this.brushContext = this.brushCanvas.getContext('2d');

    this.elCanvasScroll.addEventListener('scroll', this.updateScroll.bind(this));
    this.elCanvasScroll.addEventListener('mousedown', this.mouseDown.bind(this));

    this.elZoomOut.addEventListener('click', this.zoomOut.bind(this));
    this.elZoomDefault.addEventListener('click', this.zoomDefault.bind(this));
    this.elZoomIn.addEventListener('click', this.zoomIn.bind(this));

    this.elEyedropperButton.addEventListener('mousedown', this.setTool.bind(this, 'eyedropper'));
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
    var b = cl('button', 'bitmap-tool bitmap-tool-'+name, {title: title});
    b.addEventListener('mousedown', this.setTool.bind(this, name));
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
    var b = cl('color-picker-palette-color', {style: {backgroundColor: color}});
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
    this.elCanvasGrid.style.backgroundSize = size * 2+'px '+size * 2+'px';
    this.elCanvasGrid.style.backgroundPosition = '0 0,'+size+'px '+size+'px';
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
//***************************Sounds Panel*********************************************************************

	function SoundsPanel(editor) {
		this.editor = editor;
		this.stageIcon = new SpriteIcon(this, editor.stage);
		this.icons = [];
		this.infoVisible = false;
		this.el = cl('sounds-panel', [
			this.elNewLabel = cl('sound-new-label'),
			this.elNewGroup = cl('sound-new-group', [
				this.elLibraryButton = this.makeNewButton('new-library', _('Choose sound from library'), this.newFromLibrary),
				this.elImportButton = this.makeNewButton('new-import', _('Upload sound from file'), this.newFromFile, 'image/*')
			]),
			this.elList = cl('sound-list'),
			this.elSoundsSection = cl('sounds-section'),
			this.elSoundsInfo = cl('sounds-info', [
				this.elSoundsInfoBack = cl('sounds-info-back'),
				this.elSoundsName = cl('input', 'sounds-info-name')
			])
		]);
		this.elSoundsInfoBack.addEventListener('click', this.hideInfo.bind(this));
	}
	
	SoundsPanel.prototype.makeNewButton = function(name, title, fn, file, multiple) {
		var button = cl(file ? 'div' : 'button', 'new-button '+name, {title: title});
		if (file) {
			var form = cl('form', 'new-button-form');
			var input = cl('input', 'new-button-input', {
				type: 'file',
				title: title
			});
			if (typeof file === 'string') {input.accept = file;}
			if (multiple) {input.multiple = true;}
			form.appendChild(input);
			button.appendChild(form);
			var self = this;
			if (fn) input.addEventListener('change', function() {
				fn.call(self, multiple ? slice.call(input.files) : input.files[0]);
				form.reset();
			});
		} else {
			if (fn) {button.addEventListener('click', fn.bind(this));}
		}
		return button;
	};
	
	SoundsPanel.prototype.showSprite = function(sound) {
		console.log('show sprite in sounds panel?');
	};
	
	SoundsPanel.prototype.updateList = function() {
		console.log("SoundsPanel.prototype.updateList missing");
	};
	
	SoundsPanel.prototype.iconFor = function(Sound) {
		console.log("SoundsPanel.prototype.iconFor missing");
	};
	
	SoundsPanel.prototype.select = function(icon) {
		console.log("SoundsPanel.prototype.select missing");
	};
	
	SoundsPanel.prototype.newFromEditor = function(file) {
		console.log("SoundsPanel.prototype.newFromEditor missing");
	};
	
	SoundsPanel.prototype.newFromLibrary = function() {
		var arrValues;
		arrValues = showModalDialog("library/sounds/soundLibrary.html","","center=yes;dialogWidth=1024;dialogHeight=768; resizable: Yes; status: Yes; scroll:yes");
		if(arrValues) {
			var image = document.createElement('img');
			image.src = "assets/speakericon.png"; //arrValues[0]; contains path and filename
			//TODO create buffer for sound
			var soundBuffer = 'library/sounds/'+arrValues[0];
			this.addSound(Sound.centered(arrValues[1], image), soundBuffer,arrValues[1]);
		}
	};
	
	SoundsPanel.prototype.newFromCamera = function() {
		console.log("SoundsPanel.prototype.newFromCamera missing");
	};
	
	SoundsPanel.prototype.newFromFile = function(file) {
		IO.readSoundFile(file, function(err, sound) {
			if (err) {return;}
			console.log("Sounds panel newFromFile not implemented");
			var soundBuffer;
			this.addSound(Sound.centered(stripExtension(file.name), sound), soundBuffer);
		}, this);
	};
	
	SoundsPanel.prototype.addSound = function(c, soundBuffer,soundName) {
		//this.sprite.addSound(c);
		console.log(this);
		var icon = new SoundIcon(this, c, soundBuffer);
		icon.name = soundName;
		this.icons.push(icon);
		this.elList.appendChild(icon.el);
		if (parseInt(this.icons.length) === 1) {
			this.icons[0].enableDelete();
		}
		//console.log(this.parent);
		if (this.parent) {
			this.parent.add(icon);
			icon.resize();
		}
		//this.icons.push(icon);
		this.select(icon);
	};
	
	SoundsPanel.prototype.removeIcon = function(icon) {
		console.log("SoundsPanel.prototype.removeIcon missing");
	};
	
	SoundsPanel.prototype.install = function(parent) {
		//console.log("SoundsPanel.prototype.install missing");
	    //parent.add(this.imageEditor);
	    this.icons.forEach(function(icon) {
	      parent.add(icon);
	    });
	};
	
	SoundsPanel.prototype.uninstall = function(parent) {
		console.log("SoundsPanel.prototype.uninstall missing");
	};
	
	function SoundIcon(soundsPanel, sound, soundBuffer) {
		this.soundsPanel = soundsPanel;
		this.editor = soundsPanel.editor;
		this.sprite = soundsPanel.editor.selectedSprite;
		this.sound = sound;
		this.soundBuffer = soundBuffer;
	    this.elTmp = el('canvas');
		this.el = cl('sound-icon', {draggable: true}, [
			this.elThumbnail = cl('canvas', 'sound-thumbnail'),
			this.elNumber = cl('sounds-number'),
			this.elName = cl('sounds-name'),
			this.elInfo = cl('sounds-info'),
			this.elDelete = cl('button', 'sound-delete')
		]);
	    this.tmpContext = this.elTmp.getContext('2d');
		this.context = this.elThumbnail.getContext('2d');
		this.el.addEventListener('click', this.click.bind(this));
		this.elDelete.addEventListener('click', this.deleteSound.bind(this));
		this.updateIndex();
		this.updateName();
		this.resize();
		if (sound === this.sprite.sounds[this.sprite.sound]) {
			soundsPanel.select(this);
		}
		if (this.sprite.sounds.length === 1) {this.disableDelete();}
/*			    this.panel = panel;
			    this.editor = panel.editor;
			    this.sound = sound;

			    this.el = cl('sound-icon', [
			      this.elThumbnail = cl('canvas', 'sound-thumbnail'),
			      this.elName = cl('sound-icon-label')
			    ]);
			    this.elTmp = el('canvas');

			    this.context = this.elThumbnail.getContext('2d');
			    this.tmpContext = this.elTmp.getContext('2d');

			    if (sound.isStage) {
			      this.el.classList.add('for-stage');
			      this.el.appendChild(this.elInfo = cl('sound-icon-info'));
			      this.updateInfo();
			    } else {
			      this.el.appendChild(this.elButton = cl('button', 'sound-icon-button'));
			      this.elButton.addEventListener('click', function() {
			        this.panel.showInfo();
			      }.bind(this));
			    }

			    this.el.addEventListener('click', function() {
			      this.panel.select(this);
			    }.bind(this));

			    this.resize();
			    this.updateName();
			    //setInterval(this.update.bind(this), 200);*/
	}
	
	SoundsPanel.prototype.addIcon = function(sprite, soundBuffer) {
		console.log("add icon");
		var icon = new SoundIcon(this, sprite, soundBuffer);
		this.icons.push(icon);
		this.elSoundsSection.appendChild(icon.el);
		if (this.parent) {
			this.parent.add(icon);
			icon.resize();
		}
		return icon;
	};
	
	SoundsPanel.prototype.select = function(icon) {
		if (this.selectedIcon === icon) return;
		if (this.selectedIcon) {
			this.selectedIcon.el.classList.remove('selected');
		}
		if (this.selectedIcon = icon) {
			icon.el.classList.add('selected');
		}
		var tbb = this.elSoundsSection.getBoundingClientRect();
		var ibb = icon.el.getBoundingClientRect();
		var t = ibb.top - 3;
		var b = ibb.bottom + 3;
		if (t < tbb.top) {this.elSoundsSection.scrollTop += t - tbb.top;}
		else if (b > tbb.bottom) {this.elSoundsSection.scrollTop += b - tbb.bottom;}
		this.editor.selectedSprite = icon.sprite;
		//this.editor.tabPanel.showSound(icon.sprite);
		return this;
	};
	
	SoundsPanel.prototype.soundNameKeyDown = function(e) {
		if (e.metaKey || e.ctrlKey) return;
		if (e.keyCode === 27) {
			this.resetSoundName();
			e.preventDefault();
		}
		if (e.keyCode === 13) {
			this.renameSound();
			e.preventDefault();
		}
		e.stopPropagation();
	};
	
	SoundsPanel.prototype.showInfo = function() {
		this.infoVisible = true;
		this.elSoundsInfo.style.display = 'block';
		this.resetSoundName();
		this.updateSoundsInfo();
	};

	SoundsPanel.prototype.hideInfo = function() {
		this.infoVisible = false;
		this.elSoundsInfo.style.display = 'none';
	};

	SoundsPanel.prototype.resetSoundName = function() {
		this.elSoundsName.value = this.editor.selectedSound.name;
	};

	SoundsPanel.prototype.renameSound = function() {
		var sound = this.editor.selectedSound;
		var oldName = sound.name;
		sound.name = null;
		var newName = sound.stage.uniqueSoundName(this.elSoundsName.value.trim());
		if (oldName === newName || !newName) {
			sound.name = oldName;
			this.resetSoundName();
			return;
		}
		sound.name = newName;
		this.resetSoundName();
		var icon = this.findIcon(sound);
		if (icon) icon.updateName();
		sound.stage.updateWatcherLabels(sound);
		// TODO change name in scripts
	};
	
	SoundIcon.prototype.deselect = function() {
		console.log("SoundIcon.prototype.deselect missing");
	};
	
	SoundIcon.prototype.click = function() {
		var audio;
		this.soundPanel.select(this);
		console.log(this.soundBuffer);
		audio = new Audio(this.soundBuffer);
		audio.play();
	};
	
	SoundIcon.prototype.deleteSound = function(e) {
		console.log("SoundIcon.prototype.deleteSound missing");
	};
	
	SoundIcon.prototype.enableDelete = function() {
		this.elDelete.style.display = 'block';
	};
	
	SoundIcon.prototype.disableDelete = function() {
		this.elDelete.style.display = 'none';
	};
	
	SoundIcon.prototype.updateIndex = function() {
	    this.index = this.sprite.sounds.indexOf(this.sound);
		this.elNumber.textContent = this.index + 1;
	};
	
	SoundIcon.prototype.updateName = function() {
		this.elName.textContent = this.elName.title = this.sound.name;
	};
	
	SoundIcon.prototype.updateInfo = function() {
		console.log("SoundIcon.prototype.updateInfo missing");
	};
	
	SoundIcon.prototype.updateThumbnail = function() {
		console.log("SoundIcon.prototype.updateThumbnail missing");
		/*
		this.updateInfo();
		var tw = this.elThumbnail.width;
		var th = this.elThumbnail.height;
		if (!this.costume.loaded) return;
		var source = this.sound.baseLayerTexture.baseTexture.source;
		var iw = source.width;
		var ih = source.height;
		this.context.clearRect(0, 0, tw, th);
		if (!iw || !ih) return;
		var s = Math.min(this.scale, tw / iw, th / ih);
		var sw = s * iw;
		var sh = s * ih;
		this.context.drawImage(source, (tw - sw) / 2, (th - sh) / 2, sw, sh);
		*/
	};
	
	SoundIcon.prototype.resize = function() {
		this.scale = window.devicePixelRatio || 1;
		this.elThumbnail.width = this.elTmp.width = this.scale * (68 + 4);
		this.elThumbnail.height = this.elTmp.height = this.scale * (51 + 4);
		this.update();
	};
	
	SoundIcon.prototype.update = function() {
		if (this.sprite.isStage) this.updateInfo();
		var costume = this.sound; //sprite.sounds[this.sprite.sound];
		//if (costume === this.costume) return;
		//this.costume = costume && costume.loaded;

		var w = this.elThumbnail.width;
		var h = this.elThumbnail.height;
		this.context.clearRect(0, 0, w, h);
		//if (!costume || !costume.loaded) return;
		var source = costume.baseLayerTexture.baseTexture.source;
		var cw = source.width;
		var ch = source.height;
		var scale = Math.min(this.scale, (w - 4) / cw, (h - 4) / ch);
		var aw = scale * cw;
		var ah = scale * ch;
		var x = (w - aw)/2;
		var y = (h - ah)/2;
		this.elTmp.width = this.elTmp.width;
		this.tmpContext.drawImage(source, x, y, aw, ah);
		this.context.shadowBlur = 1.5 * this.scale;
		this.context.shadowColor = 'rgba(0, 0, 0, .5)';
		this.context.drawImage(this.elTmp, 0, 0);
	};

	SoundIcon.prototype.showSound = function() {
		console.log("show sound icon");
		//if (this.sound.isSprite) {
			this.sprite.visible = true;
			this.sprite.stage.redraw();
		//}
	};

	Sound.prototype.updateSize = function() {
		this.loaded = true;
		this.width = this.baseLayerTexture.width * this.scale;
		this.height = this.baseLayerTexture.height * this.scale;
		this.changed();
	};
	
	SoundsPanel.prototype.emptySound = function() {
		return new Sound(this.editor.stage.uniqueSoundName(_('Sound1')));
	};
	
	Sound.centered = function(name, image) {
		return new Sound(name, image, image.width / 2 | 0, image.height / 2 | 0);
	};

	function Sound(name, baseLayer, cx, cy, pixelRatio, textLayer) {
		this.baseLayerMD5 = null;
		if (typeof baseLayer === 'string') { // MD5
			this.baseLayerMD5 = baseLayer;
			this.baseLayerTexture = PIXI.Texture.fromImage(Server.getAssetURL(baseLayer), true, PIXI.scaleModes.LINEAR);
		} else if (baseLayer) {
			this.baseLayerTexture = PIXI.Texture.fromCanvas(baseLayer, PIXI.scaleModes.LINEAR);
		}
		if (typeof textLayer === 'string') { // MD5
			this.textLayerMD5 = textLayer;
			this.textLayerTexture = PIXI.Texture.fromImage(Server.getAssetURL(textLayer), true, PIXI.scaleModes.LINEAR);
		}
		this.name = name;
		this.cx = cx || 0;
		this.cy = cy || 0;
		this.pixelRatio = pixelRatio || 1;
		this.scale = 1 / this.pixelRatio;
		this.width = this.height = 1;
		this.loaded = false;
		if (this.baseLayerTexture) {
			this.baseLayerTexture.baseTexture.resolution = this.pixelRatio;
			this.baseLayerTexture.on('update', this.updateSize.bind(this));
		}
	}
//********************Sounds Panel ^^^^^^^^^^^^^^^^^^^^^************************************************************

  function TabPanel(editor) {
    this.editor = editor;

    this.tabPanels = [
      this.scriptsPanel = new ScriptsPanel(editor),
      this.costumesPanel = new CostumesPanel(editor),
      this.soundsPanel = new SoundsPanel(editor)];
    this.tabs = [];

    var self = this;
    this.tabClick = function() {
      self.panel = self.tabPanels[this.dataset.index];
    };

    this.el = cl('tab-panel', [
      this.elContent = cl('tab-panel-content'),
      this.scriptsTab = this.makeTab(_('Scripts')),
      this.costumesTab = this.makeTab(_('Costumes')),
      this.soundsTab = this.makeTab(_('Sounds'))
    ]);

    this.panel = this.scriptsPanel;
  }

  TabPanel.prototype.makeTab = function(text) {
    var tab = cl('button', 'tab', {
      dataset: {index: this.tabs.length}
    }, [_(text)]);
    tab.addEventListener('click', this.tabClick);
    this.tabs.push(tab);
    return tab;
  };

  def(TabPanel.prototype, 'panel', {
    get: function() {return this._panel},
    set: function(value) {
      if (this._panel) {
        this._tab.classList.remove('selected');
        this.elContent.removeChild(this._panel.el);
        if (this.parent) this.parent.remove(this._panel);
      }
      this._panel = value;
      this._tab = value && this.tabs[this.tabPanels.indexOf(value)];
      if (value) {
        this._tab.classList.add('selected');
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
    this.costumesTab.textContent = sprite.isStage ? _('Backdrops') : _('Costumes');
    this.tabPanels.forEach(function(panel) {
      if (panel) panel.showSprite(sprite);
    });
  };


  function TopBar(editor) {
    this.editor = editor;

    this.el = cl('top-bar', [
      this.languageButton = this.makeButton('Language', this.languageMenu),
      this.fileButton = this.makeButton(_('File'), this.fileMenu, true),
      this.editButton = this.makeButton(_('Edit'), this.editMenu, true),
      this.tipsButton = this.makeButton(_('Tips'), this.showTips),
      this.aboutButton = this.makeButton(_('About'), this.showAbout),

      this.elTools = cl('top-tools', [
        this.duplicateButton = this.makeTool('duplicate', _('Duplicate')),
        this.deleteButton = this.makeTool('delete', _('Delete')),
        this.growButton = this.makeTool('grow', _('Grow')),
        this.shrinkButton = this.makeTool('shrink', _('Shrink')),
        this.helpButton = this.makeTool('help', _('Block help'))
      ])
    ]);

    this.languageButton.classList.add('first');
  }

  TopBar.prototype.makeButton = function(text, action, arrow) {
    var button = cl('button', 'top-button' + (text === 'Language' ? ' language' : ''), text === 'Language' ? [] : [text]);
    button.addEventListener('click', action.bind(this));
    if (arrow) {
      button.appendChild(cl('arrow'));
    }
    return button;
  };

  TopBar.prototype.makeTool = function(name, title) {
    return cl('button', 'top-tool top-tool-' + name, {title: title});
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

  TopBar.prototype.showAbout = function() { // NS
    function link(text, url) {
      return el('a', {target: '_blank', href: url}, [text]);
    }

    var d = new Dialog(_('About Pixie'), Dialog.content(
      el('article', [
        el('h1', ['Pixie']),
        el('p', ['An unofficial rewrite of ', link('Scratch', 'https://scratch.mit.edu'), ' in JavaScript, created by ', link('Nathan Dinsmore', 'https://github.com/nathan'), '. This fork off the master created by ', link('John Feagans', 'https://github.com/videophonegeek'), '.' ]),
        el('p', ['Pixie aims to provide an application nearly identical to the current, Flash-based Scratch editor and player using only web technologies. The source code is ', link('available on GitHub', 'https://github.com/videophonegeek/pixie'), '.']),
        el('p', ['This fork of the main project aims to complete the missing functionality, and add the libraries of costumes, backdrops, and sounds that make Scratch ideal for story telling.']),
        cl('ul', 'links', [
          el('li', [link('Issues', 'https://github.com/videophonegeek/pixie/issues')]),
          el('li', [link('Contributors', 'https://github.com/videophonegeek/pixie/graphs/contributors')])
        ])
      ]),
      Dialog.buttons(['OK', function() {d.commit()}]))).show(this.editor);
  };

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
    this._showMouseCoords = true;

    this.el = cl('stage-panel stopped', [
      this.elTitleBar = cl('title-bar', [
        this.fullScreenButton = this.makeButton('full-screen'),
        this.stopButton = this.makeButton('stop', function() {
          this.parent.exec.stopAll();
        }),
        this.runButton = this.makeButton('run', function(e) {
          if (e.shiftKey) {
            this.editor.toggleTurbo();
          } else {
            this.parent.exec.triggerGreenFlag();
          }
        }),
        this.elVersion = cl('version', [editor.version]),
        this.elTurbo = cl('turbo-indicator', [_('Turbo Mode')]),
        this.elTitle = cl('input', 'project-name'),
        this.elAuthor = cl('project-author')
      ]),
      this.elStage = this.stage.el,
      this.elToggle = cl('stage-toggle'),
      this.elMouseCoords = cl('mouse-coords', [
        this.elMouseXLabel = cl('mouse-label x-axis', ['x:']),
        this.elMouseX = cl('mouse-coord x-axis'),
        this.elMouseXLabel = cl('mouse-label y-axis', ['y:']),
        this.elMouseY = cl('mouse-coord x-axis')
      ])
    ]);

    this.elTitle.addEventListener('input', this.titleChanged.bind(this));
    this.elToggle.addEventListener('click', editor.toggleSmallStage.bind(editor));
    this.updateTitle();
    this.updateAuthor();

    this.stage.redraw();

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
    if (target && target.isSprite) this.editor.exec.triggerClick(target);
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
    this.elAuthor.textContent = this.stage.author ? _(this.stage.isPublic ? 'by {author}' : 'by {author} (unshared)', {author: this.stage.author}) : '';
  };

  StagePanel.prototype.keyDown = function(e) {
    var name = getKeyName(e.keyCode);
    if (e.metaKey || e.ctrlKey) {
      switch ((e.altKey ? '~' : '') + (e.shiftKey ? '!' : '') + name) { // NS
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
      e.preventDefault();
      return;
    }
    if (document.activeElement === document.body) e.preventDefault();
    if (name) {
      this.stage.keys[name] = true;
      this.editor.exec.triggerKey(name);
    }
  };

  StagePanel.prototype.keyUp = function(e) {
    var name = getKeyName(e.keyCode);
    if (name) {
      this.stage.keys[name] = false;
    }
  };

  StagePanel.prototype.makeButton = function(className, fn) {
    var button = cl('button', 'title-button ' + className);
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

  var MIN_RUN_TIME = 50;

  def(StagePanel.prototype, 'running', {
    get: function() {return this._running},
    set: function(running) {
      if (running !== this._running) {
        this._running = running;
        if (running) {
          this.startTime = Date.now();
        }

        var delta;
        if (!running && (delta = this.startTime + MIN_RUN_TIME - Date.now()) > 0) {
          setTimeout(function() {
            this.el.className = 'stage-panel stopped';
          }.bind(this), delta);
        } else {
          this.el.className = running ? 'stage-panel running' : 'stage-panel stopped';
        }
      }
    }
  });


  function SpritePanel(editor) {
    this.editor = editor;

    this.stageIcon = new SpriteIcon(this, editor.stage);
    this.icons = [];
    this.infoVisible = false;

    this.el = cl('sprite-panel', [
      this.elTitleBar = cl('title-bar', [
        this.elLabel = cl('title-label', [_('Sprites')]),
        this.elNewGroup = cl('new-group', [
          this.elNewGroupLabel = cl('new-group-label', [_('New sprite:')]),
          this.makeNewButton('new-library', _('Choose sprite from library'), this.newFromLibrary),
          this.makeNewButton('new-paint', _('Paint new sprite'), this.newFromEditor),
          this.makeNewButton('new-import', _('Upload sprite from file'), this.newFromFile, 'image/*,.sprite2'),
          this.makeNewButton('new-camera', _('New sprite from camera'), this.newFromCamera)
        ])
      ]),
      this.elStageSection = cl('stage-section', [
        this.stageIcon.el,
        this.elNewBackdrop = cl('new-backdrop', [
          _('New backdrop:'),
          this.makeNewButton('new-small-backdrop-library', _('Choose backdrop from library'), this.newBackdrop('newFromLibrary')),
          this.makeNewButton('new-small-paint', _('Paint new backdrop'), this.newBackdrop('newFromEditor')),
          this.makeNewButton('new-small-import', _('Upload backdrop from file'), this.newBackdrop('newFromFile'), 'image/*'),
          this.makeNewButton('new-small-camera', _('New backdrop from camera'), this.newBackdrop('newFromCamera'))
        ])
      ]),
      this.elSpriteSection = cl('sprite-section'),
      this.elSpriteInfo = cl('sprite-info', [
        this.elSpriteInfoBack = cl('sprite-info-back'),
        this.elSpriteName = cl('input', 'sprite-info-name'),
        cl('sprite-info-row', [
          el('strong', [_('x:')]),
          this.elSpriteX = cl('sprite-info-value'),
          el('strong', [_('y:')]),
          this.elSpriteY = cl('sprite-info-value'),
          el('strong', {className: 'sprite-info-direction'}, [_('direction:')]),
          this.elSpriteDirection = cl('sprite-info-value')
        ]),
        cl('sprite-info-row', [
          el('strong', [_('rotation style:')])
        ]),
        cl('sprite-info-row', [
          el('strong', [_('can drag in player:')]),
          this.elSpriteDraggable = cl('button', 'check-box')
        ]),
        cl('sprite-info-row', [
          el('strong', [_('show:')]),
          this.elSpriteVisible = cl('button', 'check-box')
        ])
      ])
    ]);

    this.elSpriteInfoBack.addEventListener('click', this.hideInfo.bind(this));
    this.elSpriteName.addEventListener('keydown', this.spriteNameKeyDown.bind(this));
    this.elSpriteVisible.addEventListener('click', this.toggleSpriteVisible.bind(this));
    this.elSpriteDraggable.addEventListener('click', this.toggleSpriteDraggable.bind(this));

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

  SpritePanel.prototype.showInfo = function() {
    this.infoVisible = true;
    this.elSpriteInfo.style.display = 'block';
    this.resetSpriteName();
    this.updateSpriteInfo();
  };

  SpritePanel.prototype.spriteNameKeyDown = function(e) {
    if (e.metaKey || e.ctrlKey) return;
    if (e.keyCode === 27) {
      this.resetSpriteName();
      e.preventDefault();
    }
    if (e.keyCode === 13) {
      this.renameSprite();
      e.preventDefault();
    }
    e.stopPropagation();
  };

  SpritePanel.prototype.resetSpriteName = function() {
    this.elSpriteName.value = this.editor.selectedSprite.name;
  };

  SpritePanel.prototype.renameSprite = function() {
    var sprite = this.editor.selectedSprite;
    var oldName = sprite.name;
    sprite.name = null;
    var newName = sprite.stage.uniqueSpriteName(this.elSpriteName.value.trim());
    if (oldName === newName || !newName) {
      sprite.name = oldName;
      this.resetSpriteName();
      return;
    }
    sprite.name = newName;
    this.resetSpriteName();
    var icon = this.findIcon(sprite);
    if (icon) icon.updateName();
    sprite.stage.updateWatcherLabels(sprite);
    // TODO change name in scripts
  };

  SpritePanel.prototype.updateSpriteInfo = function() {
    if (!this.infoVisible) return;
    var sprite = this.editor.selectedSprite;
    this.elSpriteX.textContent = Math.round(sprite.x);
    this.elSpriteY.textContent = Math.round(sprite.y);
    this.elSpriteDirection.textContent = Math.round(sprite.direction)+'°';
    this.elSpriteDraggable.classList.toggle('checked', sprite.isDraggable);
    this.elSpriteVisible.classList.toggle('checked', sprite.visible);
  };

  SpritePanel.prototype.toggleSpriteVisible = function() {
    var sprite = this.editor.selectedSprite;
    this.elSpriteVisible.classList.toggle('checked', sprite.visible = !sprite.visible);
    sprite.stage.redraw();
  };

  SpritePanel.prototype.toggleSpriteDraggable = function() {
    var sprite = this.editor.selectedSprite;
    this.elSpriteDraggable.classList.toggle('checked', sprite.isDraggable = !sprite.isDraggable);
  };

  SpritePanel.prototype.hideInfo = function() {
    this.infoVisible = false;
    this.elSpriteInfo.style.display = 'none';
  };

  SpritePanel.prototype.emptySprite = function() {
    return new Sprite(this.editor.stage.uniqueSpriteName(_('Sprite1')));
  };

	SpritePanel.prototype.newFromLibrary = function() {
		var arrValues;
			arrValues = showModalDialog("library/sprite/costumeLibrary.html","","center=yes;dialogWidth=1024;dialogHeight=768; resizable: Yes; status: Yes; scroll:yes");
		if(arrValues)
		{
			/*
			//var image = document.createElement('img');
			//image.src = arrValues[0]; 
			//console.log(arrValues[0]);
			//this.editor.addSprite(this.emptySprite().addCostume(Costume.centered(arrValues[1], image)));
			this.editor.addSprite(this.emptySprite().addCostume(new Costume(arrValues[1], arrValues[0])));

			// Animated GIF store as multiple costumes for a sprite
			var temp = this.emptySprite();
			for (var i=0;i<3;i++) {temp.addCostume(new Costume("costume"+i, arrValues[0]));}
			this.editor.addSprite(temp);
			*/
			var temp = this.emptySprite();
			var temp2 = this.editor;
			imageSrc = new Image();
			imageSrc.src = arrValues[0];
			imageSrc.setAttribute("rel:auto_play","0");
			imageSrc.setAttribute("rel:rubbable","0");
			if (/^.+\.gif$/.test(imageSrc.src)) {
				var rub = new SuperGif({ gif: imageSrc, progressbar_height: 0 } );
				rub.load(function(){
					for (var i = 0; i < rub.get_length(); i++) {
						rub.move_to(i); 
						var img_uri= rub.get_canvas().toDataURL("image/png");
						temp.addCostume(new Costume("costume"+i, img_uri));
					}
					temp2.addSprite(temp);
				});
			} else {
				temp.addCostume(new Costume("costume1", arrValues[0]));
				this.editor.addSprite(temp);
			}

		}
/*
		this.editor.addSprite(this.emptySprite()
				.addCostume(new Costume('costume1', 'f9a1c175dbe2e5dee472858dd30d16bb.svg', 47, 55))
				.addCostume(new Costume('costume2', 'c68e7b211672862001dd4fce12129813.png', 94, 108, 2)));
		console.log("newFromLibrary unimplemented");
		*/
	};

  SpritePanel.prototype.newFromEditor = function() {
    var sprite = this.emptySprite();
    this.editor.addSprite(sprite.addCostume(sprite.makeEmptyCostume()));
    this.editor.showCostumes();
  };

  SpritePanel.prototype.newFromCamera = function() {
    Dialog.camera(function(image) {
      var sprite = this.emptySprite();
      this.editor.addSprite(sprite.addCostume(Costume.centered('photo1', image)));
      this.editor.showCostumes();
    }, this).show(this.editor);
  };

	SpritePanel.prototype.newBackdrop = function(name) {
		return function(file) {
			this.select(this.stageIcon);
			this.editor.showCostumes();
			this.editor.tabPanel.costumesPanel[name](file);
		};
	};

  SpritePanel.prototype.newFromFile = function(file) {
	  console.log("newFromFile: "+file.name);
    if (/^image\//.test(file.type)) {
      IO.readImageFile(file, function(err, image) {
        this.editor.addSprite(this.emptySprite()
          .addCostume(Costume.centered(stripExtension(file.name), image)));
       }, this);
    } else {
      IO.readArchiveFile(file, function(err, object) {
        if (err || !object.isSprite) return console.warn(err, object); // TODO
        this.editor.addSprite(object);
      }, this);
    }
  };

  SpritePanel.prototype.select = function(icon) {
    if (this.selectedIcon === icon) return;
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

  SpritePanel.prototype.findIcon = function(sprite) {
    var icons = this.icons;
    for (var i = icons.length; i--;) {
      var icon = icons[i];
      if (icon.sprite === sprite) return icon;
    }
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

  SpritePanel.prototype.makeNewButton = CostumesPanel.prototype.makeNewButton;

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

    this.el = cl('sprite-icon', [
      this.elThumbnail = cl('canvas', 'sprite-thumbnail'),
      this.elName = cl('sprite-icon-label')
    ]);
    this.elTmp = el('canvas');

    this.context = this.elThumbnail.getContext('2d');
    this.tmpContext = this.elTmp.getContext('2d');

    if (sprite.isStage) {
      this.el.classList.add('for-stage');
      this.el.appendChild(this.elInfo = cl('sprite-icon-info'));
      this.updateInfo();
    } else {
      this.el.appendChild(this.elButton = cl('button', 'sprite-icon-button'));
      this.elButton.addEventListener('click', function() {
        this.panel.showInfo();
      }.bind(this));
    }

    this.el.addEventListener('click', function() {
      this.panel.select(this);
    }.bind(this));

    this.resize();
    this.updateName();
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
    sprite.name = this.editor.stage.uniqueSpriteName(sprite.name);
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

  SpriteIcon.prototype.resize = function() {
    this.scale = window.devicePixelRatio || 1;
    this.elThumbnail.width = this.elTmp.width = this.scale * (68 + 4);
    this.elThumbnail.height = this.elTmp.height = this.scale * (51 + 4);
    this.update();
  };

  SpriteIcon.prototype.update = function() {
    if (this.sprite.isStage) this.updateInfo();
    var costume = this.sprite.costumes[this.sprite.costume];
    if (costume === this.costume) return;
    this.costume = costume && costume.loaded;

    var w = this.elThumbnail.width;
    var h = this.elThumbnail.height;
    this.context.clearRect(0, 0, w, h);
    if (!costume || !costume.loaded) return;

    var source = costume.baseLayerTexture.baseTexture.source;
    var cw = source.width;
    var ch = source.height;
    var scale = Math.min(this.scale, (w - 4) / cw, (h - 4) / ch);
    var aw = scale * cw;
    var ah = scale * ch;
    var x = (w - aw)/2;
    var y = (h - ah)/2;

    this.elTmp.width = this.elTmp.width;
    this.tmpContext.drawImage(source, x, y, aw, ah);

    this.context.shadowBlur = 1.5 * this.scale;
    this.context.shadowColor = 'rgba(0, 0, 0, .5)';
    this.context.drawImage(this.elTmp, 0, 0);
  };

  SpriteIcon.prototype.updateName = function() {
    this.elName.title = this.elName.textContent = this.sprite.name;
  };

  SpriteIcon.prototype.updateInfo = function() {
    var len = this.sprite.costumes.length;
    if (this.costumeCount !== len) {
      this.costumeCount = len;
      this.elInfo.textContent = _(len === 1 ? '{count} backdrop' : '{count} backdrops', {count: len});
    }
  };


  function BackpackPanel(editor) {
    this.editor = editor;

    this.el = cl('backpack-panel', [
      this.elTitle = cl('backpack-title', [_('Backpack')]),
      this.elContent = cl('backpack-content'),
    ]);

    this.elTitle.addEventListener('click', this.toggle.bind(this));
  }

  BackpackPanel.prototype.toggle = function() {
    this.editor.el.classList.toggle('backpack-open');
  };


  function TipsPanel(editor) {
    this.editor = editor;
    this.isOpen = false;

    this.el = cl('tips-panel', [
      this.elTitle = cl('tips-title', [
        this.elIcon = cl('tips-icon', ['?']),
        this.elClose = cl('tips-close-button', ['x']),
        this.elLabel = cl('tips-label', [
          _('Tips'),
          this.elHome = cl('tips-home')
        ])
      ]),
      this.elContent = cl('tips-content', [
        this.elFrame = cl('iframe', 'tips-frame')
      ])
    ]);

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
    this.el = cl('dialog Visual-no-select', [
      this.elTitle = cl('dialog-title'),
      this.elContent = content || cl('dialog-content')
    ]);
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
      button = _('OK');
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
      no = _('Cancel');
      yes = _('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = _('Cancel');
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
      no = _('Cancel');
      yes = _('OK');
      value = '';
    }
    if (typeof yes === 'function' || yes == null) {
      context = no;
      fn = yes;
      no = _('Cancel');
      yes = _('OK');
    }
    if (typeof no === 'function' || no == null) {
      context = fn;
      fn = no;
      no = _('Cancel');
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

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  Dialog.camera = function(fn, context) {
    if (Dialog.camera.current) {
      Dialog.camera.current.cancel();
    }
    if (!getUserMedia) {
      return Dialog.camera.current = Dialog.alert(_('Camera'), _("Your browser doesn't support the getUserMedia API, which is required for camera access."), _('Close'));
    }
    var video = el('video', {width: 320, height: 240, autoplay: true});
    var d = new Dialog(_('Camera'), Dialog.content(
      video,
      Dialog.buttons(
        [_('Save'), function() {d.commit()}],
        [_('Close'), function() {d.cancel()}])));
    d.goToFront = function() {
      Dialog.prototype.goToFront.call(this);
      video.play();
    };
    if (fn) {
      d.oncommit = function() {
        if (stream) {
          var canvas = el('canvas', {width: video.width, height: video.height});
          canvas.getContext('2d').drawImage(video, 0, 0);
          fn.call(context, canvas);
        }
        d.oncancel();
      };
      d.oncancel = function() {
        canceled = true;
        video.pause();
        if (stream) stream.stop();
      };
    }
    var stream, canceled;
    getUserMedia.call(navigator, {video: true}, function(s) {
      video.src = URL.createObjectURL(stream = s);
      if (canceled) d.oncancel();
    }, function(err) {
      video.parentNode.replaceChild(cl('dialog-label video-error', {
        style: {width: video.width+'px', height: video.height+'px'}
      }, [_('Could not access camera.')]), video);
    });
    return Dialog.camera.current = d;
  };

  Dialog.label = function(text) {
    return cl('dialog-label', [text]);
  };

  Dialog.Field = function(label, value) {
    this.value = '';
    this.el = cl('label', 'dialog-label', [
      label,
      this.field = cl('input', 'dialog-field', {
        value: value == null ? '' : value
      })
    ]);
    this.field.addEventListener('input', this.change.bind(this));
  };

  Dialog.Field.prototype.change = function() {
    this.value = this.field.value;
  };

  Dialog.Radio = function() {
    this.el = cl('dialog-label');
    this.radios = [];
    this.labels = [];
    this.values = [];
    var a = this.args = slice.call(arguments);
    for (var i = 0, l = a.length; i < l; i++) {
      var s = a[i];
      var radio = cl('button', 'dialog-radio', {dataset: {index: i}});
      var label = cl('label', 'dialog-radio-label enabled', [radio, s[0]]);
      radio.addEventListener('click', this.click.bind(this, i));
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
      label.classList.toggle('enabled', !!enabled);
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
    this.el = cl('label', 'dialog-label dialog-check-box-label enabled', [
      this.button = cl('button', 'check-box'),
      label
    ]);
    this.button.addEventListener('click', this.click.bind(this));
  };

  Dialog.CheckBox.prototype.click = function(e) {
    e.preventDefault();
    if (!this._enabled) return;
    this.value = !this.value;
    this.button.classList.toggle('checked', this.value);
    if (this.onchange) this.onchange();
  };

  def(Dialog.CheckBox.prototype, 'enabled', {
    get: function() {return this._enabled},
    set: function(value) {
      this._enabled = value;
      this.el.classList.toggle('enabled', !!value);
    }
  });

  Dialog.CheckBox.prototype.onchange = null;

  Dialog.line = function() {
    return cl('dialog-separator');
  };

  Dialog.content = function() {
    return el('div', slice.call(arguments));
  };

  Dialog.buttons = function() {
    var div = cl('dialog-buttons');
    var a = slice.call(arguments);
    for (var i = 0, l = a.length; i < l; i++) {
      var b = a[i];
      if (typeof b !== 'object') b = [b, b];
      var button = cl('button', 'ui-button', [b[0]]);
      div.appendChild(button);
      if (b[1]) button.addEventListener('click', b[1]);
    }
    return div;
  };

  Dialog.prototype.keyDown = function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.commit();
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      this.cancel();
    }
  };

  Dialog.prototype.mouseDown = function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'LABEL' || e.target.tagName === 'A' || e.button !== 0) return;
    this.dragX = this.x - e.clientX;
    this.dragY = this.y - e.clientY;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    this.goToFront();
  };

  Dialog.prototype.goToFront = function() {
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

  var flip = editor.elFlipButton;
  var flipBack = document.querySelector('.flip-back');
  var player = document.querySelector('.player');

  var flipped = false;
  function doFlip() {
    var time = 1.2;
    var ed = editor.el;
    var es = editor.stagePanel.el;

    ed.style.WebkitTransition = 'none';
    ed.style.WebkitTransform = 'none';

    var ebb = ed.getBoundingClientRect();
    var sbb = es.getBoundingClientRect();
    var pbb = player.getBoundingClientRect();
    var dx = ((pbb.right + pbb.left) - (ebb.right + ebb.left)) / 2;
    var dy = ((pbb.bottom + pbb.top) - (ebb.bottom + ebb.top)) / 2;
    var sdx = ((ebb.right + ebb.left) - (sbb.right + sbb.left)) / 2;
    var sdy = ((ebb.bottom + ebb.top) - (sbb.bottom + sbb.top)) / 2;
    var sx = pbb.width / ebb.width;
    var sy = pbb.height / ebb.height;

    if (flipped) {
      ed.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')';
    } else {
      ed.style.WebkitTransform = 'none';
    }
    ed.offsetHeight;
    ed.style.WebkitTransition =
    es.style.WebkitTransition = '-webkit-transform '+time+'s, z-index '+time+'s';
    ed.classList.toggle('stage-only', !flipped);
    if (flipped) {
      ed.style.WebkitTransform = 'none';
      es.style.WebkitTransform = 'none';
      es.style.WebkitTransform = 'translateZ(0)';
    } else {
      ed.style.WebkitTransform = 'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')';
      es.style.WebkitTransform = 'translate3d('+sdx+'px,'+sdy+'px,0) scale('+(1/sx)+','+(1/sy)+')';
    }
    flipped = !flipped;
  }

  flip.addEventListener('click', doFlip);
  flipBack.addEventListener('click', doFlip);

}());
