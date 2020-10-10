/*build by 风筒桑 2017  QQ：502941254*/

	(function(){
		chocolate = function(canvasCont,parentCont,source){
			var CA = document.getElementById(canvasCont);
			var chocolate = CA.getContext('2d');
			CA.width = 280;
			CA.height = 250;

			var self = this;
				self.cont = document.getElementById(parentCont);
				self.sc = document.getElementById(source)
				self.ax = 0;
				self.ay = 0;
				self.vy = 0;
				self.count = 0;
				self.isActive = false;
				self.g = 1;
				self.isClick = false;
				self.warawuY = 0;
				self.isFollow = false;
				self.del= 0;

			self.draw = function(){
					// 右马尾
					chocolate.save();
					chocolate.translate(15+70+self.ax/10,50+self.ay/10);
					chocolate.rotate(Math.sin(self.del)*1*Math.PI/180);
					chocolate.drawImage(self.sc,130,0,85,175,-70+self.ax/6,0+self.ay/6,85,175);
					chocolate.restore();
					// 左马尾
					chocolate.save();
					chocolate.translate(170+self.ax/10,50+self.ay/10);
					chocolate.rotate(Math.sin(self.del)*-1*Math.PI/180);
					chocolate.drawImage(self.sc,220,0,85,175,0+self.ax/6,0+self.ay/6,85,175);
					chocolate.restore();
					// 眼白
					chocolate.fillStyle = '#fff';
					chocolate.fillRect(107,90,80,30);
					chocolate.fill();
					// 左眼
					chocolate.drawImage(self.sc,0,320,20,25,107+self.ax,90+self.ay,20,25);
					// 右眼
					chocolate.drawImage(self.sc,35,320,20,25,150+self.ax,90+self.ay,20,25);
					// 下眼皮
					chocolate.drawImage(self.sc,40,180,100,30,100,106-self.warawuY-self.vy,100,30);
					// 脸
					chocolate.drawImage(self.sc,0,211,100,100,94,37,100,100);
					// 左眉
					chocolate.drawImage(self.sc,0,133,50,50,100+self.ax/3,self.warawuY+69+self.vy+self.ay/3,50,50);
					// 右眉
					chocolate.drawImage(self.sc,50,133,50,50,150+self.ax/3,self.warawuY+69+self.vy+self.ay/3,50,50);
					// 嘴
					chocolate.drawImage(self.sc,0,180,25,31,125+self.ax/3,100+self.ay/3,25,31);
					// 尾巴
					chocolate.save();
					chocolate.translate(98+50,195);
					chocolate.rotate(Math.sin(self.del)*5*Math.PI/180);
					chocolate.drawImage(self.sc,210,305,50,51,-50,0,50,51);
					chocolate.restore();
					// 左腿
					chocolate.drawImage(self.sc,120,305,50,51,105,195,50,51);
					// 右腿
					chocolate.drawImage(self.sc,165,305,50,51,128,195,50,51);
					// 身体
					chocolate.drawImage(self.sc,120,180,150,120,82+self.ax/5,115+self.ay/5,150,120);
					// 前发
					chocolate.drawImage(self.sc,0,0,120,135,80+self.ax/3,10+self.ay/3,120,135);
				}

			self.eye = function(){
				self.count++;
				self.count%(3*60)==0?self.isActive=true:'';
				if(self.isActive==true){
					if(self.vy>=0 && self.vy<=10){
						self.vy += self.g;
					}		
					if(self.vy==10){
						self.g = -1;
					}
					if(self.vy<0){
						self.isActive=false;
						self.vy = 0;
						self.g = 1;
					}
				}
			}

			self.move = function(e){
				e.pageX>self.cont.offsetLeft + 130 && self.ax<3?self.ax+=0.3:'';
				e.pageX<self.cont.offsetLeft + 130 && self.ax>-3?self.ax-=0.3:'';
				e.pageY>self.cont.offsetTop + 100 && self.ay<3?self.ay+=0.3:'';
				e.pageY<self.cont.offsetTop + 100 && self.ay>-3?self.ay-=0.3:'';
			}

			self.tozero = function(){
				if(self.isFollow==true){
					self.ax>0?self.ax-=0.3:'';
					self.ay>0?self.ay-=0.3:'';
					self.ax<0?self.ax+=0.3:'';
					self.ay<0?self.ay+=0.3:'';
					if(self.ax <= 0.3 && self.ay <= 0.3){
						self.ax = self.ay = 0
						self.isFollow = false;
					}
				}
			}

			// self.smile = function(){
			// 	if(isClick==true){
			// 		warawuY<10?warawuY++:'';
			// 		warawuY==10?isClick = false:'';
			// 	}
			// }

			self.cont.addEventListener('mouseover',function(e){
				self.cont.addEventListener('mousemove',self.move)
			})

			self.cont.addEventListener('mouseout',function(e){
				self.isFollow = true;
			})

			self.cont.addEventListener('click',function(){
				self.isClick = true;
			})

			self.active = function(){
				chocolate.clearRect(0,0,CA.width,CA.height)
				self.draw();
				self.eye();
				self.tozero();
				self.del+=0.07;
			};
		}
		window.chocolate = chocolate
	})();