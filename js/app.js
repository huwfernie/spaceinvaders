console.log('Hello Huw');


$(() => {

  const $me = document.getElementById('me');
  let shotCounter = 0;
  let shootsOnScreen = 0;

  document.addEventListener('keydown', (event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
      console.log('left');
      return moveLeft();
    } else if (keyName === 'ArrowRight') {
      console.log('right');
      return moveRight();
    } else if (keyName === ' ') {
      console.log('space');
      return shoot();
    } else {
      console.log('other Key',keyName);
    }
  });


  const me = {};
  me.xPos = 15;
  me.yPos = 0;


  function moveRight(){
    console.log('moveRight');
    if(me.xPos < 840) {
      me.xPos = me.xPos + 10;
      updatePosn();
    } else {
      me.xPos = 840;
      updatePosn();
    }
  }

  function moveLeft(){
    console.log('moveRight');
    if(me.xPos >= 10) {
      me.xPos = me.xPos - 10;
      updatePosn();
    } else {
      me.xPos = 0;
      updatePosn();
    }
  }

  function shoot(){
    console.log(shotCounter);
    const shot = document.createElement('div');
    shot.className = 'shot';
    shot.id = `id="shot${shotCounter}`;
    document.getElementsByClassName('board')[0].appendChild(shot);
    shotCounter++;
    shootsOnScreen++;
    return updateShot();
  }

  function updateShot() {
    const shots = document.getElementsByClassName('shot');
    if(shootsOnScreen) {
      console.log(shots);
      shots.forEach((shot)=>{
        console.log(shot);
      });
      setTimeout(updateShot(),5000);
    }
  }

  function updatePosn(){
    $me.style.left = `${me.xPos}px`;
  }

});
