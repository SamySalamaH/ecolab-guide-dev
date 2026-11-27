var NAMES={"ep11": "10-ep11.bin", "ep9": "11-ep9.bin", "ep6": "115-ep6.bin", "ep18": "12-ep18.bin", "ep17": "13-ep17.bin", "ep16": "14-ep16.bin", "ep25": "14-ep25.bin", "ep15": "15-ep15.bin", "ep21": "16-ep21.bin", "ep8": "29-ep8.bin", "ep2": "17-ep2.bin", "ep19": "19-ep19.bin", "ep10": "2-ep10.bin", "ep5": "2-ep5.bin", "ep24": "20-ep24.bin", "ep20": "22-ep20.bin", "ep4": "22-ep4.bin", "ep7": "23-ep7.bin", "ep26": "24-ep26.bin", "ep23": "26-ep23.bin", "ep22": "27-ep22.bin", "ep13": "5-ep13.bin", "ep1": "7-ep1.bin", "ep12": "7-ep12.bin", "ep14": "9-ep14.bin", "ep3": "96-ep3.bin"};
document.querySelectorAll('.vwrap').forEach(function(w){
  var v=w.querySelector('video'),b=w.querySelector('.play');
  v.controls=false;
  b.addEventListener('click',function(){
    if(v.dataset.ready){v.play();return;}
    b.textContent='...';b.disabled=true;
    
    fetch(NAMES['ep'+v.dataset.ep]).then(function(r){return r.arrayBuffer();}).then(function(u){
            v.src=URL.createObjectURL(new Blob([u],{type:'video/mp4'}));
      v.style.backgroundImage='none';
      v.controls=true;v.dataset.ready='1';b.style.display='none';v.play();
    }).catch(function(){b.textContent='!';b.disabled=false;});
  });
});
