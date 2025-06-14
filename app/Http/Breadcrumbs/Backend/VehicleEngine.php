<?php

Breadcrumbs::register('admin.vehicleengines.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.vehicleengines.management'), route('admin.vehicleengines.index'));
});

Breadcrumbs::register('admin.vehicleengines.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.vehicleengines.index');
    $breadcrumbs->push(_tr('menus.backend.vehicleengines.create'), route('admin.vehicleengines.create'));
});

Breadcrumbs::register('admin.vehicleengines.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.vehicleengines.index');
    $breadcrumbs->push(_tr('menus.backend.vehicleengines.edit'), route('admin.vehicleengines.edit', $id));
});
