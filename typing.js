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
var fx2 = function(e) {
    if(words[i].innerHTML == String.fromCharCode(e.keyCode.toString()).toLowerCase())//正确变色
    {
        words[i].style.backgroundColor = 'rgba(0,255,0,.2)';
        words[i].style.color = 'green';
        i++;
        count++;
    }
    else {//错误变色
        words[i].style.backgroundColor = 'rgba(255,0,0,.2)';
        words[i].style.color = 'red';
        i++;
    }
    tempTime = +new Date();
    accuracy.innerHTML = ((count / i) * 100).toFixed(2) + '%' + ' ';//准确额度计算
    speed.innerHTML = (i / ((tempTime - startTime) / 60 / 60)).toFixed(2) + 'wpm'//速度计算
    progress.style.width = progress.clientWidth + 5 + "px";
}

var fx1 = function() {//开始按钮的函数
    startTime = +new Date();
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
    i = 0; count = 0; startTime = 0;tempTime = 0;timeouttime = 0;//变量初始化
    progress.style.width = 5 +'px';
    speed.innerHTML = '0wpx';
    accuracy.innerHTML = '0%';
}

startButton.addEventListener('click',fx1);
suspend.addEventListener('click',fx3);
refresh.addEventListener('click',fx4);