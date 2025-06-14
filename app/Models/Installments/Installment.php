<?php

namespace App\Models\Installments;

use App\Models\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use App\Models\Installments\Traits\InstallmentAttribute;
use App\Models\Installments\Traits\InstallmentRelationship;

class Installment extends Model
{
    use ModelTrait,
        InstallmentAttribute,
    	InstallmentRelationship {
            // InstallmentAttribute::getEditButtonAttribute insteadof ModelTrait;
        }

    /**
     * NOTE : If you want to implement Soft Deletes in this model,
     * then follow the steps here : https://laravel.com/docs/6.x/eloquent#soft-deleting
     */

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'installments';

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
    public function student()
    {
        return $this->belongsTo(\App\Models\Students\Student::class, 'student_id');
    }

    public function payments()
    {
        return $this->hasMany(\App\Models\Payments\Payment::class, 'installment_id');
    }
    public function isDelayed()
{
    return !$this->is_paid && $this->due_date < now();
}
protected $casts = [
    'due_date' => 'datetime',
];
}
