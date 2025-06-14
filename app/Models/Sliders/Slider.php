<?php

namespace App\Models\Sliders;

use App\Models\ModelTrait;
use App\Models\Traits\Language;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sliders\Traits\SliderAttribute;
use App\Models\Sliders\Traits\SliderRelationship;
use App\Models\BaseModel;

class Slider extends BaseModel
{
    use ModelTrait,
        SliderAttribute,
        Language,
    	SliderRelationship {
            // SliderAttribute::getEditButtonAttribute insteadof ModelTrait;
        }
    

    /**
     * NOTE : If you want to implement Soft Deletes in this model,
     * then follow the steps here : https://laravel.com/docs/6.x/eloquent#soft-deleting
     */

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'sliders';

    /**
     * Mass Assignable fields of model
     * @var array
     */
    protected $fillable = [

    ];

    /**
     * Default values for model fields
     * @var array
     */
    protected $attributes = [

    ];

    /**
     * Dates
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    /**
     * Guarded fields of model
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * Constructor of Model
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }
}
