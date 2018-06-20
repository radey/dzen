//todo
const clock=document.getElementById('clock');
const my_timer= document.getElementById('timer');
const add5 = document.getElementById('add5');
const add10 = document.getElementById('add10');
const add15 = document.getElementById('add15');
let s=0;
let m=0;
let sc=0;
let audio2 = new Audio;
function myclock()
{
    ndata=new Date();
// Получение показаний часов, минут и секунд
    hours= ndata.getHours();
    mins= ndata.getMinutes();
    secs= ndata.getSeconds();
// Дополнение показаний нулем слева
    if (hours < 10) {hours = "0" + hours }
    if (mins < 10) {mins = "0" + mins }
    if (secs < 10) {secs = "0" + secs }
// Суммирование всех данных для вывода
    datastr =hours+":" + mins+":" +secs
// Запись данных
    clock.textContent= " "+datastr;
// Вызов функции с интервалом 1000 ms
    setTimeout("myclock()", 1000);
}
add5.addEventListener('click',()=>{
    modal.classList.add('hide');
    m=0;
    s=20;
    playPause();
    playnext();
    startTimer();
});
add10.addEventListener('click',()=>{
    modal.classList.add('hide');
    m=0;
    s=40;
    playPause();
    playnext();
    startTimer();
});
add15.addEventListener('click',()=>{
    modal.classList.add('hide');
    m=0;
    s=60;
    playPause();
    playnext();
    startTimer();
});

function startTimer() {
    // s=10;
   // m=min;
    if (s == 0) {
        if (m == 0) {
   //     console.log("time is out!");
            audio.pause();
            audio2.src='alarms/alarm10.wav'
            audio2.volume=0.9;
            audio2.play();
            showNewImg("images/alarms.gif");
           return;
        }
        m--;
        if (m < 10) m = "0" + m;
        s = 59;
    }
    else {s--; sc=s;}
    if (s < 10) sc = "0" + s;
    my_timer.innerHTML =m+":"+sc;
   // stop.addEventListener('click',(e)=>{
    //    console.log('stop');
      //  s=0;
        //m=0;
     //   showNote=false;
    // });
    //остановка при досрочном окончании
    setTimeout(startTimer, 1000);}
//Функция таймера