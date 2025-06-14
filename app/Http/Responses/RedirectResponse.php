<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

class RedirectResponse implements Responsable
{
    protected $route;

    protected $message;

    public function __construct($route, $message)
    {
        $this->route = $route;
        $this->message = $message;
    }

    public function toResponse($request)
    {
        if(isset($this->message['flash_success'])){
            toastr()->success($this->message['flash_success']);
        }else if(isset($this->message['flash_danger'])){
            toastr()->error($this->message['flash_danger']);
        }else if(isset($this->message['flash_info'])){
            toastr()->info($this->message['flash_info']);
        }else if(isset($this->message['flash_warning'])){
            toastr()->warning($this->message['flash_warning']);
        }else{
            toastr()->primary($this->message[array_key_first($this->message)]);
        }
        
        return redirect()
            ->to($this->route)
            ->with($this->message);
    }
}
