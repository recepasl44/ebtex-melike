<?php

namespace App\Repositories\Backend\OpticalAttributes;

use DB;
use Carbon\Carbon;
use App\Models\OpticalAttributes\OpticalAttribute;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OpticalAttributeRepository.
 */
class OpticalAttributeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = OpticalAttribute::class;

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
                config('module.opticalattributes.table').'.id',
                config('module.opticalattributes.table').'.form_id',
				config('module.opticalattributes.table').'.column_name',
				config('module.opticalattributes.table').'.column_start',
				config('module.opticalattributes.table').'.column_length',
				config('module.opticalattributes.table').'.lesson_id',
				
                config('module.opticalattributes.table').'.created_at',
                config('module.opticalattributes.table').'.updated_at',
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
        if(!empty($input['columns'])){
            foreach ($input['columns'] as $key => $value) {
                $oa = new OpticalAttribute();
                $oa->form_id = $input['form_id'];
                if($key == 'lessons'){
                    if(!empty($input['columns']['lessons'])){
                        foreach ($input['columns']['lessons'] as $id => $l){
                            $oa->lesson_id = $id;
                            $oa->columns_start = $l[0] ?? 0;
                            $oa->columns_length = $l[1] ?? 1;
                        }
                    }
                }else{
                    $oa->column_name = $key;
                }
                $oa->save();
                return true;
            }
        }

        throw new GeneralException(trans('exceptions.backend.opticalattributes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param OpticalAttribute $opticalattribute
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(OpticalAttribute $opticalattribute, array $input)
    {
        if(!empty($input['columns'])){
            foreach ($input['columns'] as $key => $value) {
                $oa = new OpticalAttribute();
                $oa->form_id = $input['form_id'] ?? $oa->form_id;
                if($key == 'lessons'){
                    if(!empty($input['columns']['lessons'])){
                        foreach ($input['columns']['lessons'] as $id => $l){
                            $oa->lesson_id = $id;
                            $oa->columns_start = $l[0] ?? 0;
                            $oa->columns_length = $l[1] ?? 1;
                        }
                    }
                }else{
                    $oa->column_name = $key;
                }
                $oa->save();
                return true;
            }
        }

        throw new GeneralException(trans('exceptions.backend.opticalattributes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param OpticalAttribute $opticalattribute
     * @throws GeneralException
     * @return bool
     */
    public function delete(OpticalAttribute $opticalattribute)
    {
        if ($opticalattribute->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.opticalattributes.delete_error'));
    }
}
