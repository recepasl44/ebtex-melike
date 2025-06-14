<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\ScheduledAssignments\ScheduledAssignment;
use App\Services\CurriculumTreeBuilder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class ScheduledAssignmentResource extends MainResources
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
        // Koleksiyondaki status değerlerini say
        $statusCounts = $this->get() // get() ile builder'dan collection alıyoruz
        ->groupBy('status')
            ->map(function ($items, $status) {
                return [
                    'status' => $status,
                    'count' => $items->count(),
                ];
            })->values(); // istersen values() ile indexleri sıfırlayabilirsin

        // Bütün statüleri kapsayacak şekilde eksik olanları da doldur
        $allStatuses = range(0, 9);
        foreach ($allStatuses as $status) {
            if (!isset($statusCounts[$status])) {
                $statusCounts[$status] = [
                    'status' => $status,
                    'count' => 0,
                ];
            }
        }

        $zeroStatus = $this->where('status', 0);
        $nonZeroStatus = $this->where('status', '!=', 0);

        $questions_zero = $zeroStatus->sum('number_of_questions');
        $time_zero = $zeroStatus->sum('working_time');
        $questions_nonzero = $nonZeroStatus->sum('number_of_questions');
        $time_nonzero = $nonZeroStatus->sum('working_time');

        $deadline = Carbon::parse($this->period->end_date ?? $this->end_date);
        $now = Carbon::now();
        $diff = $deadline->diff($now);

        return [
            'id' => $this->id,
            'student' => $this->student ? new StudentResource($this->student) : null,
            'period_id' => $this->period_id,
            'type_id' => $this->type_id,
            'period' => $this->period ? new PeriodResource($this->period) : null,
            'teacher_id' => $this->teacher_id,
            'teacher' => $this->teacher,
            'program_id' => $this->program_id,
            'program' => $this->program,
            'level_id' => $this->level_id,
            'level' => $this->level,
            'lessons' => app(CurriculumTreeBuilder::class)->build(new Collection([$this->resource])),
            'source_id' => $this->source_id,
            'source' => $this->source,
            'page_range' => $this->page_range,
            'number_of_questions' => $this->number_of_questions,
            'working_time' => $this->working_time,
            'remaining_time' => "{$diff->d} gün, {$diff->h} saat, {$diff->i} dakika",
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'description' => $this->description,
            'status' => $this->status,
            'status_number' => \Carbon\Carbon::today()->between($this->start_date, $this->end_date) ? 1 : 0,
            'status_level' => $this->status_level,
            'status_count' => $statusCounts ? AssignmentStatusCountResource::collection($statusCounts) : null,
            'stats' => [
                'planned_time' => $time_zero ?? 0,
                'planned_questions' => $questions_zero ?? 0,
                'happened_time' => $time_nonzero ?? 0,
                'happened_questions' => $questions_nonzero ?? 0,
            ]

        ];
    }
}
