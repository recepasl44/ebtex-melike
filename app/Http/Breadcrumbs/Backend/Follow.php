<?php

Breadcrumbs::register('admin.follows.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.follows_management'), route('admin.follows.index'));
});

Breadcrumbs::register('admin.follows.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.follows.index');
    $breadcrumbs->push(_tr('menus.backend.follows.create'), route('admin.follows.create'));
});

Breadcrumbs::register('admin.follows.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.follows.index');
    $breadcrumbs->push(_tr('menus.backend.follows.edit'), route('admin.follows.edit', $id));
});
