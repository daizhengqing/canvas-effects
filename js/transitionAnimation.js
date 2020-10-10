/*build by 风筒桑 2017  QQ：502941254*/

function transitionAnimation(){
			var CA = document.getElementById('layer1');
			var layer1 = CA.getContext('2d');
			var CA2 = document.getElementById('layer2');
			var layer2 = CA2.getContext('2d');
			var CA3 = document.getElementById('layer3');
			var layer3 = CA3.getContext('2d');
			var CA4 = document.getElementById('mask');
			var mask = CA4.getContext('2d');

			CA.width = CA2.width = CA3.width = CA4.width = document.body.clientWidth;
			CA.height = CA2.height = CA3.height = CA4.height = document.body.clientHeight;

			var cp = {
				x : CA.width/2,
				y : CA.height/2 
			};
			
			var roundColor = {
				r : 255,
				g : 255,
				b : 255,
				a : 0
			};
			
			drawLayer1Round = function(){
				layer1.beginPath();
				layer1.arc(cp.x,cp.y,100,0,2*Math.PI);
				layer1.fillStyle = 'rgba(' + roundColor.r + ',' + roundColor.g+ ',' + roundColor.b+ ',' + roundColor.a + ')';
				layer1.fill();
			}
			
			Layer1RoundColorChange = function(){
				if (roundColor.a<=0.8) {
					roundColor.a +=0.15;
				};
				if (roundColor.r>=0) {
					roundColor.r -= 7;
				};
				if (roundColor.g>=36) {
					roundColor.g -= 7;
				};
				if (roundColor.b>=52) {
					roundColor.b -= 7;
				};
			}

			var border = [];
			var borderCtrl = 1;

			addBorder = function(){
				var as = -0.3;
				var ae = -0.25;
				for(i=0;(as+(i/10))<1.7;i++){
					var bp = {
						s : (as+(i/10)),
						e : (ae+(i/10))
					};
					border.push(bp);
				}
			}

			drawLayer1RoundBorder = function(){
				layer1.lineWidth = 5;
				layer1.strokeStyle = 'rgba(0,36,25,0.8)';

				for(var i = 0;i<borderCtrl;i++){
					layer1.beginPath();
					layer1.arc(cp.x,cp.y,110,border[i].s*Math.PI,border[i].e*Math.PI,false);
					layer1.stroke()
				}
			}

			Layer1RoundBorderUpdate = function(){
				borderCtrl<border.length?borderCtrl+=0.5:''
			}

			var lightV = 0;
			var alpha = 0.5;
			drawLayer1Light = function(){
				layer1.beginPath();
				layer1.moveTo(cp.x-200+lightV,cp.y+lightV);
				layer1.lineTo(cp.x+lightV,cp.y-200+lightV);
				layer1.strokeStyle = 'rgba(255,255,255,0.3)';
				layer1.lineWidth = 12;
				layer1.stroke();
			}

			Layer1LightUpdate = function(){
				lightV<=200?lightV+=200*0.035:''
			}

			var angle = 90;
			createImg = function(){
				var c = document.createElement('img');;
				c.src = 'img/001.png';
				c.id = 'wel'
				document.getElementById('cont').appendChild(c);
				var img = document.getElementById('wel');
				img.style.left = cp.x-100 + 'px';
				img.style.top  = cp.y-100 + 'px';
				img.style.transform = 'rotateY(90deg)';
			}

			createImg();

			rotateImg = function(){
				var img = document.getElementById('wel');
				img.style.transform = 'rotateY('+ angle +'deg)';
				if(angle>=0){
					angle-=3
				}
			};

			var fireWorksLine1 = [];
			var fireWorksLine2 = [];

			var fwrp1 = {
				x : cp.x-30,
				y : cp.y+50
			};

			var fwrp2 = {
				x : cp.x+30,
				y : cp.y-50
			};

			var lineLength = 0; 
			var startPostion = 0;

			addLayer2FireWorksLine = function(radius,startPostion,length,arr,centerX,centerY){
				for(var i = -0.5;i<1.3;i+=0.2){
					var line = {
						sx:parseInt(Math.cos(i*Math.PI)*(radius+startPostion)+centerX),
						sy:parseInt(-Math.sin(i*Math.PI)*(radius+startPostion)+centerY),
						ex:parseInt(Math.cos(i*Math.PI)*(radius+length)+centerX),
						ey:parseInt(-Math.sin(i*Math.PI)*(radius+length)+centerY)
					}
					arr.push(line)
				}
			}

			Layer2FireWorksLineUpdate = function(arr){
				arr.splice(0,arr.length);
				if (lineLength >= 0 && lineLength < 30) {
					lineLength += 3
				}
				if(lineLength >= 30 && startPostion <30){
					startPostion += 2
				}
			};

			drawLayer2FireWorks = function(fireWorksLine,color){	
				for(var i = 0;i<10;i++){
					layer2.strokeStyle = color;
					layer2.lineWidth = 2;
					layer2.beginPath()
					layer2.moveTo(fireWorksLine[i].sx,fireWorksLine[i].sy)
					layer2.lineTo(fireWorksLine[i].ex,fireWorksLine[i].ey)
					layer2.stroke()
				}
			};

			var layer2Round1 = {
				x : cp.x + 30,
				y : cp.y + 40,
				r : 0
			};

			var layer2Round2 = {
				x : cp.x - 50,
				y : cp.y - 80,
				r : 0
			};

			drawLayer2Round = function(centerX,centerY,radius,color,width){
				layer2.lineWidth = width;
				layer2.strokeStyle = color;
				layer2.beginPath();
				layer2.arc(centerX,centerY,radius,0,2*Math.PI);
				layer2.stroke()
			}

			layer2Round1Update = function(){
				layer2Round1.r += 2*1.2 
			}

			layer2Round2Update = function(){
				layer2Round1.r>=30 || layer2Round2.r>=3?layer2Round2.r+=3*1.2:""
			}

			layer3.translate(cp.x-260,cp.y-80);
			layer3.rotate(-10*Math.PI/180);
			

			var triAngel = [
				{
					x1 : 100,
					y1 : 100,
					l  : 60,
					vx : 0,
					vy : 0
				},
				{
					x1 : 200,
					y1 : 50,
					l  : 40,
					vx : 0,
					vy : 0
				},
				{
					x1 : 130,
					y1 : 20,
					l  : 30,
					vx : 0,
					vy : 0
				},
				{
					x1 : 200,
					y1 : 200,
					l  : 30,
					vx : 0,
					vy : 0
				},
				{
					x1 : 100,
					y1 : 100,
					l  : 60,
					vx : 0,
					vy : 0
				}
			]

			
			drawLayer3Triangel = function(x1,y1,l,vx,vy,color){
				var distance = l*Math.sin(60*0.017453293);
				layer3.fillStyle = color;
				layer3.beginPath()
				layer3.moveTo(x1,y1)
				layer3.lineTo(x1,y1+(l/3)-vy)
				layer3.lineTo(x1+vx,y1+(l/2))
				layer3.lineTo(x1,y1+(2*l/3)+vy)
				layer3.lineTo(x1,y1+l)
				layer3.lineTo(distance+x1,y1+(l/2))
				layer3.lineTo(x1,y1)
				layer3.fill()
			}

			var easing = 0.04; 
			var a = 5;

			layer3TriangelUpdate = function(move,changle,i){
				var distance = triAngel[i].l*Math.sin(60*0.017453293);
				triAngel[i].x1 <= move?triAngel[i].x1 += 1*a:'';
				triAngel[i].x1 >= changle && triAngel[i].vx<=distance?triAngel[i].vx += distance*easing:'';
				triAngel[i].x1 >= changle && triAngel[i].vy<=triAngel[i].l/3?triAngel[i].vy += triAngel[i].l/3*easing:'';
				a>2?a -= 3*0.03:'';
			}

			var layer3Line = [{
					sx : 200,
					sy : 100,
					ex : 200,
					ey : 100,
					l : 0
				},
				{
					sx : 200,
					sy : 230,
					ex : 200,
					ey : 230,
					l : 0
				},
				{
					sx : 100,
					sy : 50,
					ex : 100,
					ey : 50,
					l : 0
				}
			]

			drawLayer3Line = function(sx,sy,ex,ey,i,width,color){
				var distance = layer3Line[i].l*Math.sin(60*0.017453293);
				layer3.strokeStyle = color;
				layer3.lineWidth = width;
				layer3.beginPath()
				layer3.moveTo(sx,sy);
				layer3.lineTo(distance+ex,ey);
				layer3.stroke()
			}

			layer3LineUpdate = function(i,maxDistance){
				var distance = layer3Line[i].l*Math.sin(60*0.017453293);
				distance <= maxDistance?layer3Line[i].l+=20:'';
				distance > maxDistance-10 && layer3Line[i].sx < distance+layer3Line[i].ex ?layer3Line[i].sx+=distance*0.04:'';
			}
			
			var maskP = 0;
			drawMask = function(){
				mask.beginPath()
				mask.moveTo(0,CA4.height)
				mask.lineTo(maskP,CA4.height)
				mask.lineTo(0,CA4.height-maskP)
				mask.fillStyle = 'rgba(0,3,43,1)'
				mask.fill()
			}
			var maskFlag = true;
			var maskEasing = 0.05;
			
			maskUpdate = function(){
				maskFlag == true && maskP<2*CA4.width?maskP+=(2*CA4.width-maskP)*maskEasing:'';
				maskP>=2*CA4.width-300?maskFlag = false:'';
				maskFlag == false?maskP-=(2*CA4.width-maskP)*maskEasing:'';
			}

			function start(){
				layer1.clearRect(cp.x-200,cp.y-200,cp.x+400,cp.y+400);
				layer2.clearRect(cp.x-200,cp.y-200,cp.x+400,cp.y+400);
				layer3.clearRect(0,-100,500,500);
				mask.clearRect(0,0,CA4.width,CA4.height)

				drawLayer1Round();
				Layer1RoundColorChange();

				if(roundColor.r<=40 && roundColor.g <= 76 && roundColor.b <= 92){
					rotateImg();
				}
				if(roundColor.r<=0 && roundColor.g <= 36 && roundColor.b <= 52){
					drawLayer1RoundBorder();
					Layer1RoundBorderUpdate();
				}
				if(angle <= 30 && lineLength <=30){
					Layer2FireWorksLineUpdate(fireWorksLine1)
					addLayer2FireWorksLine(20,startPostion,lineLength,fireWorksLine1,fwrp1.x,fwrp1.y);
					drawLayer2FireWorks(fireWorksLine1,'rgba(0,255,255,1)');
				}

				if(angle <= 5 && lineLength <=30){
					Layer2FireWorksLineUpdate(fireWorksLine2)
					addLayer2FireWorksLine(10,startPostion,lineLength,fireWorksLine2,fwrp2.x,fwrp2.y);
					drawLayer2FireWorks(fireWorksLine2,'rgba(255,125,120,1)');
				}

				if(lineLength >=28 && layer2Round1.r < 30){
					drawLayer2Round(layer2Round1.x,layer2Round1.y,layer2Round1.r,'rgba(233,200,65,1)',6);
					layer2Round1Update();
				}

				if(layer2Round2.r <= 60){
					drawLayer2Round(layer2Round2.x,layer2Round2.y,layer2Round2.r,'rgba(12,200,232,1)',2);
					layer2Round2Update();
				}

				if(layer2Round2.r >= 50 && triAngel[0].vy<=triAngel[0].l/3){
					drawLayer3Triangel(triAngel[0].x1,triAngel[0].y1,triAngel[0].l,triAngel[0].vx,triAngel[0].vy,'#e56');
					layer3TriangelUpdate(220,150,0);
					drawLayer3Triangel(triAngel[1].x1,triAngel[1].y1,triAngel[1].l,triAngel[1].vx,triAngel[1].vy,'rgba(0,255,255,1)');
					layer3TriangelUpdate(300,250,1);
					drawLayer3Triangel(triAngel[2].x1,triAngel[2].y1,triAngel[2].l,triAngel[2].vx,triAngel[2].vy,'#e56');
					layer3TriangelUpdate(220,180,2);
					drawLayer3Triangel(triAngel[3].x1,triAngel[3].y1,triAngel[3].l,triAngel[3].vx,triAngel[3].vy,'rgba(0,255,255,1)');
					layer3TriangelUpdate(300,250,3);
				}

				if(layer2Round2.r >= 50 && layer3Line[0].sx <= 400){
					drawLayer3Line(layer3Line[0].sx,layer3Line[0].sy,layer3Line[0].ex,layer3Line[0].ey,0,6,'#e56');
					layer3LineUpdate(0,200);
					drawLayer3Line(layer3Line[1].sx,layer3Line[1].sy,layer3Line[1].ex,layer3Line[1].ey,1,3,'rgba(0,255,255,1)');
					layer3LineUpdate(1,200);
					drawLayer3Line(layer3Line[2].sx,layer3Line[2].sy,layer3Line[2].ex,layer3Line[2].ey,2,4,'rgba(212,99,216,1)');
					layer3LineUpdate(2,200);
				}

				if(layer3Line[0].sx >= 400){
					drawLayer1Light();
					Layer1LightUpdate();
				}

				if(lightV>=200){
					drawMask();
					maskUpdate();
				}

				if(maskFlag==false){
					CA.style.display = 'none';
					CA2.style.display = 'none';
					CA3.style.display = 'none';
					document.getElementById('wel').style.display = 'none';
					document.getElementById('chocolateCont').style.display = 'block';
					document.getElementById('slide-img').style.opacity = '1';
					window.tElement.style.opacity = '1';
				}

				mainAnimation = requestAnimationFrame(start);

				if(maskP<=0 && maskFlag == false){
					CA4.style.display = 'none';
					document.getElementById('menu').style.zIndex = 7;
					cancelAnimationFrame(mainAnimation);
					document.getElementById('audio-view').style.height ='51px';
					document.getElementById('line').style.width = '100%';
					document.getElementById('line').addEventListener('transitionend',function(){
						document.getElementById('now').style.opacity = '1';
						document.getElementById('next').style.opacity = '1';
					});
					main();
				}
			}
			addBorder();
			start();
}

