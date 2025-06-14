<?php

Breadcrumbs::register('admin.books.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.books.management'), route('admin.books.index'));
});

Breadcrumbs::register('admin.books.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.books.index');
    $breadcrumbs->push(_tr('menus.backend.books.create'), route('admin.books.create'));
});

Breadcrumbs::register('admin.books.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.books.index');
    $breadcrumbs->push(_tr('menus.backend.books.edit'), route('admin.books.edit', $id));
});
