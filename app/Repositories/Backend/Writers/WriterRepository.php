<?php

namespace App\Repositories\Backend\Writers;

use DB;
use Carbon\Carbon;
use App\Models\Writers\Writer;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WriterRepository.
 */
class WriterRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Writer::class;

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
                config('module.writers.table').'.id',
                config('module.writers.table').'.full_name',
				
                config('module.writers.table').'.created_at',
                config('module.writers.table').'.updated_at',
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
        if (Writer::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.writers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Writer $writer
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Writer $writer, array $input)
    {
    	if ($writer->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.writers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Writer $writer
     * @throws GeneralException
     * @return bool
     */
    public function delete(Writer $writer)
    {
        if ($writer->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.writers.delete_error'));
    }
}
