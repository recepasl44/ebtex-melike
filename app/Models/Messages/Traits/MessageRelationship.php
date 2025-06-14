<?php

namespace App\Models\Messages\Traits;

/**
 * Class MessageRelationship
 */
use App\Models\Conversations\Conversation;
use App\Models\Access\User\User;


trait MessageRelationship
{
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
				
}
