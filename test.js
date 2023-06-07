class Test extends Phaser.Scene {

    init(data) {
        this.points = data.points || [];
    }

    constructor() {
        super('test');
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("pizza", "test_pizza.jpg");
        this.load.image("shinji", "test_" + "shinji" + ".png");
    }

    create() {
        
        this.background = this.add.image(0, 0, "pizza").setOrigin(0, 0);

        this.background.displayWidth = this.game.canvas.width;
        this.background.displayHeight = this.game.canvas.height;

        let test_image = this.add.image(400, 400, "shinji").setScale(0.25);

        this.graphics = this.add.graphics();

        // Text box Graphic
        this.graphics.lineStyle(2, 0xFFFFFF, 1);

        this.graphics.fillStyle(0x000000, 60);

        this.graphics.strokeRoundedRect(45, 500, 700, 250, 16);
    
        this.graphics.fillRoundedRect(45, 500, 700, 250, 16);

        // Nameplate Graphic
        this.graphics.lineStyle(2, 0x000000, 2);

        this.graphics.fillStyle(0xD3D3D3, 1);

        this.graphics.strokeRoundedRect(45, 445, 200, 55, {
            tl: 0,
            tr: 32,
            bl: 16,
            br: 0
        });

        this.graphics.fillRoundedRect(45, 445, 200, 55, {
            tl: 0,
            tr: 32,
            bl: 16,
            br: 0
        });

        this.onEnter();
    }
};