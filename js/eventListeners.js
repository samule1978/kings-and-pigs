window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  
  switch (event.key) {
    case 'ArrowUp':
    case 'w':      
    case ' ':
      if (keys.w.pressed) {
        // Stop from jumping while pressing 'w' or 'ArrowUp' key        
        //player.stopJumping()
        return
      }        

      keys.w.pressed = true            
      
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
      
      if  (
            (!player.colliding.blocks.y.above) // Make sure you have not hit an obstacle above.
            &&
            ((!keys.a.pressed && !keys.d.pressed) && keys.w.count > 0 && keys.w.count <= player.velocity.multiJumpCount)
            ||
            ((keys.a.pressed || keys.d.pressed) && keys.w.count >= 1 && keys.w.count <= player.velocity.multiJumpCount && player.velocity.y < 3)
          ) {        
        player.velocity.y = -(keys.w.count * player.velocity.threshold)        
        keys.w.count++
      } else {        
          player.stopJumping()        
      }                
      break      
    case 'ArrowLeft':
    case 'a':
      // move player to the left
      keys.a.pressed = true
      break
    case 'ArrowRight':
    case 'd':
      // move player to the right
      keys.d.pressed = true
      break
    case 'ArrowDown':
    case 's':
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
    case ' ':
      player.stopJumping()
      /*if (keys.w.count > 0) {
        setTimeout(() => {          
          player.stopJumping()
        }, 250)        
      }*/
      keys.w.pressed = false      
      break
    case 'ArrowLeft':
    case 'a':
      // move player to the left      
      keys.a.pressed = false
      player.colliding.blocks.x.right = false      
      break
    case 'ArrowRight':
    case 'd':
      // move player to the right      
      keys.d.pressed = false
      player.colliding.blocks.x.left = false      
      break
  }
})
