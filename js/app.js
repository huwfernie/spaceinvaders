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
      me.xPos = me.xPos + 20;
      updatePosn();
    } else {
      me.xPos = 840;
      updatePosn();
    }
  }

  function moveLeft(){
    console.log('moveRight');
    if(me.xPos >= 10) {
      me.xPos = me.xPos - 20;
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
    shot.style.left = `${me.xPos+30}px`;
    document.getElementsByClassName('board')[0].appendChild(shot);
    if(shotCounter >= 50) {
      shotCounter = 0;
    } else {
      shotCounter++;
    }
    shootsOnScreen++;
    if(shootsOnScreen > 1){
      return;
    } else {
      return updateShot();
    }
  }

  function updateShot() {
    setTimeout(function() {
      const shots = document.getElementsByClassName('shot');
      if(shootsOnScreen) {
        for(let i=0; i<shots.length; i++) {
          // console.log(shots[i]);
          let height = $(shots[i]).css('bottom');
          let left = $(shots[i]).css('left');
          left = parseInt(left.split('px')[0]);
          console.log('shot',i,' height',height,' left',left);
          height = parseInt(height.split('px')[0]);
          height = height + 20;
          $(shots[i]).css('bottom',`${height}px`);
          deleteShot(height,left,shots[i]);
        }
      } else {
        return console.log('no-shots');
      }
      updateShot();
    }, 50);
  }

  function deleteShot(shotHeight,shotLeft,shot){
    if(shotHeight >=570) {
      $(shot).remove();
      shootsOnScreen--;
    }
    if(
      ( shotLeft>=45 && shotLeft<= 129 && shotHeight >= 70) ||
      ( shotLeft>=225 && shotLeft<= 308 && shotHeight >= 70) ||
      ( shotLeft>=403 && shotLeft<= 488 && shotHeight >= 70) ||
      ( shotLeft>=582 && shotLeft<= 667 && shotHeight >= 70) ||
      ( shotLeft>=763 && shotLeft<= 846 && shotHeight >= 70) ){
      $(shot).remove();
      shootsOnScreen--;
    }
  }

  function updatePosn(){
    $me.style.left = `${me.xPos}px`;
  }

});
