console.log('Hello Huw');


$(() => {

  const $me = document.getElementById('me');
  let shotCounter = 0;
  let shotsOnScreen = 0;
  let aliensOnScreen = 10;
  let gameInPlay = false;
  const timer = 100;

  /* ---------- /
    Key inputs
  / ---------- */
  document.addEventListener('keydown', (event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
      // console.log('left');
      if(!gameInPlay) {
        $('.instructions').css('visibility','hidden');
        return update();
      }
      gameInPlay = true;
      return moveLeft();
    } else if (keyName === 'ArrowRight') {
      // console.log('right');
      if(!gameInPlay){
        $('.instructions').css('visibility','hidden');
        update();
      }
      gameInPlay = true;
      return moveRight();
    } else if (keyName === ' ') {
      // console.log('space');
      if(!gameInPlay){
        $('.instructions').css('visibility','hidden');
        update();
      }
      gameInPlay = true;
      return shoot();
    } else {
      // console.log('other Key',keyName);
    }
  });

  /* ---------- /
    Players ship
  / ---------- */

  const me = {};
  me.xPos = 15;
  me.yPos = 0;


  function moveRight(){
    // console.log('moveRight');
    if(me.xPos < 840) {
      me.xPos = me.xPos + 20;
      updatePosn();
    } else {
      me.xPos = 840;
      updatePosn();
    }
  }

  function moveLeft(){
    // console.log('moveRight');
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
    if(shotsOnScreen<3){
      // console.log(shotsOnScreen);
      const shot = document.createElement('div');
      shot.className = 'shot';
      shot.id = `id="shot${shotCounter}`;
      shot.style.left = `${me.xPos+30}px`;
      document.getElementsByClassName('board')[0].appendChild(shot);
      shotsOnScreen++;
      if(shotCounter >= 50) {
        shotCounter = 0;
      } else {
        shotCounter++;
      }
      return;
    } else {
      //console.log('too many shots');
    }
  }

  function updateShot(){
    const shots = document.getElementsByClassName('shot');
    if(shotsOnScreen) {
      for(let i=0; i<shots.length; i++) {
        // console.log(shots[i]);
        let height = $(shots[i]).css('bottom');
        let left = $(shots[i]).css('left');
        left = parseInt(left.split('px')[0]);
        //console.log('shot',i,' height',height,' left',left);
        height = parseInt(height.split('px')[0]);
        height = height + 20;
        $(shots[i]).css('bottom',`${height}px`);
        const aliens = document.getElementsByClassName('alien');
        deleteShot(height,left,shots[i],aliens);
      }
    } else {
      return; //console.log('no-shots');
    }
  }

  function deleteShot(shotHeight,shotLeft,shot,aliens){
    if(shotHeight >=570) {
      $(shot).remove();
      return shotsOnScreen--;
    }
    if(
      ( shotLeft>=45 && shotLeft<= 129 && shotHeight >= 70) ||
      ( shotLeft>=225 && shotLeft<= 308 && shotHeight >= 70) ||
      ( shotLeft>=403 && shotLeft<= 488 && shotHeight >= 70) ||
      ( shotLeft>=582 && shotLeft<= 667 && shotHeight >= 70) ||
      ( shotLeft>=763 && shotLeft<= 846 && shotHeight >= 70) ){
      $(shot).remove();
      return shotsOnScreen--;
    }
    for(let i=0;i<aliens.length;i++){
      const alien = aliens[i];
      let alienBottom = $(alien).css('bottom');
      let alienLeft = $(alien).css('left');
      const alienVisible = $(alien).css('visibility');
      alienBottom = parseInt(alienBottom.split('px')[0]);
      alienLeft = parseInt(alienLeft.split('px')[0]);
      if(
        (alienVisible === 'visible') &&
        (shotLeft >= alienLeft + 18 ) &&
        (shotLeft <= alienLeft + 50 ) &&
        (shotHeight-170 >= alienBottom) &&
        (shotHeight-170 <= alienBottom + 20)
      ) {
        $(shot).remove();
        shotsOnScreen--;
        $(alien).css('visibility','hidden');
        aliensOnScreen--;
        if(aliensOnScreen<=0){
          gameInPlay=false;
          gameOver('you win');
        }
      }
    }
  }

  function updatePosn(){
    $me.style.left = `${me.xPos}px`;
  }

  /* ---------- /
    Aliens
  / ---------- */

  let thisWay = 1;
  let firstAlienLine = true;
  function update(){
    setTimeout(function() {
      if(gameInPlay) {
        updateShot();
        updateAlien();
      }
      update();
    }, timer);
  }

  function updateAlien(){
    // console.log('let\'s go aliens!');
    const firstAlien = document.getElementById('invader1');
    let firstLeft = $(firstAlien).css('left');
    firstLeft = parseInt(firstLeft.split('px')[0]);
    if(firstLeft >= 200) {
      thisWay = -1;
      firstAlienLine = false;
      newLine();
    } else if(firstLeft<=10) {
      thisWay = 1;
      if(firstAlienLine === false) {
        newLine();
      }
    }
    if(aliensOnScreen >= 1) {
      const aliens = document.getElementsByClassName('alien');
      for(let i=0; i<aliens.length; i++){
        const alien = aliens[i];
        // console.log(alien);
        let left = $(alien).css('left');
        left = parseInt(left.split('px')[0]);
        $(alien).css('left',`${left+(5*thisWay)}px`);
      }
    }
  }


  function newLine(){
    //console.log('newline');
    const aliens = document.getElementsByClassName('alien');
    for(let i=0; i<aliens.length; i++){
      const alien = aliens[i];
      let bottom = $(alien).css('bottom');
      bottom = parseInt(bottom.split('px')[0]);
      $(alien).css('bottom',`${bottom-20}px`);
      if(gameInPlay && (bottom-20<0)){
        bottom = 0;
        gameInPlay=false;
        gameOver('Game Over');
      }
    }
  }

  /* ---------- /
    Game Over
  / ---------- */

  function gameOver(message) {
    $('.gameOver').css('visibility','visible');
    $('#modalUpdate').html(message);
  }

});
