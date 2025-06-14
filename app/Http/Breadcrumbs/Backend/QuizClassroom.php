<?php

Breadcrumbs::register('admin.quizclassrooms.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizclassrooms.management'), route('admin.quizclassrooms.index'));
});

Breadcrumbs::register('admin.quizclassrooms.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizclassrooms.index');
    $breadcrumbs->push(_tr('menus.backend.quizclassrooms.create'), route('admin.quizclassrooms.create'));
});

Breadcrumbs::register('admin.quizclassrooms.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizclassrooms.index');
    $breadcrumbs->push(_tr('menus.backend.quizclassrooms.edit'), route('admin.quizclassrooms.edit', $id));
});
