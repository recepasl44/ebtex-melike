<?php

namespace App\Repositories\Backend\Salary;

use App\Models\Salary\PersonelMaasBorc;



class PersonelMaasOdemeRepository
{
    public function get($id)
{
    return PersonelMaasBorc::find($id);
}

    public function getAll()
    {
        return \App\Models\Salary\PersonelMaasOdeme::with('borc')->get();
    }

    public function create($data)
    {
        return \App\Models\Salary\PersonelMaasOdeme::create($data);
    }

    public function update($id, $data)
    {
        $odeme = \App\Models\Salary\PersonelMaasOdeme::findOrFail($id);
        $odeme->update($data);
        return $odeme;
    }

    public function delete($id)
    {
        return \App\Models\Salary\PersonelMaasOdeme::destroy($id);
    }
}
