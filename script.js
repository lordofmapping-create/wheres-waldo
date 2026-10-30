const photos=[
  [
    "PXL_20261030_145333190.jpg",
    0.14321296426396887,
    0.49245468596318676
  ],
  [
    "PXL_20261030_145359404.jpg",
    0.1492859350850077,
    0.5140368132640157
  ],
  [
    "PXL_20261030_145432118.jpg",
    0.845,
    0.55
  ],
  [
    "PXL_20261030_145538485.jpg",
    0.2768183223268231,
    0.497850217788394
  ],
  [
    "PXL_20261030_145600519.jpg",
    0.8739937863956412,
    0.4816636223127722
  ],
  [
    "PXL_20261030_145643033.jpg",
    0.6806708819259052,
    0.4870591541379795
  ],
  [
    "PXL_20261030_145712343.jpg",
    0.13612783163942357,
    0.5895742588169173
  ],
  [
    "PXL_20261030_145730534.jpg",
    0.225,
    0.5
  ]
];
let page=0,seen=new Set();
try{localStorage.removeItem("waldoPositions")}catch(e){}const $=id=>document.getElementById(id);
const dots=$('dots');dots.innerHTML=Array.from({length:8},(_,i)=>`<i class="dot" data-i="${i+1}"></i>`).join('');
function render(){const book=$('page');book.classList.remove('turn');void book.offsetWidth;book.classList.add('turn');$('page').querySelector('.cover').hidden=page!==0;$('photoPage').hidden=!(page>=1&&page<=8);$('finish').hidden=page!==9;$('prev').disabled=page===0;$('next').disabled=page===0||page===9;$('next').textContent=page===8?'FINISH →':'NEXT →';dots.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('current',i+1===page));if(page>=1&&page<=8){const [file,x,y]=photos[page-1];$('photo').src='images/'+file;$('chapter').textContent='SIGHTING '+String(page).padStart(2,'0');$('count').textContent=page+' / 8';positionMarker(x,y);$('ring').classList.toggle('visible',seen.has(page));$('instruction').textContent=seen.has(page)?'YOU FOUND WALDO! 🎉':'Look closely… can you spot Waldo? Click her in the photo!';$('found').textContent=seen.has(page)?'FOUND ✓':'I FOUND HER!';}window.scrollTo({top:0,behavior:'smooth'});}
function positionMarker(x,y){
 const img=$('photo'),wrap=$('photoWrap');
 const r=img.getBoundingClientRect(),box=wrap.getBoundingClientRect();
 const nw=img.naturalWidth||1,nh=img.naturalHeight||1;
 const scale=Math.min(r.width/nw,r.height/nh);
 const w=nw*scale,h=nh*scale;
 const left=r.left+(r.width-w)/2,top=r.top+(r.height-h)/2;
 const px=(left+x*w-box.left)/box.width*100;
 const py=(top+y*h-box.top)/box.height*100;
 for(const id of ['target','ring']){$(id).style.left=px+'%';$(id).style.top=py+'%'}
}
$('photo').addEventListener('load',()=>{if(page>=1&&page<=8)positionMarker(photos[page-1][1],photos[page-1][2])});
window.addEventListener('resize',()=>{if(page>=1&&page<=8)positionMarker(photos[page-1][1],photos[page-1][2])});
function mark(){seen.add(page);$('ring').classList.add('visible');$('instruction').textContent='YOU FOUND WALDO! 🎉';$('found').textContent='FOUND ✓';}
$('start').onclick=()=>{page=1;render()};$('restart').onclick=()=>{page=0;seen.clear();render()};$('prev').onclick=()=>{page=Math.max(0,page-1);render()};$('next').onclick=()=>{page=Math.min(9,page+1);render()};$('target').onclick=mark;
$('found').onclick=mark;$('reveal').onclick=mark;document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&page>0&&page<9){page++;render()}if(e.key==='ArrowLeft'&&page>0){page--;render()}});render();
