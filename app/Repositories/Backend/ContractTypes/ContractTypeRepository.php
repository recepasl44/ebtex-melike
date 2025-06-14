<?php

namespace App\Repositories\Backend\ContractTypes;

use DB;
use Carbon\Carbon;
use App\Models\ContractTypes\ContractType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContractTypeRepository.
 */
class ContractTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ContractType::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.contracttypes.table').'.id',
                config('module.contracttypes.table').'.name',
				config('module.contracttypes.table').'.status',
				
                config('module.contracttypes.table').'.created_at',
                config('module.contracttypes.table').'.updated_at',
            ]);
            
        return $data;
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
        if (ContractType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.contracttypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ContractType $contracttype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ContractType $contracttype, array $input)
    {
    	if ($contracttype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.contracttypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ContractType $contracttype
     * @throws GeneralException
     * @return bool
     */
    public function delete(ContractType $contracttype)
    {
        if ($contracttype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.contracttypes.delete_error'));
    }
}
