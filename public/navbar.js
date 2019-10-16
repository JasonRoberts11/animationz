function setbar(){
var navbar = document.getElementById("navbar");
if (navbar != null){
navbar.innerHTML = `
<a href="/" class="rainbow">Index</a>
<a href="/usersearch">UserSearch</a>
<a href="/login">Login</a>
<a href="/signup">Signup</a>
`;
}
  // console.log("madestuff")
}


window.onload = setbar();


var tare = 0;
var g = setInterval(function(){
    
    tare+=0.1;
    var rainbows = document.getElementsByClassName("rainbow");
    for(var i = 0;i<rainbows.length;i++){
        rainbows[i].style.color=rgbToHex(127*Math.sin(tare)+127,127*Math.sin(tare+3.1415/3*2)+127,127*Math.sin(tare+3.1415/3*4)+127);
        //rainbows[i].style.background=rgbToHex(50*Math.sin(tare+3.1415)+50,50*Math.sin(tare+3.1415/3*5)+50,50*Math.sin(tare+3.1415/3*1)+50);  //rainbows[i].innerHTML=Math.random();
    }
},10);

function rgbToHex(r, g, b) {
                        return "#" + ((1 << 24) + (r << 16) + (g << 8) + (b<<0)).toString(16).slice(1);
}
