<?php

Breadcrumbs::register('admin.inspections.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.inspections_management'), route('admin.inspections.index'));
});

Breadcrumbs::register('admin.inspections.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.inspections.index');
    $breadcrumbs->push(_tr('menus.backend.inspections.create'), route('admin.inspections.create'));
});

Breadcrumbs::register('admin.inspections.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.inspections.index');
    $breadcrumbs->push(_tr('menus.backend.inspections.edit'), route('admin.inspections.edit', $id));
});
