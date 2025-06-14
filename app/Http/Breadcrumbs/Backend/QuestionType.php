<?php

Breadcrumbs::register('admin.questiontypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.questiontypes.management'), route('admin.questiontypes.index'));
});

Breadcrumbs::register('admin.questiontypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.questiontypes.index');
    $breadcrumbs->push(_tr('menus.backend.questiontypes.create'), route('admin.questiontypes.create'));
});

Breadcrumbs::register('admin.questiontypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.questiontypes.index');
    $breadcrumbs->push(_tr('menus.backend.questiontypes.edit'), route('admin.questiontypes.edit', $id));
});
