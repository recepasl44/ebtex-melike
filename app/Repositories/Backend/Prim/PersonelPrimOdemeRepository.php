<?php

namespace App\Repositories\Backend\Prim;

use App\Models\PersonelPrimOdeme;

class PersonelPrimOdemeRepository
{
    public function create($data)
    {
        return \App\Models\Prim\PersonelPrimOdeme::create($data);
    }

    public function getByPrimId($primId)
    {
        return \App\Models\Prim\PersonelPrimOdeme::where('prim_id', $primId)->get();
    }

    public function delete($id)
    {
        return \App\Models\Prim\PersonelPrimOdeme::destroy($id);
    }
}
