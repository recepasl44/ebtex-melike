<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class SubscribesTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('subscribes')->delete();
        
        \DB::table('subscribes')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Anil Jiyan Aydemir',
                'email' => 'aniljiyan.aydemir@gmail.com',
                'phone' => '+905348440445',
                'created_at' => '2021-09-09 18:43:46',
                'updated_at' => '2021-09-09 18:46:36',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}