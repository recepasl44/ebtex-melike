<?php

namespace App\View\Components\Backend;

class InputPhone extends BaseComponent
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = null, $label = null)
    {
        parent::__construct($name, $label); // Call parent constructor to get URL and route info
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.backend.input-phone');
    }
}
