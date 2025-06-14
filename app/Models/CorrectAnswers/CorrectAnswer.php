<?php

namespace App\Models\CorrectAnswers;

use App\Models\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use App\Models\CorrectAnswers\Traits\CorrectAnswerAttribute;
use App\Models\CorrectAnswers\Traits\CorrectAnswerRelationship;

class CorrectAnswer extends Model
{
    use ModelTrait,
        CorrectAnswerAttribute,
    	CorrectAnswerRelationship {
            // CorrectAnswerAttribute::getEditButtonAttribute insteadof ModelTrait;
        }

    /**
     * NOTE : If you want to implement Soft Deletes in this model,
     * then follow the steps here : https://laravel.com/docs/6.x/eloquent#soft-deleting
     */

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'correctanswers';

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
