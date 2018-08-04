function spawnSperm(type) {
    var randomSpot = randomOffScreen(container.scale.x);
    // var newborn = new Sperm(randomSpot.x,randomSpot.y,spermScale*randomInt(101,120)/100,0xddeeee,spermTails,false);
    if (!type) {
        var newborn = new Sperm(randomSpot.x,randomSpot.y,spermScale,0xddeeee,spermTails,false);
    } else if (type==="bomber") {
        var newborn = new Sperm(randomSpot.x,randomSpot.y,spermScale*1.5,0xffee99,spermTails,false);
        newborn.determination = 3
        newborn.worth = 0.1
        newborn.speed = defaultSpermSpeed*2
        newborn.type = "bomber"
    }
    

    newborn.container.rotation = angleOfPointABFromXY(newborn.container.x,newborn.container.y,ship.body.x,ship.body.y);
    spawnedThisRound++;
    document.getElementById('enemy-bar').style.transform = "scaleX("+((currentLoadSize-spawnedThisRound)/currentLoadSize)+")"
    if (spawnedThisRound === currentLoadSize) {
        spermReleased = true;
    }
}
//defaultSpermSpeed += 3

defaultSpermHP = 100;
defaultSpermStrength = 2;
spermScale = 1;

function Sperm(posX,posY,scale,color,tail,ammo) {
    this.shieldDamage = 5
    this.beesFollowing = 0;
    this.randomLog = [];
    this.determination = 1
    this.worth = spermWorth
    if (!randomInt(0,5)) {
        this.determination = 2
    }
//    this.speed = 3;
    this.speed = defaultSpermSpeed*(randomInt(90,110)/100);
//    console.log("speed is " + this.speed)
    this.target = undefined;
    this.targetSperm = undefined;
    this.hp = this.maxHP = Math.round(defaultSpermHP*scale);
    this.strength = Math.round(defaultSpermStrength*scale);
    this.died = -99;
    this.damaged = -1;
    this.sightRange = 600;
    this.mark = [];
//    this.speed = randomInt(4,4);
    this.turnSpeed = this.makeRandomDecision(randomInt(this.speed*5,this.speed*7)/100);
//    this.turnSpeed = 0.2;
    this.turned = 0;
    this.kamikaze = false;
    this.origSpeed = this.speed;
    if (ammo) {
        this.aging = true;
        this.speed = 8;
    } else {
        this.aging = false;
        enemyCount++;
    }
    this.burrowing = false;
    this.ammo = ammo;
//    this.born = counter;
    this.tailChamber = [];
    this.lifeSpan = 200;
//    this.lifeSpan = randomInt(40,75);
    this.tailGrown = false;
    this.lastFrame = {x:undefined,y:undefined,rotation:undefined}
    this.flexAmount = 0;
    this.blocked = false;
    this.targeted = false;
    this.beeTargeted = false;
    this.color = color;
    this.dingleberries = [];
    this.onFire = false;
    this.causeOfDeath = undefined;
    this.linkedSperm = undefined;
    this.slowed = false;
    this.zombie = false;
    this.mimicing = undefined;
    this.flexLimit = this.speed*2;

//    this.flexLimit = this.makeRandomDecision(randomInt(20,30)/10);

    this.container = new PIXI.Container();
    this.container.owner = this;
    this.container.rotation = degToRad(randomInt(0,360));
//    this.container.pivot.x = this.container.width/2;
//    this.container.pivot.y = this.container.height/2;
    this.head = new PIXI.Sprite(spermText);
    this.head.anchor.set(0.5);
    this.head.ratio = this.head.width/this.head.height;
    this.head.width = spermWidth*scale;
//    var randVariance = (randomInt(-25,10)/100);
//
//    this.head.width *= 1+randVariance;

    this.head.height = this.head.width/this.head.ratio;

    this.head.x = this.container.pivot.x = this.container.x = posX;
    this.head.y = this.container.pivot.y = this.container.y = posY;
    this.head.anchor.set(0.5);

    this.makeRandomDecision(randomInt(0,1)) ? this.flexDirection = 1 : this.flexDirection = -1;

    if (tail) {
        var randTail = randomInt(-3,3)/10;
        this.createTail(9,3+randTail,tailText,false);
//        this.createTail(9,3+randTail,sphereText,true);
//        this.createTail(6,3,tailText,false);
    };
    sperms.push(this);
//    if (randVariance < 0) {
//        this.container.alpha *= 1+randVariance*1.5;
//    }
    this.head.tint = color;
    this.container.addChild(this.head);
    container.addChildAt(this.container,container.children.length-1);
    // this.head.cacheAsBitmap = true
}
Sperm.prototype.setOnFire = function() {
//    for (var p=0;p<particles;p++) {
        var flameParticle = new PIXI.Sprite(fireballText);
        flameParticle.width = flameParticle.height = spermWidth*2;
        flameParticle.anchor.set(0.5);
        flameParticle.alpha = 0.85;
        flameParticle.x = this.container.x;
        flameParticle.y = this.container.y;
        flameParticle.speed = randomInt(1,3);
        flameParticle.rotation = randomInt(degToRad(0,359));
        flameParticle.source = "Sperm";
        lingeringFlames.push(flameParticle);
        container.addChild(flameParticle);
//    }
}
Sperm.prototype.burn = function() {
    for (var p=0;p<this.dingleberries.length;p++) {
        var flame = this.dingleberries[p];
        flame.scale.x *= 0.99;
        flame.scale.y *= 0.99;
        flame.rotation += degToRad(1)*randomInt(-1,1);
        if (flame.alpha-0.15 <= 0) {
            container.removeChild(flame)
            lingeringFlames.splice(lingeringFlames.indexOf(flame),1)
        } else {
            flame.alpha -= 0.15;
        }
    }
}
Sperm.prototype.rebound = function() {
    this.swim(-this.speed);
    if (this.makeRandomDecision(randomInt(0,1))) {
        this.turn(Math.PI*1.5);
    } else {
        this.turn(-Math.PI*1.5);
    }
    this.swim(-this.speed);
}
Sperm.prototype.checkForWallCollisions = function() {
    colliding = false;

    if (true) {
        for (var w=0; w<walls.length; w++) {
            var other = walls[w];
            if (other.hitbox.contains(this.intendedLocation(1).x,this.intendedLocation(1).y)) {
                colliding = true;
            }
        }

    }
    return colliding;
}

