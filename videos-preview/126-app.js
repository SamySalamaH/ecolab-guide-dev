var OFF={"2": [0, 516698], "3": [516698, 422050], "4": [938748, 513561], "5": [1452309, 587918], "6": [2040227, 443440], "7": [2483667, 488248], "8": [2971915, 686334], "9": [3658249, 684687], "10": [4342936, 526397], "11": [4869333, 810052], "12": [5679385, 659357], "13": [6338742, 537674], "14": [6876416, 792438], "15": [7668854, 682486], "16": [8351340, 816697], "17": [9168037, 694347], "18": [9862384, 790326], "19": [10652710, 566812], "20": [11219522, 720315], "21": [11939837, 713348], "22": [12653185, 588649], "23": [13241834, 643856], "24": [13885690, 513509], "25": [14399199, 540599], "26": [14939798, 640971]};
document.querySelectorAll('.vwrap').forEach(function(w){
  var v=w.querySelector('video'),b=w.querySelector('.play');
  v.controls=false;
  b.addEventListener('click',function(){
    if(v.dataset.ready){v.play();return;}
    b.textContent='...';b.disabled=true;
    var o=OFF[v.dataset.ep];
    fetch('all.bin',{headers:{Range:'bytes='+o[0]+'-'+(o[0]+o[1]-1)}}).then(function(r){return r.arrayBuffer();}).then(function(u){
      if(u.byteLength!==o[1]){u=u.slice(o[0],o[0]+o[1]);}
      v.src=URL.createObjectURL(new Blob([u],{type:'video/mp4'}));
      v.style.backgroundImage='none';
      v.controls=true;v.dataset.ready='1';b.style.display='none';v.play();
    }).catch(function(){b.textContent='!';b.disabled=false;});
  });
});
