<?php

namespace App\Events\Backend\Stations;

use App\Models\Stations\Station;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StationUpdated
{
    use Dispatchable, SerializesModels;

    public $station;

    public function __construct(Station $station)
    {
        $this->station = $station;
    }
}
