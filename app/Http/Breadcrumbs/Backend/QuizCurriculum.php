<?php

Breadcrumbs::register('admin.quizcurriculums.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizcurriculums.management'), route('admin.quizcurriculums.index'));
});

Breadcrumbs::register('admin.quizcurriculums.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizcurriculums.index');
    $breadcrumbs->push(_tr('menus.backend.quizcurriculums.create'), route('admin.quizcurriculums.create'));
});

Breadcrumbs::register('admin.quizcurriculums.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizcurriculums.index');
    $breadcrumbs->push(_tr('menus.backend.quizcurriculums.edit'), route('admin.quizcurriculums.edit', $id));
});
