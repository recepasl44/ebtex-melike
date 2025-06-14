<?php

Breadcrumbs::register('admin.quizmatches.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizmatches.management'), route('admin.quizmatches.index'));
});

Breadcrumbs::register('admin.quizmatches.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizmatches.index');
    $breadcrumbs->push(_tr('menus.backend.quizmatches.create'), route('admin.quizmatches.create'));
});

Breadcrumbs::register('admin.quizmatches.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizmatches.index');
    $breadcrumbs->push(_tr('menus.backend.quizmatches.edit'), route('admin.quizmatches.edit', $id));
});
