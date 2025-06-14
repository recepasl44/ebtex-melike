<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AssignmentStatusCountResource extends MainResources
{
    /**
     * @param \Illuminate\Support\Collection|array $resource
     */
    public function fields($request)
    {
        return [
            $this['status'] => [
                'status' => $this['status'],
                'label' => $this->statusLabel($this['status']),
                'count' => $this['count'],
            ]
        ];
    }

    public static function statusLabel($status)
    {
        return match ((int) $status) {
            0 => "un_controlled",
            1 => "controlled",
            2 => "not_completed",
            3 => "completed",
            5 => "absent",
            6 => "unchecked",
            default => 'unknown',
        };
    }
}
