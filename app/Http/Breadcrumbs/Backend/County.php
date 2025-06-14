<?php

Breadcrumbs::register('admin.counties.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.counties.management'), route('admin.counties.index'));
});

Breadcrumbs::register('admin.counties.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.counties.index');
    $breadcrumbs->push(_tr('menus.backend.counties.create'), route('admin.counties.create'));
});

Breadcrumbs::register('admin.counties.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.counties.index');
    $breadcrumbs->push(_tr('menus.backend.counties.edit'), route('admin.counties.edit', $id));
});
