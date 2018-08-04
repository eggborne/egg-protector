document.onkeydown = function(event) {

    if (event.keyCode == 16) {
        pressingShift = true;
    };
    if (event.keyCode == 81) {
        if (!pressingQ) {
            pressedQAt = counter;
        };
        pressingQ = true;
    };
    if (event.keyCode == 87 || event.keyCode == 38) {
        if (!pressingW) {
            pressedWAt = counter;
        };
        pressingW = true;
    };
    if (event.keyCode == 69) {
        pressingE = true;
    };
    if (event.keyCode == 83 || event.keyCode == 40) {
        pressingS = true;
    };
    if (event.keyCode == 65 || event.keyCode == 37) {
        pressingA = true;
    };
    if (event.keyCode == 68 || event.keyCode == 39) {
        pressingD = true;
    };
    if (event.keyCode == 90) {
        pressingZ = true;
        pressedZAt = counter;
    };
    if (event.keyCode == 88) {
        if (!pressingX) {
            pressedXAt = counter;
        };
        pressingX = true;
    };
    if (event.keyCode == 67) {
        pressingC = true;
    };
    if (event.keyCode == 32) {
        if(counter-clicked > 10) {
            clicked = counter;
        };
        if (!pressingSpace) {
            pressedSpaceAt = counter;

        };
        pressingSpace = true;
        event.preventDefault();
    };
    if (event.keyCode == 16) {
        pressingLShift = true;
    };
    if (event.keyCode == 17) {
        pressingLCtrl = true;
    };
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
};

document.onkeyup = function(event) {
    if (event.keyCode == 16) {
        pressingShift = false;
    };
    if (event.keyCode == 87 || event.keyCode == 38) {
        pressingW = false;
    };
    if (event.keyCode == 83 || event.keyCode == 40) {
        pressingS = false;
    };
    if (event.keyCode == 65 || event.keyCode == 37) { // left
        pressingA = false;
    };
    if (event.keyCode == 68 || event.keyCode == 39) { // right
        pressingD = false;
    };
    if (event.keyCode == 32) {
        pressingSpace = false;
    };
    if (event.keyCode == 90) {
        pressingZ = false;
    };
    if (event.keyCode == 88) {
        pressingX = false;
    };
    if (event.keyCode == 67) {
        pressingC = false;
    };
    if (event.keyCode == 81) {
        pressingQ = false;
    };
    if (event.keyCode == 69) {
        pressingE = false;
    };
    if (event.keyCode == 16) {
        pressingLShift = false;
    };
    if (event.keyCode == 17) {
        pressingLCtrl = false;
    };
};

