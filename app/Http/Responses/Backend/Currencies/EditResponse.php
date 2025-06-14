<?php

namespace App\Http\Responses\Backend\Currencies;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Currencies\Currency
     */
    protected $currencies;

    /**
     * @param App\Models\Currencies\Currency $currencies
     */
    public function __construct($currencies)
    {
        $this->currencies = $currencies;
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
        
        return view('backend.currencies.edit',)->with([
            'currencies' => $this->currencies
        ]);
    }
}