Sperm.prototype.checkForOtherSperm = function() {
    for (var s=0; s<sperms.length;s++) {
        var other = sperms[s];
        var diffX = Math.abs(other.container.x-this.container.x);
        var diffY = Math.abs(other.container.y-this.container.y);
        var pad = this.head.width/2+other.head.width/2;
        pad *= 3;
        if (this !== other &&  diffX < pad && diffY < pad ) {
            this.swim(-this.speed);
            other.turn(other.turnSpeed*4*this.makeRandomDecision(randomInt(-1,1)));
            if (this.onFire && !other.onFire) {
                other.onFire = true;
                spermOnFire++;
                other.changeColor(0x999999);
            }
            if (this.zombie && !other.zombie) {
                other.zombie = true;
                other.changeColor(0x00dd00);
            }
        } else if (this.blocked) {
            this.blocked = false;
        }
    }
}
Sperm.prototype.checkForClickbombs = function() {
    for (var b=0; b<clickbombs.length; b++) {
        var orb = clickbombs[b];
        var distanceFromClickbomb = distanceFromABtoXY(this.container.x,this.container.y,orb.sprite.x,orb.sprite.y);

        if (distanceFromClickbomb <= orb.sprite.width/2+this.head.width/2) {
            this.hp = 0;
            this.causeOfDeath = "clickbomb";
        }
        // } else if (distanceFromClickbomb <= clickbombMaxSize) {
        //     this.tendToward(orb.sprite.x,orb.sprite.y,0.5)
        // }
    }
    for (var s=0; s<bombSeeds.length; s++) {
        var seed = bombSeeds[s];
        var distanceFromBombSeed = distanceFromABtoXY(this.container.x,this.container.y,seed.sprite.x,seed.sprite.y);

        if (distanceFromBombSeed <= seed.sprite.width/2+this.head.width/2) {
            this.hp = 0;
            this.causeOfDeath = "clickbomb";
        }
    }
}
Sperm.prototype.explode = function() {
    playSound(explosionSound)
    new Explosion(spermWidth*16,this)
}
Sperm.prototype.checkForRockets = function() {
    for (var r=0; r<rockets.length; r++) {
        var rocket = rockets[r];
        var distanceFromRocket = distanceFromABtoXY(this.container.x,this.container.y,rocket.sprite.x,rocket.sprite.y);

        if (distanceFromRocket <= rocket.sprite.width*0.75) {
            this.hp -= rocket.motherTurret.strength;
            this.causeOfDeath = "Rocket";
            rocket.explode(this);
        }
    }
}

