fullScreen = false;
FRAMERATE = 60;
timeSinceLastDrawn = 0;
origX = window.innerWidth;
origY = window.innerHeight;
origScreenX = screen.width;
origScreenY = screen.height;
currentSize = {x:window.innerWidth,y:window.innerHeight};
HWRATIO = window.innerHeight/window.innerWidth;
hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
directions = ["north","east","south","west"];
zoomLimit = {min:0.3,max:2}
gameSize = {x:window.innerWidth/zoomLimit.min,y:window.innerHeight/zoomLimit.min}
//bgColor = 0x150707;
bgColor = 0x120505;
isTouchDevice = 'ontouchstart' in document.documentElement;
cursor = {x:undefined,y:undefined};
cursorAtLastFrame = null;
viewWidth = window.innerWidth;
viewHeight = window.innerHeight;
gameInitiated = false;
spermTails = true;
clickbombs = [];
bombSeeds = [];
turretButtons = [];
incomingMenu = undefined;
onFireSoundsPlaying = 0;
spermOnFire = 0;
lastBombTime = 0
ff = false
soundOn = false;
musicOn = false;

var titleMusic = new Howl({
    urls: ['sounds/theme.wav'],
    volume:0.3,
    playing: false,
    loop: true,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var music1 = new Howl({
    urls: ['sounds/music1.wav'],
    volume:0.0,
    playing: false,
    loop: true,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var laserSound = new Howl({
    urls: ['sounds/laser.wav'],
    volume:0.2,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var explosionSound = new Howl({
    urls: ['sounds/explosion.wav'],
    volume:0.15,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var spermFreezeSound = new Howl({
    urls: ['sounds/ice.wav'],
    volume:0.3,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var iceBeamSound = new Howl({
//    urls: ['sounds/icebeam.wav'],
    volume:0.3,

    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var beeStingSound = new Howl({
    urls: ['sounds/beesting.wav'],
    volume:0.3,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var spermDieSound = new Howl({
    urls: ['sounds/spermblip.wav'],
    volume:0.1,

    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var slowdownSound = new Howl({
    urls: ['sounds/slowdown.wav'],
    volume:0.5,

    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var gameOverSound = new Howl({
    urls: ['sounds/lose.wav'],
    volume:0.6,

    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}
});
var flameTurretSound = new Howl({
    urls: ['sounds/flameturret.wav'],
    volume:0.5,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var eggDamageSound = new Howl({
    urls: ['sounds/eggdamage.wav'],
    volume:1.2,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var attachTurretSound = new Howl({
    urls: ['sounds/attachturret.wav'],
    volume:0.7,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var selectSound = new Howl({
    urls: ['sounds/select.wav'],
    volume:0.4,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var glassCrackSound = new Howl({
    urls: ['sounds/glasscrack.mp3'],
    volume:0.1,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var confirmSound = new Howl({
    urls: ['sounds/confirm.wav'],
    volume:0.7,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var catchFireSound = new Howl({
    urls: ['sounds/onfire.mp3'],
    volume:0.1,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var clickbombSound = new Howl({
    urls: ['sounds/clickbomb.wav'],
    volume:0.3,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
var rocketSound = new Howl({
    urls: ['sounds/rocketfire.wav'],
    volume:0.3,
    playing: false,
    onplay: function() {this.playing = true},
    onend: function() {this.playing = false}

});
bgMusic = music1;
fireSoundPlaying = false;
flameTurretSoundsPlaying = 0;
turretColors = {"Laser":0xffb9b9,"Fire":0xffddbb,"Ice":0xddddff,"Rocket":0xffffff,"Virus":0xdeffde}
if (viewWidth >= viewHeight) {
    shorterDimension = viewHeight;
    longerDimension = viewWidth;
} else {
    shorterDimension = viewWidth;
    longerDimension = viewHeight;
}
var spermDivisor = 100-(HWRATIO*10)
spermWidth = (shorterDimension/spermDivisor)*0.95;
counter = 0;
fanciness = 1;
function setOptions() {
    clickWeapon = "clickbomb";
    lingeringFlames = [];
    spawnedThisRound = 0;
    upgradesLeft = 0
    clocksLeft = 0
    clickingMenu = false;
    beesInPlay = 0;
    flames = [];
    rockets = [];
    lost = false;
    slowMode = false;
    sperms = [];
    tailArray = [];
    collision = false;
    walls = [];
    trails = [];
    emissions = [];
    ammoSpermCount = 0;
    spermReleased = false;
    currentLoadSize = 20;
    wave = 1;
    waveStarted = false;
    killedThisWave = 0;
    pressedSpaceAt = undefined;
    LMBDown = RMBDown = pressingW = pressingQ = pressingA = pressingD = pressingS = pressingSpace = false;
    clicked = rightClicked = pressedQAt = -1;
    playerScore = 0;
    wonRound = undefined;
    startingFingerDistance = 0;
    pinched = 0;
    touches = [];
    doubleTapping = false;
    explosions = [];
    bees = [];
    activeClickbombs = [];
    enemyCount = 0;
    upgrading = false;
    chosenUpgrade = undefined;
    beeRate = 1;
    clickbombMaxSize = spermWidth*16;
    clickbombLongevity = 10
    // clickbombMaxSize = spermWidth*24;
    clickbombLimit = 3;
    gotSpecial = -99;
    spermWorth = 0.05
    kamikazes = 0
    bankBonusRate = 0.15
    shieldLevel = 100
    startedAt = 0
}
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.RESOLUTION = window.devicePixelRatio
renderer = PIXI.autoDetectRenderer({
    width:window.innerWidth,
    height:window.innerHeight,
    backgroundColor:'0x000000',
    autoResize: true,
    powerPreference: 'high-performance',
    // roundPixels: true
});
renderer.plugins.interaction.interactionFrequency = 1;
function sizeStage(outerX,outerY) {
    stage = new PIXI.Container();
    stage.pivot.x = stage.x = window.innerWidth/2;
    stage.pivot.y = stage.y = window.innerHeight/2;
    stage.interactive = true;
    
    bg = new PIXI.Sprite(pixelText);
    bg.anchor.set(0.5);
    bg.x = window.innerWidth/2;
    bg.y = window.innerHeight/2;
    bg.alpha = 0;
    bg.anchor.set(0.5);
    bg.tint = 0x330000
    container = new PIXI.Container();
    container.width = outerX;
    container.height = outerY;
    container.pivot.x = window.innerWidth/2;
    container.pivot.y = window.innerHeight/2;
    container.x = window.innerWidth/2;
    container.y = window.innerHeight/2;
    container.addChild(bg);
    stage.width = bg.width = outerX;
    stage.height = bg.height = outerY;
//    document.body.appendChild(renderer.view);
    document.getElementById("game-canvas").appendChild(renderer.view);
}
worldSlowRate = 1;
optionButtons = [];
styleOfText = {
    align: 'center',
    font : 'bold ' + (window.innerHeight/25) +'px Helvetica',
    fill : '#efefef',
    wordWrap : true,
    wordWrapWidth : currentSize.x
};
styleOfText2 = {    align: 'center',
    font : 'bold ' + (window.innerHeight/20) +'px Helvetica',
    fill : '#efefef',
//    dropShadow: '2px',
//    dropShadowDistance: 1,
    wordWrap : true,
    wordWrapWidth : currentSize.x

};
styleOfText3 = {
    align: 'center',
    font : 'bold ' + (window.innerHeight/12) +'px Helvetica',
    fill : '#efefef',
//    dropShadow: '3px',
//    dropShadowDistance: 2,
    wordWrap : true,
    wordWrapWidth : currentSize.x
};
styleOfText4 = {
    align: 'center',
    font : 'bold ' + (window.innerHeight/36) +'px Helvetica',
    fill : '#efefef',
//    dropShadow: '1px',
//    dropShadowDistance: 1,
    wordWrap : true,
    wordWrapWidth : currentSize.x
};
touchedClock = undefined;
activatedClock = undefined;
eggTitleText = PIXI.Texture.fromImage("assets/eggtitle.png");
protectorTitleText = PIXI.Texture.fromImage("assets/protectortitle.png");
ffButtonText = PIXI.Texture.fromImage("assets/ffbutton.png");
borderText = PIXI.Texture.fromImage("assets/border.png");
explosionSheet = PIXI.Texture.fromImage("assets/explosion.png");
spermText = PIXI.Texture.fromImage("assets/spermhead.png");
tailText = PIXI.Texture.fromImage("assets/tailpiece.png");
clockText = PIXI.Texture.fromImage("assets/clock.png");
pixelText = PIXI.Texture.fromImage("assets/pixel.bmp");
tileText = PIXI.Texture.fromImage("assets/tile.png");
sphereText = PIXI.Texture.fromImage("assets/spheregap.png");
circleText = PIXI.Texture.fromImage("assets/circle.png");
circle2Text = PIXI.Texture.fromImage("assets/circle2.png");
fetusText = PIXI.Texture.fromImage("assets/fetus.png");
largeSphereText = PIXI.Texture.fromImage("assets/spheroid.png");
fireballText = PIXI.Texture.fromImage("assets/fireball.png");
logoText = PIXI.Texture.fromImage("assets/kclogo.png");
sawText = PIXI.Texture.fromImage("assets/saw2.png");
squareText = PIXI.Texture.fromImage("assets/square.png");
falconText = PIXI.Texture.fromImage("assets/ring.png");
turretText = PIXI.Texture.fromImage("assets/turret2.png");
beeText = PIXI.Texture.fromImage("assets/bee.png");
eggText = PIXI.Texture.fromImage("assets/spheroid.png");
rayText = PIXI.Texture.fromImage("assets/ray.png");
meatText = PIXI.Texture.fromImage("assets/meat.png");
rocketText = PIXI.Texture.fromImage("assets/rocket.png");
hullText1 = PIXI.Texture.fromImage("assets/hull.png");
hullText2 = PIXI.Texture.fromImage("assets/hull2.png");
hullText3 = PIXI.Texture.fromImage("assets/hull3.png");
hullText4 = PIXI.Texture.fromImage("assets/hull4.png");
hullText5 = PIXI.Texture.fromImage("assets/hull5.png");
hullText6 = PIXI.Texture.fromImage("assets/hull6.png");
hullText7 = PIXI.Texture.fromImage("assets/hull7.png");
hullText8 = PIXI.Texture.fromImage("assets/hull8.png");
hullTextures = [hullText1,hullText2,hullText3,hullText4,hullText5,hullText6,hullText7,hullText8];

lastDrawn = Date.now();
lastUpdated = Date.now();

if (!isTouchDevice) {
    startingZoom = -0.25;
} else {
    startingZoom = -0.08;
}
offscreenDistance = (longerDimension/2)*(1-startingZoom);
// sizeStage(window.screen.width,window.screen.height);
sizeStage(window.innerWidth,window.innerHeight);
setTouchControls();
// document.addEventListener("wheel", wheelHandler, false);
// document.addEventListener("wheel", wheelHandler, false);
setOptions();
function wheelHandler(event) {
    if (event.deltaY > 0) {
//        zoom(-0.08);
    } else {
//        zoom(0.08);
    }
}

// stage.addChild(score);
// score.visible = killCount.visible = false;
stage.addChild(container);
zoom(startingZoom);
previousScale = container.scale.x;
function init(reset) {
    shieldBarMax = document.getElementById("shield-bar").offsetWidth
    remainingCount = document.getElementById("enemy-count")
    cashCount = document.getElementById("cash-count")
    cashBlip = document.getElementById("cash-blip")
    egg = new Egg();
    ship = new Ship();
    // specialArea = new SpecialArea()
    // ffArea = new FastForwardArea()
    upgradeScreen = new MainUpgradeScreen()
    upgradeScreen.assignButtons()
    // specialArea.container.visible = ffArea.container.visible = false
    egg.white.width = egg.white.height = egg.fullWidth = ship.body.width*3;
    egg.minWidth = ship.body.width
    egg.shrinkArea = egg.fullWidth-egg.minWidth
    egg.yolk.width = egg.yolk.height = ship.hull.width*0.85;
    defaultRange = egg.white.width*1.75;
    var resultHeight = document.getElementById('result-screen').offsetHeight
    document.getElementById('result-screen').style.top = (window.innerHeight-resultHeight)/2
    turretData = {
        "Ice":{"Power":0,"Range":(defaultRange*0.8),"Slow":4},
        "Laser":{"Power":9999,"Range":(defaultRange/1.5)},
        "Rocket":{"Power":9999,"Range":defaultRange,"Speed":(spermWidth/2)},
        "Virus":{"Power":30,"Range":defaultRange,"Speed":(spermWidth/2)},
    }
    beeData = {"Power":5,"Speed":(spermWidth/2),"Range":(ship.body.width*3)}
    outerBorderSize = ship.body.width/2;
    turretChoiceScreen = new TurretChoiceScreen();
    turretUpgradeChoiceScreen = new TurretUpgradeChoiceScreen();
    beeUpgradeChoiceScreen = new BeeUpgradeChoiceScreen();
    createOptionsMenu();
    optionsScreen = new OptionsScreen();
    titleScreen = new TitleScreen();
    howToPlayScreen = new HowToPlayScreen();
    highScoresScreen = new HighScoresScreen();
    // renderer.resize(window.innerWidth,window.innerHeight)

    if (musicOn){
        titleMusic.play();
    }
    if (!reset) {
        update();
    } else {
        var bars = document.getElementsByClassName('upgrade-bar')
        for (var b=0;b<bars.length;b++) {
            var bar = bars[b]
            bar.innerHTML = '<div style="transform:none;width:1vw" class="upgrade-filling"></div>'
        }
        bg = new PIXI.Sprite(pixelText);
        bg.anchor.set(0.5);
        bg.x = window.innerWidth/2;
        bg.y = window.innerHeight/2;
        bg.alpha = 0;
        bg.tint = 0x330000;
        bg.anchor.set(0.5);
        bg.width = window.innerWidth/container.scale.x;
        bg.height = window.innerHeight/container.scale.y;
        container.addChild(bg);
    }
//    ship.addTurrets(1,"Ice",0)
//    ship.addBees(24)
//    upgradeBees("Healing");
};


