<?php

namespace App\View\Components\Backend;

use Illuminate\View\Component;

class Badge extends Component
{
    public $name;
    public $color;
    public $number;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $color, $number)
    {
        $this->name = $name;
        $this->color = $color;
        $this->number = $number;
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.backend.badge');
    }
}
