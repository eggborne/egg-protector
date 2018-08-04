function reset() {
    setOptions();
}
function prettyCash(num) {
    var split = num.toString().split(".")
    var newStr = ""
    newStr += split[0]
    if (split.length===1) {
        newStr = split[0]+".00"
    } else {
        if (split[1].length > 2) {
            // console.log("split[1] is long! " + split[1])
            split[1] = split[1].substr(0,2)
            // console.log("changed to " + split[1])
            newStr += ("."+split[1])
        } else if (split[1].length===2) {
            newStr += ("."+split[1])
        } else {
            newStr += "."+split[1]+"0"
        }
    }
    // console.log("returning " + newStr)
    return "$"+newStr
}
function percentify(num) {
    if (!num) {
        return "0%"
    } else {
        var mult = num*100
        var trunc = mult.toString().substr(0,3)
        if (trunc[0]==="0") {
            trunc = trunc.substr(1,3)
        }
        return (parseInt(trunc))+"%"
    }
}
function showInterstitial() {
    // chooseOneLegend.container.visible = true;
    // waveClearButton.container.visible = false;
    // waveClearButton.container.visible = false;
    // startWaveButton.container.visible = true;
    // addTurretButton.container.visible = true;
    // addBeeButton.container.visible = true;
    // upgradeBeesButton.container.visible = true;
    // upgradeTurretsButton.container.visible = true;
    // startWaveButton.text.text = "START \nWAVE " + wave;
    // document.getElementById("upgrade-screen").style.display = "block"
    document.getElementById('main-upgrade').style.left = "0";
    document.getElementById('main-upgrade').style.top = "-100%";
    setTimeout(function(){
        document.getElementById("main-upgrade").style.top = 0
    },10)
    
}
function MainUpgradeScreen() {
    this.div = document.getElementById('main-upgrade')
    this.assignButtons = function() {
        document.getElementById('add-turret-button').onclick = function(){
            document.getElementById('main-upgrade').style.left = "-100%";
            document.getElementById('turret-choice-screen').style.left = 0;
        }
        document.getElementById('laser-power-button').onclick = function(){
            if (playerScore) {
                playerScore -= 1
                updateStatDisplays()
                ship.upgradeTurrets("Power");
                document.getElementById('laser-power-bar').innerHTML += '<div class="upgrade-filling-small"></div>'
                setTimeout(function(){
                    document.getElementById('laser-power-bar').children[document.getElementById('laser-power-bar').children.length-1].style.transform = "scaleX(1)"
                },20)  
            }
        }
        document.getElementById('laser-range-button').onclick = function(){
            if (playerScore) {
                playerScore -=1
                updateStatDisplays()
                ship.upgradeTurrets("Range");
                document.getElementById('laser-range-bar').innerHTML += '<div class="upgrade-filling-small"></div>'
                setTimeout(function(){
                    document.getElementById('laser-range-bar').children[document.getElementById('laser-range-bar').children.length-1].style.transform = "scaleX(1)"
                },20)     
            }  
        }
        // document.getElementById('laser-speed-button').onclick = function(){
        //     if (playerScore) {
        //         playerScore -= 1
        //         updateStatDisplays()
        //         ship.upgradeTurrets("Fire Rate");
        //         document.getElementById('laser-speed-bar').innerHTML += '<div class="upgrade-filling"></div>'
        //         setTimeout(function(){
        //             document.getElementById('laser-speed-bar').children[document.getElementById('laser-speed-bar').children.length-1].style.transform = "scaleX(1)"
        //         },20) 
        //     }
        // }
        // document.getElementById('add-bees-button').onclick = function(){
        //     if (playerScore) {
        //         playerScore -= 5
        //         updateStatDisplays()
        //         ship.addBees(1);
        //         playSound(beeStingSound)
        //     }
        // }
        // document.getElementById('bees-power-button').onclick = function(){
        //     if (playerScore) {
        //         playerScore -= 2
        //         updateStatDisplays()
        //         upgradeBees("Power");
        //         document.getElementById('bees-power-bar').innerHTML += '<div class="upgrade-filling"></div>'
        //         setTimeout(function(){
        //             document.getElementById('bees-power-bar').children[document.getElementById('bees-power-bar').children.length-1].style.transform = "scaleX(1)"
        //         },20) 
        //     }
        // }
        document.getElementById('bees-power-button').onclick = function(){
            if (playerScore) {
                playerScore -= 5
                updateStatDisplays()
                clickbombMaxSize += spermWidth*3
                document.getElementById('bees-power-bar').innerHTML += '<div class="upgrade-filling-large"></div>'
                setTimeout(function(){
                    document.getElementById('bees-power-bar').children[document.getElementById('bees-power-bar').children.length-1].style.transform = "scaleX(1)"
                },20) 
            }
        }
        document.getElementById('bees-speed-button').onclick = function(){
            if (playerScore) {
                playerScore -= 8
                updateStatDisplays()
                clickbombLongevity += 10
                document.getElementById('bees-speed-bar').innerHTML += '<div class="upgrade-filling-large"></div>'
                setTimeout(function(){
                    document.getElementById('bees-speed-bar').children[document.getElementById('bees-speed-bar').children.length-1].style.transform = "scaleX(1)"
                },20) 
            }
        }
        // document.getElementById('bees-range-button').onclick = function(){
        //     if (playerScore) {
        //         playerScore -= 2
        //         updateStatDisplays()
        //         upgradeBees("Range");
        //         document.getElementById('bees-range-bar').innerHTML += '<div class="upgrade-filling"></div>'
        //         setTimeout(function(){
        //             document.getElementById('bees-range-bar').children[document.getElementById('bees-range-bar').children.length-1].style.transform = "scaleX(1)"
        //         },20) 
        //     }
        // }
        // document.getElementById('bees-speed-button').onclick = function(){
        //     if (playerScore) {
        //         playerScore -= 2
        //         updateStatDisplays()
        //         upgradeBees("Speed");
        //         document.getElementById('bees-speed-bar').innerHTML += '<div class="upgrade-filling"></div>'
        //         setTimeout(function(){
        //             document.getElementById('bees-speed-bar').children[document.getElementById('bees-speed-bar').children.length-1].style.transform = "scaleX(1)"
        //         },20) 
        //     }
        // }
        
        document.getElementById('upgrade-ok-button').onclick = function(){
            startNextWave()
            if (musicOn) {
                bgMusic.fade(0.0,0.3,600);
            }
            document.getElementById('main-upgrade').style.top = "-100%"
        }
        document.getElementById('buy-ice-button').onclick = function(){
            chosenUpgrade = "Ice";
            upgrading = true;
            playerScore -= 2
            updateStatDisplays()
            document.getElementById('turret-choice-screen').style.left = "-100%"
        }
        document.getElementById('buy-laser-button').onclick = function(){
            chosenUpgrade = "Laser";
            upgrading = true;
            playerScore -= 4
            updateStatDisplays()
            document.getElementById('turret-choice-screen').style.left = "-100%"
        }  
        document.getElementById('buy-rocket-button').onclick = function(){
            chosenUpgrade = "Rocket";
            upgrading = true;
            playerScore -= 5
            updateStatDisplays()
            document.getElementById('turret-choice-screen').style.left = "-100%"
        }  
        document.getElementById('buy-virus-button').onclick = function(){
            chosenUpgrade = "Virus";
            upgrading = true;
            playerScore -= 10
            updateStatDisplays()
            document.getElementById('turret-choice-screen').style.left = "-100%"
        }
        document.getElementById("turret-done-button").onclick = function() {
            document.getElementById('turret-choice-screen').style.left = "100%"
            document.getElementById('main-upgrade').style.left = "0"
        }
        document.getElementById("result-next-button").onclick = function() {
            startNextWave()
            if (musicOn) {
                bgMusic.fade(0.0,0.3,600);
            }
            document.getElementById('result-screen').style.transform = "scale(0)"
        }
        document.getElementById("result-upgrade-button").onclick = function() {
            document.getElementById('result-screen').style.transform = "scale(0)"
            showInterstitial()
        }
        document.getElementById("heal-ten-button").onclick = function() {
            playerScore -= 15
            updateStatDisplays()
            egg.hp += 10
            var addition = (egg.shrinkArea/100)*10
            egg.white.width += addition
            egg.white.height += addition
            document.getElementById('wave-shield-display').innerHTML = egg.hp
            document.getElementById('shield-bar').style.transform = "scaleX("+(egg.hp/100)+")"

            document.getElementById('heal-header').innerHTML = "RESTORE SHIELD ("+egg.hp+"%)"
            document.getElementById('heal-all-button').innerHTML = "ALL ($"+Math.round((100-egg.hp)*1.4)+")"
        }
        document.getElementById("heal-all-button").onclick = function() {
            playerScore -= Math.round((100-egg.hp)*1.4)
            updateStatDisplays()
            egg.hp = 100
            egg.white.width = egg.white.height = egg.fullWidth
            document.getElementById('wave-shield-display').innerHTML = egg.hp
            document.getElementById('shield-bar').style.transform = "scaleX("+(egg.hp/100)+")"

            document.getElementById('heal-header').innerHTML = "RESTORE SHIELD ("+egg.hp+"%)"
            document.getElementById('heal-all-button').innerHTML = "ALL ($"+Math.round((100-egg.hp)*1.4)+")"
        }
    }
}
function HighScoresScreen() {
    var scoresDiv = document.getElementById("high-scores")
    this.container = new PIXI.Container();
    this.okButton = new Button("OK",styleOfText2,function(){
//        howToPlayScreen.okButton.bg.tint = 0x00ff00;
        highScoresScreen.container.visible = false;
        scoresDiv.style.visibility = "hidden";
        startButton.container.visible = true;
        titleScreen.container.visible = true;
        titleScreen.highScoresButton.container.visible = true;
    });
    stage.removeChild(this.okButton.container);
    this.container.addChild(this.okButton.container);
    this.bg = new PIXI.Sprite(pixelText);
    this.container.addChild(this.bg);
    this.bg.anchor.x = 0.5;
    this.bg.width = titleScreen.bg.width;
    this.bg.height = titleScreen.bg.height;
    this.bg.tint = 0x454567;
    this.bg.x = window.innerWidth/2;
    this.bg.y = outerBorderSize;
    this.legend = new TextBar(1.5,"HIGH SCORES",styleOfText2,0x777777);
    this.legend.bg.visible = false;
    this.legend.container.y = (this.legend.container.height/2)+outerBorderSize*1.5;
    stage.removeChild(this.legend.container);
    this.container.addChild(this.legend.container)
    this.legend.bg.width = this.bg.width-outerBorderSize*2;
    this.legend.container.y = this.bg.y+outerBorderSize/2;
    this.okButton.container.x = window.innerWidth/2;
    this.okButton.container.y = startButton.container.y;
    this.okButton.bg.width = startButton.bg.width;
    this.okButton.bg.height = startButton.bg.height;
    this.okButton.bg.tint = startButton.bg.tint;
    this.okButton.container.visible = true;
    this.container.visible = false;
    var scoresDiv = document.getElementById("high-scores");
    var scoresMargin = outerBorderSize;
    scoresDiv.style.padding = scoresMargin;
    scoresDiv.style.width = this.bg.width-scoresMargin*2;
    scoresDiv.style.height = this.bg.height-this.legend.container.height-scoresMargin*2;
    scoresDiv.style.left = this.bg.x-titleScreen.bg.width/2;
    scoresDiv.style.top = this.legend.container.y+this.legend.container.height;

//    scoresDiv.innerHTML =''

    stage.addChild(this.container);
}

