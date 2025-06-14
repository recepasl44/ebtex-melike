<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(CorePlatformsTableSeeder::class);
        $this->call(CoreDomainsTableSeeder::class);
        $this->call(AccessTableSeeder::class);
        $this->call(HistoryTypeTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(PagesTableSeeder::class);
        $this->call(ModulesTableSeeder::class);
        $this->call(SlidersTableSeeder::class);
        $this->call(MembersTableSeeder::class);
        $this->call(CardsTableSeeder::class);
        $this->call(TestimonialsTableSeeder::class);
        $this->call(MenusTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(ReferencesTableSeeder::class);
        $this->call(SubscribesTableSeeder::class);
        $this->call(BlogCategoriesTableSeeder::class);
        $this->call(BlogTagsTableSeeder::class);
        $this->call(BlogsTableSeeder::class);
        
        Model::reguard();
        
    }
}
