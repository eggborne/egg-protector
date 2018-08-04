function startNextWave() {
    waveStarted = true;
    startedAt = counter
    spermReleased = false;
    // specialArea.container.visible = ffArea.container.visible = true;
    remainingCount.style.opacity = 1  
    cashCount.style.opacity = 1
    document.getElementById('bottom-bar').style.opacity = 1
}
function hideWaveGUI() {
    // specialArea.container.visible = ffArea.container.visible = false;
    remainingCount.style.opacity = 0  
    cashCount.style.opacity = 0
    document.getElementById('bottom-bar').style.opacity = 0
}
function Ship() {
    this.power = this.maxPower = 20;
    this.bombCost = 7;
    this.maxSperm = 48;
    this.replenishSpeed = 20;
    this.lastFrame = {x:undefined,y:undefined,rotation:undefined};
    this.body = new PIXI.Sprite(falconText);
    this.container = new PIXI.Container();
    this.body.anchor.set(0.5);
    this.body.width = this.body.height = spermWidth*7;
    this.speed = this.body.width/5;
    this.hull = new PIXI.Sprite(hullText1);
    this.hull.anchor.set(0.5);
    this.hull.scale.x = this.hull.scale.y = this.body.scale.x;
    this.fired = false;
    this.turrets = [];
    this.fireRate = 1;
    this.lastMoved = {x:0,y:0};
    this.turretContainer = new PIXI.Container();
    this.hp = this.maxHP = 80;
    this.damaged = -1;
    this.restoring = false
//    this.turretContainer.pivot.x = currentSize.x/2;
//    this.turretContainer.pivot.y = currentSize.y/2;
    this.chamber = [];
    this.container.addChild(this.body);
//    this.container.addChild(this.hull);
    this.container.addChild(this.hull);
//    this.hull.x = window.innerWidth/2;
//    this.hull.y = window.innerHeight/2;
    this.hull.alpha = 0.6;
//    this.container.x = currentSize.x/2;
//    this.container.y = currentSize.y/2;
    this.container.x = window.innerWidth/2;
    this.container.y = window.innerHeight/2;
//    this.container.pivot.x = 0.5;
//    this.container.pivot.y = 0.5;
    container.addChild(this.turretContainer);
    container.addChild(this.container);
    this.turretContainer.x = this.container.x;
    this.turretContainer.y = this.container.y;
    this.hasTurret = function(turretType) {
        var hasTurret = false;
        for (var t=0;t<this.turrets.length;t++) {
            if (this.turrets[t].type === turretType) {
                hasTurret = true;
            }
        }
        return hasTurret;
    }
    this.flashIfDamaged = function() {
        if (this.hp > 0) {
            if (this.damaged === counter) {
                this.body.tint = 0xff0000;
            } else if (this.body.tint === 0xff0000) {
                this.body.tint = 0xffffff;
            }
            if (egg.damaged === counter) {
                egg.white.tint = 0xff0000;
            } else if (egg.white.tint === 0xff0000) {
                egg.white.tint = egg.white.origTint;
            }
        };
    }
    this.addBees = function(amount) {
//        if (weaponSelectArea.beeButton.alpha < 1) {
//            weaponSelectArea.beeButton.alpha = 1;
//        }
        for (var t=0;t<amount;t++) {
            var randomSpot = pointAtAngle(this.container.x,this.container.y,degToRad(randomInt(0,359)),randomInt(0,(this.hull.width/2)-spermWidth*0.75));
            var bee = new Bee(randomSpot.x,randomSpot.y);
        };
        document.getElementById('bees-header').innerHTML = "BEES - "+bees.length
    }
    this.addTurrets = function(amount,type,startingRotation) {
        var increment = degToRad(360/amount);
        for (var t=1;t<amount+1;t++) {
            var turret = new Turret(this,t);
            turret.distanceFromShipCenter = this.body.width/2;
            turret.angleFromShipCenter = rangedRotation(startingRotation+(t*increment)-Math.PI/2);
            turret.sprite.rotation = turret.angleFromShipCenter;
            turret.homeRotation = turret.sprite.rotation;
            if (amount > 1) {
                var rangeDivisor = amount;
            } else {
                var rangeDivisor = 2
            }
//            if (false) {
//            if (amount <= 4) {
            turret.swivelRange = degToRad(75)
//            } else {
//                turret.swivelRange = degToRad(45/amount);
//            }
//            turret.range = {min:rangedRotation(turret.sprite.rotation)-Math.PI/rangeDivisor,max:rangedRotation(turret.sprite.rotation)+Math.PI/rangeDivisor};
            turret.sprite.x = turret.homePosition().x;
            turret.sprite.y = turret.homePosition().y;
            turret.type = type;
            var upgradeData = turretData[turret.type]
            if (type === "Laser") {
                turret.strength = upgradeData["Power"];
                turret.reach = upgradeData["Range"];
                turret.sprite.tint = turret.color = turretColors[type];
                turret.fireRate = 2;
            }
            if (type === "Ice") {
                turret.reach = upgradeData["Range"]
                turret.strength = upgradeData["Power"]
                turret.slowFactor = upgradeData["Slow"]
                turret.sprite.tint = turret.color = turretColors[type];
                turret.fireRate = 10
            }
            if (type === "Fire") {
                turret.reach = upgradeData["Range"]
                turret.strength = upgradeData["Power"]
                turret.sprite.tint = turret.color = turretColors[type];
                turret.projectileSpeed = upgradeData["Speed"]
                turret.fireRate = upgradeData["Fire Rate"]
                turret.swivelRange = degToRad(45);
            }
            if (type === "Rocket") {
                turret.strength = upgradeData["Power"];
                turret.sprite.tint = turret.color = turretColors[type];
                turret.reach = upgradeData["Range"];
                turret.fireRate = 20
                turret.projectileSpeed = upgradeData["Speed"];
            }
            if (type === "Virus") {
                turret.reach = upgradeData["Range"];
                turret.sprite.tint = turret.color = turretColors[type];
                turret.strength = upgradeData["Power"];
                turret.fireRate = 10
                turret.projectileSpeed = upgradeData["Speed"];
            }
            this.turrets.push(turret);
            document.getElementById('turret-header').innerHTML = "TURRETS - "+this.turrets.length
            this.turretContainer.addChild(turret.sprite);
//            console.log("TURRET " + turret.owner.turrets.length + " turret.homeRotation is " + radToDeg(turret.homeRotation) + ".")
        };
    }
    this.upgradeTurrets = function(component) {
        playSound(attachTurretSound)
        for (var t=0;t<this.turrets.length;t++) {
            var turret = this.turrets[t];
            var upgradeData = turretData[turret.type]
            if (turret.type === "Ice") {
                if (component === "Power") {
                    turret.strength += 0.25;
                    turret.slowFactor += 0.5;
                    upgradeData["Power"] = turret.strength
                    upgradeData["Slow"] = turret.slowFactor
                    // turret.sprite.scale.x *= 1.01;
                    // turret.sprite.scale.y *= 1.01;
                };
                if (component === "Range") {
                    turret.reach += this.body.width/3;
                    // console.log("inc reach to " + turret.reach)
                    upgradeData["Range"] = turret.reach
                    // turret.sprite.scale.x *= 1.005;
//                    if (turret.swivelRange < degToRad(75)) {
//                        turret.swivelRange += degToRad(2.5)
//                    }
                };
                if (component === "Fire Rate") {
                    if (turret.fireRate-2 >= 2) {
                        turret.fireRate -= 2;
                    } else {
                        turret.fireRate = 2
                    }
                    upgradeData["Fire Rate"] = turret.fireRate
                    // turret.sprite.scale.y *= 1.01;
                };

            } else if (turret.type === "Laser") {
                if (component === "Power") {
                    turret.strength += 5;
                    upgradeData["Power"] = turret.strength
                    // turret.sprite.scale.x *= 1.01;
                    // turret.sprite.scale.y *= 1.01;
                };
                if (component === "Range") {
                    turret.reach += this.body.width/3;
                    upgradeData["Range"] = turret.reach
                    // turret.sprite.scale.x *= 1.005;
//                    if (turret.swivelRange < degToRad(75)) {
//                        turret.swivelRange += degToRad(2.5)
//                    }
                };
                // if (component === "Fire Rate") {
                //     if (turret.fireRate-2 >= 1) {
                //         turret.fireRate -= 2;
                //     } else {
                //         turret.fireRate = 1
                //     }
                //     upgradeData["Fire Rate"] = turret.fireRate
                //     // turret.sprite.scale.y *= 1.01;
                // };
            } else if (turret.type === "Fire") {
                if (component === "Power") {
                    turret.projectileSpeed += spermWidth/8;
                    turret.projectileSize += spermWidth/2;
                    // turret.sprite.scale.x *= 1.01;
                    // turret.sprite.scale.y *= 1.01;
                };
                if (component === "Range") {
                    turret.reach += this.body.width/2;
                    turret.preFadeTime += 8;
                    // turret.sprite.scale.x *= 1.005;
//                    if (turret.swivelRange < degToRad(75)) {
//                        turret.swivelRange += degToRad(2.5)
//                    }
                };
                if (component === "Fire Rate") {
                    if (turret.fireRate > 1) {
                        turret.fireRate -= 1;
                        upgradeData["Fire Rate"] = turret.fireRate
                    }
                    
                    // turret.sprite.scale.y *= 1.01;
                };
            } else if (turret.type === "Rocket") {
                if (component === "Power") {
                    // turret.projectileSize += spermWidth/4;
                    turret.projectileSpeed += spermWidth/4;
                    upgradeData["Speed"] = turret.projectileSpeed
                    // turret.sprite.scale.x *= 1.01;
                    // turret.sprite.scale.y *= 1.01;
                };
                if (component === "Range") {
                    turret.reach += this.body.width/4;
                    upgradeData["Range"] = turret.reach
                    // turret.sprite.scale.x *= 1.005;
//                    if (turret.swivelRange < degToRad(75)) {
//                        turret.swivelRange += degToRad(2.5)
//                    }
                };
                // if (component === "Fire Rate") {
                //     if (turret.fireRate-3 >= 2) {
                //         turret.fireRate -= 3;
                //     } else {
                //         turret.fireRate = 2
                //     }
                //     upgradeData["Fire Rate"] = turret.fireRate
                //     // turret.sprite.scale.y *= 1.01;
                // };
            }  else if (turret.type === "Virus") {
                if (component === "Power") {
                    turret.strength += 2;
                    // turret.projectileSize += spermWidth/4;
                    turret.projectileSpeed += spermWidth/4;
                    upgradeData["Power"] = turret.strength
                    upgradeData["Speed"] = turret.projectileSpeed
                    // turret.sprite.scale.x *= 1.01;
                    // turret.sprite.scale.y *= 1.01;
                };
                if (component === "Range") {
                    turret.reach += this.body.width/2;
                    // turret.preFadeTime += 8;
                    upgradeData["Range"] = turret.reach
                    // turret.sprite.scale.x *= 1.005;
//                    if (turret.swivelRange < degToRad(75)) {
//                        turret.swivelRange += degToRad(2.5)
//                    }
                };
                // if (component === "Fire Rate") {
                //     if (turret.fireRate-2 >= 2) {
                //         turret.fireRate -= 2;
                //     } else {
                //         turret.fireRate = 2
                //     }
                //     upgradeData["Fire Rate"] = turret.fireRate
                //     // turret.sprite.scale.y *= 1.01;
                // };
            }
        }
        // console.log(turretData)
    }
    this.changeTurretAmount = function(amount) {
        container.removeChild(ship.container);
        ship = new Ship()
        ship.addTurrets(amount);
    }
    this.removeTurrets =  function() {
        this.turretContainer.removeChildren();
    }
    this.incubateSperm = function() {
        var newSperm = new Sperm(this.container.x,this.container.y,0.9,0xbbeebb,true,true);
        this.chamber.push(newSperm);
        newSperm.speed /= 2;
        newSperm.container.scale.x /= 2;
        newSperm.container.scale.y /= 2;
        newSperm.fired = false;
        if (this.chamber.length === blueBallsLimit) {
            ship.hull.tint = 0x9999ff;
        };
        ammoSpermCount++;
    }
}
Ship.prototype.fire = function() {
    if (ship.chamber.length > 0) {
        var toFire = ship.chamber.pop();
        if (ship.hull.tint === 0x9999ff && this.chamber.length === blueBallsLimit) {
            ship.hull.tint = 0xffffff;
        };
        var randomAngle = degToRad(randomInt(0,359));
        toFire.container.x = pointAtAngle(ship.container.x,ship.container.y,randomAngle,ship.body.width/2).x;
        toFire.container.y = pointAtAngle(ship.container.x,ship.container.y,randomAngle,ship.body.width/2).y;
//        toFire.container.x = pointAtAngle(ship.container.x,ship.container.y,ship.container.rotation,ship.container.width/2).x;
//        toFire.container.y = pointAtAngle(ship.container.x,ship.container.y,ship.container.rotation,ship.container.width/2).y;
        toFire.container.rotation = ship.container.rotation+Math.PI/2;
        toFire.container.rotation = randomAngle;
        toFire.flexAmount = 0;
        toFire.aging = true;
        toFire.born = counter;
        toFire.target = pointAtAngle(this.container.x,this.container.y,angleOfPointABFromXY(cursor.x,cursor.y,this.container.x,this.container.y)-Math.PI/2,longerDimension);
        if (ship.hull.tint === 0x9999ff) {
//            toFire.speed *= 5;
//            toFire.container.scale.x *= 3;
//            toFire.container.scale.y *= 3;
        } else {
            toFire.speed *= 2;
            toFire.container.scale.x *= 2;
            toFire.container.scale.y *= 2;
        }
//        toFire.flexLimit *= 1.5;
//        toFire.turnSpeed *= 1.5;
        toFire.fired = true;
    };
}
function Turret(ship,amount) {
    this.owner = ship;
    this.reach = defaultRange;
    this.sight = this.reach*1.0;
    this.projectileSpeed = rocketSpeed;
    this.projectileSize = rocketWidth;
    this.preFadeTime = 20;
    this.strength = 10;
    this.sprite = new PIXI.Sprite(turretText);
    this.sprite.rotation = 0;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0.5;
    this.sprite.width = spermWidth*1.8;
    this.sprite.height = spermWidth*0.9;
    this.target = undefined;
    this.secondTarget = undefined;
    this.firing = false;
    this.fireRate = 10;
    this.lastFired = -99;
    this.autoFire = true;
    this.emissions = [];
    this.rotated = 0;
    this.lockedOn = false;
    this.swivelSpeed = 8;
    this.leaning = "left";
    this.slowFactor = 0;
    this.girth = undefined;
    this.color = undefined;
    this.type = undefined; // defined when attached to ship
    this.targetsFiredAt = [];
}
Turret.prototype.firedAt = function(target) {
    var firedAt = false;
    for (var t=0;t<this.targetsFiredAt;t++) {
        if (this.targetsFiredAt[t] === target) {
            firedAt = true;
        }
    }
    return firedAt;
}
Turret.prototype.withinRangeOfTarget = function(target) {
    var targetRotation = rangedRotation(angleOfPointABFromXY(target.container.x,target.container.y,ship.container.x,ship.container.y)-degToRad(90));
    var distance = distanceFromABtoXY(this.owner.container.x,this.owner.container.y,target.container.x,target.container.y)
    var inRange = false;
    var toMove = Math.abs(targetRotation-rangedRotation(this.homeRotation));
//    if (!(this.type === "Rocket" && this.firedAt(target)) && toMove < this.swivelRange && distance <= this.reach) {
    if (toMove < this.swivelRange && distance <= this.reach) {
        inRange = true;
    }
    return inRange;
}
Turret.prototype.tipPosition = function() {
    return pointAtAngle(this.sprite.x,this.sprite.y,this.sprite.rotation,this.sprite.width);
}
//Turret.prototype.homePosition = function() {
//    return pointAtAngle(this.owner.hull.x,this.owner.hull.y,this.angleFromShipCenter+this.owner.container.rotation,this.distanceFromShipCenter);
//};
Turret.prototype.homePosition = function() {
    return pointAtAngle(this.owner.hull.x,this.owner.hull.y,this.angleFromShipCenter+this.owner.container.rotation,this.distanceFromShipCenter);
};
Turret.prototype.swivelToHome = function() {
    distanceToMove = rangedRotation(this.sprite.rotation)-this.homeRotation;
//    if (Math.abs(distanceToMove) > this.swivelRange) {
//        if (distanceToMove > 0) {
//            distanceToMove -= degToRad(360);
//            distanceToMove *= -1;
//        } else {
//            distanceToMove += degToRad(360);
//            distanceToMove *= -1;
//        }
//    }
//     console.log(Math.round(radToDeg(this.rotated)))
    if (this.rotated > 0) {
        this.sprite.rotation -= degToRad(this.swivelSpeed);
        this.rotated -= degToRad(this.swivelSpeed);
    } else if (this.rotated < 0) {
        this.sprite.rotation += degToRad(this.swivelSpeed);
        this.rotated += degToRad(this.swivelSpeed);
    }
    if (this.sprite.rotation < this.homeRotation+degToRad(this.swivelSpeed) && this.sprite.rotation > this.homeRotation-degToRad(this.swivelSpeed)) {
        this.sprite.rotation = this.homeRotation;
        this.rotated = 0;
    }
}
Turret.prototype.turnToward = function(targetAngle) {
    var distance = targetAngle-this.sprite.rotation;
//    if (Math.abs(distance) > Math.PI) {
//        if (distance > 0) {
//            distance -= Math.PI*2;
//        } else {
//            distance += Math.PI*2
//        }
//    }
    var flexRequirement = this.homeRotation-targetAngle;
    if (Math.abs(flexRequirement) <= this.swivelRange) {
        if (this.sprite.rotation !== targetAngle) {
            if (distance < degToRad(1)) {
                var oldRotation = this.sprite.rotation;
                this.sprite.rotation = targetAngle;
                this.rotated += this.sprite.rotation-oldRotation;
            } else {
                if (targetAngle > this.sprite.rotation) {
                    this.sprite.rotation += degToRad(this.swivelSpeed);
                    this.rotated += degToRad(this.swivelSpeed);
                } else {
                    this.sprite.rotation -= degToRad(this.swivelSpeed);
                    this.rotated -= degToRad(this.swivelSpeed);
                }
//                this.sprite.rotation += distance/this.swivelSpeed;
//                this.rotated += distance/this.swivelSpeed;
            }
        };
    }
}
Turret.prototype.turnTowardObject = function(objX,objY) {
    var targetRotation = angleOfPointABFromXY(objX,objY,this.homePosition().x,this.homePosition().y)-this.owner.container.rotation-Math.PI/2;
    var distance = targetRotation-this.sprite.rotation;
    var flexRequirement = this.homeRotation-rangedRotation(targetRotation);
    if (Math.abs(distance) > Math.PI) {
        distance -= Math.PI*2;
    }
    if (flexRequirement < Math.PI/2 && flexRequirement > -Math.PI/2) {

        if (this.sprite.rotation !== targetRotation) {
            if (distance < degToRad(1)) {
                this.sprite.rotation = targetRotation;
                this.lockedOn = true;
            } else {
                if (targetRotation > this.sprite.rotation) {
                    this.sprite.rotation += degToRad(2);
                    this.rotated += degToRad(2);
                } else {
                    this.sprite.rotation -= degToRad(2);
                    this.rotated -= degToRad(2);
                }
//                this.sprite.rotation += distance/this.swivelSpeed;
//                this.rotated += distance/this.swivelSpeed;
            }
        } else {
            this.lockedOn = true;
        }
    } else {
        this.target.targeted = false;
        this.target = undefined;
        this.lockedOn = false;
    }
}
Turret.prototype.fadeLasers = function() {
    for (var e=0;e<this.emissions.length;e++) {
        this.emissions[e].sprite.alpha = (e*(0.1/this.emissions.length));
        if (counter-this.emissions[e].born > this.emissions[e].longevity) {
            container.removeChild(this.emissions[e].sprite);
            this.emissions[e].sprite.visible = false;
            this.emissions.splice(e,1);
//            this.target = undefined;
        }
    }
}
Turret.prototype.fireBullet = function(type) {
    this.lastFired = counter;
    playSound(flameTurretSound)
    if(type === "Fire") {
        var bullet = new Bullet("Fire",fireballText,this.projectileSize);

        bullet.launchAngle = bullet.sprite.rotation = this.sprite.rotation;
    } else if (type === "Virus") {
        var bullet = new Bullet("Virus",rayText,this.projectileSize*2);

        bullet.launchAngle = this.sprite.rotation;
        bullet.sprite.rotation = this.sprite.rotation+degToRad(90)
    }
    bullet.preFadeTime = this.preFadeTime;
    bullet.sprite.x = window.innerWidth/2+this.tipPosition().x;
    bullet.sprite.y = window.innerHeight/2+this.tipPosition().y;
    bullet.motherTurret = this;
    bullet.flySpeed = this.projectileSpeed;
    flames.push(bullet);
}
Turret.prototype.fireLaser = function(target) {
    this.lastFired = counter;
    if (!this.firing) {
        this.firing = true;
    }
    var emission = new Laser(distanceFromABtoXY(window.innerWidth/2+this.tipPosition().x,window.innerHeight/2+this.tipPosition().y,target.container.x,target.container.y));
    emission.sprite.anchor.x = 0.5;
    emission.sprite.anchor.y = 0;
    emission.sprite.height = emission.maxLength;
    if (this.type === "Laser") {
        playSound(laserSound)
        emission.sprite.tint = 0xff0000;
        if (target.head.tint !== 0xff0000) {
            target.changeColor(0xff0000);

        };
        emission.sprite.width = spermWidth/3;
        var neighbor = this.target.closestNeighbor(this.reach/1.5);
        if (neighbor) {
            this.fireLaserChainFromTarget(neighbor);
        } else {
            if (this.target.linkedSperm) {
                this.target.linkedSperm.targeted = false;
//                this.target.linkedSperm.changeColor(this.target.linkedSperm.color);
                this.target.linkedSperm = undefined;
            }
        }
    } else if (this.type === "Ice") {
        emission.sprite.tint = 0x9999ff;
        emission.sprite.alpha = 0.3;
        if (this.target.head.tint !== 0x7777ff) {
            target.changeColor(0x7777ff);
            playSound(iceBeamSound)
            playSound(spermFreezeSound)
        };
        emission.sprite.width = this.sprite.width/5;
        if (target.onFire) {
            target.onFire = false;
        }
        if (!target.slowed) {
            target.speed /= this.slowFactor;
            target.slowed = true;
        }
//        var neighbor = this.target.closestNeighbor(this.reach/2);
//        if (!this.target.linkedSperm && neighbor) {
//            this.fireLaserChainFromTarget(neighbor);
//        }
    }
    emission.sprite.x = this.tipPosition().x;
    emission.sprite.y = this.tipPosition().y;
//    emission.sprite.x = this.sprite.x-currentSize.x/2;
//    emission.sprite.y = this.sprite.y-currentSize.y/2;
    emission.sprite.rotation = this.sprite.rotation-Math.PI/2;
    emissions.push(emission);
    this.owner.container.addChildAt(emission.sprite,0);
    target.takeDamageFromObject(this);
//    target.changeColor(0x0000aa)
}
Turret.prototype.fireLaserChainFromTarget = function(secondTarget) {
    var emission = new Laser(distanceFromABtoXY(this.target.container.x,this.target.container.y,secondTarget.container.x,secondTarget.container.y));
    var emissionAngle = angleOfPointABFromXY(this.target.container.x,this.target.container.y,secondTarget.container.x,secondTarget.container.y)
    emission.sprite.anchor.x = 0.5;
    emission.sprite.anchor.y = 0;
    emission.sprite.height = emission.maxLength;
    if (this.type === "Laser") {
        emission.sprite.tint = 0xff0000;
        emission.sprite.width = this.sprite.width/8;
        secondTarget.takeDamageFromObject(this)
        secondTarget.changeColor(0xff0000);
    } else if (this.type === "Ice") {
        emission.sprite.tint = 0x9999ff;
        emission.sprite.alpha = 0.5;
        emission.sprite.width = this.sprite.width/5;
        secondTarget.changeColor(0x7777ff);
        if (!secondTarget.slowed) {
            secondTarget.speed /= this.slowFactor;
            secondTarget.slowed = true;
        };
        secondTarget.takeDamageFromObject(this)
    }
    secondTarget.targeted = true;
    this.target.linkedSperm = secondTarget;
    emission.sprite.x = this.target.container.x;
    emission.sprite.y = this.target.container.y;
//    emission.sprite.x = this.sprite.x-currentSize.x/2;
//    emission.sprite.y = this.sprite.y-currentSize.y/2;
    emission.sprite.rotation = emissionAngle;
    emissions.push(emission);
    container.addChild(emission.sprite);
//    target.changeColor(0x0000aa)
}

