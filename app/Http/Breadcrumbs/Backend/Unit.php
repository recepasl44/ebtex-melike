<?php

Breadcrumbs::register('admin.units.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.units.management'), route('admin.units.index'));
});

Breadcrumbs::register('admin.units.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.units.index');
    $breadcrumbs->push(_tr('menus.backend.units.create'), route('admin.units.create'));
});

Breadcrumbs::register('admin.units.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.units.index');
    $breadcrumbs->push(_tr('menus.backend.units.edit'), route('admin.units.edit', $id));
});
