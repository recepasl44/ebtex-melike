<?php

namespace App\Repositories\Backend\Words;

use DB;
use App\Supports\Carbon;
use App\Models\Words\Word;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class WordRepository.
 */
class WordRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Word::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.words.table').'.id',
                config('module.words.table').'.lang',
                config('module.words.table').'.word',
                config('module.words.table').'.meaning',
                config('module.words.table').'.created_at',
                config('module.words.table').'.updated_at',
            ]);
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        $input['word'] = Str::slug(Str::kebab($input['word']), '_');
        $word = Word::where('word', $input['word'])->where('lang', $input['lang'])->first();
        if($word){
            $this->update($word, $input);
        }elseif (Word::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.words.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Word $word
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Word $word, array $input)
    {
        $input['word'] = Str::slug(Str::kebab($input['word']), '_');
    	if ($word->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.words.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Word $word
     * @throws GeneralException
     * @return bool
     */
    public function delete(Word $word)
    {
        if ($word->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.words.delete_error'));
    }
}
