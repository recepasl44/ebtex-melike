<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class BlogCategoriesTableSeeder extends Seeder
{

    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('blog_categories')->delete();
        
        \DB::table('blog_categories')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Python',
                'status' => 1,
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-09-09 19:36:19',
                'updated_at' => '2021-09-09 19:36:19',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
        ));
        
        
    }
}