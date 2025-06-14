<?php

namespace App\Repositories\Backend\FieldManagers;

use DB;
use Carbon\Carbon;
use App\Models\FieldManagers\FieldManager;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FieldManagerRepository.
 */
class FieldManagerRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = FieldManager::class;

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
                config('module.fieldmanagers.table').'.id',
                config('module.fieldmanagers.table').'.method',
				config('module.fieldmanagers.table').'.role_id',
				config('module.fieldmanagers.table').'.field',
				config('module.fieldmanagers.table').'.status',
				
                config('module.fieldmanagers.table').'.created_at',
                config('module.fieldmanagers.table').'.updated_at',
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
        // Ortak alanlar
        $method = $input['method'] ?? null;
        $status = $input['status'] ?? 0;

        if (!$method) {
            throw new GeneralException(trans('exceptions.backend.fieldmanagers.create_error') . ' - Method eksik.');
        }

        DB::beginTransaction();

        try {
            if (isset($input['role_ids']) && isset($input['fields'])) {
                foreach ($input['role_ids'] as $roleId) {
                    foreach ($input['fields'] as $field) {
                        FieldManager::updateOrCreate(
                            [
                                'method'  => $method,
                                'role_id' => $roleId,
                                'field'   => $field,
                            ],
                            [
                                'status' => $status,
                            ]
                        );
                    }
                }
            } elseif (isset($input['role_id']) && isset($input['field'])) {
                FieldManager::updateOrCreate(
                    [
                        'method'  => $method,
                        'role_id' => $input['role_id'],
                        'field'   => $input['field'],
                    ],
                    [
                        'status' => $status,
                    ]
                );
            } else {
                throw new GeneralException(trans('exceptions.backend.fieldmanagers.create_error') . ' - Giriş verileri eksik.');
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new GeneralException(trans('exceptions.backend.fieldmanagers.create_error') . ' - ' . $e->getMessage());
        }
    }

    /**
     * For updating the respective Model in storage
     *
     * @param FieldManager $fieldmanager
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(FieldManager $fieldmanager, array $input)
    {
    	if ($fieldmanager->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.fieldmanagers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param FieldManager $fieldmanager
     * @throws GeneralException
     * @return bool
     */
    public function delete(FieldManager $fieldmanager)
    {
        if ($fieldmanager->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.fieldmanagers.delete_error'));
    }
}
