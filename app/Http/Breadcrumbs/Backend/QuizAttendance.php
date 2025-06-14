<?php

Breadcrumbs::register('admin.quizattendances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizattendances.management'), route('admin.quizattendances.index'));
});

Breadcrumbs::register('admin.quizattendances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizattendances.index');
    $breadcrumbs->push(_tr('menus.backend.quizattendances.create'), route('admin.quizattendances.create'));
});

Breadcrumbs::register('admin.quizattendances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizattendances.index');
    $breadcrumbs->push(_tr('menus.backend.quizattendances.edit'), route('admin.quizattendances.edit', $id));
});
