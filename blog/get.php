<?php
	header("Content-Type: Application/json; charset=UTF-8");
	$pageNum = $_GET["page"];
	$dataJSON = file_get_contents('./data.json');
	$dataJSON = json_decode($dataJSON, true);
	$ret = array();  // Return
	$now = ($pageNum - 1) * 5;
	for($i=$now; $i<$now+5; $i++){
		if($i < count($dataJSON)){
			$ret[] = $dataJSON[$i];
		}
	}
	echo json_encode($ret);
	exit();
?>