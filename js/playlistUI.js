const leftmenu = document.getElementById('leftmenu');
const reset=document.getElementById('footer');
let count = 0;
let id = 0;
let playlist = [];
let ob = {};

//управление модальным контейнером таймера
const modal = document.getElementById('timerShow');
const timer = document.getElementById('startTimer');
const cancel = document.querySelector('#cancel');
timer.addEventListener('click', event => {//show window
    modal.classList.remove('hide');
});
cancel.addEventListener('click', event => {//hide window
    console.log('unhide');
    modal.classList.add('hide');
});
//модальный контейнер приветствия работает с сессион сторидж
let welcomeStore = parseInt(sessionStorage.getItem('welcome'));
const welcome = document.getElementById('welcome');
const hideme = document.getElementById('hideWelcome');

if (welcomeStore === 1) {
    console.log('smotreli');
} else {
    welcome.classList.remove('hide');
    hideme.addEventListener('click', () => {
        welcome.classList.add('hide');
        sessionStorage.setItem('welcome','1');
    });
}
//сброс состояния
reset.addEventListener('click',()=>{
    console.log('сброс');
    playlist = media;
    id = 12;
    localStorage.setItem("songIdCount", media[media.length - 1].id);
    let list = JSON.stringify(playlist);
    localStorage.setItem("songs", list);
    domUi(playlist);
},false);

//это перенесем в ЮИ
function resetSongs() {
    let son = localStorage.getItem("songs");
    count = localStorage.getItem("songIdCount");
//обязательно проверяем на нулл и ундефайнд иначе будет логическая ошибка
    if (son === null || typeof son === "undefined" || count < media[media.length - 1].id) {
        console.log('songs null');
        playlist = media;
        id = 12;
        localStorage.setItem("songIdCount", media[media.length - 1].id);
        let list = JSON.stringify(playlist);
        localStorage.setItem("songs", list);
        domUi(playlist);
    } else {
        playlist = JSON.parse(son);
        domUi(playlist);
        console.log("list isn`t empty");
    }
    player();
}

function domUi(media) {//здесь тоже можно делать проверку
    leftmenu.innerHTML = ``;
    media.forEach((song) => {
        const songInList = document.createElement('div');
        songInList.classList.add('chip');
        songInList.classList.add('z-depth-4');
        songInList.classList.add('myDiv');
        songInList.setAttribute('unselectable', 'on');
        songInList.innerHTML = `
        <a class="play-song">${song.sound}</a>
        <strong>ID:</strong>
        <i class="myIDs">${song.id}</i>
        <a href="#" class="moveup-task secondary-content">
        <i class="material-icons">arrow_upward</i>
        </a>
        <a href="#" class="movedown-task secondary-content">
        <i class="material-icons">arrow_downward</i>
        </a>
        <img src="images/tumbnails/${song.img}" alt="song about">
        `;
        leftmenu.appendChild(songInList);
    });
    leftmenu.firstChild.children[3].classList.add("hide");
    leftmenu.lastChild.children[4].classList.add("hide");
    menuActive();
}

//перерисовка дома и массива при его изменениях в массиве
function massChange(track) {//нельзя в json переводить пустой массив иначе будет выходить ощибка
    //тк при конвертации пустой массив дает не нулл и не ундефинед а пустую строку.(Спросить у преподавателя)
    if (track.length !== 0) {
        let jass = JSON.stringify(track);
        localStorage.setItem("songs", jass);
        domUi(track);
    } else {
        localStorage.removeItem("songs");
    }//здесь задел на реализацию добавлений в плейлист
}

//play it!
leftmenu.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('play-song')) {
        let toPlay = 0;
        const song = event.target.parentElement;
        let locInd = parseInt(song.children[2].textContent);
        console.log(locInd + 'locind');//нашли где указаны ID
        song.children[0].classList.add('activated2');
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === locInd) {
                //    console.log(this.tasks[i].deskr + ' play from left');
                toPlay = i;
            }
        }
        counter = toPlay;
        playPause();
        playnext();
    }
}, false);//клик на песне

leftmenu.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('chip')) {
        let toPlay = 0;
        const song = event.target;
        let locInd = parseInt(song.children[2].textContent);
        console.log(locInd + 'locind');//нашли где указаны ID
        song.children[0].classList.add('activated2');
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === locInd) {
                //    console.log(this.tasks[i].deskr + ' play from left');
                toPlay = i;
            }
        }
        counter = toPlay;
        playPause();
        playnext();
    }
}, true);//клик на чипсе песни

leftmenu.addEventListener('mouseover', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('chip')) {
        event.target.classList.remove('z-depth-4');
    }
}, true);//клик на чипсе песни
leftmenu.addEventListener('mouseout', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('chip')) {
        event.target.classList.add('z-depth-4');
    }
}, true);//клик на чипсе песни

//настрайваем движение элемента вверх
leftmenu.addEventListener('click', (event) => {
    event.preventDefault();
    let locTemp = 0;
    let toMove = 0;
    if (event.target.parentElement.classList.contains('moveup-task')) {
        const li = event.target.parentElement.parentElement;
        let locInd = parseInt(li.children[2].textContent);
        console.log(locInd);
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === locInd) {
                console.log(playlist[i].sound + ' index');
                toMove = i;
            }
        }
        locTemp = playlist[toMove];
        console.log(locTemp);
        playlist[toMove] = playlist[toMove - 1];
        playlist[toMove - 1] = locTemp;
        massChange(playlist);
        //       activeSong(locInd);
        if (counter !== 0) counter--;
    }
}, false);

//движение элемента вниз
leftmenu.addEventListener('click', (event) => {
    event.preventDefault();
    let locTemp = 0;
    let toMove = 0;
    if (event.target.parentElement.classList.contains('movedown-task')) {
        const li = event.target.parentElement.parentElement;
        let locInd = parseInt(li.children[2].textContent);
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === locInd) {
                toMove = i;
            }
        }
        locTemp = playlist[toMove];
        playlist[toMove] = playlist[toMove + 1];
        playlist[toMove + 1] = locTemp;
        massChange(playlist);//меняем массив
        //   activeSong(locInd);//меняем активную песню
        counter++;//меняем счетчик вместе с положением картинки в файлк
    }
}, false);
