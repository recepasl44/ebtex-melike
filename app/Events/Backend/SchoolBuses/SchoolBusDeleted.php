<?php

namespace App\Events\Backend\SchoolBuses;

use App\Models\SchoolBuses\SchoolBus;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SchoolBusDeleted
{
    use Dispatchable, SerializesModels;

    public $schoolbus;

    public function __construct(SchoolBus $schoolbus)
    {
        $this->schoolbus = $schoolbus;
    }
}