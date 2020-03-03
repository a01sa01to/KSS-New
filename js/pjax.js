// window.addEventListener('load',()=>{
	(()=>{
		$('a').click(async function(e){
		e.preventDefault();
		const loadList = ["/monthPlan/", "/blog/"];
		const href = $(this).attr("href");
		console.log(href, loadList.includes(href))
		if(href.startsWith("#")){
			// Slide
		}
		else if(href.startsWith("/") && !loadList.includes(href)){
			await pjax(href);
		}
		else if(loadList.includes(href)){
			location.href = href;
		}
		else{
			open(href);
		}
	})
})();
// });
window.addEventListener('popstate',async ()=>{
	await pjax(undefined,false)
})
const pjax = async (href=location.href, keepHistroy=true)=>{
	$('.displayToggleBtn, .headerContainer, header .topMenu, p.logo > i.fas.fa-angle-down').removeClass("showing");
	$('main').html('<div class="loader">Loading...</div>')
	await $.ajax({url: href, type: "GET"}).done(data=>{
		$(data).each(function(){
			const tagname = this.nodeName.toLowerCase();
			window.document.baseURI = href;
			if(tagname === "script"){
				let isContained = false;
				for (const e of $(document).find("script")) {
					if(e.src === this.src && e.innerHTML === this.innerHTML){
						isContained = true;
					}
				}
				if(href === "/blog/" && this.src.includes(`bundle.js`)){
					fetch('/blog/bundle.js').then(r=>r.text()).then(t=>eval(t));
				}
				else if(!isContained){
					const scr = document.createElement("script");
					scr.src = (this.src)?this.src:"";
					scr.innerHTML = (this.innerHTML)?this.innerHTML:"";
					document.head.appendChild(scr);
				}
			}
			else if(tagname === "style"){
				const pjStyle = document.querySelector('style#pjAppend')
				if(pjStyle) pjStyle.remove();
				const sty = document.createElement("style");
				sty.id = "pjAppend";
				sty.innerHTML = this.innerHTML;
				document.head.appendChild(sty)
			}
			else if(tagname === "link"){
				let isContained = false;
				for (const e of $(document).find("link")) {
					if(e.href === this.href && e.rel === this.rel){
						isContained = true;
					}
				}
				if(!isContained){
					const lin = document.createElement("link");
					lin.href = this.href;
					lin.rel = this.rel;
					document.head.appendChild(lin);
				}
			}
			else if(tagname === "main"){
				$('main').html(this.innerHTML);
			}
			else if(tagname === "title"){
				document.title = `${this.innerHTML} - 茨城県立古河中等教育学校ホームページ New`;
			}
		})
	}).fail(()=>{
		$('main').html('ページを読み込む際にエラーが発生しました。');
	}).always(()=>{
		if(keepHistroy) history.pushState(undefined,0,href);
		window.scrollTo(0,0);
		const load_event = document.createEvent('Event');
		load_event.initEvent('load', false, false);
		window.dispatchEvent(load_event);
	});
	await imgLoad();
	headerMenuUpdate();
}