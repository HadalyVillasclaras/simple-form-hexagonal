<?php
// namespace back\src\Infrastructure;

require_once __DIR__ . "/../../config/dbConfig.php";

class Connection
{
	private PDO $connection;

	public function Connect(): PDO
	{
		try {
			$this->connection = new PDO('mysql:host=' . DB_HOST . '; dbname=' . DB_NAME . '', DB_USER, DB_PASS);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->connection->setAttribute(PDO::ATTR_PERSISTENT, TRUE);

			return $this->connection;
		} catch (PDOException $e) {
			echo "Connection error: " . $e->getMessage() . " | " . $e->getCode();
		}
	}
}
