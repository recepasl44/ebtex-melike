<?php
namespace App\Imports;

use App\Models\Curriculum\Unit;
use App\Models\Curriculum\Chapter;
use App\Models\Curriculum\Topic;
use App\Models\Curriculum\Achievement;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\DB;

class CurriculumImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        DB::beginTransaction();

        try {
            $currentUnit = null;
            $currentChapter = null;
            $currentTopic = null;

            foreach ($rows as $row) {
                // Skip headers
                if ($row[0] === 'Plan' || empty($row[1])) {
                    continue;
                }

                // Handle Units
                if (str_contains($row[1], 'Ünite')) {
                    $currentUnit = Unit::create([
                        'name' => trim($row[1]),
                        'numbering' => trim($row[0]),
                    ]);
                }

                // Handle Chapters
                elseif (str_contains($row[1], 'Bölüm') && $currentUnit) {
                    $currentChapter = $currentUnit->chapters()->create([
                        'name' => trim($row[1]),
                        'numbering' => trim($row[0]),
                    ]);
                }

                // Handle Topics
                elseif (str_contains($row[1], 'Konu') && $currentChapter) {
                    $currentTopic = $currentChapter->topics()->create([
                        'name' => trim($row[1]),
                        'numbering' => trim($row[0]),
                    ]);
                }

                // Handle Achievements
                elseif (str_contains($row[1], 'Kazanım') && $currentTopic) {
                    $achievement = $currentTopic->achievements()->create([
                        'name' => trim($row[1]),
                        'numbering' => trim($row[0]),
                    ]);

                    // Create Achievement Details
                    $achievement->details()->create([
                        'score' => $row[2] ?? null,
                        'lesson_duration' => $row[3] ?? null,
                        'difficulty_level' => $row[4] ?? null,
                        'tests' => $row[5] ?? null,
                        'notes' => $row[6] ?? null,
                    ]);
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \RuntimeException('An error occurred during curriculum import: ' . $e->getMessage());
        }
    }
}
