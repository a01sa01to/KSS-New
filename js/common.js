fetch('/common.html').then((r)=>{return r.text()}).then((t)=>{document.head.innerHTML+=t});
fetch('/js/jquery-3.3.1.min.js').then((r)=>{return r.text()}).then((t)=>{eval(t)}).then(()=>{
	// fetch('/header.html').then(r=>r.text()).then(t=>document.querySelector("header").innerHTML = t).then(()=>headerMenuUpdate());
	// fetch('/footer.html').then(r=>r.text()).then(t=>document.querySelector("footer").innerHTML = t);
	$('header').load('/header.html');
	$('footer').load('/footer.html');
	$('main').css('min-height',`calc(100vh - ${$("footer").outerHeight() + 82}px)`);
	// $('footer').css({
	//     position: "absolute",
	//     bottom: 0
	// })
	headerMenuUpdate();
	/*
	$('div.contentLoaderContainer').fadeOut();
	$('header,main,footer').fadeIn();
	*/
	fetch('/js/pjax.min.js').then(r=>r.text()).then(t=>eval(t));
});
function headerMenuUpdate(){
	const url = location.pathname;
	let list = document.querySelectorAll('header li');
	$('header li').css("background", "");
	for(let i=0;i<list.length;i++){
		const e = list[i];
		const a = $(e).children("a");
		if(a.attr("href") === url){
			$(e).css('background',"#4f9986");
			$(e).parent("ul").show();
		}
	}
}

window.addEventListener("load", ()=>{
	fetch('/cookieconsent_3.1.0/cookieconsent.min.js').then(r=>r.text()).then(t=>eval(t)).then(()=>{
		window.cookieconsent.initialise({
			"palette": {
				"popup": {
				"background": "#f3f3f3",
				"text": "#222"
				},
				"button": {
				"background": "#2d7764",
				"text": "#ffffff"
				}
			},
			"theme": "edgeless",
			"content": {
				"message": "当サイトでは、利便性の向上を目的として、Cookieを使用しています。引き続き当サイトを利用・閲覧することで、Cookieの使用に同意したことになります。",
				"dismiss": "同意して続ける",
				"link": "詳しくはこちらをご覧ください。(外部サイト・英語)"
				// "message": "本サイトは、古河中等生が、Σリサーチの一環として作成したものです。席を離れる前に、アンケートにご協力ください。",
				// "dismiss": "続ける"
			}
		})
	});
});

// Title
document.title += " - 茨城県立古河中等教育学校ホームページ New";

function hideElem(e){ document.querySelector(e).style.display = 'none'; }

// 文化祭リセット用
// window.addEventListener("keydown", (e)=>{
//     console.log(e.keyCode)
//     if(e.keyCode === 116){
//     e.preventDefault();
//     document.cookie = "cookieconsent_status=;expires="+new Date("1999-12-31T23:59:59Z").toUTCString();
//     document.location.href = "/"}
// })

window.addEventListener("load", imgLoad);

async function imgLoad(){
	const imgs = document.querySelectorAll("imgload");
	await imgs.forEach(async e=>{
		const source = e.getAttribute("src");
		const img = document.createElement('img');
		const attrs = e.attributes;
		try{
			await fetch(source).catch(r=>{
				throw new Error(r);
			}).then(r=>(r.ok)?r.blob():new Error(r)).then(blob=>{
				const blbUrl = (window.URL || window.webkitURL).createObjectURL(blob);
				img.src = blbUrl;
				for (const attr of attrs) {
					if(attr.name === "src") continue;
					img.setAttribute(attr.name,attr.value);
				}
			});
		}
		catch{
			console.error("An error occured when fetching "+source);
			for (const attr of attrs) {
				img.setAttribute(attr.name,attr.value);
			}
		}
		img.oncontextmenu = ()=>false;
		e.insertAdjacentElement("afterend",img);
		e.remove();
	});
}