class Partical{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.xa = 0.0;
    this.ya = 0.0;
    this.xs = 0.0;
    this.ys = 0.0;
    this.maxS = 5;
    this.maxP = 0.04;
    this.accdiv = 0.0001;
    this.randmult = 0.1;
    this.friction = 0.985;
  }
  update(){
    this.xs += this.xa;
    this.ys += this.ya;

    this.x += this.xs;
    this.y += this.ys;

    this.xs *= this.friction;
    this.ys *= this.friction;

    this.xa = 0;
    this.ya = 0;
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
  seek(tx, ty){
    this.xa = (tx - this.x)/this.accdiv;
    this.ya = (ty - this.y)/this.accdiv;

    this.xs = this.tops(this.xs, this.maxS);
    this.ys = this.tops(this.ys, this.maxS);

    this.xa = this.tops(this.xa, this.maxP) + (Math.random() * this.randmult * 2) - this.randmult;
    this.ya = this.tops(this.ya, this.maxP) + (Math.random() * this.randmult * 2) - this.randmult;
  }
}
