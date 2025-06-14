<?php

Breadcrumbs::register('admin.bulletins.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bulletins.management'), route('admin.bulletins.index'));
});

Breadcrumbs::register('admin.bulletins.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bulletins.index');
    $breadcrumbs->push(_tr('menus.backend.bulletins.create'), route('admin.bulletins.create'));
});

Breadcrumbs::register('admin.bulletins.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bulletins.index');
    $breadcrumbs->push(_tr('menus.backend.bulletins.edit'), route('admin.bulletins.edit', $id));
});
