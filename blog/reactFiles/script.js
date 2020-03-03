import React from 'react';
import ReactDOM from 'react-dom';
import Render from './render';

window.pageid = 0;
window.loading = false;
function init(){
    load();
}
function load(){
    if(!window.loading){
        window.loading = true;
        document.querySelector('p.loading').classList.remove("hide");
        pageid++;
        let fin = false;
        console.log(pageid);
        // fetch(`./data.json`).then(r=>r.text()).then(t=>JSON.parse(t)).then(j=>show(j));
        fetch(`./get.php?page=${window.pageid}`).then(r=>r.text()).then(t=>{if(t.length<5)fin=true;return JSON.parse(t);}).then(j=>show(j)).then(()=>{window.loading = fin; document.querySelector("p.loading").classList.add('hide')});
    }
}

function showImg(ev){
    ev.preventDefault();
    const e = this.parentNode.parentNode.querySelector("div.imgs").classList;
    const absPos = this.parentNode.parentNode.querySelector("p.title").getBoundingClientRect().top + window.pageYOffset;
    e.toggle('hide');
    if(e.contains("hide")){
        window.scrollTo(0,absPos);
        this.innerText = `画像を表示（${this.getAttribute("data-images")}枚）`;
    }
    else{
        this.innerText = "画像を非表示";
    }
}

function show(json){
    const div = document.createElement('div');
    div.className = "blogContainer flex";
    document.querySelector('p.loading').insertAdjacentElement("beforebegin",div);
    ReactDOM.render(<Render j={json} />, div);
    document.querySelectorAll('a.show').forEach(_=>{
        _.removeEventListener("click",showImg);
        _.addEventListener("click",showImg);
    });
    setTimeout(imgLoad,1000);
}
init();

window.addEventListener('scroll',()=>{
    const height = document.body.clientHeight;
    const position = window.innerHeight + window.scrollY;
    if((height-position)/height <= 0.05){
        load();
    }
})