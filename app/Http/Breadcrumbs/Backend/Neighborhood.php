<?php

Breadcrumbs::register('admin.neighborhoods.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.neighborhoods.management'), route('admin.neighborhoods.index'));
});

Breadcrumbs::register('admin.neighborhoods.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.neighborhoods.index');
    $breadcrumbs->push(_tr('menus.backend.neighborhoods.create'), route('admin.neighborhoods.create'));
});

Breadcrumbs::register('admin.neighborhoods.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.neighborhoods.index');
    $breadcrumbs->push(_tr('menus.backend.neighborhoods.edit'), route('admin.neighborhoods.edit', $id));
});
