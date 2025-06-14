<?php

namespace App\Models\Appointments\Traits;

use App\Models\Access\User\User;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;
use App\Models\Students\Student;

/**
 * Class AppointmentRelationship
 */
trait AppointmentRelationship
{
    public function season(){
        return $this->belongsTo(Season::class);
    }

    public function branche(){
        return $this->belongsTo(Branche::class);
    }

    public function student(){
        return $this->belongsTo(Student::class);
    }

    public function meetingby(){
        return $this->belongsTo(User::class, 'meeting_by');
    }

    public function createdby(){
        return $this->belongsTo(User::class, 'created_by');
    }
}
