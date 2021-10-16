


function init(){
    canvas = document.getElementById("mycan");
    game_over = false;
    pen = canvas.getContext('2d');
    window.addEventListener('keydown',f2);
    
    xi=0;
    yi=0;
    
    
    canvas.width=500;
    canvas.height=500;

    rect ={
        x:10,
        y:10,
        w:25,
        h:25,
        xspeed:10,
        yspeed:10
    }

}
function f2(e){
    
    if(e.code == 'ArrowUp'){
        yi=-1;
        xi=0;
    }
    else if (e.code == 'ArrowDown'){
        yi=1;
        xi=0;
    }
    else if (e.code == 'ArrowLeft'){
        yi=0;
        xi=-1;
    }
    else if(e.key == 'ArrowRight'){
        yi=0;
        xi=1;
    }
}
function draw(){
    pen.clearRect(0,0,canvas.width,canvas.height);
    pen.fillStyle="white";
    pen.fillRect(rect.x,rect.y,rect.w,rect.h);
}
function update(){
     if(rect.x<0 || rect.x>canvas.width - rect.w || rect.y<0 || rect.y>canvas.width - rect.h ){
         game_over=true;
     }
     rect.x+=xi*rect.xspeed;
     rect.y+=yi*rect.yspeed;
}
function gameloop(){
    draw();
    update();
    
    if(game_over){
        clearInterval(f);
    }
    console.log("frame");
}
init();

var f=setInterval(gameloop,100);


