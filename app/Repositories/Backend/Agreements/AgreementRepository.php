<?php

namespace App\Repositories\Backend\Agreements;

use DB;
use Carbon\Carbon;
use App\Models\Agreements\Agreement;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AgreementRepository.
 */
class AgreementRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Agreement::class;

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
                config('module.agreements.table').'.id',
                config('module.agreements.table').'.name',
				config('module.agreements.table').'.path',
				
                config('module.agreements.table').'.created_at',
                config('module.agreements.table').'.updated_at',
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
        if (Agreement::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.agreements.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Agreement $agreement
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Agreement $agreement, array $input)
    {
    	if ($agreement->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.agreements.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Agreement $agreement
     * @throws GeneralException
     * @return bool
     */
    public function delete(Agreement $agreement)
    {
        if ($agreement->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.agreements.delete_error'));
    }
}
