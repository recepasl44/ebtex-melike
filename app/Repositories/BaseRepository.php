<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

/**
 * Class BaseRepository.
 */
class BaseRepository
{

    public $file_upload_path;
    public $image_upload_path;

    public $storage;

    public function __construct()
    {
        $this->image_upload_path = 'img'.DIRECTORY_SEPARATOR;
        $this->file_upload_path = 'file'.DIRECTORY_SEPARATOR;
        $this->storage = Storage::disk('public');
    }


    public function filter(Builder $query, array $filters): Builder
    {
        $model = $query->getModel();
        $table = $model->getTable();
        $connection = Schema::connection($model->getConnectionName());

        foreach ($filters as $field => $value) {
            if (is_null($value) || $value === '') {
                continue;
            }

            if (!$connection->hasColumn($table, $field)) {
                continue;
            }

            $query->where($field, $value);
        }

        return $query;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->query()->get();
    }

    public function getByFilter($query){
        if(access()->user()->workshop_id){
            return $query->where(function ($query) {
                $query->whereNull('workshop_id')
                    ->orWhere('workshop_id', access()->user()->workshop_id);
            });
        }
        return $query;
    }



    /**
     * Get Paginated.
     *
     * @param $per_page
     * @param string $active
     * @param string $order_by
     * @param string $sort
     *
     * @return mixed
     */
    public function getPaginated($per_page, $active = '', $order_by = 'id', $sort = 'asc')
    {
        if ($active) {
            return $this->query()->where('status', $active)
                ->orderBy($order_by, $sort)
                ->paginate($per_page);
        } else {
            return $this->query()->orderBy($order_by, $sort)
                ->paginate($per_page);
        }
    }

    /**
     * @return mixed
     */
    public function getCount()
    {
        return $this->query()->count();
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function find($id)
    {
        return $this->query()->find($id);
    }

    /**
     * @return mixed
     */
    public function query()
    {
        return call_user_func(static::MODEL.'::query');
    }

    /**
     * Upload Image.
     *
     * @param array $input
     *
     * @return array $input
     */
    public function uploadImage($input, $model_name='all', $path = 'cover')
    {
        if (isset($input[$path]) && !empty($input[$path])) {
            $avatar = $input[$path];
            $fileName = time().$avatar->getClientOriginalName();

            $this->storage->put($this->image_upload_path.$model_name.DIRECTORY_SEPARATOR.$fileName, file_get_contents($avatar->getRealPath()));

            $input = array_merge($input, [$path => $this->image_upload_path.$model_name.DIRECTORY_SEPARATOR.$fileName]);

            return $input;
        }
    }

    /**
     * Upload Image.
     *
     * @param array $input
     *
     * @return array $input
     */
    public function uploadFile($input, $model_name='all', $path = 'cover')
    {
        if (isset($input[$path]) && !empty($input[$path])) {
            $avatar = $input[$path];
            $fileName = time().($avatar->getClientOriginalName() ?? '');

            $this->storage->put($this->file_upload_path.$model_name.DIRECTORY_SEPARATOR.$fileName, file_get_contents($avatar->getRealPath()));

            $input = array_merge($input, [$path => $this->file_upload_path.$model_name.DIRECTORY_SEPARATOR.$fileName]);

            return $input;
        }
    }

    /**
     * Destroy Old Image.
     *
     * @param int $id
     */
    public function deleteOldFile($model, $path = 'cover')
    {
        $fileName = $model->{$path};

        return $this->storage?->delete($fileName);
    }
}
