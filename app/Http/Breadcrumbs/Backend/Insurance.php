<?php

Breadcrumbs::register('admin.insurances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.insurances_management'), route('admin.insurances.index'));
});

Breadcrumbs::register('admin.insurances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.insurances.index');
    $breadcrumbs->push(_tr('menus.backend.insurances.create'), route('admin.insurances.create'));
});

Breadcrumbs::register('admin.insurances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.insurances.index');
    $breadcrumbs->push(_tr('menus.backend.insurances.edit'), route('admin.insurances.edit', $id));
});
