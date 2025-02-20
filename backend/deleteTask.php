<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbConn.php';

$data = json_decode(file_get_contents("php://input"));

$task_id = $data->task_id;

if (!$task_id) {
    echo json_encode(["success" => false, "message" => "Task ID missing"]);
    exit;
}

$query = "DELETE FROM tasks WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $task_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Task deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Error while deleting task"]);
}

$conn->close();
?>