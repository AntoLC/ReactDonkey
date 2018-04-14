import donkey from './images/donkeyN.png';
import tail from './images/tailN.png';

/* Define common assets here */
const Assets = {
  images: {
		donkey: donkey,
		tail: tail
  },
  textures: {
  },
  sounds: {
  },
  fonts:{
  }
}

/* Define assets which are loaded depending on parameters passed to
View.js
*/
export const DynamicAssets = {
  images: {
    donkey: donkey,
		tail: tail
  },
  textures: {
  },
  sounds: {
  },
  fonts:{
  }
}

/* Array of common assets to be used by Hexi Loader */
export const ASSETS = [
  Assets.images.donkey,
	Assets.images.tail
];

/* Array of dynamic assets to be used by View.js. The index specified
by dynamicAssetIndex props will be the one that will be loaded along with
the common assets. See constructor of View.js for more details */
export const DYNAMIC_ASSETS = [
]

export default Assets;
