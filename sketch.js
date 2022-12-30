var colors = "f7d1cd-e8c2ca-d1b3c4-b392ac-735d78".split("-").map(a=>"#"+a)
var colors_r = "7b2cbf-9d4edd-c77dff-e0aaff".split("-").map(a=>"#"+a)
var colors_r_r = "10002b-240046-3c096c-5a189a".split("-").map(a=>"#"+a)
var clr,clr_r,clr_r_r

var positionX =[]
var positionY =[]
var clrList =[]
var clr_r_List =[]
var clr_r_r_List =[]
var sizeList =[]

var m_x,m_y
var song
var songIsplay=false //設定此變數為"假"，收到按下滑鼠把變數改為"真"，音樂播放
var amp
var vol=0
var music_btn,mouse_btn,Speech_btn
var musicIsplay=true
var mouseIsplay=true
var myRec = new p5.SpeechRec();
var result
function preload(){
  song = loadSound("01.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);//將方位度數改為角度模式

  music_btn = createButton("播音樂")
  music_btn.position(10,10)
  music_btn.size(350, 100);
  music_btn.style('background-color', 'black');
  music_btn.style('font-size', '44px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("暫停")
  mouse_btn.position(370,10)
  mouse_btn.size(350, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '44px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)

  Speech_btn = createButton("語音辨識(播音樂/暫停)")
  Speech_btn.position(740,10)
  Speech_btn.size(350, 100);
  Speech_btn.style('background-color', 'black');
  Speech_btn.style('font-size', '32px');
  Speech_btn.style('color', 'white');
  Speech_btn.mousePressed(Speech_btn_pressed)

  
}
function music_btn_pressed(){  
  song.stop()
  song.play()
  songIsplay = true
  musicIsplay = false
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#00b4d8');
  mouse_btn.style('background-color', 'black');
}

function mouse_btn_pressed(){  
  song.pause()
  musicIsplay = true
  songIsplay = false
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', '#00b4d8');

 
}

function Speech_btn_pressed(){ 
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', 'black');
  Speech_btn.style('background-color', '#00b4d8');
  myRec.onResult = showResult;
  myRec.start();
}

function showResult()
	{
		if(myRec.resultValue==true) {
			// background(192, 255, 192);
			// text(myRec.resultString, width/2, height/2);
      push()
        translate(0,0)
        background(192, 255, 192);
        fill(255,0,0)
        textStyle("italic")
        text(myRec.resultString,1200,10);
        text(myRec.resultString,0, height/2);
      pop()
      result = myRec.resultString
      if(myRec.resultString==="播音樂")
      {
        music_btn_pressed()
      }
      if(myRec.resultString==="暫停")
      {
        song.pause()
        mosueIsplay = true
        songIsplay = false
        }
		}
	}



function draw() {
  background("#f2cc8f");  
  
  push()
  textSize(50)
  fill(255,0,0)  
  text(result,1100,100);   
pop()

if(songIsplay){
  vol = amp.getLevel()
  m_x =map(vol,0,1,0,width) 
  m_y= map(vol,0,1,0,height)
  
}
else
if(mouseIsplay)
{
  m_x = mouseX
  m_y= mouseY

}

  for(var j=0;j<5;j++){
    positionX.push(random(width))
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    clr_r_r_List.push(colors_r_r[int(random(colors_r_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionX[j],positionY[j]) //原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      clr_r_r = clr_r_r_List[j]
      drawFlower(clr,clr_r,clr_r_r,sizeList[j])
    pop()
    }
  
  
}

function drawFlower(clr,clr_r,clr_r_r,size=1){
  push()
    scale(size) //縮放
    fill(255)
        ellipse(719+m_x/15,348+ m_y/15,300)//身體大圓
        ellipse(712+m_x/15,158+ m_y/15,200)//身體小圓
        ellipse(664+m_x/15,131+ m_y/15,50)//左眼睛
        ellipse(759+m_x/15,137+ m_y/15,50)//右眼睛
      
        fill(255,0,0)//鼻子填滿紅色
         triangle(694+m_x/15,165+ m_y/15,729+m_x/15,164+ m_y/15,710+m_x/15,206+ m_y/15)
      
        fill(0)//肚子鈕扣，填滿黑色
         ellipse(717+m_x/15,309+ m_y/15,20)
         ellipse(718+m_x/15,363+ m_y/15,20)
         ellipse(716+m_x/15,418+ m_y/15,20)
      
        fill(0)//填滿黑色
         ellipse(664+m_x/15,129+ m_y/15,20)//左眼球
         ellipse(760+m_x/15,136+ m_y/15,20)//右眼球  
  pop()    
}