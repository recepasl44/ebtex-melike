<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class MenuResource extends MainResources
{
    
    public function updateMenuItems($menuItems) {
        foreach ($menuItems as &$item) {
            // Eğer item çocukları (children) varsa, 'type' olarak 'sub' ekleyelim
            if (isset($item->children) && is_array($item->children)) {
                $item->type = 'sub';
                // Çocukları da güncelle
                $item->children = $this->updateMenuItems($item->children);
            } else {
                // Eğer children yoksa, 'type' olarak 'link' ekleyelim
                $item->type = 'link';
            }
            
            // 'active' ve 'selected' özelliklerini false olarak ekleyelim
            $item->active = false;
            $item->selected = false;
            $path = getRouteUrl($item->url, $item->url_type);
            $paths = explode('admin', $path);
            $item->path = 'admin'.end($paths);
        }
        
        return $menuItems;
    }
    
    /**
         * Transform the resource into an array.
         *
         * @param  \Illuminate\Http\Request
         *
         * @return array
         */
        public function fields($request)
        {
            $items = $this->updateMenuItems(json_decode($this->items));
            
            return [
         'id' => $this->id,
                'type' => $this->type,
                'name' => $this->name,
                'items' => $items,
                ];
        }
}
