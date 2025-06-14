<?php

Breadcrumbs::register('admin.bookquestions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookquestions.management'), route('admin.bookquestions.index'));
});

Breadcrumbs::register('admin.bookquestions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookquestions.index');
    $breadcrumbs->push(_tr('menus.backend.bookquestions.create'), route('admin.bookquestions.create'));
});

Breadcrumbs::register('admin.bookquestions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookquestions.index');
    $breadcrumbs->push(_tr('menus.backend.bookquestions.edit'), route('admin.bookquestions.edit', $id));
});
