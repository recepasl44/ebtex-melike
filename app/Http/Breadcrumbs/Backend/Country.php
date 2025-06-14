<?php

Breadcrumbs::register('admin.countries.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.countries_management'), route('admin.countries.index'));
});

Breadcrumbs::register('admin.countries.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.countries.index');
    $breadcrumbs->push(_tr('menus.backend.countries.create'), route('admin.countries.create'));
});

Breadcrumbs::register('admin.countries.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.countries.index');
    $breadcrumbs->push(_tr('menus.backend.countries.edit'), route('admin.countries.edit', $id));
});
