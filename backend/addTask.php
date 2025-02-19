<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbConn.php';

$data = json_decode(file_get_contents("php://input"));

var_dump($data);

file_put_contents("debug_log.txt", print_r($data, true));

$user_id = isset($data->user_id) ? $data->user_id : null;
$title = isset($data->title) ? $data->title : null;
$task = isset($data->task) ? $data->task : null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is missing"]);
    exit;
}

$query = "INSERT INTO tasks (user_id, title, task) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iss", $user_id, $title, $task);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Task added"]);
} else {
    echo json_encode(["success" => false, "message" => "Error adding task"]);
}

$conn->close();
?>