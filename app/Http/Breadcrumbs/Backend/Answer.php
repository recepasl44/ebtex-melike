<?php

Breadcrumbs::register('admin.answers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.answers.management'), route('admin.answers.index'));
});

Breadcrumbs::register('admin.answers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.answers.index');
    $breadcrumbs->push(_tr('menus.backend.answers.create'), route('admin.answers.create'));
});

Breadcrumbs::register('admin.answers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.answers.index');
    $breadcrumbs->push(_tr('menus.backend.answers.edit'), route('admin.answers.edit', $id));
});
