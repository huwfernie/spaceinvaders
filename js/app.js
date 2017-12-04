console.log('Hello Huw');


$(() => {

  const $me = document.getElementById('me');


  document.addEventListener('keydown', (event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
      console.log('left');
      return moveLeft();
    } else if (keyName === 'ArrowRight') {
      console.log('right');
      return moveRight();
    } else {
      console.log('other Key');
    }
  });


  const me = {};
  me.xPos = 15;
  me.yPos = 0;


  function moveRight(){
    console.log('moveRight');
    me.xPos++;
    updatePosn();
  }

  function moveLeft(){
    console.log('moveRight');
    me.xPos--;
    updatePosn();
  }

  function updatePosn(){
    $me.style.left = `${me.xPos}px`;
  }

});