Sperm.prototype.takeDamageFromObject = function(obj) {
    this.hp -= obj.strength;
    if (this.hp <= 0) {
        this.causeOfDeath = obj.type;
    }
}
Sperm.prototype.checkForFlames = function() {
    for (var b=0; b<flames.length; b++) {
        var bullet = flames[b];
        var distanceFromBullet = distanceFromABtoXY(this.container.x,this.container.y,bullet.sprite.x,bullet.sprite.y);

        if (distanceFromBullet <= (this.container.width/2)+(bullet.sprite.width)) {
//            this.takeDamageFromObject(bullet.motherTurret)
            if (bullet.type === "Fire") {
                if (!this.onFire) {
                    if (soundOn) {playSound(catchFireSound)};
                    this.changeColor(0x999999);
                    this.onFire = true;
                    this.causeOfDeath = "Fire";
                    spermOnFire++;
//                    this.setOnFire();
                }
            } else if (bullet.type === "Virus") {
                if (!this.zombie) {
                    this.changeColor(0x00dd00);
                    this.zombie = true;
                    this.causeOfDeath = "Virus";
                    this.turn(degToRad(180))
                    bullet.removeFromGame();
                }
            }
        } else if (this.head.tint !== this.color) {
//            this.changeColor(this.color);
        }
    }
}
Sperm.prototype.checkForBlockCollisions = function() {
    colliding = false;
    if (true) {
        for (var w=0; w<blockContainer.children.length; w++) {
            if (counter % 1 === 0) {
                var other = blockContainer.children[w];
                if (other.hitbox.contains(this.container.x,this.container.y)) {
                    colliding = true;
                }
            }
        }
    }
    return colliding;
}
Sperm.prototype.makeRandomDecision = function(formula) {
    var rando = formula;
//    if (this.mimicing) {
//        rando = this.mimicing.randomLog[this.randomLog.length];
//        console.log("mean to mimic " + this.mimicing.randomLog[this.randomLog.length-1])
//        console.log("rando was " + rando)
//    }
//    this.randomLog.push(rando);
    return rando;
}
Sperm.prototype.mark = function(trailLength) {
    mark = container.addChild(new PIXI.Sprite(sphereText));
    mark.x = this.container.x;
    mark.y = this.container.y;
    mark.scale.x = 0.3
    mark.scale.y = 0.3
    mark.anchor.set(0.5);
    mark.laid = counter;
    mark.tint = 0xff0000;
    trails.push(mark);
    this.mark.push(mark)
    for (var t=0;t<trails.length;t++) {
        if (counter-trails[t].laid < trailLength) {
            trails[t].alpha -= 1/trailLength;
        }
        if (trails[t].alpha <= 0.01) {
            trails[t].alpha = 0;
            trails.splice(t,1);
            this.mark.splice(t,1);
            container.removeChild(trails[t]);

        }
    }

}
Sperm.prototype.die = function() {

    if (this.targeted) {
        this.targeted = false;
    }
    if (this.onFire) {
        this.onFire = false;
        spermOnFire--;
    }
    if (spermOnFire === 0) {
        catchFireSound.stop();
    }
    if (this.dingleberries.length > 0) {
        for (var d=0;d<this.dingleberries.length;d++) {
            lingeringFlames.push(this.dingleberries[d]);
        }
    }
    enemyCount--;
    killedThisWave++;
    if (this.type==="bomber") {
        this.explode()
        this.removeFromGame()
    } else if (this.causeOfDeath === "clickbomb" || this.causeOfDeath === "Laser" || this.causeOfDeath === "Ice" || this.causeOfDeath === "Bee") {
        if (soundOn) {playSound(spermDieSound)};
        // not removing because animated!
    } else if (this.causeOfDeath === "Rocket") {
        this.removeFromGame();
    } else if (this.causeOfDeath === "Flame") {
        if (soundOn) {playSound(spermDieSound)};
        this.removeFromGame();
    }
    this.died = counter;
}

