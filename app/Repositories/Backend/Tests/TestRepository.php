<?php

namespace App\Repositories\Backend\Tests;

use DB;
use Carbon\Carbon;
use App\Models\Tests\Test;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestRepository.
 */
class TestRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Test::class;

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
                config('module.tests.table').'.id',
                config('module.tests.table').'.type_id',
				config('module.tests.table').'.question_numbers',
				
                config('module.tests.table').'.created_at',
                config('module.tests.table').'.updated_at',
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
        if (Test::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.tests.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Test $test
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Test $test, array $input)
    {
    	if ($test->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.tests.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Test $test
     * @throws GeneralException
     * @return bool
     */
    public function delete(Test $test)
    {
        if ($test->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.tests.delete_error'));
    }
}
