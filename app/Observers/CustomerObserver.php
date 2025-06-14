<?php

namespace App\Observers;

use App\Shop\Customers\Customer;
use App\Models\Network\Tree;
use App\Models\Network\TreePosition;
use App\Models\Account\Account;

class CustomerObserver
{
    /**
     * Handle the customer "created" event.
     *
     * @param  \App\Customer  $customer
     * @return void
     */
    public function created(Customer $customer)
    {
        $tree = Tree::first();
        if ($tree) {
            $reference = $customer->reference;
            $tree->placeCustomer($reference, $customer);
        }
        $account=new Account;
        $account->code="";
        $account->name="cari";
        $account->balance=0;
        $account->accountable_id=$customer->id;
        $account->accountable_type="customer";
        $account->save();

    }

    /**
     * Handle the customer "updated" event.
     *
     * @param  \App\Customer  $customer
     * @return void
     */
    public function updated(Customer $customer)
    {
        //
    }

    /**
     * Handle the customer "deleted" event.
     *
     * @param  \App\Customer  $customer
     * @return void
     */
    public function deleted(Customer $customer)
    {
        //
    }

    /**
     * Handle the customer "restored" event.
     *
     * @param  \App\Customer  $customer
     * @return void
     */
    public function restored(Customer $customer)
    {
        //
    }

    /**
     * Handle the customer "force deleted" event.
     *
     * @param  \App\Customer  $customer
     * @return void
     */
    public function forceDeleted(Customer $customer)
    {
        //
    }
}
