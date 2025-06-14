<?php

Breadcrumbs::register('admin.vehiclebrands.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.vehiclebrands.management'), route('admin.vehiclebrands.index'));
});

Breadcrumbs::register('admin.vehiclebrands.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.vehiclebrands.index');
    $breadcrumbs->push(_tr('menus.backend.vehiclebrands.create'), route('admin.vehiclebrands.create'));
});

Breadcrumbs::register('admin.vehiclebrands.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.vehiclebrands.index');
    $breadcrumbs->push(_tr('menus.backend.vehiclebrands.edit'), route('admin.vehiclebrands.edit', $id));
});
