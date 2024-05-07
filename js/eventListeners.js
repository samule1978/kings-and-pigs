window.addEventListener('keydown', (event) => {
  if (player.preventInput) return

  //console.log(player.position.y)
  
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      keys.w.count++

      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
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
      
      
      const step = 10
      if (keys.w.count <= 3) {
        player.velocity.y = -(keys.w.count * step)
      } else {
        player.velocity.y = 0
        return
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
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      keys.w.count = 1
      break

    case 'ArrowLeft':
    case 'a':
      // move player to the left
      keys.a.pressed = false
      break
    case 'ArrowRight':
    case 'd':
      // move player to the right
      keys.d.pressed = false
      break
  }
})
