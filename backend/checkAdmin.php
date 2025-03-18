<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbConn.php';

$data = json_decode(file_get_contents("php://input"));

$userId = $data->id;

$query = "SELECT is_admin FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["is_admin" => (int)$user["is_admin"]]);
} else {
    echo json_encode(["is_admin" => 0]);
}

$stmt->close();
$conn->close();
?>