function TitleScreen() {
    this.container = new PIXI.Container();
    this.container.pivot.x = this.container.x = window.innerWidth/2;
    this.container.pivot.y = this.container.y = window.innerHeight/2;
    this.eggTitle = new PIXI.Sprite(eggTitleText);
    this.protectorTitle = new PIXI.Sprite(protectorTitleText);
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.anchor.x = 0.5;
    this.eggTitle.anchor.set(0.5);
    this.protectorTitle.anchor.set(0.5);
    this.bg.height = window.innerHeight-startButton.container.height-(outerBorderSize*3);
    if (window.innerWidth > window.innerHeight) {
        this.bg.width = this.bg.height;
    } else {
        this.bg.width = window.innerWidth-(ship.body.width);
    }
    this.container.addChild(this.bg);
    var eggTitleWH = this.eggTitle.width/this.eggTitle.height;
    this.eggTitle.width = this.bg.width*0.8
    this.eggTitle.height = this.eggTitle.height/eggTitleWH
    var protectorTitleWH = this.protectorTitle.width/this.protectorTitle.height;
    this.protectorTitle.width = this.bg.width*0.85
    this.protectorTitle.height = (this.protectorTitle.height/protectorTitleWH)*1.75
    this.bg.tint = 0x444444;
    this.bg.x = window.innerWidth/2;
    this.bg.y = outerBorderSize;
    this.bg.alpha = 1;
    this.eggTitle.x = window.innerWidth/2;
    this.eggTitle.y = this.bg.y+outerBorderSize+(this.eggTitle.height/1.5);
    this.protectorTitle.x = window.innerWidth/2;
    this.protectorTitle.y = this.eggTitle.y+this.eggTitle.height*1.1
    this.container.addChild(this.eggTitle);
    this.container.addChild(this.protectorTitle);
    stage.addChild(this.container);
    this.highScoresButton = new Button("HIGH SCORES",styleOfText2,function(){
        titleScreen.fading = true;
        titleScreen.highScoresButton.fading = true;
//        titleScreen.highScoresButton.bg.tint = 0x00ee00;
        startButton.fading = true;
        incomingMenu = highScoresScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;
        var scoresDiv = document.getElementById("high-scores");
        scoresDiv.style.visibility = "visible";


    });
    this.optionsButton = new Button("OPTIONS",styleOfText2,function(){
        titleScreen.fading = true;
        titleScreen.optionsButton.fading = true;
//        titleScreen.optionsButton.bg.tint = 0x00ee00;
        startButton.fading = true;
        incomingMenu = optionsScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;

    });
    this.howToPlayButton = new Button("HOW TO PLAY",styleOfText2,function(){
        titleScreen.fading = true;
        titleScreen.howToPlayButton.fading = true;
//        titleScreen.howToPlayButton.bg.tint = 0x00ee00;
        startButton.fading = true;
        incomingMenu = howToPlayScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;
        var instructionsDiv = document.getElementById("instructions");
        instructionsDiv.style.visibility = "visible";
    });

    stage.removeChild(this.highScoresButton.container);
    stage.removeChild(this.optionsButton.container);
    stage.removeChild(this.howToPlayButton.container);
    this.container.addChild(this.highScoresButton.container)
    this.container.addChild(this.optionsButton.container)
    this.container.addChild(this.howToPlayButton.container)
    this.optionsButton.interactive = this.howToPlayButton.interactive = this.highScoresButton.interactive = true;
    this.optionsButton.bg.width = this.howToPlayButton.bg.width = this.highScoresButton.bg.width = this.bg.width-outerBorderSize*2;
    this.optionsButton.bg.height = this.howToPlayButton.bg.height = this.highScoresButton.bg.height = ((this.bg.height/2)/3)-(outerBorderSize/2);
//    this.highScoresButton.container.y = this.bg.y+this.bg.height-(this.optionsButton.container.height/2)-outerBorderSize/2
    this.highScoresButton.container.y = this.bg.y+this.bg.height-(this.optionsButton.container.height/2)-outerBorderSize/2
    this.howToPlayButton.container.y = this.highScoresButton.container.y-this.howToPlayButton.container.height-outerBorderSize/2;
    this.optionsButton.container.y = this.howToPlayButton.container.y-this.optionsButton.container.height-outerBorderSize/2;
    this.highScoresButton.container.visible = true;
    this.optionsButton.container.visible = true;
    this.howToPlayButton.container.visible = true;
    this.optionsButton.bg.tint = this.howToPlayButton.bg.tint = this.highScoresButton.bg.tint = this.optionsButton.origTint = this.howToPlayButton.origTint = this.highScoresButton.origTint = 0x111111;
    this.pulseLogo = function() {
        if (counter%90 < 45) {
            this.eggTitle.scale.x += 0.001;
            this.protectorTitle.scale.y += 0.001;
        } else {
            this.eggTitle.scale.x -= 0.001;
            this.protectorTitle.scale.y -= 0.001;
        }
    }
    this.fade = function() {
        this.container.alpha -= 0.12;
        this.container.scale.x *= 0.97;
        this.container.scale.y *= 0.97;
        if (this.container.alpha <= 0) {
            this.container.visible = false;
            this.fading = false;
            this.container.alpha = 1;
            this.container.scale.x = this.container.scale.y = 1;
        }
    }
    // console.log(styleOfText2.font)
    //    titleScreen.visible = false;
//    titleBG.visible = false;
}

HowToPlayScreen = function() {
    this.container = new PIXI.Container();
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.anchor.x = 0.5;
    this.bg.height = window.innerHeight-startButton.container.height-(outerBorderSize*3);
    if (window.innerWidth > window.innerHeight) {
        this.bg.width = this.bg.height;
    } else {
        this.bg.width = window.innerWidth-(ship.body.width);
    }
    this.container.addChild(this.bg);
    this.bg.tint = 0x333333;
    this.bg.x = window.innerWidth/2;
    this.bg.y = outerBorderSize;
    this.bg.alpha = 1;

    this.legend = new TextBar(1.5,"HOW TO PLAY",styleOfText2,0x777777);
    this.legend.bg.visible = false;
//    this.legend.container.x = window.innerHeight/2;
    this.legend.container.y = (this.legend.container.height/2)+outerBorderSize*1.5;
    stage.removeChild(this.legend.container);
    this.container.addChild(this.legend.container)
    this.legend.bg.width = this.bg.width-outerBorderSize*2;
    this.legend.container.y = this.bg.y
    this.legend.bg.alpha = 0.4;
    this.legend.container.y = this.bg.y+outerBorderSize/2;

    var instructionsDiv = document.getElementById("instructions");
    var instructionsMargin = outerBorderSize;
    instructionsDiv.style.font = "bold " + this.container.height/20 + "px Helvetica";
    instructionsDiv.style.padding = instructionsMargin;
    instructionsDiv.style.width = this.bg.width-instructionsMargin*4;
    instructionsDiv.style.height = this.bg.height-this.legend.container.height-instructionsMargin*2;
    instructionsDiv.style.left = this.bg.x-titleScreen.bg.width/2;
    instructionsDiv.style.top = this.legend.container.y+this.legend.container.height;
    if (isTouchDevice) {
        var touchDescription = "Tap";
    } else {
        var touchDescription = "Click"
    }
    instructionsDiv.innerHTML =("<ul><li>Protect the Egg</li><br><li>" + touchDescription + " to fire missiles</li><br><li>" + touchDescription + "  clocks to slow time  <img width='" + (this.container.height/18) + "' src='assets/clock.png'></li><br><li>Choose one upgrade between waves</li><br><li>Prevent conception for as long as possible</li></ul>")

//    this.instructions = new TextBar(1.2,"PROTECT THE EGG \n \n TAP TO DROP BOMBS \n \n TAP CLOCKS TO SLOW TIME \n \n CHOOSE ONE UPGRADE \n BETWEEN WAVES \n \n PREVENT CONCEPTION \n FOR AS LONG AS POSSIBLE",styleOfText4,0x777777);
//    this.instructions.bg.tint = this.instructions.origTint = 0x1a1a1a;
//    stage.removeChild(this.instructions.container);
//    this.container.addChild(this.instructions.container)
//
//    this.instructions.container.y = this.legend.container.y+this.legend.container.height+outerBorderSize;
//    this.instructions.bg.width = this.bg.width-outerBorderSize*4;

    this.okButton = new Button("OK",styleOfText2,function(){
//        howToPlayScreen.okButton.bg.tint = 0x00ff00;
        howToPlayScreen.container.visible = false;
        this.fading = true;
        startButton.container.visible = true;
        titleScreen.container.visible = true;
        titleScreen.howToPlayButton.container.visible = true;
        var instructionsDiv = document.getElementById("instructions");
        instructionsDiv.style.visibility = "hidden";
    });
    stage.removeChild(this.okButton.container);
    this.container.addChild(this.okButton.container);
    this.okButton.container.x = window.innerWidth/2;
    this.okButton.container.y = startButton.container.y;
    this.okButton.bg.width = startButton.bg.width;
    this.okButton.bg.height = startButton.bg.height;
    this.okButton.bg.tint = startButton.bg.tint;
    this.okButton.container.visible = true;

    stage.addChild(this.container);
    this.container.visible = false;
    this.fadeDown = function() {

    }
}