Sperm.prototype.removeFromGame = function() {
    this.container.removeChild(this.tail);
    this.container.removeChild(this.head);
    container.removeChild(this.container);
    sperms.splice(sperms.indexOf(this),1);
}
Sperm.prototype.animateDeath = function() {
    if (counter-this.died < 20) {
        this.container.alpha -= 1/20;
        if (this.causeOfDeath !== "kamikaze") {
            this.turn(-0.4*this.flexDirection);
        } else {
            this.turn(-0.1*this.flexDirection);
            this.swim(this.speed/4)
        }
//        this.container.rotation += 0.7*this.flexDirection;
        this.container.scale.x -= 1/20;
        this.container.scale.y -= 1/20;

    } else {
        this.removeFromGame();
    }
}
Sperm.prototype.createTail = function(segments,segmentLength,texture,square) {
    this.tail = new PIXI.Container();
    for (var i=0;i<segments;i++) {
        var piece = new PIXI.Sprite(texture);
        // piece.cacheAsBitmap = true
        piece.width = this.head.width/(3.5+(i/2));
        piece.height = piece.width*segmentLength;
        if (square) {
            piece.width = piece.height;
        }
        piece.anchor.x = 0.5;
        piece.anchor.y = 0;
        piece.maxAlpha = 1-(i*0.05);
        piece.x = this.head.x;
        piece.y = this.head.y+this.head.height/2+(i*piece.height);
        piece.tint = this.color;
        this.tailChamber.push(piece);
        this.tail.addChild(piece);
//        piece.alpha = 0;
    }
    this.sproutTail()
    this.container.addChild(this.tail);
};

Sperm.prototype.sproutTail = function() {
    var speed = 1/this.tailChamber.length;
    for (var t=0;t<this.tailChamber.length;t++) {
        var piece = this.tailChamber[t];
        if (Math.round((1-(t*speed))*10)/10 >= 0 ) {
            piece.alpha = Math.round((1-(t*speed))*10)/10;
        } else {
            if (this.ammo) {

            }
        }

    }
};
Sperm.prototype.changeDirectionRandomly = function(frequency) {
    if (counter % frequency === 0 && this.makeRandomDecision(randomInt(0,2)) === 0) {
        this.flexDirection *= -1;
    }
    if (this.turnSpeed > 0.15 && this.turnSpeed < 0.25) {
        var adj = this.makeRandomDecision(randomInt(-150,150)/1000);
//        this.flexAmount += adj;
        this.turnSpeed -= adj;
//        this.speed -= adj;
    }
}

