import './styles/index.css'
import './styles/hero.css'

import { initThreeJS } from './js/three-scene.js'
import { initAnimations } from './js/animations.js'

// Hide default cursor for the custom one
document.body.style.cursor = 'none';

// Initialize 3D & Animations
initThreeJS();
initAnimations();
