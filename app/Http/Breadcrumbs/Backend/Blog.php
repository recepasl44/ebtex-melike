<?php

Breadcrumbs::register('admin.blogcategories.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.blog_management_management'), route('admin.blogcategories.index'));
});

Breadcrumbs::register('admin.blogcategories.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.blogcategories.index');
    $breadcrumbs->push(_tr('menus.backend.blog_management.create'), route('admin.blogcategories.create'));
});

Breadcrumbs::register('admin.blogcategories.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.blogcategories.index');
    $breadcrumbs->push(_tr('menus.backend.blog_management.edit'), route('admin.blogcategories.edit', $id));
});
