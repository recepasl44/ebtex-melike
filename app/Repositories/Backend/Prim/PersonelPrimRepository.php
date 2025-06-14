<?php

namespace App\Repositories\Backend\Prim;

use App\Models\PersonelPrim;

class PersonelPrimRepository
{
    public function getAll()
    {
        return \App\Models\Prim\PersonelPrim::with('personel')->get();
    }

    public function create($data)
    {
        return \App\Models\Prim\PersonelPrim::create($data);
    }

    public function update($id, $data)
    {
        $prim = \App\Models\Prim\PersonelPrim::findOrFail($id);
        $prim->update($data);
        return $prim;
    }

    public function delete($id)
    {
        return \App\Models\Prim\PersonelPrim::destroy($id);
    }
}
