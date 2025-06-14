<?php

Breadcrumbs::register('admin.cities.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.cities_management'), route('admin.cities.index'));
});

Breadcrumbs::register('admin.cities.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.cities.index');
    $breadcrumbs->push(_tr('menus.backend.cities.create'), route('admin.cities.create'));
});

Breadcrumbs::register('admin.cities.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.cities.index');
    $breadcrumbs->push(_tr('menus.backend.cities.edit'), route('admin.cities.edit', $id));
});
