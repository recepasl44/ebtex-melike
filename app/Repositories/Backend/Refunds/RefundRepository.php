<?php

namespace App\Repositories\Backend\Refunds;

use App\Models\Refunds\Refund;
use App\Repositories\BaseRepository;

class RefundRepository extends BaseRepository
{
    const MODEL = \App\Models\Refunds\Refund::class;

    public function getForDataTable($supplierId)
    {
        return $this->query()->where('supplier_id', $supplierId)->get();
    }

    public function create(array $input)
    {
        return Refund::create($input);
    }

    public function update(Refund $refund, array $input)
    {
        return $refund->update($input);
    }

    public function delete(Refund $refund)
    {
        return $refund->delete();
    }
}
