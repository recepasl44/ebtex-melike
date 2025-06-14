<?php

namespace App\Http\Resources;

class FinanceNoteResource extends MainResources
{
    public function fields($request)
    {
        $student = $this->student;
        return [
            'id' => $this->id,
            'branch' => $student->branch->name ?? null,
            'school_no' => $student->school_no ?? null,
            'identity_no' => $student->tc_kimlik_no ?? null,
            'full_name' => trim(($student->first_name ?? '').' '.($student->last_name ?? '')),
            'level' => $student->level->name ?? null,

            'date' => $this->created_at->format('Y-m-d') ?? null,

            'note' => $this->note,
            'promise_date' => $this->promise_date,
            'user' => optional($this->user)->name,
        ];
    }
}
