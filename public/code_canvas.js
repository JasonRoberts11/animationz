function renderCanvas(){
    ctx.fillStyle=("#203040")
    ctx.fillRect(0,0,1000,1000);
	let af = "";
	for (i=0;i<blockInsts.length;i++)
	{
		let bi = blockInsts[i];
		bi.render(1,100,100);
		if(bi.focus!="not"){
			af = i+","+bi.focus;
		}
	}
	for(i=0;i<links.length;i++){
		let li = links[i];
		li.render();
		if(mouseMode=="slice"){
			li.check();
		}
	}
	if(mouseMode=="inLine"){
		let startpos = getBlk(startBlk).getPos(false,startNum);
		ctx.strokeStyle = "#FFFFFF"
		ctx.beginPath();
		ctx.moveTo(startpos.x,startpos.y);
		ctx.lineTo(mouse.X,mouse.Y);
		ctx.stroke();
	}
	if(mouseMode=="outLine"){
		let startpos = getBlk(startBlk).getPos(true,startNum);
		ctx.strokeStyle = "#FFFFFF"
		ctx.beginPath();
		ctx.moveTo(startpos.x,startpos.y);
		ctx.lineTo(mouse.X,mouse.Y);
		ctx.stroke();
	}
	if(mouseMode=="slice"){
		ctx.strokeStyle = "#FF0000"
		ctx.beginPath();
		ctx.moveTo(startPos.x,startPos.y);
		ctx.lineTo(mouse.X,mouse.Y);
		ctx.stroke();
	}
	af = renderSideBar(af);
	if(af!=afocus){
		afocus=af.split(',');
		console.log(af);
	}
	if(afocus[1]=="main"){
		blockInsts[afocus[0]].bright();
	}
		
}


function renderSideBar(af){
	let arf=af;
	for(i=0;i<blockPrefs.length;i++){
		let widd = renderText(blockPrefs[i].data.name,20,60+i*25,'l',6,15).width;
		renderRect(20+widd/2,60+i*25,widd+10,20,blockPrefs[i].data.color);
		if(mouseMode=="none"){
			if(mouseInBox(20+widd/2,60+i*25,widd+10,20,blockPrefs[i].data.color)){
				renderRect(20+widd/2,60+i*25,widd+10,20,blockPrefs[i].data.color,1);
				arf="sidebar,"+i;
			}
		}
		renderText(blockPrefs[i].data.name,20,60+i*25,'l',6,15);
	}
	return arf;
}

function startCode(){
	getBlkByName("On Start").run();
}
document.getElementById("startbutton").onclick= function (){console.log("start");startCode();};


const colors = ['#F1948A','#C39BD3','#85C1E9','#76D7C4','#F8C471','#222222','#FFFFFF','#CCCCCC'];
const color2s = ['#E74C3C','#9B59B6','#3498DB','#1ABC9C','F39C12','#000000','#CCCCCC','#AAAAAA'];
const canvas=document.getElementById("code_canvas");
const ctx = canvas.getContext("2d");
var canwid = canvas.width;
var canhig = canvas.height;
var slideup = 0;
let mscale=1;
let mx=0;
let my=0;
let afocus=[];
let mouseMode="none";
let mmouseMode="none";
let blockPrefs = [];
let blockInsts = [];
let links = [];
let draggedBlk=null;
let dbid=-1;
let startBlk=-1;
let startNum=-1;
let startPos={};
let lastblockid=5;
let lastlinkid=0;
let mouse = {
	"X":0,
	"Y":0,
	"dX":0,
	"dY":0,
	"Lstate":0,
	"Rstate":0
};
let Keys={};
canvas.addEventListener("mousemove",moveMouse);
canvas.addEventListener("mousedown",mouseDown);
canvas.addEventListener("mouseup",mouseUp);
canvas.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
canvas.addEventListener("wheel",wheel);
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
canvas.focus();
let mainLoop = setInterval(neFrame,15);
function keyDown(e){
	e.preventDefault();
	Keys[e.key] = true;
}
function keyUp(e){
	e.preventDefault();
	Keys[e.key] = false;
}
function wheel(e){
	e.preventDefault();
	//console.log(Math.sign(e.deltaY));
	if(e.deltaY<0){
		let sf=1/1.10;
		mx-=mouse.X/mscale*(sf-1);
		my-=mouse.Y/mscale*(sf-1);
		mscale/=sf;
	}else{
		let sf=1.10;
		mx-=mouse.X/mscale*(sf-1);
		my-=mouse.Y/mscale*(sf-1);
		mscale/=sf;
	}
	renderCanvas();
}

