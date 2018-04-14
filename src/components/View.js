export default class View extends PIXI.Container {

    constructor(app, width, height, props) {
        super();
        this.app = app;
        this.stageWidth = width;
        this.stageHeight = height;
        this.props = props;
        this.setup();
    }

    setup() {

    }

    activate() {

    }

    deactivate() {

    }
}
