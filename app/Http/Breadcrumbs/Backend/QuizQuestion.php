<?php

Breadcrumbs::register('admin.quizquestions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizquestions.management'), route('admin.quizquestions.index'));
});

Breadcrumbs::register('admin.quizquestions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizquestions.index');
    $breadcrumbs->push(_tr('menus.backend.quizquestions.create'), route('admin.quizquestions.create'));
});

Breadcrumbs::register('admin.quizquestions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizquestions.index');
    $breadcrumbs->push(_tr('menus.backend.quizquestions.edit'), route('admin.quizquestions.edit', $id));
});
