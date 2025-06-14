<?php

Breadcrumbs::register('admin.pagetypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.pagetypes.management'), route('admin.pagetypes.index'));
});

Breadcrumbs::register('admin.pagetypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.pagetypes.index');
    $breadcrumbs->push(_tr('menus.backend.pagetypes.create'), route('admin.pagetypes.create'));
});

Breadcrumbs::register('admin.pagetypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.pagetypes.index');
    $breadcrumbs->push(_tr('menus.backend.pagetypes.edit'), route('admin.pagetypes.edit', $id));
});