OptionsScreen = function() {
    this.container = new PIXI.Container();
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.anchor.x = 0.5;
    this.bg.height = window.innerHeight-startButton.container.height-(outerBorderSize*3);
    if (window.innerWidth > window.innerHeight) {
        this.bg.width = this.bg.height;
    } else {
        this.bg.width = window.innerWidth-(ship.body.width);
    }
    this.container.addChild(this.bg);
    this.bg.tint = 0x333333;
    this.bg.x = window.innerWidth/2;
    this.bg.y = outerBorderSize;
    this.bg.alpha = 1;

    this.legend = new TextBar(1.5,"OPTIONS",styleOfText4,0x777777);
    this.legend.bg.visible = false;
//    this.legend.container.x = window.innerHeight/2;
    this.legend.container.y = 0;
    stage.removeChild(this.legend.container);
//    this.container.addChild(this.legend.container)
    this.legend.bg.width = this.bg.width-outerBorderSize*2;
    this.legend.bg.alpha = 0.4;
//    this.legend.container.y = this.bg.y+outerBorderSize/2;
    this.legend.container.y = 0;

    this.framerateLabel = new TextBar(1.5,"INVERT COLORS",styleOfText4,0x777777);
    this.spermTailsLabel = new TextBar(1.5,"SPERM TAILS",styleOfText4,0x777777);
    this.soundLabel = new TextBar(1.5,"SOUND EFFECTS",styleOfText4,0x777777);
    this.musicLabel = new TextBar(1.5,"MUSIC",styleOfText4,0x777777);
    this.fullscreenLabel = new TextBar(1.5,"FULL SCREEN",styleOfText4,0x777777);

    stage.removeChild(this.framerateLabel.container);
    this.container.addChild(this.framerateLabel.container);
    stage.removeChild(this.spermTailsLabel.container);
    this.container.addChild(this.spermTailsLabel.container);
    stage.removeChild(this.soundLabel.container);
    this.container.addChild(this.soundLabel.container);
    stage.removeChild(this.musicLabel.container);
    this.container.addChild(this.musicLabel.container);
    stage.removeChild(this.fullscreenLabel.container);
    this.container.addChild(this.fullscreenLabel.container);
    this.framerateLabel.container.y = outerBorderSize*2;
//    this.framerateLabel.container.y = this.framerateLabel.container.height/2+outerBorderSize;
    this.framerateLabel.bg.width = this.spermTailsLabel.bg.width = this.soundLabel.bg.width = this.musicLabel.bg.width = this.fullscreenLabel.bg.width = this.bg.width-outerBorderSize*2;

    this.peasantButton = new Button("OFF",styleOfText4,function(){
        optionsScreen.peasantButton.bg.tint = 0x00ee00;
        optionsScreen.gloriousButton.bg.tint = optionsScreen.gloriousButton.origTint;
        document.getElementById('game-canvas').style="filter:invert(0%)"
        document.getElementById('result-header').style="color:white"
        document.getElementById('enemy-count').style="color:white"
    })
    this.gloriousButton = new Button("ON",styleOfText4,function(){
        optionsScreen.gloriousButton.bg.tint = 0x00ee00;
        optionsScreen.peasantButton.bg.tint = optionsScreen.peasantButton.origTint;
        document.getElementById('game-canvas').style="filter:invert(100%)"
        document.getElementById('result-header').style="color:black"
        document.getElementById('enemy-count').style="color:black"
    })
    this.tailsOffButton = new Button("OFF",styleOfText4,function(){
        optionsScreen.tailsOffButton.bg.tint = 0x00ee00;
        optionsScreen.tailsOnButton.bg.tint = optionsScreen.tailsOnButton.origTint;
        spermTails = false;
    })
    this.tailsOnButton = new Button("ON",styleOfText4,function(){
        optionsScreen.tailsOnButton.bg.tint = 0x00ee00;
        optionsScreen.tailsOffButton.bg.tint = optionsScreen.tailsOffButton.origTint;
        spermTails = true
    })
    this.soundOffButton = new Button("OFF",styleOfText4,function(){
        optionsScreen.soundOffButton.bg.tint = 0x00ee00;
        optionsScreen.soundOnButton.bg.tint = optionsScreen.soundOnButton.origTint;
        soundOn = false;
    })
    this.soundOnButton = new Button("ON",styleOfText4,function(){
        optionsScreen.soundOnButton.bg.tint = 0x00ee00;
        optionsScreen.soundOffButton.bg.tint = optionsScreen.soundOffButton.origTint;
        soundOn = true
    })
    this.musicOffButton = new Button("OFF",styleOfText4,function(){
        optionsScreen.musicOffButton.bg.tint = 0x00ee00;
        optionsScreen.musicOnButton.bg.tint = optionsScreen.musicOnButton.origTint;
        titleMusic.stop();
        musicOn = false;
    })
    this.musicOnButton = new Button("ON",styleOfText4,function(){
        playSound(titleMusic)
        optionsScreen.musicOnButton.bg.tint = 0x00ee00;
        optionsScreen.musicOffButton.bg.tint = optionsScreen.musicOffButton.origTint;
        musicOn = true
    })
    this.fullscreenOffButton = new Button("OFF",styleOfText4,function(){
        exitFullscreen();
        optionsScreen.fullscreenOffButton.bg.tint = 0x00ee00;
        optionsScreen.fullscreenOnButton.bg.tint = optionsScreen.fullscreenOnButton.origTint;
        fullScreen = false;
    })
    this.fullscreenOnButton = new Button("ON",styleOfText4,function(){
        // console.log(window.innerHeight + " old height")
        fullscreen();
        // console.log(window.innerHeight + " new height")
        optionsScreen.fullscreenOnButton.bg.tint = 0x00ee00;
        optionsScreen.fullscreenOffButton.bg.tint = optionsScreen.fullscreenOffButton.origTint;
        fullScreen = true
    })

    this.peasantButton.bg.tint = 0x00ee00;
    this.tailsOnButton.bg.tint = 0x00ee00;
    this.soundOffButton.bg.tint = 0x00ee00;
    this.musicOffButton.bg.tint = 0x00ee00;
    this.fullscreenOffButton.bg.tint = 0x00ee00;
    stage.removeChild(this.peasantButton.container);
    stage.removeChild(this.gloriousButton.container);
    this.container.addChild(this.peasantButton.container);
    this.container.addChild(this.gloriousButton.container);
    this.peasantButton.container.visible = this.gloriousButton.container.visible = true;
    this.peasantButton.container.interactive = this.gloriousButton.container.interactive = true;
    this.peasantButton.bg.width = this.gloriousButton.bg.width = (this.framerateLabel.bg.width/2)-outerBorderSize;
    this.peasantButton.container.y = this.gloriousButton.container.y = this.framerateLabel.container.y+this.framerateLabel.container.height+this.peasantButton.container.height/2+outerBorderSize/2;

    this.peasantButton.container.x -= (this.peasantButton.bg.width/2)+(outerBorderSize/2);
    this.gloriousButton.container.x += (this.peasantButton.bg.width/2)+(outerBorderSize/2);
    this.spermTailsLabel.container.y = this.framerateLabel.container.y+this.framerateLabel.container.height+this.peasantButton.container.height+outerBorderSize;

    stage.removeChild(this.tailsOffButton.container);
    stage.removeChild(this.tailsOnButton.container);
    this.container.addChild(this.tailsOffButton.container);
    this.container.addChild(this.tailsOnButton.container);
    this.tailsOffButton.container.visible = this.tailsOnButton.container.visible = true;
    this.tailsOffButton.container.interactive = this.tailsOnButton.container.interactive = true;
    this.tailsOffButton.bg.width = this.tailsOnButton.bg.width = (this.framerateLabel.bg.width/2)-outerBorderSize;
    this.tailsOffButton.container.y = this.tailsOnButton.container.y = this.spermTailsLabel.container.y+this.spermTailsLabel.container.height+this.tailsOffButton.container.height/2+outerBorderSize/2;

    this.tailsOffButton.container.x -= (this.tailsOffButton.bg.width/2)+(outerBorderSize/2);
    this.tailsOnButton.container.x += (this.tailsOnButton.bg.width/2)+(outerBorderSize/2);

    this.soundLabel.container.y = this.spermTailsLabel.container.y+this.spermTailsLabel.container.height+this.tailsOffButton.container.height+outerBorderSize;

    stage.removeChild(this.soundOffButton.container);
    stage.removeChild(this.soundOnButton.container);
    this.container.addChild(this.soundOffButton.container);
    this.container.addChild(this.soundOnButton.container);
    this.soundOffButton.container.visible = this.soundOnButton.container.visible = true;
    this.soundOffButton.container.interactive = this.soundOnButton.container.interactive = true;
    this.soundOffButton.bg.width = this.soundOnButton.bg.width = (this.framerateLabel.bg.width/2)-outerBorderSize;
    this.soundOffButton.container.y = this.soundOnButton.container.y = this.soundLabel.container.y+this.soundLabel.container.height+this.soundOffButton.container.height/2+outerBorderSize/2;

    this.soundOffButton.container.x -= (this.soundOffButton.bg.width/2)+(outerBorderSize/2);
    this.soundOnButton.container.x += (this.soundOnButton.bg.width/2)+(outerBorderSize/2);

//    this.fullscreenLabel.container.y = this.soundLabel.container.y+this.soundLabel.container.height+this.soundOffButton.container.height+outerBorderSize;
    this.musicLabel.container.y = this.soundLabel.container.y+this.soundLabel.container.height+this.soundOffButton.container.height+outerBorderSize;

//    stage.removeChild(this.fullscreenOffButton.container);
//    stage.removeChild(this.fullscreenOnButton.container);
//    this.container.addChild(this.fullscreenOffButton.container);
//    this.container.addChild(this.fullscreenOnButton.container);

    stage.removeChild(this.musicOffButton.container);
    stage.removeChild(this.musicOnButton.container);
    this.container.addChild(this.musicOffButton.container);
    this.container.addChild(this.musicOnButton.container);

//    this.fullscreenOffButton.container.visible = this.fullscreenOnButton.container.visible = true;
//    this.fullscreenOffButton.container.interactive = this.fullscreenOnButton.container.interactive = true;
//    this.fullscreenOffButton.bg.width = this.fullscreenOnButton.bg.width = (this.framerateLabel.bg.width/2)-outerBorderSize;
//    this.fullscreenOffButton.container.y = this.fullscreenOnButton.container.y = this.fullscreenLabel.container.y+this.fullscreenLabel.container.height+this.fullscreenOffButton.container.height/2+outerBorderSize/2;
//
//    this.fullscreenOffButton.container.x -= (this.fullscreenOffButton.bg.width/2)+(outerBorderSize/2);
//    this.fullscreenOnButton.container.x += (this.fullscreenOnButton.bg.width/2)+(outerBorderSize/2);

    this.musicOffButton.container.visible = this.musicOnButton.container.visible = true;
    this.musicOffButton.container.interactive = this.musicOnButton.container.interactive = true;
    this.musicOffButton.bg.width = this.musicOnButton.bg.width = (this.framerateLabel.bg.width/2)-outerBorderSize;
    this.musicOffButton.container.y = this.musicOnButton.container.y = this.musicLabel.container.y+this.musicLabel.container.height+this.musicOffButton.container.height/2+outerBorderSize/2;

    this.musicOffButton.container.x -= (this.musicOffButton.bg.width/2)+(outerBorderSize/2);
    this.musicOnButton.container.x += (this.musicOnButton.bg.width/2)+(outerBorderSize/2);

    this.okButton = new Button("OK",styleOfText2,function(){
//        optionsScreen.okButton.bg.tint = 0x00ff00;
        optionsScreen.container.visible = false;
        this.fading = true;
        startButton.container.visible = true;
        titleScreen.container.visible = true;
        titleScreen.optionsButton.container.visible = true;
    });
    stage.removeChild(this.okButton.container);
    this.container.addChild(this.okButton.container);
    this.okButton.container.x = window.innerWidth/2;
    this.okButton.container.y = startButton.container.y;
    this.okButton.bg.width = startButton.bg.width;
    this.okButton.bg.height = startButton.bg.height;
    this.okButton.bg.tint = startButton.bg.tint;
    this.okButton.container.visible = true;

    stage.addChild(this.container);
    this.container.visible = false;
    this.fadeDown = function() {

    }

    this.fullscreenLabel.container.visible = this.fullscreenOffButton.container.visible = this.fullscreenOnButton.container.visible = false;
}
function TextBar(linesY,text,style,bgColor) {
    this.container = new PIXI.Container();
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.tint = this.origTint = bgColor;
    this.bg.anchor.x = 0.5;
    this.bg.x = window.innerWidth/2;
    this.bg.y = window.innerHeight/2;

    this.text = new PIXI.Text(text,style);

//    this.text.style = style;
    this.text.anchor.x = this.text.anchor.y = 0.5;
    this.text.x = this.bg.x;
    this.text.y = this.bg.y+this.text.height/2;
    this.container.addChild(this.bg);
    this.container.addChild(this.text);
    this.bg.height = this.text.height*linesY;
    this.text.y = this.bg.y+(this.bg.height/2)
    stage.addChild(this.container);
    this.container.x = this.container.pivot.x = window.innerWidth/2
    this.container.y = this.container.pivot.y = window.innerHeight/2
}
AddTurretInterface = function(type) {
    this.container = new PIXI.Container();
    this.legend = new Button("DRAG TO PLACE\n" + chosenUpgrade.toUpperCase() + " TURRET",styleOfText2,function(){});
    this.legend.container.x = ship.container.x;
    this.legend.container.y = window.innerHeight/7;
    this.legend.container.visible = true;
    stage.addChild(this.legend.container);
    this.dummy = new PIXI.Sprite(largeSphereText);
    this.dummy.anchor.set(0.5)
    this.dummy.width = this.dummy.height = ship.body.width*container.scale.x;
    this.dummy.x = ship.container.x;
    this.dummy.y = ship.container.y;
    this.dummy.tint = 0x338833;
    this.dummy.alpha = 0;
    this.container.addChild(this.dummy);
    this.newTurret = new PIXI.Sprite(turretText);
    this.newTurret.tint = turretColors[type];
    this.newTurret.width = spermWidth*2*container.scale.x;
    this.newTurret.height = spermWidth*container.scale.y;
    this.newTurret.anchor.x = 0;
    this.newTurret.anchor.y = 0.5;
//    this.newTurret.scale.x = this.newTurret.scale.y = container.scale.x;
    this.newTurret.rotation -= degToRad(90);
    this.newTurret.x = window.innerWidth/2;
    this.newTurret.y = this.dummy.y-this.dummy.height/1.7;
    this.container.addChild(this.newTurret);
    this.container.pivot.x = this.container.x = ship.container.x;
    this.container.pivot.y = this.container.y = ship.container.y;
    this.okButton = new Button("OK",styleOfText2,function(){
        playSound(attachTurretSound);
        addTurretInterface.okButton.bg.tint = 0x00ee00;
        addTurretInterface.newTurret.visible = false;
        ship.addTurrets(1,type,addTurretInterface.container.rotation);
        upgrading = false;
        this.fading = true;
        addTurretInterface.legend.container.visible = false;
        
        for (var t=0;t<ship.turrets.length;t++) {
            ship.turrets[t].sprite.alpha = 1;
        }
        if (playerScore>=2) {
            document.getElementById("turret-choice-screen").style.left = "0"
        } else {
            showInterstitial()
        }
    });
//    stage.removeChild(this.okButton);
//    this.container.addChild(this.okButton);
    this.okButton.container.x = window.innerWidth/2;
    this.okButton.container.y = startButton.container.y;
    this.okButton.bg.width = startButton.bg.width;
    this.okButton.bg.height = startButton.bg.height;
    this.okButton.bg.tint = startButton.bg.tint;
    this.okButton.container.visible = true;
    stage.addChild(this.container);

}

