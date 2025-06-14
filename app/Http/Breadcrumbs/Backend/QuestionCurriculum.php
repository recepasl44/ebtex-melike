<?php

Breadcrumbs::register('admin.questioncurriculums.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.questioncurriculums.management'), route('admin.questioncurriculums.index'));
});

Breadcrumbs::register('admin.questioncurriculums.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.questioncurriculums.index');
    $breadcrumbs->push(_tr('menus.backend.questioncurriculums.create'), route('admin.questioncurriculums.create'));
});

Breadcrumbs::register('admin.questioncurriculums.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.questioncurriculums.index');
    $breadcrumbs->push(_tr('menus.backend.questioncurriculums.edit'), route('admin.questioncurriculums.edit', $id));
});
