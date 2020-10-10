/*build by 风筒桑 2017  QQ：502941254*/

// 数字前补0
function addzero(num, length) {
	return (Array(length).join('0') + num).slice(-length);
}

function randomSort(arrayA,arrayB){
	while(arrayA.length>0){
		var j = Math.floor(Math.random()*arrayA.length);
		arrayB.push(arrayA[j]);
		arrayA.splice(j,1);
	};
}

//动画兼容
if(!window.requestAnimationFrame){
    window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
                                   window.mozRequestAnimationFrame||
                                   window.oRequestAnimationFrame||
                                   window.msRequestAnimationFrame||
                                  function(callback){
                                       return window.setTimeout(callback,1000/60); 
                                 });
    
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}

document.querySelector('#about').onclick = function(){
	document.querySelector('#info').style.height = '600px';
}

document.querySelector('#close').onclick = function(){
	document.querySelector('#info').style.height = '0px';
}

function main(){
	var haruA = new haru('haruCanvas','hana1','hana2','hana3','hana4');
	var natsuA = new natsu('natsuCanvas');
	var akiA = new aki('akiCanvas','mapleleaf1','mapleleaf2','mapleleaf3');
	var fuyuA = new fuyu('fuyuCanvas','snowimg');
	var chocolateA = new chocolate('chocolate','chocolateCont','chocolateSource');
	var audioViewA = new audioView('view');
	var slideA = new blinds('hide','show','source','blinds','slide-img',imgArray,5);
	audioViewA.getData();
	(function live(){
		audioViewA.active();
		slideA.active();
		isHaru==true?haruA.active():'';
		isNatsu==true?natsuA.active():'';
		isAki==true?akiA.active():'';
		isFuyu==true?fuyuA.active():'';
		chocolateA.active();
		requestAnimationFrame(live);
	})()
}

// haru
	(function(){
		haru = function(canvasCont,sakura1,sakura2,sakura3,sakura4){
			var CA = document.getElementById(canvasCont);
			var sakura = CA.getContext('2d');

			CA.width = document.body.clientWidth;
			CA.height = document.body.clientHeight;

			var hana1 = document.getElementById(sakura1);
			var hana2 = document.getElementById(sakura2);
			var hana3 = document.getElementById(sakura3);
			var hana4 = document.getElementById(sakura4);

			var self = this;
				self.img = [hana1,hana2,hana3,hana4];
				self.hana = [];
				self.count = 0;

			self.addHana = function(){
				var h =  {
					style : self.img[Math.ceil(Math.random()*3)],
					posX : CA.width/2+(Math.random()*CA.width/2)+100,
					posY : -10,
					vx : Math.min(-1,-Math.random()*3),
					vy : Math.max(2,Math.random()*3),
					vr : Math.random()*2,
					w : Math.max(10,Math.random()*30)
				}
				self.hana.push(h)
			}

			self.drawHana = function(){
				sakura.clearRect(0,0,CA.width,CA.height);
				sakura.globalAlpha = '0.9';
				self.hana.forEach(function(item){
					sakura.save();
					sakura.translate(item.posX,item.posY);
					sakura.rotate(item.vr*Math.PI/180);
					sakura.drawImage(item.style,0,0,item.w,item.w);
					sakura.restore();
				})
			}
			self.update = function(){
				self.hana.forEach(function(item,i){
					item.posX += item.vx;
					item.posY += item.vy;
					item.vr +=0.5 ;
					item.posX>CA.width+100 || item.posX<0 || item.posY>CA.height?self.hana.splice(i,1):'';
				})
			}

			self.active = function(){
				self.count++;
				self.count%10==0?self.addHana():'';
				self.count==1000?self.count=10:'';
				self.drawHana();
				self.update();
			}

			window.haru = haru;	
		}
	})();

