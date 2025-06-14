CREATE TABLE `finance_notes` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `student_id` BIGINT UNSIGNED NOT NULL,
  `installment_id` BIGINT UNSIGNED NULL,
  `note` TEXT NOT NULL,
  `promise_date` DATE NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT `finance_notes_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`),
  CONSTRAINT `finance_notes_installment_id_foreign` FOREIGN KEY (`installment_id`) REFERENCES `installments`(`id`),
  CONSTRAINT `finance_notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Sample data for table `finance_notes`
--
INSERT INTO `finance_notes` (`student_id`, `installment_id`, `note`, `promise_date`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ödeme hatırlatıldı', '2025-07-10', 2, '2025-06-15 10:00:00', '2025-06-15 10:00:00'),
(2, NULL, 'Veli ile telefonla görüşüldü', '2025-07-20', 3, '2025-06-16 11:00:00', '2025-06-16 11:00:00'),
(3, 2, 'Ödeme takibi yapıldı', NULL, 4, '2025-06-17 12:30:00', '2025-06-17 12:30:00');

