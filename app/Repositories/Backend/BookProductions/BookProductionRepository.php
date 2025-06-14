<?php

namespace App\Repositories\Backend\BookProductions;

use DB;
use Carbon\Carbon;
use App\Models\BookProductions\BookProduction;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookProductionRepository.
 */
class BookProductionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookProduction::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.bookproductions.table').'.id',
                config('module.bookproductions.table').'.production_status_id',
				config('module.bookproductions.table').'.distribution_status_id',
				config('module.bookproductions.table').'.delivery_status_id',
				config('module.bookproductions.table').'.cargo_tracking_number',
				
                config('module.bookproductions.table').'.created_at',
                config('module.bookproductions.table').'.updated_at',
            ]);
    }

}
