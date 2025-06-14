<?php

Breadcrumbs::register('admin.quizlevels.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizlevels.management'), route('admin.quizlevels.index'));
});

Breadcrumbs::register('admin.quizlevels.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizlevels.index');
    $breadcrumbs->push(_tr('menus.backend.quizlevels.create'), route('admin.quizlevels.create'));
});

Breadcrumbs::register('admin.quizlevels.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizlevels.index');
    $breadcrumbs->push(_tr('menus.backend.quizlevels.edit'), route('admin.quizlevels.edit', $id));
});
