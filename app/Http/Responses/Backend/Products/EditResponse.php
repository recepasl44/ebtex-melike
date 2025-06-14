<?php

namespace App\Http\Responses\Backend\Products;

use App\Models\Workshops\Workshop;
use Illuminate\Contracts\Support\Responsable;
use App\Models\ProductTypes\ProductType;
use App\Models\ProductCategories\ProductCategory;
use App\Models\Access\User\User;
use App\Models\Firms\Firm;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Products\Product
     */
    protected $products;

    /**
     * @param App\Models\Products\Product $products
     */
    public function __construct($products)
    {
        $this->products = $products;
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
        $producttypes = collect(ProductType::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $productcategories = collect(ProductCategory::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $deliverers = collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        $receivers = $deliverers;

        $firms = collect(Firm::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $workshops = Workshop::all()->pluck('name', 'id');

        $unit_types = collect([
            '1' => _tr('kilogram'),
            '2' => _tr('liter'),
            '3' => _tr('piece')
        ]);
        return view('backend.products.edit',compact('producttypes', 'productcategories', 'deliverers', 'receivers', 'firms','unit_types', 'workshops' ))->with([
            'products' => $this->products
        ]);
    }
}