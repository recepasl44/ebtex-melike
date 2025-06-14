<?php

namespace App\Repositories\Backend\SchoolBuses;

use App\Models\SchoolBuses\SchoolBus;
use Exception;

class SchoolBusRepository
{
    public function create(array $data)
    {
        try {
            return SchoolBus::create($data);
        } catch (Exception $e) {
            throw new Exception('Araç eklenirken bir hata oluştu.');
        }
    }

    public function update(SchoolBus $schoolBus, array $data)
    {
        try {
            return $schoolBus->update($data);
        } catch (Exception $e) {
            throw new Exception('Araç güncellenirken bir hata oluştu.');
        }
    }

    public function delete(SchoolBus $schoolBus)
    {
        try {
            return $schoolBus->delete();
        } catch (Exception $e) {
            throw new Exception('Araç silinirken bir hata oluştu.');
        }
    }

    public function all()
    {
        return SchoolBus::all();
    }

    public function find($id)
    {
        return SchoolBus::find($id);
    }
}
