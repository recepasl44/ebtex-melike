<?php

Breadcrumbs::register('admin.blogs.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.blogs_management'), route('admin.blogs.index'));
});

Breadcrumbs::register('admin.blogs.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.blogs.index');
    $breadcrumbs->push(_tr('menus.backend.blogs.create'), route('admin.blogs.create'));
});

Breadcrumbs::register('admin.blogs.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.blogs.index');
    $breadcrumbs->push(_tr('menus.backend.blogs.edit'), route('admin.blogs.edit', $id));
});
