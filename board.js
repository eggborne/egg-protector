function blockGrid(blocksPerWidth) {
    this.blockWidth = gameSize.x/blocksPerWidth;
    this.columns = blocksPerWidth;
    this.rows = Math.floor(gameSize.y/this.blockWidth);
    this.blackBar = (gameSize.y-(this.rows*this.blockWidth))/2;
//    console.log(this.blackBar);
//    console.log("bl " + this.rows*this.blockWidth);
//    console.log("fsd " + this.rows);
    this.positions = [];
    this.slots = [];
    this.slot = {row:undefined,entry:undefined};
    this.upperLeftCorner = {x:-(gameSize.x-viewWidth)/2,y:-(gameSize.y-viewHeight)/2}
    for (var row=0;row<this.rows;row++) {
        this.positions[row] = [];
        for (var entry=0;entry<this.columns;entry++) {
            this.positions[row].push({x:(this.blockWidth/2)+this.upperLeftCorner.x+entry*this.blockWidth,y:(this.blockWidth/2)+this.blackBar+this.upperLeftCorner.y+row*this.blockWidth});
        }
    }

    this.fillPositions = function(texture) {
        blockContainer = new PIXI.Container();
        container.addChild(blockContainer);
        for (var row=0;row<this.rows;row++) {
            this.slots[row] = [];
            for (var entry=0;entry<this.columns;entry++) {
                var block = new PIXI.Sprite(texture);
                block.anchor.set(0.5);
                block.width = block.height = this.blockWidth;
                block.x = this.positions[row][entry].x;
                block.y = this.positions[row][entry].y;
                this.slots[row][entry] = block;
                block.slot = {row:row,entry:entry};

                block.interactive = true;
                block.touched = false;
//                block.visible = false;
                block.hitbox = new PIXI.Rectangle(block.x-block.width*0.525,block.y-block.height*0.525,block.width*1.05,block.height*1.05);
                block.maxHP = 20;
                block.hp = 20;
                block.hitbox.interactive = true;
//                block.on("mousedown",function(){
//                    grid.fillBlock(this.slot.row,this.slot.entry,0xff0000,pixelText);
//                    this.touched = true;
//                })

            }
        }
    }
    this.fillBlock = function(row,entry,color,texture,wall) {
        var block = this.slots[row][entry];
        if (block.texture !== texture) {
            block.texture = texture;
        }
        blockContainer.addChild(block);
//        block.visible = true;
        block.tint = color;
        if (wall) {
            wall.blockArray.push(block);
        }
    }
}

function Wall(texture,color,startingRow,startingBlock,endingRow,thickness) {
    this.blockArray = [];
    var starting = grid.slots[startingRow][startingBlock];
    for (var i=0;i<(endingRow-startingRow);i++) {
        for (var k=0;k<thickness;k++) {
            grid.fillBlock(startingRow+i,startingBlock+k,color,texture,this);
        }
    }
    this.widthInPixels = (thickness*grid.blockWidth);
    this.heightInPixels = ((endingRow-startingRow+1)*grid.blockWidth);
    this.hitbox = new PIXI.Rectangle(starting.x-grid.blockWidth,starting.y-grid.blockWidth,this.widthInPixels+grid.blockWidth/2,this.heightInPixels+grid.blockWidth/2);
    walls.push(this);
}

