<?php

Breadcrumbs::register('admin.eventstudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.eventstudents.management'), route('admin.eventstudents.index'));
});

Breadcrumbs::register('admin.eventstudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.eventstudents.index');
    $breadcrumbs->push(_tr('menus.backend.eventstudents.create'), route('admin.eventstudents.create'));
});

Breadcrumbs::register('admin.eventstudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.eventstudents.index');
    $breadcrumbs->push(_tr('menus.backend.eventstudents.edit'), route('admin.eventstudents.edit', $id));
});
