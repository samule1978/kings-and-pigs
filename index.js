
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

const show = {
  collisionBlocks: false 
}
let parsedCollisions
let collisionBlocks
let background
let doors
let boxes

let level = 1
let levels = {
  1: {
    init: () => {
      player.level = 1     
      
      parsedCollisions = collisions[player.level].parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()            
      player.collisionBlocks = collisionBlocks      
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          message: `No. 2`,
        }),
      ]
      
      boxes = [
        new Sprite({
          position: {
            x: 400,
            y: 353,
          },
          imageSrc: './img/box.png',
          frameRate: 1,
          frameBuffer: 0,
          loop: false,
          autoplay: false,
          message: `Box A`,          
        }),
        new Sprite({
          position: {
            x: 500,
            y: 253,
          },
          imageSrc: './img/box.png',
          frameRate: 1,
          frameBuffer: 0,
          loop: false,
          autoplay: false, 
          message: `Box B`,                
        }),
      ]
    },
  },
  2: {
    init: () => {
      player.level = 2

      parsedCollisions = collisions[player.level].parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()      
      player.collisionBlocks = collisionBlocks      
      player.position.x = 96
      player.position.y = 140

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel2.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 336,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          message: `No. 3`,
        }),
      ]
      
      boxes = []
    },
  },
  3: {
    init: () => {
      player.level = 3      
      
      parsedCollisions = collisions[player.level].parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()      
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 230
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel3.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          message: `No. 1`,
        }),
      ]
      
      boxes = []
    },
  },
}

const keys = {
  down: {
    pressed: false,
    count: 1
  },
  right: {
    pressed: false,
    count: 1
  },
  up: {
    pressed: false,
    count: 1
  },
  left: {
    pressed: false,
    count: 1
  },
  jump: {
    pressed: false,
    count: 1
  },

  w: {
    pressed: false,
    count: 1
  },
  a: {
    pressed: false,
    count: 1
  },
  d: {
    pressed: false,
    count: 1
  },
}

const overlay = {
  opacity: 0,
}

const player = new Player({
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png',
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () => {
        console.log('completed animation')
        keys.up.count = 0
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++

            if (level === 4) level = 1
            levels[level].init()
            player.switchSprite('idleRight')
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      },
    },
  },
})

function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  if (show.collisionBlocks) {
    collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.draw()
    })  
  }

  for (const door of doors) {
    door.draw()
  }

  player.handleInput(keys)
  player.draw()
  player.update()
  
  for (const box of boxes) {
    box.draw()
  }
  
  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

levels[level].init()
animate()