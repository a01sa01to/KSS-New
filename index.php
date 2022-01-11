<?
	function mimeType($filename){
		$mimeType = array(
			"css"=>"text/css",
			"txt"=>"text/plain",
			"html"=>"text/html",
			"php"=>"text/html",
			"js"=>"text/javascript",
			"xml"=>"application/xml",
			"ico"=>"image/vnd.microsoft.icon",
			"json"=>"application/json",
			"png"=>"image/png",
			"gif"=>"image/gif",
			"jpeg"=>"image/jpeg",
			"jpg"=>"image/jpeg",
			"pdf"=>"application/pdf"
		);

		$_ = explode(".", $filename);
		$ext = $_[count($_)-1];
		$m = $mimeType[$ext];
		if(!$m){ $m = $mimeType["txt"]; }
		header("Content-Type: ".$m."; charset=utf-8");
		return $m;
	}



	$p = __DIR__ . parse_url($_SERVER['REQUEST_URI'])['path'];

	if(file_exists($p)){
		if(preg_match('/\/$/',$p)){
			$p .= "index.html";
		}
		if(preg_match('/(links|exemption|copyright|privacy)(\.html)?$/',$p)){
			require_once __DIR__."/preparation.html";
			exit();
		}
		$m = mimeType($p);
		if($m == "text/html"){
			require_once $p;
		}
		else{
			echo file_get_contents($p);
		}
	}
	elseif(file_exists($p.".html")){
		$p .= ".html";
		require_once $p;
	}
	elseif(file_exists($p.".php")){
		$p .= ".php";
		require_once $p;
	}
	else{
		echo file_get_contents(__DIR__.'/error/404.html');
		http_response_code(404);
	}
?>