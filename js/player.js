//TODO
const localpath = "media/";//путь к муз файлам
const localImgPath = "images/";//путь к картинкам
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const strokaBegushaja = document.getElementById('begaet');
const mute = document.getElementById('mute');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const volume = document.getElementById('volume');
const repa = document.getElementById('repeat');
const imgWindow = document.getElementById('playImg');
//массив песен и картинок
const media = [
    {id: 1, sound: "spring.mp3", img: "RUCEI.gif"},
    {id: 2, sound: "cat.mp3", img: "cat.gif"},
    {id: 3, sound: "dzen.mp3", img: "dzen.gif"},
    {id: 4, sound: "flames.mp3", img: "flames2.gif"},
    {id: 5, sound: "sea.mp3", img: "sea.gif"},
    {id: 6, sound: "forest.mp3", img: "rain3.gif"},
    {id: 7, sound: "vesna.mp3", img: "primavera.jpg"},
    {id: 8, sound: "sverchok.mp3", img: "sverchok.gif"},
    {id: 9, sound: "bird.mp3", img: "1.jpg"},
    {id: 10, sound: "lake.mp3", img: "lake.jpg"},
    {id: 11, sound: "koster.mp3", img: "flames1.gif"}];

let counter = 0;//глобальная переменная счетчик плеера
let repeat = false;//переменная повтора плейлиста

let audio = new Audio();

function showNewImg(img) {
    imgWindow.src = img;
}

function playnext(sid) {
    if (typeof (sid) !== 'undefined') {
        counter = sid;
        pause.classList.remove('activated');//клик приходит из меню
    }
    audio.src = localpath + playlist[counter].sound;
    audio.play();
    strokaBegushaja.innerText = ('Сейчас играет ' + playlist[counter].sound);
    image = localImgPath + playlist[counter].img;
    showNewImg(image);
    activeSong(playlist[counter].id);
}

function playPause() {
    play.classList.add('hide');//механизм кнопки плей
    pause.classList.remove('hide');
}

function player() {
    audio.volume = 0.5;
// Добавляем к кнопке с идентификатором "play" обработчик события onclick, внутри которого вызывается метод play
    audio.addEventListener('ended', () => {
        if (counter === media.length - 1) {
            if (repeat) {
                counter = 0;
                playnext();
            }
        } else {
            counter++;
            playnext()
        }
    }, false);//repeat all

    play.addEventListener('click', function (e) {
        playPause();
        e.preventDefault();
        playnext();
    }, false);//play

    prev.addEventListener('click', function (e) {
        playPause();
        e.preventDefault();
        if (counter !== 0) {
            counter--;
            playnext()
        }
    }, false);//rew

    next.addEventListener('click', function (e) {
        playPause();
        e.preventDefault();
        if (counter === media.length - 1) {
            counter = 0;
            playnext();
        } else {
            counter++;
            playnext();
        }
    }, false);//ff

    pause.addEventListener('click', function (e) {
        pause.classList.add('hide');
        play.classList.remove('hide');
        e.preventDefault();
        audio.pause();
        showNewImg("images/rain2.gif");
    }, false);//pause

    repa.addEventListener('click', (e) => {
        e.preventDefault();
        if (!repeat) {
            repeat = true;
            repa.classList.add('activated');
        } else {
            repeat = false;
            repa.classList.remove('activated');
        }
    });//repeat switch

    volume.addEventListener('input', function () {
        audio.volume = parseFloat(this.value / 10);
        if (this.value / 10 !== 0) {
            mute.classList.add('hide');
        } else {
            mute.classList.remove('hide');
        }
    }, false);//vol

    audio.addEventListener("timeupdate", function () {
        let duration = document.getElementById('duration');
        let s = parseInt(audio.currentTime % 60);
        if (s < 10) {
            s = `0${s}`;
        }
        let m = parseInt((audio.currentTime / 60) % 60);
        duration.innerHTML = '0' + m + ':' + s;
    }, false);//time_show
}