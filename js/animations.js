function menuActive() {
    const handler = document.querySelectorAll('.material-icons');//здесь получаем коллекцию элементов с подходящими параметрами
    Array.from(handler).forEach((item) => {
        item.addEventListener('mouseover', mouseOver)
    });
    //преобразуем ее в массив и перечисляя по очереди вешаем на каждый евент листнер и отправляем евент в колбэк
    Array.from(handler).forEach((item) => {
        item.addEventListener('mouseout', mouseOut)
    });
}

function mouseOver(event) {//в колбэке берем событие находим его таргет и добавляем ему класс а в другом удаляем класс
    event.target.classList.add('mouseover');
}

function mouseOut(event) {
    event.target.classList.remove('mouseover');
}
//анимируем правое меню
function activeSong(id) {
    let indLoc = 0;
    for (let i=0; i<playlist.length;i++){
        indLoc=parseInt(leftmenu.children[i].children[2].textContent);
      //  console.log(indLoc);
        if (indLoc===id){
            leftmenu.children[i].children[0].classList.add('activated2');
         //   console.log(leftmenu.children[i]);
        }else{
            leftmenu.children[i].children[0].classList.remove('activated2');
        }
    }
}
