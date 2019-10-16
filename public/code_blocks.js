
function blockPref(json,sid){
    this.data = json;
    this.sid=sid;
    this.render=function(scale,x,y,brg){
		
		let ffocus="not";
		if(this.data.shape==0){
        //console.log()
        let hig = Math.max(this.data.contents.length,this.data.output.length);
        
        let wid = renderText(this.data.name,x,y,'c',5,scale*15).width;
        if(this.data.width!=void(0)){
            wid=this.data.width;
        }
            ctx.lineWidth=3;
		if(mouseInBox(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color)){
			//renderRect(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color,1);
			ffocus="main";
		}
		renderRect(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color);
		if(brg!=null){
			renderRect(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color,1);
		};
		renderText(this.data.name,x,y,'c',6,scale*15).width;
		if(this.data.out_event){
        renderTri(x+(wid/scale+15)*scale*0.5,y,-scale*5,6);
			if(mouseInCircle(x+(wid/scale+15)*scale*0.5,y,scale*6)){
				renderTri(x+(wid/scale+15)*scale*0.5,y,-scale*5,7);
				ffocus="out";
			}
		}
		if(this.data.in_event){
		renderTri(x-(wid/scale+15)*scale*0.5,y,-scale*5,6);
			if(mouseInCircle(x-(wid/scale+15)*scale*0.5,y,scale*6)){
				renderTri(x-(wid/scale+15)*scale*0.5,y,-scale*5,7);
				ffocus="in";
			}
		}
		for(z=0;z<this.data.contents.length;z++){
            let a = this.data.contents[z];
            if(a.is_text){
                 renderText(a.text,x-wid/2,y+(z+1)*15*scale,'l',6,scale*10);
            }else{
                renderText(a.label,x-wid/2,y+(z+1)*15*scale,'l',6,scale*10);
                if(a.type==0){
                    renderCir(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
                if(a.type==1){
                    renderTri(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
                  if(a.type==2){
                    renderDia(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
				if(mouseInCircle(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*5)){
					ffocus="input,"+z;
					if(a.type==0){
						renderCir(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
					if(a.type==1){
						renderTri(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
					if(a.type==2){
						renderDia(x-wid/2-scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
				}
            }
        }
        for(z=0;z<this.data.output.length;z++){
            let a = this.data.output[z];
            
                renderText(a.label,x+wid/2,y+(z+1)*15*scale,'r',6,scale*10);
                if(a.type==0){
                    renderCir(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
                if(a.type==1){
                    renderTri(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
                if(a.type==2){
                    renderDia(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,6);
                }
				if(mouseInCircle(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*5)){
					ffocus="output,"+z;
					if(a.type==0){
						renderCir(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
					if(a.type==1){
						renderTri(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
					if(a.type==2){
						renderDia(x+wid/2+scale*7.5,y+(z+1)*15*scale,scale*3,7);
					}
				}
        }
		}
		if(this.data.shape==1){
			///TODO
			let hig = Math.max(this.data.contents.length,this.data.output.length-1);
			let labeltext = this.data.name;
			if(this.data.txt){
				labeltext = this.data.value;
			}
			let wid = renderText(labeltext,x,y,'c',5,scale*15).width;
			if(this.data.width!=void(0)){
				wid=this.data.width;
			}
				ctx.lineWidth=3;
			if(mouseInBox(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color)){
				//renderRect(x,y+hig*7.6*scale,wid+30*scale,20*scale+hig*15*scale,this.data.color,1);
				ffocus="main";
			}
			renderRoundRect(x,y+hig*7.6*scale,wid+10*scale,20*scale+hig*15*scale,this.data.color);
			if(brg!=null){
				renderRoundRect(x,y+hig*7.6*scale,wid+10*scale,20*scale+hig*15*scale,this.data.color,1);
			};
			renderText(labeltext,x,y,'c',6,scale*15).width;
			for(z=0;z<this.data.output.length;z++){
				let a = this.data.output[z];
                if(a.type==0){
                    renderCir(x+wid/2+scale*7.5,y+(z)*15*scale,scale*3,6);
                }
				if(mouseInCircle(x+wid/2+scale*7.5,y+(z)*15*scale,scale*5)){
					ffocus="output,"+z;
					if(a.type==0){
						renderCir(x+wid/2+scale*7.5,y+(z)*15*scale,scale*3,7);
					}
				}
        }
		}
		return ffocus;
    }
	this.getPos = function(scale,x,y,inout,num){
		let ret = {};
		let txte = this.data.name;
		if(this.data.txt){txte=this.data.value}
		let hig = Math.max(this.data.contents.length,this.data.output.length);
        
        let wid = renderText("",x,y,'c',5,scale*15).width;
		wid=ctx.measureText(txte).width;
        if(this.data.width!=void(0)){
            wid=this.data.width;
        }
		let z = num;
		if(inout){
			ret.x=x+wid/2+scale*7.5;
			ret.y=y+(z+1)*15*scale;
			if(this.data.shape==1){
				ret.x=x+wid/2+scale*7.5;
				ret.y=y+(z)*15*scale;
			}
		}else{
			ret.x=x-wid/2-scale*7.5;
			ret.y=y+(z+1)*15*scale;
			if(this.data.shape==1){
				ret.x=x-wid/2-scale*7.5;
				ret.y=y+(z)*15*scale;
			}
		}
		return ret;
	}
}
function blockInst(blkpref,x,y,id){
	this.bp = blkpref;
	this.x=x;
	this.y=y;
	this.id=id;
	this.routlinks=[];
	this.rinlinks=[];
	this.render=function(){
        this.focus = this.bp.render(mscale,(this.x-mx)*mscale,(this.y-my)*mscale);
	}
	this.bright=function(){
		this.focus = this.bp.render(mscale,(this.x-mx)*mscale,(this.y-my)*mscale,1);
	}
	this.focus="not";
	this.getPos=function(inout,num){
		//console.log(this.bp.getPos(mscale,(this.x-mx)*mscale,(this.y-my)*mscale,inout,num));
		return this.bp.getPos(mscale,(this.x-mx)*mscale,(this.y-my)*mscale,inout,num);
	}
	this.run=function(){
		console.log("Running Block:"+this.bp.data.name);
		console.log("rout: " + this.routlinks);
		this.bp.render(mscale,(this.x-mx)*mscale,(this.y-my)*mscale,1);
		for(i=0;i<this.routlinks.length;i++){//Get links
			let links = getLinkById(this.routlinks[i]);
			if(links!=null){
				getBlk(links.id1).run();
			}
		}
	}
}