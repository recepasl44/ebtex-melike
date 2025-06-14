<?php

namespace App\Repositories\Backend\ComponentValues;

use DB;
use Carbon\Carbon;
use App\Models\ComponentValues\ComponentValue;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ComponentValueRepository.
 */
class ComponentValueRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ComponentValue::class;

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
                config('module.componentvalues.table').'.id',
                config('module.componentvalues.table').'.lang',
				config('module.componentvalues.table').'.component_id',
				config('module.componentvalues.table').'.values',
				
                config('module.componentvalues.table').'.created_at',
                config('module.componentvalues.table').'.updated_at',
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

        if(!empty($input['cover'])){
            $input = $this->uploadImage($input, 'components', 'cover');
            $input['values'][] = $input['cover'];
        }
        $input['values'] = json_encode($input['values']);
        if (ComponentValue::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.componentvalues.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ComponentValue $componentvalue
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ComponentValue $componentvalue, array $input)
    {

        if (array_key_exists('cover', $input) && !empty($input['cover'])) {
            $input = $this->uploadImage($input, 'components', 'cover');
            $input['values'][] = ['cover' => $input['cover']];
			// dd($input['values'], $input['cover']);
        }else{
			$result = [];
			$data = json_decode($componentvalue->values, true);

			// Verileri işleyin ve tek bir diziye dönüştürün
			foreach ($data as $item) {
				foreach ($item as $key => $value) {
					$result[$key] = $value;
				}
			}
			$input['values'][] = ['cover' => $result['cover']];
		}
        $input['values'] = json_encode($input['values']);

    	if ($componentvalue->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.componentvalues.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ComponentValue $componentvalue
     * @throws GeneralException
     * @return bool
     */
    public function delete(ComponentValue $componentvalue)
    {
        if ($componentvalue->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.componentvalues.delete_error'));
    }
}
