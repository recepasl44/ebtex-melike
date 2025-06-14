<?php

namespace App\Repositories\Backend\References;

use DB;
use App\Supports\Carbon;
use App\Models\References\Reference;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ReferenceRepository.
 */
class ReferenceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Reference::class;

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
                config('module.references.table').'.id',
                config('module.references.table').'.name',
                config('module.references.table').'.cover',
                config('module.references.table').'.link',
                config('module.references.table').'.created_at',
                config('module.references.table').'.updated_at',
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
        if (Reference::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.references.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Reference $reference
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Reference $reference, array $input)
    {
    	if ($reference->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.references.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Reference $reference
     * @throws GeneralException
     * @return bool
     */
    public function delete(Reference $reference)
    {
        if ($reference->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.references.delete_error'));
    }
}
