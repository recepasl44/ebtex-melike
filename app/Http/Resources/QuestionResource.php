<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuestionResource extends MainResources
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function fields($request)
    {
        return [
            'id' => $this->id,
            'writer_id' => $this->writer_id,
            'writer' => $this->writer ?? null,
            'program_id' => $this->program_id,
            'program' => $this->program ? new ProgramResource($this->program) : null,
            'level_id' => $this->level_id,
            'level' => $this->level ? new LevelResource($this->level) : null,
            // 'lesson_id' => $this->lesson_id,
            // 'lesson' => $this->lesson ? new LessonResource($this->lesson) : null,
            // 'unit_id' => $this->unit_id,
            // 'unit' => $this->unit ? new UnitResource($this->unit) : null,
            // 'chapter_id' => $this->chapter_id,
            // 'chapter' => $this->chapter ? new ChapterResource($this->chapter) : null,
            // 'topic_id' => $this->topic_id,
            // 'topic' => $this->topic ? new TopicResource($this->topic) : null,
            // 'achievement_id' => $this->achievement_id,
            // 'achievement' => $this->achievement ? new AchievementResource($this->achievement) : null,
            'question_type_id' => $this->question_type_id,
            'question_type' => $this->question_type,
            'question_category_id' => $this->question_category_id,
            'question_category' => $this->question_category,
            'question_difficulty_id' => $this->question_difficulty_id,
            'question_difficulty' => $this->question_difficulty,
            'page_type_id' => $this->page_type_id,
            'page_type' => $this->page_type,
            'page_position_id' => $this->page_position_id,
            'page_position' => $this->page_position,
            'suitability_score' => $this->suitability_score,
            'relevance_id' => $this->relevance_id,
            'relevance' => $this->relevance,
            'pdf_id' => $this->pdf_id,
            'pdf' => $this->pdf,
            'video_solution_url' => $this->video_solution_url,
            'page_number' => $this->page_number,
            'x' => $this->x,
            'y' => $this->y,
            'width' => $this->width,
            'height' => $this->height,
            'image_path' => $this->image_path,
            'curriculums' => $this->question_curriculums ? QuestionCurriculumResource::collection($this->question_curriculums) : null,
        ];
    }
}
