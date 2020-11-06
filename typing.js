var startButton = document.querySelector('.pause-tooltip');
var words = document.querySelectorAll('.token_unit');
var text = document.querySelector('.TPCMN');
var accuracy = document.querySelector('.accuracy');
var speed = document.querySelector('.speed');
var progress = document.querySelector('.placement-progress');
var suspend = document.querySelector('._timeout');
var refresh = document.querySelector('._stop');
var i = 0;//纪录总字数
var count = 0;//纪录对的字母的个数
var startTime = 0;//纪录开始时间
var tempTime = 0;//记录每个单词的速度
var timeouttime = 0;//记录暂停的时间
var sigtime = 0;
var jugall = 0;
var jugrig = 0;
var temp = 0;
var offf1 = 0;
var flag = 0;
var linei = 0;
var fixtail = 0;
var blankspace = new Array();
var fix = new Array();
fix[fix.length]=3;fix[fix.length]=4;fix[fix.length]=5;fix[fix.length]=10;fix[fix.length]=7;
var blankspacetail = 0;
blankspace[0] = 6;blankspace[1] = 5;blankspace[2] = 4;blankspace[3] = 4;blankspace[4] = 2;
var right = "./right.mp3";
var wrong = "./wrong.mp3";
var rightsound = new Audio(right);
var wrongsound = new Audio(wrong);
var fx2 = function(e) {
    if(words[i].innerHTML == String.fromCharCode(e.keyCode.toString()).toLowerCase())//正确变色
    {
        words[i].style.backgroundColor = 'rgba(0,255,0,.2)';
        words[i].style.color = 'green';
        count++;
        jugall++;
        jugrig++;
    }
    else {//错误变色
        words[i].style.backgroundColor = 'rgba(255,0,0,.2)';
        words[i].style.color = 'red';
        jugall++;
        wrongsound.play();
    }
    tempTime = +new Date();
    i++;linei++;
    accuracy.innerHTML = ((count / i) * 100).toFixed(2) + '%' + ' ';//准确额度计算
    speed.innerHTML = (i / ((tempTime - startTime) / 60 / 60)).toFixed(2) + 'wpm'//速度计算
    progress.style.width = progress.clientWidth + 5 + "px";
    if(words[i-1].innerHTML == ' ')
    {
        if(jugrig == jugall) rightsound.play();
        if(blankspacetail >= blankspace[offf1]) {offf1++;blankspacetail=0;linei = fix[fixtail++];}
        startButton.style.display = 'none';
        temp = +new Date()
        var jug = document.createElement('div');
        jug.innerHTML = (jugall / ((temp - sigtime) / 60 / 60)).toFixed(2);
        text.appendChild(jug);
        jug.style.position = 'absolute';
        jugall = 0
        jugrig = 0;
        sigtime = +new Date();
        temp = 0;
        blankspacetail++;
        console.log(offf1);
        console.log(blankspace[offf1]);
        console.log(blankspacetail);
        jug.style.left = (Math.max(linei,1)+1) * 15+ 'px';
        jug.style.top = 10 + 50*offf1 + 'px';
    }
    if(i==words.length) {
        alert('congratulations');
        if((count / i)>0.8 && (i / ((tempTime - startTime) / 60 / 60))>10)
        alert('five stars');
    }
}

var fx1 = function() {//开始按钮的函数
    startTime = +new Date();
    sigtime  = +new Date();
    console.log('开始的时间是'+startTime+'');
    console.log('执行fx1');
    document.addEventListener('keydown',fx2);
}

var fx3 = function() {//暂停按钮 调整时间以及键盘输入
    if(!timeouttime)
    {timeouttime = +new Date();
    console.log(startTime + 'xxx');
    document.removeEventListener('keydown',fx2);
    }
    else {
        timeouttime -= new Date();
        startTime -= timeouttime;
        console.log(startTime);
        timeouttime = 0;
        document.addEventListener('keydown',fx2);
    }
    
}

var fx4 = function() {//变量清空
    for(var temp = 0; temp < words.length ; temp++)//样式清空
    {
        words[temp].style.backgroundColor = 'white';
        words[temp].style.color = '#757575';
    }
    document.removeEventListener('keydown',fx2);//取消键盘事件
    i = 0; count = 0; startTime = 0;tempTime = 0;timeouttime = 0;jugall = 0; jugrig = 0;
    progress.style.width = 5 +'px';
    speed.innerHTML = '0wpx';
    accuracy.innerHTML = '0%';
}

startButton.addEventListener('click',fx1);
suspend.addEventListener('click',fx3);
refresh.addEventListener('click',fx4);