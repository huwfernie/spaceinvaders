console.log('Hello Huw');


$(() => {
  document.addEventListener('keydown', (event) =>{
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
      console.log('left');
    } else if (keyName === 'ArrowRight') {
      console.log('right');
    } else {
      console.log('other Key');
    }
  });

});
