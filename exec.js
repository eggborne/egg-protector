releaseSpeed = 30;
clock = undefined;
clockPower = 12;
spot = undefined
bombers = Math.ceil(wave*1.3)
canShoot = true
function update() {
    if (incomingMenu) {
        if (incomingMenu.container.alpha+0.05 < 1) {
            incomingMenu.container.alpha += 0.05;
        } else {
            incomingMenu.container.alpha = 1;
        }
    }
//    if (sperms[0]) {
//        if (!spot)  {
//            spot = new PIXI.Sprite(sphereText);
//            spot.anchor.set(0.5)
//            spot.width=spot.height = spermWidth*2;
//            container.addChild(spot)
//        }
//        spot.tint = 0xff0000
//        spot.x = sperms[0].container.x;
//        spot.y = sperms[0].container.y;
//
//    }
    if (titleScreen.container.visible) {
        titleScreen.pulseLogo()
    }
    if (sperms.length > 2 && !clock && !clocksLeft && waveStarted && counter % 300 === 0) {
        if (randomInt(0,1)) {
            clock = new Clock();
            clock.sprite.x = randomInt(0,window.innerWidth*0.8);
            clock.sprite.y = randomInt(0,window.innerHeight*0.8);
        }
    }
    if (clock && !touchedClock && counter-clock.born > 240) {
        clock.sprite.alpha -= 0.03;
        if (clock.sprite.alpha <= 0) {
            container.removeChild(clock.sprite);
            clock = undefined;
        }
    }
    if (touchedClock) {
        if (clock && !clocksLeft) {
            var angle = angleOfPointABFromXY(0,window.innerHeight,clock.sprite.x,clock.sprite.y)
            var destPoint = pointAtAngle(clock.sprite.x,clock.sprite.y,angle-Math.PI/2,clock.sprite.height*2)
            if (destPoint.x > 0 && destPoint.y < window.innerHeight) {
                clock.sprite.x = destPoint.x
                clock.sprite.y = destPoint.y
                clock.sprite.alpha -= 0.05
                if (clock.sprite.alpha < 0) {
                    clock.sprite.alpha = 0
                }
            } else {
                container.removeChild(clock.sprite)
                addToSpecial("0","clock")
                gotSpecial = counter
                clocksLeft++
            }
        }
        if (waveStarted && (counter-gotSpecial)>=300 && (counter-gotSpecial)%300===0) {
            document.getElementById("special-0").style.borderColor = "white"
            setTimeout(function() {
                document.getElementById("special-0").style.borderColor = "green"
                setTimeout(function() {
                    document.getElementById("special-0").style.borderColor = "white"
                    setTimeout(function() {
                        document.getElementById("special-0").style.borderColor = "green"
                    },300)
                },300)
            },300)
        }
    }
    if (activatedClock) {
        if (clock) {
            clock.sprite.alpha -= 0.05;
            if (clock.sprite.alpha <= 0) {
                container.removeChild(clock.sprite);
                clock = undefined;
                playSound(slowdownSound);
            }
        }
        worldSlowRate = (clockPower+1)-Math.round((counter-activatedClock)/clockPower)
        if (worldSlowRate === 1) {
            touchedClock = activatedClock = undefined
            clocksLeft = 0
            // specialArea.bg.tint = 0x222222
        }
    }

    if (pressingW) {
       ship.addBees(2);
    }

    if (!gameInitiated) {
        if (titleScreen.fading) {
            titleScreen.fade();
        }
        if (titleScreen.optionsButton.fading) {
            titleScreen.optionsButton.fadeDown();
        }
        if (titleScreen.howToPlayButton.fading) {
            titleScreen.howToPlayButton.fadeDown();
        }
        if (titleScreen.highScoresButton.fading) {
            titleScreen.highScoresButton.fadeDown();
        }
    }
    if (startButton.fading) {
        startButton.fadeDown();
    }
    if (titleScreen.fading) {
        titleScreen.fade();
    }
    if (startWaveButton.fading) {
        startWaveButton.fadeDown();
    }
    if (turretUpgradeChoiceScreen.fading) {
        turretUpgradeChoiceScreen.fadeDown();
    }
    if (beeUpgradeChoiceScreen.fading) {
        beeUpgradeChoiceScreen.fadeDown();
    }

    for (var o=0;o<optionButtons.length;o++) {
        var optionButton = optionButtons[o];
        if (optionButton.fading) {
            optionButton.fadeDown();
        }
    }
    for (var s=0;s<bombSeeds.length;s++) {
        var seed = bombSeeds[s];
        seed.fly();
    }
    for (var r=0;r<clickbombs.length;r++) {
        var clickbomb = clickbombs[r];
        if (clickbomb.sprite.visible) {
            clickbomb.pulse();
        }
    }
    if (waveStarted) {
        var pulsateSpeed = 90;
        var pulsateAmount = 0.0001
        egg.pulsate(pulsateAmount,pulsateSpeed)

        // var sinceLastBomb = counter-lastBombTime
        // if (sinceLastBomb % 60 === 0  && sinceLastBomb > 180) {
        //     // playerScore += 0.05
        //     awardPlayer(0.05+(sinceLastBomb/40000))
        // }
    };
    if ((counter% 3 === 0 && ff && !spermReleased && enemyCount < currentLoadSize-1) || (counter % releaseSpeed === 0) && waveStarted && !spermReleased && enemyCount < currentLoadSize) {
        if (bombers && spawnedThisRound > Math.round(currentLoadSize/3) && !randomInt(0,3)) {
            spawnSperm("bomber");
            bombers--
        } else {
            spawnSperm();
        }
       
        
//        if (spawnedThisRound % 4 === 0 && releaseSpeed > 5) {
//            releaseSpeed--;
//        }

    }

//    if (doubleTapping) {
//        var currentDistance = distanceFromABtoXY(touches[0].pos.x,touches[0].pos.y,touches[1].pos.x,touches[1].pos.y);
//        if (startingFingerDistance < currentDistance) {
//            if (startingFingerDistance*1.1 < currentDistance) {
//                zoom(0.04);
//            }
//        } else {
//            if (startingFingerDistance*0.9 < currentDistance) {
//                zoom(-0.04);
//            }
//        }
//    }

//    if (ship.chamber.length < ship.maxSperm && counter % ship.replenishSpeed === 0) {
//        ship.incubateSperm();
//    }

//    if (clicked === counter) {
//        if (counter === clicked || counter % ship.fireRate === 0)
//        ship.fire();
//    }
    fadeEmissions();

    ////////////////////////////////////////////////////////////////////////////////////  TURRET LOOP

    for (var t=0;t<ship.turrets.length;t++) {
        var turret = ship.turrets[t];
        if (!((turret.type === "Ice" || turret.type === "Laser") && counter-turret.lastFired < 20) && !turret.target && turret.sprite.rotation !== turret.homeRotation) {
            turret.swivelToHome()
        }
        if (!turret.target) {
            for (var m=0; m<sperms.length;m++) {
                var sperm = sperms[m];
                if (turret.withinRangeOfTarget(sperm) && !turret.target && (!sperm.targeted || (turret.type !== "Ice" && sperm.head.tint === 0x7777ff))) {
                    sperm.targeted = true
                    turret.target = sperm;
                }
            }
        } else {
            if (!turret.withinRangeOfTarget(turret.target) || turret.target.hp <= 0) {
                turret.target.targeted = false;
                if (turret.target.slowed) {
                    turret.target.slowed = false;
                    turret.target.speed = turret.target.origSpeed;
                };
                if (turret.target.died === -99) {
                    turret.target.changeColor(turret.target.color);
                };
                turret.target = undefined;
            } else if (!lost) {
                var targetAngle = rangedRotation(angleOfPointABFromXY(turret.target.container.x,turret.target.container.y,window.innerWidth/2+turret.tipPosition().x,window.innerHeight/2+turret.tipPosition().y)-degToRad(90));
                if (!(turret.type === "Virus" && turret.target.zombie)&& !(turret.type === "Fire" && turret.target.onFire)) {
                    turret.turnToward(targetAngle);
                } else {
                    turret.target = undefined;
                }
//                turret.sprite.rotation = rangedRotation(angleOfPointABFromXY(turret.target.container.x,turret.target.container.y,window.innerWidth/2+turret.tipPosition().x,window.innerHeight/2+turret.tipPosition().y)-degToRad(90));
                if (counter-turret.lastFired > turret.fireRate) {

                if (turret.type === "Fire" || turret.type === "Virus") {
                    if (turret.sprite.rotation > targetAngle-degToRad(turret.swivelSpeed) && turret.sprite.rotation < targetAngle+degToRad(turret.swivelSpeed)) {
                        if (!(turret.type === "Virus" && turret.target && turret.target.zombie)) {
                            turret.fireBullet(turret.type);
                        }
                    }
                }
                if (turret.sprite.rotation === targetAngle) {
                    if (turret.type === "Laser") {
                        turret.fireLaser(turret.target);
                    } else if (turret.type === "Rocket") {
                        turret.launchRocket();
                    }

                }

                };
                if (turret.sprite.rotation === targetAngle && turret.type === "Ice") {
                    turret.fireLaser(turret.target);
                };
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////  SPERM LOOP

    for (var i=0; i<sperms.length;i++) {
        var sperm = sperms[i];
        // if (pressingQ) {
        //     sperm.container.alpha = 1
        //     sperm.container.visible = true
        // }
        sperm.checkForClickbombs();
        sperm.checkForFlames();
        sperm.checkForRockets();
        if (sperm.linkedSperm) {
            var distance = distanceFromABtoXY(sperm.container.x,sperm.container.y,sperm.linkedSperm.container.x,sperm.linkedSperm.container.y);
            if (sperm.linkedSperm.hp <= 0 || distance > 400) {
//                sperm.linkedSperm.changeColor(sperm.linkedSperm.color);
                sperm.linkedSperm.targeted = false;
                if (sperm.linkedSperm.slowed) {
                    sperm.linkedSperm.slowed = false;
                    sperm.linkedSperm.speed = sperm.linkedSperm.origSpeed;
                }
                sperm.linkedSperm = undefined;
            }
        }
        var distanceFromShip = distanceFromABtoXY(sperm.intendedLocation(2).x,sperm.intendedLocation(2).y,ship.container.x,ship.container.y)
        if (sperm.type !== "bomber") {
            if (sperm.hp > 0 && distanceFromShip <= egg.white.width/2) {
                if (ship.hp > 0) {playSound(eggDamageSound)};
                egg.changeHP(egg.hp-sperm.shieldDamage)
                sperm.causeOfDeath = "kamikaze";
                sperm.hp = 0;
            }
        } else {
            // is bomber
            
        }
        if (ship.hp > 0 && !sperm.ammo && sperm.hp > 0 && distanceFromShip <= ship.body.width/2) {
//            sperm.rebound();
            ship.damaged = counter;
            if (!sperm.onFire) {
//                ship.hp -= sperm.strength;
                ship.hp -= 5;
                if (ship.hp > 0 && soundOn) {playSound(eggDamageSound)};
            } else {
                spermOnFire--;
            }
            sperm.hp = 0;
            sperm.causeOfDeath = "kamikaze";
            if (ship.hp > 0) {
                var nextText = hullTextures[7-Math.floor(ship.hp/10)];
                if (ship.hull.texture !== nextText) {
                    playSound(glassCrackSound)
                    ship.hull.texture = nextText
                };
            };
            if (sperm.type==="bomber") {
                for (var t=0;t<ship.turrets.length;t++) {
                    var rot = ship.turrets[t].homeRotation-(degToRad(90))
                    var diff = Math.abs(sperm.container.rotation-rot)
                    console.log("ang diff " + diff)
                    if (diff < Math.PI/8) {
                        turret.sprite.tint = 0xff0000;
                        new Explosion(spermWidth*10,turret)
                        ship.turretContainer.removeChild(turret.sprite);
                        ship.turrets.splice(t,1)
                        t--
                        document.getElementById('turret-header').innerHTML = "TURRETS - "+ship.turrets.length
                    }
                }
            }
        }
        if (sperm.hp <= 0) {
            if (sperm.died < 0) {
                sperm.die();
                if (sperm.causeOfDeath !== "kamikaze") {
                    var bonus = 0
                    if (worldSlowRate !== 1) {
                        bonus = sperm.worth
                    }
                    awardPlayer(sperm.worth+bonus)
                } else {
                    kamikazes++
                }
            } else {
                sperm.animateDeath();
            }

        };


        if (sperm.ammo && !sperm.fired) {
//            sperm.container.x -= (ship.lastFrame.x-ship.container.x);
//            sperm.container.y -= (ship.lastFrame.y-ship.container.y);
//
//            sperm.turn(sperm.turnSpeed*sperm.flexDirection);
//            sperm.trailTail();
//            sperm.tendToward(ship.container.x,ship.container.y,2);
////            sperm.tendToward(ship.container.x,ship.container.y,2);
//            if (!sperm.tailGrown) {
//                sperm.sproutTail();
//            }
//            if (distanceFromABtoXY(sperm.intendedLocation(1).x,sperm.intendedLocation(1).y,ship.container.x,ship.container.y) < ship.hull.width/2-sperm.head.width/4) {
//                sperm.swim(sperm.speed);
//            };
        } else {
            if (sperm.onFire && sperm.hp > 0) {
                sperm.setOnFire();
                sperm.hp -= randomInt(2,4);
                sperm.turn(sperm.turnSpeed*4*(randomInt(-1,1)))
                sperm.swim(sperm.speed*2);

                sperm.checkForOtherSperm();

            } else if (!sperm.onFire && sperm.hp > 0) {
                if (!sperm.zombie) {
                    sperm.tendToward(ship.container.x,ship.container.y,1,sperm.determination);
                } else {
                    if (sperm.zombie) {
                        if (!sperm.target && sperm.closestNeighbor(1000)) {
                            var zombieTarget = sperm.closestNeighbor(1000);
    //                        sperm.swim(sperm.speed)
                            sperm.tendToward(zombieTarget.container.x,zombieTarget.container.y,6);
                            sperm.tendToward(zombieTarget.container.x,zombieTarget.container.y,6);
                        } else {
                            sperm.tendToward(randomInt(0,window.innerWidth),randomInt(0,window.innerHeight),6);
                        }
                        sperm.hp -= 0.5;
                    };
                }
                sperm.swim(sperm.speed/worldSlowRate);
                if (worldSlowRate === 1) {
                    if (sperm.makeRandomDecision(randomInt(0,1))) {
                        sperm.turn(sperm.turnSpeed*sperm.flexDirection);
                        if (randomInt(0,2)) {
                            if (worldSlowRate > 1) {
                                sperm.turn(sperm.turnSpeed*sperm.flexDirection*(worldSlowRate)*randomInt(-1,1));
                            } else {
                                sperm.turn(sperm.turnSpeed*sperm.flexDirection*(worldSlowRate));
                            }
                        };
                    };
                }
                
            }
            sperm.trailTail();
            // if (collision) {
            //     sperm.checkForOtherSperm();
            // }
        };

        if (sperm.head.tint !== sperm.color && sperm.hp > 0 && !sperm.targeted && !sperm.slowed && !sperm.zombie) {
            sperm.changeColor(sperm.color);
        }
//        if (!sperm.beeTargeted) {
//            sperm.changeColor(sperm.color);
//        } else {
//            sperm.changeColor(0xffff00)
//        }
    };

    if (upgrading) {
        if (!addTurretInterface) {
            summonInterface()
        }
        if (LMBDown) {
            addTurretInterface.container.rotation = angleOfPointABFromXY(cursor.x,cursor.y,addTurretInterface.container.x,addTurretInterface.container.y);
        }
    } else {
        if (addTurretInterface) {
            dismissInterface()
        }
    }
    
    ////////////////////////////////////////////////////////  ROCKET LOOP

    for (var r=0;r<rockets.length;r++) {
        var rocket = rockets[r];
        if (rocket.target) {
            var target = rocket.target;
            var targetAngle = angleOfPointABFromXY(target.container.x,target.container.y,rocket.sprite.x,rocket.sprite.y);
            rocket.turnToward(targetAngle,4);
            if (rocket.target.hp <= 0) {
                rocket.target = undefined;
            }
        } else {
            rocket.scanForTargets();
        }
        rocket.fly();
        rocket.emitFlame();
        if (counter-rocket.born > 200) {
            rocket.explode();
        }
    }

    /////////////////////////////////////////////////////////  BEE LOOP

    var beeReleased = false;
    for (var b=0;b<bees.length;b++) {
        var bee = bees[b];
        if (waveStarted && bee.inShip && counter % beeRate === 0 && !beeReleased) {
            bee.inShip = false;
            beeReleased = true;
        }
        bee.lastPosition.x = bee.sprite.x;
        bee.lastPosition.y = bee.sprite.y;
        if (!bee.inShip) {
            bee.attackClosestSperm();
            if (counter % 2 === 0) {
                bee.scanOtherBees();
            }

            if (bee.hp <= 0) {
                if (bee.alive) {
                    bee.sprite.tint = 0xff0000;
                    bee.alive = false;
                } else {
                    bee.animateDeath();
                }
            }
        }
        bee.dance(1);
    }

    for (var f=0;f<flames.length;f++) {
        var flame = flames[f];
        flame.fly();
    }
    ship.flashIfDamaged()
    if (waveStarted && !startButton.fading && !startWaveButton.fading && !clickingMenu) {
        if (clicked === counter) {
            if (canShoot) {
                var shipDistance = distanceFromABtoXY(ship.container.x,ship.container.y,cursor.x,cursor.y);
                if (shipDistance > egg.white.width/2 && clickWeapon === "clickbomb") {
                    var newSeed = new BombSeed();
                    newSeed.bombSite = cursor;
                    ship.power -= ship.bombCost
                    document.getElementById("power-bar").style.transform = "scaleY("+(ship.power/ship.maxPower)+")"
                }
            }
        }
        if (counter % 5 === 0) {
            if (ship.power < ship.maxPower) {
                ship.power++
                document.getElementById("power-bar").style.transform = "scaleY("+(ship.power/ship.maxPower)+")"
            }
        }
        if (canShoot && ship.power < ship.bombCost) {
            document.getElementById("power-bar").style.backgroundColor = "rgba(153, 153, 0, 0.2)"
            canShoot = false
        } else if (!canShoot && ship.power >= ship.bombCost) {
            document.getElementById("power-bar").style.backgroundColor = "rgba(255, 0, 0, 0.2)"
            canShoot = true
        }
        if ((counter-startedAt) >= 120 && (counter-egg.damaged) >= 120 && ship.power === ship.maxPower) {
            if (!ship.restoring) {
                document.getElementById("shield-reading").style.color = "green"
                ship.restoring = true
            }
            if (egg.hp < 100 && (counter-egg.damaged) % 60 === 0) {
                egg.changeHP(egg.hp+1)
            }
        } else {
            if (ship.restoring) {
                document.getElementById("shield-reading").style.color = "rgba(136, 136, 136, 0.4)"
                ship.restoring = false
            }
        }

//        if (counter % 3 === 0 && (RMBDown) || ( LMBDown && clickWeapon === "bee"))) {
//            var beesInShip = [];
//            bees.forEach(function(bee){
//                if (bee.inShip && bee.hp > 0) {
//                    beesInShip.push(bee)}
//            });
//            if (beesInShip.length > 0) {
//                var recruit = beesInShip[beesInShip.length-1];
//                recruit.inShip = false;
//                recruit.sprite.x = cursor.x;
//                recruit.sprite.y = cursor.y;
//            } else {
//                weaponSelectArea.selector.x = weaponSelectArea.clickbombButton.x;
//                clickWeapon = "clickbomb";
//                weaponSelectArea.beeButton.alpha = 0.25;
//            };
//        };
    }

    if (ship.hp <= 0) {
        if (!loseScreen.container.visible){
            if (musicOn) {bgMusic.fade(0.3,0.0,600)};
            playSound(glassCrackSound);
            playSound(gameOverSound);
            ship.container.visible = false;
            egg.container.visible = false;
            loseScreen.text.text = "YOU LOSE\nWave: " + wave
            loseScreen.container.visible = true;
            bg.tint = 0x000000;
            bg.alpha = 1;
            setTimeout(function(){lost = true},1000)
        } else if (loseScreen.container.scale.x < 1.25) {
            if (loseScreen.bg.alpha+0.02 <= 1) {
                loseScreen.bg.alpha += 0.02;
            } else {
                loseScreen.bg.alpha = 1;
            }
            loseScreen.bg.rotation += degToRad(4)
            loseScreen.container.scale.x *= 1.02;
            loseScreen.container.scale.y *= 1.02;
            loseScreen.container.scale.x += (loseScreen.container.scale.x*loseScreen.container.scale.x)/100;
            loseScreen.container.scale.y += (loseScreen.container.scale.y*loseScreen.container.scale.y)/100;
        } else {
            if (loseScreen.bg.alpha+0.02 <= 1) {
                loseScreen.bg.alpha += 0.02;
            } else {
                loseScreen.bg.alpha = 1;
            }
            loseScreen.bg.rotation += degToRad(0.4)
            loseScreen.bg.scale.x += 0.0005;
            loseScreen.bg.scale.y += 0.0005;
        }
    }
    if (playerClearedWave()) {
        if (soundOn) {catchFireSound.stop()}
        ship.power = ship.maxPower
        document.getElementById("power-bar").style.transform = "scaleX(1)"
        egg.yolk.width = egg.yolk.height = ship.hull.width*0.85;
        var accuracy = (currentLoadSize-kamikazes)/currentLoadSize
        if (accuracy < 0.8) {
            document.getElementById('acc-result-display').style.backgroundColor = "0xaa0000"
        } else if (accuracy < 0.9) {
            document.getElementById('acc-result-display').style.backgroundColor = "orange"
        } else {
            document.getElementById('acc-result-display').style.backgroundColor = "green"
        }
        document.getElementById('acc-result-display').innerHTML = "Accuracy: "+percentify(accuracy)
        if (accuracy-0.9 > 0) {
            if (accuracy===1) {
                document.getElementById('acc-result-display').style.backgroundColor = "0xbbffbb"
                var accDue = 1+(wave/8)
            } else if (accuracy > 0.95) {
                var accDue = 1
            } else if (accuracy > 0.9) {
                var accDue = 0.75
            }
            var accBonus = prettyCash(accDue)
        } else {
            var accDue = 0
            var accBonus = "$0"
        }
        if (accDue) {
            document.getElementById('acc-bonus-display').style.color = "#ccffcc"
        } else {
            document.getElementById('acc-bonus-display').style.color = "white"
        }
        document.getElementById('acc-bonus-display').innerHTML = "Bonus: "+accBonus
        document.getElementById('bank-result-display').innerHTML = "Bank: "+prettyCash(playerScore)
        var bankDue = (playerScore*bankBonusRate)
        document.getElementById('bank-bonus-display').innerHTML = "Bonus: "+prettyCash(bankDue)
        waveStarted = false;
        ff = false;
        killedThisWave = 0;
        spawnedThisRound = 0;
        wonRound = counter;
        worldSlowRate = 1
        kamikazes = 0
        bombers = Math.round(wave/5)+wave
        // hideWaveGUI()
        enableButtons()
        document.getElementById('main-upgrade-title').style.border = "0.25vh solid green"
        document.getElementById('turret-point-count').style.border = "0.25vh solid green"
        setTimeout(function(){
            if (musicOn) {
                bgMusic.fade(0.3,0.0,600);
            }
            document.getElementById('result-screen').style.transform = "scale(1)"
            if (bees.length > 0) {
                bees.forEach(function(bee){if (!bee.inShip) {bee.returnToShip()};bee.sprite.alpha = 1;bee.hp = bee.maxHP});
            };
        },750);
        setTimeout(function(){   
            document.getElementById('acc-result-display').style.transform = "scale(1)"  
        },1050);
        setTimeout(function(){   
            document.getElementById('acc-bonus-display').style.transform = "scale(1)"
            if (accDue) {
                awardPlayer(accDue)
            }
        },1350);
        setTimeout(function(){   
            document.getElementById('bank-result-display').style.transform = "scale(1)" 
        },1750);
        setTimeout(function(){   
            document.getElementById('bank-bonus-display').style.transform = "scale(1)"
            if (bankDue) {
                awardPlayer(bankDue)
            }
        },2050);
        if (bees.length > 0) {
            upgradeBeesButton.text.tint = 0xffffff;
            upgradeBeesButton.container.interactive = true;
            beesInPlay = 0;
        };
        if (ship.turretContainer.children.length > 0) {
            upgradeTurretsButton.text.tint = 0xffffff;
            upgradeTurretsButton.container.interactive = true;
        }
        wave++;
        currentLoadSize = Math.ceil(20+(wave*1.2))
        if (wave % 3===0) {
            if (releaseSpeed-1 > 3) {
                releaseSpeed-=1
            } else {
                releaseSpeed = 3
            }
        }
        // defaultSpermSpeed *= 1.005;
        updateStatDisplays()
    }
    timeSinceLastDrawn = Date.now()-lastDrawn;
    for (var e=0;e<explosions.length;e++) {
        var explosion = explosions[e];
        if (explosion.currentFrame < 11) {
            explosion.advance();
        }
    }
    for (var e=0;e<explosions.length;e++) {
        var explosion = explosions[e];
        if (explosion.currentFrame === 11) {
            container.removeChild(explosion.currentSprite);
            explosions.splice(e,1)
        }
    }
    for (var g=0;g<lingeringFlames.length;g++) {
        var flame = lingeringFlames[g];
        if (flame.source === "Sperm") {
            var factorAmount = 0.99;
        } else if (flame.source === "Rocket") {
            var factorAmount = 0.85;
        }
        for (var f=0;f<fanciness;f++) {
        flame.scale.x *= factorAmount;
        flame.scale.y *= factorAmount;
        flame.rotation += degToRad(1)*randomInt(-1,1);
        };
        if (flame.alpha-(0.15*fanciness) <= 0) {
            container.removeChild(flame)
            this.lingeringFlames.splice(this.lingeringFlames.indexOf(flame),1)
        } else {
            flame.alpha -= (0.15*fanciness);
        }
    }
    renderer.render(stage);
    requestAnimationFrame(update);
    counter++;
};
