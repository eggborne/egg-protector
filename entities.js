spermWidth = shorterDimension/60;

function Sperm(posX,posY,scale,color,tail,ammo) {
    this.speed = randomInt(6,12);
//    this.speed = randomInt(4,4);
    this.turnSpeed = randomInt(20,25)/100;
//    this.turnSpeed = 0.2;
    this.turned = 0;
    this.ammo = ammo;
    this.born = counter;
    this.tailChamber = [];
    this.lifeSpan = randomInt(200,200);
    this.lastFrame = {x:undefined,y:undefined,rotation:undefined}
    this.flexAmount = 0;
    this.blocked = false;
    this.color = color;
//    this.flexLimit = this.speed/2;
    this.flexLimit = randomInt(30,40)/10;
    randomInt(0,1) ? this.flexDirection = 1 : this.flexDirection = -1;
    this.container = new PIXI.Container();
    this.container.rotation = degToRad(randomInt(0,360));
    this.head = new PIXI.Sprite(spermText);
    this.head.anchor.set(0.5);
    this.head.ratio = this.head.width/this.head.height;
    this.head.width = spermWidth*scale;
    var randVariance = (randomInt(-25,10)/100);
    if (randomInt(0,20) === 0) {
        randVariance = -0.75;
    }
    this.head.width *= 1+randVariance;

    this.head.height = this.head.width/this.head.ratio;

    this.head.x = this.container.pivot.x = this.container.x = posX;
    this.head.y = this.container.pivot.y = this.container.y = posY;
    this.head.anchor.set(0.5);

    if (tail) {
        this.createTail(15,sphereText,true);
//        this.createTail(15,tailText,false);
    };

    sperms.push(this);
//    score.text = sperms.length;
    if (randVariance < 0) {
        this.container.alpha *= 1+randVariance*1.5;
    }
    this.head.tint = color;
    this.container.addChild(this.head);
//    this.container.addChild(this.hitbox);
    container.addChildAt(this.container,container.children.length-1);

}

Sperm.prototype.createTail = function(segments,texture,square) {
    this.tail = new PIXI.Container();
    for (var i=0;i<segments;i++) {
        var piece = new PIXI.Sprite(texture);
        piece.width = this.head.width/(3.5+(i/2));
        piece.height = piece.width*3;
        if (square) {
            piece.width = piece.height;
        }
        piece.anchor.x = 0.5;
        piece.anchor.y = 0;
        piece.alpha = 1-(i*0.05);
        piece.x = this.head.x;
        piece.y = this.head.y+this.head.height/2+(i*piece.height);
        piece.tint = this.color;
        this.tailChamber.push(piece);
        this.tail.addChild(piece);
        piece.visible = false;
    }
    this.container.addChild(this.tail);
};

Sperm.prototype.sproutTail = function(speed) {
    if (this.tailChamber.length > 0 && counter % speed === 0) {
        var timeSinceBorn = counter-this.born;
        this.tailChamber.reverse().pop().visible = true;
    };
};

Sperm.prototype.changeDirectionRandomly = function(frequency,randQuotient) {
    if (counter % frequency === 0 && randomInt(0,randQuotient) === 0) {
        this.flexDirection *= -1;
        if (randomInt(0,3) && this.turnSpeed > 0.15 && this.turnSpeed < 0.25) {
            var adj = randomInt(-150,150)/1000;
            this.turnSpeed += adj;
//                this.speed -= adj;
        }
    }
}


Sperm.prototype.distanceFromSperm = function(other) {
    return distanceFromABtoXY(this.container.x,this.container.y,other.container.x,other.container.y);
}

Sperm.prototype.intendedLocation = function(speed) {
    return pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,speed);
}

Sperm.prototype.swim = function(speed) {
    this.container.x = pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,speed).x;
    this.container.y = pointAtAngle(this.container.x,this.container.y,this.container.rotation-Math.PI/2,speed).y;

    if (this.turned < counter && this.flexAmount !== 0) {

        var steps = Math.ceil(30/this.speed);
        this.flexAmount -= this.flexAmount/steps;
    }

}

Sperm.prototype.age = function() {
    if (counter-this.born >= this.lifeSpan && this.tailChamber.length === 0) {
        if (this.container.alpha-0.01 <= 0 || this.container.scale.x-0.01 <= 0) {
            this.container.alpha = 0;
            sperms.splice(sperms.indexOf(this),1);
            container.removeChild(this.container);
//            score.text = sperms.length;
        } else {
            this.container.alpha -= 0.01;

            this.container.scale.x -= 0.01;
            this.container.scale.y -= 0.01;
        };

    }
}

Sperm.prototype.tendToward = function(posX,posY,intensity) {
    if (counter % intensity === 0) {
        this.turnTowardObject(posX,posY)
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
            current.rotation -= this.flexAmount*3/(this.speed*3);
        };
        lastPieceRotation = current.rotation;
        nextPieceAnchor = pointAtAngle(current.x,current.y,current.rotation+Math.PI/2,current.height);
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

