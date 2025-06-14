<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class ReferencesTableSeeder extends Seeder
{

    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('references')->delete();
        
        \DB::table('references')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Glossier',
                'cover' => 'img/references/Pj9xTwtcvuzRADXcToqakLw4cX5ZmwzT0lNnMjIM.png',
                'link' => NULL,
                'created_at' => '2021-09-09 17:57:11',
                'updated_at' => '2021-09-09 17:57:11',
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Aesop',
                'cover' => 'img/references/O3FkWbGdloOuiyOi9BQYNwj4JgNRx3u0Qq9JH6lJ.png',
                'link' => NULL,
                'created_at' => '2021-09-09 17:57:42',
                'updated_at' => '2021-09-09 17:57:42',
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Everlane',
                'cover' => 'img/references/YhaCHsZtHqGSkbLQywuFhyFeodurIVrsjhVACTVL.png',
                'link' => 'https://pikoyazilim.com',
                'created_at' => '2021-09-09 17:58:18',
                'updated_at' => '2021-09-09 18:03:28',
                'platform_id' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Pegasus',
                'cover' => 'img/references/UyMCd6xyk1MEpU4l9DXYgBKxBRAP3jkzDOPgBuKT.png',
                'link' => NULL,
                'created_at' => '2021-09-09 17:58:31',
                'updated_at' => '2021-09-09 17:58:31',
                'platform_id' => 1,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Comedy',
                'cover' => 'img/references/TeDlwgZuiLUUCVvC3GUO7BfSXKJKy9sDOq4Ggv5f.png',
                'link' => NULL,
                'created_at' => '2021-09-09 17:58:42',
                'updated_at' => '2021-09-09 17:58:42',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}