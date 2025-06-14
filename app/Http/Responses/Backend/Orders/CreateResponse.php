<?php

namespace App\Http\Responses\Backend\Orders;

use App\Models\Tasks\Task;
use App\Models\Vehicles\Vehicle;
use App\Models\Workshops\Workshop;
use Illuminate\Contracts\Support\Responsable;
use App\Models\Products\Product;
use App\Models\Access\User\User;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $products=collect(Product::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $users=collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });

        $workshops=collect(Workshop::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $tasks=collect(Task::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });

        $vehicles=collect(Vehicle::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['plate'].' - '.$item['chassis_number']];
        });

        $statuses = collect([
            0 => _tr('labels.general.pending'),
            1 => _tr('labels.general.rejected'),
            2 => _tr('labels.general.order_placed'),
            3 => _tr('labels.general.order_arrived'),
            4 => _tr('labels.general.sended'),
        ]);

        $approvals = collect([
            0 => _tr('labels.general.pending'),
            1 => _tr('labels.general.rejected'),
            2 => _tr('labels.general.approve'),
        ]);
        
        return view('backend.orders.create',compact('products', 'users', 'statuses', 'approvals', 'workshops', 'tasks', 'vehicles'));
    }
}