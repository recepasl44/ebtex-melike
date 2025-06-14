<?php

namespace App\Http\Responses\Backend\Menu;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Str;

class EditResponse implements Responsable
{
    /**
     * @var array
     */
    protected $types;

    /**
     * @var \Glumbo\Generator\Module
     */
    protected $modules;

    /**
     * @var \App\Models\Menu\Menu
     */
    protected $menu;

    /**
     * @param \App\Models\Menu\Menu    $menu
     * @param array                    $types
     * @param \Glumbo\Generator\Module $modules
     */
    public function __construct($menu, $types, $modules)
    {
        $items = json_decode($menu->items);
        $this->changeNames($items);
        $menu->items = json_encode($items);

        $this->menu = $menu;
        $this->types = $types;
        $this->modules = $modules;
    }

    public function changeNames($objects) {
        foreach ($objects as $object) {
            // Change the name attribute of the current object
            if(!isset($object->content)){
                $object->content = $object->name;
            }
//            $object->content = _tr(Str::slug(Str::kebab($object->content), '_'));

            // Recursively change names for children objects
            if (!empty($object->children)) {
                $this->changeNames($object->children);
            }
        }
    }

    /**
     * toReponse.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        return view('backend.menus.edit')
                ->with('types', $this->types)
                ->with('menu', $this->menu)
                ->with('modules', $this->modules->all());
    }
}
