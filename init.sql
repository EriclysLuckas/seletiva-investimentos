CREATE DATABASE IF NOT EXISTS prisma_migrate_shadow_db;
GRANT ALL PRIVILEGES ON prisma_migrate_shadow_db.* TO 'dev'@'%';
FLUSH PRIVILEGES;