function neFrame(){
	if(Keys.ArrowRight){
		mx+=10/mscale;
	}
	if(Keys.ArrowLeft){
		mx-=10/mscale;
	}
	if(Keys.z){
		let sf=1/1.05;
		mx-=mouse.X/mscale*(sf-1);
		my-=mouse.Y/mscale*(sf-1);
		mscale/=sf;
	}
	if(Keys.q){
		let sf=1.05;
		mx-=mouse.X/mscale*(sf-1);
		my-=mouse.Y/mscale*(sf-1);
		mscale/=sf;
	}
	renderCanvas();
}
function moveMouse(e){
	canvas.focus();
	e.preventDefault();
	mouse.dX = e.offsetX-mouse.X;
	mouse.dY = e.offsetY-mouse.Y;
	mouse.X = e.offsetX;
	mouse.Y = e.offsetY;
	if(mouseMode=="drag"&&mmouseMode!="cam"){
		
		draggedBlk.x+=mouse.dX/mscale;
		draggedBlk.y+=mouse.dY/mscale;
	}
	
	if(mmouseMode=="cam"){
		mx-=mouse.dX/mscale;
		my-=mouse.dY/mscale;
	}
	renderCanvas();
}
function mouseDown(e){
	e.preventDefault();
	mouse.X = e.offsetX;
	mouse.Y = e.offsetY;
	if(e.button==0){
		mouse.Lstate=2;	
		if(afocus[1]=="main"&&mouseMode=="none"){
			mouseMode="drag";
			draggedBlk=blockInsts[afocus[0]];
			dbid=afocus[0];
			blockInsts.push(blockInsts.splice(dbid,1)[0]);
			
		}
		if(afocus[1]=="output"&&mouseMode=="none"){
			mouseMode="outLine";
			startBlk=blockInsts[afocus[0]].id;
			startNum=afocus[2]-0;
			blockInsts.push(blockInsts.splice(dbid,1)[0]);
		}
		if(afocus[1]=="out"&&mouseMode=="none"){
			mouseMode="outLine";
			startBlk=blockInsts[afocus[0]].id;
			startNum=-1;
			blockInsts.push(blockInsts.splice(dbid,1)[0]);
		}
		
		if(afocus[0]=="sidebar"&&mouseMode=="none"){
			mouseMode="drag";
			let type= 0 + afocus[1]-0;
			let newblock = new blockInst(blockPrefs[type],mouse.X/mscale+mx,mouse.Y/mscale+my,lastblockid);
			lastblockid++;
			blockInsts.push(newblock);
			draggedBlk=newblock;
			dbid=afocus[1];
			
		}
	}
	if(e.button==1){	
		if(mmouseMode=="none"){
			mmouseMode="cam";
		}
	}
	if(e.button==2&&afocus[0]==""){	
		if(mouseMode=="none"){
			mouseMode="slice";
			startPos={"x":mouse.X,"y":mouse.Y};
		}
	}
}
function mouseUp(e){
	e.preventDefault();
	mouse.X = e.offsetX;
	mouse.Y = e.offsetY;
	if(e.button==0){
		mouse.Lstate=0;	
		if(mouseMode=="drag"){
			draggedBlk=null;
			mouseMode="none";
		}
		if(mouseMode=="inLine"){
			if(afocus[1]=="output"){
				let endBlk =blockInsts[afocus[0]].id;
				let endNum= afocus[2]-0;
				links.push(new linkInst(endBlk,endNum,startBlk,startNum))
				startBlk=-1;
				startNum=-1;
			}
			mouseMode="none"
		}
		if(mouseMode=="outLine"){
			if(afocus[1]=="input"){
				let endBlk =blockInsts[afocus[0]].id;
				let endNum=afocus[2]-0;
				links.push(new linkInst(startBlk,startNum,endBlk,endNum))
				startBlk=-1;
				startNum=-1;
			}
			if(afocus[1]=="in"){
				let endBlk =blockInsts[afocus[0]].id;
				let endNum=-1;
				links.push(new linkInst(startBlk,startNum,endBlk,endNum))
				startBlk=-1;
				startNum=-1;
			}
			mouseMode="none"
		}
	}
	if(e.button==1){
		if(mmouseMode=="cam"){
			mmouseMode="none";
		}
	}
	
	if(e.button==2){
		if(mouseMode=="slice"){
			for(i=0;i<links.length;i++){
			let li = links[i];
			if(li.check()){
				links[i].disconnect();
				links.splice(i,1);
				i--;
			}

			}
			mouseMode="none";
		}
	}
}

