<?php

namespace App\View\Components\Backend;

class DateTime extends BaseComponent
{
    public $selected;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = null, $selected = null, $label = null)
    {
        parent::__construct($name, $label); // Call parent constructor to get URL and route info
        $this->selected = $selected ?? null;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.backend.date-time');
    }
}
