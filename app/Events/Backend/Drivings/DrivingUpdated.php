<?php

namespace App\Events\Backend\Drivings;

use App\Models\Drivings\Driving;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DrivingUpdated
{
    use Dispatchable, SerializesModels;

    public $driving;

    /**
     * Create a new event instance.
     *
     * @param \App\Models\Drivings\Driving $driving
     * @return void
     */
    public function __construct(Driving $driving)
    {
        $this->driving = $driving;
    }
}
