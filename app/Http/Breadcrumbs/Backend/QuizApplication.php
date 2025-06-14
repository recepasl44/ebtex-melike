<?php

Breadcrumbs::register('admin.quizapplications.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizapplications.management'), route('admin.quizapplications.index'));
});

Breadcrumbs::register('admin.quizapplications.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizapplications.index');
    $breadcrumbs->push(_tr('menus.backend.quizapplications.create'), route('admin.quizapplications.create'));
});

Breadcrumbs::register('admin.quizapplications.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizapplications.index');
    $breadcrumbs->push(_tr('menus.backend.quizapplications.edit'), route('admin.quizapplications.edit', $id));
});
