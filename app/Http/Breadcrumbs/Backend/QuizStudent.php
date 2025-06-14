<?php

Breadcrumbs::register('admin.quizstudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizstudents.management'), route('admin.quizstudents.index'));
});

Breadcrumbs::register('admin.quizstudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizstudents.index');
    $breadcrumbs->push(_tr('menus.backend.quizstudents.create'), route('admin.quizstudents.create'));
});

Breadcrumbs::register('admin.quizstudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizstudents.index');
    $breadcrumbs->push(_tr('menus.backend.quizstudents.edit'), route('admin.quizstudents.edit', $id));
});
