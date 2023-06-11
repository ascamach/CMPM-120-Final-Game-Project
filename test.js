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
        this.load.json("dialogue", "test_dialogue.json");
    }

    create() {
        
        this.background = this.add.image(0, 0, "pizza").setOrigin(0, 0);
        let dialogue_text = this.cache.json.get("dialogue").dialogue;

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

        let startNode = 'test';
        let text_index = 0;

        let node = dialogue_text[startNode];

        let dia_text = this.add.text(100, 600, node.text[text_index]);

        this.input.on('pointerdown', () => {
            this.add.text(100, 500, node.text.length);
            if (text_index == node.text.length) {
                dia_text.destroy();
                startNode = node.next;
                node = dialogue_text[startNode];
                text_index = 0;
                dia_text = this.add.text(100, 600, node.text[text_index]);
            } else {
                dia_text.destroy();
                text_index++;
            }
            dia_text = this.add.text(100, 600, node.text[text_index]);
        });

        this.onEnter();
    }
};