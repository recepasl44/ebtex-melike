<?php

namespace App\Models\Testimonials\Traits;

/**
 * Class TestimonialAttribute.
 */
trait TestimonialAttribute
{
    // Make your attributes functions here
    // Further, see the documentation : https://laravel.com/docs/6.x/eloquent-mutators#defining-an-accessor


    /**
     * Action Button Attribute to show in grid
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        return "<div class=\"btn-list\"> {$this->getEditButtonAttribute("edit-testimonial", "admin.testimonials.edit")}
                {$this->getDeleteButtonAttribute("delete-testimonial", "admin.testimonials.destroy")}
                </div>";
    }
}
