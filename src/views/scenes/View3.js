import { View, SimpleButton } from '../../components';
import Assets from '../../assets';

import TweenMax from '../../libs/gsap/TweenMax.min';
import PixiPlugin from '../../libs/gsap/plugins/PixiPlugin.min';

const PAD_Y = 50;

export default class View3 extends View {

  setup() {
		this.initDonkey();
		this.initTail();
		this.initTextTop();
    this.initTextBottom();
		
		// Set the stage clickable
		this.interactive = true;
		
		this.on('click', this.props.onPress);
		this.on('tap', this.props.onPress);
	}
	
	initTextTop() {
		this.title = new PIXI.Text("",
			new PIXI.TextStyle({ fontFamily: "Arial", fontSize: "32px", fill: ['#00ff1d'], align: 'center', 
				dropShadow: true, dropShadowDistance: 2, dropShadowColor: 'grey' }));
    this.title.y = 0 + PAD_Y ;
    this.addChild(this.title);
  }
	
	initTextBottom() {
    const title = new PIXI.Text("END",
			new PIXI.TextStyle({ fontFamily: "Arial", fontSize: "28px", fill: ['#ffffff'], align: 'center', 
				dropShadow: true, dropShadowDistance: 2, dropShadowColor: 'grey' }));
    title.x = (this.stageWidth - title.width) / 2;
    title.y = this.stageHeight - title.height - PAD_Y ;
    this.addChild(title);
  }
	
	initDonkey() {
		this.donkey = PIXI.Sprite.fromImage(Assets.images.donkey);
		this.donkey.anchor.set(0.5);
		this.donkey.scale.x = this.donkey.scale.y = 0.8;
		 
		this.addChild(this.donkey);
  }
	
	initTail() {
		this.tail = PIXI.Sprite.fromImage(Assets.images.tail);
		this.tail.anchor.set(0.4);
		
		this.addChild(this.tail);
  }
	
	setTextTop(){
		const didWin = this.props.gameView && this.props.gameView.didWin;
		this.title.text = didWin ? "You did it!" : "You missed it...";
		this.title.style.fill = didWin ? ['#00ff1d'] : ['#fc5d6f'];
		this.title.x = (this.stageWidth - this.title.width) / 2;
	}
	
	setDonkey(){
		const donkey = this.props.gameView && this.props.gameView.donkey;
		this.donkey.x = donkey.x;
		this.donkey.y = donkey.y;
	}
	
	setTail(){
		const tail = this.props.gameView && this.props.gameView.tail;
		this.tail.x = tail.x;
		this.tail.y = tail.y;
	}
	
	activate() {
    this.setTextTop();
		this.setDonkey();
		this.setTail();
  }
}
