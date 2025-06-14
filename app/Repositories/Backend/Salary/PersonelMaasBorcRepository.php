<?php
namespace App\Repositories\Backend\Salary;

use App\Models\Personel\PersonelMaasBorc;

class PersonelMaasBorcRepository
{
    public function get($id)
{
    return \App\Models\Salary\PersonelMaasBorc::find($id);
}

    public function getAll()
    {
        return \App\Models\Salary\PersonelMaasBorc::with('personel', 'odemeler')->get();
    }

    public function create($data)
    {
        return \App\Models\Salary\PersonelMaasBorc::create($data);
    }

    public function update($id, $data)
    {
        $borc = \App\Models\Salary\PersonelMaasBorc::findOrFail($id);
        $borc->update($data);
        return $borc;
    }

    public function delete($id)
    {
        return \App\Models\Salary\PersonelMaasBorc::destroy($id);
    }
}
