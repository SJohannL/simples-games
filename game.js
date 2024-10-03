// Create simple game with Phaser

// Create a new Phaser game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Define global variables
var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;

// Preload game assets
function preload() {
  // Load images
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

// Create game objects
function create() {
  // Add sky background
  game.add.sprite(0, 0, 'sky');

  // Create physics-enabled group for platforms
  platforms = game.add.group();
  platforms.enableBody = true;

  // Create ground
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  // Create ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  // Create player character
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  // Create player animations
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // Create stars
  stars = game.add.group();
  stars.enableBody = true;

  // Create 12 stars evenly spaced apart
  for (var i = 0; i < 12; i++) {
    var star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 300;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }