window.onload = function(){
	// 搜索栏渐变颜色透明度
	headerChange();
	// 秒杀活动倒计时
	countDown();
	// 轮播图
	rotation();
}

function headerChange(){
	var maxDis = document.querySelector(".jd_nav").offsetHeight + document.querySelector(".jd_nav").offsetTop;
	var jdHeader = document.querySelector(".jd_header");
	window.onscroll = function(){
		var nowScrollDis = window.document.body.scrollTop;
		var opacityValue = nowScrollDis/maxDis;
		if(opacityValue>1){
			opacityValue = 1;
		}
		jdHeader.style.background = 'rgba(201, 21, 35,'+opacityValue+')';
	}
}

function countDown(){
	var timeArr = document.querySelectorAll(".jd_product .product_box .product_box_tit .sk_time span");
	// 初始化秒杀倒计时
	timeArr.forEach(function(time){
		time.innerHTML=0;
	});
	timeArr[1].innerHTML=5;
	var secTotal = (timeArr[0].innerHTML*10+timeArr[1].innerHTML*1)*60*60 + (timeArr[3].innerHTML*10+timeArr[4].innerHTML*1)*60+(timeArr[6].innerHTML*10+timeArr[7].innerHTML*1);
	var timer = null;


	timer = setInterval(function(){
		secTotal--;
		//倒计时结束清除定时器
		if(secTotal<=0){
			clearInterval(timer);
		}
		timeArr[0].innerHTML= Math.floor(secTotal/60/60/10);
		timeArr[1].innerHTML= Math.floor(secTotal/60/60%10);
		timeArr[3].innerHTML= Math.floor(secTotal/60%60/10);
		timeArr[4].innerHTML= Math.floor(secTotal/60%60%10);
		timeArr[6].innerHTML= Math.floor(secTotal%60/10);
		timeArr[7].innerHTML= Math.floor(secTotal%60%10);
	},1000);
}
function rotation(){
	var imgUl = document.querySelector(".jd_banner ul:first-child");
	var indexList = document.querySelectorAll(".jd_banner ul:nth-child(2) li");
	var imgWidth = imgUl.offsetWidth /10;
	var intervalValue = 2000;
	//封装重用代码，提高代码可读性、可维护性
	function setTransform(value){
		if(value ===undefined){
			value = -1*index*imgWidth;
		}
		imgUl.style.transform = 'translateX('+value+'px)';
	}
	/*
		setTransition('off'/'on') 'off'表示关闭过渡，'on'表示开启过渡
	*/
	function setTransition(transitionSwitch,succes){
		var attributeValue;
		if(transitionSwitch === 'off' || transitionSwitch === undefined){
			attributeValue='';
		}
		else if(transitionSwitch === 'on'){
			attributeValue='all .3s';
		}else{
			attributeValue= transitionSwitch;
		}
		imgUl.style.transition = attributeValue;
	}
	//index=1的图片才是想要展示的第一张图片，所以要将图片移到Index为1的位置
	var index = 1;
	setTransform();
	imgUl.timer = setInterval(function(){
		index++;
		setTransition('on');
		setTransform();
	},intervalValue);
	imgUl.addEventListener('webkitTransitionEnd',function(){
		if(index>=9){
			index=1;
			setTransition();
			setTransform();

		}else if(index<=0){
			index=8;
			setTransition();
			setTransform();
		}
		for(var i=0;i<indexList.length;i++){
			indexList[i].classList.remove('now');
		}
		indexList[index-1].classList.add('now');
	});
	//滑动移动图片
	var startX =0;
	var moveX = 0;
	var target = 0;
	var distance = 0;

	imgUl.addEventListener('touchstart',function(event){
		clearInterval(imgUl.timer);
		startX = event.touches[0].clientX;
		setTransition();
	});
	imgUl.addEventListener('touchmove',function(event){
		moveX = event.touches[0].clientX;
		distance = moveX - startX;
		
		setTransform(-index*imgWidth+distance);

	});
	imgUl.addEventListener('touchend',function(event){
		if(Math.abs(distance)>imgWidth/3){
			if(distance>0){
				index--;
			}else{
				index++;
			}
		}
		setTransition('on');
		setTransform();
		imgUl.timer = setInterval(function(){
			index++;
			setTransition('on');
			setTransform();
		},intervalValue);
	});
}