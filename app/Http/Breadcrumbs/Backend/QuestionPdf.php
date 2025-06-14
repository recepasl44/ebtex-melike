<?php

Breadcrumbs::register('admin.questionpdfs.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.questionpdfs.management'), route('admin.questionpdfs.index'));
});

Breadcrumbs::register('admin.questionpdfs.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.questionpdfs.index');
    $breadcrumbs->push(_tr('menus.backend.questionpdfs.create'), route('admin.questionpdfs.create'));
});

Breadcrumbs::register('admin.questionpdfs.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.questionpdfs.index');
    $breadcrumbs->push(_tr('menus.backend.questionpdfs.edit'), route('admin.questionpdfs.edit', $id));
});
