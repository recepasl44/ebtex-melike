<?php

namespace App\View\Components\Backend;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Component;

class BaseComponent extends Component
{
    public $name;
    public $label;
    public $module;
    public $moduleName;
    public $currentRoute;
    public $currentUrl;

    public $data;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = null, $label = null, $module = null)
    {
        $this->name = $name ?? 'name';
        $this->label = $label ? (str_contains($label, '_tr') ? $label : _tr($label)  ): (str_contains($name, '_id') ? (_tr($this->getWithOutId($name))) : _tr($name) );
        $this->currentRoute = Route::currentRouteName();
        $this->currentUrl = Request::fullUrl();
        $this->moduleName =  $module ?? $this->getThirdSegment($this->currentRoute) ?? $this->getSecondSegment($this->currentRoute);

        $this->data = get_defined_vars();
        $this->module = $module ?? null;
    }

    private function getFirstSegment($name, $separator = '_')
    {
        $segments = explode($separator, $name);
        return $segments[0] ?? null; // İlk segmenti al, eğer yoksa null döner
    }
    private function getSecondSegment($name, $separator = '.')
    {
        $segments = explode($separator, $name);
        return $segments[1] ?? null; // İkinci segmenti al, eğer yoksa null döner
    }
    private function getThirdSegment($name, $separator = '.')
    {
        $segments = explode($separator, $name);
        return isset($segments[3]) ? $segments[2] : null; // İkinci segmenti al, eğer yoksa null döner
    }

    private function getWithOutId($name, $separator = '_')
    {

        return str_replace('_id', '', $name) ?? null; // İkinci segmenti al, eğer yoksa null döner
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        // Base component render method
        return '';
    }
}
