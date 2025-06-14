<?php

use App\Supports\Carbon;
use Database\DisableForeignKeys;
use Database\TruncateTable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoreDomainsTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        DB::table('core_domains')->delete();

        DB::table('core_domains')->insert(array (
            0 =>
            array (
                'id' => 1,
                'platform_id' => 1,
                'domain' => env('APP_DOMAIN', 'localhost'),
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 =>
            array (
                'id' => 2,
                'platform_id' => 2,
                'domain' => '127.0.0.1',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));


    }
}
