function getBodyColor(){
    var color = "";
    if(skinStatus == "rad"){
    var colors = ["red","orange","yellow","green","blue","purple"];
    var rand = Math.floor(Math.random() * colors.length);
    color = colors[rand];
    }
    else if(skinStatus == "default"){
        color = "white";
    }
    return color;
}
function getHeadColor(){
    var color = "";
    if(skinStatus == "rad"){
    var colors = ["red","orange","yellow","green","blue","purple"];
    var rand = Math.floor(Math.random() * colors.length);
    color = colors[rand];
    }
    else if(skinStatus == "default"){
       color="#656565";
    }
    return color;
}
function getAppleColor(){
    var color = "";
    var colors = ["red","orange","yellow","green","blue","purple"];
    var rand = Math.floor(Math.random() * colors.length);
    color = colors[rand];
    return color;
}
function getSkinStatus(){
    return skinStatus;
}
function init(){
    skinStatus = getSkinStatus();
    var canvas = document.getElementById("mycan");
    $w=canvas.width=500;
    $h=canvas.height=500;
    pen = canvas.getContext('2d');
    state = "reset";
    hscore = Math.max(score,hscore);
    pen.font = "30px roboto"
    pen.fillText(hscore,20,50);
    score = 0;
    gameOver = false;
    window.addEventListener('keydown',keyPressed);
    $cs = 25;
    food = randomFood();
    snake = {
        len : 5,
        
        body_color : getBodyColor(),
        head_color : getHeadColor(),
        
        cells : [],
        direction : "right",
        createSnake:function(){
            
            for(let i = 0; i < snake.len;i++){
                snake.cells.push({x:i,y:0});
            }

        },
        drawSnake:function(){
            for(let i = 0; i < snake.cells.length;i++){
                if(i == snake.cells.length-1){
                    pen.fillStyle = snake.head_color;
                }
                else{
                    pen.fillStyle = snake.body_color;
                }
                pen.fillRect(this.cells[i].x * $cs,this.cells[i].y * $cs,$cs -2,$cs - 2);
            }
        },
        updateSnake:function(){
            var headX = snake.cells[snake.cells.length-1].x;
            var headY = snake.cells[snake.cells.length-1].y;
            if(headX == food.x && headY == food.y){
                food = randomFood();
                score++;
            }
            else{
                snake.cells.shift();}

            if(snake.direction == "right"){
                X = headX + 1;
                Y = headY;
            }
            else if(snake.direction == "left"){
                X = headX - 1;
                Y = headY;
            }
            else if(snake.direction == "up"){
                X = headX;
                Y = headY - 1;
            }
            else if(snake.direction == "down"){
                X = headX;
                Y = headY + 1;
            }
            snake.cells.push({x : X,y : Y});
            eat = false;
        },
        

    }
    snake.createSnake();
    snake.drawSnake();
    function keyPressed(e){
        if(e.code=="ArrowUp"){
            if(snake.direction != "down"){
                snake.direction = "up";
            }
        }
        else if(e.code=="ArrowDown"){
            if(snake.direction != "up"){
                snake.direction = "down";
            }
        }
        else if(e.code=="ArrowRight"){
            if(snake.direction != "left"){
                snake.direction = "right";
            }
        }
        else if(e.code=="ArrowLeft"){
            if(snake.direction != "right"){
                snake.direction = "left";
            }
        }
    }
    
}

function update(){
    if( snake.cells[snake.cells.length -1].x < 0 || 
        snake.cells[snake.cells.length -1].x >= $w/$cs || 
        snake.cells[snake.cells.length -1].y < 0 || 
        snake.cells[snake.cells.length -1].y >= $h/$cs){ 
        gameOver = true;
    }
    
    snake.updateSnake();
    
}
function draw(){
    pen.clearRect(0,0,$w,$h);
    pen.fillStyle = snake.body_color;
    snake.drawSnake();
    food.draw();
    pen.font = "30px roboto";
    pen.fillStyle = "white"
    pen.fillText(score,450,50);
	
}
function randomFood(){
    foodX = Math.floor(Math.random() * ($w/$cs));
    foodY = Math.floor(Math.random() * ($h/$cs));
    food = {
        x : foodX,
        y : foodY,
        color : getAppleColor(),
        draw : function(){
            pen.fillStyle = this.color;
            pen.fillRect(this.x * $cs,this.y * $cs,$cs -2,$cs -2);
        },
    }
    return food;
    
}
function gameloop(){
    draw(); 
    update();
    if( gameOver ){
        window.alert("Game Over");
        clearInterval(f);
    }
}
function startGame(){
    if(state!= "start"){
        state = "start";
        f=setInterval(gameloop,100);
    }
    
}
function resetGame(){
    state = "reset";
    clearInterval(f);
    init();
}
score = 0;
hscore = 0;
skinStatus = "default";
state = "reset";
init();
start = document.getElementById("start").addEventListener("click",startGame);
reset = document.getElementById("reset").addEventListener("click",resetGame);


defaultSkin = document.getElementById("dSkin").addEventListener("click",function(){
    skinStatus = "default";
    if(state == "reset"){
        resetGame();
    }
});
radSkin = document.getElementById("rSkin").addEventListener("click",function(){
    skinStatus = "rad";
    if(state == "reset"){
        resetGame();
    }
}
);


