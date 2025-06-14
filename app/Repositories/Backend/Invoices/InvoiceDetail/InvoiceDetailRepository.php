<?php

namespace App\Repositories\Backend\Invoices\InvoiceDetail;

use App\Models\Invoice\InvoiceDetail\InvoiceDetail;

class InvoiceDetailRepository
{
    public function create(array $data)
    {
        return InvoiceDetail::create($data);
    }

    public function update(InvoiceDetail $invoiceDetail, array $data)
    {
        return $invoiceDetail->update($data);
    }

    public function delete(InvoiceDetail $invoiceDetail)
    {
        return $invoiceDetail->delete();
    }
}
