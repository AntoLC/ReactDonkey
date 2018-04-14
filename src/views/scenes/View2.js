import { View, SimpleButton, CountDown } from '../../components';
import Assets, { DYNAMIC_ASSETS } from '../../assets';
import fitObject from '../../libs/Utils';

const GAME_DURATION = 5;
const TIME_ANIMATION = 5;
const SIZE_SPOTLIGHT = 100;

/* INCREASE TO LOW THE DIFFICULTY */
const LEVEL_SENSITIVITY_TAIL_TARGET = 10;

export default class View2 extends View {

  setup() {
		this.success = false;
		this.putTheTail = this.putTheTail.bind(this);
		this.initBlackScreen();
		this.initDonkey();
		this.initBGround();
		this.initSpotlight();
  }
	
	initBlackScreen() {
		var canvas = document.createElement('canvas');
		canvas.width = this.stageWidth; canvas.height = this.stageHeight;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle="#1c1c1c";
		ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

		var texture = PIXI.Texture.fromCanvas(canvas);
		var sprite = new PIXI.Sprite(texture)
		this.addChild(sprite);
		
		return sprite;
	}	
	
	initDonkey() {
		this.donkey = PIXI.Sprite.fromImage(Assets.images.donkey);
    this.donkey.anchor.set(0.5);
		this.donkey.scale.x = this.donkey.scale.y = 0.8;
		
		this.addChild(this.donkey);
  }
	
	initBGround(){
		// Background Linear gradient
		var canvas = document.createElement('canvas');
		canvas.width = this.stageWidth; canvas.height = this.stageHeight;
		var ctx = canvas.getContext('2d');
		// Create gradient
		var gradient  = ctx.createLinearGradient(150.000, 0.000, 150.000, this.stageHeight);

		// Add colors
		gradient.addColorStop(0.000, 'rgba(0, 129, 176, 1.000)');
		gradient.addColorStop(0.398, 'rgba(81, 211, 238, 1.000)');
		gradient.addColorStop(0.600, 'rgba(81, 211, 238, 1.000)');
		gradient.addColorStop(0.996, 'rgba(0, 129, 176, 1.000)');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

		var texture = PIXI.Texture.fromCanvas(canvas);
		this.backgroundColor = new PIXI.Sprite(texture)
  }
	
	initSpotlight() {	
		//prepare circle texture, that will be our brush
		this.spotlight = new PIXI.Graphics();
		this.spotlight.beginFill(0xffffff);
		this.spotlight.drawCircle(0, 0, SIZE_SPOTLIGHT);
		this.spotlight.endFill();
		
		this.addChild(this.spotlight);
		
		// The container where the Spotlight And the donkey move
		this.container = new PIXI.Container();
		this.container.x = 0;
		this.container.y = 0;
		this.container.width = this.stageWidth;
		this.container.height = this.stageHeight;
		
		this.container.addChild(this.backgroundColor, this.donkey);
		
		this.addChild(this.container);
		
		this.container.mask = this.spotlight;
		
		// create a bounding box for the donkey and the spotlight
		this.elementBounds = new PIXI.Rectangle(0, 0, this.stageWidth, this.stageHeight);
  }
	
	/**
	 * 	Position a element to a random place (x, y)
	 * 	Set a random direction
	 * 	Set a random speed
	 **/
	setRandomAttribute(element){
		// random X position with limit screen
    const positionX = Math.floor(Math.random() * this.stageWidth);
		if(positionX > this.stageWidth - (element.width / 2))
			element.x = this.stageWidth - (element.width / 2);
		else if(positionX < 0 + (element.width / 2))
			element.x = 0 + (element.width / 2);
		else
			element.x = positionX;
		
		// random Y position with limit screen
		const positionY = Math.floor(Math.random() * this.stageHeight);
		if(positionY > this.stageHeight - (element.height / 2))
			element.y = this.stageHeight - (element.height / 2);
		else if(positionY < 0 + (element.height / 2))
			element.y = 0 + (element.height / 2);
		else
			element.y = positionY;
			
    // Give a random direction
    element.direction = Math.random() * Math.PI * 2;

    // Give a random speed
    element.speed = 2 + Math.random() * 2;
		
		return element;
	}
	
	/** Move a element with a random direction at each bounds on the container */
	animationElement(element){
		element.x += Math.sin(element.direction) * element.speed;
		element.y += Math.cos(element.direction) * element.speed;
			
		// When bounds, change the direction
		if (element.x < this.elementBounds.x + (element.width / 2)) {
			//console.log("Case1: "+element.direction);
			element.direction = Math.random() * Math.PI * 2;
			element.x = this.elementBounds.x + (element.width / 2);
		}
		else if (element.x > this.elementBounds.x + this.elementBounds.width - (element.width / 2)) {
			//console.log("Case2: "+element.x + "::" + (elementBounds.x + elementBounds.width));
			element.direction = Math.random() * Math.PI * 2;
			element.x = this.elementBounds.x + this.elementBounds.width - (element.width / 2);
		}

		if (element.y < this.elementBounds.y + (element.height / 2)) {
			//console.log("Case3: "+element.y +"::"+ elementBounds.y);
			element.direction = Math.random() * Math.PI * 2;
			element.y = this.elementBounds.y + (element.height / 2);
		}
		else if (element.y > this.elementBounds.y + this.elementBounds.height - (element.height / 2)) {
			//console.log("Case4: "+element.y +"::"+ (elementBounds.y + elementBounds.height));
			element.direction = Math.random() * Math.PI * 2;
			element.y = this.elementBounds.y + this.elementBounds.height - (element.height / 2);
		}
	}
	
