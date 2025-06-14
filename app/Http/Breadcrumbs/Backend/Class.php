<?php

Breadcrumbs::register('admin.classes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.classes.management'), route('admin.classes.index'));
});

Breadcrumbs::register('admin.classes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.classes.index');
    $breadcrumbs->push(_tr('menus.backend.classes.create'), route('admin.classes.create'));
});

Breadcrumbs::register('admin.classes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.classes.index');
    $breadcrumbs->push(_tr('menus.backend.classes.edit'), route('admin.classes.edit', $id));
});
