<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class TestimonialsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('testimonials')->delete();
        
        \DB::table('testimonials')->insert(array (
            0 => 
            array (
                'id' => 1,
                'comment' => '<p>test</p>',
                'name' => 'test',
                'cover' => NULL,
                'title' => 'testt',
                'created_at' => NULL,
                'updated_at' => '2021-09-04 15:30:46',
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'comment' => '<p>test2</p>',
                'name' => 'test2',
                'cover' => NULL,
                'title' => 'test2',
                'created_at' => '2021-09-04 15:54:24',
                'updated_at' => '2021-09-04 15:54:24',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}