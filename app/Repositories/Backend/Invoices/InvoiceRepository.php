<?php 
namespace App\Repositories\Backend\Invoices;

use App\Models\Invoice;
use App\Repositories\BaseRepository;

class InvoiceRepository extends BaseRepository
{
    const MODEL = Invoice::class;

    public function getForDataTable($supplierId)
    {
        return $this->query()->where('supplier_id', $supplierId)->get();
    }

    public function create(array $input)
    {
        return Invoice::create($input);
    }

    public function update(Invoice $invoice, array $input)
    {
        return $invoice->update($input);
    }

    public function delete(Invoice $invoice)
    {
        return $invoice->delete();
    }
}
