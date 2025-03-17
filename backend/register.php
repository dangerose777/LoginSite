<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbConn.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$checkUserExistQuery = "SELECT id FROM users WHERE username = ?";
$checkUserExistQueryStmt = $conn->prepare($checkUserExistQuery);
$checkUserExistQueryStmt->bind_param("s", $username);
$checkUserExistQueryStmt->execute();
$checkUserExistQueryResult = $checkUserExistQueryStmt->get_result();

if ($checkUserExistQueryResult->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "User already exist"]);
    $checkUserExistQueryStmt->close();
    $conn->close();
    exit();
}

$checkUserExistQueryStmt->close();

$query = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}

$stmt->close();
$conn->close();
?>