Sperm.prototype.closestNeighbor = function(maxDistance) {
    var closestDistance = 10000;
    var closestSperm = undefined;
    for (var s=0;s<sperms.length;s++) {

        var currentSperm = sperms[s];
        var distance = distanceFromABtoXY(this.container.x,this.container.y,currentSperm.container.x,currentSperm.container.y)

        if (currentSperm !== this && distance < closestDistance) {
            closestDistance = distance;
            closestSperm = currentSperm;
        }
    }
    if ( closestSperm && ( (this.zombie && closestSperm.zombie) || closestSperm.hp <= 0 || closestDistance > maxDistance )) {
        closestSperm = undefined;
    }
//    if (closestSperm && !closestSperm.zombie && this.head.tint === 0xff0000) {
//        closestSperm.changeColor(this.head.tint);
//    }
    return closestSperm;

}


Sperm.prototype.distanceFromSperm = function(other) {
    return distanceFromABtoXY(this.container.x,this.container.y,other.container.x,other.container.y);
}

Sperm.prototype.swim = function(speed) {
    if (true) {
//    if (this.hp > 0) {
    this.container.x = pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,speed).x;
    this.container.y = pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,speed).y;

    if (this.turned < counter && this.flexAmount !== 0) {
        var steps = Math.ceil(30/this.speed);
        this.flexAmount -= this.flexAmount/steps;
    }
    };

}

