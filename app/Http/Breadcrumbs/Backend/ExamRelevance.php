<?php

Breadcrumbs::register('admin.examrelevances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.examrelevances.management'), route('admin.examrelevances.index'));
});

Breadcrumbs::register('admin.examrelevances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.examrelevances.index');
    $breadcrumbs->push(_tr('menus.backend.examrelevances.create'), route('admin.examrelevances.create'));
});

Breadcrumbs::register('admin.examrelevances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.examrelevances.index');
    $breadcrumbs->push(_tr('menus.backend.examrelevances.edit'), route('admin.examrelevances.edit', $id));
});
