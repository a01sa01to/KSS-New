fetch('/js/jquery-3.3.1.min.js').then((r)=>{return r.text()}).then((t)=>{eval(t)}).then(()=>{

let isSliding = false;

//window.addEventListener('load',()=>{
    if(window.innerWidth < 700){
        for(let i=0;i<$('main li').length;i++){
            let elem = $('main li')[i];
            if(elem.children.length > 0){
                const inn = elem.innerHTML;
                //elem.innerHTML = + '&nbsp;<i class="fas fa-angle-down"></i>';
                elem.innerHTML = inn.replace('<ul','&nbsp;<i class="fas fa-angle-down"></i><ul');

                elem.addEventListener('click',function(){
                    if(!isSliding){
                        isSliding = true;
                        const ul = $(this).children('ul');
                        const i = $(this).children('i');
                        if(ul.css('display') === "none"){
                            i.css('animation','show 700ms');
                            setTimeout(()=>{i.css('transform','rotate(180deg)')},680);
                        }
                        else{
                            i.css('animation','hide 700ms');
                            setTimeout(()=>{i.css('transform','rotate(0deg)')},680);
                        }
                        ul.slideToggle("",()=>{
                            isSliding = false;
                        });
                    }
                });
            }
        }
    }
//});
});
function after(arr, from){
    let result = new String;
    for(let i=from; i < arr.length; i++){
        result += arr[i];
    }
    return result;
}