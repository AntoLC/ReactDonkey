import Assets from '../assets';

export default class SimpleButton extends PIXI.Container {

  constructor(label) {
    super();
    this.interactive = true;
    this.buttonMode = true;

    this.label = label;
    this.setup();
  }

  get label() {
    return this._label;
  }

  set label(newLabel) {
    this._label = newLabel;
    if (this.labelText) {
      this.labelText.text = this.label.toUpperCase();
    }
  }

  setup() {
    this.button = new PIXI.Sprite(PIXI.loader.resources[Assets.images.simpleButton].texture);
    this.addChild(this.button);

    this.labelText = new PIXI.Text(this.label.toUpperCase(),
      new PIXI.TextStyle({ fontFamily: "Arial", fontSize: "30px", fill: ['#000000'], align: 'center' })
    );
    this.labelText.x = (this.button.width - this.labelText.width) / 2;
    this.labelText.y = (this.button.height - this.labelText.height) / 2;
    this.addChild(this.labelText);
  }
}
