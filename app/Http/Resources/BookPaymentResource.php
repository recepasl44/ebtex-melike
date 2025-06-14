<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookPaymentResource extends MainResources
{
    /**
         * Transform the resource into an array.
         *
         * @param  \Illuminate\Http\Request
         *
         * @return array
         */
        public function fields($request)
        {
            return [
                'id' => $this->id,
                'total_books' => $this->total_books,
                'unit_price' => $this->unit_price,
                'payment_amount' => $this->payment_amount,
                'payment_method_id' => $this->payment_method_id,
                'payment_status_id' => $this->payment_status_id,
                'payment_document_url' => $this->payment_document_url,
                ];
        }
}
