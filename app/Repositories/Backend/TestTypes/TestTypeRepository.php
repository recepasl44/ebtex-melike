<?php

namespace App\Repositories\Backend\TestTypes;

use DB;
use Carbon\Carbon;
use App\Models\TestTypes\TestType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestTypeRepository.
 */
class TestTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = TestType::class;

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
                config('module.testtypes.table').'.id',
                config('module.testtypes.table').'.name',
				
                config('module.testtypes.table').'.created_at',
                config('module.testtypes.table').'.updated_at',
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
        if (TestType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.testtypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param TestType $testtype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(TestType $testtype, array $input)
    {
    	if ($testtype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.testtypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param TestType $testtype
     * @throws GeneralException
     * @return bool
     */
    public function delete(TestType $testtype)
    {
        if ($testtype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.testtypes.delete_error'));
    }
}
