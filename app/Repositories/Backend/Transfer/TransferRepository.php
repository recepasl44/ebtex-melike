<?php

namespace App\Repositories\Backend\Transfer;

use App\Models\Transfer\Transfer;

class TransferRepository
{
    public function getAllTransfers()
    {
        return Transfer::all();
    }

    public function storeTransfer($data)
    {
        return Transfer::create($data);
    }
}
