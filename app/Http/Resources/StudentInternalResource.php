<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class StudentInternalResource extends MainResources
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function fields($request)
    {
        $success = "";
        if ($this->next_season_registered < 1) {
            $success =  0;
        }elseif ($this->registered <= $this->both_season_registered) {
            $success =  100;
        }else{
            $success =  number_format($this->both_season_registered * 100 / $this->registered, 2, '.', '');
        }
        return [
            'branche_id' => $request->branche_id ?? 1,
            'all_registered' => $this->all_registered,
            'registered' => $this->registered,
            'next_season_registered' => $this->next_season_registered,
            'both_season_registered' => $this->both_season_registered,
            'success' => $success,
        ];
    }
}
