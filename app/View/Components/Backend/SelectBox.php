<?php

namespace App\View\Components\Backend;

use Illuminate\Support\Str;

class SelectBox extends BaseComponent
{
    public $options;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = null, $options = null, $label = null)
    {
        parent::__construct($name, $label); // Call parent constructor to get URL and route info
        $this->options = $options ?? (${Str::plural($name)} ?? []);
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
