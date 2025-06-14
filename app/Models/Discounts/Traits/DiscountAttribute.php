<?php

namespace App\Models\Discounts\Traits;

/**
 * Class DiscountAttribute.
 */
trait DiscountAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-discount", "admin.discounts.edit")}
                {$this->getDeleteButtonAttribute("delete-discount", "admin.discounts.destroy")}
                </div>";
    }

    public function getPriceTypeStatusAttribute(){
        return '<label class="badge bg-outline-'.$this->getStatusColor($this->type).'">'.$this->getPriceType($this->type).'</label>';
    }

    public function getDiscountTypeStatusAttribute(){
        return '<label class="badge bg-outline-'.$this->getStatusColor($this->discount_type).'">'.$this->getDiscountType($this->discount_type).'</label>';
    }

    public function getPriceType($status)
    {
        $array = ['0' => _tr('percentile'), '1' => _tr('net_price')];
        return $array[$status];
    }
    public function getDiscountType($status){
        $array = ['0' => _tr('seasonal_discount'), '1' => _tr('general_discount')];
        return $array[$status];
    }
}
