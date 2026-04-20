<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260420061451 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE classe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, level VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__student AS SELECT id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date FROM student');
        $this->addSql('DROP TABLE student');
        $this->addSql('CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, gender VARCHAR(10) NOT NULL, address CLOB DEFAULT NULL, phone_number VARCHAR(20) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, registration_date DATETIME NOT NULL, classe_id INTEGER DEFAULT NULL, CONSTRAINT FK_B723AF338F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO student (id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date) SELECT id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date FROM __temp__student');
        $this->addSql('DROP TABLE __temp__student');
        $this->addSql('CREATE INDEX IDX_B723AF338F5EA509 ON student (classe_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE classe');
        $this->addSql('CREATE TEMPORARY TABLE __temp__student AS SELECT id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date FROM student');
        $this->addSql('DROP TABLE student');
        $this->addSql('CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, gender VARCHAR(10) NOT NULL, address CLOB DEFAULT NULL, phone_number VARCHAR(20) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, registration_date DATETIME NOT NULL)');
        $this->addSql('INSERT INTO student (id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date) SELECT id, first_name, last_name, birth_date, gender, address, phone_number, email, registration_date FROM __temp__student');
        $this->addSql('DROP TABLE __temp__student');
    }
}
