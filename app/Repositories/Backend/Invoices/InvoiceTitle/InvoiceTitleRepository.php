<?php

namespace App\Repositories\Backend\Invoices\InvoiceTitle;

use App\Models\Invoice\InvoiceTitle\InvoiceTitle;

class InvoiceTitleRepository
{
    public function create(array $data)
    {
        return InvoiceTitle::create($data);
    }

    public function update(InvoiceTitle $invoiceTitle, array $data)
    {
        return $invoiceTitle->update($data);
    }

    public function delete(InvoiceTitle $invoiceTitle)
    {
        return $invoiceTitle->delete();
    }

    public function find($id)
    {
        return InvoiceTitle::with('details')->findOrFail($id);
    }

    public function all()
    {
        return InvoiceTitle::with('details')->get();
    }
}
