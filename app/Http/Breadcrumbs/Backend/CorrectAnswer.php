<?php

Breadcrumbs::register('admin.correctanswers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.correctanswers.management'), route('admin.correctanswers.index'));
});

Breadcrumbs::register('admin.correctanswers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.correctanswers.index');
    $breadcrumbs->push(_tr('menus.backend.correctanswers.create'), route('admin.correctanswers.create'));
});

Breadcrumbs::register('admin.correctanswers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.correctanswers.index');
    $breadcrumbs->push(_tr('menus.backend.correctanswers.edit'), route('admin.correctanswers.edit', $id));
});
