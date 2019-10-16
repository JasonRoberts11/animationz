
function renderRect(x,y,wid,hig,col,b){
    ctx.lineJoin = "round";
	ctx.fillStyle=colors[col];
	if(col==6){
		ctx.fillStyle="#EEEEEE";
	}
    ctx.strokeStyle=color2s[col];
	if(b!=null){
		ctx.fillStyle=color2s[col];
		ctx.strokeStyle=colors[col];
	}
    ctx.fillRect(x-wid/2,y-hig/2,wid,hig);
    ctx.strokeRect(x-wid/2,y-hig/2,wid,hig);
}
function renderRoundRect(x,y,wid,hig,col,b){
    ctx.lineJoin = "round";
	ctx.fillStyle=colors[col];
    ctx.strokeStyle=color2s[col];
	if(b!=null){
		ctx.fillStyle=color2s[col];
		ctx.strokeStyle=colors[col];
	}
	ctx.beginPath();
	ctx.moveTo(x-wid/2,y-hig/2);
	ctx.lineTo(x+wid/2,y-hig/2);
	ctx.arc(x+wid/2,y,hig/2,Math.PI*1.5,Math.PI*0.5);
	ctx.lineTo(x-wid/2,y+hig/2);
	ctx.arc(x-wid/2,y,hig/2,Math.PI*0.5,Math.PI*1.5);
    ctx.fill();
    ctx.stroke();
}
function renderText(txt,x,y,a,col,siz){
    ctx.fillStyle=colors[col];
    ctx.font = 'bold '+siz+'px Abel, sans-serif';
    ctx.textBaseline='middle';
    if(a=='c'){
        ctx.textAlign='center';
    }if(a=='l'){
        ctx.textAlign='left';
    }if(a=='r'){
        ctx.textAlign='right';
    }
    ctx.fillText(txt,x,y);
    return ctx.measureText(txt);
}
function renderTri(x,y,siz,col){
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle=colors[col];
    ctx.strokeStyle=color2s[col];
    ctx.beginPath();
    ctx.moveTo(x,y+siz);
    ctx.lineTo(x+siz,y-siz);
    ctx.lineTo(x-siz,y-siz);
    ctx.lineTo(x,y+siz)
    ctx.stroke();
    ctx.fill();
}
function renderDia(x,y,siz,col){
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle=colors[col];
    ctx.strokeStyle=color2s[col];
    ctx.beginPath();
    ctx.moveTo(x,y+siz);
    ctx.lineTo(x+siz,y);
    ctx.lineTo(x,y-siz);
    ctx.lineTo(x-siz,y);
    ctx.lineTo(x,y+siz);
    ctx.stroke();
    ctx.fill();
}
function renderCir(x,y,siz,col){
    ctx.fillStyle=colors[col];
    ctx.strokeStyle=color2s[col];
    ctx.beginPath();
    ctx.arc(x,y,siz,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
}
