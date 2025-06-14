<?php

namespace App\Repositories\Backend\Messages;

use DB;
use Carbon\Carbon;
use App\Models\Messages\Message;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MessageRepository.
 */
class MessageRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Message::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.messages.table').'.id',
                config('module.messages.table').'.conversation_id',
				config('module.messages.table').'.sender_id',
				config('module.messages.table').'.body',
				config('module.messages.table').'.read_at',
				config('module.messages.table').'.status',
				
                config('module.messages.table').'.created_at',
                config('module.messages.table').'.updated_at',
            ]);
            
        return $data;
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
        if (Message::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.messages.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Message $message
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Message $message, array $input)
    {
    	if ($message->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.messages.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Message $message
     * @throws GeneralException
     * @return bool
     */
    public function delete(Message $message)
    {
        if ($message->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.messages.delete_error'));
    }
}
