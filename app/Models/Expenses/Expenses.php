<?php
namespace App\Models\Expenses;

use App\Models\Supplier;
use App\Models\Expenses\ExpenseCategory; // Bu satırı ekleyin
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id', 
        'seasson_id', 
        'branch_id', 
        'invoice_serial_no', 
        'invoice_date', 
        'expense_category_id', 
        'amount', 
        'description', 
        'status',
        'due_data',
        'pay_id', 
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }
    public function branch()
    {
        return $this->belongsTo(\App\Models\Branches\Branche::class, 'branch_id');
    }

    /**
     * Season ilişkisi (seasson_id üzerinden).
     */
    public function season()
    {
        return $this->belongsTo(\App\Models\Seasons\Season::class, 'seasson_id');
    }
}
