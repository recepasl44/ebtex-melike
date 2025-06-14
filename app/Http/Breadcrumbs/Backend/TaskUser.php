<?php

Breadcrumbs::register('admin.taskusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.taskusers.management'), route('admin.taskusers.index'));
});

Breadcrumbs::register('admin.taskusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.taskusers.index');
    $breadcrumbs->push(_tr('menus.backend.taskusers.create'), route('admin.taskusers.create'));
});

Breadcrumbs::register('admin.taskusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.taskusers.index');
    $breadcrumbs->push(_tr('menus.backend.taskusers.edit'), route('admin.taskusers.edit', $id));
});