function TurretChoiceScreen() {
    this.container = new PIXI.Container();
    this.legend = new TextBar(1.5,"CHOOSE TURRET TYPE",styleOfText2,0x1a1a1a);
    this.legend.bg.alpha = 1;
    this.legend.container.y = outerBorderSize*2;
    this.laserButton = new Button("LASER",styleOfText2,function(){
//        turretChoiceScreen.laserButton.bg.tint = 0x00ff00;

        chosenUpgrade = "Laser";
        upgrading = true;
        startWaveButton.container.visible = false;
        turretChoiceScreen.container.visible = false;
        
    });
    this.iceButton = new Button("ICE",styleOfText2,function(){
//        turretChoiceScreen.iceButton.bg.tint = 0x00ff00;

        chosenUpgrade = "Ice";
        upgrading = true;
        startWaveButton.container.visible = false;
        turretChoiceScreen.container.visible = false;

    });
    this.fireButton = new Button("FIRE",styleOfText2,function(){
//        turretChoiceScreen.fireButton.bg.tint = 0x00ff00;

        chosenUpgrade = "Fire";
        upgrading = true;
        startWaveButton.container.visible = false;
        turretChoiceScreen.container.visible = false;

    });
    this.rocketButton = new Button("ROCKET",styleOfText2,function(){
//        turretChoiceScreen.rocketButton.bg.tint = 0x00ff00;

        chosenUpgrade = "Rocket";
        upgrading = true;
        startWaveButton.container.visible = false;
        turretChoiceScreen.container.visible = false;

    });
    this.zVirusButton = new Button("Z-VIRUS",styleOfText2,function(){
//        turretChoiceScreen.rocketButton.bg.tint = 0x00ff00;

        chosenUpgrade = "Virus";
        upgrading = true;
        startWaveButton.container.visible = false;
        turretChoiceScreen.container.visible = false;

    });
    this.laserButton.container.visible = this.iceButton.container.visible = this.fireButton.container.visible = this.rocketButton.container.visible =this.zVirusButton.container.visible = true;
    this.laserButton.container.y = this.legend.container.y+this.legend.container.height/2+this.laserButton.container.height/2+outerBorderSize*2;
    this.iceButton.container.y = this.laserButton.container.y+this.laserButton.container.height/2+this.iceButton.container.height/2+outerBorderSize/2;
    this.fireButton.container.y = this.iceButton.container.y+this.iceButton.container.height/2+this.fireButton.container.height/2+outerBorderSize/2;
    this.rocketButton.container.y = this.fireButton.container.y+this.fireButton.container.height/2+this.rocketButton.container.height/2+outerBorderSize/2;
    this.zVirusButton.container.y = this.rocketButton.container.y+this.rocketButton.container.height/2+this.zVirusButton.container.height/2+outerBorderSize/2;
    stage.removeChild(this.laserButton.container);
    stage.removeChild(this.iceButton.container);
    stage.removeChild(this.fireButton.container);
    stage.removeChild(this.rocketButton.container);
    stage.removeChild(this.zVirusButton.container);
    turretButtons.push(this.laserButton);
    turretButtons.push(this.iceButton);
    turretButtons.push(this.fireButton);
    turretButtons.push(this.rocketButton);
    turretButtons.push(this.zVirusButton);
    this.container.addChild(this.legend.container);
    this.container.addChild(this.laserButton.container);
    this.container.addChild(this.iceButton.container);
    this.container.addChild(this.fireButton.container);
    this.container.addChild(this.rocketButton.container);
    this.container.addChild(this.zVirusButton.container);
    this.container.visible = false;
    stage.addChild(this.container)

}
TurretUpgradeChoiceScreen = function() {
    this.container = new PIXI.Container();
    this.container.pivot.x = this.container.x = window.innerWidth/2;
    this.container.pivot.y = this.container.y = window.innerHeight/2;
    this.fading = false;
    this.legend = new TextBar(1.5,"CHOOSE UPGRADE TYPE",styleOfText2,0x1a1a1a);
    this.legend.bg.alpha = 1;
    this.legend.container.y = outerBorderSize*2;
    this.powerButton = new Button("POWER",styleOfText2,function(){
        turretUpgradeChoiceScreen.powerButton.bg.tint = 0x00ee00;
        ship.upgradeTurrets("Power");
        // startWaveButton.container.visible = true;
        turretUpgradeChoiceScreen.fading = true;
        if (playerScore>=1) {
            showInterstitial()
        }
    });
    this.rangeButton = new Button("RANGE",styleOfText2,function(){
        turretUpgradeChoiceScreen.rangeButton.bg.tint = 0x00ee00;
        ship.upgradeTurrets("Range");
        // startWaveButton.container.visible = true;
        turretUpgradeChoiceScreen.fading = true;
        if (upgradesLeft) {
            showInterstitial()
        }

    });
    this.fireRateButton = new Button("FIRE RATE",styleOfText2,function(){
        turretUpgradeChoiceScreen.fireRateButton.bg.tint = 0x00ee00;
        ship.upgradeTurrets("Fire Rate");

        // startWaveButton.container.visible = true;
        turretUpgradeChoiceScreen.fading = true;
        if (upgradesLeft) {
            showInterstitial()
        }

    });
    this.powerButton.container.visible = true;
    this.rangeButton.container.visible = true;
    this.fireRateButton.container.visible = true;
    this.powerButton.container.interactive = false;
//    this.rangeButton.container.interactive = false;
//    this.fireRateButton.container.interactive = false;
    this.powerButton.text.alpha = 0.3;
//    this.rangeButton.text.alpha = 0.3;
//    this.fireRateButton.text.alpha = 0.3;
    this.showCorrectOptions = function() {
        if (ship.hasTurret("Rocket") || ship.hasTurret("Fire") || ship.hasTurret("Ice") || ship.hasTurret("Virus")) {
            this.powerButton.text.alpha = 1;
            this.powerButton.container.interactive = true;

        }
//        if (ship.hasTurret("Rocket") || ship.hasTurret("Fire")) {
//            this.fireRateButton.text.alpha = 1;
//            this.fireRateButton.container.interactive = true;
//        }
    }


    this.powerButton.container.y = this.legend.container.y+this.legend.container.height/2+this.powerButton.container.height/2+outerBorderSize*2;
    this.rangeButton.container.y = this.powerButton.container.y+this.powerButton.container.height/2+this.rangeButton.container.height/2+outerBorderSize/2;
    this.fireRateButton.container.y = this.rangeButton.container.y+this.rangeButton.container.height/2+this.fireRateButton.container.height/2+outerBorderSize/2;
    stage.removeChild(this.powerButton.container);
    stage.removeChild(this.rangeButton.container);
    stage.removeChild(this.fireRateButton.container);
    turretButtons.push(this.powerButton);
    turretButtons.push(this.rangeButton);
    turretButtons.push(this.fireRateButton);
    this.container.addChild(this.legend.container);
    this.container.addChild(this.powerButton.container);
    this.container.addChild(this.rangeButton.container);
    this.container.addChild(this.fireRateButton.container);
    this.container.visible = false;

    this.fadeDown = function() {
        this.container.alpha -= 0.1;
        this.container.scale.x *= 0.97;
        this.container.scale.y *= 0.97;

        if (this.container.alpha <= 0) {
            this.container.visible = false;
            this.fading = false;
            this.container.scale.x = this.container.scale.y = this.container.alpha = 1;
            this.powerButton.bg.tint = this.powerButton.origTint;
            this.rangeButton.bg.tint = this.rangeButton.origTint;
            this.fireRateButton.bg.tint = this.fireRateButton.origTint;
        };
    }
    stage.addChild(this.container)

}
BeeUpgradeChoiceScreen = function() {
    this.container = new PIXI.Container();
    this.container.pivot.x = this.container.x = window.innerWidth/2;
    this.container.pivot.y = this.container.y = window.innerHeight/2;
    this.fading = false;
    this.legend = new TextBar(1.5,"CHOOSE UPGRADE TYPE",styleOfText2,0x1a1a1a);
    this.legend.bg.alpha = 1;
    this.legend.container.y = outerBorderSize*2;
    this.powerButton = new Button("POWER",styleOfText2,function(){
        beeUpgradeChoiceScreen.powerButton.bg.tint = 0x00ee00;
        upgradeBees("Power");

        startWaveButton.container.visible = true;
        beeUpgradeChoiceScreen.fading = true;
        playSound(beeStingSound);
        if (upgradesLeft) {
            showInterstitial()
        }
    });
    this.speedButton = new Button("SPEED",styleOfText2,function(){
        beeUpgradeChoiceScreen.speedButton.bg.tint = 0x00ee00;
        upgradeBees("Speed");
        startWaveButton.container.visible = true;
        beeUpgradeChoiceScreen.fading = true;
        playSound(beeStingSound);
        if (upgradesLeft) {
            showInterstitial()
        }

    });
    this.rangeButton = new Button("RANGE",styleOfText2,function(){
        beeUpgradeChoiceScreen.rangeButton.bg.tint = 0x00ee00;
        upgradeBees("Range");
        startWaveButton.container.visible = true;
        beeUpgradeChoiceScreen.fading = true;
        playSound(beeStingSound);
        if (upgradesLeft) {
            showInterstitial()
        }

    });
    this.fireRateButton = new Button("HEALING",styleOfText2,function(){
        beeUpgradeChoiceScreen.fireRateButton.bg.tint = 0x00ee00;
        upgradeBees("Healing");

        startWaveButton.container.visible = true;
        beeUpgradeChoiceScreen.fading = true;
        playSound(beeStingSound);
        if (upgradesLeft) {
            showInterstitial()
        }

    });
    this.powerButton.container.visible = true;
    this.speedButton.container.visible = true;
    this.rangeButton.container.visible = true;
    this.fireRateButton.container.visible = true;

    this.powerButton.container.y = this.legend.container.y+this.legend.container.height/2+this.powerButton.container.height/2+outerBorderSize*2;
    this.speedButton.container.y = this.powerButton.container.y+this.powerButton.container.height/2+this.speedButton.container.height/2+outerBorderSize/2;
    this.rangeButton.container.y = this.speedButton.container.y+this.speedButton.container.height/2+this.rangeButton.container.height/2+outerBorderSize/2;
    this.fireRateButton.container.y = this.rangeButton.container.y+this.rangeButton.container.height/2+this.fireRateButton.container.height/2+outerBorderSize/2;
    stage.removeChild(this.powerButton.container);
    stage.removeChild(this.speedButton.container);
    stage.removeChild(this.rangeButton.container);
    stage.removeChild(this.fireRateButton.container);
    turretButtons.push(this.powerButton);
    turretButtons.push(this.speedButton);
    turretButtons.push(this.rangeButton);
    turretButtons.push(this.fireRateButton);
    this.container.addChild(this.legend.container);
    this.container.addChild(this.powerButton.container);
    this.container.addChild(this.speedButton.container);
    this.container.addChild(this.rangeButton.container);
    this.container.addChild(this.fireRateButton.container);
    this.container.visible = false;

    this.fadeDown = function() {
        this.container.alpha -= 0.1;
        this.container.scale.x *= 0.97;
        this.container.scale.y *= 0.97;

        if (this.container.alpha <= 0) {
            this.container.visible = false;
            this.fading = false;
            this.container.scale.x = this.container.scale.y = this.container.alpha = 1;
            this.powerButton.bg.tint = this.powerButton.origTint;
            this.speedButton.bg.tint = this.speedButton.origTint;
            this.rangeButton.bg.tint = this.rangeButton.origTint;
            this.fireRateButton.bg.tint = this.fireRateButton.origTint;
        };
    }
    stage.addChild(this.container)

}
createOptionsMenu = function() {
    
    chooseOneLegend = new TextBar(1.5,"",styleOfText2,0x1a1a1a);
//    this.legend.bg.alpha = 0;
    chooseOneLegend.container.y = outerBorderSize*2;
    chooseOneLegend.container.visible = false;


    addTurretInterface = undefined;
    addTurretButton = new Button("ADD TURRET",styleOfText2,function() {
        upgradesLeft--
        updateStatDisplays()
        addTurretButton.bg.tint = 0x00ee00;
        
        for (var o=0;o<optionButtons.length;o++) {
            optionButtons[o].fading = true;
        }
        startWaveButton.container.visible = false;
//        turretChoiceScreen.container.visible = true;
        incomingMenu = turretChoiceScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;
        chooseOneLegend.container.visible = false;

    },true);
    upgradeTurretsButton = new Button("UPGRADE TURRETS",styleOfText2,function() {
        upgradesLeft--
        updateStatDisplays()
        upgradeTurretsButton.bg.tint = 0x00ee00;
        for (var o=0;o<optionButtons.length;o++) {
            optionButtons[o].fading = true;
        }
        startWaveButton.container.visible = false;
        incomingMenu = turretUpgradeChoiceScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;
        incomingMenu.showCorrectOptions();
        chooseOneLegend.container.visible = false;

    },true);
    upgradeBeesButton = new Button("UPGRADE BEES",styleOfText2,function() {
        upgradesLeft--
        updateStatDisplays()
        upgradeBeesButton.bg.tint = 0x00ee00;
        for (var o=0;o<optionButtons.length;o++) {
            optionButtons[o].fading = true;
        }
        startWaveButton.container.visible = false;
        incomingMenu = beeUpgradeChoiceScreen;
        incomingMenu.container.visible = true;
        incomingMenu.container.alpha = 0.5;
        chooseOneLegend.container.visible = false;

//        incomingMenu.showCorrectOptions();
    },true);

    addBeeButton = new Button("ADD BEES",styleOfText2,function() {
        upgradesLeft--
        updateStatDisplays()
        ship.addBees(2);
        playSound(beeStingSound)
        
        addBeeButton.bg.tint = 0x00ee00;
        if (upgradesLeft) {
            setTimeout(function(){
                addBeeButton.bg.tint = 0x000000
            },200)
        } else {
            for (var o=0;o<optionButtons.length;o++) {
                optionButtons[o].fading = true;
            }
            chooseOneLegend.container.visible = false;
        }
        

//        if (wave % 2 === 0 && beeRate > 10) {
//            beeRate--;
//        }
    },true);
    startButton = new Button(" START ",styleOfText2,function() {
        gameInitiated = true;
        startButton.fading = true;
        startButton.bg.tint = 0x00ee00;
        for (var o=0;o<optionButtons.length;o++) {
            optionButtons[o].fading = true;
        }
        if (titleScreen.container.visible) {
            titleScreen.fading = true;
        }
        if (optionsScreen.container.visible) {
            optionsScreen.container.visible = false;
        }
        if (musicOn) {
            titleMusic.fade(0.3,0.0,600);
            bgMusic.play();
            bgMusic.fade(0.0,0.3,1000);
        }
        chooseOneLegend.container.visible = false;
        startNextWave()
    })
    startWaveButton = new Button(" START \n WAVE 1",styleOfText2,function() {
        startNextWave()
        if (musicOn) {
            bgMusic.fade(0.0,0.3,600);
        }
        startWaveButton.fading = true;
        startWaveButton.bg.tint = 0x00ee00;
        for (var o=0;o<optionButtons.length;o++) {
            optionButtons[o].fading = true;
        }
        
        chooseOneLegend.container.visible = false;


    })

    waveClearButton = new Button("WAVE " + (wave) + "\nCLEAR!",styleOfText2,function(){});
    waveClearButton.bg.width *= 2;
    waveClearButton.bg.height *= 3;
    waveClearButton.bg.alpha = 1;
    waveClearButton.container.x = ship.container.x;
    waveClearButton.container.y = ship.container.y;

    startWaveButton.bg.width *= 2;
    startWaveButton.bg.height *= 1.25;
    startWaveButton.bg.tint = startWaveButton.origTint = 0x1a1a1a;
    startButton.container.visible = true;
    startButton.bg.width = startWaveButton.bg.width;
    startButton.bg.height = startWaveButton.bg.height;
    startButton.bg.tint = startButton.origTint = 0x1a1a1a;

    loseScreen = new Button("YOU LOSE\nWave: " + wave + "\nScore: " + playerScore,styleOfText2,function() {

        container.children = [];
        setOptions();
        loseScreen.container.visible = false;
        hideWaveGUI()
        titleMusic.volume(0.3)
        titleMusic.stop();
        init(true);

    });
    loseScreen.bg.width *= 1.8;
    loseScreen.bg.height *= 3;
    loseScreen.bg.texture = fetusText;
    loseScreen.bg.tint = 0x662222;
    loseScreen.bg.alpha = 0;

//    laserTurretButton.container.visible = true;


//    fireTurretButton.container.visible = true;
//    iceTurretButton.container.visible = true;

    loseScreen.container.y = window.innerHeight/2;
    loseScreen.container.scale.x = 0.2;
    loseScreen.container.scale.y = 0.2;


    startButton.container.y = window.innerHeight-(startButton.container.height/2)-outerBorderSize;
    upgradeTurretsButton.container.y = startButton.container.y-startButton.container.height/2-upgradeTurretsButton.container.height/2-outerBorderSize*3.5;
    upgradeBeesButton.container.y = upgradeTurretsButton.container.y-upgradeTurretsButton.container.height/2-upgradeBeesButton.container.height/2-outerBorderSize/3;
    addBeeButton.container.y = upgradeBeesButton.container.y-upgradeBeesButton.container.height/2-addBeeButton.container.height/2-outerBorderSize/3;
    addTurretButton.container.y = addBeeButton.container.y-addBeeButton.container.height/2-addTurretButton.container.height/2-outerBorderSize/3;

    startWaveButton.container.y = window.innerHeight-(startWaveButton.container.height/2)-outerBorderSize;
    upgradeBeesButton.text.tint = upgradeTurretsButton.text.tint = 0x555555;
    upgradeBeesButton.container.interactive = upgradeTurretsButton.container.interactive = false;

//    weaponSelectArea = new WeaponSelect();
}
function disableBut(limit) {
    if (limit === 2) {
        var buttons = document.getElementsByClassName('button upgrade-button')
        for (var b=0;b<buttons.length;b++) {
            if (buttons[b].id[0]==="l") {
                // nothing
            } else {
                buttons[b].disabled = true
            }
        }
    }
}
function disableButtons(excludeBeeUpgrades) {
    var buttons = document.getElementsByClassName('button')
    for (var b=0;b<buttons.length;b++) {
        buttons[b].disabled = true
    }
}
function enableButtons() {
    var buttons = document.getElementsByClassName('button')
    for (var b=0;b<buttons.length;b++) {
        buttons[b].disabled = false
    }
    document.getElementById('result-upgrade-button').disabled = false
    document.getElementById('main-upgrade-title').style.border = "0.25vh solid green"
    document.getElementById('turret-point-count').style.border = "0.25vh solid green"
}
function updateStatDisplays() {
    // enemies remaining
    
    // remainingCount.innerHTML = (currentLoadSize-killedThisWave) + " enemies remaining"
    
    // cash
    var cash = prettyCash(playerScore)
    cashCount.innerHTML = cash
    document.getElementById("main-upgrade-title").innerHTML = "Bank: <span style='color:green'>"+cash+"</span>"
    document.getElementById("turret-point-count").innerHTML = "Bank: <span style='color:green'>"+cash+"</span>"
    document.getElementById("bank-result-display").innerHTML = "Bank: "+cash
    // wave
    document.getElementById("upgrade-ok-button").innerHTML = "START WAVE<br>"+wave
    document.getElementById("result-next-button").innerHTML = "START WAVE<br>"+wave
    // disable buy buttons if too little cash
    // if (!waveStarted) {
        
        if (playerScore-Math.round((100-egg.hp)*1.4) < 0 || egg.hp===100) {
            document.getElementById('heal-all-button').disabled = true
        }
        if (playerScore-15 < 0) {
            // console.log("invis but nihha")
            document.getElementById('heal-ten-button').disabled = true
        }
        if (playerScore-10 < 0) {
            // console.log("invis but nihha")
            document.getElementById('buy-virus-button').disabled = true
        }
        if (playerScore-5 < 0) {
            document.getElementById('buy-rocket-button').disabled = true
            // document.getElementById('add-bees-button').disabled = true
        }
        if (playerScore-4 < 0) {
            document.getElementById('buy-laser-button').disabled = true
        }
        if (playerScore-2 < 0) {
            document.getElementById('buy-ice-button').disabled = true
        }
        if (playerScore < 2) {
            document.getElementById('add-turret-button').disabled = true
            disableBut(2)
        }
        if (playerScore < 1) {
            document.getElementById('main-upgrade-title').style.border = "0.25vh solid red"
            document.getElementById('turret-point-count').style.border = "0.25vh solid red"
            document.getElementById('result-upgrade-button').disabled = true
            disableButtons()
            pulseButton(document.getElementById("upgrade-ok-button"),'green')
        }
    // }
}
function WeaponSelect() {
    this.container = new PIXI.Container();
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.anchor.set(0.5);
    this.bg.height = ship.body.width*1.25;
    this.bg.width = this.bg.height*2;
    this.bg.tint = 0x000000;
    stage.addChild(this.container);
    this.container.x = window.innerWidth-(this.bg.width/2);
    this.container.y = window.innerHeight-(this.bg.height/2);
    this.beeButton = new PIXI.Sprite(beeText);
    this.beeButton.alpha = 0.25;
    this.clickbombButton = new PIXI.Sprite(largeSphereText);
    this.beeButton.interactive = this.clickbombButton.interactive = true;
    this.beeButton.anchor.set(0.5);
    this.clickbombButton.anchor.set(0.5);
    this.clickbombButton.owner = this.beeButton.owner = this;
    this.clickbombButton.tint = 0xff0000;
    this.clickbombButton.alpha = 0.6;
    this.clickbombButton.width = this.clickbombButton.height = this.beeButton.width = this.beeButton.height = this.bg.height/1.5;
    this.clickbombButton.y = this.beeButton.y = 0;
    this.clickbombButton.x = (this.bg.width/2)-(this.bg.height/2);
    this.beeButton.x = this.clickbombButton.x-this.bg.height;
    this.container.addChild(this.bg);
    this.container.addChild(this.clickbombButton);
    this.container.addChild(this.beeButton);

    this.selected = this.clickbombButton;
    this.selector = new PIXI.Sprite(tileText);
    this.selector.width = this.selector.height = this.bg.height;
    this.selector.tint = 0x00ee00;
    this.selector.alpha = 0.15;
    this.selector.anchor.set(0.5);
    this.selector.x = this.selected.x;
    this.selector.y = this.selected.y;
    this.container.addChild(this.selector);
    this.select = function(selection) {

    }
    this.clickbombButton.on('mousedown',function(){
        clickWeapon = "clickbomb";
        this.owner.selector.x = this.x;
    });
    this.beeButton.on('mousedown',function(){
        if (this.alpha === 1) {
            clickWeapon = "bee";
            this.owner.selector.x = this.x;
        };
    })
    this.clickbombButton.on('touchstart',function(){
        clickWeapon = "clickbomb";
        this.owner.selector.x = this.x;
    });
    this.beeButton.on('touchstart',function(){
        if (this.alpha === 1) {
            clickWeapon = "bee";
            this.owner.selector.x = this.x;
        };
    })
    this.container.interactive = true;
    this.container.on('mousedown',function(){
        clickingMenu = true;
    })
    this.container.on('mouseup',function(){
        clickingMenu = false;
    })
    this.container.on('mouseupoutside',function(){
        clickingMenu = false;
    })
    this.container.on('touchstart',function(){
        clickingMenu = true;
    })
    this.container.on('touchend',function(){
        clickingMenu = false;
    })
    this.container.on('touchendoutside',function(){
        clickingMenu = false;
    })

    this.container.visible = false;



}