// natsu
	(function(){
		natsu = function(canvasCont){
			var CA = document.getElementById(canvasCont);
			var firefly = CA.getContext('2d');

			CA.width = document.body.clientWidth;
			CA.height = document.body.clientHeight;

			var self = this;
				self.fireflyArray = [];
				self.count = 0;

			self.addFirefly = function(){
				var f =  {
					posX : Math.random()*CA.width+50,
					posY : CA.height+3,
					vx : Math.random()*0.5*(Math.random()>0.5?1:-1),
					vy : -Math.random()*0.5,
					r : Math.floor(Math.max(5,Math.random()*8)),
					lifecycle : Math.floor(Math.max(8,Math.random()*10))*60
				}
				self.fireflyArray.push(f);
			}

			self.drawFirefly = function(){
				firefly.clearRect(0,0,CA.width,CA.height)
				firefly.globalAlpha = '0.9';
				self.fireflyArray.forEach(function(item){
					firefly.beginPath();
					firefly.arc(item.posX,item.posY,item.r+2,0,2*Math.PI);
					var gradient = firefly.createRadialGradient(item.posX,item.posY,0,item.posX,item.posY,item.r);
						gradient.addColorStop(0,"rgba(255,255,255,1)");
			    		gradient.addColorStop(0.2,"#FAFDAC");
				    	gradient.addColorStop(1,"rgba(191,232,34,0.1)");
					firefly.fillStyle = gradient;
					firefly.fill()
				})
			}
			self.update = function(){
				self.fireflyArray.forEach(function(item,i){
					self.count++;
					item.posX += item.vx;
					item.posY += item.vy;
					item.r -= 0.01;
					item.lifecycle--;
					if(item.r<0.1 || item.lifecycle==0){
						self.fireflyArray.splice(i,1);
					}
				})
			}

			self.active = function(){
				self.count%6==0?self.addFirefly():'';
				self.drawFirefly();
				self.update();
			}

			window.natsu = natsu;	
		}
	})();
// aki
	(function(){
		aki = function(canvasCont,leaf1,leaf2,leaf3){
			var CA = document.getElementById(canvasCont);
			var mapleLeaf = CA.getContext('2d');

			CA.width = document.body.clientWidth;
			CA.height = document.body.clientHeight;

			var leaf1 = document.getElementById(leaf1);
			var leaf2 = document.getElementById(leaf2);
			var leaf3 = document.getElementById(leaf3);

			var self = this;
				self.img = [leaf1,leaf2,leaf3];
				self.leaf = [];
				self.count = 0;
				self.vr = 1;

			self.addLeaf = function(){
				var h =  {
					style : self.img[Math.ceil(Math.random()*2)],
					posX : CA.width+Math.random()*200,
					posY : (CA.height+100/2)*Math.random()-50,
					vx : -Math.min(4,Math.random()*6),
					vy : Math.max(0.3,Math.random()*1),
					vr : Math.max(Math.random()*1,2),
					w : Math.max(15,Math.random()*20)
				}
				self.leaf.push(h)
			}

			self.drawLeaf = function(){
				mapleLeaf.clearRect(0,0,CA.width,CA.height);
				mapleLeaf.globalAlpha = '0.9';

				self.leaf.forEach(function(item){
					mapleLeaf.save();
   					mapleLeaf.translate(item.posX+(item.w/2),item.posY+(item.w/2));
   			 		mapleLeaf.rotate(item.vr*Math.PI/180);
    				mapleLeaf.drawImage(item.style,-item.w/2,-item.w/2,item.w,item.w);
    				mapleLeaf.restore();
				})
			}
			self.update = function(){
				self.leaf.forEach(function(item,i){
					item.posX += item.vx;
					item.posY += item.vy;
					item.vr+=1;
					item.posX>CA.width+100 || item.posX<0 || item.posY>CA.height?self.leaf.splice(i,1):'';
				})
			}

			self.active = function(){
				self.count++;
				self.count%5==0?self.addLeaf():'';
				self.count==1000?self.count=10:'';
				self.drawLeaf();
				self.update();
			}

			window.aki = aki;	
		}
	})();

// fuyu
	 (function(){
		fuyu = function(canvasCont,imgCont){
			var CA = document.getElementById(canvasCont);
			var snow = CA.getContext('2d');
			var snowImg = document.getElementById(imgCont);

			CA.width = document.body.clientWidth;
			CA.height = document.body.clientHeight;

			var self = this;
			self.snowArr = [];
			self.snowFlag = 0;

			self.addSnow = function(){
				if(self.snowFlag==0){
					var snowInfo = {
						x : CA.width*Math.random(),
						y : 0,
						vx: Math.random(),
						vy: Math.random(),
						w:  Math.max(5,Math.random()*10)
					}
					self.snowArr.push(snowInfo);
					self.snowFlag = 15;
				}
			}

			snow.globalAlpha = '0.7';

			self.drawSnow = function(){
				snow.clearRect(0,0,CA.width,CA.height);
				self.snowArr.forEach(function(item){
					snow.beginPath();
					snow.drawImage(snowImg,item.x-100,item.y,item.w,item.w);
				});
			}

			self.snowUpdate = function(){
	 			self.snowArr.forEach(function(item){
	 				item.x += item.vx;
	 				item.y += item.vy;
	 			});
			}

			self.snowCheck = function(){
				self.snowArr.forEach(function(item,i){
	 				item.x>CA.width+100 || item.x<0 || item.y>CA.height?self.snowArr.splice(i,1):'';
	 			});
			}

			self.active = function(){
				self.addSnow();
				self.drawSnow();
				self.snowUpdate();
				self.snowCheck()
				self.snowFlag--
			}
		}
		window.fuyu = fuyu;
	})();

