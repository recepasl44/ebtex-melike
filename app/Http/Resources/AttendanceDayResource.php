<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AttendanceDayResource extends MainResources
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
                'attendance_id' => $this->attendance_id,
                'attendance' => $this->attendance,
                'day_id' => $this->day_id,
                'day_id' => \Carbon\Carbon::now()->startOfWeek()->addDays($this->day_id ?? 0)->format('d.m.Y'),
                ];
        }
}
