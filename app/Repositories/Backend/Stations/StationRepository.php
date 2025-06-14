<?php

namespace App\Repositories\Backend\Stations;

use App\Models\Stations\Station;
use Exception;

class StationRepository
{
    public function create(array $data)
    {
        try {
            return Station::create($data);
        } catch (Exception $e) {
            throw new Exception('Durak eklenirken bir hata oluştu.');
        }
    }

    public function update(Station $station, array $data)
    {
        try {
            return $station->update($data);
        } catch (Exception $e) {
            throw new Exception('Durak güncellenirken bir hata oluştu.');
        }
    }

    public function delete(Station $station)
    {
        try {
            return $station->delete();
        } catch (Exception $e) {
            throw new Exception('Durak silinirken bir hata oluştu.');
        }
    }

    public function all()
    {
        return Station::all();
    }

    public function find($id)
    {
        return Station::find($id);
    }
}
