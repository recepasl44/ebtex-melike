<?php

namespace App\View\Components\Backend;

use Illuminate\Support\Str;

class SelectLanguage extends BaseComponent
{
    public $options;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = 'lang', $options = null, $label = null)
    {
        $label = _tr('language');
        parent::__construct($name, $label); // Call parent constructor to get URL and route info

        $langs = collect(config('locale.languages') + ['all' => ['all', 'tr_TR', false, 'All']])->mapWithKeys(function ($item) {
            return [$item[0] => ( isset($item[3]) ? _tr($item[3]) : _tr($item[0]) )];
        });;

        $this->options = $options ?? (${Str::plural($name)} ?? ($langs ?? []) );
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.backend.select-box');
    }
}