Sperm.prototype.intendedLocation = function(frames) {
    return pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,this.speed*frames);
}
Sperm.prototype.age = function(speed) {
    if (counter-this.born >= this.lifeSpan) {
        if (this.container.alpha-0.01 <= 0 || this.container.scale.x-0.01 <= 0) {
            this.container.alpha = 0;
            if (this.target) {
                this.target.targeted = false;
            }
            sperms.splice(sperms.indexOf(this),1);
            container.removeChild(this.container);
//            score.text = sperms.length;
            ammoSpermCount--;
        } else {
            this.container.alpha -= speed;

            this.container.scale.x -= speed;
            this.container.scale.y -= speed;
        };

    }
}
Sperm.prototype.tendToward = function(posX,posY,intensity,mult) {
    if (!mult) {
        mult = 1
    }
    if (counter % intensity === 0) {
        for (var m=0;m<mult;m++) {
            this.turnTowardObject(posX,posY)
        }
    };
}
Sperm.prototype.animateTail = function() {
    var nextPieceAnchor = undefined;
    var lastPieceRotation = 0;
    for (var t=0;t<this.tail.children.length;t++) {
        current = this.tail.children[t];
        if (nextPieceAnchor) {
            current.x = nextPieceAnchor.x;
            current.y = nextPieceAnchor.y;
        }
        if (Math.abs(this.flexAmount) < this.flexLimit) {
            current.rotation += (lastPieceRotation-current.rotation);
            current.rotation -= this.flexAmount*3/(this.speed*2);
        };
        lastPieceRotation = current.rotation;
        nextPieceAnchor = pointAtAngle(current.x,current.y,current.rotation+Math.PI/2,current.height);
    }
}
Sperm.prototype.trailTail = function() {
    if (this.tail) {
        var nextPieceAnchor = undefined;
        var lastPieceRotation = -this.flexAmount/10;
        for (var t=0;t<this.tail.children.length;t++) {
            current = this.tail.children[t];
            if (nextPieceAnchor) {
                current.x = nextPieceAnchor.x;
                current.y = nextPieceAnchor.y;
            }
            if (Math.abs(this.flexAmount) < this.flexLimit) {
    //            current.rotation = container.rotation;
                current.rotation += (lastPieceRotation-current.rotation);
                current.rotation -= this.flexAmount*3/(this.speed*4);
            };
            lastPieceRotation = current.rotation;
            nextPieceAnchor = pointAtAngle(current.x,current.y,current.rotation+Math.PI/2,current.height);
        }
    };
}
Sperm.prototype.changeColor = function(color) {
    this.head.tint = color;
    if (this.tail) {
        for (var p=0;p<this.tail.children.length;p++) {
            this.tail.children[p].tint = color;
        }
    };
}
Sperm.prototype.turn = function(amount) {
    this.flexAmount += amount;
    this.container.rotation += this.flexAmount/4;
    this.turned = counter;
    this.lastFrame.rotation = this.container.rotation;
}
Sperm.prototype.turnTowardXY = function(objX,objY,rate) {
    if (shorterDirectionToAngle(this.container.rotation,angleOfPointABFromXY(objX,objY,this.container.x-(this.container.width),this.container.y-(this.container.height))) === "cw") {
        this.turn(rate);
    } else {
        this.turn(-rate);
    }
}
Sperm.prototype.turnTowardObject = function(objX,objY) {
    var targetRotation = angleOfPointABFromXY(objX,objY,this.container.x,this.container.y);
    if (targetRotation > Math.PI*2) {
        targetRotation -= Math.PI*2
    } else if (targetRotation < 0) {
        targetRotation += Math.PI*2;
    }
//    if (this.container.rotation !== targetRotation) {
//        this.container.rotation += rate;
//    }
//    if (this.container.rotation > targetRotation-0.02 && this.container.angle > targetRotation+0.02) {
    var diff = targetRotation-this.container.rotation
//    console.log("diff before " + Math.round(radToDeg(diff)));
    if (Math.abs(diff) > Math.PI) {
        diff -= Math.PI*2;
    }
//    console.log("diff after " + Math.round(radToDeg(diff)));
    if (this.container.rotation !== targetRotation) {
//        if (this.container.rotation > 0 && targetRotation)
        this.container.rotation += diff/10;
        this.flexAmount += (diff/10)*4;
    };
    if (this.container.rotation > Math.PI*2) {
//        console.log("CHANGING " + Math.round(radToDeg(this.container.rotation)));
//        this.container.rotation -= Math.PI*2;
//        console.log(" - TO " + Math.round(radToDeg(this.container.rotation)));
    } else if (this.container.rotation < 0) {
//        console.log("CHANGING " + Math.round(radToDeg(this.container.rotation)));
//        this.container.rotation +=  Math.PI*2;
//        console.log(" - TO " + Math.round(radToDeg(this.container.rotation)));
    }
//    }
}
function upgradeBees(component) {
    if (!bees.length) {
        if (component === "Power") {
            beeData["Power"] += 1
        }  
        if (component === "Speed") {
            beeData["Speed"] += 0.5
        }
        if (component === "Range") {
            beeData["Range"] += ship.body.width/4
        }
    } else {
        for (var b=0;b<bees.length;b++) {
            var bee = bees[b];
            if (component === "Power") {
                if (bee.strength < 30) {
                    bee.strength += 1;
                    beeData["Power"] = bee.strength
                    // bee.sprite.scale.x *= 1.025;
                    // bee.sprite.scale.y *= 1.025;
                    // bee.origScale.x = bee.sprite.scale.x
                    // bee.origScale.y = bee.sprite.scale.y
                }
            }
            if (component === "Speed") {
                if (bee.speed < 10) {
                    bee.speed += 0.5;
                    beeData["Speed"] = bee.speed
                };
            };
            if (component === "Range") {
                if (bee.sight+(ship.body.width/4) < ship.body.width*4) {
                    bee.sight += ship.body.width/4;
                } else {
                    bee.sight = ship.body.width*4
                }
                beeData["Range"] = bee.sight
            };
            if (component === "Healing") {
                if (bee.healingFactor < 20) {
                    bee.healingFactor += 0.5;
                };
            };
        };
    }
    
}
function Bee(posX,posY) {
    this.sprite = new PIXI.Sprite(beeText);
    this.sprite.cacheAsBitmap = true
    this.sprite.width = this.sprite.height = spermWidth*1.5;
    this.origScale = {};
    this.origScale.x = this.sprite.scale.x;
    this.origScale.y = this.sprite.scale.y;
    this.sprite.anchor.set(0.5);
    this.sprite.x = posX;
    this.sprite.y = posY;
    this.speed = beeData["Speed"];
    this.strength = beeData["Power"];
    this.sight = beeData["Range"];
    this.inShip = true;
    this.target = undefined;
    this.blocked = false;
    this.alive = true;
    this.type = "Bee";
    this.maxHP = this.hp = 5000;
    this.healingFactor = 0;
    this.lastPosition = {x:this.sprite.x,y:this.sprite.y};
    this.firedAt = false;
    bees.push(this);
    container.addChild(this.sprite);
    this.releaseFromShip = function() {
        this.inShip = false;
        beesInPlay++;
    }
    this.scanOtherBees = function() {
        for (var c=0;c<bees.length;c++) {
            var other = bees[c];
            if (this !== other) {
            if (this.touchingBee(other)) {
                if (this.healingFactor > 0) {
                    if (other.hp+this.healingFactor <= other.maxHP) {
                        other.hp += this.healingFactor;
                        var reboundAngle = 180;
                        var reboundAmount = 1;
                    } else {
                        var reboundAngle = 180;
                        var reboundAmount = 1;
                    }
                } else {
                    var reboundAngle = 180;
                    var reboundAmount = 1;
                }
                var angleAway = angleOfPointABFromXY(other.sprite.x,other.sprite.y,this.sprite.x,this.sprite.y);
                this.sprite.x = pointAtAngle(this.sprite.x,this.sprite.y,angleAway-degToRad(reboundAngle),1).x;
                this.sprite.y = pointAtAngle(this.sprite.x,this.sprite.y,angleAway-degToRad(reboundAngle),1).y;
            } else if (!this.target && this.healingFactor && other.hp+this.healingFactor < other.maxHP) {
//                console.log("PURS")
//                var angleAway = angleOfPointABFromXY(other.sprite.x,other.sprite.y,this.sprite.x,this.sprite.y)-Math.PI/2;
//                var intendedLocation = pointAtAngle(this.sprite.x,this.sprite.y,angleAway,this.speed/2);
//                this.sprite.x = intendedLocation.x;
//                this.sprite.y = intendedLocation.y;
            }
            };
        }
    }
    this.dance = function(amount) {
        var xMovement = randomInt(-amount,amount);
        var yMovement = randomInt(-amount,amount);
        this.sprite.x += xMovement;
        this.sprite.y += yMovement;

        if (this.inShip) {
            var distance = distanceFromABtoXY(this.sprite.x,this.sprite.y,ship.container.x,ship.container.y);
            if (distance > (ship.hull.width/2)-spermWidth*0.75) {
                this.sprite.x -= xMovement;
                this.sprite.y -= yMovement;
            }
        }
    }
    this.returnToShip = function() {
        var randomSpot = pointAtAngle(ship.container.x,ship.container.y,degToRad(randomInt(0,359)),randomInt(0,(ship.hull.width/2)-spermWidth*0.75));
        this.sprite.x = randomSpot.x;
        this.sprite.y = randomSpot.y;
        this.inShip = true;
        this.sprite.alpha = 0.15;
        this.sprite.tint = 0xffffff;
        this.sprite.rotation = 0;
        this.sprite.scale.x = this.origScale.x;
        this.sprite.scale.y = this.origScale.y;
    }
    this.closestSperm = function(maxDistance) {
        var closestDistance = 10000;
        var closestSperm = undefined;
        for (s=0;s<sperms.length;s++) {
            var currentSperm = sperms[s];
            var distance = distanceFromABtoXY(this.sprite.x,this.sprite.y,currentSperm.container.x,currentSperm.container.y)
            if (distance < closestDistance) {
//                if (randomInt(0,10) < 10) {
                    closestDistance = distance;
                    closestSperm = currentSperm;
//                }
            }
            if (distance < (currentSperm.container.width/2)+(this.sprite.width/2)) {
//                if (soundOn && counter % 2 ===0) {playSound(beeStingSound)};
                currentSperm.takeDamageFromObject(this);
                this.hp -= currentSperm.strength;
            }
        }
        if (closestSperm && (closestSperm.beesFollowing <= bees.length/4 || closestSperm.beesFollowing < bees.length-sperms.length || bees.length < sperms.length)) {
            this.target = closestSperm;
            closestSperm.beesFollowing++;
            var fromCenter = distanceFromABtoXY(ship.container.x,ship.container.y,closestSperm.container.x,closestSperm.container.y);
            if (fromCenter > ship.body.width*10 || closestSperm.onFire || closestSperm.hp <= 0 || closestDistance > this.sight ) {
                if (closestSperm === this.target) {
                    this.target = undefined;
                    closestSperm.beesFollowing--;
                }
                closestSperm = undefined;

            }
//            closestSperm.beeTargeted = false;
        }
        return closestSperm;
    }
    this.attackClosestSperm = function() {
        var sperm = this.closestSperm()
        if (sperm !== undefined && this.target === sperm ) {

            var angleAway = angleOfPointABFromXY(sperm.container.x,sperm.container.y,this.sprite.x,this.sprite.y)-Math.PI/2;
            var intendedLocation = pointAtAngle(this.sprite.x,this.sprite.y,angleAway,this.speed);
            this.sprite.x = intendedLocation.x;
            this.sprite.y = intendedLocation.y;
            sperm.beeTargeted = true;

        }
    }
    this.touchingBee = function(bee) {
        var touching = false;
        var diffX = Math.abs(bee.sprite.x-this.sprite.x);
        var diffY = Math.abs(bee.sprite.y-this.sprite.y);
        var pad = (this.sprite.width/2)+(bee.sprite.width/2);

        if (this !== bee && diffX < pad && diffY < pad ) {
            touching = true;
        }
        return touching;
    }
    this.animateDeath = function() {
        this.sprite.alpha -= 0.05;
        this.sprite.rotation += degToRad(10);
        this.sprite.scale.x *= 0.9;
        this.sprite.scale.y *= 0.9;
        if (this.sprite.alpha <= 0.05) {
            this.returnToShip();
        }
    }
}
function Egg() {
    this.container = new PIXI.Container();
    this.container.pivot.x = this.container.x = window.innerWidth/2;
    this.container.pivot.y = this.container.y = window.innerHeight/2;
    this.white = new PIXI.Sprite(circleText);
    this.yolk = new PIXI.Sprite(circle2Text);
    this.white.anchor.x = this.white.anchor.y = this.yolk.anchor.x = this.yolk.anchor.y = 0.5;
    this.white.x = this.yolk.x = window.innerWidth/2;
    this.white.y = this.yolk.y = window.innerHeight/2;
    this.white.tint = this.white.origTint = 0xffaaaa;
    this.yolk.tint = 0xaa6666;
    this.white.alpha = 0.2;
    this.container.addChild(this.white);
    this.container.addChild(this.yolk);
    this.damaged = -99;
    this.hp = 100
    container.addChild(this.container)
    this.changeHP = function(newAmount) {
        newAmount < this.hp ? this.damaged = counter :null
        this.hp = newAmount
        this.hp < 0 ? this.hp = 0 :null
        document.getElementById('wave-shield-display').innerHTML = this.hp
        document.getElementById('shield-bar').style.transform = "scaleX("+(this.hp/100)+")"
        document.getElementById('heal-all-button').innerHTML = "ALL ($"+Math.round((100-this.hp)*1.4)+")"
        var newEggSize = this.minWidth+(this.shrinkArea*(newAmount/100))
        this.white.width = newEggSize
        this.white.height = newEggSize
    }
    this.pulsate = function(amount,cycleLength) {
        if (counter % (cycleLength*2) < cycleLength) {
            this.white.scale.x += (amount);
            this.white.scale.y += amount;
        } else {
            this.white.scale.x -= amount;
            this.white.scale.y -= amount;
        }
        if (counter % cycleLength < cycleLength/2) {
            this.yolk.scale.x += amount;
            this.yolk.scale.y += amount;
        } else {
            this.yolk.scale.x -= amount;
            this.yolk.scale.y -= amount;
        }
    }
}
if (window.innerWidth > window.innerHeight) {
    defaultSpermSpeed = spermWidth/2.5;
} else {
    defaultSpermSpeed = spermWidth/2;
}