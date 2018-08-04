function pinchToZoom() {
    if (doubleTapping) {
        var currentDistance = distanceFromABtoXY(touches[0].pos.x,touches[0].pos.y,touches[1].pos.x,touches[1].pos.y);
        if (startingFingerDistance < currentDistance) {
            if (startingFingerDistance*1.1 < currentDistance) {
                zoom(0.04);
            }
        } else {
            if (startingFingerDistance*0.9 < currentDistance) {
                zoom(-0.04);
            }
        }
    }
}

function toggleSlow(amount) {
    if (!slowMode) {
        for (var s=0;s<sperms.length;s++) {
            if (!sperms[s].ammo) {
                sperms[s].speed /= amount;
            }
        }
        // console.log("on")
        slowMode = true;
    } else {
        for (var s=0;s<sperms.length;s++) {
            if (!sperms[s].ammo) {
                sperms[s].speed *= amount;
            }
        }
        // console.log("off")
        slowMode = false;
    }
}

function rangedRotation(radians) {
    var ranged = radians;
    if (radians >= Math.PI*2) {
        ranged -= Math.PI*2
    } else if (radians < 0) {
        while (ranged < 0) {
            ranged += Math.PI*2;
        }
    }
    return ranged;
}

function zoom(speed) {
    var oldWidth = container.width
    var oldHeight = container.height
    if (container.scale.x+speed < zoomLimit.max && container.scale.x+speed > zoomLimit.min) {
        container.scale.x += speed;
        container.scale.y += speed;
//        bg.scale.x += speed/8;
//        bg.scale.y += speed/8;
    } else if (container.scale.x !== zoomLimit.max && container.scale.x !== zoomLimit.min) {
        if (speed > 0) {
            container.scale.x = container.scale.y = zoomLimit.max;
        } else {
            container.scale.x = container.scale.y = zoomLimit.min;
        }


    }
    cursor = getActualCoords(cursor.x,cursor.y);
    offscreenDistance /= container.width/oldWidth;
    bg.width = window.innerWidth/container.scale.x;
    bg.height = window.innerHeight/container.scale.y;
}

function getActualCoords(origX,origY) {
    var adjScale = 1/container.scale.x;
    return {x:adjScale*(origX-currentSize.x/2)+(currentSize.x/2), y: adjScale*(origY-currentSize.y/2)+(currentSize.y/2)};
}

function playerClearedWave() {
    return (ship.hp > 0 && spermReleased && sperms.length === 0 && waveStarted);
}

function distanceFromABtoXY(a,b,x,y) {
    var distanceX = x-a;
    var distanceY = y-b;
    return Math.round( Math.sqrt( (distanceX*distanceX)+(distanceY*distanceY) ));
}
function pointAtAngle(x,y,angle,distance) {
    return {x:x+distance*Math.cos(angle),y:y+distance*Math.sin(angle)};
};

function angleOfPointABFromXY(a,b,x,y) {
    return Math.atan2(b-y,a-x)+(Math.PI/2);
};

function toPercent(dec) {
    return Math.round(dec*100);
}

function rectangleATouchingB(a,b) {
    var touching = (
        a.contains(b.x,b.y) ||
            a.contains(b.x+b.width,b.y) ||
            a.contains(b.x,b.y+b.height) ||
            a.contains(b.x+b.width,b.y+b.height) ||
            b.contains(a.x,a.y) ||
            b.contains(a.x+a.width,a.y) ||
            b.contains(a.x,a.y+a.height) ||
            b.contains(a.x+a.width,a.y+a.height)
        );
    return touching;
};

function advanceTwoDigitHex(orig) {
    if (orig !== "ff") {
        var newArray = [orig.charAt(0),orig.charAt(1)];
        newArray[1] = hexDigits[hexDigits.indexOf(newArray[1])+1];
        if (!newArray[1]) {

            newArray[0] = hexDigits[hexDigits.indexOf(newArray[0])+1];
            if (!newArray[0]) {
                newArray[0] = "f";
                newArray[1] = "f";
            } else {
                newArray[1] = "0";
            }
        }
        return newArray.join("");
    } else { // if white
        return orig;
    }
}

