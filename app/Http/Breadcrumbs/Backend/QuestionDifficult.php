<?php

Breadcrumbs::register('admin.questiondifficults.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.questiondifficults.management'), route('admin.questiondifficults.index'));
});

Breadcrumbs::register('admin.questiondifficults.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.questiondifficults.index');
    $breadcrumbs->push(_tr('menus.backend.questiondifficults.create'), route('admin.questiondifficults.create'));
});

Breadcrumbs::register('admin.questiondifficults.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.questiondifficults.index');
    $breadcrumbs->push(_tr('menus.backend.questiondifficults.edit'), route('admin.questiondifficults.edit', $id));
});
