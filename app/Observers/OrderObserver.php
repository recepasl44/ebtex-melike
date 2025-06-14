<?php

namespace App\Observers;

use App\Shop\Orders\Order;
use App\Jobs\OrderPointsCalculatorJob;
use App\Jobs\OrderInvoicesJob;

class OrderObserver
{
    
    public function created(Order $order)
    {
        OrderPointsCalculatorJob::dispatch($order);
    }

    /**
     * Handle the order "updated" event.
     *
     * @param  \App\Shop\Orders\Order  $order
     * @return void
     */
    public function updated(Order $order)
    {

        OrderPointsCalculatorJob::dispatch($order);
        if($order->isDirty('order_status_id') && $order->order_status_id==1){
            OrderInvoicesJob::dispatch($order);
        }
                
    }

    /**
     * Handle the order "deleted" event.
     *
     * @param  \App\Shop\Orders\Order  $order
     * @return void
     */
    public function deleted(Order $order)
    {
        OrderPointsCalculatorJob::dispatch($order);
    }

    /**
     * Handle the order "restored" event.
     *
     * @param  \App\Shop\Orders\Order  $order
     * @return void
     */
    public function restored(Order $order)
    {
        OrderPointsCalculatorJob::dispatch($order);
    }

    /**
     * Handle the order "force deleted" event.
     *
     * @param  \App\Shop\Orders\Order  $order
     * @return void
     */
    public function forceDeleted(Order $order)
    {
        OrderPointsCalculatorJob::dispatch($order);
    }
}
