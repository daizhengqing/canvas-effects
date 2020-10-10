(function(){
	loadingCount = 0;
	var isActive = true;

	var imgQuantity = [
		'./img/001.jpg',
		'./img/002.jpg',
		'./img/003.jpg',
		'./img/004.jpg',
		'./img/005.jpg',
		'./img/006.jpg',
		'./img/007.jpg',
		'./img/008.jpg',
		'./img/009.jpg',
		'./img/010.jpg',
		'./img/011.jpg',
		'./img/012.jpg',
		'./img/013.jpg',
		'./img/014.jpg',
		'./img/015.jpg',
		'./img/haru.jpg',
		'./img/natsu.jpg',
		'./img/aki.jpg',
		'./img/fuyu.jpg',
		'./img/xx.jpg',
		'./img/xx2.jpg',
		'./img/chocolate.png',
		'./img/hana1.png',
		'./img/hana2.png',
		'./img/hana3.png',
		'./img/hana4.png',
		'./img/mapleleaf1.png',
		'./img/mapleleaf2.png',
		'./img/mapleleaf3.png',
		'./img/snow.png',
		'./img/001.png'
	];

	(function createAudio(){
		var xhr = new XMLHttpRequest();
		xhr.open('GET','./data/musiclist.json',true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(this.readyState ==4 && this.status == 200){
				var musicInfo = [];
				var parent = document.querySelector('#audio-source');
				randomSort(JSON.parse(this.response),musicInfo);
				musicInfo.forEach(function(item,index){
					var source = document.createElement('audio');
					source.src = item.src;
					source.preload = 'auto';
					parent.appendChild(source);
					if(index==0){
						parent.firstChild.addEventListener('canplaythrough',function(){
							window.loadingCount++
						});
					}
				});
			window.musicInfo = musicInfo;
			}
		}
	})();

/*build by 风筒桑 2017  QQ：502941254*/

	(function createImage(){
		var temporaryArray = [];
		var imgArray = [];
		for(var i=0;i<imgQuantity.length;i++){
			var imgObj = new Image();
			imgObj.src = imgQuantity[i] + '';
			i<15?temporaryArray.push(addzero(i+1, 3)):'';
			imgObj.onload = function(){
				loadingCount++;
			}
		}
		randomSort(temporaryArray,imgArray);
		
		window.imgArray = imgArray;
		document.querySelector('#source').src = 'img/' + imgArray[0] + '.jpg';
	})();

	function update(){
		var schedlue = document.querySelector('#schedlue');
		var schedlueslide = document.querySelector('#schedlue-slide');
		schedlue.innerHTML = 'Loading...  ' + parseInt(loadingCount/(imgQuantity.length+1)*100) + '%';
		schedlueslide.style.width = parseInt(loadingCount/(imgQuantity.length+1)*100) + '%';
	}

	window.isHaru = false;
	window.isNatsu = false;
	window.isAki = false;
	window.isFuyu = false;

	function showEntry(){
		loadingCount++;
		var loading = document.querySelector('#loading')
		var entry = document.querySelector('#entry');
		var schedlue = document.querySelector('#schedlue');
		var schedlueslide = document.querySelector('#schedlue-slide');
		schedlueslide.addEventListener('transitionend',function(){
			schedlueslide.style.display = 'none';
			schedlue.style.display = 'none';
			entry.style.display = 'block';
		})
		entry.addEventListener('click',function(e){
			if(e.target.id != ''){
				loading.style.opacity = 0;
				e.target.id == 'haru'?isHaru=true:'';
				e.target.id == 'natsu'?isNatsu=true:'';
				e.target.id == 'aki'?isAki=true:'';
				e.target.id == 'fuyu'?isFuyu=true:'';
				window.tElement = document.getElementById(e.target.id+'-bg');
				setTimeout(function(){
					isActive = false;
					loading.style.display = 'none';
					transitionAnimation();
				},1000)
			}
		})
	}

    	(function loadingAnimation(){
    		loadingCount<=imgQuantity.length+1?update():'';
    		loadingCount==imgQuantity.length+1?showEntry():'';
    		// b.active();
    		var animation = requestAnimationFrame(loadingAnimation);
    		isActive==false?cancelAnimationFrame(animation):'';
    	})();
    
})();