<?php

namespace App\Repositories\Backend\Drivings;

use App\Models\Drivings\Driving;
use Exception;

class DrivingRepository
{
    public function create(array $data)
    {
        try {
            return Driving::create($data);
        } catch (Exception $e) {
            throw new Exception('Sürücü oluşturulurken bir hata oluştu.');
        }
    }

    public function update(Driving $driving, array $data)
    {
        try {
            return $driving->update($data);
        } catch (Exception $e) {
            throw new Exception('Sürücü güncellenirken bir hata oluştu.');
        }
    }

    public function delete(Driving $driving)
    {
        try {
            return $driving->delete();
        } catch (Exception $e) {
            throw new Exception('Sürücü silinirken bir hata oluştu.');
        }
    }

    public function all()
    {
        return Driving::all();
    }

    public function find($id)
    {
        return Driving::find($id);
    }
}