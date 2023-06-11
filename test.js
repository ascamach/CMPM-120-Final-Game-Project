class Test extends Phaser.Scene {

    init(data) {
        this.points = data.points || [];
    }

    preload() {
        this.load.image("pizza", "./assets/test_pizza.jpg");
        this.load.image("shinji", "./assets/test_" + "shinji" + ".png");
        this.load.json("dialogue", "./assets/test_dialogue.json");
        this.load.audio("click", ["./assets/textEnd.wav"]);
    }

    create() {
        this.background = this.add.image(0, 0, "pizza").setOrigin(0, 0);

        this.dialogue_text = this.cache.json.get("dialogue").dialogue;

        this.background.displayWidth = this.game.canvas.width;
        this.background.displayHeight = this.game.canvas.height;

        let test_image = this.add.image(400, 400, "shinji").setScale(0.25);

        // Text Box Graphic
        let text_box = this.add.graphics();
        text_box.lineStyle(2, 0xFFFFFF, 1);
        text_box.fillStyle(0x000000, 60);
        text_box.strokeRoundedRect(45, 500, 700, 250, 16);
        text_box.fillRoundedRect(45, 500, 700, 250, 16);

        // Nameplate Graphic
        let nameplate = this.add.graphics();
        nameplate.lineStyle(2, 0x000000, 2);
        nameplate.fillStyle(0xD3D3D3, 1);
        nameplate.strokeRoundedRect(45, 455, 200, 45, {
            tl: 0,
            tr: 32,
            bl: 16,
            br: 0
        });
        nameplate.fillRoundedRect(45, 455, 200, 45, {
            tl: 0,
            tr: 25,
            bl: 16,
            br: 0
        });

        this.onEnter();
    }

    // Function to add dialogue to scene
    add_dialogue(start) {

        let current_node = start;
        let text_index = 0;
        let char_index = 0;

        const ping = this.sound.add("click");

        let current_text = "";
        let name = this.add.text(55, 456, "", {
            fontSize: 40,
            color: '#000000'
        });

        let node = this.dialogue_text[current_node];

        let dia_text = this.add.text(65, 510, node.text[text_index])
            .setWordWrapWidth(600)
            .setFontSize(25);

        name.setText(node.name);

        this.input.on('pointerdown', () => {
            ping.play();
            current_text = "";
            char_index = 0;

            if (text_index == node.text.length-1) {
                if (node.next == "end") {
                        dia_text.destroy();
                        this.go_to_scene("test_end");
                } else if (node.next == "action") {
                    let option_a = this.add.rectangle(400, 150, 400, 50, 0x000000, 50)
                        .setInteractive()
                        .on('pointerdown', () => {
                            current_node = "testa";
                            node = this.dialogue_text[current_node];
                            text_index = 0;
                            option_a.destroy();
                            option_b.destroy();
                            a_text.destroy();
                            b_text.destroy();
                        });
                    let a_text = this.add.text(350, 145, "Option A");
                    let b_text = this.add.text(350, 245, "Option B");
                    let option_b = this.add.rectangle(400, 250, 400, 50, 0x000000, 50)
                        .setInteractive()
                        .on('pointerdown', () => {
                            current_node = "testb";
                            node = this.dialogue_text[current_node];
                            text_index = 0;
                            option_a.destroy();
                            option_b.destroy();
                            a_text.destroy();
                            b_text.destroy();
                        });
                } else {
                    current_node = node.next;
                    node = this.dialogue_text[current_node];
                    text_index = 0;
                }
            } else {
                text_index++;
            }
            name.setText(node.name);
            dia_text.setText(node.text[text_index]);
        });
    }

    go_to_scene(key) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start(key);
        });
    }
};