<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CurriculumTreeBuilder
{
    /**
     * Model üzerinden ağaç yapısını oluşturur.
     *
     * @param string $modelClass
     * @param array $filters
     * @return array
     */
    public function buildFromModel(string $modelClass, array $filters = []): array
    {
        $query = $modelClass::query();

        // İlişkileri eager load
        $query->with(['lesson', 'unit', 'chapter', 'topic', 'achievement']);

        // Dinamik filtre uygula
        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                $query->whereIn($field, $value);
            } else {
                $query->where($field, $value);
            }
        }

        return $this->build($query->get());
    }

    /**
     * Verilen collection'dan ağaç yapısı üretir.
     *
     * @param Collection $rows
     * @return array
     */
    public function build(Collection $rows): array
    {
        $tree = [];

        foreach ($rows as $row) {
            $lessonId = $row->lesson_id;
            $unitId = $row->unit_id;
            $chapterId = $row->chapter_id;
            $topicId = $row->topic_id;

            if (!isset($tree[$lessonId])) {
                $tree[$lessonId] = [
                    'lesson' => $row->lesson,
                    'units' => []
                ];
            }

            if (!isset($tree[$lessonId]['units'][$unitId])) {
                $tree[$lessonId]['units'][$unitId] = [
                    'unit' => $row->unit,
                    'chapters' => []
                ];
            }

            if (!isset($tree[$lessonId]['units'][$unitId]['chapters'][$chapterId])) {
                $tree[$lessonId]['units'][$unitId]['chapters'][$chapterId] = [
                    'chapter' => $row->chapter,
                    'topics' => []
                ];
            }

            if (!isset($tree[$lessonId]['units'][$unitId]['chapters'][$chapterId]['topics'][$topicId])) {
                $tree[$lessonId]['units'][$unitId]['chapters'][$chapterId]['topics'][$topicId] = [
                    'topic' => $row->topic,
                    'achievements' => []
                ];
            }

            $tree[$lessonId]['units'][$unitId]['chapters'][$chapterId]['topics'][$topicId]['achievements'][] = $row->achievement;
        }

        // Temiz indexleme
        return array_values(array_map(function ($lesson) {
            $lesson['units'] = array_values(array_map(function ($unit) {
                $unit['chapters'] = array_values(array_map(function ($chapter) {
                    $chapter['topics'] = array_values($chapter['topics']);
                    return $chapter;
                }, $unit['chapters']));
                return $unit;
            }, $lesson['units']));
            return $lesson;
        }, $tree));
    }
}
