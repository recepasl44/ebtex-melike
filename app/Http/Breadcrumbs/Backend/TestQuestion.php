<?php

Breadcrumbs::register('admin.testquestions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.testquestions.management'), route('admin.testquestions.index'));
});

Breadcrumbs::register('admin.testquestions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.testquestions.index');
    $breadcrumbs->push(_tr('menus.backend.testquestions.create'), route('admin.testquestions.create'));
});

Breadcrumbs::register('admin.testquestions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.testquestions.index');
    $breadcrumbs->push(_tr('menus.backend.testquestions.edit'), route('admin.testquestions.edit', $id));
});
