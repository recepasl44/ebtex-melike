<?php

namespace App\Repositories\Backend\Sliders;

use DB;
use App\Supports\Carbon;
use App\Models\Sliders\Slider;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SliderRepository.
 */
class SliderRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Slider::class;

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
                config('module.sliders.table').'.id',
                config('module.sliders.table').'.lang',
                config('module.sliders.table').'.cover',
                config('module.sliders.table').'.subtitle',
                config('module.sliders.table').'.title',
                config('module.sliders.table').'.description',
                config('module.sliders.table').'.button1',
                config('module.sliders.table').'.button2',
                config('module.sliders.table').'.button1_link',
                config('module.sliders.table').'.button2_link',
                config('module.sliders.table').'.status',
                config('module.sliders.table').'.created_at',
                config('module.sliders.table').'.updated_at',
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
        if (Slider::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.sliders.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Slider $slider
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Slider $slider, array $input)
    {
    	if ($slider->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.sliders.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Slider $slider
     * @throws GeneralException
     * @return bool
     */
    public function delete(Slider $slider)
    {
        if ($slider->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.sliders.delete_error'));
    }
}
