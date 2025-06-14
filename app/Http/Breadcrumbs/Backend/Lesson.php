<?php

Breadcrumbs::register('admin.lessons.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.lessons.management'), route('admin.lessons.index'));
});

Breadcrumbs::register('admin.lessons.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.lessons.index');
    $breadcrumbs->push(_tr('menus.backend.lessons.create'), route('admin.lessons.create'));
});

Breadcrumbs::register('admin.lessons.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.lessons.index');
    $breadcrumbs->push(_tr('menus.backend.lessons.edit'), route('admin.lessons.edit', $id));
});