shorterDirectionToAngle = function(rot1,rot2) {
    var a = radToDeg(rot1);
    var b = radToDeg(rot2);
    if (b==0) {
        if (a <= 180) {
            return "ccw";

        } else {
            return "cw";

        };
    };
    if (a==0) {
        if (b <= 180) {
            return "cw";

        } else {
            return "ccw";

        };
    };
    if (a >= 270 && b <= 90) {
        return "cw";

    };
    if (b >= 270 && a <= 90) {
        return "ccw";
    };
    var diff = Math.abs(b-a);
    if (diff > 180) {
        var dist = Math.abs(diff-360);
        // it's the longer distance!
    } else {
        var dist = Math.abs(diff);
        // it's the shorter distance!
    };
    if (a+dist == b) {
        return "cw"

    } else {
        return "ccw";

    };
};

quadrantOfRadians = function(radians) {
    var quadrant = 0;
    if (radians >= 0 && radians < Math.PI/2) {
        quadrant = 1;
    } else if (radians >= Math.PI/2 && radians < Math.PI) {
        quadrant = 2;
    } else if (radians >= Math.PI && radians < Math.PI*1.5) {
        quadrant = 3;
    } else if (radians >= Math.PI*1.5 && radians < Math.PI*2) {
        quadrant = 4;
    };
    return quadrant;
};

degToRad = function(radians) {
    return radians*(Math.PI/180);
};

radToDeg = function(radians) {
    deg = radians*(180/Math.PI);
    if (deg < 0) {
        deg += 360;
    } else if (deg > 359) {
        deg -= 360;
    };
    return radians*(180/Math.PI);
};

function reset() {
    document.body.removeChild(renderer.view);
    clearTimeout(game);
    init(window.innerWidth,window.innerHeight);
};

function fullscreen() {

//    var el = document.body.getElementById("game-canvas");
    fullScreen = true;
//    if (el.webkitRequestFullscreen) {
//        el.webkitRequestFullscreen();
//    } else {
//        el.mozRequestFullScreen()
//    }
    var elem = document.getElementById("game-canvas").appendChild(renderer.view);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
//    killCount.y = window.screen.height-(killCount.height/2);
//    container.y += 100;
//    stage.y += 100;


//    ship.container.x += (window.outerWidth-window.innerWidth)
//    ship.container.y += (window.outerHeight-window.innerHeight)
//    egg.container.x += (window.outerWidth-window.innerWidth)
//    egg.container.y += (window.outerHeight-window.innerHeight)
//    killCount.x += (window.outerWidth-window.innerWidth)
//    killCount.y = window.outerHeight+killCount.height;

}

function exitFullscreen() {
    fullScreen = false;
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }

};

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomOffScreen(scale) {
    var randomAngle = degToRad(randomInt(0,359));
    var randomStart = pointAtAngle(ship.container.x,ship.container.y,randomAngle,offscreenDistance);
    return {x:randomStart.x,y:randomStart.y}
}

function randomColor() {
    var characters = [0,"x"];
    while (characters.length < 8) {
        characters.push(hexDigits[randomInt(0,15)]);
        while (characters[0] > hexDigits[5]) {
            characters.splice(0,1);
            characters.push(hexDigits[randomInt(0,15)]);
        };
    };
    return characters.join("");
};

