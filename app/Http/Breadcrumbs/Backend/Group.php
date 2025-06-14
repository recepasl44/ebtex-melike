<?php

Breadcrumbs::register('admin.groups.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.groups.management'), route('admin.groups.index'));
});

Breadcrumbs::register('admin.groups.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.groups.index');
    $breadcrumbs->push(_tr('menus.backend.groups.create'), route('admin.groups.create'));
});

Breadcrumbs::register('admin.groups.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.groups.index');
    $breadcrumbs->push(_tr('menus.backend.groups.edit'), route('admin.groups.edit', $id));
});
