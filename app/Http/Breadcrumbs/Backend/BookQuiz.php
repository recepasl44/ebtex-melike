<?php

Breadcrumbs::register('admin.bookquizzes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookquizzes.management'), route('admin.bookquizzes.index'));
});

Breadcrumbs::register('admin.bookquizzes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookquizzes.index');
    $breadcrumbs->push(_tr('menus.backend.bookquizzes.create'), route('admin.bookquizzes.create'));
});

Breadcrumbs::register('admin.bookquizzes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookquizzes.index');
    $breadcrumbs->push(_tr('menus.backend.bookquizzes.edit'), route('admin.bookquizzes.edit', $id));
});
