<?php

Breadcrumbs::register('admin.quizzes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizzes.management'), route('admin.quizzes.index'));
});

Breadcrumbs::register('admin.quizzes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizzes.index');
    $breadcrumbs->push(_tr('menus.backend.quizzes.create'), route('admin.quizzes.create'));
});

Breadcrumbs::register('admin.quizzes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizzes.index');
    $breadcrumbs->push(_tr('menus.backend.quizzes.edit'), route('admin.quizzes.edit', $id));
});
