<?php

namespace App\Repositories\Backend\BookPayments;

use DB;
use Carbon\Carbon;
use App\Models\BookPayments\BookPayment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookPaymentRepository.
 */
class BookPaymentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookPayment::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.bookpayments.table').'.id',
                config('module.bookpayments.table').'.total_books',
				config('module.bookpayments.table').'.unit_price',
				config('module.bookpayments.table').'.payment_amount',
				config('module.bookpayments.table').'.payment_method_id',
				config('module.bookpayments.table').'.payment_status_id',
				config('module.bookpayments.table').'.payment_document_url',
				
                config('module.bookpayments.table').'.created_at',
                config('module.bookpayments.table').'.updated_at',
            ]);
    }

}
