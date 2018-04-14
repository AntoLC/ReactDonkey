import { View, SimpleButton, CountDown } from '../../components';
import Assets from '../../assets';
import fitObject from '../../libs/Utils';

import TweenMax from '../../libs/gsap/TweenMax.min';
import PixiPlugin from '../../libs/gsap/plugins/PixiPlugin.min';

const PAD_Y = 50;

export default class View1 extends View {

  setup() {
    this.addText();
		this.addDonkey();
		
		// Set the stage clickable
		this.interactive = true;
		
		this.on('click', this.props.onPress);
		this.on('tap', this.props.onPress);
	}
	
	addText() {
    const title = new PIXI.Text("TAP TO START",
			new PIXI.TextStyle({ fontFamily: "Arial", fontSize: "28px", fill: ['#ffffff'], align: 'center', 
				dropShadow: true, dropShadowDistance: 2, dropShadowColor: 'grey' }));
    title.x = (this.stageWidth - title.width) / 2;
    title.y = this.stageHeight - title.height - PAD_Y ;
    this.addChild(title);
  }
	
	addDonkey() {
		const donkey = PIXI.Sprite.fromImage(Assets.images.donkey);
		donkey.anchor.x = 0;
		donkey.anchor.y = 0;
		donkey.scale.x = donkey.scale.y = 0.9;
	 
		donkey.position.x = (this.stageWidth - donkey.width) / 2;
		donkey.position.y = (this.stageHeight - donkey.height) / 2;
		 
		this.addChild(donkey);
  }
}
