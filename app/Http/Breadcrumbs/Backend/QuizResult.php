<?php

Breadcrumbs::register('admin.quizresults.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizresults.management'), route('admin.quizresults.index'));
});

Breadcrumbs::register('admin.quizresults.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizresults.index');
    $breadcrumbs->push(_tr('menus.backend.quizresults.create'), route('admin.quizresults.create'));
});

Breadcrumbs::register('admin.quizresults.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizresults.index');
    $breadcrumbs->push(_tr('menus.backend.quizresults.edit'), route('admin.quizresults.edit', $id));
});
