<?php

namespace App\Http\Responses\Backend\ProductCategories;

use App\Models\ProductCategories\ProductCategory;
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
        $parents = collect(ProductCategory::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.productcategories.create', compact('parents'));
    }
}