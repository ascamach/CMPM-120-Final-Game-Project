class Test2 extends Test {
    constructor() {
        super("test2");
    }

    onEnter() {
        this.add_dialogue('test');
    }
}

class Test_End extends Phaser.Scene {
    constructor() {
        super("test_end");
    }

    create() {
        this.add.text(100, 100, "This is the end of the dialogue");

        this.input.on('pointerdown', () => {
            this.scene.start("test2");
        });
    }
}