function Button(text,styleSheet,action,option) {
    this.container = new PIXI.Container();
    this.fading = false;
    this.bg = new PIXI.Sprite(pixelText);
    this.bg.tint = this.origTint = 0x000000;
    this.bg.anchor.x = this.bg.anchor.y = 0.5;
    this.bg.x = window.innerWidth/2;
    this.bg.y = window.innerHeight/2;
    this.text = new PIXI.Text(text);
    this.text.style = styleSheet;
//    this.text.style.font = "bold " + fontSize + " Helvetica";
    this.text.anchor.x = this.text.anchor.y = 0.5;
    this.text.x = this.bg.x;
    this.text.y = this.bg.y;

    this.bg.alpha = 0.9;
    this.container.addChild(this.bg);
    this.container.addChild(this.text);
    stage.addChild(this.container);
    this.container.x = this.container.pivot.x = window.innerWidth/2
    this.container.y = this.container.pivot.y = window.innerHeight/2
    this.bg.width = this.container.width+ship.body.width/3;
    this.bg.height = this.container.height+ship.body.width/3;
    this.container.touchAction = function(){
        if (counter-clicked > 20) {

            action();
            playSound(selectSound)
        }
    }
    this.container.visible = false;
    this.fadeDown = function() {
        this.container.alpha -= 0.1;
        this.container.scale.x *= 0.95;
        this.container.scale.y *= 0.95;
        if (incomingMenu) {
        if (incomingMenu.container.alpha+0.05 < 1) {
            incomingMenu.container.alpha += 0.05;
        } else {
            incomingMenu.container.alpha = 1;
        }
        }
        if (this.container.alpha <= 0) {
            this.container.visible = false;
            this.fading = false;
            this.container.scale.x = this.container.scale.y = this.container.alpha = 1;
            this.bg.tint = this.origTint;


        };
    }

    if (option) {
        optionButtons.push(this);
    }
    this.container.interactive = true;
    this.container.on("touchstart",this.container.touchAction);
    this.container.on("mousedown",this.container.touchAction);

}

