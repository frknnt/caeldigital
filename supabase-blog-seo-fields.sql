alter table public.blogs
add column if not exists meta_title text,
add column if not exists meta_description text,
add column if not exists seo_keywords text,
add column if not exists focus_keyword text,
add column if not exists image_alt text;
