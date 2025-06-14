<?php

namespace App\Models\Students;

use App\Models\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use App\Models\Students\Traits\StudentAttribute;
use App\Models\Students\Traits\StudentRelationship;

class Student extends Model
{
    use ModelTrait,
        StudentAttribute,
    	StudentRelationship {
            // StudentAttribute::getEditButtonAttribute insteadof ModelTrait;
        }

    /**
     * NOTE : If you want to implement Soft Deletes in this model,
     * then follow the steps here : https://laravel.com/docs/6.x/eloquent#soft-deleting
     */

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'students';

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
    public function parent()
{
    return $this->hasOne(\App\Models\Parent\ParentModel::class, 'student_id');
}

public function program()
{
    return $this->belongsTo(\App\Models\Programs\Program::class, 'program_id');
}
public function season()
{
    return $this->belongsTo(\App\Models\Seasons\Season::class, 'season_id');
}
public function branch()
{
    return $this->belongsTo(\App\Models\Branches\Branche::class, 'branche_id');
}
}
