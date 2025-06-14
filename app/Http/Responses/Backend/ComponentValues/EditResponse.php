<?php

namespace App\Http\Responses\Backend\ComponentValues;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Components\Component;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ComponentValues\ComponentValue
     */
    protected $componentvalues;

    /**
     * @param App\Models\ComponentValues\ComponentValue $componentvalues
     */
    public function __construct($componentvalues)
    {
        $this->componentvalues = $componentvalues;
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
        $components= collect(Component::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        $component = Component::where('id', $this->componentvalues->component_id)->firstOrFail();
        if($component){
            $variables = json_decode($component->variables);
        }else{
            $variables = [];
        }
        if(!empty($this->componentvalues->values)){
            $values = flattenArray(json_decode($this->componentvalues->values, true));
            if(!empty($values['cover'])){
                $this->componentvalues->cover = $values['cover'];
            }
        }else{
            $values = null;
        }

        return view('backend.componentvalues.edit',compact('components', 'variables', 'values'))->with([
            'componentvalues' => $this->componentvalues
        ]);
    }
}