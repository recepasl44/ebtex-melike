<?php

Breadcrumbs::register('admin.employeeacademics.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.employeeacademics.management'), route('admin.employeeacademics.index'));
});

Breadcrumbs::register('admin.employeeacademics.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.employeeacademics.index');
    $breadcrumbs->push(_tr('menus.backend.employeeacademics.create'), route('admin.employeeacademics.create'));
});

Breadcrumbs::register('admin.employeeacademics.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.employeeacademics.index');
    $breadcrumbs->push(_tr('menus.backend.employeeacademics.edit'), route('admin.employeeacademics.edit', $id));
});
