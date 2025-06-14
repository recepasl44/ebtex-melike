<?php

Breadcrumbs::register('admin.assignments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.assignments.management'), route('admin.assignments.index'));
});

Breadcrumbs::register('admin.assignments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.assignments.index');
    $breadcrumbs->push(_tr('menus.backend.assignments.create'), route('admin.assignments.create'));
});

Breadcrumbs::register('admin.assignments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.assignments.index');
    $breadcrumbs->push(_tr('menus.backend.assignments.edit'), route('admin.assignments.edit', $id));
});
