<?php

Breadcrumbs::register('admin.employees.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.employees.management'), route('admin.employees.index'));
});

Breadcrumbs::register('admin.employees.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.employees.index');
    $breadcrumbs->push(_tr('menus.backend.employees.create'), route('admin.employees.create'));
});

Breadcrumbs::register('admin.employees.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.employees.index');
    $breadcrumbs->push(_tr('menus.backend.employees.edit'), route('admin.employees.edit', $id));
});
