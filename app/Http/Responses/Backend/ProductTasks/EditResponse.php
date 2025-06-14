<?php

namespace App\Http\Responses\Backend\ProductTasks;

use App\Models\Products\Product;
use App\Models\Tasks\Task;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ProductTasks\ProductTask
     */
    protected $producttasks;

    /**
     * @param App\Models\ProductTasks\ProductTask $producttasks
     */
    public function __construct($producttasks)
    {
        $this->producttasks = $producttasks;
    }

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
        
        return view('backend.producttasks.edit',compact('tasks', 'products'))->with([
            'producttasks' => $this->producttasks
        ]);
    }
}