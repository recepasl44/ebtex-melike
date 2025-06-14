<?php

namespace App\Repositories\Backend\Colors;

use DB;
use App\Supports\Carbon;
use App\Models\Colors\Color;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ColorRepository.
 */
class ColorRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Color::class;

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
                config('module.colors.table').'.id',
                config('module.colors.table').'.name',
                config('module.colors.table').'.hex',
				config('module.colors.table').'.type_id',
				
                config('module.colors.table').'.created_at',
                config('module.colors.table').'.updated_at',
            ]);
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        if (Color::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.colors.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Color $color
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Color $color, array $input)
    {
    	if ($color->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.colors.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Color $color
     * @throws GeneralException
     * @return bool
     */
    public function delete(Color $color)
    {
        if ($color->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.colors.delete_error'));
    }
}
