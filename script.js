window.onload = function(){
 
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const vel = 1;

    var vx = vy = 0;
    var px =10;
    var py = 15;
    var tp = 30;
    var qp = 20;
    var ax=ay=15;
    var bx=by=12;
    var score = 0;
    var best = 0;

    var trail = [];
    tail = 5;

    function game(){
        px += vx;
        py += vy;
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

        ctx.fillStyle = "gray";
        ctx.fillRect(0,0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);

        ctx.fillStyle = "blue";
        ctx.fillRect(bx*tp, by*tp, tp,tp);

        ctx.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[i].x == px && trail[i].y == py)
            {
                vx = vy=0;
                tail =5;
                score = 0;
            }
        }

        trail.push({x:px,y:py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax==px && ay==py){
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
        }

    }

    function keyPush(event){

        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;          
            default:
                
                break;
        };

    };

    function drawplacar() {
        // score
        ctx.font = '35px "VT323"';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.fillText(`score: ${score}`, stage.width - 10, 35);

        //best 
        ctx.font = '35px "VT323"';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.fillText(`best: ${best}`, stage.width - 480, 35);

        requestAnimationFrame(drawplacar);
    };

    drawplacar();
}
