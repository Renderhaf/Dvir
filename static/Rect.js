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
        this.maxS = 3.2;
        this.maxP = 0.025;
        this.accdiv = 0.0001;
        this.closeF = 0.99;
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
        let dist = Math.hypot(this.x-this.targetX, this.y-this.targetY);
        if (dist < 175){
            this.Xspeed *= this.closeF;
            this.Yspeed *= this.closeF;
        }
        this.x += this.Xspeed
        this.y += this.Yspeed

        this.Xspeed += this.Xacc
        this.Yspeed += this.Yacc
        
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
    seek(){
        this.Xacc = (this.targetX - this.x)/this.accdiv;
        this.Yacc = (this.targetY - this.y)/this.accdiv;

        this.Xspeed = this.tops(this.Xspeed, this.maxS);
        this.Yspeed = this.tops(this.Yspeed, this.maxS);

        this.Xacc = this.tops(this.Xacc, this.maxP);
        this.Yacc = this.tops(this.Yacc, this.maxP);
    }
    
}