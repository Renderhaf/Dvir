class Rect{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.targetX = x;
        this.targetY = y;
        this.Xspeed = 0;
        this.Yspeed = 0;
        this.Xacc = 0;
        this.Yacc = 0;
        this.Isumx = 0;
        this.Isumy = 0;
        this.olderrx = 0;
        this.olderry = 0;
    }
    angRect(a){
        ctx.save();
        ctx.translate(this.x+this.w/2,this.y+this.h/2);
        ctx.rotate(a);
        ctx.fillRect(-1*this.w/2,-1*this.h/2,this.w,this.h);
        ctx.restore();
    }
    XYtoAng(x,y){
        return Math.atan(y/x);
    }
    update(){
        this.Xspeed += this.Xacc;
        this.Yspeed += this.Yacc;

        this.x += this.Xspeed
        this.y += this.Yspeed

        this.Xspeed *= 0.95;
        this.Yspeed *= 0.95;
    }

    tops(num,top){
        if (num > top){
            return top
        }
        else if (num < -top){
            return -top
        }
        else{
            return num
        }
    }

    seek(KP, KI, KD){
        var xerror = this.targetX - this.x;
        var xp = KP * (xerror);
        var xi = KI * (this.Isumx);
        var xd = KD * (this.olderrx - xerror);
        var xpid = xp + xi + xd;

        var yerror = this.targetY - this.y;
        var yp = KP * (yerror);
        var yi = KI * (this.Isumy);
        var yd = KD * (this.olderry - yerror);
        var ypid = yp + yi + yd;

        xpid = this.tops(xpid, 1);
        ypid = this.tops(ypid, 1);

        this.Xacc = xpid;
        this.Yacc = ypid;

        this.olderrx = xerror;
        this.olderry = yerror;
        this.Isumx += xerror;
        this.Isumy += yerror;
        return [xp,xi,xd,yp,yi,yd,xpid,ypid];
    }
    
}