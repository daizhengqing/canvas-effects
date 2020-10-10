/*build by 风筒桑 2017  QQ：502941254*/
(function(){
	audioView = function(canvasCont){
		var self = this; 
		// self.positionX;
			self.distance = 1;
			self.s = 0;
			self.w = 5;
			self.a = 0;
			self.num = 0;
			self.dataSize = 512;
			self.playNum = 0;
			self.positionArr = [];
			self.viewWidth = document.body.clientWidth/2+300;

		var CA = document.getElementById(canvasCont);
		var view = CA.getContext('2d');

		CA.width =self.dataSize*2*(self.w+self.distance);
		CA.height = 50;
		
		view.fillStyle = '#64B5FF';

		var audioContext = new(window.AudioContext || window.webkitAudioContext)();
		var analyser = audioContext.createAnalyser();
		var gainNode = audioContext.createGain();
		var panNode = audioContext.createStereoPanner();
		var audioNode = document.querySelectorAll('audio');

		analyser.fftSize = 2*self.dataSize;

		self.getData = function(){
			var audioSource = audioNode[self.playNum];
			var sourceNode = audioContext.createMediaElementSource(audioSource);
			sourceNode.connect(analyser);
			// sourceNode.connect(gainNode);
			sourceNode.connect(audioContext.destination);
			audioSource.play();
			document.getElementById('downloadHref').href = audioSource.src
			document.getElementById('now').innerHTML =  'NOWPLAYING: ' + musicInfo[self.playNum]['title'];
			if(self.playNum != audioNode.length-1){
				document.getElementById('next').innerHTML =  'NEXT: ' + musicInfo[self.playNum+1]['title'];
			}
			else {
				document.getElementById('next').innerHTML =  'NEXT: ' + 'END' ;
			}
			audioSource.addEventListener('ended',function(){
				console.log(self.playNum)
				if(self.playNum < audioNode.length-1){
					self.playNum++;
					self.getData();
				}
			})
		}

		for(var i=0;i<analyser.fftSize;i++){
			var p = {
				x : i*(self.w+self.distance),
				shift : 0
			}
			self.positionArr.push(p);
		}

		self.drawPart1 = function(data1){
			for(var i=11;i<self.dataSize;i++){
					view.beginPath();
					view.fillRect(self.positionArr[i].x+self.positionArr[i].shift,CA.height+10,self.w,-data1[i]/7);
			}
		}

		self.drawPart2 = function(data2){
			var a = 12;
			for(var i=0;i<self.dataSize-11;i++){
				view.beginPath();
				view.fillRect(self.positionArr[a].x+self.positionArr[a].shift,CA.height+10,self.w,-data2[i]/7);
				a+=1;
			}
		}

		self.update = function(){
			for(var i=0;i<analyser.fftSize;i++){
				self.positionArr[i].shift += 0.5;
				if(self.positionArr[i].x+self.positionArr[i].shift>512*(self.w+self.distance)){
					self.positionArr[i].x = 10*(self.w+self.distance);
					self.positionArr[i].shift = 0
				}
			}
		}

		self.active = function(){
			view.clearRect(0,0,CA.width,CA.height);
			var data1 = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data1);
			self.drawPart1(data1);
			var data2 = data1.reverse();
			self.drawPart2(data2)
			self.update();
		}
	}
	window.audioView = audioView;
})()