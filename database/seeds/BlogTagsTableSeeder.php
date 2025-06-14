<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class BlogTagsTableSeeder extends Seeder
{

    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('blog_tags')->delete();
        
        \DB::table('blog_tags')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Django',
                'status' => 1,
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-09-09 19:36:51',
                'updated_at' => '2021-09-09 19:36:51',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
        ));
        
        
    }
}