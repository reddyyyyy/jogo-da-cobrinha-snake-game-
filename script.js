window.onload = function(){ //  quando a janela carregar...
    //canvas:
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");

    // chamar functions:
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    // variaveis:
    const vel = 1;
    const audio_come = new Audio;
    audio_come.src = './audios/eat.mp3';
    const audio_morre = new Audio;
    audio_morre.src = './audios/dead.mp3';
    const audio_up = new Audio;
    audio_up.src = './audios/up.mp3';
    const audio_down = new Audio;
    audio_down.src = './audios/down.mp3';
    const audio_left = new Audio;
    audio_left.src = './audios/left.mp3';
    const audio_right = new Audio;
    audio_right.src = './audios/right.mp3';

    var vx = vy = 0;
    var px =10;
    var py = 10;
    var tp = 30;
    var qp = 20;
    var ax=15;
    var ay=10;
    var bx=5;
    var by=10;
    var score = 0;
    var best = 0;

    var trail = [];
    tail = 5;


    // jogo:
    function game(){
        px += vx;
        py += vy;
        
            // paredes:
        if (px <0) {
            px = qp-1;
        }
        if (px > qp-1) {                            
            px = 0;
        }
        if (py < 0) {
            py = qp-1;
        }
        if (py > qp-1) {
            py = 0;
        }

            //desenha fundo:
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, stage.width, stage.height);

            // desenha maçã:
        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);

            //desenhar bomba:
        ctx.fillStyle = "blue";
        ctx.fillRect(bx*tp, by*tp, tp,tp);


            // desenhar a cobra:
        ctx.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[i].x == px && trail[i].y == py)
            {
                bx = 5;
                by = 10;
                ax = 15;
                ay = 10;
                py = 10;
                px = 10;
                vx = vy=0;
                tail =5;
                score = 0;
            };
        }

        trail.push({x:px,y:py })
        //  diminuir rastro:
        while (trail.length > tail) {
            trail.shift();
        }


            // IFs:
        if (ax==px && ay==py){
            audio_come.play();
            tail++;
            score++;
            if (score > best) {
                best++;
            };
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
            bx = Math.floor(Math.random()*qp);
            by = Math.floor(Math.random()*qp);
        };

        if (bx==px && by==py){
            tail =5;
            score = 0;
            vx = vy=0;
            bx = Math.floor(Math.random()*qp);
            by = Math.floor(Math.random()*qp);
            gameover();
        }

    };

    function gameover() {
        audio_morre.play();
    };

        // movimentação:
    function keyPush(event){

        switch (event.keyCode) {
            case 37: // Left:
                audio_left.play();
                vx = -vel;
                vy = 0;
                break;
            case 38: // up:
                audio_up.play();
                vx = 0;
                vy = -vel;
                break;
            case 39: // right:
                audio_right.play();
                vx = vel;
                vy = 0;
                break;
            case 40: // down:
                audio_down.play();
                vx = 0;
                vy = vel;
                break;          
            default:
                
                break;
        };

    };
    
    // desenha placar:
    function drawplacar() {
        // score:
        ctx.font = '35px "VT323"';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.fillText(`score: ${score}`, stage.width - 10, 35);

        //best :
        ctx.font = '35px "VT323"';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.fillText(`best: ${best}`, stage.width - 480, 35);

        // loop:
        requestAnimationFrame(drawplacar);
    };

    drawplacar();
} // fim do script
