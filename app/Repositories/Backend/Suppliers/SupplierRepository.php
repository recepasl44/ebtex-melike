<?php
namespace App\Repositories\Backend\Suppliers;

use App\Models\Supplier;
use App\Repositories\BaseRepository;

class SupplierRepository extends BaseRepository
{
    const MODEL = Supplier::class;



    public function getForDataTable()
    {
        // refunds, debts, ve notes ilişkilerini dahil ederek her supplier için ilgili verileri çekiyoruz
        return $this->query()
            ->with(['refunds', 'debts', 'notes']) // refunds, debts, ve notes ilişkilerini dahil ediyoruz
            ->get()
            ->map(function ($supplier) {
                // refunds ilişkisinden toplam iade miktarını hesaplıyoruz
                $supplier->total_refund = $supplier->refunds->sum('amount');

                // debts ilişkisinden toplam borç miktarını hesaplıyoruz
                $supplier->total_debt = $supplier->debts->sum('amount');

                // notes ilişkisinden toplam not sayısını hesaplıyoruz
                $supplier->total_notes = $supplier->notes->count();

                return $supplier;
            });
    }

    public function create(array $input)
    {
        return Supplier::create($input);
    }

    public function update(\App\Models\Supplier $supplier, array $input)
    {
        return $supplier->update($input);
    }

    public function delete(Supplier $supplier)
    {
        return $supplier->delete();
    }
}
