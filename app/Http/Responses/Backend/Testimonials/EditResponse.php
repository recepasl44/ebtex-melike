<?php

namespace App\Http\Responses\Backend\Testimonials;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Testimonials\Testimonial
     */
    protected $testimonials;

    /**
     * @param App\Models\Testimonials\Testimonial $testimonials
     */
    public function __construct($testimonials)
    {
        $this->testimonials = $testimonials;
    }

    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        return view('backend.testimonials.edit')->with([
            'testimonials' => $this->testimonials
        ]);
    }
}