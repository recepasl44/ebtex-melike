-- SQL script to create default roles
INSERT INTO roles (name, all, sort, created_by, updated_by, created_at, updated_at, platform_id)
VALUES
  ('Founding', 0, 10, 1, NULL, NOW(), NOW(), 1),
  ('CorporateLeader', 0, 20, 1, NULL, NOW(), NOW(), 1),
  ('Management', 0, 30, 1, NULL, NOW(), NOW(), 1),
  ('Teachers', 0, 40, 1, NULL, NOW(), NOW(), 1),
  ('PDR', 0, 50, 1, NULL, NOW(), NOW(), 1),
  ('StudentAffairs', 0, 60, 1, NULL, NOW(), NOW(), 1),
  ('FinanceOfficer', 0, 70, 1, NULL, NOW(), NOW(), 1),
  ('SupportStaff', 0, 80, 1, NULL, NOW(), NOW(), 1),
  ('SuerviceDriver', 0, 90, 1, NULL, NOW(), NOW(), 1),
  ('ServiceManager', 0, 100, 1, NULL, NOW(), NOW(), 1),
  ('ParentGuardian', 0, 110, 1, NULL, NOW(), NOW(), 1),
  ('Student', 0, 120, 1, NULL, NOW(), NOW(), 1);