function setUpCanvas(){

    let a = ALLBLOCKS;
    blockPrefs.push(new blockPref(a.otb,0));
	blockPrefs.push(new blockPref(a.pnt,0));
	blockPrefs.push(new blockPref(a.start,0));
	blockPrefs.push(new blockPref(a.txt,0));
    //blockPrefs[0].render(1,100,100);
	blockInsts.push(new blockInst(blockPrefs[0],100,100,0));
	blockInsts.push(new blockInst(blockPrefs[1],100,200,3));
	blockInsts.push(new blockInst(blockPrefs[2],100,200,4));
	blockInsts.push(new blockInst(blockPrefs[3],300,300,1));
	blockInsts.push(new blockInst(blockPrefs[0],500,100,2));
}
window.onload = setUpCanvas();

function linkInst(id0,num0,id1,num1){
	this.fr=id0;
	this.to=id1;
	this.frn=num0;
	this.ton=num1;
	this.id=lastlinkid;
	console.log(num0);
	if(num0==-1){
		getBlk(id0).rinlinks.push(this.id);
	}
	if(num1==-1){
		getBlk(id1).routlinks.push(this.id);
	}
	//TODO add params
	lastlinkid++;
	this.render=function(){
		//let startblk = getBlk(this.fr);
		//console.log(startblk.getPos(true,this.frn));
		let startpos = getBlk(this.fr).getPos(true,this.frn);
		let endpos = getBlk(this.to).getPos(false,this.ton);
		ctx.strokeStyle = "#FFFFFF"
		ctx.beginPath();
		ctx.moveTo(startpos.x,startpos.y);
		ctx.lineTo(endpos.x,endpos.y);
		ctx.stroke();
	}
	this.disconnect=function(){
		getBlk(id0).rinlinks = getBlk(id0).rinlinks.filter(function(e){return e!=this.id});
		getBlk(id1).routlinks = getBlk(id1).routlinks.filter(function(e){return e!=this.id});
	}
	this.check=function(){
		let startpos = getBlk(this.fr).getPos(true,this.frn);
		let endpos = getBlk(this.to).getPos(false,this.ton);
		let ar = checkIntersection(startPos.x,startPos.y,mouse.X,mouse.Y,startpos.x,startpos.y,endpos.x,endpos.y);
		if(ar){
			ctx.strokeStyle = "#FF00FF"
		ctx.beginPath();
		ctx.moveTo(startpos.x,startpos.y);
		ctx.lineTo(endpos.x,endpos.y);
		ctx.stroke();
		}
		return ar;
		//u=(p-q) x r /(s x r) where p and q are start, r and s are dist, and u is the intersection from q
	}

}
function checkIntersection(px,py,rax,ray,qx,qy,sax,say){
	let rx = rax-px;
	let ry = ray-py;
	let sx = sax-qx;
	let sy = say-qy;
	let u = ((px-qx)*ry-(py-qy)*rx)/(sx*ry-sy*rx);
	let t = ((qx-px)*sy-(qy-py)*sx)/(rx*sy-ry*sx);
	return(u>0&&u<1&&t>0&&t<1);
	
}
function getBlk(id){
	let mat = null;
	for(let i =0 ; i < blockInsts.length;i++){
		if(blockInsts[i].id==id){
			mat=blockInsts[i];
		}
	}
	return mat;
}
function getBlkByName(name){
	let mat = null;
	for(let i =0 ; i < blockInsts.length;i++){
		if(blockInsts[i].bp.data.name==name){
			mat=blockInsts[i];
		}
	}
	return mat;
}
function getLinkById(linkid){
	let mat = null;
	for(let i =0 ; i < links.length;i++){
		if(links[i].linkid==linkid){
			mat=links[i];
		}
	}
	return mat;

}
function mouseInBox(x,y,wid,hig){
	return (Math.abs(mouse.X-x)<wid/2&&Math.abs(mouse.Y-y)<hig/2);
}
function mouseInCircle(x,y,r){
	return ((mouse.X-x)*(mouse.X-x)+(mouse.Y-y)*(mouse.Y-y)<r*r);
}
