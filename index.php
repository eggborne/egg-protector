<html>
<head>
    <!-- <meta charset="UTF-8"> -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000">
    <title>Egg Protector</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="../scripts/howler2.min.js"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.6.1/pixi.min.js"></script>
</head>

<body onload="init(false);document.body.style.transform='scale(1)';document.body.style.opacity='1'" oncontextmenu="return false">
    <!--<div id="outer-shell">-->
    
        <div id="game-canvas"></div>
        <div id="result-screen">
            <div id="result-header">WAVE CLEAR!</div>
            <div id="accuracy-bonus" class="result-bonus">
                <div style="transform:scale(0)" id="acc-result-display" class="bonus-title"></div>
                <div style="transform:scale(0)" id="acc-bonus-display" class="bonus-detail"></div>
            </div>
            <div id="bank-bonus" class="result-bonus">
                <div style="transform:scale(0)" id="bank-result-display" class="bonus-title"></div>
                <div style="transform:scale(0)" id="bank-bonus-display" class="bonus-detail"></div>
            </div>
            <button class="result-option-button" id="result-upgrade-button">BUY UPGRADES</button>
            <button class="result-option-button" id="result-next-button">START WAVE 2</button>
        </div>
        <div id="top-bar"><span id="enemy-count"><div id="enemy-bar"></div><div id="enemy-bar-label">ENEMIES</div></span><span id="cash-count" style="float:right">$0.00</span><span id="cash-blip" style="float:right">+5</span></div>
        <div id="bottom-bar">
        
            <div id="special-0" class="special-area">SPECIAL</div>
            <div id="special-1" class="special-area">POWERUP</div>
            <div id="shield-reading">Shield: <span id="wave-shield-display">100</span>%</div>
            <div id="power-reading">Power</div>

            <div class="display-bar-back" id="shield-bar-back"></div>
            <div class="display-bar" id="shield-bar"></div>
            <!-- <div class="display-bar-back" id="power-bar-back"></div> -->
            <div class="display-bar" id="power-bar"></div>
            
            
        </div>
        <div class="upgrade-screen" id="turret-choice-screen">
            <div class="upgrade-screen-bg">
                <div style="border: 0.25vh solid black" class="upgrade-title">CHOOSE TURRET TYPE</div>
                <div id="turret-list">
                    <div class="turret-panel">
                        <div class="turret-title">ICE</div>
                        <div class="turret-desc">Slows enemies</div>
                        <div class="turret-price">$2<button id="buy-ice-button" class="button turret-buy-button">BUY</button></div>
                    </div>
                    <div class="turret-panel">
                        <div class="turret-title">LASER</div>
                        <div class="turret-desc">Kills instantly</div>
                        <div class="turret-price">$4<button id="buy-laser-button" class="button turret-buy-button">BUY</button></div>
                    </div>
                    <div class="turret-panel">
                        <div class="turret-title">ROCKET</div>
                        <div class="turret-desc">Follows enemies</div>
                        <div class="turret-price">$5<button id="buy-rocket-button" class="button turret-buy-button">BUY</button></div>
                    </div>
                    <div class="turret-panel">
                        <div class="turret-title">VIRUS</div>
                        <div class="turret-desc">???</div>
                        <div class="turret-price">$10<button id="buy-virus-button" class="button turret-buy-button">BUY</button></div>
                    </div>
                </div>
            </div>
            <div id="turret-point-count">BANK: $0.00</div>
            <button class="button" id="turret-done-button">DONE</button>
        </div>
        <div class="upgrade-screen" id="main-upgrade">
            <div class="upgrade-screen-bg">
                <div class="upgrade-title" id="main-upgrade-title">BANK: $0.00</div>
                <div class="upgrade-area"><div class="upgrade-header"><span id="turret-header">TURRETS - 0</span><button id="add-turret-button" class="button upgrade-add-button">NEW...</button></div>
                    <div class="upgrade-field">
                        <div class="upgrade-label">POWER</div>
                        <div class="upgrade-bar" id="laser-power-bar"><div style="transform:none;width:1vw" class="upgrade-filling-small"></div></div>
                        <button id="laser-power-button" class="button upgrade-button">$1</button>
                    </div>
                    <div class="upgrade-field">
                        <div class="upgrade-label">RANGE</div>
                        <div class="upgrade-bar" id="laser-range-bar"><div style="transform:none;width:1vw" class="upgrade-filling-small"></div></div>
                        <button id="laser-range-button" class="button upgrade-button">$1</button>
                    </div>
                    <!-- <div class="upgrade-field">
                        <div class="upgrade-label">SPEED</div>
                        <div class="upgrade-bar" id="laser-speed-bar"><div style="transform:none;width:1vw" class="upgrade-filling"></div></div>
                        <button id="laser-speed-button" class="button upgrade-button">$1</button>
                    </div> -->
                </div>
                <div id="bee-area" class="upgrade-area"><div class="upgrade-header"><span id="bees-header">CLICKBOMBS</span></div>
                    <div class="upgrade-field">
                        <div class="upgrade-label">SIZE</div>
                        <div class="upgrade-bar" id="bees-power-bar"><div style="transform:none" class="upgrade-filling-large"></div></div>
                        <button id="bees-power-button" class="button upgrade-button">$5</button>
                    </div>
                    <!-- <div class="upgrade-field">
                        <div class="upgrade-label">RANGE</div>
                        <div class="upgrade-bar" id="bees-range-bar"><div style="transform:none;width:1vw" class="upgrade-filling"></div></div>
                        <button id="bees-range-button" class="button upgrade-button">$2</button>
                    </div> -->
                    <div class="upgrade-field">
                        <div class="upgrade-label">DURATION</div>
                        <div class="upgrade-bar" id="bees-speed-bar"><div style="transform:none" class="upgrade-filling-large"></div></div>
                        <button id="bees-speed-button" class="button upgrade-button">$8</button>
                    </div>
                </div>
                <div class="upgrade-area" id="heal-area">
                    <div id="heal-header">RESTORE SHIELD (100%)</div>
                    <button class="button" id="heal-all-button">ALL ($0)</button>
                    <button class="button" id="heal-ten-button">10% ($15)</button>
                    
                </div>
                <div class="button next-wave" id="upgrade-ok-button">START WAVE 1</div>
            </div>
        </div>
        <!-- <div id="laser-upgrade"></div>
        <div id="bee-upgrade"></div> -->
        <div id="high-scores"></div>
        <div id="instructions"></div>
        
        


    <!--</div>-->
<script src="event.js"></script>
<script src="util.js"></script>
<script src="init.js"></script>
<script src="gui.js"></script>
<script src="sperm.js"></script>
<script src="ship.js"></script>
<script src="exec.js"></script>


</body>
</html>