//function Hamburger() {
//    this.sprite = new PIXI.Sprite(hamburgerText);
//    this.sprite.width = this.sprite.height = hamburgerWidth;
//    this.sprite.x = this.sprite.y = 0;
//    this.sprite.tint = "0x999999";
//    this.sprite.alpha = 0.8;
//
//    stage.addChild(this.sprite);
//}
//function ClearButton() {
//    this.sprite = new PIXI.Sprite(pixelText);
//    this.sprite.width = hamburgerWidth*1.5;
//
//    this.sprite.x = this.sprite.y = 0;
//    this.sprite.alpha = 0;
//    this.styleOfText = {
//        font : '20px Arial bold ',
//        fill : '#efefef',
//        stroke : "#555555",
//        strokeThickness : 2
//    };
//    this.text1 = new PIXI.Text("CLEAR",this.styleOfText);
//    this.text1.anchor.x = 0.5;
//    this.text1.ratio = this.text1.width/this.text1.height;
//    this.text1.width = this.sprite.width*0.65;
//    this.text1.height = this.text1.width/this.text1.ratio;
//    this.sprite.height = (this.text1.height)*1.1;
//    this.sprite.x = currentSize.x-this.sprite.width;
//    this.sprite.y = 0;
//    this.text1.style.alpha = 0.25;
//    this.text1.x = this.sprite.x+(this.sprite.width/2);
//    this.text1.y = this.sprite.height*0.1;
//    this.sprite.interactive = true;
//    this.text1.interactive = true;
//    this.touchAction = function() {
//        justCleared = true;
//        resetBoard();
//    }
//    this.liftAction = function() {
//        justCleared = false;
//    }
//    this.sprite.on("touchstart",this.touchAction);
//    this.sprite.on("touchendoutside",this.liftAction);
//    this.sprite.on("mousedown",this.touchAction);
//    this.sprite.on("mouseupoutside",this.liftAction);
//
//    this.text1.on("touchstart",this.touchAction);
//    this.text1.on("touchendoutside",this.liftAction);
//    this.text1.on("mousedown",this.touchAction);
//    this.text1.on("mouseupoutside",this.liftAction);
//    this.text1.alpha = 0.75
//
//
//    stage.addChild(this.sprite);
//    stage.addChild(this.text1);
//
//}
//function TextLine(button,contents) {
//    this.text = new PIXI.Text(contents,styleOfText);
//    var WHRatio = this.text.height/this.text.width;
//    this.text.height = button.sprite.height*0.8;
//    this.text.width = this.text.height/WHRatio;
//    this.text.ownButton = button;
//    this.text.x = menubg.x+hamburgerWidth/2;
//    this.text.y = button.sprite.y+(button.sprite.height/2)-(this.text.height/2);
//
//    this.text.interactive = true;
//    this.text.on("touchstart",function() {
//        this.ownButton.sprite.toggle();
//    });
//    this.text.on("mousedown",function() {
//        this.ownButton.sprite.toggle();
//    });
//    menuContainer.addChild(this.text);
//}
//
//function Scrollbar(scrollObject) {
//    this.groove = new PIXI.Sprite(pixelText);
//    this.slider = new PIXI.Sprite(pixelText);
//    this.groove.tint = 0x3b3b3b;
//    this.slider.tint = 0x777777;
//    this.groove.x = scrollObject.x+scrollObject.width;
//    this.groove.y = scrollObject.y;
//    this.groove.width = menubg.width*scrollbarWidth;
//    this.groove.height = scrollObject.height;
//    this.slider.padding = this.groove.width*0.1;
//    this.slider.width = this.groove.width-(this.slider.padding*2);
//    this.slider.height = scrollObject.height/6;
//    this.slider.x = this.groove.x+this.slider.padding;
//    this.slider.y = this.slider.homeSpot = this.groove.y+this.slider.padding;
//    this.slider.endSpot = scrollObject.y+scrollObject.height-this.slider.height-this.slider.padding;
//
//    this.slider.grabbed = false;
//    this.slider.interactive = true;
//
//    this.slider.on("touchstart",function(){
//        this.grabbed = true;
//    })
//    this.slider.on("touchend",function(){
//        this.grabbed = false;
//    })
//    this.slider.on("touchendoutside",function(){
//        this.grabbed = false;
//    })
//    this.slider.on("mousedown",function(){
//        this.grabbed = true;
//    })
//    this.slider.on("mouseup",function(){
//        this.grabbed = false;
//    })
//    this.slider.on("mouseupoutside",function(){
//        this.grabbed = false;
//    })
//    menuContainer.addChild(this.groove);
//    menuContainer.addChild(this.slider);
//
//
//}
//function Legend(contents,relatedObject) {
//    this.textHeight = (hamburgerWidth/2)*0.6;
//    this.styleOfText = {
//        font : this.textHeight + 'px Arial bold ',
//        fill : '#eeeeee',
//    };
//    this.text = new PIXI.Text(contents,this.styleOfText);
//    if (nightMode && (contents === "TILE COLOR" || contents === "HIGHLIGHT COLOR")) {
//        this.text.alpha = 0.25;
//    }
//    this.text.relatedObject = relatedObject;
//    this.text.anchor.y = 0.5;
//    this.text.x = menubg.x+hamburgerWidth/2;
//    this.text.y = this.text.relatedObject.sprite.y;
//    this.text.interactive = this.text.buttonMode = true;
//
//    this.text.on("touchstart",function() {
//        this.relatedObject.sprite.toggle();
//    })
//    this.text.on("mousedown",function() {
//        this.relatedObject.sprite.toggle();
//    })
//
//    menuContents.addChild(this.text);
//
//}
//function coloredButton(selected,sizeX,sizeY,posX,posY,effect){
//    this.sprite = new PIXI.Sprite(pixelText);
//    this.sprite.width = sizeX;
//    this.sprite.height = sizeY;
//    this.sprite.anchor.set(0.5);
//    this.sprite.x = posX;
//    this.sprite.y = posY;
//    this.sprite.interactive = true;
//    this.sprite.buttonMode = true;
//    this.sprite.ownButton = this;
//    this.sprite.tint = selected;
//    if (nightMode) {
//        this.sprite.alpha = 0.25;
//    }
//    this.sprite.on("touchstart",function() {
//        this.toggle();
//    });
//    this.sprite.on("mousedown",function() {
//        this.toggle();
//    });
//    this.sprite.toggle = function() {
//        if (this.alpha == 1) {
//            effect();
//        }
//    }
//    menuContents.addChild(this.sprite);
//}
//function OnOffButton(buttonOn,sizeX,sizeY,posX,posY,effect){
//    this.sprite = new PIXI.Sprite(tileText);
//    this.sprite.width = sizeX;
//    this.sprite.height = sizeY;
//    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
//    this.sprite.x = posX;
//    this.sprite.y = posY;
//    this.sprite.interactive = true;
//    this.sprite.buttonMode = true;
//    this.sprite.ownButton = this;
//    this.textHeight = sizeY*0.7;
//    this.styleOfText = {
//        font : this.textHeight + 'px Arial bold ',
//        fill : '#eeeeee',
////        stroke : "#555555",
////        strokeThickness : 2
//    };
//    if (buttonOn) {
//        this.sprite.tint = buttonOnColor;
//        this.label = new PIXI.Text("ON",this.styleOfText);
//        this.sprite.scale.x *= -1;
//        this.sprite.scale.y *= -1;
//    } else {
//        this.sprite.tint = buttonOffColor;
//        this.label = new PIXI.Text("OFF",this.styleOfText);
//    }
//    this.label.anchor.x = this.label.anchor.y = 0.5;
//    this.label.x = this.sprite.x;
//    this.label.y = this.sprite.y;
//    this.label.ownButton = this;
//    this.label.interactive = true;
//    this.label.buttonMode = true;
//
//    this.sprite.on("touchstart",function() {
//        this.toggle();
//    });
//    this.sprite.on("mousedown",function() {
//        this.toggle();
//    });
//    this.label.on("touchstart",function() {
//        this.ownButton.sprite.toggle();
//
//    });
//    this.label.on("mousedown",function() {
//        this.ownButton.sprite.toggle();
//    });
//
//    this.sprite.toggle = function() {
//        if (this.alpha == 1) {
//            if (this.tint == buttonOnColor) {
//                this.tint = buttonOffColor;
//                this.ownButton.label.text = "OFF";
//            } else if (this.tint == buttonOffColor) {
//                this.tint = buttonOnColor;
//                this.ownButton.label.text = "ON";
//
//            }
//            this.scale.x *= -1;
//            this.scale.y *= -1;
//            effect();
//        }
//    }
//
//    menuContents.addChild(this.sprite);
//    menuContents.addChild(this.label);
//}
//function TextSwitchButton(selected,sizeX,sizeY,posX,posY,selectArray,effect){
//    this.selection = selectArray;
//    this.sprite = new PIXI.Sprite(pixelText);
//    this.sprite.width = sizeX;
//    this.sprite.height = sizeY;
//    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
//    this.sprite.x = posX;
//    this.sprite.y = posY;
//    this.sprite.tint = "0x444444";
//    this.sprite.interactive = true;
//    this.sprite.buttonMode = true;
//    this.sprite.ownButton = this;
//    this.textHeight = sizeY*0.6;
//    this.styleOfText = {
//        font : this.textHeight + 'px Arial bold ',
//        fill : '#eeeeee',
//    };
//
//
//    this.label = new PIXI.Text(selected,this.styleOfText);
//    this.label.anchor.x = this.label.anchor.y = 0.5;
//    this.label.x = this.sprite.x;
//    this.label.y = this.sprite.y;
//    this.label.ownButton = this;
//    this.label.interactive = true;
//    this.label.buttonMode = true;
//
//    this.sprite.on("touchstart",function() {
//        this.toggle();
//    });
//    this.sprite.on("mousedown",function() {
//        this.toggle();
//    });
//    this.label.on("touchstart",function() {
//        this.ownButton.sprite.toggle();
//
//    });
//    this.label.on("mousedown",function() {
//        this.ownButton.sprite.toggle();
//    });
//
//    this.sprite.toggle = function() {
//        effect();
//
//
//    }
//
//    menuContents.addChild(this.sprite);
//    menuContents.addChild(this.label);
//}
//function ImageSelectButton(sizeX,sizeY,posX,posY,selectArray){
//    this.selection = selectArray;
//    this.sprite = new PIXI.Sprite(pixelText);
//    this.sprite.width = sizeX;
//    this.sprite.height = sizeY;
//    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
//    this.sprite.x = posX;
//    this.sprite.y = posY;
//    this.sprite.tint = "0x444444";
//
//    this.sprite.ownButton = this;
//    this.textHeight = sizeY*0.6;
//    this.styleOfText = {
//        font : this.textHeight + 'px Arial bold ',
//        fill : '#eeeeee',
////        stroke : "#555555",
////        strokeThickness : 2
//    };
//
//    this.padding = 0.2;
//    this.items = [];
//    for (var t=0;t<this.selection.length;t++) {
//        var thumb = new PIXI.Sprite(cellTextures[t]);
//        thumb.anchor.x = 1;
//        thumb.anchor.y = 0.5;
//        thumb.height = thumb.width = this.sprite.height;
//        thumb.y = this.sprite.y;
//        var nextXPosition = menubg.x+menubg.width-hamburgerWidth/2-(t*thumb.width*this.padding)-(t*thumb.width);
//        thumb.x = nextXPosition;
//        thumb.ownButton = this;
//        thumb.tint = tileColor;
//        thumb.highlightAndSet = function() {
//            cellText = this.texture;
//            for (var i=0;i<this.ownButton.items.length;i++) {
//                if (this.ownButton.items[i].texture == cellText) {
//                    this.ownButton.items[i].alpha = 1;
//                } else {
//                    this.ownButton.items[i].alpha = 0.25;
//                };
//            }
//            for (var u=0;u<tiles.length;u++) {
//                if (tiles[u].sprite) {
//                    tiles[u].sprite.texture = cellText;
//                }
//            }
//
//        }
//        thumb.on("touchstart",function(){
//            this.highlightAndSet();
//        })
//        thumb.on("mousedown",function(){
//            this.highlightAndSet();
//        })
//        if (thumb.texture == cellText) {
//            thumb.alpha = 1;
//        } else {
//            thumb.alpha = 0.25;
//        };
//        thumb.interactive = thumb.buttonMode = true;
//        this.items.push(thumb);
//        menuContents.addChild(thumb);
//    }
//    this.sprite.alpha = 0;
//}