Turret.prototype.canSwivelTo = function(destinationAngle) {
    if (destinationAngle > rangedRotation(this.homeRotation-degToRad(90)) && destinationAngle < rangedRotation(this.homeRotation+degToRad(90))) {
        return true;
    } else {
        return false;
    }
}

function Laser(length) {
    this.sprite = new PIXI.Sprite(tailText);
    this.born = counter;
    this.maxLength = length;
    this.longevity = 2;
}
function Bullet(type,texture,size) {
    this.sprite = new PIXI.Sprite(texture);
    this.born = counter;
    this.sprite.anchor.set(0.5);
    this.sprite.width = this.sprite.height = size;
    this.type = type;
    if (type === "Fire") {
        this.sprite.tint = 0xffa500;
    } else if (type === "Virus") {
        this.sprite.tint = 0x77ff77;
    }
    this.launchAngle = undefined;
    this.motherTurret = undefined;
//    this.flySpeed = this.motherTurret.projectileSpeed
    this.flySpeed = spermWidth/2;
    this.effectColor = 0xffaa00;
    container.addChild(this.sprite);
    this.fly = function() {
        var newPosition = pointAtAngle(this.sprite.x,this.sprite.y,this.launchAngle,this.flySpeed)
        this.sprite.x = newPosition.x;
        this.sprite.y = newPosition.y;

        if (this.sprite.alpha >= 0.1) {
            if (type === "Fire") {
                this.sprite.rotation += degToRad(12);
                if (this.sprite.width < ship.body.width) {
                    this.sprite.scale.x *= 1.02;
                    this.sprite.scale.y *= 1.02;
                }
            } else if (type === "Virus") {
                if (this.sprite.width < ship.body.width) {
                    this.sprite.scale.x *= 1.01;
                    this.sprite.scale.y *= 1.01;
                }
            }
            if (counter-this.born > this.preFadeTime) {
                this.sprite.alpha -= 0.1;
            }
        } else {
            this.sprite.alpha = 0;
            this.removeFromGame();

        }
//        if (distanceFromABtoXY(ship.container.x,ship.container.y,this.sprite.x,this.sprite.y) >= this.motherTurret.reach/1.5) {
////        if (this.sprite.x < ship.container.x-offscreenDistance || this.sprite.x > ship.container.x+offscreenDistance ||
////            this.sprite.y < ship.container.y-offscreenDistance || this.sprite.y > ship.container.y+offscreenDistance) {
//
//        }
    }
    this.removeFromGame = function() {
        container.removeChild(this.sprite);
        if (this.type === "Fire") {
            flames.splice(flames.indexOf(this),1);
        } else if (this.type === "Virus") {
            flames.splice(flames.indexOf(this),1);
        }
    }
}
Turret.prototype.launchRocket = function() {
    this.lastFired = counter;

    playSound(rocketSound)
    var rocket = new Rocket(rocketText,this.projectileSize,this.projectileSize*1.5);
    rocket.flySpeed = this.projectileSpeed;
    rocket.sprite.x = window.innerWidth/2+this.tipPosition().x;
    rocket.sprite.y = window.innerHeight/2+this.tipPosition().y;
    rocket.launchAngle = rocket.sprite.rotation = this.sprite.rotation;
    rocket.sprite.rotation += degToRad(90)
    rocket.motherTurret = this;
    rocket.target = this.target;
//    this.target = undefined;
    rockets.push(rocket);
}
rocketSpeed = spermWidth;
rocketRate = 15;
rocketWidth = spermWidth*1.2;
function Rocket(texture,sizeX,sizeY) {
    this.sprite = new PIXI.Sprite(texture);
    this.born = counter;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.9;
    this.sprite.width = sizeX;
    this.sprite.height = sizeY;
//    this.sprite.tint = 0xffa500;
    this.launchAngle = undefined;
    this.motherTurret = undefined;
    this.flySpeed = undefined;
    this.effectColor = 0xffaa00;
    container.addChild(this.sprite);
    this.emitFlame = function() {
        var flameParticle = new PIXI.Sprite(fireballText);
        flameParticle.width = flameParticle.height = this.sprite.width;
        flameParticle.anchor.set(0.5);
        flameParticle.alpha = 0.85;
        flameParticle.x = this.sprite.x;
        flameParticle.y = this.sprite.y;
        flameParticle.speed = randomInt(1,3);
        flameParticle.rotation = randomInt(degToRad(0,359));
        flameParticle.source = "Rocket";
        lingeringFlames.push(flameParticle);
        container.addChild(flameParticle);
    }
    this.fly = function() {
        var newPosition = pointAtAngle(this.sprite.x,this.sprite.y,this.sprite.rotation-degToRad(90),this.flySpeed)
        this.sprite.x = newPosition.x;
        this.sprite.y = newPosition.y;
//        if (this.sprite.x < 0 || this.sprite.x > window.innerWidth || this.sprite.y < 0 || this.sprite.y > window.innerHeight) {
//            this.sprite.tint = 0xff0000;
//        }
//        if (distanceFromABtoXY(ship.container.x,ship.container.y,this.sprite.x,this.sprite.y) >= this.motherTurret.reach/1.5) {
//        if (this.sprite.x < ship.container.x-offscreenDistance || this.sprite.x > ship.container.x+offscreenDistance ||
//            this.sprite.y < ship.container.y-offscreenDistance || this.sprite.y > ship.container.y+offscreenDistance) {
//            rockets.splice(rockets.indexOf(this));
//            container.removeChild(this.sprite);
//        }
    }
    this.scanForTargets = function() {
        if (this.closestSperm()) {
            this.target = this.closestSperm();
        }
    }
    this.closestSperm = function(maxDistance) {
        var closestDistance = 10000;
        var closestSperm = undefined;
        for (s=0;s<sperms.length;s++) {
            var currentSperm = sperms[s];
            var distance = distanceFromABtoXY(this.sprite.x,this.sprite.y,currentSperm.container.x,currentSperm.container.y)
            var angleAway = angleOfPointABFromXY(currentSperm.container.x,currentSperm.container.y,this.sprite.x,this.sprite.y)
            if (distance < closestDistance) {

//                if (randomInt(0,10) < 10) {
                closestDistance = distance;
                closestSperm = currentSperm;
//                }
            }
        }
        if (closestSperm) {
            if ( Math.abs(rangedRotation(this.sprite.rotation)-angleAway) > degToRad(90) || closestSperm.onFire || closestSperm.hp <= 0 || closestDistance > this.reach ) {
                closestSperm = undefined;
            }
//            closestSperm.beeTargeted = false;
        }
        return closestSperm;
    }
    this.explode = function(target) {
        if (target) {
            playSound(explosionSound)
            new Explosion(spermWidth*4,target)
        }
        container.removeChild(this.sprite)
        rockets.splice(rockets.indexOf(this),1)
    }
    this.turnToward = function(targetAngle,degrees) {
        var distance = Math.abs(targetAngle-this.sprite.rotation);
        if (Math.abs(distance) > Math.PI) {
            if (distance > 0) {
                distance -= Math.PI*2;
            } else {
                distance += Math.PI*2
            }
        }
        if (rangedRotation(this.sprite.rotation) !== targetAngle) {
            if (distance < degToRad(degrees)) {
                this.sprite.rotation = targetAngle;
            } else {
                if (targetAngle > this.sprite.rotation) {
                    this.sprite.rotation += degToRad(degrees);
                    this.rotated += degToRad(degrees);
                } else {
                    this.sprite.rotation -= degToRad(degrees);
                    this.rotated -= degToRad(degrees);
                }
                // this.sprite.rotation += distance/this.swivelSpeed;
                // this.rotated += distance/this.swivelSpeed;
            }
        };
    }
    this.followTarget = function() {
        var target = this.target;
        var angleAway = rangedRotation(angleOfPointABFromXY(this.sprite.x,this.sprite.y,target.container.x,target.container.y)-Math.PI/2);
//        var intendedLocation = pointAtAngle(this.sprite.x,this.sprite.y,angleAway,this.flySpeed);
        this.sprite.rotation = angleAway;
    }
}
function BombSeed() {
    this.sprite = new PIXI.Sprite(largeSphereText);
    this.sprite.width = this.sprite.height = spermWidth*3;
    this.sprite.tint = 0xff0000;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.x = ship.container.x;
    this.sprite.y = ship.container.y;
    this.launchAngle = angleOfPointABFromXY(cursor.x,cursor.y,ship.container.x,ship.container.y)-Math.PI/2;
    this.speed = spermWidth*5;
    this.bombSite = undefined;
    lastBombTime = counter
    this.fly = function() {
        var newPosition = pointAtAngle(this.sprite.x,this.sprite.y,this.launchAngle,this.speed);
        var newDistance = distanceFromABtoXY(ship.container.x,ship.container.y,newPosition.x,newPosition.y);
        var bombSiteDistance = distanceFromABtoXY(ship.container.x,ship.container.y,this.bombSite.x,this.bombSite.y);
        if (newDistance > bombSiteDistance) {
            container.removeChild(this.sprite);
            bombSeeds.splice(bombSeeds.indexOf(this),1)
            playSound(clickbombSound)
            var clickbomb = new Clickbomb(this);
            clickbomb.sprite.x = this.bombSite.x;
            clickbomb.sprite.y = this.bombSite.y;
        } else {
            this.sprite.x = newPosition.x;
            this.sprite.y = newPosition.y;
        }
    }
    bombSeeds.push(this);
    container.addChildAt(this.sprite,0);
}
function Clickbomb(seed) {
    this.sprite = new PIXI.Sprite(largeSphereText);
    this.sprite.width = this.sprite.height = spermWidth*2;
    this.sprite.tint = 0xff0000;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale.x = this.sprite.scale.y = 0.1;
    this.fading = false;
    this.decayRate = 0.05;
    this.peaked = -99;
    this.longevity = clickbombLongevity;
    container.addChildAt(this.sprite,container.children.length-1);
    activeClickbombs.push(this);
    clickbombs.push(this);
    this.pulse = function() {
        this.sprite.rotation += degToRad(12)
        if (clock && !touchedClock && distanceFromABtoXY(this.sprite.x,this.sprite.y,clock.sprite.x,clock.sprite.y) < (this.sprite.width/2)+(clock.sprite.width)) {
            touchedClock = counter
            clock.sprite.alpha = 0.4
        }
        if (this.sprite.width*1.1 <= clickbombMaxSize) {
            this.sprite.width *= 1.1;
            this.sprite.height *= 1.1;
        } else {
            if (!this.fading) {
                this.sprite.width = this.sprite.height = clickbombMaxSize
                this.fading = true;
                this.peaked = counter;
                activeClickbombs.splice(activeClickbombs.indexOf(this),1)
            }
        }
        if (this.fading) {

            if (counter-this.peaked > this.longevity) {
                this.sprite.alpha -= this.decayRate;
                this.sprite.width *= 0.8;
                this.sprite.height *= 0.8;
            }
            if (this.sprite.alpha <= 0) {
                this.sprite.visible = false;
                container.removeChild(this.sprite);
                clickbombs.splice(clickbombs.indexOf(this),1)
            }
        }
    }
};
function Explosion(size,owner) {
    this.textureSheet = explosionSheet;
//    this.textureSheet.frame = new PIXI.Rectangle(0, 0, 96, 96);
    this.currentFrame = 4;
    this.textureSheet.frame = new PIXI.Rectangle((this.currentFrame-1)*96, 0, 96, 96);
    this.currentSprite = new PIXI.Sprite(this.textureSheet);
    this.currentSprite.anchor.set(0.5);
    this.currentSprite.width = this.currentSprite.height = size;
    this.victim = owner;
    this.currentSprite.alpha = 0.7;
    container.addChild(this.currentSprite);
    if (owner.container) {
        this.currentSprite.x = owner.container.x;
        this.currentSprite.y = owner.container.y;
    } else {
        this.currentSprite.x = owner.sprite.x;
        this.currentSprite.y = owner.sprite.y;
    }
    explosions.push(this);
}
Explosion.prototype.advance = function() {
    if (counter % 2 === 0) {
        this.textureSheet.frame = new PIXI.Rectangle(this.currentFrame*96, 0, 96, 96);
        this.currentFrame++;
    }
}
function Clock() {
    this.born = counter;
    this.sprite = new PIXI.Sprite(clockText);
    this.sprite.height = this.sprite.width = spermWidth*5;
    container.addChild(this.sprite)
}
function Meat() {
    this.born = counter;
    this.sprite = new PIXI.Sprite(meatText);
    this.sprite.height = this.sprite.width = spermWidth*5;
    container.addChild(this.sprite)
}
function awardPlayer(amount,auto) {
    amount = Math.floor(amount*100)/100
    playerScore += amount
    enableButtons()
    updateStatDisplays()
    cashBlip.innerHTML = "+"+(amount*100)
    if (amount && !auto) {
        cashCount.style.transform = "scale(1.15)"
        cashBlip.style.opacity = 1
        cashBlip.style.transform = "scale(1)"
        setTimeout(function(){
            cashCount.style.transform = "scale(1)"
        },60)
        setTimeout(function(){
            cashBlip.style.opacity = 0
            // cashBlip.style.transform = "scale(0)"
        },300)
        setTimeout(function(){
            cashBlip.style.transform = "scale(0)"
        },450)
        
    }
}