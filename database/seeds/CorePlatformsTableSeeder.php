<?php

use App\Supports\Carbon;
use Database\DisableForeignKeys;
use Database\TruncateTable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorePlatformsTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        DB::table('core_platforms')->delete();

        DB::table('core_platforms')->insert(array (
            0 =>
            array (
                'id' => 1,
                'name' => 'Piko 1',
                'owner_name' => 'Ali Arslan',
                'phone' => '053123456789',
                'gsm' => '053123456789',
                'mail' => 'ali@arslan.com',
                'status' => 1,
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 =>
            array (
                'id' => 2,
                'name' => 'Piko 2',
                'owner_name' => 'Anıl Aydemir',
                'phone' => '054123456789',
                'gsm' => '054123456789',
                'mail' => 'anil@aydemir.com',
                'status' => 1,
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));


    }
}
