<?php

namespace App\Http\Responses\Backend\Navbars;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Navbars\Navbar;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Navbars\Navbar
     */
    protected $navbars;

    /**
     * @param App\Models\Navbars\Navbar $navbars
     */
    public function __construct($navbars)
    {
        $this->navbars = $navbars;
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
        $status = [
            0 => _tr('labels.backend.navbars.table.passive'),
            1 => _tr('labels.backend.navbars.table.active')
        ];
        $spesific = [
            0 => _tr('labels.backend.navbars.table.no'),
            1 => _tr('labels.backend.navbars.table.yes')
        ];
        $parents=collect(Navbar::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        
        return view('backend.navbars.edit')->with([
            'navbars' => $this->navbars,
            "status" => $status,
            "spesific" => $spesific,
            "parents" => $parents,
        ]);
    }
}