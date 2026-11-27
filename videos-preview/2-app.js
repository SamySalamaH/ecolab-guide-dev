document.querySelectorAll('.vwrap').forEach(function(w){
  var v=w.querySelector('video'),b=w.querySelector('.play');
  v.controls=false;
  b.addEventListener('click',function(){
    if(v.dataset.ready){v.play();return;}
    b.textContent='...';b.disabled=true;
    
    fetch('ep'+v.dataset.ep+'.bin').then(function(r){return r.arrayBuffer();}).then(function(u){
            v.src=URL.createObjectURL(new Blob([u],{type:'video/mp4'}));
      v.style.backgroundImage='none';
      v.controls=true;v.dataset.ready='1';b.style.display='none';v.play();
    }).catch(function(){b.textContent='!';b.disabled=false;});
  });
});
