<?php

Breadcrumbs::register('admin.questions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.questions.management'), route('admin.questions.index'));
});

Breadcrumbs::register('admin.questions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.questions.index');
    $breadcrumbs->push(_tr('menus.backend.questions.create'), route('admin.questions.create'));
});

Breadcrumbs::register('admin.questions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.questions.index');
    $breadcrumbs->push(_tr('menus.backend.questions.edit'), route('admin.questions.edit', $id));
});
