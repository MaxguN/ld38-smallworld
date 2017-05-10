<?php
	if (isset($_GET['action'])) {
		switch ($_GET['action']) {
			case 'save':
				if (isset($_GET['score'], $_GET['name'])) {
					$data = json_decode(file_get_contents('data/leaderboard.json'), TRUE);
					$entry = array(
						"score" => intval($_GET['score']),
						"name" => $_GET['name']
					);
					$added = false;

					foreach ($data as $key=>$value) {
						if ($value['score'] < $entry['score']) {
							array_splice($data, $key, 0, array($entry));
							$added = true;
							break;
						}
					}

					if (!$added) {
						$data[] = $entry;
					}

					file_put_contents('data/leaderboard.json', json_encode($data));

					echo 'ok';
				}
				break;
			case 'list':
				$data = json_decode(file_get_contents('data/leaderboard.json'), TRUE);

				echo json_encode(array_slice($data, 0, 5));

				break;
		}
	}
?>