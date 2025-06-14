<?php

Breadcrumbs::register('admin.words.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.words_management'), route('admin.words.index'));
});

Breadcrumbs::register('admin.words.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.words.index');
    $breadcrumbs->push(_tr('menus.backend.words.create'), route('admin.words.create'));
});

Breadcrumbs::register('admin.words.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.words.index');
    $breadcrumbs->push(_tr('menus.backend.words.edit'), route('admin.words.edit', $id));
});
