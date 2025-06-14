<?php

namespace App\Http\Resources;

use App\Models\FieldManagers\FieldManager;
use Illuminate\Http\Resources\Json\JsonResource;

class MainResources extends JsonResource
{
    public $validRelations = [];
    public $validExtras = [];

    public function __construct($resource)
    {
        if(request()->has('with')){
            $withs = array_map('trim', explode(',', request()->input('with')));
            $withs = array_map('strtolower', $withs);
            if($withs && count($withs) > 0 ){
                if(!empty($this->relationsArray)){
                    $this->validRelations = array_intersect($withs, $this->relationsArray ) ?? null;
                }
                if(!empty($this->extrasArray)){
                    $this->validExtras = array_intersect($withs, $this->extrasArray ) ?? null;
                }
                if(!empty($resource)){
                    $resource = $resource->load($this->validRelations);
                }
            }

        }
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        // Child resource'un toArray içeriğini array olarak alalım
        $data = $this->fields($request);
 $user = access()->user();
        $role = $user ? $user->roles()->first() : null;        $roleId = $role ? $role->id : null; // role_id yoksa null
        $method = $this->getResourceName();

        // Eğer role_id yoksa yetki kontrolü yapmadan direk dönebiliriz
        if (!$roleId) {
            return $data;
        }

        $permissions = FieldManager::where('method', $method)
            ->where('role_id', $roleId)
            ->pluck('status', 'field');

        $filtered = [];
        foreach ($data as $field => $value) {
            $status = $permissions->get($field, 1); // Default 1: görünür
            if($status == 1){
                $filtered[$field] = $value;
            }
        }

        return $filtered;
    }

    /**
     * Child resource'lar override edecek ve ham veriyi array olarak dönecek
     */
    protected function fields($request)
    {
        return [];
    }

    /**
     * Resource ismini otomatik alır
     */
    protected function getResourceName()
    {
        $class = class_basename($this); // VehicleResource
        return strtolower(str_replace('Resource', '', $class)); // vehicle
    }
}