emitBetweenSperm = function(type,sourceSperm,targetSperm) {
    var emission = new Laser(distanceFromABtoXY(sourceSperm.container.x,sourceSperm.container.y,targetSperm.container.x,targetSperm.container.y));
    var emissionAngle = angleOfPointABFromXY(sourceSperm.container.x,sourceSperm.container.y,targetSperm.container.x,targetSperm.container.y)
    emission.sprite.anchor.x = 0.5;
    emission.sprite.anchor.y = 0;

    emission.sprite.height = emission.maxLength;
    if (type === "Laser") {
        emission.sprite.tint = 0xff0000;
        targetSperm.changeColor(0xff0000);
        emission.sprite.width = ship.turretContainer.children[0].sprite.width/8;
    } else if (type === "Ice") {
        emission.sprite.tint = 0x9999ff;
        emission.sprite.alpha = 0.5;
        targetSperm.changeColor(0x7777ff);
        emission.sprite.width = ship.turretContainer.children[0].sprite.width/5;
        if (!targetSperm.slowed) {
            targetSperm.speed /= ship.turretContainer.children[0].slowFactor;
            targetSperm.slowed = true;
        }
    }
    emission.sprite.x = sourceSperm.container.x;
    emission.sprite.y = sourceSperm.container.y;
//    emission.sprite.x = this.sprite.x-currentSize.x/2;
//    emission.sprite.y = this.sprite.y-currentSize.y/2;
    emission.sprite.rotation = emissionAngle;
    emissions.push(emission);
    container.addChild(emission);
//    targetSperm.hp -= this.strength;
//    target.changeColor(0x0000aa)


}
function playSound(sound) {
    if (soundOn) {
        if (sound.playing) {
            sound.stop();
        }
        sound.play();
    }
}

fadeEmissions = function() {
    for (var e=0;e<emissions.length;e++) {
//        emissions[e].sprite.alpha = (e*(0.1/emissions.length));
        emissions[e].sprite.alpha -= 0.08;
//        if (counter-emissions[e].born > emissions[e].longevity) {
        if (emissions[e].sprite.alpha <= 0) {
            container.removeChild(emissions[e].sprite);
            emissions[e].sprite.visible = false;
            emissions.splice(e,1);

//            this.target = undefined;
        }
    }
}

function setTouchControls() {
    stage.onRMBStart = function(event)
    {
        RMBDown = true;
        rightClicked = counter;
    }
    stage.onRMBEnd = function(event)
    {
        RMBDown = false;
    }
    stage.onDragStart = function(event)
    {
        clicked = counter;
        LMBDown = true;
        var isRightMB = false;
        e = event || window.event;
        this.data = event.data;
        cursor = getActualCoords(this.data.getLocalPosition(this).x,this.data.getLocalPosition(this).y);
        var touch = {
            id: event.data.identifier || 0, // || 0 is to support desktop version
            pos: getActualCoords(this.data.getLocalPosition(this).x,this.data.getLocalPosition(this).y),
            start: getActualCoords(this.data.getLocalPosition(this).x,this.data.getLocalPosition(this).y)
        };
        touches.push(touch);
//    if (touches.length === 2) {
//        doubleTapping = true;
//        startingFingerDistance = distanceFromABtoXY(touches[0].pos.x,touches[0].pos.y,touches[1].pos.x,touches[1].pos.y);
//    }
    }
    stage.onDragMove = function(event)
    {
        this.data = event.data;
        cursor = getActualCoords(this.data.getLocalPosition(this).x,this.data.getLocalPosition(this).y)
        for (var i = 0; i < touches.length; i++) {
            if(touches[i].id === (event.data.identifier || 0)) {
                touches[i].pos = getActualCoords(this.data.getLocalPosition(this).x,this.data.getLocalPosition(this).y);
            }
        };
//    if (touches.length === 2) {
////        pinched = startingFingerDistance-(distanceFromABtoXY(touches[0].pos.x,touches[0].pos.y,touches[1].pos.x,touches[1].pos.y));
//    }

    }
    stage.onDragEnd = function (event)
    {
        if (RMBDown) {
            RMBDown = false;

        }
        LMBDown = false;
        for (var i = 0; i < touches.length; i++) {
            if(touches[i].id === (event.data.identifier || 0)) {
                touches.splice(i,1);
            }
        };
//    if (touches.length < 2) {
//        doubleTapping = false;
//        startingFingerDistance = undefined;
//        pinched = 0;
//    }
        if (touches.length === 0){
            LMBDown = false;

        }
//    console.log("stopped at " + cursor.x + ", " + cursor.y);
    }

    stage.on("rightdown",stage.onRMBStart);
    stage.on("rightup",stage.onRMBEnd);

    stage.on("mousedown",stage.onDragStart);
    stage.on("mousemove",stage.onDragMove);
    stage.on("mouseup",stage.onDragEnd);

    stage.on("touchstart",stage.onDragStart);
    stage.on("touchmove",stage.onDragMove);
    stage.on("touchend",stage.onDragEnd);
}

