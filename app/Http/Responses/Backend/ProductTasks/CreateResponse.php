<?php

namespace App\Http\Responses\Backend\ProductTasks;

use App\Models\Products\Product;
use App\Models\Tasks\Task;
use Illuminate\Contracts\Support\Responsable;


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
        $products = Product::all()->pluck('name', 'id');
        $tasks = Task::all()->pluck('name', 'id');

        return view('backend.producttasks.create',compact('tasks', 'products'));
    }
}