	animationDonkey(){
		this.animationElement(this.donkey);
	}
	
	animationSpotlight(){
		this.animationElement(this.spotlight);
	}

  onTimeIsUp() {
		this.finishGame(this.success);
  }

  finishGame(status) {
    this.counter.stop();
    this.didWin = status;
		this.removeChild(this.counter);
		this.removeChild(this.tail);
		this.removeChild(this.topBlackScreen);
    this.props.onPress();
  }

  activate() {
		this.donkey = this.setRandomAttribute(this.donkey);
		this.spotlight = this.setRandomAttribute(this.spotlight);
		this.startAnimationDonkey();
		this.startAnimationSpotlight();
		
		//this.container.mask = false;
		
		setTimeout(this.putTheTail, TIME_ANIMATION * 1000);
  }

	startAnimationDonkey(){
		this.app.ticker.add(this.animationDonkey, this);
	}

	stopAnimationDonkey(){
		this.app.ticker.remove(this.animationDonkey, this);
	}
	
	startAnimationSpotlight(){
		this.app.ticker.add(this.animationSpotlight, this);
	}

	stopAnimationSpotlight(){
		this.app.ticker.remove(this.animationSpotlight, this);
	}
	
	addTimer() {
		this.counter = new CountDown(GAME_DURATION);
    this.counter.on('timeIsUpEvent', this.onTimeIsUp.bind(this));
    this.counter.x = (this.stageWidth - this.counter.width) / 2;
    this.counter.y = 30;
    this.addChild(this.counter);
		this.counter.start();
  }
	
	putTheTail(){
		this.stopAnimationDonkey();
		this.stopAnimationSpotlight();
		this.topBlackScreen = this.initBlackScreen();
		this.addTimer();
		this.addTail();
	}
	
	addTail() {
		this.tail = PIXI.Sprite.fromImage(Assets.images.tail);
		this.tail.x = (this.stageWidth - (this.tail.width / 2)) / 2;
		this.tail.y = (this.stageHeight - (this.tail.height / 2)) / 2;
		
		this.tail.interactive = true;
		this.tail.buttonMode = true;
		this.tail.anchor.set(0.4);
		
		this.tail
			.on('pointerdown', this.onDragTailStart)
			.on('pointerup', this.onDragTailEnd)
			.on('pointerupoutside', this.onDragTailEnd)
			.on('pointermove', this.onDragTailMove);
		
		this.addChild(this.tail);
  }
	
	onDragTailStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
	}

	onDragTailEnd() {
		let newPositionTail = this.data.getLocalPosition(this.parent);
		
		//console.log('TailX:' + newPositionTail.x + ' TailY:' + newPositionTail.y);
		//console.log('DonkeyX:' + this.parent.donkey.x + ' DonkeyY:' + this.parent.donkey.y);
		
		// Max correct position between tail anchor and target donkey
		let minX = 54 - LEVEL_SENSITIVITY_TAIL_TARGET, maxX = 68 + LEVEL_SENSITIVITY_TAIL_TARGET;
		let minY = 58 - LEVEL_SENSITIVITY_TAIL_TARGET, maxY = 80 + LEVEL_SENSITIVITY_TAIL_TARGET;
		
		let difPositionTailDonkeyX = newPositionTail.x - this.parent.donkey.x;
		let difPositionTailDonkeyY = newPositionTail.y - this.parent.donkey.y;
		
		if(difPositionTailDonkeyX > minX && difPositionTailDonkeyX < maxX && difPositionTailDonkeyY > minY && difPositionTailDonkeyY < maxY){
			//console.log('Success DifDonkeyX:' + difPositionTailDonkeyX + ' DifDonkeyY:' + difPositionTailDonkeyY);
			this.parent.success = true;
		}
		else{
			//console.log('Fail DifDonkeyX:' + difPositionTailDonkeyX + ' DifDonkeyY:' + difPositionTailDonkeyY);
			this.parent.success = false;
		}
			
		this.alpha = 1;
		this.dragging = false;
		this.data = null;
	}

	onDragTailMove() {
		if (this.dragging) {
			var newPosition = this.data.getLocalPosition(this.parent);
			this.x = newPosition.x;
			this.y = newPosition.y;
		}
	}

  deactivate() {
  }
}
