import Assets, { ASSETS, DYNAMIC_ASSETS } from '../assets';
import SimpleButton from '../components/SimpleButton';

import {
  BackgroundScene,
  View1, View2, View3
} from './scenes';

const BACKGROUND_COLOR = 0x0;

// type Props = {
//   width: number,
//   height: number,
//   fps: number,
//   dynamicAssetIndex: number
// }

export default class App {

  // pixi: any;
  // scenes: Array<pixiGroup>;
  // pageNumber: number;
  // backgroundScene: pixiGroup;
  // currentScene: ?pixiGroup;

  constructor(props) {
    this.props = props;

    const app = new PIXI.Application({
      width: props.width,
      height: props.height,
			backgroundColor: 0x123455
    });
	
    this.app = app;

    //Add application to DOM
    document.body.appendChild(app.view);
	
		this.setBackgroundColor(props);
  }

  setBackgroundColor(props){
		// Background Linear gradient
		var canvas = document.createElement('canvas');
		canvas.width = props.width; canvas.height = props.height;
		var ctx = canvas.getContext('2d');
		// Create gradient
		var gradient  = ctx.createLinearGradient(150.000, 0.000, 150.000, props.height);

		// Add colors
		gradient.addColorStop(0.000, 'rgba(0, 129, 176, 1.000)');
		gradient.addColorStop(0.398, 'rgba(81, 211, 238, 1.000)');
		gradient.addColorStop(0.600, 'rgba(81, 211, 238, 1.000)');
		gradient.addColorStop(0.996, 'rgba(0, 129, 176, 1.000)');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, props.width, props.height);

		var texture = PIXI.Texture.fromCanvas(canvas);
		var sprite = new PIXI.Sprite(texture)
		this.app.stage.addChild(sprite);
  }

  start() {
    this.load();
  }

  load() {
    // Build array of assets to be used. Merge common assets with
    // one of the dynamic assets, specified by props.dynamicAssetIndex
		const thingsToLoad = ASSETS;
    let loader = PIXI.loader;

    thingsToLoad.forEach(function (asset) {
      loader.add(asset, asset);
    });

    // add signal callbacks
    loader.on('progress', this.onLoadProgress, this);
    loader.on('error', this.onItemLoadError, this);
    loader.once('complete', this.onLoadComplete, this);

    this.progressText = new PIXI.Text('0%', {
      fontWeight: 'bold',
      fontSize: 60,
      fontFamily: 'Arial',
      fill: '#000000',
      align: 'center',
      stroke: '#FFFFFF',
      strokeThickness: 0
    });

    this.progressText.x = (this.props.width - this.progressText.width) / 2;
    this.progressText.y = (this.props.height - this.progressText.height) / 2;
    this.app.stage.addChild(this.progressText);

    loader.load();
  }

  // called once per loaded/errored file
  onLoadProgress(loader, resources) {
    // console.dir(loader.progress);
    this.progressText.text = Math.floor(loader.progress) + "%";
    this.progressText.x = (this.props.width - this.progressText.width) / 2;
  }

  // called once per errored file
  onItemLoadError(err, loader, resource) {
    console.error("Failed to load resource: '" + resource.name + "' (url = " + resource.url + ")");
  }

  // called once when the queued resources all load.
  onLoadComplete(loader, resources) {
    console.log('all resources loaded');
    this.resources = resources;
    this.setup();
    this.startGame();
  }

  setup() {
		console.log('setup()');
    this.scenes = [];

    // Instantiate view scenes
    this.scenes.push({
      name: 'view1', scene: new View1(this.app, this.props.width, this.props.height, {
        onPress: this._onView1Click.bind(this)
      })
    });
    this.scenes.push({
      name: 'view2', scene: new View2(this.app, this.props.width, this.props.height, {
        onPress: this._onView2Click.bind(this)
      })
    });
    this.scenes.push({
      name: 'view3', scene: new View3(this.app, this.props.width, this.props.height, {
        onPress: this._onView3Click.bind(this),
        gameView: this.scenes[1].scene
      })
    });
  }

  startGame() {
    console.log('startGame()');
		
    const resources = PIXI.loader.resources;

    this.app.stage.removeChild(this.progressText);

    this._setPage(0);
  }

  /**
  Setup function to setup scenes
  */
  _setPage(page) {

    if (this.currentPage !== undefined && this.currentPage !== null) {
      let view = this.currentPage.scene;
			view.parent.removeChild(view);
			view.deactivate();
      this.currentPage = null;
    }

    this.currentPage = this.scenes[page];
    let view = this.currentPage.scene;
    this.app.stage.addChild(view);
    view.activate();
  }

  _onView1Click() {
    this._setPage(1);
  }

  _onView2Click() {
		console.log('_onView2Click');
    this._setPage(2);
  }

  _onView3Click() {
    this._setPage(0);
  }
}
