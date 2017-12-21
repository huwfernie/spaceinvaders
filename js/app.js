console.log('Hello Huw');


$(() => {

  const $me = document.getElementById('me');
  let shotCounter = 0;
  let shootsOnScreen = 0;
  let aliensOnScreen = 10;
  let gameInPlay = false;
  const timer = 50;

  /* ---------- /
    Key inputs
  / ---------- */
  document.addEventListener('keydown', (event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
      console.log('left');
      if(!gameInPlay) {
        return aliens();
      }
      gameInPlay = true;
      return moveLeft();
    } else if (keyName === 'ArrowRight') {
      console.log('right');
      if(!gameInPlay){
        aliens();
      }
      gameInPlay = true;
      return moveRight();
    } else if (keyName === ' ') {
      console.log('space');
      if(!gameInPlay){
        aliens();
      }
      gameInPlay = true;
      return shoot();
    } else {
      console.log('other Key',keyName);
    }
  });

  /* ---------- /
    Players ship
  / ---------- */

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

  /* ---------- /
    Shooting
  / ---------- */

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
          //console.log('shot',i,' height',height,' left',left);
          height = parseInt(height.split('px')[0]);
          height = height + 20;
          $(shots[i]).css('bottom',`${height}px`);
          deleteShot(height,left,shots[i]);
        }
      } else {
        return console.log('no-shots');
      }
      updateShot();
    }, timer);
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

  /* ---------- /
    Aliens
  / ---------- */

  let thisWay = 1;
  function aliens(){
    setTimeout(function() {
      if(gameInPlay) {
        console.log('let\'s go aliens!');
        // const aliens = document.getElementsByClassName('alien');
        const firstAlien = document.getElementById('invader1');
        let firstLeft = $(firstAlien).css('left');
        firstLeft = parseInt(firstLeft.split('px')[0]);
        if(firstLeft >= 200) {
          thisWay = -1;
          // newLine();
        } else if(firstLeft<=10){
          thisWay = 1;
          // newLine();
        }
        // $(firstAlien).css('left',`${firstLeft+(10*thisWay)}px`);
        if(aliensOnScreen >= 1) {
          const aliens = document.getElementsByClassName('alien');
          for(let i=0; i<aliens.length; i++){
            const alien = aliens[i];
            console.log(alien);
            let left = $(alien).css('left');
            left = parseInt(left.split('px')[0]);
            $(alien).css('left',`${left+(5*thisWay)}px`);
          }
        }
      } else {
        return console.log('no-aliens');
      }
      aliens();
    }, (50));
  }

  // function newLine(){
  //   console.log('newline');
  //   const aliens = document.getElementsByClassName('alien');
  //   for(let i=0; i<aliens.length; i++){
  //     const alien = aliens[i];
  //     let height = $(alien).css('margin-top');
  //     height = parseInt(height.split('px')[0]);
  //     $(alien).css('margin-top',`${height+10}px`);
  //   }
  // }


});
