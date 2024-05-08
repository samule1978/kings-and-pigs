window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  
  switch (event.key) {
    case 'ArrowUp':
    case 'w':      
      keys.up.pressed = true

      for (const door of doors) {
        if (
          player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      
      break      
    case ' ':
      if (keys.jump.pressed) {
        // Stop from jumping while pressing spacebar
        //player.stopJumping()
        return
      }        

      keys.jump.pressed = true            

      if  (
        (!player.colliding.blocks.y.above) // Make sure you have not hit an obstacle above.
        &&
        ((!keys.left.pressed && !keys.right.pressed) && keys.up.count > 0 && keys.up.count <= player.velocity.multiJumpCount)
        ||
        ((keys.left.pressed || keys.right.pressed) && keys.up.count >= 1 && keys.up.count <= player.velocity.multiJumpCount && player.velocity.y < 3)
      ) {        
        player.velocity.y = -(keys.up.count * player.velocity.threshold)        
        keys.up.count++
      } else {        
          player.stopJumping()        
      }                

      break    
    case 'ArrowLeft':
    case 'a':
      // move player to the left
      keys.left.pressed = true
      keys.right.pressed = false
      break
    case 'ArrowRight':
    case 'd':
      // move player to the right
      keys.right.pressed = true
      keys.left.pressed = false
      break
    case 'ArrowDown':
    case 's':
      keys.down.pressed = true
      for (const box of boxes) {
        if (
          player.hitbox.position.x + (player.hitbox.width / 2) <= box.position.x + box.width
          && player.hitbox.position.x + (player.hitbox.width / 2) >= box.position.x
        ) {          
          alert(box.message)
          return
        }
      }
      break
  }
})

window.addEventListener('keyup', (event) => {
  /*console.clear()
  console.log(`Colliding X`, player.colliding.blocks.x)
  console.log(`Colliding Y`, player.colliding.blocks.y)*/

  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      keys.up.pressed = false      
      break
    case ' ':
      player.stopJumping()
      /*if (keys.up.count > 0) {
        setTimeout(() => {          
          player.stopJumping()
        }, 250)
      }*/
      keys.jump.pressed = false      
      break
    case 'ArrowLeft':
    case 'a':
      // move player to the left      
      keys.left.pressed = false
      player.colliding.blocks.x.right = false      
      break
    case 'ArrowRight':
    case 'd':
      // move player to the right      
      keys.right.pressed = false
      player.colliding.blocks.x.left = false      
      break
  }
})
