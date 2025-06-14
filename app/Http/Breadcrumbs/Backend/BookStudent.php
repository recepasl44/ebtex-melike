<?php

Breadcrumbs::register('admin.bookstudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookstudents.management'), route('admin.bookstudents.index'));
});

Breadcrumbs::register('admin.bookstudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookstudents.index');
    $breadcrumbs->push(_tr('menus.backend.bookstudents.create'), route('admin.bookstudents.create'));
});

Breadcrumbs::register('admin.bookstudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookstudents.index');
    $breadcrumbs->push(_tr('menus.backend.bookstudents.edit'), route('admin.bookstudents.edit', $id));
});
