<?php

namespace App\Models\Payments;

use App\Models\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use App\Models\Payments\Traits\PaymentAttribute;
use App\Models\Payments\Traits\PaymentRelationship;

class Payment extends Model
{
    use ModelTrait,
        PaymentAttribute,
    	PaymentRelationship {
            // PaymentAttribute::getEditButtonAttribute insteadof ModelTrait;
        }

    /**
     * NOTE : If you want to implement Soft Deletes in this model,
     * then follow the steps here : https://laravel.com/docs/6.x/eloquent#soft-deleting
     */

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'payments';

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
 
    public function installment()
    {
        return $this->belongsTo(\App\Models\Installments\Installment::class, 'installment_id');
    }
    

    public function student()
    {
        return $this->belongsTo(\App\Models\Students\Student::class, 'student_id');
    }
    
}
