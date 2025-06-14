<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AnnualPlanResource extends MainResources
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
                'student_id' => $this->user_id,
                'student' => $this->user ? new StudentResource($this->user) : null,
                'fromto_date' => $this->fromto_date,
                'lesson_id' => $this->lesson_id,
                'lesson' => $this->lesson ? new LessonResource($this->lesson) : null,
                'unit_id' => $this->unit_id,
                'unit' => $this->unit ? new UnitResource($this->unit) : null,
                'chapter_id' => $this->chapter_id,
                'chapter' => $this->chapter ? new ChapterResource($this->chapter) : null,
                'topic_id' => $this->topic_id,
                'topic' => $this->topic ? new TopicResource($this->topic) : null,
                'achievement_id' => $this->achievement_id,
                'achievement' => $this->achievement ? new AchievementResource($this->achievement) : null,
                'source_id' => $this->source_id,
                'source' => $this->source ? new SourceResource($this->source) : null,
                'status' => $this->status,
                ];
        }
}
