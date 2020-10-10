/*build by 风筒桑 2017  QQ：502941254*/

(function(){
	blinds = function(hideCont,showCont,resource,parent,grandparent,imgArray,time){

		let	grandparentCont =  document.getElementById(grandparent),
			remainder = grandparentCont.offsetWidth%24;

		grandparentCont.style.width = grandparentCont.offsetWidth-remainder +'px';
		// grandparentCont.style.left = (document.body.clientWidth-parseInt(grandparentCont.style.width))/2 + 'px';

		let showCA = document.getElementById(showCont),
		    hideCA = document.getElementById(hideCont),
		    source = document.getElementById(resource),
		    parentCont = document.getElementById(parent),
		    show = showCA.getContext('2d'),
		    hide = hideCA.getContext('2d'),
		    imgW = document.body.clientWidth,
		    imgH = document.body.clientHeight;
			showCA.width = hideCA.width = parentCont.offsetWidth;
			showCA.height = hideCA.height = parentCont.offsetHeight;

		let self = this;
			self.n = 0;
			self.num = 1;
			self.count = 0;
			self.part = showCA.width/24;
			self.isActive = false;
			self.isInit = true;

		self.init = function(){
			// source.onload = function () {
				if(self.isInit==true){
					show.drawImage(source,0,0);
					self.showImageData = show.getImageData(0,0,showCA.width,showCA.height);
					self.showPixelData = self.showImageData.data;
					self.isInit = false;
					source.src = './img/' + imgArray[0] + '.jpg';
				}
			// }
		}

		self.change = function(){
			for(let i=0;i<showCA.height;i++){
				for(let j=0;j<self.part;j++){
					self.showPixelData[(i*showCA.width+i+24*j+self.n)*4+0] = self.hidePixelData[(i*showCA.width+i+24*j+self.n)*4+0]
					self.showPixelData[(i*showCA.width+i+24*j+self.n)*4+1] = self.hidePixelData[(i*showCA.width+i+24*j+self.n)*4+1]
					self.showPixelData[(i*showCA.width+i+24*j+self.n)*4+2] = self.hidePixelData[(i*showCA.width+i+24*j+self.n)*4+2]
					self.showPixelData[(i*showCA.width+i+24*j+self.n)*4+3] = self.hidePixelData[(i*showCA.width+i+24*j+self.n)*4+3]
				}
			}
			show.putImageData(self.showImageData,0,0);
			if (self.n<24) {
				self.n++
			}
			else{
				self.count=0;
				self.n=0;
				self.num<imgArray.length-1?self.num+=1:self.num=0;
				self.isActive = false;
				source.src = './img/' + imgArray[self.num] + '.jpg';
			}
		}

		self.active = function(){
			self.isInit==true?self.init():'';
			self.count++;
			if (self.count==2*60) {
				hide.drawImage(source,0,0);
				self.hideImageData = hide.getImageData(0,0,hideCA.width,hideCA.height);
				self.hidePixelData = self.hideImageData.data;
			}
			self.count==time*60?self.isActive = true:'';
			self.isActive==true?self.change():'';
		}
	}

	window.blinds = blinds;

})();