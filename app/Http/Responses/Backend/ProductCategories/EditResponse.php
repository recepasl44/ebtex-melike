<?php

namespace App\Http\Responses\Backend\ProductCategories;

use App\Models\ProductCategories\ProductCategory;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ProductCategories\ProductCategory
     */
    protected $productcategories;

    /**
     * @param App\Models\ProductCategories\ProductCategory $productcategories
     */
    public function __construct($productcategories)
    {
        $this->productcategories = $productcategories;
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
        $parents = collect(ProductCategory::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.productcategories.edit', compact('parents'))->with([
            'productcategories' => $this->productcategories
        ]);
    }
}