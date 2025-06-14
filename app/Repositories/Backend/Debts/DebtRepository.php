<?php
namespace App\Repositories\Backend\Debts;

use App\Models\Debts\Debt;
use App\Repositories\BaseRepository;

class DebtRepository extends BaseRepository
{
    const MODEL = Debt::class; 

    public function getForDataTable($supplierId)
    {
        return $this->query()->where('supplier_id', $supplierId)->get();
    }

    public function create(array $input)
    {
        return Debt::create($input);
    }

    public function update(Debt $debt, array $input)
    {
        return $debt->update($input);
    }

    public function delete(Debt $debt)
    {
        return $debt->delete();
    }
}