function FastForwardArea() {
    this.container = new PIXI.Container()
    this.bg = new PIXI.Sprite(borderText)
    this.bg.tint = 0x222222
    this.bg.width = window.innerWidth*0.2
    this.bg.height = window.innerHeight*0.075

    this.symbol = new PIXI.Sprite(ffButtonText)
    this.symbol.anchor.set(0.5)
    this.symbol.width = this.symbol.height = spermWidth*8
    this.symbol.x = this.bg.width/2
    this.symbol.y = this.bg.height/2
    this.container.x = window.innerWidth-this.bg.width
    this.container.y = window.innerHeight-this.bg.height
    this.symbol.tint = 0x777777
    this.container.addChild(this.bg)
    this.container.addChild(this.symbol)
    this.container.interactive = true
    this.container.owner = this
    this.press = function() {
        ff = true
        ffArea.symbol.tint = 0x056605
        ffArea.bg.tint = 0x056605
    }
    this.release = function() {
        ff = false
        ffArea.symbol.tint = 0x777777
        ffArea.bg.tint = 0x222222
    }
    this.container.on("pointerdown",this.press)
    this.container.on("pointerup",this.release)
    this.container.on("pointerupoutside",this.release)
    stage.addChild(this.container)
}
var smallStyle = {
    fontSize:spermWidth*2.5,
    fill:'#888888'
}
function SpecialArea() {
    this.container = new PIXI.Container()
    this.legend = new PIXI.Text("SPECIAL",smallStyle)
    this.bg = new PIXI.Sprite(borderText)
    this.legend.anchor.x = 0.5 
    this.bg.tint = 0x222222
    this.bg.width = window.innerWidth*0.2
    this.bg.height = window.innerHeight*0.075
    this.legend.x = this.bg.width/2
    this.legend.y = spermWidth
    this.container.x = 0
    this.container.y = window.innerHeight-this.bg.height
    this.container.addChild(this.bg)
    this.container.addChild(this.legend)
    // this.container.interactive = true
    // this.container.owner = this
    // this.container.on("pointerdown",function(){
    //     ff = true

    // })
    stage.addChild(this.container)
    this.remind = function() {
        if (counter % 600 < 90) {
            if (counter % 30 <= 15) {
                this.bg.tint = 0xffffff
            } else {
                this.bg.tint = 0x056605
            }
        }
    }
    // stage.addChild(this.legend)
}
function pulseButton(element,color,oldColor) {
    if (!oldColor) {oldColor="grey"}
    setTimeout(function(){
        element.style.backgroundColor = color
    },200)
    setTimeout(function(){
        element.style.backgroundColor = oldColor
    },400)
    setTimeout(function(){
        element.style.backgroundColor = color
    },600)
    setTimeout(function(){
        element.style.backgroundColor = oldColor
    },800)
    setTimeout(function(){
        element.style.backgroundColor = color
    },1000)
    setTimeout(function(){
        element.style.backgroundColor = oldColor
    },1200)
}
function addToSpecial(side,item) {
    if (item==="clock") {
        console.log("adding")
        // document.getElementsByClassName("special-area")[side].backgroundImage = 'url("assets/clock.png")'
        document.getElementById("special-"+side).style.backgroundSize = "50%"
        document.getElementById("special-"+side).style.backgroundImage = 'url("assets/clock.png")'
        document.getElementById("special-"+side).style.color = "green"
        document.getElementById("special-"+side).style.borderColor = "green"
        document.getElementById("special-"+side).style.pointerEvents = "all"
        document.getElementById("special-"+side).onclick = function() {
            document.getElementById("special-"+side).style.backgroundSize = "0"
            document.getElementById("special-"+side).style.color = "#333"
            document.getElementById("special-"+side).style.borderColor = "#333"
            document.getElementById("special-"+side).style.pointerEvents = "none"
            activatedClock = counter
            clock = undefined
            clocksLeft--
            ship.power = ship.maxPower
            document.getElementById("power-bar").style.transform = "scaleY("+(ship.power/ship.maxPower)+")"
        }
    }
}
function summonInterface() {
    if (container.scale.x < zoomLimit.max) {
        zoom(0.075);
        if (container.scale.x > zoomLimit.max) {
            zoom(zoomLimit.max-container.scale.x)
        }
    } else {
        addTurretInterface = new AddTurretInterface(chosenUpgrade);
        for (var t=0;t<ship.turrets.length;t++) {
            ship.turrets[t].sprite.alpha = 0.4;
        }
    }
}
function dismissInterface() {
    if (container.scale.x > previousScale) {
        zoom(-0.075);
        if (container.scale.x < previousScale) {
            zoom(previousScale-container.scale.x)
        }
        addTurretInterface.okButton.fadeDown();
    } else {
        if (!waveStarted && !startWaveButton.container.visible) {
            // startWaveButton.container.visible = true;
            stage.removeChild(addTurretInterface.container);
            addTurretInterface = undefined;

        }
    }
}